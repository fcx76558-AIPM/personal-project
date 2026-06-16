/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIMELINE_MILESTONES } from '../data';
import { Calendar, Briefcase, ChevronRight, Award } from 'lucide-react';

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dot-grid">
      
      {/* Header Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-12">
        <div>
          <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase block mb-2">
            / 04 PROFESSIONAL JOURNEY
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
            履历时间线 <span className="text-zinc-300 font-normal">/</span> Timeline
          </h2>
        </div>

      </div>

      {/* Timeline Wrapper Grid Block */}
      <div className="relative mt-8 space-y-12">
        {/* Vertical line — always perfectly centered */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-zinc-200" />

        {TIMELINE_MILESTONES.map((milestone, idx) => {
          return (
            <div key={milestone.id} className="relative group pl-12 sm:pl-16" id={`timeline-item-${milestone.id}`}>

              {/* Dot pointer — left-0 + translateX to center on the vertical line */}
              <div className="absolute left-4 sm:left-6 top-1.5 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-zinc-200 text-zinc-400 group-hover:bg-[#0A0A0C] group-hover:text-white group-hover:border-[#0A0A0C] transition-all shadow-sm z-10">
                {idx === 0 ? <Award className="h-5 w-5 text-emerald-500" /> : <Briefcase className="h-5 w-5" />}
              </div>

              {/* Main Content Container */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs hover:-translate-y-1 hover:shadow-emerald-500/10 hover:shadow-lg transition-all">
                
                {/* Meta Row: Period & Org */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-lg sm:text-xl font-black tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {milestone.company}
                    </span>
                    {idx === 0 && (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-100/50">
                        RECENT WORK_
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-zinc-50 text-zinc-500 text-xs font-mono font-semibold px-3 py-1 rounded-full border border-zinc-200/60">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{milestone.period}</span>
                  </div>
                </div>

                {/* Subtitle / Title */}
                <h4 className="text-sm sm:text-base font-bold text-zinc-800 tracking-tight font-sans">
                  {milestone.title}
                </h4>

                {/* Vertical list of bullets */}
                <ul className="mt-6 space-y-4 text-zinc-600 border-t border-zinc-100 pt-5">
                  {milestone.bullets.map((bullet, i) => {
                    // Extract bold tags for customized typography
                    const parts = bullet.split(/【|】/);
                    const parsedTitle = parts.length > 1 ? parts[1] : '';
                    const bodyText = parts.length > 2 ? parts[2] : bullet;

                    return (
                      <li key={i} className="flex gap-2 text-sm sm:text-[13.5px] leading-relaxed">
                        <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0 mt-1" />
                        <div>
                          {parsedTitle && (
                            <span className="font-bold text-zinc-900 font-sans block mb-0.5">
                              【{parsedTitle}】
                            </span>
                          )}
                          <span className="font-sans text-zinc-500 mt-0.5 block">
                            {bodyText}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Keywords Taglist */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-zinc-100/80">
                  {milestone.skills.map((skill, k) => (
                    <span 
                      key={k} 
                      className="text-[10px] sm:text-[10.5px] font-semibold bg-zinc-50 text-zinc-500 border border-zinc-200/50 px-2.5 py-1 rounded"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
