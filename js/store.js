/**
 * STORE & DATA CRUD MANAGEMENT
 * TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH
 * Menyimpan data peserta didik, ustadz/ah, sarpras, kas, dan profil lembaga autentik.
 */

const STORE_KEY = 'tpq_alikhlas_db_v3';

const DEFAULT_STORE = {
  institution: {
    name: 'TPQ MUSLIMAT NU AL-IKHLAS',
    foundation: 'YAYASAN AL FATAH',
    headmaster: 'Ustadzah Hj. Siti Aminah, S.Pd.I',
    headmasterNip: 'NIY. 19820514 201201 2 001',
    headmasterTitle: 'Kepala TPQ Muslimat NU AL-IKHLAS',
    headmasterPhone: '0812-3245-8891',
    headmasterEducation: 'S1 Pendidikan Agama Islam (PAI) UIN Sunan Ampel',
    headmasterSyahadah: 'Metode An-Nahdliyah Tingkat Munaqisy (No. SYH-AN/JTM/2018/0092)',
    headmasterPeriod: '2024 - 2029',
    headFoundation: 'Drs. H. Ahmad Fathoni, M.Pd.I',
    committeeHead: 'H. Ridwan Santoso',
    secretary: 'Ustadzah Nurul Hidayati, S.Pd',
    treasurer: 'Ustadzah Fatimatuz Zahro, S.Pd',
    nsq: '411235150089',
    ijop: 'Kd.13.15/4/PP.00.7/1420/2024',
    notary: 'AHU-0014285.AH.01.04.Tahun 2018',
    affiliation: 'Pimpinan Cabang Muslimat Nahdlatul Ulama Sidoarjo',
    method: 'Metode An-Nahdliyah / Qiraati',
    address: 'Jl. Masjid Al-Fatah No. 09, RT 03 / RW 02',
    village: 'Sidokare',
    subdistrict: 'Sidoarjo',
    city: 'Kabupaten Sidoarjo',
    province: 'Jawa Timur',
    postCode: '61214',
    phone: '(031) 8945672 / 0812-3245-8891',
    email: 'tpq.muslimatnu.alikhlas@gmail.com',
    activeYear: '2026/2027',
    legalCity: 'Sidoarjo',
    targetAccreditation: 'A (Unggul / Sangat Baik)',
    
    // Logo Kiri & Kanan & Branding KOP
    logoLeft: '', // Data URL gambar logo yayasan
    logoRight: '', // Data URL gambar logo Muslimat NU
    logoLeftType: 'preset', // preset | custom
    logoRightType: 'preset', // preset | custom
    logoLeftPreset: 'book', // book | mosque | building | star
    logoRightPreset: 'muslimat', // muslimat | nu | islamic
    kopLogoLayout: 'both', // both (kiri & kanan) | left (kiri saja) | right (kanan saja) | none (tanpa logo)
    kopBorderType: 'double-emerald', // double-emerald | double-black | triple-gold | solid-green
    signatureHeadmaster: '', // Data URL tanda tangan Kepala TPQ
    stampImage: '' // Data URL stempel lembaga
  },

  formulirConfig: {
    title: 'FORMULIR PENDAFTARAN',
    subtitle: 'CALON PESERTA DIDIK TPQ MUSLIMAT NU AL-IKHLAS',
    branchTag: '',
    academicYear: '2026/2027',
    useKop: true,
    showPhotoBox: true,
    photoBoxText: 'Pas Foto\n3 x 4',
    studentSectionTitle: 'IDENTITAS CALON PESERTA DIDIK',
    studentFields: [
      { id: 'name', label: 'Nama Lengkap', enabled: true },
      { id: 'nickname', label: 'Nama Panggilan', enabled: true },
      { id: 'birthPlaceDate', label: 'Tempat, Tanggal Lahir', enabled: true },
      { id: 'gender', label: 'Jenis Kelamin', enabled: true },
      { id: 'religion', label: 'Agama', enabled: true, defaultValue: 'Islam' },
      { id: 'childOrder', label: 'Anak Ke-', enabled: true },
      { id: 'siblingCount', label: 'Jumlah Saudara', enabled: true },
      { id: 'familyStatus', label: 'Status dalam keluarga', enabled: true, defaultValue: 'Anak Kandung' },
      { id: 'citizenship', label: 'Kewarganegaraan', enabled: true, defaultValue: 'WNI' },
      { id: 'address', label: 'Alamat Tempat Tinggal', enabled: true },
      { id: 'phone', label: 'No. HP / WhatsApp Wali', enabled: true }
    ],
    parentSectionTitle: 'IDENTITAS ORANG TUA/WALI',
    fatherHeader: 'Ayah kandung/tiri/angkat/wali *)',
    fatherFields: [
      { id: 'name', label: 'Nama', enabled: true },
      { id: 'birthPlaceDate', label: 'Tempat, tanggal lahir', enabled: true },
      { id: 'religion', label: 'Agama', enabled: true, defaultValue: 'Islam' },
      { id: 'citizenship', label: 'Kewarganegaraan', enabled: true, defaultValue: 'WNI' },
      { id: 'job', label: 'Pekerjaan', enabled: true },
      { id: 'education', label: 'Pendidikan', enabled: true }
    ],
    motherHeader: 'Ibu kandung/tiri/angkat/wali *)',
    motherFields: [
      { id: 'name', label: 'Nama', enabled: true },
      { id: 'birthPlaceDate', label: 'Tempat, tanggal lahir', enabled: true },
      { id: 'religion', label: 'Agama', enabled: true, defaultValue: 'Islam' },
      { id: 'citizenship', label: 'Kewarganegaraan', enabled: true, defaultValue: 'WNI' },
      { id: 'job', label: 'Pekerjaan', enabled: true },
      { id: 'education', label: 'Pendidikan', enabled: true }
    ],
    showRequirements: true,
    requirementsTitle: 'Syarat-Syarat Berkas Pendaftaran:',
    requirementsText: '1. Mengisi formulir pendaftaran ini secara lengkap dan benar\n2. Menyerahkan fotokopi Akta Kelahiran santri (1 lembar)\n3. Menyerahkan fotokopi Kartu Keluarga (KK) (1 lembar)\n4. Menyerahkan pas foto berwarna ukuran 3x4 (2 lembar)\n5. Infaq pendaftaran & paket materi belajar',
    signCity: 'Sidoarjo',
    signDateMode: 'blank', // 'blank' | 'today' | 'custom'
    signCustomDate: '',
    parentSignTitle: 'Orang Tua / Wali Calon Peserta Didik',
    officerSignTitle: 'Panitia Pendaftaran / Kepala TPQ',
    officerName: 'Ustadzah Hj. Siti Aminah, S.Pd.I',
    footerNote: '*) Coret yang tidak perlu'
  },

  santri: [
    {
      id: 'STR-001',
      nis: '2026/001',
      nik: '3515012304180001',
      name: 'Muhammad Bilal Al-Ghifari',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2018-04-12',
      classLevel: 'Jilid 4',
      parentName: 'H. Ridwan Santoso',
      parentPhone: '0813-8899-7711',
      address: 'Jl. Mawar No. 12 RT 01/RW 02 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-002',
      nis: '2026/002',
      nik: '3515015509170002',
      name: 'Aisyah Nur Ramadhani',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2017-09-15',
      classLevel: 'Al-Qur\'an & Tajwid',
      parentName: 'Hj. Sholihatun Nisa',
      parentPhone: '0812-3344-5566',
      address: 'Jl. Anggrek No. 05 RT 02/RW 02 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-003',
      nis: '2026/003',
      nik: '3515016201190003',
      name: 'Fatimah Az-Zahra',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2019-01-22',
      classLevel: 'Jilid 3',
      parentName: 'Dian Kusuma, S.Pd',
      parentPhone: '0856-7788-9900',
      address: 'Jl. Kutuk Timur No. 09 RT 03/RW 01 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-004',
      nis: '2026/004',
      nik: '3515011406180004',
      name: 'Ahmad Zaki Mubarak',
      gender: 'L',
      birthPlace: 'Surabaya',
      birthDate: '2018-06-14',
      classLevel: 'Jilid 5',
      parentName: 'Sri Wahyuni, S.Pd',
      parentPhone: '0813-1122-3344',
      address: 'Jl. Melati No. 18 RT 02/RW 01 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-005',
      nis: '2026/005',
      nik: '3515010311200005',
      name: 'Ibrahim Hanif',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2020-11-03',
      classLevel: 'Jilid 2',
      parentName: 'Bambang Supriyadi',
      parentPhone: '0878-4455-6677',
      address: 'Jl. Kutuk Barat No. 34 RT 03/RW 01 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-006',
      nis: '2026/006',
      nik: '3515014808180006',
      name: 'Khadijah Maryam',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2018-08-08',
      classLevel: 'Jilid 4',
      parentName: 'Nur Lailatul Qodriyah',
      parentPhone: '0812-7788-2233',
      address: 'Jl. Cendrawasih No. 04 RT 04/RW 02 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-007',
      nis: '2026/007',
      nik: '3515012903170007',
      name: 'Muhammad Fatih Al-Ayyubi',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2017-03-29',
      classLevel: 'Al-Qur\'an & Tajwid',
      parentName: 'H. Imam Mustofa',
      parentPhone: '0852-6677-8899',
      address: 'Jl. Masjid Barat No. 22 RT 01/RW 02 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-008',
      nis: '2026/008',
      nik: '3515017012200008',
      name: 'Zahira Nur Salsabila',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2020-12-30',
      classLevel: 'Jilid 1',
      parentName: 'Agus Hermawan',
      parentPhone: '0813-9900-1122',
      address: 'Jl. Kenanga No. 04 RT 01/RW 03 Sidokare',
      joinDate: '2026-07-13',
      status: 'Aktif'
    },
    {
      id: 'STR-009',
      nis: '2026/009',
      nik: '3515011707190009',
      name: 'Ali Zainal Abidin',
      gender: 'L',
      birthPlace: 'Pasuruan',
      birthDate: '2019-07-17',
      classLevel: 'Jilid 3',
      parentName: 'Syamsul Arifin',
      parentPhone: '0819-3322-1100',
      address: 'Jl. Mojopahit No. 88 RT 02/RW 01 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-010',
      nis: '2026/010',
      nik: '3515015105180010',
      name: 'Najwa Maulida Husna',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2018-05-11',
      classLevel: 'Jilid 5',
      parentName: 'M. Thohir, S.Ag',
      parentPhone: '0812-4455-9988',
      address: 'Jl. Dahlia No. 07 RT 03/RW 02 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-011',
      nis: '2026/011',
      nik: '3515010910210011',
      name: 'Hamzah Al-Farisi',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2021-10-09',
      classLevel: 'Jilid 1',
      parentName: 'Farid Wajdi',
      parentPhone: '0857-1122-4455',
      address: 'Jl. Masjid Timur No. 11 RT 01/RW 02 Sidokare',
      joinDate: '2026-07-13',
      status: 'Aktif'
    },
    {
      id: 'STR-012',
      nis: '2026/012',
      nik: '3515016502170012',
      name: 'Syifa Kamila Rahma',
      gender: 'P',
      birthPlace: 'Malang',
      birthDate: '2017-02-25',
      classLevel: 'Al-Qur\'an & Tajwid',
      parentName: 'H. Achmad Syafi\'i',
      parentPhone: '0813-7766-5544',
      address: 'Jl. Pahlawan No. 45 RT 02/RW 02 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-013',
      nis: '2026/013',
      nik: '3515015402210003',
      name: 'Maryam Khairunnisa',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2021-02-14',
      classLevel: 'Jilid 1',
      parentName: 'dr. H. Hendra Setiawan',
      parentPhone: '0812-8877-6655',
      address: 'Jl. Pahlawan No. 28 RT 02/RW 02 Sidokare',
      joinDate: '2026-07-13',
      status: 'Aktif'
    },
    {
      id: 'STR-014',
      nis: '2026/014',
      nik: '3515011805200004',
      name: 'Muhammad Azka Aldric',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2020-05-18',
      classLevel: 'Jilid 1',
      parentName: 'Bagus Prasetyo',
      parentPhone: '0813-4455-8822',
      address: 'Perum Sidokare Indah Blok B-08',
      joinDate: '2026-07-13',
      status: 'Aktif'
    },
    {
      id: 'STR-015',
      nis: '2026/015',
      nik: '3515016408200006',
      name: 'Naura Almaira',
      gender: 'P',
      birthPlace: 'Surabaya',
      birthDate: '2020-08-24',
      classLevel: 'Jilid 2',
      parentName: 'Eko Wahyudi',
      parentPhone: '0877-2233-4411',
      address: 'Jl. Diponegoro No. 15 RT 02/RW 04 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-016',
      nis: '2026/016',
      nik: '3515011201200007',
      name: 'Rayyan Daffa Pratama',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2020-01-12',
      classLevel: 'Jilid 2',
      parentName: 'Dedy Kurniawan',
      parentPhone: '0852-3344-5588',
      address: 'Jl. Sekardangan Indah No. 06 RT 01/RW 01',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-017',
      nis: '2026/017',
      nik: '3515014509190010',
      name: 'Annisa Salma Aqila',
      gender: 'P',
      birthPlace: 'Sidoarjo',
      birthDate: '2019-09-05',
      classLevel: 'Jilid 3',
      parentName: 'Arif Rahman, M.T',
      parentPhone: '0812-9900-1133',
      address: 'Jl. Gajah Mada No. 102 RT 04/RW 02 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-018',
      nis: '2026/018',
      nik: '3515011111190011',
      name: 'Kenzi Al-Ghaza',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2019-11-11',
      classLevel: 'Jilid 3',
      parentName: 'Rudi Hartono',
      parentPhone: '0813-7766-8899',
      address: 'Jl. Erlangga No. 19 RT 02/RW 03 Sidokare',
      joinDate: '2025-07-14',
      status: 'Aktif'
    },
    {
      id: 'STR-019',
      nis: '2026/019',
      nik: '3515012905180014',
      name: 'Fajar Sidiq Ramadhan',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2018-05-29',
      classLevel: 'Jilid 4',
      parentName: 'Wawan Setyawan',
      parentPhone: '0857-4433-2299',
      address: 'Jl. Anggrek No. 14 RT 02/RW 02 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-020',
      nis: '2026/020',
      nik: '3515015612180015',
      name: 'Hafidzah Nailatur Rohmah',
      gender: 'P',
      birthPlace: 'Malang',
      birthDate: '2018-12-16',
      classLevel: 'Jilid 4',
      parentName: 'M. Munir',
      parentPhone: '0812-6655-4433',
      address: 'Jl. Kartini No. 42 RT 03/RW 01 Sidokare',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-021',
      nis: '2026/021',
      nik: '3515010403180018',
      name: 'Wildan Habiburrahman',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2018-03-04',
      classLevel: 'Jilid 5',
      parentName: 'Ir. H. Sugeng Riyadi',
      parentPhone: '0811-3344-5566',
      address: 'Perum Taman Sidokare Asri Blok D-11',
      joinDate: '2024-07-15',
      status: 'Aktif'
    },
    {
      id: 'STR-022',
      nis: '2026/022',
      nik: '3515012707170019',
      name: 'Farhan Maulana Yusuf',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2017-07-27',
      classLevel: 'Jilid 6',
      parentName: 'Yusuf Bachtiar',
      parentPhone: '0813-2211-7788',
      address: 'Jl. Monginsidi No. 31 RT 01/RW 02 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-023',
      nis: '2026/023',
      nik: '3515015910170020',
      name: 'Nabila Putri Az-Zahra',
      gender: 'P',
      birthPlace: 'Surabaya',
      birthDate: '2017-10-19',
      classLevel: 'Jilid 6',
      parentName: 'H. Suparman',
      parentPhone: '0812-9988-3344',
      address: 'Jl. Thamrin No. 08 RT 02/RW 02 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-024',
      nis: '2026/024',
      nik: '3515010501170021',
      name: 'Danial Haidar',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2017-01-05',
      classLevel: 'Jilid 6',
      parentName: 'Drs. Akhmad Muzakki',
      parentPhone: '0856-1122-3377',
      address: 'Jl. Kutuk Barat No. 77 RT 03/RW 01 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    },
    {
      id: 'STR-025',
      nis: '2026/025',
      nik: '3515011011160025',
      name: 'Zulfikar Ali Ridho',
      gender: 'L',
      birthPlace: 'Sidoarjo',
      birthDate: '2016-11-10',
      classLevel: 'Al-Qur\'an & Tajwid',
      parentName: 'Drs. Ali Maksum, M.Pd.I',
      parentPhone: '0813-3344-9900',
      address: 'Jl. Kartini No. 89 RT 01/RW 03 Sidokare',
      joinDate: '2023-07-10',
      status: 'Aktif'
    }
  ],

  ustadz: [
    {
      id: 'UST-001',
      nip: 'TPQ-01.001',
      nik: '3515015208820001',
      name: 'Ustadzah Hj. Siti Aminah, S.Pd.I',
      gender: 'P',
      education: 'S1 Pendidikan Agama Islam (UIN Sunan Ampel)',
      pesantren: 'PP. Al-Fathimiyyah Jombang',
      syahadahMethod: 'Metode An-Nahdliyah',
      syahadahNumber: 'SYH-AN/JTM/2018/0092',
      syahadahYear: '2018',
      assignedClass: 'Kepala TPQ & Pembina Al-Qur\'an',
      phone: '0812-3245-8891',
      status: 'Guru Tetap'
    },
    {
      id: 'UST-002',
      nip: 'TPQ-01.002',
      nik: '3515016405890002',
      name: 'Ustadzah Maimunah, S.Ag',
      gender: 'P',
      education: 'S1 Ilmu Al-Qur\'an & Tafsir (UIN Sunan Ampel)',
      pesantren: 'PP. Madrasatul Qur\'an Tebuireng Jombang',
      syahadahMethod: 'Metode An-Nahdliyah & Yanbu\'a',
      syahadahNumber: 'SYH-AN/JTM/2020/0112',
      syahadahYear: '2020',
      assignedClass: 'Koord. Kurikulum & Kelas Tajwid',
      phone: '0813-5566-7788',
      status: 'Guru Tetap'
    },
    {
      id: 'UST-003',
      nip: 'TPQ-01.003',
      nik: '3515011210920003',
      name: 'Ustadz Ahmad Fauzi, S.Pd',
      gender: 'L',
      education: 'S1 Manajemen Pendidikan Islam (UIN Surabaya)',
      pesantren: 'PP. Langitan Tuban',
      syahadahMethod: 'Metode An-Nahdliyah',
      syahadahNumber: 'SYH-AN/JTM/2022/0789',
      syahadahYear: '2022',
      assignedClass: 'Koord. Kesiswaan & Jilid 5-6',
      phone: '0857-4433-2211',
      status: 'Guru Tetap'
    },
    {
      id: 'UST-004',
      nip: 'TPQ-01.004',
      nik: '3515014503950004',
      name: 'Ustadzah Fatimatuz Zahro, S.Pd',
      gender: 'P',
      education: 'S1 Pendidikan Bahasa Arab (UIN Malang)',
      pesantren: 'PP. Bahrul Ulum Tambakberas Jombang',
      syahadahMethod: 'Metode Qiraati',
      syahadahNumber: 'SYH-QR/SBY/2023/0341',
      syahadahYear: '2023',
      assignedClass: 'Bendahara & Jilid 3-4',
      phone: '0812-9988-7766',
      status: 'Guru Tetap'
    },
    {
      id: 'UST-005',
      nip: 'TPQ-01.005',
      nik: '3515015809960005',
      name: 'Ustadzah Nurul Hidayati, S.Pd',
      gender: 'P',
      education: 'S1 PGMI (Universitas Sunan Giri Sidoarjo)',
      pesantren: 'PP. Al-Khoziny Buduran Sidoarjo',
      syahadahMethod: 'Metode An-Nahdliyah',
      syahadahNumber: 'SYH-AN/JTM/2023/0904',
      syahadahYear: '2023',
      assignedClass: 'Sekretaris & Jilid 2',
      phone: '0878-1122-3344',
      status: 'Guru Tetap'
    },
    {
      id: 'UST-006',
      nip: 'TPQ-01.006',
      nik: '3515016912980006',
      name: 'Ustadzah Siti Rokhmah, A.Ma',
      gender: 'P',
      education: 'D3 Tarbiyah & Hafidzah 30 Juz',
      pesantren: 'PP. Tahfidzul Qur\'an Al-Baqarah Pasuruan',
      syahadahMethod: 'Syahadah Tahfidz & Metodologi',
      syahadahNumber: 'SYH-TF/KMN/2024/0055',
      syahadahYear: '2024',
      assignedClass: 'Koord. Sarpras & Jilid 1 (Dasar)',
      phone: '0813-6677-8800',
      status: 'Guru Tetap'
    }
  ],

  inventaris: [
    {
      id: 'INV-001',
      code: 'INV/TPQ/MEJ/001-030',
      name: 'Meja Lipat Belajar Santri (Rekal Kayu)',
      category: 'Perabot Belajar',
      qty: 30,
      unit: 'Unit',
      condition: 'Baik',
      source: 'Wakaf Wali Santri',
      location: 'Ruang Belajar Utama',
      acqYear: '2024'
    },
    {
      id: 'INV-002',
      code: 'INV/TPQ/KRP/001-004',
      name: 'Karpet Sajadah Tebal Permadani Hijau',
      category: 'Perabot Belajar',
      qty: 4,
      unit: 'Roll',
      condition: 'Baik',
      source: 'Yayasan AL FATAH',
      location: 'Ruang Belajar Utama',
      acqYear: '2024'
    },
    {
      id: 'INV-003',
      code: 'INV/TPQ/PBL/001-003',
      name: 'Papan Tulis Whiteboard Standar 120x240cm',
      category: 'Media Ajar',
      qty: 3,
      unit: 'Buah',
      condition: 'Baik',
      source: 'Kas Mandiri TPQ',
      location: 'Ruang Belajar A & B',
      acqYear: '2023'
    },
    {
      id: 'INV-004',
      code: 'INV/TPQ/PRG/001-006',
      name: 'Alat Peraga Klasikal Metode Al-Qur\'an 1-6',
      category: 'Media Ajar',
      qty: 6,
      unit: 'Set',
      condition: 'Baik',
      source: 'Kas Mandiri TPQ',
      location: 'Dinding Ruang Belajar',
      acqYear: '2024'
    },
    {
      id: 'INV-005',
      code: 'INV/TPQ/QUR/001-050',
      name: 'Mushaf Al-Qur\'an Standar Kemenag (Rasm Usmani)',
      category: 'Media Ajar',
      qty: 50,
      unit: 'Eks',
      condition: 'Baik',
      source: 'Wakaf Kemenag & Donatur',
      location: 'Lemari Al-Qur\'an',
      acqYear: '2024'
    },
    {
      id: 'INV-006',
      code: 'INV/TPQ/LMR/001-002',
      name: 'Lemari Arsip Kaca & Rak Kitab',
      category: 'Perabot Kantor',
      qty: 2,
      unit: 'Unit',
      condition: 'Baik',
      source: 'Yayasan AL FATAH',
      location: 'Kantor Pengurus',
      acqYear: '2023'
    },
    {
      id: 'INV-007',
      code: 'INV/TPQ/SND/001-002',
      name: 'Sound System Portabel Wireless & Mic',
      category: 'Elektronik Audio',
      qty: 2,
      unit: 'Set',
      condition: 'Baik',
      source: 'Wakaf Komite Wali',
      location: 'Ruang Utama',
      acqYear: '2025'
    },
    {
      id: 'INV-008',
      code: 'INV/TPQ/KPS/001-004',
      name: 'Kipas Angin Dinding Tornado Fan',
      category: 'Elektronik Ruang',
      qty: 4,
      unit: 'Unit',
      condition: 'Baik',
      source: 'Yayasan AL FATAH',
      location: 'Ruang Belajar Utama',
      acqYear: '2024'
    },
    {
      id: 'INV-009',
      code: 'INV/TPQ/PLG/001',
      name: 'Papan Nama Permanen TPQ Muslimat NU AL-IKHLAS',
      category: 'Sarana Eksterior',
      qty: 1,
      unit: 'Plang',
      condition: 'Baik',
      source: 'Yayasan AL FATAH',
      location: 'Depan Pagar Gedung',
      acqYear: '2023'
    },
    {
      id: 'INV-010',
      code: 'INV/TPQ/P3K/001',
      name: 'Kotak P3K Dinding Lengkap Obat Standar',
      category: 'Kesehatan & K3',
      qty: 1,
      unit: 'Set',
      condition: 'Baik',
      source: 'Kas Mandiri TPQ',
      location: 'Kantor Pengurus',
      acqYear: '2025'
    },
    {
      id: 'INV-011',
      code: 'INV/TPQ/WDH/001-010',
      name: 'Kran Air Wudhu Stainless Putra & Putri',
      category: 'Sanitasi Wudhu',
      qty: 10,
      unit: 'Titik',
      condition: 'Baik',
      source: 'Wakaf Masjid Al-Fatah',
      location: 'Area Wudhu Santri',
      acqYear: '2024'
    },
    {
      id: 'INV-012',
      code: 'INV/TPQ/SMP/001-006',
      name: 'Tempat Sampah Tertutup Organik/Anorganik',
      category: 'Kebersihan',
      qty: 6,
      unit: 'Buah',
      condition: 'Baik',
      source: 'Kas Mandiri TPQ',
      location: 'Halaman & Selasar',
      acqYear: '2025'
    }
  ],

  kas: [
    {
      id: 'KAS-001',
      date: '2026-08-01',
      type: 'in',
      category: 'Infaq/SPP Santri',
      amount: 3600000,
      proofNumber: 'KW-08/2026/01',
      description: 'Penerimaan Infaq Bulanan Santri Periode Agustus 2026 (72 Santri)'
    },
    {
      id: 'KAS-002',
      date: '2026-08-03',
      type: 'in',
      category: 'Donasi Donatur Yayasan',
      amount: 1500000,
      proofNumber: 'KW-08/2026/02',
      description: 'Donasi Rutin Pengembangan TPQ dari Hamba Allah Yayasan AL FATAH'
    },
    {
      id: 'KAS-003',
      date: '2026-08-05',
      type: 'out',
      category: 'Pembelian ATK & Media',
      amount: 450000,
      proofNumber: 'NT-08/2026/01',
      description: 'Pembelian Spidol Whiteboard, Tinta Refill, & Kertas HVS Akreditasi'
    },
    {
      id: 'KAS-004',
      date: '2026-08-10',
      type: 'out',
      category: 'Operasional Listrik & Kebersihan',
      amount: 250000,
      proofNumber: 'NT-08/2026/02',
      description: 'Pembayaran Tagihan Listrik PLN & Alat Kebersihan Lantai Ruang TPQ'
    },
    {
      id: 'KAS-005',
      date: '2026-08-15',
      type: 'in',
      category: 'Infaq Pendaftaran PSB',
      amount: 750000,
      proofNumber: 'KW-08/2026/03',
      description: 'Penerimaan Infaq Pendaftaran 5 Santri Baru Angkatan Semester Ganjil'
    },
    {
      id: 'KAS-006',
      date: '2026-08-25',
      type: 'out',
      category: 'Bisaroh / Honor Guru',
      amount: 3000000,
      proofNumber: 'KW-08/2026/04',
      description: 'Penyaluran Bisaroh Insentif Ustadz/Ustadzah (6 Pengajar) Bulan Agustus'
    },
    {
      id: 'KAS-007',
      date: '2026-09-01',
      type: 'in',
      category: 'Infaq/SPP Santri',
      amount: 3750000,
      proofNumber: 'KW-09/2026/01',
      description: 'Penerimaan Infaq Bulanan Santri Periode September 2026'
    },
    {
      id: 'KAS-008',
      date: '2026-09-05',
      type: 'out',
      category: 'Persiapan Berkas Akreditasi',
      amount: 380000,
      proofNumber: 'NT-09/2026/01',
      description: 'Pengadaan 6 Map Odner Bantex Tebal, Divider Warna, dan Jilid Profil'
    }
  ]
};

// Data Store Access & Mutation
function getAppStore() {
  const saved = localStorage.getItem(STORE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed) {
        // Sanitize any remaining placeholder data if user local cache has old data
        if (parsed.institution && (parsed.institution.city === 'Kabupaten Berkah' || parsed.institution.village === 'Sukamaju' || parsed.institution.subdistrict === 'Harapan')) {
          parsed.institution = Object.assign({}, DEFAULT_STORE.institution);
        } else {
          parsed.institution = Object.assign({}, DEFAULT_STORE.institution, parsed.institution || {});
        }
        if (!parsed.santri || parsed.santri.length < 20) {
          parsed.santri = DEFAULT_STORE.santri;
        }
        if (!parsed.ustadz || parsed.ustadz.length < 6) {
          parsed.ustadz = DEFAULT_STORE.ustadz;
        }
        if (!parsed.formulirConfig) {
          parsed.formulirConfig = JSON.parse(JSON.stringify(DEFAULT_STORE.formulirConfig));
        } else {
          parsed.formulirConfig = Object.assign({}, DEFAULT_STORE.formulirConfig, parsed.formulirConfig);
        }
        return parsed;
      }
    } catch (e) {
      console.error('Gagal parsing local store, memuat default:', e);
    }
  }
  saveAppStore(DEFAULT_STORE);
  return DEFAULT_STORE;
}

function saveAppStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function resetAppStoreToDefault() {
  saveAppStore(DEFAULT_STORE);
  return DEFAULT_STORE;
}

// CRUD Operations: Peserta Didik
function addSantri(santriData) {
  const store = getAppStore();
  const nextNumber = store.santri.length + 1;
  const newId = 'STR-' + String(nextNumber).padStart(3, '0');
  const newNis = '2026/' + String(nextNumber).padStart(3, '0');
  
  const newRecord = Object.assign({
    id: newId,
    nis: newNis,
    status: 'Aktif',
    joinDate: new Date().toISOString().split('T')[0]
  }, santriData);

  store.santri.push(newRecord);
  saveAppStore(store);
  syncToSqlBackend('/api/santri', 'POST', newRecord);
  return newRecord;
}

function updateSantri(id, updatedFields) {
  const store = getAppStore();
  const index = store.santri.findIndex(s => s.id === id);
  if (index !== -1) {
    store.santri[index] = Object.assign({}, store.santri[index], updatedFields);
    saveAppStore(store);
    syncToSqlBackend('/api/santri', 'POST', store.santri[index]);
    return store.santri[index];
  }
  return null;
}

function deleteSantri(id) {
  const store = getAppStore();
  store.santri = store.santri.filter(s => s.id !== id);
  saveAppStore(store);
  syncToSqlBackend('/api/santri?id=' + encodeURIComponent(id), 'DELETE');
}

