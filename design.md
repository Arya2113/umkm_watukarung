# Design System — JELAJAH Watukarung

Dokumen ini diturunkan dari 2 mockup referensi (halaman Dashboard dan About) dan dipakai sebagai acuan implementasi di project Astro. Pasangkan dengan `PROMPT_Website_JELAJAH_Watukarung.md` untuk struktur data & fitur — dokumen ini fokus ke tampilan.

## 1. Kepribadian visual

Hangat, terpercaya, dan bersih — kesan "pusat informasi resmi desa wisata", bukan brosur promosi berlebihan. Warna cream/mint mengingatkan pasir dan laut, teal gelap memberi kesan profesional/institusional (cocok untuk konten survei KKN), kartu putih mengambang menjaga keterbacaan data yang padat (189 entri).

## 2. Palet warna

| Token | Hex (perkiraan) | Dipakai untuk |
|---|---|---|
| `--color-bg-top` | `#FCEEE0` | Bagian atas gradient background halaman |
| `--color-bg-bottom` | `#EAF3EC` | Bagian bawah gradient background halaman |
| `--color-surface` | `#FFFFFF` | Card, navbar, input |
| `--color-primary` | `#0E4F4C` | Logo, tombol CTA utama, link aktif, tombol "Maps" |
| `--color-primary-dark` | `#16302E` | Badge kategori (background gelap hampir hitam-teal) |
| `--color-primary-light` | `#CFE3DD` | Hover state, outline badge tipis |
| `--color-accent-whatsapp` | `#25D366` | Tombol "Chat WhatsApp" |
| `--color-star` | `#F5A524` | Ikon rating bintang |
| `--color-text-primary` | `#17181A` | Judul, teks utama |
| `--color-text-secondary` | `#6E7378` | Paragraf, subtitle, label |
| `--color-text-muted` | `#9CA0A6` | Placeholder, teks bantu |
| `--color-border` | `#EFE7DA` | Garis pembatas tipis, divider |

Background halaman pakai gradient lembut, bukan warna solid:
```css
background: linear-gradient(180deg, var(--color-bg-top) 0%, var(--color-bg-bottom) 100%);
```

## 3. Tipografi

Satu keluarga font geometris tebal dipakai konsisten di seluruh halaman (bukan pasangan display+body terpisah) — direkomendasikan **Plus Jakarta Sans** (Google Fonts, gratis, karakter bulat/geometris mirip referensi, mendukung diakritik Indonesia dengan baik).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

| Elemen | Ukuran | Weight | Catatan |
|---|---|---|---|
| Logo/wordmark navbar | 20px | 700 | Uppercase, letter-spacing 0.02em |
| Hero title (Dashboard banner) | 56–64px | 800 | Uppercase, warna putih di atas foto |
| H1 (About) | 48px | 800 | Warna `--color-text-primary` |
| H2 (section heading) | 28–32px | 700 | Mis. "Overview", "The Team Behind the Vision" |
| Judul kartu / nama tempat | 16–18px | 600 | |
| Angka statistik (KPI) | 28–32px | 700 | |
| Body / paragraf | 15–16px | 400 | line-height 1.7, warna secondary |
| Label KPI, caption | 13px | 500 | warna secondary |
| Eyebrow/badge kecil | 11–12px | 600 | Uppercase, letter-spacing 0.05em |

## 4. Spacing, radius, shadow

| Token | Nilai |
|---|---|
| `--radius-card` | 20px |
| `--radius-button` | 10px |
| `--radius-pill` | 999px |
| `--radius-image` | 20px |
| `--shadow-card` | `0 4px 16px rgba(0,0,0,0.05)` |
| Jarak antar section | 2.5–3rem |
| Padding card | 1.25–1.5rem |

## 5. Komponen & pemetaan ke Astro

### Navbar (`Navbar.astro`) — dipakai di semua halaman
- Logo teks kiri (bukan gambar), warna `--color-primary`
- Nav link tengah/kiri-tengah: Beranda, Tentang — item aktif diberi garis bawah teal
- Kanan: ikon search, ikon notifikasi (opsional, bisa dihilangkan jika tidak relevan untuk situs statis), ikon profil (opsional — situs informasi publik mungkin tidak butuh akun, bisa diganti tombol "Hubungi Desa" kalau perlu)

### Hero Dashboard (`HeroBanner.astro`)
- Foto full-width pantai Watukarung dengan overlay gelap tipis
- Judul besar putih di tengah: "JELAJAH WATUKARUNG"
- Tinggi ±280–320px

### Hero About (`AboutHero.astro`)
- Layout 2 kolom: kiri teks (eyebrow badge + H1 + paragraf + tombol CTA "Explore Destinations" → arahkan ke halaman destinasi), kanan foto besar rounded dengan tag lokasi mengambang di pojok kiri bawah foto

