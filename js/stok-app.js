// js/stok-app.js

// Pastikan globalData tersedia karena js/dataBahanAjar.js di-load sebelum ini
const initialStok = globalData.stok.map(item => ({ ...item }));
const upbjjList = globalData.upbjjList;
const kategoriList = globalData.kategoriList;

var stokApp = new Vue({
    el: '#stokApp',
    data: {
        stokData: initialStok,
        upbjjList: upbjjList,
        kategoriList: kategoriList,
        
        // Data untuk Filter dan Sort
        filterUpbjj: '',
        filterKategori: '',
        filterKritis: false,
        sortKey: 'judul',
        
        // Data untuk Form Tambah (Disesuaikan nilai default agar cocok dengan HTML select)
        newBahanAjar: {
            kode: '',
            judul: '',
            // NILAI AWAL DISESUAIKAN menjadi string kosong ("")
            kategori: '', 
            upbjj: 'Jakarta', // Diperlukan untuk model data yang lengkap
            lokasiRak: 'R4-A1', 
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        },
        validationError: null,
    },
    
    // -----------------------------------------------------------
    // 1. Computed Property (Filter dan Sort)
    // -----------------------------------------------------------
    computed: {
        filteredStok() {
            let data = this.stokData;

            // Filter Kritis (Qty < Safety atau Qty = 0)
            if (this.filterKritis) {
                data = data.filter(item => item.qty < item.safety || item.qty === 0);
            }

            // Filter UPBJJ
            if (this.filterUpbjj) {
                data = data.filter(item => item.upbjj === this.filterUpbjj);
            }
            
            // Filter Kategori (hanya berlaku jika UPBJJ dipilih DAN Kategori dipilih)
            if (this.filterUpbjj && this.filterKategori) {
                data = data.filter(item => item.kategori === this.filterKategori);
            }

            return data;
        },

        filteredAndSortedStok() {
            let data = this.filteredStok.slice();

            // Sort data
            data.sort((a, b) => {
                let aVal, bVal;
                
                if (this.sortKey === 'judul') {
                    aVal = a.judul.toLowerCase();
                    bVal = b.judul.toLowerCase();
                    return aVal.localeCompare(bVal);
                } else if (this.sortKey === 'qty' || this.sortKey === 'harga') {
                    aVal = a[this.sortKey];
                    bVal = b[this.sortKey];
                    return aVal - bVal;
                }
                return 0;
            });
            
            return data;
        }
    },

    // -----------------------------------------------------------
    // 2. Methods Property
    // -----------------------------------------------------------
    methods: {
        // Metode Status Stok
        getStatusText(qty, safety) {
            if (qty === 0) return 'Kosong';
            if (qty < safety) return 'Menipis';
            return 'Aman';
        },
        getStatusClass(qty, safety) {
            if (qty === 0) return 'status-kosong';
            if (qty < safety) return 'status-menipis';
            return 'status-aman';
        },
        getStatusIcon(qty, safety) {
            if (qty === 0) return '<i class="fas fa-exclamation-triangle"></i>';
            if (qty < safety) return '<i class="fas fa-exclamation-circle"></i>';
            return '<i class="fas fa-check-circle"></i>';
        },

        // Metode Reset Filter
        resetFilters() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.filterKritis = false;
            this.sortKey = 'judul';
        },

        // Metode Tambah Data
        tambahData() {
            this.validationError = null;
            
            // Validasi Sederhana
            if (!this.newBahanAjar.kode || !this.newBahanAjar.judul || !this.newBahanAjar.kategori || this.newBahanAjar.qty === null || this.newBahanAjar.safety === null) {
                this.validationError = "Semua field wajib diisi.";
                return;
            }

            // Tambahkan data baru
            this.stokData.push({
                ...this.newBahanAjar,
                lokasiRak: this.newBahanAjar.lokasiRak || 'R4-Z9', 
                harga: this.newBahanAjar.harga || 50000, 
                catatanHTML: 'Data Baru Ditambahkan',
                upbjj: this.newBahanAjar.upbjj || 'Jakarta', 
            });

            // Reset form
            this.newBahanAjar = {
                kode: '', judul: '', kategori: '', upbjj: 'Jakarta', lokasiRak: 'R4-A1', harga: 0, qty: 0, safety: 0, catatanHTML: ''
            };
            this.validationError = null;
            alert(`Data ${this.stokData[this.stokData.length - 1].judul} berhasil ditambahkan!`);
        },
        
        // Metode Edit Stok
        simpanEdit(item) {
            alert(`Stok ${item.judul} berhasil diperbarui menjadi ${item.qty}.`);
        }
    },

    // -----------------------------------------------------------
    // 3. Watcher (Minimal 2 Watcher)
    // -----------------------------------------------------------
    watch: {
        // Watcher 1: Mengatur ulang filter Kategori jika filter UPBJJ diubah
        filterUpbjj(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.filterKategori = ''; 
            }
        },
        
        // Watcher 2: Memberikan feedback jika user mencoba memasukkan safety stock yang lebih besar dari QTY saat menambah data.
        'newBahanAjar.safety': function(newSafety) {
            // Cek jika newSafety bukan null/undefined dan lebih besar dari qty saat ini
             if (newSafety !== null && newSafety > this.newBahanAjar.qty) {
                 console.warn("Safety stock disarankan lebih kecil atau sama dengan Stok saat menambah data.");
             }
        }
    }
});