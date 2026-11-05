(() => {
  const pages = [
    ['मुख्यपृष्ठ','index.html'],['आमच्याबद्दल','about.html'],['उद्दिष्टे','objectives.html'],['नेतृत्व','leadership.html'],['बातम्या','news.html'],['फोटो गॅलरी','gallery.html'],['पदाधिकारी','officers.html'],['महत्त्वाचे GR','documents.html'],['सदस्यत्व','membership.html'],['संपर्क','contact.html']
  ]
  const labels = { '/':'मुख्यपृष्ठ','/index.html':'मुख्यपृष्ठ','/about.html':'आमच्याबद्दल','/objectives.html':'उद्दिष्टे','/leadership.html':'नेतृत्व','/news.html':'बातम्या','/gallery.html':'फोटो गॅलरी','/officers.html':'पदाधिकारी','/documents.html':'महत्त्वाचे GR','/membership.html':'सदस्यत्व','/contact.html':'संपर्क' }
  const run = () => {
    const existing = document.querySelector('.public-header, #app > div > header, body > header:not(#adminHeader)')
    if (!existing || document.querySelector('.universal-site-header')) return
    const current = labels[location.pathname.replace(/\/+/g,'/')] || document.title.split('|')[0].trim() || 'पृष्ठ'
    const links = pages.map(([label, href]) => `<a href="${href}" ${label === current ? 'aria-current="page"' : ''}>${label}</a>`).join('')
    const shell = document.createElement('div')
    shell.innerHTML = `<header class="universal-site-header"><div class="universal-nav-inner"><a class="universal-brand" href="index.html"><span class="universal-brand-text">महाराष्ट्र राज्य केंद्रप्रमुख व अधिकारी महासंघ<span class="universal-brand-sub">संघटन · सन्मान · समर्पण · शैक्षणिक गुणवत्ता</span></span></a><button class="universal-menu-trigger" type="button" aria-label="मुख्य menu उघडा" aria-expanded="false"><span class="universal-menu-lines" aria-hidden="true"><i></i><i></i><i></i></span></button></div></header><nav class="universal-breadcrumb" aria-label="Breadcrumb"><a href="index.html">मुख्यपृष्ठ</a><span aria-hidden="true"> / </span><strong>${current}</strong></nav><aside class="universal-menu-panel" aria-label="मुख्य menu"><button class="universal-menu-close" type="button" aria-label="Menu बंद करा">×</button><h2>मुख्य menu</h2>${links}</aside>`
    const header = shell.querySelector('.universal-site-header')
    const breadcrumb = shell.querySelector('.universal-breadcrumb')
    const panel = shell.querySelector('.universal-menu-panel')
    existing.replaceWith(header)
    document.body.insertBefore(breadcrumb, document.body.children[1] || null)
    document.body.append(panel)
    const trigger = document.querySelector('.universal-menu-trigger')
    const close = panel.querySelector('.universal-menu-close')
    const setOpen = open => { panel.classList.toggle('open',open);trigger.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'' }
    trigger.addEventListener('click', () => setOpen(true)); close.addEventListener('click', () => setOpen(false)); panel.addEventListener('click', event => { if(event.target===panel) setOpen(false) });setTimeout(()=>{document.querySelectorAll('#app section, #app article').forEach(block=>{const meaningful=[...block.querySelectorAll('h1,h2,h3,h4,p,a,img,button')].some(node=>node.textContent.trim()||node.tagName==='IMG');if(!meaningful&&!block.querySelector('form'))block.remove()})},700)
  }
  if (document.readyState === 'complete') run(); else window.addEventListener('load', run, { once:true })
})()
