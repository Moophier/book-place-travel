from dataclasses import dataclass, field
from typing import List

@dataclass
class Place:
    name: str
    category: str
    context: str = ""
    historical_periods: List[str] = field(default_factory=list)
    notable_people: List[str] = field(default_factory=list)
    events: List[str] = field(default_factory=list)

@dataclass
class PlaceCard:
    place: Place
    tags: List[str] = field(default_factory=list)
    historical_sites: List[str] = field(default_factory=list)
    culinary_specialties: List[str] = field(default_factory=list)
    famous_restaurants: List[str] = field(default_factory=list)
    travel_tips: str = ""
    best_time_to_visit: str = ""

@dataclass
class RouteLeg:
    from_place: str
    to_place: str
    distance_km: float
    duration_hours: float
    transport_mode: str

@dataclass
class TravelRoute:
    legs: List[RouteLeg] = field(default_factory=list)
    total_distance_km: float = 0.0
    total_duration_hours: float = 0.0
    optimized_order: List[str] = field(default_factory=list)
