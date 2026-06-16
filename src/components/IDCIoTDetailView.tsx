/**
 * 工业级数据中心基础设施动环监控平台 — 详情页
 * 配色参考：云天系统（工业蓝/琥珀/翠绿）+ 酒店RAG智能前台（锌灰基底、翠绿高亮）
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer, Gauge, AlertTriangle, Server, Monitor, Database,
  Battery, Zap, GitBranch, ChevronRight, Activity, Cpu,
  Droplets, Wind, X, Play, TrendingUp, Layers, Bell,
  Smartphone, MessageSquare, FileText, Flame, Shield, Map,
  Radio, Fan, Waves,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Color System ────────────────────────────────────────────────────────────
const COLORS = {
  sky: {
    50: 'bg-sky-50', 100: 'bg-sky-100', 200: 'border-sky-200',
    500: 'text-sky-500', 600: 'text-sky-600', 700: 'text-sky-700', 800: 'text-sky-800',
    bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', strong: 'text-sky-700',
  },
  emerald: {
    50: 'bg-emerald-50', 100: 'bg-emerald-100', 200: 'border-emerald-200', 300: 'border-emerald-300',
    400: 'text-emerald-400', 500: 'text-emerald-500', 600: 'text-emerald-600', 700: 'text-emerald-700', 800: 'text-emerald-800',
    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', strong: 'text-emerald-700',
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
    50: 'bg-zinc-50', 100: 'bg-zinc-100', 200: 'border-zinc-200', 300: 'border-zinc-300',
    400: 'text-zinc-400', 500: 'text-zinc-500', 600: 'text-zinc-600', 700: 'text-zinc-700',
    900: 'bg-zinc-900',
    bg: 'bg-zinc-50', border: 'border-zinc-200', text: 'text-zinc-600',
  },
  dark: 'bg-[#0A0A0C]',
};

// ─── Shared Components ──────────────────────────────────────────────────────

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

// ─── Card One: Product System Architecture ────────────────────────────────

// Brain icon not in lucide, use a substitute (must be defined before archBlocks)
function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.5-1.5 3 3 0 1 0-1.5 5.5A3 3 0 1 0 6 17a3 3 0 1 0 5.5 1.5A3 3 0 1 0 13 13a3 3 0 1 0-1-8z" />
      <path d="M12 5v3" />
      <path d="M6 17v-3" />
      <path d="M18 17v-3" />
    </svg>
  );
}

const archBlocks = [
  {
    icon: Zap,
    label: '供配电命脉',
    subtitle: '电力监控',
    desc: '总览中压电力拓扑、配电拓扑、低压配电路由与柴发供油监控，动态捕捉分合闸状态，提供瞬时功率分析。',
    color: 'amber',
  },
  {
    icon: Wind,
    label: '暖通制冷与冷量精细化调控',
    subtitle: '远程监控',
    desc: '高精细透视 3D-IDEC 工业空调等核心运行工况，支持启停控制与风机转速调优。',
    color: 'sky',
  },
  {
    icon: Map,
    label: '空间微环境安全',
    subtitle: '环境监控',
    desc: '打通 1F 平面图房间级电子地图，空间网格化捕捉温湿度、漏水、氢气、压差异常。',
    color: 'emerald',
  },
  {
    icon: Battery,
    label: '后备能源守护防线',
    subtitle: '蓄电池/消防监控',
    desc: '实时跟踪单台 UPS 并机状态下的单体电池阻抗，多端并接烟感与温感测点。',
    color: 'red',
  },
  {
    icon: Brain,
    label: '智能化管理大脑',
    subtitle: '告警管理',
    desc: '通过内置设备知识图谱建立事件关联，实现大并发状态下的告警压缩与多渠道秒级推送。',
    color: 'sky',
  },
];

function ArchitectureCard() {
  return (
    <div className="space-y-4">
      {/* 五大架构模块卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {archBlocks.map((block, idx) => {
          const Icon = block.icon;
          return (
            <div
              key={idx}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-default hover:shadow-lg ${
                block.color === 'amber' ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400' :
                block.color === 'sky' ? 'bg-sky-50/50 border-sky-200 hover:border-sky-400' :
                block.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400' :
                'bg-red-50/50 border-red-200 hover:border-red-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  block.color === 'amber' ? 'bg-amber-100' :
                  block.color === 'sky' ? 'bg-sky-100' :
                  block.color === 'emerald' ? 'bg-emerald-100' :
                  'bg-red-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    block.color === 'amber' ? 'text-amber-600' :
                    block.color === 'sky' ? 'text-sky-600' :
                    block.color === 'emerald' ? 'text-emerald-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-zinc-800">{block.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      block.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                      block.color === 'sky' ? 'bg-sky-100 text-sky-700' :
                      block.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
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

      {/* 数据流示意 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-4 h-4 text-emerald-600" />
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">破除数据烟囱 — 五维数据融合链路</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {[
            { label: '传感器采集', icon: Radio, color: 'sky' },
            { label: '协议解析', icon: Cpu, color: 'emerald' },
            { label: 'Kafka 分流', icon: Database, color: 'amber' },
            { label: '时序入库', icon: Activity, color: 'sky' },
            { label: '图谱推理', icon: GitBranch, color: 'red' },
            { label: '反控执行', icon: Zap, color: 'emerald' },
          ].map((node, idx) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.label}>
                <div className={`shrink-0 flex flex-col items-center gap-1.5 p-2.5 rounded-xl border ${
                  node.color === 'sky' ? 'bg-sky-50 border-sky-200' :
                  node.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' :
                  node.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                  node.color === 'red' ? 'bg-red-50 border-red-200' :
                  'bg-zinc-50 border-zinc-200'
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${
                    node.color === 'sky' ? 'text-sky-600' :
                    node.color === 'emerald' ? 'text-emerald-600' :
                    node.color === 'amber' ? 'text-amber-600' :
                    'text-red-600'
                  }`} />
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

// ─── Sandbox 01: Power/HVAC Floor Plan Drill-Down + 3D IDEC ───────────────

function PowerHVACSandbox() {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-200">
      <img
        src={`${import.meta.env.BASE_URL}idc-hvac-sandbox.png`}
        alt="电力-暖通空间解耦与3D精准组态控制"
        className="w-full h-auto"
      />
    </div>
  );
}

// ─── Sandbox 02: Battery Impedance Real-Time Tracking ─────────────────────

function BatterySandbox() {
  const [faultMode, setFaultMode] = useState(false);
  const [faultTriggered, setFaultTriggered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    cellId: string;
    voltage: string;
    impedance: string;
    status: string;
  } | null>(null);

  // 124 节电池数据（模拟多列矩阵）
  const [batteries, setBatteries] = useState(
    Array.from({ length: 124 }, (_, i) => ({
      id: i + 1,
      name: `${Math.floor(i / 16) + 1}-${(i % 16) + 1}`,
      voltage: 2.05 + Math.random() * 0.2,
      current: 8 + Math.random() * 4,
      temperature: 22 + Math.random() * 6,
      impedance: 0.8 + Math.random() * 0.6,
      status: 'normal' as 'normal' | 'abnormal',
    }))
  );

  const triggerFault = () => {
    if (!faultMode) {
      setFaultMode(true);
      setFaultTriggered(false);
      setShowAlert(false);
      setAlertData(null);

      // 延迟模拟刷新
      setTimeout(() => {
        setFaultTriggered(true);
        setBatteries(prev =>
          prev.map((b, i) => {
            if (i >= 2 && i <= 124) {
              return {
                ...b,
                impedance: i === 123 ? b.impedance * 3.2 : b.impedance * (1 + Math.random() * 0.1),
                status: i === 123 ? 'abnormal' as const : b.status,
              };
            }
            return b;
          })
        );

        setTimeout(() => {
          const faulted = batteries[123];
          setAlertData({
            cellId: '3-124',
            voltage: '1.892V',
            impedance: '2.71mΩ',
            status: '临期失效风险 · 已自动触发均衡充电策略',
          });
          setShowAlert(true);
        }, 800);
      }, 600);
    } else {
      // 重置
      setFaultMode(false);
      setFaultTriggered(false);
      setShowAlert(false);
      setAlertData(null);
      setBatteries(prev =>
        prev.map(b => ({
          ...b,
          impedance: 0.8 + Math.random() * 0.6,
          status: 'normal' as const,
        }))
      );
    }
  };

  // 只展示矩阵中一段代表性数据
  const visibleRange = batteries.slice(112, 124);

  return (
    <div className="space-y-4">
      {/* 看板标题 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              3F-B01-M-1AUPS1 — 后备供电监控看板
            </span>
          </div>
          <button
            onClick={triggerFault}
            className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
              faultMode
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:border-amber-300'
            }`}
          >
            {faultMode ? '停止故障模拟' : '触发某单体电池内阻劣化'}
          </button>
        </div>
      </div>

      {/* 电池矩阵参数列表 */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[9px] font-mono">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 uppercase">
                <th className="text-left px-3 py-2 font-bold">电池编号</th>
                <th className="text-right px-3 py-2 font-bold">电压 (V)</th>
                <th className="text-right px-3 py-2 font-bold">电流 (A)</th>
                <th className="text-right px-3 py-2 font-bold">温度 (°C)</th>
                <th className="text-right px-3 py-2 font-bold">内阻 (mΩ)</th>
                <th className="text-center px-3 py-2 font-bold">工作状态</th>
              </tr>
            </thead>
            <tbody>
              {visibleRange.map((b) => {
                const isAbnormal = b.status === 'abnormal';
                return (
                  <tr
                    key={b.id}
                    className={`border-b border-zinc-100 transition-all duration-500 ${
                      isAbnormal
                        ? 'bg-red-50 text-red-600 font-bold'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <td className="px-3 py-1.5 font-bold">{b.name}</td>
                    <td className={`text-right px-3 py-1.5 ${isAbnormal ? 'text-red-600' : ''}`}>
                      {isAbnormal ? '1.892' : b.voltage.toFixed(3)}
                    </td>
                    <td className="text-right px-3 py-1.5">{b.current.toFixed(1)}</td>
                    <td className="text-right px-3 py-1.5">{b.temperature.toFixed(1)}</td>
                    <td className={`text-right px-3 py-1.5 ${isAbnormal ? 'text-red-600' : ''}`}>
                      {isAbnormal ? '2.71' : b.impedance.toFixed(2)}
                    </td>
                    <td className="text-center px-3 py-1.5">
                      <span className={`inline-block text-[7px] px-1.5 py-0.5 rounded-full font-bold ${
                        isAbnormal
                          ? 'bg-red-100 text-red-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {isAbnormal ? '异常' : '正常'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 隐藏行提示 */}
        <div className="bg-zinc-50 px-3 py-1.5 text-[7px] font-mono text-zinc-400 text-center">
          显示 113-124 / 共 124 节 · 上下滚动查看完整矩阵
        </div>
      </div>

      {/* 趋势雷达告警弹窗 */}
      <AnimatePresence>
        {showAlert && alertData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-red-50 rounded-2xl p-5 border-2 border-red-300 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-red-700">临期失效风险告警</span>
                  <span className="text-[7px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-bold animate-pulse">HIGH</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-red-100 mb-3">
                  <div className="space-y-1 text-[9px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">异常电池</span>
                      <span className="text-red-600 font-bold">{alertData.cellId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">当前电压</span>
                      <span className="text-red-600 font-bold">{alertData.voltage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">内阻值</span>
                      <span className="text-red-600 font-bold">{alertData.impedance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">判定</span>
                      <span className="text-amber-600 font-bold">{alertData.status}</span>
                    </div>
                  </div>
                </div>

                {/* 内阻异常趋势雷达 */}
                <div className="bg-white rounded-xl p-3 border border-red-100 mb-3">
                  <div className="text-[8px] font-mono text-zinc-500 mb-2">内阻趋势雷达 — 已锁定异常曲线</div>
                  <div className="flex items-end gap-[2px] h-12">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${20 + (i > 18 ? 60 + Math.random() * 30 : 15 + Math.random() * 25)}%`,
                          backgroundColor: i > 18 ? '#ef4444' : '#d4d4d8',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[9px] text-red-600 font-bold">
                  检测到临期失效风险，已自动触发均衡充电策略进行抑制，建议线下针对性更换。
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sandbox 03: Knowledge Graph Root Cause + Alert Firewall ──────────────

function KnowledgeGraphSandbox() {
  const [simulating, setSimulating] = useState(false);
  const [phase, setPhase] = useState(0); // 0=idle, 1=ingesting, 2=converging, 3=root-cause, 4=dispatching
  const [alertCount, setAlertCount] = useState(0);
  const [convergedCount, setConvergedCount] = useState(0);

  const startSimulation = useCallback(() => {
    if (simulating) return;
    setSimulating(true);
    setPhase(0);

    // Phase 1: 吞入 400 条
    setTimeout(() => { setPhase(1); setAlertCount(400); }, 300);
    // Phase 2: 图谱归并
    setTimeout(() => { setPhase(2); setConvergedCount(400); }, 1500);
    // Phase 3: 收敛根因
    setTimeout(() => { setPhase(3); setConvergedCount(1); }, 3000);
    // Phase 4: 多通道分发
    setTimeout(() => { setPhase(4); }, 4200);
  }, [simulating]);

  const resetSimulation = useCallback(() => {
    setSimulating(false);
    setPhase(0);
    setAlertCount(0);
    setConvergedCount(0);
  }, []);

  const dispatchChannels = [
    { icon: MessageSquare, label: '企业微信', active: phase >= 4, delay: 0 },
    { icon: FileText, label: '飞书', active: phase >= 4, delay: 1 },
    { icon: Smartphone, label: '电话', active: phase >= 4, delay: 2 },
    { icon: Bell, label: '声光矩阵', active: phase >= 4, delay: 3 },
  ];

  return (
    <div className="space-y-4">
      {/* 告警管理控制台 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-wider">
              B 端统一告警管理控制台
            </span>
          </div>
          <button
            onClick={simulating ? resetSimulation : startSimulation}
            className={`text-[9px] px-3 py-1.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
              simulating
                ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            }`}
          >
            {simulating ? '重置' : '模拟故障流大并发冲击'}
          </button>
        </div>
      </div>

      {/* 告警流处理可视化 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 左侧：告警处理流程 */}
        <div className="lg:col-span-2 space-y-3">
          {/* 实时告警流 */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">实时告警流</span>
              {simulating && (
                <span className="text-[8px] px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-bold animate-pulse">
                  处理中...
                </span>
              )}
            </div>

            {/* 告警条目流 */}
            <div className="space-y-1.5 max-h-48 overflow-hidden">
              {phase === 0 && !simulating && (
                <div className="text-[9px] text-zinc-300 text-center py-6 font-mono">
                  等待模拟触发 — 点击「模拟故障流大并发冲击」
                </div>
              )}

              {/* Phase 1: 大量告警涌入 */}
              {phase >= 1 && (
                <AnimatePresence>
                  {Array.from({ length: Math.min(alertCount, 8) }).map((_, i) => (
                    <motion.div
                      key={`alert-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 30 }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[8px] font-mono ${
                        phase >= 3 && i === 0
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : 'bg-amber-50/50 border-amber-100 text-amber-600'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        phase >= 3 && i === 0 ? 'bg-red-500' : 'bg-amber-400'
                      }`} />
                      <span>{phase >= 3 && i === 0 ? '消防监控主机 2 触发烟感告警' : `关联设备异常 #${400 - i}`}</span>
                      {phase >= 3 && i === 0 && (
                        <span className="ml-auto text-[7px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">
                          根因 · 4级最高烈度
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* 压缩进度 */}
            {phase >= 1 && (
              <div className="mt-3 pt-3 border-t border-zinc-100">
                <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 mb-1.5">
                  <span>同类压缩去重 + 知识图谱归并</span>
                  <span className={phase >= 3 ? 'text-emerald-600 font-bold' : 'text-amber-600'}>
                    {phase >= 3 ? `${convergedCount} 条 → 1 条根因` : `${alertCount} 条处理中...`}
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: phase >= 3 ? '100%' : phase >= 2 ? '60%' : '25%' }}
                    transition={{ duration: 800 }}
                    className={`h-full rounded-full ${
                      phase >= 3 ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：根因卡片 + 分发通道 */}
        <div className="space-y-3">
          {/* 根因高亮红单 */}
          <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
            phase >= 3
              ? 'bg-red-50 border-red-300 shadow-lg'
              : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-4 h-4 ${phase >= 3 ? 'text-red-500' : 'text-zinc-300'}`} />
              <span className="text-[10px] font-bold text-zinc-700">根因收敛</span>
              {phase >= 3 && (
                <span className="text-[7px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">4级最高烈度</span>
              )}
            </div>

            {phase >= 3 ? (
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-2.5 border border-red-100">
                  <div className="text-[10px] font-bold text-red-700">消防监控主机 2 触发烟感告警</div>
                  <div className="text-[8px] text-zinc-500 mt-1">并发的 400 条关联设备异常全部归并入本根因事件</div>
                </div>
                <div className="text-[8px] font-mono text-zinc-400">
                  压缩率: <span className="text-emerald-600 font-bold">99.75%</span> · 收敛耗时: <span className="text-emerald-600 font-bold">&lt;50ms</span>
                </div>
              </div>
            ) : (
              <p className="text-[9px] text-zinc-400 italic">等待告警流归并...</p>
            )}
          </div>

          {/* 多通道联动分发 */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                多通道联动分发
              </span>
            </div>
            <div className="space-y-2">
              {dispatchChannels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={ch.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: phase >= 4 ? i * 300 : 0 }}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-[9px] font-bold transition-all duration-500 ${
                      ch.active
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-white border-zinc-200 text-zinc-400'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${ch.active ? 'text-emerald-500' : 'text-zinc-300'}`} />
                    <span>{ch.label}</span>
                    {ch.active && (
                      <span className="ml-auto">
                        <PulseDot color="emerald" />
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            {phase >= 4 && (
              <p className="text-[7px] font-mono text-emerald-600 mt-2 text-center">
                已秒级精准分发至对应机房负责人值班手持端
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────

export function IDCIoTDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* ═══ 区块0：顶部大框 ═══ */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            IDC-IOT SYSTEM v3.0 · INDUSTRIAL DATA CENTER IOT PLATFORM
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">工业级数据中心基础设施动环监控平台</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          千万级测点高并发实时采集，融合电力、暖通、蓄电池、空间四维数据。设计物联中枢逻辑打通「传感器采集 → Kafka 分流 → 时序分析 → 知识图谱根因推理 → 反控执行」的工业级全链路闭环。面向工业级数据中心，实现"监、管、控、维"一体化治理。
        </p>
      </div>

      {/* ═══ 区块1：标签行 — 核心标签矩阵 ═══ */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        {/* 产品/设计选型 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 产品/设计选型</span>
          {['千万级并发网关', '2.5D/3D组态物联', '设备知识图谱', 'SOP自动化预案', '多通道告警矩阵'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        {/* 效能价值 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '测点并发吞吐', value: '千万级' },
            { label: '故障根因判定', value: '秒级' },
            { label: '自定义告警阈值', value: '5级' },
            { label: '业务连续性运行', value: '100%' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ 卡片一：产品系统架构与"破除数据烟囱"业务逻辑 ═══ */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
            // 01 产品系统架构 / "破除数据烟囱"业务逻辑
          </span>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <ArchitectureCard />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ 卡片二：交互沙盒 01 — 电力-暖通空间解耦与 3D 精准组态控制 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="01" label="电力-暖通空间解耦与 3D 精准组态控制" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <PowerHVACSandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ 卡片三：交互沙盒 02 — 单体电池阻抗实时跟踪与事故隐患超前拦截 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="02" label="单体电池阻抗实时跟踪与事故隐患超前拦截" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <BatterySandbox />
        </div>
      </div>

      <SectionDivider />

      {/* ═══ 卡片四：交互沙盒 03 — 图谱关联根因定位与全渠道告警降噪防火墙 ═══ */}
      <div className="space-y-3">
        <SandboxHeader num="03" label="图谱关联根因定位与全渠道告警降噪防火墙" />
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <KnowledgeGraphSandbox />
        </div>
      </div>
    </>
  );
}
