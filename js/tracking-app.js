// js/tracking-app.js

// Ambil data global dari dataBahanAjar.js
const pengirimanList = globalData.pengirimanList;
const paketList = globalData.paket;
// Pastikan data tracking diubah menjadi array (format yang umum untuk Vue)
const initialTracking = Array.isArray(globalData.tracking) ? globalData.tracking.map(item => ({ ...item })) : [globalData.tracking["DO2025-0001"]]; 

var trackingApp = new Vue({
    el: '#trackingApp',
    data: {
        trackingData: initialTracking, 
        pengirimanList: pengirimanList,
        paketList: paketList,
        
        // Data untuk Form Tambah DO
        newDO: {
            nim: '',
            nama: '',
            // Mengambil tanggal hari ini dalam format YYYY-MM-DD
            tanggalKirim: new Date().toISOString().substr(0, 10), 
        },
        selectedEkspedisi: '',
        selectedPaket: '',
        
        // Data untuk Tracking
        searchDO: '',
        currentTracking: {},
        searchAttempted: false,
    },
    
    // -----------------------------------------------------------
    // 1. Computed Property
    // -----------------------------------------------------------
    computed: {
        // Penomoran DO Otomatis (Menggunakan data Array)
        nextDONumber() {
            const year = new Date().getFullYear();
            
            // Mencari sequence tertinggi dari data yang ada
            const lastSequence = this.trackingData.reduce((max, item) => {
                // Mencocokkan pola DO[Tahun]-[Sequence]
                const match = item.nomorDO.match(/DO\d{4}-(\d+)/); 
                return match ? Math.max(max, parseInt(match[1])) : max;
            }, 0);
            
            const nextSequence = lastSequence + 1; 
            return `DO${year}-${String(nextSequence).padStart(4, '0')}`;
        },
        
        // Detail Paket yang dipilih
        detailPaket() {
            return this.paketList.find(p => p.kode === this.selectedPaket);
        },
    },

    // -----------------------------------------------------------
    // 2. Methods Property
    // -----------------------------------------------------------
    methods: {
        formatRupiah(number) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
        },
        
        // Menambah Data DO Baru
        tambahDO() {
            if (!this.detailPaket || !this.selectedEkspedisi || !this.newDO.nim || !this.newDO.nama) {
                alert("Harap lengkapi semua field yang wajib diisi.");
                return;
            }
            
            const newDOData = {
                nomorDO: this.nextDONumber,
                nim: this.newDO.nim,
                nama: this.newDO.nama,
                ekspedisi: this.selectedEkspedisi,
                tanggalKirim: this.newDO.tanggalKirim,
                paket: this.detailPaket.kode,
                total: this.detailPaket.harga,
                perjalanan: [
                    { waktu: new Date().toLocaleString(), keterangan: `DO Dibuat: ${this.detailPaket.nama}` }
                ],
                status: 'Dikirim',
            };

            this.trackingData.push(newDOData);
            
            // Reset form
            this.newDO = { nim: '', nama: '', tanggalKirim: new Date().toISOString().substr(0, 10) };
            this.selectedEkspedisi = '';
            this.selectedPaket = '';
            
            alert(`DO ${newDOData.nomorDO} berhasil ditambahkan!`);
        },
        
        // Mencari DO
        cariDO() {
            this.searchAttempted = true;
            this.currentTracking = {};
            
            const searchKey = this.searchDO.trim();
            const result = this.trackingData.find(item => item.nomorDO === searchKey);
            
            if (result) {
                // Memastikan data perjalanan diurutkan dari terbaru ke terlama
                this.currentTracking = {
                    ...result,
                    perjalanan: result.perjalanan.sort((a, b) => new Date(b.waktu) - new Date(a.waktu))
                };
            } else {
                alert("Nomor DO tidak ditemukan.");
            }
        }
    },
    
    // -----------------------------------------------------------
    // 3. Watcher
    // -----------------------------------------------------------
    watch: {
        // Watcher 1: Memantau perubahan Paket 
        selectedPaket(newVal) {
            if (newVal) {
                const total = this.detailPaket ? this.detailPaket.harga : 0;
                console.log(`Watcher: Paket berubah ke ${newVal}, Total Harga: ${this.formatRupiah(total)}`);
            }
        },
        // Watcher 2: Memantau perubahan searchDO untuk membersihkan hasil tracking jika input kosong
        searchDO(newVal) {
            if (newVal === '') {
                this.currentTracking = {};
                this.searchAttempted = false;
            }
        }
    }
});