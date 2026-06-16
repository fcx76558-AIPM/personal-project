import { Project } from '../types';
import { CATEGORIES } from '../data';
import {
  X, Server, Database, AlertCircle, ArrowRight, Layers, Workflow,
  Check, ClipboardList, HelpCircle, FileText, Target, Award, List, Sparkles,
  ChevronRight, ChevronDown, MessageSquare, Zap, Shield, Send,
  Smartphone, Monitor, Clock, AlertTriangle, Inbox, RefreshCw,
  Plug, Eye, CheckCircle2, Loader2, Bot, Activity, Edit2, ShieldAlert,
  Star, Lock, UserCheck,
  ArrowLeft, Mic, Volume2, Phone, Wifi, MapPin, Disc, PhoneCall, LogIn, Loader,
  Brain, BookOpen, Thermometer, Gauge, TrendingUp, TrendingDown, AlertOctagon,
  Cpu, BarChart3, Radio, Battery, Power, Fan, Settings, Play, Pause, User,
  Award as AwardIcon, Flame, Snowflake, Wind, Terminal, Search, Globe, ExternalLink, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import { DCIMDetailView } from './DCIMDetailView';
import { BuildingMonitorDetailView } from './BuildingMonitorDetailView';
import { SubwayWindowDetailView } from './SubwayWindowDetailView';
import { StationMonitorDetailView } from './StationMonitorDetailView';
import { IDCIoTDetailView } from './IDCIoTDetailView';
import { EMSDetailView } from './EMSDetailView';
import { DCIMPlatformDetailView } from './DCIMPlatformDetailView';
import { DCOMDetailView } from './DCOMDetailView';
import { HotelLinenDetailView } from './HotelLinenDetailView';
import { UnionPayDetailView } from './UnionPayDetailView';
import { SubwayPerceptionDetailView } from './SubwayPerceptionDetailView';
import { DMSDriverDetailView } from './DMSDriverDetailView';
import { PassengerAbnormalDetailView } from './PassengerAbnormalDetailView';
import AgriPlatformDetailView from './AgriPlatformDetailView';
import { MaaSAppDetailView } from './MaaSAppDetailView';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

interface ProjectDetailsItem {
  category: string;
  title: string;
  valueStatement: string;
  tags: string[];
  blocks: {
    bg: string;
    tech: string;
    role: string;
    highlights: string;
    metrics: string;
    links: string[];
  };
  recommendations: string[];
}

// ─── Data (keep existing entries for other projects) ────────────────────────

export const projectDetailsData: Record<string, ProjectDetailsItem> = {
  "rag-hotel": {
    category: "智能问答 / AGENT",
    title: "知宿 (InnoStay)",
    valueStatement: "基于 RAG 技术的酒店专属全生命周期 AI 助理系统",
    tags: ["RAG", "大模型", "企业微信集成", "向量数据库", "降本增效"],
    blocks: {
      bg: "针对酒店长尾咨询重复率高、新人培训周期长的痛点，导致夜间客诉严重、评价受损问题。",
      tech: "基于 DeepSeek V4 与 Qwen Embedding 进行向量化切片与检索对齐，打通企微与小程序端并实现无幻觉回答。",
      role: "0 到 1 负责产品整体规划、状态机定义、多模态文档解析评测集组织与技术协同，实现工单自动化流转。",
      highlights: "设计无感接管机制：当 AI 置信度低于阈值时，自动触发状态机流转，派单至前台人工接管，保障最终质量。",
      metrics: "新人系统培训流程压缩至 1 天，日常重复咨询工作量减少约 20%，客诉降低 95%。",
      links: ["查看 Notion PRD", "系统设计图", "服务效能报告"]
    },
    recommendations: ["idc-llm", "bidding-agent"]
  },
  "idc-llm": {
    category: "智能问答 / AGENT",
    title: "数据中心运维问答大模型",
    valueStatement: "封装 IDC 智能体矩阵，打造智能控温与故障诊断专家系统",
    tags: ["RAG", "大模型", "知识库", "故障诊断", "降本增效", "风险防控"],
    blocks: {
      bg: "IDC 机房一线故障排查响应时间长，由于传统监控和复杂架构叠加，资深专家经验难以结构化沉淀。",
      tech: "云天系统，集成分布式能效分析平台与大模型知识库，封装具备多轮问答评测能力的智能化运维 Agents 矩阵。",
      role: "主导大模型产品策略、算法对齐与业务闭环，协同暖通及运维团队，打通多角色、异构系统控制链路。",
      highlights: "首发包含『AI 故障诊断、PUE 优化大师』在内的 IDC 智能体（Agents）矩阵，实现多源时序数据分析判定。",
      metrics: "机房一线故障排查响应及新人培训考评周期缩短 40% 以上，降噪率提升 90% 以上。",
      links: ["系统架构", "算法对齐说明", "灾备应急预案"]
    },
    recommendations: ["rag-hotel", "bidding-agent"]
  },
  "bidding-agent": {
    category: "智能问答 / AGENT",
    title: "全网标讯与新开业酒店监测",
    valueStatement: "LLM Agent 自动化商商机引擎，实现非结构化文本的秒级精准商机转化",
    tags: ["AI爬虫", "大模型", "信息抽取", "CRM集成", "增收获客"],
    blocks: {
      bg: "多平台、高并发的非结构化招投标和新闻文本处理成本高、清洗效率极低，易导致高价值线索流失。",
      tech: "利用 Python 构建关键词频次阈值矩阵，级联 Gemini 2.5 Flash-Lite 与 DeepSeek-Chat V4 进行快速过滤提取。",
      role: "主导成本控制架构设计，亲自编写数据预处理逻辑，全权负责 Prompt 系统性调优与标准 JSON 字段定义。",
      highlights: "设计『本地规则 -> 轻量过滤 -> 深度提取』的三层级联过滤方案，在零 API 成本下丢弃超 80% 垃圾文本。",
      metrics: "全网线索无遗漏，主力大模型 API 算力成本整体降低 75% 以上，商机精准度达 99% 以上。",
      links: ["成本控制架构图", "Prompt定义范式", "CRM对接API"]
    },
    recommendations: ["rag-hotel", "idc-llm"]
  },
  "idc-twin": {
    category: "监控大屏 & 数字孪生",
    title: "数据中心运维数据治理大屏（数字孪生）",
    valueStatement: "智算中心园区软硬一体化部署，构建数字化能耗、资产与空间矩阵",
    tags: ["数字孪生", "Three.js", "BIM", "管线可视化", "实时监控", "数据驱动决策"],
    blocks: {
      bg: "大型智算中心空间、资产与能耗数据孤立，缺乏直观的工业级全局管控底座，管理层难以极速感知整体能热态势。",
      tech: "基于 Three.js 与 BIM 技术搭建 3D 数字孪生治理平台，应用 Draco 网格压缩实现千萬级传感器测点实时高并发流展现。",
      role: "全面主导并定义大屏数智化运营系统的体验语言，引入温场热岛 Kriging 动态差色差值算法，打破子系统孤立状态。",
      highlights: "围绕『楼宇能耗、设备资产、空间与人』构建数字化功能矩阵，设计时序与空间双向对比条形图展现实时温场。",
      metrics: "全面保障某 260 亩智算中心园区业务连续性达 100%，系统通过 Uptime M&O 国际认证，跑满 60FPS。",
      links: ["3D演示视频", "交互规范文档", "Kriging Shader源码"]
    },
    recommendations: ["building-monitor", "station-platform"]
  },
  "building-monitor": {
    category: "监控大屏 & 数字孪生",
    title: "智慧楼宇监控大屏",
    valueStatement: "升级传统物业大屏为高附加值园区生态数字驾驶舱",
    tags: ["数字孪生", "能耗分析", "人员定位", "工位利用率", "数据驱动决策", "降本增效"],
    blocks: {
      bg: "传统楼宇运营粗放，工位与会议室闲置率高，空间能源浪费严重且设备故障无法实时精确定位和反控。",
      tech: "引入时序与空间双向对比算法，融合非侵入式（NILM）电谐波诊断特征，深度绑定物联网运管平台与低代码工单流引擎。",
      role: "负责前沿视觉呈现效果定义与数字孪生交互语言规划，跑通物理反调与设备效率最大化业务闭环。",
      highlights: "引入工位与会议室利用率波动分析，将实时空间能耗与设备资产健康度全流程透视并进行出水温差调控。",
      metrics: "大幅降低办公室闲置率，通过精准排查定位空间能源浪费，资产效率达到最大化，能效降 18.2%。",
      links: ["指标设计白皮书", "BACnet底层对接文档", "楼宇ESG盘账包"]
    },
    recommendations: ["idc-twin", "subway-window"]
  },
  "station-platform": {
    category: "监控大屏 & 数字孪生",
    title: "车站运营监控平台（大屏部分）",
    valueStatement: "多维环境指标时序沉淀，打破空间孤立，定义动态数字孪生交互语言",
    tags: ["数字孪生", "设备状态可视化", "环境监测", "故障定位", "风险防控", "降本增效"],
    blocks: {
      bg: "地铁车站运营缺乏全场景跨时空信息触达，子系统状态孤立，潮汐大客流极易造成月台和出入口严重拥堵隐患。",
      tech: "对接边缘端自动化感知计算，搭建轻量级 2.5D SVG 拓扑网络，将多维环境指标进行时序沉淀并推送到车站引导屏。",
      role: "负责车站大屏精准引导交互与跨时空数据流转逻辑的全面主导，配置 JVM 级测点合并（Debounce）确保不卡顿。",
      highlights: "定义『手机端预唤醒 — 车站大屏精准引导 — 车载 55 寸 OLED 魔窗提醒』的跨端联动机制及故障一键漂移监控。",
      metrics: "高效引导乘客分散候车，显著削减高峰期月台滞留时间，整体能效与大客流出行秩序显著提效 15.5%。",
      links: ["跨端数据流转图", "SVG绘图规范", "时序缓存限流配置"]
    },
    recommendations: ["idc-twin", "subway-window"]
  },
  "subway-window": {
    category: "监控大屏 & 数字孪生",
    title: "地铁'魔窗'导乘项目",
    valueStatement: "首创车地联动 3D 视觉导乘体验，完成一线城市核心线路软硬一体化部署",
    tags: ["边缘计算", "3D孪生", "多模态感知", "车地联动", "乘客体验", "产业生态闭环"],
    blocks: {
      bg: "传统地铁车载导乘设备画面单一，信息维度低，且地铁高速颠簸多尘、车室内逆温逆光，抗干扰度低。",
      tech: "基于 55 寸 OLED 屏及 4K 高清透明屏，利用 Pixi.js 重构 WebGL 自适应透明发色并打通地标自感纠偏补偿。",
      role: "主导车载 3D 孪生屏体验定义与全周期管理，引入温度安全保护自检测制（Thermal Throttle），延长屏幕寿命。",
      highlights: "首创透明玻璃车窗 3D 浮雕轨迹呈现，同时在 APP 端与车载魔窗同步推出即将来车车厢『红黄蓝』三色拥挤度。",
      metrics: "完成北上深一线城市核心线路的软硬一体化部署，到站物理定位分毫不差，车载 3D 帧率保持 55+ 优秀水平。",
      links: ["魔窗实拍视频", "OLED物理白皮书", "TCMS接口总线文档"]
    },
    recommendations: ["idc-twin", "station-monitor"]
  },
  "idc-iot": {
    category: "IoT设备管理 & 动环监控",
    title: "工业级数据中心基础设施动环监控平台",
    valueStatement: "工业级基础设施综合管理底座，承载千万级传感器测点实时并发流",
    tags: ["IoT", "Modbus/SNMP", "实时告警", "故障根因分析", "风险防控", "降本增效"],
    blocks: {
      bg: "数据中心配电空调各种非标协议极其混杂，上报数据呈海量高并发状态，值班人员极易由于冗余警告产生疲劳。",
      tech: "基于 Modbus/SNMP 自研设备物模型，定义『秒级判断+4级阈值去重』死区去噪及告警压缩，接入高性能 Kafka 队列。",
      role: "负责物联网一体化运管平台规划，设计南向网关热插拔适配规范，确保控制指令在 2s 内反控回下风机温控动作。",
      highlights: "跑通『异常告警 — 事件总线触发 — 自动派工单 — 移动巡检 — 线上闭环』全链路工业级底座闭环。",
      metrics: "成功降低运维人员空震与噪音疲劳 70% 以上，支撑千万级传感器测点的高并发高吞吐传输。",
      links: ["协议映射表说明", "南向控制器开发包", "Kafka限流方案"]
    },
    recommendations: ["dcim-base", "ems-system"]
  },
  "dcim-base": {
    category: "IoT设备管理 & 动环监控",
    title: "DCIM（数据中心基础设施管理）",
    valueStatement: "集'监、管、控、维'于一体的基础设施运管平台",
    tags: ["容量管理", "能效分析", "资产管理", "报表", "数据驱动决策", "降本增效"],
    blocks: {
      bg: "动环系统无法跟运维流程有机整合，传统运维处于割裂状态，资产 CMDB、电力容量与工单多有账实错漏。",
      tech: "基于无向图和 FMS Event Bus 故障溯源，设计机房温度、承重、配电空间三色容量沙盘评估及资产字典系统。",
      role: "产品线全生命周期管理，全面设计配线台账一站式自感更新与 2s 极速派发流程关联机制。",
      highlights: "打通异常告警、资产网络与自动工单派发链路，实现系统从异常判定到值班 PDA 接收工单耗时不超过 2s。",
      metrics: "核心故障平均修复时间（MTTR）缩短 45%，资产台账正确率在大型试点实现账实 100% 合一。",
      links: ["DCIM产品方案", "CMDB数据模型说明", "自动化派单日志分析"]
    },
    recommendations: ["idc-iot", "ems-system"]
  },
  "ems-system": {
    category: "IoT设备管理 & 动环监控",
    title: "EMS能源管理系统",
    valueStatement: "搭建 TB 级分布式能效分析平台，打通能效调优与黑灯节能闭环",
    tags: ["能源采集", "PUE优化", "碳排放管理", "基线预警", "节能调优", "降本增效", "风险防控"],
    blocks: {
      bg: "大型绿色园区能耗高昂、电表游离、交叉对账全靠手工拉超大 Excel 分析，且缺乏对空调制冷预测的调优模型。",
      tech: "构建时序 Clickhouse 大规模汇总计算结构，配合 Prophet 机器学习框架进行外部气象和暖通能效精准建模预测。",
      role: "主导 AI 驱动的暖通能效预测产品策略与决策，建立灰度评估体系与阶段用耗能表达式规则引擎。",
      highlights: "通过追踪暖通冷量参数与实时负荷，成功打通明日储能/PUE 调优计算，并自动导出 ISO50001 合规审计包。",
      metrics: "能效汇总分析时间降低 95%，对暖通负荷预测偏离低于 5.2%，成功实现楼栋 PUE 极限优化降耗目的。",
      links: ["PUE优化算法白皮书", "ISO审计说明书", "Prophet预测代码模型"]
    },
    recommendations: ["idc-iot", "dcim-base"]
  },
  "hotel-linen": {
    category: "SaaS管理平台 & 工单系统",
    title: "酒店布草全生命周期管理SaaS",
    valueStatement: "打造'出厂级 RFID 硬件 + AI 分析决策 + SaaS 运营'的一体化管理系统",
    tags: ["RFID硬件集成", "全生命周期", "库存管理", "品质追溯", "降本增效", "风险防控"],
    blocks: {
      bg: "连锁酒店布草物资交接容易错漏、水洗损耗难以把控，布草加工厂和酒店容易因为破损丢失账期财务扯皮纠纷。",
      tech: "整合出厂级 RFID 硬件的多标签高密集通道算法，构建结合水洗特征的水洗寿命折旧特征预测及分期账单自动计算。",
      role: "主导 RFID 通道交互协议控制与物资流转 Handshake 机制产品定义，跑通跨店动态资产划拨、分账业财一体化闭环。",
      highlights: "一千件被服两秒内利用多标签扫描盘存完毕，读取通过率高，并将历史消耗与物资补货一键关联，输出交易结算账单。",
      metrics: "通过率高达 99.98%，跨店物资盘点流失错账率直接降低 95%，提高大客户粘性壁垒。",
      links: ["RFID硬件协议文档", "水洗寿命算法函数", "多租户发票与结算系统"]
    },
    recommendations: ["idc-dcom", "subway-settle"]
  },
  "idc-dcom": {
    category: "SaaS管理平台 & 工单系统",
    title: "数据中心DCOM（工单/巡检/维保）",
    valueStatement: "构建基于 ITIL 架构的低代码工单流引擎",
    tags: ["ITIL", "工单系统", "巡检计划", "知识库", "降本增效", "数据驱动决策"],
    blocks: {
      bg: "传统数据中心协办流程呆板、不可视，协作链路长卡点多，跨地域售后的巡检维保无法支持高时限越级流管。",
      tech: "基于标准 ITIL 模型自研 DAG 流程可视化拓扑引擎，生成高度自定义、轻量的 JSON 表单和 SLA 阶梯超时自动越级推送。",
      role: "全面主导 DCOM 系统状态机逻辑设计，规划工单并发会签与越限 SLA Redis 延迟流监听器引擎机制。",
      highlights: "打通过滤后的动环报警实时启动巡检任务的链路，支持特许任务跨多省会签与现场人员 PDA 定位匹配。",
      metrics: "工单平均搁置搁误率下降 35% 以上，跨越式杜绝超时搁置挂账，提升人员排班调度合理度。",
      links: ["DSL Canvas拖拽规范", "ITIL合规资产维保文档", "SLA超时越级队列部署"]
    },
    recommendations: ["hotel-linen", "subway-settle"]
  },
  "subway-settle": {
    category: "SaaS管理平台 & 工单系统",
    title: "呼和浩特银联前置系统（对账管理）",
    valueStatement: "负责高并发金融级清分对账与信用垫资风控的底层核心前置系统设计",
    tags: ["支付清分", "对账引擎", "风控黑名单", "RBAC", "风险防控", "增收获客"],
    blocks: {
      bg: "地铁行车及清分交易结算系统面对超大并发时极其容易产生账目精度误差、单边账溢漏，给『先乘后付』信用垫资带来资金敞口。",
      tech: "精确映射 O-D 线路轨迹包，构建基于高精度 BigDecimal 三角勾兑与错账轧差流式滑动时间窗口自挂接平账算法。",
      role: "负责底层前置对账系统核心财务流和风控拦截机制设计，引入极精细 RBAC 安全控制。",
      highlights: "针对地铁单边欠账，构建了自动重拨与对账期追溯拉长至 90 天机制，自研自动黑名单秒级追缴风控功能。",
      metrics: "账目清分正确度达到金融级保障，全路网乘车风控拦截与坏账漏损率减少 1005%。",
      links: ["清分对账引擎设计", "BigDecimal高精度算法说明", "先乘后付金融拦截规范"]
    },
    recommendations: ["hotel-linen", "idc-dcom"]
  },
  "subway-perception": {
    category: "AI识别 & 边缘计算",
    title: "地铁综合感知系统（AI大脑+多端联动）",
    valueStatement: "高危异常行为秒级抓取并自动调取高清视频片段，杜绝『警报疲劳』",
    tags: ["边缘计算", "计算机视觉", "行为识别", "事件联动", "风险防控", "降本增效"],
    blocks: {
      bg: "地铁扶梯异常行为（逆行摔倒）及卧车台高危情况如果仅靠人眼巡视，反映迟滞，极易酿成本质安全风险客伤事故。",
      tech: "集成高性能 DeepStream 图像处理器并对 YOLO 模型做裁剪，将边缘端多视频切片推理控制在极低延迟范围内。",
      role: "主导设计 9 大类特定客伤行为判定策略、边缘硬件 Jetson 选型、车控室一键 SOP 应急弹屏下发系统。",
      highlights: "高危异常行为秒级抓取响应，预缓冲截取报警前 5s 视频，自动推送该段高清视频供车控室秒级核实，消除空警疲劳。",
      metrics: "边缘计算判定至司机前哨确认需 3s，突发异常报警交互 SOP 全链路控制在 8s 黄金极速响应。",
      links: ["AI大脑联动架构", "DeepStream视频容器规范", "轨道交通突发客伤应急处置"]
    },
    recommendations: ["dms-driver", "passenger-anomaly"]
  },
  "dms-driver": {
    category: "AI识别 & 边缘计算",
    title: "DMS司机疲劳监测",
    valueStatement: "基于人脸关键点与边缘推理的司机疲劳/分心行为高精准前哨初筛",
    tags: ["人脸关键点", "疲劳检测", "分心行为识别", "边缘推理", "风险防控"],
    blocks: {
      bg: "城轨/地铁司机室常由于长期作业引入疲劳及操作分心，必须依靠可靠、实时的机载前哨监测装置，防万错一。",
      tech: "利用轻量 YOLO-DMS 人脸特征和闭眼/大哈欠周期判别，融合边缘推理与防抖逻辑，抗衡灰尘和抖动环境干扰。",
      role: "负责边缘判定及现场二次除噪去伪逻辑定义，打通局域网 RTSP 画面向高级 WebRTC 超低延时网页投流的开发协同。",
      highlights: "端侧高频采集，遇公网断连时启动 500G 离线环形物理缓存锁存，不间断监控，网络恢复后自感异步上送云端。",
      metrics: "端侧边缘抓取计算延时小于 50ms，平均带宽降 92% 以上，保障司机长途驾驶生命线安全可靠。",
      links: ["Jetson DMS软件配置", "防抖图像权重标定", "WebRTC超低延迟流引擎说明"]
    },
    recommendations: ["subway-perception", "passenger-anomaly"]
  },
  "passenger-anomaly": {
    category: "AI识别 & 边缘计算",
    title: "乘客异常行为识别（倒地/打架等）",
    valueStatement: "AI 边缘判定至司机前哨确认，高危行为秒级抓取，有效杜绝调度警报疲劳",
    tags: ["计算机视觉", "实时检测", "应急处置", "风险防控"],
    blocks: {
      bg: "长途高速重载列车、密闭隧道区间内发生的打斗抢劫、晕倒无人知晓是轨道交通安检和紧急施救极大的管理盲点。",
      tech: "基于国产 RK3588 车载硬核工控机，利用 YOLOv8-Nano 配合姿态 ST-GCN 算法进行车厢倒地肢体关键点轻量量化加速。",
      role: "主导车载异常状态机流转需求订立，规划 AI 二次过滤、本地报警不跳闸整车电路的安全设计以及装配抗震测试。",
      highlights: "首创热部署 AI 安控网，将盒子功耗限制在 15W 以下，同时检测到冲突倒地时立即在司机面板进行弹框提供推荐处置流。",
      metrics: "实现车载边缘判定秒级高危抓取，对晕厥倒地识别准确度高，荣获中国软件工程合规大奖。",
      links: ["RK3588车规盒子物理参数", "ONNX推理及模型导出配置", "姿态关键点检测算法分析"]
    },
    recommendations: ["subway-perception", "dms-driver"]
  },
  "agri-platform": {
    category: "产业互联网平台 / B2B/B2C",
    title: "农产品B2B/B2C平台（农技/内容/农资/合作社）",
    valueStatement: "从 0 到 1 规划农业服务一体化小程序，全面赋能 B 端合作社",
    tags: ["全栈", "O2O", "知识付费", "地图服务", "RBAC", "增收获客", "产业生态闭环"],
    blocks: {
      bg: "各农业合作社和末端种植农户，缺乏专业即时病害断诊通道，且在买肥配车物流中由于多级分销存在严重渠道高费率克扣。",
      tech: "基于 LBS 地理位置定位技术配合 O2O 货运配载，应用 Taro 高效构建跨三方阵营角色跨端共享平台。",
      role: "0-1 全权负责华北农服小程序的方案规划、界面原型、跨层分账财务计算及症状智能筛选方案编写。",
      highlights: "推出『症状专家智判选择 + 微信定向付费诊治 + 首推病叶 AI 大模比对』，让低学历农户一键上传害虫图获取农资撮合。",
      metrics: "打通农资供应链扁平交易，错差清账账实 100% 轧平，提升农户病死损作物成活效率达 25%。",
      links: ["Taro跨端UI原型图", "多角色分账与资金划拨规范", "智能病叶库LBS定位图"]
    },
    recommendations: ["maas-app"]
  },
  "maas-app": {
    category: "产业互联网平台 / B2B/B2C",
    title: "智慧出行APP（地铁扫码/导航/便民）",
    valueStatement: "主导 MaaS 移动端一体化出行架构设计，引入多源数据融合算法",
    tags: ["移动端", "扫码支付", "站内导航", "实时动态", "增收获客", "产业生态闭环"],
    blocks: {
      bg: "超大千万旅客规模的交通系统缺少一站式跨工具结算渠道，在火车站、地铁接驳时无法极速给到最优的多源车厢拥堵推荐。",
      tech: "整合 TCMS 空气弹簧轴重传感器与公交、地铁扫码网关，使用 React Native 搭载大客流瞬间高并发抗冲高防网络架构。",
      role: "主导一站式 MaaS 出行用户交互规范拟定、路径高阶多端数据融合以及碳积分商城生态产品定义。",
      highlights: "在手机客户端首发将即将来车拥挤度进行『红黄蓝』三色拟真热力图形态展示，实现多端数据秒级无感同步。",
      metrics: "扫码进站响应 < 0.2秒，核心对账流匹配 100% 准确入账，千万级高并发稳性 99.99%，恶意逃票灰产拦截提升 4x",
      links: ["MaaS出行架构设计", "金融级对账引擎", "三色热力图交互设计"]
    },
    recommendations: ["agri-platform"]
  },
  "yuntian-pues": {
    category: "智算中心 / 能效优化",
    title: "Yuntian PUE 能效优化大屏",
    valueStatement: "面向智算中心的 AI 驱动 PUE 能效优化与碳排管理平台",
    tags: ["PUE优化", "AI节能", "碳排管理", "智算中心", "实时监控", "数据可视化"],
    blocks: {
      bg: "智算中心能耗占比持续攀升，PUE优化成为数据中心核心竞争力指标。传统PUE计算依赖人工经验，无法适应动态负载变化。",
      tech: "AI节能策略引擎 + 实时PUE计算 + 碳排可视化看板，基于 LSTM 时序预测模型动态调整制冷参数。",
      role: "主导 AI 节能策略引擎设计与 PUE 可视化大屏实现",
      highlights: "引入 AI 策略引擎后，PUE 从 1.35 降至 1.22，年节电 120 万度，相当于减少碳排放 800 吨/年。",
      metrics: "PUE 从 1.35 降至 1.22，节能效果达 9.6%，年节电 120 万度，减少碳排 800 吨/年。",
      links: ["PUE计算模型", "AI节能算法", "碳排核算方法"]
    },
    recommendations: ["idc-twin"]
  },
};

const DEFAULT_DETAIL: ProjectDetailsItem = {
  category: "垂直产品赛道",
  title: "自研高价值数字化方案",
  valueStatement: "工业/企业级全生命周期数智化调控与效能闭环保障",
  tags: ["工业互联", "数智赋能", "全栈架构", "风险防控", "降本增效"],
  blocks: {
    bg: "工业/企业级全生命周期数智化调控与效能闭环保障",
    tech: "工业互联、数智赋能、全栈架构、风险防控",
    role: "全栈设计与架构把控",
    highlights: "端到端解决方案",
    metrics: "持续迭代优化",
    links: []
  },
  recommendations: []
};

// ─── RAG Hotel Full Detail View ──────────────────────────────────────────────

function RAGHotelDetailView({ project }: { project: Project }) {
  const item = projectDetailsData['rag-hotel'];

  const lifecycleStages = [
    {
      label: '入住前',
      sublabel: '公域外挂',
      color: 'blue',
      nodes: [
        { icon: '\u2753', text: 'OTA提问' },
        { icon: '\u{1F517}', text: 'Webhook' },
        { icon: '\u{1F4DA}', text: 'RAG售前知识库' },
        { icon: '\u{1F4E8}', text: '流式回传' },
      ],
    },
    {
      label: '入住中',
      sublabel: '私域管家',
      color: 'emerald',
      nodes: [
        { icon: '\u{1F4F1}', text: '扫一房一码' },
        { icon: '\u{1F513}', text: 'Session激活' },
        { icon: '\u{1F3AF}', text: 'Action-Agent槽位填充' },
      ],
    },
    {
      label: '离店后',
      sublabel: '声誉控制',
      color: 'amber',
      nodes: [
        { icon: '\u{1F30A}', text: 'OTA评价流' },
        { icon: '\u{1F4AC}', text: 'Aspect情感拆解' },
        { icon: '\u2705', text: '好评发布/差评防火墙工单' },
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-50 border-blue-200',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
  };

  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-100 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            INNOSTAY SYSTEM v2.6 \u00b7 RAG INTELLIGENT FRONT DESK
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 leading-none">
          知宻f <span className="text-emerald-600">(InnoStay)</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-xl">
          基于 RAG 技术的酒店专属全生命周期 AI 助理系统，深度集成 PMS 业务接口与内部 SOP 知识库，
          智能过滤并分流常见高频客诉请求，降低夜间前台值班人力负荷。
        </p>
      </div>

      {/* 区块1：标签行 */}
      <div className="py-5 border-b border-zinc-100 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {['RAG 架构', 'LLM 意图解析', '向量数据库', 'SSE 流式内核', 'WebSocket 长连接', 'RPA/DOM 注入'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '客诉自动解决率', value: '45.0%' },
            { label: '知识召回率', value: '93.4%' },
            { label: '客诉响应', value: '1.2 秒' },
            { label: '夜间人工降本', value: '60.0%' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 区块2：系统架构卡片 */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block pl-0.5">
          // SYSTEM ARCHITECTURE / 系统架构
        </span>

        <div className="bg-[#0A0A0C] rounded-2xl p-4 border border-zinc-800">
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-600 mb-3">
            CORE ARCHITECTURE MENTAL MODEL / 核心架构心智
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {['意图分类', '动态路由', '结构化输出 / 异步动作'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                  <span className="text-[11px] font-bold font-mono text-emerald-400">{step}</span>
                </div>
                {i < 2 && <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lifecycleStages.map((stage, si) => (
            <div key={si} className={`rounded-2xl border p-4 ${colorMap[stage.color]}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-5 w-5 rounded-lg bg-${stage.color}-100 border border-${stage.color}-200 flex items-center justify-center`}>
                  <span className="text-[10px] font-bold text-xs">{si + 1}</span>
                </div>
                <div>
                  <div className="text-[11px] font-black text-zinc-900">{stage.label}</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{stage.sublabel}</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {stage.nodes.map((node, ni) => (
                  <div key={ni} className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                    <span className="text-[11px]">{node.icon}</span>
                    <span className="text-[10px] font-mono font-bold text-zinc-700">{node.text}</span>
                    {ni < stage.nodes.length - 1 && (
                      <div className="ml-auto">
                        <ChevronRight className="h-3 w-3 text-zinc-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 区块3：沙盒 01 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // SANDBOX 01 / RAG 智能问答测试沙盒
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <RAGSandbox />
        </div>
      </div>

      {/* 区块4：沙盒 02 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // SANDBOX 02 / Action-Agent 智能工单调度与人机协同
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <ActionAgentSandbox />
        </div>
      </div>

      {/* 区块5：沙盒 03 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
            // SANDBOX 03 / OTA 浏览器插件兜底 (Copilot 模式)
          </span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <OTACopilotSandbox />
        </div>
      </div>
    </>
  );
}


// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ProjectDetailModal({ project, isOpen, onClose, onSelectProject }: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  const category = CATEGORIES.find(c => c.projects.some(p => p.id === project.id));
  const categoryName = category ? category.name : "垂直产品赛道";
  const item = projectDetailsData[project.id] || DEFAULT_DETAIL;
  const isRAGHotel = project.id === 'rag-hotel';
  const isYuntian = project.id === 'idc-llm';
  const isDCIMPlatform = project.id === 'dcim-platform';
  const isDCOM = project.id === 'idc-dcom';
  const isHotelLinen = project.id === 'hotel-linen';
  const isDCIM = project.id === 'idc-twin';
  const isEMS = project.id === 'ems-system';
  const isBuildingMonitor = project.id === 'building-monitor';
  const isSubwayWindow = project.id === 'subway-window';
  const isStationMonitor = project.id === 'station-monitor';
  const isIDCIoT = project.id === 'idc-iot';
  const isBidding = project.id === 'bidding-agent';
  const isUnionPay = project.id === 'hohhot-unionpay';
  const isSubwayPerception = project.id === 'subway-perception';
  const isDMSDriver = project.id === 'dms-driver';
  const isPassengerAbnormal = project.id === 'passenger-abnormal';
  const isMaaSApp = project.id === 'maas-app';
  const isAgriPlatform = project.id === 'agri-platform';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 cursor-pointer"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-50 h-screen w-full sm:max-w-3xl md:max-w-[44rem] lg:max-w-[48rem] bg-white text-zinc-950 shadow-2xl flex flex-col outline-none"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 md:left-8 z-50 w-12 h-12 rounded-full border border-zinc-250 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 font-bold shadow-xs hover:shadow-md cursor-pointer transition-all hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-6 md:px-8 pb-10">
          {isBidding ? (
            <BiddingDetailView project={project} />
          ) : isRAGHotel ? (
            <RAGHotelDetailView project={project} />
          ) : isYuntian ? (
            <YuntianDetailView project={project} />
          ) : isSubwayWindow ? (
            <SubwayWindowDetailView project={project} />
          ) : isIDCIoT ? (
            <IDCIoTDetailView project={project} />
          ) : isStationMonitor ? (
            <StationMonitorDetailView project={project} />
          ) : isBuildingMonitor ? (
            <BuildingMonitorDetailView project={project} />
          ) : isHotelLinen ? (
            <HotelLinenDetailView project={project} />
          ) : isEMS ? (
            <EMSDetailView project={project} />
          ) : isDCIM ? (
            <DCIMDetailView project={project} />
          ) : isDCOM ? (
            <DCOMDetailView project={project} />
          ) : isDCIMPlatform ? (
            <DCIMPlatformDetailView project={project} />
          ) : isSubwayPerception ? (
            <SubwayPerceptionDetailView project={project} />
          ) : isDMSDriver ? (
            <DMSDriverDetailView project={project} />
          ) : isPassengerAbnormal ? (
            <PassengerAbnormalDetailView project={project} />
          ) : isMaaSApp ? (
            <MaaSAppDetailView project={project} />
          ) : isAgriPlatform ? (
            <AgriPlatformDetailView project={project} />
          ) : isUnionPay ? (
            <UnionPayDetailView project={project} />
          ) : (
            <OriginalDetailView
              project={project}
              item={item}
              categoryName={categoryName}
              onClose={onClose}
            />
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-zinc-100 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4">
          <p className="text-[10px] font-mono text-zinc-400">
            INNOSTAY SYSTEM \u00b7 PORTFOLIO
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-xl bg-[#0A0A0C] px-5 py-2.5 font-sans text-xs font-bold text-white hover:bg-zinc-800 transition active:scale-98 cursor-pointer shadow-xs"
          >
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>返回工作台</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
/** Sandbox 01: RAG 智能问答测试沙盒 */
function RAGSandbox() {

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [displayedText, setDisplayedText] = useState('');
  const [highlightedChunk, setHighlightedChunk] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('明天退房后能帮我寄放行李吗？');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const FINAL_ANSWER = '您好！根据我们的行李寄存服务规定，退房当天您可以在前台免费寄存行李，最长可存放至当日18:00。如需更长时间的寄存服务，建议您联系前台或礼宾部安排付费寄存。感谢您的咨询，祝您旅途愉快！';

  const resetSandbox = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStep(0);
    setDisplayText('');
    setHighlightedChunk(null);
    setReplyText('');
    setIsEditing(false);
  };

  const setDisplayText = (t: string) => setDisplayedText(t);

  const handleSend = useCallback((prompt: string) => {
    resetSandbox();
    setStep(1);
    setSelectedPrompt(prompt);
    setHighlightedChunk(null);
    setDisplayText('');
    setReplyText('');

    // Simulate TTFB ~1.5s
    timerRef.current = setTimeout(() => {
      setHighlightedChunk('关于行李寄存服务：退房当天可于前台免费寄存行李至当日18:00，超时需付费。');


      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < FINAL_ANSWER.length) {
          setDisplayText(FINAL_ANSWER.slice(0, i + 1));
          i++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setStep(2);
          setReplyText(FINAL_ANSWER);
        }
      }, 40);
    }, 1500);
  }, []);

  const handleRegenerate = () => {
    if (step !== 2) return;
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      const alt = '非常感谢您的咨询！关于行李寄存服务，我们提供以下方案：① 免费寄存：退房当天可于前台免费寄存至18:00；② 付费寄存：如需更长时间，请联系礼宾部安排。寄存期间请妥善保管贵重物品。如有其他需求，欢迎随时致电前台！祝您旅途愉快！';
      setReplyText(alt);
      setDisplayText(alt);
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  const chunks = [
    { id: 1, category: '餐饮服务', text: '早餐供应时间为 07:00-10:00，自助餐厅位于 2 楼西侧。', highlight: false },
    { id: 2, category: '客房服务', text: '关于行李寄存服务：退房当天可于前台免费寄存行李至当日18:00，超时需付费。', highlight: highlightedChunk === '关于行李寄存服务：退房当天可于前台免费寄存行李至当日18:00，超时需付费。' },
    { id: 3, category: '通用类目', text: '退房时间为次日 12:00 前，超时费用详见前台价格牌。', highlight: false },
    { id: 4, category: '客房服务', text: '迷你吧消费将在退房时统一结算，请保持物品完好。', highlight: false },
  ];

  const shortcutPrompts = [
    { id: 'luggage', text: '明天退房后能帮我寄放行李吗？', highlight: true },
    { id: 'checkout', text: '请问酒店的最晚退房时间是几点？', highlight: false },
    { id: 'ac', text: '客房空调不够冷，需要工程人员报修一下', highlight: false },
  ];

  return (
    <div className="space-y-3">
      {/* 快捷问题按钮行 */}
      <div id="guess-questions-container" className="space-y-1.5">
        <div className="text-[9.5px] font-bold text-[#7C766B] uppercase font-mono tracking-wider pl-1">
          猜你想问 (快捷微通道)
        </div>
        <div className="space-y-1.5">
          {shortcutPrompts.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSend(p.text)}
              disabled={step === 1}
              className={[
                'w-full text-left px-3.5 py-2.5 bg-white border rounded-[16px] text-[11px] flex justify-between items-center transition-all duration-200',
                'hover:translate-x-0.5 cursor-pointer',
                p.highlight
                  ? 'border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                  : 'border-[#EFECE6] hover:border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)]',
                p.highlight ? 'text-[#2B2620] font-bold' : 'text-[#7C766B]',
                step === 1 ? 'opacity-60 cursor-not-allowed' : ''
              ].join(' ')}
            >
              <span className="flex items-center gap-1.5">
                {p.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-0.5" />}
                <span className={p.highlight ? 'font-semibold' : 'font-medium'}># {p.text}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#7C766B] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 主体左右分栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 左侧：知识库沙盒 */}
        <div className="bg-[#0A0A0C] rounded-2xl p-3.5 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              KNOWLEDGE BASE / 知识库
            </span>
            <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-500/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>pgvector v2.6</span>
            </div>
          </div>

          {/* Notion 风格树 */}
          <div className="space-y-0.5">
            {[
              { name: '📋 餐饮服务', items: ['🍳 早餐安排', '🍽️ 餐厅服务', '🛎️ 客房送餐'] },
              { name: '🛏️ 客房服务', items: ['🧳 行李寄存', '🧹 清洁服务', '🔌 设施报修'] },
              { name: '📌 通用类目', items: ['🕐 退房规则', '📶 Wi-Fi连接', '🅿️ 停车服务'] },
            ].map((cat, ci) => (
              <div key={ci}>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-900 cursor-pointer">
                  <ChevronDown className="h-3 w-3 text-zinc-600" />
                  <span className="text-[10px] font-bold text-zinc-300">{cat.name}</span>
                </div>
                <div className="ml-4 space-y-0.5">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-zinc-900 cursor-pointer">
                      <div className="h-1 w-1 rounded-full bg-zinc-700 shrink-0" />
                      <span className="text-[9.5px] text-zinc-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chunk 展示 */}
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-600">CHUNKS</span>
              <span className="text-[8px] font-mono bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">500 Tokens/块 · 交叠10%</span>
            </div>
            <div className="space-y-1.5">
              {chunks.map((chunk) => (
                <div
                  key={chunk.id}
                  className={[
                    'p-2 rounded-xl border text-[10px] font-mono leading-relaxed transition-all duration-500',
                    chunk.highlight
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  ].join(' ')}
                >
                  <span className="text-zinc-600 block mb-0.5">[{chunk.id}] {chunk.category}</span>
                  {chunk.text}
                  {chunk.highlight && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-emerald-400">Score: 0.94</span>
                      <span className="h-[1px] flex-1 bg-emerald-500/30" />
                      <span className="text-[8px] text-emerald-500/70 animate-pulse">MATCHED</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：Query 测试 + 双轨解析 + AI 回复 */}
        <div className="space-y-3">
          {/* 当前 Query */}
          <div className="bg-[#FAF8F5] rounded-xl border border-[#EFECE6] p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#7C766B]">USER QUERY</span>
            </div>
            <div className="bg-white rounded-lg border border-[#EFECE6] p-3">
              <p className="text-[11px] font-mono text-[#2B2620] leading-relaxed">
                {selectedPrompt || '点击上方快捷问题按钮开始演示'}
              </p>
            </div>
          </div>

          {/* 双轨解析面板 */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* 语义情绪分析 */}
            <div className="border border-[#EFECE6] bg-white p-3 rounded-xl">
              <span className="text-[9px] text-[#7C766B] uppercase font-mono block mb-2 tracking-wider font-bold">
                🎯 语义情绪分析
              </span>
              <div className="space-y-1.5">
                {[
                  { text: '行李寄存咨询：中性请求', isPositive: true },
                  { text: '超时风险评估：低风险', isPositive: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between text-[10px] p-1.5 border rounded-lg ${
                      item.isPositive
                        ? 'bg-[#E8F5E9] text-[#2E7D32] border-emerald-100'
                        : 'bg-[#FFEBEE] text-[#C62828] border-red-100'
                    }`}
                  >
                    <span className="font-semibold flex items-center gap-1 font-sans">
                      {item.isPositive ? '🟢' : '🔴'} {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 核心痛点与缺陷识别 */}
            <div className="border border-[#EFECE6] bg-white p-3 rounded-xl">
              <span className="text-[9px] text-[#7C766B] uppercase font-mono block mb-2 tracking-wider font-bold">
                🔍 检索质量评估
              </span>
              <div className="space-y-1.5">
                {[
                  { text: '语义召回：命中客房SOP · 94%', isPositive: true },
                  { text: '敏感信息：无违规承诺 · 合规', isPositive: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between text-[10px] p-1.5 border rounded-lg ${
                      item.isPositive
                        ? 'bg-[#E8F5E9] text-[#2E7D32] border-emerald-100'
                        : 'bg-[#FFEBEE] text-[#C62828] border-red-100'
                    }`}
                  >
                    <span className="font-semibold flex items-center gap-1 font-sans">
                      {item.isPositive ? '✦' : '⚠️'} {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI 回复草稿 + 操作栏 */}
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10.5px] font-bold text-[#2B2620] uppercase font-sans">
                  InnoStay AI 回复草稿
                </span>
              </div>
              {step === 2 && (
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="text-[9.5px] text-[#B59410] hover:text-[#D4AF37] font-bold flex items-center gap-1 transition active:scale-95 disabled:opacity-55 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                  重新生成
                </button>
              )}
            </div>

            {/* 加载状态 */}
            <div className="relative min-h-[80px]">
              {step === 1 && (
                <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center rounded-xl space-y-1.5">
                  <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
                  <span className="text-[9.5px] text-[#7C766B] font-medium">
                    语义检索中：TTFB ~1.5s，召回 Chunk 并组装 Prompt...
                  </span>
                </div>
              )}
              {isEditing ? (
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full text-[11px] p-2.5 text-[#2B2620] leading-relaxed bg-white border border-[#D4AF37] focus:outline-none rounded-lg resize-none font-sans min-h-[80px]"
                  placeholder="请输入人工修改内容..."
                />
              ) : (
                <div
                  className="w-full text-[11px] p-2.5 text-[#2B2620] leading-relaxed bg-white border border-[#EFECE6] rounded-lg font-sans min-h-[80px] cursor-text whitespace-pre-wrap select-text"
                  onClick={() => setIsEditing(true)}
                >
                  {displayedText ? (
                    displayedText
                  ) : (
                    <span className="text-[#7C766B]">
                      {step === 0 ? '点击上方快捷问题按钮开始演示...' : 'AI 回复将在这里以打字机效果呈现...'}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 底部操作栏 */}
            {step === 2 && (
              <div className="mt-2 pt-2 border-t border-[#EFECE6] flex items-center justify-between">
                <span className="text-[9px] text-[#7C766B] font-mono">InnoStay RAG Protocol v2.6</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-3 py-1.5 border rounded text-[10px] font-bold transition active:scale-95 cursor-pointer flex items-center gap-1 ${
                      isEditing
                        ? 'bg-[#2B2620] border-[#2B2620] text-white'
                        : 'bg-white border-[#D4AF37] text-[#B59410] hover:bg-amber-50/45'
                    }`}
                  >
                    <Edit2 className="w-3 h-3" />
                    {isEditing ? '保存' : '人工修改'}
                  </button>
                  <button className="bg-[#D4AF37] hover:bg-[#B59410] text-white font-bold text-[10px] px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition active:scale-95 cursor-pointer">
                    <Send className="w-3.5 h-3.5" />
                    回传至 PMS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sandbox 02: Action-Agent 智能工单调度 (参考 zhisu - B M 真实实现) */
function ActionAgentSandbox() {
  // ═════════════════════════════════════════════════════════════
  // TypeScript 接口定义
  // ═════════════════════════════════════════════════════════════
  interface WorkOrder {
    id: string;
    room: string;
    type: '送物' | '维修' | '投诉';
    content: string;
    status: 'pending' | 'processing' | 'done';
    countdownSeconds: number;
    slaLimitMinutes: number;
    assignedTo?: string;
  }

  // ═════════════════════════════════════════════════════════════
  // 状态管理
  // ═════════════════════════════════════════════════════════════
  const [step, setStep] = useState<'idle' | 'complaint' | 'escalate'>('idle');
  const [isDuty, setIsDuty] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'processing' | 'done'>('all');
  const [isIntervened, setIsIntervened] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');

  // ─── C 端住客界面状态 ───
  const [cIsLoggedIn, setCIsLoggedIn] = useState(false);
  const [cPhoneNumber, setCPhoneNumber] = useState('');
  const [cInputValue, setCInputValue] = useState('');
  const [cIsHumanMode, setCIsHumanMode] = useState(false);
  const [cIsVoiceMode, setCIsVoiceMode] = useState(false);
  const [cFaqExpanded, setCFaqExpanded] = useState(false);
  const [cShowToast, setCShowToast] = useState<{ message: string; type: 'success' | 'info' | 'warn' } | null>(null);
  const [cPhoneInput, setCPhoneInput] = useState('13955668888');
  const [cLoginLoading, setCLoginLoading] = useState(false);
  const [cLoginError, setCLoginError] = useState('');

  // C 端消息类型
  interface CMessage {
    id: string;
    sender: 'ai' | 'user' | 'system' | 'human';
    text: string;
    timestamp: string;
    isAi: boolean;
    workOrder?: {
      id: string;
      type: 'delivery' | 'repair';
      label: string;
      title: string;
      step: 0 | 1 | 2 | 3;
      statusText: string;
      logs: string[];
      lastUpdate: string;
    };
    buttons?: Array<{ id: string; label: string; actionType: string; payload?: string }>;
  }

  const [cMessages, setCMessages] = useState<CMessage[]>([]);
  const cChatEndRef = useRef<HTMLDivElement>(null);

  // C 端 Toast 自动消失
  useEffect(() => {
    if (cShowToast) {
      const timer = setTimeout(() => setCShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [cShowToast]);

  // C 端登录后初始化
  useEffect(() => {
    if (cIsLoggedIn) {
      const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      setCMessages([
        {
          id: 'welcome-system',
          sender: 'system',
          text: `尊贵金卡会员 1802 房 (手机号 ${cPhoneNumber}) 已成功接入知宿大管家`,
          timestamp: timeStr,
          isAi: false,
        },
        {
          id: 'welcome-bot',
          sender: 'ai',
          text: `尊贵的王先生，下午好！我是您的尊贵客房大管家「知宿」。\n\n我已接通您客房 (1802房间) 的全天候专属调度中心。无论是需要增配客房物资、客房报修保养、召唤礼宾助理还是延时退房申请，您都可以在这里向我发送指令。`,
          timestamp: timeStr,
          isAi: true,
          buttons: [
            { id: 'btn-delivery', label: '额外配送 (枕头 / 毛巾 / 洗漱包等)', actionType: 'prompt', payload: 'pillow' },
            { id: 'btn-repair', label: '客房报修 (空调不够冷 / 卫浴保养)', actionType: 'prompt', payload: '客房空调不够冷，需要工程人员报修一下' },
            { id: 'btn-checkout', label: '延时退房申请 (尊享 14:00 离房特调)', actionType: 'checkout_submit' },
          ],
        },
      ]);
      setCShowToast({ message: '核心服务网关连接就绪', type: 'success' });
    }
  }, [cIsLoggedIn]);

  // C 端 AI 模拟回复
  const cTriggerBotResponse = useCallback((userPrompt: string) => {
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const typingId = 'typing-' + Date.now();
    setCMessages(prev => [...prev, { id: typingId, sender: 'ai', text: '「知宿」大管家正在调度资源中...', timestamp: timeStr, isAi: true }]);

    setTimeout(() => {
      setCMessages(prev => prev.filter(m => m.id !== typingId));
      const query = userPrompt.toLowerCase();
      let aiText = '';
      let workOrder: CMessage['workOrder'] | undefined;
      let btns: CMessage['buttons'] | undefined;

      if (query.includes('枕') || query.includes('配送') || query.includes('送物') || query.includes('pillow')) {
        aiText = '👌 收到，客房 1802 专属配送单已加急派单。已为您指派「增配舒适骨头枕两只」的极速出库指令。';
        workOrder = { id: 'wo-del-' + Date.now(), type: 'delivery', label: '送物', title: '客房备用舒适骨头枕加配配送', step: 0, statusText: '备件中心分拨包装中', logs: ['【已受理】派单指派已通过。后备仓专员正进行打包。'], lastUpdate: timeStr };
      } else if (query.includes('空调') || query.includes('报修') || query.includes('热') || query.includes('维修')) {
        aiText = '🔧 收到。您提报的「客房变频空调制冷反馈」已列为高优先级客修。工程部张师傅将携带温控仪前往检测。';
        workOrder = { id: 'wo-rep-' + Date.now(), type: 'repair', label: '报修', title: '豪华1802客房空调系统调校维修', step: 0, statusText: '工程大班长极速响应派遣', logs: ['【已受理】工程维修班组完成工单匹配。师傅携工具上楼中。'], lastUpdate: timeStr };
      } else if (query.includes('退房') || query.includes('延时') || query.includes('延退') || query.includes('延迟')) {
        aiText = '⏰ 作为金卡尊贵会员，您的退房时间已自动顺延至 13:00。是否需要申请延迟至 14:00？';
        btns = [
          { id: 'btn-co-1400', label: '✅ 免费一键延期到 14:00', actionType: 'checkout_submit' },
          { id: 'btn-co-lug', label: '🧳 联络客房专员行李托管', actionType: 'link' },
        ];
      } else {
        aiText = `大管家「知宿」已收到您的反馈：『${userPrompt}』。\n您可以随时：增补客房备品、提报工程需求、办理快速退房。`;
      }

      setCMessages(prev => [...prev, { id: 'reply-' + Date.now(), sender: 'ai', text: aiText, timestamp: timeStr, isAi: true, workOrder, buttons: btns }]);
      // 滚动到底部
      setTimeout(() => cChatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    }, 1200);
  }, []);

  // C 端发送消息
  const cHandleSendMessage = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cInputValue.trim()) return;
    const text = cInputValue;
    setCInputValue('');
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    setCMessages(prev => [...prev, { id: 'usr-' + Date.now(), sender: 'user', text, timestamp: timeStr, isAi: false }]);
    setTimeout(() => cChatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    cTriggerBotResponse(text);
  }, [cInputValue, cTriggerBotResponse]);

  // C 端快捷指令
  const cExecutePresetPrompt = useCallback((promptText: string) => {
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    setCMessages(prev => [...prev, { id: 'usr-preset-' + Date.now(), sender: 'user', text: promptText, timestamp: timeStr, isAi: false }]);
    setTimeout(() => cChatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    cTriggerBotResponse(promptText);
  }, [cTriggerBotResponse]);

  // C 端登录
  const cHandleLogin = useCallback(() => {
    if (!cPhoneInput.trim()) return;
    setCLoginLoading(true);
    setCLoginError('');
    // 模拟登录（实际项目会调 API）
    setTimeout(() => {
      setCPhoneNumber(cPhoneInput);
      setCIsLoggedIn(true);
      setCLoginLoading(false);
    }, 800);
  }, [cPhoneInput]);

  // C 端人工模式切换
  const cToggleHumanMode = useCallback(() => {
    const next = !cIsHumanMode;
    setCIsHumanMode(next);
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    setCMessages(prev => [...prev, {
      id: 'sys-' + Date.now(),
      sender: 'system',
      text: next ? '已为您接入大堂主管小悦真人专区' : '真人主管回退，AI 大管家继续为您全天候待命',
      timestamp: timeStr,
      isAi: false,
    }]);
  }, [cIsHumanMode]);

  // 工单数据（参考 App.tsx 模拟数据）
  const [orders, setOrders] = useState<WorkOrder[]>([
    {
      id: 'WO-20240201-001',
      room: '8302',
      type: '送物',
      content: '住客反映房间空调异响严重，影响夜间休息，情绪较为激动，要求立即处理',
      status: 'pending',
      countdownSeconds: 600,
      slaLimitMinutes: 15,
    },
    {
      id: 'WO-20240201-002',
      room: '5206',
      type: '维修',
      content: '住客反映房间空调异响严重，影响夜间休息，情绪较为激动',
      status: 'processing',
      countdownSeconds: 420,
      slaLimitMinutes: 30,
      assignedTo: '张师傅',
    },
    {
      id: 'WO-20240131-045',
      room: '7108',
      type: '送物',
      content: '需要额外毛巾和枕头，住客带小孩出行',
      status: 'done',
      countdownSeconds: 0,
      slaLimitMinutes: 20,
      assignedTo: '张师傅',
    },
  ]);

  const [chatMessages, setChatMessages] = useState<{ id: number; sender: 'guest' | 'ai' | 'system'; text: string; time: string }[]>([
    { id: 1, sender: 'guest', text: '你好，房间空调不太冷', time: '14:22' },
    { id: 2, sender: 'ai', text: '好的，已安排工程部检修，稍后联系您。', time: '14:22' },
  ]);

  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ═════════════════════════════════════════════════════════════
  // 计算属性 (useMemo)
  // ═════════════════════════════════════════════════════════════
  const badgeCounts = useMemo(() => {
    return {
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders;
    return orders.filter(o => o.status === activeFilter);
  }, [orders, activeFilter]);

  // ═════════════════════════════════════════════════════════════
  // 工具函数
  // ═════════════════════════════════════════════════════════════
  const formatCountdown = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ═════════════════════════════════════════════════════════════
  // 处理函数
  // ═════════════════════════════════════════════════════════════
  const handleComplaint = useCallback(() => {
    if (step !== 'idle') return;
    setStep('complaint');

    // 添加新工单
    const newOrder: WorkOrder = {
      id: `WO-${Date.now()}`,
      room: '602',
      type: '维修',
      content: '602房间地毯上都是水，住客要求立即处理',
      status: 'pending',
      countdownSeconds: 900,
      slaLimitMinutes: 15,
    };
    setOrders(prev => [newOrder, ...prev]);

    // 添加聊天消息
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'guest',
      text: '前台吗？我们602房间地毯上都是水...',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, [step]);

  const handleEscalate = useCallback(() => {
    if (step !== 'idle') return;
    setStep('escalate');
    setIsIntervened(false);

    // 添加系统消息
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      text: '🚨 AI 触发情感极值红线 (情绪评分 <= 24)！已自动刹车阻断，等待人工接管...',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);

    // 添加住客消息
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'guest',
        text: '体验极差，叫人来退房！',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 500);
  }, [step]);

  const handleAcceptOrder = useCallback((orderId: string, room: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'processing' as const, assignedTo: '张师傅' } : o
    ));

    // 添加 AI 回复
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai',
      text: `已确认接单，正在前往 ${room} 房间处理，请稍候。`,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, []);

  const handleRejectOrder = useCallback((room: string) => {
    setOrders(prev => prev.filter(o => o.room !== room));
  }, []);

  const handleCompleteOrder = useCallback((orderId: string, room: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'done' as const } : o
    ));

    // 添加 AI 回复
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai',
      text: `已完成 ${room} 房间的问题处理，感谢您的配合。`,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, []);

  const handleTakeover = useCallback(() => {
    setIsIntervened(true);
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'system',
      text: '✅ 张师傅已强行接管会话，现在以人工模式回复住客。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, []);

  const handleSendTextMessage = useCallback((e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai', // 显示为人工回复
      text: inputText,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputText('');
  }, [inputText]);

  const resetSandbox = useCallback(() => {
    setStep('idle');
    setIsIntervened(false);
    setActiveFilter('all');
    setActiveTab('orders');
    setOrders([
      {
        id: 'WO-20240201-001',
        room: '8302',
        type: '送物',
        content: '住客反映房间空调异响严重，影响夜间休息，情绪较为激动，要求立即处理',
        status: 'pending',
        countdownSeconds: 600,
        slaLimitMinutes: 15,
      },
      {
        id: 'WO-20240201-002',
        room: '5206',
        type: '维修',
        content: '住客反映房间空调异响严重，影响夜间休息，情绪较为激动',
        status: 'processing',
        countdownSeconds: 420,
        slaLimitMinutes: 30,
        assignedTo: '张师傅',
      },
      {
        id: 'WO-20240131-045',
        room: '7108',
        type: '送物',
        content: '需要额外毛巾和枕头，住客带小孩出行',
        status: 'done',
        countdownSeconds: 0,
        slaLimitMinutes: 20,
        assignedTo: '张师傅',
      },
    ]);
    setChatMessages([
      { id: 1, sender: 'guest', text: '你好，房间空调不太冷', time: '14:22' },
      { id: 2, sender: 'ai', text: '好的，已安排工程部检修，稍后联系您。', time: '14:22' },
    ]);
    setInputText('');
  }, []);

  // ═════════════════════════════════════════════════════════════
  // 倒计时效果
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(o => {
        if (o.status === 'done') return o;
        if (o.countdownSeconds <= 0) return o;
        return { ...o, countdownSeconds: o.countdownSeconds - 1 };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ═════════════════════════════════════════════════════════════
  // JSX 渲染
  // ═════════════════════════════════════════════════════════════
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 左侧：C 端微信小程序模拟（参考 zhizu - C 真实实现） */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {/* 微信小程序风格手机框架（深色主题） */}
        <div className="bg-[#0f1115] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-[0_32px_80px_rgba(115,92,0,0.13)] mx-auto w-full max-w-[280px] flex flex-col overflow-hidden" style={{ height: '600px' }}>

          {/* 微信标准状态栏 */}
          <div className="bg-[#0f1115] text-[#b4b7bd] text-[10px] px-5 pt-3 pb-2 flex items-center justify-between shrink-0 select-none font-mono">
            <span className="font-semibold text-[10px] text-slate-100">10:10 AM</span>
            <div className="flex items-center space-x-1 text-[9px] text-slate-400 font-bold">
              <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
              <span className="tracking-wide text-slate-300">王先生 (1802)</span>
            </div>
            <div className="flex items-center space-x-1 min-w-[50px] justify-end">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span className="text-[8px] bg-slate-800 text-slate-350 px-1 py-0.2 rounded font-mono">5G</span>
              <div className="w-4 h-2 border border-slate-700 rounded-sm p-[1px] flex items-center bg-slate-950">
                <div className="h-full w-3/4 bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* 小程序头部栏 */}
          <div className="bg-[#0f1115] border-b border-slate-900 px-3 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <button type="button" className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-[11px] font-bold tracking-wide text-white">知宿智能管家</span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-[8px] text-[#d4af37] font-semibold">尊享金卡会员 · 快速工单调度</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/40 border border-slate-800/80 rounded-full px-2 py-0.5 text-slate-300">
              <Disc className="w-3 h-3 text-slate-400" />
              <div className="w-px h-3 bg-slate-800" />
              <X className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          {/* 聊天主体区域（含登录/聊天切换） */}
          <div className="flex-grow flex flex-col overflow-hidden bg-gradient-to-b from-[#F2F4F9] to-[#FAF9F6] relative">

            {!cIsLoggedIn ? (
              /* ─── 登录表单 ─── */
              <div className="absolute inset-0 z-50 bg-[#07090c]/35 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-[240px] bg-white border border-[#d0c5af]/30 rounded-[20px] p-5 shadow-lg flex flex-col items-center text-center">
                  {/* 顶部金条 */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#735c00] to-[#d4af37] rounded-t-[20px]" />

                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-[#fbf3e5] border border-[#d4af37]/20 flex items-center justify-center mb-3">
                    <span className="text-[10px] font-black text-[#735c00]">知</span>
                  </div>

                  <h3 className="text-[12px] font-extrabold text-[#1f1b13] mb-0.5 tracking-tight">知宿 InnoStay</h3>
                  <p className="text-[7px] text-[#4d4635] font-mono tracking-widest uppercase font-bold mb-3">金卡尊享会员智能管家终端</p>

                  <div className="bg-[#F2F4F9] p-3 rounded-[12px] border border-[#d0c5af]/10 w-full mb-3 text-left space-y-2">
                    <p className="text-[9px] text-[#1f1b13] font-medium leading-relaxed">
                      欢迎使用知宿，请先一键绑定登录以开启专属AI客服管家、客房急速配品及延迟退房贵宾特权。
                    </p>
                    <div className="flex items-center space-x-1.5 text-[8px] text-[#4d4635]">
                      <ShieldAlert className="w-3 h-3 text-[#735c00]" />
                      <span className="font-semibold">绑定后即享 1802 专属数字房卡</span>
                    </div>
                  </div>

                  {/* 错误消息 */}
                  {cLoginError && (
                    <div className="w-full mb-2 p-2 bg-red-50 border border-red-200 rounded-[10px] flex items-start space-x-1.5">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-[8px] text-red-700 text-left font-medium">{cLoginError}</span>
                    </div>
                  )}

                  <form onSubmit={e => { e.preventDefault(); cHandleLogin(); }} className="w-full space-y-2.5">
                    <input
                      type="text"
                      value={cPhoneInput}
                      onChange={e => { setCPhoneInput(e.target.value); setCLoginError(''); }}
                      placeholder="请输入已注册的手机号"
                      className="w-full bg-[#F2F4F9] border border-[#d0c5af]/30 focus:border-[#d4af37] text-[10px] px-3 py-2.5 rounded-full focus:ring-1 focus:ring-[#d4af37] text-[#1f1b13] outline-none placeholder-[#4d4635]/60 transition-all text-center font-bold"
                      disabled={cLoginLoading}
                    />
                    <button
                      type="submit"
                      disabled={cLoginLoading}
                      className="w-full py-2.5 px-4 bg-[#735c00] hover:bg-[#574500] text-white font-bold rounded-full text-[10px] tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {cLoginLoading ? (
                        <><Loader className="w-3.5 h-3.5 animate-spin stroke-[2.5]" /><span>验证中...</span></>
                      ) : (
                        <><LogIn className="w-3.5 h-3.5 stroke-[2.5]" /><span>一键一码安全登录</span></>
                      )}
                    </button>
                  </form>

                  <div className="mt-3 flex items-center space-x-1 text-[7px] text-[#4d4635]/60 font-medium">
                    <UserCheck className="w-2.5 h-2.5 text-emerald-600" />
                    <span>公安旅馆数字化联网标准及隐私保护</span>
                  </div>
                  <div className="mt-1.5 text-[7px] text-[#4d4635]/40 font-mono">
                    测试号码：13955668888 / 13900001111
                  </div>
                </div>
              </div>
            ) : (
              /* ─── 聊天界面 ─── */
              <>
                <div className="flex-grow overflow-y-auto px-3 py-3 space-y-3 scrollbar-none">

                  {/* BrandGreeting */}
                  <div className="bg-white border border-[#d0c5af]/30 rounded-[14px] p-3 shadow-sm relative overflow-hidden text-[#1f1b13]">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/5 to-transparent pointer-events-none rounded-tr-[14px]" />
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#fbf3e5] flex items-center justify-center border border-[#d4af37]/20">
                        <span className="text-[8px] font-black text-[#735c00]">知</span>
                      </div>
                      <div>
                        <div className="text-[7px] text-[#4d4635] font-mono tracking-widest uppercase font-semibold">InnoStay Butler</div>
                        <h2 className="text-[10px] font-bold text-[#1f1b13] tracking-tight">您好，我是智能管家「知宿」</h2>
                      </div>
                    </div>
                    <p className="text-[8px] text-[#4d4635] leading-relaxed mb-2">
                      极速无纸化入住，免取卡免排队。点击下方快捷通道，或直接文字沟通均可为您秒级派遣工单。
                    </p>
                    <div className="flex items-center justify-between text-[8px] p-2 bg-[#F2F4F9] border border-[#d0c5af]/10 rounded-full">
                      <div className="flex items-center space-x-1 text-[#1f1b13] font-medium">
                        <Clock className="w-2.5 h-2.5 text-[#735c00]" />
                        <span>客房：<strong className="text-[#735c00] font-bold">1802</strong></span>
                      </div>
                      <span className="text-[7px] text-emerald-700 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">主网关连通中</span>
                    </div>
                  </div>

                  {/* QuickChips */}
                  <div className="space-y-1.5">
                    <div className="text-[8px] font-bold text-[#4d4635] flex items-center space-x-1 pl-0.5 font-sans uppercase tracking-wider">
                      <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                      <span>快捷特享通道</span>
                    </div>
                    <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pb-0.5">
                      {[
                        { icon: <UserCheck className="w-2.5 h-2.5 shrink-0 text-[#735c00]" />, label: '极速入住', prompt: '极速入住' },
                        { icon: <Zap className="w-2.5 h-2.5 shrink-0 text-[#735c00]" />, label: '房间指南', prompt: '房间指南-控电控制面板' },
                        { icon: <Star className="w-2.5 h-2.5 shrink-0 text-[#735c00]" />, label: '客房服务', prompt: '客房配品服务' },
                        { icon: <Clock className="w-2.5 h-2.5 shrink-0 text-[#735c00]" />, label: '延时退房', prompt: '延迟退房选项' },
                      ].map(chip => (
                        <button
                          key={chip.label}
                          onClick={() => cExecutePresetPrompt(chip.prompt)}
                          className="shrink-0 flex items-center space-x-1 bg-[#F2F4F9] hover:bg-[#fbf3e5] border border-transparent hover:border-[#d4af37]/25 text-[#4d4635] hover:text-[#735c00] px-2.5 py-1.5 rounded-full text-[8px] font-medium cursor-pointer transition-all active:scale-95"
                        >
                          {chip.icon}
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GuessYouWantToAsk */}
                  <div className="space-y-1.5">
                    <div className="text-[8px] font-bold text-[#4d4635] pl-0.5 uppercase font-mono tracking-wider">猜你想问</div>
                    <div className="space-y-1.5">
                      {[
                        { label: '帮我配送两张骨头枕', prompt: '我需要加配两张骨头枕' },
                        { label: '最晚退房时间是几点？', prompt: '请问酒店的最晚退房时间是几点？' },
                        { label: '客房空调不够冷 / 需要报修', prompt: '客房空调不够冷，需要工程人员报修一下', highlight: true },
                      ].map(item => {
                        const isHighlight = item.highlight;
                        return (
                          <button
                            key={item.label}
                            onClick={() => cExecutePresetPrompt(item.prompt)}
                            className={[
                              'w-full text-left p-2.5 bg-white hover:bg-[#FAF9F6] rounded-[12px] text-[9px] flex justify-between items-center shadow-sm transition-all cursor-pointer hover:translate-x-0.5',
                              isHighlight ? 'border border-[#d4af37]/30 hover:border-[#d4af37]/50 text-[#735c00]' : 'border border-[#d0c5af]/20 hover:border-[#d4af37]/30 text-[#1f1b13]'
                            ].join(' ')}
                          >
                            <span className="font-medium"># {item.label}</span>
                            <ChevronRight className="w-3 h-3 text-[#4d4635]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 消息列表 */}
                  {cMessages.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-[#d0c5af]/15">
                      {cMessages.map((msg) => {
                        if (msg.sender === 'system') {
                          return (
                            <div key={msg.id} className="flex justify-center my-1">
                              <span className="text-[7px] bg-white text-[#4d4635] font-bold px-2.5 py-1 rounded-full border border-[#d0c5af]/15 text-center tracking-wide">
                                {msg.text} · <span className="font-mono text-[#4d4635]/70">{msg.timestamp}</span>
                              </span>
                            </div>
                          );
                        }

                        const isAi = msg.sender === 'ai' || msg.sender === 'human';
                        const senderLabel = msg.sender === 'human' ? '客房主管 · 小悦' : '数字大管家 · 知宿';

                        return (
                          <div key={msg.id} className={`flex ${!isAi ? 'justify-end' : 'justify-start'} items-start space-x-1.5`}>
                            {isAi && (
                              <div className="shrink-0 w-5 h-5 rounded-full bg-[#fbf3e5] border border-[#d4af37]/20 flex items-center justify-center">
                                <span className="text-[6px] font-black text-[#735c00]">知</span>
                              </div>
                            )}
                            <div className="max-w-[82%] relative flex flex-col space-y-0.5">
                              <span className={`text-[7px] text-[#4d4635] font-bold px-0.5 ${!isAi ? 'text-right' : 'text-left'}`}>
                                {isAi ? senderLabel : '王先生 (1802)'} · <span className="font-mono text-[6px] font-semibold">{msg.timestamp}</span>
                              </span>
                              <div className={`p-2.5 rounded-[14px] text-[9px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                                !isAi
                                  ? 'bg-[#735c00] text-white rounded-tr-none font-semibold'
                                  : msg.sender === 'human'
                                    ? 'bg-[#EAFDF2] border border-emerald-100 text-slate-800 rounded-tl-none font-semibold'
                                    : 'bg-white border border-[#d0c5af]/35 text-[#1f1b13] rounded-tl-none'
                              }`}>
                                {msg.text}
                              </div>

                              {/* 消息内嵌按钮 */}
                              {msg.buttons && msg.buttons.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-[#d0c5af]/10 space-y-1">
                                  {msg.buttons.map(btn => (
                                    <button
                                      key={btn.id}
                                      onClick={() => {
                                        if (btn.actionType === 'prompt' && btn.payload) cExecutePresetPrompt(btn.payload);
                                        else if (btn.actionType === 'checkout_submit') {
                                          const ts = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                                          setCMessages(prev => [...prev, { id: 'co-' + Date.now(), sender: 'system', text: '延迟退房申请已自动特调通过！离房时间延至 14:00', timestamp: ts, isAi: false }]);
                                        } else if (btn.actionType === 'work_order') cExecutePresetPrompt('我需要加配两张骨头枕');
                                        else setCShowToast({ message: '已激活离线数字房卡', type: 'success' });
                                      }}
                                      className="w-full text-[8px] text-left p-2 bg-[#F2F4F9]/50 hover:bg-[#fbf3e5] border border-[#d0c5af]/25 hover:border-[#d4af37] hover:text-[#735c00] rounded-full transition-all flex items-center justify-between cursor-pointer group"
                                    >
                                      <span className="font-bold text-[8px] pl-0.5">{btn.label}</span>
                                      <ChevronRight className="w-3 h-3 text-[#4d4635] group-hover:text-[#735c00] pr-0.5" />
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* WorkOrderTracker */}
                              {msg.workOrder && (
                                <div className="bg-white border border-[#d0c5af]/30 rounded-[14px] p-3 mt-2 space-y-2 text-[#1f1b13]">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5">
                                      <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold ${
                                        msg.workOrder.type === 'delivery' ? 'bg-[#fbf3e5] text-[#735c00] border border-[#d4af37]/20' : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                                      }`}>
                                        [{msg.workOrder.label}]
                                      </span>
                                      <span className="text-[8px] font-bold">{msg.workOrder.title}</span>
                                    </div>
                                  </div>
                                  {/* 进度条 */}
                                  <div className="flex items-center mt-1 relative">
                                    <div className="absolute left-0 right-0 h-[2px] bg-[#F2F4F9] top-1/2 -translate-y-1/2 z-0" />
                                    <div className="absolute left-0 h-[2px] bg-[#735c00] top-1/2 -translate-y-1/2 z-0 transition-all" style={{ width: `${(msg.workOrder.step / 3) * 100}%` }} />
                                    {[0, 1, 2, 3].map(si => {
                                      const isPassed = msg.workOrder!.step >= si;
                                      const labels = ['已受理', msg.workOrder!.type === 'delivery' ? '装箱' : '出库', msg.workOrder!.type === 'delivery' ? '配送' : '上楼', '完成'];
                                      return (
                                        <div key={si} className="flex-grow flex flex-col items-center relative z-10">
                                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] transition-all ${
                                            isPassed ? 'bg-[#735c00] text-white font-bold scale-105' : 'bg-white text-[#4d4635] border border-[#d0c5af]/45'
                                          }`}>{isPassed && si < msg.workOrder!.step ? <Check className="w-2 h-2 stroke-[3px]" /> : si + 1}</div>
                                          <span className="text-[6px] mt-1 text-[#4d4635]">{labels[si]}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {/* 日志 */}
                                  <div className="bg-[#F2F4F9] p-2 rounded-[10px] border border-[#d0c5af]/15 space-y-1 max-h-[60px] overflow-y-auto scrollbar-none">
                                    <div className="text-[7px] text-[#4d4635] font-bold tracking-wide border-b border-[#d0c5af]/10 pb-0.5 flex justify-between">
                                      <span>调度日志</span>
                                      <span className="text-[#735c00] animate-pulse font-medium">● 实时</span>
                                    </div>
                                    {msg.workOrder.logs.map((log, i) => (
                                      <div key={i} className="text-[7px] text-[#1f1b13] leading-relaxed pl-1.5 border-l-2 border-[#d4af37] py-0.5 font-medium">{log}</div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div ref={cChatEndRef} />
                </div>

                {/* 底部输入栏 */}
                <div className="p-2.5 bg-white border-t border-[#d0c5af]/15 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-10">
                  {/* 人工模式横幅 */}
                  {cIsHumanMode && (
                    <div className="mb-2 p-1.5 bg-emerald-500/10 border border-emerald-100 text-[#0f766e] text-[8px] rounded-full flex items-center justify-between animate-pulse select-none">
                      <div className="flex items-center space-x-1 pl-1.5 font-bold">
                        <PhoneCall className="w-2.5 h-2.5 animate-bounce text-emerald-600" />
                        <span>【大堂真人服务实时会话中】</span>
                      </div>
                      <button onClick={cToggleHumanMode} className="text-[7px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-500/30 cursor-pointer font-extrabold transition-all">切回AI</button>
                    </div>
                  )}

                  <form onSubmit={cHandleSendMessage} className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => { setCIsVoiceMode(!cIsVoiceMode); setCShowToast({ message: cIsVoiceMode ? '已换回键盘输入' : '按住说话', type: 'info' }); }}
                      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                        cIsVoiceMode ? 'bg-[#fbf3e5] text-[#735c00] border-[#d4af37]' : 'bg-[#F2F4F9]/50 text-[#4d4635] border-[#d0c5af]/20 hover:text-[#1f1b13]'
                      }`}>
                      {cIsVoiceMode ? <Volume2 className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    </button>

                    {cIsVoiceMode ? (
                      <button
                        type="button"
                        onMouseDown={() => setCShowToast({ message: '录音中：请说话...', type: 'info' })}
                        onMouseUp={() => cExecutePresetPrompt('帮我配送一盒骨头枕到房间')}
                        className="flex-grow py-1.5 px-3 bg-[#F2F4F9]/40 border border-[#d0c5af]/25 text-[#4d4635] active:bg-[#fbf3e5] active:text-[#735c00] active:border-[#d4af37] rounded-full text-[8px] font-bold text-center cursor-pointer transition-all h-[28px] flex items-center justify-center space-x-1"
                      >
                        <Disc className="w-2.5 h-2.5 text-[#735c00] animate-pulse" />
                        <span>按住 说话</span>
                      </button>
                    ) : (
                      <input
                        type="text"
                        value={cInputValue}
                        onChange={e => setCInputValue(e.target.value)}
                        placeholder={cIsHumanMode ? '向前台小悦发送消息...' : '向 AI 客服管家知宿沟通...'}
                        className="flex-grow py-1.5 px-3 bg-[#F2F4F9]/40 border border-[#d0c5af]/20 focus:border-[#d4af37]/60 text-[#1f1b13] placeholder-[#4d4635]/60 rounded-full text-[9px] outline-none focus:ring-1 focus:ring-[#d4af37]/20 transition-all h-[28px] font-medium"
                      />
                    )}

                    {cInputValue.trim() ? (
                      <button type="submit" className="p-1.5 bg-[#735c00] hover:bg-[#574500] text-white rounded-full transition-all font-bold cursor-pointer h-[28px] w-[28px] flex items-center justify-center shadow-sm hover:scale-105 active:scale-95">
                        <Send className="w-3 h-3 text-white" strokeWidth={3} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={cToggleHumanMode}
                        className={`px-2.5 py-1.5 border text-[8px] rounded-full font-bold tracking-wider transition-all h-[28px] flex items-center space-x-1 cursor-pointer shrink-0 ${
                          cIsHumanMode ? 'bg-rose-500/15 border-rose-200 text-rose-600' : 'bg-[#F2F4F9]/40 border-[#d0c5af]/20 text-[#4d4635] hover:bg-[#fbf3e5] hover:text-[#735c00] hover:border-[#d4af37]/40'
                        }`}
                      >
                        <Phone className="w-2.5 h-2.5 shrink-0" />
                        <span>{cIsHumanMode ? 'AI管家' : '呼叫人工'}</span>
                      </button>
                    )}
                  </form>
                </div>
              </>
            )}
          </div>

          {/* Toast */}
          {cShowToast && (
            <div className="absolute bottom-16 left-3 right-3 z-50 animate-[fadeIn_0.2s_ease-in]">
              <div className="bg-slate-900/95 border border-[#d4af37]/25 text-[#fbf3e5] text-[8px] py-2 px-3 rounded-lg shadow-xl flex items-center space-x-1.5 backdrop-blur-md">
                {cShowToast.type === 'warn' ? <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                <span className="font-semibold tracking-wide">{cShowToast.message}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 右侧：B 端工单工作台（iOS 风格手机框架） */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {/* iOS 风格手机框架 */}
        <div className="bg-[#1C1C1E] rounded-[2.5rem] p-2 border border-zinc-700 shadow-xl mx-auto w-full max-w-[280px]">
          <div className="bg-[#EFECE6] rounded-[1.8rem] overflow-hidden relative" style={{ height: '600px' }}>
            {/* 灵动岛 */}
            <div className="h-7 bg-[#2B2620] flex items-center justify-center">
              <div className="w-20 h-6 bg-[#2B2620] rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-4 bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* 状态栏 */}
            <div className="px-4 py-1.5 flex items-center justify-between text-[9px] font-bold text-[#2B2620] bg-[#EFECE6]">
              <span>知宿管家</span>
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#2B2620]" />
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#2B2620]" />
                <div className="w-5 h-2.5 bg-[#2B2620] rounded-sm" />
              </div>
            </div>

            {/* 内容区域（可滚动）*/}
            <div className="overflow-y-auto" style={{ height: 'calc(600px - 28px - 24px - 56px)', scrollbarWidth: 'none' }}>
              <AnimatePresence mode="wait">
                {/* ───────────────────────────────────────────────── */}
                {/* Tab 1: 工单列表 */}
                {/* ───────────────────────────────────────────────── */}
                {activeTab === 'orders' && (
                  <motion.div
                    key="tab-orders"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {/* 沉浸式页头 */}
                    <div className="bg-white border-b border-[#7C766B]/15 pt-4 pb-12 px-4 text-[#2B2620] relative">
                      <div className="flex items-center justify-between">
                        <div className="text-left space-y-1">
                          <p className="text-[9px] text-[#2B2620]/60 font-bold tracking-wider">智能数字工作台</p>
                          <h2 className="text-lg font-black tracking-tight text-[#2B2620] flex items-center gap-2">
                            张师傅
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2B2620]/5 text-[#2B2620] border border-[#2B2620]/15">客房部</span>
                          </h2>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-end gap-1">
                            <button 
                              onClick={() => setIsDuty(!isDuty)}
                              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200"
                              style={{ backgroundColor: isDuty ? '#D4AF37' : '#D1D1D6' }}
                            >
                              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${isDuty ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                            <span className="text-[8px] font-black tracking-tight text-[#2B2620]/80">
                              {isDuty ? '[在岗值班中]' : '[离岗休假中]'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 过滤 Tabs */}
                    <div className="px-3 -mt-8 relative z-30">
                      <div className="bg-white rounded-2xl p-1.5 flex items-center border border-[#7C766B]/10 shadow-[0_4px_16px_rgba(43,38,32,0.06)]">
                        {[
                          { id: 'all', label: '全部' },
                          { id: 'pending', label: '待接单', isAlert: true },
                          { id: 'processing', label: '处理中', isAlert: false },
                          { id: 'done', label: '已完成' },
                        ].map((tabItem) => {
                          const count = tabItem.id === 'pending' ? badgeCounts.pending : tabItem.id === 'processing' ? badgeCounts.processing : 0;
                          const isChoose = activeFilter === tabItem.id;
                          return (
                            <button
                              key={tabItem.id}
                              onClick={() => setActiveFilter(tabItem.id as any)}
                              className={`flex-1 py-2 text-center rounded-xl text-[10px] font-bold transition-all relative ${
                                isChoose 
                                  ? 'bg-[#7C7466] text-white shadow-sm' 
                                  : 'text-[#7C766B] hover:text-[#2B2620]'
                              }`}
                            >
                              <span>{tabItem.label}</span>
                              {count > 0 ? (
                                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white ${tabItem.isAlert ? 'bg-rose-500' : 'bg-[#D4AF37]'}`}>
                                  {count}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SLA 临期警告横幅 */}
                    {badgeCounts.pending > 0 && (
                      <div className="px-3">
                        <div className="bg-rose-50 border border-rose-100 rounded-xl px-3 py-2 flex items-center gap-2 text-rose-800">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                          <p className="text-[10px] font-bold flex-1 truncate text-left">
                            警告：{orders.find(o => o.status === 'pending')?.room} 工单已等待 {Math.floor((900 - (orders.find(o => o.status === 'pending')?.countdownSeconds || 0)) / 60)} 分钟，请尽快处理！
                          </p>
                          <span className="text-[8px] font-extrabold bg-rose-600 text-white px-2 py-0.5 rounded">SLA加急</span>
                        </div>
                      </div>
                    )}

                    {/* 工单卡片列表 */}
                    <div className="px-3 space-y-3">
                      {filteredOrders.length === 0 ? (
                        <div className="py-8 bg-white rounded-2xl border border-gray-100 text-center">
                          <Inbox className="w-8 h-8 text-[#7C766B]/20 mx-auto mb-2" />
                          <p className="text-[10px] text-[#7C766B] font-bold">没有查询到相关工单信息</p>
                        </div>
                      ) : (
                        filteredOrders.map((order) => {
                          const isPending = order.status === 'pending';
                          const isProcessing = order.status === 'processing';
                          const isDone = order.status === 'done';

                          return (
                            <div 
                              key={order.id}
                              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden"
                            >
                              {/* 卡片头部 */}
                              <div className="bg-gray-50/50 px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                                <span className="text-[9px] text-[#7C766B] font-mono font-bold tracking-wider">工单ID: {order.id}</span>
                                <div>
                                  {isPending ? (
                                    <div className="flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                                      <Clock className="w-2.5 h-2.5 text-rose-500" />
                                      <span className="text-[9px] font-bold text-rose-600 font-mono">
                                        {formatCountdown(order.countdownSeconds)}
                                      </span>
                                    </div>
                                  ) : isProcessing ? (
                                    <span className="text-[9px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                                      处理中
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                      ✓ 已闭单
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* 卡片内容 */}
                              <div className="divide-y divide-gray-100 text-left">
                                {/* 目的客房 */}
                                <div className="px-3 py-2.5 flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-[#7C766B]">目的客房</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-black text-[#2B2620] font-mono leading-none">{order.room}</span>
                                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                                      order.type === '送物' 
                                        ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                                        : order.type === '维修' 
                                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                          : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    }`}>
                                      {order.type}
                                    </span>
                                  </div>
                                </div>

                                {/* 住客诉求摘要 */}
                                <div className="px-3 py-2.5 flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[#7C766B]">住客诉求摘要</span>
                                    <span className="text-[9px] text-zinc-400 font-bold flex items-center gap-0.5">
                                      <Sparkles className="w-2 h-2 text-[#D4AF37]" />
                                      AI自动结构化
                                    </span>
                                  </div>
                                  <p className="text-[11px] font-semibold text-[#2B2620] mt-1 leading-relaxed">
                                    {order.content}
                                  </p>
                                </div>

                                {/* 服务响应时效 */}
                                <div className="px-3 py-2 flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-[#7C766B]">服务响应时效</span>
                                  <span className="text-[10px] font-bold text-[#2B2620] font-mono">
                                    SLA限时 {order.slaLimitMinutes} 分钟完成
                                  </span>
                                </div>
                              </div>

                              {/* 操作按钮 */}
                              <div className="p-3 bg-gray-50/40 border-t border-gray-100">
                                {isPending && (
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => handleAcceptOrder(order.id, order.room)}
                                      className="w-full py-2.5 rounded-xl bg-[#7C7466] hover:bg-[#8F8778] text-white font-bold text-[10px] text-center transition-all shadow-md flex items-center justify-center gap-1"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                      确认立刻接单
                                    </button>
                                    <button
                                      onClick={() => handleRejectOrder(order.room)}
                                      className="w-full py-1.5 bg-transparent text-[#7C766B] hover:text-[#2B2620] text-[10px] font-bold text-center underline decoration-dashed"
                                    >
                                      拒绝工单并退回调配台
                                    </button>
                                  </div>
                                )}

                                {isProcessing && (
                                  <button
                                    onClick={() => handleCompleteOrder(order.id, order.room)}
                                    className="w-full py-2.5 rounded-xl bg-[#7C7466] hover:bg-[#8F8778] text-white font-black text-[10px] text-center transition-all shadow-md flex items-center justify-center gap-1"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    我已处理完成并申请结案
                                  </button>
                                )}

                                {isDone && (
                                  <div className="text-center text-[9px] text-[#7C766B] font-medium py-1">
                                    服务流转信息已实时上传PMS云服务器
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* 底部文案 */}
                    <div className="p-3 text-center">
                      <p className="text-[9px] text-[#7C766B]/50 leading-relaxed">
                        由知宿(Hinton-OS)提供技术支持 · 信息传输采用金牌金融级加密
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ───────────────────────────────────────────────── */}
                {/* Tab 2: 消息（人机协同） */}
                {/* ───────────────────────────────────────────────── */}
                {activeTab === 'messages' && (
                  <motion.div
                    key="tab-messages"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col"
                    style={{ height: 'calc(600px - 28px - 24px - 56px)' }}
                  >
                    {/* 沉浸式页头 */}
                    <div className="bg-white border-b border-[#7C766B]/15 pt-4 pb-12 px-4 text-[#2B2620]">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[9px] text-[#2B2620]/60 font-bold">在线旅客沟通视窗</p>
                          <h3 className="text-base font-black text-[#2B2620] flex items-center gap-2">
                            会话 602
                            <span className={`text-[9px] px-2 py-0.5 rounded font-black ${
                              isIntervened ? 'bg-[#7C7466] text-white' : 'bg-[#D4AF37] text-black'
                            }`}>
                              {isIntervened ? '真人已接管' : 'AI自动分流托管'}
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* 聊天区域 */}
                    <div className="px-3 -mt-8 flex-1 flex flex-col overflow-hidden">
                      <div className="bg-white rounded-2xl border border-gray-100 flex-1 shadow-[0_4px_16px_rgba(43,38,32,0.05)] flex flex-col overflow-hidden p-3 relative">
                        {/* 聊天消息列表 */}
                        <div className="flex-1 overflow-y-auto space-y-2 pb-20">
                          {chatMessages.map((msg, index) => {
                            if (msg.sender === 'system') {
                              return (
                                <div key={msg.id} className="text-center my-2">
                                  <span className="inline-block py-1 px-2 bg-rose-50 text-rose-700 text-[9px] font-bold rounded-lg border border-rose-100 leading-relaxed">
                                    {msg.text}
                                  </span>
                                </div>
                              );
                            }

                            const isGuest = msg.sender === 'guest';
                            const isAi = msg.sender === 'ai';

                            return (
                              <div key={msg.id} className={`flex flex-col ${isGuest ? 'items-start' : 'items-end'}`}>
                                <div className="text-[8px] text-[#7C766B] mb-0.5 px-1">
                                  {isGuest ? '602住客' : isAi ? '🤖 智能管家 [AI托管]' : '我 (张师傅)'} · {msg.time}
                                </div>
                                <div className={`max-w-[85%] rounded-2xl px-2.5 py-1.5 text-[10px] leading-relaxed ${
                                  isGuest 
                                    ? 'bg-[#F2F4F9] text-[#2B2620] rounded-tl-none border border-[#7C766B]/10' 
                                    : isAi 
                                      ? 'bg-gray-50 text-[#7C766B] rounded-tr-none border border-gray-100'
                                      : 'bg-[#4A4438] text-white rounded-tr-none font-bold'
                                }`}>
                                  <p className="text-left">{msg.text}</p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={chatEndRef} />
                        </div>

                        {/* 人机协同红线拦截遮罩 */}
                        <AnimatePresence>
                          {step === 'escalate' && !isIntervened && (
                            <motion.div 
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute bottom-3 left-3 right-3 p-3 bg-[#FAF9F6] border border-rose-200 rounded-2xl text-center shadow-lg space-y-2 z-30"
                            >
                              <div className="space-y-1">
                                <h5 className="text-rose-600 font-extrabold text-[10px] flex items-center justify-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                                  ! AI 触发情感极值红线
                                </h5>
                                <p className="text-[9px] text-[#7C766B] leading-relaxed text-center">
                                  检测到住客情绪极值。AI已自动刹车阻断，请您立即一键接管！
                                </p>
                              </div>
                              <button
                                onClick={handleTakeover}
                                className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-black text-[10px] flex items-center justify-center gap-1.5 transition-all shadow-md"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                立即强行人工接管会话
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* 接管后的输入框 */}
                        {isIntervened && (
                          <motion.form 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSendTextMessage}
                            className="absolute bottom-3 left-3 right-3 p-2 bg-[#FAF9F6] border border-gray-100 rounded-xl flex items-center gap-2 z-20 shadow-inner"
                          >
                            <input 
                              type="text"
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                              placeholder="请输入您的人工解答文本..."
                              className="flex-1 bg-white border border-gray-200/60 rounded-xl px-3 py-1.5 text-[10px] text-[#2B2620] focus:outline-none focus:border-[#D4AF37]"
                            />
                            <button 
                              type="submit"
                              className="px-3 py-1.5 bg-[#7C7466] hover:bg-[#8F8778] text-white rounded-xl text-[10px] font-black flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              发送
                            </button>
                          </motion.form>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部导航栏 */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-40">
              {[
                { id: 'orders', label: '工单', icon: ClipboardList },
                { id: 'messages', label: '消息', icon: MessageSquare },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#7C766B]'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                    <span className={`text-[9px] mt-0.5 ${isActive ? 'font-black' : 'font-semibold'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/** Sandbox 03: OTA 浏览器插件兜底 (完整版) */
function OTACopilotSandbox() {
  // ─── 状态管理 ─────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState<'to_process' | 'new_follow_up' | 'archived'>('to_process');
  const [channelFilter, setChannelFilter] = useState<'all' | 'ctrip' | 'meituan' | 'wechat'>('all');
  const [selectedId, setSelectedId] = useState<string>('R-101');
  const [otaStep, setOtaStep] = useState<'idle' | 'blocked' | 'assist' | 'injected' | 'success'>('idle');
  const [replyText, setReplyText] = useState('');
  const [showFloatBall, setShowFloatBall] = useState(false);
  const [injectProgress, setInjectProgress] = useState(0);
  const [otaReplyInput, setOtaReplyInput] = useState('');
  const [otaRating, setOtaRating] = useState(5);
  const [codeLine, setCodeLine] = useState(0);

  // ─── 模拟评价数据 ─────────────────────────────────────
  const allReviews = [
    {
      id: 'R-101', channel: 'ctrip' as const, rating: 2,
      content: '602房间地毯有点潮，希望改进',
      reviewDate: '5小时前', replyStatus: 'unreplied' as const,
      sentimentAnalysis: [
        { text: '设备感受：负面 (房间潮气)', isPositive: false },
        { text: '服务态度：中性', isPositive: true }
      ],
      painPoints: [
        { text: '房间湿度：负面 (地毯潮湿)', isPositive: false },
        { text: '空气质感：负面 (异味)', isPositive: false }
      ]
    },
    {
      id: 'R-102', channel: 'meituan' as const, rating: 5,
      content: '酒店位置很好，服务也很热情！下次还来',
      reviewDate: '2小时前', replyStatus: 'replied' as const,
      sentimentAnalysis: [
        { text: '服务体验：正面 (热情周到)', isPositive: true },
        { text: '位置便利：正面', isPositive: true }
      ],
      painPoints: [
        { text: '服务热忱：正面', isPositive: true }
      ]
    },
    {
      id: 'R-103', channel: 'wechat' as const, rating: 4,
      content: '早餐不错，床也很舒服',
      reviewDate: '1天前', replyStatus: 'unreplied' as const,
      sentimentAnalysis: [
        { text: '餐饮品质：正面', isPositive: true },
        { text: '床品舒适：正面', isPositive: true }
      ],
      painPoints: [
        { text: '餐饮富集度：正面', isPositive: true }
      ]
    },
  ];

  const filteredReviews = allReviews.filter(r => {
    const catMatch = activeCategory === 'to_process' ? r.replyStatus !== 'replied' : activeCategory === 'archived' ? r.replyStatus === 'replied' : true;
    const chMatch = channelFilter === 'all' || r.channel === channelFilter;
    return catMatch && chMatch;
  });

  const activeReview = allReviews.find(r => r.id === selectedId) || allReviews[0];

  // ─── 辅助函数 ─────────────────────────────────────
  const getCount = (cat: 'to_process' | 'new_follow_up' | 'archived') => {
    if (cat === 'to_process') return allReviews.filter(r => r.replyStatus !== 'replied').length;
    if (cat === 'archived') return allReviews.filter(r => r.replyStatus === 'replied').length;
    return 0;
  };

  const getChannelShortName = (ch: 'ctrip' | 'meituan' | 'wechat') => {
    const map: Record<string, string> = { ctrip: '携程', meituan: '美团', wechat: '微信' };
    return map[ch] || ch;
  };

  const getChannelBadgeColor = (ch: 'ctrip' | 'meituan' | 'wechat') => {
    const map: Record<string, string> = { ctrip: 'bg-blue-600 text-white', meituan: 'bg-amber-400 text-black', wechat: 'bg-emerald-600 text-white' };
    return map[ch] || 'bg-zinc-200 text-zinc-700';
  };

  // ─── 交互处理 ─────────────────────────────────────
  // 点击"一键审核回传 OTA" → 模拟 403 拦截
  const handleAuditSubmit = () => {
    if (otaStep !== 'idle') return;
    setOtaStep('blocked');
    // 800ms 后显示受阻状态
    setTimeout(() => {
      // 阻塞状态已设置
    }, 800);
  };

  // 点击悬浮球展开
  const handleFloatBallClick = () => {
    setShowFloatBall(!showFloatBall);
  };

  // 点击"一键注入" → 显示伪代码动画
  const handleInject = () => {
    if (otaStep !== 'blocked') return;
    setOtaStep('assist');
    setInjectProgress(0);
    setCodeLine(0);

    const approvedReply = '感谢您选择我们酒店，很抱歉给您带来不愉快的体验。我们已将您的反馈转达给客房部，602房间已安排深度清洁和除湿处理。如有任何需要，欢迎随时联系前台。我们期待再次为您服务，祝您旅途愉快！';
    setReplyText(approvedReply);

    // 伪代码逐行显示动画（总时长 1500ms）
    const codeLines = [
      '// 模拟伪代码',
      "const input = document.querySelector('.ota-reply-input');",
      `input.value = '${approvedReply.slice(0, 20)}...';`,
      "input.dispatchEvent(new Event('input', { bubbles: true }));"
    ];

    let currentLine = 0;
    const lineInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setCodeLine(currentLine + 1);
        setInjectProgress(Math.round(((currentLine + 1) / codeLines.length) * 100));
        currentLine++;
      } else {
        clearInterval(lineInterval);
        // 动画完成，注入文本
        setOtaStep('injected');
        setOtaReplyInput(approvedReply);
        setTimeout(() => {
          setShowFloatBall(false);
          setOtaStep('success');
        }, 500);
      }
    }, 375); // 1500ms / 4 行
  };

  // ─── 渲染 ─────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      {/* ─── 上半部分：B 端后台评价聚合流 ─── */}
      <div className="flex gap-3">
        {/* 左侧 35%: 评价列表 */}
        <div className="w-[35%] bg-white border border-[#EFECE6] rounded-xl overflow-hidden shrink-0">
          {/* Tab 选择行 */}
          <div className="grid grid-cols-3 border-b border-[#EFECE6] bg-[#FAF8F5]">
            {[
              { key: 'to_process', label: '待处理' },
              { key: 'new_follow_up', label: '新回复追评' },
              { key: 'archived', label: '已归档历史' },
            ].map(tab => {
              const isTabActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`py-3 px-1 text-[10.5px] font-medium transition-all duration-150 border-b-2 cursor-pointer text-center ${
                    isTabActive ? 'text-[#2B2620] font-bold bg-white border-b-[#D4AF37]' : 'text-[#7C766B] border-b-transparent hover:bg-white/[0.4]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {tab.label}
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${isTabActive ? 'bg-[#2B2620] text-white font-bold' : 'bg-neutral-200/60 text-[#7C766B]'}`}>
                      {getCount(tab.key as any)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* OTA 频道快速筛选 Pills */}
          <div className="px-3 py-2 border-b border-[#EFECE6] bg-[#FAF8F5]/50 flex gap-1.5 flex-wrap">
            {[
              { id: 'all', label: '全部' },
              { id: 'ctrip', label: '携程' },
              { id: 'meituan', label: '美团' },
              { id: 'wechat', label: '微信' },
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setChannelFilter(pill.id as any)}
                className={`text-[9.5px] px-2.5 py-0.5 rounded-full border transition cursor-pointer ${
                  channelFilter === pill.id
                    ? 'bg-[#FAF8F5] border-[#D4AF37] text-[#B59410] font-bold shadow-2xs'
                    : 'bg-white text-[#7C766B] border-[#EFECE6] hover:bg-[#FAF8F5]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* 评价列表 */}
          <div className="max-h-[280px] overflow-y-auto divide-y divide-[#EFECE6]">
            {filteredReviews.map(rev => {
              const isSelected = rev.id === activeReview?.id;
              const isNegative = rev.rating <= 2;
              return (
                <div
                  key={rev.id}
                  onClick={() => { setSelectedId(rev.id); setOtaStep('idle'); }}
                  className={`p-3 transition-all duration-150 cursor-pointer relative ${
                    isSelected ? 'bg-[#FAF8F5] border-l-2 border-l-[#D4AF37]' : 'bg-white hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-xs font-black tracking-wide font-sans ${getChannelBadgeColor(rev.channel)}`}>
                        {getChannelShortName(rev.channel)}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7C766B] font-mono">{rev.reviewDate}</span>
                  </div>

                  {/* 星级评分 */}
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-[9.5px] font-mono text-[#7C766B]/80 ml-1 font-bold">{rev.rating}.0 分</span>
                  </div>

                  <p className="text-[10.5px] text-[#7C766B] truncate pl-1.5 border-l border-[#EFECE6]/80 mb-1.5 font-sans">{rev.content}</p>

                  <div className="flex items-center justify-between h-4">
                    {isNegative ? (
                      <span className="bg-[#FFEBEE] text-[#C62828] text-[8.5px] font-bold px-1.5 py-0.2 border border-red-100 flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-red-600 animate-ping"></span>红线高危拦截
                      </span>
                    ) : (
                      <span className="bg-[#E8F5E9] text-[#2E7D32] text-[8.5px] font-bold px-1.5 py-0.2 border border-emerald-150">正面资产</span>
                    )}
                  </div>

                  {isSelected && <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2.5 w-4 h-4 text-[#D4AF37]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧 65%: 评价详情 */}
        <div className="w-[65%] bg-white border border-[#EFECE6] rounded-xl flex flex-col justify-between overflow-hidden shrink-0">
          {/* 详情 Header */}
          <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#EFECE6] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans bg-[#2B2620] text-[#D4AF37] px-2 py-0.3 font-bold rounded-xs tracking-wider">
                {getChannelShortName(activeReview.channel)}
              </span>
              <span className="text-[12px] font-bold text-[#2B2620]">{activeReview.content.slice(0, 15)}...</span>
            </div>
            {activeReview.rating <= 2 ? (
              <span className="bg-[#FFEBEE] text-[#C62828] text-[10px] font-bold px-3 py-1 border border-red-200 flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#C62828]"></span>高风险舆情预警
              </span>
            ) : (
              <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-3 py-1 border border-emerald-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>低风险合规
              </span>
            )}
          </div>

          {/* 滚动内容区 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* 原评价卡片 */}
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10.5px] font-bold text-[#2B2620] uppercase tracking-wide font-sans">客人评价原声</span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < activeReview.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-[11.5px] leading-relaxed text-[#2B2620] font-sans pl-3 border-l-2 border-[#D4AF37]/40">
                "{activeReview.content}"
              </p>
            </div>

            {/* 双轨解析面板 */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="border border-[#EFECE6] bg-white p-3 rounded-xl">
                <span className="text-[9px] text-[#7C766B] uppercase font-mono block mb-2 tracking-wider font-bold">语义情绪分析</span>
                <div className="space-y-1.5">
                  {activeReview.sentimentAnalysis.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between text-[10px] p-1.5 border rounded-lg ${
                      item.isPositive ? 'bg-[#E8F5E9] text-[#2E7D32] border-emerald-100' : 'bg-[#FFEBEE] text-[#C62828] border-red-100'
                    }`}>
                      <span className="font-semibold flex items-center gap-1 font-sans">
                        {item.isPositive ? '✓' : '✗'} {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-[#EFECE6] bg-white p-3 rounded-xl">
                <span className="text-[9px] text-[#7C766B] uppercase font-mono block mb-2 tracking-wider font-bold">核心痛点识别</span>
                <div className="space-y-1.5">
                  {activeReview.painPoints.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between text-[10px] p-1.5 border rounded-lg ${
                      item.isPositive ? 'bg-[#E8F5E9] text-[#2E7D32] border-emerald-100' : 'bg-[#FFEBEE] text-[#C62828] border-red-100'
                    }`}>
                      <span className="font-semibold flex items-center gap-1 font-sans">
                        {item.isPositive ? '✦' : '⚠'} {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI 回复草稿 */}
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10.5px] font-bold text-[#2B2620] uppercase font-sans">AI 回复草稿</span>
              </div>
              <div className="w-full text-[11.5px] p-3 text-[#2B2620] leading-relaxed bg-white border border-[#EFECE6] rounded-xl font-sans min-h-[80px] whitespace-pre-wrap">
                {replyText || '（点击下方按钮生成回复草稿）'}
              </div>
            </div>
          </div>

          {/* 底部固定操作栏 */}
          <div className="p-3 bg-[#FAF8F5] border-t border-[#EFECE6] flex items-center justify-between shrink-0">
            <div className="text-[9.5px] text-[#7C766B] font-mono flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#7C766B]" />
              安全网关：InnoStay-Shield-Proxy 已启用
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleAuditSubmit}
                disabled={otaStep !== 'idle'}
                className={`px-4 py-2 text-[10.5px] font-bold rounded-full flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ${
                  otaStep === 'idle'
                    ? 'bg-[#D4AF37] hover:bg-[#B59410] text-white'
                    : otaStep === 'blocked'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-500 text-white cursor-not-allowed'
                }`}
              >
                {otaStep === 'idle' ? (
                  <><Send className="w-3.5 h-3.5" />一键审核回传 OTA</>
                ) : otaStep === 'blocked' ? (
                  <><AlertCircle className="w-3.5 h-3.5" />回传受阻，请通过插件协助</>
                ) : (
                  <><CheckCircle2 className="w-3.5 h-3.5" />回传成功</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 下半部分：OTA 订单评价 DOM 页面模拟 ─── */}
      <div className="relative bg-white border border-[#EFECE6] rounded-xl overflow-hidden">
        {/* 页面头部 */}
        <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#EFECE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-[#2B2620]">知宿精选酒店（杭州西湖店）</span>
            <span className="text-[10px] text-[#7C766B] font-mono">订单号：CT2024031512345678</span>
          </div>
          <span className="text-[9px] bg-[#2B2620] text-[#D4AF37] px-2 py-0.5 rounded-xs font-bold">模拟携程后台</span>
        </div>

        {/* 评价输入区域 */}
        <div className="p-6">
          <div className="mb-4">
            <label className="text-[10px] text-[#7C766B] font-bold mb-2 block">整体评分</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOtaRating(i + 1)}
                  className="p-1 cursor-pointer transition hover:scale-110"
                >
                  <Star className={`w-6 h-6 ${i < otaRating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-200'}`} />
                </button>
              ))}
              <span className="ml-2 text-[12px] font-bold text-[#2B2620]">{otaRating}.0 分</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[10px] text-[#7C766B] font-bold mb-2 block">回复内容</label>
            <textarea
              value={otaReplyInput}
              onChange={(e) => setOtaReplyInput(e.target.value)}
              className="ota-reply-input w-full text-[11px] p-3 text-[#2B2620] leading-relaxed bg-white border border-[#EFECE6] rounded-xl resize-none font-sans min-h-[100px] focus:outline-none focus:border-[#D4AF37] transition"
              placeholder="请输入您的回复内容..."
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-[#D4AF37] hover:bg-[#B59410] text-white text-[10.5px] font-bold rounded-full flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm">
              <Send className="w-3.5 h-3.5" />提交回复
            </button>
          </div>
        </div>

        {/* ─── 知宿 AI 悬浮球 ─── */}
        {otaStep === 'blocked' && (
          <>
            {/* 悬浮球 */}
            <button
              onClick={handleFloatBallClick}
              className={`absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#2B2620] text-[#D4AF37] font-bold text-[16px] shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 ${
                showFloatBall ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              知
            </button>

            {/* 展开面板 */}
            {showFloatBall && (
              <div className="absolute bottom-6 right-6 w-80 bg-white border-2 border-[#D4AF37] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* 头部 */}
                <div className="px-4 py-3 bg-[#2B2620] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#2B2620] font-bold text-[12px] flex items-center justify-center">知</div>
                    <span className="text-[11px] font-bold text-white">知宿 AI 助手</span>
                  </div>
                  <button
                    onClick={() => setShowFloatBall(false)}
                    className="text-[#7C766B] hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 内容区 */}
                <div className="p-4">
                  <div className="text-[10px] text-[#7C766B] font-bold mb-2">已审核回复草稿</div>
                  <div className="text-[11px] text-[#2B2620] leading-relaxed bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-3 mb-4 max-h-[150px] overflow-y-auto">
                    {replyText || '感谢您选择我们酒店，很抱歉给您带来不愉快的体验。我们已将您的反馈转达给客房部，602房间已安排深度清洁和除湿处理。如有任何需要，欢迎随时联系前台。我们期待再次为您服务，祝您旅途愉快！'}
                  </div>

                  {/* 伪代码执行动画 */}
                  {otaStep === 'assist' && (
                    <div className="mb-4 bg-[#2B2620] rounded-lg p-3 font-mono text-[10px] text-emerald-400">
                      <div className="text-[#7C766B] text-[9px] mb-2">正在执行 DOM 注入...</div>
                      <div className="space-y-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className={`transition-all duration-300 ${i < codeLine ? 'opacity-100' : 'opacity-30'}`}>
                            {i === 0 && '// 模拟伪代码'}
                            {i === 1 && "const input = document.querySelector('.ota-reply-input');"}
                            {i === 2 && "input.value = '感谢您选择...';"}
                            {i === 3 && "input.dispatchEvent(new Event('input', { bubbles: true }));"}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 bg-[#FAF8F5] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#D4AF37] transition-all duration-300"
                          style={{ width: `${injectProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 按钮 */}
                  <button
                    onClick={handleInject}
                    disabled={otaStep !== 'blocked' && otaStep !== 'assist'}
                    className={`w-full py-2.5 text-[10.5px] font-bold rounded-full flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ${
                      otaStep === 'blocked'
                        ? 'bg-[#D4AF37] hover:bg-[#B59410] text-white'
                        : otaStep === 'assist'
                        ? 'bg-amber-500 text-white cursor-wait'
                        : 'bg-emerald-500 text-white cursor-not-allowed'
                    }`}
                  >
                    {otaStep === 'blocked' ? (
                      <><Sparkles className="w-3.5 h-3.5" />一键注入</>
                    ) : otaStep === 'assist' ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" />注入中...</>
                    ) : (
                      <><CheckCircle2 className="w-3.5 h-3.5" />注入成功</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* 成功提示 */}
        {otaStep === 'success' && (
          <div className="absolute bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
            <CheckCircle2 className="w-4 h-4" />
            注入成功！文本已填入输入框
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Original Detail View (unchanged for other projects) ─────────────────────

function OriginalDetailView({ project, item, categoryName, onClose }: {
  project: Project;
  item: ProjectDetailsItem;
  categoryName: string;
  onClose: () => void;
}) {
  const displaySubtitle = item.valueStatement || project.subtitle;
  const chipsList = item.tags.slice(0, 3);
  const businessValTags = item.tags.slice(3, 5).length > 0 ? item.tags.slice(3, 5) : ["品质追溯", "降本增效"];
  const pmRoles = ["主导产品规划", "0到1自研", "资深PM"];

  const getRecommendations = () => {
    if (item && item.recommendations && item.recommendations.length > 0) {
      const list: Project[] = [];
      for (const recId of item.recommendations) {
        const found = CATEGORIES.flatMap(c => c.projects).find(p => p.id === recId);
        if (found) list.push(found);
      }
      if (list.length >= 2) return list;
    }
    const category = CATEGORIES.find(c => c.projects.some(p => p.id === project.id));
    if (!category) return [];
    let sameFamily = category.projects.filter(p => p.id !== project.id);
    if (sameFamily.length >= 2) return sameFamily.slice(0, 2);
    let list = [...sameFamily];
    for (const cat of CATEGORIES) {
      if (cat.id !== category.id) {
        for (const p of cat.projects) {
          if (!list.some(existing => existing.id === p.id) && p.id !== project.id) {
            list.push(p);
            if (list.length >= 2) return list;
          }
        }
      }
    }
    return list.slice(0, 2);
  };

  const recommendations = getRecommendations();

  return (
    <>
      {/* Header */}
      <div className="pt-24 border-b border-zinc-100 pb-8 bg-white">
        <div className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 pl-0.5">
          <span>返回首页</span>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-505 font-black text-emerald-600">{item.category || categoryName}</span>
        </div>
        <h3 className="text-2xl sm:text-3.5xl font-black tracking-tight text-zinc-950 leading-none">
          {item.title || project.title}
        </h3>
        <p className="text-sm font-semibold text-zinc-650 mt-3 border-l-2 border-emerald-500 pl-3 leading-relaxed">
          [定义与价值命题] {displaySubtitle}
        </p>
        <div className="flex flex-wrap items-center gap-y-3 gap-x-2.5 border-t border-b border-zinc-100 py-4.5 mt-6">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-400 mr-1">// 技术选型:</span>
            {chipsList.map((tag, idx) => (
              <span key={idx} className="bg-zinc-100 text-zinc-750 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded">#{tag}</span>
            ))}
          </div>
          <div className="hidden sm:block h-4.5 w-[1px] bg-zinc-200 mx-1" />
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-400 mr-1">// 效能价值:</span>
            {businessValTags.map((val, idx) => (
              <span key={idx} className="border border-emerald-250 bg-emerald-50/60 text-emerald-850 text-[10px] font-bold px-2.5 py-0.5 rounded">{val}</span>
            ))}
          </div>
          <div className="hidden sm:block h-4.5 w-[1px] bg-zinc-200 mx-1" />
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-400 mr-1">// PM角色:</span>
            {pmRoles.slice(0, 2).map((role, idx) => (
              <span key={idx} className="bg-[#0A0A0C] text-zinc-100 text-[10.5px] font-bold px-2 py-0.5 rounded">{role}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sys Architecture */}
      <div className="mt-8 space-y-3">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block pl-0.5">
          // MEDIA ARCHITECTURE FOCUS / 系统数据架构流转拓扑
        </span>
        <div className="w-full aspect-[16/10] sm:aspect-[16/7.5] bg-[#0A0A0C] text-zinc-200 rounded-3xl border border-zinc-800 p-5 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-emerald-400" />
              <span className="text-[9.5px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">Data Path Pipeline</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>FLOW SECURE</span>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-1.5 z-10 my-auto py-2">
            {project.sysArchitecture.nodes.map((node, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center w-full sm:w-auto relative">
                {i > 0 && (
                  <div className="hidden sm:flex items-center justify-center w-6 lg:w-8 shrink-0">
                    <div className="w-full h-[1px] border-t border-dashed border-zinc-800" />
                    <ArrowRight className="h-3 w-3 text-emerald-500 absolute right-0" />
                  </div>
                )}
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl w-full sm:w-28 md:w-32 text-center relative shadow-sm">
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-zinc-900 border border-zinc-800 text-[8.5px] font-mono flex items-center justify-center text-zinc-500 font-bold">{i+1}</div>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">NODE_0{i+1}</span>
                  <span className="text-[9.5px] font-bold text-zinc-250 block truncate">{node}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 text-zinc-300 rounded-2xl z-10 text-xs font-sans flex items-start gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-normal">
              <span className="font-mono text-zinc-400 font-bold block sm:inline mr-1">// 数据流转说明:</span>
              {project.sysArchitecture.flowDescription}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Dissection Blocks */}
      <div className="mt-12 space-y-8">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block pl-0.5">
          // THE 6 SYSTEMATIC DISSECTION BLOCKS
        </span>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-orange-500" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【1. 背景与痛点】</h4>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed font-sans pl-1">{item.blocks.bg}</p>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-emerald-505" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【2. 产品形态与技术方案】</h4>
          </div>
          <div className="border border-zinc-200/80 bg-white p-4.5 rounded-2xl pl-1 space-y-3">
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 font-bold pl-0.5 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>BluePrint: {project.blueprintTitle || "系统架构方案"}</span>
            </div>
            <p className="text-[12.5px] text-zinc-550 leading-relaxed font-sans pl-0.5">{item.blocks.tech}</p>
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【3. 我的角色与贡献】</h4>
          </div>
          <div className="space-y-3.5 pl-1">
            <p className="text-sm font-semibold text-zinc-800 leading-relaxed">{item.blocks.role}</p>
            <div className="space-y-2 border-t border-zinc-150 pt-3">
              <div className="flex gap-2 text-xs leading-relaxed text-zinc-500">
                <span className="font-mono text-emerald-600 text-xs font-bold shrink-0 mt-0.5">[01]</span>
                <span>作为核心项目主导人，全面把控功能矩阵落地、打通过程对碰及能效/安防闭环规则设计。</span>
              </div>
              <div className="flex gap-2 text-xs leading-relaxed text-zinc-505">
                <span className="font-mono text-emerald-600 text-xs font-bold shrink-0 mt-0.5">[02]</span>
                <span>主导并协调软硬研发、算法研发，定义并落地标准的高置信度级联过滤和安全退出机制。</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【4. 核心亮点 / 难点攻克】</h4>
          </div>
          <div className="space-y-4 pl-1">
            <div className="border-l-2 border-amber-500/30 pl-4 py-0.5 bg-white p-4 rounded-r-2xl border-t border-b border-r border-zinc-100">
              <span className="text-xs font-bold text-zinc-850 flex items-start gap-1 font-sans leading-relaxed">
                <span className="text-amber-500 font-mono text-[10.5px]">HIGHLIGHT:</span>
                <span>{item.blocks.highlights}</span>
              </span>
            </div>
            {project.sysArchitecture.keyChallenges.map((challenge, idx) => {
              const parts = challenge.split("？");
              const problem = parts[0];
              const solution = parts.slice(1).join("？");
              return (
                <div key={idx} className="space-y-1.5 border-l-2 border-amber-500/20 pl-4 py-0.5 bg-white p-4 rounded-r-2xl border-t border-b border-r border-zinc-100/65">
                  <span className="text-xs font-bold text-zinc-800 flex items-start gap-1 font-sans leading-relaxed">
                    <span className="text-amber-500 font-mono text-[10.5px]">Q_0{idx+1}:</span>
                    <span>{problem}？</span>
                  </span>
                  <p className="text-[11.5px] text-zinc-500 font-sans leading-relaxed mt-1">
                    <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-wider block mb-0.5">SOLUTION BLUEPRINT</span>
                    {solution}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【5. 量化成果】</h4>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed mb-4 pl-1 font-sans">{item.blocks.metrics}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pl-1">
            {project.metrics.map((metricItem, idx) => (
              <div key={idx} className="bg-white border border-zinc-200/80 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] font-sans font-semibold text-zinc-400 block leading-tight mb-2 uppercase">{metricItem.label}</span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950 font-mono tracking-tight block">{metricItem.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/65">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="h-2 w-2 rounded-full bg-zinc-700" />
            <h4 className="text-xs font-black tracking-widest uppercase text-zinc-900">【6. 相关链接与演示】</h4>
          </div>
          <div className="flex flex-wrap gap-2.5 pl-1">
            {item.blocks.links.map((linkName, idx) => (
              <div key={idx} className="font-mono text-[10.5px] bg-[#0A0A0C] text-zinc-200 px-4 py-2.5 rounded-xl border border-zinc-850 flex items-center gap-2 cursor-pointer select-none hover:bg-zinc-900 hover:border-zinc-750 transition">
                <FileText className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>[{linkName}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="border-t border-zinc-200/80 pt-8 mt-12 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-4.5 w-4.5 text-zinc-600 shrink-0" />
            <h4 className="text-sm font-black tracking-tight text-zinc-950">其他项目推荐</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((recProject) => (
              <div
                key={recProject.id}
                onClick={onClose}
                className="group bg-white border border-zinc-200/80 hover:border-zinc-900 p-4 rounded-3xl cursor-pointer transition-all duration-300 shadow-xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-zinc-400 block mb-1 uppercase">RELATED</span>
                  <h5 className="text-sm font-black text-zinc-900 group-hover:text-emerald-700 transition-colors">{recProject.title}</h5>
                  <p className="text-xs text-zinc-505 mt-1 line-clamp-2 leading-relaxed">{recProject.subtitle}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-150">
                  <span className="text-[9.5px] font-mono text-zinc-400 uppercase">VIEW SPEC_</span>
                  <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Yuntian (云天系统) Sandbox Components ────────────────────────────────────

/** 沙盒 01: AI 根因分析 */
function YuntianRootCauseSandbox() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState(0);

  // 告警数据
  const alarms = [
    { id: 1, title: 'UPS输入电压异常', location: '2号配电室', level: 'critical', time: '13:24:18' },
    { id: 2, title: '蓄电池温度超限', location: '电池室A区', level: 'warning', time: '13:24:35' },
    { id: 3, title: '变压器负载预警', location: '3号变压器', level: 'warning', time: '13:25:02' },
  ];

  // 告警轮播动画
  useEffect(() => {
    if (!isAnalyzing && !showResult) {
      const timer = setInterval(() => {
        setActiveAlarm(prev => (prev + 1) % alarms.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isAnalyzing, showResult, alarms.length]);

  // 开始分析
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setProgress(0);

    // 模拟进度条
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="space-y-4">
      {/* 上方：3D 暖通/配电组态故障视窗 */}
      <div className="bg-[#0f1115] rounded-2xl p-4 border border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
              实时告警视窗 / ACTIVE ALARMS
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>3 个活跃告警</span>
          </div>
        </div>

        {/* 告警卡片列表 */}
        <div className="space-y-2">
          {alarms.map((alarm, idx) => (
            <div
              key={alarm.id}
              className={`p-3 rounded-xl border transition-all duration-500 ${
                idx === activeAlarm && !showResult
                  ? 'bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : 'bg-zinc-900/50 border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    alarm.level === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                  }`} />
                  <span className="text-[11px] font-bold text-zinc-100">{alarm.title}</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500">{alarm.time}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-400">
                <MapPin className="w-3 h-3" />
                <span>{alarm.location}</span>
                {alarm.level === 'critical' && (
                  <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-[9px] font-bold">CRITICAL</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 模拟 3D 组态简图 */}
        <div className="mt-3 p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
          <div className="grid grid-cols-3 gap-2">
            {['UPS-01', 'UPS-02', 'UPS-03'].map((ups, i) => (
              <div key={ups} className={`p-2 rounded-lg text-center ${
                i === 1 ? 'bg-red-500/20 border border-red-500/30' : 'bg-zinc-800/50 border border-zinc-700/30'
              }`}>
                <Power className={`w-4 h-4 mx-auto mb-1 ${i === 1 ? 'text-red-400' : 'text-zinc-500'}`} />
                <span className="text-[9px] font-mono text-zinc-400">{ups}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下方：云天 AI 诊断命令行 */}
      <div className="bg-[#0f1115] rounded-2xl p-4 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            云天大脑 / AI ROOT CAUSE ANALYSIS
          </span>
        </div>

        {/* 分析按钮 */}
        {!isAnalyzing && !showResult && (
          <button
            onClick={handleAnalyze}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            启动 AI 根因分析
          </button>
        )}

        {/* 进度条 */}
        {isAnalyzing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
              <span>正在降噪分析中...</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              已处理 2,847 条时序数据 · 降噪率 92.3%
            </div>
          </div>
        )}

        {/* 分析结果 */}
        {showResult && (
          <div className="space-y-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <div className="text-[11px] font-mono space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">[云天大脑]</span>
                  <span className="text-zinc-200">根因锁定：<span className="text-emerald-400 font-bold">3号配电柜空气开关跳闸</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">[影响评估]</span>
                  <span className="text-zinc-300">已关联影响2号UPS群组</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold shrink-0">[建议操作]</span>
                  <span className="text-zinc-300">执行SOP维保流程</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
n                onClick={() => setShowResult(false)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-[10px] rounded-lg transition cursor-pointer"
              >
                重新分析
              </button>
              <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition cursor-pointer">
                生成工单
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** 沙盒 02: PUE 优化大师与 CLF 智冷顾问 */
function YuntianPUESandbox() {
  const [temperature, setTemperature] = useState(28);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [currentPUE, setCurrentPUE] = useState(1.48);

  // 计算 PUE 变化
  useEffect(() => {
    if (aiEnabled) {
      // AI 开启后 PUE 下降
      const targetPUE = 1.22 - (temperature - 28) * 0.005; // 温度越高，PUE 略微上升但仍在优化范围
      setCurrentPUE(Math.max(1.18, targetPUE));
    } else {
      // AI 关闭时 PUE 较高
      const targetPUE = 1.45 + (temperature - 28) * 0.01;
      setCurrentPUE(Math.min(1.60, targetPUE));
    }
  }, [temperature, aiEnabled]);

  // 年节能百分比
  const savingPercent = aiEnabled ? Math.round((1.50 - currentPUE) / 1.50 * 100 + 5) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：能效走势动态仪表盘 */}
      <div className="bg-[#0f1115] rounded-2xl p-4 border border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            能效仪表盘 / PUE MONITOR
          </span>
        </div>

        {/* PUE 主数值显示 */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            {/* 圆形仪表背景 */}
            <div className="w-32 h-32 rounded-full border-4 border-zinc-800 flex items-center justify-center relative">
              {/* 进度环 */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke={aiEnabled ? '#10b981' : '#ef4444'}
                  strokeWidth="4"
                  strokeDasharray={`${(currentPUE / 2) * 364} 364`}
                  className="transition-all duration-500"
                />
              </svg>
              {/* 数值 */}
              <div className="text-center">
                <div className={`text-3xl font-black font-mono ${aiEnabled ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentPUE.toFixed(2)}
                </div>
                <div className="text-[9px] font-mono text-zinc-500">PUE</div>
              </div>
            </div>
          </div>
        </div>

        {/* CLF 基线 */}
        <div className="p-2 bg-zinc-900/50 rounded-lg mb-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">CLF 基线</span>
            <span className="font-mono text-amber-400 font-bold">0.42</span>
          </div>
        </div>

        {/* 折线图模拟 - 24小时能效走势 */}
        <div className="p-3 bg-zinc-900/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono text-zinc-500">能效走势对比（24h）</span>
            <div className="flex items-center gap-3 text-[8px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />传统制冷
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />AI优化
              </span>
            </div>
          </div>
          
          {/* Y轴标签 */}
          <div className="flex">
            <div className="flex flex-col justify-between text-[7px] font-mono text-zinc-600 pr-2 py-1">
              <span>1.6</span>
              <span>1.4</span>
              <span>1.2</span>
              <span>1.0</span>
            </div>
            
            {/* 图表区域 */}
            <div className="flex-1 relative h-32 border-l border-b border-zinc-700">
              {/* 网格线 */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-zinc-800" />
                <div className="border-t border-zinc-800" />
                <div className="border-t border-zinc-800" />
                <div className="border-t border-zinc-800" />
              </div>
              
              {/* 传统制冷折线（PUE 1.45-1.55） */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  points={`
                    0%,${100 - (aiEnabled ? 62 : 72)}%
                    8.3%,${100 - (aiEnabled ? 58 : 68)}%
                    16.6%,${100 - (aiEnabled ? 55 : 65)}%
                    25%,${100 - (aiEnabled ? 60 : 70)}%
                    33.3%,${100 - (aiEnabled ? 65 : 75)}%
                    41.6%,${100 - (aiEnabled ? 68 : 78)}%
                    50%,${100 - (aiEnabled ? 70 : 80)}%
                    58.3%,${100 - (aiEnabled ? 68 : 78)}%
                    66.6%,${100 - (aiEnabled ? 65 : 75)}%
                    75%,${100 - (aiEnabled ? 60 : 70)}%
                    83.3%,${100 - (aiEnabled ? 58 : 68)}%
                    91.6%,${100 - (aiEnabled ? 55 : 65)}%
                    100%,${100 - (aiEnabled ? 62 : 72)}%
                  `}
                  className="transition-all duration-500"
                />
                {/* AI优化折线（PUE 1.18-1.28） */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeOpacity="0.9"
                  points={`
                    0%,${100 - (aiEnabled ? 40 : 10)}%
                    8.3%,${100 - (aiEnabled ? 38 : 10)}%
                    16.6%,${100 - (aiEnabled ? 35 : 10)}%
                    25%,${100 - (aiEnabled ? 40 : 10)}%
                    33.3%,${100 - (aiEnabled ? 45 : 10)}%
                    41.6%,${100 - (aiEnabled ? 48 : 10)}%
                    50%,${100 - (aiEnabled ? 50 : 10)}%
                    58.3%,${100 - (aiEnabled ? 48 : 10)}%
                    66.6%,${100 - (aiEnabled ? 45 : 10)}%
                    75%,${100 - (aiEnabled ? 40 : 10)}%
                    83.3%,${100 - (aiEnabled ? 38 : 10)}%
                    91.6%,${100 - (aiEnabled ? 35 : 10)}%
                    100%,${100 - (aiEnabled ? 40 : 10)}%
                  `}
                  className="transition-all duration-500"
                />
              </svg>
              
              {/* 节能区域填充 */}
              {aiEnabled && (
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="savingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#savingGradient)"
                    points={`
                      0%,${100 - 40}% 8.3%,${100 - 38}% 16.6%,${100 - 35}% 25%,${100 - 40}% 33.3%,${100 - 45}% 41.6%,${100 - 48}% 50%,${100 - 50}% 58.3%,${100 - 48}% 66.6%,${100 - 45}% 75%,${100 - 40}% 83.3%,${100 - 38}% 91.6%,${100 - 35}% 100%,${100 - 40}% 100%,${100 - 62}% 91.6%,${100 - 55}% 83.3%,${100 - 58}% 75%,${100 - 60}% 66.6%,${100 - 65}% 58.3%,${100 - 68}% 50%,${100 - 70}% 41.6%,${100 - 68}% 33.3%,${100 - 65}% 25%,${100 - 60}% 16.6%,${100 - 55}% 8.3%,${100 - 58}% 0%,${100 - 62}%
                    `}
                    className="transition-all duration-500"
                  />
                </svg>
              )}
              
              {/* 当前时刻指示器 */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-amber-400 opacity-70" />
            </div>
          </div>
          
          {/* X轴时间标签 */}
          <div className="flex justify-between mt-1 pl-6 text-[7px] font-mono text-zinc-600">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>24:00</span>
          </div>
          
          {/* PUE数值标注 */}
          <div className="flex justify-between mt-2 text-[8px] font-mono">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="text-red-400">传统: {aiEnabled ? '1.45-1.55' : '1.50-1.58'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-400">AI: {aiEnabled ? '1.18-1.28' : '-'}</span>
            </div>
            {aiEnabled && (
              <div className="text-amber-400 font-bold">
                节能 {Math.round((1.50 - currentPUE) / 1.50 * 100)}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右侧：控制面板 */}
      <div className="space-y-4">
        {/* 温度滑块 */}
        <div className="bg-white rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-bold text-zinc-800">外部环境温度</span>
            </div>
            <span className="text-lg font-black font-mono text-amber-600">{temperature}°C</span>
          </div>
          <input
            type="range"
            min="28"
            max="38"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
            <span>28°C</span>
            <span>38°C</span>
          </div>
        </div>

        {/* AI 节能优化开关 */}
        <div className="bg-white rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-zinc-800">AI 节能优化</span>
            </div>
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                aiEnabled ? 'bg-emerald-500' : 'bg-zinc-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
                  aiEnabled ? 'left-8' : 'left-1'
                }`}
              />
            </button>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">
            {aiEnabled ? 'AI 正在智能调优制冷策略...' : '关闭状态，使用传统制冷模式'}
          </p>
        </div>

        {/* 效果展示 */}
        <div className={`rounded-xl p-4 border ${
          aiEnabled ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {aiEnabled ? (
              <TrendingDown className="w-4 h-4 text-emerald-600" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-[11px] font-bold ${
              aiEnabled ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {aiEnabled ? 'AI 优化生效中' : '未开启 AI 优化'}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className={aiEnabled ? 'text-emerald-600' : 'text-red-600'}>当前 PUE</span>
              <span className={`font-mono font-bold ${
                aiEnabled ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {currentPUE.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className={aiEnabled ? 'text-emerald-600' : 'text-red-600'}>目标 PUE</span>
              <span className={`font-mono font-bold ${
                aiEnabled ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {aiEnabled ? '< 1.22' : '1.50'}
              </span>
            </div>
            {aiEnabled && (
              <div className="pt-2 border-t border-emerald-200">
                <div className="flex justify-between text-[10px]">
                  <span className="text-emerald-600">年节能提升</span>
                  <span className="font-mono font-bold text-emerald-700">{savingPercent}% ~ {savingPercent + 5}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 节能方案详情（AI 开启时显示） */}
        {aiEnabled && (
          <div className="bg-white rounded-xl p-4 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-800">节能方案详情</span>
            </div>
            
            {/* 方案一 */}
            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                <div>
                  <div className="text-[10px] font-bold text-blue-700 mb-1">基于动态阈值调整的冷通道精准冷却</div>
                  <p className="text-[9px] text-blue-600 leading-relaxed">
                    结合全年灯光调优中的人员感应数据，AI动态控制冷通道送风温度与风扇转速，在无人时段降低照明及辅助散热设备功率。预计制冷能耗再降12%，PUE进一步优化至<span className="font-mono font-bold text-blue-800">1.29</span>左右。
                  </p>
                </div>
              </div>
            </div>
            
            {/* 方案二 */}
            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-100">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                <div>
                  <div className="text-[10px] font-bold text-amber-700 mb-1">CLF智冷顾问：自然冷却与机械制冷协同优化</div>
                  <p className="text-[9px] text-amber-600 leading-relaxed">
                    根据气象预测自动切换自然冷却模式，配合智能清洗冷却塔换热盘管。可使制冷负载因子（CLF）从<span className="font-mono font-bold text-amber-800">0.67</span>降至<span className="font-mono font-bold text-amber-800">0.55</span>以下，年综合节电率超<span className="font-mono font-bold text-amber-800">20%</span>。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** 沙盒 03: 千人千面培训考评与能力画像 */
function YuntianTrainingSandbox() {
  // 能力维度数据
  const [skills, setSkills] = useState([
    { name: '消防应急', value: 15, color: '#ef4444' },
    { name: '暖通排障', value: 20, color: '#f59e0b' },
    { name: '配电安全', value: 10, color: '#3b82f6' },
    { name: '网络运维', value: 25, color: '#8b5cf6' },
    { name: '应急响应', value: 18, color: '#10b981' },
  ]);

  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // 标准答案关键词
  const correctKeywords = ['温升', '排查', '空调', '温度', '检查', '制冷', '故障', '报警'];

  // AI 评分
  const handleGrade = () => {
    if (!userAnswer.trim()) return;
    setIsGrading(true);

    setTimeout(() => {
      // 计算分数
      const matchedKeywords = correctKeywords.filter(kw => userAnswer.includes(kw));
      const baseScore = matchedKeywords.length * 12;
      const finalScore = Math.min(100, baseScore + 20);

      setScore(finalScore);
      setIsGrading(false);

      // 更新能力雷达图
      if (finalScore >= 60) {
        setSkills(prev => prev.map(s => {
          if (s.name === '暖通排障') {
            return { ...s, value: Math.min(100, s.value + finalScore * 0.3) };
          }
          if (s.name === '应急响应') {
            return { ...s, value: Math.min(100, s.value + finalScore * 0.15) };
          }
          return s;
        }));
        setActiveSkill('暖通排障');
      }
    }, 1500);
  };

  // 计算雷达图路径
  const radarPoints = skills.map((s, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const r = (s.value / 100) * 80;
    return {
      x: 100 + r * Math.cos(angle),
      y: 100 + r * Math.sin(angle),
    };
  });

  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：运维人员能力画像雷达图 */}
      <div className="bg-[#0f1115] rounded-2xl p-4 border border-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            能力画像 / SKILL RADAR
          </span>
        </div>

        {/* 人员信息 */}
        <div className="p-2 bg-zinc-900/50 rounded-lg mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-zinc-100">张明</div>
                <div className="text-[9px] text-zinc-500">新入职机房运维员</div>
              </div>
            </div>
            <div className="text-[9px] font-mono text-zinc-500">入职 7 天</div>
          </div>
        </div>

        {/* 雷达图 */}
        <div className="flex justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* 背景网格 */}
            {[20, 40, 60, 80, 100].map(r => (
              <circle
                key={r}
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="#27272a"
                strokeWidth="1"
              />
            ))}
            {/* 轴线 */}
            {skills.map((_, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180);
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 100 * Math.cos(angle)}
                  y2={100 + 100 * Math.sin(angle)}
                  stroke="#27272a"
                  strokeWidth="1"
                />
              );
            })}
            {/* 数据区域 */}
            <path
              d={radarPath}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10b981"
              strokeWidth="2"
              className="transition-all duration-500"
            />
            {/* 数据点 */}
            {radarPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="4"
                fill={skills[i].color}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-500"
              />
            ))}
          </svg>
        </div>

        {/* 能力标签 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map(s => (
            <div
              key={s.name}
              className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all duration-300 ${
                activeSkill === s.name
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
              }`}
            >
              {s.name}: {Math.round(s.value)}
            </div>
          ))}
        </div>
      </div>

      {/* 右侧：AI 出题与考核界面 */}
      <div className="space-y-4">
        {/* 题目卡片 */}
        <div className="bg-white rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <AwardIcon className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold text-zinc-800">AI 考核题目</span>
            <span className="ml-auto text-[9px] font-mono text-zinc-400">题目难度: 中等</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-[11px] text-amber-900 leading-relaxed">
              机房发生突发温升，应如何紧急排查？
            </p>
          </div>
        </div>

        {/* 答题区域 */}
        <div className="bg-white rounded-xl p-4 border border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <Edit2 className="w-4 h-4 text-zinc-500" />
            <span className="text-[11px] font-bold text-zinc-800">你的回答</span>
          </div>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="请输入你的排查思路..."
            className="w-full h-24 p-3 text-[11px] border border-zinc-200 rounded-lg resize-none focus:outline-none focus:border-emerald-500 transition"
            disabled={isGrading || score !== null}
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleGrade}
              disabled={!userAnswer.trim() || isGrading}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-300 text-white font-bold text-[10px] rounded-lg transition disabled:cursor-not-allowed cursor-pointer"
            >
              {isGrading ? 'AI 评分中...' : '提交答案'}
            </button>
            {score !== null && (
              <button
                onClick={() => {
                  setScore(null);
                  setUserAnswer('');
                  setActiveSkill(null);
                }}
                className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-[10px] rounded-lg transition cursor-pointer"
              >
                重做
              </button>
            )}
          </div>
        </div>

        {/* 评分结果 */}
        {score !== null && (
          <div className={`rounded-xl p-4 border ${
            score >= 60 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {score >= 60 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`text-[11px] font-bold ${
                  score >= 60 ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  AI 评分结果
                </span>
              </div>
              <div className={`text-2xl font-black font-mono ${
                score >= 60 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {score}分
              </div>
            </div>
            <p className="text-[10px] text-zinc-600">
              {score >= 60
                ? '回答涵盖了关键排查要点，能力雷达图已更新。'
                : '回答不够完整，建议复习相关 SOP 流程后再次作答。'}
            </p>
            {score >= 60 && (
              <div className="mt-2 p-2 bg-emerald-100/50 rounded-lg">
                <span className="text-[9px] font-bold text-emerald-700">
                  ✓ 已点亮 #暖通排障 能力标签
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Yuntian (云天系统) Detail View ────────────────────────────────────────────

function YuntianDetailView({ project }: { project: Project }) {
  const item = projectDetailsData['idc-llm'];

  // 三层架构数据
  const architectureLayers = [
    {
      title: '底座数据层',
      icon: Database,
      color: 'blue',
      description: '百万测点秒级采集，整合上架空间、供配电负载及暖通环境时序数据。',
    },
    {
      title: '知识沉淀层',
      icon: BookOpen,
      color: 'amber',
      description: '全面整合国标、行业专家经验及设备维护保养 SOP，构建结构化的工业知识图谱。',
    },
    {
      title: 'AI决策体（云天大脑）',
      icon: Brain,
      color: 'emerald',
      description: '向下驱动 AI故障诊断、CLF智冷顾问、PUE优化大师、AI数据分析师 4 个核心智能体。',
    },
  ];

  const colorStyles: Record<string, { bg: string; border: string; icon: string; title: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', title: 'text-amber-700' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', title: 'text-emerald-700' },
  };

  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-100 pb-6 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">
            YUNTIAN SYSTEM v3.0 · IDC INTELLIGENT OPERATIONS
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">
          数据中心行业大模型知识库"云天系统"
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          首发行业大模型知识库"云天系统"，封装 AI 故障诊断、PUE 优化大师等智能体矩阵，依托 460 亩智算中心真实运营场景孵化凝练的工业级 AI 解决方案。
        </p>
        {/* 绿色/工业风格点缀 */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">460亩智算中心</span>
          <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium">工业级AI</span>
        </div>
      </div>

      {/* 区块1：标签行 */}
      <div className="py-5 border-b border-zinc-100 space-y-3">
        {/* 技术选型标签 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {['垂直领域大模型', '设备级知识图谱', '多模态数据融合', '智能算法压缩降噪', '信创生态兼容'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        {/* 效能价值标签 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: '故障排查缩短', value: '40%+' },
            { label: '新人培训缩短', value: '40%' },
            { label: '诊断建议采纳率', value: '88.5%' },
            { label: '意图识别精度', value: '95.2%' },
          ].map(m => (
            <span key={m.label} className="border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-emerald-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 卡片一：系统架构 */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="bg-zinc-900 text-zinc-100 px-5 py-3 flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 卡片 01</span>
          <span className="text-xs font-bold text-emerald-400">System Architecture</span>
        </div>
        <div className="p-5 bg-white">
          {/* 核心架构心智 */}
          <p className="text-sm text-zinc-600 mb-4">
            系统采用"垂直知识库 + 多角色智能体"架构，无缝平替、纳管多地传统数据中心老旧系统。
          </p>
          {/* 三层架构图 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {architectureLayers.map((layer) => {
              const Icon = layer.icon;
              const styles = colorStyles[layer.color];
              return (
                <div key={layer.title} className={`${styles.bg} border ${styles.border} rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${styles.icon}`} />
                    <span className={`text-xs font-bold ${styles.title}`}>{layer.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
          {/* 智能体矩阵标签 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["AI故障诊断", "CLF智冷顾问", "PUE优化大师", "AI数据分析师"].map(agent => (
              <span key={agent} className="text-[10px] px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-full font-medium border border-zinc-200">
                {agent}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 卡片二：可交互沙盒 - AI 根因分析 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 01 / AI 根因分析</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <YuntianRootCauseSandbox />
        </div>
      </div>

      {/* 卡片三：可交互沙盒 - PUE 优化大师与 CLF 智冷顾问 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 02 / PUE 优化大师与 CLF 智冷顾问</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <YuntianPUESandbox />
        </div>
      </div>

      {/* 卡片四：可交互沙盒 - 千人千面培训考评与能力画像 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 03 / 千人千面培训考评与能力画像</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <YuntianTrainingSandbox />
        </div>
      </div>
    </>
  );
}

// ─── Bidding Detail View ──────────────────────────────────────────────────────

/** 沙盒 01: Token 节能控制沙盒 - 本地初筛与分层模型路由 */
function BiddingLayeredRouterSandbox() {
  const [step, setStep] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [rawText] = useState(
    '<html>\n<head><title>XX酒店布草洗涤采购项目招标公告</title></head>\n<body>\n  <div id=\"header\">中国采购网 · 招标信息</div>\n  <div class=\"sidebar\">\n    <a href=\"#\">首页</a>\n    <a href=\"#\">采购公告</a>\n    <a href=\"#\">供应商注册</a>\n  </div>\n  <div class=\"content\">\n    <h2>XX酒店布草洗涤采购项目招标公告</h2>\n    <p>项目编号：2024-HB-0088</p>\n    <p>采购人：XX酒店管理有限公司</p>\n    <p>采购内容：客房布草（床单、被套、枕套、毛巾等）洗涤服务，合同期两年。</p>\n    <p>预算金额：280万元/年</p>\n    <p>投标人资格要求...</p>\n    <!-- 广告位 -->\n    <div class=\"ads\"><img src=\"banner.jpg\" />专业标书制作服务</div>\n    <p>根据《中华人民共和国招标投标法》及相关法律法规，XX酒店管理有限公司就布草洗涤服务采购项目进行公开招标，欢迎符合条件的供应商投标。</p>\n    <p>以下为冗长的投标条款和法律声明...(约5000字冗余内容)...本招标文件最终解释权归采购人所有。</p>\n    <p>联系人：张经理</p>\n    <p>联系电话：010-88886666</p>\n    <p>投标截止日期：2024年6月30日</p>\n    <div class=\"footer-links\">\n      <a href=\"#\">友情链接：标书代写</a>\n      <a href=\"#\">友情链接：资质代办</a>\n    </div>\n  </div>\n</body>\n</html>'
  );
  const [processedText, setProcessedText] = useState('');
  const [showPath, setShowPath] = useState(false);
  const [pathStep, setPathStep] = useState(0);
  const [showChart, setShowChart] = useState(false);

  const handleProcess = () => {
    if (step !== 'idle') return;
    setStep('processing');

    // Stage 1: noise removal
    setTimeout(() => {
      setProcessedText('【Readability.js 文本降噪完成】\n\n' +
        '项目名称：XX酒店布草洗涤采购项目\n' +
        '项目编号：2024-HB-0088\n' +
        '采购人：XX酒店管理有限公司\n' +
        '采购内容：客房布草（床单、被套、枕套、毛巾等）洗涤服务，合同期两年\n' +
        '预算金额：280万元/年\n' +
        '联系人：张经理\n' +
        '联系电话：010-88886666\n' +
        '投标截止日期：2024年6月30日');
      setPathStep(1);

      // Stage 2: local keyword match
      setTimeout(() => {
        setPathStep(2);

        // Stage 3: Level 1 (Gemini Flash-Lite)
        setTimeout(() => {
          setPathStep(3);

          // Stage 4: Level 2 (DeepSeek)
          setTimeout(() => {
            setPathStep(4);
            setProcessedText('{\n  \"category\": \"布草洗涤\",\n  \"project_name\": \"XX酒店布草洗涤采购项目\",\n  \"budget\": 2800000,\n  \"unit\": \"元/年\",\n  \"deadline\": \"2024-06-30\",\n  \"contact\": {\n    \"name\": \"张经理\",\n    \"phone\": \"010-88886666\"\n  },\n  \"confidence\": 0.97,\n  \"priority\": \"A\"\n}');
            setShowChart(true);
            setStep('complete');
          }, 1000);
        }, 800);
      }, 800);
    }, 600);
  };

  const pathLabels = [
    '网页文本摄入 (含广告/侧边栏/冗余条款)',
    'Readability.js 降噪 + 本地关键词频次命中',
    'Level 1: Gemini Flash-Lite 判定是否为酒店供应链标讯',
    'Level 2: DeepSeek-Chat V4 结构化字段严格 JSON 抽取'
  ];

  return (
    <div className="space-y-4">
      {/* 左侧原始 | 右侧处理结果 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 左侧：原始网页 */}
        <div className="bg-[#0f1115] rounded-xl p-3 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">原始网页 / RAW HTML</span>
            <span className="text-[8px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">HTML杂质 · 广告 · 5000+字冗余</span>
          </div>
          <pre className="text-[9px] font-mono text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-950 rounded-lg p-3 overflow-auto max-h-[220px] scrollbar-thin">
            {rawText}
          </pre>
          {/* 噪声标记 */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['侧边栏导航', '广告banner', '友情链接(垃圾)', '法律声明(冗余)', '页脚导航'].map(n => (
              <span key={n} className="text-[8px] px-1.5 py-0.5 bg-red-900/30 text-red-400 border border-red-800/50 rounded-full">× {n}</span>
            ))}
          </div>
        </div>

        {/* 右侧：处理结果 */}
        <div className="bg-[#0f1115] rounded-xl p-3 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">处理后 / PROCESSED</span>
            {step === 'complete' && (
              <span className="text-[8px] font-mono text-emerald-500 bg-emerald-900/30 px-1.5 py-0.5 rounded-full border border-emerald-700/50">
                文本降噪率 97.3%
              </span>
            )}
          </div>
          <div className="bg-zinc-950 rounded-lg p-3 overflow-auto max-h-[220px] scrollbar-thin">
            {step === 'idle' ? (
              <span className="text-[9px] text-zinc-600 italic">点击下方按钮开始处理...</span>
            ) : (
              <pre className="text-[9px] font-mono whitespace-pre-wrap text-emerald-300">{processedText}</pre>
            )}
          </div>
        </div>
      </div>

      {/* 触发按钮 */}
      {step === 'idle' && (
        <button
          onClick={handleProcess}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          执行文本瘦身与分层路由
        </button>
      )}

      {step === 'processing' && (
        <div className="flex items-center justify-center gap-2 py-2.5">
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          <span className="text-[10px] text-zinc-500 font-mono">分层路由计算中...</span>
        </div>
      )}

      {/* 计算路径展示 */}
      {step !== 'idle' && (
        <div className="bg-[#0f1115] rounded-xl p-3 border border-zinc-800">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2">计算路径 / COMPUTATION PATH</span>
          <div className="space-y-2">
            {pathLabels.map((label, i) => (
              <div key={i} className={`flex items-center gap-2.5 ${pathStep > i ? 'opacity-100' : pathStep === i ? 'opacity-80' : 'opacity-30'}`}>
                <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                  pathStep > i ? 'bg-emerald-600 text-white' :
                  pathStep === i ? 'bg-blue-600 text-white animate-pulse' :
                  'bg-zinc-800 text-zinc-600'
                }`}>
                  {pathStep > i ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] font-mono ${pathStep >= i ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {label}
                </span>
                {i === 3 && pathStep > 3 && (
                  <span className="text-[8px] text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded-full border border-emerald-700/50 ml-auto shrink-0">
                    JSON ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 成本对比柱状图 */}
      {showChart && (
        <div className="bg-[#0f1115] rounded-xl p-3 border border-zinc-800">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-3">API 算力成本对比 / COST COMPARISON</span>
          <div className="space-y-2.5">
            {/* 传统全量调用 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-zinc-400">传统全量调用 (直接 DeepSeek)</span>
                <span className="text-[9px] font-mono text-red-400 font-bold">$100</span>
              </div>
              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000" />
              </div>
            </div>
            {/* 知宿分层路由 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-zinc-400">知宿分层路由 (本地→Flash-Lite→DeepSeek)</span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold">$25</span>
              </div>
              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-[25%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000" />
              </div>
            </div>
            {/* 节省标注 */}
            <div className="flex items-center gap-2 pt-1">
              <div className="h-6 w-6 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center">
                <TrendingDown className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400">API 算力成本节省 75%</span>
              <span className="text-[8px] text-zinc-500 font-mono">| 零成本过滤率 80%+</span>
            </div>
          </div>
        </div>
      )}

      {/* 重置按钮 */}
      {step === 'complete' && (
        <button
          onClick={() => { setStep('idle'); setProcessedText(''); setShowPath(false); setPathStep(0); setShowChart(false); }}
          className="w-full py-1.5 text-[10px] text-zinc-400 hover:text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-900 transition cursor-pointer"
        >
          ↺ 重新演示
        </button>
      )}
    </div>
  );
}

/** 沙盒 02: 语义层向量去重与跨源多源合并 */
function BiddingDeduplicationSandbox() {
  const [step, setStep] = useState<'idle' | 'processing' | 'duplicate' | 'merged'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDedup = () => {
    if (step !== 'idle') return;
    setStep('processing');

    // 渐进式动画
    setTimeout(() => { setProgress(30); setStep('duplicate'); }, 600);
    setTimeout(() => { setProgress(60); }, 1200);
    setTimeout(() => { setProgress(85); }, 1800);
    setTimeout(() => { setProgress(100); setStep('merged'); }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* 两条线索卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 线索甲 */}
        <div className={`rounded-xl border p-4 transition-all duration-500 ${
          step === 'merged' ? 'border-amber-400/60 bg-amber-50/80 opacity-60' :
          step === 'duplicate' ? 'border-amber-300 bg-amber-50' :
          'border-zinc-200 bg-white'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[9px] font-mono font-bold text-blue-700 uppercase">中国采购网</span>
          </div>
          <h4 className="text-[11px] font-bold text-zinc-900 mb-1">XX酒店布草采购项目</h4>
          <div className="space-y-0.5">
            <p className="text-[9px] text-zinc-500">预算：<span className="font-mono text-zinc-700">280万元/年</span></p>
            <p className="text-[9px] text-zinc-500">截止：<span className="font-mono text-zinc-700">2024-06-30</span></p>
            <p className="text-[9px] text-zinc-500">类型：<span className="font-mono text-zinc-700">布草洗涤服务</span></p>
          </div>
          {step !== 'idle' && step !== 'merged' && (
            <div className="mt-2 pt-2 border-t border-amber-200">
              <p className="text-[8px] text-amber-700 font-mono">提取实体: [XX酒店, 布草, 采购, 280万, 年度]</p>
            </div>
          )}
        </div>

        {/* 线索乙 */}
        <div className={`rounded-xl border p-4 transition-all duration-500 ${
          step === 'merged' ? 'border-amber-400/60 bg-amber-50/80 opacity-60' :
          step === 'duplicate' ? 'border-amber-300 bg-amber-50' :
          'border-zinc-200 bg-white'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[9px] font-mono font-bold text-amber-700 uppercase">地方交易中心</span>
          </div>
          <h4 className="text-[11px] font-bold text-zinc-900 mb-1">新建XX饭店客房配套布草项目</h4>
          <div className="space-y-0.5">
            <p className="text-[9px] text-zinc-500">预算：<span className="font-mono text-zinc-700">300万元/年</span></p>
            <p className="text-[9px] text-zinc-500">截止：<span className="font-mono text-zinc-700">2024-07-05</span></p>
            <p className="text-[9px] text-zinc-500">类型：<span className="font-mono text-zinc-700">客房布草配套</span></p>
          </div>
          {step !== 'idle' && step !== 'merged' && (
            <div className="mt-2 pt-2 border-t border-amber-200">
              <p className="text-[8px] text-amber-700 font-mono">提取实体: [XX饭店, 客房, 布草, 配套, 300万]</p>
            </div>
          )}
        </div>
      </div>

      {/* 去重计算中 */}
      {step === 'processing' && (
        <div className="flex items-center justify-center gap-2 py-3">
          <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
          <span className="text-[10px] text-zinc-500 font-mono">语义向量编码中 · 计算余弦相似度...</span>
        </div>
      )}

      {/* 相似度结果 - 0.94 > 0.92 */}
      {step === 'duplicate' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-widest">余弦相似度计算 / COSINE SIMILARITY</span>
            <span className="text-[8px] font-mono text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">pgvector</span>
          </div>
          {/* 进度条 */}
          <div className="h-3 bg-amber-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-amber-900">
              相似度: <span className="font-bold text-amber-700">{progress}%</span>
            </span>
            {progress >= 92 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold text-amber-700">
                  {progress}% {'>'} 92% 阈值
                </span>
                <Check className="w-3.5 h-3.5 text-amber-600" />
              </div>
            )}
          </div>
          <div className="mt-2 text-[9px] text-amber-700 font-mono">
            核心实体比对: [XX酒店/XX饭店, 布草, 采购/配套, 客房] → 语义一致
          </div>
        </div>
      )}

      {/* 合并海报 */}
      {step === 'merged' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl p-4 text-white"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">商机已合并</span>
          </div>
          <p className="text-[11px] opacity-90 leading-relaxed">
            中国采购网 + 地方交易中心 → 同一项目「XX酒店/饭店布草采购与配套项目」
          </p>
          <div className="mt-2 flex items-center gap-2 text-[9px]">
            <span className="bg-white/20 px-2 py-0.5 rounded-full">总预算: 580万元</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full">线索流失 ≈ 0</span>
          </div>
        </motion.div>
      )}

      {/* 触发按钮 */}
      {step === 'idle' && (
        <button
          onClick={handleDedup}
          className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          触发语义去重检索
        </button>
      )}

      {(step === 'merged') && (
        <button
          onClick={() => { setStep('idle'); setProgress(0); }}
          className="w-full py-1.5 text-[10px] text-zinc-400 hover:text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-900 transition cursor-pointer"
        >
          ↺ 重新演示
        </button>
      )}
    </div>
  );
}

/** 沙盒 03: Bento Grid 响应式商机智能推送 */
function BiddingPushSandbox() {
  const [level, setLevel] = useState<'A' | 'B' | 'C'>('A');
  const [pushed, setPushed] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handlePush = () => {
    if (pushed) return;
    setPushed(true);
    setTimeout(() => setShowCard(true), 600);
  };

  const levelInfo = {
    A: { label: 'A级 · 高优先级', desc: '预算≥100万 · 深度需求匹配', color: 'bg-emerald-500', btnColor: 'bg-emerald-600 hover:bg-emerald-500' },
    B: { label: 'B级 · 中优先级', desc: '预算30-100万 · 具备性价比', color: 'bg-blue-500', btnColor: 'bg-blue-600 hover:bg-blue-500' },
    C: { label: 'C级 · 常规跟进', desc: '预算<30万 · 浅度匹配', color: 'bg-zinc-500', btnColor: 'bg-zinc-600 hover:bg-zinc-500' },
  };

  return (
    <div className="space-y-4">
      {/* 企业飞书手机Mock */}
      <div className="flex justify-center">
        <div className="bg-[#0f1115] rounded-[32px] border-[6px] border-zinc-800 shadow-2xl w-full max-w-[280px] overflow-hidden" style={{ height: '520px' }}>
          {/* 状态栏 */}
          <div className="bg-[#0f1115] text-zinc-400 text-[9px] px-4 pt-2 pb-1.5 flex items-center justify-between">
            <span className="font-semibold text-zinc-100">10:10</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5 text-zinc-400" />
              <div className="w-3.5 h-2 border border-zinc-600 rounded-sm p-[1px]">
                <div className="h-full w-3/4 bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#0f1115] border-b border-zinc-800 px-3 py-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-[7px] font-bold text-white">商</span>
            </div>
            <span className="text-[10px] font-bold text-zinc-100">知宿商机引擎</span>
            <div className="ml-auto flex items-center gap-1">
              <Bell className="w-3 h-3 text-zinc-500" />
            </div>
          </div>

          {/* 手机内容区 */}
          <div className="bg-zinc-900 h-full flex flex-col" style={{ height: 'calc(100% - 72px)' }}>
            {!pushed ? (
              <div className="p-3 flex flex-col h-full">
                {/* 选择线索级别 */}
                <div className="mb-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2">选择线索级别</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['A', 'B', 'C'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`px-2 py-2 rounded-lg border text-[9px] font-bold transition cursor-pointer ${
                          level === l
                            ? `${levelInfo[l].color} text-white border-transparent`
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {l}级
                      </button>
                    ))}
                  </div>
                  <p className="text-[8px] text-zinc-500 mt-1 pl-0.5">{levelInfo[level].desc}</p>
                </div>

                {/* 推送按钮 */}
                <div className="mt-auto">
                  <button
                    onClick={handlePush}
                    className={`w-full py-3 px-4 ${levelInfo[level].btnColor} text-white font-bold text-[10px] rounded-xl transition active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    模拟异步推送
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2 h-full overflow-hidden relative">
                {/* 推送通知 */}
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-2 flex items-start gap-2 mb-2"
                >
                  <Bell className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-blue-300 font-bold">新商机推送</p>
                    <p className="text-[8px] text-blue-400/70">已根据地域标签 & 线索等级实时派发</p>
                  </div>
                </motion.div>

                {/* Bento Grid 卡片 */}
                {showCard && (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    className="bg-[#0a0c10] border border-zinc-800 rounded-2xl overflow-hidden"
                  >
                    {/* 项目状态条 */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 border-b border-zinc-800">
                      <span className={`w-1.5 h-1.5 rounded-full ${level === 'A' ? 'bg-emerald-400' : level === 'B' ? 'bg-blue-400' : 'bg-zinc-400'}`} />
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">项目状态 · 招标中</span>
                      <span className={`ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                        level === 'A' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50' :
                        level === 'B' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
                        'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {level}级
                      </span>
                    </div>

                    {/* Bento Grid 内容 */}
                    <div className="grid grid-cols-4 gap-1.5 p-2.5">
                      {/* 酒店名称 - 2 cols */}
                      <div className="col-span-2 row-span-1 bg-zinc-800/60 rounded-xl p-2.5">
                        <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">酒店</span>
                        <span className="text-[10px] font-bold text-zinc-100">XX酒店/饭店</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-2.5 h-2.5 text-amber-400" />
                          <span className="text-[8px] text-zinc-400">★★★★☆</span>
                        </div>
                      </div>

                      {/* 星级定位 - 2 cols */}
                      <div className="col-span-2 row-span-1 bg-zinc-800/60 rounded-xl p-2.5">
                        <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">星级定位</span>
                        <span className="text-[10px] font-bold text-zinc-100">四星级</span>
                        <span className="text-[8px] text-zinc-400 block">高端商务型</span>
                      </div>

                      {/* AI 深度洞察 - 全宽 */}
                      <div className="col-span-4 bg-zinc-800/60 rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Brain className="w-2.5 h-2.5 text-purple-400" />
                          <span className="text-[7px] font-mono text-purple-400 uppercase tracking-wider">AI 深度洞察</span>
                        </div>
                        <p className="text-[8px] text-zinc-300 leading-relaxed">
                          {level === 'A'
                            ? '该酒店近期完成装修升级，布草洗涤需求量大且稳定，合同周期长，是优质长期合作标的。'
                            : level === 'B'
                            ? '新建饭店客房配套需求明确，预算适中，竞争对手尚未介入，存在窗口期。'
                            : '常规布草采购需求，预算较低但客源稳定，可作为备选线索跟进。'
                          }
                        </p>
                      </div>

                      {/* AI 提炼核心痛点 - 全宽 */}
                      <div className="col-span-4 bg-zinc-800/60 rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <AlertCircle className="w-2.5 h-2.5 text-red-400" />
                          <span className="text-[7px] font-mono text-red-400 uppercase tracking-wider">核心痛点提炼</span>
                        </div>
                        <p className="text-[8px] text-zinc-300 leading-relaxed">
                          {level === 'A'
                            ? '现有供应商服务响应慢，投诉率高；布草破损率高于行业平均水平，急需更换供应商。'
                            : level === 'B'
                            ? '新建项目时间紧，要求在开业前完成全部客房布草配套，对交付周期有严格考核。'
                            : '预算有限但品质要求不低，需要提供性价比优化的解决方案。'
                          }
                        </p>
                      </div>

                      {/* 按钮行 - 全宽 */}
                      <div className="col-span-4 grid grid-cols-2 gap-1.5">
                        <button className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[8px] rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          一键认领商机
                        </button>
                        <button className="py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-bold text-[8px] rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center gap-1">
                          <Phone className="w-2.5 h-2.5" />
                          拨打业主电话
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 重新推送 */}
                {showCard && (
                  <button
                    onClick={() => { setPushed(false); setShowCard(false); }}
                    className="w-full mt-2 py-1.5 text-[8px] text-zinc-500 hover:text-zinc-400 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
                  >
                    ↺ 重新选择级别推送
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bidding Detail View - 全网标讯与新开业酒店监测系统 */
function BiddingDetailView({ project }: { project: Project }) {
  return (
    <>
      {/* 区块0：顶部大框 */}
      <div className="pt-20 border-b border-zinc-100 pb-6 bg-white">
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">全网标讯与新开业酒店监测系统</h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          面向酒店供应链行业的 AI-Native 智能标讯分布式采集、清洗、语义结构化及商机分发路由系统，主导设计三层级联过滤架构，实现高并发非结构化标讯文本的秒级精准商机清洗。
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium">AI-Native</span>
          <span className="text-[10px] px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">分布式采集</span>
        </div>
      </div>

      {/* 区块1：标签行 */}
      <div className="py-5 border-b border-zinc-100 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 技术选型</span>
          {['分布式增量爬虫', 'Readability.js 泛化解析', '分层模型路由', '语义向量去重', 'pgvector 索引', 'RabbitMQ/Kafka 异步解耦'].map(tag => (
            <span key={tag} className="bg-zinc-100 text-zinc-700 text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-xl border border-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">// 效能价值</span>
          {[
            { label: 'API算力成本节省', value: '75%' },
            { label: '零成本过滤率', value: '80%+' },
            { label: '线索清洗耗时', value: '秒级' },
            { label: '线索流失数量', value: '0遗漏' },
          ].map(m => (
            <span key={m.label} className="border border-blue-300 bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-xl">
              {m.label} <span className="font-mono text-blue-600">{m.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 卡片一：系统架构 */}
      <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="bg-zinc-900 text-zinc-100 px-5 py-3 flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 卡片 01</span>
          <span className="text-xs font-bold text-blue-400">System Architecture</span>
        </div>
        <div className="p-5 bg-white">
          <p className="text-sm text-zinc-600 mb-4">
            系统采用“多源增量采集 {'->'} 本地规则初筛 {'->'} 分层模型路由 {'->'} 向量合并去重 {'->'} 响应式卡片推送”的全链路解耦架构。
          </p>
          {/* 四层架构 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">数据采集层</span>
              </div>
              <p className="text-[10px] text-blue-600 leading-relaxed">
                官方/聚合招标网、酒店集团采购门户、垂直媒体及规划局公示，采用 Playwright + Feapder + 动态代理 IP 池高并发增量抓取。
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-purple-700">AI智能筛选与结构化层</span>
              </div>
              <p className="text-[10px] text-purple-600 leading-relaxed">
                Readability.js 文本降噪 + 二级跳架构进行低成本、强约束的结构化字段提取。
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700">高度去重与CRM管道</span>
              </div>
              <p className="text-[10px] text-amber-600 leading-relaxed">
                pgvector 向量检索，Cosine Similarity {'>'} 0.92 判定重复，自动创建 Leads 记录。
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">实时响应式推送</span>
              </div>
              <p className="text-[10px] text-emerald-600 leading-relaxed">
                RabbitMQ/Kafka 异步分发，根据地域标签与线索等级实现秒级精准触达。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片二：沙盒 01 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 01 / 本地初筛与分层模型路由</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <BiddingLayeredRouterSandbox />
        </div>
      </div>

      {/* 卡片三：沙盒 02 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 02 / 语义层向量去重与跨源多源合并</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <BiddingDeduplicationSandbox />
        </div>
      </div>

      {/* 卡片四：沙盒 03 */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// 沙盒 03 / Bento Grid 响应式商机智能推送</span>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>可交互演示</span>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-3xl p-4 border border-zinc-200">
          <BiddingPushSandbox />
        </div>
      </div>
    </>
  );
}


// ─── DCIM Detail View (数据中心运维数据治理大屏) ─────────────────────────

/** 沙盒 01: BIM 级多维空间与隐蔽管线可视化 */
