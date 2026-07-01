// ========== Nawwa Room: المصادقة المحلية (بدون Firebase) ==========

let currentUser = null; // { id, name, email, role: 'استاذ' | 'طالب' }

function showReg() {
  $('login-form').style.display = 'none';
  $('reg-form').style.display = 'block';
}
function showLogin() {
  $('reg-form').style.display = 'none';
  $('login-form').style.display = 'block';
}

function setLoginError(id, msg) {
  const el = $(id);
  el.textContent = msg;
  el.classList.add('show');
}
function clearLoginErrors() {
  document.querySelectorAll('.login-error').forEach(e => {
    e.classList.remove('show');
    e.textContent = '';
  });
}

function doLogin() {
  const email = $('li-email').value.trim();
  const pass = $('li-pass').value;
  clearLoginErrors();

  if (!email) return setLoginError('li-err-email', 'يرجى إدخال البريد الإلكتروني');
  if (!pass) return setLoginError('li-err-pass', 'يرجى إدخال كلمة المرور');

  const users = getStore(STORE_KEYS.USERS, []);
  const user = users.find(u => u.email === email);
  if (!user) return setLoginError('li-err-email', 'البريد الإلكتروني غير موجود');
  if (user.password !== pass) return setLoginError('li-err-pass', 'كلمة المرور غير صحيحة');

  currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  setStore(STORE_KEYS.SESSION, currentUser);
  launchApp();
}

function doRegister() {
  const name = $('rg-name').value.trim();
  const role = $('rg-role').value;
  const email = $('rg-email').value.trim();
  const pass = $('rg-pass').value;
  clearLoginErrors();

  if (!name) return setLoginError('rg-err-name', 'يرجى إدخال الاسم');
  if (!role) return setLoginError('rg-err-name', 'يرجى اختيار الدور (أستاذ أو طالب)');
  if (!email) return setLoginError('rg-err-email', 'يرجى إدخال البريد الإلكتروني');
  if (pass.length < 8) return setLoginError('rg-err-pass', 'كلمة المرور قصيرة (8 أحرف على الأقل)');

  const users = getStore(STORE_KEYS.USERS, []);
  if (users.some(u => u.email === email)) {
    return setLoginError('rg-err-email', 'البريد مستخدم بالفعل');
  }

  const newUser = { id: uid('user'), name, email, password: pass, role, createdAt: new Date().toISOString() };
  users.push(newUser);
  setStore(STORE_KEYS.USERS, users);

  currentUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  setStore(STORE_KEYS.SESSION, currentUser);
  showToast('تم إنشاء الحساب بنجاح 🎉');
  launchApp();
}

function doLogout() {
  currentUser = null;
  localStorage.removeItem(STORE_KEYS.SESSION);
  $('app').style.display = 'none';
  $('login-screen').style.display = 'flex';
  setPage('rooms');
  showToast('تم تسجيل الخروج');
}

function launchApp() {
  $('login-screen').style.display = 'none';
  $('app').style.display = 'block';
  initApp();
}

function tryRestoreSession() {
  const session = getStore(STORE_KEYS.SESSION, null);
  if (session) {
    currentUser = session;
    launchApp();
  }
}

function isTeacher() {
  return currentUser && currentUser.role === 'استاذ';
}
