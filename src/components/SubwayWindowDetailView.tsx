import React, { useState, useRef, useCallback } from 'react';
import { Eye, Zap, Radio, Monitor, Play, Pause, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Project } from '../types';

/* ============================================================
   媒体基线（所有路径相对于 /images/subway-window/）
   ============================================================ */
const MEDIA = {
  videos: [
    { src: '/images/subway-window/录屏2026-06-16 01.12.47.mp4', label: '车载 3D 孪生导乘', desc: '55" OLED 透明魔窗 · 实时拥挤度热力 + 隧道 3D 透视导航' },
    { src: '/images/subway-window/线路视频.mp4', label: '线路拓扑可视化', desc: '线网级列车运行状态图谱 · 全量车厢拥挤度热力聚合' },
  ] as const,
  train: [
    { src: '/images/subway-window/呼家楼2.png', label: '呼家楼站 · 3D 孪生透视', desc: '隧道内 WebGL 三维引擎渲染，站台结构/扶梯/出口定位' },
    { src: '/images/subway-window/金台路-呼家楼.png', label: '金台路→呼家楼区间', desc: '区间隧道内连续定位与到站倒计时' },
    { src: '/images/subway-window/花园桥2.png', label: '花园桥站 · 出站引导', desc: '出站口方向箭头 + 距离标注' },
    { src: '/images/subway-window/东夏园-郝家府.png', label: '东夏园→郝家府区间', desc: '多站连续透视与换乘接驳指引' },
    { src: '/images/subway-window/草房2.png', label: '草房站 · 站内布局', desc: '车站内部空间结构立体标注' },
    { src: '/images/subway-window/海淀五路居-田村.png', label: '海淀五路居→田村', desc: '复杂换乘站区间孪生渲染' },
  ] as const,
  station: [
    { src: '/images/subway-window/站台_常态.jpg', label: '常态运营', desc: '站台常规引导信息布局' },
    { src: '/images/subway-window/站台_封站状态.jpg', label: '封站状态', desc: '突发事件时屏幕联动变更引导信息' },
    { src: '/images/subway-window/站台_区间车.jpg', label: '区间车提示', desc: '非终点到站预通知提示' },
  ] as const,
  shenzhen: [
    { src: '/images/subway-window/深圳 车门1.png', label: '深圳屏蔽门 · 车门屏 1', desc: '车门上方点位拥挤度标定' },
    { src: '/images/subway-window/深圳 车门上.png', label: '深圳屏蔽门 · 车门屏 2', desc: '多端协同引导至车厢级' },
    { src: '/images/subway-window/深圳 车门.png', label: '深圳屏蔽门 · 综合态', desc: '站台全局分流引导总览' },
  ] as const,
  cabin: [
    { src: '/images/subway-window/车厢-通道_副本.jpg', label: '车厢通道内屏幕', desc: '在途二次引导，缓和局部拥堵' },
    { src: '/images/subway-window/车门上-常态显示.jpg', label: '车门上 · 常态显示', desc: '进出站时车门上方信息常态' },
    { src: '/images/subway-window/车门上-基础设施.jpg', label: '车门上 · 基础设施', desc: '停站期间基础设施动态提示' },
  ] as const,
};

/* ============================================================
   四层架构数据
   ============================================================ */
const LAYERS = [
  { layer: '感知层', role: '系统的「眼睛」', desc: '车载摄像头、重量/红外传感器，实时捕捉车内拥挤度、环境状态、列车区间位置。', color: 'emerald' },
  { layer: '网络层', role: '系统的「神经」', desc: '车内无线自组网，保障各设备间大吞吐量、低延迟的双向稳定通信。', color: 'teal' },
  { layer: '中台层', role: '系统的「大脑」', desc: '「天枢」中台系统汇聚处理所有非结构化信息，协调各个子系统。', color: 'cyan' },
  { layer: '应用层', role: '系统的「执行者」', desc: '将 3 色拥挤度等精细化信息跨端投射到魔窗、4K 屏、站台屏。', color: 'emerald' },
];

/* ============================================================
   组件：视频播放器
   ============================================================ */
