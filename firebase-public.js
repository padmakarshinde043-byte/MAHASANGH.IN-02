const firebaseModules = await Promise.all([
  import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'),
  import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js')
])
const [{ initializeApp }, { getFirestore, collection, getDocs, query, orderBy, limit }] = firebaseModules
const config = await fetch('/api/firebase-config', { cache: 'no-store' }).then((response) => response.json())
const apps = {}
const db = (name) => {
  if (!apps[name]) apps[name] = getFirestore(initializeApp(config[name], `public-${name}`))
  return apps[name]
}
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char])
const formatDate = (timestamp) => timestamp?.toDate ? timestamp.toDate().toLocaleString('mr-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'नवीन अपडेट'

async function getRecords(project, name, count = 20) {
  try {
    const snapshot = await getDocs(query(collection(db(project), name), orderBy('createdAt', 'desc'), limit(count)))
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
  } catch (error) {
    console.error('[v0] Firebase public data load failed', { project, name, error })
    return []
  }
}

const renderNews = async () => {
  const target = document.querySelector('[data-firebase-news]')
  if (!target) return
  const records = await getRecords('news', 'news')
  if (!records.length) return
  target.innerHTML = records.map((item) => `<article class="news-card"><div class="news-date">${escapeHtml(formatDate(item.createdAt))}</div>${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.headline || 'बातमीचा फोटो')}" loading="lazy">` : ''}<h3>${escapeHtml(item.headline || 'बातमी')}</h3><p>${escapeHtml(item.body || '')}</p></article>`).join('')
}

const renderGallery = async () => {
  const target = document.querySelector('[data-firebase-gallery]')
  if (!target) return
  const records = await getRecords('gallery', 'gallery')
  if (!records.length) return
  target.innerHTML = records.map((item) => `<article class="gallery-card">${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.caption || 'फोटो')}" loading="lazy">` : ''}<h3>${escapeHtml(item.caption || 'फोटो')}</h3><p>${escapeHtml(item.description || '')}</p><small>${escapeHtml(formatDate(item.createdAt))}</small></article>`).join('')
}

await Promise.all([renderNews(), renderGallery()])
