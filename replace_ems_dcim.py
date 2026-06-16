#!/usr/bin/env python3
"""Replace ems-system + dcim-platform block in data.ts"""

old_escaped = r'''        id: "ems-system",
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
        detailedDoc: "### 综合能效优化闭环规划\\n\\n1. **电气特征波特征分解**: 检测空调谐波，无需独立在插座布测测电表即可定位异常运行微漏电电器。\\n2. **碳积分核实一包化**: 依照 ISO 标准自动折合。自动对高管一目了然生成碳税、碳排扣减看板。\\n3. **异构网段秒级拼账**: 打破各省加盟分仓库能耗分散困境，利用统一对账，一秒掌握全分店周碳指标。",
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
        blueprintTitle: "打通\\"多物理系统烟囱数据隔离\\"到\\"线上预警驱动线下移动巡检\\"的闭环资产管理看板",
        blueprintText: "规划基础设施管理平台，跑通设备异常检测、自动工单派发到移动端现场巡检确认的全链路闭环。基于电力/制冷/空间三轴容量模型，实时监控设备健康度与容量趋势，当指标越限时自动触发告警并生成工单，巡检人员通过移动 PDA 接收任务并现场反馈，形成完整的数字化运营飞轮。",
        detailedDoc: "### DCIM 基础设施管理核心能力\\n\\n1. **三轴容量可视化**: 电力（UPS/PDU 负载）、制冷（精密空调/CRAH 效率）、空间（机柜 U 位/承重）三维容量实时监控与趋势预测。\\n2. **自动派单闭环**: 设备异常或容量越限 -> 自动生成 ITIL 工单 -> 智能路由至对应运维组 -> 移动 PDA 接收 -> 现场扫码确认 -> 自动关闭工单。\\n3. **移动巡检数字化**: 巡检计划自动推送至 PDA，支持 NFC/二维码点位打卡、拍照上传、异常一键转工单，全程可追溯。",
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
        }'''

