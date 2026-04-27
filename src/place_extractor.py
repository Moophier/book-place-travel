import re
from typing import List
from data_models import Place

class PlaceExtractor:
    def __init__(self):
        self.place_keywords = ['达沃斯', '瑞士', '阿尔卑斯', '因特拉肯', '苏黎世', '卢塞恩']
    
    def extract(self, text: str) -> List[Place]:
        places = []
        for keyword in self.place_keywords:
            pattern = re.compile(re.escape(keyword))
            for match in pattern.finditer(text):
                if not any(p.name == keyword for p in places):
                    places.append(Place(
                        name=keyword,
                        category="region",
                        context=self._get_context(text, match),
                        historical_periods=["20th century"],
                        notable_people=[],
                        events=[]
                    ))
        return places
    
    def _get_context(self, text, match, english_name=""):
        if match:
            start = max(0, match.start() - 50)
            end = min(len(text), match.end() + 50)
            return text[start:end]
        elif english_name:
            pos = text.find(english_name)
            if pos != -1:
                start = max(0, pos - 50)
                end = min(len(text), pos + len(english_name) + 50)
                return text[start:end]
        return ""

def extract_places(text: str) -> List[Place]:
    return PlaceExtractor().extract(text)
