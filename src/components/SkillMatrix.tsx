/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Layers, Terminal, CheckCircle2 } from 'lucide-react';

export default function SkillMatrix() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hover: { 
      y: -5,
      transition: { duration: 0.2 },
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-12">
        <div>
          <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase block mb-2">
            / 02 CAPABILITY DIRECTORY
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
            能力矩阵 <span className="text-zinc-300 font-normal">/</span> Matrix
          </h2>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-sm"
        id="skills-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column A: AI产品技术能力 */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col justify-between group p-2 rounded-2xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/60 shadow-sm group-hover:bg-[#0A0A0C] group-hover:text-emerald-400 transition-colors duration-300">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-zinc-900 uppercase">
                    AI 产品技术能力
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider text-emerald-600 block">AI & TECH CAPABILITY</p>
                </div>
              </div>
              
              <ul className="space-y-3.5">
                {[
                  { title: "LLM Agent 架构设计", desc: "构建具有意图甄别、多轮反馈、Tool Calling 和分派逻辑的高可用模型中脑" },
                  { title: "RAG 知识库搭建", desc: "采用多路混合索引(BM25 + 向量召回)与分片滑动窗口解决复杂非标文档的信息召回" },
                  { title: "低成本级联过滤架构", desc: "对敏感业务构建规则级联与置信度前置门槛过滤，节省 70% 额外 Token 算力" },
                  { title: "Prompt Engineering", desc: "设计系统化 System Instructions、Few-Shot 提示词矩阵，实现模型稳定 JSON 输出" },
                  { title: "多模态 AI 应用", desc: "深度结合 YOLO 视觉与各种实时边缘识别技术对工业及数据室业务防区赋能" },
                  { title: "快速原型搭建", desc: "基于 Cursor/Gemini/Node/Python 进行全栈敏捷原型开发，实现 0→1 落地验证" }
                ].map((item, idx) => (
                  <li key={idx} className="group/item flex gap-3 p-3.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-emerald-200 hover:border-l-[3px] hover:border-l-emerald-500 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-xs font-bold text-zinc-900 block group-hover/item:text-emerald-700 transition-colors">{item.title}</span>
                      <span className="font-sans text-xs text-zinc-400 leading-relaxed block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column B: 产品架构与设计 */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col justify-between group p-2 rounded-2xl border-t md:border-t-0 md:border-x lg:border-t-0 lg:border-x border-zinc-200/60 lg:px-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/60 shadow-sm group-hover:bg-[#0A0A0C] group-hover:text-emerald-400 transition-colors duration-300">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-zinc-900 uppercase">
                    产品架构与设计
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider text-emerald-600 block">SaaS & INTERNET EXPERT</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {[
                  { title: "B 端 SaaS 产品规划", desc: "具有极强的大宗 B2B 定制化报价引擎拆账体系，满足多层级集团账户分权" },
                  { title: "物联网平台规划", desc: "掌握 Modbus, BACnet, MQTT 等工业协议，纳管千万级数据传感器实现秒级上报" },
                  { title: "数字孪生与可视化", desc: "结合 WebGL / Three.js 数据网关在浏览器高品质还原机房红外温场与三维布局" },
                  { title: "工单流引擎", desc: "自研基于 DAG (有向无环图) 与 SLA 报警反馈的自流转工单工作流，解决流转时滞" },
                  { title: "跨端协同设计", desc: "深度整合小程序、微信、飞书与 Web 端协同卡片触发，让通知与行动一秒流转" },
                  { title: "商业化拓展", desc: "精于分析竞品财务漏损和市场营销策略，把控全生命预收核销，完成商用闭环" }
                ].map((item, idx) => (
                  <li key={idx} className="group/item flex gap-3 p-3.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-emerald-200 hover:border-l-[3px] hover:border-l-emerald-500 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-xs font-bold text-zinc-900 block group-hover/item:text-emerald-700 transition-colors">{item.title}</span>
                      <span className="font-sans text-xs text-zinc-400 leading-relaxed block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column C: 工具熟练度 */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col justify-between group p-2 rounded-2xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-zinc-100 text-zinc-650 rounded-2xl border border-zinc-200 shadow-sm group-hover:bg-[#0A0A0C] group-hover:text-zinc-100 transition-colors duration-300">
                  <Terminal className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-zinc-900 uppercase">
                    工具熟练度
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider text-zinc-500 block">DEV STACK & METHODOLOGY</p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "AI 原生工具链",
                    items: ["DeepSeek", "Claude", "Gemini", "Cursor", "LangChain", "RAGFlow"],
                    theme: "bg-emerald-50 text-emerald-800 border-emerald-100/80"
                  },
                  {
                    title: "数据与算法",
                    items: ["SQL", "Python", "Pandas", "A/B 实验", "级联灰度", "时序统计"],
                    theme: "bg-emerald-50 text-emerald-800 border-emerald-100/80"
                  },
                  {
                    title: "产品工具",
                    items: ["Figma", "Axure", "Jira", "Notion", "飞书体系", "思维导图"],
                    theme: "bg-zinc-100 text-zinc-800 border-zinc-200"
                  },
                  {
                    title: "项目产品方法",
                    items: ["竞品拆解", "用户访谈", "异常归因", "根因分析法", "数据看板", "SLA 指标闭环"],
                    theme: "bg-amber-50 text-amber-800 border-amber-150"
                  }
                ].map((group, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 block uppercase mb-2.5">
                      {group.title}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, i) => (
                        <span
                          key={i}
                          className={`text-[10.5px] font-sans font-semibold px-2 py-1 rounded-md border shadow-2xs transition-transform duration-100 cursor-pointer hover:scale-105 active:scale-95 ${group.theme}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
