# 📚 TUGAS PRAKTIK 2: APLIKASI PEMESANAN BAHAN AJAR SITTA (Vue.js)

Proyek ini dikembangkan menggunakan **Vue.js versi 2 (Standalone)** untuk memenuhi Tugas Praktik 2 mata kuliah Pemrograman Berbasis Web. [cite_start]Aplikasi ini mensimulasikan sebagian alur kerja pemesanan dan distribusi bahan ajar SITTA di Universitas Terbuka, dengan fokus pada implementasi konsep dasar Vue.js[cite: 3, 4, 12, 13].

[cite_start]Seluruh data yang digunakan (stok, paket, tracking) diambil dari *dummy data* (`js/dataBahanAjar.js`) sesuai instruksi[cite: 13, 83].

---

## 🚀 Indikator Capaian Tugas yang Diimplementasikan

Proyek ini telah menerapkan indikator capaian utama, termasuk:

1.  [cite_start]**Sistem Perorganisasian Kode:** Menggunakan struktur proyek Vue.js yang disepakati (HTML terpisah, JS terpisah)[cite: 68, 69, 70, 72, 74, 80, 82].
2.  [cite_start]**Display Data (Mustaches/v-text/v-html):** Digunakan untuk menampilkan semua data tabel, detail paket, dan catatan (`catatanHTML`)[cite: 7, 87, 32].
3.  [cite_start]**Conditional Rendering (v-if/v-show):** Digunakan untuk menampilkan **Status Stok** (Aman/Menipis/Kosong) [cite: 88, 43][cite_start], serta untuk mengimplementasikan *dependent options* pada filter stok (filter Kategori hanya muncul setelah filter UPBJJ dipilih)[cite: 88, 41, 42].
4.  **Data Binding (v-bind/v-model):**
    * [cite_start]**`v-model` (Two-way):** Digunakan pada semua formulir input (Tambah Stok, Tambah DO) dan pada fitur **Edit Stok** langsung di tabel[cite: 9, 33, 87].
    * [cite_start]**Computed Properties:** Digunakan untuk mengimplementasikan **Filter dan Sort** pada Halaman Stok, serta untuk penomoran **DO Otomatis** dan kalkulasi **Total Harga**[cite: 9, 89].
5.  [cite_start]**Watcher:** Minimal 2 *watcher* diimplementasikan untuk memantau perubahan data dan memicu logika non-komputasi[cite: 10, 90].

---

## 💻 Fitur Utama Aplikasi

### [cite_start]1. Halaman Stok Bahan Ajar (`stok.html`) [cite: 15]

Halaman ini menampilkan daftar stok bahan ajar dengan fitur manajemen data dan analisis kebutuhan *reorder*.

| Kolom Data | Implementasi |
| :--- | :--- |
| Kode/Nama MK | [cite_start]Ditampilkan menggunakan data `kode` dan `judul`[cite: 19, 20]. |
| Stok/Safety Stok | [cite_start]Data `qty` dan `safety`[cite: 26, 28]. [cite_start]Qty dapat diedit langsung menggunakan `v-model`[cite: 33]. |
| **Status** | [cite_start]Diberi status **Aman** (Hijau/Checkmark), **Menipis** (Oranye/Warning), atau **Kosong** (Merah/Bahaya) berdasarkan perbandingan `qty` dan `safety` menggunakan `v-if/v-else-if`[cite: 43, 44, 45, 46]. |
| Catatan | [cite_start]Ditampilkan menggunakan `v-html` untuk *rendering* HTML (data `catatanHTML`)[cite: 31, 32]. |

**Fitur Interaktif:**
* [cite_start]**Filter Kritis:** Filter checkbox yang hanya menampilkan item di mana `qty < safety` atau `qty = 0`[cite: 38].
* [cite_start]**Filter Dependent Options:** Filter Kategori Mata Kuliah hanya muncul setelah Filter UT-Daerah (UPBJJ) dipilih[cite: 41, 42].
* [cite_start]**Sort:** Fitur sort berdasarkan Judul, Stok, dan Harga menggunakan `computed property`[cite: 39].
* [cite_start]**Efisiensi Filter:** Logic *filtering* dan *sorting* diimplementasikan dalam **Computed Properties berantai** untuk memastikan bahwa filter tidak perlu *recompute* seluruh data jika hanya kunci *sorting* yang berubah[cite: 40].
* [cite_start]**Tambah Data Baru:** Formulir kecil untuk menambah data baru dengan validasi sederhana dan langsung memperbarui DOM (tabel)[cite: 47, 91].

### [cite_start]2. Halaman Tracking Delivery Order (DO) (`tracking.html`) [cite: 48, 50]

Halaman ini memungkinkan pengguna untuk menambahkan DO baru dan melacak DO yang sudah ada.

| Fitur Formulir | Implementasi |
| :--- | :--- |
| **Nomor DO Otomatis** | Dihitung menggunakan **Computed Property**. [cite_start]Format penomoran: `DO[Tahun]-[Sequence Number]` (Contoh: `DO2025-0002`)[cite: 52, 53, 54, 55, 57]. |
| Pilihan Paket | [cite_start]Menggunakan `<select>` dengan `v-for` untuk menampilkan Kode dan Nama Paket[cite: 62, 63]. |
| Detail Paket | [cite_start]Setelah paket dipilih, detail isi paket ditampilkan menggunakan `v-if`[cite: 64]. |
| Total Harga | [cite_start]Total Harga (`harga`) diambil dari data paket dan ditampilkan[cite: 66, 67]. |

**Fitur Tracking:**
* [cite_start]**Pencarian DO:** Menerima input Nomor DO, mencari data di *array* `trackingData`, dan menampilkan riwayat perjalanan (timeline)[cite: 49].
* Riwayat perjalanan diurutkan dari yang terbaru ke yang terlama.

---

## 🛠️ Struktur Proyek