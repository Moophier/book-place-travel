#!/bin/bash
# 部署并定时发送报告脚本
# 使用方法: ./deploy_and_email.sh YOUR_GITHUB_USERNAME YOUR_EMAIL YOUR_PASSWORD SMTP_SERVER SMTP_PORT

set -e

# 配置参数
GITHUB_USERNAME=${1:-$GITHUB_USERNAME}
EMAIL=${2:-$EMAIL}
EMAIL_PASS=${3:-$EMAIL_PASS}
SMTP_SERVER=${4:-$SMTP_SERVER}
SMTP_PORT=${5:-$SMTP_PORT}
REPO_NAME="book-place-travel"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# 1. 部署到GitHub
echo "🚀 部署到GitHub..."
git remote add origin $REPO_URL || git remote set-url origin $REPO_URL
git push -f origin master
git tag -f v1.0.0
git push origin v1.0.0
echo "✅ 已部署到GitHub: $REPO_URL"

# 2. 运行处理并生成报告
echo "📊 生成处理报告..."
python << 'PYEOF'
import sys
sys.path.insert(0, 'src')
from main_pipeline import process_book_text
import datetime

# 示例文本（实际使用时可替换为文件读取）
text = """
在瑞士的达沃斯，作家托马斯·曼创作了《魔山》。
达沃斯疗养院是20th century著名的肺结核治疗中心。
瑞士阿尔卑斯山的壮丽景色令人叹为观止。
当地的瑞士奶酪火锅是必尝美食。
此外，附近的苏黎世也是重要的商业和文化中心。
"""

result = process_book_text(text)

# 生成报告
report = f"""📚 书籍地名旅行规划报告
{'='*60}

📝 处理时间: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
📖 书籍: 《魔山》

📍 发现地点: {len(result['book_analysis']['unique_locations'])} 个
{', '.join(result['book_analysis']['unique_locations'])}

🛣️  路线规划:
总距离: {result['travel_route']['total_distance_km']}km
预计时间: {result['travel_route']['total_duration_hours']}小时

📝 推荐行程:
"""

for i, name in enumerate(result['book_analysis']['unique_locations'], 1):
    report += f"{i}. {name}\n"

report += f"\n📄 详细报告请查看JSON输出文件
📊 报告生成完成"

# 保存JSON报告
import json
with open('travel_report.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(report)
PYEOF

# 3. 发送邮件
echo "📧 发送报告邮件..."
python << 'PYEOF'
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import json
import os

# 配置（从环境变量读取）
EMAIL_FROM = os.environ.get('EMAIL_FROM')
EMAIL_TO = os.environ.get('EMAIL_TO')
SMTP_SERVER = os.environ.get('SMTP_SERVER')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')

if not all([EMAIL_FROM, EMAIL_TO, SMTP_SERVER, EMAIL_PASSWORD]):
    print("⚠️  邮件配置不完整，跳过邮件发送")
    exit(0)

# 读取报告
with open('travel_report.json', 'r', encoding='utf-8') as f:
    report_data = json.load(f)

# 创建邮件
msg = MIMEMultipart()
msg['From'] = EMAIL_FROM
msg['To'] = EMAIL_TO
msg['Subject'] = f"📚 书籍地名旅行报告 - {report_data['summary'].split(chr(10))[0]}"

# 邮件正文
body = report_data['summary'] + "\n\n📄 JSON报告已作为附件发送"
msg.attach(MIMEText(body, 'plain'))

# 添加JSON附件
with open('travel_report.json', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment', filename='travel_report.json')
    msg.attach(part)

# 发送邮件
server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
server.starttls()
server.login(EMAIL_FROM, EMAIL_PASSWORD)
server.send_message(msg)
server.quit()

print("✅ 邮件发送成功")
PYEOF

# 4. 清理报告文件（不保存）
echo "🗑️ 清理临时报告文件..."
rm -f travel_report.json

echo "✅ 部署和邮件发送流程完成"
