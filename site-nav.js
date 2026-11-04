(() => {
  const links = [
    ['मुख्यपृष्ठ', '/index.html'],
    ['आमच्याबद्दल', '/about.html'],
    ['उद्दिष्टे', '/objectives.html'],
    ['नेतृत्व', '/leadership.html'],
    ['बातम्या', '/news.html'],
    ['फोटो गॅलरी', '/gallery.html'],
    ['पदाधिकारी', 'https://greetings.mahasangh.in'],
    ['महत्त्वाचे GR', '/documents.html'],
    ['सदस्यत्व', '/membership.html'],
    ['संपर्क करा', '/contact.html'],
  ]

  const current = `${location.pathname}${location.hash}`
  const markup = links
    .map(([label, href]) => {
      const isExternal = href.startsWith('http')
      const active = !isExternal && (current === href || current === href.replace('/index.html', '/'))
      return `<a href="${href}"${active ? ' class="active"' : ''}${isExternal ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`
    })
    .join('')

  function apply() {
    const publicHeader = document.querySelector('.public-header')
    if (publicHeader) {
      const brand = publicHeader.querySelector('.public-brand')
      publicHeader.innerHTML = `<div class="public-header-inner"><a class="public-brand" href="/index.html">${brand?.innerHTML || 'महाराष्ट्र राज्य महासंघ'}</a><button class="public-menu-button" type="button" aria-expanded="false" aria-controls="shared-public-nav">मेनू</button><nav id="shared-public-nav" class="public-nav" aria-label="मुख्य नेव्हिगेशन">${markup}</nav></div>`
      const menu = publicHeader.querySelector('.public-menu-button')
      const nav = publicHeader.querySelector('#shared-public-nav')
      menu?.addEventListener('click', () => {
        const open = nav.classList.toggle('open')
        menu.setAttribute('aria-expanded', String(open))
      })
    }

    let membershipAttempts = 0
    const bindMembershipButton = () => {
      const membershipButton = [...document.querySelectorAll('button')].find(button => button.textContent.trim() === 'सदस्यत्व अर्ज')
      if (membershipButton && !membershipButton.dataset.membershipLink) {
        membershipButton.dataset.membershipLink = 'true'
        membershipButton.addEventListener('click', () => { window.location.href = '/membership.html' })
        return true
      }
      return false
    }
    if (!bindMembershipButton()) {
      const membershipTimer = setInterval(() => {
        if (bindMembershipButton() || ++membershipAttempts > 50) clearInterval(membershipTimer)
      }, 100)
    }

    const indexNav = document.querySelector('#main-nav')
    if (indexNav) indexNav.innerHTML = markup
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply)
  else apply()
})()
