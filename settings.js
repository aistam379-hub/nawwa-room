// ========== Nawwa Room: الإعدادات ==========

function saveName() {
  const newName = $('en-name').value.trim();
  if (!newName) return showToast('أدخل اسمًا صحيحًا');

  const users = getStore(STORE_KEYS.USERS, []);
  const u = users.find(x => x.id === currentUser.id);
  if (u) { u.name = newName; setStore(STORE_KEYS.USERS, users); }

  currentUser.name = newName;
  setStore(STORE_KEYS.SESSION, currentUser);
  closeModalById('mo-ename');
  updateUI();
  showToast('تم تحديث الاسم ✓');
}

function saveEmail() {
  const newEmail = $('eu-email').value.trim();
  if (!newEmail) return showToast('أدخل بريدًا صحيحًا');

  const users = getStore(STORE_KEYS.USERS, []);
  if (users.some(u => u.email === newEmail && u.id !== currentUser.id)) {
    return showToast('هذا البريد مستخدم من حساب آخر');
  }
  const u = users.find(x => x.id === currentUser.id);
  if (u) { u.email = newEmail; setStore(STORE_KEYS.USERS, users); }

  currentUser.email = newEmail;
  setStore(STORE_KEYS.SESSION, currentUser);
  closeModalById('mo-euser');
  updateUI();
  showToast('تم تحديث البريد الإلكتروني ✓');
}

function savePassword() {
  const newPass = $('ep-new').value;
  if (newPass.length < 8) return showToast('كلمة المرور قصيرة (8 أحرف على الأقل)');

  const users = getStore(STORE_KEYS.USERS, []);
  const u = users.find(x => x.id === currentUser.id);
  if (u) { u.password = newPass; setStore(STORE_KEYS.USERS, users); }

  $('ep-new').value = '';
  closeModalById('mo-epass');
  showToast('تم تحديث كلمة المرور ✓');
}

function handleAvatar() {
  // ميزة رفع الصور غير مدعومة بهذا الإصدار (تخزين محلي فقط بدون سيرفر ملفات)
  showToast('رفع الصورة الشخصية غير مدعوم بهذا الإصدار حاليًا');
}
