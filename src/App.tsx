/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import SkillMatrix from './components/SkillMatrix';
import FeaturedProjects from './components/FeaturedProjects';
import Timeline from './components/Timeline';
import { Mail, Phone, Calendar, MapPin, Send, CheckCircle2, Copy, FileText, Download } from 'lucide-react';

export default function App() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderMsg, setSenderMsg] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (senderName.trim() && senderContact.trim() && senderMsg.trim()) {
      setFormSent(true);
      setTimeout(() => {
        setFormSent(false);
        setSenderName('');
        setSenderContact('');
        setSenderMsg('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-zinc-900 selection:bg-zinc-950 selection:text-white pb-16 antialiased">
      {/* 0. GLOBAL HEADER (Sticky Navigation) */}
      <Header />

      {/* Main Container Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-4 space-y-12">
        
        {/* 1. HERO PROFILE SECTION (Above the Fold - Split Panel) */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column Block (Span 5 of 12) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
            <div>
              {/* Brand identifier / Tag */}
              {/* Avatar - circular with border */}
              <div className="mb-6">
                <img
                  src={`${import.meta.env.BASE_URL}avatar.jpg`}
                  alt="房晨曦"
                  className="w-[150px] h-[150px] rounded-full object-cover object-center border-2 border-white/80 shadow-[0_0_0_4px_rgba(16,185,129,0.15),0_0_30px_rgba(16,185,129,0.2)] ml-auto"
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950"></span>
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  PORTFOLIO HOME_ / 个人名片 
                </span>
              </div>

              {/* Massive Bold condensed typography for the name */}
              <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-black tracking-tighter leading-none text-zinc-950 uppercase selection:bg-emerald-500">
                房晨曦
              </h1>

              <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-black text-zinc-850 tracking-tight mt-3">
                AI 落地 <span className="text-zinc-400 font-light">/</span> B 端解决方案产品经理
              </h2>

              {/* Core micro chips — 2×2 grid with border */}
              <div className="mt-5 border-t border-zinc-300 pt-4">
                <div className="grid grid-cols-2 gap-1.5">
                  {["#AI产品化", "#B端SaaS全生命周期", "#数据量化闭环", "#VIBECODING快速原型"].map((chip, idx) => (
                    <span 
                      key={idx} 
                      className="bg-transparent text-emerald-800 border border-zinc-800 text-xs font-mono font-bold px-3 py-1.5 rounded text-center"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>


            </div>
          </div>

          {/* Right Column Block (Span 7 of 12) - Contrast Box */}
          <div className="lg:col-span-7 bg-[#0A0A0C] text-zinc-100 p-6 sm:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-zinc-800 shadow-md">
            
            {/* Background design glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />
            
            {/* Upper Section: Core credentials Info list */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-6">
                <span className="font-mono text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
                  [ CREDENTIAL LOG / 个人基本信息 ]
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div 
                  onClick={() => copyToClipboard("16622552567", "手机号")}
                  className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 cursor-pointer hover:border-zinc-800 transition"
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>联络电话 / Mobile</span>
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold font-mono text-zinc-100">166-2255-2567</span>
                    <span className="text-[10px] text-emerald-400 font-mono">{copiedText === "手机号" ? "已复制!" : "点击复制"}</span>
                  </div>
                </div>

                <div 
                  onClick={() => copyToClipboard("16622552567@163.com", "邮箱")}
                  className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 cursor-pointer hover:border-zinc-800 transition"
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>电子邮箱 / Email</span>
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold font-mono text-zinc-100">16622552567@163.com</span>
                    <span className="text-[10px] text-emerald-400 font-mono">{copiedText === "邮箱" ? "已复制!" : "点击复制"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>出生年月 / Born Date</span>
                  </span>
                  <span className="text-sm font-bold font-mono text-zinc-100 mt-1">1997.03 (29岁)</span>
                </div>

                <div className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>求职意向 / Intention</span>
                  </span>
                  <span className="text-sm font-bold font-sans text-zinc-100 mt-1">AI产品经理 / 资深B端产品经理</span>
                </div>

              </div>

              {/* Professional overview box — moved from left column */}
              <div className="mt-6 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  // PROFESSIONAL SUM / 核心专业概述
                </span>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-zinc-300">
                  <strong className="text-zinc-100">7 年 B 端与 AI 产品经验</strong> | <strong className="text-zinc-100">深耕 SaaS / 数据智能 / AI Agent 落地</strong> | <strong className="text-zinc-100">0 → 1 产品搭建与全生命周期管理</strong>。<br />擅长将 AI 能力与垂直行业场景深度耦合，以量化指标驱动产品迭代，完成 AI 产品从规划到商业化的全周期交付，<strong className="text-zinc-100">累计量化业务提效 40% 以上</strong>。
                </p>
              </div>

            </div>

            {/* Lower Section: Academic / Education background */}
            <div className="mt-6 pt-6 border-t border-zinc-900">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-widest uppercase block mb-3">
                [ EDUCATION & DEGREE / 教育背景 ]
              </span>
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-[#1E1E24]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-100 font-sans tracking-tight">山东财经大学东方学院</h4>
                  <p className="text-xs text-zinc-400 font-sans mt-1">2015.09 - 2019.06 (本科毕业) · 市场营销专业 · 学士学位</p>
                </div>
                <div className="w-full sm:w-auto text-right">
                  <span className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10.5px] font-mono font-semibold px-2.5 py-1 rounded">
                    BACHELOR_DEGREE
                  </span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 2. SKILL MATRIX SECTION (能力矩阵) */}
        <SkillMatrix />

        {/* 3. FEATURED PROJECTS DASHBOARD (明星项目) */}
        <FeaturedProjects />

        {/* 4. TIMELINE LEDGER (履历时间线) */}
        <Timeline />

        {/* 4.5 CTA SECTION — READY FOR DEPLOYMENT */}
        <section id="footer" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0A0A0C] rounded-4xl p-10 sm:p-16 md:p-20 border border-zinc-800 shadow-xl relative overflow-hidden">
            
            {/* Grid overlay for breathing texture — gradient fade */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 70% 60% at center, rgba(0,0,0,0.55), transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at center, rgba(0,0,0,0.55), transparent 70%)',
              }}
            ></div>
            
                        {/* Background glow */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

            {/* Top micro-tag */}
            <div className="flex items-center justify-center gap-1.5 mb-2 select-none">
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
                <span className="text-emerald-500">READY FOR DEPLOYMENT</span>
                <span className="text-zinc-500"> / 拥抱生产落地</span>
              </span>
            </div>

            {/* Pressing display title */}
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mt-8 max-w-4xl mx-auto">
              寻找兼顾 AI 前瞻性与工程高人效的产品实干家？
            </h2>

            {/* Geometric sub-text */}
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto mt-6 text-center tracking-wide font-normal">
              如果您的企业正寻求大幅核减模型推理开支、设计近乎零偏差的人机协同流程、抑或通过大语言模型与数字物理系统深度结合来赋能业务，期盼与您深度碰撞。
            </p>

            {/* Dual capsule buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full">
              
              {/* BUTTON A — Primary mailto */}
              <a
                href="mailto:16622552567@163.com"
                className="bg-white text-zinc-950 font-mono font-bold text-sm tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-lg hover:bg-zinc-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>16622552567@163.COM</span>
              </a>

              {/* BUTTON B — Secondary location indicator */}
              <div className="bg-zinc-900/50 border border-zinc-800 text-zinc-400 font-sans text-sm tracking-tight px-6 py-3.5 rounded-xl flex items-center gap-2 select-none">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-500" />
                <span>中国 · 北京/天津</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
