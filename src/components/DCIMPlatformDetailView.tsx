import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Gauge, Server, AlertTriangle, Shield, FileText, CheckCircle,
  TrendingUp, BarChart3, Activity, Layers, ClipboardList, Download,
  ChevronRight, Package, Wrench, Archive, Clock, Zap, Snowflake,
  Maximize2, X, RotateCcw
} from 'lucide-react';
import { Project } from '../types';

// ─── 颜色常量 ───────────────────────────────────
const C = {
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
  zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b' },
  red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 500: '#ef4444', 600: '#dc2626' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 500: '#f59e0b', 600: '#d97706' },
  blue: { 50: '#eff6ff', 100: '#dbeafe' },
};

// ─── 工具函数 ───────────────────────────────────
function AnimatedNumber({ value, decimals = 0, duration = 600 }: { value: number; decimals?: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return <span>{display.toFixed(decimals)}</span>;
}

function RingGauge({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <circle cx="50" cy="50" r={r} fill="none" stroke={C.zinc[200]} strokeWidth="8" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-out" />
        <text x="50" y="46" textAnchor="middle" fill={C.zinc[900]} fontSize="14" fontWeight="bold">
          <AnimatedNumber value={value} />
        </text>
        <text x="50" y="60" textAnchor="middle" fill={C.zinc[500]} fontSize="9">{unit}</text>
      </svg>
      <span className="text-[10px] font-medium text-zinc-600">{label}</span>
    </div>
  );
}

// ─── 沙盒 01：三轴容量预测与扩容改造 ────────────
function CapacitySandbox() {
  const [deployed, setDeployed] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const gaugesBefore = { space: 35.5, power: 42.0, cooling: 38.2 };
  const gaugesAfter = { space: 65.0, power: 92.5, cooling: 88.0 };

  const radarBefore = [42, 35, 38, 50, 20, 30];
  const radarAfter = [92, 65, 88, 85, 75, 80];
  const radarLabels = ['总配电负荷', 'U位空间', '机房制冷量', '地板承重', '网络带宽', 'UPS冗余'];

  const currentGauges = deployed ? gaugesAfter : gaugesBefore;
  const currentRadar = deployed ? radarAfter : radarBefore;
  const isWarning = deployed && currentGauges.power > 90;

  const handleDeploy = useCallback(() => {
    if (deployed) {
      setDeployed(false);
      setAnimStep(0);
      return;
    }
    setDeployed(true);
    setAnimStep(1);
  }, [deployed]);

  // SVG 六维雷达图
  const renderRadar = () => {
    const cx = 110, cy = 105, maxR = 85;
    const n = 6;
    const getXY = (value: number, i: number) => {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
      const r = (value / 100) * maxR;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };
    const pointsStr = currentRadar.map((v, i) => {
      const p = getXY(v, i);
      return `${p.x},${p.y}`;
    }).join(' ');

    const gridLines = [25, 50, 75, 100].map(r => {
      const pts = Array.from({ length: n }, (_, i) => {
        const p = getXY(r, i);
        return `${p.x},${p.y}`;
      }).join(' ');
      return <polygon key={r} points={pts} fill="none" stroke={C.zinc[200]} strokeWidth="0.5" />;
    });

    const axisLines = Array.from({ length: n }, (_, i) => {
      const p = getXY(100, i);
      return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.zinc[200]} strokeWidth="0.5" />;
    });

    const labels = radarLabels.map((label, i) => {
      const p = getXY(115, i);
      return (
        <text key={i} x={p.x} y={p.y} textAnchor="middle" fill={C.zinc[600]}
          fontSize="8" fontWeight="600" dominantBaseline="middle">{label}</text>
      );
    });

    const dataPoints = currentRadar.map((v, i) => getXY(v, i));

    return (
      <svg viewBox="0 0 220 210" className="w-full max-w-[260px] mx-auto">
        {gridLines}{axisLines}{labels}
        <polygon points={pointsStr} fill={isWarning ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}
          stroke={isWarning ? C.red[500] : C.emerald[500]} strokeWidth="1.5"
          className={`transition-all duration-700 ${isWarning ? 'animate-pulse' : ''}`} />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={isWarning ? C.red[500] : C.emerald[500]} className="transition-all duration-700" />
        ))}
        {/* 数值标注 */}
        {dataPoints.map((p, i) => (
          <text key={`v-${i}`} x={p.x} y={p.y - 8} textAnchor="middle" fill={C.zinc[800]} fontSize="8" fontWeight="bold">
            {currentRadar[i]}%
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：环形仪表盘 + 雷达图 */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              三轴容量仪表盘 / CAPACITY GAUGES
            </span>
          </div>
          <div className="flex justify-center gap-5 mb-5">
            <RingGauge label="空间容量" value={currentGauges.space} unit="%" color={C.emerald[500]} />
            <RingGauge label="电力容量" value={currentGauges.power} unit="%" color={isWarning ? C.red[500] : C.emerald[500]} />
            <RingGauge label="制冷容量" value={currentGauges.cooling} unit="%" color={currentGauges.cooling > 80 ? C.amber[500] : C.emerald[500]} />
          </div>
          {renderRadar()}
        </div>

        {/* 右侧：机柜列头组态 */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              机柜列头组态 / RACK TOPOLOGY
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 mb-4">
            {Array.from({ length: 12 }).map((_, i) => {
              const isHot = deployed && i >= 6;
              return (
                <div key={i} className={`aspect-[3/4] rounded-lg border-2 transition-all duration-500 ${
                  isHot ? 'bg-red-50 border-red-300' : 'bg-white border-emerald-300'
                } ${isHot ? 'animate-pulse' : ''}`}>
                  <div className="flex flex-col items-center justify-center h-full gap-0.5">
                    <div className={`w-3 h-3 rounded-sm ${isHot ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <span className="text-[7px] font-mono text-zinc-500">R-{String(i + 1).padStart(2, '0')}</span>
                    {isHot && <span className="text-[6px] font-mono text-red-500">AI</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 预警卡片 */}
          {isWarning && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3 animate-pulse">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-red-700">电力容量严重预警</div>
                  <div className="text-[9px] text-red-600 mt-0.5 leading-relaxed">
                    检测到目标 1F-IT01 机房总配电负荷逼近 92.5% 临界阈值，电力剩余冗余不足，无法执行盲目扩容。建议启用二次路由分配。
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleDeploy}
            className={`w-full py-3 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
              deployed
                ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
            }`}
          >
            {deployed ? (
              <><RotateCcw className="w-3.5 h-3.5" /> 重置模拟</>
            ) : (
              <><Server className="w-3.5 h-3.5" /> 模拟高密度 AI 算力服务器上架</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 沙盒 02：资产全生命周期状态机 ──────────────
function AssetLifecycleSandbox() {
  const [scrapped, setScrapped] = useState(false);
  const [assetData, setAssetData] = useState({
    inbound: 49, outbound: 19, scrapped: 9, maintenance: 30
  });
  const [tableRows, setTableRows] = useState([
    { code: 'A110R09-42-UPS-02', name: '精密变压器/UPS模块', location: '智算三期-1F-02机房', status: '维保中' as const, date: '2026-06-15' },
    { code: 'B202C01-12-IDEC-06', name: '3D-IDEC精密空调', location: '智算一期-3F-01机房', status: '运行中' as const, date: '2026-06-16' },
  ]);

  const handleScrap = () => {
    if (scrapped) {
      setScrapped(false);
      setAssetData({ inbound: 49, outbound: 19, scrapped: 9, maintenance: 30 });
      setTableRows([
        { code: 'A110R09-42-UPS-02', name: '精密变压器/UPS模块', location: '智算三期-1F-02机房', status: '维保中', date: '2026-06-15' },
        { code: 'B202C01-12-IDEC-06', name: '3D-IDEC精密空调', location: '智算一期-3F-01机房', status: '运行中', date: '2026-06-16' },
      ]);
      return;
    }
    setScrapped(true);
    setAssetData(prev => ({ ...prev, maintenance: prev.maintenance - 1, scrapped: prev.scrapped + 1 }));
    setTableRows([
      { code: 'A110R09-42-UPS-02', name: '精密变压器/UPS模块', location: '智算三期-1F-02机房', status: '已报废', date: '2026-06-16' },
      { code: 'B202C01-12-IDEC-06', name: '3D-IDEC精密空调', location: '智算一期-3F-01机房', status: '运行中', date: '2026-06-16' },
    ]);
  };

  const counters = [
    { key: 'inbound', label: '年度入库数量', unit: '件', icon: Package, color: C.emerald[500] },
    { key: 'outbound', label: '年度出库数量', unit: '件', icon: Archive, color: C.blue[100] },
    { key: 'scrapped', label: '年度报废数量', unit: '件', icon: AlertTriangle, color: scrapped ? C.red[500] : C.amber[500] },
    { key: 'maintenance', label: '年度维保到期', unit: '件', icon: Wrench, color: C.emerald[600] },
  ] as const;

  // 圆环图
  const total = tableRows.length;
  const renderDonut = () => {
    const runningCount = tableRows.filter(r => r.status === '运行中').length;
    const scrappedCount = tableRows.filter(r => r.status === '已报废').length;
    const cx = 50, cy = 50, r = 35;
    const circumference = 2 * Math.PI * r;

    const runningAngle = (runningCount / total) * 360;
    const scrappedAngle = (scrappedCount / total) * 360;

    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.zinc[200]} strokeWidth="12" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.emerald[500]} strokeWidth="12"
          strokeDasharray={`${(runningCount / total) * circumference} ${circumference}`}
          strokeLinecap="round" transform="rotate(-90 50 50)" className="transition-all duration-700" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.red[500]} strokeWidth="12"
          strokeDasharray={`${(scrappedCount / total) * circumference} ${circumference}`}
          strokeDashoffset={`${-(runningCount / total) * circumference}`}
          strokeLinecap="round" transform="rotate(-90 50 50)" className="transition-all duration-700" />
        <text x={cx} y={cy + 3} textAnchor="middle" fill={C.zinc[800]} fontSize="12" fontWeight="bold">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={C.zinc[500]} fontSize="7">设备总数</text>
      </svg>
    );
  };

  const statusColor = (status: string) => {
    switch (status) {
      case '运行中': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '维保中': return 'bg-amber-50 text-amber-700 border-amber-200';
      case '已报废': return 'bg-red-50 text-red-600 border-red-200 font-bold';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* 顶部指标卡片 */}
      <div className="grid grid-cols-4 gap-2">
        {counters.map(c => (
          <div key={c.key} className={`bg-white rounded-xl p-3 border border-zinc-200 text-center transition-all duration-500`}>
            <c.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: c.color }} />
            <div className="text-xl font-bold text-zinc-900">
              <AnimatedNumber value={assetData[c.key as keyof typeof assetData]} />
            </div>
            <div className="text-[9px] text-zinc-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：圆环图 */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              资产分类占比 / ASSET DISTRIBUTION
            </span>
          </div>
          {renderDonut()}
          <div className="flex justify-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[9px]"><span className="w-2 h-2 rounded-full bg-emerald-500" />运行中</span>
            <span className="flex items-center gap-1.5 text-[9px]"><span className="w-2 h-2 rounded-full bg-red-500" />已报废</span>
          </div>
        </div>

        {/* 右侧：状态表格 */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              资产状态明细 / ASSET STATUS
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-2 pr-3 font-bold text-zinc-600 whitespace-nowrap">设备编码</th>
                  <th className="text-left py-2 pr-3 font-bold text-zinc-600 whitespace-nowrap">资产名称</th>
                  <th className="text-left py-2 pr-3 font-bold text-zinc-600 whitespace-nowrap">状态</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <td className="py-2 pr-3 font-mono text-zinc-700 whitespace-nowrap">{row.code}</td>
                    <td className="py-2 pr-3 text-zinc-800 whitespace-nowrap">{row.name}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border transition-all duration-500 ${statusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleScrap}
            className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              scrapped
                ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            }`}
          >
            {scrapped ? (
              <><RotateCcw className="w-3.5 h-3.5" /> 重置</>
            ) : (
              <><Archive className="w-3.5 h-3.5" /> 一键申请设备报废</>
            )}
          </button>
        </div>
      </div>

      {/* 变更日志卡 */}
      {scrapped && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-in">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-emerald-800">资产变更日志</div>
              <div className="text-[9px] text-emerald-700 mt-1 leading-relaxed">
                管理员已批准设备 <span className="font-mono font-bold">A110R09-42-UPS-02</span> 报废申请。
                系统自动化同步释放其占用的 U 位空间容量资源与电力额度。维保到期数量 <span className="font-bold">-1</span>，报废数量 <span className="font-bold">+1</span>。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 沙盒 03：PUE/CLF 能效下钻与审计报表 ──────────
function EnergyReportSandbox() {
  const [devices, setDevices] = useState({ LTG: true, JMKT: true, UPS: false });
  const [timeRange, setTimeRange] = useState('月报表');
  const [chartFormat, setChartFormat] = useState('曲线');
  const [exporting, setExporting] = useState(false);

  const timeLabels = ['02日', '04日', '06日', '08日', '10日', '12日', '14日', '16日', '18日', '20日', '22日', '24日'];
  const itData = [400, 420, 410, 430, 450, 440, 460, 480, 450, 430, 420, 410];
  const coolingData = [180, 195, 210, 230, 245, 260, 275, 270, 250, 220, 190, 185];

  const activeDevices = Object.entries(devices).filter(([, v]) => v).length;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  const toggleDevice = (key: string) => {
    setDevices(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  // 简易折线图（纯 SVG）
  const renderChart = () => {
    const w = 500, h = 160, padX = 35, padY = 20;
    const chartW = w - padX * 2, chartH = h - padY * 2;
    const maxVal = 500;

    const toX = (i: number) => padX + (i / (timeLabels.length - 1)) * chartW;
    const toY = (v: number) => padY + chartH - (v / maxVal) * chartH;

    const itPath = itData.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
    const coolPath = coolingData.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');

    const itArea = itPath + ` L${toX(itData.length - 1)},${padY + chartH} L${toX(0)},${padY + chartH} Z`;
    const coolArea = coolPath + ` L${toX(coolingData.length - 1)},${padY + chartH} L${toX(0)},${padY + chartH} Z`;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* 网格 */}
        {[0, 100, 200, 300, 400, 500].map(v => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={padX} y1={y} x2={w - padX} y2={y} stroke={C.zinc[200]} strokeWidth="0.5" strokeDasharray="3,3" />
              <text x={padX - 5} y={y + 3} textAnchor="end" fill={C.zinc[400]} fontSize="7">{v}</text>
            </g>
          );
        })}
        {timeLabels.map((l, i) => (
          <text key={i} x={toX(i)} y={h - 2} textAnchor="middle" fill={C.zinc[400]} fontSize="7">{l}</text>
        ))}

        {/* 面积 */}
        <path d={itArea} fill="rgba(16,185,129,0.1)" />
        <path d={coolArea} fill="rgba(59,130,246,0.08)" />

        {/* 折线 */}
        <path d={itPath} fill="none" stroke={C.emerald[500]} strokeWidth="2" strokeLinejoin="round" />
        <path d={coolPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />

        {/* 数据点 */}
        {itData.map((v, i) => (
          <circle key={`it-${i}`} cx={toX(i)} cy={toY(v)} r="2.5" fill={C.emerald[500]} className="transition-all duration-300" />
        ))}
        {coolingData.map((v, i) => (
          <circle key={`cool-${i}`} cx={toX(i)} cy={toY(v)} r="2.5" fill="#3b82f6" className="transition-all duration-300" />
        ))}

        {/* 图例 */}
        <circle cx={w - padX - 80} cy={10} r="3" fill={C.emerald[500]} />
        <text x={w - padX - 74} y={13} fill={C.zinc[600]} fontSize="8">IT 系统用电</text>
        <circle cx={w - padX - 20} cy={10} r="3" fill="#3b82f6" />
        <text x={w - padX - 14} y={13} fill={C.zinc[600]} fontSize="8">制冷用电</text>
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 左侧：能效指标 + 报表配置器 */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              报表配置器 / CONFIGURATOR
            </span>
          </div>

          {/* PUE/CLF/WUE 指标 */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'PUE', value: '1.25' },
              { label: 'CLF', value: '0.18' },
              { label: 'WUE', value: '0.85' },
            ].map(m => (
              <div key={m.label} className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-100">
                <div className="text-sm font-bold text-emerald-700">{m.value}</div>
                <div className="text-[8px] text-emerald-600">{m.label}</div>
              </div>
            ))}
          </div>

          {/* 设备选择 */}
          <div className="space-y-2 mb-4">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">监控设备</div>
            {[
              { key: 'LTG', label: '列头柜' },
              { key: 'JMKT', label: '精密空调' },
              { key: 'UPS', label: 'UPS 设备' },
            ].map(d => (
              <label key={d.key} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => toggleDevice(d.key)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    devices[d.key as keyof typeof devices]
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'bg-white border-zinc-300'
                  }`}
                >
                  {devices[d.key as keyof typeof devices] && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] text-zinc-700">{d.label}</span>
              </label>
            ))}
          </div>

          {/* 时间维度 */}
          <div className="space-y-2 mb-4">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">时间维度</div>
            <div className="flex gap-1.5">
              {['日报表', '周报表', '月报表', '年报表'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all ${
                    timeRange === t
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 图表格式 */}
          <div className="space-y-2 mb-4">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">图表格式</div>
            <div className="flex gap-1.5">
              {['曲线', '面积图', '柱状图'].map(f => (
                <button
                  key={f}
                  onClick={() => setChartFormat(f)}
                  className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all ${
                    chartFormat === f
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* 导出按钮 */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              exporting
                ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                : 'bg-amber-500 text-white hover:bg-amber-400 shadow-sm'
            }`}
          >
            {exporting ? (
              <><Activity className="w-3.5 h-3.5 animate-spin" /> 正在生成报告...</>
            ) : (
              <><Download className="w-3.5 h-3.5" /> 一键生成合规审计报告</>
            )}
          </button>
          {exporting && (
            <div className="mt-2 text-center text-[9px] text-emerald-600 animate-pulse">
              金融审计级多维报表已成功打包，已自动转换为 PDF/CSV 格式输出。
            </div>
          )}
        </div>

        {/* 右侧大面积：能耗曲线 */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-zinc-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                多能耗时序曲线 / ENERGY TIMESERIES
              </span>
            </div>
            <span className="text-[9px] font-mono text-zinc-400">{timeRange} · 已选 {activeDevices} 设备</span>
          </div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
}

// ─── 系统架构卡片 ──────────────────────────────────
function ArchitectureCard() {
  const layers = [
    { icon: Maximize2, title: '综合监控大屏层', desc: '统筹纳管全量基础设施相关设备、动力及暖通环境运行情况，统一接收异常信息并实时分析系统运行态势，达成监、管、控一体化。', color: C.emerald[500] },
    { icon: Gauge, title: '容量智脑管理层', desc: '全面进行容量数据实时采集，横向拉通电力负荷、制冷容量、上架空间等使用情况进行三轴趋势分析，及时发现容量短板并提供扩容改造数据支撑。', color: '#3b82f6' },
    { icon: Zap, title: '多指标能效管理层', desc: '横向对齐 PUE、PLF、CLF、WUE 核心能效总览指标，纵向提供 IT 系统、配电、制冷等子系统能耗曲线，精细化拆解到楼栋/楼层空间及机柜设备用电分析。', color: C.amber[500] },
    { icon: Layers, title: '全生命周期资产层', desc: '清晰量化机房资产的数量和健康状态，严密跑通入库、出库、现场变更、维保服务到报废的状态机，实时精确跟踪基础设施变更记录日志。', color: C.emerald[600] },
    { icon: FileText, title: '审计级报表管理层', desc: '支持按设备、按数据、按时间以及多元格式图表进行定制化一键导出，满足银监会审计与绿色低碳考核需求。', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-3">
      {layers.map((layer, i) => (
        <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-zinc-200 hover:border-emerald-200 transition-colors">
          <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: layer.color + '15' }}>
            <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-zinc-800 mb-1">
              <span className="text-[9px] font-mono text-emerald-500 mr-1.5">0{i + 1}</span>
              {layer.title}
            </div>
            <div className="text-[10px] text-zinc-500 leading-relaxed">{layer.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 主视图组件 ──────────────────────────────────
export function DCIMPlatformDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* 区块 0：顶部 Header */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            iSENTRY DCIM PLATFORM · FULL-STACK FACILITY MANAGEMENT
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">DCIM（数据中心基础设施管理）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          iSentry 数据中心基础设施管理平台 (DCIM) — 专为大型智算中心与工业级机房规划设计的全栈式一体化运管平台。解决传统运维中各机电系统相互孤立形成的「数据烟囱」、高价值资产「账实不符」、以及容量调配盲目引发局部过载宕机的核心痛点。
        </p>
      </div>

      {/* 区块 1：标签行 */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 产品选型</span>
          {['三轴容量趋势分析', '资产全生命周期状态机', '多维能效拆解模型', '高定制化金融级报表', '事件驱动型闭环工作流'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-medium px-2.5 py-1 rounded-xl border border-zinc-200">{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '核心故障修复提升', value: '45%' },
            { label: '设备状态全局透视率', value: '100%' },
            { label: '资产统计变更', value: '100% 自动化' },
            { label: '容量监控覆盖', value: '3 轴' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 卡片一：系统架构 — 五大核心治理矩阵 */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-5 py-3 flex items-center gap-2 border-b border-zinc-200">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 01 系统架构</span>
          <span className="text-[9px] text-zinc-400">五大核心纳管治理矩阵</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-zinc-600 mb-4">
            系统重塑了传统物管大屏信息断节的局限性，围绕基础设施资源与生命周期建立五大核心高效统一的纳管治理矩阵。
          </p>
          <ArchitectureCard />
        </div>
      </div>

      {/* 沙盒 01：三轴容量预测与扩容改造 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 01</span>
          <span className="text-xs font-bold text-zinc-800">电力/制冷/空间"三轴"容量预测与扩容改造</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <CapacitySandbox />
        </div>
      </div>

      {/* 沙盒 02：资产全生命周期状态机 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 02</span>
          <span className="text-xs font-bold text-zinc-800">资产全生命周期状态机与现场变更追溯</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <AssetLifecycleSandbox />
        </div>
      </div>

      {/* 沙盒 03：PUE/CLF 能效下钻与审计报表 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 03</span>
          <span className="text-xs font-bold text-zinc-800">PUE/CLF 能效多维下钻与金融级定制化报表审计</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <EnergyReportSandbox />
        </div>
      </div>
    </>
  );
}
