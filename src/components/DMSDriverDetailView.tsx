/**
 * DMS轨道交通司机疲劳与行为监测系统 — 详情页
 * 配色：翡翠绿 + 琥珀警告 + 深空灰（主色 emerald/teal，疲劳警告 amber/red，安全 emerald）
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Cpu, Brain, Radio, MonitorSmartphone,
  AlertTriangle, ChevronRight, Zap, Activity,
  Wifi, WifiOff, Clock, CheckCircle2, Circle,
  X, Play, Pause, RotateCcw, Shield, Layers,
  ScanFace, Smartphone, FileText, Eye,
} from 'lucide-react';
import type { Project } from '../types';

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
    icon: Camera,
    label: '高抗噪图像采集层',
    subtitle: '红外补光/宽动态摄像',
    desc: '采用车载红外补光/宽动态摄像模组，无视隧道全黑、强逆光及司机配戴墨镜等物理噪声，全时段低延迟全量吞吐高清面部时序数据流。',
    color: 'emerald',
  },
  {
    icon: ScanFace,
    label: '边缘面部拓扑网格层',
    subtitle: '468点Face Mesh',
    desc: '部署边缘智能网关，实时提取面部 468 个空间几何关键点，建立三维头部姿态、EAR/MAR 参数化画像，输出高精度视线朝向向量。',
    color: 'emerald',
  },
  {
    icon: Brain,
    label: '时序行为特征推理层',
    subtitle: '滑动窗口多帧推理',
    desc: '引入滑动时间窗口机制对连续多帧面部特征流进行时序纵向深度拆解，精准剥离转头、说话、擦汗等非标日常动作，完成两阶段反误报过滤。',
    color: 'emerald',
  },
  {
    icon: Radio,
    label: '阶梯式无感调度响应层',
    subtitle: '分级状态机切换',
    desc: '初级疲劳激活本地震动/语音提醒；重度危机通过 WebSocket 秒级将结构化 Payload 投递至 OCC 控制中心大屏，实现跨端联动。',
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
            全链路数据流 / 「云-边-端」协同闭环
          </span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {[
            { label: '红外/宽动态摄像', icon: Camera },
            { label: '468点Face Mesh', icon: ScanFace },
            { label: 'EAR/MAR计算', icon: Cpu },
            { label: '滑动窗口推理', icon: Brain },
            { label: '双阶段反误报', icon: Shield },
            { label: '分级响应调度', icon: Radio },
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

// ─── Sandbox 01: Face Mesh 实时打点与眼/嘴姿态特征拟合 ─────────────────────

function FaceMeshSandbox() {
  const [fatigueLevel, setFatigueLevel] = useState(10);
  const isHighRisk = fatigueLevel >= 85;
  const isMediumRisk = fatigueLevel >= 60 && fatigueLevel < 85;

  const faceColor = isHighRisk ? '#f43f5e' : isMediumRisk ? '#f59e0b' : '#34d399';
  const earValue = isHighRisk ? 0.12 : isMediumRisk ? 0.22 : 0.35;
  const marValue = isHighRisk ? 0.68 : isMediumRisk ? 0.35 : 0.15;

  // Generate ~30 face mesh key points
  const facePoints = [
    // Outline circle points
    { cx: 50, cy: 8, r: 2 }, { cx: 38, cy: 6, r: 1.5 }, { cx: 62, cy: 6, r: 1.5 },
    { cx: 26, cy: 14, r: 1.5 }, { cx: 74, cy: 14, r: 1.5 },
    { cx: 18, cy: 26, r: 1.5 }, { cx: 82, cy: 26, r: 1.5 },
    { cx: 14, cy: 40, r: 1.5 }, { cx: 86, cy: 40, r: 1.5 },
    { cx: 18, cy: 54, r: 1.5 }, { cx: 82, cy: 54, r: 1.5 },
    { cx: 26, cy: 66, r: 1.5 }, { cx: 74, cy: 66, r: 1.5 },
    { cx: 38, cy: 74, r: 1.5 }, { cx: 62, cy: 74, r: 1.5 },
    { cx: 50, cy: 76, r: 2 },
    // Left eye region
    { cx: 42, cy: 26, r: 3, group: 'leye' }, { cx: 42, cy: 26, r: 1.5, group: 'leye_pupil' },
    { cx: 36, cy: 24, r: 1 }, { cx: 48, cy: 24, r: 1 },
    // Right eye region
    { cx: 58, cy: 26, r: 3, group: 'reye' }, { cx: 58, cy: 26, r: 1.5, group: 'reye_pupil' },
    { cx: 52, cy: 24, r: 1 }, { cx: 64, cy: 24, r: 1 },
    // Nose
    { cx: 50, cy: 34, r: 2 }, { cx: 47, cy: 36, r: 1 }, { cx: 53, cy: 36, r: 1 },
    // Mouth corners
    { cx: 44, cy: 44, r: 1.5, group: 'mouth' },
    { cx: 56, cy: 44, r: 1.5, group: 'mouth' },
    { cx: 50, cy: 46, r: 1.5, group: 'mouth' },
    { cx: 50, cy: 42, r: 1, group: 'mouth' },
    // Jaw/lower face
    { cx: 50, cy: 52, r: 2 },
    { cx: 42, cy: 58, r: 1 }, { cx: 58, cy: 58, r: 1 },
  ];

  return (
    <div className="space-y-4">
      {/* 顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanFace className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Face Mesh 实时打点 · 司机生理特征状态分析
            </span>
          </div>
          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-bold ${
            isHighRisk ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' :
            isMediumRisk ? 'bg-amber-50 text-amber-600 border border-amber-200' :
            'bg-emerald-50 text-emerald-600 border border-emerald-200'
          }`}>
            疲劳度 {fatigueLevel}%
          </span>
        </div>
      </div>

      {/* 左：Face Mesh SVG | 右：EAR/MAR 仪表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：Face Mesh SVG */}
        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              DRIVER FACE MESH · 468点实时关键点分析
            </span>
            <div className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${isHighRisk ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
              <span className={`text-[8px] font-mono ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`}>
                {isHighRisk ? 'HIGH RISK' : 'MONITORING'}
              </span>
            </div>
          </div>

          <svg viewBox="0 0 100 80" className="w-full">
            {/* Face outline */}
            <ellipse cx="50" cy="38" rx="38" ry="36" fill="none" stroke={faceColor} strokeWidth={1.5} opacity={0.3} />

            {/* Gaze vector beam (only when safe) */}
            {!isHighRisk && (
              <line
                x1="50" y1="38" x2="50" y2="8"
                stroke="#34d399" strokeWidth={1} opacity={0.6}
                strokeDasharray="2 2"
              />
            )}

            {/* Key points */}
            {facePoints.map((pt, i) => {
              // Eyes: collapse when fatigued
              if (pt.group === 'leye' || pt.group === 'reye') {
                const eyeHeight = isHighRisk ? 0.5 : isMediumRisk ? 1 : 2.5;
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
              // Pupils
              if (pt.group === 'leye_pupil' || pt.group === 'reye_pupil') {
                const parent = facePoints.find(p =>
                  (pt.group === 'leye_pupil' && p.group === 'leye') ||
                  (pt.group === 'reye_pupil' && p.group === 'reye')
                );
                return (
                  <circle
                    key={i}
                    cx={parent ? parent.cx : pt.cx}
                    cy={parent ? parent.cy : pt.cy}
                    r={pt.r}
                    fill={faceColor}
                    opacity={isHighRisk ? 0.5 : 0.9}
                    className={isHighRisk ? 'animate-pulse' : ''}
                  />
                );
              }
              // Mouth: expand when yawning
              if (pt.group === 'mouth') {
                const openAmount = isHighRisk ? 4 : isMediumRisk ? 2 : 0;
                let cx = pt.cx;
                let cy = pt.cy;
                if (pt.cx === 44) cx -= openAmount;
                if (pt.cx === 56) cx += openAmount;
                if (pt.cx === 50 && pt.cy === 46) cy += isHighRisk ? 4 : 0;
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
              }
              return (
                <circle
                  key={i}
                  cx={pt.cx}
                  cy={pt.cy}
                  r={pt.r}
                  fill={faceColor}
                  opacity={isHighRisk ? 0.9 : 0.7}
                  className={isHighRisk ? 'animate-pulse' : ''}
                />
              );
            })}
          </svg>

          {/* 滑块 */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-zinc-500 uppercase">生理特征变化</span>
              <span className={`text-[9px] font-mono font-bold ${
                isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {fatigueLevel}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={fatigueLevel}
              onChange={e => setFatigueLevel(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #34d399 ${fatigueLevel}%, #3f3f46 ${fatigueLevel}%)`,
              }}
            />
            <div className="flex justify-between text-[7px] font-mono text-zinc-600">
              <span>清醒</span>
              <span>轻度疲劳</span>
              <span>高度疲劳</span>
            </div>
          </div>
        </div>

        {/* 右侧：EAR/MAR 实时仪表 */}
        <div className="space-y-3">
          {/* EAR 仪表 */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                EAR · 眼睛睁闭比率
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-zinc-500">当前值</span>
                <span className={`font-bold ${isHighRisk ? 'text-red-500' : 'text-emerald-600'}`}>
                  {earValue.toFixed(2)}
                </span>
              </div>
              <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isHighRisk ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(earValue / 0.5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-[7px] font-mono text-zinc-400">
                <span>触发阈值 0.20</span>
                <span className={isHighRisk ? 'text-red-500 font-bold' : 'text-emerald-500'}>
                  {isHighRisk ? '触发疲劳告警' : '正常范围'}
                </span>
              </div>
            </div>
          </div>

          {/* MAR 仪表 */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                MAR · 嘴巴张合比率
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-zinc-500">当前值</span>
                <span className={`font-bold ${isHighRisk ? 'text-red-500' : 'text-emerald-600'}`}>
                  {marValue.toFixed(2)}
                </span>
              </div>
              <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isHighRisk ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(marValue / 0.8) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-[7px] font-mono text-zinc-400">
                <span>打哈欠阈值 0.50</span>
                <span className={isHighRisk ? 'text-red-500 font-bold' : 'text-emerald-500'}>
                  {isHighRisk ? '疑似打哈欠触发' : '正常范围'}
                </span>
              </div>
            </div>
          </div>

          {/* 综合状态 */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
            isHighRisk ? 'bg-red-50 border-red-300' :
            isMediumRisk ? 'bg-amber-50 border-amber-200' :
            'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              {isHighRisk ? (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              ) : isMediumRisk ? (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
              <span className={`text-[10px] font-bold ${
                isHighRisk ? 'text-red-700' : isMediumRisk ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {isHighRisk ? '高危疲劳行为已确诊 · 触发系统告警' :
                isMediumRisk ? '疲劳度上升 · 持续监测中' :
                '司机状态正常 · 持续监测中'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 02: 多帧时序反误报过滤 ─────────────────────────────────────────

function TimeSequenceSandbox() {
  const [filterTriggered, setFilterTriggered] = useState(false);
  const [stage1, setStage1] = useState<'idle' | 'failed' | 'passed'>('idle');
  const [stage2, setStage2] = useState<'idle' | 'pending' | 'verified'>('idle');
  const [resultText, setResultText] = useState('');

  const handleTrigger = useCallback(() => {
    if (filterTriggered) {
      setFilterTriggered(false);
      setStage1('idle');
      setStage2('idle');
      setResultText('');
      return;
    }
    setFilterTriggered(true);
    setStage1('failed');
    setResultText('单帧判定：司机长时间张嘴 (高危打哈欠预警)');

    setTimeout(() => {
      setStage1('passed');
    }, 800);

    setTimeout(() => {
      setStage2('pending');
    }, 1200);

    setTimeout(() => {
      setStage2('verified');
      setResultText('判定为张嘴说话，100% 反误报拦截');
    }, 2000);
  }, [filterTriggered]);

  const frames = [
    { ts: '15:32:01.2', label: '张嘴 (正常说话)', color: 'zinc' },
    { ts: '15:32:01.5', label: '张嘴 (正常说话)', color: 'zinc' },
    { ts: '15:32:01.8', label: '张嘴 (打哈欠?)', color: 'amber' },
    { ts: '15:32:02.1', label: '张嘴 (打哈欠?)', color: 'amber' },
    { ts: '15:32:02.4', label: '闭嘴', color: 'emerald' },
    { ts: '15:32:02.7', label: '说话', color: 'emerald' },
  ];

  return (
    <div className="space-y-4">
      {/* 顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              多帧时序反误报过滤引擎 · 司机行为状态判定
            </span>
          </div>
          <button
            onClick={handleTrigger}
            className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
              filterTriggered
                ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            {filterTriggered ? '重置' : '启动多帧时序滤波去噪'}
          </button>
        </div>
      </div>

      {/* 左：帧流走马灯 | 右：双阶段校验 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：帧流走马灯 */}
        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-zinc-500" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              FRAME STREAM · 司机室摄像头时序帧流
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {frames.map((frame, i) => (
              <div
                key={i}
                className={`shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-500 min-w-[70px] ${
                  frame.color === 'amber' && filterTriggered
                    ? 'bg-amber-500/20 border-amber-500/50'
                    : frame.color === 'emerald'
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-zinc-900 border-zinc-700'
                }`}
              >
                <span className={`text-[8px] font-mono ${
                  frame.color === 'amber' && filterTriggered ? 'text-amber-400' :
                  frame.color === 'emerald' ? 'text-emerald-400' : 'text-zinc-500'
                }`}>
                  {frame.ts}
                </span>
                <div className={`w-8 h-6 rounded border ${
                  frame.color === 'amber' && filterTriggered ? 'bg-amber-500/30 border-amber-500/60' :
                  frame.color === 'emerald' ? 'bg-emerald-500/20 border-emerald-500/40' :
                  'bg-zinc-800 border-zinc-700'
                }`} />
                <span className={`text-[7px] font-mono text-center ${
                  frame.color === 'amber' && filterTriggered ? 'text-amber-400' :
                  frame.color === 'emerald' ? 'text-emerald-400' : 'text-zinc-500'
                }`}>
                  {frame.label}
                </span>
              </div>
            ))}
          </div>

          {/* 单帧判定结果 */}
          <AnimatePresence>
            {filterTriggered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-2.5 rounded-xl border border-red-300 bg-red-500/10"
              >
                <span className="text-[8px] font-mono text-red-400 uppercase">单帧误报触发</span>
                <div className="text-[9px] font-mono text-red-300 mt-1">{resultText && !resultText.includes('100%') ? resultText : ''}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 右侧：双阶段校验 */}
        <div className="space-y-3">
          {/* Stage 1 */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
            stage1 === 'passed' ? 'bg-emerald-50 border-emerald-300' :
            stage1 === 'failed' ? 'bg-amber-50 border-amber-200' :
            'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-4 h-4 ${
                stage1 === 'passed' ? 'text-emerald-500' :
                stage1 === 'failed' ? 'text-amber-500' : 'text-zinc-400'
              }`} />
              <span className="text-[10px] font-bold text-zinc-700">Stage 1：面部肌肉时序微动频率校验</span>
            </div>
            <div className="flex items-center gap-2">
              {stage1 === 'idle' && (
                <span className="text-[9px] font-mono text-zinc-400">等待帧流输入...</span>
              )}
              {stage1 === 'failed' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full"
                >
                  FAILED_SUSPECTED
                </motion.span>
              )}
              {stage1 === 'passed' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[9px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full"
                >
                  PASSED_BENIGN
                </motion.span>
              )}
            </div>
            <p className="text-[8px] text-zinc-500 mt-2 font-mono">
              {stage1 === 'passed'
                ? '面部肌肉时序微动频率校验通过 → 判定为正常说话动作'
                : stage1 === 'failed'
                ? '检测到张嘴动作，需进入 Stage 2 进一步验证...'
                : '检测连续多帧面部特征变化频率'}
            </p>
          </div>

          {/* Stage 2 */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
            stage2 === 'verified' ? 'bg-emerald-50 border-emerald-300' :
            stage2 === 'pending' ? 'bg-amber-50 border-amber-200' :
            'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-4 h-4 ${
                stage2 === 'verified' ? 'text-emerald-500' :
                stage2 === 'pending' ? 'text-amber-500' : 'text-zinc-400'
              }`} />
              <span className="text-[10px] font-bold text-zinc-700">Stage 2：多帧滑动窗口(3秒)频次验证</span>
            </div>
            <div className="flex items-center gap-2">
              {stage2 === 'idle' && (
                <span className="text-[9px] font-mono text-zinc-400">等待 Stage 1 通过...</span>
              )}
              {stage2 === 'pending' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full"
                >
                  PENDING
                </motion.span>
              )}
              {stage2 === 'verified' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[9px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full"
                >
                  VERIFIED_TALKING_FILTERED
                </motion.span>
              )}
            </div>
            <p className="text-[8px] text-zinc-500 mt-2 font-mono">
              {stage2 === 'verified'
                ? '3秒滑动窗口内说话动作频次验证通过 → 100% 反误报拦截'
                : stage2 === 'pending'
                ? '执行多帧频次分析中...'
                : '分析3秒时间窗口内动作频次一致性'}
            </p>
          </div>

          {/* 最终结果 */}
          <AnimatePresence>
            {filterTriggered && resultText.includes('100%') && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-700">{resultText}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 03: 阶梯式风险降级与跨多端响应 ─────────────────────────────────

function RiskResponseSandbox() {
  const [triggered, setTriggered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [logLines, setLogLines] = useState<Array<{ time: string; text: string; color: string }>>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dmsLogPayload = `{
  "ticketId": "DMS-ALERT-2026-883",
  "trainId": "06024号车",
  "driverId": "EMP_7741",
  "riskLevel": "LEVEL_3_CRITICAL",
  "snapshotUrl": "/dms/snap/DMS-2026-883.jpg",
  "payload": {
    "ear": 0.11,
    "mar": 0.71,
    "gaze_vector": "DOWNWARD_DEGRADED",
    "ts": "2026-06-16T15:32:03.882Z"
  }
}`;

  const typeLog = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText('');
    let i = 0;
    timerRef.current = setTimeout(function tick() {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        timerRef.current = setTimeout(tick, 20);
      }
    }, 20);
  }, []);

  const handleTrigger = useCallback(() => {
    if (triggered) {
      setTriggered(false);
      setDisplayedText('');
      setLogLines([]);
      return;
    }
    setTriggered(true);
    setLogLines([]);
    setDisplayedText('');

    const addLog = (text: string, color: string, delay: number) => {
      setTimeout(() => {
        const now = new Date();
        const ts = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}:${String(now.getMilliseconds()).slice(0, 2).padStart(2, '0')}`;
        setLogLines(prev => [...prev.slice(-6), { time: ts, text, color }]);
      }, delay);
    };

    addLog('边缘网关 DMS 算法确诊疲劳行为', 'emerald', 0);
    addLog('触发 LEVEL_1_GENTLE_PULSE 本地震动提醒', 'amber', 400);
    addLog('本地震动无响应超时 5s → 升级 LEVEL_2', 'amber', 800);
    addLog('升级 LEVEL_3_CRITICAL → WebSocket 上报 OCC', 'red', 1400);

    setTimeout(() => {
      typeLog(dmsLogPayload);
    }, 1800);
  }, [triggered, typeLog]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="space-y-4">
      {/* 顶栏 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              阶梯式风险降级与跨多端响应 · DMS-ALERT-2026-883
            </span>
          </div>
          <button
            onClick={handleTrigger}
            className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
              triggered
                ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            }`}
          >
            {triggered ? '重置' : '一键执行：三级重度疲劳行为确诊拦截'}
          </button>
        </div>
      </div>

      {/* 左：司机室 | 右：OCC 调度 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：司机室模拟面板 */}
        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-zinc-500" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              司机室模拟面板 · 06024号车
            </span>
          </div>

          {/* 状态灯 */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[8px] font-mono text-zinc-500 uppercase">状态指示灯</span>
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
              triggered ? 'bg-amber-500 animate-pulse' : 'bg-zinc-600'
            }`} />
            <span className={`text-[8px] font-mono ${
              triggered ? 'text-amber-400' : 'text-zinc-600'
            }`}>
              {triggered ? 'ALERT_ACTIVE' : 'ROUTINE_MONITORING'}
            </span>
          </div>

          {/* 本地震动日志 */}
          <div className="space-y-2">
            <div className="text-[8px] font-mono text-zinc-600 uppercase mb-2">本地震动提醒日志</div>
            <div className={`p-2.5 rounded-xl border text-[9px] font-mono ${
              triggered ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
            }`}>
              {triggered ? 'LEVEL_1_GENTLE_PULSE' : 'STANDBY'}
            </div>
            {triggered && (
              <div className="bg-zinc-900 rounded-xl p-2.5 border border-zinc-800">
                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">语音提醒文本</div>
                <div className="text-[9px] font-mono text-amber-300">
                  "司机您好，检测到您有疲劳迹象，请注意休息安全驾驶。"
                </div>
              </div>
            )}
          </div>

          {/* 事件日志流 */}
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <div className="text-[8px] font-mono text-zinc-500 uppercase mb-2">Event Log</div>
            <div className="space-y-1">
              {logLines.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-[8px] font-mono">
                  <span className="text-zinc-600 shrink-0">{log.time}</span>
                  <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-0.5 ${
                    log.color === 'red' ? 'bg-red-400' :
                    log.color === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <span className={
                    log.color === 'red' ? 'text-red-300' :
                    log.color === 'amber' ? 'text-amber-300' : 'text-emerald-300'
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：OCC 调度中心 */}
        <div className="space-y-3">
          {/* 接单卡片 */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
            triggered ? 'bg-red-50 border-red-300 animate-pulse' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <MonitorSmartphone className={`w-4 h-4 ${triggered ? 'text-red-500' : 'text-zinc-400'}`} />
              <span className="text-[10px] font-bold text-zinc-700">OCC 调度中心综合接单卡片</span>
            </div>

            {triggered ? (
              <div className="space-y-2">
                <div className="bg-white rounded-xl p-3 border border-red-100 space-y-1.5">
                  {[
                    { label: 'ticketId', value: 'DMS-ALERT-2026-883' },
                    { label: 'trainId', value: '06024号车' },
                    { label: 'driverId', value: 'EMP_7741' },
                    { label: 'riskLevel', value: 'LEVEL_3_CRITICAL' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-[10px]">
                      <span className="text-zinc-400 font-mono">{item.label}</span>
                      <span className={`font-bold font-mono ${item.label === 'riskLevel' ? 'text-red-600' : 'text-zinc-700'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* 图像切片占位符 */}
                <div className="bg-zinc-200 rounded-xl border-2 border-dashed border-zinc-400 h-24 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-zinc-500">图像切片占位符 · 抓拍图片</span>
                </div>
              </div>
            ) : (
              <div className="text-[9px] text-zinc-400 font-mono text-center py-4">
                等待 DMS 高危告警触发...
              </div>
            )}
          </div>

          {/* Payload 日志 */}
          {displayedText && (
            <div className="bg-[#0A0A0C] rounded-2xl p-3 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-3 h-3 text-emerald-600" />
                <span className="text-[8px] font-mono text-zinc-500 uppercase">dmsLogPayload · 结构化响应</span>
              </div>
              <div className="text-[8px] font-mono text-emerald-400 whitespace-pre-wrap">
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          )}

          {!triggered && (
            <div className="text-[9px] text-zinc-300 text-center py-4 font-mono">
              点击上方按钮模拟三级重度疲劳行为确诊拦截...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────

export function DMSDriverDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ═══ Section 0: Header ═══ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            DMS DRIVER SYSTEM v1.0 · CLOUD-EDGE-END INTEGRATED PLATFORM
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">DMS轨道交通司机疲劳与行为监测系统</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          「云-边-端」高实时、低误报级视觉行为推理与主动防御平台。通过 468 点面部关键点网格提取三维头部姿态、EAR 与 MAR，结合滑动时间窗口多帧时序推理与双阶段反误报过滤机制，实现边缘判定响应 &lt;300ms、假阳性误报率 &lt;2%、高危行为抓取率 100%。
        </p>
      </div>

      {/* ═══ Section 1: Tags Row ═══ */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        {/* 第一行：5 个 chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术栈</span>
          {[
            '468点面部关键点网格',
            '视线三维向量追踪',
            '多帧时序行为推理',
            '双阶段反误报过滤机制',
            '阶梯式无感降级报警',
          ].map((tag, i) => (
            <React.Fragment key={`chip-${i}`}><ChipBadge text={tag} /></React.Fragment>
          ))}
        </div>
        {/* 第二行：4 个效能指标 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '边缘判定响应', value: '<300ms' },
            { label: '假阳性误报率', value: '<2%' },
            { label: '削减警报疲劳', value: '65%' },
            { label: '高危行为抓取率', value: '100%' },
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

      {/* ═══ Section 3: 沙盒 01 — Face Mesh 实时打点与眼/嘴姿态特征拟合 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="01" label="Face Mesh 实时打点与眼/嘴姿态特征拟合" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <FaceMeshSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 4: 沙盒 02 — 多帧时序反误报过滤 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="02" label="多帧时序反误报过滤" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <TimeSequenceSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 5: 沙盒 03 — 阶梯式风险降级与跨多端响应 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="03" label="阶梯式风险降级与跨多端响应" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <RiskResponseSandbox />
        </div>
      </div>
    </>
  );
}