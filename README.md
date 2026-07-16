# JARVIS HUB

Blog + Toko Online — platform belajar, templat, ebook, dan jasa pembuatan website.

## Struktur
```
jarvis-hub/
├── index.html          → Homepage
├── blog.html           → Listing blog
├── shop.html           → Listing produk
├── cart.html           → Keranjang
├── checkout.html       → Checkout
├── about.html          → Tentang
├── blog-*.html         → Halaman detail artikel (5)
├── product-*.html      → Halaman detail produk (8)
├── assets/
│   ├── style.css       → Semua styling
│   ├── data.js         → Data produk & artikel
│   └── app.js          → Logic SPA, cart, renderer
├── vercel.json         → Konfigurasi deploy
└── README.md
```

## Tech Stack
- **Pure HTML/CSS/JS** — tanpa framework, super ringan
- **Tailwind-like CSS** — custom CSS variables, dark mode
- **LocalStorage** — cart persistence
- **WhatsApp** — checkout & payment

## Deploy ke Vercel
1. Push ke GitHub
2. Import di Vercel
3. Done — live di `namarepo.vercel.app`

## Local Testing
Buka `index.html` di browser. Semua halaman bisa diakses via link.
