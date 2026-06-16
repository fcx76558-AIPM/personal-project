/**
 * 银联前置支付系统（呼和浩特 1/2 号线）— 详情页
 * 配色参考：金融蓝/琥珀金（card 背景 blue-50/100，高亮 amber-500，风险红 red-500，安全绿 emerald-500）
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, BarChart3, PieChart, Shield, ShieldAlert,
  UserCog, CreditCard, QrCode, FileText, ChevronRight, CheckCircle2,
  AlertTriangle, X, Clock, DollarSign, Activity, Route, Database,
  Lock, Unlock, Users, ArrowRight, Zap, Loader2,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────
const C = {
  blue: {
    50: 'bg-blue-50', 100: 'bg-blue-100', 200: 'border-blue-200',
    400: 'text-blue-400', 500: 'text-blue-500', 600: 'text-blue-600', 700: 'text-blue-700',
    800: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-200',
  },
  amber: {
    50: 'bg-amber-50', 100: 'bg-amber-100', 200: 'border-amber-200',
    300: 'border-amber-300', 400: 'text-amber-400', 500: 'text-amber-500',
    600: 'text-amber-600', 700: 'text-amber-700', 800: 'text-amber-800',
    bg: 'bg-amber-50', border: 'border-amber-200',
  },
  red: {
    50: 'bg-red-50', 100: 'bg-red-100', 200: 'border-red-200', 300: 'border-red-300',
    400: 'text-red-400', 500: 'text-red-500', 600: 'text-red-600', 700: 'text-red-700',
    bg: 'bg-red-50', border: 'border-red-200',
  },
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200',
    400: 'text-emerald-400', 500: 'text-emerald-500', 600: 'text-emerald-600',
    700: 'text-emerald-700', 800: 'text-emerald-800',
    bg: 'bg-emerald-50', border: 'border-emerald-200',
  },
  zinc: {
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200',
    400: 'text-zinc-400', 500: 'text-zinc-500', 600: 'text-zinc-600', 700: 'text-zinc-700',
    900: 'text-zinc-900', bg: 'bg-zinc-50', border: 'border-zinc-200',
  },
};

const PulseDot = ({ color = 'amber' }: { color?: string }) => (
  <div className={`h-2 w-2 rounded-full bg-${color}-500 animate-pulse`} />
);

const SectionDivider = () => <div className="border-t border-zinc-200 my-8" />;

// ─── Section 2: 系统架构四大模块卡片 ──────────────────────────────────────────

const archBlocks = [
  {
    icon: BarChart3,
    label: '数字化运营与营收看板层',
    subtitle: '多线客流时序监控',
    desc: '深度聚合 1 号线蓝线/2 号线绿线实时客流时序数据流，打通历年收益趋势对比与明细占比，提供一键可达的快捷业务入口微卡片，全面穿透数字化营收大盘。',
    color: 'blue',
  },
  {
    icon: Route,
    label: '交易流水与行程映射层',
    subtitle: 'O-D 轨迹精确映射',
    desc: '承接多线透传的脱机/联机交易，建立多渠道结算清分矩阵。将散乱的交易流水精确对齐为乘客的「进站-出站」完整链路（O-D 轨迹），扣费账单与空间轨迹 100% 强绑定。',
    color: 'emerald',
  },
  {
    icon: DollarSign,
    label: '金融账务对账结算层',
    subtitle: '秒级自动轧差',
    desc: '封装核心平账状态机，无缝并接银行及银联网络对账单导入。支持秒级全量自动轧差对账，针对单边账、错账建立标准轧差平账机制，消除票款漏损。',
    color: 'amber',
  },
  {
    icon: ShieldAlert,
    label: '乘客信用风控管理层',
    subtitle: '黑名单生命周期',
    desc: '专门应对「先乘后付」信用垫资风险，针对分卡刷票、额度不足导致扣款失败用户，秒级拉入黑名单限制进站；补缴后一键解冻移出，全生命周期闭环管理。',
    color: 'red',
  },
];

function ArchitectureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {archBlocks.map((block, idx) => {
        const Icon = block.icon;
        const colorMap: Record<string, string> = {
          blue: 'bg-blue-50/60 border-blue-200 hover:border-blue-400',
          emerald: 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-400',
          amber: 'bg-amber-50/60 border-amber-200 hover:border-amber-400',
          red: 'bg-red-50/60 border-red-200 hover:border-red-400',
        };
        const iconBg: Record<string, string> = {
          blue: 'bg-blue-100',
          emerald: 'bg-emerald-100',
          amber: 'bg-amber-100',
          red: 'bg-red-100',
        };
        const iconColor: Record<string, string> = {
          blue: 'text-blue-600',
          emerald: 'text-emerald-600',
          amber: 'text-amber-600',
          red: 'text-red-600',
        };
        const badgeBg: Record<string, string> = {
          blue: 'bg-blue-100 text-blue-700',
          emerald: 'bg-emerald-100 text-emerald-700',
          amber: 'bg-amber-100 text-amber-700',
          red: 'bg-red-100 text-red-700',
        };
        return (
          <div
            key={idx}
            className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-default hover:shadow-lg ${colorMap[block.color]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[block.color]}`}>
                <Icon className={`w-5 h-5 ${iconColor[block.color]}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-zinc-800">{block.label}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold ${badgeBg[block.color]}`}>
                    {block.subtitle}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{block.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Sandbox 01: 多线实时客流监控与营收数字化驾驶舱 ────────────────────────────

function TrafficSandbox() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: string; y1: number; y2: number } | null>(null);

  const data = {
    day: {
      labels: ['06', '08', '10', '12', '14', '16', '18', '20'],
      line1: [4200, 8800, 12300, 9800, 14200, 11600, 8900, 5400],
      line2: [3100, 7200, 10900, 8200, 12800, 9400, 7100, 3900],
    },
    week: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      line1: [62000, 71000, 68000, 73000, 81000, 94000, 88000],
      line2: [51000, 59000, 56000, 61000, 68000, 82000, 76000],
    },
    month: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      line1: [280000, 310000, 295000, 320000, 340000, 365000],
      line2: [230000, 260000, 245000, 270000, 285000, 305000],
    },
  };

  const d = data[period];
  const maxVal = Math.max(...d.line1, ...d.line2);
  const hoveredIdx = hoveredPoint ? d.labels.indexOf(hoveredPoint.x) : -1;

  const revenueData = [
    { label: '票价营收', pct: 72, color: 'blue' },
    { label: '卡票营收', pct: 18, color: 'emerald' },
    { label: '联机交易', pct: 10, color: 'amber' },
  ];

  return (
    <div className="space-y-4">
      {/* 时间维度切换器 */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
          多线路客流时序监控
        </span>
        <div className="flex gap-1">
          {(['day', 'week', 'month'] as const).map(p => (
            <button
              key={p}
              onClick={() => { setPeriod(p); setHoveredPoint(null); }}
              className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                period === p
                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                  : 'bg-zinc-50 text-zinc-500 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {p === 'day' ? '日' : p === 'week' ? '周' : '月'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* 左侧：双线面积时序图 */}
        <div className="lg:col-span-2 space-y-2">
          <div className="bg-white rounded-2xl p-4 border border-zinc-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[9px] font-bold text-zinc-600">1号线（蓝线）</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold text-zinc-600">2号线（绿线）</span>
              </div>
              {hoveredPoint && (
                <span className="ml-auto text-[9px] font-mono text-amber-600 font-bold animate-pulse">
                  {hoveredPoint.x} · 蓝 {hoveredPoint.y1.toLocaleString()} / 绿 {hoveredPoint.y2.toLocaleString()}
                </span>
              )}
            </div>

            {/* 面积图 */}
            <div className="relative h-32 flex items-end gap-1">
              {d.labels.map((label, i) => {
                const h1 = (d.line1[i] / maxVal) * 100;
                const h2 = (d.line2[i] / maxVal) * 100;
                const isHovered = hoveredIdx === i;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-end gap-0.5 cursor-pointer group/bar"
                    onMouseEnter={() => setHoveredPoint({ x: label, y1: d.line1[i], y2: d.line2[i] })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div className="w-full flex flex-col-reverse gap-[2px]">
                      <motion.div
                        key={`line1-${i}`}
                        initial={false}
                        animate={{ height: `${h1}%` }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className={`w-full rounded-t-sm ${isHovered ? 'bg-blue-600' : 'bg-blue-400'} group-hover/bar:bg-blue-600`}
                      />
                      <motion.div
                        key={`line2-${i}`}
                        initial={false}
                        animate={{ height: `${h2}%` }}
                        transition={{ duration: 0.4, delay: i * 0.03 + 0.02 }}
                        className={`w-full rounded-t-sm ${isHovered ? 'bg-emerald-600' : 'bg-emerald-400'} group-hover/bar:bg-emerald-600`}
                      />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-400 mt-1">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* 悬浮气泡 */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 shadow-sm"
                >
                  <div className="text-[9px] font-mono text-blue-600 font-bold">14:00</div>
                  <div className="text-[8px] text-zinc-500">蓝线 {hoveredPoint.y1.toLocaleString()} 人次</div>
                  <div className="text-[8px] text-zinc-500">绿线 {hoveredPoint.y2.toLocaleString()} 人次</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 收益走势 + 环形图 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 收益柱状图 */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">收益走势</span>
              <div className="flex items-end gap-1 h-16">
                {[65, 78, 72, 85, 90, 88, 94, 97].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-amber-400 hover:bg-amber-500 cursor-pointer transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[7px] text-zinc-400">Q1</span>
                <span className="text-[7px] text-zinc-400">Q2</span>
                <span className="text-[7px] text-zinc-400">Q3</span>
                <span className="text-[7px] text-zinc-400">Q4</span>
              </div>
            </div>

            {/* 明细占比环形图 */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">营收占比</span>
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4"
                      strokeDasharray={`${72 * 0.72} ${100 - 72 * 0.72}`} strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4"
                      strokeDasharray={`${72 * 0.18} ${100 - 72 * 0.18}`} strokeDashoffset={`-${72 * 0.72}`} />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4"
                      strokeDasharray={`${72 * 0.10} ${100 - 72 * 0.10}`} strokeDashoffset={`-${72 * 0.90}`} />
                  </svg>
                </div>
                <div className="space-y-1">
                  {revenueData.map(r => (
                    <div key={r.label} className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-sm ${r.color === 'blue' ? 'bg-blue-500' : r.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-[8px] text-zinc-600">{r.label}</span>
                      <span className="text-[8px] font-bold text-zinc-700">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：快捷启动微卡片 */}
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">快捷业务入口</span>
          {[
            { icon: QrCode, label: '二维码交易明细', sub: '实时脱机/联机流水', color: 'blue' },
            { icon: CreditCard, label: '银联扣费明细', sub: '银行/银联对账单', color: 'amber' },
            { icon: ShieldAlert, label: '黑名单拦截域', sub: '秒级风控拦截', color: 'red' },
            { icon: Route, label: '行程流水(O-D)', sub: 'O-D 轨迹精确映射', color: 'emerald' },
          ].map((card, i) => {
            const Icon = card.icon;
            const colorMap: Record<string, string> = {
              blue: 'border-blue-200 bg-blue-50 hover:border-blue-400',
              amber: 'border-amber-200 bg-amber-50 hover:border-amber-400',
              red: 'border-red-200 bg-red-50 hover:border-red-400',
              emerald: 'border-emerald-200 bg-emerald-50 hover:border-emerald-400',
            };
            const iconColorMap: Record<string, string> = {
              blue: 'text-blue-600',
              amber: 'text-amber-600',
              red: 'text-red-600',
              emerald: 'text-emerald-600',
            };
            return (
              <div key={i} className={`p-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${colorMap[card.color]}`}>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${iconColorMap[card.color]}`} />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-zinc-800">{card.label}</div>
                    <div className="text-[8px] text-zinc-500">{card.sub}</div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-400 ml-auto shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Sandbox 02: 清分流水导入与自动轧差 ──────────────────────────────────────

function ReconciliationSandbox() {
  const [tab, setTab] = useState<'detail' | 'stat'>('detail');
  const [executing, setExecuting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [flashingRows, setFlashingRows] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const txRows = [
    { seq: 'TX20240616001', card: '6217****8842', time: '2024-06-16 09:14:22', amount: '3.00', status: 'normal' as const },
    { seq: 'TX20240616002', card: '6217****3301', time: '2024-06-16 09:22:07', amount: '5.00', status: 'exception' as const },
    { seq: 'TX20240616003', card: '6217****7729', time: '2024-06-16 09:31:55', amount: '3.00', status: 'normal' as const },
    { seq: 'TX20240616004', card: '6217****1156', time: '2024-06-16 09:45:13', amount: '4.00', status: 'exception' as const },
    { seq: 'TX20240616005', card: '6217****9904', time: '2024-06-16 10:02:38', amount: '3.00', status: 'normal' as const },
  ];

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-5), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleExecute = () => {
    if (executing || completed) return;
    setExecuting(true);
    addLog('正在执行金融级错账轧差调账...');

    setTimeout(() => {
      const exceptionIndices = txRows.map((r, i) => r.status === 'exception' ? i : -1).filter(i => i >= 0);
      setFlashingRows(exceptionIndices);
      addLog(`检测到 ${exceptionIndices.length} 条异常流水记录`);

      setTimeout(() => {
        setFlashingRows([]);
        setCompleted(true);
        setExecuting(false);
        addLog('差异账自动轧差完成 · 账务已平');
        addLog('金融级清分对账结束 · 结果已归档');
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-4">
      {/* 页签 */}
      <div className="flex gap-1">
        {(['detail', 'stat'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-[9px] px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              tab === t ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-zinc-50 text-zinc-500 border border-zinc-200'
            }`}
          >
            {t === 'detail' ? '明细报表' : '统计报表'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 左侧：交易流向状态机 */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3">交易流向状态机</span>
          <div className="space-y-2">
            {[
              { label: '交易发起', icon: QrCode, color: 'blue', done: true },
              { label: '银联通道处理', icon: Loader2, color: 'blue', done: true },
              { label: '地铁清分系统', icon: Database, color: 'amber', done: true },
              { label: 'O-D 轨迹映射', icon: Route, color: 'emerald', done: true },
              { label: '轧差引擎', icon: DollarSign, color: completed ? 'emerald' : 'amber', done: completed },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    step.done ? 'bg-emerald-100' : 'bg-amber-50'
                  }`}>
                    {step.done ? (
                      <CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    ) : (
                      <Icon className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '2s' }} />
                    )}
                  </div>
                  <div className="flex-1 h-1 rounded-full bg-zinc-100 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step.done ? '100%' : '0%' }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-y-0 left-0 rounded-full ${completed ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    />
                  </div>
                  <span className={`text-[9px] font-bold ${step.done ? 'text-zinc-700' : 'text-zinc-400'}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧：对账明细表格 */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-[9px] font-mono">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 uppercase">
                <th className="text-left px-2 py-2 font-bold">流水号</th>
                <th className="text-left px-2 py-2 font-bold">卡号</th>
                <th className="text-left px-2 py-2 font-bold">交易时间</th>
                <th className="text-right px-2 py-2 font-bold">金额</th>
                <th className="text-center px-2 py-2 font-bold">状态</th>
              </tr>
            </thead>
            <tbody>
              {txRows.map((row, i) => {
                const isException = row.status === 'exception';
                const isFlashing = flashingRows.includes(i);
                return (
                  <motion.tr
                    key={row.seq}
                    animate={
                      isFlashing
                        ? { backgroundColor: ['#fef2f2', '#bbf7d0', '#fef2f2', '#bbf7d0', '#bbf7d0'] }
                        : { backgroundColor: isException ? '#fef2f2' : 'transparent' }
                    }
                    transition={{ duration: 1.2 }}
                    className={`border-b border-zinc-100 ${isException && !isFlashing ? 'bg-red-50' : ''}`}
                  >
                    <td className={`px-2 py-1.5 font-bold ${isException ? 'text-red-600' : 'text-zinc-600'}`}>{row.seq}</td>
                    <td className="px-2 py-1.5 text-zinc-500">{row.card}</td>
                    <td className="px-2 py-1.5 text-zinc-500">{row.time}</td>
                    <td className={`text-right px-2 py-1.5 font-bold ${isException ? 'text-red-600' : 'text-zinc-700'}`}>{row.amount}</td>
                    <td className="text-center px-2 py-1.5">
                      <span className={`inline-block text-[7px] px-1.5 py-0.5 rounded-full font-bold ${
                        completed && isException
                          ? 'bg-emerald-100 text-emerald-700'
                          : isException
                          ? 'bg-red-100 text-red-600 animate-pulse'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {completed && isException ? '已轧差' : isException ? '异常' : '正常'}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 吸底金色按钮 */}
      <motion.button
        onClick={handleExecute}
        disabled={executing || completed}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 ${
          completed
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : executing
            ? 'bg-amber-100 text-amber-500 border-amber-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-500 hover:from-amber-500 hover:to-amber-700 shadow-sm hover:shadow-md'
        }`}
      >
        {executing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            执行金融级错账轧差调账中...
          </span>
        ) : completed ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            差异账 100% 全自动轧差完成
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            一键执行金融级错账轧差调账
          </span>
        )}
      </motion.button>

      {/* 账务清分日志 */}
      <AnimatePresence>
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-zinc-950 rounded-xl p-3 overflow-hidden"
          >
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-2">账务清分日志</div>
            <div className="space-y-0.5">
              {logs.map((log, i) => (
                <div key={i} className="text-[9px] font-mono text-emerald-400">{log}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sandbox 03: 信用风控与黑名单补缴 ─────────────────────────────────────────

function BlacklistSandbox() {
  const [unfreezing, setUnfreezing] = useState(false);
  const [unfrozen, setUnfrozen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [blink, setBlink] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-6), msg]);

  const handleUnfreeze = () => {
    if (unfreezing || unfrozen) return;
    setUnfreezing(true);
    setBlink(true);
    addLog('系统正在核验补缴凭证与账务一致性...');

    setTimeout(() => {
      addLog('补缴金额 5.00 元已到账确认');
      setBlink(false);
      setUnfrozen(true);
      setUnfreezing(false);
      addLog('黑名单状态机切换：封锁中 → 正常放行');
      addLog('乘客 6217****3301 已移出风控黑名单');
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 左侧：RBAC 用户管理表单 */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <UserCog className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">RBAC 用户管理</span>
          </div>

          <div className="space-y-3">
            {[
              { label: '用户 ID', value: 'U-20240616-001' },
              { label: '持卡人', value: '张三' },
              { label: '卡号', value: '6217****3301' },
              { label: '当前状态', value: unfrozen ? '正常' : '黑名单封锁中' },
              { label: '欠费金额', value: '5.00 元' },
              { label: '触发原因', value: '额度不足扣款失败' },
            ].map((field, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-500 w-20 shrink-0">{field.label}</span>
                <div className={`flex-1 rounded-lg px-2.5 py-1.5 border text-[10px] font-bold ${
                  field.label === '当前状态'
                    ? unfrozen
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                }`}>
                  {field.value}
                </div>
              </div>
            ))}

            {/* O-D 轨迹 */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-zinc-500 w-20 shrink-0">O-D 轨迹</span>
              <div className="flex-1 flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5">
                <Route className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="text-[10px] font-bold text-blue-700">呼家楼站（1号线）</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
                <span className="text-[10px] font-bold text-emerald-700">金台路站（6号线）</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：状态卡 */}
        <div className={`rounded-2xl p-4 border-2 transition-all duration-700 ${
          unfrozen
            ? 'bg-emerald-50 border-emerald-300'
            : blink
            ? 'bg-red-50 border-red-300 animate-pulse'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              unfrozen ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              {unfrozen ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-800">乘客信用状态卡</div>
              <div className={`text-[8px] font-mono ${unfrozen ? 'text-emerald-600' : 'text-red-500'}`}>
                {unfrozen ? '正常绿码放行' : '黑名单封锁中'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white/80 rounded-xl p-3 border border-zinc-100">
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                <div>
                  <span className="text-zinc-500">持卡人</span>
                  <div className="font-bold text-zinc-800">张三</div>
                </div>
                <div>
                  <span className="text-zinc-500">欠费金额</span>
                  <div className="font-bold text-red-600">¥5.00</div>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-500">O-D 轨迹</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9px] font-bold text-blue-700">呼家楼</span>
                    <ArrowRight className="w-2 h-2 text-zinc-400" />
                    <span className="text-[9px] font-bold text-emerald-700">金台路</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-500">状态</span>
                  <motion.div
                    animate={blink ? { backgroundColor: ['#fef2f2', '#bbf7d0', '#fef2f2'] } : {}}
                    transition={{ duration: 1.2, times: [0, 0.5, 1] }}
                    className={`inline-block mt-0.5 text-[8px] px-2 py-0.5 rounded-full font-bold ${
                      unfrozen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600 animate-pulse'
                    }`}
                  >
                    {unfrozen ? '正常绿码放行' : '黑名单封锁中'}
                  </motion.div>
                </div>
              </div>
            </div>

            {!unfrozen && !unfreezing && (
              <div className="bg-red-100 rounded-xl p-2 border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[8px] text-red-600 leading-relaxed">
                    此用户因扣款失败已进入黑名单，限制进站通行。请完成补缴后点击下方按钮解除封锁。
                  </p>
                </div>
              </div>
            )}

            {unfrozen && (
              <div className="bg-emerald-100 rounded-xl p-2 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <p className="text-[8px] text-emerald-700 font-bold">补缴成功，用户已解除封锁恢复正常通行</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 吸底按钮 */}
      <motion.button
        onClick={handleUnfreeze}
        disabled={unfreezing || unfrozen}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 ${
          unfrozen
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : unfreezing
            ? 'bg-amber-100 text-amber-500 border-amber-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-400 to-red-600 text-white border-red-500 hover:from-red-500 hover:to-red-700 shadow-sm hover:shadow-md'
        }`}
      >
        {unfreezing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            核验补缴凭证中...
          </span>
        ) : unfrozen ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            补缴解冻完成 · 状态已更新
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4" />
            一键完成补缴解冻
          </span>
        )}
      </motion.button>

      {/* 状态机流转日志 */}
      <AnimatePresence>
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-zinc-950 rounded-xl p-3 overflow-hidden"
          >
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-2">状态机流转日志</div>
            <div className="space-y-0.5">
              {logs.map((log, i) => (
                <div key={i} className="text-[9px] font-mono text-emerald-400">{log}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────

export function UnionPayDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ═══ Section 0: Header ═══ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-600">
            UNIONPAY FRONT-END SETTLEMENT SYSTEM · HOHHOT LINE 1/2
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">银联前置支付系统（呼和浩特 1/2 号线）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          专为城市轨道交通设计开发的高并发、金融级清分对账与信用垫资风控底层结算核心平台。
          主导设计「行程 O-D 轨迹精确映射」与「差异账自动轧差平衡引擎」，达成差异错账 100% 全自动轧差。
        </p>
      </div>

      {/* ═══ Section 1: Tags Row ═══ */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        {/* 第一行：chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 功能模块</span>
          {['多线客流时序监控', 'O-D行程轨迹映射', '错账自动轧差引擎', 'RBAC标准权限控制', '黑名单生命周期管理'].map(tag => (
            <span key={tag} className="bg-amber-50 text-amber-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-amber-200">
              {tag}
            </span>
          ))}
        </div>
        {/* 第二行：metrics */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能指标</span>
          {[
            { label: '风控拦截时效', value: '秒级' },
            { label: '差异账自动轧差率', value: '100%' },
            { label: '流水分流映射精度', value: 'O-D轨迹' },
            { label: '对账结算业务级', value: '金融级' },
          ].map(m => (
            <span key={m.label} className="border border-blue-300 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-blue-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ Section 2: 系统架构四大模块卡片 ═══ */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">
          // 02 系统架构 · 四大功能治理模块
        </span>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <ArchitectureCards />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 3: Sandbox 01 — 多线实时客流监控与营收数字化驾驶舱 ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // 沙盒 01 / 多线实时客流监控与营收数字化驾驶舱
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-600">
            <PulseDot color="amber" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <TrafficSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 4: Sandbox 02 — 清分流水导入与自动轧差 ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // 沙盒 02 / 清分流水导入与自动轧差
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-600">
            <PulseDot color="amber" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <ReconciliationSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ Section 5: Sandbox 03 — 信用风控与黑名单补缴 ═══ */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // 沙盒 03 / 信用风控与黑名单补缴
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-600">
            <PulseDot color="amber" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <BlacklistSandbox />
        </div>
      </div>
    </>
  );
}