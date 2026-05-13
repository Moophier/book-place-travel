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
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>文迹 Literary Footprints - API</title>
<style>
  body{background:#0f0f1a;color:#f5f0e8;font-family:'Noto Serif SC',serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:2rem}
  .container{max-width:600px;text-align:center}
  h1{font-size:2rem;background:linear-gradient(135deg,#e8d5a3,#c9a84c,#c47d3a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:1rem}
  p{color:rgba(245,240,232,0.6);line-height:1.8;margin-bottom:1.5rem}
  .endpoints{text-align:left;font-size:0.8rem;background:rgba(45,45,68,0.5);border-radius:12px;padding:1.5rem;border:1px solid rgba(201,168,76,0.2)}
  .endpoints code{display:block;color:#c9a84c;margin-bottom:0.5rem;font-family:monospace}
  .endpoints .desc{color:rgba(245,240,232,0.5);margin-bottom:1rem}
  .status{display:inline-block;padding:0.35rem 1rem;border-radius:50px;font-size:0.7rem;border:1px solid rgba(201,168,76,0.3);color:#c9a84c;margin-bottom:2rem}
  a{color:#c9a84c}
</style></head>
<body><div class="container">
  <h1>文迹 · Literary Footprints</h1>
  <div class="status">⚡ API Service Running</div>
  <p>文学坐标巡礼平台的后端API服务</p>
  <div class="endpoints">
    <strong style="color:#c9a84c;">可用接口</strong>
    <div style="margin-top:1rem">
      <code>GET /api/health</code><div class="desc">服务状态检查</div>
      <code>GET /api/search?q=鲁迅</code><div class="desc">文学坐标搜索</div>
      <code>GET /api/site/:id</code><div class="desc">单卡片详情</div>
      <code>GET /api/recommend?lat=35&lng=139</code><div class="desc">地理位置推荐</div>
      <code>GET /api/heatmap?lat=46.8&lng=9.82</code><div class="desc">B2B热力图</div>
      <code>POST /api/commission</code><div class="desc">分佣结算</div>
      <code>POST /api/translate</code><div class="desc">AI文学翻译</div>
    </div>
  </div>
  <p style="margin-top:1.5rem;font-size:0.7rem"><a href="https://literary-footprints.pages.dev">访问前端</a></p>
</div></body>
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

  // ── Auth: Register ──
  if (path === '/api/auth/register' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.username || !body.email) return json({ error: 'Need username and email' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const id = 'user_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const token = 'tok_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    try {
      await env.DB.prepare("INSERT INTO users (id, name, email, rank, created_at) VALUES (?, ?, ?, 'C', datetime('now'))").bind(id, body.username, body.email).run();
      return json({ id, name: body.username, email: body.email, token, rank: 'C' });
    } catch (e) {
      if (e.message?.includes('UNIQUE')) return json({ error: 'Email already registered' }, 409);
      return json({ error: e.message }, 500);
    }
  }

  // ── Auth: Login ──
  if (path === '/api/auth/login' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.email) return json({ error: 'Need email' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const { results } = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(body.email).all();
    if (results.length === 0) return json({ error: 'User not found. Please register first.' }, 404);
    const u = results[0];
    return json({ id: u.id, name: u.name, email: u.email, rank: u.rank });
  }

  // ── User Profile ──
  if (path === '/api/user/profile' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.id) return json({ error: 'Need user id' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const { results: userRows } = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(body.id).all();
    if (userRows.length === 0) return json({ error: 'User not found' }, 404);
    const u = userRows[0];
    const { results: visitRows } = await env.DB.prepare('SELECT COUNT(*) as c FROM visits WHERE user_id = ?').bind(body.id).all();
    const { results: badgeRows } = await env.DB.prepare('SELECT badge_type FROM badges WHERE user_id = ?').bind(body.id).all();
    return json({ ...u, visits: visitRows[0]?.c || 0, badges: badgeRows.map(b => b.badge_type) });
  }

  // ── Design.md Subscribe ──
  if (path === '/api/subscribe' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.userId) return json({ error: 'Need userId' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    await env.DB.prepare("UPDATE users SET rank = 'B', updated_at = datetime('now') WHERE id = ?").bind(body.userId).run();
    await env.DB.prepare("INSERT INTO badges (user_id, badge_type) VALUES (?, 'design_md')").bind(body.userId).run().catch(() => {});
    return json({ status: 'subscribed', rank: 'B', message: 'Design.md 订阅成功！你现在可以创作卡片了。' });
  }

  // ── User Visit ──
  if (path === '/api/user/visit' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.userId || !body.siteId) return json({ error: 'Need userId and siteId' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    await env.DB.prepare("INSERT INTO visits (user_id, site_id, visited_at) VALUES (?, ?, datetime('now'))").bind(body.userId, body.siteId).run();
    const { results } = await env.DB.prepare('SELECT COUNT(*) as c FROM visits WHERE user_id = ?').bind(body.userId).all();
    return json({ status: 'visited', totalVisits: results[0]?.c || 1 });
  }

  // ── Partner Apply ──
  if (path === '/api/partner/apply' && method === 'POST') {
    const body = await getBody(request);
    if (!body || !body.name || !body.email || !body.service) return json({ error: 'Need name, email, service' }, 400);
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const { results } = await env.DB.prepare("INSERT INTO partner_claims (partner_name, partner_email, site_id, service_type, status, claimed_at) VALUES (?, ?, ?, ?, 'pending', datetime('now')) RETURNING id")
      .bind(body.name, body.email, body.siteId || 'general', body.service).all();
    return json({ status: 'applied', id: results[0]?.id, message: '申请已提交，平台将在3个工作日内审核。' });
  }

  // ── Creator Stats ──
  if (path === '/api/creator/stats' && method === 'POST') {
    const body = await getBody(request);
    const userId = body?.userId || 'all';
    if (!env.DB) return json({ error: 'D1 not configured' }, 503);
    const { results: sites } = await env.DB.prepare('SELECT site_id, COUNT(*) as c FROM visits GROUP BY site_id ORDER BY c DESC LIMIT 5').all();
    const { results: totalVisits } = await env.DB.prepare('SELECT COUNT(*) as c FROM visits').all();
    const { results: totalUsers } = await env.DB.prepare('SELECT COUNT(*) as c FROM users').all();
    const { results: totalPartners } = await env.DB.prepare('SELECT COUNT(*) as c FROM partner_claims').all();
    return json({ totalVisits: totalVisits[0]?.c || 0, totalUsers: totalUsers[0]?.c || 0, totalPartners: totalPartners[0]?.c || 0, topSites: sites });
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};
