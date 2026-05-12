// Main Worker Router for Literary Footprints API
// Handles search, payment, B2B heatmap, and AI translation

import { Router } from 'itty-router';

const router = Router();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: corsHeaders
  });
}

// ==========================================
// Heritage / Literary Sites Data
// ==========================================
const SITES = [
  { id: 'heritage-1', type: 'heritage', author: 'Thomas Mann', cnAuthor: '托马斯·曼', work: 'The Magic Mountain', cnWork: '《魔山》', location: 'Davos, Switzerland', cnLocation: '瑞士达沃斯', emoji: '🏔️', stamp: '文学', quote: 'Time is a doctor who heals all wounds.', desc: '汉斯·卡斯托普入住的疗养院，七年如七日。', atmosphere: ['lonely', 'mystical', 'contemplative'], lat: 46.8011, lng: 9.8227 },
  { id: 'heritage-2', type: 'heritage', author: 'Stefan Zweig', cnAuthor: '茨威格', work: 'The World of Yesterday', cnWork: '《昨日的世界》', location: 'Vienna, Austria', cnLocation: '奥地利维也纳', emoji: '🏛️', stamp: '美好年代', quote: 'I was born in Vienna, a city of music and tragedy.', desc: '茨威格笔下的维也纳，美好年代的精神家园。', atmosphere: ['nostalgic', 'romantic', 'historical'], lat: 48.2082, lng: 16.3738 },
  { id: 'heritage-3', type: 'heritage', author: 'Virgil', cnAuthor: '维吉尔', work: 'Aeneid', cnWork: '《埃涅阿斯纪》', location: 'Rome, Italy', cnLocation: '意大利罗马', emoji: '🏛️', stamp: '古罗马', quote: 'Arms and the man I sing.', desc: '罗马帝国的精神源头。', atmosphere: ['historical', 'desolate', 'mystical'], lat: 41.9028, lng: 12.4964 },
  { id: 'heritage-4', type: 'heritage', author: 'Wang Wei', cnAuthor: '王维', work: 'Mountain Dwelling', cnWork: '《山居秋暝》', location: "Xi'an, China", cnLocation: '中国西安', emoji: '🏯', stamp: '唐诗', quote: '明月松间照，清泉石上流。', desc: '王维辋川别业。', atmosphere: ['healing', 'contemplative', 'nostalgic'], lat: 34.3416, lng: 108.9398 },
  { id: 'heritage-5', type: 'heritage', author: 'Lu Xun', cnAuthor: '鲁迅', work: 'Hometown', cnWork: '《故乡》', location: 'Shaoxing, China', cnLocation: '中国绍兴', emoji: '🏯', stamp: '经典', quote: '希望是本无所谓有，无所谓无的。', desc: '鲁迅故里，水乡绍兴。', atmosphere: ['nostalgic', 'historical', 'lonely'], lat: 29.9961, lng: 120.5811 },
  { id: 'literary-1', type: 'literary', author: 'Thomas Mann', cnAuthor: '托马斯·曼', work: 'The Magic Mountain', cnWork: '《魔山》', location: 'Berghof Sanatorium', cnLocation: '贝尔格霍夫疗养院', emoji: '🏨', stamp: '疗养院', quote: 'We went up to the mountain.', desc: '山中疗养院，时间的监狱。', atmosphere: ['lonely', 'mystical', 'contemplative'], lat: 46.7931, lng: 9.8282 },
  { id: 'literary-5', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Kichijoji, Tokyo', cnLocation: '东京吉祥寺', emoji: '🎸', stamp: '青春', quote: '每个人都有属于自己的一片森林。', desc: '渡边与直子相遇的井之头公园。', atmosphere: ['nostalgic', 'lonely', 'romantic'], lat: 35.7005, lng: 139.5789 },
  { id: 'literary-6', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Aoyama Cemetery, Tokyo', cnLocation: '东京青山墓地', emoji: '🌿', stamp: '生死', quote: '死并不是生的对立面。', desc: '直子常提起的墓地。', atmosphere: ['contemplative', 'mystical', 'lonely'], lat: 35.6654, lng: 139.7221 },
  { id: 'literary-7', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Yoshino, Nara', cnLocation: '奈良吉野', emoji: '🌸', stamp: '回忆', quote: '记忆就像那场大雪。', desc: '直子疗养的深山。', atmosphere: ['healing', 'nostalgic', 'desolate'], lat: 34.3961, lng: 135.8534 },
  { id: 'literary-8', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Waseda University', cnLocation: '早稻田大学', emoji: '📚', stamp: '原点', quote: '我在混沌中寻找位置。', desc: '渡边的大学生活。', atmosphere: ['romantic', 'nostalgic', 'healing'], lat: 35.7071, lng: 139.7189 },
  { id: 'literary-9', type: 'literary', author: 'Haruki Murakami', cnAuthor: '村上春树', work: 'Norwegian Wood', cnWork: '《挪威的森林》', location: 'Mitaka, Tokyo', cnLocation: '东京三鹰', emoji: '🎶', stamp: '音乐', quote: '挪威的森林，让人落泪。', desc: '渡边听Norwegian Wood的公寓。', atmosphere: ['lonely', 'nostalgic', 'contemplative'], lat: 35.6950, lng: 139.5561 }
];

// ==========================================
// Routes
// ==========================================

// Health check
router.get('/api/health', () => json({ status: 'ok', service: 'literary-footprints', version: '1.0.0' }));

// Search API (replaces port 8000)
router.get('/api/search', async (request) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.toLowerCase() || '';
  const type = url.searchParams.get('type') || 'all';
  const atmosphere = url.searchParams.get('atmosphere') || '';
  const era = url.searchParams.get('era') || '';

  let results = [...SITES];

  if (q) {
    results = results.filter(s =>
      s.location.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.cnAuthor.includes(q) ||
      s.work.toLowerCase().includes(q)
    );
  }

  if (type !== 'all') {
    results = results.filter(s => s.type === type);
  }

  if (atmosphere) {
    results = results.filter(s => s.atmosphere?.includes(atmosphere));
  }

  return json({ count: results.length, results });
});

// Get single site
router.get('/api/site/:id', (request) => {
  const { id } = request.params;
  const site = SITES.find(s => s.id === id);
  if (!site) return json({ error: 'Site not found' }, 404);
  return json(site);
});

// Geo-recommendation API (location-based)
router.get('/api/recommend', (request) => {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat') || '35');
  const lng = parseFloat(url.searchParams.get('lng') || '139');

  const scored = SITES.map(s => {
    const dist = Math.sqrt(Math.pow(s.lat - lat, 2) + Math.pow(s.lng - lng, 2));
    return { ...s, distance: dist };
  }).sort((a, b) => a.distance - b.distance);

  return json({ nearby: scored.slice(0, 5), total: SITES.length });
});

// B2B Heatmap API (replaces port 8003)
router.get('/api/heatmap', (request) => {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get('lat') || '35');
  const lng = parseFloat(url.searchParams.get('lng') || '139');
  const radius = parseFloat(url.searchParams.get('radius') || '5');

  const nearby = SITES.map(s => {
    const dist = Math.sqrt(Math.pow(s.lat - lat, 2) + Math.pow(s.lng - lng, 2));
    return { ...s, distance: dist, heat: Math.max(0, 1 - dist / radius) };
  }).filter(s => s.heat > 0);

  return json({
    center: { lat, lng },
    radius,
    points: nearby.map(s => ({
      id: s.id, emoji: s.emoji, lat: s.lat, lng: s.lng,
      heat: Math.round(s.heat * 100) / 100,
      name: s.location
    })),
    blankAreas: [] // Future: H3 hexagon blank detection
  });
});

// Payment / Commission API (replaces port 8002)
router.post('/api/commission', async (request) => {
  try {
    const body = await request.json();
    const { orderAmount, referralId, creatorShare = 0.3, platformFee = 0.1 } = body;

    if (!orderAmount || !referralId) {
      return json({ error: 'Missing orderAmount or referralId' }, 400);
    }

    const commission = {
      orderAmount,
      platform: Math.round(orderAmount * platformFee * 100) / 100,
      creator: Math.round(orderAmount * creatorShare * 100) / 100,
      supplier: Math.round(orderAmount * (1 - platformFee - creatorShare) * 100) / 100,
      referralId
    };

    // In production: store commission in D1
    // await env.DB.prepare('INSERT INTO commissions ...').bind(...).run();

    return json(commission);
  } catch (e) {
    return json({ error: 'Invalid request body' }, 400);
  }
});

// AI Translation API (using Cloudflare AI Workers)
router.post('/api/translate', async (request, env) => {
  try {
    const body = await request.json();
    const { text, from = 'zh', to = 'en' } = body;

    if (!text) return json({ error: 'Missing text' }, 400);

    // Use Cloudflare AI for literary translation
    const messages = [
      { role: 'system', content: 'You are a literary translator. Translate the following Chinese text to English, preserving the poetic and literary quality. Output ONLY the translation, no explanation.' },
      { role: 'user', content: text }
    ];

    if (env.AI) {
      const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', { messages });
      return json({ original: text, translation: aiResponse.response, model: 'llama-3.1-8b' });
    }

    // Fallback mock translation
    return json({ original: text, translation: `[Literary translation of: ${text}]`, model: 'mock' });
  } catch (e) {
    return json({ error: 'Translation failed', detail: e.message }, 500);
  }
});

// User endpoints (D1)
router.get('/api/user/:id', async (request, env) => {
  if (!env.DB) return json({ error: 'D1 not available' }, 503);

  const { id } = request.params;
  const { results } = await env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(id).all();

  if (results.length === 0) return json({ error: 'User not found' }, 404);
  return json(results[0]);
});

router.post('/api/user/:id/visit', async (request, env) => {
  if (!env.DB) return json({ error: 'D1 not available' }, 503);

  try {
    const body = await request.json();
    const { siteId } = body;
    const { id } = request.params;

    await env.DB.prepare(
      'INSERT OR REPLACE INTO visits (user_id, site_id, visited_at) VALUES (?, ?, datetime("now"))'
    ).bind(id, siteId).run();

    return json({ status: 'visited', user: id, site: siteId });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

// 404
router.all('*', () => json({ error: 'Not found' }, 404));

// ==========================================
// Export
// ==========================================
export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    return router.handle(request, env, ctx);
  }
};