// CRUD Operations: Ustadz/Ustadzah
function addUstadz(ustadzData) {
  const store = getAppStore();
  const nextNumber = store.ustadz.length + 1;
  const newId = 'UST-' + String(nextNumber).padStart(3, '0');
  const newNip = 'TPQ-01.' + String(nextNumber).padStart(3, '0');
  
  const newRecord = Object.assign({
    id: newId,
    nip: newNip,
    status: 'Guru Tetap'
  }, ustadzData);

  store.ustadz.push(newRecord);
  saveAppStore(store);
  syncToSqlBackend('/api/ustadz', 'POST', newRecord);
  return newRecord;
}

function updateUstadz(id, updatedFields) {
  const store = getAppStore();
  const index = store.ustadz.findIndex(u => u.id === id);
  if (index !== -1) {
    store.ustadz[index] = Object.assign({}, store.ustadz[index], updatedFields);
    saveAppStore(store);
    syncToSqlBackend('/api/ustadz', 'POST', store.ustadz[index]);
    return store.ustadz[index];
  }
  return null;
}

function deleteUstadz(id) {
  const store = getAppStore();
  store.ustadz = store.ustadz.filter(u => u.id !== id);
  saveAppStore(store);
  syncToSqlBackend('/api/ustadz?id=' + encodeURIComponent(id), 'DELETE');
}

