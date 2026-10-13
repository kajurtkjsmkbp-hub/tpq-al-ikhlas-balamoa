# Portal Persiapan & Instrumen Akreditasi TPQ Muslimat NU AL-IKHLAS
**Yayasan AL FATAH — Balamoa**  
*Sistem Informasi Kelembagaan, Tata Kelola Akreditasi 8 Standar Kemenag RI, Basis Data Santri EMIS, & Modul Dokumen Cetak Fisik A4*

---

## 🌟 Fitur Utama Sistem (Versi 3.4)

1. **📝 Formulir Pendaftaran Calon Santri Baru (Dinamis & Fleksibel)**:
   - Sesuai dengan format fisik resmi (Identitas Calon Santri, Data Orang Tua/Wali, Syarat Pendaftaran, Kolom Pas Foto 3x4, Tanda Tangan).
   - Pengaturan interaktif: Judul, tahun ajaran, tag cabang, toggle aktif/nonaktif kolom, edit label kolom, dan pilihan Kop Resmi Lembaga vs Judul Polos.
   - Pilihan **Mode Blanko** (titik-titik untuk ditulis tangan) atau **Mode Terisi Otomatis** dari 25 data santri EMIS.
2. **📖 Dokumen & Full Preview Resmi (Kemenag & Muslimat NU)**:
   - 16 dokumen fisik siap cetak standar A4 (Buku Induk Santri Landscape 12 Kolom, Buku Induk Dewan Guru, Buku Inventaris, Buku Kas Umum, SK Susunan Pengurus, SOP KBM, Silabus Aswaja, Tata Tertib, Pakta Integritas, dll.).
3. **✍️ Kelola Data & Inputan Interaktif (CRUD)**:
   - Kelola data santri, ustadzah, inventaris sarpras, transaksi kas umum, dan profil kelembagaan.
4. **📋 Checklist & Pelacak Status Akreditasi (51 Instrumen)**:
   - Terbagi dalam 8 standar instrumen Kemenag RI lengkap dengan scoring otomatis (EDL).
5. **🗂️ Modul Cetak Fisik Box Odner 1 s.d. 6**:
   - Berkas siap cetak per Box Odner lengkap dengan cover depan dan label punggung 7.5 cm.
6. **💾 Dual Persistence Database (SQLite + SQL Dump + LocalStorage)**:
   - Tersimpan di disk sebagai basis data relasional SQLite (`tpq_alikhlas.db`), otomatis diekspor ke SQL Dump (`tpq_alikhlas.sql`), dan failover otomatis ke peramban (`localStorage`).

---

## 🖥️ PANDUAN INSTALASI DI LXC PROXMOX VE

Aplikasi ini menggunakan **Python 3 Standard Library** murni (`http.server`, `sqlite3`, `json`), sehingga **sangat ringan (ultra-lightweight)**, cepat, dan **tanpa memerlukan instalasi paket tambahan (`pip install`)**.

> 💡 *Panduan lebih terperinci dan troubleshooting juga tersedia di file:* [`PANDUAN_PROXMOX_LXC.md`](PANDUAN_PROXMOX_LXC.md)

### Rekomendasi Spesifikasi Container (LXC Proxmox)
* **Template OS**: Debian 12 (Bookworm) *(Rekomendasi)* atau Ubuntu 22.04 / 24.04 LTS
* **Cores**: 1 vCPU
* **RAM**: 512 MB – 1 GB (Pemakaian RAM rata-rata hanya ~30 MB)
* **Disk**: 4 GB – 8 GB
* **Network**: Mode Bridge (`vmbr0`), DHCP atau IP Statis (contoh: `192.168.1.150`)

---

### Langkah-Langkah Instalasi Manual:

#### 1. Update Container & Pasang Paket Dasar
Buka menu **Console** LXC di Proxmox VE (sebagai user `root`), lalu ketik:
```bash
apt update && apt upgrade -y
apt install -y git python3 curl
```

#### 2. Clone Repository dari GitHub
```bash
cd /opt
git clone https://github.com/kajurtkjsmkbp-hub/tpq-al-ikhlas-balamoa.git
cd /opt/tpq-al-ikhlas-balamoa
```

#### 3. Uji Coba Server Manual
```bash
python3 server.py 8080
```
Buka di browser: `http://<IP_LXC_PROXMOX>:8080` (contoh: `http://192.168.1.150:8080/`).  
Jika berhasil terbuka, tekan `Ctrl + C` untuk menghentikan pengujian manual.

