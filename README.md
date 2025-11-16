# 📚 TUGAS PRAKTIK 2: APLIKASI PEMESANAN BAHAN AJAR SITTA (Vue.js)

Proyek ini dikembangkan menggunakan **Vue.js versi 2 (Standalone)** untuk memenuhi Tugas Praktik 2 mata kuliah Pemrograman Berbasis Web. Aplikasi ini mensimulasikan sebagian alur kerja pemesanan dan distribusi bahan ajar SITTA di Universitas Terbuka, dengan fokus pada implementasi konsep dasar Vue.js

Seluruh data yang digunakan (stok, paket, tracking) diambil dari *dummy data* (`js/dataBahanAjar.js`) sesuai instruksi

---

## 🚀 Indikator Capaian Tugas yang Diimplementasikan

Proyek ini telah menerapkan indikator capaian utama, termasuk:

1.  **Sistem Perorganisasian Kode:** Menggunakan struktur proyek Vue.js yang disepakati (HTML terpisah, JS terpisah).
2.  **Display Data (Mustaches/v-text/v-html):** Digunakan untuk menampilkan semua data tabel, detail paket, dan catatan (`catatanHTML`).
3.  **Conditional Rendering (v-if/v-show):** Digunakan untuk menampilkan **Status Stok** (Aman/Menipis/Kosong), serta untuk mengimplementasikan *dependent options* pada filter stok (filter Kategori hanya muncul setelah filter UPBJJ dipilih).
4.  **Data Binding (v-bind/v-model):**
    * **`v-model` (Two-way):** Digunakan pada semua formulir input (Tambah Stok, Tambah DO) dan pada fitur **Edit Stok** langsung di tabel.
    * **Computed Properties:** Digunakan untuk mengimplementasikan **Filter dan Sort** pada Halaman Stok, serta untuk penomoran **DO Otomatis** dan kalkulasi **Total Harga**.
5.  **Watcher:** Minimal 2 *watcher* diimplementasikan untuk memantau perubahan data dan memicu logika non-komputasi.

---

## 💻 Fitur Utama Aplikasi

### 1. Halaman Stok Bahan Ajar (`stok.html`) 

Halaman ini menampilkan daftar stok bahan ajar dengan fitur manajemen data dan analisis kebutuhan *reorder*.

| Kolom Data | Implementasi |
| :--- | :--- |
| Kode/Nama MK | Ditampilkan menggunakan data `kode` dan `judul`. |
| Stok/Safety Stok | Data `qty` dan `safety` Qty dapat diedit langsung menggunakan `v-model`. |
| **Status** | Diberi status **Aman** (Hijau/Checkmark), **Menipis** (Oranye/Warning), atau **Kosong** (Merah/Bahaya) berdasarkan perbandingan `qty` dan `safety` menggunakan `v-if/v-else-if`. |
| Catatan | Ditampilkan menggunakan `v-html` untuk *rendering* HTML (data `catatanHTML`). |

**Fitur Interaktif:**
* **Filter Kritis:** Filter checkbox yang hanya menampilkan item di mana `qty < safety` atau `qty = 0`.
* **Filter Dependent Options:** Filter Kategori Mata Kuliah hanya muncul setelah Filter UT-Daerah (UPBJJ) dipilih.
* **Sort:** Fitur sort berdasarkan Judul, Stok, dan Harga menggunakan `computed property`.
* **Efisiensi Filter:** Logic *filtering* dan *sorting* diimplementasikan dalam **Computed Properties berantai** untuk memastikan bahwa filter tidak perlu *recompute* seluruh data jika hanya kunci *sorting* yang berubah.
* **Tambah Data Baru:** Formulir kecil untuk menambah data baru dengan validasi sederhana dan langsung memperbarui DOM (tabel).

### 2. Halaman Tracking Delivery Order (DO) (`tracking.html`) 

Halaman ini memungkinkan pengguna untuk menambahkan DO baru dan melacak DO yang sudah ada.

| Fitur Formulir | Implementasi |
| :--- | :--- |
| **Nomor DO Otomatis** | Dihitung menggunakan **Computed Property**. Format penomoran: `DO[Tahun]-[Sequence Number]` (Contoh: `DO2025-0002`). |
| Pilihan Paket | Menggunakan `<select>` dengan `v-for` untuk menampilkan Kode dan Nama Paket. |
| Detail Paket | Setelah paket dipilih, detail isi paket ditampilkan menggunakan `v-if`. |
| Total Harga | Total Harga (`harga`) diambil dari data paket dan ditampilkan. |

**Fitur Tracking:**
* **Pencarian DO:** Menerima input Nomor DO, mencari data di *array* `trackingData`, dan menampilkan riwayat perjalanan (timeline).
* Riwayat perjalanan diurutkan dari yang terbaru ke yang terlama.

---

## 🛠️ Struktur Proyek