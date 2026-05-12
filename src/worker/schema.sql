-- D1 Database Schema for Literary Footprints

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  rank TEXT DEFAULT 'C',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  site_id TEXT NOT NULL,
  visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE TABLE IF NOT EXISTS itineraries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  site_id TEXT NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'planned',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  badge_type TEXT NOT NULL,
  unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS commissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT UNIQUE NOT NULL,
  order_amount REAL NOT NULL,
  platform_fee REAL NOT NULL,
  creator_share REAL NOT NULL,
  supplier_share REAL NOT NULL,
  referral_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partner_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  partner_name TEXT NOT NULL,
  partner_email TEXT NOT NULL,
  site_id TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visits_user ON visits(user_id);
CREATE INDEX IF NOT EXISTS idx_visits_site ON visits(site_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_user ON itineraries(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_badges_unique ON badges(user_id, badge_type);
