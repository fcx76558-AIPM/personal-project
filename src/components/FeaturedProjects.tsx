/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CATEGORIES } from '../data';
import { Category, Project } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import ProjectDetailModal from './ProjectDetailModal';

export default function FeaturedProjects() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("agent");
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // Expose deep routing openProjectDrawer globally
  useEffect(() => {
    (window as any).openProjectDrawer = (projectId: string) => {
      for (const cat of CATEGORIES) {
        const idx = cat.projects.findIndex(p => p.id === projectId);
        if (idx !== -1) {
          setActiveCategoryId(cat.id);
          setActiveProjectIdx(idx);
          setIsDetailOpen(true);
          return;
        }
      }
    };
    return () => {
      delete (window as any).openProjectDrawer;
    };
  }, []);

  // Derive current select structure
  const currentCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];
  const currentProject = currentCategory.projects[activeProjectIdx] || currentCategory.projects[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategoryId(catId);
    setActiveProjectIdx(0); // Reset project subtab on category shift
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case "agent": return <span className="text-lg leading-none shrink-0">🤖</span>;
      case "iot": return <span className="text-lg leading-none shrink-0">🔌</span>;
      case "saas-order": return <span className="text-lg leading-none shrink-0">🧾</span>;
      case "ai-edge": return <span className="text-lg leading-none shrink-0">🧠</span>;
      case "digital-twin": return <span className="text-lg leading-none shrink-0">📊</span>;
      case "b2b-platform": return <span className="text-lg leading-none shrink-0">🌐</span>;
      default: return <span className="text-lg leading-none shrink-0">🔧</span>;
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Main Header Descriptor */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-12">
        <div>
          <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase block mb-2">
            / 03 WORK BENCH AND PRODUCTS
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
            明星项目 <span className="text-zinc-300 font-normal">/</span> Projects
          </h2>
        </div>
        
      </div>

      {/* Main Project Dashboard Workspace Box */}
      <div
        className="bg-white rounded-3xl p-4 sm:p-6 border border-zinc-200 flex flex-col lg:flex-row gap-6 mt-8"
        id="project-dashboard-container"
      >
        {/* LEFT SIDEBAR PANEL (Width: 30%) */}
        <div className="w-full lg:w-[32%] flex flex-col gap-2">

          {/* ── Mobile: Horizontal pill tabs ── */}
          <div className="lg:hidden">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-3">
              核心赛道
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none snap-x snap-mandatory">
              {CATEGORIES.map((cat: Category) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0A0A0C] text-white border-[#0A0A0C] shadow-sm"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800"
                    }`}
                  >
                    <span className="text-[13px] leading-none">{getCategoryIcon(cat.id)}</span>
                    <span className="font-sans tracking-tight whitespace-nowrap">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Desktop: Vertical sidebar with emoji + name ── */}
          <div className="hidden lg:flex flex-col gap-2">
            <div className="px-3.5 py-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                PRODUCT EXPERTISE / 核心赛道分类
              </span>
            </div>
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
              {CATEGORIES.map((cat: Category) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-2xl border transition-all duration-155 whitespace-nowrap cursor-pointer select-none ${
                      isActive
                        ? "bg-[#0A0A0C] text-white border-[#0A0A0C] shadow-md font-bold"
                        : "bg-[#FFFFFF] text-zinc-600 border-zinc-200/80 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "text-emerald-400 bg-zinc-900" : "text-zinc-400 bg-zinc-50"}`}>
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="font-sans text-sm tracking-tight">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT CONTENT WORKSPACE (Width: 70%) */}
        <div className="w-full lg:w-[68%] flex flex-col gap-4">
          
          {/* Top Tab Strip (Project Pills) */}
          <div className="bg-[#FFFFFF] p-2 rounded-2xl border border-zinc-200/80 flex flex-wrap gap-1.5">
            {currentCategory.projects.map((project: Project, idx: number) => {
              const isProjActive = idx === activeProjectIdx;
              return (
                <button
                  key={project.id}
                  id={`proj-pill-${project.id}`}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all duration-150 cursor-pointer ${
                    isProjActive
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                  }`}
                >
                  {project.title.split(" (")[0]}
                </button>
              );
            })}
          </div>

          {/* Central Display Stage */}
          <div 
            onClick={() => setIsDetailOpen(true)}
            className="bg-[#0A0A0C] rounded-3xl p-6 sm:p-10 text-zinc-100 min-h-[460px] flex flex-col justify-between relative overflow-hidden group border border-zinc-800 cursor-pointer shadow-lg transition-all duration-300 hover:border-zinc-700 hover:shadow-xl"
            id={`display-stage-${currentProject.id}`}
          >
            {/* Background geometric accents */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-zinc-900/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-8 right-8 text-[#1E1E24] group-hover:text-emerald-500/10 font-mono text-[10rem] font-bold select-none leading-none tracking-tighter transition-colors pointer-events-none">
              0{activeProjectIdx + 1}
            </div>

            {/* Stage Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10.5px] font-mono text-zinc-400 tracking-widest uppercase block">
                  // {currentCategory.tagline}
                </span>
                <span className="text-[10.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  ACTIVE ENGINE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mt-2">
                {currentProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-400 font-mono font-semibold mt-1">
                {currentProject.subtitle}
              </p>

              {/* Sub-text summary paragraph */}

              {/* Built-with Chips row */}
              <div className="flex flex-wrap gap-2 mt-6">
                {currentProject.chips.map((chip, i) => (
                  <span key={i} className="text-[10px] sm:text-[10.5px] font-mono bg-zinc-900/80 border border-zinc-700 text-white px-2.5 py-1 rounded-md animate-breathe">
                    #{chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Middle Stage: Metric Highlights */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 my-4 border-t border-b border-zinc-900">
              {currentProject.metrics.map((m, i) => (
                <div key={i} className={`flex flex-col ${i === 0 ? 'md:col-span-2 md:row-span-2 md:justify-center md:py-4' : ''}`}>
                  <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-wider">{m.label}</span>
                  <span className={`font-black font-mono text-white mt-1 tracking-tight ${i === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'}`}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Stage Footer Button action */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="flex flex-col">
                <span className="text-[10.5px] font-mono text-zinc-500 uppercase">SYS BLUEPRINT ROUTER</span>
                <span className="text-xs text-zinc-400 font-sans">{currentProject.blueprintTitle}</span>
              </div>
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 font-sans text-xs font-bold transition hover:bg-zinc-200 active:scale-98"
              >
                <Sparkles className="h-4 w-4 text-emerald-500 animate-spin" />
                <span>查看系统设计 →</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Deep Dive Engineering System Modal Overlay */}
      <AnimatePresence>
        {isDetailOpen && (
          <ProjectDetailModal 
            project={currentProject}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onSelectProject={(projectToSelect) => {
              // Find the category and slot index of projectToSelect
              for (const cat of CATEGORIES) {
                const idx = cat.projects.findIndex(p => p.id === projectToSelect.id);
                if (idx !== -1) {
                  setActiveCategoryId(cat.id);
                  setActiveProjectIdx(idx);
                  return;
                }
              }
            }}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
