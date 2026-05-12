@echo off
chcp 65001 >nul
echo ============================================
echo  文迹 Literary Footprints - Cloudflare Setup
echo ============================================
echo.

echo Step 1: Install Wrangler CLI
call npm install -g wrangler
if %errorlevel% neq 0 (
  echo Failed to install wrangler. Please run: npm install -g wrangler
  pause
  exit /b 1
)
echo OK
echo.

echo Step 2: Login to Cloudflare
wrangler login
if %errorlevel% neq 0 (
  echo Login failed. Please run: wrangler login
  pause
  exit /b 1
)
echo OK
echo.

echo Step 3: Deploy frontend to Cloudflare Pages
wrangler pages deploy . --project-name=literary-footprints
echo.
echo 部署成功后获取 Pages URL
echo.
echo Step 4: Initialize D1 Database
wrangler d1 create literary-footprints-db
echo 创建后请将 database_id 填入 wrangler.toml
echo.
echo Step 5: Deploy Worker API
wrangler deploy src/worker/index.js
echo.
echo ============================================
echo 部署完成！
echo -------------------------------------------------
echo Frontend: https://literary-footprints.pages.dev
echo API:      https://literary-footprints-api.workers.dev
echo ============================================
pause
