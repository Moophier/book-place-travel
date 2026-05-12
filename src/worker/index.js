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

  // Health
  if (path === '/api/health') {
    return json({ status: 'ok', service: 'literary-footprints' });
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
