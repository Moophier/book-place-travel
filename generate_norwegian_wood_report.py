import os
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib
import io

from dotenv import load_dotenv

load_dotenv()

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm, cm
    from reportlab.lib.colors import HexColor, black, white
    from reportlab.pdfgen import canvas
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import Paragraph, Frame, Spacer
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

    SIMSUM = None
    for path in [
        r"C:\Windows\Fonts\simsun.ttc",
        r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\msyh.ttf",
    ]:
        if os.path.exists(path):
            pdfmetrics.registerFont(TTFont("SimSun", path))
            SIMSUM = "SimSun"
            break

    if not SIMSUM:
        print("No Chinese font found, using Helvetica.")
        SIMSUM = "Helvetica"

    GOLD = HexColor("#c9a84c")
    DARK = HexColor("#1a1a2e")
    PAPER = HexColor("#f5f0e8")
    SAGE = HexColor("#7a8c6e")

    sites = [
        {
            "emoji": "🎸",
            "title": "井之头公园",
            "location": "东京吉祥寺",
            "quote": "每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢。",
            "desc": "渡边彻与直子、绿子相遇的井之头公园。午后的阳光穿过银杏叶洒在湖面上，青春在这里既美好又令人心碎。",
            "season": "春/秋",
            "duration": "2-3小时",
            "works": "《挪威的森林》, 《东京奇谭集》",
            "services": ["吉祥寺民宿", "井之头咖啡馆", "现场音乐酒吧"],
        },
        {
            "emoji": "🌿",
            "title": "青山墓地",
            "location": "东京港区",
            "quote": "死并不是生的对立面，而是作为生的一部分永存。",
            "desc": "直子常常提起的墓地。在钢筋森林中的这片寂静之地，渡边思考着生与死的界限，也是全篇哲学深度的所在。",
            "season": "四季",
            "duration": "1-2小时",
            "works": "《挪威的森林》",
            "services": ["青山历史导览", "樱花季散步", "表参道茶室"],
        },
        {
            "emoji": "🌸",
            "title": "奈良吉野山",
            "location": "奈良县",
            "quote": "记忆就像那场大雪，覆盖了所有，却掩不住春天的痕迹。",
            "desc": "直子疗养的深山疗养院所在地。远离尘嚣的吉野山，樱花与云雾交织，是小说中最具禅意的空间。",
            "season": "春（樱花）/ 秋（红叶）",
            "duration": "半天",
            "works": "《挪威的森林》",
            "services": ["吉野温泉旅馆", "吉野山徒步", "奈良乡土料理"],
        },
        {
            "emoji": "📚",
            "title": "早稻田大学",
            "location": "东京新宿",
            "quote": "我在一片混沌中寻找自己的位置，就像在森林中寻找出路。",
            "desc": "小说主角渡边的大学生活舞台。文学部的教室里，年轻人们讨论着存在主义与爱情，是泡沫经济时代日本学生的缩影。",
            "season": "春（入学季）/ 秋（文化祭）",
            "duration": "2-3小时",
            "works": "《挪威的森林》",
            "services": ["早大校园导览", "神保町古书街", "新宿文学散步"],
        },
        {
            "emoji": "🎶",
            "title": "三鹰公寓",
            "location": "东京三鹰市",
            "quote": "挪威的森林，就像那首Beatles的歌，不知为何总让人落泪。",
            "desc": "渡边反复听「Norwegian Wood」唱片的狭小公寓。唱片机的指针划过黑胶，Beatles的旋律贯穿了整个青春时代。",
            "season": "四季",
            "duration": "1小时（外观参观）",
            "works": "《挪威的森林》",
            "services": ["三鹰爵士酒吧", "吉卜力美术馆", "下北泽音乐之旅"],
        },
    ]

    def generate_pdf(output_path):
        c = canvas.Canvas(output_path, pagesize=A4)
        width, height = A4

        def draw_background():
            c.setFillColor(DARK)
            c.rect(0, 0, width, height, fill=1)

        def draw_border():
            c.setStrokeColor(GOLD)
            c.setLineWidth(2)
            c.rect(20 * mm, 15 * mm, width - 40 * mm, height - 30 * mm)
            c.setStrokeColor(HexColor("#c9a84c40"))
            c.setLineWidth(0.5)
            c.rect(23 * mm, 18 * mm, width - 46 * mm, height - 36 * mm)

        def draw_header():
            c.setFillColor(GOLD)
            c.setFont("SimSun", 24)
            c.drawCentredString(
                width / 2, height - 35 * mm, "文迹 · Literary Footprints"
            )
            c.setFont("SimSun", 10)
            c.setFillColor(HexColor("#c9a84c80"))
            c.drawCentredString(width / 2, height - 42 * mm, "— 文学坐标深度报告 —")
            c.setFont("SimSun", 8)
            c.setFillColor(HexColor("#ffffff40"))
            c.drawRightString(
                width - 30 * mm,
                25 * mm,
                f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
            )
            c.drawString(30 * mm, 25 * mm, "页面 1")

        def draw_author_card():
            c.setFillColor(GOLD)
            c.setFont("SimSun", 16)
            c.drawString(35 * mm, height - 55 * mm, "村上春树")
            c.setFont("SimSun", 12)
            c.setFillColor(white)
            c.drawString(35 * mm, height - 63 * mm, "Haruki Murakami")
            c.setFont("SimSun", 9)
            c.setFillColor(HexColor("#ffffff60"))
            c.drawString(35 * mm, height - 72 * mm, "1949年1月12日出生于日本京都")
            c.drawString(
                35 * mm,
                height - 78 * mm,
                "代表作：《挪威的森林》《1Q84》《海边的卡夫卡》",
            )
            c.drawString(
                35 * mm,
                height - 84 * mm,
                "获奖：耶路撒冷文学奖、卡夫卡奖、世界奇幻文学奖",
            )

            c.setStrokeColor(GOLD)
            c.setLineWidth(0.5)
            c.setFillColor(HexColor("#c9a84c15"))
            c.roundRect(32 * mm, height - 88 * mm, width - 64 * mm, 35 * mm, 4, fill=1)
            c.setFillColor(HexColor("#ffffff80"))
            c.setFont("SimSun", 8.5)
            c.drawString(
                37 * mm,
                height - 83 * mm,
                f'"挪威的森林"（Noruwei no Mori）是村上春树1987年出版的长篇小说，',
            )
            c.drawString(
                37 * mm,
                height - 90 * mm,
                "以1960年代末的日本为背景，讲述了大学生渡边彻与直子、绿子之间的情感纠葛。",
            )
            c.drawString(
                37 * mm,
                height - 97 * mm,
                "小说标题取自Beatles的同名歌曲，全球销量超过1000万册。",
            )

        def draw_site_card(site, idx, y_start):
            box_height = 63 * mm
            c.setStrokeColor(HexColor("#c9a84c30"))
            c.setFillColor(HexColor("#2d2d4420"))
            c.roundRect(
                28 * mm,
                y_start - box_height,
                width - 56 * mm,
                box_height - 5 * mm,
                6,
                fill=1,
            )

            c.setStrokeColor(GOLD)
            c.setLineWidth(0.5)
            c.roundRect(
                28 * mm,
                y_start - box_height,
                width - 56 * mm,
                box_height - 5 * mm,
                6,
                fill=0,
            )

            c.setFillColor(GOLD)
            c.setFont("SimSun", 14)
            c.drawString(
                33 * mm, y_start - 10 * mm, f"{site['emoji']}  {site['title']}"
            )
            c.setFont("SimSun", 8)
            c.setFillColor(HexColor("#7a8c6e"))
            c.drawString(33 * mm, y_start - 18 * mm, f"📍 {site['location']}")

            c.setFillColor(white)
            c.setFont("SimSun", 8.5)
            text = c.beginText(33 * mm, y_start - 27 * mm)
            text.textLines(f'"{site["quote"]}"')
            c.drawText(text)

            c.setFillColor(HexColor("#ffffff60"))
            c.setFont("SimSun", 8)
            text = c.beginText(33 * mm, y_start - 45 * mm)
            text.textLines(site["desc"])
            c.drawText(text)

            c.setFillColor(HexColor("#c9a84c"))
            c.setFont("SimSun", 7)
            c.drawString(
                33 * mm,
                y_start - 55 * mm,
                f"最佳季节: {site['season']}  |  建议时长: {site['duration']}",
            )

            c.setFillColor(HexColor("#7a8c6e"))
            c.setFont("SimSun", 7)
            c.drawString(33 * mm, y_start - 59 * mm, f"关联作品: {site['works']}")

        draw_background()
        draw_border()
        draw_header()
        draw_author_card()

        y = height - 100 * mm
        for i, site in enumerate(sites):
            if y < 50 * mm:
                c.showPage()
                draw_background()
                draw_border()
                y = height - 25 * mm
            draw_site_card(site, i, y)
            y -= 68 * mm

        c.save()
        print(f"PDF generated: {output_path}")
        return output_path

    def send_email(pdf_path):
        email_from = os.environ.get("EMAIL_FROM", "274764021@qq.com")
        email_to = os.environ.get("EMAIL_TO", "274764021@qq.com")
        email_password = os.environ.get("EMAIL_PASSWORD", "")
        smtp_server = os.environ.get("SMTP_SERVER", "smtp.qq.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))

        msg = MIMEMultipart()
        msg["From"] = email_from
        msg["To"] = email_to
        msg["Subject"] = "📖 文迹报告：《挪威的森林》文学坐标巡礼"

        body_html = f"""
        <html>
        <body style="font-family: 'Noto Serif SC', serif; background: #0f0f1a; color: #f5f0e8; padding: 20px;">
            <div style="max-width:600px; margin:0 auto; border:1px solid #c9a84c; border-radius:16px; padding:2rem; background:#1a1a2e;">
                <h1 style="color:#c9a84c; text-align:center; font-size:1.5rem;">📖 文迹 · Literary Footprints</h1>
                <h2 style="color:#c9a84c; text-align:center; font-size:1rem; margin-top:0.5rem;">《挪威的森林》文学坐标深度报告</h2>
                <hr style="border:0.5px solid #c9a84c40; margin:1.5rem 0;">
                <p style="color:#f5f0e8; line-height:1.8;">
                    尊敬的巡礼者，
                </p>
                <p style="color:#f5f0e8; line-height:1.8;">
                    您专属的<b style="color:#c9a84c;">《挪威的森林》文学坐标卡片集</b>已生成完毕。
                    本报告收录了村上春树笔下5个重要场景的详细巡礼信息。
                </p>
                <div style="background:#2d2d44; border-radius:8px; padding:1rem; margin:1rem 0;">
                    <p style="color:#c9a84c; margin:0 0 0.5rem 0;"><b>📍 收录地点：</b></p>
                    <ul style="color:#f5f0e8; margin:0; padding-left:1.25rem;">
                        <li>🎸 吉祥寺 · 井之头公园</li>
                        <li>🌿 青山墓地</li>
                        <li>🌸 奈良吉野山</li>
                        <li>📚 早稻田大学</li>
                        <li>🎶 三鹰公寓</li>
                    </ul>
                </div>
                <p style="color:#f5f0e8; line-height:1.8;">
                    每张卡片均包含文学金句、打卡攻略、关联作品及供应商推荐服务。
                </p>
                <div style="text-align:center; margin-top:1.5rem; padding:1rem; border-top:1px solid #c9a84c30;">
                    <p style="color:#c9a84c; font-size:0.75rem;">
                        ✦ 文迹 · Literary Footprints ✦<br>
                        文明守护者 &copy; {datetime.now().year}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        msg.attach(MIMEText(body_html, "html", "utf-8"))

        with open(pdf_path, "rb") as f:
            attachment = MIMEBase("application", "octet-stream")
            attachment.set_payload(f.read())
            encoders.encode_base64(attachment)
            attachment.add_header(
                "Content-Disposition",
                "attachment",
                filename="挪威的森林-文学坐标报告.pdf",
            )
            msg.attach(attachment)

        print(f"📧 Connecting to {smtp_server}:{smtp_port}...")
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_from, email_password)
        server.send_message(msg)
        server.quit()
        print(f"✅ Email sent to {email_to}")

    if __name__ == "__main__":
        pdf_path = "pdf-output/norwegian-wood-report.pdf"
        os.makedirs("pdf-output", exist_ok=True)
        generate_pdf(pdf_path)
        send_email(pdf_path)

except ImportError as e:
    print(f"Error: {e}")
    print(
        "Please install reportlab and python-dotenv: pip install reportlab python-dotenv"
    )
except Exception as e:
    print(f"Error: {e}")
    import traceback

    traceback.print_exc()