// CRUD Operations: Sarana Prasarana
function addInventaris(invData) {
  const store = getAppStore();
  const nextNumber = store.inventaris.length + 1;
  const newId = 'INV-' + String(nextNumber).padStart(3, '0');
  const newCode = 'INV/TPQ/BRG/' + String(nextNumber).padStart(3, '0');
  
  const newRecord = Object.assign({
    id: newId,
    code: newCode,
    condition: 'Baik'
  }, invData);

  store.inventaris.push(newRecord);
  saveAppStore(store);
  syncToSqlBackend('/api/inventaris', 'POST', newRecord);
  return newRecord;
}

function updateInventaris(id, updatedFields) {
  const store = getAppStore();
  const index = store.inventaris.findIndex(i => i.id === id);
  if (index !== -1) {
    store.inventaris[index] = Object.assign({}, store.inventaris[index], updatedFields);
    saveAppStore(store);
    syncToSqlBackend('/api/inventaris', 'POST', store.inventaris[index]);
    return store.inventaris[index];
  }
  return null;
}

function deleteInventaris(id) {
  const store = getAppStore();
  store.inventaris = store.inventaris.filter(i => i.id !== id);
  saveAppStore(store);
  syncToSqlBackend('/api/inventaris?id=' + encodeURIComponent(id), 'DELETE');
}