new_block = r'''        id: "ems-system",
        title: "EMS 智能能源管理系统",
        subtitle: "融合 AI 与行业 'Know-How' 的 TB 级分布式能效分析平台。项目专注于攻克绿色数据中心及智算园区高额用电、制冷能耗黑盒、以及多机电系统能效无法量化的商业痛点。通过端到端的能源足迹追踪管控、CLF 能效基线拟合与智能控温调优策略，系统实现年节能 5%~10% 的长周期商业效益，驱动楼栋级 PUE 从 1.50 极限下探至 1.25 以下，为政企客户全面算清'能耗与碳资产经济账'。",
        description: "融合 AI 与行业 'Know-How' 的 TB 级分布式能效分析平台。项目专注于攻克绿色数据中心及智算园区高额用电、制冷能耗黑盒、以及多机电系统能效无法量化的商业痛点。通过端到端的能源足迹追踪管控、CLF 能效基线拟合与智能控温调优策略，系统实现年节能 5%~10% 的长周期商业效益，驱动楼栋级 PUE 从 1.50 极限下探至 1.25 以下，为政企客户全面算清'能耗与碳资产经济账'。",
        metrics: [
          { label: "年节能效率", value: "5%~10%" },
          { label: "楼栋级 PUE", value: "< 1.25" },
          { label: "多维环境测点采集", value: "秒级实时" },
          { label: "AI 调优时效", value: "毫秒级感知" }
        ],
        chips: ["数字孪生", "CLF能效基线", "AI调优", "设备链路损耗", "碳排放管理"],
        tags: ["能源采集", "PUE优化", "碳排放管理", "基线预警", "节能调优", "降本增效", "风险防控"],
        blueprintTitle: "融合设备支路/客户维度的全链路损耗分析与自动控制闭环",
        blueprintText: "利用 InfluxDB 归集冷塔和阀门时序电流。配合外部气象动态，由 Prophet 模型计算预测明日下午 2 点楼宇的峰值负荷偏高区，并在不损失舒适度大前提下，提前 30 分钟通过 BACnet 改变冷冻水循环速度，完成全周期冷控节能降耗。",
        detailedDoc: "### 综合能效优化闭环规划\\n\\n1. **电气特征波特征分解**: 检测空调谐波，无需独立在插座布测测电表即可定位异常运行微漏电电器。\\n2. **碳积分核实一包化**: 依照 ISO 标准自动折合。自动对高管一目了然生成碳税、碳排扣减看板。\\n3. **异构网段秒级拼账**: 打破各省加盟分仓库能耗分散困境，利用统一对账，一秒掌握全分店周碳指标。",
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
        subtitle: "iSentry 数据中心基础设施管理平台 (DCIM) 是一款专为大型智算中心与工业级机房规划设计的基础设施全栈式一体化运管平台。系统深度跑通了设备异常超前预警、数据自动化抄表计费到移动端线上闭环巡检的全链路工作流，将核心故障修复效率大幅拉高 45%，实现基础设施资产 100% 全生命周期的透明化精细管理。",
        description: "iSentry 数据中心基础设施管理平台 (DCIM) 是一款专为大型智算中心与工业级机房规划设计的基础设施全栈式一体化运管平台。项目旨在解决传统机房运维中各机电系统（电力、暖通、消防）相互孤立形成\u201c数据烟囱\u201d、高价值资产高频变动导致\u201c账实不符\u201d、以及容量调配盲目引发局部过载宕机的核心商业痛点。系统深度跑通了设备异常超前预警、数据自动化抄表计费到移动端线上闭环巡检的全链路工作流，将核心故障修复效率大幅拉高 45%，实现基础设施资产 100% 全生命周期的透明化精细管理，为高密算力上架及资产重组决策提供强有力的数据底座与合规审计赋能。",
        metrics: [
          { label: "核心故障修复效率提升", value: "45%" },
          { label: "设备状态全局透视率", value: "100%" },
          { label: "资产统计变更", value: "100% 自动化" },
          { label: "容量监控覆盖", value: "3 轴 (电力/制冷/空间)" }
        ],
        chips: ["三轴容量趋势分析", "资产全生命周期状态机", "多维能效拆解模型", "高定制化金融级报表", "事件驱动型闭环工作流"],
        tags: ["DCIM", "容量管理", "ITIL 工单", "移动巡检", "数据驱动决策", "降本增效"],
        blueprintTitle: "打通\\"多物理系统烟囱数据隔离\\"到\\"线上预警驱动线下移动巡检\\"的闭环资产管理看板",
        blueprintText: "规划基础设施管理平台，跑通设备异常检测、自动工单派发到移动端现场巡检确认的全链路闭环。基于电力/制冷/空间三轴容量模型，实时监控设备健康度与容量趋势，当指标越限时自动触发告警并生成工单，巡检人员通过移动 PDA 接收任务并现场反馈，形成完整的数字化运营飞轮。",
        detailedDoc: "### DCIM 基础设施管理核心能力\\n\\n1. **三轴容量可视化**: 电力（UPS/PDU 负载）、制冷（精密空调/CRAH 效率）、空间（机柜 U 位/承重）三维容量实时监控与趋势预测。\\n2. **自动派单闭环**: 设备异常或容量越限 -> 自动生成 ITIL 工单 -> 智能路由至对应运维组 -> 移动 PDA 接收 -> 现场扫码确认 -> 自动关闭工单。\\n3. **移动巡检数字化**: 巡检计划自动推送至 PDA，支持 NFC/二维码点位打卡、拍照上传、异常一键转工单，全程可追溯。",
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
        }'''

# Verify they match length (should be same structure)
print(f"Old block length: {len(old_escaped)}")
print(f"New block length: {len(new_block)}")

# Read current file
with open('src/data.ts', 'r') as f:
    content = f.read()

# Verify old block exists
if old_escaped in content:
    content = content.replace(old_escaped, new_block, 1)
    with open('src/data.ts', 'w') as f:
        f.write(content)
    print("Replacement successful!")
    
    # Quick verification
    if 'ems-system' in content and 'dcim-platform' in content:
        print("Both IDs present in file")
else:
    print("ERROR: Old block not found in file!")
    # Try to find partial match
    idx = content.find('ems-system')
    if idx >= 0:
        print(f"Found ems-system at {idx}")
        print(repr(content[idx:idx+50]))
PYEOF