function formatTime(s: number): string {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function VideoPlayer({ video }: { video: typeof MEDIA.videos[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current || dragging) return;
    setCurrent(videoRef.current.currentTime);
  }, [dragging]);

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = ratio * duration;
    videoRef.current.currentTime = targetTime;
    setCurrent(targetTime);
  }, [duration]);

  return (
    <div className="relative group rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={video.src}
        className="w-full aspect-video object-cover"
        loop
        muted
        playsInline
        onEnded={() => { setPlaying(false); setCurrent(0); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      {/* 覆盖播放按钮 */}
      <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer">
        {!playing && (
          <div className="w-16 h-16 rounded-full bg-emerald-500/90 backdrop-blur flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 text-white ml-0.5" />
          </div>
        )}
      </button>
      {/* 暂停时显示暂停图标 */}
      {playing && (
        <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Pause className="w-5 h-5 text-white" />
          </div>
        </button>
      )}
      {/* 进度条 */}
      <div className="absolute bottom-[72px] left-3 right-3">
        {/* 时间 + 进度条 */}
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-[9px] font-mono shrink-0 w-9 text-right">{formatTime(current)}</span>
          <div
            className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group/progress relative overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="absolute left-0 top-0 h-full bg-emerald-400 rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>
          <span className="text-white/70 text-[9px] font-mono shrink-0 w-9">{formatTime(duration)}</span>
        </div>
      </div>
      {/* 底部标签 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
        <div className="text-white text-[11px] font-bold">{video.label}</div>
        <div className="text-white/60 text-[9px] mt-0.5">{video.desc}</div>
      </div>
    </div>
  );
}

/* ============================================================
   组件：图片卡片
   ============================================================ */
function ImageCard({ src, label, desc, onClick, aspect }: {
  src: string; label: string; desc: string; onClick?: () => void; aspect?: string;
  key?: string | number;
}) {
  return (
    <button onClick={onClick} className={`group relative rounded-xl overflow-hidden bg-zinc-100 text-left w-full cursor-pointer ${aspect || 'aspect-[4/3]'}`}>
      <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="text-white text-[10px] font-bold">{label}</div>
        <div className="text-white/60 text-[8px] mt-0.5">{desc}</div>
      </div>
    </button>
  );
}

/* ============================================================
   组件：灯箱
   ============================================================ */
function Lightbox({ items, index, onClose }: {
  items: readonly { src: string; label: string; desc: string }[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % items.length), [items.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors z-10 cursor-pointer">
        <X className="w-5 h-5 text-white" />
      </button>
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <img
          src={items[current].src}
          alt={items[current].label}
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
        />
        {items.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
        <div className="mt-3 text-center">
          <div className="text-white text-sm font-bold">{items[current].label}</div>
          <div className="text-white/50 text-xs mt-1">{items[current].desc}</div>
          <div className="text-white/30 text-[10px] mt-1">{current + 1} / {items.length}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   组件：轻量画廊（网格图片 + 灯箱）
   ============================================================ */
function Gallery({ items, cols }: { items: readonly { src: string; label: string; desc: string }[]; cols?: number }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const colClass = cols === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3';

  return (
    <>
      <div className={`grid ${colClass} gap-3`}>
        {items.map((img, i) => (
          <ImageCard key={i} src={img.src} label={img.label} desc={img.desc} onClick={() => setLightboxIdx(i)} />
        ))}
      </div>
      {lightboxIdx !== null && (
        <Lightbox items={items} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}

/* ============================================================
   主视图组件
   ============================================================ */
export function SubwayWindowDetailView({ project }: { project: Project }) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            SUBWAY MAGIC WINDOW v1.0 · 3D TWIN ON-BOARD COCKPIT
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">{project.title}</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          {project.subtitle}
        </p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {(project.chips || []).slice(0, 4).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 标签行 */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {(project.chips || []).map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {(project.metrics || []).map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 卡片一：系统产品架构与「多端联动分流」商业逻辑              */}
      {/* ============================================================ */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 text-zinc-900 px-5 py-3 flex items-center gap-2 border-b border-zinc-200">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 01 系统产品架构与「多端联动分流」商业逻辑</span>
        </div>
        <div className="p-5 space-y-4">
          {project.blueprintText && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
              <p className="text-[11px] text-emerald-600 leading-relaxed whitespace-pre-line">
                {project.blueprintText}
              </p>
            </div>
          )}

          {/* 四层架构 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {LAYERS.map(l => (
              <div key={l.layer} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
                <div className={`absolute -top-6 -right-6 w-16 h-16 bg-${l.color}-100 rounded-full blur-xl opacity-50`} />
                <div className={`text-[9px] font-mono font-bold text-${l.color}-600 mb-1`}>{l.layer}（{l.role}）</div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 卡片二：车载终端展示                                         */}
      {/* ============================================================ */}
      <div className="mt-8 space-y-4">
        <div className="border-b border-zinc-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 02 车载终端展示：「魔窗」动态报站与立体生态</span>
            <span className="text-[8px] text-zinc-400 font-mono">55" OLED 透明视窗</span>
          </div>
        </div>

        {/* 视频 Tab 切换 */}
        <div className="flex gap-2 mb-2">
          {MEDIA.videos.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setActiveVideoIdx(i)}
              className={`text-[10px] px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                i === activeVideoIdx
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <VideoPlayer video={MEDIA.videos[activeVideoIdx]} />

        {/* 截图画廊 */}
        <div className="mt-4">
          <div className="text-[9px] font-mono font-bold text-zinc-400 mb-3 uppercase tracking-wider">// 车站 3D 孪生渲染截图</div>
          <Gallery items={MEDIA.train} />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 卡片三：站台前哨引导                                         */}
      {/* ============================================================ */}
      <div className="mt-8 space-y-4">
        <div className="border-b border-zinc-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 03 站台前哨引导：屏蔽门上方屏幕（车地联动预先分流）</span>
            <span className="text-[8px] text-zinc-400 font-mono">车地联动 · 预先分流</span>
          </div>
        </div>

        {/* 北京站台三态对比 */}
        <div>
          <div className="text-[9px] font-mono font-bold text-zinc-400 mb-3 uppercase tracking-wider">// 北京站台屏 · 常态 / 封站 / 区间车三态切换</div>
          <Gallery items={MEDIA.station} cols={3} />
        </div>

        {/* 深圳屏蔽门 */}
        <div>
          <div className="text-[9px] font-mono font-bold text-zinc-400 mb-3 uppercase tracking-wider">// 深圳屏蔽门 · 车门上方引导屏</div>
          <Gallery items={MEDIA.shenzhen} cols={3} />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 卡片四：舱内动线舒缓                                         */}
      {/* ============================================================ */}
      <div className="mt-8 space-y-4">
        <div className="border-b border-zinc-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 04 舱内动线舒缓：车厢通道内屏幕（在途人流二次微调）</span>
            <span className="text-[8px] text-zinc-400 font-mono">在途二次引导</span>
          </div>
        </div>

        <Gallery items={MEDIA.cabin} cols={3} />
      </div>

      {/* 底部间距 */}
      <div className="h-12" />
    </>
  );
}
