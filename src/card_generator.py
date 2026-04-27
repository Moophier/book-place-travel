from typing import List
from data_models import Place, PlaceCard

class CardGenerator:
    HISTORICAL_DATABASE = {
        "Davos": {
            "periods": ["19th century", "20th century"],
            "events": ["疗养文化兴起", "肺结核治疗发展"],
            "notable_people": ["作家托马斯·曼"],
            "cuisine": ["瑞士奶酪火锅", "Rösti土豆饼"],
            "famous_restaurants": ["高山餐厅", "传统瑞士小馆"]
        },
        "Davos, Switzerland": {
            "periods": ["20th century"],
            "events": ["国际疗养地", "冬季运动发展"],
            "notable_people": ["托马斯·曼《魔山》主人公原型"],
            "cuisine": ["瑞士特色菜", "阿尔卑斯奶酪"],
            "famous_restaurants": ["Davos传统餐厅"]
        }
    }
    
    def generate(self, place: Place) -> PlaceCard:
        db_key = place.name
        for key in self.HISTORICAL_DATABASE:
            if key.lower() in db_key.lower():
                db_key = key
                break
        db_entry = self.HISTORICAL_DATABASE.get(db_key, self._get_default(place))
        tags = [*db_entry["periods"], "historical architecture", "cultural heritage"]
        if "瑞士" in place.name or "Switzerland" in place.name:
            tags.append("UNESCO site")
        return PlaceCard(
            place=place,
            tags=tags,
            historical_sites=db_entry["events"],
            culinary_specialties=db_entry["cuisine"],
            famous_restaurants=db_entry["famous_restaurants"],
            travel_tips=self._generate_tips(place),
            best_time_to_visit=self._get_best_time(place)
        )
    
    def _get_default(self, place):
        return {"periods": ["20th century"], "events": [f"与{place.name}相关的历史事件"], "notable_people": [], "cuisine": ["当地特色美食"], "famous_restaurants": ["传统餐厅"]}
    
    def _generate_tips(self, place):
        if "Davos" in place.name or "davos" in place.name.lower():
            return "最佳访问时间：冬季滑雪（12月-3月），夏季徒步（6月-9月）。建议停留2-3天。"
        return "建议提前预订，春秋季气候宜人。"
    
    def _get_best_time(self, place):
        if "Davos" in place.name or "davos" in place.name.lower():
            return "12月-3月（滑雪），6月-9月（徒步）"
        return "全年适宜"
