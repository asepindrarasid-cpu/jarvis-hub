# JARVIS HUB — Blog + Toko Online

Platform belajar, templat, ebook, dan jasa pembuatan website.

## 📁 Struktur File
```
jarvis-hub/
├── index.html          → Homepage (Hero, Featured Products, Blog, Stats, Newsletter)
├── blog.html           → Blog listing + search + filter
├── shop.html           → Shop listing + filter kategori
├── cart.html           → Keranjang belanja
├── checkout.html       → Checkout form
├── about.html          → About page
├── blog-*.html         → 5 halaman detail artikel
├── product-*.html      → 8 halaman detail produk
├── assets/
│   ├── style.css       → Full CSS (dark mode, responsive, animasi)
│   ├── data.js         → Data: 8 produk + 5 artikel blog
│   └── app.js          → Router SPA, Cart manager, page renderer
├── vercel.json         → Vercel deployment config
└── README.md
```

## 🎯 Fitur
- **Blog** — 5 artikel lengkap (Tutorial, Tips, Opini, Freebies)
- **Shop** — 8 produk (Ebook, Template, Course, Jasa, Bundle)
- **Cart** — Keranjang belanja dengan localStorage
- **Checkout** — Form order via WhatsApp
- **Dark theme** — Modern, clean, responsive
- **SPA Router** — Navigasi tanpa reload
- **Mobile-first** — Hamburger menu, adaptive grid

## 🚀 Deploy ke Vercel
1. Push ke GitHub
2. Buka vercel.com → New Project → Import repo `jarvis-hub`
3. Deploy (auto-detect static site)
4. Live di `jarvis-hub.vercel.app`

## 🛠️ Tech Stack
- Pure HTML/CSS/JS — tanpa framework
- Custom CSS dengan CSS Variables (dark mode)
- LocalStorage untuk cart persistence
- WhatsApp untuk checkout & payment
- Vercel untuk hosting gratis

## 📝 Edit Konten
- **Produk**: Edit `assets/data.js` → array `PRODUCTS`
- **Artikel**: Edit `assets/data.js` → array `BLOG_POSTS`
- **Harga**: Ubah `price` di data.js
- **Desain**: Edit `assets/style.css`
