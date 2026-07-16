// ===== JARVIS HUB - Data Store =====

const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Ebook: Panduan Landing Page Pro',
    description: 'Ebook 50 halaman yang membahas tuntas cara membuat landing page yang konversi tinggi. Termasuk framework copywriting, checklist desain, dan 10 contoh nyata.',
    price: 79000,
    originalPrice: 149000,
    category: 'ebook',
    typeLabel: '📖 Ebook',
    rating: 4.9,
    reviews: 127,
    badge: 'BESTSELLER',
    features: [
      '50+ halaman konten daging',
      'Framework copywriting AIDA + PAS',
      '10 contoh landing page real',
      'Checklist pre-launch',
      'Bonus: Email swipe file',
    ],
  },
  {
    id: 'prod-2',
    name: 'Template Landing Page HTML',
    description: 'Template HTML + CSS siap pakai. Responsive, modern, ringan. Tinggal edit teks dan gambar, langsung deploy.',
    price: 99000,
    originalPrice: 199000,
    category: 'template',
    typeLabel: '📄 Template',
    rating: 4.8,
    reviews: 89,
    badge: 'POPULER',
    features: [
      'HTML5 + CSS3 murni (no framework)',
      'Fully responsive',
      '5 section siap pakai',
      'Dark mode included',
      'Komentar rapi di kode',
      'Lifetime update',
    ],
  },
  {
    id: 'prod-3',
    name: 'Course: Bikin Website dari Nol',
    description: 'Video course 2 jam yang ngajarin bikin website profesional dari nol pakai HTML, CSS, dan JavaScript. Cocok untuk pemula total.',
    price: 199000,
    originalPrice: 399000,
    category: 'course',
    typeLabel: '🎬 Course',
    rating: 4.9,
    reviews: 64,
    badge: 'NEW',
    features: [
      '12 video tutorial (2 jam total)',
      'Dari nol sampai deploy',
      'Source code lengkap',
      'Grup diskusi Telegram',
      'Sertifikat completion',
      'Access seumur hidup',
    ],
  },
  {
    id: 'prod-4',
    name: 'Jasa: Bikin Landing Page',
    description: 'Gw bikinin landing page profesional untuk bisnis kamu. Termasuk desain, copywriting, dan deploy. Selesai dalam 3 hari kerja.',
    price: 500000,
    originalPrice: 750000,
    category: 'jasa',
    typeLabel: '🛠️ Jasa',
    rating: 5.0,
    reviews: 32,
    badge: 'PREMIUM',
    features: [
      'Desain custom sesuai brand',
      'Copywriting included',
      'Responsive mobile & desktop',
      'SEO basic setup',
      'Deploy ke Vercel/Netlify',
      'Revisi 2x gratis',
      'Garansi 30 hari',
    ],
  },
  {
    id: 'prod-5',
    name: 'Bundle: Starter Pack',
    description: 'Paket hemat! Dapatkan Ebook Landing Page + Template HTML + Checklist SEO. Hemat 60% dibanding beli terpisah.',
    price: 99000,
    originalPrice: 247000,
    category: 'bundle',
    typeLabel: '📦 Bundle',
    rating: 4.9,
    reviews: 203,
    badge: 'HEMAT 60%',
    features: [
      'Ebook Panduan Landing Page',
      'Template HTML siap pakai',
      'SEO Checklist 50 poin',
      'Bonus: Notion template',
      'Hemat 60%',
      'Lifetime update',
    ],
  },
  {
    id: 'prod-6',
    name: 'Template Toko Online HTML',
    description: 'Template toko online lengkap dengan katalog produk, keranjang belanja, dan halaman checkout. Responsive dan modern.',
    price: 149000,
    originalPrice: 299000,
    category: 'template',
    typeLabel: '📄 Template',
    rating: 4.7,
    reviews: 45,
    features: [
      'Halaman produk + katalog',
      'Keranjang belanja (localStorage)',
      'Checkout form',
      'Integrasi WhatsApp',
      'Dark mode',
      'Mobile responsive',
    ],
  },
  {
    id: 'prod-7',
    name: 'Jasa: Full Website Development',
    description: 'Website lengkap dengan blog, toko online, dan admin panel. Built dengan teknologi modern dan deployed ke Vercel.',
    price: 2000000,
    originalPrice: 3500000,
    category: 'jasa',
    typeLabel: '🛠️ Jasa',
    rating: 5.0,
    reviews: 18,
    badge: 'ENTERPRISE',
    features: [
      'Next.js + Tailwind CSS',
      'Blog + Shop + Admin',
      'Payment gateway integration',
      'SEO optimized',
      'Deploy + domain setup',
      'Training 1x sesi Zoom',
      'Garansi 90 hari',
    ],
  },
  {
    id: 'prod-8',
    name: 'Ebook: Copywriting untuk Jualan',
    description: 'Panduan copywriting yang bikin orang langsung klik "Beli". Termasuk 100+ formula headline, swipe file, dan case study.',
    price: 49000,
    originalPrice: 99000,
    category: 'ebook',
    typeLabel: '📖 Ebook',
    rating: 4.8,
    reviews: 156,
    features: [
      '100+ formula headline',
      'Swipe file 50+ contoh',
      'Case study real',
      'Framework PAS + AIDA',
      'Bonus: Email templates',
    ],
  },
];

