import json
from typing import Dict, List, Any
from data_models import Place, PlaceCard, TravelRoute, RouteLeg
from place_extractor import PlaceExtractor
from card_generator import CardGenerator
from route_planner import RoutePlanner

class PlaceTravelPipeline:
    def __init__(self):
        self.extractor = PlaceExtractor()
        self.card_gen = CardGenerator()
        self.route_planner = RoutePlanner()
    
    def process_book_text(self, book_text: str) -> Dict[str, Any]:
        places = self.extractor.extract(book_text)
        cards = {}
        for place in places:
            cards[place.name] = self.card_gen.generate(place)
        route_list = self.route_planner.plan_route(places)
        return {
            "book_analysis": {"total_places_found": len(places), "unique_locations": list(set(p.name for p in places))},
            "place_cards": {name: self._card_to_dict(card) for name, card in cards.items()},
            "travel_route": self._route_to_dict(route_list),
            "summary": self._generate_summary(cards, route_list)
        }
    
    def _card_to_dict(self, card: PlaceCard) -> Dict[str, Any]:
        return {
            "place": {"name": card.place.name, "category": card.place.category, "context": card.place.context,
                "historical_periods": card.place.historical_periods, "notable_people": card.place.notable_people,
                "events": card.place.events},
            "tags": card.tags, "historical_sites": card.historical_sites,
            "culinary_specialties": card.culinary_specialties, "famous_restaurants": card.famous_restaurants,
            "travel_tips": card.travel_tips, "best_time_to_visit": card.best_time_to_visit
        }
    
    def _route_to_dict(self, route_list: List[RouteLeg]) -> Dict[str, Any]:
        return {"legs": [{"from": l.from_place, "to": l.to_place, "distance_km": l.distance_km,
            "duration_hours": l.duration_hours, "transport_mode": l.transport_mode} for l in route_list],
            "total_distance_km": sum(l.distance_km for l in route_list),
            "total_duration_hours": sum(l.duration_hours for l in route_list)}
    
    def _generate_summary(self, cards, route_list):
        names = list(cards.keys())
        dist = sum(l.distance_km for l in route_list)
        time = sum(l.duration_hours for l in route_list)
        return f"发现地点: {len(names)} 个\n{', '.join(names)}\n总距离: {dist:.1f}km, 预计时间: {time:.1f}小时"
    
    def generate_report(self, result: Dict) -> str:
        lines = ["书籍地名旅行规划报告", "=" * 50, result.get("summary", "")]
        for name, card in result["place_cards"].items():
            lines.append(f"\n{name}: 标签={', '.join(card['tags'])}")
        route = result["travel_route"]
        lines.append("\n路线:")
        for l in route["legs"]: lines.append(f"  {l['from']}->{l['to']}: {l['distance_km']}km")
        return "\n".join(lines)
    
    def save_json(self, result: Dict, filename: str = "travel_plan.json"):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"保存至: {filename}")

def process_book_text(text: str) -> Dict[str, Any]:
    return PlaceTravelPipeline().process_book_text(text)

def analyze_book_file(filepath: str, encoding='utf-8'):
    with open(filepath, 'r', encoding=encoding) as f:
        return process_book_text(f.read())
