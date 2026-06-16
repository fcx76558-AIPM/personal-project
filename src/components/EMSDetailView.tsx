/**
 * EMS 智能能源管理系统 — 详情页
 * 配色：翠绿(能效) + 天蓝(数据/智算) + 琥珀(告警/折损)
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Gauge, Leaf, TrendingUp, Cpu, Database, GitBranch,
  ChevronRight, Activity, Droplets, Wind, Server, Radio,
  Flame, BarChart3, Target, Check, X, Play, Pause,
  Sliders, Lightbulb, Award, Globe, ChevronDown,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────
const C = {
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200', 300: 'border-emerald-300',
    400: 'text-emerald-400', 500: 'text-emerald-500', 600: 'text-emerald-600', 700: 'text-emerald-700', 800: 'text-emerald-800',
    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', strong: 'text-emerald-700',
  },
  sky: {
    50: 'bg-sky-50', 100: 'bg-sky-100', 200: 'border-sky-200',
    500: 'text-sky-500', 600: 'text-sky-600', 700: 'text-sky-700',
    bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600',
  },
  amber: {
    50: 'bg-amber-50', 100: 'bg-amber-100', 200: 'border-amber-200',
    500: 'text-amber-500', 600: 'text-amber-600', 700: 'text-amber-700',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600',
  },
  red: {
    50: 'bg-red-50', 100: 'bg-red-100',
    500: 'text-red-500', 600: 'text-red-600',
  },
  zinc: {
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200', 300: 'border-zinc-300',
    400: 'text-zinc-400', 500: 'text-zinc-500', 600: 'text-zinc-600', 700: 'text-zinc-700',
    900: 'bg-zinc-900',
  },
};

// ─── Mock Data ───────────────────────────────────────────────────────────────

const ARCH_FLOW = [
  { step: '01', title: '能源检测', features: ['全量能源数据采集', '大数据平台搭建', '耗能超限告警', '容量预警'] },
  { step: '02', title: '耗能统计', features: ['支路分类用能统计', '设备链路损耗', '碳排放管理', '自动抄表计费'] },
  { step: '03', title: '能效分析', features: ['PUE优化分析', '制冷系统效能检测', '设备折损评估'] },
  { step: '04', title: '节能调优', features: ['CLF拟合基线', 'AI调优', 'PUE诊断报告'] },
  { step: '05', title: '智能预测', features: ['冷量需求预测', 'CLF预测', '温升预警', '运维举措提醒'] },
];

const TOPOLOGY_NODES: { id: string; name: string; type: 'SOURCE' | 'TRANSIT' | 'CONSUMER'; hasWarning?: boolean }[] = [
  { id: 'node_01', name: '供电进线/总变压器', type: 'SOURCE' },
  { id: 'node_02', name: '低压配电线路', type: 'TRANSIT' },
  { id: 'node_03', name: '制冷系统精密空调', type: 'TRANSIT', hasWarning: true },
  { id: 'node_04', name: 'IT系统机柜服务器负载', type: 'CONSUMER' },
];

const TABLE_COLUMNS = ['监控支路名称', '进线端电能(kWh)', '出线端电能(kWh)', '折损电能(kWh)', '损耗率', '峰谷电价差额(元)'];

const TABLE_DATA_FALSE = [{ name: '1F-IT系统机柜总路', input: '104683', output: '--', loss: '--', rate: '--', cost: '17.33万元' }];

const TABLE_DATA_TRUE = [
  { name: '1F-IT01-IDEC-01制冷支路', input: '8520.0', output: '8130.0', loss: '390.0', rate: '4.58%', cost: '-2340.00' },
  { name: '2F-变压器输电支路', input: '12240.0', output: '12110.0', loss: '130.0', rate: '1.06%', cost: '-780.00' },
];

const AWARDS = [
  { year: '2021', org: '国际互联网产业科技创新大会', name: '科技创新二等奖' },
  { year: '2022', org: '中国工程建设标准化协会', name: '数据中心科技成果奖三等奖' },
  { year: '2023', org: '中国工程建设标准化协会', name: '数据中心科技成果奖三等奖' },
  { year: '2022', org: '第八届中国行业互联网大会', name: '优秀数字化解决方案提供商' },
  { year: '2023', org: '第十八届中国IDC产业年度大典', name: '中国IDC产业数据中心智能运营奖' },
  { year: '2023-2024', org: '中国通信企业协会', name: '算力中心高质量节能减排案例' },
];

const TIME_LABELS = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
const NORMAL_LINE = [1.25, 1.24, 1.25, 1.26, 1.28, 1.30, 1.32, 1.35, 1.31, 1.28, 1.26, 1.25];
const SURGE_LINE = [1.25, 1.24, 1.25, 1.35, 1.42, 1.48, 1.52, 1.50, 1.47, 1.38, 1.29, 1.25];
const AI_LINE = [1.20, 1.19, 1.20, 1.21, 1.22, 1.22, 1.23, 1.22, 1.21, 1.21, 1.20, 1.20];

// ─── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '', duration = 2000, decimals = 1 }: { target: number; suffix?: string; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration]);

  return <span>{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionH({ num, title, tag }: { num: string; title: string; tag?: string }) {
  return (
    <div className="border-b border-zinc-200 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// {num} {title}</span>
        {tag && <span className="text-[8px] text-zinc-400 font-mono">{tag}</span>}
      </div>
    </div>
  );
}

// ─── Pulse Dot ────────────────────────────────────────────────────────────────
function PDot({ color = 'emerald' }: { color?: string }) {
  return <div className={`h-1.5 w-1.5 rounded-full bg-${color}-500 animate-pulse`} />;
}

// ─── Gauge Component ─────────────────────────────────────────────────────────
function PueGauge({ value, label = 'PUE' }: { value: number; label?: string }) {
  const angle = Math.min((value - 1.0) / 0.7 * 180, 180);
  const color = value > 1.4 ? '#ef4444' : value > 1.3 ? '#f59e0b' : '#10b981';

  return (
    <div className="relative w-full aspect-square max-w-[160px] mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Background arc */}
        <path d="M 60 15 A 45 45 0 1 1 15 60" fill="none" stroke="#e4e4e7" strokeWidth="8" strokeLinecap="round" />
        {/* Value arc */}
        <path
          d="M 60 15 A 45 45 0 1 1 15 60"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${angle / 180 * 141.37} 141.37`}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-2">
        <span className="text-[20px] font-bold font-mono tracking-tight" style={{ color }}>{value.toFixed(2)}</span>
        <span className="text-[8px] text-zinc-400 font-mono mt-0.5">{label}</span>
      </div>
    </div>
  );
}

// ─── Mini Timeline (SVG) ─────────────────────────────────────────────────────
function MiniTimeline({
  dataA, labelA, colorA,
  dataB, labelB, colorB,
}: {
  dataA: number[]; labelA: string; colorA: string;
  dataB?: number[]; labelB?: string; colorB?: string;
}) {
  const w = 400; const h = 120; const pad = { top: 10, bottom: 20, left: 30, right: 10 };
  const allData = dataB ? [...dataA, ...dataB] : dataA;
  const min = Math.min(...allData); const max = Math.max(...allData);
  const range = max - min || 0.1;

  const toX = (i: number) => pad.left + (i / (dataA.length - 1)) * (w - pad.left - pad.right);
  const toY = (v: number) => pad.top + (1 - (v - min) / range) * (h - pad.top - pad.bottom);

  const pathA = dataA.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
  const pathB = dataB?.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map(f => {
        const y = pad.top + (1 - f) * (h - pad.top - pad.bottom);
        const val = (min + f * range).toFixed(2);
        return (
          <g key={f}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#e4e4e7" strokeWidth="0.5" />
            <text x={pad.left - 4} y={y + 2} textAnchor="end" fontSize="6" fill="#a1a1aa">{val}</text>
          </g>
        );
      })}
      {/* X labels (every other) */}
      {dataA.map((_, i) => (
        i % 2 === 0 ? (
          <text key={i} x={toX(i)} y={h - 4} textAnchor="middle" fontSize="5" fill="#a1a1aa">{TIME_LABELS[i]}</text>
        ) : null
      ))}
      {/* Line A */}
      <path d={pathA} fill="none" stroke={colorA} strokeWidth="1.5" strokeLinejoin="round" className="transition-all duration-500" />
      {dataA.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="1.5" fill={colorA} className="transition-all duration-500" />
      ))}
      {/* Line B */}
      {pathB && dataB && (
        <g>
          <path d={pathB} fill="none" stroke={colorB} strokeWidth="1.5" strokeLinejoin="round" className="transition-all duration-500" />
          {dataB.map((v, i) => (
            <circle key={i} cx={toX(i)} cy={toY(v)} r="1.5" fill={colorB} className="transition-all duration-500" />
          ))}
        </g>
      )}
    </svg>
  );
}

// ─── Topology SVG ────────────────────────────────────────────────────────────
function TopologySVG({ nodes, highlightWarning }: { nodes: typeof TOPOLOGY_NODES; highlightWarning: boolean }) {
  const cw = 220; const ch = 400;
  const nodeSpacing = ch / (nodes.length + 1);

  return (
    <svg viewBox={`0 0 ${cw} ${ch}`} className="w-full h-full max-h-[400px]" preserveAspectRatio="xMidYMid meet">
      {/* Connection lines */}
      {nodes.map((_, i) => {
        if (i === nodes.length - 1) return null;
        const y1 = nodeSpacing * (i + 1);
        const y2 = nodeSpacing * (i + 2);
        return (
          <g key={`conn-${i}`}>
            <line x1={cw / 2} y1={y1 + 16} x2={cw / 2} y2={y2 - 16} stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points={`${cw / 2 - 4},${y2 - 22} ${cw / 2 + 4},${y2 - 22} ${cw / 2},${y2 - 28}`} fill="#d4d4d8" />
          </g>
        );
      })}
      {/* Nodes */}
      {nodes.map((node, i) => {
        const y = nodeSpacing * (i + 1);
        const warn = highlightWarning && node.hasWarning;
        return (
          <g key={node.id}>
            <rect
              x={cw / 2 - 70} y={y - 14} width={140} height={28} rx="6"
              fill={warn ? '#fef3c7' : '#f4f4f5'} stroke={warn ? '#f59e0b' : '#e4e4e7'} strokeWidth="1"
              className={warn ? 'animate-pulse' : ''}
            />
            {node.type === 'SOURCE' && <circle cx={cw / 2 - 55} cy={y} r="5" fill="#10b981" />}
            {node.type === 'TRANSIT' && <circle cx={cw / 2 - 55} cy={y} r="5" fill={warn ? '#f59e0b' : '#0ea5e9'} />}
            {node.type === 'CONSUMER' && <rect x={cw / 2 - 58} y={y - 4} width="8" height="8" rx="1" fill="#8b5cf6" />}
            <text x={cw / 2 - 42} y={y + 3} fontSize="6" fill="#52525b" fontWeight="600">{node.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function EMSDetailView({ project }: { project: Project }) {
  // ── Sandbox 01 state ──
  const [lossTracking, setLossTracking] = useState(false);

  // ── Sandbox 02 state ──
  const [itLoad, setItLoad] = useState(45);
  const [aiActive, setAiActive] = useState(false);
  const loadSurge = itLoad >= 85;

  const currentPue = aiActive ? 1.22 : loadSurge ? 1.50 : 1.25;
  const chartLineA = loadSurge ? SURGE_LINE : NORMAL_LINE;
  const chartColorA = loadSurge ? '#ef4444' : '#10b981';

  return (
    <>
      {/* ════════════════════════════════════════════════ */}
      {/* 区块0：顶部大框 - 项目基础信息面板            */}
      {/* ════════════════════════════════════════════════ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <PDot />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            EMS ENERGY MANAGEMENT SYSTEM · AI-DRIVEN SMART CAMPUS
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">{project.title}</h1>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          {project.subtitle}
        </p>
        {/* 核心指标卡 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[9px] text-emerald-600 font-mono font-bold uppercase tracking-wider">年节能效率</div>
              <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">
                <CountUp target={10} suffix="%" decimals={1} />
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">目标年节能 5%~10%</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[9px] text-sky-600 font-mono font-bold uppercase tracking-wider">楼栋级 PUE</div>
              <div className="text-2xl font-bold text-sky-700 font-mono mt-1">
                <CountUp target={1.22} decimals={2} />
              </div>
              <div className="text-[10px] text-sky-500 mt-0.5">从 1.50 极限下探至 &lt; 1.25</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-sky-600" />
            </div>
          </div>
        </div>
        {/* Chips */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术栈</span>
          {(project.chips || []).map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* 组件02：系统拓扑与功能演进区                   */}
      {/* ════════════════════════════════════════════════ */}
      <div className="mt-8 space-y-4">
        <SectionH num="01" title="系统拓扑与功能演进" tag="能源管理全链路" />

        <div className="grid grid-cols-5 gap-2">
          {ARCH_FLOW.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 h-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">{step.step}</span>
                  <span className="text-[9px] font-bold text-zinc-700">{step.title}</span>
                </div>
                <ul className="space-y-1">
                  {step.features.map(f => (
                    <li key={f} className="text-[8px] text-zinc-500 flex items-start gap-1">
                      <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {i < ARCH_FLOW.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-3 h-3 text-zinc-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* 组件03：交互沙盒 01 - 端到端能源足迹追踪器   */}
      {/* ════════════════════════════════════════════════ */}
      <div className="mt-8 space-y-4">
        <SectionH num="02" title="交互沙盒：端到端能源足迹追踪器" tag="设备链路损耗统计" />

        {/* 控制开关 */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => setLossTracking(v => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${lossTracking ? 'bg-emerald-500' : 'bg-zinc-300'}`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${lossTracking ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-[10px] font-mono font-bold text-zinc-500">开启设备链路损耗统计</span>
          <AnimatePresence mode="wait">
            {lossTracking && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-200"
              >
                ESG 减排：21.7 吨 CO₂
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左侧：拓扑网络 */}
          <div className="border border-zinc-200 rounded-xl p-3 bg-white">
            <div className="text-[8px] font-mono font-bold text-zinc-400 mb-2 uppercase tracking-wider">// 能源拓扑网络</div>
            <div className="flex justify-center">
              <TopologySVG nodes={TOPOLOGY_NODES} highlightWarning={lossTracking} />
            </div>
          </div>

          {/* 右侧：环形漏斗 + 表格 */}
          <div className="space-y-3">
            {/* 环形漏斗（用CSS圆环近似） */}
            <div className="border border-zinc-200 rounded-xl p-3 bg-white">
              <div className="text-[8px] font-mono font-bold text-zinc-400 mb-2 uppercase tracking-wider">// 链路损耗分布</div>
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e4e4e7" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={`${lossTracking ? 188 : 60} 251`} strokeLinecap="round" className="transition-all duration-700" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="40 251" strokeDashoffset={lossTracking ? -200 : -70} strokeLinecap="round" className="transition-all duration-700" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray={`${lossTracking ? 30 : 20} 251`} strokeDashoffset={lossTracking ? -248 : -118} strokeLinecap="round" className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-600">{lossTracking ? '520' : '0'}kW</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: '空调制冷', color: 'bg-emerald-500', share: lossTracking ? '75%' : '24%' },
                    { label: '输电线路', color: 'bg-sky-500', share: lossTracking ? '16%' : '16%' },
                    { label: '其他损耗', color: 'bg-amber-500', share: lossTracking ? '9%' : '8%' },
                  ].map(d => (
                    <div key={d.label} className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${d.color}`} />
                      <span className="text-[8px] text-zinc-500">{d.label}</span>
                      <span className="text-[8px] font-mono font-bold text-zinc-600">{d.share}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 资产损耗表格 */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
              <div className="text-[8px] font-mono font-bold text-zinc-400 px-3 pt-3 uppercase tracking-wider">// 设备链路折损明细</div>
              <div className="overflow-x-auto mt-1">
                <table className="w-full text-[8px] font-mono">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left px-2 py-1.5 text-zinc-400 font-bold">监控支路名称</th>
                      <th className="text-right px-2 py-1.5 text-zinc-400 font-bold">进线(kWh)</th>
                      <th className="text-right px-2 py-1.5 text-zinc-400 font-bold">出线(kWh)</th>
                      <th className="text-right px-2 py-1.5 text-zinc-400 font-bold">折损(kWh)</th>
                      <th className="text-right px-2 py-1.5 text-zinc-400 font-bold">损耗率</th>
                      <th className="text-right px-2 py-1.5 text-zinc-400 font-bold">峰谷差价(元)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(lossTracking ? TABLE_DATA_TRUE : TABLE_DATA_FALSE).map((row, i) => (
                      <motion.tr
                        key={row.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`border-b border-zinc-100 ${i % 2 ? 'bg-zinc-50/50' : ''}`}
                      >
                        <td className="px-2 py-1.5 text-zinc-700 font-semibold text-[8.5px]">{row.name}</td>
                        <td className="px-2 py-1.5 text-right text-zinc-600">{row.input}</td>
                        <td className="px-2 py-1.5 text-right text-zinc-600">{row.output}</td>
                        <td className="px-2 py-1.5 text-right text-zinc-600">{row.loss}</td>
                        <td className={`px-2 py-1.5 text-right font-bold ${row.rate !== '--' && parseFloat(row.rate) > 2 ? 'text-red-500' : 'text-zinc-600'}`}>{row.rate}</td>
                        <td className="px-2 py-1.5 text-right font-bold text-amber-600">{row.cost}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* 组件04：交互沙盒 02 - CLF能效基线拟合          */}
      {/* ════════════════════════════════════════════════ */}
      <div className="mt-8 space-y-4">
        <SectionH num="03" title="交互沙盒：CLF 能效基线拟合与 AI 节能智冷顾问" tag="PUE 诊断控制台" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* 左侧：控制区 */}
          <div className="md:col-span-2 space-y-4">
            {/* Slider */}
            <div className="border border-zinc-200 rounded-xl p-4 bg-white">
              <div className="text-[9px] font-mono font-bold text-zinc-500 mb-3">模拟 IT 负载增量</div>
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="range"
                  min={0} max={100} value={itLoad}
                  onChange={e => setItLoad(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <span className={`text-xs font-mono font-bold w-8 text-right ${loadSurge ? 'text-amber-600' : 'text-zinc-600'}`}>
                  {itLoad}%
                </span>
              </div>
              {loadSurge && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-[9px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1"
                >
                  ⚠ 负载超阈值，PUE 跳升至 1.50
                </motion.div>
              )}
            </div>

            {/* AI 按钮 */}
            <div className="border border-zinc-200 rounded-xl p-4 bg-white">
              <div className="text-[9px] font-mono font-bold text-zinc-500 mb-3">激活 AI 节能调优机制</div>
              <button
                onClick={() => setAiActive(v => !v)}
                className={`w-full py-2.5 rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer ${
                  aiActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                {aiActive ? '● AI 节能已激活' : '○ 点击激活 AI 调优'}
              </button>
            </div>

            {/* 黑灯管理状态 */}
            <AnimatePresence>
              {aiActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-emerald-200 bg-emerald-50 rounded-xl p-3"
                >
                  <Lightbulb className="w-4 h-4 text-emerald-500 mb-1" />
                  <div className="text-[9px] font-bold text-emerald-700">12h 黑灯管理状态</div>
                  <div className="text-[9px] text-emerald-600 mt-1">智能调控已接管：夜间定时自动关闭常亮灯，智能控温运行中</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 右侧：仪表盘 + 图表 */}
          <div className="md:col-span-3 space-y-3">
            {/* PUE Gauge */}
            <div className="border border-zinc-200 rounded-xl p-4 bg-white">
              <div className="text-[8px] font-mono font-bold text-zinc-400 mb-2 uppercase tracking-wider">// 实时 PUE 仪表盘</div>
              <div className="flex items-center justify-center gap-6">
                <div className="w-32">
                  <PueGauge value={currentPue} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-zinc-500">最优基线：1.22</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[9px] text-zinc-500">危机阈值：1.50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[9px] text-zinc-500">当前实测：{currentPue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 时序折线图 */}
            <div className="border border-zinc-200 rounded-xl p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider">// PUE 时序趋势</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[7px] text-zinc-400">
                    <span className={`w-2 h-0.5 rounded ${loadSurge ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    {loadSurge ? '传统制冷（冲击）' : '传统制冷基线'}
                  </span>
                  {aiActive && (
                    <span className="flex items-center gap-1 text-[7px] text-emerald-500">
                      <span className="w-2 h-0.5 rounded bg-emerald-500" />
                      CLF 智能拟合新基线
                    </span>
                  )}
                </div>
              </div>
              <div className="h-28">
                <MiniTimeline
                  dataA={chartLineA} labelA={loadSurge ? '传统制冷(冲击)' : '传统制冷基线'} colorA={chartColorA}
                  dataB={aiActive ? AI_LINE : undefined} labelB="CLF 智能拟合新基线" colorB="#10b981"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* 组件05：行业顶级权威资质展台                   */}
      {/* ════════════════════════════════════════════════ */}
      <div className="mt-8 space-y-4">
        <SectionH num="04" title="行业顶级权威资质展台" tag="荣誉 · 认证 · 奖项" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AWARDS.map(a => (
            <div key={a.name} className="border border-zinc-200 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-[8px] font-mono font-bold text-emerald-600 mb-0.5">{a.year}</div>
                  <div className="text-[10px] font-bold text-zinc-800 leading-snug mb-0.5">{a.name}</div>
                  <div className="text-[8px] text-zinc-400 truncate">{a.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部间距 */}
      <div className="h-12" />
    </>
  );
}