// CRUD Operations: Buku Kas Keuangan
function addKas(kasData) {
  const store = getAppStore();
  const nextNumber = store.kas.length + 1;
  const newId = 'KAS-' + String(nextNumber).padStart(3, '0');
  const prefix = kasData.type === 'in' ? 'KW' : 'NT';
  const month = new Date().getMonth() + 1;
  const newProof = prefix + '-' + String(month).padStart(2, '0') + '/2026/' + String(nextNumber).padStart(2, '0');
  
  const newRecord = Object.assign({
    id: newId,
    proofNumber: newProof,
    date: new Date().toISOString().split('T')[0]
  }, kasData);

  store.kas.push(newRecord);
  saveAppStore(store);
  syncToSqlBackend('/api/kas', 'POST', newRecord);
  return newRecord;
}

function deleteKas(id) {
  const store = getAppStore();
  store.kas = store.kas.filter(k => k.id !== id);
  saveAppStore(store);
  syncToSqlBackend('/api/kas?id=' + encodeURIComponent(id), 'DELETE');
}

// Update Profil Lembaga & KOP
function updateInstitution(instData) {
  const store = getAppStore();
  store.institution = Object.assign({}, store.institution, instData);
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  return store.institution;
}

// Update Pengaturan Formulir Pendaftaran
function updateFormulirConfig(newConfig) {
  const store = getAppStore();
  store.formulirConfig = Object.assign({}, store.formulirConfig, newConfig);
  saveAppStore(store);
  syncToSqlBackend('/api/formulir-config', 'POST', store.formulirConfig);
  return store.formulirConfig;
}

