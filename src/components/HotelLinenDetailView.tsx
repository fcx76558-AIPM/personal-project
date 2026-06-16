import React, { useState, useEffect } from 'react';
import {
  Radio, Activity, Brain, Smartphone,
  Download, AlertTriangle, CheckCircle2,
  Scan, Phone, ChevronRight, Package,
  TrendingUp, Wifi, Clock, Trash2
} from 'lucide-react';
import { Project } from '../types';

function AnimatedNumber({ value, decimals = 0, duration = 600 }: {
  value: number; decimals?: number; duration?: number;
}) {
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

function DonutChart({ value, max, color, size = 48, stroke = 5 }: {
  value: number; max: number; color: string; size?: number; stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${circ * pct} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

const archLayers = [
  { name: 'IoT 智能化硬件层', desc: 'RFID 标签 + 读写器 + PDA 扫描终端', icon: Radio },
  { name: '数据采集与时序监控层', desc: '实时流量、状态变化、异常事件时序数据库', icon: Activity },
  { name: 'AI 分析决策层', desc: '需求预测、自动补货、防错逻辑、资产健康模型', icon: Brain },
  { name: '多端高级应用层', desc: '高管看板、保洁 APP、住客 H5、Agent 后台', icon: Smartphone },
];

const productTags = [
  '出厂级RFID硬件集成',
  'Bento高管治理看板',
  '傻瓜化防呆保洁APP',
  '住客安心住存证H5',
  '自动补货Agent后台',
];

const valueMetrics = [
  { label: '自动补货闭环', value: '100%', highlight: '转化' },
  { label: '交接清点效率提升', value: '40%', highlight: '' },
  { label: '追踪溯源深度', value: '单件级', highlight: '' },
  { label: '周转盘点流转', value: '秒级', highlight: '' },
];

// ─── Sandbox 01 ──────────────────────────────────────────────────────────────
function DonutRow({ label, value, max, color }: {
  label: string; value: number; max: number; color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <DonutChart value={value} max={max} color={color} size={52} stroke={5} />
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-bold text-slate-900">
          <AnimatedNumber value={value} />
        </div>
      </div>
    </div>
  );
}

function ReconciliationRadar({ triggered }: { triggered: boolean }) {
  const sent = 200;
  const returned = triggered ? 188 : 200;
  const missing = sent - returned;
  const pct = ((missing / sent) * 100).toFixed(1);

  return (
    <div
      className={`rounded-xl border-2 transition-all duration-500 ${
        triggered
          ? 'border-red-400 bg-red-50 shadow-[0_0_0_3px_rgba(248,113,113,0.25)] animate-pulse'
          : 'border-emerald-200 bg-emerald-50'
      }`}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">洗涤厂交接对账</span>
          <span className={`text-xs font-mono font-bold ${triggered ? 'text-red-600' : 'text-emerald-600'}`}>
            {triggered ? `差异 ${pct}%` : '无差异'}
          </span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-lg p-3 text-center border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">已送出</div>
            <div className="text-xl font-bold text-slate-700">{sent}</div>
            <div className="text-[10px] text-slate-400">件</div>
          </div>
          <div className="flex items-center text-slate-300">
            <ChevronRight size={16} />
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 text-center border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">已返回</div>
            <div className={`text-xl font-bold ${triggered ? 'text-red-600' : 'text-emerald-600'}`}>
              {returned}
            </div>
            <div className="text-[10px] text-slate-400">件</div>
          </div>
        </div>
        {triggered && (
          <div className="flex items-center gap-2 bg-red-100 rounded-lg px-3 py-2">
            <AlertTriangle size={14} className="text-red-600 shrink-0" />
            <span className="text-xs text-red-700 font-medium">
              缺少 {missing} 件，大浴巾为主，请联系洗涤厂核查
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sandbox 02 ──────────────────────────────────────────────────────────────
function PDASimulator({ isAbnormal }: { isAbnormal: boolean }) {
  return (
    <div className="flex justify-center">
      {/* Phone frame */}
      <div className="relative bg-slate-800 rounded-[32px] p-2 w-[220px] shadow-2xl">
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-full z-10" />
        {/* Screen */}
        <div className="bg-white rounded-[22px] overflow-hidden pt-8 pb-3 px-3 flex flex-col h-[420px]">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Scan size={14} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">张阿姨</div>
              <div className="text-[10px] text-slate-400">ID: 9527 · 3F楼层布草间通道</div>
            </div>
            <div className="ml-auto">
              <div className={`w-2 h-2 rounded-full ${isAbnormal ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`flex-1 rounded-xl flex flex-col items-center justify-center transition-all duration-500 ${
            isAbnormal ? 'bg-red-50' : 'bg-emerald-50'
          }`}>
            {isAbnormal ? (
              <>
                <AlertTriangle size={52} className="text-red-500 mb-3" />
                <div className="text-red-600 font-bold text-base text-center leading-snug px-2">
                  注意！漏掉 1 条大浴巾
                </div>
                <div className="text-red-400 text-xs mt-1 text-center">请检查 302 房间</div>
              </>
            ) : (
              <>
                <CheckCircle2 size={52} className="text-emerald-500 mb-3" />
                <div className="text-emerald-700 font-bold text-base text-center leading-snug px-2">
                  本车收妥 50 件
                </div>
                <div className="text-emerald-500 text-xs mt-1">无差异</div>
              </>
            )}
          </div>

          {/* Scan Stats */}
          <div className="mt-3 bg-slate-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">本次扫描</span>
              <span className="text-xs font-bold text-indigo-600">{isAbnormal ? 49 : 50} 件</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isAbnormal ? 'bg-red-400' : 'bg-indigo-500'
                }`}
                style={{ width: isAbnormal ? '98%' : '100%' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-slate-400">已核对</span>
              <span className="text-[9px] text-slate-400">{isAbnormal ? '1 漏读' : '0 异常'}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className={`mt-2 w-full py-2 rounded-lg text-xs font-medium transition-colors ${
            isAbnormal
              ? 'bg-red-100 text-red-600'
              : 'bg-indigo-100 text-indigo-600'
          }`}>
            {isAbnormal ? '已记录异常' : '等待交接确认'}
          </button>
        </div>
        {/* Side buttons */}
        <div className="absolute right-[6px] top-20 w-1 h-6 bg-slate-700 rounded-full" />
        <div className="absolute right-[6px] top-28 w-1 h-10 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

// ─── Sandbox 03 ──────────────────────────────────────────────────────────────
function ForecastChart({ gap }: { gap: boolean }) {
  const values = [45.2, 52.0, 68.5, 95.0, 98.0, 92.5, 40.0];
  const weeks = 7;
  const w = 280, h = 120;
  const padX = 30, padY = 10;
  const chartW = w - padX * 2, chartH = h - padY * 2;
  const safetyLine = 80; // percentage for safety stock
  const maxVal = 110;

  const toX = (i: number) => padX + (i / (weeks - 1)) * chartW;
  const toY = (v: number) => padY + chartH - (v / maxVal) * chartH;

  const pts = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full">
        {/* Grid lines */}
        {[0, 50, 100].map((v) => (
          <line
            key={v}
            x1={padX} y1={toY(v)} x2={padX + chartW} y2={toY(v)}
            stroke="#e2e8f0" strokeWidth={1}
          />
        ))}
        <text x={padX - 2} y={toY(0) + 3} fontSize={7} fill="#94a3b8" textAnchor="end">0</text>
        <text x={padX - 2} y={toY(100) + 3} fontSize={7} fill="#94a3b8" textAnchor="end">100</text>

        {/* Safety stock line */}
        <line
          x1={padX} y1={toY(safetyLine)} x2={padX + chartW} y2={toY(safetyLine)}
          stroke="#6366f1" strokeWidth={1.5} strokeDasharray="4 3"
        />
        <text x={padX + 2} y={toY(safetyLine) - 3} fontSize={7} fill="#6366f1">安全库存阈值</text>

        {/* Area fill */}
        <polygon
          points={`${toX(0)},${toY(0)} ${pts} ${toX(weeks - 1)},${toY(0)}`}
          fill="url(#forecastGrad)"
          opacity={0.15}
        />

        {/* Line */}
        <polyline
          points={pts}
          fill="none"
          stroke="#6366f1"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {values.map((v, i) => (
          <circle key={i} cx={toX(i)} cy={toY(v)} r={3} fill="#6366f1" />
        ))}

        {/* Gap annotation on peak week */}
        {gap && (
          <>
            <line
              x1={toX(4)} y1={toY(98)}
              x2={toX(4)} y2={toY(safetyLine)}
              stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="3 2"
            />
            <rect x={toX(4) - 22} y={toY((98 + safetyLine) / 2) - 10} width={44} height={16}
              rx={4} fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} />
            <text x={toX(4)} y={toY((98 + safetyLine) / 2) + 2}
              fontSize={8} fill="#92400e" textAnchor="middle" fontWeight="bold">缺口 200</text>
          </>
        )}

        <defs>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between px-7">
        {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'].map((w) => (
          <span key={w} className="text-[9px] text-slate-400">{w}</span>
        ))}
      </div>
    </div>
  );
}

export function HotelLinenDetailView({ project }: { project: Project }) {
  const [discrepancyTriggered, setDiscrepancyTriggered] = useState(false);
  const [isAbnormal, setIsAbnormal] = useState(false);
  const [agentTriggered, setAgentTriggered] = useState(false);

  const assetData = [
    { label: '在库', value: 5420, max: 6000, color: '#6366f1' },
    { label: '在用', value: 7850, max: 10000, color: '#8b5cf6' },
    { label: '洗涤中', value: 2100, max: 3000, color: '#a78bfa' },
    { label: '已报废', value: 430, max: 2000, color: '#cbd5e1' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Section 0: Header ──────────────────────────────────────────────── */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-600">
            LINEN LIFECYCLE SaaS · RFID + AI DECISION ENGINE
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          酒店布草全生命周期管理 SaaS
        </h1>
        <p className="text-sm text-slate-500">{project.subtitle}</p>
      </div>

      {/* ── Section 1: Tags Row ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {productTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-white text-slate-700 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {valueMetrics.map((m) => (
            <span
              key={m.label}
              className="px-3 py-1 text-xs rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold"
            >
              {m.label} <span className="text-indigo-900">{m.value}</span>
              {m.highlight && <span className="text-indigo-400 ml-0.5">{m.highlight}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section 2: Architecture Card ───────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-100">
            系统架构
          </span>
        </div>
        <div className="bg-white divide-y divide-slate-100">
          {archLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div key={layer.name} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{layer.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{layer.desc}</div>
                </div>
                {i < archLayers.length - 1 && (
                  <div className="ml-auto text-slate-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M8 13l4-4M8 13l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sandbox 01: Executive Bento Dashboard ─────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            SANDBOX 01
          </span>
          <span className="text-xs font-semibold text-slate-600">高管治理 Bento 看板 &amp; 洗涤厂对账雷达</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="grid grid-cols-2 gap-5">
            {/* Left: Asset matrix */}
            <div className="space-y-4">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">资产状态矩阵</div>
              <div className="grid grid-cols-2 gap-3">
                {assetData.map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <DonutRow label={item.label} value={item.value} max={item.max} color={item.color} />
                    <div className="mt-1 text-[10px] text-slate-400">
                      占比 {((item.value / item.max) * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  <TrendingUp size={12} />
                  实时监控中
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                  <Download size={12} />
                  导出报表
                </button>
              </div>
            </div>

            {/* Right: Reconciliation radar */}
            <div className="space-y-4">
              <ReconciliationRadar triggered={discrepancyTriggered} />
              <button
                onClick={() => setDiscrepancyTriggered(!discrepancyTriggered)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  discrepancyTriggered
                    ? 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
                    : 'bg-slate-800 text-white hover:bg-slate-900'
                }`}
              >
                {discrepancyTriggered ? '重置为正常交接' : '模拟外部洗涤厂清点交接出现漏返差异'}
              </button>
              {discrepancyTriggered && (
                <button className="w-full py-2 rounded-xl text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5">
                  <Download size={12} />
                  一键导出分钟级对账差异报表
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sandbox 02: PDA Anti-fool Handover ────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            SANDBOX 02
          </span>
          <span className="text-xs font-semibold text-slate-600">PDA 防呆布草交接 &amp; 语音反馈</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <PDASimulator isAbnormal={isAbnormal} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-800">交接流程状态</div>
                <div className="space-y-2">
                  {[
                    { label: '扫描绑定', done: true },
                    { label: '数量核对', done: !isAbnormal },
                    { label: '异常确认', done: isAbnormal },
                    { label: '云端存证', done: !isAbnormal },
                  ].map((step) => (
                    <div key={step.label} className="flex items-center gap-2">
                      {step.done ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                      )}
                      <span className={`text-xs ${step.done ? 'text-slate-700' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">操作员</div>
                <div className="text-sm font-semibold text-slate-800">张阿姨 · 工号 9527</div>
                <div className="text-xs text-slate-400">3F 楼层布草间通道 · 当前班次</div>
              </div>
              <button
                onClick={() => setIsAbnormal(!isAbnormal)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isAbnormal
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200'
                    : 'bg-slate-800 text-white hover:bg-slate-900'
                }`}
              >
                {isAbnormal ? '切换至正常交接场景' : '切换至漏读扫描异常场景'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sandbox 03: PMS Demand Forecast ───────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            SANDBOX 03
          </span>
          <span className="text-xs font-semibold text-slate-600">PMS 需求预测 &amp; 自动补货 Agent</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Forecast chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">需求预测</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">1.5m 高档白床单 · 7周预测</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-indigo-500" style={{ borderTop: '1.5px dashed #6366f1' }} />
                  <span className="text-[10px] text-slate-400">安全库存</span>
                </div>
              </div>
              <ForecastChart gap={agentTriggered} />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                  <div className="text-[10px] text-slate-400">预测峰值</div>
                  <div className="text-sm font-bold text-indigo-600">98%</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                  <div className="text-[10px] text-slate-400">安全阈值</div>
                  <div className="text-sm font-bold text-slate-600">80%</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center border border-red-100">
                  <div className="text-[10px] text-red-400">预测缺口</div>
                  <div className="text-sm font-bold text-red-600">
                    {agentTriggered ? '200 件' : '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Agent decision */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">AI 补货决策引擎</div>
              <div
                className={`rounded-xl p-4 border-2 transition-all duration-500 ${
                  agentTriggered
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-amber-50 border-amber-300'
                }`}
              >
                {agentTriggered ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700">已发送至裕金装</span>
                    </div>
                    <div className="text-sm font-semibold text-emerald-800 mb-1">
                      订单已自动化无感写入 ERP 系统
                    </div>
                    <div className="text-xs text-emerald-600 leading-relaxed">
                      排他性客户粘性管道闭环已达成 · 预计下周二前送达
                    </div>
                    <div className="mt-3 space-y-1">
                      {[
                        '✓ 裕金装 ERP 接口已同步',
                        '✓ 生产排期已锁定（10月第1周）',
                        '✓ 物流单号已生成待取件',
                      ].map((log) => (
                        <div key={log} className="text-[11px] text-emerald-600 font-mono">{log}</div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                      <span className="text-xs font-bold text-amber-700">待确认</span>
                    </div>
                    <div className="text-sm font-semibold text-amber-800 mb-1">
                      AI 预测下月国庆旺季您的中号床单将出现 200 条缺口
                    </div>
                    <div className="text-xs text-amber-600 leading-relaxed">
                      已自动匹配裕金装同款工艺布草，预计下周二前送达。点击确认后自动写入 ERP 采购单。
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setAgentTriggered(!agentTriggered)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  agentTriggered
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                {agentTriggered ? '已确认 · 补货订单已发出' : '一键确认补充采购建议'}
              </button>
              {!agentTriggered && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Wifi size={10} />
                  <span>裕金装 ERP 已就绪 · 自动写入</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
