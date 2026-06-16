/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [activeTab, setActiveTab] = useState('hero');

  const sections = [
    { label: '首页', target: 'hero' },
    { label: '能力矩阵', target: 'skills' },
    { label: '明星项目', target: 'projects' },
    { label: '履历时间线', target: 'timeline' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 100) {
        setActiveTab('hero');
        return;
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].target);
        if (el && el.offsetTop - 120 <= scrollY) {
          setActiveTab(sections[i].target);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          id="header-brand"
        >
          <span className="font-sans text-lg font-black tracking-tight text-zinc-950">
            房晨曦 <span className="text-zinc-400 font-light">-</span> 产品作品个人站
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/60 shadow-sm animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-mono tracking-wider">[● ENGINE ACTIVE]</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {sections.map((tab) => (
            <button
              key={tab.target}
              id={`nav-tab-${tab.target}`}
              onClick={() => scrollToSection(tab.target)}
              className={`px-4 py-2 font-sans text-xs font-semibold tracking-wide rounded-md transition-colors duration-155 ${
                activeTab === tab.target
                  ? 'text-zinc-950 bg-zinc-100 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
          
          <button
            onClick={() => scrollToSection('footer')}
            className="ml-4 flex items-center gap-1.5 rounded-full bg-[#0A0A0C] px-4 py-1.5 font-sans text-xs font-semibold text-white tracking-wide hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-emerald-400" />
            <span>立即联络</span>
          </button>
        </nav>

        {/* Mobile quick action indicator */}
        <div className="flex md:hidden items-center gap-1.5 text-zinc-400 text-xs font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ONLINE</span>
        </div>
      </div>
    </header>
  );
}
