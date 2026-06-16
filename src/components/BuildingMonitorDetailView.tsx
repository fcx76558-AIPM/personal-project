import React, { useState, useEffect, useCallback } from 'react';
import {
  Zap, Droplets, Building2, Users, Monitor, Database,
  Radio, AlertTriangle, TrendingUp, MapPin, Camera,
  BarChart3, PieChart, Radar, X, ZoomIn, Lightbulb,
  Thermometer, Wifi, Clock, CheckCircle, ArrowRight,
  Eye, Target
} from 'lucide-react';
import { Project } from '../types';

/* ============================================================
   沙盒 01：绿色能耗空间透视与精细化排漏
   ============================================================ */
function EnergySandbox() {
  const [simulating, setSimulating] = useState(false);
  const [alertFloor, setAlertFloor] = useState<number | null>(null);
  const [reportVisible, setReportVisible] = useState(false);

  const floors = Array.from({ length: 9 }, (_, i) => i + 1);

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setAlertFloor(6);
    setTimeout(() => setReportVisible(true), 1200);
  };

  const handleReset = () => {
    setSimulating(false);
    setAlertFloor(null);
    setReportVisible(false);
  };

  return (
    <div className="space-y-4">
      {/* 双向对比条形图区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左：用电量对比 */}
        <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-bold text-zinc-700 font-mono">各楼层用电量 / kWh</span>
            <span className="ml-auto text-[9px] text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">实时</span>
          </div>
          <div className="space-y-1.5">
            {floors.reverse().map(floor => {
              const baseWidth = floor === 6 && simulating ? 92 : 20 + Math.floor(Math.random() * 55);
              return (
                <div key={floor} className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-500 w-5 shrink-0">{floor}F</span>
                  <div className="flex-1 h-5 bg-zinc-100 rounded overflow-hidden relative">
                    <div
                      className={`h-full rounded transition-all duration-700 flex items-center justify-end pr-1.5 ${
                        floor === alertFloor && simulating
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse'
                          : 'bg-gradient-to-r from-orange-400 to-orange-300'
                      }`}
                      style={{ width: `${baseWidth}%` }}
                    >
                      {floor === alertFloor && simulating && (
                        <span className="text-[8px] font-bold text-white">⚠ 异常</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右：用水量对比 */}
        <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] font-bold text-zinc-700 font-mono">各楼层用水量 / m³</span>
            <span className="ml-auto text-[9px] text-cyan-500 bg-cyan-50 px-1.5 py-0.5 rounded">实时</span>
          </div>
          <div className="space-y-1.5">
            {floors.map(floor => {
              const baseWidth = 15 + Math.floor(Math.random() * 45);
              return (
                <div key={floor} className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-500 w-5 shrink-0">{floor}F</span>
                  <div className="flex-1 h-5 bg-zinc-100 rounded overflow-hidden relative">
                    <div
                      className="h-full rounded bg-gradient-to-r from-cyan-400 to-blue-300 transition-all duration-500"
                      style={{ width: `${baseWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 分析报告 */}
      {reportVisible && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-red-700 mb-1">⚡ 能耗异常检测报告</div>
              <p className="text-[11px] text-red-600 leading-relaxed">
                检测到 <strong>6F</strong> 昨夜 <strong>02:00</strong> 出现非正常的用电负荷波峰（+340%），
                疑似机房空调/照明未关闭。系统已自动推送工单至物业运维组。
              </p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-red-500">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 响应耗时 &lt; 3s</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 预计节省 ¥2,180/月</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <button
        onClick={simulating ? handleReset : handleSimulate}
        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
          simulating
            ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
            : 'bg-orange-500 text-white hover:bg-orange-400 shadow-sm'
        }`}
      >
        <Lightbulb className="w-4 h-4" />
        {simulating ? '重置模拟' : '模拟开启：夜间能耗异常排查机制'}
      </button>
    </div>
  );
}

/* ============================================================
   沙盒 02："报警即定位"应急处置闭环
   ============================================================ */
function AlarmLocateSandbox() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [cameraPiP, setCameraPiP] = useState(false);
  const [highlightZone, setHighlightZone] = useState<string | null>(null);

  const events = [
    { id: 1, time: '14:23:07', level: 'critical', location: '1F 西门通道', desc: '人员异常聚集/滞留', type: 'security' },
    { id: 2, time: '14:21:33', level: 'warning', location: '7F 机房A区', desc: 'UPS 温度超阈值', type: 'device' },
    { id: 3, time: '14:19:12', level: 'info', location: '3F 会议室B', desc: '会议超时占用提醒', type: 'space' },
    { id: 4, time: '14:15:45', level: 'warning', location: '5F 茶水间', desc: '水管压力异常波动', type: 'facility' },
    { id: 5, time: '14:12:08', level: 'critical', location: 'B1 停车场E区', desc: '烟感探测器触发', type: 'safety' },
  ];

  const handleEventClick = (idx: number) => {
    setSelectedEvent(idx);
    const evt = events[idx];
    setHighlightZone(evt.location);
    setTimeout(() => setCameraPiP(true), 600);
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setCameraPiP(false);
    setHighlightZone(null);
  };

  const levelColor = (level: string) =>
    level === 'critical' ? 'text-red-500 bg-red-50 border-red-200' :
    level === 'warning' ? 'text-amber-500 bg-amber-50 border-amber-200' :
    'text-blue-500 bg-blue-50 border-blue-200';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* 左侧：事件列表 (2列宽) */}
      <div className="lg:col-span-2 bg-zinc-50 rounded-xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold text-zinc-700 font-mono">实时事件流 / EVENT STREAM</span>
          </div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono animate-pulse ${events[0].level === 'critical' ? 'text-red-600 bg-red-100' : 'text-emerald-600 bg-emerald-100'}`}>
            {events.filter(e => e.level === 'critical').length} 条紧急
          </span>
        </div>
        <div className="divide-y divide-zinc-100 max-h-[320px] overflow-y-auto">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => handleEventClick(idx)}
              className={`w-full px-4 py-2.5 text-left transition-colors hover:bg-white ${
                selectedEvent === idx ? 'bg-emerald-50 border-l-2 border-l-emerald-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${levelColor(evt.level)}`}>
                  {evt.level.toUpperCase()}
                </span>
                <span className="text-[9px] font-mono text-zinc-400">{evt.time}</span>
              </div>
              <div className="text-[11px] font-bold text-zinc-800">{evt.desc}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" />{evt.location}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧：3D建筑模型 + PiP (3列宽) */}
      <div className="lg:col-span-3 bg-zinc-900 rounded-xl border border-zinc-800 relative overflow-hidden min-h-[360px]">
        {/* 3D 建筑模型模拟 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative transition-transform duration-700 ease-out" style={{
            transform: selectedEvent !== null ? 'scale(1.15)' : 'scale(1)'
          }}>
            {/* 建筑主体 - CSS 3D 模拟 */}
            <div className="relative w-48 h-64 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg border border-zinc-600 shadow-2xl">
              {/* 楼层线 */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="absolute left-0 right-0 border-t border-zinc-600/30" style={{ top: `${(i + 1) * 10}%` }}>
                  {/* 窗户网格 */}
                  <div className="flex justify-center gap-1 px-3 py-1">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-6 h-3 rounded-sm transition-all duration-500 ${
                          highlightZone?.includes(`${i + 1}F`)
                            ? 'bg-red-500/70 animate-pulse shadow-lg shadow-red-500/50'
                            : 'bg-cyan-900/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* 高亮标注 */}
              {highlightZone && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-red-400 bg-red-900/80 px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {highlightZone}
                  </span>
                </div>
              )}

              {/* 底部入口 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-zinc-600 rounded-t-lg border border-zinc-500" />
            </div>

            {/* PiP 监控画面 */}
            {cameraPiP && highlightZone && (
              <div className="absolute -right-4 -bottom-4 w-36 h-24 bg-black rounded-lg border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bg-cyan-900/90 px-1.5 py-0.5 flex items-center justify-between z-10">
                  <span className="text-[7px] font-mono text-cyan-300">● LIVE {highlightZone}</span>
                  <Camera className="w-2.5 h-2.5 text-red-500 animate-pulse" />
                </div>
                {/* 模拟监控画面 */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center pt-4">
                  <div className="text-center">
                    <div className="w-16 h-12 mx-auto bg-zinc-700/60 rounded border border-zinc-600 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-zinc-500" />
                    </div>
                    <span className="text-[7px] text-zinc-500 mt-1 block">现场监控流</span>
                  </div>
                </div>
                {/* 扫描线效果 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan" />
              </div>
            )}
          </div>
        </div>

        {/* 状态信息浮层 */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            BIM 数字孪生 · 实时渲染
          </div>
          {selectedEvent !== null && (
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded">
              定位耗时 &lt; 1s ✓
            </span>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="lg:col-span-5">
        <button
          onClick={selectedEvent !== null ? handleReset : () => handleEventClick(0)}
          className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
            selectedEvent !== null
              ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
          }`}
        >
          <Target className="w-4 h-4" />
          {selectedEvent !== null ? '重置模拟' : '点击左侧事件 → 触发"报警即定位"演示'}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   沙盒 03：资产盘活与园区生态治理
   ============================================================ */
function AssetEcoSandbox() {
  const [activeChart, setActiveChart] = useState<'radar' | 'pie' | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleShowRadar = () => {
    setActiveChart('radar');
    setShowReport(true);
  };
  const handleShowPie = () => {
    setActiveChart('pie');
    setShowReport(true);
  };
  const handleReset = () => {
    setActiveChart(null);
    setShowReport(false);
  };

  // 雷达图数据
  const radarData = [
    { label: 'AI/大模型', value: 95 },
    { label: '数字化转型', value: 82 },
    { label: '组织效能', value: 78 },
    { label: '产品规划', value: 65 },
    { label: '财务审计', value: 45 },
    { label: '团建活动', value: 38 },
  ];

  // 圆环图数据
  const pieData = [
    { label: '食堂消费', value: 42, color: '#f97316' },
    { label: '咖啡轻餐', value: 25, color: '#06b6d4' },
    { label: '便利店', value: 18, color: '#10b981' },
    { label: '自动售货', value: 10, color: '#8b5cf6' },
    { label: '其他', value: 5, color: '#6b7280' },
  ];

  return (
    <div className="space-y-4">
      {/* 上排：三个核心指标卡片 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: '到访人数', value: '669人', sub: '今日 +12%', color: 'text-blue-600 bg-blue-50' },
          { icon: Users, label: '历史人数', value: '53人', sub: '在楼', color: 'text-cyan-600 bg-cyan-50' },
          { icon: TrendingUp, label: '工位利用率', value: '102/481', sub: '21.2%', color: 'text-emerald-600 bg-emerald-50' },
        ].map((item, idx) => (
          <div key={idx} className={`${item.color} rounded-xl p-3 border border-zinc-200`}>
            <item.icon className="w-4 h-4 mb-1 opacity-70" />
            <div className="text-[9px] font-medium opacity-80">{item.label}</div>
            <div className="text-base font-bold">{item.value}</div>
            <div className="text-[9px] opacity-60">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* 中排：图表区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 热点会议主题雷达图 */}
        <div className={`rounded-xl p-4 border transition-all ${activeChart === 'radar' ? 'border-emerald-300 bg-emerald-50/50 ring-2 ring-emerald-200' : 'border-zinc-200 bg-zinc-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radar className="w-4 h-4 text-violet-600" />
              <span className="text-[10px] font-bold text-zinc-700 font-mono">热点会议主题雷达</span>
            </div>
            <button onClick={handleShowRadar} className="text-[9px] text-emerald-600 hover:text-emerald-700 font-medium">
              {activeChart === 'radar' ? '已激活 →' : '点击查看分析'}
            </button>
          </div>
          {/* SVG 雷达图 */}
          <svg viewBox="0 0 200 180" className="w-full max-w-[220px] mx-auto">
            {/* 背景网格 */}
            {[25, 50, 75].map(r => (
              <polygon key={r}
                points={radarData.map((d, i) => {
                  const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
                  return `${100 + r * Math.cos(angle)},${85 + r * Math.sin(angle)}`;
                }).join(' ')}
                fill="none" stroke="#e4e7eb" strokeWidth="0.8"
              />
            ))}
            {/* 轴线 */}
            {radarData.map((d, i) => {
              const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
              return <line key={i} x1={100} y1={85} x2={100 + 75 * Math.cos(angle)} y2={85 + 75 * Math.sin(angle)} stroke="#d1d5db" strokeWidth="0.8" />;
            })}
            {/* 数据区域 */}
            <polygon
              points={radarData.map((d, i) => {
                const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
                const r = (d.value / 100) * 75;
                return `${100 + r * Math.cos(angle)},${85 + r * Math.sin(angle)}`;
              }).join(' ')}
              fill={activeChart === 'radar' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.12)'}
              stroke="#8b5cf6"
              strokeWidth={activeChart === 'radar' ? '2' : '1.2'}
              className={activeChart === 'radar' ? 'transition-all duration-500' : ''}
            />
            {/* 标签 */}
            {radarData.map((d, i) => {
              const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
              const x = 100 + 82 * Math.cos(angle);
              const y = 85 + 82 * Math.sin(angle);
              return <text key={i} x={x} y={y} fill="#71717a" fontSize="8" textAnchor="middle" dominantBaseline="middle">{d.label}</text>;
            })}
          </svg>
        </div>

        {/* 消费订单圆环图 */}
        <div className={`rounded-xl p-4 border transition-all ${activeChart === 'pie' ? 'border-emerald-300 bg-emerald-50/50 ring-2 ring-emerald-200' : 'border-zinc-200 bg-zinc-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-orange-600" />
              <span className="text-[10px] font-bold text-zinc-700 font-mono">消费订单占比</span>
            </div>
            <button onClick={handleShowPie} className="text-[9px] text-emerald-600 hover:text-emerald-700 font-medium">
              {activeChart === 'pie' ? '已激活 →' : '点击查看分析'}
            </button>
          </div>
          {/* SVG 圆环图 */}
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0">
              {(() => {
                let offset = 0;
                return pieData.map(d => {
                  const dash = (d.value / 100) * 283;
                  const el = (
                    <circle key={d.label} cx="50" cy="50" r="45" fill="none"
                      stroke={d.color} strokeWidth="10"
                      strokeDasharray={`${dash} 283`}
                      strokeDashoffset={-offset}
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-500"
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
              <circle cx="50" cy="50" r="32" fill="white" />
              <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#18181b">564次</text>
              <text x="50" y="60" textAnchor="middle" fontSize="7" fill="#a1a1aa">本月总订单</text>
            </svg>
            {/* 图例 */}
            <div className="space-y-1.5 flex-1">
              {pieData.map(d => (
                <div key={d.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[9px] text-zinc-600">{d.label}</span>
                  <span className="text-[9px] font-mono text-zinc-400 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 资产盘活报告 */}
      {showReport && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-700 mb-1">📊 场地综合闲置率与运营优化账本</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { label: '空置率 ≥45% 的无效会议室', value: '3 间', action: '建议合并或转租' },
                  { label: '长期预约不来的工位', value: '12 个', action: '释放至共享工位池' },
                  { label: '预计月节省租金成本', value: '¥18,600', action: '' },
                  { label: '空间利用率提升潜力', value: '+23%', action: '' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-2 border border-emerald-100">
                    <div className="text-[9px] text-zinc-500">{item.label}</div>
                    <div className="text-sm font-bold text-emerald-700">{item.value}</div>
                    {item.action && <div className="text-[8px] text-emerald-600">{item.action}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <button
        onClick={activeChart !== null ? handleReset : handleShowRadar}
        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
          activeChart !== null
            ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
            : 'bg-violet-600 text-white hover:bg-violet-500 shadow-sm'
        }`}
      >
        <BarChart3 className="w-4 h-4" />
        {activeChart !== null ? '重置模拟' : '点击查看资产盘活分析报告'}
      </button>
    </div>
  );
}

/* ============================================================
   主视图组件
   ============================================================ */
export function BuildingMonitorDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            BUILDING MONITOR v2.0 · SMART CAMPUS DASHBOARD
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">交控科技智慧运营管理平台（智慧楼宇监控大屏）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          围绕"绿色能耗、设备资产、空间与人"三大数字化园区要素构建的 3D 数字孪生底座，打破传统烟囱式孤立物管，实现从"传统物业被动修缮"向"数据驱动的主动式园区生态运营"跨越的综合管理系统。
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">数字孪生</span>
          <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium">BIM级精度</span>
          <span className="text-[10px] px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full font-medium">降本增效</span>
        </div>
      </div>

      {/* 标签行 */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {['BIM 立体拓扑空间', '多源异构数据纳管', '事件驱动型状态机', '时序数据空间聚合'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '能耗漏损降低', value: '25.0%' },
            { label: '异常定位耗时', value: '秒级' },
            { label: '资产闲置率降至', value: '35.0%' },
            { label: '空间透视精度', value: '100%' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 卡片一：系统产品架构与商业逻辑 */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-emerald-50 to-violet-50 text-zinc-900 px-5 py-3 flex items-center gap-2 border-b border-zinc-200">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 01 系统产品架构与商业逻辑</span>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-zinc-600">
            三大功能矩阵数据闭环，完全映射实拍大屏视觉流：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 绿色能耗管理矩阵 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-zinc-800">绿色能耗管理矩阵</span>
              </div>
              <div className="text-[9px] text-orange-500 font-mono mb-2">大屏左翼</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                针对传统大楼高额的"未知能耗漏损"痛点，通过用电/用水实时统计的时序波动，结合 1F-9F 的双向对比条形图，帮助企业 ESG 或后勤官员精准卡点能源异常流向。
              </p>
            </div>

            {/* 空间孪生与智能运维底座 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-800">空间孪生与智能运维底座</span>
              </div>
              <div className="text-[9px] text-emerald-600 font-mono mb-2">大屏中央</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                基于 BIM 空间技术建立 3D 数字孪生底座。其最核心的产品设计在于<strong>"报警即定位（Alarm-to-Locate）"</strong>的事件驱动流。当任一物联网设备发生故障时，三维模型精准闪烁，缩短响应时效至秒级。
              </p>
            </div>

            {/* 空间、人效与园区生态 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-bold text-zinc-800">空间、人效与园区生态</span>
              </div>
              <div className="text-[9px] text-violet-600 font-mono mb-2">大屏右翼</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                将数据触角伸向到访人数、工位利用率、会议室预定波动。深度并接园区食堂/商业消费订单以及热点会议主题雷达图，帮助行政资产部门在物理世界真实盘活闲置资源。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片二：沙盒 01 — 能耗排漏 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 01 / 绿色能耗空间透视与精细化排漏</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <EnergySandbox />
        </div>
      </div>

      {/* 卡片三：沙盒 02 — 报警即定位 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 02 / "报警即定位"应急处置闭环</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <AlarmLocateSandbox />
        </div>
      </div>

      {/* 卡片四：沙盒 03 — 资产盘活 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 03 / 资产盘活与高附加值"园区生态"治理</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <AssetEcoSandbox />
        </div>
      </div>

      {/* 卡片五：项目案例 / CASE STUDY */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 项目案例 / CASE STUDY</span>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/case-building-monitor.png`}
            alt="交控科技智慧运营管理平台 - 实际部署大屏"
            className="w-full h-auto"
          />
          <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50">
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              交控科技智慧运营管理平台实际部署效果 —— 左翼绿色能耗矩阵、中央 BIM 数字孪生空间、右翼人效与园区生态数据，三大功能区域完整映射真实业务场景。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
