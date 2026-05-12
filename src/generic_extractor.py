import re
from typing import List
from data_models import Place

class GenericPlaceExtractor:
    """通用地名提取器 - 适用于任何书籍文本"""
    
    def __init__(self):
        # 中文地名：2+汉字
        self.chinese_pattern = r'[\u4e00-\u9fa5]{2,}'
        # 英文地名：首字母大写的单词序列
        self.english_pattern = r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b'
        # 自定义模式（可扩展）
        self.custom_patterns = []
        # 排除关键词 - 包含这些词的中文串不作为地名
        self.exclude_keywords = ['小说', '作家', '创作', '作品', '主人公', '虚构', '故事']
    
    def add_pattern(self, pattern: str):
        """添加自定义提取模式"""
        self.custom_patterns.append(re.compile(pattern))
    
    def extract(self, text: str) -> List[Place]:
        """从任意文本中提取地名"""
        places = []
        
        # 中文提取
        for match in re.finditer(self.chinese_pattern, text):
            name = match.group()
            if self._is_valid_chinese_place(name):
                places.append(self._create_place(name, "region", match, text))
        
        # 英文提取
        english_names = set()
        for match in re.finditer(self.english_pattern, text):
            name = match.group()
            if len(name) > 3:  # 过滤太短的词
                english_names.add(name)
        for name in english_names:
            places.append(self._create_place(name, "landmark", None, text))
        
        # 自定义模式提取
        for pattern in self.custom_patterns:
            for match in pattern.finditer(text):
                name = match.group()
                places.append(self._create_place(name, "custom", match, text))
        
        return places
    
    def _is_valid_chinese_place(self, name: str) -> bool:
        """验证中文地名有效性"""
        if any(keyword in name for keyword in self.exclude_keywords):
            return False
        return True
    
    def _create_place(self, name: str, category: str, match, text: str) -> Place:
        """创建Place对象"""
        context = ""
        if match:
            start = max(0, match.start() - 50)
            end = min(len(text), match.end() + 50)
            context = text[start:end]
        
        return Place(
            name=name,
            category=category,
            context=context,
            historical_periods=["unknown"],
            notable_people=[],
            events=[]
        )

def extract_generic_places(text: str) -> List[Place]:
    """通用地名提取接口"""
    extractor = GenericPlaceExtractor()
    return extractor.extract(text)
