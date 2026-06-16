/**
 * 农产品产业互联网平台（B2B 农资集采 / B2C 直销一体化小程序）— 详情页
 * 配色：自然绿 + 大地棕 + 金色（主色 emerald/green，信任金牌 gold）
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Network, Users, Warehouse, Truck,
  Leaf, Hash, QrCode, MapPin, ChevronRight, Zap,
  CheckCircle2, AlertTriangle, Star, Package, Store,
  TruckElectric, Shield, Layers, TrendingUp,
} from 'lucide-react';
import type { Project } from '../types';

// ─── Shared Components ───────────────────────────────────────────────

const PulseDot = ({ color = 'emerald' }: { color?: string }) => (
  <div className={`h-2 w-2 rounded-full bg-${color}-500 animate-pulse`} />
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

const ChipBadge = ({ text, color = 'emerald' }: { text: string; color?: string }) => (
  <span className={`bg-${color}-50 border border-${color}-200 text-${color}-700 text-[10px] font-bold px-2.5 py-1 rounded-xl`}>
    {text}
  </span>
);

const MetricBadge = ({ label, value, color = 'emerald' }: { label: string; value: string; color?: string }) => (
  <span className={`border border-${color}-300 bg-${color}-50 text-${color}-800 text-[10px] font-bold px-2.5 py-1 rounded-xl`}>
    {label} <span className={`font-mono text-${color}-600`}>{value}</span>
  </span>
);

// ─── Section 2: Architecture Cards ──────────────────────────────────

const archLayers = [
  {
    icon: BookOpen,
    label: '农技知识与内容付费服务层',
    subtitle: '体系化农技课程体系',
    desc: '构建体系化的农技视频课程、病虫害智能诊断知识图谱及付费专家库，为前端农户提供在线问诊与知识资产变现通路，达成「内容引流、技术黏客」。',
    color: 'emerald',
  },
  {
    icon: Network,
    label: 'B2B 智能供需与专家撮合引擎层',
    subtitle: '多模态匹配算法',
    desc: '承接海量异构的「农户供给流」与「大宗采购商需求流」，利用多模态匹配算法动态检索最优起拍价与契约条件，并为突发灾情自动调度本地专家执行远程会诊。',
    color: 'emerald',
  },
  {
    icon: Warehouse,
    label: '农资拼单与 O2O 动态仓配供应链层',
    subtitle: 'Geo-fencing 智能重组',
    desc: '打通跨地域农资大宗集采（化肥、种子、农药）的动态拼单状态机，根据地理围栏（Geo-fencing）智能重组订单流，驱动 O2O 区域仓配中心的动态干线路由划分，极限降低物流折损。',
    color: 'emerald',
  },
  {
    icon: Leaf,
    label: 'B2C 绿色产品全链路存证溯源层',
    subtitle: '不可篡改数字通行证',
    desc: '打通「田间批次-物流环控-上架质检」的分布式分类账本（Ledger），动态生成不可篡改的「安心吃」数字通行证，反向拉动平台在 C 端的信任溢价。',
    color: 'emerald',
  },
];

// ─── Main Component ───────────────────────────────────────────────

const AgriPlatformDetailView: React.FC<{ project: Project }> = ({ project }) => {
  const [isEmergencyMatchmaking, setIsEmergencyMatchmaking] = useState(false);
  const [isGroupBuyTriggered, setIsGroupBuyTriggered] = useState(false);
  const [isBlockchainScanned, setIsBlockchainScanned] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Section 0: Header */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
              Agri-Platform B2B/B2C Industrial Internet
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">{project.title}</h1>
          <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">{project.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Section 1: Tags Row */}
        <div className="py-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {(project as any).chips?.map((chip: string, i: number) => (
              <React.Fragment key={i}><ChipBadge text={chip} /></React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(project as any).metrics?.map((m: any, i: number) => (
              <React.Fragment key={i}><MetricBadge label={m.label} value={m.value} /></React.Fragment>
            ))}
          </div>
        </div>

        <SectionDivider />

        {/* Section 2: Architecture Cards */}
        <div className="py-6 space-y-4">
          <h2 className="text-sm font-bold text-zinc-800 mb-4">系统架构 · 四层高内聚子系统</h2>
          <div className="grid grid-cols-2 gap-4">
            {archLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <React.Fragment key={i}>
                  <div className={`border border-${layer.color}-200 bg-${layer.color}-50/30 rounded-xl p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 text-${layer.color}-600`} />
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{`0${i+1}`}</span>
                    </div>
                    <h3 className="text-xs font-bold text-zinc-800 mb-1">{layer.label}</h3>
                    <p className="text-[10px] text-zinc-500 mb-2">{layer.subtitle}</p>
                    <p className="text-[10px] text-zinc-600 leading-relaxed">{layer.desc}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <SectionDivider />

        {/* ─── 沙盒 01：专家农技远程问诊与突发灾情供需智能撮合 ─── */}
        <div className="py-6 space-y-4">
          <SandboxHeader num="01" label="专家农技远程问诊与突发灾情供需智能撮合" color="emerald" />

          <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">
            <div className="grid grid-cols-5 gap-4">
              {/* 左侧：农户端提报表单 */}
              <div className="col-span-2 space-y-3">
                <div className="bg-white border border-zinc-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">农户端病虫害多模态提报表单</span>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between"><span className="text-zinc-500">作物品类</span><span className="text-zinc-800 font-medium">红富士苹果</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">产区坐标</span><span className="text-zinc-800 font-medium">陕西洛川苹果产业示范区</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">估算产量</span><span className="text-zinc-800 font-medium">45.0 吨</span></div>
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <div className="text-[10px] text-red-700 font-bold">CV 诊断结果</div>
                      <div className="text-[10px] text-red-600 mt-0.5">苹果炭疽叶枯病 (置信度 94%)</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEmergencyMatchmaking(!isEmergencyMatchmaking)}
                  className="w-full text-[10px] font-bold py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                >
                  {isEmergencyMatchmaking ? '【关闭】紧急撮合' : '【突发灾情隐患激活：启动全网供需紧急撮合】'}
                </button>
              </div>

              {/* 右侧：专家列表 + B2B 撮合网格 */}
              <div className="col-span-3 space-y-3">
                <div className="bg-white border border-zinc-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">在线农技专家推荐列表</span>
                    {isEmergencyMatchmaking && (
                      <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-600">
                        <PulseDot color="emerald" />
                        ONLINE_AVAILABLE
                      </span>
                    )}
                  </div>
                  {isEmergencyMatchmaking ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] px-2 py-1.5 bg-emerald-50 border border-emerald-200 rounded">
                        <span className="font-medium text-emerald-800">西北农林大-刘教授</span>
                        <span className="text-zinc-500">落叶果树病虫害防治</span>
                        <span className="text-amber-600 font-bold">评分 4.9</span>
                        <span className="text-emerald-600 font-mono">ONLINE_AVAILABLE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-400 text-center py-4">等待突发灾情激活...</div>
                  )}
                </div>

                {/* B2B 大宗撮合网格 */}
                <div className="bg-white border border-zinc-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">大宗供需意向动态撮合网格</span>
                  </div>
                  {isEmergencyMatchmaking ? (
                    <div className="space-y-1.5">
                      {[
                        { buyer: '裕金装酒店用品连锁集团-生鲜集采部', volume: 50.0, price: 6.8, score: 0.95, status: 'MATCHED_PENDING_SIGN' },
                        { buyer: '呼和浩特市大型商超联采中心', volume: 30.0, price: 6.5, score: 0.88, status: 'MATCHED_PENDING_SIGN' },
                      ].map((item, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex items-center justify-between text-[9px] px-2 py-1.5 bg-blue-50 border border-blue-200 rounded">
                            <span className="font-medium text-blue-800">{item.buyer}</span>
                            <span className="text-zinc-600">{item.volume}吨 / ¥{item.price}/kg</span>
                            <span className="text-emerald-600 font-bold">匹配度 {item.score}</span>
                            <span className="text-amber-600 font-mono">{item.status}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-400 text-center py-4">暂无撮合数据</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* ─── 沙盒 02：大宗农资拼单集采与 O2O 区域仓动态干线路由 ─── */}
        <div className="py-6 space-y-4">
          <SandboxHeader num="02" label="大宗农资拼单集采与 O2O 区域仓动态干线路由" color="emerald" />

          <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">
            <div className="grid grid-cols-5 gap-4">
              {/* 左侧：拼单控制台 */}
              <div className="col-span-2 space-y-3">
                <div className="bg-white border border-zinc-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">农资 B2B 集采拼单控制台</span>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between"><span className="text-zinc-500">SKU</span><span className="text-zinc-800 font-medium">工业级复合缓释氮肥 (中化集团供应)</span></div>

                    {/* 拼单进度条 */}
                    <div className="mt-2">
                      <div className="flex justify-between text-[9px] mb-1">
                        <span className="text-zinc-500">拼单进度</span>
                        <span className="font-mono font-bold text-emerald-600">{isGroupBuyTriggered ? '120.0' : '8.5'} 吨</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-2.5">
                        <div
                          className={`bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ${isGroupBuyTriggered ? 'w-full' : 'w-[7%]'}`}
                        />
                      </div>
                    </div>

                    {/* 价格阶梯 */}
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                      <div className="text-[10px] text-amber-700 font-bold mb-1">价格阶梯</div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{isGroupBuyTriggered ? '>= 100吨大厂出厂价' : '< 10吨'}</span>
                        <span className={`font-mono font-bold ${isGroupBuyTriggered ? 'text-emerald-600 text-base' : 'text-zinc-800'}`}>
                          ¥{isGroupBuyTriggered ? '3,570' : '4,200'}/吨
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsGroupBuyTriggered(!isGroupBuyTriggered)}
                  className="w-full text-[10px] font-bold py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                >
                  {isGroupBuyTriggered ? '【关闭】拼单集采' : '【激活全区大宗农资联合拼单集采机制】'}
                </button>
              </div>

              {/* 右侧：O2O 物流路由拓扑 */}
              <div className="col-span-3 space-y-3">
                <div className="bg-white border border-zinc-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">区域 O2O 物流路由拓扑组态</span>
                  </div>
                  <div className="relative h-32 bg-zinc-50 rounded-lg border border-zinc-100 p-2">
                    <div className="absolute top-2 left-2 bg-emerald-100 border border-emerald-300 rounded px-2 py-1 text-[9px] font-bold text-emerald-800">
                      中原一号总仓
                    </div>
                    {[
                      { id: 1, label: '区域1号配送点', x: 180, y: 8, active: true },
                      { id: 2, label: '区域2号前置仓', x: 280, y: 8, active: isGroupBuyTriggered },
                      { id: 3, label: '陕北果业配给站', x: 180, y: 80, active: isGroupBuyTriggered },
                    ].map((node) => (
                      <React.Fragment key={node.id}>
                        <div
                          className={`absolute border rounded px-2 py-1 text-[9px] font-bold transition-all duration-700 ${
                            node.active
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                              : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                          }`}
                          style={{ left: node.x, top: node.y }}
                        >
                          {node.label}
                        </div>
                      </React.Fragment>
                    ))}
                    {isGroupBuyTriggered && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[9px] text-emerald-600 font-mono animate-pulse">━━ 干线流光连线已激活 ━━</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 仓配决策日志 */}
                {isGroupBuyTriggered && (
                  <div className="bg-white border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-700">仓配路由决策日志</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 leading-relaxed">
                      全区拼单突破120吨，触发 100 吨大厂出厂价。单吨成本瞬间降低 15% 达成。系统自动触发分仓路由机制：生成拼单干线合并提单，指令分配至中大吨位卡车，合并运力直接下穿分拨至 3 处就近前置网点，消灭物流漏损。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* ─── 沙盒 03：C 端「安心吃」全链路防伪区块链数字溯源 ─── */}
        <div className="py-6 space-y-4">
          <SandboxHeader num="03" label="C 端「安心吃」全链路防伪区块链数字溯源" color="emerald" />

          <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">
            <div className="grid grid-cols-5 gap-4">
              {/* 左侧：手机 H5 数字通行证 */}
              <div className="col-span-2 space-y-3">
                <div className="bg-zinc-900 rounded-2xl p-3 mx-auto w-48 h-80 overflow-hidden">
                  <div className="bg-white rounded-xl h-full p-3 space-y-2 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[9px] font-bold text-zinc-700">安心吃 · 数字通行证</span>
                    </div>
                    {isBlockchainScanned ? (
                      <div className="space-y-2">
                        <div className="w-full h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="text-[9px] font-bold text-emerald-800 text-center">✓ 已验证有机 · VERIFIED_ORGANIC</div>
                        <div className="text-[8px] text-zinc-600 leading-relaxed p-2 bg-zinc-50 rounded">
                          已累计接受 200 天高山冷凉生态光照，通过 100 项农残无机检测，正处于最佳糖酸亲肤黄金期。
                        </div>
                        <div className="text-[8px] text-zinc-500 text-center font-mono">SKU-ORGANIC-APPLE-9527</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-[10px] text-zinc-400 text-center">等待扫码...</div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsBlockchainScanned(!isBlockchainScanned)}
                  className="w-full text-[10px] font-bold py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                >
                  {isBlockchainScanned ? '【关闭】扫描' : '【模拟 C 端住客扫描包装防伪二维码】'}
                </button>
              </div>

              {/* 右侧：区块链账本时序流 */}
              <div className="col-span-3 space-y-3">
                <div className="bg-white border border-zinc-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-zinc-700">区块链分布式账本时序流</span>
                  </div>
                  {isBlockchainScanned ? (
                    <div className="space-y-2">
                      {[
                        { timestamp: '2026-06-10 08:30:12', action: '产地采摘与物联网RFID打点', hash: '0x7f83b2a1...9e43', sign: '洛川农业局1号可信节点 签名已存证' },
                        { timestamp: '2026-06-11 14:15:22', action: '冷链干线物流全程冷量环控监控', hash: '0x3da49b21...12ef', sign: '顺丰冷链车载边缘网关 签名已存证' },
                        { timestamp: '2026-06-15 11:02:45', action: '绿色健康商城B2C上架质检', hash: '0x9ee4a511...44bc', sign: '平台品质监控中台 签名已存证' },
                      ].map((record, idx) => (
                        <React.Fragment key={idx}>
                          <div className="border border-zinc-200 rounded-lg p-2 space-y-1 text-[9px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-500 font-mono">{record.timestamp}</span>
                              <span className="text-emerald-700 font-bold">{record.action}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[10px]">Hash: {record.hash}</span>
                            </div>
                            <div className="text-[10px] text-emerald-600">{record.sign}</div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-400 text-center py-8">等待扫码验证...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Footer */}
        <div className="pb-12 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-mono text-zinc-400">Agri-Platform B2B/B2C · 全链路产业互联网价值闭环</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">v4.2 · MaaS-agri-traceability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriPlatformDetailView;
