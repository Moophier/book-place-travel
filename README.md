# 📚 Book Place Travel System

基于文学作品中的地名，自动生成详细旅行卡片和优化路线的Python工具。

## 🎯 功能特性

- ✅ 支持中文/英文地名提取
- ✅ 自动生成包含历史、美食、文化信息的卡片
- ✅ 智能路线规划与交通优化
- ✅ 多文学作品支持
- ✅ 零外部依赖，纯Python实现

## 📖 使用示例

### 处理《魔山》

```python
from main_pipeline import process_book_text

book_text = """
在瑞士的达沃斯，作家托马斯·曼创作了《魔山》。
达沃斯疗养院是20世纪著名的肺结核治疗中心。
瑞士阿尔卑斯山的壮丽景色令人叹为观止。
"""

# 处理文本
result = process_book_text(book_text)

# 查看结果
print(result["summary"])
```

### 输出包含：
- 达沃斯疗养院卡片（历史、美食、路线）
- 瑞士疗养地区卡片
- 优化的5-7天旅行路线

## 📊 项目结构

```
book-place-travel/
├── src/              # 核心代码
│   ├── data_models.py
│   ├── place_extractor.py
│   ├── card_generator.py
│   ├── route_planner.py
│   └── main_pipeline.py
├── tests/            # 单元测试
├── docs/             # 系统文档
├── examples/         # 示例脚本
└── README.md         # 本指南
```

## 🔧 安装要求

```bash
# 无需安装，纯Python标准库
python --version  # 需要Python 3.6+
```

## 💡 贡献指南

欢迎提交Issue和Pull Request！
