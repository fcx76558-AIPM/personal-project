import React, { useState, useEffect, useCallback } from 'react';
import {
  GitBranch, Route, Wrench, BookOpen, AlertTriangle,
  Search, CheckCircle2, Circle, Wifi, WifiOff, Clock,
  ChevronRight, ArrowLeft, Zap, ShieldCheck
} from 'lucide-react';
import { Project } from '../types';

function AnimatedNumber({ value, decimals = 0, duration = 600 }: { value: number; decimals?: number; duration?: number }) {
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

const productTags = ['低代码工单引擎', 'ITIL标准规范体系', '自动化巡检计划调度', 'SOP移动端现场深度感知', '知识库关联收敛'];
const valueMetrics = [
  { label: '降低警报疲劳', value: 70, unit: '%' },
  { label: '平均修复故障时间缩短', value: 45, unit: '%' },
  { label: '工单流转分级', value: 4, unit: '级' },
  { label: '运维管理全链路留存', value: 100, unit: '%' },
];

const archLayers = [
  { name: '低代码 ITIL 工单引擎层', icon: GitBranch },
  { name: '智能巡检路线调度层', icon: Route },
  { name: '标准化设备维护保养层', icon: Wrench },
  { name: '智能值班与知识库闭环层', icon: BookOpen },
];

export function DCOMDetailView({ project }: { project: Project }) {
  const [engineActive, setEngineActive] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sla, setSla] = useState(862);
  const [kbSearched, setKbSearched] = useState(false);

  useEffect(() => {
    if (!engineActive) return;
    const t = setInterval(() => setSla(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [engineActive]);

  const formatSla = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `00:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSync = useCallback(() => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setCompleted(true); }, 2000);
  }, []);

  const sopSteps = [
    { text: '确认设备断电状态', done: true },
    { text: '执行进出水管温差读数记录', done: true },
    { text: '拍照上传并提交巡检结果', done: false },
  ];

  return (
    <div className="space-y-6">
      {/* Section 0: Header */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-600">
            DCOM · ITIL WORKFLOW ENGINE &amp; DIGITAL OPS
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">DCOM（工单/巡检/维保）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">{project.subtitle}</p>
      </div>

      {/* Section 1: Tags Row */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {productTags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium border" style={{ borderColor: '#f59e0b33', color: '#d97706', backgroundColor: '#f59e0b0d' }}>{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {valueMetrics.map(m => (
            <span key={m.label} className="text-[11px] text-zinc-600">
              {m.label} <strong className="text-zinc-900"><AnimatedNumber value={m.value} />{m.unit}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Section 2: System Architecture */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-2.5 text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          系统架构分层
        </div>
        <div className="p-4 space-y-2">
          {archLayers.map((l, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
              <l.icon size={16} style={{ color: '#d97706' }} />
              <span className="text-xs font-medium text-zinc-700">{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sandbox 01: Low-code ITIL Workflow Engine */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-zinc-50 border-b border-zinc-100">
          Sandbox 01 · 低代码 ITIL 工单引擎
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: SVG Flowchart */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white">
              <svg viewBox="0 0 400 280" className="w-full">
                {/* node_01: 动环高危告警触发 */}
                <rect x="120" y="10" width="160" height="32" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
                <text x="200" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">动环高危告警触发</text>
                <line x1="200" y1="42" x2="200" y2="65" stroke="#d4d4d8" strokeWidth="1.5"/>
                {/* node_02: 二线维保响应接单 */}
                <rect x="120" y="65" width="160" height="32" rx="6" fill="none" stroke="#f59e0b" strokeWidth="2" className={engineActive ? 'animate-pulse' : ''}/>
                <text x="200" y="85" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="600">二线维保响应接单</text>
                {/* Branch lines */}
                <line x1="200" y1="97" x2="120" y2="125" stroke={engineActive ? '#22c55e' : '#d4d4d8'} strokeWidth="1.5">
                  {engineActive && <animate attributeName="stroke" values="#22c55e;#86efac;#22c55e" dur="1.5s" repeatCount="indefinite"/>}
                </line>
                <line x1="200" y1="97" x2="280" y2="125" stroke={engineActive ? '#22c55e' : '#d4d4d8'} strokeWidth="1.5">
                  {engineActive && <animate attributeName="stroke" values="#22c55e;#86efac;#22c55e" dur="1.5s" repeatCount="indefinite"/>}
                </line>
                {/* node_03a: 蓄电池更换 */}
                <rect x="30" y="125" width="140" height="32" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5"/>
                <text x="100" y="145" textAnchor="middle" fill="#71717a" fontSize="10">蓄电池更换</text>
                {/* node_03b: 现场环境测温隔离 */}
                <rect x="230" y="125" width="140" height="32" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5"/>
                <text x="300" y="145" textAnchor="middle" fill="#71717a" fontSize="10">现场环境测温隔离</text>
                {/* Merge lines */}
                <line x1="100" y1="157" x2="200" y2="185" stroke="#d4d4d8" strokeWidth="1.5"/>
                <line x1="300" y1="157" x2="200" y2="185" stroke="#d4d4d8" strokeWidth="1.5"/>
                {/* node_04: 联合会签审批 */}
                <rect x="120" y="185" width="160" height="32" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5"/>
                <text x="200" y="205" textAnchor="middle" fill="#71717a" fontSize="10">联合会签审批</text>
                {/* Reject arrow when active */}
                {engineActive && (
                  <g>
                    <line x1="120" y1="201" x2="120" y2="81" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3">
                      <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
                    </line>
                    <polygon points="116,85 124,85 120,75" fill="#ef4444"/>
                    <text x="75" y="145" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="600">驳回</text>
                  </g>
                )}
              </svg>
            </div>
            {/* Right: Ticket Detail */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-400">DCOM-2026-0616-09</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700">CRITICAL P4</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Clock size={12} />
                <span>SLA 剩余：</span>
                <span className="font-mono font-bold text-zinc-900">{engineActive ? formatSla(sla) : '00:14:22'}</span>
              </div>
              {engineActive && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-zinc-700 leading-relaxed animate-fade-in">
                  <div className="font-semibold text-amber-700 mb-1">低代码动作日志</div>
                  总监执行【驳回至工程师】动作。状态机已平滑逆向切流。
                </div>
              )}
              <button
                onClick={() => setEngineActive(a => !a)}
                className="w-full mt-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors"
                style={{ borderColor: engineActive ? '#d97706' : '#e4e4e7', color: engineActive ? '#d97706' : '#71717a', backgroundColor: engineActive ? '#fffbeb' : '#fafafa' }}
              >
                {engineActive ? '停止模拟' : '模拟启动：低代码流程节点自由驳回重组'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox 02: Smart Inspection & Offline SOP */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-zinc-50 border-b border-zinc-100">
          Sandbox 02 · 智能巡检 &amp; 离线 SOP
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Route Tree */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white space-y-3">
              <div className="font-mono text-[10px] text-zinc-400">ROUTE-IT01-3F</div>
              <div className="text-xs font-medium text-zinc-700">智算一期3F核心机房主路线</div>
              <div className="space-y-1.5 pl-2">
                {[{ name: '精密空调组', checked: true }, { name: '变压器柜', checked: true }, { name: '后备锂电池组', checked: false }].map(n => (
                  <label key={n.name} className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                    <input type="checkbox" defaultChecked={n.checked} className="accent-amber-500 w-3.5 h-3.5" />
                    {n.name}
                  </label>
                ))}
              </div>
            </div>
            {/* Right: Mobile Pad Mockup */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white space-y-3">
              <div className="flex items-center gap-1.5">
                {completed ? <Wifi size={12} className="text-green-500" /> : <WifiOff size={12} className="text-orange-500" />}
                <span className={`px-2 py-0.5 rounded text-[9px] font-semibold ${completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {completed ? '网络已连接' : '无网离线'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100 text-[11px]">
                <div className="font-medium text-zinc-700">当前设备：精密空调组-03</div>
                <div className="text-zinc-400 mt-0.5">编号 PAC-3F-003 · 位置 A区3排</div>
              </div>
              <div className="space-y-1.5">
                {sopSteps.map((s, i) => (
                  <div key={i} className={`flex items-center gap-2 text-[11px] ${s.done || completed ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {s.done || completed ? <CheckCircle2 size={13} className="text-amber-500" /> : <Circle size={13} />}
                    {s.text}
                  </div>
                ))}
              </div>
              {syncing && (
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full animate-pulse" style={{ backgroundColor: '#f59e0b', width: '60%' }} />
                </div>
              )}
              {completed && (
                <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-[11px] text-green-700 animate-fade-in">
                  同步完成：3项巡检记录已上传至知识库
                </div>
              )}
              <button
                onClick={handleSync}
                disabled={syncing || completed}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors"
                style={{ borderColor: completed ? '#e4e4e7' : '#d97706', color: completed ? '#a1a1aa' : '#d97706', backgroundColor: completed ? '#fafafa' : '#fffbeb' }}
              >
                {completed ? '同步完成' : syncing ? '同步中...' : '离线完成全部维保步骤并模拟通网同步'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox 03: Duty Calendar & Knowledge Base */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-zinc-50 border-b border-zinc-100">
          Sandbox 03 · 值班日历 &amp; 知识库
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Calendar */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white space-y-3">
              <div className="grid grid-cols-7 gap-1 text-center">
                {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                  <div key={d} className="text-[9px] font-semibold text-zinc-400 py-1">{d}</div>
                ))}
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className={`py-1.5 rounded-lg text-[11px] ${i === 3 ? 'bg-amber-500 text-white font-bold' : 'text-zinc-600'}`}>
                    {14 + i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ backgroundColor: '#f59e0b15' }}>
                <Clock size={12} style={{ color: '#d97706' }} />
                <span className="text-[11px] font-semibold" style={{ color: '#d97706' }}>夜班</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { role: '值班长', name: '李四', icon: ShieldCheck },
                  { role: '核心巡检', name: '王五', icon: Zap },
                ].map(s => (
                  <div key={s.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <s.icon size={13} style={{ color: '#d97706' }} />
                    <span className="text-[11px] text-zinc-500">{s.role}</span>
                    <span className="text-[11px] font-medium text-zinc-700">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Knowledge Base */}
            <div className="rounded-xl border border-zinc-200 p-4 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-zinc-400" />
                <input
                  readOnly
                  value="精密空调进出水管温升异常"
                  className="flex-1 text-xs text-zinc-700 bg-transparent outline-none"
                />
              </div>
              {kbSearched && (
                <div className="space-y-2 p-3 rounded-xl border border-amber-200 bg-amber-50/50 animate-fade-in">
                  <div className="text-[11px] font-bold text-zinc-800 leading-snug">
                    3D-IDEC工业级精密空调管道压差温升异常解决方案
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5 text-[10px] text-zinc-600">
                      <ShieldCheck size={11} className="mt-0.5 text-amber-500 shrink-0" />
                      <span><strong>事前预防：</strong>定期监测进出水管压差趋势，设定温升阈值预警线</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[10px] text-zinc-600">
                      <ChevronRight size={11} className="mt-0.5 text-amber-500 shrink-0" />
                      <span><strong>事后优化：</strong>调整冷却水流速比例，优化制冷效率 23%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">置信度 <strong className="text-zinc-700"><AnimatedNumber value={98}/>%</strong></span>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: '#d97706' }}>
                      <AlertTriangle size={10} /> 关联触发：DCOM-2026-0616-09
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setKbSearched(true)}
                disabled={kbSearched}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors"
                style={{ borderColor: kbSearched ? '#e4e4e7' : '#d97706', color: kbSearched ? '#a1a1aa' : '#d97706', backgroundColor: kbSearched ? '#fafafa' : '#fffbeb' }}
              >
                {kbSearched ? '已搜索' : '搜索关联故障方案'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
