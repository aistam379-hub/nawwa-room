// ========== Nawwa Room: طبقة التخزين المحلي (localStorage) ==========
// كل بيانات التطبيق محفوظة محليًا بالمتصفح. لا يوجد اتصال بأي سيرفر خارجي.

const STORE_KEYS = {
  USERS: 'nawwa_users',
  SESSION: 'nawwa_session',
  ROOMS: 'nawwa_rooms',
  TASKS: 'nawwa_tasks',
  CHATS: 'nawwa_chats'
};

function getStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('فشل قراءة', key, e);
    return fallback;
  }
}

function setStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('فشل حفظ', key, e);
    return false;
  }
}

function uid(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}
