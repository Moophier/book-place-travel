// Literary Footprints API Worker
// Zero external dependencies - uses native Request handler

const SITES = [
  { id: 'heritage-1', type: 'heritage', author: 'Thomas Mann', cnAuthor: '托马斯·曼', work: 'The Magic Mountain', cnWork: '《魔山》', location: 'Davos, Switzerland', cnLocation: '瑞士达沃斯', emoji: '🏔️', stamp: '文学', quote: 'Time is a doctor who heals all wounds.', desc: '汉斯·卡斯托普入住的疗养院。', atmosphere: ['lonely', 'mystical', 'contemplative'], lat: 46.8011, lng: 9.8227 },
  { id: 'heritage-2', type: 'heritage', author: 'Stefan Zweig', cnAuthor: '茨威格', work: 'The World of Yesterday', cnWork: '《昨日的世界》', location: 'Vienna, Austria', cnLocation: '奥地利维也纳', emoji: '🏛️', stamp: '美好年代', quote: 'I was born in Vienna.', desc: '茨威格笔下的维也纳。', atmosphere: ['nostalgic', 'romantic', 'historical'], lat: 48.2082, lng: 16.3738 },
  { id: 'heritage-3', type: 'heritage', author: 'Virgil', cnAuthor: '维吉尔', work: 'Aeneid', cnWork: '《埃涅阿斯纪》', location: 'Rome, Italy', cnLocation: '意大利罗马', emoji: '🏛️', stamp: '古罗马', quote: 'Arms and the man I sing.', desc: '罗马帝国的精神源头。', atmosphere: ['historical', 'desolate', 'mystical'], lat: 41.9028, lng: 12.4964 },
  { id: 'heritage-4', type: 'heritage', author: 'Wang Wei', cnAuthor: '王维', work: 'Mountain Dwelling', cnWork: '《山居秋暝》', location: "Xi'an, China", cnLocation: '中国西安', emoji: '🏯', stamp: '唐诗', quote: '明月松间照。', desc: '王维辋川别业。', atmosphere: ['healing', 'contemplative', 'nostalgic'], lat: 34.3416, lng: 108.9398 },
  { id: 'heritage-5', type: 'heritage', author: 'Lu Xun', cnAuthor: '鲁迅', work: 'Hometown', cnWork: '《故乡》', location: 'Shaoxing, China', cnLocation: '中国绍兴', emoji: '🏯', stamp: '经典', quote: '希望是本无所谓有。', desc: '鲁迅故里。', atmosphere: ['nostalgic', 'historical', 'lonely'], lat: 29.9961, lng: 120.5811 },
  { id: 'literary-1', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼', work: 'The Magic Mountain', cnWork: '《魔山》', location: 'Berghof Sanatorium', cnLocation: '贝尔格霍夫疗养院', emoji: '🏨', stamp: '疗养院', quote: 'We went up to the mountain.', desc: '山中疗养院。', atmosphere: ['lonely', 'mystical', 'contemplative'], lat: 46.7931, lng: 9.8282 },
  { id: 'literary-5', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Kichijoji, Tokyo', cnLocation: '东京吉祥寺', emoji: '🎸', stamp: '青春', quote: '每个人都有属于自己的一片森林。', desc: '渡边与直子相遇的井之头公园。', atmosphere: ['nostalgic', 'lonely', 'romantic'], lat: 35.7005, lng: 139.5789 },
  { id: 'literary-6', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Aoyama Cemetery, Tokyo', cnLocation: '东京青山墓地', emoji: '🌿', stamp: '生死', quote: '死并不是生的对立面。', desc: '直子常提起的墓地。', atmosphere: ['contemplative', 'mystical', 'lonely'], lat: 35.6654, lng: 139.7221 },
  { id: 'literary-7', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Yoshino, Nara', cnLocation: '奈良吉野', emoji: '🌸', stamp: '回忆', quote: '记忆就像那场大雪。', desc: '直子疗养的深山。', atmosphere: ['healing', 'nostalgic', 'desolate'], lat: 34.3961, lng: 135.8534 },
  { id: 'literary-8', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Waseda University', cnLocation: '早稻田大学', emoji: '📚', stamp: '原点', quote: '我在混沌中寻找位置。', desc: '渡边的大学生活。', atmosphere: ['romantic', 'nostalgic', 'healing'], lat: 35.7071, lng: 139.7189 },
  { id: 'literary-9', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Mitaka, Tokyo', cnLocation: '东京三鹰', emoji: '🎶', stamp: '音乐', quote: '挪威的森林，让人落泪。', desc: '渡边听Norwegian Wood的公寓。', atmosphere: ['lonely', 'nostalgic', 'contemplative'], lat: 35.6950, lng: 139.5561 }
];

const ROOT_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>文迹 · Literary Footprints - 文明守护者</title>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap");
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --gold: #c9a84c;
      --gold-light: #e8d5a3;
      --dark: #1a1a2e;
      --darker: #0f0f1a;
      --ink: #2d2d44;
      --paper: #f5f0e8;
      --paper-dark: #e8e0d0;
      --accent: #8b4513;
      --accent-light: #c47d3a;
      --rose: #d4a0a0;
      --sage: #7a8c6e;
      --sky: #6b8fa3;
    }
    
    body {
      font-family: 'Inter', 'Noto Serif SC', serif;
      background: var(--darker);
      color: var(--paper);
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--darker); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* Hero */
    .hero {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .hero-bg {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse at 20% 50%, rgba(139,69,19,0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 80%, rgba(107,143,163,0.1) 0%, transparent 40%),
        var(--darker);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 2rem;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.5rem;
      border: 1px solid var(--gold);
      border-radius: 50px;
      font-size: 0.75rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 2rem;
      background: rgba(201,168,76,0.05);
    }

    .hero-title {
      font-family: 'Playfair Display', 'Noto Serif SC', serif;
      font-size: clamp(3rem, 8vw, 7rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    .hero-title .cn {
      display: block;
      background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--accent-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-title .en {
      display: block;
      font-size: 0.4em;
      font-weight: 400;
      letter-spacing: 8px;
      color: var(--paper);
      opacity: 0.6;
      text-transform: uppercase;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--paper);
      opacity: 0.7;
      max-width: 600px;
      margin: 0 auto 3rem;
      line-height: 1.8;
      font-weight: 300;
    }

    /* Tab Switcher */
    .tab-switcher {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 0.75rem 1.5rem;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.5);
      color: var(--paper);
      opacity: 0.7;
      border-radius: 50px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .tab-btn.active, .tab-btn:hover {
      border-color: var(--gold);
      color: var(--gold);
      opacity: 1;
      background: rgba(201,168,76,0.15);
    }

    /* Cards Grid */
    section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-tag {
      font-size: 0.7rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: 'Playfair Display', 'Noto Serif SC', serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2rem;
    }

    .literary-card {
      background: linear-gradient(145deg, rgba(45,45,68,0.8), rgba(26,26,46,0.9));
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .literary-card:hover {
      transform: translateY(-8px);
      border-color: rgba(201,168,76,0.4);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(201,168,76,0.1);
    }

    .card-image {
      height: 180px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.5rem;
    }

    .card-image-heritage { background: linear-gradient(135deg, #2d2d44, #1a1a2e); }
    .card-image-literary { background: linear-gradient(135deg, #1a2a3a, #0f1a2a); }
    .card-image-author { background: linear-gradient(135deg, #2a1a1a, #1a0f0f); }

    .card-stamp {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border: 1px solid var(--gold);
      border-radius: 4px;
      font-size: 0.65rem;
      letter-spacing: 2px;
      color: var(--gold);
      background: rgba(0,0,0,0.5);
    }

    .card-content {
      padding: 1.5rem;
      position: relative;
    }

    .card-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      color: var(--darker);
      font-weight: 700;
    }

    .author-info h3 {
      font-size: 0.95rem;
      font-weight: 600;
    }

    .author-info span {
      font-size: 0.75rem;
      color: var(--gold);
      opacity: 0.8;
    }

    .card-title {
      font-family: 'Noto Serif SC', serif;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .card-quote {
      font-style: italic;
      font-size: 0.85rem;
      color: var(--paper);
      opacity: 0.7;
      line-height: 1.7;
      margin-bottom: 1rem;
      padding: 1rem;
      border-left: 3px solid var(--gold);
      background: rgba(201,168,76,0.05);
      border-radius: 0 8px 8px 0;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid rgba(201,168,76,0.1);
    }

    .card-location {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: var(--sage);
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .card-action-btn {
      flex: 1;
      padding: 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
    }

    .btn-itinerary {
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      border: none;
      color: var(--darker);
      font-weight: 600;
    }

    .btn-itinerary:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 15px rgba(201,168,76,0.4);
    }

    .btn-save {
      background: transparent;
      border: 1px solid var(--sage);
      color: var(--sage);
    }

    .btn-save:hover {
      border-color: var(--gold);
      color: var(--gold);
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.75rem;
    }

    .card-tag {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.6rem;
      background: rgba(122,140,110,0.2);
      color: var(--sage);
      cursor: pointer;
      transition: all 0.3s;
    }

    .card-tag:hover {
      background: rgba(201,168,76,0.2);
      color: var(--gold);
    }

    .card-supplier {
      margin-top: 1rem;
      padding: 0.75rem;
      background: rgba(45,45,68,0.5);
      border-radius: 8px;
      border: 1px solid rgba(201,168,76,0.1);
    }

    .supplier-title {
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.5;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .supplier-list {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .supplier-item {
      padding: 0.35rem 0.6rem;
      background: rgba(201,168,76,0.1);
      border-radius: 4px;
      font-size: 0.65rem;
      color: var(--gold);
      cursor: pointer;
      transition: all 0.3s;
    }

    .supplier-item:hover {
      background: rgba(201,168,76,0.25);
    }

    .card-votes {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: var(--gold);
    }

    /* Ranking Section */
    .ranking-section {
      background: linear-gradient(180deg, var(--darker), rgba(139,69,19,0.05), var(--darker));
    }

    .ranking-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .ranking-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.25rem;
      background: rgba(45,45,68,0.3);
      border: 1px solid rgba(201,168,76,0.1);
      border-radius: 12px;
      margin-bottom: 1rem;
      transition: all 0.3s;
    }

    .ranking-item:hover {
      border-color: rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.5);
    }

    .ranking-position {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 900;
      width: 50px;
      text-align: center;
      color: var(--gold);
    }

    .ranking-item:nth-child(1) .ranking-position { color: #ffd700; }
    .ranking-item:nth-child(2) .ranking-position { color: #c0c0c0; }
    .ranking-item:nth-child(3) .ranking-position { color: #cd7f32; }

    .ranking-info { flex: 1; }
    .ranking-info h4 { font-size: 0.95rem; margin-bottom: 0.25rem; }
    .ranking-info p { font-size: 0.8rem; color: var(--paper); opacity: 0.6; }

    .ranking-votes { text-align: right; }
    .ranking-votes .count { font-size: 1.25rem; font-weight: 700; color: var(--gold); }
    .ranking-votes .label { font-size: 0.7rem; color: var(--paper); opacity: 0.5; }

    /* Badges Section */
    .badges-section {
      background: linear-gradient(180deg, var(--darker), rgba(139,69,19,0.05), var(--darker));
    }

    .badges-container {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      max-width: 900px;
      margin: 0 auto;
    }

    .badge-item {
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .badge-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 0.5rem;
      border: 2px solid rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.5);
      transition: all 0.3s;
    }

    .badge-item.locked .badge-icon {
      opacity: 0.4;
      border-color: rgba(201,168,76,0.1);
    }

    .badge-item.unlocked .badge-icon {
      border-color: var(--gold);
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      box-shadow: 0 0 30px rgba(201,168,76,0.4);
    }

    .badge-name {
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.7;
    }

    .badge-item.unlocked .badge-name {
      color: var(--gold);
      opacity: 1;
    }

    .badge-progress {
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.5;
      margin-top: 0.25rem;
    }

    /* Atmosphere Filter */
    .atmosphere-filter {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .atmosphere-tag {
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      border: 1px solid rgba(122,140,110,0.3);
      background: rgba(45,45,68,0.3);
      color: var(--sage);
      cursor: pointer;
      transition: all 0.3s;
    }

    .atmosphere-tag:hover, .atmosphere-tag.active {
      border-color: var(--gold);
      background: rgba(201,168,76,0.15);
      color: var(--gold);
    }

    /* My Itinerary Drawer */
    .itinerary-drawer {
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      background: var(--darker);
      border-left: 1px solid rgba(201,168,76,0.2);
      z-index: 1000;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }

    .itinerary-drawer.open {
      right: 0;
    }

    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s;
      z-index: 999;
    }

    .drawer-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .drawer-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(201,168,76,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .drawer-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: var(--gold);
    }

    .drawer-close {
      background: none;
      border: none;
      color: var(--paper);
      font-size: 1.5rem;
      cursor: pointer;
    }

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .itinerary-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: rgba(45,45,68,0.3);
      border-radius: 8px;
      margin-bottom: 0.75rem;
      border: 1px solid rgba(201,168,76,0.1);
    }

    .itinerary-item-emoji {
      font-size: 1.5rem;
    }

    .itinerary-item-info h4 {
      font-size: 0.85rem;
      color: var(--paper);
      margin-bottom: 0.25rem;
    }

    .itinerary-item-info p {
      font-size: 0.7rem;
      color: var(--sage);
    }

    .itinerary-item-remove {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--rose);
      cursor: pointer;
      font-size: 1rem;
    }

    .drawer-footer {
      padding: 1rem;
      border-top: 1px solid rgba(201,168,76,0.1);
    }

    .btn-plan-route {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      border: none;
      border-radius: 8px;
      color: var(--darker);
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-plan-route:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 20px rgba(201,168,76,0.4);
    }

    .itinerary-count {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: var(--gold);
      color: var(--darker);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(201,168,76,0.4);
    }

    .itinerary-count:hover {
      transform: scale(1.05);
    }

    /* Map Section */
    .map-section {
      padding: 4rem 2rem;
      background: linear-gradient(180deg, var(--darker), rgba(107,143,163,0.1), var(--darker));
    }

    .map-container {
      width: 100%;
      height: 400px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(201,168,76,0.2);
      position: relative;
    }

    .map-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1a2a3a, #0f1a2a);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
    }

    .map-placeholder-emoji {
      font-size: 4rem;
      opacity: 0.5;
    }

    .map-markers {
      position: absolute;
      inset: 0;
    }

    .map-marker {
      position: absolute;
      width: 30px;
      height: 30px;
      background: var(--gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      cursor: pointer;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 15px rgba(201,168,76,0.5);
      transition: all 0.3s;
    }

    .map-marker:hover {
      transform: translate(-50%, -50%) scale(1.2);
      box-shadow: 0 0 25px rgba(201,168,76,0.8);
    }

    .map-legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .map-legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.7;
    }

    .map-legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    /* User Profile Section */
    .profile-section {
      background: linear-gradient(180deg, var(--darker), rgba(139,69,19,0.05), var(--darker));
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      padding: 1.5rem;
      background: rgba(45,45,68,0.3);
      border-radius: 16px;
      border: 1px solid rgba(201,168,76,0.1);
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--darker);
    }

    .profile-info h3 {
      font-size: 1.25rem;
      color: var(--paper);
      margin-bottom: 0.5rem;
    }

    .profile-info p {
      font-size: 0.8rem;
      color: var(--sage);
    }

    .profile-stats {
      display: flex;
      gap: 2rem;
      margin-left: auto;
    }

    .profile-stat {
      text-align: center;
    }

    .profile-stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gold);
    }

    .profile-stat-label {
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.5;
    }

    .journey-map {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }

    .journey-timeline {
      position: relative;
      padding-left: 2rem;
    }

    .journey-timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--gold), var(--accent-light));
    }

    .journey-item {
      position: relative;
      padding: 1rem;
      margin-bottom: 1.5rem;
      background: rgba(45,45,68,0.3);
      border-radius: 8px;
      border: 1px solid rgba(201,168,76,0.1);
      cursor: pointer;
      transition: all 0.3s;
    }

    .journey-item::before {
      content: '📍';
      position: absolute;
      left: -2.4rem;
      top: 1rem;
      font-size: 1rem;
    }

    .journey-item:hover {
      border-color: var(--gold);
      background: rgba(45,45,68,0.5);
    }

    .journey-item h4 {
      font-size: 0.9rem;
      color: var(--paper);
      margin-bottom: 0.25rem;
    }

    .journey-item p {
      font-size: 0.7rem;
      color: var(--sage);
    }

    .journey-date {
      font-size: 0.65rem;
      color: var(--gold);
      margin-top: 0.5rem;
    }

    /* Social Section */
    .social-section {
      padding: 4rem 2rem;
    }

    .social-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .social-tab {
      padding: 0.75rem 1.5rem;
      border: 1px solid rgba(201,168,76,0.3);
      background: transparent;
      color: var(--paper);
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.85rem;
    }

    .social-tab.active, .social-tab:hover {
      border-color: var(--gold);
      color: var(--gold);
      background: rgba(201,168,76,0.1);
    }

    .social-feed {
      max-width: 700px;
      margin: 0 auto;
    }

    .social-post {
      padding: 1.5rem;
      background: rgba(45,45,68,0.3);
      border-radius: 12px;
      border: 1px solid rgba(201,168,76,0.1);
      margin-bottom: 1rem;
    }

    .post-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .post-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--sage), var(--sky));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    .post-user {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--paper);
    }

    .post-time {
      font-size: 0.7rem;
      color: var(--paper);
      opacity: 0.5;
    }

    .post-content {
      font-size: 0.85rem;
      color: var(--paper);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .post-location {
      font-size: 0.75rem;
      color: var(--gold);
      margin-bottom: 1rem;
    }

    .post-actions {
      display: flex;
      gap: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(201,168,76,0.1);
    }

    .post-action {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.7;
      cursor: pointer;
      transition: all 0.3s;
    }

    .post-action:hover {
      color: var(--gold);
      opacity: 1;
    }

    /* Card Flip Effect */
    .card-container {
      perspective: 1000px;
      cursor: pointer;
    }

    .card-flip {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .card-container:hover .card-flip,
    .card-container.flipped .card-flip {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 16px;
      overflow: hidden;
    }

    .card-back {
      transform: rotateY(180deg);
      background: linear-gradient(145deg, rgba(45,45,68,0.95), rgba(26,26,46,0.98));
      border: 1px solid rgba(201,168,76,0.3);
      padding: 1.5rem;
    }

    .card-back-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(201,168,76,0.2);
    }

    .card-back-title {
      font-size: 0.9rem;
      color: var(--gold);
    }

    .card-back-close {
      background: none;
      border: none;
      color: var(--paper);
      cursor: pointer;
      font-size: 1rem;
      opacity: 0.5;
    }

    .card-back-content {
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.8;
      line-height: 1.6;
    }

    .back-section {
      margin-bottom: 1rem;
    }

    .back-section h4 {
      font-size: 0.7rem;
      color: var(--gold);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .back-guide {
      padding: 0.75rem;
      background: rgba(201,168,76,0.1);
      border-radius: 8px;
      border-left: 3px solid var(--gold);
    }

    .back-guide p {
      margin-bottom: 0.35rem;
    }

    .back-works {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .back-work-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(45,45,68,0.5);
      border-radius: 6px;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .back-work-item:hover {
      background: rgba(201,168,76,0.2);
    }

    .back-creator {
      padding: 0.75rem;
      background: rgba(139,69,19,0.2);
      border-radius: 8px;
    }

    .back-creator-quote {
      font-style: italic;
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.9;
      line-height: 1.5;
    }

    .back-creator-name {
      font-size: 0.65rem;
      color: var(--gold);
      margin-top: 0.5rem;
      text-align: right;
    }

    .flip-hint {
      position: absolute;
      bottom: 0.5rem;
      right: 0.75rem;
      font-size: 0.6rem;
      color: var(--paper);
      opacity: 0.4;
    }

    /* Floating Creator Button */
    .floating-creator {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 100;
    }

    .creator-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--accent-light));
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 20px rgba(201,168,76,0.5);
      transition: all 0.3s;
    }

    .creator-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(201,168,76,0.7);
    }

    .creator-tooltip {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: var(--darker);
      border: 1px solid var(--gold);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.75rem;
      color: var(--paper);
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .floating-creator:hover .creator-tooltip {
      opacity: 1;
      visibility: visible;
    }

    /* Time Filter */
    .time-filter {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin: 2rem auto;
      flex-wrap: wrap;
      max-width: 800px;
    }

    .time-tag {
      padding: 0.6rem 1.25rem;
      border-radius: 50px;
      font-size: 0.75rem;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.5);
      color: var(--paper);
      cursor: pointer;
      transition: all 0.4s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .time-tag:hover, .time-tag.active {
      border-color: var(--gold);
      background: rgba(201,168,76,0.2);
      color: var(--gold);
    }

    /* Time-based theme variations */
    body.time-ancient .hero-title { letter-spacing: 8px; }
    body.time-medieval .card-image-heritage { background: linear-gradient(135deg, #2a1a2a, #1a0f1a); }
    body.time-19th .hero-subtitle { font-family: 'Playfair Display', serif; }
    body.time-20th .card-stamp { border-radius: 2px; font-style: italic; }

    /* My Footprints - Stamp Collection */
    .footprints-section {
      padding: 4rem 2rem;
    }

    .stamp-collection {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1.5rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .stamp-item {
      position: relative;
      aspect-ratio: 3/4;
      background: rgba(45,45,68,0.5);
      border: 2px dashed rgba(201,168,76,0.3);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0.5rem;
    }

    .stamp-item.collected {
      border: 2px solid var(--gold);
      background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,69,19,0.1));
    }

    .stamp-item.collected::after {
      content: '✓';
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 20px;
      height: 20px;
      background: var(--gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: var(--darker);
    }

    .stamp-item.locked {
      opacity: 0.4;
      border-style: dashed;
    }

    .stamp-item:hover {
      transform: scale(1.05);
    }

    .stamp-item.completed {
      border-color: var(--gold);
      box-shadow: 0 0 20px rgba(201,168,76,0.5);
    }

    .stamp-item.completed::before {
      content: '★';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--gold);
      font-size: 1rem;
    }

    .stamp-emoji {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .stamp-location {
      font-size: 0.6rem;
      color: var(--paper);
      text-align: center;
      opacity: 0.8;
    }

    .stamp-author {
      font-size: 0.5rem;
      color: var(--gold);
      margin-top: 0.25rem;
    }

    /* Supplier Booking Tiles */
    .booking-tiles {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.75rem;
    }

    .booking-tile {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.4rem 0.75rem;
      background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,69,19,0.1));
      border: 1px solid var(--gold);
      border-radius: 20px;
      font-size: 0.65rem;
      color: var(--gold);
      cursor: pointer;
      transition: all 0.3s;
    }

    .booking-tile:hover {
      background: linear-gradient(135deg, rgba(201,168,76,0.3), rgba(139,69,19,0.2));
      transform: scale(1.05);
    }

    /* Ranking Enhancement */
    .ranking-trending {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .ranking-trend-tag {
      padding: 0.3rem 0.75rem;
      background: rgba(212,160,160,0.2);
      border-radius: 4px;
      font-size: 0.65rem;
      color: var(--rose);
    }

    .ranking-trend-tag.up {
      background: rgba(122,140,110,0.2);
      color: var(--sage);
    }

    /* Original Badge System */
    .original-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.6rem;
      font-weight: 600;
    }

    .original-badge.original {
      background: linear-gradient(135deg, rgba(201,168,76,0.3), rgba(255,215,0,0.2));
      border: 1px solid var(--gold);
      color: var(--gold);
    }

    .original-badge.derivative {
      background: rgba(122,140,110,0.2);
      border: 1px solid var(--sage);
      color: var(--sage);
    }

    /* Pilgrimage Creator Badge */
    .pilgrim-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.15rem 0.5rem;
      border-radius: 50px;
      font-size: 0.55rem;
      background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,69,19,0.15));
      border: 1px solid rgba(201,168,76,0.4);
      color: var(--gold);
    }

    /* Three-layer Score */
    .score-breakdown {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.5rem;
      flex-wrap: wrap;
    }

    .score-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.7;
    }

    .score-item .value {
      color: var(--gold);
      font-weight: 600;
    }

    .score-item.purchase .value { color: #ffd700; }
    .score-item.travel .value { color: var(--sage); }
    .score-item.resonance .value { color: var(--sky); }

    /* Supplier Association */
    .supplier-association {
      padding: 0.75rem;
      background: rgba(45,45,68,0.4);
      border-radius: 8px;
      margin-top: 0.75rem;
      border: 1px dashed rgba(201,168,76,0.2);
    }

    .supplier-association .note {
      font-size: 0.6rem;
      color: var(--paper);
      opacity: 0.4;
      font-style: italic;
      margin-bottom: 0.5rem;
    }

    /* Pilgrim Traveler Identity Section */
    .pilgrim-identity-section {
      background: linear-gradient(180deg, var(--darker), rgba(201,168,76,0.03), var(--darker));
      border-top: 1px solid rgba(201,168,76,0.1);
    }

    .identity-cards {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      max-width: 900px;
      margin: 0 auto;
    }

    .identity-card {
      width: 200px;
      padding: 1.5rem;
      background: rgba(45,45,68,0.4);
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
    }

    .identity-card:hover {
      border-color: var(--gold);
      transform: translateY(-4px);
    }

    .identity-card .icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .identity-card .role {
      font-size: 1rem;
      color: var(--paper);
      margin-bottom: 0.5rem;
    }

    .identity-card .role.en {
      font-size: 0.65rem;
      color: var(--gold);
      opacity: 0.6;
      margin-bottom: 0.75rem;
    }

    .identity-card .desc {
      font-size: 0.7rem;
      color: var(--paper);
      opacity: 0.6;
      line-height: 1.5;
    }

    .identity-card.highlight {
      border-color: var(--gold);
      background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,69,19,0.05));
    }

    .identity-card.highlight .role { color: var(--gold); }

    /* Creator Rank System */
    .creator-rank-section {
      background: linear-gradient(180deg, var(--darker), rgba(201,168,76,0.05), var(--darker));
    }

    .rank-cards {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      max-width: 1000px;
      margin: 0 auto;
    }

    .rank-card {
      background: rgba(45,45,68,0.5);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 12px;
      padding: 1.5rem;
      width: 180px;
      text-align: center;
      transition: all 0.3s;
    }

    .rank-card:hover {
      transform: translateY(-5px);
      border-color: var(--gold);
    }

    .rank-card.current {
      border-color: var(--gold);
      box-shadow: 0 0 30px rgba(201,168,76,0.3);
    }

    .rank-badge {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 auto 1rem;
    }

    .rank-card.C .rank-badge { background: linear-gradient(135deg, #666, #888); }
    .rank-card.B .rank-badge { background: linear-gradient(135deg, var(--sage), #5a6a4e); }
    .rank-card.A .rank-badge { background: linear-gradient(135deg, var(--gold), var(--accent-light)); }
    .rank-card.S .rank-badge { background: linear-gradient(135deg, #ffd700, #ff8c00); box-shadow: 0 0 20px rgba(255,215,0,0.5); }

    .rank-title {
      font-size: 1rem;
      color: var(--paper);
      margin-bottom: 0.5rem;
    }

    .rank-name {
      font-size: 0.7rem;
      color: var(--gold);
      margin-bottom: 1rem;
    }

    .rank-benefits {
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.7;
      text-align: left;
      line-height: 1.6;
    }

    .rank-benefits li {
      margin-bottom: 0.35rem;
      list-style: none;
    }

    .rank-benefits li::before {
      content: '✓ ';
      color: var(--gold);
    }

    /* Card Serial & Seal */
    .card-serial {
      position: absolute;
      bottom: 0.5rem;
      left: 0.75rem;
      font-size: 0.55rem;
      color: var(--paper);
      opacity: 0.4;
      font-family: monospace;
    }

    .creator-seal {
      position: absolute;
      top: 3rem;
      right: 0.75rem;
      width: 40px;
      height: 40px;
      opacity: 0.6;
      transform: rotate(15deg);
    }

    .creator-seal svg {
      width: 100%;
      height: 100%;
    }

    /* Language Switch */
    .lang-switch {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 100;
      display: flex;
      gap: 0.5rem;
    }

    .lang-btn {
      padding: 0.4rem 0.75rem;
      border-radius: 4px;
      font-size: 0.7rem;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.7);
      color: var(--paper);
      cursor: pointer;
      transition: all 0.3s;
    }

    .lang-btn.active {
      background: var(--gold);
      color: var(--darker);
      border-color: var(--gold);
    }

    /* Geo Location Banner */
    .geo-banner {
      background: linear-gradient(90deg, rgba(201,168,76,0.2), rgba(139,69,19,0.2));
      padding: 0.75rem;
      text-align: center;
      font-size: 0.75rem;
      color: var(--gold);
      border-bottom: 1px solid rgba(201,168,76,0.2);
    }

    /* Supplier Dashboard Link */
    .supplier-dashboard-link {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      z-index: 100;
    }

    .supplier-link-btn {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.7rem;
      border: 1px solid var(--sage);
      background: rgba(45,45,68,0.8);
      color: var(--sage);
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .supplier-link-btn:hover {
      border-color: var(--gold);
      color: var(--gold);
    }

    /* Creator Journey Flow */
    .journey-flow-section {
      padding: 4rem 2rem;
      background: linear-gradient(180deg, var(--darker), rgba(201,168,76,0.03), var(--darker));
    }

    .journey-steps {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 0;
      max-width: 1100px;
      margin: 0 auto;
      flex-wrap: wrap;
    }

    .journey-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 180px;
      position: relative;
    }

    .journey-step:not(:last-child)::after {
      content: '→';
      position: absolute;
      top: 30px;
      right: -20px;
      font-size: 1.5rem;
      color: var(--gold);
      opacity: 0.5;
    }

    .step-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(45,45,68,0.8);
      border: 2px solid rgba(201,168,76,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .step-icon.unlocked {
      border-color: var(--gold);
      background: linear-gradient(135deg, rgba(201,168,76,0.3), rgba(139,69,19,0.2));
    }

    .step-icon.current {
      border-color: var(--gold);
      box-shadow: 0 0 20px rgba(201,168,76,0.5);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.5); }
      50% { box-shadow: 0 0 30px rgba(201,168,76,0.8); }
    }

    .step-title {
      font-size: 0.8rem;
      color: var(--paper);
      margin-bottom: 0.25rem;
    }

    .step-desc {
      font-size: 0.65rem;
      color: var(--paper);
      opacity: 0.5;
      text-align: center;
    }

    .step-metric {
      font-size: 0.55rem;
      color: var(--gold);
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      background: rgba(201,168,76,0.1);
      border-radius: 4px;
    }

    /* Serial Number Popup */
    .serial-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, var(--darker), rgba(45,45,68,0.95));
      border: 2px solid var(--gold);
      border-radius: 16px;
      padding: 2rem;
      z-index: 3000;
      text-align: center;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .serial-popup.show {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    .serial-popup h3 {
      color: var(--gold);
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .serial-code {
      font-family: monospace;
      font-size: 1.5rem;
      color: var(--gold);
      padding: 1rem;
      background: rgba(201,168,76,0.1);
      border-radius: 8px;
      margin-bottom: 1rem;
      letter-spacing: 2px;
    }

    .serial-popup p {
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.7;
    }

    .serial-close {
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      background: var(--gold);
      border: none;
      border-radius: 6px;
      color: var(--darker);
      font-weight: 600;
      cursor: pointer;
    }

    .serial-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 2999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .serial-overlay.show {
      opacity: 1;
      visibility: visible;
    }

    /* Context Language Toggle */
    .context-toggle {
      display: flex;
      gap: 0.35rem;
    }

    .context-btn {
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.6rem;
      border: 1px solid rgba(201,168,76,0.3);
      background: transparent;
      color: var(--paper);
      opacity: 0.6;
      cursor: pointer;
      transition: all 0.3s;
    }

    .context-btn.active {
      background: var(--gold);
      color: var(--darker);
      opacity: 1;
    }

    /* Experience Module */
    .experience-module {
      background: linear-gradient(135deg, rgba(139,69,19,0.15), rgba(201,168,76,0.1));
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 12px;
      padding: 1rem;
      margin-top: 1rem;
    }

    .experience-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .experience-header h4 {
      font-size: 0.8rem;
      color: var(--gold);
    }

    .experience-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .experience-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: rgba(45,45,68,0.5);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .experience-item:hover {
      background: rgba(45,45,68,0.8);
      border-left: 3px solid var(--gold);
    }

    .experience-img {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      background: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .experience-info {
      flex: 1;
    }

    .experience-info h5 {
      font-size: 0.75rem;
      color: var(--paper);
      margin-bottom: 0.25rem;
    }

    .experience-info p {
      font-size: 0.65rem;
      color: var(--sage);
    }

    .experience-price {
      font-size: 0.8rem;
      color: var(--gold);
      font-weight: 600;
    }

    .experience-book-btn {
      padding: 0.4rem 0.75rem;
      background: var(--gold);
      border: none;
      border-radius: 4px;
      color: var(--darker);
      font-size: 0.65rem;
      font-weight: 600;
      cursor: pointer;
    }

    /* Commission Flow Visualization */
    .commission-flow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(45,45,68,0.3);
      border-radius: 12px;
      margin: 1rem 0;
    }

    .commission-node {
      text-align: center;
    }

    .commission-node .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(201,168,76,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin: 0 auto 0.5rem;
      border: 1px solid var(--gold);
    }

    .commission-node .label {
      font-size: 0.65rem;
      color: var(--paper);
    }

    .commission-node .amount {
      font-size: 0.75rem;
      color: var(--gold);
      font-weight: 600;
    }

    .commission-arrow {
      font-size: 1.5rem;
      color: var(--gold);
      opacity: 0.5;
    }

    /* Partner Claim Section */
    .partner-claim {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      z-index: 100;
    }

    .claim-btn {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.7rem;
      border: 1px dashed var(--accent-light);
      background: rgba(45,45,68,0.8);
      color: var(--accent-light);
      cursor: pointer;
      transition: all 0.3s;
    }

    .claim-btn:hover {
      border-style: solid;
      background: rgba(139,69,19,0.2);
    }

    /* Card Detail Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .modal-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: var(--darker);
      border-radius: 16px;
      border: 1px solid rgba(201,168,76,0.3);
      max-width: 700px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      transform: scale(0.9);
      transition: transform 0.4s;
    }

    .modal-overlay.open .modal-content {
      transform: scale(1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(201,168,76,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: var(--gold);
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--paper);
      font-size: 1.5rem;
      cursor: pointer;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .perspectives-section {
      margin-top: 1.5rem;
    }

    .perspective-item {
      padding: 1rem;
      background: rgba(45,45,68,0.5);
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 3px solid var(--gold);
    }

    .perspective-author {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .perspective-author-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--sage);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }

    .perspective-author-name {
      font-size: 0.85rem;
      color: var(--gold);
      font-weight: 600;
    }

    .perspective-quote {
      font-size: 0.85rem;
      font-style: italic;
      color: var(--paper);
      opacity: 0.8;
      line-height: 1.6;
    }

    /* Search Bar */
    .search-bar {
      max-width: 500px;
      margin: 0 auto 2rem;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1.5rem;
      border-radius: 50px;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(45,45,68,0.5);
      color: var(--paper);
      font-size: 0.9rem;
      outline: none;
      transition: all 0.3s;
    }

    .search-input::placeholder {
      color: var(--paper);
      opacity: 0.4;
    }

    .search-input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 20px rgba(201,168,76,0.2);
    }

    /* Footer */
    footer {
      padding: 3rem 2rem;
      border-top: 1px solid rgba(201,168,76,0.1);
      text-align: center;
    }

    .footer-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--gold);
      margin-bottom: 1rem;
    }

    .footer-copy {
      font-size: 0.75rem;
      color: var(--paper);
      opacity: 0.3;
    }

    /* Animations */
    .fade-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Skeleton Loading */
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }

    .skeleton {
      background: linear-gradient(90deg, rgba(45,45,68,0.3) 25%, rgba(45,45,68,0.5) 50%, rgba(45,45,68,0.3) 75%);
      background-size: 400px 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    .skeleton-card {
      height: 300px;
      border-radius: 16px;
    }

    .skeleton-text {
      height: 16px;
      margin-bottom: 0.75rem;
      width: 60%;
    }

    .skeleton-text.short { width: 40%; }

    /* Responsive */
    @media (max-width: 1024px) {
      .journey-steps { gap: 1rem; }
      .journey-step:not(:last-child)::after { display: none; }
      .rank-cards { gap: 1rem; }
      .rank-card { width: 150px; }
    }

    @media (max-width: 768px) {
      .cards-grid { grid-template-columns: 1fr; }
      .hero-title { font-size: 2.5rem; }
      .hero-title .en { font-size: 0.35em; }
      .tab-switcher { gap: 0.5rem; }
      .tab-btn { padding: 0.5rem 1rem; font-size: 0.75rem; }
      .time-filter { gap: 0.5rem; }
      .time-tag { padding: 0.4rem 0.75rem; font-size: 0.65rem; }
      .atmosphere-filter { gap: 0.5rem; }
      .atmosphere-tag { font-size: 0.65rem; padding: 0.35rem 0.75rem; }
      .hero-subtitle { font-size: 0.9rem; }
      section { padding: 2rem 1rem; }
      .profile-header { flex-direction: column; align-items: flex-start; }
      .profile-stats { margin-left: 0; width: 100%; justify-content: space-around; }
      .stamp-collection { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 1rem; }
      .badges-container { gap: 1rem; }
      .badge-icon { width: 60px; height: 60px; font-size: 1.5rem; }
      .journey-steps { flex-direction: column; align-items: center; }
      .journey-step { width: 100%; max-width: 300px; flex-direction: row; gap: 1rem; }
      .journey-step:not(:last-child)::after { display: none; }
      .step-icon { width: 45px; height: 45px; font-size: 1.25rem; margin-bottom: 0; }
      .map-container { height: 250px; }
      .commission-flow { flex-wrap: wrap; gap: 0.5rem; }
      .commission-arrow { display: none; }
      .floating-creator { bottom: 1rem; right: 1rem; }
      .creator-btn { width: 50px; height: 50px; font-size: 1.25rem; }
      .supplier-dashboard-link { display: none; }
      .lang-switch { top: 0.5rem; left: 0.5rem; }
      .itinerary-count { top: 0.5rem; right: 0.5rem; font-size: 0.65rem; padding: 0.35rem 0.75rem; }
      .itinerary-drawer { width: 100%; right: -100%; }
      .rank-cards { flex-direction: column; align-items: center; }
      .rank-card { width: 100%; max-width: 280px; }
      .social-tabs { gap: 0.5rem; }
      .social-tab { padding: 0.5rem 1rem; font-size: 0.75rem; }
      .partner-claim { display: none; }
      .serial-popup { width: 90%; padding: 1.5rem; }
      .serial-code { font-size: 1rem; }
      .experience-module { padding: 0.75rem; }
      .experience-item { flex-wrap: wrap; }
      .modal-content { max-height: 90vh; }
    }

    @media (max-width: 480px) {
      .hero-title { font-size: 1.8rem; }
      .section-title { font-size: 1.5rem; }
      .profile-stats { flex-wrap: wrap; gap: 0.5rem; }
      .profile-stat { width: 30%; }
      .profile-stat-value { font-size: 1.1rem; }
      .card-actions { flex-direction: column; }
      .geo-banner { font-size: 0.65rem; padding: 0.5rem; }
    }
  </style>
</head>
<body>
  <!-- Language Switch -->
  <div class="lang-switch">
    <button class="lang-btn active" onclick="setLanguage('zh', this)">中文</button>
    <button class="lang-btn" onclick="setLanguage('en', this)">EN</button>
  </div>

  <!-- Geo Location Banner -->
  <div class="geo-banner" id="geoBanner">
    📍 正在为您推荐：中国 · 鲁迅故里绍兴 | 探索附近的文学坐标
  </div>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-badge">✦ HERITAGE GUARDIAN ✦</div>
      <h1 class="hero-title">
        <span class="cn">文迹巡礼</span>
        <span class="en">Literary Footprints</span>
      </h1>
      <p class="hero-subtitle">
        守护世界文明遗产 · 追随文学巨匠足迹<br/>
        <span style="opacity:0.5; font-size:0.85rem;">
          世界遗产与文学坐标的时空交汇，每一张卡片都是文明的坐标
        </span>
      </p>
      <div class="tab-switcher">
        <button class="tab-btn active" onclick="filterCards('all', this)">全部 All</button>
        <button class="tab-btn" onclick="filterCards('heritage', this)">🏛️ 世界遗产</button>
        <button class="tab-btn" onclick="filterCards('literary', this)">📖 文学坐标</button>
      </div>
      <div class="time-filter" id="timeFilter">
        <span class="time-tag active" onclick="setTimeFilter('all', this)">🌍 全部时代</span>
        <span class="time-tag" onclick="setTimeFilter('ancient', this)">🏛️ 远古</span>
        <span class="time-tag" onclick="setTimeFilter('medieval', this)">⚔️ 中世纪</span>
        <span class="time-tag" onclick="setTimeFilter('19th', this)">🎭 19世纪</span>
        <span class="time-tag" onclick="setTimeFilter('20th', this)">📖 20世纪</span>
      </div>
    </div>
  </section>

  <!-- Floating Creator Button -->
  <div class="floating-creator" onclick="openCreatorModal()">
    <div class="creator-tooltip">发布我的足迹 ✍️</div>
    <button class="creator-btn">✎</button>
  </div>

  <!-- Supplier Dashboard Link -->
  <div class="supplier-dashboard-link">
    <button class="supplier-link-btn" onclick="openSupplierDashboard()">
      🏪 供应商后台
    </button>
  </div>

  <!-- Cards Section -->
  <section id="cards">
    <div class="section-header fade-up">
      <div class="section-tag">Heritage & Literary</div>
      <h2 class="section-title">文明坐标卡片</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        探索世界遗产与文学坐标，感受时间与空间的交织
      </p>
    </div>
    
    <div class="search-bar fade-up">
      <input type="text" class="search-input" placeholder="搜索地点、作者或氛围（如：孤独、治愈、历史）..." 
             oninput="renderCards(currentFilter, this.value)">
    </div>
    
    <div class="atmosphere-filter fade-up" id="atmosphereFilter">
      <span class="atmosphere-tag active" onclick="currentAtmosphere = null; document.querySelectorAll('.atmosphere-tag').forEach(b => b.classList.remove('active')); this.classList.add('active'); renderCards(currentFilter)">全部</span>
      \${atmosphereTags.map(tag => \`<span class="atmosphere-tag" onclick="filterByAtmosphere('\${tag.id}', this)">\${tag.cn}</span>\`).join('')}
    </div>
    
    <div class="cards-grid" id="cardsGrid"></div>
  </section>

  <!-- My Badges Section -->
  <section class="badges-section" id="badges">
    <div class="section-header fade-up">
      <div class="section-tag">Achievements</div>
      <h2 class="section-title">我的文学徽章</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        收集同一位作者的所有坐标，解锁专属成就
      </p>
    </div>
    
    <div class="badges-container fade-up" id="badgesContainer"></div>
  </section>

  <!-- Itinerary Drawer -->
  <div class="drawer-overlay" id="drawerOverlay" onclick="closeItinerary()"></div>
  <div class="itinerary-drawer" id="itineraryDrawer">
    <div class="drawer-header">
      <span class="drawer-title">📍 我的行程</span>
      <button class="drawer-close" onclick="closeItinerary()">×</button>
    </div>
    <div class="drawer-content" id="itineraryContent">
      <p style="text-align:center;color:var(--paper);opacity:0.5;margin-top:2rem;">
        暂无行程安排<br>点击卡片上的「加入行程」开始规划
      </p>
    </div>
    <div class="drawer-footer">
      <button class="btn-plan-route" onclick="planRoute()">🗺️ 生成路线</button>
    </div>
  </div>

  <div class="itinerary-count" id="itineraryCount" onclick="openItinerary()" style="display:none;">
    📍 <span id="itineraryNum">0</span> 个地点
  </div>

  <!-- Ranking Section -->
  <section class="ranking-section" id="ranking">
    <div class="section-header fade-up">
      <div class="section-tag">文明火种榜</div>
      <h2 class="section-title">热门打榜排行</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        守护者的文明贡献排名
      </p>
    </div>
    
    <div class="ranking-list fade-up" id="rankingList"></div>
  </section>

  <!-- Pilgrim Identity Section -->
  <section class="pilgrim-identity-section" id="pilgrimIdentity">
    <div class="section-header fade-up">
      <div class="section-tag">Three Identities</div>
      <h2 class="section-title">巡礼三重身份</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        人人皆可巡礼，每一次出行都是对文学世界的确认
      </p>
    </div>
    
    <div class="identity-cards fade-up">
      <div class="identity-card">
        <div class="icon">📝</div>
        <div class="role">创造者</div>
        <div class="role en">Creator</div>
        <div class="desc">发布文学坐标卡片，获得原创认证。你的文字成为他人巡礼的灯塔。</div>
      </div>
      <div class="identity-card highlight">
        <div class="icon">🗺️</div>
        <div class="role">⚠ 巡礼创作者</div>
        <div class="role en">Pilgrim Creator</div>
        <div class="desc">出行验证 ≥3 次后自动解锁。创作卡片将获得「作者已亲历」标记，信任度翻倍。</div>
      </div>
      <div class="identity-card">
        <div class="icon">🎒</div>
        <div class="role">消费者</div>
        <div class="role en">Explorer</div>
        <div class="desc">购买卡片、出行打卡、为创作者投票。你的足迹让文学坐标活起来。</div>
      </div>
    </div>
  </section>

  <!-- My Footprints Section -->
  <section class="footprints-section" id="footprints">
    <div class="section-header fade-up">
      <div class="section-tag">My Collection</div>
      <h2 class="section-title">我的足迹邮集</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        收集文学作品中的地点，集齐全套获得专属勋章
      </p>
    </div>
    
    <div class="stamp-collection fade-up" id="stampCollection"></div>
  </section>

  <!-- Creator Rank Section -->
  <section class="creator-rank-section" id="creatorRank">
    <div class="section-header fade-up">
      <div class="section-tag">Creator Ranks</div>
      <h2 class="section-title">创作者成长体系</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        从初见者到大宗师，每一步都是文学的沉淀
      </p>
    </div>
    
    <div class="rank-cards fade-up">
      <div class="rank-card C">
        <div class="rank-badge">C</div>
        <div class="rank-title">初见者</div>
        <div class="rank-name">Beginner</div>
        <ul class="rank-benefits">
          <li>发布基础图文卡片</li>
          <li>参与社区互动</li>
          <li>查看地图坐标</li>
        </ul>
      </div>
      <div class="rank-card B current">
        <div class="rank-badge">B</div>
        <div class="rank-title">探路人</div>
        <div class="rank-name">Explorer</div>
        <ul class="rank-benefits">
          <li>开启有声导览上传</li>
          <li>社交分享标签</li>
          <li>专属徽章</li>
        </ul>
      </div>
      <div class="rank-card A">
        <div class="rank-badge">A</div>
        <div class="rank-title">领航员</div>
        <div class="rank-name">Navigator</div>
        <ul class="rank-benefits">
          <li>个人主页置顶</li>
          <li>文创周边申请权</li>
          <li>优先推荐</li>
        </ul>
      </div>
      <div class="rank-card S">
        <div class="rank-badge">S</div>
        <div class="rank-title">大宗师</div>
        <div class="rank-name">Master</div>
        <ul class="rank-benefits">
          <li>商业分成权益</li>
          <li>供应商订单佣金</li>
          <li>平台签约</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Creator Journey Flow -->
  <section class="journey-flow-section" id="journeyFlow">
    <div class="section-header fade-up">
      <div class="section-tag">Creator Journey</div>
      <h2 class="section-title">创作者成长路径</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        每一次创作都是数字资产的积累，从探路人到大宗师
      </p>
    </div>
    
    <div class="journey-steps fade-up">
      <div class="journey-step">
        <div class="step-icon unlocked">🎯</div>
        <div class="step-title">起步</div>
        <div class="step-desc">发布第1张卡片</div>
        <div class="step-metric">卡片数 ≥ 1</div>
      </div>
      <div class="journey-step">
        <div class="step-icon unlocked current">💬</div>
        <div class="step-title">互动</div>
        <div class="step-desc">获得100个❤️</div>
        <div class="step-metric">互动率 > 5%</div>
      </div>
      <div class="journey-step">
        <div class="step-icon">🏆</div>
        <div class="step-title">打榜</div>
        <div class="step-desc">排行榜前10名</div>
        <div class="step-metric">月度Votes</div>
      </div>
      <div class="journey-step">
        <div class="step-icon">⭐</div>
        <div class="step-title">成就</div>
        <div class="step-desc">完成全路线</div>
        <div class="step-metric">完结路线</div>
      </div>
      <div class="journey-step">
        <div class="step-icon">💰</div>
        <div class="step-title">商业</div>
        <div class="step-desc">供应商分成</div>
        <div class="step-metric">CVR转化</div>
      </div>
    </div>
  </section>

  <!-- Partner Claim Button -->
  <div class="partner-claim">
    <button class="claim-btn" onclick="openPartnerClaim()">
      🔗 认领我的资源
    </button>
  </div>

  <!-- Serial Popup -->
  <div class="serial-overlay" id="serialOverlay" onclick="closeSerialPopup()"></div>
  <div class="serial-popup" id="serialPopup">
    <h3>🔐 数字资产存证</h3>
    <div class="serial-code" id="serialCodeDisplay">LFT#2024-003-017</div>
    <p>此卡片已存证于区块链，时间戳: 2024-03-15</p>
    <p style="margin-top:0.5rem;">创作者: 托马斯·曼 | 作品: 《魔山》</p>
    <button class="serial-close" onclick="closeSerialPopup()">关闭</button>
  </div>

  <!-- Map Section -->
  <section class="map-section" id="map">
    <div class="section-header fade-up">
      <div class="section-tag">Global Journey</div>
      <h2 class="section-title">文学地图</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        探索全球文学坐标，感受文明的脉络
      </p>
    </div>
    
    <div class="map-container fade-up">
      <div class="map-markers" id="mapMarkers"></div>
      <div class="map-placeholder" id="mapPlaceholder" style="display:none;">
        <div class="map-placeholder-emoji">🗺️</div>
        <p style="color:var(--paper);opacity:0.5;">正在加载地图...</p>
      </div>
      <iframe id="mapFrame"
        width="100%" height="100%" style="border:0;display:none;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="">
      </iframe>
    </div>
    <div class="map-legend">
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--gold)"></div>世界遗产</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--sky)"></div>文学坐标</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:var(--rose)"></div>已访问</div>
    </div>
  </section>

  <!-- User Profile / Journey Section -->
  <section class="profile-section" id="profile">
    <div class="section-header fade-up">
      <div class="section-tag">My Pilgrimage</div>
      <h2 class="section-title">我的巡礼足迹</h2>
      <p style="color:var(--paper);opacity:0.6;max-width:600px;margin:0 auto;">
        记录你的文学朝圣之旅
      </p>
    </div>
    
    <div class="profile-header fade-up">
      <div class="profile-avatar">👤</div>
      <div class="profile-info">
        <h3>文明守护者</h3>
        <p>第 7 级 · 文学探索者</p>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <div class="profile-stat-value" id="visitedCount">3</div>
          <div class="profile-stat-label">已访地点</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value" id="distanceCount">12,400</div>
          <div class="profile-stat-label">累计里程(km)</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value" id="daysCount">7</div>
          <div class="profile-stat-label">巡礼天数</div>
        </div>
      </div>
    </div>
    
    <div class="journey-map fade-up" id="journeyMap"></div>
  </section>

  <!-- Social Section -->
  <section class="social-section" id="social">
    <div class="section-header fade-up">
      <div class="section-tag">Community</div>
      <h2 class="section-title">文明社区</h2>
    </div>
    
    <div class="social-tabs fade-up">
      <button class="social-tab active" onclick="switchSocialTab('feed', this)">动态流</button>
      <button class="social-tab" onclick="switchSocialTab('comments', this)">评论</button>
      <button class="social-tab" onclick="switchSocialTab('trending', this)">热门</button>
    </div>
    
    <div class="social-feed fade-up" id="socialFeed"></div>
  </section>

  <!-- Card Detail Modal -->
  <div class="modal-overlay" id="cardModal" onclick="closeModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <span class="modal-title" id="modalTitle">地点详情</span>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="footer-logo">文迹 · Literary Footprints</div>
    <p style="color:var(--paper);opacity:0.5;margin-bottom:1rem;">
      守护人类共同的文化记忆 · Civil Guardian © 2026
    </p>
    <div class="footer-copy">✦ World Heritage & Literary Pilgrimage ✦</div>
  </footer>

  <script>
    // Atmosphere Tags
    const atmosphereTags = [
      { id: 'lonely', cn: '孤独感', en: 'Solitude' },
      { id: 'healing', cn: '夏日治愈', en: 'Summer Healing' },
      { id: 'historical', cn: '历史厚重感', en: 'Historical Depth' },
      { id: 'romantic', cn: '浪漫主义', en: 'Romanticism' },
      { id: 'desolate', cn: '荒凉之美', en: 'Desolation' },
      { id: 'mystical', cn: '神秘主义', en: 'Mystical' },
      { id: 'nostalgic', cn: '怀旧之情', en: 'Nostalgic' },
      { id: 'contemplative', cn: '沉思冥想', en: 'Contemplative' }
    ];

    // Supplier Data
    const supplierData = {
      'heritage-1': ['🏨 山巅温泉酒店', '🍵 高山茶室', '🚶 森林徒步向导'],
      'heritage-2': ['🏨 古典酒店', '☕ 中央咖啡馆', '🎭 歌剧院演出'],
      'heritage-3': ['🏨 古罗马民宿', '🍝 意式餐厅', '🏛️ 导览 tour'],
      'heritage-4': ['🏨 唐风客栈', '🍵 茶道体验', '🏯 古城探索'],
      'heritage-5': ['🏨 水乡民宿', '🚣 乌篷船游', '🍜 绍兴黄酒'],
      'literary-1': ['🏨 疗养院主题酒店', '🍵 山间茶歇', '📖 读书会'],
      'literary-2': ['🚂 冰川列车', '🏨 达沃斯小镇酒店', '⛷️ 冬季运动'],
      'literary-3': ['🍽️ 雪山景观餐厅', '🏨 山庄住宿', '🍷 品酒体验'],
      'literary-4': ['⛷️ 滑雪体验', '🏨 山间小屋', '❄️ 冰雪奇观'],
      'literary-5': ['🏨 吉祥寺民宿', '☕ 井之头咖啡馆', '🎸 现场音乐酒吧'],
      'literary-6': ['🏛️ 青山历史导览', '🌸 樱花季散步', '🍵 表参道茶室'],
      'literary-7': ['🏨 吉野温泉旅馆', '🌸 吉野山徒步', '🍱 奈良乡土料理'],
      'literary-8': ['📚 早大校园导览', '☕ 神保町古书街', '🗼 新宿文学散步'],
      'literary-9': ['🎵 三鹰爵士酒吧', '🏛️ 吉卜力美术馆', '🍺 下北泽音乐之旅']
    };

    // Author Badge Definitions
    const authorBadges = [
      { author: 'Thomas Mann', cnAuthor: '托马斯·曼', emoji: '🏔️', total: 5 },
      { author: 'Stefan Zweig', cnAuthor: '茨威格', emoji: '🎭', total: 3 },
      { author: 'Virgil', cnAuthor: '维吉尔', emoji: '🏛️', total: 2 },
      { author: 'Wang Wei', cnAuthor: '王维', emoji: '🏯', total: 2 },
      { author: 'Lu Xun', cnAuthor: '鲁迅', emoji: '🖋️', total: 2 },
      { author: 'Haruki Murakami', cnAuthor: '村上春树', emoji: '🎸', total: 5 }
    ];

    // Data
    const heritageCards = [
      {
        id: 'heritage-1', type: 'heritage', author: 'Thomas Mann', cnAuthor: '托马斯·曼',
        work: 'The Magic Mountain', cnWork: '《魔山》',
        location: 'Davos, Switzerland', cnLocation: '瑞士达沃斯',
        bgClass: 'card-image-heritage', emoji: '🏔️', stamp: '文学',
        quote: 'Time is a doctor who heals all wounds.',
        desc: '汉斯·卡斯托普入住的疗养院，七年如七日，时间在此以不同方式流动。',
        atmosphere: ['lonely', 'mystical', 'contemplative']
      },
      {
        id: 'heritage-2', type: 'heritage', author: 'Stefan Zweig', cnAuthor: '茨威格',
        work: 'The World of Yesterday', cnWork: '《昨日的世界》',
        location: 'Vienna, Austria', cnLocation: '奥地利维也纳',
        bgClass: 'card-image-heritage', emoji: '🏛️', stamp: '美好年代',
        quote: 'I was born in Vienna, a city of music and tragedy.',
        desc: '茨威格笔下的维也纳，美好年代的精神家园。',
        atmosphere: ['nostalgic', 'romantic', 'historical']
      },
      {
        id: 'heritage-3', type: 'heritage', author: 'Virgil', cnAuthor: '维吉尔',
        work: 'Aeneid', cnWork: '《埃涅阿斯纪》',
        location: 'Rome, Italy', cnLocation: '意大利罗马',
        bgClass: 'card-image-heritage', emoji: '🏛️', stamp: '古罗马',
        quote: 'Arms and the man I sing.',
        desc: '罗马帝国的精神源头，维吉尔史诗中的永恒之城。',
        atmosphere: ['historical', 'desolate', 'mystical']
      },
      {
        id: 'heritage-4', type: 'heritage', author: 'Wang Wei', cnAuthor: '王维',
        work: 'Mountain Dwelling', cnWork: '《山居秋暝》',
        location: 'Xi\'an, China', cnLocation: '中国西安',
        bgClass: 'card-image-heritage', emoji: '🏯', stamp: '唐诗',
        quote: '明月松间照，清泉石上流。',
        desc: '王维辋川别业，诗佛禅意的物质载体。',
        atmosphere: ['healing', 'contemplative', 'nostalgic']
      },
      {
        id: 'heritage-5', type: 'heritage', author: 'Lu Xun', cnAuthor: '鲁迅',
        work: 'Hometown', cnWork: '《故乡》',
        location: 'Shaoxing, China', cnLocation: '中国绍兴',
        bgClass: 'card-image-heritage', emoji: '🏯', stamp: '经典',
        quote: '希望是本无所谓有，无所谓无的。',
        desc: '鲁迅故里，水乡绍兴的文学原点。',
        atmosphere: ['nostalgic', 'historical', 'lonely']
      }
    ];

    const literaryCards = [
      {
        id: 'literary-1', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼',
        work: 'The Magic Mountain', cnWork: '《魔山》',
        location: 'Berghof Sanatorium', cnLocation: '贝尔格霍夫疗养院',
        bgClass: 'card-image-literary', emoji: '🏨', stamp: '疗养院',
        quote: 'We went up to the mountain. Days were passing — perhaps time was passing.',
        desc: '山中疗养院，时间的监狱，也是精神的庇护所。',
        atmosphere: ['lonely', 'mystical', 'contemplative']
      },
      {
        id: 'literary-2', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼',
        work: 'The Magic Mountain', cnWork: '《魔山》',
        location: 'Davosplatz Station', cnLocation: '达沃斯广场站',
        bgClass: 'card-image-literary', emoji: '🚂', stamp: '起点',
        quote: 'When the train puffed and panted up the steep slope, Hans Castorp felt he was leaving the familiar world.',
        desc: '从平原到山中的转折点，世俗时间与疗养院时间的分界线。',
        atmosphere: ['contemplative', 'romantic', 'healing']
      },
      {
        id: 'literary-3', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼',
        work: 'The Magic Mountain', cnWork: '《魔山》',
        location: 'Schlossrala Restaurant', cnLocation: '施洛斯阿拉餐厅',
        bgClass: 'card-image-literary', emoji: '🍽️', stamp: '辩论场',
        quote: 'Dinner is a ritual in the sanatorium, a double commitment to time and body.',
        desc: '塞特姆布里尼与纳夫塔辩论文明与死亡的场所。',
        atmosphere: ['mystical', 'historical', 'romantic']
      },
      {
        id: 'literary-4', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼',
        work: 'The Magic Mountain', cnWork: '《魔山》',
        location: 'Snow Field', cnLocation: '雪原',
        bgClass: 'card-image-literary', emoji: '❄️', stamp: '死亡',
        quote: 'Snow is the white shroud of time.',
        desc: '汉斯与克拉芙迪娅漫步的雪地，死亡与永恒的隐喻。',
        atmosphere: ['desolate', 'mystical', 'lonely']
      },
      {
        id: 'literary-5', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树',
        work: 'Norwegian Wood', cnWork: '《挪威的森林》',
        location: 'Kichijoji, Tokyo', cnLocation: '东京吉祥寺',
        bgClass: 'card-image-literary', emoji: '🎸', stamp: '青春',
        quote: '每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢。',
        desc: '渡边彻与直子、绿子相遇的井之头公园，青春的迷茫与恋爱。',
        atmosphere: ['nostalgic', 'lonely', 'romantic']
      },
      {
        id: 'literary-6', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树',
        work: 'Norwegian Wood', cnWork: '《挪威的森林》',
        location: 'Aoyama Cemetery, Tokyo', cnLocation: '东京青山墓地',
        bgClass: 'card-image-literary', emoji: '🌿', stamp: '生死',
        quote: '死并不是生的对立面，而是作为生的一部分永存。',
        desc: '直子常常提起的墓地，小说中关于死亡与重生的思考场所。',
        atmosphere: ['contemplative', 'mystical', 'lonely']
      },
      {
        id: 'literary-7', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树',
        work: 'Norwegian Wood', cnWork: '《挪威的森林》',
        location: 'Yoshino, Nara', cnLocation: '奈良吉野',
        bgClass: 'card-image-literary', emoji: '🌸', stamp: '回忆',
        quote: '记忆就像那场大雪，覆盖了所有，却掩不住春天的痕迹。',
        desc: '直子疗养的深山疗养院，远离尘世的寂静之地。',
        atmosphere: ['healing', 'nostalgic', 'desolate']
      },
      {
        id: 'literary-8', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树',
        work: 'Norwegian Wood', cnWork: '《挪威的森林》',
        location: 'Waseda University', cnLocation: '早稻田大学',
        bgClass: 'card-image-literary', emoji: '📚', stamp: '原点',
        quote: '我在一片混沌中寻找自己的位置，就像在森林中寻找出路。',
        desc: '小说主角渡边的大学生活场景，青春时代的起点。',
        atmosphere: ['romantic', 'nostalgic', 'healing']
      },
      {
        id: 'literary-9', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树',
        work: 'Norwegian Wood', cnWork: '《挪威的森林》',
        location: 'Mitaka, Tokyo', cnLocation: '东京三鹰',
        bgClass: 'card-image-literary', emoji: '🎶', stamp: '音乐',
        quote: '挪威的森林，就像那首Beatles的歌，不知为何总让人落泪。',
        desc: '渡边反复听Norwegian Wood唱片的小公寓，小说标题的来源。',
        atmosphere: ['lonely', 'nostalgic', 'contemplative']
      }
    ];

    const rankings = [
      { title: '《魔山》贝尔格霍夫疗养院', author: 'Thomas Mann', votes: 2847 },
      { title: '茨威格故居 · 维也纳', author: 'Stefan Zweig', votes: 2531 },
      { title: '《挪威的森林》井之头公园', author: 'Haruki Murakami', votes: 2460 },
      { title: '鲁迅故里 · 绍兴水乡', author: 'Lu Xun', votes: 2398 },
      { title: '王维辋川 · 西安', author: 'Wang Wei', votes: 2105 }
    ];

    // Combine all cards
    let allCards = [...heritageCards, ...literaryCards];
    let currentFilter = 'all';
    let currentAtmosphere = null;

    // Enrich cards with original/derivative status and scoring
    const ORIGINAL_IDS = ['heritage-1', 'heritage-2', 'heritage-3', 'heritage-4', 'heritage-5', 'literary-1', 'literary-5'];
    const DERIVATIVE_IDS = ['literary-2', 'literary-3', 'literary-4', 'literary-6', 'literary-7', 'literary-8', 'literary-9'];

    // Pilgrimage creator check
    function getTravelVerificationCount() {
      return JSON.parse(localStorage.getItem('visitedCards') || '[]').length;
    }

    function isPilgrimCreator() {
      return getTravelVerificationCount() >= 3;
    }

    function enrichCardData(card) {
      card.isOriginal = ORIGINAL_IDS.includes(card.id);
      card.isDerivative = DERIVATIVE_IDS.includes(card.id);
      card.scores = {
        purchase: Math.floor(Math.random() * 50 + 10),
        travel: Math.floor(Math.random() * 20 + 1),
        resonance: Math.floor(Math.random() * 15 + 1)
      };
      card.pilgrimVerified = isPilgrimCreator();
      return card;
    }

    allCards = allCards.map(enrichCardData);

    // Itinerary functions
    function getItinerary() {
      return JSON.parse(localStorage.getItem('itinerary') || '[]');
    }

    function saveItinerary(items) {
      localStorage.setItem('itinerary', JSON.stringify(items));
      updateItineraryCount();
    }

    function addToItinerary(cardId) {
      const card = allCards.find(c => c.id === cardId);
      if (!card) return;
      
      const itinerary = getItinerary();
      if (itinery.some(item => item.id === cardId)) {
        alert('已添加到行程中！');
        return;
      }
      
      itinerary.push({ id: card.id, location: card.location, cnLocation: card.cnLocation, emoji: card.emoji });
      saveItinerary(itinerary);
      alert(\`「\${card.location}」已添加到行程！\`);
    }

    function saveToRoute(cardId) {
      const card = allCards.find(c => c.id === cardId);
      if (!card) return;
      
      const saved = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
      if (saved.some(item => item.id === cardId)) {
        alert('已保存到路线！');
        return;
      }
      
      saved.push({ id: card.id, location: card.location, cnLocation: card.cnLocation, emoji: card.emoji });
      localStorage.setItem('savedRoutes', JSON.stringify(saved));
      alert(\`「\${card.location}」已保存到路线！\`);
    }

    function updateItineraryCount() {
      const count = getItinerary().length;
      const badge = document.getElementById('itineraryCount');
      if (count > 0) {
        badge.style.display = 'block';
        document.getElementById('itineraryNum').textContent = count;
      } else {
        badge.style.display = 'none';
      }
    }

    function openItinerary() {
      document.getElementById('itineraryDrawer').classList.add('open');
      document.getElementById('drawerOverlay').classList.add('open');
      renderItinerary();
    }

    function closeItinerary() {
      document.getElementById('itineraryDrawer').classList.remove('open');
      document.getElementById('drawerOverlay').classList.remove('open');
    }

    function renderItinerary() {
      const itinerary = getItinerary();
      const content = document.getElementById('itineraryContent');
      
      if (itinerary.length === 0) {
        content.innerHTML = \`<p style="text-align:center;color:var(--paper);opacity:0.5;margin-top:2rem;">
          暂无行程安排<br>点击卡片上的「加入行程」开始规划
        </p>\`;
        return;
      }
      
      content.innerHTML = itinerary.map((item, i) => \`
        <div class="itinerary-item">
          <div class="itinerary-item-emoji">\${item.emoji}</div>
          <div class="itinerary-item-info">
            <h4>\${item.location}</h4>
            <p>\${item.cnLocation}</p>
          </div>
          <button class="itinerary-item-remove" onclick="removeFromItinerary('\${item.id}')">×</button>
        </div>
      \`).join('');
    }

    function removeFromItinerary(cardId) {
      const itinerary = getItinerary().filter(item => item.id !== cardId);
      saveItinerary(itinerary);
      renderItinerary();
    }

    function planRoute() {
      const itinerary = getItinerary();
      if (itinerary.length === 0) {
        alert('请先添加行程地点！');
        return;
      }
      
      const routeText = itinerary.map((item, i) => \`\${i + 1}. \${item.location}\`).join('\n');
      alert(\`🗺️ 您的巡礼路线：\n\n\${routeText}\n\n路线已生成，祝您旅途愉快！\`);
    }

    // Badge system
    function getVisitedCards() {
      return JSON.parse(localStorage.getItem('visitedCards') || '[]');
    }

    function renderBadges() {
      const visited = getVisitedCards();
      const container = document.getElementById('badgesContainer');
      
      container.innerHTML = authorBadges.map(badge => {
        const visitedCount = visited.filter(id => {
          const card = allCards.find(c => c.id === id);
          return card && card.author === badge.author;
        }).length;
        
        const isUnlocked = visitedCount >= badge.total;
        const progress = Math.min(100, Math.round((visitedCount / badge.total) * 100));
        
        return \`
          <div class="badge-item \${isUnlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon">\${isUnlocked ? badge.emoji : '🔒'}</div>
            <div class="badge-name">\${badge.cnAuthor}</div>
            <div class="badge-progress">\${visitedCount}/\${badge.total} 已访</div>
          </div>
        \`;
      }).join('');
    }

    // Atmosphere filter
    function filterByAtmosphere(tagId, btn) {
      document.querySelectorAll('.atmosphere-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAtmosphere = tagId;
      renderCards(currentFilter);
    }

    // Search
    function searchCards(query) {
      const q = query.toLowerCase();
      const results = allCards.filter(card => 
        card.location.toLowerCase().includes(q) ||
        card.author.toLowerCase().includes(q) ||
        card.cnAuthor.includes(q) ||
        card.cnLocation.includes(q) ||
        atmosphereTags.some(tag => card.atmosphere && card.atmosphere.includes(tag.id) && (tag.cn.includes(q) || tag.en.toLowerCase().includes(q)))
      );
      return results;
    }

    // Render cards
    function renderCards(filter = 'all', searchQuery = '', eraLocations = null) {
      const grid = document.getElementById('cardsGrid');
      currentFilter = filter;
      
      let filtered = filter === 'all' ? allCards : allCards.filter(c => c.type === filter);
      
      if (currentAtmosphere) {
        filtered = filtered.filter(c => c.atmosphere && c.atmosphere.includes(currentAtmosphere));
      }
      
      if (searchQuery) {
        filtered = filtered.filter(card => 
          card.location.toLowerCase().includes(searchQuery) ||
          card.author.toLowerCase().includes(searchQuery) ||
          card.cnAuthor.includes(searchQuery) ||
          card.cnLocation.includes(searchQuery) ||
          (card.atmosphere && atmosphereTags.some(tag => card.atmosphere.includes(tag.id) && (tag.cn.includes(searchQuery) || tag.en.toLowerCase().includes(searchQuery))))
        );
      }
      
      if (eraLocations) {
        filtered = filtered.filter(c => eraLocations.includes(c.location));
      }
      
      grid.innerHTML = filtered.map((card, i) => {
        const suppliers = supplierData[card.id] || [];
        const tagsHtml = card.atmosphere ? card.atmosphere.map(tagId => {
          const tag = atmosphereTags.find(t => t.id === tagId);
          return tag ? \`<span class="card-tag" onclick="event.stopPropagation(); filterByAtmosphere('\${tagId}', document.querySelectorAll('.atmosphere-tag')[\${atmosphereTags.findIndex(t => t.id === tagId)}])">\${tag.cn}</span>\` : '';
        }).join('') : '';
        
        const bookingTiles = [
          '🏨 特色民宿', '🍜 当地美食', '🎫 门票预订', '向导 私人导览'
        ];
        
        return \`
          <div class="card-container" onclick="toggleCardFlip(this, '\${card.id}')">
            <div class="card-flip">
              <div class="card-front">
                <div class="card-image \${card.bgClass}">
                  <span style="opacity:0.5">\${card.emoji}</span>
                  <div class="card-stamp">\${card.stamp}</div>
                  <div style="position:absolute;top:0.5rem;left:0.5rem;display:flex;gap:0.3rem;flex-direction:column;align-items:flex-start;">
                    <span class="original-badge \${card.isOriginal ? 'original' : 'derivative'}">\${card.isOriginal ? '✦ 原创认证' : '继创'}</span>
                    \${card.pilgrimVerified ? '<span class="pilgrim-badge">⛰️ 作者已亲历</span>' : ''}
                  </div>
                  <div class="creator-seal">
                    <svg viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="\${currentLang === 'en' ? '#6b8fa3' : '#c9a84c'}" stroke-width="1.5" opacity="0.6"/>
                      <text x="20" y="25" text-anchor="middle" font-size="12" fill="\${currentLang === 'en' ? '#6b8fa3' : '#c9a84c'}" opacity="0.8">\${card.author.substring(0,2)}</text>
                    </svg>
                  </div>
                </div>
                <div class="card-content">
                  <div class="card-serial" onclick="event.stopPropagation(); showSerialPopup('LFT#\${generateCardSerial(card.id, card.author)}')">NO.\${generateCardSerial(card.id, card.author)}</div>
                  <div style="position:absolute;top:0.5rem;right:0.5rem;" class="context-toggle">
                    <button class="context-btn active" onclick="event.stopPropagation(); toggleContextLang('\${card.id}', 'zh')">文</button>
                    <button class="context-btn" onclick="event.stopPropagation(); toggleContextLang('\${card.id}', 'en')">译</button>
                  </div>
                  <div class="card-author">
                    <div class="author-avatar">\${card.cnAuthor[0]}</div>
                    <div class="author-info">
                      <h3>\${card.author}</h3>
                      <span>\${card.cnAuthor} · \${card.cnWork}</span>
                    </div>
                  </div>
                  <div class="card-title">\${card.location}</div>
                  <div class="card-quote">"\${card.quote}"</div>
                  <div class="card-tags">\${tagsHtml}</div>
                  <div class="card-meta">
                    <div class="card-location">📍 \${card.cnLocation}</div>
                    <div class="card-votes">❤️ \${Math.floor(Math.random() * 500 + 100)}</div>
                  </div>
                  <div class="card-actions">
                    <button class="card-action-btn btn-itinerary" onclick="event.stopPropagation(); addToItinerary('\${card.id}')">➕ 加入行程</button>
                    <button class="card-action-btn btn-save" onclick="event.stopPropagation(); saveToRoute('\${card.id}')">⭐ 保存路线</button>
                  </div>
                  <div class="flip-hint">← 翻转查看深度内容</div>
                </div>
              </div>
              <div class="card-back">
                <div class="card-back-header">
                  <span class="card-back-title">📖 深度探索</span>
                  <button class="card-back-close" onclick="event.stopPropagation(); toggleCardFlip(this.parentElement.parentElement.parentElement)">×</button>
                </div>
                <div class="card-back-content">
                  <div class="back-section">
                    <h4>✦ 打卡攻略</h4>
                    <div class="back-guide">
                      <p>📅 最佳季节：\${['春', '夏', '秋', '冬'][Math.floor(Math.random() * 4)]}季</p>
                      <p>⏱️ 建议时长：\${[1, 2, 3, 4][Math.floor(Math.random() * 4)]}小时</p>
                      <p>📝 参观须知：\${card.desc.substring(0, 30)}...</p>
                    </div>
                  </div>
                  <div class="back-section">
                    <h4>✦ 关联作品</h4>
                    <div class="back-works">
                      <div class="back-work-item" onclick="event.stopPropagation(); alert('即将跳转阅读')">
                        <span>📖</span>
                        <span>\${card.cnWork}</span>
                      </div>
                      <div class="back-work-item" onclick="event.stopPropagation(); alert('即将跳转有声书')">
                        <span>🎧</span>
                        <span>有声版</span>
                      </div>
                    </div>
                  </div>
                  <div class="back-section">
                    <h4>✦ 创作者感悟</h4>
                    <div class="back-creator">
                      <div class="back-creator-quote">"\${card.quote}"</div>
                      <div class="back-creator-name">— \${card.author}</div>
                    </div>
                  </div>
                  <div class="supplier-association">
                    <div class="note">📍 坐标关联供应商 · 创作者可一票否决</div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                      \${suppliers.slice(0, 2).map(s => \`
                        <div class="booking-tile" onclick="event.stopPropagation(); alert('\${s}\n\n创作者可拒绝此关联')" style="border-style:dashed;">
                          \${s}
                        </div>
                      \`).join('')}
                    </div>
                    <div style="margin-top:0.5rem;display:flex;gap:0.5rem;align-items:center;">
                      <span style="font-size:0.55rem;color:var(--paper);opacity:0.3;">
                        \${card.isOriginal ? '✦ 创作者可管理此坐标的供应商关联' : '继创卡片不可管理供应商'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        \`;
      }).join('');
      
      observeElements();
    }

    // Render rankings (three-layer scoring)
    function renderRankings() {
      const list = document.getElementById('rankingList');

      const threeLayerScore = (card) => {
        const p = card.scores?.purchase || 10;
        const t = card.scores?.travel || 1;
        const r = card.scores?.resonance || 1;
        return { total: p * 1 + t * 3 + r * 0.5, purchase: p, travel: t, resonance: r };
      };

      const scored = allCards.map(c => ({ card: c, score: threeLayerScore(c) }))
        .sort((a, b) => b.score.total - a.score.total)
        .slice(0, 10);

      list.innerHTML = \`
        <div style="margin-bottom:1rem;font-size:0.7rem;color:var(--paper);opacity:0.5;text-align:center;">
          积分算法：购买分 ×1 + 出行验证分 ×3 + 共鸣分 ×0.5
        </div>
        \${scored.map((item, i) => \`
          <div class="ranking-item fade-up" style="animation-delay:\${i * 0.1}s">
            <div class="ranking-position">\${i + 1}</div>
            <div class="ranking-info">
              <h4>\${item.card.location} <span class="original-badge \${item.card.isOriginal ? 'original' : 'derivative'}">\${item.card.isOriginal ? '原创' : '继创'}</span></h4>
              <p>by \${item.card.author}</p>
              <div class="score-breakdown">
                <span class="score-item purchase">购买 <span class="value">\${item.score.purchase}</span></span>
                <span class="score-item travel">出行 <span class="value">\${item.score.travel}×3</span></span>
                <span class="score-item resonance">共鸣 <span class="value">\${item.score.resonance}</span></span>
                <span class="score-item" style="color:var(--gold);font-weight:600;">总分 <span class="value">\${Math.round(item.score.total)}</span></span>
              </div>
            </div>
          </div>
        \`).join('')}\`;
      observeElements();
    }

    // Filter
    function filterCards(filter, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(filter);
    }

    // Global access for onclick
    // Multi-author perspectives data
    const multiAuthorPerspectives = {
      'Davos, Switzerland': [
        { author: 'Thomas Mann', cnAuthor: '托马斯·曼', avatar: 'T', quote: 'Time is a doctor who heals all wounds. The mountain changes everything.', work: '《魔山》' },
        { author: 'Hermann Hesse', cnAuthor: '黑塞', avatar: 'H', quote: 'In the mountains, I found my soul.', work: '《荒原狼》' },
        { author: 'Albert Camus', cnAuthor: '加缪', avatar: 'A', quote: 'The mountain is the place where human meets the divine.', work: '《西西弗神话》' }
      ],
      'Vienna, Austria': [
        { author: 'Stefan Zweig', cnAuthor: '茨威格', avatar: 'S', quote: 'I was born in Vienna, a city of music and tragedy.', work: '《昨日的世界》' },
        { author: 'Peter Altenberg', cnAuthor: '阿尔滕贝格', avatar: 'P', quote: 'Vienna is a city that lives on dreams.', work: '《来自布拉格的人们》' },
        { author: 'Hugo von Hofmannstahl', cnAuthor: '霍夫曼斯塔尔', avatar: 'H', quote: 'The elegant decay of Vienna.', work: '《尚多斯勋爵的信》' }
      ],
      'Rome, Italy': [
        { author: 'Virgil', cnAuthor: '维吉尔', avatar: 'V', quote: 'Arms and the man I sing.', work: '《埃涅阿斯纪》' },
        { author: 'Goethe', cnAuthor: '歌德', avatar: 'G', quote: 'Rome - the eternal city, where every stone tells a story.', work: '《意大利之旅》' },
        { author: 'Oscar Wilde', cnAuthor: '王尔德', avatar: 'O', quote: 'Rome is the capital of the world.', work: '《道林·格雷的画像》' }
      ],
      'Kichijoji, Tokyo': [
        { author: 'Haruki Murakami', cnAuthor: '村上春树', avatar: '村', quote: '每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢。', work: '《挪威的森林》' },
        { author: 'Yoshimoto Banana', cnAuthor: '吉本芭娜娜', avatar: 'Y', quote: '吉祥寺的午后，阳光像被谁打翻的蜂蜜罐。', work: '《厨房》' },
        { author: 'Natsume Soseki', cnAuthor: '夏目漱石', avatar: '漱', quote: '井之头的水面映着云，像人的心一样捉摸不定。', work: '《心》' }
      ],
      'Aoyama Cemetery, Tokyo': [
        { author: 'Haruki Murakami', cnAuthor: '村上春树', avatar: '村', quote: '死并不是生的对立面，而是作为生的一部分永存。', work: '《挪威的森林》' },
        { author: 'Stefan Zweig', cnAuthor: '茨威格', avatar: 'Z', quote: '墓地是城市中最安静的角落，也是最喧闹的地方。', work: '《昨日的世界》' }
      ],
      'Yoshino, Nara': [
        { author: 'Haruki Murakami', cnAuthor: '村上春树', avatar: '村', quote: '吉野的樱花像一场无声的雪，落在心里。', work: '《挪威的森林》' },
        { author: 'Matsuo Basho', cnAuthor: '松尾芭蕉', avatar: '芭', quote: '吉野山花纷飞处，人世如梦。', work: '《奥之细道》' }
      ],
      'default': [
        { author: 'Unknown', cnAuthor: '旅人', avatar: '?', quote: 'A place where literature meets the world.', work: '' }
      ]
    };

    // Map position data (real lat/lng coordinates)
    const mapCoordinates = {
      'heritage-1': { lat: 46.8011, lng: 9.8227, place: 'Davos,Switzerland' },
      'heritage-2': { lat: 48.2082, lng: 16.3738, place: 'Vienna,Austria' },
      'heritage-3': { lat: 41.9028, lng: 12.4964, place: 'Rome,Italy' },
      'heritage-4': { lat: 34.3416, lng: 108.9398, place: 'Xi'an,China' },
      'heritage-5': { lat: 29.9961, lng: 120.5811, place: 'Shaoxing,China' },
      'literary-1': { lat: 46.7931, lng: 9.8282, place: 'Berghof,Davos' },
      'literary-2': { lat: 46.8000, lng: 9.8167, place: 'Davos,Switzerland' },
      'literary-3': { lat: 46.7950, lng: 9.8300, place: 'Schlossrala,Davos' },
      'literary-4': { lat: 46.7900, lng: 9.8500, place: 'Davos,Snowfield' },
      'literary-5': { lat: 35.7005, lng: 139.5789, place: 'Kichijoji,Tokyo' },
      'literary-6': { lat: 35.6654, lng: 139.7221, place: 'Aoyama,Tokyo' },
      'literary-7': { lat: 34.3961, lng: 135.8534, place: 'Yoshino,Nara' },
      'literary-8': { lat: 35.7071, lng: 139.7189, place: 'Waseda,Tokyo' },
      'literary-9': { lat: 35.6950, lng: 139.5561, place: 'Mitaka,Tokyo' }
    };

    // Map position data (approximate coordinates in %)
    const mapPositions = {
      'heritage-1': { x: 52, y: 28, type: 'heritage' },
      'heritage-2': { x: 55, y: 32, type: 'heritage' },
      'heritage-3': { x: 48, y: 38, type: 'heritage' },
      'heritage-4': { x: 72, y: 45, type: 'heritage' },
      'heritage-5': { x: 78, y: 48, type: 'heritage' },
      'literary-1': { x: 52, y: 28, type: 'literary' },
      'literary-2': { x: 52, y: 27, type: 'literary' },
      'literary-3': { x: 53, y: 29, type: 'literary' },
      'literary-4': { x: 51, y: 30, type: 'literary' },
      'literary-5': { x: 82, y: 55, type: 'literary' },
      'literary-6': { x: 82, y: 56, type: 'literary' },
      'literary-7': { x: 79, y: 57, type: 'literary' },
      'literary-8': { x: 82, y: 54, type: 'literary' },
      'literary-9': { x: 81, y: 56, type: 'literary' }
    };

    // Journey data
    const journeyData = [
      { id: 'heritage-1', location: 'Davos, Switzerland', date: '2026-03-15', desc: '探访《魔山》贝尔格霍夫疗养院' },
      { id: 'literary-2', location: 'Davosplatz Station', date: '2026-03-15', desc: '追寻汉斯·卡斯托普的足迹' },
      { id: 'heritage-2', location: 'Vienna, Austria', date: '2026-04-02', desc: '茨威格故居巡礼' }
    ];

    // Social posts data
    const socialPosts = [
      { user: '文学旅行者', avatar: '文', content: '在达沃斯的疗养院，我仿佛看到了汉斯·卡斯托普七年如一日的生活。时间在这里失去了意义，却又获得了另一种存在。', location: '瑞士达沃斯', time: '2小时前', likes: 128, comments: 24 },
      { user: '文明守护者', avatar: '守', content: '完成维也纳文学之旅，茨威格笔下的"美好年代"依然历历在目。每一座城市都是一本书。', location: '奥地利维也纳', time: '5小时前', likes: 89, comments: 15 },
      { user: '朝圣者', avatar: '圣', content: '鲁迅故里的水乡变了又变，但先生笔下的"故乡"永远鲜活。', location: '中国绍兴', time: '1天前', likes: 203, comments: 42 },
      { user: '诗与远方', avatar: '诗', content: '王维的辋川还在吗？站在西安的土地上，我试图寻找诗佛的足迹。', location: '中国西安', time: '2天前', likes: 156, comments: 31 }
    ];

    // Render map markers
    function renderMapMarkers() {
      const container = document.getElementById('mapMarkers');
      const visited = JSON.parse(localStorage.getItem('visitedCards') || '[]');
      const frame = document.getElementById('mapFrame');
      
      container.innerHTML = allCards.map(card => {
        const pos = mapPositions[card.id];
        if (!pos) return '';
        
        const isVisited = visited.includes(card.id);
        const color = isVisited ? 'var(--rose)' : (pos.type === 'heritage' ? 'var(--gold)' : 'var(--sky)');
        
        return \`<div class="map-marker" style="left:\${pos.x}%;top:\${pos.y}%;background:\${color}" 
                onclick="openCardModal('\${card.id}')" title="\${card.location}">\${card.emoji}</div>\`;
      }).join('');

      // Load Google Maps iframe
      const apiKey = 'OI61D2lqRJyzEu5dXQPbeSfxjN8';
      const markers = allCards.map(c => {
        const coords = mapCoordinates[c.id];
        if (!coords) return '';
        return \`&markers=color:\${visited.includes(c.id) ? 'red' : 'gold'}%7Clabel:\${c.emoji}%7C\${coords.lat},\${coords.lng}\`;
      }).filter(Boolean).join('');

      frame.src = \`https://www.google.com/maps/embed/v1/search?key=\${apiKey}&q=literary+landmarks+worldwide&zoom=2&maptype=satellite\`;
      frame.style.display = 'block';
      document.getElementById('mapPlaceholder').style.display = 'none';
    }

    // Render journey timeline
    function renderJourney() {
      const container = document.getElementById('journeyMap');
      container.innerHTML = \`<div class="journey-timeline">\${journeyData.map(j => \`
        <div class="journey-item" onclick="openCardModal('\${j.id}')">
          <h4>\${j.location}</h4>
          <p>\${j.desc}</p>
          <div class="journey-date">📅 \${j.date}</div>
        </div>
      \`).join('')}</div>\`;
    }

    // Render social feed
    function renderSocialFeed() {
      const container = document.getElementById('socialFeed');
      container.innerHTML = socialPosts.map(post => \`
        <div class="social-post">
          <div class="post-header">
            <div class="post-avatar">\${post.avatar}</div>
            <div>
              <div class="post-user">\${post.user}</div>
              <div class="post-time">\${post.time}</div>
            </div>
          </div>
          <div class="post-content">\${post.content}</div>
          <div class="post-location">📍 \${post.location}</div>
          <div class="post-actions">
            <div class="post-action" onclick="likePost(this)">❤️ \${post.likes}</div>
            <div class="post-action" onclick="openCardModal('heritage-1')">💬 \${post.comments}</div>
            <div class="post-action" onclick="sharePost('\${post.location}')">🔗 分享</div>
          </div>
        </div>
      \`).join('');
    }

    // Like post
    function likePost(el) {
      const current = parseInt(el.textContent) || 0;
      el.textContent = '❤️ ' + (current + 1);
    }

    // Share post
    function sharePost(location) {
      alert(\`「\${location}」已复制到剪贴板！\n分享给朋友一起探索文学世界。\`);
    }

    // Card modal functions
    function openCardModal(cardId) {
      const card = allCards.find(c => c.id === cardId);
      if (!card) return;
      
      const perspectives = multiAuthorPerspectives[card.location] || multiAuthorPerspectives['default'];
      
      document.getElementById('modalTitle').textContent = card.location;
      document.getElementById('modalBody').innerHTML = \`
        <div style="margin-bottom:1rem;">
          <div class="card-author" style="margin-bottom:1rem;">
            <div class="author-avatar">\${card.cnAuthor[0]}</div>
            <div class="author-info">
              <h3>\${card.author}</h3>
              <span>\${card.cnAuthor} · \${card.cnWork}</span>
            </div>
          </div>
          <div class="card-quote">"\${card.quote}"</div>
          <p style="color:var(--paper);opacity:0.7;margin-top:1rem;font-size:0.85rem;">\${card.desc}</p>
        </div>
        
        <div class="perspectives-section">
          <h4 style="color:var(--gold);margin-bottom:1rem;font-size:0.9rem;">✦ 多视角证言</h4>
          \${perspectives.map(p => \`
            <div class="perspective-item">
              <div class="perspective-author">
                <div class="perspective-author-avatar">\${p.avatar}</div>
                <span class="perspective-author-name">\${p.cnAuthor || p.author}</span>
                \${p.work ? \`<span style="color:var(--paper);opacity:0.5;font-size:0.7rem;margin-left:0.5rem">\${p.work}</span>\` : ''}
              </div>
              <div class="perspective-quote">"\${p.quote}"</div>
            </div>
          \`).join('')}
        </div>
        
        <div style="margin-top:1.5rem;display:flex;gap:0.5rem;">
          <button class="card-action-btn btn-itinerary" onclick="addToItinerary('\${card.id}'); closeModal();" style="flex:1;">➕ 加入行程</button>
          <button class="card-action-btn btn-save" onclick="markAsVisited('\${card.id}'); closeModal();" style="flex:1;">✅ 标记已访</button>
        </div>
      \`;
      
      document.getElementById('cardModal').classList.add('open');
    }

    function closeModal(event) {
      if (!event || event.target === document.getElementById('cardModal')) {
        document.getElementById('cardModal').classList.remove('open');
      }
    }

    // Mark as visited
    function markAsVisited(cardId) {
      const visited = JSON.parse(localStorage.getItem('visitedCards') || '[]');
      if (!visited.includes(cardId)) {
        visited.push(cardId);
        localStorage.setItem('visitedCards', JSON.stringify(visited));
        alert('已标记为已访！查看个人主页了解巡礼进度。');
        renderBadges();
        renderJourney();
        renderMapMarkers();
      }
    }

    // Switch social tab
    function switchSocialTab(tab, btn) {
      document.querySelectorAll('.social-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (tab === 'feed') {
        renderSocialFeed();
      } else if (tab === 'comments') {
        document.getElementById('socialFeed').innerHTML = '<p style="text-align:center;color:var(--paper);opacity:0.5;">评论功能即将上线</p>';
      } else if (tab === 'trending') {
        document.getElementById('socialFeed').innerHTML = '<p style="text-align:center;color:var(--paper);opacity:0.5;">热门话题即将上线</p>';
      }
    }

    // Time filter
    function setTimeFilter(era, btn) {
      document.querySelectorAll('.time-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.body.className = '';
      if (era !== 'all') {
        document.body.classList.add('time-' + era);
      }
      
      const eraFilter = {
        'all': null,
        'ancient': ['Rome, Italy'],
        'medieval': ['Vienna, Austria'],
        '19th': ['Shaoxing, China', "Davos, Switzerland"],
        '20th': ['Xi\'an, China', 'Davos, Switzerland']
      };
      
      const locations = eraFilter[era];
      if (locations) {
        renderCards(currentFilter, '', locations);
      } else {
        renderCards(currentFilter);
      }
    }

    // Creator modal
    function openCreatorModal() {
      const modal = document.getElementById('cardModal');
      document.getElementById('modalTitle').textContent = '✍️ 发布我的足迹';
      document.getElementById('modalBody').innerHTML = \`
        <div style="padding:1rem;">
          <input type="text" id="creatorTitle" placeholder="标题：这次旅行的主题" 
                 style="width:100%;padding:0.75rem;margin-bottom:1rem;background:rgba(45,45,68,0.5);border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--paper);">
          <textarea id="creatorContent" placeholder="写下你的文学朝圣故事..." 
                    style="width:100%;height:150px;padding:0.75rem;margin-bottom:1rem;background:rgba(45,45,68,0.5);border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--paper);resize:none;"></textarea>
          <select id="creatorLocation" style="width:100%;padding:0.75rem;margin-bottom:1rem;background:rgba(45,45,68,0.5);border:1px solid rgba(201,168,76,0.3);border-radius:8px;color:var(--paper);">
            <option value="">选择关联地点</option>
            \${allCards.map(c => \`<option value="\${c.id}">\${c.location}</option>\`).join('')}
          </select>
          <button onclick="submitCreatorPost()" class="btn-plan-route" style="width:100%;">发布</button>
        </div>
      \`;
      modal.classList.add('open');
    }

    function submitCreatorPost() {
      const title = document.getElementById('creatorTitle').value;
      const content = document.getElementById('creatorContent').value;
      const location = document.getElementById('creatorLocation').value;
      
      if (!title || !content) {
        alert('请填写标题和内容');
        return;
      }
      
      const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      posts.unshift({
        user: '我',
        avatar: '我',
        content: content,
        location: location ? allCards.find(c => c.id === location)?.location || '' : '',
        time: '刚刚',
        likes: 0,
        comments: 0
      });
      localStorage.setItem('userPosts', JSON.stringify(posts));
      
      document.getElementById('cardModal').classList.remove('open');
      alert('发布成功！你的足迹已被记录。');
    }

    // Toggle card flip
    function toggleCardFlip(container) {
      container.classList.toggle('flipped');
    }

    // Render stamp collection
    function renderStampCollection() {
      const container = document.getElementById('stampCollection');
      const visited = JSON.parse(localStorage.getItem('visitedCards') || '[]');
      
      const authorGroups = {};
      allCards.forEach(card => {
        if (!authorGroups[card.author]) authorGroups[card.author] = [];
        authorGroups[card.author].push(card.id);
      });
      
      container.innerHTML = allCards.map(card => {
        const isVisited = visited.includes(card.id);
        const authorCards = authorGroups[card.author];
        const authorVisited = authorCards.filter(id => visited.includes(id)).length;
        const isComplete = authorVisited === authorCards.length;
        
        return \`
          <div class="stamp-item \${isVisited ? 'collected' : 'locked'} \${isComplete ? 'completed' : ''}" 
               onclick="openCardModal('\${card.id}')">
            <div class="stamp-emoji">\${card.emoji}</div>
            <div class="stamp-location">\${card.location.split(',')[0]}</div>
            <div class="stamp-author">\${card.cnAuthor}</div>
          </div>
        \`;
      }).join('');
    }

    // Render ranking with trending tags
    function renderRankings() {
      const list = document.getElementById('rankingList');

      const threeLayerScore = (card) => {
        const p = card.scores?.purchase || 10;
        const t = card.scores?.travel || 1;
        const r = card.scores?.resonance || 1;
        return { total: p * 1 + t * 3 + r * 0.5, purchase: p, travel: t, resonance: r };
      };

      const scored = allCards.map(c => ({ card: c, score: threeLayerScore(c) }))
        .sort((a, b) => b.score.total - a.score.total)
        .slice(0, 10);

      list.innerHTML = \`
        <div style="margin-bottom:1rem;font-size:0.7rem;color:var(--paper);opacity:0.5;text-align:center;">
          积分算法：购买分 ×1 + 出行验证分 ×3 + 共鸣分 ×0.5
        </div>
        \${scored.map((item, i) => \`
          <div class="ranking-item fade-up" style="animation-delay:\${i * 0.1}s">
            <div class="ranking-position">\${i + 1}</div>
            <div class="ranking-info">
              <h4>\${item.card.location} <span class="original-badge \${item.card.isOriginal ? 'original' : 'derivative'}">\${item.card.isOriginal ? '原创' : '继创'}</span></h4>
              <p>by \${item.card.author}</p>
              <div class="score-breakdown">
                <span class="score-item purchase">购买 <span class="value">\${item.score.purchase}</span></span>
                <span class="score-item travel">出行 <span class="value">\${item.score.travel}×3</span></span>
                <span class="score-item resonance">共鸣 <span class="value">\${item.score.resonance}</span></span>
                <span class="score-item" style="color:var(--gold);font-weight:600;">总分 <span class="value">\${Math.round(item.score.total)}</span></span>
              </div>
            </div>
          </div>
        \`).join('')}\`;
    }

    // Global exposure
    window.filterByAtmosphere = filterByAtmosphere;
    window.addToItinerary = addToItinerary;
    window.saveToRoute = saveToRoute;
    window.openItinerary = openItinerary;
    window.closeItinerary = closeItinerary;
    window.removeFromItinerary = removeFromItinerary;
    window.planRoute = planRoute;
    window.openCardModal = openCardModal;
    window.closeModal = closeModal;
    window.markAsVisited = markAsVisited;
    window.switchSocialTab = switchSocialTab;
    window.likePost = likePost;
    window.sharePost = sharePost;
    window.setTimeFilter = setTimeFilter;
    window.openCreatorModal = openCreatorModal;
    window.submitCreatorPost = submitCreatorPost;
    // Language switch
    let currentLang = 'zh';
    
    function setLanguage(lang, btn) {
      currentLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (lang === 'en') {
        document.querySelectorAll('.section-title').forEach(el => {
          if (el.textContent.includes('文明坐标')) el.textContent = 'Literary Coordinates';
          if (el.textContent.includes('热门打榜')) el.textContent = 'Hot Rankings';
          if (el.textContent.includes('我的文学徽章')) el.textContent = 'My Literary Badges';
          if (el.textContent.includes('我的行程')) el.textContent = 'My Itinerary';
          if (el.textContent.includes('我的巡礼足迹')) el.textContent = 'My Pilgrimage';
          if (el.textContent.includes('文明社区')) el.textContent = 'Community';
          if (el.textContent.includes('文学地图')) el.textContent = 'Literary Map';
          if (el.textContent.includes('我的足迹邮集')) el.textContent = 'My Stamp Collection';
          if (el.textContent.includes('创作者成长体系')) el.textContent = 'Creator Growth System';
        });
      } else {
        location.reload();
      }
    }

    // Geo location detection (simulated)
    function detectGeoLocation() {
      const geoBanner = document.getElementById('geoBanner');
      const regions = [
        { name: '中国 · 鲁迅故里绍兴', content: '正在为您推荐：中国 · 鲁迅故里绍兴 | 探索附近的文学坐标' },
        { name: 'Switzerland · Davos', content: '📍 Currently showing: The Magic Mountain, Davos | Explore literary coordinates nearby' },
        { name: 'Austria · Vienna', content: '📍 Currently showing: Vienna - City of Music | Stefan Zweig\'s homeland' },
        { name: 'Italy · Rome', content: '📍 Currently showing: Rome - The Eternal City | Virgil\'s legacy' }
      ];
      
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      geoBanner.textContent = randomRegion.content;
    }

    // Supplier dashboard
    function openSupplierDashboard() {
      const modal = document.getElementById('cardModal');
      document.getElementById('modalTitle').textContent = '🏪 供应商入驻仪表盘';
      document.getElementById('modalBody').innerHTML = \`
        <div style="padding:1rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div style="padding:1rem;background:rgba(201,168,76,0.2);border-radius:8px;text-align:center;">
              <div style="font-size:1.5rem;color:var(--gold);font-weight:bold;">1,247</div>
              <div style="font-size:0.7rem;color:var(--paper);opacity:0.7;">本月浏览量</div>
            </div>
            <div style="padding:1rem;background:rgba(122,140,110,0.2);border-radius:8px;text-align:center;">
              <div style="font-size:1.5rem;color:var(--sage);font-weight:bold;">89</div>
              <div style="font-size:0.7rem;color:var(--paper);opacity:0.7;">订单转化</div>
            </div>
          </div>
          
          <h4 style="color:var(--gold);margin-bottom:0.75rem;font-size:0.85rem;">📈 热门文学卡片</h4>
          <div style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;padding:0.75rem;background:rgba(45,45,68,0.5);border-radius:6px;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;">《魔山》达沃斯疗养院</span>
              <span style="font-size:0.75rem;color:var(--gold);">+42% 转化</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.75rem;background:rgba(45,45,68,0.5);border-radius:6px;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;">鲁迅故里绍兴</span>
              <span style="font-size:0.75rem;color:var(--gold);">+28% 转化</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.75rem;background:rgba(45,45,68,0.5);border-radius:6px;">
              <span style="font-size:0.8rem;">维也纳茨威格故居</span>
              <span style="font-size:0.75rem;color:var(--gold);">+15% 转化</span>
            </div>
          </div>
          
          <h4 style="color:var(--gold);margin-bottom:0.75rem;font-size:0.85rem;">💰 收益概览</h4>
          <div style="padding:1rem;background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(139,69,19,0.1));border-radius:8px;border:1px solid var(--gold);">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;">本月收益</span>
              <span style="font-size:1rem;color:var(--gold);font-weight:bold;">¥ 3,280</span>
            </div>
            <div style="font-size:0.65rem;color:var(--paper);opacity:0.6;">创作者分润: ¥ 984 (30%)</div>
          </div>
          
          <button onclick="alert('联系平台入驻更多服务')" class="btn-plan-route" style="width:100%;margin-top:1rem;background:var(--sage);">
            联系平台签约更多卡片
          </button>
        </div>
      \`;
      modal.classList.add('open');
    }

    // Enhanced ranking algorithm
    function calculateRankingScore(likes, votes, shares, isNew = false, createdAt = null) {
      const now = Date.now();
      const createdTime = createdAt || now;
      const ageHours = (now - createdTime) / (1000 * 60 * 60);
      
      let score = (likes * 0.3) + (votes * 0.5) + (shares * 0.2);
      
      if (isNew && ageHours < 72) {
        const newBonus = Math.max(0, 1 - (ageHours / 72));
        score = score * (1 + newBonus);
      }
      
      return Math.round(score);
    }

    // Card serial number generator
    function generateCardSerial(cardId, author) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const authorCode = author.substring(0, 2).toUpperCase();
      const cardCode = cardId.split('-')[1].padStart(3, '0');
      return \`LF-\${authorCode}-\${cardCode}-\${timestamp.substring(0, 6)}\`;
    }

    // Backend API integration
    const BACKEND = {
      local: {
        search: 'http://localhost:8000',
        payment: 'http://localhost:8002',
        b2b: 'http://localhost:8003'
      },
      cloudflare: {
        search: 'https://literary-footprints-api.moophier.workers.dev',
        payment: 'https://literary-footprints-api.moophier.workers.dev',
        b2b: 'https://literary-footprints-api.moophier.workers.dev',
        worker: 'https://literary-footprints-api.moophier.workers.dev'
      }
    };

    function getApiMode() {
      return localStorage.getItem('api_mode') || 'mock';
    }

    function getBaseUrl() {
      const mode = getApiMode();
      if (mode === 'cloudflare') return BACKEND.cloudflare.worker;
      if (mode === 'api') return BACKEND.local.search;
      return null;
    }

    async function apiFetch(endpoint, options = {}) {
      const mode = getApiMode();
      if (mode === 'mock') return null;

      const base = getBaseUrl();
      try {
        const res = await fetch(\`\${base}\${endpoint}\`, {
          ...options,
          headers: { 'Content-Type': 'application/json', ...options.headers }
        });
        if (!res.ok) throw new Error(\`API error: \${res.status}\`);
        return await res.json();
      } catch (e) {
        console.warn('API request failed, falling back to mock:', e.message);
        return null;
      }
    }

    async function searchLiteraryPlaces(query) {
      const mode = getApiMode();
      if (mode === 'mock') {
        return allCards.filter(c => 
          c.location.toLowerCase().includes(query.toLowerCase()) ||
          c.author.toLowerCase().includes(query.toLowerCase())
        );
      }
      const data = await apiFetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
      if (data?.results) return data.results;
      return allCards.filter(c => c.location.toLowerCase().includes(query.toLowerCase()));
    }

    async function fetchB2BHeatmap(lat = 46.8, lng = 9.82) {
      const data = await apiFetch(\`/api/heatmap?lat=\${lat}&lng=\${lng}&radius=10\`);
      if (data?.points) return data;
      return { points: [] };
    }

    // Lazy load images
    function lazyLoadImages() {
      if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imgObserver.unobserve(img);
            }
          });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
      }
    }

    // Loading state
    function showLoading(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '<div class="skeleton skeleton-card"></div>'.repeat(3);
    }

    function hideLoading(containerId, content) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = content;
    }

    window.renderStampCollection = renderStampCollection;
    window.toggleCardFlip = toggleCardFlip;
    window.setLanguage = setLanguage;
    window.isPilgrimCreator = isPilgrimCreator;
    window.getTravelVerificationCount = getTravelVerificationCount;
    // Serial number popup
    function showSerialPopup(serialCode) {
      document.getElementById('serialCodeDisplay').textContent = serialCode;
      document.getElementById('serialOverlay').classList.add('show');
      document.getElementById('serialPopup').classList.add('show');
    }

    function closeSerialPopup() {
      document.getElementById('serialOverlay').classList.remove('show');
      document.getElementById('serialPopup').classList.remove('show');
    }

    // Partner claim
    function openPartnerClaim() {
      const modal = document.getElementById('cardModal');
      document.getElementById('modalTitle').textContent = '🔗 供应商资源认领';
      document.getElementById('modalBody').innerHTML = \`
        <div style="padding:1rem;">
          <p style="font-size:0.8rem;color:var(--paper);opacity:0.7;margin-bottom:1.5rem;">
            热门文学卡片带火了您的服务？认领资源，绑定您的民宿/导览/餐饮至卡片详情页
          </p>
          
          <h4 style="color:var(--gold);margin-bottom:0.75rem;font-size:0.85rem;">🔥 热门卡片</h4>
          <div style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;padding:0.75rem;background:rgba(45,45,68,0.5);border-radius:6px;margin-bottom:0.5rem;align-items:center;">
              <div>
                <div style="font-size:0.8rem;">《魔山》达沃斯疗养院</div>
                <div style="font-size:0.65rem;color:var(--sage);">潜在流量: 1,247/月</div>
              </div>
              <button style="padding:0.3rem 0.75rem;background:var(--gold);border:none;border-radius:4px;font-size:0.65rem;cursor:pointer;">认领</button>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.75rem;background:rgba(45,45,68,0.5);border-radius:6px;margin-bottom:0.5rem;align-items:center;">
              <div>
                <div style="font-size:0.8rem;">鲁迅故里绍兴</div>
                <div style="font-size:0.65rem;color:var(--sage);">潜在流量: 892/月</div>
              </div>
              <button style="padding:0.3rem 0.75rem;background:var(--gold);border:none;border-radius:4px;font-size:0.65rem;cursor:pointer;">认领</button>
            </div>
          </div>
          
          <div style="padding:1rem;background:rgba(201,168,76,0.1);border-radius:8px;border:1px dashed var(--gold);">
            <div style="font-size:0.75rem;color:var(--gold);margin-bottom:0.5rem;">💡 认领权益</div>
            <ul style="font-size:0.65rem;color:var(--paper);opacity:0.7;padding-left:1rem;">
              <li>卡片详情页展示您的服务</li>
              <li>获得创作者分润资格</li>
              <li>加入"文学之旅"推荐列表</li>
            </ul>
          </div>
          
          <button onclick="alert('请先注册成为供应商合作伙伴')" class="btn-plan-route" style="width:100%;margin-top:1rem;">
            注册成为合作伙伴
          </button>
        </div>
      \`;
      modal.classList.add('open');
    }

    // Context language toggle
    function toggleContextLang(cardId, mode) {
      const card = allCards.find(c => c.id === cardId);
      if (!card) return;
      
      const descriptions = {
        zh: card.desc,
        en: card.location + ' - ' + card.work + ' by ' + card.author
      };
      
      alert(\`语言切换: \${mode === 'zh' ? '中文原文' : 'English Translation'}\n\n\${descriptions[mode]}\`);
    }

    // Commission flow calculation
    function calculateCommission(orderAmount, creatorShare = 0.3, platformFee = 0.1) {
      const platformRevenue = orderAmount * platformFee;
      const creatorRevenue = orderAmount * creatorShare;
      const supplierRevenue = orderAmount * (1 - platformFee - creatorShare);
      
      return {
        platform: platformRevenue,
        creator: creatorRevenue,
        supplier: supplierRevenue,
        total: orderAmount
      };
    }

    // Show commission flow
    function showCommissionFlow(amount) {
      const commission = calculateCommission(amount);
      const flowHtml = \`
        <div class="commission-flow">
          <div class="commission-node">
            <div class="icon">👤</div>
            <div class="label">用户</div>
            <div class="amount">¥\${amount}</div>
          </div>
          <div class="commission-arrow">→</div>
          <div class="commission-node">
            <div class="icon">🏪</div>
            <div class="label">供应商</div>
            <div class="amount">¥\${commission.supplier.toFixed(0)}</div>
          </div>
          <div class="commission-arrow">→</div>
          <div class="commission-node">
            <div class="icon">📊</div>
            <div class="label">平台</div>
            <div class="amount">¥\${commission.platform.toFixed(0)}</div>
          </div>
          <div class="commission-arrow">→</div>
          <div class="commission-node">
            <div class="icon">✍️</div>
            <div class="label">创作者</div>
            <div class="amount">¥\${commission.creator.toFixed(0)}</div>
          </div>
        </div>
      \`;
      
      alert(\`订单金额: ¥\${amount}\n\n佣金分配:\n- 平台: ¥\${commission.platform.toFixed(0)} (10%)\n- 创作者: ¥\${commission.creator.toFixed(0)} (30%)\n- 供应商: ¥\${commission.supplier.toFixed(0)} (60%)\`);
    }

    window.openSupplierDashboard = openSupplierDashboard;
    window.showSerialPopup = showSerialPopup;
    window.closeSerialPopup = closeSerialPopup;
    window.openPartnerClaim = openPartnerClaim;
    window.toggleContextLang = toggleContextLang;
    window.showCommissionFlow = showCommissionFlow;

    // Animations
    function observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }

    // Init
    renderCards();
    renderRankings();
    renderBadges();
    updateItineraryCount();
    renderMapMarkers();
    renderJourney();
    renderSocialFeed();
    renderStampCollection();
    detectGeoLocation();
    observeElements();
    lazyLoadImages();
    // Switch to live API: localStorage.setItem('api_mode', 'api')
  </script>
</body>
</html>`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS_HEADERS });
}

function getPath(url) {
  return new URL(url).pathname;
}

function getQuery(url) {
  return Object.fromEntries(new URL(url).searchParams.entries());
}

function getBody(request) {
  return request.json().catch(() => null);
}

// Routes
async function handleRequest(request, env) {
  const url = request.url;
  const path = getPath(url);
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // Root - API documentation page
  if (path === '/') {
    return new Response(ROOT_HTML, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
  }

  // Health
  if (path === '/api/health') {
    return json({ status: 'ok', service: 'literary-footprints', version: '1.0.0', endpoints: ['/api/health', '/api/search', '/api/site/:id', '/api/recommend', '/api/heatmap', '/api/commission', '/api/translate'] });
  }

  // Search
  if (path === '/api/search' && method === 'GET') {
    const q = getQuery(url).q?.toLowerCase() || '';
    const type = getQuery(url).type || 'all';

    let results = [...SITES];
    if (q) {
      results = results.filter(s =>
        s.location.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.cnAuthor.includes(q) ||
        s.work.toLowerCase().includes(q)
      );
    }
    if (type !== 'all') results = results.filter(s => s.type === type);

    return json({ count: results.length, results });
  }

  // Get single site
  if (path.startsWith('/api/site/') && method === 'GET') {
    const id = path.split('/').pop();
    const site = SITES.find(s => s.id === id);
    if (!site) return json({ error: 'Not found' }, 404);
    return json(site);
  }

  // Recommend
  if (path === '/api/recommend' && method === 'GET') {
    const q = getQuery(url);
    const lat = parseFloat(q.lat || '35');
    const lng = parseFloat(q.lng || '139');
    const scored = SITES.map(s => ({ ...s, distance: Math.hypot(s.lat - lat, s.lng - lng) }))
      .sort((a, b) => a.distance - b.distance);
    return json({ nearby: scored.slice(0, 5), total: SITES.length });
  }

  // Heatmap (B2B)
  if (path === '/api/heatmap' && method === 'GET') {
    const q = getQuery(url);
    const lat = parseFloat(q.lat || '35');
    const lng = parseFloat(q.lng || '139');
    const radius = parseFloat(q.radius || '5');

    const points = SITES.map(s => {
      const dist = Math.hypot(s.lat - lat, s.lng - lng);
      if (dist > radius) return null;
      return { id: s.id, emoji: s.emoji, lat: s.lat, lng: s.lng, heat: Math.round((1 - dist / radius) * 100) / 100, name: s.location };
    }).filter(Boolean);

    return json({ center: { lat, lng }, radius, points, blankAreas: [] });
  }

  // Commission
  if (path === '/api/commission' && method === 'POST') {
    const body = await getBody(request);
    if (!body?.orderAmount || !body?.referralId) {
      return json({ error: 'Missing orderAmount or referralId' }, 400);
    }
    const { orderAmount, referralId, creatorShare = 0.3, platformFee = 0.1 } = body;
    return json({
      orderAmount,
      platform: Math.round(orderAmount * platformFee * 100) / 100,
      creator: Math.round(orderAmount * creatorShare * 100) / 100,
      supplier: Math.round(orderAmount * (1 - platformFee - creatorShare) * 100) / 100,
      referralId
    });
  }

  // D1: User get
  if (path.startsWith('/api/user/') && method === 'GET' && !path.includes('/visit')) {
    const id = path.split('/').pop();
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const { results } = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).all();
    if (results.length === 0) return json({ error: 'User not found' }, 404);
    return json(results[0]);
  }

  // D1: User visit
  if (path.startsWith('/api/user/') && path.endsWith('/visit') && method === 'POST') {
    const id = path.split('/')[3];
    const body = await getBody(request);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    await env.DB.prepare("INSERT OR REPLACE INTO visits (user_id, site_id, visited_at) VALUES (?, ?, datetime('now'))")
      .bind(id, body?.siteId).run();
    return json({ status: 'visited', user: id, site: body?.siteId });
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};
