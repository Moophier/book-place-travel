import os
import base64
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib
from dotenv import load_dotenv

load_dotenv()


def generate_html():
    sites = [
        {
            "emoji": "🎸",
            "title": "井之头公园",
            "location": "东京吉祥寺",
            "quote": "每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢。",
            "desc": "渡边彻与直子、绿子相遇的井之头公园。午后的阳光穿过银杏叶洒在湖面上，青春在这里既美好又令人心碎。",
            "season": "春/秋",
            "duration": "2-3小时",
            "services": ["吉祥寺民宿", "井之头咖啡馆", "现场音乐酒吧"],
            "bg": "linear-gradient(135deg, #1a2a1a, #0f1a0f)",
        },
        {
            "emoji": "🌿",
            "title": "青山墓地",
            "location": "东京港区",
            "quote": "死并不是生的对立面，而是作为生的一部分永存。",
            "desc": "直子常常提起的墓地。在钢筋森林中的这片寂静之地，渡边思考着生与死的界限，也是全篇哲学深度的所在。",
            "season": "四季",
            "duration": "1-2小时",
            "services": ["青山历史导览", "樱花季散步", "表参道茶室"],
            "bg": "linear-gradient(135deg, #1a1a2a, #0f0f1a)",
        },
        {
            "emoji": "🌸",
            "title": "奈良吉野山",
            "location": "奈良县",
            "quote": "记忆就像那场大雪，覆盖了所有，却掩不住春天的痕迹。",
            "desc": "直子疗养的深山疗养院所在地。远离尘嚣的吉野山，樱花与云雾交织，是小说中最具禅意的空间。",
            "season": "春樱/秋枫",
            "duration": "半天",
            "services": ["吉野温泉旅馆", "吉野山徒步", "奈良乡土料理"],
            "bg": "linear-gradient(135deg, #2a1a2a, #1a0f1a)",
        },
        {
            "emoji": "📚",
            "title": "早稻田大学",
            "location": "东京新宿",
            "quote": "我在一片混沌中寻找自己的位置，就像在森林中寻找出路。",
            "desc": "小说主角渡边的大学生活舞台。文学部的教室里，年轻人们讨论着存在主义与爱情。",
            "season": "入学季/文化祭",
            "duration": "2-3小时",
            "services": ["早大校园导览", "神保町古书街", "新宿文学散步"],
            "bg": "linear-gradient(135deg, #1a2a2a, #0f1a1a)",
        },
        {
            "emoji": "🎶",
            "title": "三鹰公寓",
            "location": "东京三鹰市",
            "quote": "挪威的森林，就像那首Beatles的歌，不知为何总让人落泪。",
            "desc": "渡边反复听「Norwegian Wood」唱片的狭小公寓。唱片机的指针划过黑胶，Beatles的旋律贯穿了整个青春时代。",
            "season": "四季",
            "duration": "1小时",
            "services": ["三鹰爵士酒吧", "吉卜力美术馆", "下北泽音乐之旅"],
            "bg": "linear-gradient(135deg, #2a1a1a, #1a0f0f)",
        },
    ]

    cards_html = ""
    for s in sites:
        services_html = "".join(
            f'<span class="service-tag">{svc}</span>' for svc in s["services"]
        )
        cards_html += f'''
        <div class="site-card" style="background: {s["bg"]};">
          <div class="card-header">
            <span class="card-emoji">{s["emoji"]}</span>
            <div>
              <h3>{s["title"]}</h3>
              <span class="card-location">📍 {s["location"]}</span>
            </div>
          </div>
          <div class="card-quote">"{s["quote"]}"</div>
          <p class="card-desc">{s["desc"]}</p>
          <div class="card-meta">
            <span>🌿 最佳季节：{s["season"]}</span>
            <span>⏱️ 建议时长：{s["duration"]}</span>
          </div>
          <div class="card-services">{services_html}</div>
        </div>
        '''

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>《挪威的森林》文学坐标报告</title>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Playfair+Display:wght@400;600;700&display=swap");
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    font-family: 'Noto Serif SC', 'Playfair Display', serif;
    background: #0f0f1a;
    color: #f5f0e8;
    padding: 2rem;
  }}
  .container {{ max-width: 800px; margin: 0 auto; }}
  .header {{
    text-align: center;
    padding: 3rem 0;
    border-bottom: 1px solid rgba(201,168,76,0.2);
    margin-bottom: 2rem;
  }}
  .header h1 {{
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #e8d5a3, #c9a84c, #c47d3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }}
  .header .subtitle {{
    font-size: 0.9rem;
    color: rgba(245,240,232,0.6);
    margin-top: 0.5rem;
  }}
  .header .date {{
    font-size: 0.75rem;
    color: rgba(201,168,76,0.6);
    margin-top: 0.5rem;
  }}
  .author-section {{
    background: linear-gradient(135deg, rgba(45,45,68,0.5), rgba(26,26,46,0.8));
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }}
  .author-section h2 {{
    color: #c9a84c;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }}
  .author-section .name-en {{
    color: rgba(245,240,232,0.5);
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }}
  .author-section .bio {{
    font-size: 0.8rem;
    color: rgba(245,240,232,0.7);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto;
  }}
  .author-stats {{
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }}
  .author-stat {{
    text-align: center;
  }}
  .author-stat .num {{
    font-size: 1.25rem;
    font-weight: 700;
    color: #c9a84c;
  }}
  .author-stat .label {{
    font-size: 0.65rem;
    color: rgba(245,240,232,0.5);
  }}
  .site-card {{
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s;
  }}
  .site-card:hover {{
    border-color: rgba(201,168,76,0.5);
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }}
  .card-header {{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }}
  .card-emoji {{ font-size: 2.5rem; }}
  .card-header h3 {{
    font-size: 1.1rem;
    color: #f5f0e8;
    margin-bottom: 0.25rem;
  }}
  .card-location {{
    font-size: 0.75rem;
    color: #7a8c6e;
  }}
  .card-quote {{
    font-style: italic;
    font-size: 0.85rem;
    color: #c9a84c;
    line-height: 1.7;
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border-left: 3px solid #c9a84c;
    background: rgba(201,168,76,0.05);
    border-radius: 0 8px 8px 0;
  }}
  .card-desc {{
    font-size: 0.8rem;
    color: rgba(245,240,232,0.7);
    line-height: 1.6;
    margin-bottom: 1rem;
  }}
  .card-meta {{
    display: flex;
    gap: 1.5rem;
    font-size: 0.7rem;
    color: rgba(245,240,232,0.5);
    margin-bottom: 1rem;
  }}
  .card-services {{
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }}
  .service-tag {{
    padding: 0.35rem 0.75rem;
    background: rgba(201,168,76,0.15);
    border-radius: 20px;
    font-size: 0.65rem;
    color: #c9a84c;
  }}
  .footer {{
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid rgba(201,168,76,0.1);
    margin-top: 2rem;
  }}
  .footer p {{
    font-size: 0.7rem;
    color: rgba(245,240,232,0.3);
  }}
  .footer .logo {{
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 900;
    color: #c9a84c;
    margin-bottom: 0.5rem;
  }}
  @media (max-width: 600px) {{
    body {{ padding: 1rem; }}
    .header h1 {{ font-size: 1.8rem; }}
    .card-meta {{ flex-direction: column; gap: 0.35rem; }}
    .author-stats {{ gap: 1rem; }}
  }}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>文迹 · Literary Footprints</h1>
    <p class="subtitle">— 文学坐标深度报告 —</p>
    <p class="date">生成时间: {datetime.now().strftime("%Y-%m-%d %H:%M")}</p>
  </div>

  <div class="author-section">
    <h2>村上春树</h2>
    <p class="name-en">Haruki Murakami</p>
    <p class="bio">
      1949年1月12日出生于日本京都。日本当代最具国际影响力的作家之一。
      代表作《挪威的森林》《1Q84》《海边的卡夫卡》《寻羊冒险记》。
      作品被翻译成50多种语言，获耶路撒冷文学奖、弗朗茨·卡夫卡奖等。
    </p>
    <div class="author-stats">
      <div class="author-stat"><div class="num">5</div><div class="label">文学坐标</div></div>
      <div class="author-stat"><div class="num">1,000万+</div><div class="label">全球销量</div></div>
      <div class="author-stat"><div class="num">1987</div><div class="label">出版年份</div></div>
    </div>
  </div>

  {cards_html}

  <div class="footer">
    <div class="logo">文迹 · Literary Footprints</div>
    <p>守护人类共同的文化记忆 · Civil Guardian</p>
    <p>&copy; {datetime.now().year} All Rights Reserved</p>
  </div>
</div>
</body>
</html>"""
    return html


def send_email(html_content):
    email_from = os.environ.get("EMAIL_FROM", "274764021@qq.com")
    email_to = os.environ.get("EMAIL_TO", "274764021@qq.com")
    email_password = os.environ.get("EMAIL_PASSWORD", "")
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.qq.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))

    msg = MIMEMultipart("alternative")
    msg["From"] = email_from
    msg["To"] = email_to
    msg["Subject"] = "📖 文迹报告：《挪威的森林》文学坐标巡礼 (HTML版)"

    plain_text = "《挪威的森林》文学坐标报告已生成，请查看HTML附件。"
    msg.attach(MIMEText(plain_text, "plain", "utf-8"))

    html_part = MIMEText(html_content, "html", "utf-8")
    msg.attach(html_part)

    html_bytes = html_content.encode("utf-8")
    attachment = MIMEBase("text", "html", charset="utf-8")
    attachment.set_payload(html_bytes)
    encoders.encode_base64(attachment)
    attachment.add_header(
        "Content-Disposition",
        "attachment",
        filename=("utf-8", "", "挪威的森林-文学坐标报告.html"),
    )
    msg.attach(attachment)

    print(f"Connecting to {smtp_server}...")
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(email_from, email_password)
    server.send_message(msg)
    server.quit()
    print(f"Email sent to {email_to}")


if __name__ == "__main__":
    html = generate_html()
    send_email(html)
    print("Done!")
