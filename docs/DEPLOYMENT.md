# 🚀 GitHub 部署指南

## 快速部署

### 方法1：使用 GitHub CLI（推荐）

```bash
# 1. 创建远程仓库
gh repo create book-place-travel \
  --public \
  --source=. \
  --push \
  --confirm

# 2. 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0 - 《魔山》地名旅行规划系统"
git push origin v1.0.0
```

### 方法2：手动推送

```bash
# 1. 添加远程仓库
git remote add origin https://github.com/your-username/book-place-travel.git

# 2. 推送代码
git push -u origin master

# 3. 创建发布标签
git tag -a v1.0.0 -m "Release v1.0.0 - 《魔山》地名旅行规划系统"
git push origin v1.0.0
```

## 仓库信息

- **仓库名称**: book-place-travel
- **描述**: 基于文学作品地名的旅行规划系统
- **许可证**: MIT
- **语言**: Python

## 贡献指南

欢迎贡献！请遵循以下流程：

1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建 Pull Request

## 示例代码

```python
from main_pipeline import process_book_text

# 处理书籍文本
text = """
在瑞士的达沃斯，作家托马斯·曼创作了《魔山》。
达沃斯疗养院是20世纪著名的肺结核治疗中心。
"""

result = process_book_text(text)
print(result["summary"])
```

## 版本历史

- v1.0.0: 初始发布，支持《魔山》地名提取和路线规划
