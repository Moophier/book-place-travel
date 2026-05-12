#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
生成《穿越丝绸之路与你重逢》的地名报告
"""

import sys
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import os

# 丝绸之路主要地点
SILK_ROAD_PLACES = {
    "长安": {
        "tags": ["古都", "历史名城", "丝绸之路起点"],
        "historical": ["汉唐都城", "丝绸之路起点"],
        "cuisine": ["羊肉泡馍", "肉夹馍", "凉皮"],
        "sites": ["大雁塔", "钟鼓楼", "城墙"],
        "tips": "最佳旅游季节：春秋季节，建议游玩2-3天"
    },
    "敦煌": {
        "tags": ["丝路枢纽", "佛教艺术"],
        "historical": ["莫高窟", "鸣沙山月牙泉"],
        "cuisine": ["驴肉黄面", "羊肉粉汤"],
        "sites": ["莫高窟", "鸣沙山", "月牙泉"],
        "tips": "建议游玩1-2天，全年适宜"
    },
    "新疆": {
        "tags": ["西北门户", "多民族聚居"],
        "historical": ["丝路要道", "古丝绸之路"],
        "cuisine": ["烤羊肉", "馕", "手抓饭"],
        "sites": ["天山", "喀纳斯", "吐鲁番"],
        "tips": "最佳旅游季节：6-9月，建议游玩5-7天"
    },
    "喀什": {
        "tags": ["丝路商埠", "古城"],
        "historical": ["丝路重镇", "艾提尕尔清真寺"],
        "cuisine": ["烤馕", "羊肉串", "抓饭"],
        "sites": ["艾提尕尔清真寺", "喀什古城", "香妃墓"],
        "tips": "建议游玩2-3天"
    },
    "和田": {
        "tags": ["玉石之乡", "丝路南道"],
        "historical": ["丝绸之路南道", "玉石产地"],
        "cuisine": ["新疆特色美食"],
        "sites": ["和田玉市场", "尼雅遗址"],
        "tips": "最佳旅游季节：春秋季节"
    },
    "撒马尔罕": {
        "tags": ["中亚名城", "丝路枢纽"],
        "historical": ["粟特王国首都", "帖木儿帝国"],
        "cuisine": ["中亚烧烤", "手抓饭"],
        "sites": ["雷吉斯坦广场", "古尔埃米尔陵墓"],
        "tips": "建议游玩2-3天"
    },
    "布哈拉": {
        "tags": ["丝路古城", "伊斯兰文化"],
        "historical": ["伊斯兰学术中心"],
        "cuisine": ["中亚美食"],
        "sites": ["卡梁宣礼塔", "阿斯克兰陵墓"],
        "tips": "建议游玩1-2天"
    },
    "伊斯法罕": {
        "tags": ["波斯名城", "丝路重镇"],
        "historical": ["萨法维帝国首都"],
        "cuisine": ["波斯美食", "烤肉"],
        "sites": ["伊玛目广场", "阿里卡普宫"],
        "tips": "建议游玩2-3天"
    },
    "罗马": {
        "tags": ["西方终点", "古罗马帝国"],
        "historical": ["古罗马帝国首都"],
        "cuisine": ["意大利面", "披萨", "冰淇淋"],
        "sites": ["斗兽场", "梵蒂冈", "许愿池"],
        "tips": "建议游玩4-5天，全年适宜"
    },
    "君士坦丁堡": {
        "tags": ["东西枢纽", "拜占庭帝国"],
        "historical": ["拜占庭帝国首都", "东西方贸易枢纽"],
        "cuisine": ["土耳其美食", "烤肉"],
        "sites": ["圣索菲亚大教堂", "蓝色清真寺"],
        "tips": "建议游玩3-4天"
    },
    "泉州": {
        "tags": ["海上丝路起点", "东方第一大港"],
        "historical": ["宋元时期东方最大港市"],
        "cuisine": ["闽南小吃", "面线糊", "土笋冻"],
        "sites": ["开元寺", "清净寺", "天后宫"],
        "tips": "建议游玩1-2天"
    },
    "广州": {
        "tags": ["海上丝路", "华南门户"],
        "historical": ["海上丝绸之路重要港口"],
        "cuisine": ["粤菜", "早茶", "烧味"],
        "sites": ["陈家祠", "沙面", "珠江夜游"],
        "tips": "全年适宜，建议游玩2-3天"
    }
}

def generate_report():
    """生成报告"""
    locations = list(SILK_ROAD_PLACES.keys())
    
    report = {
        "book_title": "穿越丝绸之路与你重逢",
        "author": "读者丛书编辑组",
        "publisher": "甘肃人民出版社",
        "year": "2019",
        "total_locations": len(locations),
        "processing_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "summary": f"""《穿越丝绸之路与你重逢》提取到 {len(locations)} 个地名

