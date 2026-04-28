# 📚 通用书本地名标签系统

## 🎯 项目概述

这是一个**通用系统**，可以从**任何书籍文本**中自动提取地名，并为每个地点生成包含丰富元数据的卡片和旅行路线。

## ✨ 核心功能

- 📖 **通用文本处理**：适用于任何文学作品（《百年孤独》、《战争与和平》等）
- 🏷️ **智能地名提取**：自动识别中文和英文地名
- 🏛️ **元数据丰富**：为每个地点生成详细卡片
- 🗺️ **路线优化**：计算最优访问顺序
- 📧 **邮件报告**：发送结构化报告到邮箱
- 🔄 **定时自动化**：每日自动运行

## 📖 使用示例

### 处理任意书籍

```python
from main_pipeline import process_book_text

# 可以是任何书籍的文本
book_text = """
在巴黎的咖啡馆，海明威遇见了菲茨杰拉德。
他们讨论了现代文学的未来。
随后旅程继续前往伦敦和罗马。
"""

result = process_book_text(book_text)
print(result["summary"])
```

### 输出示例

```
发现地点: 4 个
巴黎, 海明威, 伦敦, 罗马
总距离: 1200.0km, 预计时间: 12.5小时
```

## 📂 项目结构

```
book-place-travel/
├── src/                          # 核心处理模块
│   ├── data_models.py           # 数据模型
│   ├── generic_extractor.py     # 🆕 通用地名提取器
│   ├── place_extractor.py       # 原有中文提取器
│   ├── card_generator.py        # 智能卡片生成
│   ├── route_planner.py         # 路线优化算法
│   └── main_pipeline.py         # 完整处理流程
├── config/                       # 配置文件
│   ├── historical_db.json       # 历史数据库
│   └── cuisine_db.json          # 美食数据库
├── deploy_and_email.sh          # 🚀 部署+邮件脚本
├── crontab_daily                # ⏰ 每日定时任务配置
└── README_FINAL.md              # 本文档
```

## 🔧 架构设计

### 模块化设计

1. **提取层** (`generic_extractor.py`)
   - 通用正则表达式匹配
   - 中文地名：`[\u4e00-\u9fa5]{2,}`
   - 英文地名：`\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b`
   - 可扩展的自定义模式

2. **生成层** (`card_generator.py`)
   - 基于知识库的元数据丰富
   - 动态标签生成
   - 智能旅行建议

3. **规划层** (`route_planner.py`)
   - 图算法优化
   - 多模式交通选择
   - 距离/时间权衡

4. **流程层** (`main_pipeline.py`)
   - 统一接口
   - 错误处理
   - 报告生成

## 🌍 支持的场景

| 场景 | 示例文本 | 预期输出 |
|------|---------|---------|
| 文学名著 | "巴黎咖啡馆，海明威遇见..." | [巴黎, 海明威, ...] |
| 历史传记 | "华盛顿领导独立战争..." | [华盛顿, ...] |
| 科幻小说 | "飞船降落在火星基地..." | [火星, ...] |
| 游记 | "我们从曼谷飞往清迈..." | [曼谷, 清迈, ...] |
| 任何书籍 | 任意文本 | 提取所有地名 |

## 📈 扩展性

### 添加新知识库

```json
// config/historical_db.json
{
  "埃菲尔铁塔": {
    "periods": ["19th century"],
    "events": ["巴黎地标", "1889年建成"],
    "cuisine": ["法式甜点", "红酒"]
  }
}
```

### 自定义提取规则

```python
# 在 generic_extractor.py 中添加
extractor.add_pattern(r'你的自定义模式')
```

## 🚀 部署选项

### 选项1：本地运行
```bash
python main_pipeline.py
```

### 选项2：定时任务
```bash
crontab crontab_daily
```

### 选项3：CI/CD集成
```yaml
# .github/workflows/daily.yml
on:
  schedule:
    - cron: '0 8 * * *'
```

## 📝 限制说明

- 当前版本依赖预定义的知识库
- 中文地名识别需要以省份/城市结尾
- 英文地名识别需要多词组合或较长单词
- 准确性取决于输入文本的质量

## 🔮 未来增强

- [ ] 机器学习命名实体识别
- [ ] 实时地理编码API集成
- [ ] 多语言支持
- [ ] Web界面
- [ ] 交互式地图可视化
