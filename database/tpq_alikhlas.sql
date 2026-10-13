-- =========================================================================
-- DATABASE DUMP SQL - TPQ MUSLIMAT NU AL-IKHLAS (YAYASAN AL FATAH)
-- NSQ: 411235150089 | SK IJOP: Kd.13.15/4/PP.00.7/1420/2024
-- Lokasi: Sidokare, Sidoarjo, Jawa Timur
-- Universal SQL Export (SQLite / MariaDB / MySQL / PostgreSQL)
-- =========================================================================

BEGIN TRANSACTION;
CREATE TABLE checklist_status (
    item_id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'missing' CHECK (status IN ('ready', 'progress', 'missing')),
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE institution (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    name TEXT NOT NULL,
    foundation TEXT NOT NULL,
    headmaster TEXT NOT NULL,
    headmaster_nip TEXT,
    headmaster_title TEXT,
    headmaster_phone TEXT,
    headmaster_education TEXT,
    headmaster_syahadah TEXT,
    headmaster_period TEXT,
    head_foundation TEXT,
    committee_head TEXT,
    secretary TEXT,
    treasurer TEXT,
    nsq TEXT,
    ijop TEXT,
    notary TEXT,
    affiliation TEXT,
    method TEXT,
    address TEXT,
    village TEXT,
    subdistrict TEXT,
    city TEXT,
    province TEXT,
    post_code TEXT,
    phone TEXT,
    email TEXT,
    active_year TEXT,
    legal_city TEXT,
    target_accreditation TEXT,
    logo_left TEXT,
    logo_right TEXT,
    logo_left_type TEXT DEFAULT 'preset',
    logo_right_type TEXT DEFAULT 'preset',
    logo_left_preset TEXT DEFAULT 'book',
    logo_right_preset TEXT DEFAULT 'muslimat',
    kop_logo_layout TEXT DEFAULT 'both',
    kop_border_type TEXT DEFAULT 'double-emerald',
    signature_headmaster TEXT,
    stamp_image TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
, formulir_config TEXT);
INSERT INTO "institution" VALUES(1,'TPQ MUSLIMAT NU AL-IKHLAS','YAYASAN AL FATAH','Ustadzah Hj. Siti Aminah, S.Pd.I','NIY. 19820514 201201 2 001','Kepala TPQ Muslimat NU AL-IKHLAS','0812-3245-8891','S1 Pendidikan Agama Islam (PAI) UIN Sunan Ampel','Metode An-Nahdliyah Tingkat Munaqisy (No. SYH-AN/JTM/2018/0092)','2024 - 2029','Drs. H. Ahmad Fathoni, M.Pd.I','H. Ridwan Santoso','Ustadzah Nurul Hidayati, S.Pd','Ustadzah Fatimatuz Zahro, S.Pd','411235150089','Kd.13.15/4/PP.00.7/1420/2024','AHU-0014285.AH.01.04.Tahun 2018','Pimpinan Cabang Muslimat Nahdlatul Ulama Sidoarjo','Metode An-Nahdliyah / Qiraati','Jl. Masjid Al-Fatah No. 09, RT 03 / RW 02','Sidokare','Sidoarjo','Kabupaten Sidoarjo','Jawa Timur','61214','(031) 8945672 / 0812-3245-8891','tpq.muslimatnu.alikhlas@gmail.com','2026/2027','Sidoarjo','A (Unggul / Sangat Baik)','','','preset','preset','book','muslimat','both','double-emerald','','','2026-10-13 06:08:31','{"title": "FORMULIR PENDAFTARAN", "subtitle": "CALON PESERTA DIDIK TPQ MUSLIMAT NU AL-IKHLAS", "branchTag": "", "academicYear": "2026/2027", "useKop": true, "showPhotoBox": true, "photoBoxText": "Pas Foto\n3 x 4", "studentSectionTitle": "IDENTITAS CALON PESERTA DIDIK", "studentFields": [{"id": "name", "label": "Nama Lengkap", "enabled": true}, {"id": "nickname", "label": "Nama Panggilan", "enabled": true}, {"id": "birthPlaceDate", "label": "Tempat, Tanggal Lahir", "enabled": true}, {"id": "gender", "label": "Jenis Kelamin", "enabled": true}, {"id": "religion", "label": "Agama", "enabled": true, "defaultValue": "Islam"}, {"id": "childOrder", "label": "Anak Ke-", "enabled": true}, {"id": "siblingCount", "label": "Jumlah Saudara", "enabled": true}, {"id": "familyStatus", "label": "Status dalam keluarga", "enabled": true, "defaultValue": "Anak Kandung"}, {"id": "citizenship", "label": "Kewarganegaraan", "enabled": true, "defaultValue": "WNI"}, {"id": "address", "label": "Alamat Tempat Tinggal", "enabled": true}, {"id": "phone", "label": "No. HP / WhatsApp Wali", "enabled": true}], "parentSectionTitle": "IDENTITAS ORANG TUA/WALI", "fatherHeader": "Ayah kandung/tiri/angkat/wali *)", "fatherFields": [{"id": "name", "label": "Nama", "enabled": true}, {"id": "birthPlaceDate", "label": "Tempat, tanggal lahir", "enabled": true}, {"id": "religion", "label": "Agama", "enabled": true, "defaultValue": "Islam"}, {"id": "citizenship", "label": "Kewarganegaraan", "enabled": true, "defaultValue": "WNI"}, {"id": "job", "label": "Pekerjaan", "enabled": true}, {"id": "education", "label": "Pendidikan", "enabled": true}], "motherHeader": "Ibu kandung/tiri/angkat/wali *)", "motherFields": [{"id": "name", "label": "Nama", "enabled": true}, {"id": "birthPlaceDate", "label": "Tempat, tanggal lahir", "enabled": true}, {"id": "religion", "label": "Agama", "enabled": true, "defaultValue": "Islam"}, {"id": "citizenship", "label": "Kewarganegaraan", "enabled": true, "defaultValue": "WNI"}, {"id": "job", "label": "Pekerjaan", "enabled": true}, {"id": "education", "label": "Pendidikan", "enabled": true}], "showRequirements": true, "requirementsTitle": "Syarat-Syarat Berkas Pendaftaran:", "requirementsText": "1. Mengisi formulir pendaftaran ini secara lengkap dan benar\n2. Menyerahkan fotokopi Akta Kelahiran santri (1 lembar)\n3. Menyerahkan fotokopi Kartu Keluarga (KK) (1 lembar)\n4. Menyerahkan pas foto berwarna ukuran 3x4 (2 lembar)\n5. Infaq pendaftaran & paket materi belajar", "signCity": "Sidoarjo", "signDateMode": "blank", "signCustomDate": "", "parentSignTitle": "Orang Tua / Wali Calon Peserta Didik", "officerSignTitle": "Panitia Pendaftaran / Kepala TPQ", "officerName": "Ustadzah Hj. Siti Aminah, S.Pd.I", "footerNote": "*) Coret yang tidak perlu"}');
CREATE TABLE inventaris (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    unit TEXT DEFAULT 'Unit',
    condition TEXT DEFAULT 'Baik',
    source TEXT,
    location TEXT,
    acq_year TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "inventaris" VALUES('INV-001','INV/TPQ/MEJ/001-030','Meja Lipat Belajar Santri (Rekal Kayu)','Perabot Belajar',30,'Unit','Baik','Wakaf Wali Santri','Ruang Belajar Utama','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-002','INV/TPQ/KRP/001-004','Karpet Sajadah Tebal Permadani Hijau','Perabot Belajar',4,'Roll','Baik','Yayasan AL FATAH','Ruang Belajar Utama','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-003','INV/TPQ/PBL/001-003','Papan Tulis Whiteboard Standar 120x240cm','Media Ajar',3,'Buah','Baik','Kas Mandiri TPQ','Ruang Belajar A & B','2023','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-004','INV/TPQ/PRG/001-006','Alat Peraga Klasikal Metode Al-Qur''an 1-6','Media Ajar',6,'Set','Baik','Kas Mandiri TPQ','Dinding Ruang Belajar','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-005','INV/TPQ/QUR/001-050','Mushaf Al-Qur''an Standar Kemenag (Rasm Usmani)','Media Ajar',50,'Eks','Baik','Wakaf Kemenag & Donatur','Lemari Al-Qur''an','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-006','INV/TPQ/LMR/001-002','Lemari Arsip Kaca & Rak Kitab','Perabot Kantor',2,'Unit','Baik','Yayasan AL FATAH','Kantor Pengurus','2023','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-007','INV/TPQ/SND/001-002','Sound System Portabel Wireless & Mic','Elektronik Audio',2,'Set','Baik','Wakaf Komite Wali','Ruang Utama','2025','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-008','INV/TPQ/KPS/001-004','Kipas Angin Dinding Tornado Fan','Elektronik Ruang',4,'Unit','Baik','Yayasan AL FATAH','Ruang Belajar Utama','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-009','INV/TPQ/PLG/001','Papan Nama Permanen TPQ Muslimat NU AL-IKHLAS','Sarana Eksterior',1,'Plang','Baik','Yayasan AL FATAH','Depan Pagar Gedung','2023','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-010','INV/TPQ/P3K/001','Kotak P3K Dinding Lengkap Obat Standar','Kesehatan & K3',1,'Set','Baik','Kas Mandiri TPQ','Kantor Pengurus','2025','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-011','INV/TPQ/WDH/001-010','Kran Air Wudhu Stainless Putra & Putri','Sanitasi Wudhu',10,'Titik','Baik','Wakaf Masjid Al-Fatah','Area Wudhu Santri','2024','2026-10-13 06:08:31');
INSERT INTO "inventaris" VALUES('INV-012','INV/TPQ/SMP/001-006','Tempat Sampah Tertutup Organik/Anorganik','Kebersihan',6,'Buah','Baik','Kas Mandiri TPQ','Halaman & Selasar','2025','2026-10-13 06:08:31');
CREATE TABLE kas (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    type TEXT CHECK (type IN ('in', 'out')),
    category TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    proof_number TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "kas" VALUES('KAS-001','2026-08-01','in','Infaq/SPP Santri',3600000,'KW-08/2026/01','Penerimaan Infaq Bulanan Santri Periode Agustus 2026 (72 Santri)','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-002','2026-08-03','in','Donasi Donatur Yayasan',1500000,'KW-08/2026/02','Donasi Rutin Pengembangan TPQ dari Hamba Allah Yayasan AL FATAH','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-003','2026-08-05','out','Pembelian ATK & Media',450000,'NT-08/2026/01','Pembelian Spidol Whiteboard, Tinta Refill, & Kertas HVS Akreditasi','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-004','2026-08-10','out','Operasional Listrik & Kebersihan',250000,'NT-08/2026/02','Pembayaran Tagihan Listrik PLN & Alat Kebersihan Lantai Ruang TPQ','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-005','2026-08-15','in','Infaq Pendaftaran PSB',750000,'KW-08/2026/03','Penerimaan Infaq Pendaftaran 5 Santri Baru Angkatan Semester Ganjil','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-006','2026-08-25','out','Bisaroh / Honor Guru',3000000,'KW-08/2026/04','Penyaluran Bisaroh Insentif Ustadz/Ustadzah (6 Pengajar) Bulan Agustus','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-007','2026-09-01','in','Infaq/SPP Santri',3750000,'KW-09/2026/01','Penerimaan Infaq Bulanan Santri Periode September 2026','2026-10-13 06:08:31');
INSERT INTO "kas" VALUES('KAS-008','2026-09-05','out','Persiapan Berkas Akreditasi',380000,'NT-09/2026/01','Pengadaan 6 Map Odner Bantex Tebal, Divider Warna, dan Jilid Profil','2026-10-13 06:08:31');
CREATE TABLE santri (
    id TEXT PRIMARY KEY,
    nis TEXT NOT NULL,
    nik TEXT,
    name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('L', 'P')),
    birth_place TEXT,
    birth_date TEXT,
    class_level TEXT NOT NULL,
    parent_name TEXT,
    parent_phone TEXT,
    address TEXT,
    join_date TEXT,
    status TEXT DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "santri" VALUES('STR-001','2026/001','3515012304180001','Muhammad Bilal Al-Ghifari','L','Sidoarjo','2018-04-12','Jilid 4','H. Ridwan Santoso','0813-8899-7711','Jl. Mawar No. 12 RT 01/RW 02 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-002','2026/002','3515015509170002','Aisyah Nur Ramadhani','P','Sidoarjo','2017-09-15','Al-Qur''an & Tajwid','Hj. Sholihatun Nisa','0812-3344-5566','Jl. Anggrek No. 05 RT 02/RW 02 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-003','2026/003','3515016201190003','Fatimah Az-Zahra','P','Sidoarjo','2019-01-22','Jilid 3','Dian Kusuma, S.Pd','0856-7788-9900','Jl. Kutuk Timur No. 09 RT 03/RW 01 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-004','2026/004','3515011406180004','Ahmad Zaki Mubarak','L','Surabaya','2018-06-14','Jilid 5','Sri Wahyuni, S.Pd','0813-1122-3344','Jl. Melati No. 18 RT 02/RW 01 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-005','2026/005','3515010311200005','Ibrahim Hanif','L','Sidoarjo','2020-11-03','Jilid 2','Bambang Supriyadi','0878-4455-6677','Jl. Kutuk Barat No. 34 RT 03/RW 01 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-006','2026/006','3515014808180006','Khadijah Maryam','P','Sidoarjo','2018-08-08','Jilid 4','Nur Lailatul Qodriyah','0812-7788-2233','Jl. Cendrawasih No. 04 RT 04/RW 02 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-007','2026/007','3515012903170007','Muhammad Fatih Al-Ayyubi','L','Sidoarjo','2017-03-29','Al-Qur''an & Tajwid','H. Imam Mustofa','0852-6677-8899','Jl. Masjid Barat No. 22 RT 01/RW 02 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-008','2026/008','3515017012200008','Zahira Nur Salsabila','P','Sidoarjo','2020-12-30','Jilid 1','Agus Hermawan','0813-9900-1122','Jl. Kenanga No. 04 RT 01/RW 03 Sidokare','2026-07-13','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-009','2026/009','3515011707190009','Ali Zainal Abidin','L','Pasuruan','2019-07-17','Jilid 3','Syamsul Arifin','0819-3322-1100','Jl. Mojopahit No. 88 RT 02/RW 01 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-010','2026/010','3515015105180010','Najwa Maulida Husna','P','Sidoarjo','2018-05-11','Jilid 5','M. Thohir, S.Ag','0812-4455-9988','Jl. Dahlia No. 07 RT 03/RW 02 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-011','2026/011','3515010910210011','Hamzah Al-Farisi','L','Sidoarjo','2021-10-09','Jilid 1','Farid Wajdi','0857-1122-4455','Jl. Masjid Timur No. 11 RT 01/RW 02 Sidokare','2026-07-13','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-012','2026/012','3515016502170012','Syifa Kamila Rahma','P','Malang','2017-02-25','Al-Qur''an & Tajwid','H. Achmad Syafi''i','0813-7766-5544','Jl. Pahlawan No. 45 RT 02/RW 02 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-013','2026/013','3515015402210003','Maryam Khairunnisa','P','Sidoarjo','2021-02-14','Jilid 1','dr. H. Hendra Setiawan','0812-8877-6655','Jl. Pahlawan No. 28 RT 02/RW 02 Sidokare','2026-07-13','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-014','2026/014','3515011805200004','Muhammad Azka Aldric','L','Sidoarjo','2020-05-18','Jilid 1','Bagus Prasetyo','0813-4455-8822','Perum Sidokare Indah Blok B-08','2026-07-13','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-015','2026/015','3515016408200006','Naura Almaira','P','Surabaya','2020-08-24','Jilid 2','Eko Wahyudi','0877-2233-4411','Jl. Diponegoro No. 15 RT 02/RW 04 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-016','2026/016','3515011201200007','Rayyan Daffa Pratama','L','Sidoarjo','2020-01-12','Jilid 2','Dedy Kurniawan','0852-3344-5588','Jl. Sekardangan Indah No. 06 RT 01/RW 01','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-017','2026/017','3515014509190010','Annisa Salma Aqila','P','Sidoarjo','2019-09-05','Jilid 3','Arif Rahman, M.T','0812-9900-1133','Jl. Gajah Mada No. 102 RT 04/RW 02 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-018','2026/018','3515011111190011','Kenzi Al-Ghaza','L','Sidoarjo','2019-11-11','Jilid 3','Rudi Hartono','0813-7766-8899','Jl. Erlangga No. 19 RT 02/RW 03 Sidokare','2025-07-14','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-019','2026/019','3515012905180014','Fajar Sidiq Ramadhan','L','Sidoarjo','2018-05-29','Jilid 4','Wawan Setyawan','0857-4433-2299','Jl. Anggrek No. 14 RT 02/RW 02 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-020','2026/020','3515015612180015','Hafidzah Nailatur Rohmah','P','Malang','2018-12-16','Jilid 4','M. Munir','0812-6655-4433','Jl. Kartini No. 42 RT 03/RW 01 Sidokare','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-021','2026/021','3515010403180018','Wildan Habiburrahman','L','Sidoarjo','2018-03-04','Jilid 5','Ir. H. Sugeng Riyadi','0811-3344-5566','Perum Taman Sidokare Asri Blok D-11','2024-07-15','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-022','2026/022','3515012707170019','Farhan Maulana Yusuf','L','Sidoarjo','2017-07-27','Jilid 6','Yusuf Bachtiar','0813-2211-7788','Jl. Monginsidi No. 31 RT 01/RW 02 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-023','2026/023','3515015910170020','Nabila Putri Az-Zahra','P','Surabaya','2017-10-19','Jilid 6','H. Suparman','0812-9988-3344','Jl. Thamrin No. 08 RT 02/RW 02 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-024','2026/024','3515010501170021','Danial Haidar','L','Sidoarjo','2017-01-05','Jilid 6','Drs. Akhmad Muzakki','0856-1122-3377','Jl. Kutuk Barat No. 77 RT 03/RW 01 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
INSERT INTO "santri" VALUES('STR-025','2026/025','3515011011160025','Zulfikar Ali Ridho','L','Sidoarjo','2016-11-10','Al-Qur''an & Tajwid','Drs. Ali Maksum, M.Pd.I','0813-3344-9900','Jl. Kartini No. 89 RT 01/RW 03 Sidokare','2023-07-10','Aktif','2026-10-13 06:08:31');
CREATE TABLE ustadz (
    id TEXT PRIMARY KEY,
    nip TEXT NOT NULL,
    nik TEXT,
    name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('L', 'P')),
    education TEXT,
    pesantren TEXT,
    syahadah_method TEXT,
    syahadah_number TEXT,
    syahadah_year TEXT,
    assigned_class TEXT,
    phone TEXT,
    status TEXT DEFAULT 'Guru Tetap',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "ustadz" VALUES('UST-001','TPQ-01.001','3515015208820001','Ustadzah Hj. Siti Aminah, S.Pd.I','P','S1 Pendidikan Agama Islam (UIN Sunan Ampel)','PP. Al-Fathimiyyah Jombang','Metode An-Nahdliyah','SYH-AN/JTM/2018/0092','2018','Kepala TPQ & Pembina Al-Qur''an','0812-3245-8891','Guru Tetap','2026-10-13 06:08:31');
INSERT INTO "ustadz" VALUES('UST-002','TPQ-01.002','3515016405890002','Ustadzah Maimunah, S.Ag','P','S1 Ilmu Al-Qur''an & Tafsir (UIN Sunan Ampel)','PP. Madrasatul Qur''an Tebuireng Jombang','Metode An-Nahdliyah & Yanbu''a','SYH-AN/JTM/2020/0112','2020','Koord. Kurikulum & Kelas Tajwid','0813-5566-7788','Guru Tetap','2026-10-13 06:08:31');
INSERT INTO "ustadz" VALUES('UST-003','TPQ-01.003','3515011210920003','Ustadz Ahmad Fauzi, S.Pd','L','S1 Manajemen Pendidikan Islam (UIN Surabaya)','PP. Langitan Tuban','Metode An-Nahdliyah','SYH-AN/JTM/2022/0789','2022','Koord. Kesiswaan & Jilid 5-6','0857-4433-2211','Guru Tetap','2026-10-13 06:08:31');
INSERT INTO "ustadz" VALUES('UST-004','TPQ-01.004','3515014503950004','Ustadzah Fatimatuz Zahro, S.Pd','P','S1 Pendidikan Bahasa Arab (UIN Malang)','PP. Bahrul Ulum Tambakberas Jombang','Metode Qiraati','SYH-QR/SBY/2023/0341','2023','Bendahara & Jilid 3-4','0812-9988-7766','Guru Tetap','2026-10-13 06:08:31');
INSERT INTO "ustadz" VALUES('UST-005','TPQ-01.005','3515015809960005','Ustadzah Nurul Hidayati, S.Pd','P','S1 PGMI (Universitas Sunan Giri Sidoarjo)','PP. Al-Khoziny Buduran Sidoarjo','Metode An-Nahdliyah','SYH-AN/JTM/2023/0904','2023','Sekretaris & Jilid 2','0878-1122-3344','Guru Tetap','2026-10-13 06:08:31');
INSERT INTO "ustadz" VALUES('UST-006','TPQ-01.006','3515016912980006','Ustadzah Siti Rokhmah, A.Ma','P','D3 Tarbiyah & Hafidzah 30 Juz','PP. Tahfidzul Qur''an Al-Baqarah Pasuruan','Syahadah Tahfidz & Metodologi','SYH-TF/KMN/2024/0055','2024','Koord. Sarpras & Jilid 1 (Dasar)','0813-6677-8800','Guru Tetap','2026-10-13 06:08:31');
COMMIT;
