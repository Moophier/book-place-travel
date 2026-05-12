#!/bin/bash
# 设置远程仓库脚本
# 使用: ./SETUP_REMOTE.sh YOUR_USERNAME

if [ -z "$1" ]; then
    echo "用法: $0 YOUR_GITHUB_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_URL="https://github.com/$USERNAME/book-place-travel.git"

# 添加远程仓库
git remote add origin $REPO_URL

# 推送代码
git push -u origin master

# 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0 - 通用书本地名标签系统"
git push origin v1.0.0

echo "✅ 已推送到 GitHub: $REPO_URL"
