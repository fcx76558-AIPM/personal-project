import React, { useState, useEffect } from 'react';
import {
  Radio, Thermometer, Gauge, AlertTriangle, Server,
  Monitor, Database, Shield, FileText, CheckCircle,
  TrendingUp, Map, Building, X, ZoomIn
} from 'lucide-react';
import { Project } from '../types';
import { projectDetailsData } from './ProjectDetailModal';

/** 案例图片展示（多案例多图 + 可放大） */
function DCIMCaseStudyImages() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  const cases = [
    {
      title: '雄安新区信息机房一体化管理平台',
      images: [
        { src: '/images/case-xiongan.png', desc: '大屏总览' }
      ]
    },
    {
      title: '260亩数据园区数字大脑',
      images: [
        { src: '/images/case-digital-brain.png', desc: '园区总览' }
      ]
    },
    {
      title: '数据中心管理驾驶舱',
      subtitle: '运维人员专用',
      images: [
        { src: '/images/case-cockpit.jpg', desc: '驾驶舱视图' }
      ]
    },
    {
      title: '机房BIM可视化',
      images: [
        { src: '/images/case-bim-1.jpg', desc: 'BIM模型 1' },
        { src: '/images/case-bim-2.jpg', desc: 'BIM模型 2' },
        { src: '/images/case-bim-3.jpg', desc: 'BIM模型 3' }
      ]
    },
    {
      title: '数据中心单层配电单线图',
      images: [
        { src: '/images/case-power-diagram.jpg', desc: '配电图' }
      ]
    }
  ];

  const openLightbox = (src: string, title: string) => {
    setLightboxImage(src);
    setLightboxTitle(title);
  };

  return (
    <>
      <div className="space-y-6">
        {cases.map((caseItem, caseIdx) => (
          <div key={caseIdx} className="space-y-2">
            {/* 案例标题 */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              <h4 className="text-xs font-bold text-zinc-800">{caseItem.title}</h4>
              {caseItem.subtitle && (
                <span className="text-[10px] text-zinc-400">· {caseItem.subtitle}</span>
              )}
              <span className="text-[9px] text-zinc-400 font-mono">({caseItem.images.length}图)</span>
            </div>

            {/* 图片网格 */}
            <div className={
              caseItem.images.length === 1
                ? 'grid grid-cols-1 gap-2'
                : caseItem.images.length === 2
                ? 'grid grid-cols-2 gap-2'
                : 'grid grid-cols-3 gap-2'
            }>
              {caseItem.images.map((img, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => openLightbox(img.src, caseItem.title)}
                  className="relative aspect-video bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden group cursor-pointer text-left hover:border-emerald-300 transition-colors"
                >
                  {/* 图片 */}
                  <img
                    src={img.src}
                    alt={img.desc}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* 悬浮层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[9px] font-medium text-white">{img.desc}</span>
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 图片放大 Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* 关闭按钮 */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 标题 */}
            <div className="absolute -top-10 left-0 text-sm font-bold text-white/90">
              {lightboxTitle}
            </div>

            {/* 大图 */}
            <img
              src={lightboxImage}
              alt="Case study"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

/** 沙盒 01: BIM 级多维空间与隐蔽管线可视化 */
function DCIMBIMSandbox() {
  const [showPipes, setShowPipes] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsRotating(prev => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTogglePipes = () => {
    setShowPipes(!showPipes);
    setShowHeatmap(false);
  };

  const handleToggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
    setShowPipes(false);
  };

  return (
    <div className="space-y-4">
      {/* 3D 机房画布模拟 */}
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 relative overflow-hidden min-h-[300px]">
        {/* 背景网格 */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-12 grid-rows-8 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-zinc-200" />
            ))}
          </div>
        </div>

        {/* 中央 3D 机房模型(CSS 3D 模拟) */}
        <div className={`relative z-10 flex items-center justify-center h-full transition-transform duration-1000 ${isRotating ? 'rotate-y-180' : ''}`}>
          <div className="relative perspective-1000">
            {/* 机房主体 */}
            <div className="relative w-64 h-40 bg-gradient-to-b from-white to-zinc-100 border border-zinc-300 rounded-lg shadow-lg">
              {/* 机柜行列 */}
              <div className="absolute inset-3 grid grid-cols-6 grid-rows-3 gap-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-zinc-200 border border-zinc-300 rounded-sm ${
                      showPipes ? 'animate-pulse' : ''
                    }`}
                    style={{
                      backgroundColor: showHeatmap
                        ? `hsl(${20 + Math.random() * 40}, 70%, ${60 + Math.random() * 30}%)`
                        : undefined
                    }}
                  />
                ))}
              </div>

              {/* 空调设备 */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-12 bg-emerald-100 border border-emerald-300 rounded" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-12 bg-emerald-100 border border-emerald-300 rounded" />

              {/* 通道 */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-zinc-200/50 border-l border-r border-zinc-300" />
            </div>

            {/* 管线可视化(透视隐蔽工程) */}
            {showPipes && (
              <div className="absolute inset-0 pointer-events-none">
                {/* 电力管线 - 红色流光 */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="powerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 50 Q 50 30, 100 50 T 200 50" stroke="url(#powerFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M 0 100 Q 50 80, 100 100 T 200 100" stroke="url(#powerFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                </svg>

                {/* 暖通管线 - 绿色流光 */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="hvacFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                      <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 0 Q 70 50, 50 100 T 50 200" stroke="url(#hvacFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M 150 0 Q 130 50, 150 100 T 150 200" stroke="url(#hvacFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                </svg>
              </div>
            )}

            {/* 温湿度热力云图 */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none">
                {/* 模拟热力粒子 */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full blur-sm animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'][Math.floor(Math.random() * 3)],
                      opacity: 0.5,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 信息浮层 */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3D BIM 数字孪生模型 · 实时渲染中</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-400">
            FPS: 60
          </div>
        </div>
      </div>

      {/* 交互按钮 */}
      <div className="flex gap-3">
        <button
          onClick={handleTogglePipes}
          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all duration-300 ${
            showPipes
              ? 'bg-red-50 text-red-600 border border-red-300 shadow-sm'
              : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Radio className="w-4 h-4" />
            {showPipes ? '隐藏隐蔽工程' : '透视隐蔽工程'}
          </div>
        </button>
        <button
          onClick={handleToggleHeatmap}
          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all duration-300 ${
            showHeatmap
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 shadow-sm'
              : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="w-4 h-4" />
            {showHeatmap ? '隐藏热力云图' : '查看温湿度云图'}
          </div>
        </button>
      </div>
    </div>
  );
}

/** 沙盒 02: 电力、制冷、空间"三轴"容量雷达与预警 */
function DCIMCapacitySandbox() {
  const [simulateLoad, setSimulateLoad] = useState(false);
  const [capacityData, setCapacityData] = useState({
    space: 65,    // 空间容量 %
    power: 58,    // 电力负荷 %
    cooling: 62,  // 制冷负载 %
  });
  const [alertLevel, setAlertLevel] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [highlightRack, setHighlightRack] = useState<number | null>(null);

  // 模拟高密度服务器上架
  const handleSimulateLoad = () => {
    setSimulateLoad(true);
    setHighlightRack(3); // 高亮第3排机柜

    // 逐步增加负载
    setTimeout(() => {
      setCapacityData(prev => ({ ...prev, space: 82 }));
    }, 500);

    setTimeout(() => {
      setCapacityData(prev => ({ ...prev, power: 78 }));
    }, 1000);

    setTimeout(() => {
      setCapacityData(prev => ({ ...prev, cooling: 85 }));
      setAlertLevel('warning');
    }, 1500);

    setTimeout(() => {
      setCapacityData({ space: 95, power: 92, cooling: 94 });
      setAlertLevel('critical');
    }, 2000);
  };

  const handleReset = () => {
    setSimulateLoad(false);
    setCapacityData({ space: 65, power: 58, cooling: 62 });
    setAlertLevel('normal');
    setHighlightRack(null);
  };

  // SVG 雷达图
  const renderRadarChart = () => {
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 80;

    // 计算三个轴的坐标
    const getPoint = (value: number, angle: number) => {
      const radius = (value / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle * Math.PI / 180);
      const y = centerY + radius * Math.sin(angle * Math.PI / 180);
      return `${x},${y}`;
    };

    const points = [
      getPoint(capacityData.space, -90),      // 上:空间
      getPoint(capacityData.power, 30),        // 右下:电力
      getPoint(capacityData.cooling, 150),     // 左下:制冷
    ].join(' ');

    const fillColor = alertLevel === 'critical'
      ? 'rgba(239, 68, 68, 0.2)'
      : alertLevel === 'warning'
      ? 'rgba(245, 158, 11, 0.2)'
      : 'rgba(16, 185, 129, 0.2)';

    const strokeColor = alertLevel === 'critical'
      ? '#ef4444'
      : alertLevel === 'warning'
      ? '#f59e0b'
      : '#10b981';

    return (
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
        {/* 背景网格 */}
        {[20, 40, 60, 80].map(radius => (
          <polygon
            key={radius}
            points={[
              getPoint(radius, -90),
              getPoint(radius, 30),
              getPoint(radius, 150),
            ].join(' ')}
            fill="none"
            stroke="#e4e7eb"
            strokeWidth="1"
          />
        ))}

        {/* 数据区域 */}
        <polygon
          points={points}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          className={alertLevel === 'critical' ? 'animate-pulse' : ''}
        />

        {/* 轴线 */}
        <line x1={centerX} y1={centerY} x2={parseFloat(getPoint(100, -90).split(',')[0])} y2={parseFloat(getPoint(100, -90).split(',')[1])} stroke="#d1d5db" strokeWidth="1" />
        <line x1={centerX} y1={centerY} x2={parseFloat(getPoint(100, 30).split(',')[0])} y2={parseFloat(getPoint(100, 30).split(',')[1])} stroke="#d1d5db" strokeWidth="1" />
        <line x1={centerX} y1={centerY} x2={parseFloat(getPoint(100, 150).split(',')[0])} y2={parseFloat(getPoint(100, 150).split(',')[1])} stroke="#d1d5db" strokeWidth="1" />

        {/* 标签 */}
        <text x={parseFloat(getPoint(110, -90).split(',')[0])} y={parseFloat(getPoint(110, -90).split(',')[1])} fill="#10b981" fontSize="10" fontWeight="bold">空间</text>
        <text x={parseFloat(getPoint(110, 30).split(',')[0])} y={parseFloat(getPoint(110, 30).split(',')[1])} fill="#10b981" fontSize="10" fontWeight="bold">电力</text>
        <text x={parseFloat(getPoint(110, 150).split(',')[0])} y={parseFloat(getPoint(110, 150).split(',')[1])} fill="#10b981" fontSize="10" fontWeight="bold">制冷</text>

        {/* 数值显示 */}
        <text x={centerX} y={centerY - 5} fill="#18181b" fontSize="12" fontWeight="bold" textAnchor="middle">{capacityData.space}%</text>
        <text x={centerX + 30} y={centerY + 20} fill="#18181b" fontSize="12" fontWeight="bold" textAnchor="middle">{capacityData.power}%</text>
        <text x={centerX - 30} y={centerY + 20} fill="#18181b" fontSize="12" fontWeight="bold" textAnchor="middle">{capacityData.cooling}%</text>
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧:容量雷达图 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
            三轴容量雷达 / CAPACITY RADAR
          </span>
        </div>

        {renderRadarChart()}

        {/* 预警信息 */}
        {alertLevel !== 'normal' && (
          <div className={`mt-4 p-3 rounded-xl border ${
            alertLevel === 'critical'
              ? 'bg-red-50 border-red-200 animate-pulse'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <AlertTriangle className={`w-4 h-4 ${alertLevel === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
              <span className={alertLevel === 'critical' ? 'text-red-600' : 'text-amber-600'}>
                {alertLevel === 'critical' ? '容量触顶预警!' : '容量接近阈值'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 右侧:机柜列头组态图 */}
      <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
            机柜列头组态 / RACK LAYOUT
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded-lg border-2 transition-all duration-300 ${
                highlightRack === i
                  ? 'bg-amber-100 border-amber-400 animate-pulse shadow-lg'
                  : i < 6
                  ? 'bg-white border-emerald-300'
                  : 'bg-zinc-100 border-zinc-300'
              }`}
            >
              <div className="p-1 text-[8px] font-mono text-zinc-500 text-center">
                R-{String(i + 1).padStart(3, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <button
          onClick={simulateLoad ? handleReset : handleSimulateLoad}
          className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
            simulateLoad
              ? 'bg-zinc-200 text-zinc-600 border border-zinc-300 hover:bg-zinc-300'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
          }`}
        >
          {simulateLoad ? '重置模拟' : '模拟高密度算力服务器上架'}
        </button>
      </div>
    </div>
  );
}

/** 卡片四:真实落地效益与政务合规价值 */
function DCIMValueCard() {
  return (
    <div className="space-y-4">
      {/* 政务合规板块 */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            政务合规 / GOVERNMENT COMPLIANCE
          </span>
        </div>

        <div className="space-y-3">
          {[
            { icon: Shield, title: '银监会及政府数字城市监管指引', desc: '符合银行业信息化监管要求和政府数字城市建设标准' },
            { icon: FileText, title: '操作日志 + 一键打包审计报告', desc: '完整记录所有操作行为,支持一键导出合规审计报告' },
            { icon: CheckCircle, title: '安全等保三级标准', desc: '通过国家信息安全等级保护三级认证,保障数据安全' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <item.icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-zinc-800 mb-1">{item.title}</div>
                <div className="text-[10px] text-zinc-500 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 商业复盘板块 */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            商业价值 / BUSINESS VALUE
          </span>
        </div>

        <div className="space-y-3">
          {[
            { icon: TrendingUp, title: '密集网点协同效率提升 65%', desc: '通过数字化运维平台,实现多网点统一管理和协同调度' },
            { icon: Map, title: '一张大屏统管全城"数字大脑"', desc: '构建城市级数据中心运营指挥中心,实时掌控全局状态' },
            { icon: Building, title: '260 亩智算园区全覆盖', desc: '支持超大规模智算园区的基础设施统一纳管和智能调度' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <item.icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-zinc-800 mb-1">{item.title}</div>
                <div className="text-[10px] text-zinc-500 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 真实案例图片展示 */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <Monitor className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            真实案例 / CASE STUDY
          </span>
        </div>

        <DCIMCaseStudyImages />
      </div>
    </div>
  );
}

/** DCIM 主视图组件 */
export function DCIMDetailView({ project }: { project: Project }) {
  const item = projectDetailsData['idc-twin'];

  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-200 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            DCIM SYSTEM v2.0 · DIGITAL TWINS PLATFORM
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">数据中心运维数据治理大屏（数字孪生）</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          采用 3D/BIM 数字孪生技术打造的工业级数据中心基础设施综合运管大屏，面向 260 亩智算园区、7 栋 30MW 规模互联网智算中心，实现集“监、管、控、维”于一体的数据驱动治理底座。
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">260亩智算园区</span>
          <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium">BIM级精度</span>
        </div>
      </div>

      {/* 区块1：标签行 */}
      <div className="py-5 border-b border-zinc-200 space-y-3 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {['3D/BIM 建模', 'Three.js/WebGL', '管线可视化', '千万级测点并发', '分布式边缘解析', '组态设计工具'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '业务连续性', value: '100%' },
            { label: '智算园区覆盖', value: '260 亩' },
            { label: '模型精度', value: 'BIM 级' },
            { label: 'Uptime M&O', value: '认证' },
            { label: '楼栋 PUE', value: '< 1.22' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 卡片一：系统架构 */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 text-zinc-900 px-5 py-3 flex items-center gap-2 border-b border-zinc-200">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 01 系统架构</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-zinc-600 mb-4">
            系统采用"现场设备分布式采集 -&gt; 边缘计算本地解析/断网续传 -&gt; 3D 组态与数据图表高联动渲染"的全纳管展现架构。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 展示层 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-800">展示层（数字大脑）</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                中央构建高精 3D 孪生大屏模型，两翼无缝映射 ECharts 高吞吐数据流，结合人机语音交互与资产 360° 控制台。
              </p>
            </div>
            
            {/* 数据处理层 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-zinc-800">数据处理层（DCIM 集群）</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                打通电力监控、能效管理、容量管理、安防、消防等 9 大弱电及机电孤立子系统，打破传统数据烟囱。
              </p>
            </div>
            
            {/* 监控采集层 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-100 rounded-full blur-xl opacity-50" />
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-zinc-800">监控采集层（硬件网关）</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                通过 4 路/8 路/16 路一体化数据采集器，秒级全量吞吐 RS485/TCP 变压器、UPS、温湿度、漏水、消防等测点时序数据。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片二：可交互沙盒 01 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 01 / BIM 级多维空间与隐蔽管线可视化</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <DCIMBIMSandbox />
        </div>
      </div>

      {/* 卡片三：可交互沙盒 02 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 沙盒 02 / 电力、制冷、空间"三轴"容量雷达与预警</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <DCIMCapacitySandbox />
        </div>
      </div>

      {/* 卡片四：真实落地效益与政务合规价值 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">// 卡片 03 / 真实落地效益与政务合规价值</span>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
          <DCIMValueCard />
        </div>
      </div>
    </>
  );
}
