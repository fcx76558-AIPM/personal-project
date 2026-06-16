/**
 * 车载运营监控平台 — 详情页
 * 配色参考：云天系统（工业蓝/琥珀/翠绿）+ 酒店RAG智能前台（锌灰基底、翠绿高亮）
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Droplets,
  Wind,
  Monitor,
  AlertTriangle,
  Eye,
  ChevronRight,
  Activity,
  User,
  TrendingUp,
  Play,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────
const COLORS = {
  // Primary palette — transit blue
  sky: {
    50: 'bg-sky-50',
    100: 'bg-sky-100',
    200: 'border-sky-200',
    500: 'text-sky-500',
    600: 'text-sky-600',
    700: 'text-sky-700',
    800: 'text-sky-800',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-600',
    strong: 'text-sky-700',
  },
  // Safe / active
  emerald: {
    50: 'bg-emerald-50',
    100: 'bg-emerald-100',
    200: 'border-emerald-200',
    300: 'border-emerald-300',
    400: 'text-emerald-400',
    500: 'text-emerald-500',
    600: 'text-emerald-600',
    700: 'text-emerald-700',
    800: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    strong: 'text-emerald-700',
  },
  // Warning / critical
  amber: {
    50: 'bg-amber-50',
    100: 'bg-amber-100',
    200: 'border-amber-200',
    500: 'text-amber-500',
    600: 'text-amber-600',
    700: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
  },
  red: {
    50: 'bg-red-50',
    100: 'bg-red-100',
    200: 'border-red-200',
    500: 'text-red-500',
    600: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
  },
  // Neutral
  zinc: {
    50: 'bg-zinc-50',
    100: 'bg-zinc-100',
    200: 'border-zinc-200',
    300: 'border-zinc-300',
    400: 'text-zinc-400',
    500: 'text-zinc-500',
    600: 'text-zinc-600',
    700: 'text-zinc-700',
    800: 'border-zinc-800',
    900: 'bg-zinc-900',
    bg: 'bg-zinc-50',
    text: 'text-zinc-600',
  },
  dark: 'bg-[#0A0A0C]',
};

// ─── Helper ──────────────────────────────────────────────────────────────────

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

// ─── Card One: Product System Architecture & Safety Loop ─────────────────────

function ArchitectureSafetyCard() {
  // Sample data
  const envMetrics = {
    temperature: { avg: 24.6, unit: '°C', status: 'normal' as const },
    humidity: { avg: 52.3, unit: '%', status: 'normal' as const },
    pm10: { avg: 38, unit: 'μg/m³', status: 'normal' as const },
    co2: { avg: 612, unit: 'ppm', status: 'warning' as const },
  };

  const passengerEvents = [
    { id: 1, action: '乘客倒地', car: '3号车厢', time: '14:23:05', severity: 'critical' as const },
    { id: 2, action: '乘客推搡', car: '5号车厢', time: '14:21:18', severity: 'warning' as const },
    { id: 3, action: '行李滑落', car: '7号车厢', time: '14:19:42', severity: 'info' as const },
  ];

  const driverTrends = [
    { time: '14:20', fatigue: 12, distraction: 8 },
    { time: '14:22', fatigue: 18, distraction: 5 },
    { time: '14:24', fatigue: 15, distraction: 11 },
    { time: '14:26', fatigue: 22, distraction: 7 },
    { time: '14:28', fatigue: 10, distraction: 4 },
  ];

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Card header */}
      <div className={COLORS.dark + ' text-zinc-100 px-5 py-3 flex items-center gap-2'}>
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 卡片 01</span>
        <span className="text-xs font-bold text-sky-400">System Architecture & Safety Loop</span>
      </div>

      <div className="p-5 bg-white space-y-5">
        {/* Section label */}
        <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400">
          产品系统架构与全维主动安全闭环
        </div>

        {/* Top layer: Environmental situation */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Activity className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-[10px] font-bold text-zinc-700">环境态势 · 全车均值</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { Icon: Thermometer, label: '温度', value: envMetrics.temperature.avg, unit: envMetrics.temperature.unit, color: 'text-sky-600' },
              { Icon: Droplets, label: '湿度', value: envMetrics.humidity.avg, unit: envMetrics.humidity.unit, color: 'text-cyan-600' },
              { Icon: Wind, label: 'PM10', value: envMetrics.pm10.avg, unit: envMetrics.pm10.unit, color: 'text-amber-600' },
              { Icon: Monitor, label: 'CO₂', value: envMetrics.co2.avg, unit: envMetrics.co2.unit, color: 'text-orange-600' },
            ].map(({ Icon, label, value, unit, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-3 ${label === 'CO₂' ? 'bg-amber-50 border-amber-200' : 'bg-zinc-50 border-zinc-200'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1">
                    <Icon className={`h-3 w-3 ${color}`} />
                    <span className="text-[10px] font-mono text-zinc-500">{label}</span>
                  </span>
                </div>
                <div className="text-sm font-bold text-zinc-900">
                  {value}
                  <span className="text-[10px] font-mono text-zinc-500 ml-0.5">{unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two wings: Event driven */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left wing: passenger anomalies */}
          <div className="rounded-xl border border-zinc-200 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-zinc-700">乘客异常行为 · 实时抓拍</span>
              <span className="text-[9px] font-mono text-amber-600 ml-auto">{passengerEvents.length} 次</span>
            </div>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto scrollbar-none">
              {passengerEvents.map((evt) => (
                <motion.button
                  key={evt.id}
                  onClick={() => setSelectedEvent(selectedEvent === evt.id ? null : evt.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-all
                    ${selectedEvent === evt.id ? 'bg-amber-50 border border-amber-200' : 'hover:bg-zinc-50 border border-transparent'}`}
                >
                  <div className={`h-2 w-2 rounded-full shrink-0 ${
                    evt.severity === 'critical' ? 'bg-red-500' :
                    evt.severity === 'warning' ? 'bg-amber-500' : 'bg-zinc-400'
                  }`} />
                  <span className="text-[10px] font-mono text-zinc-600 flex-1">{evt.action}</span>
                  <span className="text-[9px] font-mono text-zinc-400">{evt.car}</span>
                  <span className="text-[9px] font-mono text-zinc-400">{evt.time}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right wing: driver fatigue trends */}
          <div className="rounded-xl border border-zinc-200 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-sky-500" />
              <span className="text-[10px] font-bold text-zinc-700">司机疲劳/违规趋势</span>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-16">
              {driverTrends.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className="w-full bg-amber-200 rounded-t"
                    style={{ height: `${d.fatigue * 2}px`, maxHeight: '36px' }}
                  />
                  <div
                    className="w-full bg-red-200 rounded-t"
                    style={{ height: `${d.distraction * 2}px`, maxHeight: '22px' }}
                  />
                  <span className="text-[7px] font-mono text-zinc-400">{d.time.slice(3)}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <span className="flex items-center gap-1 text-[9px] font-mono text-amber-600">
                <div className="h-2 w-2 rounded-sm bg-amber-200" />疲劳
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-red-600">
                <div className="h-2 w-2 rounded-sm bg-red-200" />分心
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip: business metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Device health ring */}
          <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0">
              <svg viewBox="0 0 48 48" className="h-12 w-12">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#27272a" strokeWidth="4" />
                <motion.circle
                  cx="24" cy="24" r="20" fill="none"
                  stroke="#34d399" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 20}
                  initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-emerald-400">100%</span>
            </div>
            <div>
              <div className="text-[9px] font-mono text-zinc-400">设备正常率</div>
              <div className="text-xs font-bold text-white">全部在线</div>
            </div>
          </div>

          {/* Crowd heatmap */}
          <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3">
            <div className="flex gap-0.5 h-12 items-end">
              {[60, 85, 35, 70, 55, 90, 40, 50].map((v, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-t transition-all ${
                    v > 75 ? 'bg-red-500' : v > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ height: `${v * 0.7}px` }}
                />
              ))}
            </div>
            <div>
              <div className="text-[9px] font-mono text-zinc-400">车厢拥挤度热力</div>
              <div className="flex gap-1.5 mt-0.5">
                <span className="text-[8px] px-1 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-mono">舒适</span>
                <span className="text-[8px] px-1 py-0.5 bg-amber-500/20 text-amber-400 rounded font-mono">适中</span>
                <span className="text-[8px] px-1 py-0.5 bg-red-500/20 text-red-400 rounded font-mono">拥挤</span>
              </div>
            </div>
          </div>

          {/* Train position */}
          <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3">
            <div className="relative h-12 w-full flex items-center">
              <div className="absolute h-1 w-full bg-zinc-700 rounded-full" />
              <motion.div
                className="absolute h-1 bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '62%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute h-3 w-3 bg-white rounded-full -translate-x-1/2 z-10"
                style={{ left: '62%' }}
                animate={{ left: '62%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                <div className="h-2 w-2 bg-emerald-500 rounded-full absolute inset-0.5" />
              </motion.div>
              <span className="absolute right-0 text-[8px] font-mono text-zinc-500">建国门</span>
              <span className="absolute left-0 text-[8px] font-mono text-zinc-500">国贸</span>
            </div>
          </div>
        </div>

        {/* Architecture flow */}
        <div className={COLORS.dark + ' rounded-xl p-4 border border-zinc-800'}>
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
            数据流闭环 / DATA FLOW
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            {['多模态传感器', '边缘CV推理', 'SSE状态机', '孪生引擎', '画中画弹窗', '司机联动'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5">
                  <span className="text-sky-300 font-bold">{step}</span>
                </div>
                {i < 5 && <ChevronRight className="h-3 w-3 text-zinc-600 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Sandbox 01: Environment Monitoring ──────────────────────────────────────

type CarriageId = 'avg' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
type TimeRange = 'day' | 'week' | 'month' | 'quarter';

interface MetricPoint {
  label: string;
  value: number;
  unit: string;
  color: string;
  baseline?: number;
}

const CARRIAGES: { id: CarriageId; label: string }[] = [
  { id: 'avg', label: '全车平均' },
  { id: '1', label: '1号车厢' },
  { id: '2', label: '2号车厢' },
  { id: '3', label: '3号车厢' },
  { id: '4', label: '4号车厢' },
  { id: '5', label: '5号车厢' },
  { id: '6', label: '6号车厢' },
  { id: '7', label: '7号车厢' },
  { id: '8', label: '8号车厢' },
];

function generateTimeSeriesData(carriage: CarriageId, range: TimeRange) {
  const baseSeeds: Record<CarriageId, { co2: number; temp: number; humidity: number; pm10: number }> = {
    avg: { co2: 580, temp: 24.5, humidity: 52, pm10: 35 },
    '1': { co2: 620, temp: 25.1, humidity: 50, pm10: 38 },
    '2': { co2: 550, temp: 24.0, humidity: 54, pm10: 32 },
    '3': { co2: 680, temp: 26.2, humidity: 48, pm10: 42 },
    '4': { co2: 590, temp: 24.8, humidity: 53, pm10: 36 },
    '5': { co2: 720, temp: 25.9, humidity: 47, pm10: 45 },
    '6': { co2: 560, temp: 24.2, humidity: 55, pm10: 33 },
    '7': { co2: 630, temp: 25.5, humidity: 49, pm10: 39 },
    '8': { co2: 570, temp: 24.6, humidity: 52, pm10: 34 },
  };
  const seed = baseSeeds[carriage];
  const count = range === 'day' ? 24 : range === 'week' ? 7 : range === 'month' ? 30 : 90;
  const points = [];
  for (let i = 0; i < count; i++) {
    const noise = (Math.random() - 0.5) * 0.2;
    points.push({
      co2: seed.co2 * (1 + noise),
      temp: seed.temp * (1 + noise * 0.5),
      humidity: seed.humidity * (1 + noise * 0.3),
      pm10: seed.pm10 * (1 + noise * 0.4),
    });
  }
  return points;
}

function MiniSparkline({ data, color, height = 32 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data, 1);
  const w = 100 / data.length;
  const pathD = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * w},${height - (v / max) * height}`)
    .join(' ');
  const areaD = `${pathD} L${(data.length - 1) * w},${height} L0,${height} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${(data.length - 1) * w} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EnvSandbox() {
  const [selectedCar, setSelectedCar] = useState<CarriageId>('avg');
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const data = generateTimeSeriesData(selectedCar, timeRange);
  const co2Data = data.map(d => d.co2);
  const tempData = data.map(d => d.temp);
  const humidData = data.map(d => d.humidity);
  const pm10Data = data.map(d => d.pm10);

  const currentMetrics: MetricPoint[] = [
    { label: 'CO₂', value: data[data.length - 1]?.co2 || 0, unit: 'ppm', color: '#f59e0b', baseline: 800 },
    { label: '温度', value: data[data.length - 1]?.temp || 0, unit: '°C', color: '#0ea5e9', baseline: 28 },
    { label: '湿度', value: data[data.length - 1]?.humidity || 0, unit: '%', color: '#06b6d4', baseline: 70 },
    { label: 'PM10', value: data[data.length - 1]?.pm10 || 0, unit: 'μg/m³', color: '#8b5cf6', baseline: 50 },
  ];

  return (
    <div className="space-y-4">
      {/* Carriage tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CARRIAGES.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCar(c.id)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer
              ${selectedCar === c.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
              }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Current readings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {currentMetrics.map(m => (
          <div key={m.label} className="bg-white rounded-xl border border-zinc-200 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
              <span className="text-[9px] font-mono text-zinc-500">{m.label}</span>
            </div>
            <div className="text-sm font-bold text-zinc-900">
              {m.label === '温度' ? m.value.toFixed(1) : Math.round(m.value)}
              <span className="text-[9px] font-mono text-zinc-500 ml-0.5">{m.unit}</span>
            </div>
            <div className="text-[9px] font-mono mt-0.5">
              {m.value > (m.baseline || Infinity) ? (
                <span className="text-amber-600">高于基线</span>
              ) : (
                <span className="text-emerald-600">正常范围</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Time range selector */}
      <div className="flex gap-1.5">
        {([
          { id: 'day' as const, label: '天' },
          { id: 'week' as const, label: '周' },
          { id: 'month' as const, label: '月' },
          { id: 'quarter' as const, label: '三个月' },
        ]).map(r => (
          <button
            key={r.id}
            onClick={() => setTimeRange(r.id)}
            className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer
              ${timeRange === r.id
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 border border-zinc-200'
              }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Sparkline charts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCar}-${timeRange}`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {[
            { label: 'CO₂ (ppm)', data: co2Data, color: '#f59e0b' },
            { label: '温度 (°C)', data: tempData, color: '#0ea5e9' },
            { label: '湿度 (%)', data: humidData, color: '#06b6d4' },
            { label: 'PM10 (μg/m³)', data: pm10Data, color: '#8b5cf7' },
          ].map(s => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] font-mono font-bold text-zinc-600">{s.label}</span>
                <span className="text-[8px] font-mono text-zinc-400">
                  当前 {s.label.includes('CO₂') ? Math.round(s.data[s.data.length - 1]) :
                         s.label.includes('温度') ? s.data[s.data.length - 1].toFixed(1) :
                         Math.round(s.data[s.data.length - 1])}
                </span>
              </div>
              <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                <MiniSparkline data={s.data} color={s.color} height={36} />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


// ─── Sandbox 02: 1/2-Side Device Topology ────────────────────────────────────

interface DeviceNode {
  id: string;
  name: string;
  side: '1' | '2';
  carriage: number;
  state: 'normal' | 'warning' | 'critical';
  edgeModule: string;
  lastMaintenance: string;
  x: number;
  y: number;
}

const DEVICES: DeviceNode[] = [
  { id: 'd1', name: '照明驱动模块', side: '1', carriage: 3, state: 'critical', edgeModule: 'EDGE-A03', lastMaintenance: '2026-05-12', x: 20, y: 25 },
  { id: 'd2', name: '空调变频器', side: '1', carriage: 3, state: 'normal', edgeModule: 'EDGE-A03', lastMaintenance: '2026-06-01', x: 55, y: 20 },
  { id: 'd3', name: 'PIS广播控制器', side: '2', carriage: 3, state: 'normal', edgeModule: 'EDGE-B03', lastMaintenance: '2026-05-28', x: 35, y: 55 },
  { id: 'd4', name: '车门门控单元', side: '1', carriage: 3, state: 'warning', edgeModule: 'EDGE-A03', lastMaintenance: '2026-04-15', x: 75, y: 30 },
  { id: 'd5', name: '烟雾探测器', side: '2', carriage: 3, state: 'normal', edgeModule: 'EDGE-B03', lastMaintenance: '2026-05-20', x: 60, y: 60 },
  { id: 'd6', name: '摄像头电源', side: '1', carriage: 3, state: 'normal', edgeModule: 'EDGE-A03', lastMaintenance: '2026-06-05', x: 40, y: 15 },
];

function DeviceTopologySandbox() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceNode | null>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const handleSelect = (device: DeviceNode) => {
    setSelectedDevice(device);
    setHighlighted(device.id);
    setTimeout(() => setHighlighted(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* 3D topology */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6 overflow-hidden">
        <div className="text-[8px] font-mono text-zinc-500 mb-4 tracking-widest uppercase">
          一位侧 (驾驶端) · 车厢横剖面拓扑
        </div>

        {/* Carriage outline */}
        <div className="relative w-full aspect-[2/1] max-h-[180px]">
          {/* Carriage body */}
          <div className="absolute inset-[8%] border-2 border-zinc-700/50 rounded-2xl bg-zinc-900/40">
            {/* Divider: 1/2 side */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-700/30" />
          </div>

          {/* Side labels */}
          <span className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[8px] font-mono text-sky-500/60 tracking-widest [writing-mode:vertical-lr]">
            一位侧
          </span>
          <span className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[8px] font-mono text-emerald-500/60 tracking-widest [writing-mode:vertical-lr]">
            二位侧
          </span>

          {/* Device nodes */}
          <AnimatePresence>
            {DEVICES.map(device => {
              const isSelected = selectedDevice?.id === device.id;
              const isHighlighted = highlighted === device.id;
              const stateColor = device.state === 'critical' ? '#ef4444' :
                                 device.state === 'warning' ? '#f59e0b' : '#22c55e';

              return (
                <motion.button
                  key={device.id}
                  onClick={() => handleSelect(device)}
                  className={`absolute flex items-center justify-center cursor-pointer rounded-full transition-all
                    ${isSelected ? 'z-20' : 'z-10'}`}
                  style={{
                    left: `${device.x}%`,
                    top: `${device.y}%`,
                  }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    scale: isHighlighted ? [1, 1.4, 1] : 1,
                    transition: isHighlighted ? { repeat: Infinity, duration: 1.5 } : { duration: 0.3 },
                  }}
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-all ${
                      isSelected ? 'border-white scale-125' : 'border-zinc-600'
                    }`}
                    style={{ backgroundColor: stateColor }}
                  >
                    {isSelected && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-white/40"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-zinc-500 whitespace-nowrap opacity-70">
                    {device.name}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Selected device detail popover */}
        <AnimatePresence>
          {selectedDevice && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className={`mt-4 rounded-xl border p-3 ${
                selectedDevice.state === 'critical' ? 'bg-red-900/20 border-red-800/40' :
                selectedDevice.state === 'warning' ? 'bg-amber-900/20 border-amber-800/40' :
                'bg-zinc-800/50 border-zinc-700/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`h-2 w-2 rounded-full ${
                  selectedDevice.state === 'critical' ? 'bg-red-500' :
                  selectedDevice.state === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="text-[11px] font-bold text-white">{selectedDevice.name}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  selectedDevice.state === 'critical' ? 'bg-red-500/20 text-red-400' :
                  selectedDevice.state === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {selectedDevice.state === 'critical' ? '异常' : selectedDevice.state === 'warning' ? '预警' : '正常'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-zinc-400">
                <div>关联边缘模块: <span className="text-zinc-300">{selectedDevice.edgeModule}</span></div>
                <div>上次检修: <span className="text-zinc-300">{selectedDevice.lastMaintenance}</span></div>
                <div>车厢: <span className="text-zinc-300">{selectedDevice.carriage}号车厢</span></div>
                <div>侧位: <span className="text-zinc-300">{selectedDevice.side === '1' ? '一位侧' : '二位侧'}</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edge zone box */}
        {selectedDevice && (
          <div className="absolute left-[10%] top-[15%] right-[10%] bottom-[15%] border-2 border-dashed border-sky-500/20 rounded-2xl pointer-events-none" />
        )}
      </div>

      {/* Device list */}
      <div className="border border-zinc-200 rounded-xl overflow-hidden">
        <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-200">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            设备状态列表 · {DEVICES.length} 个节点
          </span>
        </div>
        <div className="divide-y divide-zinc-100">
          {DEVICES.map(device => (
            <motion.button
              key={device.id}
              onClick={() => handleSelect(device)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all cursor-pointer
                ${selectedDevice?.id === device.id
                  ? 'bg-sky-50 border-l-2 border-l-sky-500'
                  : 'hover:bg-zinc-50 border-l-2 border-l-transparent'
                }`}
            >
              <div className={`h-2 w-2 rounded-full shrink-0 ${
                device.state === 'critical' ? 'bg-red-500' :
                device.state === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-zinc-900 truncate">{device.name}</div>
                <div className="text-[9px] font-mono text-zinc-400">
                  {device.carriage}号车厢 · {device.side === '1' ? '一位侧' : '二位侧'} · {device.edgeModule}
                </div>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded shrink-0 ${
                device.state === 'critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                device.state === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {device.state === 'critical' ? '异常' : device.state === 'warning' ? '预警' : '正常'}
              </span>
              <ChevronRight className="h-3 w-3 text-zinc-400 shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── Sandbox 03: Edge CV Safety Diagnosis ────────────────────────────────────

interface AbnormalEvent {
  id: number;
  type: 'passenger' | 'driver';
  action: string;
  car: string;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  confidence: number;
  hasDetail: boolean;
}

const ABNORMAL_EVENTS: AbnormalEvent[] = [
  { id: 1, type: 'passenger', action: '乘客倒地', car: '3号车厢', time: '14:23:05', severity: 'critical', confidence: 96.2, hasDetail: true },
  { id: 2, type: 'passenger', action: '乘客推搡', car: '5号车厢', time: '14:21:18', severity: 'warning', confidence: 88.7, hasDetail: true },
  { id: 3, type: 'driver', action: '打哈欠（疲劳）', car: '司机室', time: '14:20:44', severity: 'warning', confidence: 92.1, hasDetail: true },
  { id: 4, type: 'driver', action: '长时间闭眼（疲劳）', car: '司机室', time: '14:18:30', severity: 'warning', confidence: 94.5, hasDetail: true },
  { id: 5, type: 'passenger', action: '行李滑落', car: '7号车厢', time: '14:17:12', severity: 'info', confidence: 76.3, hasDetail: false },
  { id: 6, type: 'driver', action: '分心驾驶（看手机）', car: '司机室', time: '14:15:08', severity: 'warning', confidence: 97.8, hasDetail: true },
  { id: 7, type: 'passenger', action: '群体聚集', car: '2号车厢', time: '14:12:55', severity: 'info', confidence: 71.0, hasDetail: false },
  { id: 8, type: 'passenger', action: '乘客倒地', car: '8号车厢', time: '14:10:33', severity: 'critical', confidence: 95.4, hasDetail: true },
];

function CvSafetySandbox() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDriverMesh, setShowDriverMesh] = useState<number | null>(null);

  const handleToggleDetail = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id);
    if (expandedEvent !== id) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Event log list */}
      <div className="border border-zinc-200 rounded-xl overflow-hidden">
        <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-200 flex items-center justify-between">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            异常行为日志 · 实时滚动
          </span>
          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-600">
            <PulseDot />
            <span>SSE 推送中</span>
          </span>
        </div>
        <div className="divide-y divide-zinc-100 max-h-[260px] overflow-y-auto scrollbar-none">
          {ABNORMAL_EVENTS.map((evt) => (
            <div key={evt.id}>
              <div className="flex items-center gap-3 px-4 py-2.5">
                {/* Type indicator */}
                <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 ${
                  evt.type === 'passenger' ? 'bg-amber-100' : 'bg-sky-100'
                }`}>
                  {evt.type === 'passenger' ? (
                    <User className={`h-3.5 w-3.5 ${evt.type === 'passenger' ? 'text-amber-600' : 'text-sky-600'}`} />
                  ) : (
                    <Eye className="h-3.5 w-3.5 text-sky-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-zinc-900 truncate">{evt.action}</span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                      evt.severity === 'critical' ? 'bg-red-50 text-red-600 border border-red-200' :
                      evt.severity === 'warning' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                      'bg-zinc-100 text-zinc-500 border border-zinc-200'
                    }`}>
                      {evt.severity === 'critical' ? '高危' : evt.severity === 'warning' ? '预警' : '关注'}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 ml-auto">
                      {evt.confidence}%
                    </span>
                  </div>
                  <div className="text-[8px] font-mono text-zinc-400">
                    {evt.car} · {evt.time}
                    <span className="ml-1.5 text-zinc-300">|</span>
                    <span className="ml-1.5 text-red-400">
                      {evt.type === 'passenger' ? '乘客' : '司机'}行为
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {evt.hasDetail && (
                    <button
                      onClick={() => handleToggleDetail(evt.id)}
                      className={`text-[9px] font-mono font-bold px-2 py-1 rounded-lg transition-all cursor-pointer
                        ${expandedEvent === evt.id
                          ? 'bg-sky-100 text-sky-700 border border-sky-200'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                        }`}
                    >
                      {expandedEvent === evt.id ? '收起' : '查看详情'}
                    </button>
                  )}
                  {evt.type === 'driver' && (
                    <button
                      onClick={() => setShowDriverMesh(showDriverMesh === evt.id ? null : evt.id)}
                      className={`text-[9px] font-mono font-bold px-2 py-1 rounded-lg transition-all cursor-pointer
                        ${showDriverMesh === evt.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
                        }`}
                    >
                      Face Mesh
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded detail: PiP */}
              <AnimatePresence>
                {expandedEvent === evt.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-zinc-100"
                  >
                    <div className="px-4 py-3 bg-zinc-50">
                      <div className="flex items-start gap-4">
                        {/* PiP frame */}
                        <div className="relative w-48 h-28 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-300">
                          {/* Simulated camera view */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <CameraIcon className="h-6 w-6 text-zinc-600 mx-auto mb-1" />
                              <div className="text-[7px] font-mono text-zinc-500">HIGH-DEF CLIP</div>
                            </div>
                          </div>
                          {/* Timestamp overlay */}
                          <div className="absolute top-1.5 left-1.5 bg-black/60 text-[8px] font-mono text-white px-1.5 py-0.5 rounded">
                            {evt.time}
                          </div>
                          {/* Confidence badge */}
                          <div className={`absolute top-1.5 right-1.5 text-[8px] font-mono px-1.5 py-0.5 rounded ${
                            evt.confidence > 90 ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'
                          }`}>
                            {evt.confidence}%
                          </div>
                          {/* Play button */}
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                          >
                            <div className={`h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-white/30 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                              <Play className="h-3.5 w-3.5 text-white ml-0.5" />
                            </div>
                          </button>
                          {/* PiP label */}
                          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-black/50 text-[7px] font-mono text-white px-2 py-0.5 rounded-full">
                            画中画 · 高清切片
                          </div>
                        </div>

                        {/* Detail info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-zinc-700 mb-1">{evt.action} — 事件详情</div>
                          <div className="text-[9px] font-mono text-zinc-500 space-y-0.5">
                            <div>Face Mesh 置信度: <span className="text-zinc-700">{evt.confidence}%</span></div>
                            <div>截取时长: <span className="text-zinc-700">报警前 5s 预缓冲</span></div>
                            <div>关联摄像头: <span className="text-zinc-700">CAM-{evt.car.replace(/[^0-9]/g, '')}-0{Math.floor(Math.random() * 4) + 1}</span></div>
                            <div>AI 判定结论: <span className={evt.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}>
                              {evt.severity === 'critical' ? '高危行为，建议立即处置' : '需关注，建议复核'}
                            </span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Driver Face Mesh overlay */}
              <AnimatePresence>
                {showDriverMesh === evt.id && evt.type === 'driver' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-zinc-100"
                  >
                    <div className="px-4 py-3 bg-zinc-900 flex items-center gap-4">
                      {/* Face thumbnail with mesh */}
                      <div className="relative w-24 h-24 bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                        {/* Simulated face silhouette */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-16 rounded-full bg-zinc-700/50" />
                        </div>
                        {/* Face Mesh keypoints grid */}
                        <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
                          {/* Mesh wireframe */}
                          {Array.from({ length: 8 }).map((_, row) =>
                            Array.from({ length: 6 }).map((_, col) => (
                              <circle
                                key={`${row}-${col}`}
                                cx={15 + col * 14}
                                cy={20 + row * 11}
                                r="1.2"
                                fill="#60a5fa"
                                opacity={0.7}
                              />
                            ))
                          )}
                          {/* Connection lines */}
                          {Array.from({ length: 8 }).map((_, row) =>
                            Array.from({ length: 5 }).map((_, col) => (
                              <line
                                key={`h-${row}-${col}`}
                                x1={15 + col * 14} y1={20 + row * 11}
                                x2={15 + (col + 1) * 14} y2={20 + row * 11}
                                stroke="#60a5fa"
                                strokeWidth="0.5"
                                opacity={0.4}
                              />
                            ))
                          )}
                          {Array.from({ length: 7 }).map((_, row) =>
                            Array.from({ length: 6 }).map((_, col) => (
                              <line
                                key={`v-${row}-${col}`}
                                x1={15 + col * 14} y1={20 + row * 11}
                                x2={15 + col * 14} y2={20 + (row + 1) * 11}
                                stroke="#60a5fa"
                                strokeWidth="0.5"
                                opacity={0.4}
                              />
                            ))
                          )}
                          {/* Eye region highlight */}
                          <rect x="25" y="48" width="50" height="8" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" opacity={0.8} />
                          {/* Mouth region highlight */}
                          <rect x="25" y="78" width="50" height="10" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" opacity={0.8} />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                          <div className="text-[7px] font-mono text-blue-300 text-center">468 关键点</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold text-blue-300">Face Mesh 关键点网格</span>
                          <span className="text-[8px] px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded font-mono">反误报过滤</span>
                        </div>
                        <div className="text-[8px] font-mono text-zinc-400 space-y-0.5">
                          <div>ROI 区域: <span className="text-zinc-300">眼部（疲劳） / 口部（哈欠）</span></div>
                          <div>关键点置信度: <span className="text-zinc-300">93.7%</span></div>
                          <div>判定依据: <span className="text-zinc-300">EAR &lt; 0.2 持续 3s → 闭眼疲劳</span></div>
                          <div className="flex gap-2 mt-0.5">
                            <span className="text-[7px] px-1 py-0.5 bg-amber-500/20 text-amber-400 rounded">口部 ROI</span>
                            <span className="text-[7px] px-1 py-0.5 bg-amber-500/20 text-amber-400 rounded">眼部 ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail gallery */}
      <div>
        <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">
          事件缩略图卡片
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ABNORMAL_EVENTS.slice(0, 4).map((evt) => (
            <motion.button
              key={evt.id}
              onClick={() => handleToggleDetail(evt.id)}
              whileHover={{ scale: 1.02 }}
              className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                expandedEvent === evt.id
                  ? 'border-sky-300 bg-sky-50 shadow-xs'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`h-1.5 w-1.5 rounded-full ${
                  evt.severity === 'critical' ? 'bg-red-500' :
                  evt.severity === 'warning' ? 'bg-amber-500' : 'bg-zinc-400'
                }`} />
                <span className="text-[8px] font-mono text-zinc-500 truncate">{evt.action}</span>
              </div>
              <div className="text-[8px] font-mono text-zinc-400">
                {evt.car} · {evt.time}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className={`text-[7px] px-1 py-0.5 rounded font-mono ${
                  evt.type === 'passenger' ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'
                }`}>
                  {evt.type === 'passenger' ? '乘客' : '司机'}
                </span>
                <span className="text-[7px] font-mono text-zinc-400">{evt.confidence}%</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}


// ─── Main Export ──────────────────────────────────────────────────────────────

export function StationMonitorDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ── Block 0: Hero Header ── */}
      <div className="pt-20 border-b border-zinc-100 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <PulseDot />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-600">
            RAIL TRANSIT AI COCKPIT v2.0 · MULTIMODAL ON‑TRAIN PERCEPTION
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">
          车载运营监控平台
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          主导设计的多模态车载综合感知平台，打通「环境均值统计 → 一/二位侧设备孪生 → 双端边缘 CV 异常行为拦截」数据链，
          将传统离线「事后调取录像」升级为「在途秒级主动研判」的智能轨交安全管理系统。
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full font-medium">全车厢覆盖</span>
          <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">边缘端 AI 推理</span>
          <span className="text-[10px] px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">在途秒级研判</span>
        </div>
      </div>

      {/* ── Block 1: Tag Row ── */}
      <div className="py-5 border-b border-zinc-100 space-y-3">
        {/* Tech tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术/产品选型</span>
          {['空间横剖面拓扑', 'Face Mesh 面部关键点', 'SSE 状态机流', '多维度时序分析', '画中画异常切片'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        {/* Value tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '设备异常拦截', value: '100%' },
            { label: '高危事件漏报', value: '趋近于0' },
            { label: '多源指标同步', value: '秒级' },
            { label: '单车厢全要素透视', value: '全量' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Card 1: System Architecture ── */}
      <ArchitectureSafetyCard />

      {/* ── Card 2: Sandbox 01 — Environment Monitoring ── */}
      <div className="mt-8 space-y-3">
        <SandboxHeader num="01" label="环境监测多级空间下钻与长周期时序分析" />
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <EnvSandbox />
        </div>
      </div>

      {/* ── Card 3: Sandbox 02 — Device Topology ── */}
      <div className="mt-8 space-y-3">
        <SandboxHeader num="02" label="一/二位侧空间可视化打点与精确运维" />
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <DeviceTopologySandbox />
        </div>
      </div>

      {/* ── Card 4: Sandbox 03 — CV Safety ── */}
      <div className="mt-8 space-y-3">
        <SandboxHeader num="03" label="两端边缘 CV 安全诊断与画中画切片追溯" />
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <CvSafetySandbox />
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-6" />
    </>
  );
}
