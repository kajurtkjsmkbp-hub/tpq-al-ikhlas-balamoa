# -*- coding: utf-8 -*-
"""
FULL ODNER SUITE BUILDER - ACCREDITATION PORTFOLIO
TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH (SIDOARJO)
"""

import os, json

SANTRI_LIST = [
    {"no": 1, "nis": "2026/001", "nik": "3515012304180001", "name": "Muhammad Bilal Al-Ghifari", "gender": "L", "ttl": "Sidoarjo, 12-04-2018", "level": "Jilid 4", "parent": "H. Ridwan Santoso", "phone": "0813-8899-7711", "address": "Jl. Mawar No. 12 RT 01/RW 02 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 2, "nis": "2026/002", "nik": "3515015509170002", "name": "Aisyah Nur Ramadhani", "gender": "P", "ttl": "Sidoarjo, 15-09-2017", "level": "Al-Qur'an & Tajwid", "parent": "Hj. Sholihatun Nisa", "phone": "0812-3344-5566", "address": "Jl. Anggrek No. 05 RT 02/RW 02 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 3, "nis": "2026/003", "nik": "3515016201190003", "name": "Fatimah Az-Zahra", "gender": "P", "ttl": "Sidoarjo, 22-01-2019", "level": "Jilid 3", "parent": "Dian Kusuma, S.Pd", "phone": "0856-7788-9900", "address": "Jl. Kutuk Timur No. 09 RT 03/RW 01 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 4, "nis": "2026/004", "nik": "3515011406180004", "name": "Ahmad Zaki Mubarak", "gender": "L", "ttl": "Surabaya, 14-06-2018", "level": "Jilid 5", "parent": "Sri Wahyuni, S.Pd", "phone": "0813-1122-3344", "address": "Jl. Melati No. 18 RT 02/RW 01 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 5, "nis": "2026/005", "nik": "3515010311200005", "name": "Ibrahim Hanif", "gender": "L", "ttl": "Sidoarjo, 03-11-2020", "level": "Jilid 2", "parent": "Bambang Supriyadi", "phone": "0878-4455-6677", "address": "Jl. Kutuk Barat No. 34 RT 03/RW 01 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 6, "nis": "2026/006", "nik": "3515014808180006", "name": "Khadijah Maryam", "gender": "P", "ttl": "Sidoarjo, 08-08-2018", "level": "Jilid 4", "parent": "Nur Lailatul Qodriyah", "phone": "0812-7788-2233", "address": "Jl. Cendrawasih No. 04 RT 04/RW 02 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 7, "nis": "2026/007", "nik": "3515012903170007", "name": "Muhammad Fatih Al-Ayyubi", "gender": "L", "ttl": "Sidoarjo, 29-03-2017", "level": "Al-Qur'an & Tajwid", "parent": "H. Imam Mustofa", "phone": "0852-6677-8899", "address": "Jl. Masjid Barat No. 22 RT 01/RW 02 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 8, "nis": "2026/008", "nik": "3515017012200008", "name": "Zahira Nur Salsabila", "gender": "P", "ttl": "Sidoarjo, 30-12-2020", "level": "Jilid 1", "parent": "Agus Hermawan", "phone": "0813-9900-1122", "address": "Jl. Kenanga No. 04 RT 01/RW 03 Sidokare", "join": "13-07-2026", "status": "Aktif"},
    {"no": 9, "nis": "2026/009", "nik": "3515011707190009", "name": "Ali Zainal Abidin", "gender": "L", "ttl": "Pasuruan, 17-07-2019", "level": "Jilid 3", "parent": "Syamsul Arifin", "phone": "0819-3322-1100", "address": "Jl. Mojopahit No. 88 RT 02/RW 01 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 10, "nis": "2026/010", "nik": "3515015105180010", "name": "Najwa Maulida Husna", "gender": "P", "ttl": "Sidoarjo, 11-05-2018", "level": "Jilid 5", "parent": "M. Thohir, S.Ag", "phone": "0812-4455-9988", "address": "Jl. Dahlia No. 07 RT 03/RW 02 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 11, "nis": "2026/011", "nik": "3515010910210011", "name": "Hamzah Al-Farisi", "gender": "L", "ttl": "Sidoarjo, 09-10-2021", "level": "Jilid 1", "parent": "Farid Wajdi", "phone": "0857-1122-4455", "address": "Jl. Masjid Timur No. 11 RT 01/RW 02 Sidokare", "join": "13-07-2026", "status": "Aktif"},
    {"no": 12, "nis": "2026/012", "nik": "3515016502170012", "name": "Syifa Kamila Rahma", "gender": "P", "ttl": "Malang, 25-02-2017", "level": "Al-Qur'an & Tajwid", "parent": "H. Achmad Syafi'i", "phone": "0813-7766-5544", "address": "Jl. Pahlawan No. 45 RT 02/RW 02 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 13, "nis": "2026/013", "nik": "3515015402210003", "name": "Maryam Khairunnisa", "gender": "P", "ttl": "Sidoarjo, 14-02-2021", "level": "Jilid 1", "parent": "dr. H. Hendra Setiawan", "phone": "0812-8877-6655", "address": "Jl. Pahlawan No. 28 RT 02/RW 02 Sidokare", "join": "13-07-2026", "status": "Aktif"},
    {"no": 14, "nis": "2026/014", "nik": "3515011805200004", "name": "Muhammad Azka Aldric", "gender": "L", "ttl": "Sidoarjo, 18-05-2020", "level": "Jilid 1", "parent": "Bagus Prasetyo", "phone": "0813-4455-8822", "address": "Perum Sidokare Indah Blok B-08", "join": "13-07-2026", "status": "Aktif"},
    {"no": 15, "nis": "2026/015", "nik": "3515016408200006", "name": "Naura Almaira", "gender": "P", "ttl": "Surabaya, 24-08-2020", "level": "Jilid 2", "parent": "Eko Wahyudi", "phone": "0877-2233-4411", "address": "Jl. Diponegoro No. 15 RT 02/RW 04 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 16, "nis": "2026/016", "nik": "3515011201200007", "name": "Rayyan Daffa Pratama", "gender": "L", "ttl": "Sidoarjo, 12-01-2020", "level": "Jilid 2", "parent": "Dedy Kurniawan", "phone": "0852-3344-5588", "address": "Jl. Sekardangan Indah No. 06 RT 01/RW 01", "join": "14-07-2025", "status": "Aktif"},
    {"no": 17, "nis": "2026/017", "nik": "3515014509190010", "name": "Annisa Salma Aqila", "gender": "P", "ttl": "Sidoarjo, 05-09-2019", "level": "Jilid 3", "parent": "Arif Rahman, M.T", "phone": "0812-9900-1133", "address": "Jl. Gajah Mada No. 102 RT 04/RW 02 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 18, "nis": "2026/018", "nik": "3515011111190011", "name": "Kenzi Al-Ghaza", "gender": "L", "ttl": "Sidoarjo, 11-11-2019", "level": "Jilid 3", "parent": "Rudi Hartono", "phone": "0813-7766-8899", "address": "Jl. Erlangga No. 19 RT 02/RW 03 Sidokare", "join": "14-07-2025", "status": "Aktif"},
    {"no": 19, "nis": "2026/019", "nik": "3515012905180014", "name": "Fajar Sidiq Ramadhan", "gender": "L", "ttl": "Sidoarjo, 29-05-2018", "level": "Jilid 4", "parent": "Wawan Setyawan", "phone": "0857-4433-2299", "address": "Jl. Anggrek No. 14 RT 02/RW 02 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 20, "nis": "2026/020", "nik": "3515015612180015", "name": "Hafidzah Nailatur Rohmah", "gender": "P", "ttl": "Malang, 16-12-2018", "level": "Jilid 4", "parent": "M. Munir", "phone": "0812-6655-4433", "address": "Jl. Kartini No. 42 RT 03/RW 01 Sidokare", "join": "15-07-2024", "status": "Aktif"},
    {"no": 21, "nis": "2026/021", "nik": "3515010403180018", "name": "Wildan Habiburrahman", "gender": "L", "ttl": "Sidoarjo, 04-03-2018", "level": "Jilid 5", "parent": "Ir. H. Sugeng Riyadi", "phone": "0811-3344-5566", "address": "Perum Taman Sidokare Asri Blok D-11", "join": "15-07-2024", "status": "Aktif"},
    {"no": 22, "nis": "2026/022", "nik": "3515012707170019", "name": "Farhan Maulana Yusuf", "gender": "L", "ttl": "Sidoarjo, 27-07-2017", "level": "Jilid 6", "parent": "Yusuf Bachtiar", "phone": "0813-2211-7788", "address": "Jl. Monginsidi No. 31 RT 01/RW 02 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 23, "nis": "2026/023", "nik": "3515015910170020", "name": "Nabila Putri Az-Zahra", "gender": "P", "ttl": "Surabaya, 19-10-2017", "level": "Jilid 6", "parent": "H. Suparman", "phone": "0812-9988-3344", "address": "Jl. Thamrin No. 08 RT 02/RW 02 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 24, "nis": "2026/024", "nik": "3515010501170021", "name": "Danial Haidar", "gender": "L", "ttl": "Sidoarjo, 05-01-2017", "level": "Jilid 6", "parent": "Drs. Akhmad Muzakki", "phone": "0856-1122-3377", "address": "Jl. Kutuk Barat No. 77 RT 03/RW 01 Sidokare", "join": "10-07-2023", "status": "Aktif"},
    {"no": 25, "nis": "2026/025", "nik": "3515011011160025", "name": "Zulfikar Ali Ridho", "gender": "L", "ttl": "Sidoarjo, 10-11-2016", "level": "Al-Qur'an & Tajwid", "parent": "Drs. Ali Maksum, M.Pd.I", "phone": "0813-3344-9900", "address": "Jl. Kartini No. 89 RT 01/RW 03 Sidokare", "join": "10-07-2023", "status": "Aktif"}
]

USTADZ_LIST = [
    {
        "id": "UST-001", "nip": "TPQ-01.001", "nik": "3515015208820001", "name": "Ustadzah Hj. Siti Aminah, S.Pd.I",
        "gender": "P", "edu": "S1 Pendidikan Agama Islam (UIN Sunan Ampel)", "pesantren": "PP. Al-Fathimiyyah Bahrul Ulum Jombang",
        "syahadah": "Metode An-Nahdliyah Tingkat Munaqisy", "syahadahNo": "SYH-AN/JTM/2018/0092", "syahadahYear": "2018",
        "role": "Kepala TPQ & Pembina Tahsin Al-Qur'an", "phone": "0812-3245-8891", "status": "Guru Tetap"
    },
    {
        "id": "UST-002", "nip": "TPQ-01.002", "nik": "3515016405890002", "name": "Ustadzah Maimunah, S.Ag",
        "gender": "P", "edu": "S1 Ilmu Al-Qur'an & Tafsir (UIN Sunan Ampel)", "pesantren": "PP. Madrasatul Qur'an Tebuireng Jombang",
        "syahadah": "Metode An-Nahdliyah & Yanbu'a", "syahadahNo": "SYH-AN/JTM/2020/0112", "syahadahYear": "2020",
        "role": "Koordinator Kurikulum & Kelas Tajwid", "phone": "0813-5566-7788", "status": "Guru Tetap"
    },
    {
        "id": "UST-003", "nip": "TPQ-01.003", "nik": "3515011210920003", "name": "Ustadz Ahmad Fauzi, S.Pd",
        "gender": "L", "edu": "S1 Manajemen Pendidikan Islam (UIN Surabaya)", "pesantren": "PP. Langitan Tuban",
        "syahadah": "Metode An-Nahdliyah", "syahadahNo": "SYH-AN/JTM/2022/0789", "syahadahYear": "2022",
        "role": "Koordinator Kesiswaan & Jilid 5-6", "phone": "0857-4433-2211", "status": "Guru Tetap"
    },
    {
        "id": "UST-004", "nip": "TPQ-01.004", "nik": "3515014503950004", "name": "Ustadzah Fatimatuz Zahro, S.Pd",
        "gender": "P", "edu": "S1 Pendidikan Bahasa Arab (UIN Malang)", "pesantren": "PP. Bahrul Ulum Tambakberas Jombang",
        "syahadah": "Metode Qiraati", "syahadahNo": "SYH-QR/SBY/2023/0341", "syahadahYear": "2023",
        "role": "Bendahara & Jilid 3-4", "phone": "0812-9988-7766", "status": "Guru Tetap"
    },
    {
        "id": "UST-005", "nip": "TPQ-01.005", "nik": "3515015809960005", "name": "Ustadzah Nurul Hidayati, S.Pd",
        "gender": "P", "edu": "S1 PGMI (Universitas Sunan Giri Sidoarjo)", "pesantren": "PP. Al-Khoziny Buduran Sidoarjo",
        "syahadah": "Metode An-Nahdliyah", "syahadahNo": "SYH-AN/JTM/2023/0904", "syahadahYear": "2023",
        "role": "Sekretaris & Jilid 2", "phone": "0878-1122-3344", "status": "Guru Tetap"
    },
    {
        "id": "UST-006", "nip": "TPQ-01.006", "nik": "3515016912980006", "name": "Ustadzah Siti Rokhmah, A.Ma",
        "gender": "P", "edu": "D3 Tarbiyah & Hafidzah 30 Juz", "pesantren": "PP. Tahfidzul Qur'an Al-Baqarah Pasuruan",
        "syahadah": "Syahadah Tahfidz & Metodologi Kemenag", "syahadahNo": "SYH-TF/KMN/2024/0055", "syahadahYear": "2024",
        "role": "Koordinator Sarpras & Jilid 1 (Dasar)", "phone": "0813-6677-8800", "status": "Guru Tetap"
    }
]

INVENTARIS_LIST = [
    {"no": 1, "code": "INV/TPQ/MEJ/001-030", "name": "Meja Lipat Belajar Santri (Rekal Kayu Jati)", "cat": "Perabot Belajar", "qty": "30 Unit", "cond": "Baik", "src": "Wakaf Wali Santri", "loc": "Ruang Belajar Utama", "year": "2024"},
    {"no": 2, "code": "INV/TPQ/KRP/001-004", "name": "Karpet Sajadah Tebal Permadani Hijau", "cat": "Perabot Belajar", "qty": "4 Roll", "cond": "Baik", "src": "Yayasan AL FATAH", "loc": "Ruang Belajar Utama", "year": "2024"},
    {"no": 3, "code": "INV/TPQ/PBL/001-003", "name": "Papan Tulis Whiteboard Standar 120x240cm", "cat": "Media Ajar", "qty": "3 Buah", "cond": "Baik", "src": "Kas Mandiri TPQ", "loc": "Ruang Belajar A & B", "year": "2023"},
    {"no": 4, "code": "INV/TPQ/PRG/001-006", "name": "Alat Peraga Klasikal Metode Al-Qur'an 1-6", "cat": "Media Ajar", "qty": "6 Set", "cond": "Baik", "src": "Kas Mandiri TPQ", "loc": "Dinding Ruang Belajar", "year": "2024"},
    {"no": 5, "code": "INV/TPQ/QUR/001-050", "name": "Mushaf Al-Qur'an Standar Kemenag (Rasm Usmani)", "cat": "Media Ajar", "qty": "50 Eks", "cond": "Baik", "src": "Wakaf Kemenag & Donatur", "loc": "Lemari Al-Qur'an", "year": "2024"},
    {"no": 6, "code": "INV/TPQ/LMR/001-002", "name": "Lemari Arsip Kaca & Rak Kitab Kayu", "cat": "Perabot Kantor", "qty": "2 Unit", "cond": "Baik", "src": "Yayasan AL FATAH", "loc": "Kantor Pengurus", "year": "2023"},
    {"no": 7, "code": "INV/TPQ/SND/001-002", "name": "Sound System Portabel Wireless & Mic Clip-on", "cat": "Elektronik Audio", "qty": "2 Set", "cond": "Baik", "src": "Wakaf Komite Wali", "loc": "Ruang Utama", "year": "2025"},
    {"no": 8, "code": "INV/TPQ/KPS/001-004", "name": "Kipas Angin Dinding Tornado Fan", "cat": "Elektronik Ruang", "qty": "4 Unit", "cond": "Baik", "src": "Yayasan AL FATAH", "loc": "Ruang Belajar Utama", "year": "2024"},
    {"no": 9, "code": "INV/TPQ/PLG/001", "name": "Papan Nama Permanen TPQ Muslimat NU AL-IKHLAS", "cat": "Sarana Eksterior", "qty": "1 Plang", "cond": "Baik", "src": "Yayasan AL FATAH", "loc": "Depan Pagar Gedung", "year": "2023"},
    {"no": 10, "code": "INV/TPQ/P3K/001", "name": "Kotak P3K Dinding Lengkap Obat & Perban", "cat": "Kesehatan & K3", "qty": "1 Set", "cond": "Baik", "src": "Kas Mandiri TPQ", "loc": "Kantor Pengurus", "year": "2025"},
    {"no": 11, "code": "INV/TPQ/WDH/001-010", "name": "Kran Air Wudhu Stainless Putra & Putri", "cat": "Sanitasi Wudhu", "qty": "10 Titik", "cond": "Baik", "src": "Wakaf Masjid Al-Fatah", "loc": "Area Wudhu Santri", "year": "2024"},
    {"no": 12, "code": "INV/TPQ/SMP/001-006", "name": "Tempat Sampah Tertutup Organik/Anorganik", "cat": "Kebersihan", "qty": "6 Buah", "cond": "Baik", "src": "Kas Mandiri TPQ", "loc": "Halaman & Selasar", "year": "2025"}
]

print("Data initialized.")