#### 4. Pasang Service Otomatis (Systemd Auto-Start)
Agar server otomatis hidup di latar belakang saat container dinyalakan/reboot:

Buat file service:
```bash
nano /etc/systemd/system/tpq.service
```

Salin dan tempel kode berikut:
```ini
[Unit]
Description=Server TPQ Muslimat NU Al-Ikhlas Balamoa
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/tpq-al-ikhlas-balamoa
ExecStart=/usr/bin/python3 /opt/tpq-al-ikhlas-balamoa/server.py 8080
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```
*Simpan dengan menekan `Ctrl + O`, `Enter`, lalu `Ctrl + X`.*

Aktifkan dan jalankan service:
```bash
systemctl daemon-reload
systemctl enable tpq
systemctl start tpq
systemctl status tpq
```

#### 5. (Opsional) Akses Tanpa Port 8080 (Nginx Reverse Proxy)
Jika ingin mengakses langsung via `http://<IP_LXC_PROXMOX>/`:
```bash
apt install -y nginx

cat << 'EOF' > /etc/nginx/sites-available/tpq
server {
    listen 80;
    server_name _;
    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/tpq /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx
```

---

## 🔄 PERINTAH MANUAL UNTUK UPDATE APLIKASI DI LXC

Jalankan perintah ini di Console LXC setiap kali ada pembaruan kode terbaru di GitHub:

### Cara Cepat (1 Baris Perintah):
```bash
cd /opt/tpq-al-ikhlas-balamoa && systemctl stop tpq && git pull origin main && systemctl start tpq && systemctl status tpq
```

### Cara Aman (Dengan Backup Database):
```bash
# 1. Masuk ke folder aplikasi
cd /opt/tpq-al-ikhlas-balamoa

# 2. Hentikan service
systemctl stop tpq

# 3. Backup database yang sedang aktif
cp database/tpq_alikhlas.db database/tpq_alikhlas_backup_$(date +%Y%m%d_%H%M%S).db

# 4. Tarik update terbaru dari GitHub
git pull origin main

# 5. Jalankan kembali service
systemctl start tpq

# 6. Cek status
systemctl status tpq
```

---

## 💻 PANDUAN MENJALANKAN DI KOMPUTER LOKAL (WINDOWS)

1. **Jalankan Server Python**:
   ```powershell
   python server.py 8080
   ```
2. Buka browser pada alamat:
   ```
   http://localhost:8080/
   ```

---

## 📁 Struktur Direktori Proyek

```
tpq-al-ikhlas-balamoa/
├── index.html                                        # Antarmuka web utama
├── server.py                                         # Server HTTP & REST API SQLite
├── PANDUAN_PROXMOX_LXC.md                            # Panduan instalasi Proxmox LXC terperinci
├── INGATAN.md                                        # Master knowledge base akreditasi & sistem
├── README.md                                         # Petunjuk pengoperasian & instalasi
├── css/
│   └── custom.css                                    # Gaya kustom, kop surat, dan CSS print
├── database/
│   ├── schema.sql                                    # Skema DDL SQLite
│   ├── tpq_alikhlas.db                               # File basis data relasional SQLite
│   ├── tpq_alikhlas.sql                              # Auto-generated universal SQL dump
│   ├── default_data.json                             # Data awal terverifikasi
│   └── init_db.py                                    # Script inisialisasi / reset database
├── dokumen_cetak_fisik/                              # Koleksi dokumen cetak fisik A4 siap print
│   ├── 00_COVER_DAN_LABEL_PUNGGUNG_ODNER_1_SD_6.html
│   ├── 01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html
│   ├── 02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html
│   ├── 03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html
│   ├── 04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html
│   ├── 05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html
│   ├── 06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html
│   └── 07_FORMULIR_PENDAFTARAN_CALON_SANTRI.html     # Formulir pendaftaran calon santri baru
└── js/
    ├── data.js                                       # Instrumen 8 standar akreditasi Kemenag
    ├── store.js                                      # State management & sinkronisasi REST API
    ├── full_documents.js                             # Engine perender dokumen resmi A4
    ├── templates.js                                  # Draf naskah SK, SOP, & silabus
    └── app.js                                        # Kontroller UI, CRUD, modal, & live preview
```

---
*TPQ Muslimat NU AL-IKHLAS Balamoa • Yayasan AL FATAH • Menuju Akreditasi A (Unggul)*