### KPI card (`KpiCard.astro`, dipakai 4x dalam grid)
- Ikon bulat kecil (teal) + label + angka besar
- **Catatan implementasi**: mockup pakai data dummy ("Total Visitors", "Total Reviews") yang tidak ada di data survei kamu. Ganti isinya dengan angka riil yang memang kamu punya, misalnya: Destinasi Wisata (14), Akomodasi (43), Kuliner & UMKM (113), Penunjang (12) — dihitung otomatis dari panjang tiap file JSON.

### Panel peta (`MapPreview.astro`)
- Card kiri, lebih lebar — preview peta kawasan
- Untuk versi nyata: embed Google Maps (iframe) berpusat di Watukarung, atau gambar peta statis yang klik untuk buka Google Maps

### Panel info kanan (`InfoPanel.astro`)
- Mockup menampilkan cuaca hari ini + event mendatang. **Catatan**: cuaca butuh API eksternal (opsional, bisa pakai Open-Meteo gratis tanpa API key), dan "event mendatang" hanya relevan kalau memang ada acara desa terjadwal — kalau tidak ada, ganti kontennya jadi hal yang datanya kamu punya, misalnya kontak cepat posko desa / jam ramai wisatawan / tips kunjungan.

### Search bar (`SearchBar.astro`)
- Input pill penuh lebar dengan ikon kaca pembesar di kiri

### Filter kategori (`CategoryFilter.astro`)
- Pill horizontal, item aktif terisi warna `--color-primary` + teks putih, item lain outline tipis

### Kartu listing (`ListingCard.astro`)
- Layout horizontal: thumbnail kotak rounded kiri, tengah (badge kategori gelap + nama tebal + rating), kanan 2 tombol bertumpuk (WhatsApp hijau, Maps teal)
- **Catatan implementasi**: rating bintang & jumlah review di mockup adalah data dummy — data survei KKN kamu tidak mengumpulkan ini. Dua opsi: (a) hilangkan elemen rating dari kartu, atau (b) kalau mau tetap dipakai secara visual, ganti jadi badge non-rating seperti "Buka sekarang" / jarak dari pantai, bukan angka yang kamu karang sendiri.
- Thumbnail foto: kalau field `linkFoto` di data kamu banyak kosong, siapkan 1 foto placeholder generik per kategori sebagai fallback, jangan biarkan kotak kosong.

### Kartu tim (`TeamCard.astro`, halaman About)
- Foto bulat, nama tebal, peran di bawahnya warna teal kecil huruf kapital
- Grid 5 kolom desktop → responsif jadi 2–3 kolom di mobile

### Tombol
- Primary (CTA besar seperti "Explore Destinations"): bg `--color-primary`, teks putih, radius `--radius-button`, ikon panah kanan
- WhatsApp: bg `--color-accent-whatsapp`, teks putih, ikon whatsapp
- Maps: bg `--color-primary`, teks putih, ikon pin

### Badge kategori
- Background `--color-primary-dark`, teks putih, uppercase, padding kecil, radius 6–8px (bukan pill penuh)

## 6. CSS variables siap pakai

Taruh di `src/styles/global.css`:

```css
:root {
  --color-bg-top: #FCEEE0;
  --color-bg-bottom: #EAF3EC;
  --color-surface: #FFFFFF;
  --color-primary: #0E4F4C;
  --color-primary-dark: #16302E;
  --color-primary-light: #CFE3DD;
  --color-accent-whatsapp: #25D366;
  --color-star: #F5A524;
  --color-text-primary: #17181A;
  --color-text-secondary: #6E7378;
  --color-text-muted: #9CA0A6;
  --color-border: #EFE7DA;

  --radius-card: 20px;
  --radius-button: 10px;
  --radius-pill: 999px;
  --radius-image: 20px;
  --shadow-card: 0 4px 16px rgba(0,0,0,0.05);

  --font-main: "Plus Jakarta Sans", system-ui, sans-serif;
}

body {
  font-family: var(--font-main);
  background: linear-gradient(180deg, var(--color-bg-top) 0%, var(--color-bg-bottom) 100%);
  color: var(--color-text-primary);
  min-height: 100vh;
}
```

## 7. Responsif

- KPI grid: 4 kolom desktop → 2 kolom tablet → 1 kolom mobile
- Panel peta + info kanan: 2 kolom desktop → ditumpuk (map di atas, info di bawah) mobile
- Kartu listing: tetap horizontal di desktop, di mobile thumbnail mengecil dan tombol aksi jadi 1 baris sejajar (bukan ditumpuk) supaya tidak makan tinggi
- Tim grid: 5 kolom desktop → 3 kolom tablet → 2 kolom mobile
- Navbar: ikon kanan tetap terlihat, nav link tengah disembunyikan jadi hamburger menu di layar sempit
