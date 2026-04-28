#!/bin/bash
# GitHub推送脚本
# 请先配置.env文件中的邮箱和GitHub信息

set -e

echo "🚀 开始推送至GitHub..."

# 检查远程仓库
if ! git remote get-url origin &>/dev/null; then
    echo "❌ 错误: 未配置远程仓库origin"
    echo "请运行: git remote add origin https://github.com/YOUR_USERNAME/book-place-travel.git"
    exit 1
fi

# 获取远程仓库URL
REMOTE_URL=$(git remote get-url origin)
echo "📦 远程仓库: $REMOTE_URL"

# 验证邮箱配置
if [ -z "$EMAIL_FROM" ] || [ -z "$EMAIL_PASSWORD" ] || [ -z "$GITHUB_USERNAME" ]; then
    echo "⚠️  警告: 邮箱或GitHub配置未找到"
    echo "请设置环境变量或编辑.env文件"
    echo "EMAIL_FROM, EMAIL_PASSWORD, GITHUB_USERNAME"
    read -p "是否继续推送？(y/n): " confirm
    if [ "$confirm" != "y" ]; then
        exit 1
    fi
fi

# 推送主分支
echo "📤 推送主分支..."
git push origin master

# 创建版本标签
echo "🏷️  创建版本标签..."
git tag -f v1.0.0
git push origin v1.0.0

echo "✅ 推送完成！"
echo "   仓库: $REMOTE_URL"
echo "   标签: v1.0.0"
