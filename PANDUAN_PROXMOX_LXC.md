# PANDUAN LENGKAP INSTALASI & PEMELIHARAAN DI LXC PROXMOX VE
## Aplikasi Akreditasi & Manajemen TPQ Muslimat NU Al-Ikhlas Balamoa

Panduan ini berisi langkah-langkah praktis dan teruji untuk memasang (*deploy*) aplikasi di container **LXC Proxmox VE** (Debian 12 / Ubuntu 22.04 / Ubuntu 24.04) dan cara melakukan pembaruan (*update*) secara manual.

Aplikasi ini menggunakan **Python 3 Standard Library** (`http.server`, `sqlite3`, `json`, `urllib`), sehingga **sangat ringan (ultra-lightweight)**, tidak membutuhkan kompilasi atau paket tambahan (`pip install`), serta langsung siap dijalankan.

---

## 🖥️ 1. Rekomendasi Spesifikasi Container (LXC)
Saat membuat container LXC di web interface Proxmox VE:
* **Template OS**: Debian 12 (Bookworm) *(Sangat Disarankan)* atau Ubuntu 22.04 / 24.04
* **Cores**: 1 vCPU (Penggunaan CPU < 1%)
* **RAM**: 512 MB – 1 GB (Penggunaan RAM rata-rata hanya ~30 MB)
* **Swap**: 512 MB
* **Disk**: 4 GB – 8 GB
* **Network**: Mode Bridge (`vmbr0`), IPv4 DHCP atau Static IP (contoh: `192.168.1.150/24`, Gateway: `192.168.1.1`)

---

## 🚀 2. Langkah-Langkah Instalasi Manual (Langkah demi Langkah)

### Langkah 2.1: Masuk ke Console LXC & Update Sistem
Buka menu **Console** container LXC Anda di web interface Proxmox (sebagai user `root`), lalu jalankan:

```bash
apt update && apt upgrade -y
apt install -y git python3 curl
```

---

### Langkah 2.2: Clone Repository dari GitHub
Unduh source code proyek ke direktori `/opt/tpq-al-ikhlas-balamoa`:

```bash
cd /opt
git clone https://github.com/kajurtkjsmkbp-hub/tpq-al-ikhlas-balamoa.git
cd /opt/tpq-al-ikhlas-balamoa
```

---

### Langkah 2.3: Uji Coba Server Secara Manual
Jalankan server untuk memastikan aplikasi dan database SQLite berjalan normal:

```bash
python3 server.py 8080
```

* Buka browser dari komputer atau smartphone di jaringan lokal yang sama:  
  👉 `http://<IP_LXC_PROXMOX>:8080` (contoh: `http://192.168.1.150:8080/`)
* Jika halaman muncul normal, hentikan pengujian manual dengan menekan `Ctrl + C`.

---

### Langkah 2.4: Buat Service Systemd (Otomatis Aktif Saat Booting)
Agar aplikasi terus berjalan di latar belakang (*background*) dan otomatis menyala saat container dinyalakan/direstart:

1. Buat file service systemd:
```bash
nano /etc/systemd/system/tpq.service
```

2. Tempelkan (*paste*) kode konfigurasi berikut:
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

3. Simpan dan keluar dari editor:
   * Tekan `Ctrl + O`, tekan `Enter`, lalu tekan `Ctrl + X`.

4. Muat ulang daemon, aktifkan auto-start, dan nyalakan service:
```bash
systemctl daemon-reload
systemctl enable tpq
systemctl start tpq
```

5. Pastikan service aktif (*active/running*):
```bash
systemctl status tpq
```

---

### Langkah 2.5 (Opsional): Akses Port 80 Standar Web (Nginx Reverse Proxy)
Jika Anda ingin mengakses aplikasi langsung tanpa perlu mengetik port `:8080` di akhir URL (cukup ketik `http://192.168.1.150`):

1. Pasang Nginx:
```bash
apt install -y nginx
```

2. Buat konfigurasi virtual host:
```bash
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
```

3. Aktifkan konfigurasi dan restart Nginx:
```bash
ln -sf /etc/nginx/sites-available/tpq /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx
```

Sekarang portal dapat diakses langsung melalui: `http://<IP_LXC_PROXMOX>/`.

---

## 🔄 3. Perintah Manual untuk Update Aplikasi di LXC

Jalankan perintah ini di Console LXC setiap kali ada pembaruan kode yang di-*push* ke GitHub:

### Opsi A: Update Cepat (Satu Baris Perintah)
```bash
cd /opt/tpq-al-ikhlas-balamoa && systemctl stop tpq && git pull origin main && systemctl start tpq && systemctl status tpq
```

---

### Opsi B: Update Aman (Lengkap dengan Backup Database Otomatis)
Jika sistem sudah digunakan untuk menginput data santri/keuangan baru di LXC dan Anda ingin memastikan file database SQLite terlindungi sebelum menarik update kode:

```bash
# 1. Masuk ke folder aplikasi
cd /opt/tpq-al-ikhlas-balamoa

# 2. Hentikan sementara server
systemctl stop tpq

# 3. Buat salinan cadangan (backup) database aktif
cp database/tpq_alikhlas.db database/tpq_alikhlas_backup_$(date +%Y%m%d_%H%M%S).db

# 4. Tarik update terbaru dari repository GitHub
git pull origin main

# 5. Nyalakan kembali service
systemctl start tpq

# 6. Cek status service untuk memastikan server running
systemctl status tpq
```

---

### Opsi C: Penanganan Jika Terjadi Konflik Git (`git error: local changes`)
Jika Anda pernah mengedit file secara langsung di dalam LXC sehingga `git pull` terhalang:

```bash
cd /opt/tpq-al-ikhlas-balamoa

# Simpan perubahan lokal ke stash
git stash

# Ambil versi terbaru dari GitHub
git pull origin main

# Restart service
systemctl restart tpq
```

---

## 🛡️ 4. Perintah Pemeliharaan & Monitoring Berguna

| Keperluan | Perintah Terminal LXC |
|---|---|
| **Cek status server** | `systemctl status tpq` |
| **Restart server** | `systemctl restart tpq` |
| **Stop server** | `systemctl stop tpq` |
| **Lihat live log server** | `journalctl -u tpq -f` |
| **Cek port aktif** | `ss -tulpn \| grep 8080` |
| **Ekspor dump SQL manual** | `python3 -c "import server; server.export_sql()"` |
| **Reset ke data awal** | `python3 database/init_db.py` |
