/**
 * 乘客异常行为识别系统 — 详情页
 * 配色：翡翠绿 + 危机红 + 深空灰
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video, Cpu, GitBranch, Radio, ChevronRight, Activity,
  AlertTriangle, Smartphone, MessageSquare, Shield, Eye,
  Users, Clock, ArrowRight, Zap, Wifi, Camera,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────

const COLORS = {
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200',
    300: 'border-emerald-300', 400: 'text-emerald-400', 500: 'text-emerald-500',
    600: 'text-emerald-600', 700: 'text-emerald-700', 800: 'text-emerald-800',
    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600',
  },
  amber: {
    50: 'bg-amber-50', 100: 'bg-amber-100', 200: 'border-amber-200',
    500: 'text-amber-500', 600: 'text-amber-600', 700: 'text-amber-700',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600',
  },
  red: {
    50: 'bg-red-50', 100: 'bg-red-100', 200: 'border-red-200',
    500: 'text-red-500', 600: 'text-red-600',
    bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600',
  },
  zinc: {
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200',
    300: 'border-zinc-300', 400: 'text-zinc-400', 500: 'text-zinc-500',
    600: 'text-zinc-600', 700: 'text-zinc-700', 900: 'bg-zinc-900',
    bg: 'bg-zinc-50', border: 'border-zinc-200', text: 'text-zinc-600',
  },
  dark: 'bg-[#0A0A0C]',
};

// ─── Shared Components ──────────────────────────────────────────────────────

const PulseDot = () => (
  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
);

const SandboxHeader = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
      // SANDBOX {num} / {label}
    </span>
    <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
      <PulseDot />
      <span>可交互演示</span>
    </div>
  </div>
);

// ─── Section 2: Architecture Cards ─────────────────────────────────────────

const archCards = [
  {
    icon: Video,
    label: '流数据接入层',
    subtitle: 'STREAM INGESTION',
    desc: '实时高吞吐并接全车厢及月台高清 RTSP/WebRTC 视频流，保障全量底层视觉要素秒级无感输入。',
    color: 'emerald' as const,
  },
  {
    icon: Cpu,
    label: '边缘行为解析层',
    subtitle: 'EDGE CV INFERENCE',
    desc: '部署重载边缘 NVR 智能网关，通过人体行为动力学及多帧滑动时间窗口，实现 3 秒内极速前哨判定。',
    color: 'sky' as const,
  },
  {
    icon: GitBranch,
    label: '状态机分级决策层',
    subtitle: 'STATE MACHINE',
    desc: '对结构化 Payload 进行意图深度拆解与危害度分级：ROUTINE / SUSPECTED / CRITICAL，实时激活业务状态机。',
    color: 'amber' as const,
  },
  {
    icon: Radio,
    label: '跨端业务触达层',
    subtitle: 'CROSS-DEVICE DELIVERY',
    desc: '基于 WebSocket 长连接，瞬间接管 OCC 大屏主视窗，秒级定向分发应急 SOP 工单至站台班长移动端。',
    color: 'emerald' as const,
  },
];

// ─── Section 3: Sandbox 01 — 暴力冲突 + OCC 大屏 ────────────────────────────

function Sandbox01() {
  const [triggered, setTriggered] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  useEffect(() => {
    if (!triggered) { setFlashCount(0); return; }
    const iv = setInterval(() => setFlashCount(c => c + 1), 400);
    return () => clearInterval(iv);
  }, [triggered]);

  const flashOn = triggered && flashCount % 2 === 0;

  const skeletonPoints = [
    { id: 'head', x: 50, y: 25 },
    { id: 'neck', x: 50, y: 35 },
    { id: 'l_shoulder', x: 35, y: 40 },
    { id: 'r_shoulder', x: 65, y: 40 },
    { id: 'l_elbow', x: 25, y: 55 },
    { id: 'r_elbow', x: 75, y: 50 },
    { id: 'l_wrist', x: 20, y: 65 },
    { id: 'r_wrist', x: 80, y: 45 },
    { id: 'spine', x: 50, y: 55 },
    { id: 'pelvis', x: 50, y: 65 },
    { id: 'l_hip', x: 40, y: 70 },
    { id: 'r_hip', x: 60, y: 68 },
    { id: 'l_knee', x: 38, y: 82 },
    { id: 'r_knee', x: 58, y: 85 },
    { id: 'l_ankle', x: 40, y: 95 },
    { id: 'r_ankle', x: 55, y: 95 },
    { id: 'nose', x: 50, y: 22 },
  ];

  const bones = [
    ['head', 'neck'], ['neck', 'l_shoulder'], ['neck', 'r_shoulder'],
    ['l_shoulder', 'l_elbow'], ['l_elbow', 'l_wrist'],
    ['r_shoulder', 'r_elbow'], ['r_elbow', 'r_wrist'],
    ['neck', 'spine'], ['spine', 'pelvis'],
    ['pelvis', 'l_hip'], ['pelvis', 'r_hip'],
    ['l_hip', 'l_knee'], ['l_knee', 'l_ankle'],
    ['r_hip', 'r_knee'], ['r_knee', 'r_ankle'],
  ];

  const pointMap = Object.fromEntries(skeletonPoints.map(p => [p.id, p]));

  const cells = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1).padStart(2, '0'),
    label: `${String(i + 1).padStart(2, '0')} 车`,
  }));

  const associatedPayload = {
    evt_id: 'UUID-a3f8e2c1',
    evt_type: 'VIOLENT_CONFLICT',
    confidence: 0.967,
    carriage_no: 3,
    severity: 'CRITICAL',
    ts: '2026-06-16T13:47:22.180Z',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SandboxHeader num="01" label="突发暴力冲突骨骼点捕获与 OCC 大屏强行全屏调图" />
      </div>
      <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
        {/* Trigger button */}
        <div className="mb-3 flex justify-end">
          <button
            onClick={() => setTriggered(!triggered)}
            className={`text-[11px] font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              triggered
                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            {triggered ? '重置场景' : '模拟车厢发生多人肢体暴力冲突'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: Skeleton viewport */}
          <div className="relative bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                MONITOR VIEWPORT / 车载监控视窗
              </span>
              <div className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${
                triggered ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {triggered ? 'CRITICAL_RED_FLASH' : 'NORMAL'}
              </div>
            </div>

            {/* Simulated camera viewport */}
            <div className="relative bg-zinc-900 rounded-xl border-2 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {/* Simulated carriage background */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 to-zinc-900/80" />

              {/* Bounding box */}
              <div
                className={`absolute rounded-lg border-2 transition-colors duration-200 ${
                  flashOn ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                }`}
                style={{ top: '10%', left: '15%', right: '15%', bottom: '10%' }}
              />

              {/* Skeleton bones */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {bones.map(([a, b], i) => {
                  const pa = pointMap[a];
                  const pb = pointMap[b];
                  if (!pa || !pb) return null;
                  return (
                    <React.Fragment key={`bone-${i}`}>
                      <line
                        x1={pa.x} y1={pa.y} x2={triggered ? pb.x + (Math.random() - 0.5) * 8 : pb.x}
                        y2={triggered ? pb.y + (Math.random() - 0.5) * 8 : pb.y}
                        stroke={flashOn ? '#ef4444' : '#10b981'}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity={triggered ? 0.9 : 0.7}
                      />
                    </React.Fragment>
                  );
                })}
                {skeletonPoints.map(p => (
                  <React.Fragment key={p.id}>
                    <circle
                      cx={p.x} cy={p.y} r="1.5"
                      fill={flashOn ? '#ef4444' : '#10b981'}
                      opacity={triggered ? 0.95 : 0.7}
                    />
                  </React.Fragment>
                ))}
              </svg>

              {/* Status overlay */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${triggered ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
                <span className={`text-[8px] font-mono font-bold ${triggered ? 'text-red-400' : 'text-emerald-400'}`}>
                  {triggered ? 'ANOMALY DETECTED' : 'SKELETON TRACKING ACTIVE'}
                </span>
              </div>
            </div>

            {/* Keypoint count */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[8px] font-mono text-zinc-600">17 KEYPOINTS TRACKED</span>
              <span className={`text-[8px] font-mono ${triggered ? 'text-red-400' : 'text-zinc-600'}`}>
                FPS: {triggered ? '~25' : '~30'}
              </span>
            </div>
          </div>

          {/* Right: OCC dispatch matrix */}
          <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                OCC DISPATCH MATRIX / 调度九宫格
              </span>
              <div className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${
                triggered ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {triggered ? 'ALERT ACTIVE' : 'STANDBY'}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {triggered ? (
                <motion.div
                  key="fullscreen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  {/* Full-screen 03 carriage */}
                  <div className="relative bg-red-950/30 border-2 border-red-500 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
                    <div className="absolute top-2 left-3 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-red-400">03 车 — CRITICAL</span>
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-red-400/60">LIVE FEED</div>

                    {/* Simulated conflict skeleton overlay */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="35" y1="30" x2="65" y2="35" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
                      <line x1="30" y1="40" x2="50" y2="50" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
                      <line x1="70" y1="45" x2="55" y2="55" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
                      <circle cx="35" cy="30" r="3" fill="#ef4444" opacity="0.5" />
                      <circle cx="65" cy="35" r="3" fill="#ef4444" opacity="0.5" />
                    </svg>
                  </div>

                  {/* Payload data card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="bg-zinc-900 border border-red-500/40 rounded-xl p-3"
                  >
                    <div className="text-[9px] font-mono font-bold text-red-400 mb-2 uppercase tracking-widest">ASSOCIATED PAYLOAD</div>
                    <div className="space-y-1">
                      {Object.entries(associatedPayload).map(([k, v]) => (
                        <div key={k} className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-zinc-600 w-24">{k}</span>
                          <span className={`text-[9px] font-mono font-bold ${
                            k === 'severity' || k === 'evt_type' ? 'text-red-400' : 'text-zinc-300'
                          }`}>{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* 3x3 grid */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {cells.map((cell) => (
                      <React.Fragment key={cell.id}>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center" style={{ aspectRatio: '16/10' }}>
                          <div className="text-center">
                            <span className="text-[9px] font-mono text-zinc-500 block">{cell.id}</span>
                            <span className="text-[7px] font-mono text-zinc-700">{cell.label}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <PulseDot />
                    <span className="text-[8px] font-mono text-zinc-600">9-LANE MONITORING ACTIVE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 4: Sandbox 02 — 微小目标检测 + 站台门拦截 ──────────────────────

function Sandbox02() {
  const [triggered, setTriggered] = useState(false);

  const doors = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1).padStart(2, '0'),
    label: `${String(i + 1).padStart(2, '0')} 门`,
  }));

  const falseAlarmFilterLog = [
    '[帧 12] 打火机火光像素特征 — 空间分布非持续性，排除',
    '[帧 18] 冬季哈气热扰动 — 灰度渐变幅度不符烟柱扩散模型，排除',
    '[帧 25] 时序空间特征交叉核验通过 — 确认微小目标为香烟燃烧点',
    '→ 误报过滤完成，确诊率 97.4%',
  ];

  const logPayload = {
    action: 'INTERCEPT_DISPATCH',
    station: '呼家楼站',
    door_no: 2,
    ticket_payload: { type: 'smoking', confidence: 0.974, frame_count: 25 },
    protocol: 'WebSocket → 移动端 SOP 工单',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SandboxHeader num="02" label="微小目标检测与下站站台门对齐精准拦截（抽烟识别）" />
      </div>
      <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: Micro target detection */}
          <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                MICRO TARGET DETECTION / 微小目标检测视窗
              </span>
              <div className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${
                triggered ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {triggered ? 'SMOKING_DETECTED' : 'SCANNING'}
              </div>
            </div>

            <div className="relative bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/30 to-zinc-900/60" />

              {/* Person silhouette area */}
              <div className="absolute" style={{ top: '20%', left: '35%', width: '30%', height: '60%' }}>
                <div className="w-full h-full border border-zinc-700/40 rounded-lg bg-zinc-800/20" />
              </div>

              {/* Detection box — target */}
              <AnimatePresence>
                {triggered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute border-2 border-orange-400 rounded-sm bg-orange-400/10"
                    style={{ top: '40%', left: '42%', width: '8%', height: '5%' }}
                  >
                    <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-orange-400 rounded-sm" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke plume detection */}
              <AnimatePresence>
                {triggered && (
                  <motion.div
                    initial={{ opacity: 0, height: '0%' }}
                    animate={{ opacity: 1, height: '15%' }}
                    transition={{ delay: 0.2 }}
                    className="absolute border border-orange-400/40 rounded-sm bg-orange-400/5"
                    style={{ top: '25%', left: '40%', width: '12%', height: '15%' }}
                  />
                )}
              </AnimatePresence>

              {/* Status bar */}
              <div className="absolute bottom-1 left-2 flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${triggered ? 'bg-orange-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span className={`text-[8px] font-mono font-bold ${triggered ? 'text-orange-400' : 'text-zinc-600'}`}>
                  {triggered ? 'TARGET LOCKED — 25 FRAMES VERIFIED' : 'CONTINUOUS SCAN'}
                </span>
              </div>
            </div>

            {/* False alarm filter log */}
            <AnimatePresence>
              {triggered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 overflow-hidden"
                >
                  <div className="text-[8px] font-mono font-bold text-amber-400 mb-1 uppercase tracking-widest">FALSE ALARM FILTER LOG</div>
                  {falseAlarmFilterLog.map((log, i) => (
                    <React.Fragment key={i}>
                      <div className="text-[8px] font-mono text-zinc-500 leading-relaxed">
                        {log.includes('排除') ? (
                          <span className="text-zinc-600">{log}</span>
                        ) : (
                          <span className={log.includes('确认') ? 'text-orange-400' : 'text-amber-500'}>{log}</span>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Station door topology */}
          <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                PLATFORM GATE TOPOLOGY / 呼家楼站站台门组态
              </span>
            </div>

            {/* Station name */}
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400">下一站：呼家楼站</span>
            </div>

            {/* Door rectangles */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {doors.map((door) => {
                const isHighlighted = triggered && door.id === '02';
                return (
                  <React.Fragment key={door.id}>
                    <motion.div
                      animate={isHighlighted ? { scale: [1, 1.05, 1], boxShadow: ['0 0 0 0 rgba(251,146,60,0)', '0 0 15px 3px rgba(251,146,60,0.4)', '0 0 0 0 rgba(251,146,60,0)'] } : {}}
                      transition={isHighlighted ? { repeat: Infinity, duration: 1.5 } : {}}
                      className={`rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-colors ${
                        isHighlighted
                          ? 'bg-orange-500/15 border-orange-400'
                          : 'bg-zinc-900 border-zinc-700'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold ${isHighlighted ? 'text-orange-400' : 'text-zinc-500'}`}>
                        {door.id}
                      </span>
                      <span className={`text-[7px] font-mono ${isHighlighted ? 'text-orange-400/70' : 'text-zinc-700'}`}>
                        {door.label}
                      </span>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Mobile dispatch card */}
            <AnimatePresence>
              {triggered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: -5 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.3, type: 'spring', damping: 15 }}
                  className="bg-zinc-900 border border-orange-400/40 rounded-xl p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest">MOBILE DISPATCH</span>
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 space-y-0.5">
                    <div>→ 站台班长移动端接收 SOP 工单</div>
                    <div>→ 02 车门精准对齐拦截引导</div>
                    <div>→ 现场核实 + 处置上报</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Log payload */}
            <AnimatePresence>
              {triggered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2.5"
                >
                  <div className="text-[8px] font-mono font-bold text-zinc-600 mb-1 uppercase">LOG PAYLOAD</div>
                  {Object.entries(logPayload).map(([k, v]) => (
                    <div key={k} className="flex items-start gap-2 text-[8px] font-mono">
                      <span className="text-zinc-600 shrink-0 w-20">{k}</span>
                      <span className="text-zinc-400">{typeof v === 'string' ? v : JSON.stringify(v)}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom trigger button */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setTriggered(!triggered)}
            className={`text-[11px] font-bold px-5 py-2.5 rounded-xl border transition-all cursor-pointer ${
              triggered
                ? 'bg-white border-zinc-200 text-zinc-700 hover:border-emerald-300'
                : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
            }`}
          >
            {triggered ? '重置场景' : '触发车厢隐蔽吸烟/电子烟违规行为'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section 5: Sandbox 03 — 跌倒时序窗口 + 救援状态机 ────────────────────

function Sandbox03() {
  const [duration, setDuration] = useState(0);

  const isMonitoring = duration > 0 && duration < 5;
  const isEmergency = duration >= 15;

  const behaviorState = duration === 0
    ? 'NORMAL'
    : isMonitoring
    ? 'MONITORING'
    : isEmergency
    ? 'EMERGENCY_SOP_TRIGGERED'
    : 'SUSPECTED';

  const sopActionSteps = [
    '1. OCC 调度中心启动红色应急预案，锁定目标车次与车厢号',
    '2. 自动组装 SOP 工单，秒级推送至下一站站台班长移动端',
    '3. 站台人员在列车到站后 30 秒内抵达目标车门，实施现场急救与秩序维护',
  ];

  const frames = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    time: `T-${(6 - i) * 0.5}s`,
    active: duration > 0 && i >= Math.max(0, 6 - Math.ceil(duration / 3)),
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SandboxHeader num="03" label="意外跌倒多帧时序滑动窗口核验与主动式救援" />
      </div>
      <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: Multi-frame sliding window */}
          <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                SLIDING WINDOW / 多帧时序窗口
              </span>
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${
                behaviorState === 'NORMAL'
                  ? 'bg-zinc-800 text-zinc-500'
                  : behaviorState === 'MONITORING'
                  ? 'bg-zinc-700 text-zinc-400'
                  : behaviorState === 'EMERGENCY_SOP_TRIGGERED'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {behaviorState}
              </span>
            </div>

            {/* Frame blocks */}
            <div className="space-y-1.5">
              {frames.map((frame) => (
                <React.Fragment key={frame.id}>
                  <div
                    className={`relative rounded-lg border p-2.5 transition-all ${
                      frame.active && isEmergency
                        ? 'border-red-500 bg-red-950/20'
                        : frame.active && isMonitoring
                        ? 'border-amber-500/50 bg-amber-950/10'
                        : 'border-zinc-800 bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[9px] font-mono font-bold ${
                        frame.active && isEmergency ? 'text-red-400' : frame.active ? 'text-amber-400' : 'text-zinc-600'
                      }`}>
                        FRAME {frame.id}
                      </span>
                      <span className="text-[7px] font-mono text-zinc-700">{frame.time}</span>
                    </div>
                    {/* Simulated silhouette */}
                    <div className="flex items-center justify-center" style={{ height: '48px' }}>
                      <svg viewBox="0 0 40 40" className="w-full h-full max-h-12">
                        {/* Simple stick figure */}
                        <circle cx="20" cy="8" r="3" fill={frame.active && isEmergency ? '#ef4444' : frame.active ? '#f59e0b' : '#525252'} opacity="0.7" />
                        <line x1="20" y1="11" x2="20" y2="28" stroke={frame.active && isEmergency ? '#ef4444' : frame.active ? '#f59e0b' : '#525252'} strokeWidth="1.5" />
                        <line x1="20" y1="28" x2="14" y2="37" stroke={frame.active && isEmergency ? '#ef4444' : frame.active ? '#f59e0b' : '#525252'} strokeWidth="1.5" />
                        <line x1="20" y1="28" x2="26" y2="37" stroke={frame.active && isEmergency ? '#ef4444' : frame.active ? '#f59e0b' : '#525252'} strokeWidth="1.5" />
                      </svg>
                    </div>
                    {frame.active && isEmergency && (
                      <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Behavior state text */}
            <div className="mt-3 text-[9px] font-mono text-zinc-500 leading-relaxed">
              {duration === 0 && (
                <span className="text-zinc-600">等待输入：拖动右侧滑块模拟乘客倒地持续时间</span>
              )}
              {isMonitoring && (
                <span className="text-zinc-400">[疑似倒地：时间窗口核验中，排除系鞋带干扰]</span>
              )}
              {behaviorState === 'SUSPECTED' && (
                <span className="text-amber-400">[确认跌倒姿态：时序特征连续匹配，进入深度核验阶段]</span>
              )}
              {isEmergency && (
                <span className="text-emerald-400 font-bold">[EMERGENCY_SOP_TRIGGERED — 应急抢救红线已激活]</span>
              )}
            </div>
          </div>

          {/* Right: Emergency state machine */}
          <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                EMERGENCY STATE MACHINE / 应急响应状态机
              </span>
            </div>

            {/* Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-zinc-400">模拟乘客倒地持续时间</span>
                <span className={`text-[11px] font-mono font-bold ${
                  isEmergency ? 'text-emerald-400' : isMonitoring ? 'text-zinc-400' : duration > 0 ? 'text-amber-400' : 'text-zinc-600'
                }`}>
                  {duration}s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-900
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[7px] font-mono text-zinc-700">0s</span>
                <span className="text-[7px] font-mono text-zinc-700">5s</span>
                <span className="text-[7px] font-mono text-zinc-700">15s</span>
                <span className="text-[7px] font-mono text-zinc-700">30s</span>
              </div>
            </div>

            {/* State indicator */}
            <div className="space-y-2">
              {/* State: NORMAL */}
              <div className={`rounded-xl border p-3 transition-all ${
                duration === 0 ? 'border-zinc-700 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-950/50 opacity-40'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${duration === 0 ? 'bg-zinc-500' : 'bg-zinc-800'}`} />
                  <span className={`text-[10px] font-mono font-bold ${duration === 0 ? 'text-zinc-400' : 'text-zinc-700'}`}>
                    NORMAL — 正常通行
                  </span>
                </div>
              </div>

              {/* State: MONITORING */}
              <div className={`rounded-xl border p-3 transition-all ${
                isMonitoring ? 'border-zinc-600 bg-zinc-800/60' : 'border-zinc-800 bg-zinc-950/50 opacity-40'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isMonitoring ? 'bg-zinc-400 animate-pulse' : 'bg-zinc-800'}`} />
                  <span className={`text-[10px] font-mono font-bold ${isMonitoring ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    MONITORING — 时序核验中
                  </span>
                </div>
                {isMonitoring && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-[9px] font-mono text-zinc-500"
                  >
                    [疑似倒地：时间窗口核验中，排除系鞋带干扰]
                  </motion.div>
                )}
              </div>

              {/* State: EMERGENCY_SOP_TRIGGERED */}
              <div className={`rounded-xl border p-3 transition-all ${
                isEmergency ? 'border-emerald-500 bg-emerald-950/20' : 'border-zinc-800 bg-zinc-950/50 opacity-40'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isEmergency ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
                  <span className={`text-[10px] font-mono font-bold ${isEmergency ? 'text-emerald-400' : 'text-zinc-700'}`}>
                    EMERGENCY_SOP_TRIGGERED
                  </span>
                </div>
                {isEmergency && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 space-y-1.5"
                  >
                    {sopActionSteps.map((step, i) => (
                      <React.Fragment key={i}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="text-[9px] font-mono text-emerald-400/80 flex items-start gap-2"
                        >
                          <Shield className="h-3 w-3 mt-0.5 shrink-0 text-emerald-500" />
                          <span>{step}</span>
                        </motion.div>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function PassengerAbnormalDetailView({ project }: { project: Project }) {
  const chips = project.chips || [];
  const metrics = project.metrics || [];

  return (
    <>
      {/* Section 0: Header */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            PASSENGER ANOMALY DETECTION SYSTEM v3.2
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">{project.title}</h1>
        <p className="text-sm text-zinc-500 mt-2 leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </div>

      {/* Section 1: Tags Row */}
      <div className="py-5 border-b border-zinc-200 space-y-3">
        {/* Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 核心能力</span>
          {chips.map((chip, i) => (
            <React.Fragment key={i}>
              <span className="bg-emerald-50 text-emerald-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-emerald-200">
                {chip}
              </span>
            </React.Fragment>
          ))}
        </div>
        {/* Metrics */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能指标</span>
          {metrics.map((m, i) => (
            <React.Fragment key={i}>
              <span className="border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
                {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Section 2: Architecture 2×2 cards */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block pl-0.5">
          // SYSTEM ARCHITECTURE / 四层闭环治理底座
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {archCards.map((card, i) => (
            <React.Fragment key={i}>
              <div className={`rounded-2xl border p-4 ${
                card.color === 'emerald'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : card.color === 'amber'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-sky-50/50 border-sky-200'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                    card.color === 'emerald'
                      ? 'bg-emerald-100 border border-emerald-200'
                      : card.color === 'amber'
                      ? 'bg-amber-100 border border-amber-200'
                      : 'bg-sky-100 border border-sky-200'
                  }`}>
                    <card.icon className={`h-4.5 w-4.5 ${
                      card.color === 'emerald' ? 'text-emerald-600' : card.color === 'amber' ? 'text-amber-600' : 'text-sky-600'
                    }`} />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-zinc-900">{card.label}</div>
                    <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{card.subtitle}</div>
                  </div>
                </div>
                <p className="text-[10.5px] text-zinc-600 leading-relaxed">{card.desc}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Section 3: Sandbox 01 */}
      <div className="mt-8">
        <Sandbox01 />
      </div>

      {/* Section 4: Sandbox 02 */}
      <div className="mt-8">
        <Sandbox02 />
      </div>

      {/* Section 5: Sandbox 03 */}
      <div className="mt-8 pb-4">
        <Sandbox03 />
      </div>
    </>
  );
}
