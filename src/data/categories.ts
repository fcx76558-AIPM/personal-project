/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Updated 2026-06-14 per project overview document.
 */

import { Category, TimelineMilestone } from './types';

export const CATEGORIES: Category[] = [
  {
    id: "agent",
    name: "智能问答/Agent业务",
    tagline: "基于大模型/RAG的对话式知识库，用于客服、培训、故障诊断",
    projects: [
      {
        id: "rag-hotel",
        title: "酒店 RAG 智能前台（知宿 InnoStay）",
        subtitle: "0-1 打造酒店专属 RAG 知识库与全渠道 Agent 工单闭环 SaaS 应用。",
        description: "基于精奢连锁酒店真实夜间场景，针对高敏感客诉无法及时闭环及传统客务人工流转耗时高的痛点。本系统深度集成酒店 PMS 业务接口与内部 SOP 知识库，智能过滤并分流常见高频退款纠纷、送药送物等网关请求，降低夜间前台值班人力负荷，并定义了所有财务流的离线防溢防错机制。",
        metrics: [
          { label: "客诉自动解决率", value: "45.0%" },
          { label: "夜间人工降本", value: "60.0%" },
          { label: "知识召回准确率", value: "93.4%" },
          { label: "客诉响应时间", value: "1.2 秒" }
        ],
        chips: ["LLM 智能体", "RAG 检索流水线", "Milvus 向量库", "SOP 约束引擎", "FastAPI 网关"],
        tags: ["RAG", "大模型", "企业微信集成", "向量数据库", "降本增效"],
        blueprintTitle: "双路由 RAG 及 意图分析级联防幻觉网关",
        blueprintText: "系统核心通过自研双流 Prompt 意图分类器，将用户长尾输入归入 [标准服务流程] 或 [非标安抚流程]。标准流程通过 PGVector + Dense Embeddings 实现多路混排召回 SOP 文件内容，输出附带置信度参数。若置信度低于 0.85，则自动进入人工级联审核漏斗，确保 100% 服务合规与防幻觉机制。",
        detailedDoc: "### 核心设计与垂直价值\n\n1. **混合召回策略**: 深度混排 BM25 模糊字词与 BGE 语义搜索，切片自适应滑动窗口封装，确保数据无盲区。\n2. **PLC 与 PMS 联动**: 绿云房控系统直接映射，大模型一触进行远程智能分配点检。\n3. **财务离线挂起安全阀**: 所有的转账、房差折抵直接生成挂账通知，由夜班经办一秒签字才真正进入账户。",
        sysArchitecture: {
          nodes: ["用户对话端 (Web/App/H5)", "意图分类路由 (Intent Parser Agent)", "向量召回 + 混合索引引擎 (Milvus)", "PMS API 联动适配器", "人工审批级联面板"],
          flowDescription: "对话端 -> 意图路由 -> (检索冷态知识库 | 调用本地 PMS 网关) -> 组装 Prompt 给 LLM 生成草稿 -> 高置信度直接发出 & 低置信度经过人工安全网关审核后发出",
          dbSchema: [
            "tb_hotel_sop_chunks (id UUID, chunk_content TEXT, embedding VECTOR(1536), category VARCHAR)",
            "tb_agent_feedback_logs (id VARCHAR, session_id VARCHAR, question TEXT, answered TEXT, confidence FLOAT, rate_state INT)"
          ],
          keyChallenges: [
            "大模型幻觉下如何保证不随意给客人工商差额折抵等承诺？引入结构化 Tool Definition，所有退单或赔偿由 LLM 抛出 Action Event 挂起为 Pending 工单，前台人工一键审批后才生效。",
            "夜间网络抖动影响实时 RAG 相应速度？针对高发客诉建立 Redis 高速静态缓存，抖动自降级为本地大模型意图兜底拦截回复。"
          ]
        }
      },
      {
        id: "idc-llm",
        title: "数据中心运维问答大模型（云天系统）",
        subtitle: "将专家级运维经验与大模型深度结合，实现 IDC 故障自诊断与 AI 智冷调优决策。",
        description: "大型现代数据中心动力环境与高能耗配电复杂告警不断、一线上手周期长的痛点，自研首款 IDC 智能运维体（AIOps）。汇合高容量 Flink 告警事件聚合技术与 RAG 特征大图纸，实现秒级高频告警的降噪聚合归因检索，并智能下发可视化设备 SOP 辅助行动卡。",
        metrics: [
          { label: "故障自诊断准确率", value: "89.5%" },
          { label: "新人培训缩短", value: "三天" },
          { label: "大模型问答响应", value: "1.5 秒" },
          { label: "调优决策耗时", value: "减少 80.0%" }
        ],
        chips: ["IDC 智能体", "行业知识库", "AI 故障诊断", "CLF 智冷顾问", "PUE 优化大师"],
        tags: ["RAG", "大模型", "知识库", "故障诊断", "降本增效", "风险防控"],
        blueprintTitle: "融合设备知识图谱检索与边缘控制链路的 IDC 大模型推理引擎",
        blueprintText: "指标传感器突变通过 Flink 时序流检测抛出，多 Agent 智能体通过 Function Calling 遍历 Neo4j 动力物理拓扑链关系，交叉比对过去 3 年的历史检修非标工单，秒级算出概率最高的第一和第二故障点，并实时呈现到 PDA 行动手册面板上。",
        detailedDoc: "### 大模型在绿色数据中心的落地\n\n1. **多因子时空指标降噪**: 将千万级零散电力温湿度告警通过物理骨干拓扑链压制噪点 95%。\n2. **离线应急兜底**: 局域网内挂接 16GB 大显存端侧底座，公网完全故障切断下运行不受影响。\n3. **SOP 直接派单**: 与 DCOM（数据工单系统）一键联动，生成点对点精准定位指示。",
        sysArchitecture: {
          nodes: ["时序指标采集器", "Flink 规则告警网关", "Dify 多 Agent 诊断引擎", "机房拓扑图数据库 (Neo4j)", "值班 PDA 行动端"],
          flowDescription: "异常指标上报 -> 转换为结构化异常定义 -> Agent 查询拓扑网 -> RAG 精确召回 SOP -> 输出第一/第二应急恢复方案，并伴随配电控制点位",
          dbSchema: [
            "tb_ops_incident_records (incident_no VARCHAR, dev_id VARCHAR, metric_state JSONB, sop_selected_id INT, diagnosis_text TEXT)",
            "tb_device_topology_config (edge_id INT, source_node VARCHAR, target_node VARCHAR, link_type VARCHAR)"
          ],
          keyChallenges: [
            "千万测点连带产生故障告警海风暴？自研告警关联因式与重排降噪，将数十万并响压缩聚合至单一主工单。",
            "断网时应急运维保障丧失？内网搭载微调 Llama3 离线服务作为防灾备降级机制，保证动力不崩溃。"
          ]
        }
      },
      {
        id: "bidding-agent",
        title: "全网标讯与新开业酒店监测系统",
        subtitle: "全自动化实时抓取、清洗全网改建标讯，结合大模型精准推荐，直通 CRM 赋能销售。",
        description: "主导设计三层级联过滤架构，实现高并发非结构化标讯文本的秒级精准商机清洗。",
        metrics: [
          { label: "商机线索准确率", value: "95.0%" },
          { label: "Token 成本节省", value: "40.0%" },
          { label: "人工清洗替代率", value: "85.0%" },
          { label: "录入到推送延迟", value: "< 5 分钟" }
        ],
        chips: ["AI 爬虫", "大模型数据清洗", "Token 节省方案", "CRM 自动录入", "动态基线过滤"],
        tags: ["AI爬虫", "大模型", "信息抽取", "CRM集成", "增收获客"],
        blueprintTitle: "引入大模型语义降本过滤算法与 CRM 自动化流水线",
        blueprintText: "利用高并发 Puppeteer 动态去阻爬虫获取标讯并采用 TF-IDF 文本相似重排，调用 Gemini API (JSON Mode) 稳定提取格式化的招投标基本字段（预算、门槛、期限、核心参数），并与企业自身的资质矩阵进行交叉比对、计算红黄绿三色倾向评估分。",
        detailedDoc: "### 标讯提效全生命解剖\n\n1. **极速资质符合度漏斗**: 基于案例库和资格说明对复杂 PDF 文档进行多节点语义定位。\n2. **反爬滑块拦截自适应**: 云端多代理配合请求间隔拟合，攻克全国多省阻断型极强采购站点。\n3. **精准销售小组派发**: 合理契合产品赛道与技术类别，零时延输出商机一键抢单看板。",
        sysArchitecture: {
          nodes: ["分布式爬取集群", "MD5 与 TF-IDF 去重缓存", "LLM OCR/JSON 解析器", "商机评分决策树", "销售实时通知中心"],
          flowDescription: "原始信息源 -> 定时抓取并存入 Redis -> AI 精细化抽取字段 -> 与内部资质模板进行向量余弦计算评分 -> 挑选评分大于 75 的通告实时派发",
          dbSchema: [
            "tb_bidding_raw (id BIGINT, origin_url TEXT, parsed_json JSONB, match_score FLOAT, state INT)",
            "tb_sales_assignment (id INT, bid_id BIGINT, sales_id VARCHAR, read_state INT, feedback_notes TEXT)"
          ],
          keyChallenges: [
            "遇到扫描和加密 PDF 文档提质困难？应用双通道 OCR 图像切片重排与自顶向下版面重排引擎解决排版乱线问题。",
            "海量大文本带来的 Token 高额计费？利用自提摘要规则先过滤 80% 无用页面，只将最关键的技术及财务资质规范输入 API，将大模型成本大幅砍去 75%。"
          ]
        }
      }
    ]
  },
  {
    id: "digital-twin",
    name: "监控大屏&数字孪生",
    tagline: "基于数字孪生与BIM技术的下一代3D全景监、管、控一体化大屏与车站运营调度平台",
    projects: [
      {
        id: "idc-twin",
        title: "数据中心运维数据治理大屏",
        subtitle: "通过三维立体化呈现，打通楼栋、隐蔽管线及机柜容量，打破设备监控的数据孤岛。",
        description: "基于 WebGL + Three.js + Draco 动态加载重构技术，无损展现超大型智算机房从园林、单栋机房楼到局部机架板卡的 60 帧 3D 数字沙盘。实时接收物联网高频 Flink数据，融合温场 Kriging 差色渐变云图，生动呈现局部热岛和容量电量能效。该系统是公司数字化转型全生命周期的代表大作。",
        metrics: [
          { label: "业务连续性", value: "100%" },
          { label: "智算园区覆盖", value: "260亩" },
          { label: "资产空间定位", value: "机柜级" },
          { label: "国际体系认证", value: "Up&Time" }
        ],
        chips: ["数字孪生", "BIM 建筑模型", "隐蔽工程管线", "容量可视化", "温湿度云图"],
        tags: ["数字孪生", "Three.js", "BIM", "管线可视化", "实时监控", "数据驱动决策"],
        blueprintTitle: "融合数字孪生实时渲染框架与机柜负载/电力容量自适应关联矩阵",
        blueprintText: "后台 GLTF 图网经过 Draco 算法强力物理重组，体积由 120MB 骤降至 15MB 并在 3s 内平滑加载。前台接入高吞吐长连接 WebSocket 通道，配合 Web Workers 解除主线程重绘计算，完美将数据注入 3D 组件，辅以 Frustum Culling（视锥体剔除）优化极致显存渲染。",
        detailedDoc: "### 智慧园区立体渲染亮点\n\n1. **Kriging 渐变温场**: 对采集的多维度空间温度运用差值插值，大屏无损直接渲染机架温热特征云图。\n2. **三色容量动态沙盘**: 辅助机柜资产管理，一秒寻找[承重/电力/制冷]的最佳货架空冷空位。\n3. **沉浸式物理轨道飞行**: 设定预拟自动巡检路径，结合异常预警一秒拉入监控画面核对。",
        sysArchitecture: {
          nodes: ["三维 GLTF/BIM 源图纸", "Draco 重构压缩底板", "Web Worker 时序数据网关", "WebGL/Three.js 交互引擎", "温场 Kriging 插值计算器"],
          flowDescription: "加载 Draco 网格模型 -> 骨骼绑定与标签绑定 -> 保持长连接 WebSocket 管道 -> (将新回包用 Web Work 格式清洗) -> CSS3DRenderer 实时弹窗卡片 -> Shader 自建网格热力图",
          dbSchema: [
            "tb_3d_component_binding (mesh_id VARCHAR, sensor_code VARCHAR, bind_field VARCHAR, display_scale FLOAT)",
            "tb_inspection_path_config (path_id INT, path_name VARCHAR, camera_nodes_json TEXT, cycle_duration_seconds INT)"
          ],
          keyChallenges: [
            "渲染数万多维 Mesh 导致卡帧严重？部署 Frustum Culling 强力自裁，移除可见度外图形，将帧率平稳维持在 60 极限FPS。",
            "WebSocket 大数据洪流刷屏闪烁？设计数据脏标记，仅在测点偏离大于 3.0% 时重绘前端 DOM 弹层卡片。"
          ]
        }
      },
      {
        id: "building-monitor",
        title: "智慧楼宇监控大屏",
        subtitle: "围绕“绿色能耗、设备资产、空间与人”三大数字化园区要素构建的 3D 数字孪生底座，打破传统烟囱式孤立物管，实现从“传统物业被动修缮”向“数据驱动的主动式园区生态运营”跨越的综合管理系统。",
        description: "围绕“绿色能耗、设备资产、空间与人”三大数字化园区要素构建的 3D 数字孪生底座，打破传统烟囱式孤立物管，实现从“传统物业被动修缮”向“数据驱动的主动式园区生态运营”跨越的综合管理系统。",
        metrics: [
          { label: "能耗漏损降低", value: "25.0%" },
          { label: "异常定位耗时", value: "秒级" },
          { label: "资产闲置率降至", value: "35.0%" },
          { label: "空间透视精度", value: "100%" }
        ],
        chips: ["BIM 立体拓扑空间", "多源异构数据纳管", "事件驱动型状态机", "时序数据空间聚合"],
        tags: ["BIM 数字孪生", "绿色能耗管理", "报警即定位", "空间人效分析", "园区生态运营", "数据驱动决策"],
        blueprintTitle: "系统产品架构与商业逻辑 (Product Architecture & Business Logic)",
        blueprintText: "三大功能矩阵数据闭环（完全映射实拍大屏视觉流）：\n\n**绿色能耗管理矩阵（大屏左翼）**：针对传统大楼高额的“未知能耗漏损”痛点，通过用电/用水实时统计的时序波动，结合 1F-9F 的双向对比条形图，帮助企业 ESG 或后勤官员精准卡点能源异常流向。\n\n**空间孪生与智能运维底座（大屏中央）**：基于 BIM 空间技术建立 3D 数字孪生底座。其最核心的产品设计在于“报警即定位（Alarm-to-Locate）”的事件驱动流。当任一物联网设备发生通信或物理故障时，三维模型精准闪烁，底部状态机卡片流即刻滚动呈现，缩短响应时效至秒级。\n\n**空间、人效与园区生态（大屏右翼）**：这是体现系统“高附加值”的商业灵魂所在。将数据触角伸向到访人数、工位利用率、会议室预定波动。甚至深度并接了园区食堂/商业消费订单以及热点会议主题雷达图，帮助行政资产部门在物理世界真实盘活闲置资源。",
        detailedDoc: "### 可交互沙盒 01：绿色能耗空间透视与精细化排漏（对应大屏左侧区）\n\n💡 **业务痛点**：行政主管经常面临“上个月电费莫名暴涨，却抓不出来是哪层楼、哪个部门没关设备，或者是哪个暗管漏水”的抓瞎困境。\n\n📋 **产品策略**：用双向对比条形图（橙色代表电，蓝色代表水）进行空间维度的精准切割。\n\n🎨 **前端可视化交互设计**：\n- **交互动作**：面试官在左侧控制台点击【模拟开启：夜间能耗异常排查机制】。\n- **动态效果**：大屏左下角 1F-9F 图表中的 “6F 橙色电量条” 瞬间拉长并开始闪烁红光，右侧联动输出分析报告：“检测到 6F 昨夜 02:00 出现非正常的用电负荷波峰，疑似机房空调/照明未关闭。” 证明系统是如何通过数据治理，让能耗漏损直降 25.0% 的。\n\n---\n\n### 可交互沙盒 02：“报警即定位”的应急处置闭环（对应大屏中央区）\n\n💡 **业务痛点**：传统物管系统的监控和视频是断节的。中控室看到后台二维表格弹窗报错，还要翻表格去查是哪栋楼，再去监控主机人工搜摄像头调画面，极度低效。\n\n📋 **产品策略**：打破烟囱式系统，跑通“实时事件流 → 3D 空间高亮 → 视频切片追溯”的极简闭环。\n\n🎨 **前端可视化交互设计**：\n- **交互动作**：面试官可以点击吸底事件列表中正在滚动的突发事件（如点击：“1F 西门通道出现人员异常聚集/滞留”）。\n- **动态效果**：大屏中央精细化的 3D 建筑模型视角自动平滑缩放平移（Zoom-in），在 1F 西门处亮起红色高亮呼吸灯；同时在模型上方以 Picture-in-Picture (画中画) 形式，直接弹出一个现场摄像头的真实全景监控流视窗（完美复刻实拍图效果）。向面试官直接展示“秒级异常定位”的产品交互逻辑。\n\n---\n\n### 可交互沙盒 03：资产盘活与高附加值“园区生态”治理（对应大屏右侧区）\n\n💡 **业务痛点**：行政资产总监每年在给集团汇报时，极难量化办公室和会议室的闲置率，同时也算不清园区食堂商业的整体“经济账”。\n\n📋 **产品策略**：并接物联网在线率与消费流向图，将传统冰冷的物业管理延伸到高附加值的“空间与人”的生态运营。\n\n🎨 **前端可视化交互设计**：\n- **交互动作**：面试官点击右下角的【热点会议主题雷达图】或【消费订单圆环图】。\n- **动态效果**：系统通过工位传感器在线率与会议室预定历史进行数据交叉拟合，动态高亮筛选出全园区内“空置率高达 45.0% 的无效会议室”与“长期处于预约不来状态的工位黑名单”，并给出一张清晰的“场地综合闲置率与运营优化账本”。让面试官深切感受到这套大屏是能切实帮企业算清账、提人效的资产大粮仓。",
        sysArchitecture: {
          nodes: ["BIM 三维建筑模型引擎", "多源异构物联网网关 (BACnet/Modbus/MQTT)", "绿色能耗时序分析引擎", "事件驱动型状态机 (Alarm-to-Locate)", "空间人效与园区生态运营看板"],
          flowDescription: "IoT 多源异构数据采集 -> 时序数据空间聚合(1F-9F 楼层维度) -> 绿色能耗异常检测(用电/用水双向对比) -> 事件驱动触发(报警即定位) -> 3D BIM 模型高亮 + 视频画中画联动 -> 园区生态数据交叉拟合(工位/会议/消费) -> 资产闲置优化建议输出",
          dbSchema: [
            "tb_building_energy_floor (floor_id INT, electricity_kwh DOUBLE, water_m3 DOUBLE, abnormal_flag BOOLEAN, ts TIMESTAMP)",
            "tb_alarm_event_stream (event_id UUID, device_id VARCHAR, location_3d_coord JSONB, severity ENUM, video_clip_url TEXT, resolved_state BOOLEAN)",
            "tb_space_utilization (space_type VARCHAR, space_id VARCHAR, occupancy_rate DOUBLE, idle_hours_daily DECIMAL, optimization_suggestion TEXT)"
          ],
          keyChallenges: [
            "如何让非技术背景的行政主管一眼看出哪层楼能耗异常？采用 1F-9F 双向对比条形图（橙电/蓝水），用空间直觉替代枯燥表格，6F 电量条拉长闪烁红光即代表异常，无需培训即可理解。",
            "3D 模型在高频事件下性能瓶颈？采用 LOD（Level of Detail）分级渲染 + 视锥体剔除，仅对报警区域做 Zoom-in 高精渲染，其余区域保持低模，确保 60FPS 流畅交互。"
          ]
        }
      },
                              {
        id: "subway-window",
        title: "地铁魔窗导乘项目",
        subtitle: "主导 55 寸 OLED 车载透明隐形窗视窗的 3D 孪生交互体验定义，打通「多模态数据感知-车地多端联动」数据链，在千万级客流体量下实现精准乘客分流与高附加值园区/车站生态运营的产品闭环。",
        description: "主导 55 寸 OLED 车载透明隐形窗视窗的 3D 孪生交互体验定义，打通「多模态数据感知-车地多端联动」数据链，在千万级客流体量下实现精准乘客分流与高附加值园区/车站生态运营的产品闭环。",
        metrics: [
          { label: "软硬一体化部署", value: "北上深" },
          { label: "数据跨端协同", value: "3 端" },
          { label: "拥挤度热力感知", value: "3 色" },
          { label: "覆盖客流体量", value: "千万级" }
        ],
        chips: ["多模态数据感知", "边缘算力推理", "3D 孪生视觉呈现", "车地无线自组网", "天枢系统大脑"],
        tags: ["多模态感知", "边缘算力", "3D孪生", "车地联动", "拥挤度热力", "生态运营"],
        blueprintTitle: "系统产品架构与「多端联动分流」商业逻辑 —— 从烟囱式单向广播到体验闭环的产品定义跃迁",
        blueprintText: "💡 PM 核心思维：传统地铁车载多媒体系统是孤立的「烟囱式」单向广播，乘客在站台上不知道哪节车厢空，上车后看不清车站内部扶梯分布，导致局部极度拥挤、月台无谓滞留。本系统在架构上核心实现了「多模态数据感知 → 边缘算力推理 → 3D 孪生视觉呈现 → 车地多端联动分流」的体验闭环。\\n\\n系统四层感知与交互流向：\\n- 感知层（系统的「眼睛」）：利用车载摄像头、各类重量/红外传感器，实时捕捉车内拥挤度、环境状态、列车区间位置。\\n- 网络层（系统的「神经」）：通过车内无线自组网等技术，保障各设备间大吞吐量、低延迟的双向稳定通信。\\n- 中台层（系统的「大脑」）：由「天枢」中台系统汇聚处理所有非结构化信息，协调各个子系统，打破孤立状态。\\n- 应用层（系统的「执行者」）：直接对接用户，将处理后的 3 色拥挤度等精细化信息，跨端无缝投射到魔窗、4K 高清屏、站台屏上，引导客流无感流转。",
        detailedDoc: "### 系统产品架构与「多端联动分流」商业逻辑\\n\\n**💡 PM 核心思维**\\n\\n传统地铁车载多媒体系统是孤立的「烟囱式」单向广播，乘客在站台上不知道哪节车厢空，上车后看不清车站内部扶梯分布，导致局部极度拥挤、月台无谓滞留。本系统在架构上核心实现了「多模态数据感知 → 边缘算力推理 → 3D 孪生视觉呈现 → 车地多端联动分流」的体验闭环。\\n\\n**系统四层感知与交互流向**\\n\\n1. **感知层（系统的「眼睛」）**\\n   利用车载摄像头、各类重量/红外传感器，实时捕捉车内拥挤度、环境状态、列车区间位置。\\n\\n2. **网络层（系统的「神经」）**\\n   通过车内无线自组网等技术，保障各设备间大吞吐量、低延迟的双向稳定通信。\\n\\n3. **中台层（系统的「大脑」）**\\n   由「天枢」中台系统汇聚处理所有非结构化信息，协调各个子系统，打破孤立状态。\\n\\n4. **应用层（系统的「执行者」）**\\n   直接对接用户，将处理后的 3 色拥挤度等精细化信息，跨端无缝投射到魔窗、4K 高清屏、站台屏上，引导客流无感流转。",
        sysArchitecture: {
          nodes: ["列车总线网络 (TCMS)", "OLED 车载边缘控制端", "WebGL/Pixi.js 地理网重构", "透明 OLED 显示硬端", "车站位置插值微调"],
          flowDescription: "列车轮脉冲及 GPS 捕获 -> 车载 OBU 解码 -> GeoJSON 切片加载 -> 实时拉伸 3D 透视角度 -> 输出周边出口换乘动效窗",
          dbSchema: [
            "tb_train_obu_routes (segment_id VARCHAR, start_meter DOUBLE, terminal_meter DOUBLE, geojson_mesh FLOAT[])",
            "tb_obu_status_logs (train_id VARCHAR, cur_speed FLOAT, odograph_val BIGINT, current_station_id VARCHAR)"
          ],
          keyChallenges: [
            "车厢颠簸导致 3D 图像抖动失真？加入运动补偿滤波器（ST-Compensation），抹平 20Hz 阶段的高频微震动噪声。",
            "透明屏功耗温度大，极易在密闭玻璃中折损寿命？建立温度控制动态降频机制（Thermal Throttle），无列车到站时主动将不必要图样静置并背景全黑，将热发散直降 38%。"
          ]
        }
      },
      {
        id: "station-monitor",
        title: "车站运营监控平台",
        subtitle: "全面主导并定义 3D 孪生大屏的前沿视觉交互语言，实现多维环境指标时序沉淀。",
        description: "基于 3D 数字孪生与全景时序感知技术，构建大型轨交枢纽综合防灾与资产运营调度平台。通过立体空间定位打点与异常状态错误码联动的事件驱动机制，实现设备状态可视化、环境监测与车厢红黄蓝热力感知的统一调度管理。",
        metrics: [
          { label: "设备保障正常率", value: "100%" },
          { label: "高峰期月台滞留削减", value: "20.0%" },
          { label: "多维环境指标", value: "秒级采集" },
          { label: "车站设备立体覆盖率", value: "100%" }
        ],
        chips: ["数字孪生", "设备状态可视化", "环境监测", "车厢热力感知", "风险防控"],
        tags: ["数字孪生", "3D 大屏", "轨交运营", "实时监控", "风险防控", "数据驱动决策"],
        blueprintTitle: "基于\"立体空间定位打点 + 异常状态错误码联动\"的事件驱动型三维调度管理网关",
        blueprintText: "全面主导并定义 3D 孪生大屏的前沿视觉交互语言，实现多维环境指标时序沉淀。通过立体空间定位打点技术，将车站设备、环境传感器、客流数据统一映射到三维模型中，当异常状态触发错误码时自动联动高亮定位，驱动调度人员快速响应。",
        detailedDoc: "### 车站运营数字孪生亮点\n\n1. **多维环境指标时序沉淀**: 温湿度、CO2 浓度、噪音、光照等多维指标秒级采集并沉淀为时序数据，支撑历史回溯与趋势预测。\n2. **车厢红黄蓝热力感知**: 基于车载重量传感器与视觉识别，实时计算各车厢拥挤度并以红黄蓝三色热力图呈现在 3D 站台模型上。\n3. **综合防灾联动**: 火警、水浸、入侵等异常事件触发时，3D 模型自动 Zoom-in 到事发位置，同时弹出周边摄像头实时画面与 SOP 处置指引。",
        sysArchitecture: {
          nodes: ["车站 3D BIM 数字孪生模型", "多源环境传感器网关", "实时时序数据处理引擎", "事件驱动调度管理中枢", "防灾应急联动响应模块"],
          flowDescription: "多源传感器数据采集 -> 时序清洗聚合 -> 注入 3D 数字孪生模型 -> 异常状态检测 -> 错误码联动高亮定位 -> 调度员确认 -> 应急预案自动推送",
          dbSchema: [
            "tb_station_3d_asset (asset_id VARCHAR, location_3d_coord JSONB, device_type VARCHAR, status ENUM, last_heartbeat TIMESTAMP)",
            "tb_env_metrics_history (metric_id VARCHAR, station_zone VARCHAR, metric_value DOUBLE, ts TIMESTAMP)",
            "tb_dispatch_event_log (event_id UUID, error_code VARCHAR, asset_id VARCHAR, dispatcher_id VARCHAR, resolved_at TIMESTAMP)"
          ],
          keyChallenges: [
            "大型枢纽设备点位数以万计，如何保证 3D 模型加载流畅？采用 LOD 分级加载 + 视锥体剔除 + 异步流式渲染，确保 60FPS。",
            "多系统异构数据如何统一时空基准？建立全局统一坐标系与时间同步对齐机制，所有传感器数据归一化到同一时空参考系。"
          ]
        }
      }
    ]
  },
  {
    id: "iot",
    name: "IoT设备管理&动环监控",
    tagline: "工业级高并发基础设施实时数据采集、物理拓扑感知与全链路闭环管理平台",
    projects: [
      {
        id: "idc-iot",
        title: "数据中心动环监控",
        subtitle: "秒级判断故障并基于知识图谱进行根因定位，全面覆盖电力、暖通、UPS及安防消防。",
        description: "设计物联网一体化运管平台，承载千万级传感器测点的高并发实时数据流。",
        metrics: [
          { label: "故障判断响应", value: "秒级定位" },
          { label: "同类告警压缩率", value: "75.0%" },
          { label: "告警规则灵活度", value: "4 级自定义" },
          { label: "检测传感器并发", value: "10 万+ 级" }
        ],
        chips: ["秒级故障报警", "根因定位图谱", "告警压缩去重", "无感通行轨迹", "动态上下限阈值"],
        tags: ["IoT", "Modbus/SNMP", "实时告警", "故障根因分析", "风险防控", "降本增效"],
        blueprintTitle: "联动音视频/门禁无感通行的以脸搜脸轨迹寻踪与安全管控引擎",
        blueprintText: "利用高可用轮询器抓取多传感器报文，通过 ProtoBuffer 高效编解码插件格式化为一致的 JSON 动环时序流，存入高容量 Kafka 队列泄洪，最终写入分片时序 InfluxDB，并在判定环境温度越温过大时，在 2秒内通过控制向 PLC 发送高频调控指令闭环控制风冷转速。",
        detailedDoc: "### 动环监控的工业铁骑\n\n1. **物模型热修改**: 运维无需重启程序直接在此工作区添加全新网关 offset 与寄存器位。\n2. **物理去噪拦截**: 本地端死区（Dead band）去噪，指标偏离不足 0.5% 不上送，一举降低主网 IO 负载高压。\n3. **多协议级联适配**: 兼容异构变电站 SNMP 信息，高清晰实现设备并网整合。",
        sysArchitecture: {
          nodes: ["现场配电/冷机传感器", "智能网关 (南向协议池)", "Kafka 吞吐吞吐流", "时序切片数据库 (TimescaleDB)", "实时警报与控制组件"],
          flowDescription: "设备模拟上报 -> 网关多协议多线程获取 -> Kafka 分流派送 -> (异常状态推向 Flink 计算告警 | 稳定时序写入时序库) -> 控制网关发送反控指令到 PLC 机实现反控制调温",
          dbSchema: [
            "tb_device_telemetry_history (dev_id VARCHAR, metric_key VARCHAR, metric_value DOUBLE PRECISION, status CHAR, ts TIMESTAMP)",
            "tb_device_meta_model (model_id INT, protocol_protocol VARCHAR, register_offset INT, bit_length INT, conversion_rule TEXT)"
          ],
          keyChallenges: [
            "千万测点导致写时序库 I/O 长期跑满 99%？基于 Redis 延迟通道设立 3秒滑动缓冲池批量 Batch 吞吐，让磁盘损耗巨幅降低 90%。",
            "个别末端节点意外频繁离线断触？新增局域网局备心跳探测策略，3次断线自启动热备网关通道重构映射路径。"
          ]
        }
      },
      {
        id: "ems-system",
        title: "EMS 能源管理系统",
        subtitle: "依托数字孪生实现 PUE/CLF 精细化统计，驱动华为 iCooling 与夜间黑灯智能节能。",
        description: "搭建 TB 级分布式能效分析平台，集成智能控温与黑灯节能运营策略。",
        metrics: [
          { label: "PUE 损耗降低", value: "12.0%" },
          { label: "未来能效预测度", value: "> 91.0%" },
          { label: "抄表财务对账率", value: "100% 自动" },
          { label: "夜间照明节电率", value: "15.0%" }
        ],
        chips: ["PUE/CLF 能效分析", "智能自动调控", "折损分析", "自动抄表计费", "碳排放管理"],
        tags: ["能源采集", "PUE优化", "碳排放管理", "基线预警", "节能调优", "降本增效", "风险防控"],
        blueprintTitle: "融合设备支路/客户维度的全链路损耗分析与自动控制闭环",
        blueprintText: "利用 InfluxDB 归集冷塔和阀门时序电流。配合外部气象动态，由 Prophet 模型计算预测明日下午 2 点楼宇的峰值负荷偏高区，并在不损失舒适度大前提下，提前 30 分钟通过 BACnet 改变冷冻水循环速度，完成全周期冷控节能降耗。",
        detailedDoc: "### 综合能效优化闭环规划\n\n1. **电气特征波特征分解**: 检测空调谐波，无需独立在插座布测测电表即可定位异常运行微漏电电器。\n2. **碳积分核实一包化**: 依照 ISO 标准自动折合。自动对高管一目了然生成碳税、碳排扣减看板。\n3. **异构网段秒级拼账**: 打破各省加盟分仓库能耗分散困境，利用统一对账，一秒掌握全分店周碳指标。",
        sysArchitecture: {
          nodes: ["智能配电所高频电表", "能耗事件时序 Kafka 存储", "Prophet 预测大数据中枢", "BACnet 通信硬件控制器", "ESG 减排汇总大屏"],
          flowDescription: "电度表电流高 sampling -> 数据归入 Kafka -> Prophet 提取明日空气负荷热网 -> 锁定出水管温差最佳解 -> 控制 BACnet 继电器执行制冷配平 -> 碳盘账表产出",
          dbSchema: [
            "tb_energy_load_predict (grid_zone_id VARCHAR, pre_time TIMESTAMP, pre_load DOUBLE, actual_load DOUBLE)",
            "tb_nilm_device_features (feature_id INT, device_type VARCHAR, v_i_waveform_blob BLOB, match_threshold FLOAT)"
          ],
          keyChallenges: [
            "遇到高温大旱天气预测大波动偏离目标？自拉载历史高温特征，并与区域潮汐流量混合多重因子重构神经网络输入，将短期能效偏差降至低于 5.2% 的惊人水平。",
            "现场掉网造成数据空洞？设计时序插值算法（Moving Median Interpolation）进行二次填充重算，彻底免除报表未平账坏习惯。"
          ]
        }
      },
      {
        id: "dcim-platform",
        title: "DCIM（数据中心基础设施管理）",
        subtitle: "规划基础设施管理平台，跑通设备异常、自动派单到移动巡检的全链路闭环。",
        description: "构建工业级数据中心基础设施统管平台，聚焦电力/制冷/空间三轴容量优化与全生命周期运营。打通多物理系统烟囱式数据隔离，实现从线上预警驱动到线下移动巡检的闭环资产管理。",
        metrics: [
          { label: "核心故障修复效率提升", value: "45%" },
          { label: "设备状态全局透视率", value: "100%" },
          { label: "容量监控覆盖维度", value: "3 轴 (电力/制冷/空间)" },
          { label: "运行资产统计变更", value: "自动化" }
        ],
        chips: ["容量管理", "能效分析(PUE/CLF)", "基础设施全生命周期", "数据驱动决策", "自动化派单"],
        tags: ["DCIM", "容量管理", "ITIL 工单", "移动巡检", "数据驱动决策", "降本增效"],
        blueprintTitle: "打通\"多物理系统烟囱数据隔离\"到\"线上预警驱动线下移动巡检\"的闭环资产管理看板",
        blueprintText: "规划基础设施管理平台，跑通设备异常检测、自动工单派发到移动端现场巡检确认的全链路闭环。基于电力/制冷/空间三轴容量模型，实时监控设备健康度与容量趋势，当指标越限时自动触发告警并生成工单，巡检人员通过移动 PDA 接收任务并现场反馈，形成完整的数字化运营飞轮。",
        detailedDoc: "### DCIM 基础设施管理核心能力\n\n1. **三轴容量可视化**: 电力（UPS/PDU 负载）、制冷（精密空调/CRAH 效率）、空间（机柜 U 位/承重）三维容量实时监控与趋势预测。\n2. **自动派单闭环**: 设备异常或容量越限 -> 自动生成 ITIL 工单 -> 智能路由至对应运维组 -> 移动 PDA 接收 -> 现场扫码确认 -> 自动关闭工单。\n3. **移动巡检数字化**: 巡检计划自动推送至 PDA，支持 NFC/二维码点位打卡、拍照上传、异常一键转工单，全程可追溯。",
        sysArchitecture: {
          nodes: ["三轴容量数据采集层 (电力/制冷/空间)", "设备异常检测与阈值告警引擎", "ITIL 工单流引擎 (DAG 状态机)", "移动巡检 PDA 端", "资产全生命周期管理看板"],
          flowDescription: "容量/状态数据实时采集 -> 三轴容量模型计算 -> (正常 | 越限触发告警+自动派单) -> 运维组接收工单 -> 移动PDA现场巡检确认 -> 反馈结果 -> 工单关闭 -> 资产记录更新",
          dbSchema: [
            "tb_dcim_device_asset (asset_id VARCHAR, rack_u_pos INT, power_kw DOUBLE, cooling_ton DOUBLE, weight_kg DOUBLE, status ENUM)",
            "tb_dcim_capacity_threshold (threshold_id VARCHAR, axis_type ENUM, warn_value DOUBLE, critical_value DOUBLE, asset_id VARCHAR)",
            "tb_dcim_patrol_task (task_id VARCHAR, patrol_plan_id VARCHAR, checkpoint_id VARCHAR, inspector_id VARCHAR, photo_url TEXT, completed_at TIMESTAMP)"
          ],
          keyChallenges: [
            "电力/制冷/空间三个维度数据来自不同异构系统，如何统一建模？建立统一设备数字孪生模型（Digital Twin），将物理设备映射为统一的数据实体，屏蔽底层协议差异。",
            "线下巡检与线上数据如何实时同步不丢？采用移动端离线缓存 + 冲突解决机制（Last-Write-Wins + 人工仲裁），确保弱网环境下数据完整性。"
          ]
        }
      }
    ]
  },
  {
    id: "saas-order",
    name: "SaaS管理平台&工单系统",
    tagline: "基于 ITIL 标准的数字化机房资产全生命周期与运维综合管理 SaaS",
    projects: [
      {
        id: "idc-dcom",
        title: "数据中心 DCOM（工单/巡检/维保）",
        subtitle: "基于标准 ITIL 架构打造的工业级低代码工单流引擎与数字化运维闭环体系。",
        description: "数据中心 DCOM（工单/巡检/维保）管理系统是一款基于标准 ITIL 架构打造的工业级低代码工单流引擎与数字化运维闭环体系。项目精准对焦智算中心在日常高密巡检中面临的核心痛点：多级告警引发的一线值班员「警报疲劳」、传统手动排班无法全链路追溯防漏单、以及现场维护保养流程缺乏规范的 EOP/SOP 指引。",
        metrics: [
          { label: "降低警报疲劳", value: "70%" },
          { label: "平均修复故障时间缩短", value: "45%" },
          { label: "工单流转分级", value: "4 级" },
          { label: "运维管理全链路留存", value: "100%" }
        ],
        chips: ["低代码工单引擎", "ITIL标准规范体系", "自动化巡检计划调度", "SOP移动端现场深度感知", "知识库关联收敛"],
        tags: ["ITIL", "工单系统", "巡检计划", "维保管理", "知识库", "值班排班", "降本增效"],
        blueprintTitle: "从「多级告警工单自动化流转」到「知识库秒级检索联动」的全链路闭环运维体系",
        blueprintText: "系统旨在破除传统物业孤立管理和非标执行的弊端，围绕全天候精细化机房管理建立四大核心功能模块：低代码 ITIL 工单引擎、智能巡检路线调度、标准化设备维护保养、智能值班与知识库闭环。",
        detailedDoc: "",
        sysArchitecture: {
          nodes: ["低代码 ITIL 工单引擎层", "智能巡检路线调度层", "标准化设备维护保养层", "智能值班与知识库闭环层"],
          flowDescription: "动环异常告警触发 → 工单引擎自动流转 → 巡检计划智能派单 → 移动端离线 SOP 维保填报 → 数据同步建册 → 知识库关联收敛",
          dbSchema: [
            "tb_itil_workflow_def (flow_id VARCHAR, dag_dsl JSONB, version INT, creator VARCHAR, is_active BOOLEAN)",
            "tb_itil_ticket_instance (ticket_id VARCHAR, flow_id VARCHAR, current_node_id VARCHAR, priority ENUM('P1','P2','P3','P4'), sla_due TIMESTAMP)",
            "tb_inspection_route (route_id VARCHAR, route_name VARCHAR, checkpoint_list JSONB, schedule_cron VARCHAR)",
            "tb_device_maintenance_ledger (ledger_id VARCHAR, asset_code VARCHAR, cycle VARCHAR, last_maint_date TIMESTAMP, sop_doc_ref VARCHAR)"
          ],
          keyChallenges: [
            "多级告警导致一线「警报疲劳」？建立智能告警压缩引擎，同类告警自动合并或按优先级分级派发，降低 70% 无效警报干扰。",
            "弱网环境下移动端数据丢失？采用本地离线缓存 + 自动冲突合并机制，确保断网时巡检数据不丢失，恢复网络后自动同步。",
            "维保经验无法沉淀复用？知识库与动环监控告警双向关联，同类告警触发时秒级匹配历史方案，让新人快速还原老手经验。"
          ]
        }
      },
      {
        id: "hotel-linen",
        title: "酒店布草全生命周期管理 SaaS",
        subtitle: "主导“出厂级 RFID 硬件 + AI 分析决策 + SaaS”的软硬一体化解决方案。",
        description: "酒店布草全生命周期管理 SaaS 是一款主导“出厂级 RFID 硬件 + AI 分析决策 + SaaS”的软硬一体化解决方案。项目专注于攻克传统酒店布草粗放式管理中盘点效率低（交接耗时 2-3 小时）、资产流失严重（年均丢失率达 5%-8%）以及因无法精准统计单件布草洗涤次数导致的过时报废引来客诉等核心商业死穴。",
        metrics: [
          { label: "自动补货闭环", value: "100% 转化" },
          { label: "交接清点效率提升", value: "40%" },
          { label: "追踪溯源深度", value: "单件级" },
          { label: "周转盘点流转", value: "秒级" }
        ],
        chips: ["出厂级RFID硬件集成", "Bento高管治理看板", "傻瓜化防呆保洁APP", "住客安心住存证H5", "自动补货Agent后台"],
        tags: ["RFID", "AI预测", "SaaS", "多端矩阵", "供应链闭环", "降本增效"],
        blueprintTitle: "IoT 智能化硬件层 ⟹ 数据采集监控层 ⟹ AI 分析决策层 ⟹ 多端应用层",
        blueprintText: "系统重塑了传统软件只管数据、不管实物的脱节现状，采用 IoT 智能化硬件层、数据采集时序监控层、AI 分析决策层、多端高级应用层的全业务全生命周期闭环架构。",
        detailedDoc: "",
        sysArchitecture: {
          nodes: ["IoT 智能化硬件层", "数据采集与时序监控层", "AI 分析决策层", "多端高级应用层"],
          flowDescription: "RFID标签出厂缝制 ⟹ 4天线门型阵列秒级群读 ⟹ 时序数据清洗写入 IoTDB ⟹ Prophet 需求预测 ⟹ 自动补货 Agent ⟹ ERP 反向写入排他性闭环",
          dbSchema: [
            "tb_linen_asset (asset_id VARCHAR, rfid_epc VARCHAR, sku_name VARCHAR, wash_count INT, lifecycle_status ENUM, hotel_id VARCHAR)",
            "tb_laundry_batch (batch_id VARCHAR, sent_qty INT, returned_qty INT, diff_qty INT, wash_factory_id VARCHAR, scan_timestamp TIMESTAMP)",
            "tb_demand_forecast (forecast_id VARCHAR, sku_name VARCHAR, predicted_gap INT, confidence DOUBLE, forecast_date DATE, order_status ENUM)"
          ],
          keyChallenges: [
            "人工清点耗时 2-3 小时且记错账？RFID 万件级秒群读 + 自动对账差异雷达，将交接时间从 2 小时压缩至秒级，年均流失率从 5-8% 降至 <1%。",
            "采购无法精准控制库存水位？Prophet 需求预测结合 PMS 客房预订率，提前 30-90 天计算安全水位缺口，自动派发补货订单到供应商 ERP。",
            "布草洗涤次数无法追溯导致过早报废？单件 RFID 洗涤计数器精确跟踪每条布草的生命周期，自动触发报废预警，避免客诉。"
          ]
        }
      },
      {
        id: "hohhot-unionpay",
        title: "银联前置支付系统（呼和浩特 1/2 号线）",
        subtitle: "专为城市轨道交通设计开发的高并发、金融级清分对账与信用垫资风控底层结算核心平台。",
        description: "银联前置支付系统是专为城市轨道交通（呼和浩特地铁 1、2 号线）设计开发的高并发、金融级清分对账与信用垫资风控底层结算核心平台。项目专注于解决地铁在全面推行「先乘后付」信用出行模式下，海量脱机/联机异构交易流水的清分对账极易出现单边账与错账扯皮、灰产恶意逃票与欠费引发信用垫资坏账流失、以及多线路票款营收无法实时横向全局穿透的硬核业务痛点。系统主导设计了「行程 O-D 轨迹精确映射」与「差异账自动轧差平衡引擎」，支持多线复杂客流与营收指标时序沉淀，实现风控黑名单秒级拦截过滤，达成差异错账 100% 全自动轧差，用最高级别的账务精确度筑牢公共交通金融资产安全防线。",
        metrics: [
          { label: "风控拦截时效", value: "秒级" },
          { label: "差异账自动轧差率", value: "100%" },
          { label: "流水分流映射精度", value: "O-D轨迹" },
          { label: "对账结算业务级", value: "金融级" }
        ],
        chips: ["多线客流时序监控", "O-D行程轨迹映射", "错账自动轧差引擎", "RBAC标准权限控制", "黑名单生命周期管理"],
        tags: ["金融支付", "清分对账", "风控系统", "O-D轨迹", "RBAC"],
        blueprintTitle: "围绕大交路金融交易生命周期建立四大高联动功能治理模块",
        blueprintText: "系统摒弃了传统支付前置系统功能分裂、对账滞后的黑盒模型，在功能骨架上围绕大交路金融交易生命周期，建立了四大高联动的功能治理模块：数字化运营与营收看板层、交易流水与行程映射层、金融账务对账结算层、乘客信用风控管理层（黑名单）。",
        detailedDoc: "### 系统架构\n\n1. **数字化运营与营收看板层**：深度聚合多线路实时客流时序数据流（1号线蓝线/2号线绿线），打通历年收益趋势对比与明细占比，并提供一键可达的快捷业务入口微卡片，全面穿透数字化营收大盘。\n2. **交易流水与行程映射层**：负责承接多线透传的脱机/联机交易，建立多渠道结算清分矩阵。系统将散乱的交易流水深度解耦并精确对齐为乘客的「进站-出站」完整链路（O-D 轨迹），确保扣费账单与空间轨迹 100% 强绑定。\n3. **金融账务对账结算层**：封装核心平账状态机，无缝并接银行及银联网络对账单导入。系统支持秒级全量自动轧差对账，针对单边账、错账建立标准轧差平账机制，消除票款漏损。\n4. **乘客信用风控管理层（黑名单）**：专门应对「先乘后付」的信用垫资风险。针对因分卡刷票、额度不足导致扣款失败的非正常用户，系统自动触发状态机切换，将其秒级拉入黑名单限制进站通行；并配有补缴后一键解冻移出的全生命周期管理流。",
        sysArchitecture: {
          nodes: ["数字化运营与营收看板层", "交易流水与行程映射层", "金融账务对账结算层", "乘客信用风控管理层"],
          flowDescription: "多线路实时客流时序数据流 -> 交易流水 O-D 轨迹精确映射 -> 银行/银联对账单导入 -> 秒级全量自动轧差对账 -> 黑名单秒级拦截 -> 补缴后一键解冻",
          dbSchema: [
            "tb_revenue_dashboard (id BIGINT, line_no VARCHAR, passenger_flow INT, revenue DECIMAL(18,2), ts TIMESTAMP)",
            "tb_od_trajectory (id BIGINT, trip_id VARCHAR, entry_station VARCHAR, exit_station VARCHAR, amount DECIMAL(18,2), matched BOOLEAN)",
            "tb_reconciliation_ledger (id BIGINT, tx_sequence_no VARCHAR, card_no VARCHAR, amount DECIMAL(18,2), exception_type VARCHAR, reconciled BOOLEAN)",
            "tb_blacklist_registry (id BIGINT, user_id VARCHAR, card_no VARCHAR, arrears_amount DECIMAL(18,2), status ENUM, blocked_at TIMESTAMP)"
          ],
          keyChallenges: [
            "海量脱机/联机异构交易流水如何保证 O-D 轨迹 100% 强绑定？采用行程流水号精确映射引擎，确保扣费账单与空间轨迹零误差对齐。",
            "信用垫资坏账如何秒级拦截？建立黑名单状态机，针对扣款失败用户秒级拉黑限制进站，补缴后一键解冻移出，实现全生命周期闭环管理。"
          ]
        }
      }
    ]
  },
  {
    id: "ai-edge",
    name: "AI识别&边缘计算",
    tagline: "基于自动化边缘计算与多端闭环联动的轨道交通主动安全 AI 大脑",
    projects: [
      {
        id: "subway-perception",
        title: "地铁综合感知系统（IPSS）",
        subtitle: "云-边-端一体化边缘智能感知与跨端应急指挥协同平台。",
        description: "地铁综合感知系统（IPSS）是一款面向城市轨道交通安全运营与最优出行体验打造的「云-边-端」一体化边缘智能感知与跨端应急指挥协同平台。项目针对应急调度中「车厢安全监控完全依赖人工轮巡、高危事件 OCC 调度中心感知严重滞后、终点站人工清客耗时耗力影响列车折返效率」等核心运力与安全死穴，构建了「多传感器边缘 CV 推理 → 场景事件深度语义解析 → 自动化应急 SOP 编排 → OCC 指挥中心与一线移动端秒级数据闭环」的主动式防护体系。系统通过 3 秒内边缘判定、5 秒内自动生成结构化 SOP，将全链路协同响应时效极限压缩至 8 秒级，实现高危安全隐患 100% 毫秒级精准抓取。",
        metrics: [
          { label: "全链路应急协同", value: "8秒级" },
          { label: "边缘判定时效", value: "3秒内" },
          { label: "SOP自动生成", value: "5秒" },
          { label: "高危事件抓取率", value: "100%" }
        ],
        chips: ["边缘智能CV计算网关", "场景多模态行为语义解析", "自动化应急SOP流程编排", "云边协同多终端动态联动", "分布式神经网络模型"],
        tags: ["边缘计算", "行为识别", "SOP编排", "多端联动", "DMS疲劳监测", "主动安全"],
        blueprintTitle: "基于「云-边-端」协同的高内聚产品架构体系",
        blueprintText: "系统彻底打破了传统监控视频「只录不算、与业务系统断节」的黑盒现状，围绕轨道交通高密在途生命线，建立了端侧异构多源感知层、边侧高并发智能推理层、云侧 AI 大脑与 SOP 编排层、多端异步实时协同层的四层高内聚产品架构。",
        detailedDoc: "### 系统架构\n\n1. **端侧异构多源感知层**：全面整合车厢、月台全量高清视频流，高吞吐并接各类传感器及重量测点时序数据，空间网格化捕捉客流密度与设备姿态。\n2. **边侧高并发智能推理层**：通过部署于车载及车站的边缘智能计算网关，加载地铁封闭空间定制深度神经网络模型，3 秒内完成本地数据降噪、目标移动路径跟踪与个体/群体异常行为边缘判定。\n3. **云侧 AI 大脑与 SOP 编排层**：核心控制中台统一承接边侧透传的结构化事件荷载，5 秒内根据预设业务逻辑，自动化组装并生成符合国标指引的标准应急预案（SOP）数据流。\n4. **多端异步实时协同层**：基于 WebSocket 长连接状态机，打通 OCC 控制中心大屏、站台维保移动端与车厢/站台高清多媒体显示终端的数据链路，实现「全端预警、多端联动、全过程 100% 数字化留存」。",
        sysArchitecture: {
          nodes: ["端侧异构多源感知层", "边侧高并发智能推理层", "云侧 AI 大脑与 SOP 编排层", "多端异步实时协同层"],
          flowDescription: "多源传感器视频/时序数据 -> 边缘智能网关 CV 推理（3秒） -> 结构化事件 Payload 透传 -> AI 大脑 SOP 自动编排（5秒） -> WebSocket 多端异步下发 -> OCC大屏/移动端/车载终端协同响应",
          dbSchema: [
            "tb_edge_event_records (evt_id UUID, box_id VARCHAR, cam_ip VARCHAR, evt_type VARCHAR, confidence DECIMAL(5,4), payload JSON, ts TIMESTAMP)",
            "tb_sop_dispatch_log (id BIGINT, evt_id VARCHAR, sop_type VARCHAR, dispatch_target VARCHAR, status ENUM, latency_ms INT)",
            "tb_train_clearance_scan (id BIGINT, train_code VARCHAR, carriage_no INT, has_passenger BOOLEAN, has_left_item BOOLEAN, detail TEXT, ts TIMESTAMP)",
            "tb_dms_face_mesh_log (id BIGINT, driver_id VARCHAR, fatigue_score INT, mesh_status ENUM, filter_stage VARCHAR, action_taken TEXT, ts TIMESTAMP)"
          ],
          keyChallenges: [
            "高封闭移动空间内如何 3 秒完成群体异常行为判定？采用定制化深度神经网络模型，在边缘网关本地完成数据降噪与个体/群体行为语义解析，避免云端传输延迟。",
            "如何解决传统 DMS 系统大面积误报导致「警报疲劳」？引入两阶段反误报过滤——结合面部肌肉拓扑与多帧时序特征验证，区分真实疲劳与转头/逆光等环境噪声，实现高抗噪零漏报。"
          ]
        }
      },
      {
        id: "dms-driver",
        title: "DMS轨道交通司机疲劳与行为监测系统",
        subtitle: "「云-边-端」高实时、低误报级视觉行为推理与主动防御平台。",
        description: "DMS轨道交通司机疲劳与行为监测系统是一款面向城市轨道交通行车主动安全防线打造的「云-边-端」高实时、低误报级视觉行为推理与主动防御平台。项目专注于攻克司乘模式下司机因长时间单调驾驶产生的生理疲劳（闭眼、打哈欠）及分心违规（看手机、抽烟、擅离职守）引发的重大行车安全隐患。通过 468 点面部关键点网格提取三维头部姿态、眼睛睁闭度（EAR）与嘴巴张合度（MAR），结合滑动时间窗口多帧时序推理与双阶段反误报过滤机制，实现边缘判定响应 <300ms、假阳性误报率 <2%、高危行为抓取率 100%。",
        metrics: [
          { label: "边缘判定响应", value: "<300ms" },
          { label: "假阳性误报率", value: "<2%" },
          { label: "削减警报疲劳", value: "65%" },
          { label: "高危行为抓取率", value: "100%" }
        ],
        chips: ["468点面部关键点网格", "视线三维向量追踪", "多帧时序行为推理", "双阶段反误报过滤机制", "阶梯式无感降级报警"],
        tags: ["边缘计算", "计算机视觉", "DMS", "疲劳监测", "Face Mesh", "反误报"],
        blueprintTitle: "「多源采集-边缘打点-时序推理-多端联动」的高并发闭环控制体系",
        blueprintText: "系统围绕司机室在途行为的全生命周期，建立了高抗噪图像采集层、边缘面部拓扑网格层、时序行为特征推理层、阶梯式无感调度响应层的四层闭环控制体系。",
        detailedDoc: "### 系统架构\n\n1. **高抗噪图像采集层**：采用车载红外补光/宽动态摄像模组，无视隧道全黑、强逆光及司机配戴墨镜等物理噪声，全时段低延迟全量吞吐高清面部时序数据流。\n2. **边缘面部拓扑网格层**：部署边缘智能网关，实时提取面部 468 个空间几何关键点（Face Mesh），建立三维头部姿态、眼睛睁闭度（EAR）以及嘴巴张合度（MAR）的参数化画像，输出高精度的视线朝向向量。\n3. **时序行为特征推理层**：摒弃死板的单帧像素判定，引入滑动时间窗口机制对连续多帧的面部特征流进行时序纵向深度拆解。通过提取连续时间轴内的微动作变化率，精准剥离转头、说话、擦汗等非标日常动作，完成两阶段的高抗噪反误报过滤。\n4. **阶梯式无感调度响应层**：当边缘判定确诊高危行为后，系统触发分级状态机切换。初级疲劳激活司机室本地无感微弱震动/语音提醒；重度危机通过 WebSocket 秒级将带有异常图像切片的结构化 Payload 投递至 OCC 控制中心大屏。",
        sysArchitecture: {
          nodes: ["高抗噪图像采集层", "边缘面部拓扑网格层", "时序行为特征推理层", "阶梯式无感调度响应层"],
          flowDescription: "红外/宽动态摄像头 -> 边缘网关 468点Face Mesh -> EAR/MAR实时计算 -> 滑动窗口多帧时序推理 -> 双阶段反误报过滤 -> (正常继续 | 疲劳本地震动提醒 | 重度WebSocket上报OCC)",
          dbSchema: [
            "tb_dms_face_mesh_log (id BIGINT, driver_id VARCHAR, mesh_points JSONB, ear_value DECIMAL(4,3), mar_value DECIMAL(4,3), gaze_vector VARCHAR, ts TIMESTAMP)",
            "tb_dms_time_sequence_filter (id BIGINT, evt_id VARCHAR, raw_label VARCHAR, stage_one_result VARCHAR, stage_two_result VARCHAR, final_verdict VARCHAR, ts TIMESTAMP)",
            "tb_dms_alert_dispatch (id BIGINT, ticket_id VARCHAR, train_id VARCHAR, driver_id VARCHAR, risk_level INT, snapshot_url TEXT, payload JSONB, ts TIMESTAMP)"
          ],
          keyChallenges: [
            "司机颠簸转头导致面部角度偏移被错判为闭眼？通过 468 点 Face Mesh 建立三维头部姿态参数化画像，结合滑动时间窗口多帧时序推理，精准区分真实疲劳与环境噪声。",
            "假阳性误报泛滥导致管理人员「警报疲劳」？引入两阶段反误报过滤——面部肌肉时序微动频率校验 + 多帧滑动窗口频次验证，将误报率控制在 2% 以下。"
          ]
        }
      },
      {
        id: "passenger-abnormal",
        title: "乘客异常行为识别系统",
        subtitle: "寄生于城市轨道交通高密公共空间、基于「云-边-端」协同架构的主动式安全边缘 CV 研判平台。",
        description: "乘客异常行为识别系统是一款寄生于城市轨道交通（地铁车厢及站台台面）高密公共空间、基于「云-边-端」协同架构的主动式安全边缘 CV 研判平台。项目专注于攻克传统地铁安防极度依赖人工盯着成百上千路监控画面导致的「视觉疲劳漏报」、突发暴力冲突（打架）与意外身体不适（倒地晕厥）缺乏前哨感知导致错失黄金救援时机、以及车厢隐蔽违规（吸烟/电子烟）引发消防隐患等核心公共安全死穴。",
        metrics: [
          { label: "异常捕获时效", value: "毫秒级" },
          { label: "安全隐患抓取率", value: "100%" },
          { label: "假阳性误报率", value: "<3%" },
          { label: "跨端响应控制", value: "秒级" }
        ],
        chips: ["边缘端智能CV网关", "人体骨骼关键点追踪", "微小目标语义解析", "时序多模态行为判别", "事件驱动型自动调图状态机"],
        tags: ["边缘计算", "计算机视觉", "行为识别", "异常检测", "应急响应", "反误报"],
        blueprintTitle: "「多源接入-边缘洗炼-状态分级-跨端触达」的高并发全要素闭环治理底座",
        blueprintText: "系统彻底打破了传统监控「只录像、不计算、业务脱节」的黑盒现状，围绕高密客流在途全生命周期，建立了流数据接入层、边缘行为解析层、状态机分级决策层、跨端业务触达层的四层高并发全要素闭环治理底座。",
        detailedDoc: "### 系统架构\n\n1. **流数据接入层**：实时高吞吐并接全车厢及月台的高清网络摄像头 RTSP/WebRTC 视频流，无视隧道全黑、车厢局部拥挤干扰，保障全量底层视觉要素的秒级无感输入。\n2. **边缘行为解析层**：部署重载边缘 NVR 智能网关，加载高拟合深度学习算法模型。通过人体行为动力学及多帧滑动时间窗口，提取乘客在车厢空间的物理分布和微动作变化率，实现本地 3 秒内的极速前哨行为判定。\n3. **状态机分级决策层**：核心控制中台对下传的结构化 Payload 荷载进行意图深度拆解与危害度分级（分为 ROUTINE 正常、SUSPECTED 疑似、CRITICAL 危机），根据空间元数据（车次、车厢号、站台号）实时激活对应的业务状态机。\n4. **跨端业务触达层**：基于 WebSocket 长连接，平滑联动多端终端：瞬间接管 OCC 调度中心多宫格大屏，将危机画面强制切换为主视窗；同时自动组装标准应急 SOP 工单，秒级定向分发至下一站站台班长手持移动端，跑通人机协同闭环。",
        sysArchitecture: {
          nodes: ["流数据接入层", "边缘行为解析层", "状态机分级决策层", "跨端业务触达层"],
          flowDescription: "RTSP/WebRTC视频流 -> 边缘NVR智能网关CV推理（3秒） -> 结构化Payload透传 -> 状态机分级(ROUTINE/SUSPECTED/CRITICAL) -> WebSocket多端触达(OCC大屏+移动端)",
          dbSchema: [
            "tb_cv_event_records (evt_id UUID, cam_ip VARCHAR, carriage_no INT, evt_type VARCHAR, confidence DECIMAL(5,4), payload JSONB, ts TIMESTAMP)",
            "tb_occ_screen_layout (id BIGINT, session_id VARCHAR, layout_mode VARCHAR, main_window_carriage INT, triggered_at TIMESTAMP)",
            "tb_platform_intercept_dispatch (id BIGINT, evt_id VARCHAR, station_name VARCHAR, door_no INT, ticket_payload JSONB, dispatched_at TIMESTAMP)"
          ],
          keyChallenges: [
            "单帧画面下「倒地」与「弯腰系鞋带」像素特征极相似？引入多帧滑动时间窗口纵向深挖时序特征，在保障零漏报前提下最大化过滤日常非标动作，将假阳性误报率控制在 3% 以下。",
            "吸烟/电子烟属微小目标，传统 CV 极易因打火机火光、哈气产生误报？通过连续 25 帧时序空间特征交叉核验，精准区分真实违规与环境噪声，确诊率达 97.4%。"
          ]
        }
      }
    ]
  },
  {
    id: "b2b-platform",
    name: "产业互联网平台/B2B B2C",
    tagline: "解决「病虫害防范、农资错配、知识留存」痛点的高粘性产业互联网交易与内容平台",
    projects: [
      {
        id: "agri-platform",
        title: "农产品产业互联网平台（B2B 农资集采 / B2C 直销一体化小程序）",
        subtitle: "贯穿大宗农资集采、农业技术内容服务、专家撮合及 C 端品质农产品直销的全栈式数字农业全生命周期管理系统。",
        description: "农产品产业互联网平台是一款贯穿大宗农资集采、农业技术内容服务、专家供需撮合以及 C 端品质农产品直销（B2C）的全栈式数字农业全生命周期管理系统。项目核心聚焦农业产业链中长期存在的致命死穴：生产端（农民）缺乏精准农技指导及高议价能力导致农资采购成本高昂；贸易端供需信息严重不对称造成局部农产品滞销、价格剧烈波动；以及消费端（C 端住客/散客）对绿色有机标签天然缺乏信任感、高端品牌溢价难以成立的痛点。平台通过创新设计「内容付费 + O2O 农资服务 + 专家智能化撮合」的产业增长链路，向下垂直纳管各农业产区的拼单集采需求与物流路由分配，向上无缝并接区块链防伪存证底座，完成从「产前科学指导、产中降本集采、产后精准撮合到终结端数字溯源直销」的产业互联网价值闭环。",
        metrics: [
          { label: "农资采购成本降低", value: "15%" },
          { label: "错配滞销率削减", value: "22%" },
          { label: "供需匹配时效", value: "分钟级" },
          { label: "溯源合规留存率", value: "100%" }
        ],
        chips: ["多渠道B2B集采引擎", "专家异构供需撮合网络", "知识图谱内容付费中台", "O2O区域动态仓配路由", "区块链一客一存证底层"],
        tags: ["产业互联网", "B2B集采", "内容付费", "专家撮合", "区块链溯源", "O2O仓配"],
        blueprintTitle: "「农技赋能-智能撮合-动态仓配-区块链溯源」的全链路产业互联网价值闭环",
        blueprintText: "平台彻底解耦了传统电商「只卖货、不赋能」的浅层漏斗，围绕农业生产和流通长周期建立了农技知识内容付费层、B2B 智能供需撮合层、农资拼单 O2O 动态仓配层、B2C 绿色产品区块链溯源层的四大高内聚子系统。",
        detailedDoc: "### 系统架构\n\n1. **农技知识与内容付费服务层**：构建体系化的农技视频课程、病虫害智能诊断知识图谱及付费专家库，为前端农户提供在线问诊与知识资产变现通路，达成「内容引流、技术黏客」。\n2. **B2B 智能供需与专家撮合引擎层**：承接海量异构的「农户供给流」与「大宗采购商需求流」，利用多模态匹配算法动态检索最优起拍价与契约条件，并为突发灾情自动调度本地专家执行远程会诊。\n3. **农资拼单与 O2O 动态仓配供应链层**：打通跨地域农资大宗集采（化肥、种子、农药）的动态拼单状态机，根据地理围栏（Geo-fencing）智能重组订单流，驱动 O2O 区域仓配中心的动态干线路由划分，极限降低物流折损。\n4. **B2C 绿色产品全链路存证溯源层**：对标高品质农产直销，打通「田间批次-物流环控-上架质检」的分布式分类账本（Ledger），动态生成不可篡改的「安心吃」数字通行证，反向拉动平台在 C 端的信任溢价。",
        sysArchitecture: {
          nodes: ["农技知识与内容付费服务层", "B2B智能供需与专家撮合引擎层", "农资拼单与O2O动态仓配供应链层", "B2C绿色产品全链路存证溯源层"],
          flowDescription: "农户/采购商注册 -> 农技内容付费/专家问诊 -> B2B多模态供需撮合 -> 大宗拼单集采 -> O2O动态仓配路由 -> 区块链溯源上链 -> C端B2C直销",
          dbSchema: [
            "tb_agri_expert_match (id BIGINT, expert_id VARCHAR, farmer_id VARCHAR, crop_type VARCHAR, diagnosis_result TEXT, match_score DECIMAL(5,4), created_at TIMESTAMP)",
            "tb_agri_group_buy_order (id BIGINT, sku_name VARCHAR, total_tons DECIMAL(10,2), unit_price DECIMAL(10,2), warehouse_route TEXT, status VARCHAR)",
            "tb_agri_blockchain_ledger (id BIGINT, product_sku VARCHAR, action VARCHAR, hash VARCHAR, signature VARCHAR, recorded_at TIMESTAMP)"
          ],
          keyChallenges: [
            "散户农民单体采购量级微小，面对上游大厂完全丧失议价权？通过全区拼单集采机制，触发 100 吨大厂出厂价门槛，将农资综合采购成本拉低 15%。",
            "C 端消费者对「有机」标签天然缺乏信任感，高端农产品无法建立溢价？通过区块链分布式账本存证「田间-物流-上架」全链路，生成不可篡改的「安心吃」数字通行证，激活信任溢价。"
          ]
        }
      },
      {
        id: "maas-app",
        title: "智慧出行 APP",
        subtitle: "面向千万级城市客流体量打造的「MaaS」一体化大出行移动服务平台。",
        description: "智慧出行 APP 是一款旨在打破传统城市轨道交通与多维商圈壁垒的一体化 MaaS（Mobility as a Service）移动出行服务平台。项目深度对焦传统通勤体验中乘客获取在途数据全盲、早晚高峰期进出闸机排队拥堵（网络延迟引发离线核验失效）、以及地铁运营方「流量大但变现模式单一」无法与周边产业生态有效联动等核心痛点。通过 MaaS 多源信息融合、车地数据 WebSocket 秒级同频、三色热力引导分流与 Geo-fencing 商业变现，构建大出行场景的「数据中枢-产品触角-时序响应-变现管道」服务闭环。",
        metrics: [
          { label: "流转跨端协同效率", value: "3端联动" },
          { label: "引导预测精细粒度", value: "单个车厢" },
          { label: "月台高峰滞留削减", value: "20.0%" },
          { label: "信息触达交互体验", value: "全局无感" }
        ],
        chips: ["MaaS一体化大出行", "车厢三色热力图", "蓝牙信标双向定位", "脱机二维码防伪", "后付信用状态机"],
        tags: ["移动端", "MaaS", "扫码支付", "蓝牙定位", "产业生态", "Geo-fencing"],
        blueprintTitle: "「多端协同算法-实时场景交互-线下商业裂变」的闭环服务矩阵",
        blueprintText: "系统打通了多端协同算法、实时场景交互与线下商业裂变的闭环服务矩阵，全面提升大出行场景用户体验：MaaS多源信息融合层、移动端全局交互层、车地数据流跨端协同层、产业生态与增收闭环层。",
        detailedDoc: "### 系统架构\n\n1. **MaaS 多源信息融合层（数据中枢）**：全面并接轨道交通 AFC 票务结算、列车重量传感器测点时序、以及车载边缘 CV 感知网关，将多源非结构化指标实时清洗映射。\n2. **移动端全局交互层（产品触角）**：面向 C 端乘客，采用极简卡片式架构重塑首页，将乘车码核心区、实时列车动态、站内导航三大最高频流量路径进行聚合透出。\n3. **车地数据流跨端协同层（时序响应）**：基于 WebSocket 长连接，实现列车在途位置与单个车厢「红黄蓝」热力拥挤度在「车载魔窗-站台屏蔽门大屏-手机 APP」三端的秒级同频交互与引导分流。\n4. **产业生态与增收闭环层（变现管道）**：深度并接大数据推荐引擎，基于行程 O-D 轨迹目的地预测及站内物理围栏（Geo-fencing），精准触达周边景点、住宿及商圈商家的竞价卡片与直播购物商城。",
        sysArchitecture: {
          nodes: ["MaaS多源信息融合层", "移动端全局交互层", "车地数据流跨端协同层", "产业生态与增收闭环层"],
          flowDescription: "AFC票务+传感器+CV感知 -> 多源清洗映射 -> WebSocket秒级推送 -> 红黄蓝热力图 -> 车载魔窗+站台大屏+手机APP三端同频 -> O-D轨迹+Geo-fencing商业变现",
          dbSchema: [
            "tb_maas_passenger_flow (id BIGINT, station_name VARCHAR, line VARCHAR, carriage_no INT, load_value INT, crowd_level VARCHAR, ts TIMESTAMP)",
            "tb_maas_transit_qr_token (id BIGINT, user_id VARCHAR, token_seq VARCHAR, credit_score VARCHAR, is_offline_verified BOOLEAN, scanned_at TIMESTAMP)",
            "tb_maas_beacon_location (id BIGINT, user_id VARCHAR, x_coord DECIMAL, y_coord DECIMAL, floor_level VARCHAR, accuracy VARCHAR, ts TIMESTAMP)",
            "tb_maas_geo_fence_offer (id BIGINT, merchant_id VARCHAR, merchant_name VARCHAR, promotion_text TEXT, action_url VARCHAR, triggered_at TIMESTAMP)"
          ],
          keyChallenges: [
            "地下深层闸机墙体屏蔽导致手机断网，乘车码无法实时验证？采用脱机双向非对称加密核验，无需实时连网即可完成「先乘后付」信用预授权记账，闸机秒级无感放行。",
            "卫星 GPS 在地铁地下空间完全失效，乘客站内迷失？基于蓝牙 Beacon 双向定位算法实现 ±0.5 米精度定位，结合 Geo-fencing 物理围栏精准触达周边商业，流量变现转化。"
          ]
        }
      }
    ]
  }
];

