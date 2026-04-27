# 🚀 部署与定时任务指南

## 快速部署

### 方式1：使用部署脚本（推荐）

```bash
# 给脚本执行权限
chmod +x deploy_and_email.sh

# 运行部署脚本
./deploy_and_email.sh YOUR_GITHUB_USERNAME YOUR_EMAIL YOUR_EMAIL_PASSWORD smtp.example.com 587
```

### 方式2：手动部署

```bash
# 1. 推送到GitHub
git remote add origin https://github.com/YOUR_USERNAME/book-place-travel.git
git push -u origin master
git tag -a v1.0.0 -m "Release"
git push origin v1.0.0

# 2. 设置定时任务（见下方）
crontab -e
```

## 📅 定时任务设置

### 设置方法

```bash
# 编辑crontab
crontab -e
```

### 添加定时任务

**每天上午8:30执行（北京时间）：**
```
30 8 * * * /bin/bash /path/to/deploy_and_email.sh YOUR_GITHUB_USERNAME YOUR_EMAIL YOUR_EMAIL_PASSWORD smtp.example.com 587
```

**每周一上午9:00执行：**
```
0 9 * * 1 /bin/bash /path/to/deploy_and_email.sh YOUR_GITHUB_USERNAME YOUR_EMAIL YOUR_EMAIL_PASSWORD smtp.example.com 587
```

## 📧 邮件配置

### 环境变量方式（推荐）

```bash
export GITHUB_USERNAME="your_username"
export EMAIL="your@email.com"
export EMAIL_PASS="your_email_password"
export SMTP_SERVER="smtp.example.com"
export SMTP_PORT="587"
```

### 直接修改脚本

编辑 `deploy_and_email.sh` 文件，修改以下参数：
- 第1行：`GITHUB_USERNAME`
- 第2行：`EMAIL`
- 第3行：`EMAIL_PASS`
- 第4行：`SMTP_SERVER`
- 第5行：`SMTP_PORT`

## 📝 报告处理流程

1. ✅ 推送到GitHub仓库
2. 📊 生成《魔山》地名旅行报告
3. 📧 发送JSON格式报告到您的邮箱
4. 🗑️ 自动清理临时报告文件（不保存）

## 📁 文件说明

- `deploy_and_email.sh` - 部署和邮件发送脚本
- `crontab_config` - 定时任务配置示例
- `README_DEPLOYMENT.md` - 本文件

## 🔧 依赖要求

- Python 3.6+
- Bash shell
- SMTP邮件服务器
- GitHub账户

## 💡 示例配置

```bash
# QQ邮箱示例
export SMTP_SERVER="smtp.qq.com"
export SMTP_PORT="587"

# 163邮箱示例  
export SMTP_SERVER="smtp.163.com"
export SMTP_PORT="587"
```

## 🔐 安全配置

### 设置环境变量

在运行脚本前，请先设置环境变量：

```bash
# 方式1：使用 .env 文件（推荐）
cp .env.example .env
# 编辑 .env 文件填写您的信息

# 方式2：直接导出
export EMAIL_FROM="your@email.com"
export EMAIL_TO="your@email.com"  
export EMAIL_PASSWORD="your_password"
export SMTP_SERVER="smtp.qq.com"
export SMTP_PORT="587"
export GITHUB_USERNAME="your_github_username"
```

### 邮箱服务配置

| 服务商 | SMTP服务器 | 端口 | 加密方式 |
|--------|------------|------|----------|
| QQ邮箱 | smtp.qq.com | 587 | STARTTLS |
| 163邮箱 | smtp.163.com | 587 | STARTTLS |
| Gmail | smtp.gmail.com | 587 | STARTTLS |

## 📋 使用步骤

1. **填写配置信息**
   ```bash
   # 编辑 .env 文件
   nano .env
   ```

2. **测试脚本**
   ```bash
   ./deploy_and_email.sh
   ```

3. **设置定时任务**
   ```bash
   crontab -e
   # 添加定时任务（见 crontab_daily 文件）
   ```

## 🚀 完整部署流程

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/book-place-travel.git
cd book-place-travel

# 2. 配置环境
cp .env.example .env
# 编辑 .env 文件

# 3. 首次手动运行
./deploy_and_email.sh

# 4. 设置定时任务
crontab crontab_daily
```
