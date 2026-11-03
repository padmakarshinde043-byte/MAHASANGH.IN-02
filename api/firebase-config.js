export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({
    news: { apiKey: process.env.apiKey, authDomain: 'mh-news-1bd1d.firebaseapp.com', projectId: 'mh-news-1bd1d', storageBucket: 'mh-news-1bd1d.firebasestorage.app', messagingSenderId: '428595106543', appId: '1:428595106543:web:8e5e1d05bd13e03da0011a' },
    gallery: { apiKey: process.env.apiKey_2, authDomain: 'mh-gallery.firebaseapp.com', projectId: 'mh-gallery', storageBucket: 'mh-gallery.firebasestorage.app', messagingSenderId: '650364941929', appId: '1:650364941929:web:4f6658289ce51697f154f8' },
    officers: { apiKey: process.env.apiKey_3, authDomain: 'mh-officers.firebaseapp.com', projectId: 'mh-officers', storageBucket: 'mh-officers.firebasestorage.app', messagingSenderId: '293297506377', appId: '1:293297506377:web:a6ccc5b7f8415a99281798' },
    documents: { apiKey: process.env.apiKey_4, authDomain: 'mh-docements.firebaseapp.com', projectId: 'mh-docements', storageBucket: 'mh-docements.firebasestorage.app', messagingSenderId: '596950065396', appId: '1:596950065396:web:fa88a0f11ae219483afea1' },
    membership: { apiKey: process.env.apiKey_5, authDomain: 'mh-membership.firebaseapp.com', projectId: 'mh-membership', storageBucket: 'mh-membership.firebasestorage.app', messagingSenderId: '1089435996808', appId: '1:1089435996808:web:f962d3037c490ad6a2053d' },
    website: { apiKey: process.env.apiKey_6, authDomain: 'mh-website-content.firebaseapp.com', projectId: 'mh-website-content', storageBucket: 'mh-website-content.firebasestorage.app', messagingSenderId: '425484772184', appId: '1:425484772184:web:2b695db75232fd35063b2d' }
  })
}
