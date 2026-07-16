// ===== JARVIS HUB - Main JavaScript =====

// --- Router (Simple SPA) ---
const routes = {
  '/': 'home',
  '/blog': 'blog',
  '/blog/:slug': 'blog-post',
  '/shop': 'shop',
  '/shop/:id': 'product-detail',
  '/cart': 'cart',
  '/checkout': 'checkout',
  '/about': 'about',
};

function parseRoute(path) {
  for (const [route, name] of Object.entries(routes)) {
    const regex = '^' + route.replace(':\\w+', '(?<$1>[^/]+)').replace(/:(\\w+)/g, '(?<$1>[^/]+)') + '$';
    const match = path.match(new RegExp(regex));
    if (match) {
      return { name, params: match.groups || {} };
    }
  }
  return { name: '404', params: {} };
}

// --- Cart Manager ---
const Cart = {
  getItems() {
    try {
      return JSON.parse(localStorage.getItem('jarvis-cart') || '[]');
    } catch {
      return [];
    }
  },
  
  saveItems(items) {
    localStorage.setItem('jarvis-cart', JSON.stringify(items));
  },
  
  addItem(product) {
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    this.saveItems(items);
    updateCartBadge();
    showToast('✅ Ditambahkan ke keranjang!');
  },
  
  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.saveItems(items);
    updateCartBadge();
    renderCurrentPage();
  },
  
  updateQuantity(id, qty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = qty;
      if (qty <= 0) {
        this.removeItem(id);
        return;
      }
    }
    this.saveItems(items);
    updateCartBadge();
    renderCurrentPage();
  },
  
  clear() {
    this.saveItems([]);
    updateCartBadge();
  },
  
  getTotal() {
    return this.getItems().reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },
  
  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  }
};

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const count = Cart.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// --- Toast ---
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Mobile Menu ---
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
}

// --- Active Nav Link ---
function updateActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === path);
  });
}

// --- Page Renderer ---
function renderPage(pageName, params = {}) {
  const main = document.getElementById('page-content');
  if (!main) return;
  
  let html = '';
  
  switch (pageName) {
    case 'home':
      html = renderHome();
      break;
    case 'blog':
      html = renderBlog();
      break;
    case 'blog-post':
      html = renderBlogPost(params.slug);
      break;
    case 'shop':
      html = renderShop();
      break;
    case 'product-detail':
      html = renderProductDetail(params.id);
      break;
    case 'cart':
      html = renderCart();
      break;
    case 'checkout':
      html = renderCheckout();
      break;
    case 'about':
      html = renderAbout();
      break;
    default:
      html = `<div class="empty-state container"><span class="empty-icon">🔍</span><h2>404 - Halaman Tidak Ditemukan</h2><p>Halaman yang kamu cari tidak ada.</p><a href="index.html" class="btn btn-primary">Ke Homepage</a></div>`;
  }
  
  main.innerHTML = html;
  window.scrollTo(0, 0);
  
  // Re-init mobile menu
  initMobileMenu();
  updateActiveNav();
  updateCartBadge();
}