const BLOG_POSTS = [
  {
    id: 'post-1',
    slug: 'cara-bikin-landing-page-dari-nol',
    title: 'Cara Bikin Landing Page yang Konversi Tinggi dari Nol',
    excerpt: 'Panduan lengkap bikin landing page yang nggak cuma cantik, tapi juga bikin orang klik "Beli". Mulai dari struktur, copywriting, sampai desain.',
    category: 'Tutorial',
    tags: ['landing page', 'website', 'tutorial', 'desain'],
    readTime: 8,
    date: '2025-07-15',
    content: `<p>Landing page adalah salah satu aset paling berharga buat siapa aja yang jualan online. Bukan cuma soal tampilan, tapi juga soal bagaimana kamu mengarahkan pengunjung supaya melakukan aksi yang kamu inginkan.</p>

<h2>Apa Itu Landing Page yang Baik?</h2>
<p>Landing page yang baik punya 5 elemen kunci:</p>
<ul>
<li><strong>Headline yang menarik perhatian</strong> — 3 detik pertama menentukan apakah visitor stay atau pergi</li>
<li><strong>Benefit-oriented copy</strong> — fokus pada apa yang didapat buyer, bukan apa yang seller jual</li>
<li><strong>Social proof</strong> — testimoni, review, angka, logo klien</li>
<li><strong>Clear CTA</strong> — tombol yang jelas, kontras, dan sekali saja</li>
<li><strong>Fast loading</strong> — di atas 3 detik, 40% visitor kabur</li>
</ul>

<h2>Struktur Landing Page yang Konversi</h2>

<h3>Section 1: Hero</h3>
<p>Ini bagian paling atas. Harus langsung jelas: siapa kamu, apa yang kamu tawarkan, kenapa orang harus peduli, dan satu CTA utama.</p>

<h3>Section 2: Problem</h3>
<p>Sentuh pain point target audience. Buat mereka merasa "ini dia!"</p>

<h3>Section 3: Solution</h3>
<p>Perkenalkan produk/jasa kamu sebagai solusi dari masalah tadi.</p>

<h3>Section 4: Benefits</h3>
<p>Bukan features — benefits. Orang beli karena ada manfaat, bukan karena ada spesifikasi.</p>

<h3>Section 5: Social Proof</h3>
<p>Testimoni, review, case study, angka pencapaian.</p>

<h3>Section 6: FAQ</h3>
<p>Jawab keraguan yang mungkin ada.</p>

<h3>Section 7: Final CTA</h3>
<p>Last chance. Ulangi offer + CTA.</p>

<hr>

<h2>Copywriting yang Menjual</h2>
<p>Rumus AIDA:</p>
<ul>
<li><strong>Attention</strong>: Headline yang bikin stop scroll</li>
<li><strong>Interest</strong>: Cerita atau data yang bikin penasaran</li>
<li><strong>Desire</strong>: Tunjukin benefit + social proof</li>
<li><strong>Action</strong>: CTA yang jelas</li>
</ul>

<blockquote>Contoh headline yang bagus: "Bikin Website Profesional dalam 3 Hari — Tanpa Ribet"</blockquote>

<h2>Desain yang Modern</h2>
<ul>
<li>Gunakan whitespace (ruang kosong) jangan diisi semua</li>
<li>Kontras warna yang tepat untuk CTA</li>
<li>Typography yang readable (font size minimal 16px)</li>
<li>Mobile-first (60%+ traffic dari HP)</li>
</ul>

<hr>

<p>Mau template landing page yang sudah jadi tinggal edit? <a href="shop.html/prod-2">Cek di halaman Shop</a>, gw punya template HTML dan Next.js yang bisa langsung dipakai.</p>`
  },
  {
    id: 'post-2',
    slug: '5-kesalahan-pemula-bikin-toko-online',
    title: '5 Kesalahan Pemula Bikin Toko Online (Dan Cara Menghindarinya)',
    excerpt: 'Banyak yang gagal di awal karena kesalahan yang sebenarnya bisa dihindari. Ini 5 kesalahan paling umum dan cara memperbaikinya.',
    category: 'Tips',
    tags: ['toko online', 'ecommerce', 'kesalahan', 'tips'],
    readTime: 5,
    date: '2025-07-14',
    content: `<p>Bikin toko online itu gampang. Tapi bikin toko online yang laris itu beda cerita. Berdasarkan pengalaman, ini 5 kesalahan paling umum yang dilakukan pemula:</p>

<h2>1. Terlalu Fokus ke Desain, Nggak ke Konten</h2>
<p>Banyak yang habisin waktu berminggu-minggu ngerjain logo dan warna, tapi artikel produknya cuma "Produk berkualitas".</p>
<p><strong>Solusi:</strong> Investasi waktu di copywriting produk. Gambar bisa pakai placeholder, tapi deskripsi produk harus meyakinkan.</p>

<h2>2. Nggak Punya Unique Value Proposition</h2>
<p>"Toko online murah" — semua orang bilang begitu. Itu bukan keunggulan, itu ekspektasi dasar.</p>
<p><strong>Solusi:</strong> Jawab pertanyaan: kenapa orang harus beli dari kamu, bukan dari kompetitor?</p>

<h2>3. Checkout yang Rumit</h2>
<p>Form yang terlalu panjang, banyak step, bikin orang kabur.</p>
<p><strong>Solusi:</strong> Minimalisir step checkout. Nama + email + alamat = cukup.</p>

<h2>4. Nggak Ada Social Proof</h2>
<p>Toko online tanpa review = kayak warung tanpa pelanggan. Orang ragu beli.</p>
<p><strong>Solusi:</strong> Mulai dari teman dekat, keluarga, atau kasih diskon besar buat pembeli pertama sebagai ganti review.</p>

<h2>5. Nggak Track Analytics</h2>
<p>Nggak ngerti dari mana traffic datang, apa yang laku, apa yang tidak = terbang buta.</p>
<p><strong>Solusi:</strong> Pasang Google Analytics atau alternatif privacy-friendly.</p>

<hr>

<p>Mau solusi instan? <a href="shop.html/prod-6">Template toko online gw</a> sudah include semua best practices di atas. Tinggal edit konten dan langsung jadi.</p>`
  },
  {
    id: 'post-3',
    slug: 'template-html-gratis-landing-page',
    title: 'Template HTML Gratis: Landing Page Modern Siap Pakai',
    excerpt: 'Gw bagi-bagi template HTML gratis buat yang mau mulai bikin landing page. Responsive, modern, dan ringan.',
    category: 'Freebies',
    tags: ['template', 'HTML', 'gratis', 'landing page'],
    readTime: 3,
    date: '2025-07-13',
    content: `<p>Gw bagi-bagi template HTML gratis buat yang mau mulai bikin landing page. Template ini responsive, modern, dan ringan.</p>

<h2>Isi Template:</h2>
<ul>
<li>Hero section dengan CTA</li>
<li>Features section (3 kolom)</li>
<li>Pricing table (3 tier)</li>
<li>Testimonial section</li>
<li>Contact form</li>
<li>Footer</li>
</ul>

<h2>Cara Pakai:</h2>
<ol>
<li>Download file HTML</li>
<li>Edit teks sesuai kebutuhan</li>
<li>Ganti gambar placeholder</li>
<li>Upload ke hosting / Vercel / Netlify</li>
</ol>

<h2>Limitasi Versi Gratis:</h2>
<ul>
<li>Hanya halaman HTML (tanpa JS framework)</li>
<li>Tidak ada animasi advanced</li>
<li>Tidak ada CMS integration</li>
</ul>

<blockquote>Mau versi PRO dengan Next.js, animasi, CMS, dan fitur lengkap? Cek template premium di halaman Shop!</blockquote>`
  },
  {
    id: 'post-4',
    slug: 'kenapa-copywriting-lebih-penting-daripada-desain',
    title: 'Kenapa Copywriting Lebih Penting daripada Desain',
    excerpt: 'Banyak yang habiskan budget besar buat desain, padahal copywriting yang menentukan apakah pengunjung jadi beli atau tidak.',
    category: 'Opini',
    tags: ['copywriting', 'desain', 'marketing', 'tips'],
    readTime: 6,
    date: '2025-07-12',
    content: `<p>Ini fakta yang sering diabaikan: <strong>website yang jelek tapi copy-nya bagus bisa laris. Website yang cantik tapi copy-nya buruk, mati.</strong></p>

<h2>Kenapa Copywriting Lebih Penting?</h2>

<h3>1. Manusia Membaca Sebelum Melihat</h3>
<p>Orang scan headline dan paragraf pertama dulu. Kalau nggak menarik, mereka nggak bakal lihat desainnya.</p>

<h3>2. Copy Menjawab "What's in it for me?"</h3>
<p>Desain hanya menghias. Copy yang menjual benefit.</p>

<h3>3. Copy = Trust Builder</h3>
<p>Kalimat yang tepat bisa membangun kepercayaan dalam 5 detik.</p>

<h2>Prinsip Copywriting Dasar</h2>
<ul>
<li><strong>Jelas > Kreatif</strong> — Lebih baik boring tapi jelas, daripada kreatif tapi membingungkan</li>
<li><strong>Spesifik > Umum</strong> — "Naik 30% traffic" lebih baik dari "Hasil terbaik"</li>
<li><strong>Cerita > Fakta</strong> — Otak manusia lebih ingat cerita daripada angka</li>
<li><strong>Fokus pada pembaca</strong> — Bukan "kami menyediakan" tapi "anda akan dapat"</li>
</ul>

<hr>

<p><strong>Contoh Before/After:</strong></p>
<p><em>BEFORE:</em> "Kami menyediakan jasa pembuatan website profesional dengan harga terjangkau."</p>
<p><em>AFTER:</em> "Website profesional dalam 3 hari. Garansi uang kembali kalau nggak puas."</p>

<blockquote>Butuh bantuan copywriting? Gw juga terima jasa copywriting untuk landing page, produk, dan blog. Cek di halaman Jasa.</blockquote>`
  },
  {
    id: 'post-5',
    slug: 'cara-pilih-domain-dan-hosting-yang-tepat',
    title: 'Cara Pilih Domain dan Hosting yang Tepat untuk Bisnismu',
    excerpt: 'Panduan memilih domain dan hosting yang sesuai kebutuhan, dari yang gratis sampai yang profesional.',
    category: 'Tutorial',
    tags: ['domain', 'hosting', 'website', 'setup'],
    readTime: 5,
    date: '2025-07-11',
    content: `<p>Langkah pertama punya website: pilih domain dan hosting. Banyak yang salah di sini, hasilnya website lemot atau domainnya nggak professional.</p>

<h2>Memilih Domain</h2>

<h3>Aturan Utama:</h3>
<ol>
<li><strong>Singkat dan mudah diingat</strong> — maksimal 15 karakter</li>
<li><strong>Gunakan .com atau .id</strong> — .com global, .id lokal</li>
<li><strong>Hindari angka dan tanda hubung</strong> — susah diucapkan</li>
<li><strong>Cek ketersediaan di sosmed</strong> — pastikan username konsisten</li>
</ol>

<h3>Contoh Domain Bagus:</h3>
<ul>
<li>✅ jarvishub.id</li>
<li>✅ elliot.dev</li>
<li>✅ beliajtoko.com</li>
</ul>

<h2>Memilih Hosting</h2>

<h3>Opsi Gratis:</h3>
<ul>
<li><strong>Vercel</strong> — terbaik buat Next.js/static site</li>
<li><strong>Netlify</strong> — mirip Vercel, drag & drop</li>
<li><strong>GitHub Pages</strong> — cocok buat dokumentasi</li>
</ul>

<h3>Opsi Berbayar (mulai Rp 15rb/bulan):</h3>
<ul>
<li><strong>Niagahoster</strong> — populer di Indonesia</li>
<li><strong>IDCloudHost</strong> — harga bersaing</li>
<li><strong>Rumahweb</strong> — support bagus</li>
</ul>

<hr>

<p><strong>Yang Paling Penting:</strong> Hosting bisa diganti kapan saja. Domain juga bisa di-transfer. Jadi jangan overthinking — mulai dulu, upgrade belakangan.</p>

<p>Mau gw bikinin website lengkap dengan domain dan hosting yang sudah disetting? <a href="shop.html/prod-7">Cek jasa "Full Website Development"</a>.</p>`
  },
];

const CATEGORIES = [
  { id: 'all', name: 'Semua', icon: '🏷️' },
  { id: 'ebook', name: 'Ebook', icon: '📖' },
  { id: 'template', name: 'Template', icon: '📄' },
  { id: 'course', name: 'Course', icon: '🎬' },
  { id: 'jasa', name: 'Jasa', icon: '🛠️' },
  { id: 'bundle', name: 'Bundle', icon: '📦' },
];

const BLOG_CATEGORIES = [
  { id: 'all', name: 'Semua' },
  { id: 'Tutorial', name: 'Tutorial' },
  { id: 'Tips', name: 'Tips' },
  { id: 'Opini', name: 'Opini' },
  { id: 'Freebies', name: 'Freebies' },
];

function formatPrice(price) {
  if (price >= 100000) {
    return 'Rp ' + (price / 1000).toFixed(0) + 'K';
  }
  return 'Rp ' + (price / 1000).toFixed(1) + 'K';
}

function getDiscount(product) {
  if (!product.originalPrice) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}
