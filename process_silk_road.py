#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
处理《穿越丝绸之路与你重逢》- 提取地名并生成报告
"""

import sys
sys.path.insert(0, 'src')

from main_pipeline import PlaceTravelPipeline
from card_generator import CardGenerator
import json

# 《穿越丝绸之路与你重逢》相关内容示例
# 由于无法获取完整书籍，这里使用丝绸之路常见地名作为示例
silk_road_text = """
丝绸之路穿越千年，连接东西方文明。
长安是丝绸之路的起点，也是古代中国最繁华的都市。
从长安出发，商队经过敦煌，这里是丝路上的重要枢纽。
敦煌莫高窟保存了丰富的佛教艺术珍品。
继续西行，经过河西走廊，进入新疆。
新疆的喀什是古代丝绸之路的重要商埠。
吐鲁番的火焰山闻名遐迩。
沿着塔里木盆地南缘，可以到达和田，这里以玉石闻名。
穿越帕米尔高原，进入中亚地区。
撒马尔罕是粟特人的故乡，也是丝路重镇。
布哈拉和撒马尔罕同为丝路名城。
继续前往波斯帝国的首都伊斯法罕。
穿越小亚细亚，最终到达罗马。
君士坦丁堡是东西方贸易的枢纽。
丝路还经过印度次大陆的德里和孟买。
从海路，泉州是海上丝绸之路的起点。
广州、泉州、明州是宋代三大港市。
澳门曾是东西方贸易的重要中转站。
"""

# 扩展地名数据库以包含更多丝绸之路地点
def process_silk_road():
    print("正在处理《穿越丝绸之路与你重逢》...")
    
    # 提取地名
    from place_extractor import PlaceExtractor
    extractor = PlaceExtractor()
    places = extractor.extract(silk_road_text)
    
    print(f"提取到 {len(places)} 个地点")
    for p in places:
        print(f"  - {p.name}")
    
    # 生成卡片
    card_gen = CardGenerator()
    cards = {}
    for place in places:
        cards[place.name] = card_gen.generate(place)
    
    # 生成报告
    report = {
        "book": "穿越丝绸之路与你重逢",
        "author": "读者丛书编辑组",
        "publisher": "甘肃人民出版社",
        "year": "2019",
        "total_places": len(places),
        "locations": list(set(p.name for p in places)),
        "place_cards": {},
        "route": {}
    }
    
    # 添加卡片信息
    for name, card in cards.items():
        report["place_cards"][name] = {
            "tags": card.tags,
            "historical_sites": card.historical_sites,
            "culinary_specialties": card.culinary_specialties,
            "travel_tips": card.travel_tips,
            "best_time": card.best_time_to_visit
        }
    
    return report

if __name__ == "__main__":
    result = process_silk_road()
    print(f"\n处理完成！")
    print(f"地点数量: {result['total_places']}")
    print(f"地点列表: {result['locations']}")