// --- HOME PAGE ---
function renderHome() {
  const featuredProducts = PRODUCTS.filter(p => p.badge).slice(0, 3);
  const latestPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  
  return `
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-badge"><span class="dot"></span> Blog · Produk · Jasa</div>
        <h1>Belajar Bikin Website<br><span class="gradient">yang Beneran Jualan</span></h1>
        <p>Dari artikel gratis yang ngajarin step-by-step, sampai template, ebook, dan jasa profesional. Semua yang kamu butuhin buat punya website yang keren dan menghasilkan.</p>
        <div class="hero-buttons">
          <a href="shop.html" class="btn btn-primary btn-lg">Jelajahi Produk →</a>
          <a href="blog.html" class="btn btn-secondary btn-lg">Baca Artikel Gratis</a>
        </div>
        
        <div class="stats">
          <div class="stat-item"><div class="stat-number">10+</div><div class="stat-label">Artikel Gratis</div></div>
          <div class="stat-item"><div class="stat-number">8</div><div class="stat-label">Produk Digital</div></div>
          <div class="stat-item"><div class="stat-number">4.9</div><div class="stat-label">Rating Rata-rata</div></div>
          <div class="stat-item"><div class="stat-number">500+</div><div class="stat-label">Pelanggan Puas</div></div>
        </div>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="section">
      <div class="container">
        <div class="section-header flex justify-between items-center">
          <div>
            <h2>Produk Unggulan</h2>
            <p>Paling laris dan paling direkomendasikan</p>
          </div>
          <a href="shop.html" class="see-all">Lihat Semua →</a>
        </div>
        <div class="grid-3">
          ${featuredProducts.map(p => productCardHTML(p)).join('')}
        </div>
      </div>
    </section>
    
    <!-- All Products -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2>Semua Produk</h2>
          <p>Dari ebook sampai jasa profesional</p>
        </div>
        <div class="grid-4">
          ${PRODUCTS.map(p => productCardHTML(p, true)).join('')}
        </div>
      </div>
    </section>
    
    <!-- Latest Blog Posts -->
    <section class="section">
      <div class="container">
        <div class="section-header flex justify-between items-center">
          <div>
            <h2>Artikel Terbaru</h2>
            <p>Belajar gratis dari nol sampai mahir</p>
          </div>
          <a href="blog.html" class="see-all">Semua Artikel →</a>
        </div>
        
        <!-- Featured post -->
        <div class="mb-3">
          ${blogCardHTML(latestPosts[0], true)}
        </div>
        
        <div class="grid-3">
          ${latestPosts.slice(1).map(p => blogCardHTML(p)).join('')}
        </div>
      </div>
    </section>
    
    <!-- How it Works -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header text-center">
          <h2>Cara Kerjanya</h2>
          <p>Dari baca artikel sampai punya produk impian</p>
        </div>
        <div class="how-it-works">
          <div class="how-step">
            <div class="step-icon">📝</div>
            <div class="step-label">STEP 01</div>
            <h3>Baca Artikel Gratis</h3>
            <p>Pelajari dasar-dasar bikin website, copywriting, desain, dan marketing.</p>
          </div>
          <div class="how-step">
            <div class="step-icon">🛒</div>
            <div class="step-label">STEP 02</div>
            <h3>Pilih Produk Premium</h3>
            <p>Template, ebook, course, atau jasa — pilih yang sesuai kebutuhan.</p>
          </div>
          <div class="how-step">
            <div class="step-icon">🚀</div>
            <div class="step-label">STEP 03</div>
            <h3>Launch & Hasilkan</h3>
            <p>Terapkan ilmu dan produk yang dibeli. Website-ready dalam hitungan jam.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="section">
      <div class="container">
        <div class="newsletter-cta">
          <h2>Jangan Lewatkan Update Terbaru</h2>
          <p>Dapetin artikel gratis, produk baru, dan promo eksklusif langsung ke inbox kamu.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('✅ Berhasil subscribe!');">
            <input type="email" placeholder="email@kamu.com" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

// --- BLOG PAGE ---
function renderBlog(filter = 'all', search = '') {
  let posts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  if (filter !== 'all') {
    posts = posts.filter(p => p.category === filter);
  }
  
  if (search) {
    const s = search.toLowerCase();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.excerpt.toLowerCase().includes(s) ||
      p.tags.some(t => t.toLowerCase().includes(s))
    );
  }
  
  return `
    <div class="container page-inner">
      <div class="mb-3">
        <h1>Blog</h1>
        <p style="color: var(--text-secondary);">Artikel gratis tentang website, desain, dan bisnis online</p>
      </div>
      
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="blog-search" placeholder="Cari artikel..." value="${search}" oninput="filterBlog()">
      </div>
      
      <div class="tabs" id="blog-tabs">
        ${BLOG_CATEGORIES.map(c => `
          <button class="tab ${filter === c.id ? 'active' : ''}" onclick="filterBlogByCategory('${c.id}')">${c.name}</button>
        `).join('')}
      </div>
      
      <p class="text-muted mb-3" style="font-size: 0.8rem;">${posts.length} artikel ditemukan</p>
      
      ${posts.length > 0 ? `
        <div class="grid-3">
          ${posts.map(p => blogCardHTML(p)).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <h2>Artikel tidak ditemukan</h2>
          <p>Coba ubah kata kunci atau filter kategori</p>
        </div>
      `}
    </div>
  `;
}

function filterBlog() {
  const search = document.getElementById('blog-search')?.value || '';
  const activeTab = document.querySelector('#blog-tabs .tab.active');
  const category = activeTab ? activeTab.textContent.trim().toLowerCase() : 'all';
  const catMap = { 'semua': 'all', 'tutorial': 'Tutorial', 'tips': 'Tips', 'opini': 'Opini', 'freebies': 'Freebies' };
  const filter = catMap[category] || 'all';
  
  const main = document.getElementById('page-content');
  if (main) main.innerHTML = renderBlog(filter, search);
}

function filterBlogByCategory(catId) {
  const search = document.getElementById('blog-search')?.value || '';
  const main = document.getElementById('page-content');
  if (main) main.innerHTML = renderBlog(catId, search);
}

// --- BLOG POST PAGE ---
function renderBlogPost(slug) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) {
    return `<div class="empty-state container"><span class="empty-icon">😕</span><h2>Artikel Tidak Ditemukan</h2><p>Artikel yang kamu cari tidak ada.</p><a href="blog.html" class="btn btn-primary">← Kembali ke Blog</a></div>`;
  }
  
  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return `
    <div class="container">
      <a href="blog.html" style="display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary);margin-bottom:24px;">
        <span>←</span> Kembali ke Blog
      </a>
      
      <div class="article-header">
        <div class="blog-meta">
          <span class="blog-category ${post.category.toLowerCase()}">${post.category}</span>
          <span class="text-muted" style="font-size:0.8rem;">${formatDate(post.date)}</span>
          <span class="text-muted" style="font-size:0.8rem;">·</span>
          <span class="text-muted" style="font-size:0.8rem;">${post.readTime} min baca</span>
        </div>
        <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:900;line-height:1.2;margin-bottom:16px;">${post.title}</h1>
        <p style="font-size:1.05rem;color:var(--text-secondary);border-left:3px solid var(--accent);padding-left:16px;margin-bottom:20px;">${post.excerpt}</p>
        <div class="tags">
          ${post.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      
      <div class="article-content">
        ${post.content}
      </div>
      
      <div style="display:flex;gap:12px;padding:20px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin:32px 0;">
        <span style="font-size:0.85rem;color:var(--text-secondary);font-weight:600;">Bagikan:</span>
        <button onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}','_blank')" style="padding:8px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;color:var(--text-secondary);cursor:pointer;">𝕏</button>
        <button onclick="navigator.clipboard.writeText(window.location.href);showToast('📋 Link disalin!')" style="padding:8px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;color:var(--text-secondary);cursor:pointer;">🔗 Copy</button>
      </div>
    </div>
  `;
}

// --- SHOP PAGE ---
function renderShop(category = 'all') {
  let products = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  
  return `
    <div class="container page-inner">
      <div class="mb-3">
        <h1>Shop</h1>
        <p style="color:var(--text-secondary);">Template, ebook, course, dan jasa untuk level up bisnismu</p>
      </div>
      
      <div class="tabs">
        ${CATEGORIES.map(c => `
          <button class="tab ${category === c.id ? 'active' : ''}" onclick="filterShop('${c.id}')">${c.icon} ${c.name}</button>
        `).join('')}
      </div>
      
      <p class="text-muted mb-3" style="font-size:0.8rem;">${products.length} produk</p>
      
      ${products.length > 0 ? `
        <div class="grid-4">
          ${products.map(p => productCardHTML(p)).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <span class="empty-icon">📦</span>
          <h2>Belum ada produk</h2>
          <p>Produk baru sedang dalam proses.</p>
        </div>
      `}
      
      <!-- CTA Banner -->
      <div style="background:linear-gradient(135deg,rgba(108,99,255,0.08),rgba(34,211,238,0.05));border:1px solid var(--accent-border);border-radius:var(--radius-xl);padding:40px 24px;text-align:center;margin-top:48px;">
        <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:8px;">Butuh yang Custom?</h2>
        <p style="color:var(--text-secondary);max-width:400px;margin:0 auto 20px;">Kamu butuh website khusus dengan fitur unik? Gw bikinin dari nol. Konsultasi gratis, revisi sampai puas.</p>
        <a href="about.html" class="btn btn-primary">Konsultasi Gratis →</a>
      </div>
    </div>
  `;
}

function filterShop(catId) {
  const main = document.getElementById('page-content');
  if (main) main.innerHTML = renderShop(catId);
}

// --- PRODUCT DETAIL ---
function renderProductDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    return `<div class="empty-state container"><span class="empty-icon">😕</span><h2>Produk Tidak Ditemukan</h2><p>Produk yang kamu cari tidak tersedia.</p><a href="shop.html" class="btn btn-primary">← Kembali ke Shop</a></div>`;
  }
  
  const discount = getDiscount(product);
  
  return `
    <div class="container">
      <div class="breadcrumb">
        <a href="shop.html">Shop</a>
        <span class="separator">›</span>
        <span class="current">${product.name}</span>
      </div>
      
      <div class="product-detail">
        <div>
          <div class="product-image-large">${product.typeLabel.split(' ')[0]}</div>
          
          <div style="margin-top:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;">
            <h3 style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-primary);margin-bottom:10px;">Deskripsi</h3>
            <p style="color:var(--text-secondary);line-height:1.7;">${product.description}</p>
          </div>
        </div>
        
        <div class="product-info">
          <span class="type-badge">${product.typeLabel}</span>
          <h1>${product.name}</h1>
          
          <div class="rating-display">
            <span>⭐</span>
            <span style="font-weight:600;color:var(--text-primary);">${product.rating}</span>
            <span class="text-muted">(${product.reviews} review)</span>
          </div>
          
          <div class="price-display">
            <span class="current">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `
              <span class="original">${formatPrice(product.originalPrice)}</span>
              <span class="discount-badge">-${discount}%</span>
            ` : ''}
          </div>
          
          ${product.badge ? `<span style="display:inline-block;padding:4px 12px;background:var(--accent);color:white;font-size:0.7rem;font-weight:700;border-radius:20px;margin:12px 0;">${product.badge}</span>` : ''}
          
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;margin:16px 0;">
            <h3 style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-primary);margin-bottom:12px;">Yang Kamu Dapat</h3>
            <ul class="features-list">
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
          
          <div style="display:flex;flex-direction:column;gap:10px;">
            <button class="btn btn-primary btn-lg btn-block" onclick="Cart.addItem(PRODUCTS.find(p=>p.id==='${product.id}'));showToast('✅ Ditambahkan ke keranjang!');">
              🛒 Tambah ke Keranjang
            </button>
            <button class="btn btn-secondary btn-block" onclick="buyViaWhatsApp('${product.name}', ${product.price})">
              💬 Chat via WhatsApp
            </button>
          </div>
          
          <div class="trust-badges">
            <div class="trust-badge"><div class="icon">🔒</div><div class="label">Pembayaran Aman</div></div>
            <div class="trust-badge"><div class="icon">⚡</div><div class="label">Instant Download</div></div>
            <div class="trust-badge"><div class="icon">💬</div><div class="label">Support 24/7</div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buyViaWhatsApp(name, price) {
  const text = encodeURIComponent(`Halo, gw tertarik sama "${name}" seharga ${formatPrice(price)}. Bisa info lebih lanjut?`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

// --- CART PAGE ---
function renderCart() {
  const items = Cart.getItems();
  
  if (items.length === 0) {
    return `
      <div class="container">
        <div class="empty-state">
          <span class="empty-icon">🛒</span>
          <h2>Keranjang Kosong</h2>
          <p>Belum ada produk di keranjang kamu.</p>
          <a href="shop.html" class="btn btn-primary">Jelajahi Shop →</a>
        </div>
      </div>
    `;
  }
  
  const total = Cart.getTotal();
  
  return `
    <div class="container">
      <h1 style="font-size:2rem;font-weight:900;margin-bottom:6px;">Keranjang Belanja</h1>
      <p style="color:var(--text-secondary);margin-bottom:32px;">${items.length} item</p>
      
      <div style="display:grid;grid-template-columns:1fr 360px;gap:32px;align-items:start;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${items.map(item => `
            <div class="cart-item">
              <div class="cart-thumb">${item.typeLabel?.split(' ')[0] || '📦'}</div>
              <div class="cart-info">
                <h4>${item.name}</h4>
                <span class="cart-type">${item.category}</span>
              </div>
              <div class="cart-actions">
                <div class="qty-control">
                  <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                  <span>${item.quantity}</span>
                  <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <span class="cart-price">${formatPrice(item.price * item.quantity)}</span>
                <button class="cart-remove" onclick="Cart.removeItem('${item.id}')" title="Hapus">✕</button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="cart-summary">
          <h3>Ringkasan Order</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(total)}</span>
          </div>
          <div class="summary-row">
            <span>Diskon</span>
            <span style="color:var(--success);">-Rp 0</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span class="amount">${formatPrice(total)}</span>
          </div>
          <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:16px;">Checkout →</a>
          <a href="shop.html" style="display:block;text-align:center;margin-top:10px;font-size:0.85rem;color:var(--text-secondary);">← Lanjut Belanja</a>
          
          <div style="margin-top:20px;display:flex;flex-direction:column;gap:6px;">
            <div style="font-size:0.7rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">🔒 Pembayaran aman & terenkripsi</div>
            <div style="font-size:0.7rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">⚡ Akses instant setelah bayar</div>
            <div style="font-size:0.7rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">💬 Support via WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- CHECKOUT PAGE ---
function renderCheckout() {
  const items = Cart.getItems();
  
  if (items.length === 0) {
    return `
      <div class="container">
        <div class="empty-state">
          <span class="empty-icon">🛒</span>
          <h2>Keranjang Kosong</h2>
          <p>Belum ada produk di keranjang kamu.</p>
          <a href="shop.html" class="btn btn-primary">Jelajahi Shop →</a>
        </div>
      </div>
    `;
  }
  
  const total = Cart.getTotal();
  
  return `
    <div class="container">
      <h1 style="font-size:2rem;font-weight:900;margin-bottom:6px;">Checkout</h1>
      <p style="color:var(--text-secondary);margin-bottom:32px;">Isi data untuk melanjutkan pesanan</p>
      
      <div style="display:grid;grid-template-columns:1fr 360px;gap:32px;align-items:start;">
        <form id="checkout-form" onsubmit="processCheckout(event)">
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px;display:flex;flex-direction:column;gap:16px;">
            <div class="form-group">
              <label>Nama Lengkap *</label>
              <input type="text" id="co-name" required placeholder="Nama kamu">
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" id="co-email" required placeholder="email@kamu.com">
            </div>
            <div class="form-group">
              <label>Nomor WhatsApp *</label>
              <input type="tel" id="co-whatsapp" required placeholder="08xxxxxxxxxx">
            </div>
            <div class="form-group">
              <label>Catatan (opsional)</label>
              <textarea id="co-notes" placeholder="Ada yang mau ditanyakan?"></textarea>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-lg btn-block" style="margin-top:20px;">
            Konfirmasi & Kirim ke WhatsApp →
          </button>
          
          <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:8px;">
            Order akan dikirim via WhatsApp. Gw akan konfirmasi dan kirim akses produk dalam 1x24 jam.
          </p>
        </form>
        
        <div class="cart-summary">
          <h3>Ringkasan (${items.length} item)</h3>
          ${items.map(item => `
            <div class="summary-row">
              <span style="truncate mr-4;">${item.name} x${item.quantity}</span>
              <span style="font-weight:600;">${formatPrice(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          <div class="summary-row total">
            <span>Total</span>
            <span class="amount">${formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function processCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('co-name').value;
  const email = document.getElementById('co-email').value;
  const whatsapp = document.getElementById('co-whatsapp').value;
  const notes = document.getElementById('co-notes').value;
  
  let message = `Halo, gw mau order dari JARVIS HUB:\n\n`;
  Cart.getItems().forEach(item => {
    message += `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
  });
  message += `\nTotal: ${formatPrice(Cart.getTotal())}\n`;
  message += `\nNama: ${name}\nEmail: ${email}\n`;
  if (notes) message += `Catatan: ${notes}\n`;
  
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
  
  Cart.clear();
  
  // Show success
  const main = document.getElementById('page-content');
  main.innerHTML = `
    <div class="container">
      <div class="empty-state">
        <span class="empty-icon">🎉</span>
        <h2>Order Berhasil!</h2>
        <p>Detail order sudah dikirim via WhatsApp. Gw akan proses dan kirim akses produk secepatnya.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="shop.html" class="btn btn-primary">Lanjut Belanja</a>
          <a href="index.html" class="btn btn-secondary">Ke Homepage</a>
        </div>
      </div>
    </div>
  `;
}

// --- ABOUT PAGE ---
function renderAbout() {
  return `
    <div class="container">
      <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:900;margin-bottom:6px;">About JARVIS HUB</h1>
      <p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:40px;">Cerita di balik layar</p>
      
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:28px;margin-bottom:32px;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#22d3ee);display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900;color:white;">E</div>
          <div>
            <h2 style="font-size:1.2rem;font-weight:800;">JARVIS HUB</h2>
            <p style="font-size:0.85rem;color:var(--text-muted);">Dibuat oleh seorang yang suka bikin website & jualan online</p>
          </div>
        </div>
        <div style="color:var(--text-secondary);line-height:1.8;">
          <p style="margin-bottom:12px;">JARVIS HUB lahir dari frustrasi pribadi: kebanyakan tutorial di internet itu terlalu teoritis, atau kalau praktis, harganya mahal banget. Gw pengen bikin tempat di mana orang bisa belajar gratis dari nol, dan kalau mau level up, tinggal beli produk yang relevan.</p>
          <p style="margin-bottom:12px;">Filosofi gw simpel: <strong style="color:var(--text-primary);">konten gratis buat bangun trust, produk premium buat kasih nilai lebih</strong>. Artikel di blog ini gw tulis berdasarkan pengalaman langsung — bukan teori dari buku.</p>
          <p>Setiap produk yang gw jual, gw bikin sendiri. Template gw test langsung, ebook gw tulis dari kasus nyata, course gw rekam sambil kerjain project beneran. No fluff, all substance.</p>
        </div>
      </div>
      
      <div class="about-grid">
        <div class="about-card">
          <div class="card-icon">📝</div>
          <h3>Artikel Gratis</h3>
          <p>Tutorial, tips, dan opini tentang website, desain, dan bisnis online.</p>
        </div>
        <div class="about-card">
          <div class="card-icon">📦</div>
          <h3>Produk Digital</h3>
          <p>Ebook, template, course, dan bundle yang bisa langsung dipake.</p>
        </div>
        <div class="about-card">
          <div class="card-icon">🛠️</div>
          <h3>Jasa Custom</h3>
          <p>Bikin website dari nol sesuai kebutuhan bisnismu.</p>
        </div>
        <div class="about-card">
          <div class="card-icon">💬</div>
          <h3>Support Langsung</h3>
          <p>Chat langsung via WhatsApp kalau ada pertanyaan.</p>
        </div>
      </div>
      
      <div style="background:linear-gradient(135deg,rgba(108,99,255,0.08),var(--bg-card));border:1px solid var(--accent-border);border-radius:var(--radius-xl);padding:28px;margin:32px 0;">
        <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:12px;">Prinsip Gw</h2>
        <ul class="values-list">
          <li>Kualitas > Kuantitas. Lebih baik 1 produk bagus daripada 10 produk medioker.</li>
          <li>Transparan. Harga jujur, deskripsi akurat, no hidden fee.</li>
          <li>Actionable. Semua yang gw jual harus bisa langsung dipake, bukan teori doang.</li>
          <li>Community-first. Gw bangun ini buat orang yang serius mau berkembang.</li>
        </ul>
      </div>
      
      <div style="text-align:center;">
        <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:8px;">Tertarik Bekerja Sama?</h2>
        <p style="color:var(--text-secondary);max-width:400px;margin:0 auto 24px;">Mau konsultasi gratis tentang website bisnismu, atau butuh jasa custom? Gw siap bantu.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="https://wa.me/" target="_blank" class="btn btn-success">💬 Chat via WhatsApp</a>
          <a href="shop.html" class="btn btn-primary">Lihat Produk</a>
        </div>
      </div>
    </div>
  `;
}

// --- Helper Functions ---
function productCardHTML(product, compact = false) {
  const discount = getDiscount(product);
  const badgeHTML = product.badge ? `<span class="badge">${product.badge}</span>` : '';
  const discountHTML = discount > 0 ? `<span class="discount">-${discount}%</span>` : '';
  
  return `
    <a href="product-${product.id}.html" class="product-card ${compact ? 'compact' : ''}">
      <div class="product-image">
        ${product.typeLabel.split(' ')[0]}
        ${badgeHTML}
        ${discountHTML}
      </div>
      <div class="product-body">
        <div class="product-type">${product.typeLabel}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-footer">
          <div class="price">
            ${formatPrice(product.price)}
            ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="rating">⭐ ${product.rating}</div>
        </div>
      </div>
    </a>
  `;
}

function blogCardHTML(post, featured = false) {
  const catClass = post.category.toLowerCase();
  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  
  return `
    <a href="blog-${post.slug}.html" class="blog-card ${featured ? 'featured' : ''}">
      <div class="blog-meta">
        <span class="blog-category ${catClass}">${post.category}</span>
        <span class="blog-readtime">${post.readTime} min baca</span>
      </div>
      <div class="blog-title">${post.title}</div>
      <div class="blog-excerpt">${post.excerpt}</div>
      <div class="blog-footer">
        <span>${formatDate(post.date)}</span>
        <span class="blog-readmore">Baca →</span>
      </div>
    </a>
  `;
}

// --- Router ---
function navigate(path) {
  history.pushState({}, '', path);
  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname;
  const { name, params } = parseRoute(path);
  renderPage(name, params);
}

// --- Init ---
window.addEventListener('popstate', handleRoute);

document.addEventListener('DOMContentLoaded', () => {
  handleRoute();
  initMobileMenu();
  updateActiveNav();
  updateCartBadge();
});

// Global expose for inline handlers
window.navigate = navigate;
window.filterShop = filterShop;
window.filterBlog = filterBlog;
window.filterBlogByCategory = filterBlogByCategory;
window.buyViaWhatsApp = buyViaWhatsApp;
