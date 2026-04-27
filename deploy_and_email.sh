#!/bin/bash
# 部署并定时发送报告脚本
# 配置参数从环境变量读取

set -e

# 1. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin master 2>&1 || {
    echo "⚠️  推送失败，可能需要身份验证"
    echo "请确保SSH密钥或HTTPS凭证已配置"
}

# 创建版本标签
git tag -f v1.0.0
git push origin v1.0.0 2>&1 || echo "⚠️  标签推送可能已存在"

echo "✅ 已推送到GitHub"

# 2. 生成报告
echo "📊 生成处理报告..."
python << 'PYEOF'
import sys
sys.path.insert(0, 'src')
from main_pipeline import process_book_text
import datetime
import json
import os

# 示例文本
text = """
在瑞士的达沃斯，作家托马斯·曼创作了《魔山》。
达沃斯疗养院是20th century著名的肺结核治疗中心。
瑞士阿尔卑斯山的壮丽景色令人叹为观止。
当地的瑞士奶酪火锅是必尝美食。
此外，附近的苏黎世也是重要的商业和文化中心。
"""

result = process_book_text(text)

# 保存JSON报告
with open('travel_report.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"报告已生成: travel_report.json")
print(f"找到 {len(result['book_analysis']['unique_locations'])} 个地点")
PYEOF

# 3. 发送邮件
echo "📧 发送邮件报告..."
python << 'PYEOF'
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import json
import os

# 从环境变量读取配置
EMAIL_FROM = os.environ.get('EMAIL_FROM')
EMAIL_TO = os.environ.get('EMAIL_TO')
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.qq.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')

if not all([EMAIL_FROM, EMAIL_TO, EMAIL_PASSWORD]):
    print("⚠️  邮件配置不完整，跳过邮件发送")
    print("请设置: EMAIL_FROM, EMAIL_TO, EMAIL_PASSWORD")
    exit(0)

# 读取报告
with open('travel_report.json', 'r', encoding='utf-8') as f:
    report_data = json.load(f)

# 创建邮件
msg = MIMEMultipart()
msg['From'] = EMAIL_FROM
msg['To'] = EMAIL_TO
subject = f"📚 书籍报告 - {report_data['book_analysis']['unique_locations'][0]}"
msg['Subject'] = subject

# 邮件正文
body = report_data['summary'] + "\n\n📄 JSON报告已作为附件"
msg.attach(MIMEText(body, 'plain'))

# 添加JSON附件
with open('travel_report.json', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment', filename='travel_report.json')
    msg.attach(part)

# 发送邮件
try:
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(EMAIL_FROM, EMAIL_PASSWORD)
    server.send_message(msg)
    server.quit()
    print("✅ 邮件发送成功")
except Exception as e:
    print(f"⚠️  邮件发送失败: {e}")
PYEOF

# 4. 清理报告文件（不保存）
echo "🗑️ 清理临时报告文件..."
rm -f travel_report.json

echo "✅ 每日任务完成"
