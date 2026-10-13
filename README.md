# Portal Persiapan & Instrumen Akreditasi TPQ Muslimat NU AL-IKHLAS
**Yayasan AL FATAH**

Portal interaktif komprehensif untuk panduan, manajemen data inputan lembaga, dan verifikasi bukti fisik akreditasi Taman Pendidikan Al-Qur'an (TPQ) sesuai standar **Kementerian Agama RI (Direktorat PD Pontren)**, **Badan Akreditasi Lembaga Pendidikan Al-Qur'an (LPPTQ)**, dan karakteristik nilai kelembagaan **Muslimat Nahdlatul Ulama (Ahlussunnah wal Jama'ah An-Nahdliyah)**.

---

## 🌟 Fitur Utama & Menu Baru Website

### 1. 📖 Menu Dokumen & Full Preview Resmi
- **Katalog Lengkap Dokumen**: Menyajikan dokumen-dokumen akreditasi resmi berstandar Kemenag & Muslimat NU.
- **KOP Surat & Format Dinas Resmi**: Dilengkapi lambang Al-Qur'an, logo Muslimat NU, identitas Yayasan AL FATAH, NSQ Kemenag, dan SK IJOP.
- **Data Terhubung Otomatis (Live Sync)**:
  - Dokumen **Buku Induk Santri** otomatis memuat tabel santri dari database Peserta Didik.
  - Dokumen **Buku Induk Pendidik** otomatis memuat daftar ustadzah lengkap dengan nomor syahadah metode Al-Qur'an.
  - Dokumen **Buku Inventaris** otomatis memuat tabel aset sarpras dan kondisi fisiknya.
  - Dokumen **Buku Kas Umum** otomatis memuat mutasi penerimaan dan pengeluaran kas dengan saldo akhir.
  - Dokumen **SK Susunan Pengurus, SOP KBM 90 Menit, Silabus Aswaja, Tata Tertib, dan Pakta Integritas** otomatis memuat identitas pengurus terkini.
- **Cetak Dokumen Satu Klik**: Tombol *Cetak Dokumen Resmi* membuka jendela cetak rapi dengan layout lembar kertas resmi (*paper sheet*).

### 2. ✍️ Menu Kelola Data & Inputan Interaktif (CRUD)
Pengurus dapat menginput, memperbarui, mencari, dan menghapus data langsung dari antarmuka website:
- **👦 Tab Peserta Didik (Santri)**:
  - Input: NIS, NIK (16 digit), Nama Santri, L/P, TTL, Jilid/Kelas, Nama Orang Tua, WhatsApp Wali, Alamat, Status (Aktif/Lulus/Mutasi).
- **👩‍🏫 Tab Pendidik (Ustadz / Ustadzah)**:
  - Input: NIP, NIK, Nama & Gelar, Pendidikan Formal, Asal Pesantren, Metode Al-Qur'an, Nomor Syahadah, Tahun Lulus, Rombel/Tugas Mengajar, Nomor HP.
- **🏢 Tab Sarana & Prasarana (Inventaris)**:
  - Input: Kode Barang, Nama Fasilitas, Kategori, Jumlah/Satuan, Kondisi (Baik, Rusak Ringan, Rusak Berat), Sumber Perolehan, Lokasi Ruang.
- **💰 Tab Buku Kas Keuangan**:
  - Input: Tanggal Transaksi, Jenis (Pemasukan/Pengeluaran), Kategori, Nomor Bukti/Kwitansi, Nominal Rupiah, Uraian Transaksi.
  - Dilengkapi ringkasan otomatis: Total Pemasukan, Total Pengeluaran, dan Saldo Akhir Kas Tunai.
- **🏛️ Tab Profil Lembaga & Legalitas**:
  - Form edit Nama Kepala TPQ, Ketua Yayasan, Nomor Statistik (NSQ), SK IJOP Kemenag, Akta Notaris, Alamat Lengkap, Kontak, dan Metode Al-Qur'an.
  - Tombol *Reset ke Data Awal* untuk memulihkan sampel data realistis bawaan kapan saja.

### 3. 📋 Checklist & Pelacak Status Akreditasi (51 Instrumen)
- Terbagi dalam **8 Kategori Standar**: Kelembagaan & Legalitas, Kurikulum & KBM, Kesiswaan, Pendidik & PTK, Sarpras & Keuangan, Kekhasan Ke-NU-an Aswaja, SOP Tata Kelola, dan Komite Wali Santri & Prestasi.
- Pengaturan status per dokumen: *Siap & Lengkap*, *Proses / Draf*, atau *Belum Ada*.
- Form modal detail: Rekomendasi asesor Kemenag, syarat wajib yang harus ada, dan catatan internal lembaga.

### 4. 📊 Pemetaan 8 Standar Nasional (SNP) & Simulasi Skor (EDL)
- Pemetaan ke 8 SNP (SKL, Standar Isi, Standar Proses, Pendidik, Sarpras, Pengelolaan, Pembiayaan, Penilaian).
- Simulasi skor otomatis berbasis bobot (Predikat A: Unggul ≥ 86 Poin, B: Baik 71–85, C: Cukup 56–70).

### 5. 🗂️ Panduan Box Odner & Penataan Ruang Visitasi
- Panduan pembagian 5 Map Odner Bantex bertulang tebal dengan kode warna (Hijau, Biru, Kuning, Ungu, Merah).
- Protokol tata ruang visitasi tim asesor Kemenag.

### 6. 💾 Backup & Pemulihan Data
- Penyimpanan lokal otomatis di peramban (`localStorage`), data tidak hilang saat ditutup atau di-refresh.
- Fitur **Unduh Cadangan JSON** dan **Pulihkan dari JSON**.
- Ekspor rekapitulasi checklist ke format **CSV / Excel**.

---

## 🚀 Cara Menjalankan Website

### Opsi 1: Klik Ganda Berkas
Cukup klik ganda (double-click) pada berkas `index.html` di penjelajah berkas Windows (File Explorer).

### Opsi 2: Buka Melalui Local Server
Buka peramban internet (Chrome, Edge, Firefox) dan akses:
```
http://localhost:8080/
```

---

## 📁 Struktur Berkas Proyek

```
TPQ/
├── index.html            # Antarmuka utama portal akreditasi
├── css/
│   └── custom.css        # Desain gaya kustom, badges, kop surat, dan aturan cetak (.doc-paper)
├── js/
│   ├── data.js           # Dataset 51 instrumen akreditasi, 8 kategori, dan tips asesor
│   ├── store.js          # Database & CRUD engine untuk santri, guru, sarpras, kas, dan profil
│   ├── full_documents.js # Engine generator dokumen resmi dengan KOP dan tabel dinamis
│   ├── templates.js      # Generator draf naskah SK, tatib, SOP, dan pakta integritas
│   └── app.js            # Controller logika navigasi, checklist, modal CRUD, dan scoring
└── README.md             # Petunjuk pengoperasian sistem
```

---
*TPQ Muslimat NU AL-IKHLAS • Yayasan AL FATAH • Menuju Akreditasi A (Unggul)*
