const STORAGE_KEY = 'shortUrls';

export function saveShortUrl(data) {
  const db = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  db[data.shortCode] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function getShortUrl(code) {
  const db = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return db[code] || null;
}

export function getAllShortUrls() {
  const db = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return Object.values(db);
}

export function logClick(code, clickData) {
  const db = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (db[code]) {
    db[code].clicks = db[code].clicks || [];
    db[code].clicks.push(clickData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}
