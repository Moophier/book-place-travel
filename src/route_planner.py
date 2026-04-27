from typing import List
from data_models import Place, RouteLeg

class RoutePlanner:
    def __init__(self):
        self.distance_matrix = {("Davos", "Zurich"): 150, ("Zurich", "Davos"): 150}
    
    def plan_route(self, places: List[Place]) -> List[RouteLeg]:
        if len(places) <= 1:
            return []
        graph = self._build_graph(places)
        route_order = self._greedy_tsp(places, graph)
        return self._create_legs(route_order, graph)
    
    def _build_graph(self, places):
        graph = {}
        for i, p1 in enumerate(places):
            for j, p2 in enumerate(places):
                if i != j:
                    graph[(p1.name, p2.name)] = self._estimate_distance(p1, p2)
        return graph
    
    def _estimate_distance(self, p1, p2):
        return 0.0 if p1.name == p2.name else 100.0
    
    def _greedy_tsp(self, places, graph):
        if not places:
            return []
        # 按名称排序作为简单路径
        sorted_places = sorted(places, key=lambda p: p.name)
        return sorted_places
    
    def _create_legs(self, route, graph):
        legs = []
        for i in range(len(route) - 1):
            from_p, to_p = route[i], route[i + 1]
            key = (from_p.name, to_p.name)
            dist = graph.get(key, 100.0)
            transport = "flight" if dist > 1000 else "train" if dist > 300 else "car"
            duration = dist / (800 if transport == "flight" else 100 if transport == "train" else 60)
            legs.append(RouteLeg(from_p.name, to_p.name, dist, round(duration, 1), transport))
        return legs
