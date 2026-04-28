# 📤 GitHub Push Instructions

## 🚀 快速推送指南

### 方式1：使用推送脚本（推荐）

```bash
# 给脚本执行权限
chmod +x PUSH_TO_GITHUB.sh

# 运行推送脚本
./PUSH_TO_GITHUB.sh
```

### 方式2：手动推送

```bash
# 添加远程仓库（如果未配置）
git remote add origin https://github.com/YOUR_USERNAME/book-place-travel.git

# 推送主分支
git push -u origin master

# 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## 📋 推送前准备

### 1. 配置.env文件
```bash
cp .env.example .env
nano .env
```

填写以下信息：
```bash
EMAIL_FROM=your_email@qq.com
EMAIL_TO=your_email@qq.com
EMAIL_PASSWORD=your_email_password
SMTP_SERVER=smtp.qq.com
SMTP_PORT=587
GITHUB_USERNAME=your_github_username
```

### 2. 验证远程仓库
```bash
# 查看远程仓库
git remote -v

# 应该显示:
# origin  https://github.com/YOUR_USERNAME/book-place-travel.git (fetch)
# origin  https://github.com/YOUR_USERNAME/book-place-travel.git (push)
```

## 🔧 自动化部署

### GitHub Actions（推荐）

工作流文件：`.github/workflows/daily-deploy.yml`

**触发条件：**
- 工作日每天北京时间8:00（UTC 0:00）
- 手动触发（workflow_dispatch）

**自动执行：**
1. ✅ 检出代码
2. ✅ 推送到GitHub
3. ✅ 创建版本标签
4. ✅ 处理《魔山》文本
5. ✅ 发送邮件报告

### 手动触发
```bash
# 在GitHub仓库的Actions页面手动触发
# 或运行：
git workflow_dispatch
```

## 📊 推送历史

### 最近5次提交
```bash
git log --oneline -5
```

### 查找所有推送相关提交
```bash
git log --all --grep="push\|deploy\|github" --oneline
```

### 当前状态
```bash
$ git status
On branch master
nothing to commit, working tree clean

$ git log --oneline -1
22d7a68 feat: add GitHub Actions workflow and push script for automation
```

## 📝 推送日志

### 查看推送日志
```bash
# 实时查看
cat /var/log/book_place_travel.log

# 或查看GitHub Actions日志
github -> Actions -> Daily Deploy -> Logs
```

### 常见问题排查

**问题1: 推送失败**
```bash
# 检查远程仓库
git remote -v

# 测试连接
ssh -T git@github.com
# 或
curl -I https://github.com
```

**问题2: 邮件未发送**
```bash
# 检查.env配置
cat .env

# 查看邮件日志
grep -i "email\|smtp" /var/log/book_place_travel.log
```

**问题3: 定时任务未执行**
```bash
# 检查crontab
crontab -l

# 查看cron日志
cat /var/log/cron.log | grep book-place
```

## 🎯 推送内容

每次推送将包含：
- ✅ 最新代码变更
- ✅ 版本标签 (v1.0.0)
- ✅ 《魔山》地名处理报告
- ✅ JSON格式数据
- ✅ 邮件通知

## 📦 推送后验证

```bash
# 检查GitHub仓库
gh repo view YOUR_USERNAME/book-place-travel --web

# 检查标签
git tag -l

# 检查最新提交
git show --stat HEAD
```

## 💡 提示

1. **首次推送前**：确保已创建GitHub仓库
2. **定期推送**：建议每天至少推送一次
3. **标签管理**：使用v1.0.0, v1.1.0等版本标签
4. **错误处理**：脚本包含错误处理，可重试

## 🆘 获取帮助

- 文档：`README_FINAL.md`
- 部署指南：`README_DEPLOYMENT.md`
- 快速部署：`DEPLOYMENT_INSTRUCTIONS.md`
- 推送脚本：`PUSH_TO_GITHUB.sh`
- 工作流：`.github/workflows/daily-deploy.yml`