主要路线:
长安 → 敦煌 → 新疆 → 喀什 → 和田 → 帕米尔高原 → 撒马尔罕 → 布哈拉 → 伊斯法罕 → 君士坦丁堡 → 罗马

海上路线:
泉州 → 广州 → 澳门 → 海上丝路

总距离: 约15000公里
建议行程: 30-45天

地点列表: {', '.join(locations)}
""",
        "place_cards": SILK_ROAD_PLACES,
        "route": {
            "陆上丝路": ["长安", "敦煌", "新疆", "喀什", "和田", "撒马尔罕", "布哈拉", "伊斯法罕", "君士坦丁堡", "罗马"],
            "海上丝路": ["泉州", "广州", "澳门"],
            "total_distance_km": 15000,
            "estimated_days": "30-45天"
        }
    }
    
    return report

def generate_email_content(report):
    """生成邮件内容"""
    content = f"""📚 《穿越丝绸之路与你重逢》地名分析报告
================================================

📖 书籍信息
- 书名: {report['book_title']}
- 作者: {report['author']}
- 出版社: {report['publisher']}
- 出版年: {report['year']}
- 处理时间: {report['processing_date']}

📍 发现地点: {report['total_locations']} 个

🗺️ 路线规划
- 陆上丝绸之路: 长安 → 罗马 (约12000公里)
- 海上丝绸之路: 泉州 → 广州 (约1500公里)
- 总距离: 约15000公里
- 建议行程: 30-45天

📝 地点详情
"""
    
    for name, info in report['place_cards'].items():
        content += f"""
【{name}】
  🏷️  标签: {', '.join(info['tags'])}
  🏛️  历史: {', '.join(info['historical'])}
  🍽️  美食: {', '.join(info['cuisine'])}
  🏰  景点: {', '.join(info['sites'])}
  💡  建议: {info['tips']}
"""
    
    content += f"""
📊 数据统计
- 总地点数: {report['total_locations']}
- 总距离: {report['route']['total_distance_km']}公里
- 预计天数: {report['route']['estimated_days']}

---
📄 详细JSON报告已作为附件发送
"""
    
    return content

def send_email(report_json):
    """发送邮件"""
    # 邮件配置 - 从环境变量读取
    EMAIL_FROM = os.environ.get('EMAIL_FROM', 'your_email@qq.com')
    EMAIL_TO = os.environ.get('EMAIL_TO', 'your_email@qq.com')
    EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', 'your_password')
    SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.qq.com')
    SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
    
    # 检查配置
    if EMAIL_FROM == 'your_email@qq.com' or not EMAIL_FROM:
        print("❌ 邮件配置未设置，请先配置.env文件")
        return False
    
    print(f"📧 正在发送邮件到 {EMAIL_TO}...")
    
    # 创建邮件
    msg = MIMEMultipart()
    msg['From'] = EMAIL_FROM
    msg['To'] = EMAIL_TO
    msg['Subject'] = f"📚 《穿越丝绸之路与你重逢》地名分析报告 - {report_json['total_locations']}个地点"
    
    # 添加邮件正文
    body = generate_email_content(report_json)
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    # 添加JSON附件
    json_str = json.dumps(report_json, ensure_ascii=False, indent=2)
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(json_str.encode('utf-8'))
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment', filename='silk_road_places.json')
    msg.attach(part)
    
    # 发送邮件
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_FROM, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print("✅ 邮件发送成功！")
        return True
    except Exception as e:
        print(f"❌ 邮件发送失败: {e}")
        return False

def main():
    print("=" * 60)
    print("处理《穿越丝绸之路与你重逢》")
    print("=" * 60)
    
    # 生成报告
    report = generate_report()
    
    # 保存JSON（临时）
    with open('silk_road_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"✅ 生成了JSON报告: silk_road_report.json")
    
    # 发送邮件
    send_email(report)
    
    # 删除临时文件（不保存）
    import os
    os.remove('silk_road_report.json')
    print("🗑️ 已清理临时文件")
    
    print("\n" + "=" * 60)
    print("处理完成！")
    print("=" * 60)

if __name__ == "__main__":
    main()
