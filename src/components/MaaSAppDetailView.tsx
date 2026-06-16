/**
 * 智慧出行 APP — MaaS 一体化大出行移动服务平台详情页
 * 配色：明亮蓝 blue-500/600（主色）+ emerald（翠绿/舒适）+ amber（琥珀/拥挤）+ rose（玫红/过度拥挤）
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Smartphone, Wifi, TrendingUp, ShoppingBag, MapPin,
  QrCode, Scan, Navigation, Radio, Lock, Unlock, ChevronRight,
  Clock, AlertTriangle, CheckCircle2, Loader2, ShoppingCart,
  Coffee, ArrowRight,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ─────────────────────────────────────────────────────────────
const C = {
  blue: {
    50: 'bg-blue-50', 100: 'bg-blue-100', 200: 'border-blue-200',
    400: 'text-blue-400', 500: 'text-blue-500', 600: 'text-blue-600', 700: 'text-blue-700',
    bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600',
  },
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200',
    400: 'text-emerald-400', 500: 'text-emerald-500', 600: 'text-emerald-600', 700: 'text-emerald-700',
    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600',
  },
  amber: {
    50: 'bg-amber-50', 100: 'bg-amber-100', 200: 'border-amber-200',
    400: 'text-amber-400', 500: 'text-amber-500', 600: 'text-amber-600', 700: 'text-amber-700',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600',
  },
  rose: {
    50: 'bg-rose-50', 100: 'bg-rose-100', 200: 'border-rose-200',
    400: 'text-rose-400', 500: 'text-rose-500', 600: 'text-rose-600', 700: 'text-rose-700',
    bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600',
  },
  zinc: {
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200', 300: 'border-zinc-300',
    400: 'text-zinc-400', 500: 'text-zinc-500', 600: 'text-zinc-600', 700: 'text-zinc-700',
    900: 'bg-zinc-900',
  },
};

// ─── Shared Components ────────────────────────────────────────────────────────

const PulseDot = ({ color = 'blue' }: { color?: string }) => (
  <div className={`h-2 w-2 rounded-full bg-${color}-500 animate-pulse`} />
);

const SandboxHeader = ({ num, label, color = 'blue' }: { num: string; label: string; color?: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
      // 沙盒 {num} / {label}
    </span>
    <div className={`flex items-center gap-1.5 text-[9px] font-mono text-${color}-600`}>
      <PulseDot color={color} />
      <span>可交互演示</span>
    </div>
  </div>
);

const SectionDivider = () => (
  <div className="border-t border-zinc-200 my-8" />
);

// ─── Architecture: 2×2 四层卡片 ──────────────────────────────────────────────

const archNodes = [
  {
    icon: Database,
    label: 'MaaS 多源信息融合层',
    subtitle: '数据中枢',
    desc: '并接 AFC 票务结算、列车重量传感器与车载边缘 CV 感知网关，多源非结构化指标实时清洗映射。',
    color: 'blue',
  },
  {
    icon: Smartphone,
    label: '移动端全局交互层',
    subtitle: '产品触角',
    desc: '面向 C 端乘客，极简卡片式首页聚合乘车码核心区、实时列车动态、站内导航三大最高频流量路径。',
    color: 'emerald',
  },
  {
    icon: Wifi,
    label: '车地数据流跨端协同层',
    subtitle: '时序响应',
    desc: 'WebSocket 长连接，列车在途位置与单个车厢红黄蓝热力拥挤度在车载魔窗、站台大屏、手机 APP 三端秒级同频。',
    color: 'amber',
  },
  {
    icon: TrendingUp,
    label: '产业生态与增收闭环层',
    subtitle: '变现管道',
    desc: '深度并接大数据推荐引擎，基于 O-D 轨迹与 Geo-fencing 物理围栏，精准触达周边商业竞价卡片与直播商城。',
    color: 'rose',
  },
];

function ArchitectureCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {archNodes.map((node, idx) => {
        const Icon = node.icon;
        return (
          <React.Fragment key={node.label}>
            <div
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-default hover:shadow-lg ${
                node.color === 'blue' ? 'bg-blue-50/50 border-blue-200 hover:border-blue-400' :
                node.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400' :
                node.color === 'amber' ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400' :
                'bg-rose-50/50 border-rose-200 hover:border-rose-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  node.color === 'blue' ? 'bg-blue-100' :
                  node.color === 'emerald' ? 'bg-emerald-100' :
                  node.color === 'amber' ? 'bg-amber-100' :
                  'bg-rose-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    node.color === 'blue' ? 'text-blue-600' :
                    node.color === 'emerald' ? 'text-emerald-600' :
                    node.color === 'amber' ? 'text-amber-600' :
                    'text-rose-600'
                  }`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-800">{node.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      node.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      node.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                      node.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {node.subtitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{node.desc}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Sandbox 01: MaaS 首页 + 红黄蓝车厢热力动态 ────────────────────────────

function CrowdHeatmapSandbox() {
  const [loadSlider, setLoadSlider] = useState(0);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);

  const getCarState = (idx: number, load: number): 'emerald' | 'amber' | 'rose' => {
    if (load < 40) return 'emerald';
    if (load < 70) {
      return idx <= 3 ? 'amber' : 'emerald';
    }
    // load >= 70
    if (load >= 90) {
      if (idx <= 1) return 'rose';
      if (idx === 2) return 'amber';
      if (idx === 3) return 'emerald';
      return idx <= 5 ? 'emerald' : 'emerald';
    }
    if (idx <= 1) return 'rose';
    if (idx === 2) return 'amber';
    return 'emerald';
  };

  const colorMap = {
    emerald: { bg: 'bg-emerald-400', text: 'text-emerald-700', label: '舒适', dot: 'bg-emerald-400' },
    amber: { bg: 'bg-amber-400', text: 'text-amber-800', label: '拥挤', dot: 'bg-amber-400' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-800', label: '过度拥挤', dot: 'bg-rose-500' },
  };

  const showWarning = loadSlider >= 90;
  const showBubble = hoveredCar === 3 && loadSlider >= 90;

  return (
    <div className="space-y-4">
      {/* 模拟手机视窗 */}
      <div className="max-w-sm mx-auto">
        <div className="rounded-[2.5rem] border-[12px] border-zinc-800 bg-zinc-900 p-3 shadow-2xl">
          {/* iPhone 刘海 */}
          <div className="flex justify-center mb-2">
            <div className="w-20 h-5 bg-zinc-800 rounded-full" />
          </div>
          {/* 屏幕 */}
          <div className="bg-white rounded-[1.8rem] overflow-hidden">
            {/* 顶部状态栏 */}
            <div className="bg-blue-600 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-blue-200" />
                <span className="text-[9px] font-mono text-blue-100">06:45</span>
              </div>
              <span className="text-[8px] font-mono text-blue-200">满格 · 5G</span>
              <div className="flex items-center gap-1">
                {['▁', '▂', '▃', '▄'].map((b, i) => (
                  <span key={i} className="text-[6px] text-blue-200">{b}</span>
                ))}
              </div>
            </div>

            {/* 站名栏 */}
            <div className="bg-zinc-50 px-4 py-2.5 border-b border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-black text-zinc-900">金台路站</div>
                  <div className="text-[9px] text-zinc-500 font-mono">06号线 · 潞城方向</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-black text-blue-600">{loadSlider === 0 ? '--' : `1分${45 - Math.floor(loadSlider / 3)}秒`}</div>
                  <div className="text-[8px] text-zinc-400 font-mono">进站倒计时</div>
                </div>
              </div>
            </div>

            {/* 车厢热力网格 */}
            <div className="px-4 py-3 space-y-2">
              <div className="text-[8px] font-mono text-zinc-400 mb-2">车厢拥挤度 · 红黄蓝热力图</div>
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const state = getCarState(idx, loadSlider);
                  const info = colorMap[state];
                  return (
                    <React.Fragment key={idx}>
                      <div
                        className={`relative rounded-xl p-2 cursor-pointer transition-all duration-300 ${info.bg} ${hoveredCar === idx ? 'ring-2 ring-offset-1 ring-zinc-400' : ''}`}
                        onMouseEnter={() => setHoveredCar(idx)}
                        onMouseLeave={() => setHoveredCar(null)}
                      >
                        <div className={`text-[9px] font-black text-center ${info.text}`}>{(idx + 1)}</div>
                        <div className={`text-[7px] text-center font-mono font-bold ${info.text} opacity-80`}>{info.label}</div>
                        {state === 'rose' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full flex items-center justify-center">
                            <span className="text-[5px] text-white font-black">!</span>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* 悬浮气泡 */}
              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-blue-600 rounded-xl px-3 py-2 flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3 text-blue-200 shrink-0" />
                    <span className="text-[9px] text-blue-100 font-mono">4号车厢较空，建议前往候车 ← 步行约40m</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 拥挤警告 */}
              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="text-[9px] text-rose-600 font-mono font-bold">
                      1-2号车厢极度拥挤！建议步行至A口电梯换乘层 ↓
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部快捷入口 */}
            <div className="px-4 pb-3 flex gap-2">
              <div className="flex-1 bg-blue-600 rounded-xl py-2.5 flex items-center justify-center gap-1.5">
                <QrCode className="w-3 h-3 text-blue-100" />
                <span className="text-[9px] text-blue-100 font-bold">乘车码</span>
              </div>
              <div className="flex-1 bg-zinc-100 rounded-xl py-2.5 flex items-center justify-center gap-1.5">
                <Navigation className="w-3 h-3 text-zinc-600" />
                <span className="text-[9px] text-zinc-700 font-bold">站内导航</span>
              </div>
              <div className="flex-1 bg-amber-50 border border-amber-200 rounded-xl py-2.5 flex items-center justify-center gap-1.5">
                <ShoppingBag className="w-3 h-3 text-amber-600" />
                <span className="text-[9px] text-amber-700 font-bold">优惠券</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 滑块控制 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">负载模拟滑块</span>
          <span className="text-[10px] font-mono font-bold text-blue-600">{loadSlider}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={loadSlider}
          onChange={e => setLoadSlider(Number(e.target.value))}
          className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-blue-600"
          style={{ accentColor: '#2563eb' }}
        />
        <div className="flex items-center justify-between mt-2">
          {[{ label: '空闲', color: 'emerald' }, { label: '拥挤', color: 'amber' }, { label: '极度', color: 'rose' }].map(l => (
            <div key={l.label} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full bg-${l.color}-400`} />
              <span className="text-[8px] font-mono text-zinc-400">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 02: 脱机双向扫码过闸 + 先乘后付信用闭环 ────────────────────────

const offlineLogLines = [
  '> 设备初始化...',
  '> 检测到脱机运行模式（网络不可达）',
  '> 启用脱机双向非对称加密核验',
  '> 生成一次性动态令牌序列...',
  '> 扫码成功 → 解密验签通过',
  '> 信用预授权记账完成（后付模式）',
  '> 闸机指令：OPEN_PASS → 放行',
];

function OfflineGateSandbox() {
  const [isOffline, setIsOffline] = useState(false);
  const [gateState, setGateState] = useState<'locked' | 'open'>('locked');
  const [showQR, setShowQR] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [logVisible, setLogVisible] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const runLog = useCallback((lines: string[]) => {
    setLogs([]);
    setLogVisible(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLogs(prev => [...prev, lines[prev.length] || '']);
      if (count >= lines.length) clearInterval(interval);
    }, 280);
    return interval;
  }, []);

  useEffect(() => {
    if (logs.length < 7) {
      const t = setTimeout(() => setLogVisible(v => v + 1), 280);
      return () => clearTimeout(t);
    }
  }, [logs.length]);

  const handleToggleOffline = () => {
    setIsOffline(o => !o);
    if (!isOffline) {
      // Switching to offline mode
    }
  };

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowQR(true);
    setGateState('locked');
    setLogs([]);

    const lines = isOffline
      ? offlineLogLines
      : [
          '> 检测到在线模式（网络正常）',
          '> 实时联机扫码核验...',
          '> 身份认证通过',
          '> 闸机指令：OPEN_PASS → 放行',
        ];

    runLog(lines);
    setTimeout(() => {
      setGateState('open');
      setIsScanning(false);
    }, lines.length * 280 + 200);
  };

  const qrRefreshLabel = isOffline ? '脱机模式 · 每30s刷新' : '在线模式 · 实时同步';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：手机端乘车码 */}
      <div className="space-y-3">
        {/* 离线模式标签 */}
        <div className="flex items-center justify-between">
          <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border transition-colors ${
            isOffline
              ? 'bg-amber-50 border-amber-300 text-amber-600'
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          }`}>
            {isOffline ? '⚡ 离线脱机运行模式' : '🟢 在线联机模式'}
          </span>
          <span className="text-[8px] font-mono text-zinc-400">{qrRefreshLabel}</span>
        </div>

        {/* 手机卡片 */}
        <div className="rounded-2xl border-2 border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-blue-600 px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white">智慧出行 · 乘车码</span>
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber-300 animate-pulse' : 'bg-emerald-300'}`} />
              <span className="text-[8px] text-blue-200 font-mono">{isOffline ? 'OFFLINE' : 'ONLINE'}</span>
            </div>
          </div>

          {/* 二维码区域 */}
          <div
            className="mx-4 my-4 bg-white rounded-xl border border-zinc-200 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-400 transition-colors"
            onClick={handleScan}
          >
            {/* CSS 格子模拟二维码 */}
            <div className="grid grid-cols-11 gap-[2px] mb-3">
              {Array.from({ length: 121 }).map((_, i) => {
                const colors = ['bg-zinc-900', 'bg-white'];
                const seed = (i * 7 + (isOffline ? 3 : 11)) % 5 === 0 ? 'bg-zinc-900' : 'bg-white';
                const isCorner = (i < 22 && (i % 11 < 4)) || (i >= 99 && (i % 11 < 4));
                const isPositionMarker = isCorner;
                return (
                  <React.Fragment key={i}>
                    <div
                      className={`w-2 h-2 ${isPositionMarker ? 'bg-zinc-900' : seed}`}
                      style={isPositionMarker ? { borderRadius: i < 11 ? '2px 0 0 0' : i < 22 ? '0 2px 0 0' : i >= 99 && i % 11 < 4 ? '0 0 0 2px' : '0' } : {}}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            <span className="text-[8px] text-zinc-400 font-mono">{isScanning ? '核验中...' : '点击模拟扫码'}</span>
          </div>

          {/* 信用角标 */}
          <div className="mx-4 mb-4 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <div>
              <div className="text-[9px] font-bold text-emerald-700">CREDIT_EXCELLENT</div>
              <div className="text-[7px] text-emerald-500 font-mono">后付信用 · 预授权记账</div>
            </div>
          </div>

          {/* 切换按钮 */}
          <div className="px-4 pb-4">
            <button
              onClick={handleToggleOffline}
              className={`w-full py-2 rounded-xl text-[9px] font-bold font-mono transition-all border cursor-pointer ${
                isOffline
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {isOffline ? '→ 切换至在线联机模式' : '→ 切换至手机完全断网状态'}
            </button>
          </div>
        </div>
      </div>

      {/* 右侧：闸机硬件组态 */}
      <div className="space-y-3">
        {/* 闸机状态 */}
        <div className={`rounded-2xl border-2 p-6 flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
          gateState === 'open'
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
            gateState === 'open' ? 'bg-emerald-100' : 'bg-red-100'
          }`}>
            {gateState === 'open' ? (
              <Unlock className={`w-10 h-10 ${gateState === 'open' ? 'text-emerald-600' : 'text-red-500'}`} />
            ) : (
              <Lock className="w-10 h-10 text-red-500" />
            )}
          </div>
          <div className={`text-[14px] font-black font-mono ${gateState === 'open' ? 'text-emerald-700' : 'text-red-700'}`}>
            {gateState === 'open' ? 'OPEN_PASS' : 'LOCKED_CLOSE'}
          </div>
          <div className={`text-[9px] font-mono ${gateState === 'open' ? 'text-emerald-600' : 'text-red-500'}`}>
            {gateState === 'open' ? '闸门开启 · 请快速通行' : '闸门关闭 · 等待扫码'}
          </div>
        </div>

        {/* 打字机日志 */}
        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Loader2 className="w-3 h-3 text-zinc-500 animate-spin" />
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">offlineVerificationLog</span>
          </div>
          <div className="space-y-1" ref={logRef}>
            {logs.slice(0, logVisible).map((line, i) => (
              <React.Fragment key={i}>
                <div className="text-[9px] font-mono text-emerald-400 leading-relaxed">{line}</div>
              </React.Fragment>
            ))}
            {logs.length === 0 && !isScanning && (
              <div className="text-[9px] font-mono text-zinc-600 italic">等待扫码触发...</div>
            )}
            {isScanning && logs.length < offlineLogLines.length && (
              <div className="text-[9px] font-mono text-zinc-500 animate-pulse">处理中...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 03: 2.5D 蓝牙信标站内导航 + Geo-fencing 商业下钻 ───────────────

type NavTarget = 'toilet' | 'exitA' | 'transfer' | 'mall';
type ViewLayer = 'ground' | 'b1';

const targetOptions: { id: NavTarget; label: string }[] = [
  { id: 'toilet', label: '洗手间' },
  { id: 'exitA', label: 'A号出入口' },
  { id: 'transfer', label: '换乘10号线连廊' },
  { id: 'mall', label: '周边美食商圈' },
];

function NavSandbox() {
  const [selectedTarget, setSelectedTarget] = useState<NavTarget>('mall');
  const [viewLayer, setViewLayer] = useState<ViewLayer>('ground');
  const [showRoute, setShowRoute] = useState(false);

  const handleSelect = (target: NavTarget) => {
    setSelectedTarget(target);
    setShowRoute(false);
    if (target === 'mall') {
      setTimeout(() => {
        setViewLayer('b1');
        setTimeout(() => setShowRoute(true), 300);
      }, 200);
    } else {
      setViewLayer('ground');
      setTimeout(() => setShowRoute(true), 200);
    }
  };

  const isMall = selectedTarget === 'mall';
  const layerColor = viewLayer === 'b1' ? 'amber' : 'blue';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：2.5D 站内拓扑图 */}
      <div className="space-y-3">
        {/* 层切换标签 */}
        <div className="flex items-center gap-2">
          <span className={`text-[8px] font-mono font-bold px-2 py-1 rounded-full border transition-colors ${
            viewLayer === 'ground' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-zinc-100 border-zinc-200 text-zinc-400'
          }`}>B1层 · 站台</span>
          <span className={`text-[8px] font-mono font-bold px-2 py-1 rounded-full border transition-colors ${
            viewLayer === 'b1' ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-zinc-100 border-zinc-200 text-zinc-400'
          }`}>B2层 · 商业街</span>
        </div>

        {/* 2.5D 拓扑图 */}
        <div className={`rounded-2xl border-2 p-4 transition-all duration-500 relative overflow-hidden ${
          viewLayer === 'b1' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
        }`} style={{ minHeight: 280 }}>
          {/* 模拟2.5D站点结构 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewLayer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
              style={{ height: 240 }}
            >
              {/* 站台 */}
              <div className={`absolute left-4 right-4 top-16 h-20 rounded-xl border-2 flex items-center justify-center ${
                viewLayer === 'b1' ? 'bg-amber-100 border-amber-300' : 'bg-blue-100 border-blue-300'
              }`}>
                <span className={`text-[10px] font-bold font-mono ${viewLayer === 'b1' ? 'text-amber-700' : 'text-blue-700'}`}>
                  {viewLayer === 'b1' ? 'B1 商业走廊' : '站台层 B1'}
                </span>
              </div>

              {/* 轨道 */}
              <div className="absolute left-0 right-0 top-10 h-1 bg-zinc-300" />

              {/* A口/B口标注 */}
              <div className="absolute left-4 top-4 w-8 h-8 bg-zinc-200 border-2 border-zinc-400 rounded-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-zinc-600">A口</span>
              </div>
              <div className="absolute right-4 top-4 w-8 h-8 bg-zinc-200 border-2 border-zinc-400 rounded-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-zinc-600">B口</span>
              </div>

              {/* 乘客当前位置（Beacon打点） */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center z-10"
              >
                <Radio className="w-3 h-3 text-white" />
              </motion.div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />

              {/* 洗手间 */}
              <div className="absolute right-6 bottom-6 w-8 h-8 bg-zinc-100 border border-zinc-300 rounded-xl flex items-center justify-center">
                <span className="text-[7px] font-mono text-zinc-500">WC</span>
              </div>

              {/* 商家热点 */}
              <div className="absolute left-4 bottom-6 w-8 h-8 bg-amber-100 border border-amber-300 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              </div>

              {/* 导航路线 */}
              {showRoute && (
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute left-1/2 top-1/2 ${
                    isMall ? 'left-6 bottom-6' : 'right-6 top-4'
                  } w-2 h-24 border-l-2 border-dashed ${
                    isMall ? 'border-amber-500' : 'border-blue-500'
                  } rounded-full`}
                  style={{ left: isMall ? 32 : undefined, right: isMall ? undefined : 32, borderLeft: isMall ? '2px dashed #f59e0b' : undefined, borderRight: !isMall ? '2px dashed #3b82f6' : undefined, borderTop: 'none', borderBottom: 'none' }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 目标选择器 */}
        <div className="grid grid-cols-2 gap-2">
          {targetOptions.map(t => (
            <React.Fragment key={t.id}>
              <button
                onClick={() => handleSelect(t.id)}
                className={`py-2 px-3 rounded-xl text-[9px] font-bold font-mono border transition-all cursor-pointer ${
                  selectedTarget === t.id
                    ? t.id === 'mall'
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                {t.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 右侧：Geo-fencing 商圈商业卡片 */}
      <div className="space-y-3">
        <div className={`rounded-2xl border-2 p-4 ${isMall ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 bg-zinc-50'}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className={`w-4 h-4 ${isMall ? 'text-amber-600' : 'text-zinc-400'}`} />
            <span className={`text-[10px] font-bold font-mono ${isMall ? 'text-amber-700' : 'text-zinc-500'}`}>
              {isMall ? 'GEO-FENCING 商业推荐' : '选择目标查看推荐'}
            </span>
          </div>

          {isMall ? (
            <div className="space-y-3">
              {/* 商家卡片 */}
              <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg">🍔</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-black text-zinc-900">麦当劳</div>
                    <div className="text-[9px] text-zinc-400 font-mono">金台路站 B1 层地下商铺</div>
                    <div className="mt-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                      <div className="text-[10px] font-bold text-amber-800">行程预测推荐</div>
                      <div className="text-[9px] text-amber-600 font-mono mt-0.5">临街热咖啡限时领券 仅 ¥5.5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[9px] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                  <ShoppingCart className="w-3 h-3" />
                  一键点餐
                </button>
                <button className="bg-amber-50 border border-amber-300 text-amber-700 text-[9px] font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer">
                  <Navigation className="w-3 h-3" />
                  到店自取
                </button>
              </div>

              {/* 推荐理由 */}
              <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200">
                <div className="text-[8px] font-mono text-zinc-400 mb-1">系统推荐理由</div>
                <div className="text-[9px] text-zinc-600 leading-relaxed">
                  基于您的 O-D 轨迹预测（目的地：国贸商圈）与站内 Geo-fencing 物理围栏围栏触发，结合历史消费偏好分析，您最可能在出站后 15 分钟内经过此商家。
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
              <p className="text-[9px] text-zinc-400 font-mono">选择「周边美食商圈」查看商业推荐</p>
            </div>
          )}
        </div>

        {/* Beacon 定位精度 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[9px] font-bold text-blue-700 font-mono">蓝牙 Beacon 定位</span>
          </div>
          <div className="text-[8px] text-blue-500 font-mono">
            精度：<span className="font-bold">±0.5m</span> · 定位方式：双向到达时间差（TDoA）算法
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function MaaSAppDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ═══ 区块0：顶部大框 ═══ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600">
            MAAS SYSTEM v1.0 · MOBILITY AS A SERVICE PLATFORM
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">智慧出行 APP</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          面向千万级城市客流体量打造的 MaaS 一体化大出行移动服务平台。打破传统城市轨道交通与多维商圈壁垒，通过车地数据 WebSocket 秒级同频、三色热力引导分流与 Geo-fencing 商业变现，构建「数据中枢-产品触角-时序响应-变现管道」服务闭环。
        </p>
      </div>

      {/* ═══ 区块1：标签行 ═══ */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        {/* Chips 行 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术标签</span>
          {['MaaS一体化大出行', '车厢三色热力图', '蓝牙信标双向定位', '脱机二维码防伪', '后付信用状态机'].map(tag => (
            <React.Fragment key={tag}>
              <span className="bg-blue-50 text-blue-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-blue-200">
                {tag}
              </span>
            </React.Fragment>
          ))}
        </div>
        {/* 指标行 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 核心指标</span>
          {[
            { label: '流转跨端协同效率', value: '3端联动' },
            { label: '引导预测精细粒度', value: '单个车厢' },
            { label: '月台高峰滞留削减', value: '20.0%' },
            { label: '信息触达交互体验', value: '全局无感' },
          ].map(m => (
            <React.Fragment key={m.label}>
              <span className="border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
                {m.label} <span className="font-mono text-blue-600">{m.value}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══ 区块2：系统架构四层卡片 ═══ */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block pl-0.5">
          // 02 系统架构 / 四层服务矩阵
        </span>
        <ArchitectureCard />
      </div>

      <SectionDivider />

      {/* ═══ 沙盒 01 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="01" label="MaaS 首页与红黄蓝车厢拥挤度动态" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <CrowdHeatmapSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ 沙盒 02 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="02" label="脱机双向扫码过闸与先乘后付账务信用闭环" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <OfflineGateSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ 沙盒 03 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="03" label="2.5D 蓝牙信标站内导航与 Geo-fencing 商业下钻" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <NavSandbox />
        </div>
      </div>
    </>
  );
}
