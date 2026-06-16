/**
 * 地铁综合感知系统（IPSS）— 详情页
 * 配色：翡翠绿 + 深空灰（emerald/teal，危险 red/rose，安全 emerald，警告 amber）
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Cpu, Brain, Radio, MonitorSmartphone,
  AlertTriangle, ChevronRight, Zap, Activity,
  Wifi, WifiOff, Clock, CheckCircle2, Circle,
  X, Play, Pause, RotateCcw, Shield, Layers,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────
const COLORS = {
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200',
    300: 'border-emerald-300', 400: 'text-emerald-400', 500: 'text-emerald-500',
    600: 'text-emerald-600', 700: 'text-emerald-700', 800: 'text-emerald-800',
    bg: 'bg-emerald-50', border: 'border-emerald-200',
  },
  rose: {
    50: 'bg-rose-50', 100: 'bg-rose-100', 200: 'border-rose-200',
    500: 'text-rose-500', 600: 'text-rose-600', 700: 'text-rose-700',
    bg: 'bg-rose-50', border: 'border-rose-200',
  },
  amber: {
    50: 'bg-amber-50', 100: 'bg-amber-100', 200: 'border-amber-200',
    500: 'text-amber-500', 600: 'text-amber-600',
    bg: 'bg-amber-50', border: 'border-amber-200',
  },
  zinc: {
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200',
    400: 'text-zinc-400', 500: 'text-zinc-500', 600: 'text-zinc-600',
    700: 'text-zinc-700', 800: 'text-zinc-800', 900: 'text-zinc-900',
  },
  dark: 'bg-[#0A0A0C]',
};

// ─── Shared Components ───────────────────────────────────────────────────────

const PulseDot = ({ color = 'emerald' }: { color?: string }) => (
  <div className={`h-1.5 w-1.5 rounded-full bg-${color}-500 animate-pulse`} />
);

const SandboxHeader = ({ num, label, color = 'emerald' }: { num: string; label: string; color?: string }) => (
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

const ChipBadge = ({ text }: { text: string }) => (
  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
    {text}
  </span>
);

const MetricBadge = ({ label, value }: { label: string; value: string }) => (
  <span className="border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
    {label} <span className="font-mono text-emerald-600">{value}</span>
  </span>
);

// ─── Section 2: System Architecture Cards ──────────────────────────────────

const archLayers = [
  {
    icon: Eye,
    label: '端侧异构多源感知层',
    subtitle: '视频流 + 传感器 + 重量测点',
    desc: '全面整合车厢、月台全量高清视频流，高吞吐并接各类传感器及重量测点时序数据，空间网格化捕捉客流密度与设备姿态。',
    color: 'emerald',
  },
  {
    icon: Cpu,
    label: '边侧高并发智能推理层',
    subtitle: '3 秒边缘判定',
    desc: '通过部署于车载及车站的边缘智能计算网关，加载地铁封闭空间定制深度神经网络模型，3 秒内完成本地数据降噪与个体/群体异常行为边缘判定。',
    color: 'emerald',
  },
  {
    icon: Brain,
    label: '云侧 AI 大脑与 SOP 编排层',
    subtitle: '5 秒 SOP 自动生成',
    desc: '核心控制中台统一承接边侧透传的结构化事件荷载，5 秒内根据预设业务逻辑，自动化组装并生成符合国标指引的标准应急预案（SOP）数据流。',
    color: 'emerald',
  },
  {
    icon: MonitorSmartphone,
    label: '多端异步实时协同层',
    subtitle: 'WebSocket 全端联动',
    desc: '基于 WebSocket 长连接状态机，打通 OCC 控制中心大屏、站台维保移动端与车厢/站台高清多媒体显示终端的数据链路，实现全端预警、多端联动。',
    color: 'emerald',
  },
];

function ArchitectureSection() {
  return (
    <div className="space-y-4">
      {/* 2×2 网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {archLayers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <div
              key={idx}
              className="group relative p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-800">{layer.label}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold bg-emerald-100 text-emerald-700">
                      {layer.subtitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 数据流底栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
            全链路数据流 / 云-边-端协同闭环
          </span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {[
            { label: '多源传感器/视频', icon: Eye },
            { label: '边缘CV推理(3s)', icon: Cpu },
            { label: '事件Payload透传', icon: Zap },
            { label: 'AI大脑SOP编排(5s)', icon: Brain },
            { label: 'WebSocket多端下发', icon: Radio },
            { label: 'OCC/移动端响应', icon: MonitorSmartphone },
          ].map((node, idx) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.label}>
                <div className="shrink-0 flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 min-w-[80px]">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[8px] font-bold text-zinc-600 whitespace-nowrap">{node.label}</span>
                </div>
                {idx < 5 && (
                  <ChevronRight className="shrink-0 w-3 h-3 text-zinc-300" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 01: 车厢异常行为捕获与 OCC 秒级联动 ──────────────────────────

function PanicBehaviorSandbox() {
  const [triggered, setTriggered] = useState(false);
  const [phase, setPhase] = useState(0); // 0=idle, 1=detecting, 2=sop, 3=dispatched
  const [countdown, setCountdown] = useState(8);
  const [logs, setLogs] = useState<Array<{ time: string; text: string; color: string }>>([]);

  const addLog = useCallback((text: string, color: string) => {
    const now = new Date();
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}:${String(now.getMilliseconds()).slice(0, 2).padStart(2, '0')}`;
    setLogs(prev => [...prev.slice(-5), { time: timeStr, text, color }]);
  }, []);

  const handleTrigger = useCallback(() => {
    if (triggered) {
      setTriggered(false);
      setPhase(0);
      setCountdown(8);
      setLogs([]);
      return;
    }
    setTriggered(true);
    setLogs([]);
    addLog('边缘网关触发 CV 推理...', 'emerald');

    setTimeout(() => {
      setPhase(1);
      addLog('异常行为判定：群体恐慌性四散 · 置信度 0.97', 'rose');
    }, 600);

    setTimeout(() => {
      setPhase(2);
      addLog('SOP 已自动编排完成，透传至云侧 AI 大脑', 'emerald');
    }, 1500);

    setTimeout(() => {
      setPhase(3);
      addLog('WebSocket 已推送至 OCC 大屏 & 移动端', 'emerald');
    }, 2800);
  }, [triggered, addLog]);

  useEffect(() => {
    if (!triggered || phase < 3) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [triggered, phase]);

  // Key points for skeleton visualization
  const keyPoints = [
    { id: 'head', cx: 50, cy: 30, r: 6 },
    { id: 'neck', cx: 50, cy: 44, r: 3 },
    { id: 'lshoulder', cx: 36, cy: 52, r: 4 },
    { id: 'rshoulder', cx: 64, cy: 52, r: 4 },
    { id: 'lelbow', cx: 28, cy: 65, r: 3 },
    { id: 'relbow', cx: 72, cy: 65, r: 3 },
    { id: 'lhand', cx: 22, cy: 78, r: 3 },
    { id: 'rhand', cx: 78, cy: 78, r: 3 },
    { id: 'lhip', cx: 42, cy: 68, r: 3 },
    { id: 'rhip', cx: 58, cy: 68, r: 3 },
    { id: 'lknee', cx: 40, cy: 84, r: 3 },
    { id: 'rknee', cx: 60, cy: 84, r: 3 },
    { id: 'lfoot', cx: 38, cy: 98, r: 3 },
    { id: 'rfoot', cx: 62, cy: 98, r: 3 },
  ];

  const connections = [
    ['head', 'neck'], ['neck', 'lshoulder'], ['neck', 'rshoulder'],
    ['lshoulder', 'lelbow'], ['rshoulder', 'relbow'],
    ['lelbow', 'lhand'], ['relbow', 'rhand'],
    ['neck', 'lhip'], ['neck', 'rhip'],
    ['lhip', 'lknee'], ['rhip', 'rknee'],
    ['lknee', 'lfoot'], ['rknee', 'rfoot'],
  ];

  return (
    <div className="space-y-4">
      {/* 控制台顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              天枢应急响应指挥大盘 · 06024号车
            </span>
          </div>
          <div className="flex items-center gap-2">
            {triggered ? (
              <span className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-lg font-bold bg-red-50 text-red-600 border border-red-200 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                紧急响应中
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[9px] px-2.5 py-1 rounded-lg font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ROUTINE_MONITORING
              </span>
            )}
            <button
              onClick={handleTrigger}
              className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                triggered
                  ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                  : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              }`}
            >
              {triggered ? '重置' : '模拟车厢发生恐慌性四散群体行为'}
            </button>
          </div>
        </div>
      </div>

      {/* 左：监控流 SVG | 右：OCC 响应台 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：模拟车载监控流（车厢俯视图 + 人体关键点网格） */}
        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              CARRIAGE SURVEILLANCE · 04号车厢
            </span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] font-mono text-red-400">LIVE</span>
            </div>
          </div>

          {/* 车厢矩形框 */}
          <div className="relative w-full aspect-[16/9] bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden mb-3">
            {/* 车厢墙 */}
            <div className="absolute inset-0 opacity-20">
              {[0.25, 0.5, 0.75].map(p => (
                <div key={p} className="absolute top-0 bottom-0 w-px bg-zinc-600" style={{ left: `${p * 100}%` }} />
              ))}
            </div>

            {/* 人体关键点 SVG */}
            <svg
              viewBox="0 0 100 120"
              className="absolute inset-0 w-full h-full"
              style={{ opacity: triggered ? (phase >= 1 ? 0.9 : 0.4) : 0.4 }}
            >
              {/* 连接线 */}
              {connections.map(([a, b], i) => {
                const from = keyPoints.find(p => p.id === a);
                const to = keyPoints.find(p => p.id === b);
                if (!from || !to) return null;
                const color = triggered && phase >= 1 ? '#f43f5e' : '#34d399';
                return (
                  <line
                    key={i}
                    x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
                    stroke={color}
                    strokeWidth={triggered && phase >= 1 && i > 3 ? 1.5 : 1}
                    opacity={triggered && phase >= 1 ? 0.8 : 0.5}
                  />
                );
              })}
              {/* 关键点 */}
              {keyPoints.map((pt) => {
                const isTriggered = triggered && phase >= 1;
                const color = isTriggered ? '#f43f5e' : '#34d399';
                return (
                  <circle
                    key={pt.id}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={pt.r}
                    fill={color}
                    opacity={isTriggered ? 1 : 0.7}
                    className={isTriggered ? 'animate-pulse' : ''}
                  />
                );
              })}
            </svg>

            {/* 粒子效果（触发后） */}
            {triggered && phase >= 1 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-rose-400"
                    initial={{ left: '50%', top: '40%' }}
                    animate={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            )}

            {/* 叠加文字 */}
            <div className="absolute bottom-2 right-2 text-[7px] font-mono text-zinc-500">
              06024-04 · 15:32:08
            </div>
          </div>

          {/* 状态行 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-zinc-500 uppercase">Mode</span>
              <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${triggered ? 'bg-red-900 text-red-300' : 'bg-emerald-900 text-emerald-300'}`}>
                {triggered ? 'ALERT' : 'NORMAL'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-zinc-500 uppercase">CV Inference</span>
              <span className={`text-[8px] font-mono ${triggered && phase >= 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {triggered && phase >= 1 ? '群体异常行为-恐慌四散 (0.97)' : '持续监测中...'}
              </span>
            </div>
          </div>
        </div>

        {/* 右侧：OCC 调度响应台 */}
        <div className="space-y-3">
          {/* 事件信息卡 */}
          <AnimatePresence>
            {triggered && phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 rounded-2xl p-4 border-2 border-red-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-red-700">事件信息卡</span>
                </div>
                <div className="bg-white rounded-xl p-3 border border-red-100 space-y-1.5">
                  {[
                    { label: 'eventId', value: 'IPSS-EVENT-2026-009' },
                    { label: '车次', value: '06024号车' },
                    { label: '车厢', value: '04车厢' },
                    { label: '事件类型', value: '群体异常行为-恐慌四散' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-[10px]">
                      <span className="text-zinc-400 font-mono">{item.label}</span>
                      <span className="text-red-600 font-bold font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SOP 步骤 */}
          <AnimatePresence>
            {triggered && phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700">自动化 SOP 步骤（5秒内生成）</span>
                </div>
                <div className="space-y-2">
                  {[
                    { num: 'SOP-1', text: 'OCC 调度员确认事件，广播列车司机执行车厢广播安抚' },
                    { num: 'SOP-2', text: '自动通知前方站站台维保人员就位，做好接应准备' },
                    { num: 'SOP-3', text: '视频数据推送公安系统，同步留档存证' },
                  ].map((step, i) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 300 }}
                      className="flex items-start gap-2 p-2.5 bg-white rounded-xl border border-emerald-100"
                    >
                      <span className="shrink-0 text-[8px] font-mono font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                        {step.num}
                      </span>
                      <span className="text-[10px] text-zinc-700 leading-relaxed">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 8秒倒计时进度条 */}
          <AnimatePresence>
            {triggered && phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">全链路响应倒计时</span>
                  <span className="text-lg font-mono font-bold text-emerald-600">{countdown}s</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(countdown / 8) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[7px] font-mono text-emerald-600">8s 黄金响应窗口</span>
                  <span className={`text-[7px] font-mono ${countdown <= 3 ? 'text-rose-500 font-bold' : 'text-zinc-400'}`}>
                    {countdown <= 0 ? '✓ 全链路已闭环' : '响应中...'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 事件日志 */}
          {logs.length > 0 && (
            <div className="bg-[#0A0A0C] rounded-xl p-3 border border-zinc-800">
              <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Event Log</div>
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-[8px] font-mono">
                    <span className="text-zinc-600 shrink-0">{log.time}</span>
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-0.5 ${
                      log.color === 'rose' ? 'bg-rose-400' : 'bg-emerald-400'
                    }`} />
                    <span className={log.color === 'rose' ? 'text-rose-300' : 'text-emerald-300'}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!triggered && (
            <div className="text-[9px] text-zinc-300 text-center py-6 font-mono">
              点击上方按钮模拟车厢异常行为触发...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 02: 终点站自动清客检测 ────────────────────────────────────────

function ClearanceSandbox() {
  const [triggered, setTriggered] = useState(false);
  const [carriages, setCarriages] = useState<Array<{ num: string; status: 'clear' | 'alert' }>>(
    Array.from({ length: 8 }, (_, i) => ({ num: String(i + 1).padStart(2, '0'), status: 'clear' }))
  );
  const [showResult, setShowResult] = useState(false);

  const handleTrigger = () => {
    if (triggered) {
      setTriggered(false);
      setShowResult(false);
      setCarriages(Array.from({ length: 8 }, (_, i) => ({ num: String(i + 1).padStart(2, '0'), status: 'clear' })));
      return;
    }
    setTriggered(true);
    setTimeout(() => {
      setCarriages(prev => prev.map(c => c.num === '04' ? { ...c, status: 'alert' } : c));
      setShowResult(true);
    }, 800);
  };

  return (
    <div className="space-y-4">
      {/* 顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              终点站 AI 清客检测 · 06024次列车
            </span>
          </div>
          <button
            onClick={handleTrigger}
            className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
              triggered
                ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            {triggered ? '重置' : '启动全车 AI 终点清客检测'}
          </button>
        </div>
      </div>

      {/* 左：8 节车厢横向拓扑 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="text-[9px] font-mono text-zinc-500 uppercase mb-3">车厢清客状态拓扑</div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {carriages.map((c) => (
            <div
              key={c.num}
              className={`shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all duration-500 ${
                c.status === 'alert'
                  ? 'bg-rose-50 border-rose-400 animate-pulse'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <span className={`text-[11px] font-mono font-bold ${
                c.status === 'alert' ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {c.num}
              </span>
              <span className={`text-[7px] font-mono ${
                c.status === 'alert' ? 'text-rose-500' : 'text-emerald-500'
              }`}>
                {c.status === 'alert' ? '异常' : '已清空'}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[7px] font-mono text-emerald-600">已清空</span>
          <div className="h-1.5 w-1.5 rounded-full bg-rose-400 ml-3" />
          <span className="text-[7px] font-mono text-rose-500">异常/滞留</span>
        </div>
      </div>

      {/* 右：清客任务流管理表格 */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
          >
            <div className="bg-zinc-50 px-4 py-2.5 border-b border-zinc-100">
              <span className="text-[10px] font-bold text-zinc-700">清客任务流管理</span>
            </div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100 text-zinc-400 uppercase">
                  {['车厢编号', '检测项', '识别置信度', '在途指派动作'].map(h => (
                    <th key={h} className="text-left px-3 py-2 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100 bg-rose-50">
                  <td className="px-3 py-2 font-mono font-bold text-rose-600">04车厢</td>
                  <td className="px-3 py-2 text-zinc-700">乘客滞留+遗留物品</td>
                  <td className="px-3 py-2 font-mono font-bold text-emerald-600">98.4%</td>
                  <td className="px-3 py-2 text-zinc-700">
                    <span className="text-amber-600 font-bold">任务已派发至巡检组马师傅移动端</span>
                  </td>
                </tr>
                {[...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-zinc-100 text-zinc-400">
                    <td className="px-3 py-2 font-mono">0{2 + i}车厢</td>
                    <td className="px-3 py-2">—</td>
                    <td className="px-3 py-2 font-mono text-emerald-500">PASS</td>
                    <td className="px-3 py-2">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {!triggered && (
        <div className="text-[9px] text-zinc-300 text-center py-4 font-mono">
          点击按钮启动 AI 清客检测...
        </div>
      )}
    </div>
  );
}

// ─── Sandbox 03: DMS 疲劳监测与反误报 ──────────────────────────────────────

function DMSFatigueSandbox() {
  const [fatigue, setFatigue] = useState(20);
  const [logs, setLogs] = useState<Array<{ time: string; event: string; filter: string; action: string }>>([]);
  const [displayedText, setDisplayedText] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logTemplates = [
    { event: '面部关键点采集', filter: '第1阶段：面部肌肉拓扑校验通过', action: '持续监测' },
    { event: 'PERCLOS 闭眼时长检测', filter: '第2阶段：多帧时序特征验证通过', action: '持续监测' },
    { event: '疑似疲劳风险上升', filter: '反误报：转头动作排除', action: '告警抑制' },
    { event: '真实疲劳确认', filter: '两阶段全部通过', action: '触发 DMS 弹屏报警' },
    { event: 'OCC 联动推送', filter: '任务已派发司机小屏', action: '联动已完成' },
  ];

  const typeLog = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText('');
    let i = 0;
    timerRef.current = setTimeout(function tick() {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        timerRef.current = setTimeout(tick, 30);
      }
    }, 30);
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Face mesh SVG key points
  const facePoints = [
    // outline
    { cx: 50, cy: 10, r: 2, group: 'outline' },
    { cx: 42, cy: 8, r: 1.5, group: 'outline' },
    { cx: 58, cy: 8, r: 1.5, group: 'outline' },
    { cx: 35, cy: 16, r: 1.5, group: 'outline' },
    { cx: 65, cy: 16, r: 1.5, group: 'outline' },
    { cx: 28, cy: 26, r: 1.5, group: 'outline' },
    { cx: 72, cy: 26, r: 1.5, group: 'outline' },
    // left eye
    { cx: 42, cy: 26, r: 2.5, group: 'leye' },
    { cx: 42, cy: 26, r: 1.2, group: 'leye_pupil' },
    // right eye
    { cx: 58, cy: 26, r: 2.5, group: 'reye' },
    { cx: 58, cy: 26, r: 1.2, group: 'reye_pupil' },
    // nose
    { cx: 50, cy: 34, r: 1.5, group: 'nose' },
    // mouth - animated based on fatigue
    { cx: 44, cy: 42, r: 1.5, group: 'mouth' },
    { cx: 56, cy: 42, r: 1.5, group: 'mouth' },
    { cx: 50, cy: 44, r: 1.5, group: 'mouth' },
    // jaw
    { cx: 50, cy: 50, r: 1.5, group: 'jaw' },
  ];

  const isHighRisk = fatigue >= 70;
  const isMediumRisk = fatigue >= 40 && fatigue < 70;
  const faceColor = isHighRisk ? '#f43f5e' : isMediumRisk ? '#f59e0b' : '#34d399';

  useEffect(() => {
    if (!isHighRisk) return;
    const entries = logTemplates.map((t, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev.slice(-4), {
          time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
          event: t.event,
          filter: t.filter,
          action: t.action,
        }]);
        typeLog(`${t.event}：${t.filter} → ${t.action}`);
      }, i * 800);
      return i;
    });
  }, [isHighRisk, typeLog]);

  return (
    <div className="space-y-4">
      {/* 顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              DMS 疲劳监测 · 司机面部关键点实时分析
            </span>
          </div>
          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-bold ${
            isHighRisk ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' :
            isMediumRisk ? 'bg-amber-50 text-amber-600 border border-amber-200' :
            'bg-emerald-50 text-emerald-600 border border-emerald-200'
          }`}>
            疲劳度 {fatigue}%
          </span>
        </div>
      </div>

      {/* 左：Face Mesh | 右：日志流 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：Face Mesh SVG */}
        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
            DRIVER FACE MESH · 实时关键点分析
          </div>
          <div className="relative">
            <svg viewBox="0 0 100 60" className="w-full">
              {/* Face outline */}
              <ellipse cx="50" cy="30" rx="28" ry="26" fill="none" stroke={faceColor} strokeWidth={1.5} opacity={0.3} />

              {facePoints.map((pt, i) => {
                const mouthPoints = ['mouth', 'mouth'];
                const isMouth = mouthPoints.includes(pt.group);
                // Animate mouth for high fatigue (yawning)
                const openAmount = isHighRisk ? 4 : isMediumRisk ? 2 : 0;
                let cx = pt.cx;
                let cy = pt.cy;
                if (pt.group === 'mouth' && pt.cx === 44) { cx -= openAmount; }
                if (pt.group === 'mouth' && pt.cx === 56) { cx += openAmount; }
                if (pt.group === 'mouth' && pt.cx === 50) { cy += isHighRisk ? 3 : 0; }

                if (pt.group === 'leye_pupil' || pt.group === 'reye_pupil') {
                  const parent = pt.group === 'leye_pupil' ? facePoints.find(p => p.group === 'leye') : facePoints.find(p => p.group === 'reye');
                  return (
                    <circle
                      key={i}
                      cx={parent ? parent.cx : pt.cx}
                      cy={parent ? (parent.cy + (isHighRisk ? 0.8 : 0)) : pt.cy}
                      r={pt.r}
                      fill={faceColor}
                      opacity={isHighRisk ? 0.8 : 0.9}
                      className={isHighRisk ? 'animate-pulse' : ''}
                    />
                  );
                }
                if (pt.group === 'leye' || pt.group === 'reye') {
                  // Eyes: close more when fatigued
                  const eyeHeight = isHighRisk ? 1 : isMediumRisk ? 1.5 : 2.5;
                  return (
                    <ellipse
                      key={i}
                      cx={pt.cx}
                      cy={pt.cy}
                      rx={pt.r}
                      ry={eyeHeight}
                      fill="none"
                      stroke={faceColor}
                      strokeWidth={1.5}
                      className={isHighRisk ? 'animate-pulse' : ''}
                    />
                  );
                }
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={pt.r}
                    fill={faceColor}
                    opacity={isHighRisk ? 0.9 : 0.7}
                    className={isHighRisk ? 'animate-pulse' : ''}
                  />
                );
              })}
            </svg>
          </div>

          {/* 疲劳度滑块 */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-zinc-500 uppercase">疲劳度</span>
              <span className={`text-[9px] font-mono font-bold ${
                isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {fatigue}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={fatigue}
              onChange={e => {
                setFatigue(Number(e.target.value));
                setLogs([]);
                setDisplayedText('');
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #34d399 ${fatigue}%, #3f3f46 ${fatigue}%)`,
              }}
            />
            <div className="flex justify-between text-[7px] font-mono text-zinc-600">
              <span>清醒</span>
              <span>轻度疲劳</span>
              <span>高度疲劳</span>
            </div>
          </div>

          {/* 反误报说明 */}
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <div className="text-[8px] font-mono text-zinc-600 uppercase mb-1.5">两阶段反误报过滤</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${fatigue < 70 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span className="text-[8px] font-mono text-zinc-400">阶段1: 面部肌肉拓扑校验</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${fatigue < 70 ? 'bg-emerald-400' : fatigue < 90 ? 'bg-amber-400' : 'bg-rose-400'}`} />
                <span className="text-[8px] font-mono text-zinc-400">阶段2: 多帧时序特征验证</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：事件日志流 */}
        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              DMS 事件日志流水
            </span>
          </div>
          <div className="space-y-1.5">
            {logs.length === 0 && !isHighRisk && (
              <div className="text-[9px] text-zinc-300 text-center py-6 font-mono">
                拖动左侧滑块至高位触发 DMS 事件日志...
              </div>
            )}
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2.5 rounded-xl border text-[9px] font-mono ${
                  log.action.includes('报警') || log.action.includes('已完成')
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : log.action.includes('抑制')
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'bg-white border-zinc-200 text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-400">{log.time}</span>
                  <span className={`px-1 py-0.5 rounded text-[7px] font-bold ${
                    log.action.includes('报警') ? 'bg-red-100 text-red-600' :
                    log.action.includes('抑制') ? 'bg-amber-100 text-amber-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {log.action}
                  </span>
                </div>
                <div className="text-zinc-700">{log.event}</div>
                <div className="text-zinc-400 mt-0.5 text-[8px]">{log.filter}</div>
              </motion.div>
            ))}
          </div>
          {/* 打字机效果文字 */}
          {displayedText && (
            <div className="mt-3 p-2.5 bg-[#0A0A0C] rounded-xl border border-zinc-800">
              <div className="text-[8px] font-mono text-zinc-500 uppercase mb-1">Typewriter</div>
              <div className="text-[9px] font-mono text-emerald-400">
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────

export function SubwayPerceptionDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ═══ Section 0: Header ═══ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            IPSS SYSTEM v1.0 · INTEGRATED PERCEPTION &amp; SAFETY SYSTEM
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">地铁综合感知系统（IPSS）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          云-边-端一体化边缘智能感知与跨端应急指挥协同平台。系统通过 3 秒内边缘判定、5 秒内自动生成结构化 SOP，将全链路协同响应时效极限压缩至 8 秒级，实现高危安全隐患 100% 毫秒级精准抓取。
        </p>
      </div>

      {/* ═══ Section 1: Tags Row ═══ */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        {/* 第一行：5 个 chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术栈</span>
          {['边缘智能CV计算网关', '场景多模态行为语义解析', '自动化应急SOP流程编排', '云边协同多终端动态联动', '分布式神经网络模型'].map((tag, i) => (
            <React.Fragment key={`chip-${i}`}><ChipBadge text={tag} /></React.Fragment>
          ))}
        </div>
        {/* 第二行：4 个效能指标 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '全链路应急协同', value: '8秒级' },
            { label: '边缘判定时效', value: '3秒内' },
            { label: 'SOP自动生成', value: '5秒' },
            { label: '高危事件抓取率', value: '100%' },
          ].map((m, i) => (
            <React.Fragment key={`metric-${i}`}><MetricBadge label={m.label} value={m.value} /></React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══ Section 2: 系统架构四层卡片 ═══ */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block">
          // 02 产品系统架构 / 云-边-端协同四层高内聚架构
        </span>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <ArchitectureSection />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 3: 沙盒 01 — 车厢异常行为捕获与 OCC 秒级联动 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="01" label="车厢异常行为捕获与 OCC 秒级联动" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <PanicBehaviorSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 4: 沙盒 02 — 终点站自动清客检测 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="02" label="终点站自动清客检测" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <ClearanceSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 5: 沙盒 03 — DMS 疲劳监测与反误报 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="03" label="DMS 疲劳监测与两阶段反误报过滤" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <DMSFatigueSandbox />
        </div>
      </div>
    </>
  );
}