function resetFormulirConfig() {
  const store = getAppStore();
  store.formulirConfig = JSON.parse(JSON.stringify(DEFAULT_STORE.formulirConfig));
  saveAppStore(store);
  syncToSqlBackend('/api/formulir-config', 'POST', store.formulirConfig);
  return store.formulirConfig;
}

// ==========================================
// SQL DATABASE REST API PERSISTENCE
// ==========================================
let isSqlConnected = false;

async function checkSqlDatabaseStatus() {
  try {
    const res = await fetch('/api/status', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      isSqlConnected = true;
      updateSqlBadge(true, data);
      return data;
    }
  } catch (e) {
    // Backend offline / static preview mode
  }
  isSqlConnected = false;
  updateSqlBadge(false);
  return null;
}

function updateSqlBadge(connected, info = null) {
  const badge = document.getElementById('sql-db-badge');
  if (!badge) return;
  if (connected) {
    const totalRecords = info && info.counts ? 
      ((info.counts.santri || 0) + (info.counts.ustadz || 0) + (info.counts.inventaris || 0) + (info.counts.kas || 0)) : '';
    badge.className = 'inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-sm cursor-pointer hover:bg-emerald-900 transition';
    badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span><span>SQL Database: SQLite Aktif ${totalRecords ? '(' + totalRecords + ' Data)' : ''}</span>`;
    badge.title = 'Tersimpan di SQLite: database/tpq_alikhlas.db dan diekspor ke database/tpq_alikhlas.sql. Klik untuk sinkronisasi.';
    badge.onclick = () => syncFullStoreToSql(true);
  } else {
    badge.className = 'inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/40';
    badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span><span>Mode Cache Lokal (Offline)</span>`;
    badge.title = 'Server Python belum aktif. Data disimpan di LocalStorage.';
  }
}

async function syncToSqlBackend(endpoint, method = 'POST', data = null) {
  try {
    const options = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    const res = await fetch(endpoint, options);
    if (res.ok) {
      checkSqlDatabaseStatus();
      return await res.json();
    }
  } catch (e) {
    // Offline or server not responding, fail silently while keeping LocalStorage safe
  }
  return null;
}

async function loadStoreFromSqlBackend() {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.ok && json.data) {
        const sqlData = json.data;
        const current = getAppStore();
        
        // Merge seamlessly
        if (sqlData.institution && Object.keys(sqlData.institution).length > 0) {
          current.institution = Object.assign({}, current.institution, sqlData.institution);
        }
        if (sqlData.santri && sqlData.santri.length > 0) {
          current.santri = sqlData.santri;
        }
        if (sqlData.ustadz && sqlData.ustadz.length > 0) {
          current.ustadz = sqlData.ustadz;
        }
        if (sqlData.inventaris && sqlData.inventaris.length > 0) {
          current.inventaris = sqlData.inventaris;
        }
        if (sqlData.kas && sqlData.kas.length > 0) {
          current.kas = sqlData.kas;
        }
        if (sqlData.formulirConfig && Object.keys(sqlData.formulirConfig).length > 0) {
          current.formulirConfig = Object.assign({}, DEFAULT_STORE.formulirConfig, sqlData.formulirConfig);
        }
        
        // Update checklist in state if present
        if (sqlData.checklist && window.state && window.state.itemsStatus) {
          Object.keys(sqlData.checklist).forEach(itemId => {
            window.state.itemsStatus[itemId] = sqlData.checklist[itemId].status;
            if (sqlData.checklist[itemId].notes) {
              window.state.itemsNotes[itemId] = sqlData.checklist[itemId].notes;
            }
          });
        }
        
        saveAppStore(current);
        isSqlConnected = true;
        checkSqlDatabaseStatus();
        return current;
      }
    }
  } catch (e) {
    console.warn('SQL backend tidak dapat dihubungi, menggunakan LocalStorage:', e);
  }
  return getAppStore();
}

async function syncFullStoreToSql(showToastNotification = false) {
  const store = getAppStore();
  const checklistData = {};
  if (window.state && window.state.itemsStatus) {
    Object.keys(window.state.itemsStatus).forEach(k => {
      checklistData[k] = {
        status: window.state.itemsStatus[k],
        notes: (window.state.itemsNotes && window.state.itemsNotes[k]) || ''
      };
    });
  }

  const payload = {
    institution: store.institution,
    formulirConfig: store.formulirConfig,
    santri: store.santri,
    ustadz: store.ustadz,
    inventaris: store.inventaris,
    kas: store.kas,
    checklist: checklistData
  };
  
  const res = await syncToSqlBackend('/api/sync', 'POST', payload);
  if (res && res.ok) {
    checkSqlDatabaseStatus();
    if (showToastNotification && typeof showToast === 'function') {
      showToast('Seluruh data TPQ berhasil disinkronkan & tersimpan permanen di database SQL (SQLite & .sql dump)!');
    }
  } else {
    if (showToastNotification && typeof showToast === 'function') {
      showToast('Gagal terhubung ke database SQL. Data tetap aman di penyimpanan browser lokal.');
    }
  }
}

