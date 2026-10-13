/**
 * DATA DOKUMEN AKREDITASI TPQ MUSLIMAT NU AL-IKHLAS
 * YAYASAN AL FATAH
 * Sesuai Standar Akreditasi Kemenag RI, LPPTQ, dan Karakteristik Muslimat NU
 */

const AKREDITASI_DATA = {
  institution: {
    name: "TPQ MUSLIMAT NU AL-IKHLAS",
    foundation: "Yayasan AL FATAH",
    affiliation: "Pimpinan Cabang / Anak Cabang Muslimat NU",
    method: "Metode An-Nahdliyah / Qiraati / Yanbu'a",
    address: "Jl. Masjid Al-Fatah, Lingkungan Lembaga Pendidikan TPQ Muslimat NU",
    level: "Taman Pendidikan Al-Qur'an (Level A, B, C & Pasca TPQ)",
    targetAccreditation: "A (Unggul / Sangat Baik)",
    year: "Tahun Ajaran 2026/2027"
  },

  categories: [
    {
      id: "kelembagaan",
      number: "1",
      name: "Dokumen Kelembagaan & Legalitas",
      shortName: "Kelembagaan",
      badgeColor: "emerald",
      icon: "building-library",
      description: "Legalitas hukum penyelenggaraan lembaga, struktur kepengurusan resmi, dan arsip kelembagaan.",
      standardMapping: "Standar Pengelolaan & Legalitas Hukum"
    },
    {
      id: "kurikulum",
      number: "2",
      name: "Dokumen Kurikulum & Pembelajaran",
      shortName: "Kurikulum",
      badgeColor: "blue",
      icon: "book-open",
      description: "Panduan kurikulum, silabus materi, kalender pendidikan, rencana ajar, dan media pembelajaran Al-Qur'an.",
      standardMapping: "Standar Isi & Standar Proses Pembelajaran"
    },
    {
      id: "kesiswaan",
      number: "3",
      name: "Dokumen Kesiswaan (Santri)",
      shortName: "Kesiswaan",
      badgeColor: "amber",
      icon: "users",
      description: "Administrasi santri, buku induk, absensi, buku mutaba'ah prestasi, evaluasi munaqosyah, dan kelulusan.",
      standardMapping: "Standar Kompetensi Lulusan & Kesiswaan"
    },
    {
      id: "ketenagakerjaan",
      number: "4",
      name: "Dokumen Pendidik & Tenaga Kependidikan (Ustadz/ah)",
      shortName: "Ustadz/Ustadzah",
      badgeColor: "purple",
      icon: "academic-cap",
      description: "Data pengajar, sertifikat syahadah kelayakan mengajar, SK pengangkatan, dan presensi ustadz/ustadzah.",
      standardMapping: "Standar Pendidik dan Tenaga Kependidikan"
    },
    {
      id: "sarpras_keuangan",
      number: "5",
      name: "Dokumen Sarana, Prasarana, & Keuangan",
      shortName: "Sarpras & Keuangan",
      badgeColor: "rose",
      icon: "banknotes",
      description: "Buku inventaris aset, catatan pembukuan kas/SPP, serta bukti kelayakan ruang belajar dan fasilitas fisik.",
      standardMapping: "Standar Sarana Prasarana & Standar Pembiayaan"
    },
    {
      id: "kekhasan_nu",
      number: "6",
      name: "Dokumen Kekhasan Ke-NU-an & Amaliyah Aswaja",
      shortName: "Kekhasan Aswaja NU",
      badgeColor: "teal",
      icon: "sparkles",
      description: "Ciri khas amaliyah Ahlussunnah wal Jama'ah An-Nahdliyah, pembiasaan sholat fardhu/dhuha, doa qunut, dzikir & sholawat.",
      standardMapping: "Standar Muatan Lokal & Ciri Khas Kelembagaan NU"
    },
    {
      id: "sop_tata_kelola",
      number: "7",
      name: "Dokumen SOP, Tata Kelola & Mutu Lembaga",
      shortName: "SOP & Tata Tertib",
      badgeColor: "indigo",
      icon: "clipboard-document-check",
      description: "Visi misi tujuan lembaga, SOP pembelajaran, tata tertib santri & guru, serta sistem penanganan pengaduan.",
      standardMapping: "Standar Penjaminan Mutu & Budaya Lembaga"
    },
    {
      id: "humas_kemitraan",
      number: "8",
      name: "Dokumen Komite Wali Santri, Prestasi & Kemitraan",
      shortName: "Komite & Prestasi",
      badgeColor: "orange",
      icon: "trophy",
      description: "SK Komite/Paguyuban wali santri, notulensi parenting, portofolio prestasi lomba (FASI/MTQ), dan foto kegiatan.",
      standardMapping: "Standar Hubungan Masyarakat & Penilaian Eksternal"
    }
  ],

  items: [
    // 1. KELEMBAGAAN & LEGALITAS
    {
      id: "DOC-101",
      categoryId: "kelembagaan",
      code: "1.1",
      title: "Izin Operasional (IJOP) & Piagam Nomor Statistik TPQ (NSQ)",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 1) & Softcopy PDF",
      description: "Surat Keputusan (SK) dan Piagam Izin Operasional resmi dari Kantor Kementerian Agama (Kemenag) Kabupaten/Kota yang masih aktif berlaku serta nomor statistik TPQ (NSQ).",
      assessorNotes: "Asesor memeriksa masa berlaku IJOP. Bila dalam masa perpanjangan, wajib menyertakan surat keterangan rekomendasi/resi proses dari Kemenag.",
      checkpoints: [
        "SK Izin Operasional Kemenag asli / legalisir",
        "Piagam Tanda Daftar Nomor Statistik TPQ (NSQ)",
        "Terdaftar pada sistem EMIS Pendis Kemenag RI",
        "Masa berlaku surat masih aktif"
      ],
      defaultStatus: "ready",
      scoreWeight: 5
    },
    {
      id: "DOC-102",
      categoryId: "kelembagaan",
      code: "1.2",
      title: "Akta Notaris & SK Kemenkumham Yayasan AL FATAH",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 1)",
      description: "Salinan Akta Notaris pendirian Yayasan AL FATAH dan SK Pengesahan Badan Hukum dari Kementerian Hukum dan HAM RI (Kemenkumham).",
      assessorNotes: "Memastikan legalitas payung hukum yayasan yang menaungi TPQ Muslimat NU AL-IKHLAS berstatus badan hukum sah di Indonesia.",
      checkpoints: [
        "Salinan Akta Notaris Yayasan AL FATAH",
        "SK Pengesahan Kemenkumham RI",
        "NPWP atas nama Yayasan / TPQ",
        "Stempel resmi Yayasan dan TPQ yang sinkron"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-103",
      categoryId: "kelembagaan",
      code: "1.3",
      title: "SK Pengesahan / Rekomendasi Pimpinan Muslimat NU",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Odner 1)",
      description: "Surat Keputusan / Rekomendasi Pengesahan Pengurus dari Pimpinan Cabang (PC) atau Pimpinan Anak Cabang (PAC) Muslimat NU setempat.",
      assessorNotes: "Bukti legitimasi bahwa TPQ merupakan bagian resmi dari jejaring dakwah pendidikan Al-Qur'an binaan Muslimat NU.",
      checkpoints: [
        "Surat Rekomendasi / SK Pengesahan PAC / PC Muslimat NU",
        "Nomor Registrasi anggota/afiliasi lembaga Muslimat NU",
        "Tanda tangan pimpinan Muslimat NU yang berwenang"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-104",
      categoryId: "kelembagaan",
      code: "1.4",
      title: "SK Susunan Pengurus TPQ Muslimat NU AL-IKHLAS",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 1)",
      description: "Surat Keputusan pengangkatan struktur pengurus TPQ (Penasehat, Kepala TPQ, Sekretaris, Bendahara, Koordinator Pendidikan, Koordinator Sarpras).",
      assessorNotes: "SK harus memuat masa bakti (contoh: 2024–2027) dan ditandatangani Ketua Yayasan AL FATAH & Pimpinan Muslimat NU.",
      checkpoints: [
        "SK lengkap susunan dewan pengurus TPQ",
        "Pencantuman tugas dan wewenang (Tupoksi) per jabatan",
        "Masa bakti kepengurusan masih aktif",
        "Tertanda tangan pimpinan yayasan & berstempel basah"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-105",
      categoryId: "kelembagaan",
      code: "1.5",
      title: "Bagan Struktur Organisasi TPQ (Display & Cetak)",
      importance: "Penting",
      physicalFormat: "Papan Dinding / Pigura & Lembar Map",
      description: "Bagan visual alur organisasi yang menggambarkan hierarki Yayasan, Muslimat NU, Kepala TPQ, Ustadz/Ustadzah, hingga Santri & Komite.",
      assessorNotes: "Wajib terpasang rapi di ruang kantor/tamu TPQ dan ada cetakan dokumen di dalam map portofolio.",
      checkpoints: [
        "Papan visual struktur organisasi di dinding kantor",
        "Lembar cetak berwarna di dalam map akreditasi",
        "Memuat foto pengurus & nama lengkap dengan gelar"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },
    {
      id: "DOC-106",
      categoryId: "kelembagaan",
      code: "1.6",
      title: "Buku Tamu Umum & Buku Tamu Pembinaan Khusus",
      importance: "Penting",
      physicalFormat: "Hardcopy (Buku Ekspedisi Cetak Tebal)",
      description: "Buku pencatatan kunjungan tamu umum, kunjungan wali santri, serta catatan khusus pembinaan dari Kemenag, Pengawas, atau Pimpinan Muslimat NU.",
      assessorNotes: "Harus ada tanda tangan kunjungan dari pengawas Kemenag atau tokoh masyarakat yang pernah berkunjung.",
      checkpoints: [
        "Buku tamu berformat: No, Tanggal, Nama, Jabatan/Instansi, Maksud Kunjungan, Kesan/Pesan, Tanda Tangan",
        "Catatan pembinaan asesor/pengawas sebelumnya bila ada"
      ],
      defaultStatus: "ready",
      scoreWeight: 2
    },
    {
      id: "DOC-107",
      categoryId: "kelembagaan",
      code: "1.7",
      title: "Buku Notulensi & Berita Acara Rapat Kerja Pengurus",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Buku/Map Odner 1)",
      description: "Kumpulan notulensi rapat berkala pengurus TPQ, rapat awal tahun ajaran, rapat evaluasi bulanan, lengkap dengan daftar hadir dan foto kegiatan rapat.",
      assessorNotes: "Menunjukkan tata kelola lembaga yang hidup, dinamis, dan terdokumentasi dengan baik.",
      checkpoints: [
        "Undangan rapat dan agenda bahasan",
        "Daftar hadir peserta rapat bertanda tangan",
        "Notulensi keputusan rapat yang jelas",
        "Foto dokumentasi rapat pengurus & ustadzah"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-108",
      categoryId: "kelembagaan",
      code: "1.8",
      title: "Buku Agenda Surat Masuk, Surat Keluar & Buku Ekspedisi",
      importance: "Penting",
      physicalFormat: "Hardcopy (Buku Registrasi Surat)",
      description: "Pencatatan persuratan dinas keluar dan masuk secara tertib dengan sistem nomor surat baku TPQ Muslimat NU AL-IKHLAS.",
      assessorNotes: "Periksa kerapian nomor urut dan arsip fisik salinan surat keluar (undangan, permohonan, surat tugas).",
      checkpoints: [
        "Buku register surat masuk lengkap asal & perihal",
        "Buku register surat keluar dengan penomoran baku",
        "Buku ekspedisi bukti penerimaan surat",
        "Map ordner arsip fisik surat berurutan"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },
    {
      id: "DOC-109",
      categoryId: "kelembagaan",
      code: "1.9",
      title: "Papan Profil Lembaga & Monografi Data TPQ",
      importance: "Penting",
      physicalFormat: "Papan Display Dinding & Berkas Rangkuman",
      description: "Data monografi lembaga yang merangkum jumlah santri (putra/putri), jumlah ustadz/ustadzah, jumlah rombel/jilid, fasilitas, dan jadwal KBM.",
      assessorNotes: "Asesor langsung melihat papan data ini saat pertama kali memasuki ruang kantor.",
      checkpoints: [
        "Papan monografi data santri terbaru",
        "Grafik perkembangan santri 3 tahun terakhir",
        "Data rasio guru dan santri (maks 1:15)",
        "Lembar cetak profil profil ringkas 1 halaman"
      ],
      defaultStatus: "ready",
      scoreWeight: 2
    },

    // 2. KURIKULUM & PEMBELAJARAN
    {
      id: "DOC-201",
      categoryId: "kurikulum",
      code: "2.1",
      title: "Buku Kurikulum Operasional TPQ (Buku KTSP Al-Qur'an)",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Jilid Rapi (Map Odner 2)",
      description: "Dokumen kurikulum resmi TPQ yang memuat landasan hukum, tujuan pendidikan Al-Qur'an, target capaian per level, struktur materi ajar, dan metode evaluasi.",
      assessorNotes: "Harus disahkan oleh Kepala TPQ, Ketua Yayasan AL FATAH, dan diketahui Seksi PD Pontren Kemenag / Pengurus Muslimat NU.",
      checkpoints: [
        "Halaman pengesahan lengkap tanda tangan & stempel",
        "Tujuan dan arah kompetensi kelulusan TPQ",
        "Struktur kurikulum (Al-Qur'an, Hafalan, Doa, Praktek Sholat, Fikih, Dinul Islam)",
        "Alokasi waktu tatap muka per minggu"
      ],
      defaultStatus: "ready",
      scoreWeight: 5
    },
    {
      id: "DOC-202",
      categoryId: "kurikulum",
      code: "2.2",
      title: "Silabus Pembelajaran & Pemetaan Materi per Jilid/Level",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 2)",
      description: "Rincian materi ajar setiap tingkatan/jilid (Jilid 1 s.d 6 atau Al-Qur'an dasar hingga mahir), target hafalan surat pendek, doa harian, materi adab, dan fikih.",
      assessorNotes: "Silabus harus jelas mendefinisikan standar kenaikan jilid dan kriteria ketuntasan minimal (KKM).",
      checkpoints: [
        "Silabus target bacaan metode jilid Al-Qur'an",
        "Silabus hafalan juz 'amma (An-Naas s.d An-Naba')",
        "Silabus doa-doa harian & adab islami",
        "Silabus praktik sholat, wudhu, & thaharah"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-203",
      categoryId: "kurikulum",
      code: "2.3",
      title: "Kalender Pendidikan TPQ (Tahun Ajaran Aktif)",
      importance: "Wajib Mutlak",
      physicalFormat: "Papan Display & Lembar Cetak Map",
      description: "Jadwal kalender akademik tahunan yang memetakan hari efektif belajar, libur puasa/Ramadhan, libur Idul Fitri/Adha, jadwal EBTA/Munaqosyah, serta tanggal Wisuda/Khotmil Qur'an.",
      assessorNotes: "Sinkronkan dengan kalender pendidikan Kemenag kabupaten/kota setempat.",
      checkpoints: [
        "Penetapan semester ganjil dan genap",
        "Jadwal ujian berkala / evaluasi kenaikan jilid",
        "Jadwal munaqosyah & wisuda santri",
        "Agenda PHBI (Peringatan Hari Besar Islam) & Hari Santri"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-204",
      categoryId: "kurikulum",
      code: "2.4",
      title: "Rencana Pelaksanaan Pembelajaran Harian (RPPH) / Guru",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy Arsip Guru (Map Odner 2)",
      description: "Catatan persiapan mengajar harian guru yang memuat indikator pencapaian, langkah kegiatan (Apersepsi/Klasikal, Privat/Sorogan, Baca Simak, Doa Penutup).",
      assessorNotes: "Asesor meninjau apakah guru mengajar dengan rencana terarah atau hanya spontanitas.",
      checkpoints: [
        "Langkah pembelajaran pembuka, inti, penutup",
        "Alokasi waktu per segmen (klasikal, individual/sorogan)",
        "Media & alat peraga yang digunakan",
        "Catatan penilaian langsung harian"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-205",
      categoryId: "kurikulum",
      code: "2.5",
      title: "Jadwal Belajar Harian & Pembagian Rombongan Belajar (Rombel)",
      importance: "Wajib Mutlak",
      physicalFormat: "Papan Dinding & Berkas Cetak",
      description: "Jadwal waktu kegiatan belajar mengajar harian santri (sore/siang), pembagian kelas/jilid, serta penugasan ustadz/ustadzah pengampu.",
      assessorNotes: "Rasio santri per ustadzah idealnya 10-15 anak agar metode sorogan/baca simak berjalan efektif.",
      checkpoints: [
        "Jadwal hari aktif (Senin s.d Sabtu / disesuaikan)",
        "Pembagian shift (contoh: Shift A 15.30-17.00 WIB)",
        "Daftar nama santri per rombel/jilid",
        "Nama ustadz/ustadzah pengampu di setiap rombel"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-206",
      categoryId: "kurikulum",
      code: "2.6",
      title: "Contoh Buku Jilid & Media Alat Peraga Al-Qur'an",
      importance: "Wajib Mutlak",
      physicalFormat: "Buku Fisik & Peraga Peraga Display",
      description: "Spesimen buku pegangan santri dan guru (Buku Jilid An-Nahdliyah/Yanbu'a/Qiraati/Ummi lengkap 1-6), peraga klasikal, maket huruf hijaiyah, dan mushaf Al-Qur'an standar Kemenag.",
      assessorNotes: "Asesor melihat kondisi kelayakan fisik buku panduan dan konsistensi metode yang digunakan di seluruh kelas.",
      checkpoints: [
        "Set lengkap buku paket jilid 1 s.d 6",
        "Alat peraga klasikal gantung/standing banner jilid",
        "Mushaf Al-Qur'an Rasm Usmani standar Kemenag RI",
        "Buku materi hafalan doa & juz 'amma seragam"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-207",
      categoryId: "kurikulum",
      code: "2.7",
      title: "Buku Agenda / Jurnal Harian Mengajar Ustadzah",
      importance: "Penting",
      physicalFormat: "Hardcopy (Buku Jurnal Guru per Kelas)",
      description: "Buku catatan harian pengajar berisi tanggal mengajar, materi/halaman jilid yang diajarkan, jumlah santri hadir, kendala belajar, dan paraf guru.",
      assessorNotes: "Bukti fisik bahwa proses pembelajaran berlangsung konsisten setiap hari aktif.",
      checkpoints: [
        "Pencatatan tanggal dan materi harian",
        "Catatan santri yang memerlukan remidial/bimbingan khusus",
        "Paraf ustadz/ustadzah pengampu",
        "Verifikasi tanda tangan Kepala TPQ setiap akhir pekan/bulan"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },

    // 3. KESISWAAN (SANTRI)
    {
      id: "DOC-301",
      categoryId: "kesiswaan",
      code: "3.1",
      title: "Buku Induk Santri (Format Standar EMIS Kemenag)",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Buku Besar & File Excel EMIS",
      description: "Dokumen master pencatatan seluruh data santri aktif dan alumni: No. Induk, NIK, NISN, Nama Lengkap, TTL, Nama Ayah/Ibu, Pekerjaan Orang Tua, Alamat Lengkap, dan Tanggal Masuk/Keluar.",
      assessorNotes: "Kelengkapan NIK santri dan orang tua sangat dinilai tinggi karena syarat sinkronisasi data EMIS Kemenag.",
      checkpoints: [
        "Buku Induk format cetak resmi terjilid rapi",
        "Kolom NIK santri & No. Kartu Keluarga terisi lengkap",
        "Tercatat tanggal masuk dan riwayat mutasi/lulus",
        "Sinkron dengan data santri di database digital EMIS"
      ],
      defaultStatus: "ready",
      scoreWeight: 5
    },
    {
      id: "DOC-302",
      categoryId: "kesiswaan",
      code: "3.2",
      title: "Buku Presensi / Daftar Hadir Harian & Rekap Bulanan Santri",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Buku Presensi per Jilid/Kelas)",
      description: "Catatan kehadiran harian santri per rombel dengan rekapitulasi persentase kehadiran bulanan (Sakit, Izin, Alpa).",
      assessorNotes: "Asesor memeriksa apakah ada rekap bulanan atau hanya coretan harian saja.",
      checkpoints: [
        "Presensi harian ditandatangani/diceklis ustadzah",
        "Rekap kehadiran santri per bulan terhitung rapi",
        "Tercatat persentase kehadiran santri per rombel",
        "Arsip presensi tersusun per tahun ajaran"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-303",
      categoryId: "kesiswaan",
      code: "3.3",
      title: "Buku Prestasi / Kartu Mutaba'ah Setoran Santri",
      importance: "Wajib Mutlak",
      physicalFormat: "Buku Saku/Kartu Fisik Santri",
      description: "Buku catatan harian capaian santri: halaman jilid yang dibaca, nilai kelancaran (makhorijul huruf & tajwid), setoran hafalan surat/doa, paraf guru, dan paraf orang tua.",
      assessorNotes: "Asesor kerap mengambil sampel 3-5 buku santri secara acak untuk melihat keaktifan setoran.",
      checkpoints: [
        "Kartu setoran memuat kolom tanggal, halaman/ayat, nilai/predikat, paraf guru",
        "Tersedia kolom paraf wali santri sebagai kontrol rumah",
        "Catatan kenaikan halaman/jilid berkesinambungan"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-304",
      categoryId: "kesiswaan",
      code: "3.4",
      title: "Arsip Evaluasi Hasil Belajar & Buku Rapor Santri",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Rapor Santri & Rekap Nilai)",
      description: "Buku Laporan Hasil Belajar Santri (Rapor) berkala/semesteran yang mencakup nilai fashohah, tartil, tajwid, hafalan doa, surat pendek, praktik ibadah, dan akhlak.",
      assessorNotes: "Harus ada arsip fotokopi atau buku leger nilai murni yang disimpan oleh pihak TPQ.",
      checkpoints: [
        "Buku Leger nilai rekapitulasi seluruh santri",
        "Contoh Buku Rapor santri yang sudah terdistribusi & ditandatangani",
        "Kriteria Ketuntasan Minimal (KKM) yang ditetapkan lembaga",
        "Format penilaian holistik (kognitif Al-Qur'an & akhlak amaliyah)"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-305",
      categoryId: "kesiswaan",
      code: "3.5",
      title: "Dokumen Munaqosyah / Evaluasi Tahap Akhir Santri",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Berkas Ujian Akhir)",
      description: "Pedoman munaqosyah kelulusan, SK tim penguji munaqosyah (bisa dari LPPTQ/Pengurus Metode Al-Qur'an Cabang), lembar penilaian, dan daftar kelulusan.",
      assessorNotes: "Munaqosyah eksternal atau terstandar menunjukkan akuntabilitas mutu lulusan TPQ.",
      checkpoints: [
        "SK Panitia & Tim Penguji Munaqosyah",
        "Kriteria kelulusan (standar tajwid, fashohah, hafalan)",
        "Blangko lembar penilaian munaqosyah per santri",
        "Berita Acara hasil sidang kelulusan munaqosyah"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-306",
      categoryId: "kesiswaan",
      code: "3.6",
      title: "Dokumen Kelulusan, Ijazah/Syahadah Wisuda & Buku Ekspedisi Ijazah",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy Salinan Ijazah & Buku Tanda Terima",
      description: "Arsip salinan Ijazah/Syahadah santri yang telah lulus wisuda, piagam penghargaan lulusan terbaik, dan buku bukti tanda terima pengambilan ijazah oleh wali santri.",
      assessorNotes: "Penomoran ijazah harus terdata rapi agar tidak terjadi duplikasi atau kekeliruan nomor seri.",
      checkpoints: [
        "Buku nomor seri ijazah/syahadah yang dikeluarkan",
        "Salinan legalisir contoh ijazah santri",
        "Buku tanda terima ijazah bertanda tangan wali santri",
        "Dokumentasi pelaksanaan wisuda/khotmil Qur'an"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-307",
      categoryId: "kesiswaan",
      code: "3.7",
      title: "Formulir Pendaftaran Santri Baru & Berkas Persyaratan",
      importance: "Penting",
      physicalFormat: "Hardcopy (Map Arsip PSB Santri)",
      description: "Blangko pendaftaran santri baru, surat pernyataan wali santri, fotokopi Kartu Keluarga (KK), fotokopi Akta Kelahiran, dan pas foto santri.",
      assessorNotes: "Pastikan berkas KK dan Akta tersimpan rapi per angkatan untuk verifikasi identitas resmi santri.",
      checkpoints: [
        "Formulir biodata santri baru",
        "Surat kesediaan mematuhi tata tertib TPQ",
        "Lampiran fotokopi KK dan Akta Kelahiran",
        "Surat pernyataan kesediaan infaq/SPP"
      ],
      defaultStatus: "ready",
      scoreWeight: 2
    },
    {
      id: "DOC-308",
      categoryId: "kesiswaan",
      code: "3.8",
      title: "Buku Pelacakan Lulusan (Tracer Study Santri)",
      importance: "Nilai Tambah Plus",
      physicalFormat: "Hardcopy & Lembar Rekap",
      description: "Catatan alumni santri TPQ yang melanjutkan studi Al-Qur'an ke jenjang Madrasah Diniyah (Madin), Pondok Pesantren, MTs/SMP, atau Rumah Tahfidz.",
      assessorNotes: "Memberikan poin penilaian sangat tinggi pada Standar Dampak Lulusan bagi masyarakat sekitar.",
      checkpoints: [
        "Data alumni 2–3 tahun terakhir",
        "Daftar lembaga pendidikan lanjutan yang dimasuki santri",
        "Testimoni atau keterlibatan alumni dalam kegiatan TPQ"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },

    // 4. KETENAGAKERJAAN (USTADZ / USTADZAH)
    {
      id: "DOC-401",
      categoryId: "ketenagakerjaan",
      code: "4.1",
      title: "Buku Induk Ustadz/Ustadzah & Tenaga Kependidikan",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 3) & File Excel",
      description: "Data identitas lengkap seluruh tenaga pendidik: Nama Lengkap, NIK, Tempat/Tgl Lahir, Pendidikan Terakhir, Alamat, Nomor Kontak, Mulai Bertugas, dan Riwayat Tugas.",
      assessorNotes: "Harus dilengkapi dengan pas foto terbaru ustadz/ustadzah pada profil biodata.",
      checkpoints: [
        "Biodata lengkap seluruh ustadz dan ustadzah",
        "Salinan KTP, KK, dan Ijazah pendidikan formal terakhir (SMA/MA/S1)",
        "Riwayat pendidikan pesantren / lembaga Al-Qur'an",
        "Pencatatan tanggal mulai mengabdi di TPQ"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-402",
      categoryId: "ketenagakerjaan",
      code: "4.2",
      title: "Sertifikat Syahadah Kelayakan Mengajar Metode Al-Qur'an",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Salinan Bersertifikat (Map Odner 3)",
      description: "Syahadah atau Ijazah kelayakan mengajar dari koordinator pengembang metode (An-Nahdliyah, Yanbu'a, Qiraati, Ummi) atau sertifikat TOT Guru Al-Qur'an dari Muslimat NU.",
      assessorNotes: "Ini adalah syarat utama kompetensi guru TPQ. Minimal 70% pengajar wajib memiliki syahadah resmi.",
      checkpoints: [
        "Fotokopi syahadah metode Al-Qur'an seluruh pengajar",
        "Nama yang tertera sesuai dengan KTP guru",
        "Dikeluarkan oleh lembaga otoritas metode resmi yang berwenang",
        "Tersedia data tingkat kelulusan/grade syahadah"
      ],
      defaultStatus: "ready",
      scoreWeight: 5
    },
    {
      id: "DOC-403",
      categoryId: "ketenagakerjaan",
      code: "4.3",
      title: "SK Pengangkatan Ustadz/Ustadzah dari Yayasan & Kepala TPQ",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Map Odner 3)",
      description: "Surat Keputusan resmi pengangkatan sebagai guru tetap/guru bantu TPQ Muslimat NU AL-IKHLAS yang diterbitkan oleh Ketua Yayasan AL FATAH atau Kepala TPQ.",
      assessorNotes: "SK harus memuat hak, kewajiban, masa tugas, dan ditandatangani oleh pejabat yang sah.",
      checkpoints: [
        "SK pengangkatan perorangan atau kolektif yang masih berlaku",
        "Pernyataan kesanggupan berkhidmah mengajar Al-Qur'an",
        "Uraian tugas pokok dan fungsi (Tupoksi) mengajar",
        "Tertanda tangan pimpinan yayasan & stempel basah"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-404",
      categoryId: "ketenagakerjaan",
      code: "4.4",
      title: "Buku Presensi / Daftar Hadir & Rekap Keaktifan Guru",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy (Buku Presensi Guru)",
      description: "Pencatatan absensi kehadiran guru setiap hari KBM, lengkap dengan tanda tangan, jam datang, jam pulang, dan rekapitulasi kehadiran per bulan.",
      assessorNotes: "Sinkron dengan pencatatan honorarium/insentif yang dikeluarkan bendahara.",
      checkpoints: [
        "Presensi harian bertanda tangan asli ustadz/ustadzah",
        "Rekapitulasi jam tatap muka dan kehadiran bulanan",
        "Keterangan izin/sakit yang disertai surat keterangan",
        "Mengetahui Kepala TPQ Muslimat NU AL-IKHLAS"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-405",
      categoryId: "ketenagakerjaan",
      code: "4.5",
      title: "Sertifikat Pelatihan, Diklat, Workshop & Pembinaan Guru",
      importance: "Penting",
      physicalFormat: "Hardcopy (Map Portofolio Guru)",
      description: "Kumpulan sertifikat keikutsertaan ustadz/ustadzah dalam pelatihan metodologi Al-Qur'an, bimbingan teknis Kemenag, pembinaan Pimpinan Muslimat NU, atau seminar parenting.",
      assessorNotes: "Menunjukkan adanya upaya peningkatan profesionalisme berkelanjutan (PKB) guru TPQ.",
      checkpoints: [
        "Sertifikat workshop/diklat dalam 3 tahun terakhir",
        "Sertifikat seminar ke-NU-an / metodologi pengajaran",
        "Surat tugas dari lembaga untuk mengikuti pelatihan"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-406",
      categoryId: "ketenagakerjaan",
      code: "4.6",
      title: "Buku Supervisi Pembelajaran & Penilaian Kinerja Guru (PKG)",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Evaluasi Pengajaran)",
      description: "Instrumen penilaian dan catatan supervisi kelas yang dilakukan oleh Kepala TPQ terhadap cara mengajar ustadz/ustadzah (fasohah, manajemen kelas, pendekatan kasih sayang).",
      assessorNotes: "Asesor mencari bukti apakah Kepala TPQ pernah melakukan supervisi langsung di ruang kelas.",
      checkpoints: [
        "Jadwal pelaksanaan supervisi per semester",
        "Instrumen lembar penilaian performa mengajar guru",
        "Catatan saran perbaikan dan tindak lanjut dari Kepala TPQ",
        "Tanda tangan bersama guru yang disupervisi dan Kepala TPQ"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },

    // 5. SARANA, PRASARANA, & KEUANGAN
    {
      id: "DOC-501",
      categoryId: "sarpras_keuangan",
      code: "5.1",
      title: "Buku Inventaris Barang & Aset Sarana Prasarana",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Buku Besar Inventaris",
      description: "Pencatatan seluruh aset sarana: kode barang, nama barang (meja lipat/rekal, papan tulis, karpet sajadah, lemari buku, sound system, kipas angin), jumlah, sumber perolehan, dan kondisi fisik (Baik/Rusak).",
      assessorNotes: "Barang-barang di kelas harus diberi label kode inventaris sesuai nomor di buku inventaris.",
      checkpoints: [
        "Format kolom: No, Kode, Nama Barang, Merk/Tipe, Jumlah, Tahun, Asal, Kondisi",
        "Stiker kode inventaris pada fisik perabot/meja",
        "Pencatatan aset milik Yayasan AL FATAH dan wakaf masyarakat",
        "Rekap tahunan kondisi sarana dan rencana peremajaan"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-502",
      categoryId: "sarpras_keuangan",
      code: "5.2",
      title: "Buku Kas Umum (BKU), Buku Kas Pembantu & Laporan Bulanan",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Terjilid Rapi & Bukti Nota",
      description: "Pembukuan keuangan lembaga yang mencatat seluruh penerimaan (infaq/SPP, donasi, bantuan operasional) dan pengeluaran (bisaroh/insentif guru, ATK, kebersihan, listrik).",
      assessorNotes: "Wajib dilengkapi bukti nota, kuitansi, atau struk belanja yang ditempel rapi dan diberi nomor bukti transaksi.",
      checkpoints: [
        "Buku Kas Umum (BKU) dengan saldo penutupan bulanan",
        "Buku Kas Pembantu Kas dan Bank (jika ada rekening resmi)",
        "Buku rekapitulasi pembayaran infaq bulanan/SPP santri",
        "Bundel kuitansi/nota belanja bertanggal dan bernomor"
      ],
      defaultStatus: "ready",
      scoreWeight: 5
    },
    {
      id: "DOC-503",
      categoryId: "sarpras_keuangan",
      code: "5.3",
      title: "Rencana Anggaran Pendapatan & Belanja TPQ (RAPB-TPQ)",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Keuangan Lembaga)",
      description: "Dokumen estimasi penerimaan dan alokasi pembiayaan operasional TPQ selama satu tahun ajaran yang disetujui bersama oleh Yayasan AL FATAH dan Komite TPQ.",
      assessorNotes: "Membuktikan transparansi dan perencanaan keuangan yang akuntabel.",
      checkpoints: [
        "Rincian target penerimaan tahun berjalan",
        "Rincian alokasi biaya operasional, gaji guru, dan pengembangan",
        "Lembar pengesahan Kepala TPQ dan Pimpinan Yayasan AL FATAH"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-504",
      categoryId: "sarpras_keuangan",
      code: "5.4",
      title: "Bukti Legalitas Kepemilikan Lahan / Gedung (Wakaf/Hibah/Pinjam Pakai)",
      importance: "Wajib Mutlak",
      physicalFormat: "Hardcopy Salinan Legalisir (Map Odner 4)",
      description: "Salinan Akta Ikrar Wakaf (AIW), Sertifikat Hak Milik Yayasan AL FATAH, atau Surat Perjanjian Pinjam Pakai Gedung yang sah dari takmir masjid/yayasan.",
      assessorNotes: "Menjamin keberlangsungan proses belajar mengajar santri tanpa ancaman sengketa tempat di masa mendatang.",
      checkpoints: [
        "Salinan Akta Ikrar Wakaf (AIW) / Sertifikat Tanah Wakaf",
        "Surat Perjanjian Pinjam Pakai Tempat (bila menumpang masjid/madrasah)",
        "Denah tata ruang dan luas bangunan lembaga"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-505",
      categoryId: "sarpras_keuangan",
      code: "5.5",
      title: "Dokumentasi & Bukti Fisik Ruang Belajar yang Memadai",
      importance: "Wajib Mutlak",
      physicalFormat: "Foto Berwarna & Inspeksi Lapangan Langsung",
      description: "Ruang kelas yang bersih, pencahayaan terang, sirkulasi udara baik, karpet bersih, rekal/meja tertata rapi, dan display pajangan karya santri di dinding.",
      assessorNotes: "Asesor melakukan observasi fisik langsung ke ruang belajar santri saat jam aktif belajar.",
      checkpoints: [
        "Ruang belajar bebas debu, nyaman dan kondusif",
        "Ketersediaan rekal / meja lipat yang cukup bagi santri",
        "Pencahayaan alami & lampu yang terang",
        "Ventilasi jendela / kipas angin yang memadai"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-506",
      categoryId: "sarpras_keuangan",
      code: "5.6",
      title: "Bukti Fisik Tempat Wudhu, Toilet Santri & Kebersihan Air",
      importance: "Wajib Mutlak",
      physicalFormat: "Foto Berwarna & Inspeksi Lapangan Langsung",
      description: "Fasilitas tempat wudhu yang mengalir lancar, bersih, aman untuk anak-anak, pemisahan area wudhu/toilet putra dan putri, serta ketersediaan sabun.",
      assessorNotes: "Asesor memeriksa sanitasi, tidak boleh ada lumut licin, genangan air kotor, atau bau tidak sedap.",
      checkpoints: [
        "Kran air wudhu lancar dan air suci mensucikan",
        "Toilet santri bersih, memiliki gayung, ember, dan pintu terkunci baik",
        "Lantai tidak licin demi keselamatan santri anak-anak",
        "Disediakan sabun cuci tangan dan tempat sampah"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-507",
      categoryId: "sarpras_keuangan",
      code: "5.7",
      title: "Papan Nama Resmi TPQ Terpampang Jelas di Depan Bangunan",
      importance: "Wajib Mutlak",
      physicalFormat: "Plang Fisik & Foto Cetak Berwarna",
      description: "Papan nama permanen yang memuat: Logo Muslimat NU, Nama 'TPQ MUSLIMAT NU AL-IKHLAS', Nama 'YAYASAN AL FATAH', Nomor Statistik TPQ (NSQ), dan Alamat Lengkap.",
      assessorNotes: "Plang nama harus kokoh, mudah terbaca dari jalan utama, dan memiliki identitas organisasi yang jelas.",
      checkpoints: [
        "Papan nama terpampang di muka gedung/pagar depan",
        "Memuat Logo Muslimat NU dan identitas Yayasan AL FATAH",
        "Mencantumkan Nomor Statistik TPQ resmi dari Kemenag",
        "Ukuran standar dan kondisi cat bersih tidak kusam"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-508",
      categoryId: "sarpras_keuangan",
      code: "5.8",
      title: "Kelengkapan K3, Kotak P3K, dan Pengelolaan Sampah",
      importance: "Penting",
      physicalFormat: "Fasilitas Fisik Terpasang",
      description: "Ketersediaan kotak Pertolongan Pertama Pada Kecelakaan (P3K) lengkap dengan obat standar anak, tempat sampah tertutup, dan petunjuk evakuasi darurat sederhana.",
      assessorNotes: "Menunjukkan kepedulian lembaga terhadap keselamatan dan kesehatan santri saat beraktivitas.",
      checkpoints: [
        "Kotak P3K terisi obat antiseptik, perban, minyak angin, plester",
        "Daftar cek masa kedaluwarsa isi kotak P3K",
        "Tempat sampah di setiap ruangan dan area luar",
        "Nomor kontak darurat (Puskesmas/Bidan desa) terpajang"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },

    // 6. KEKHASAN KE-NU-AN & ASWAJA
    {
      id: "DOC-601",
      categoryId: "kekhasan_nu",
      code: "6.1",
      title: "Silabus & Materi Muatan Lokal Ke-NU-an & Aswaja",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Odner Khusus NU)",
      description: "Panduan kurikulum muatan lokal tentang dasar-dasar paham Ahlussunnah wal Jama'ah An-Nahdliyah, pengenalan tokoh pendiri NU (KH. Hasyim Asy'ari), dan adab santri.",
      assessorNotes: "Ciri khas pembeda utama lembaga binaan Muslimat NU dibanding lembaga Al-Qur'an umum lainnya.",
      checkpoints: [
        "Modul materi ke-NU-an untuk usia anak-anak",
        "Materi pengenalan lambang NU (Bintang 9, Tali Jagad)",
        "Penanaman rasa cinta tanah air (Hubbul Wathan minal Iman)",
        "Jadwal pengajaran muatan lokal mingguan"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-602",
      categoryId: "kekhasan_nu",
      code: "6.2",
      title: "Panduan Amaliyah Sholat Tradisi NU & Hafalan Doa Qunut",
      importance: "Wajib Mutlak",
      physicalFormat: "Buku Saku Panduan & Kartu Setoran",
      description: "Buku tuntunan praktik sholat fardhu dan sholat sunnah (Dhuha) sesuai madzhab Syafi'i, bacaan qunut subuh, bacaan dzikir ba'da sholat, dan doa bersama.",
      assessorNotes: "Asesor sering meminta santri mendemonstrasikan bacaan doa qunut dan wirid singkat ba'da sholat.",
      checkpoints: [
        "Target hafalan doa qunut shubuh seluruh santri",
        "Panduan wirid dan dzikir ba'da sholat maktubah",
        "Kartu penilaian praktik sholat berjamaah santri"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-603",
      categoryId: "kekhasan_nu",
      code: "6.3",
      title: "Buku Kumpulan Sholawat & Dzikir Rutin An-Nahdliyah",
      importance: "Penting",
      physicalFormat: "Buku Kumpulan Sholawat Santri",
      description: "Himpunan teks sholawat yang dibaca rutin sebelum dan sesudah KBM: Sholawat Nariyah, Sholawat Tibbil Qulub, Sholawat Nahdliyyah, Sholawat Asyghil, dan Nadhom Asmaul Husna.",
      assessorNotes: "Membuktikan pembiasaan tradisi bersholawat sejak usia dini.",
      checkpoints: [
        "Buku pegangan sholawat santri seragam",
        "Pembiasaan pembacaan sebelum bel masuk kelas",
        "Dokumentasi rekaman audio/video pembiasaan santri"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-604",
      categoryId: "kekhasan_nu",
      code: "6.4",
      title: "Dokumentasi Peringatan Hari Santri Nasional & PHBI",
      importance: "Sangat Penting",
      physicalFormat: "Album Foto Portofolio Berwarna",
      description: "Laporan kegiatan dan foto peringatan Hari Santri Nasional (22 Oktober), Maulid Nabi Muhammad SAW, Isra' Mi'raj, Tahun Baru Hijriyah, dan Nuzulul Qur'an.",
      assessorNotes: "Lengkap dengan susunan acara, undangan kepada wali santri, dan foto kegiatan.",
      checkpoints: [
        "Laporan kegiatan Hari Santri Nasional (HSN)",
        "Dokumentasi peringatan Maulid Nabi / Khotmil Qur'an",
        "Daftar hadir wali santri dan tokoh masyarakat",
        "Kliping foto dokumentasi beresolusi jelas"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },

    // 7. SOP, TATA KELOLA & MUTU LEMBAGA
    {
      id: "DOC-701",
      categoryId: "sop_tata_kelola",
      code: "7.1",
      title: "Dokumen Rumusan Visi, Misi, Tujuan & Profil TPQ",
      importance: "Wajib Mutlak",
      physicalFormat: "Pigura Dinding & Buku Profil Lengkap",
      description: "Rumusan tertulis Visi, Misi, dan Tujuan TPQ Muslimat NU AL-IKHLAS yang selaras dengan nilai Islam Ahlussunnah wal Jama'ah dan cita-cita pendidikan Yayasan AL FATAH.",
      assessorNotes: "Visi misi harus dipahami oleh seluruh ustadz/ustadzah saat ditanya oleh asesor akreditasi.",
      checkpoints: [
        "Visi terukur dan bernafaskan Al-Qur'an & ke-NU-an",
        "Misi memuat langkah strategis pembelajaran & akhlak",
        "Tujuan lulusan yang jelas dan terarah",
        "Terpajang di dinding ruang utama & tercantum di buku kurikulum"
      ],
      defaultStatus: "ready",
      scoreWeight: 4
    },
    {
      id: "DOC-702",
      categoryId: "sop_tata_kelola",
      code: "7.2",
      title: "Standar Operasional Prosedur (SOP) Pembelajaran & KBM",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Pedoman Operasional)",
      description: "Pedoman baku langkah-langkah pelaksanaan KBM harian: SOP pembukaan kelas, SOP membaca jilid privat, SOP klasikal peraga, hingga SOP penutupan dan doa.",
      assessorNotes: "Memastikan proses mengajar memiliki standar baku meskipun ustadzah berhalangan dan digantikan guru pengganti.",
      checkpoints: [
        "SOP pembukaan dan pembacaan sholawat pembuka",
        "SOP waktu sorogan Al-Qur'an (maksimal per santri)",
        "SOP pergantian materi hafalan dan doa",
        "SOP penutupan dan tertib pulang santri"
      ],
      defaultStatus: "process",
      scoreWeight: 3
    },
    {
      id: "DOC-703",
      categoryId: "sop_tata_kelola",
      code: "7.3",
      title: "SOP Penerimaan Santri Baru (PSB) & Penempatan Level",
      importance: "Penting",
      physicalFormat: "Hardcopy (Map Pedoman PSB)",
      description: "Prosedur pendaftaran santri baru, alur seleksi penempatan jilid (placement test), verifikasi berkas administrasi, dan orientasi santri & wali santri.",
      assessorNotes: "Menjamin penempatan santri sesuai dengan kemampuan membaca Al-Qur'an yang sebenarnya.",
      checkpoints: [
        "Alur bagan pendaftaran santri baru",
        "Instrumen tes penempatan jilid awal (placement test)",
        "Prosedur pembayaran infaq pendaftaran & seragam",
        "Masa ta'aruf santri baru (orientasi adab)"
      ],
      defaultStatus: "ready",
      scoreWeight: 2
    },
    {
      id: "DOC-704",
      categoryId: "sop_tata_kelola",
      code: "7.4",
      title: "Tata Tertib Santri, Tata Tertib Wali, dan Kode Etik Pengajar",
      importance: "Wajib Mutlak",
      physicalFormat: "Papan Dinding & Surat Edaran Tercetak",
      description: "Aturan kedisiplinan pakaian/busana muslim, waktu kedatangan, larangan membawa gawai berlebih, kewajiban adab santri, serta etika ustadzah dalam mendidik.",
      assessorNotes: "Asesor meninjau apakah aturan disosialisasikan secara resmi kepada wali santri saat awal masuk.",
      checkpoints: [
        "Tata tertib kehadiran dan seragam santri",
        "Tata tertib wali santri saat mengantar/menjemput",
        "Kode etik guru Al-Qur'an (ikhlash, sabar, uswah hasanah)",
        "Tanda terima pembagian tata tertib kepada wali santri"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-705",
      categoryId: "sop_tata_kelola",
      code: "7.5",
      title: "Buku Layanan Pengaduan, Kotak Saran & Survei Kepuasan",
      importance: "Penting",
      physicalFormat: "Kotak Fisik & Buku Registrasi Aspirasi",
      description: "Saluran penyampaian masukan/saran dari wali santri dan masyarakat, rekapitulasi masukan yang masuk, dan catatan tindak lanjut penyelesaian oleh pengurus.",
      assessorNotes: "Menjadi bukti adanya penjaminan mutu dan keterbukaan lembaga terhadap perbaikan berkelanjutan.",
      checkpoints: [
        "Kotak saran fisik di area depan lembaga",
        "Buku register rekap saran wali santri",
        "Catatan risalah musyawarah tindak lanjut masukan",
        "Lembar kuesioner evaluasi kepuasan layanan per semester"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },

    // 8. KOMITE WALI SANTRI, PRESTASI & KEMITRAAN
    {
      id: "DOC-801",
      categoryId: "humas_kemitraan",
      code: "8.1",
      title: "SK Susunan Pengurus Komite / Paguyuban Wali Santri",
      importance: "Sangat Penting",
      physicalFormat: "Hardcopy (Map Odner 5)",
      description: "Surat Keputusan pengesahan pengurus komite/paguyuban wali santri TPQ Muslimat NU AL-IKHLAS sebagai mitra strategis kemajuan lembaga.",
      assessorNotes: "Asesor mewawancarai perwakilan komite saat visitasi untuk mengonfirmasi keaktifan hubungan sekolah dan wali.",
      checkpoints: [
        "SK pembentukan komite wali santri",
        "Struktur ketua, sekretaris, bendahara, seksi kegiatan",
        "Program kerja komite dalam mendukung sarana TPQ"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-802",
      categoryId: "humas_kemitraan",
      code: "8.2",
      title: "Notulensi & Dokumentasi Pertemuan Parenting / Wali Santri",
      importance: "Penting",
      physicalFormat: "Hardcopy & Foto Berwarna",
      description: "Catatan pelaksanaan musyawarah wali santri rutin, pengajian parenting islami, dan rapat laporan pertanggungjawaban program tahunan TPQ.",
      assessorNotes: "Melampirkan daftar hadir seluruh wali santri yang datang.",
      checkpoints: [
        "Daftar hadir pertemuan wali santri bertanda tangan",
        "Notulensi keputusan musyawarah bersama wali santri",
        "Foto dokumentasi acara pertemuan / parenting",
        "Materi presentasi atau edaran untuk wali santri"
      ],
      defaultStatus: "process",
      scoreWeight: 2
    },
    {
      id: "DOC-803",
      categoryId: "humas_kemitraan",
      code: "8.3",
      title: "Portofolio Prestasi Santri & Ustadzah (Piala/Piagam Lomba)",
      importance: "Sangat Penting",
      physicalFormat: "Piagam Asli/Fotokopi & Lemari Tropi",
      description: "Kumpulan arsip piagam penghargaan lomba: Festival Anak Sholeh Indonesia (FASI), Musabaqah Tilawatil Qur'an (MTQ), Musabaqah Hifdzil Qur'an (MHQ), Porseni Santri, dll.",
      assessorNotes: "Piala ditata di etalase piala kantor dan piagam dilaminasi rapi di dalam map sertifikat prestasi.",
      checkpoints: [
        "Piagam penghargaan tingkat desa/kecamatan/kabupaten",
        "Foto penyerahan piala dan sertifikat santri berprestasi",
        "Surat tugas keikutsertaan delegasi santri dalam lomba",
        "Buku register catatan prestasi santri & ustadzah"
      ],
      defaultStatus: "ready",
      scoreWeight: 3
    },
    {
      id: "DOC-804",
      categoryId: "humas_kemitraan",
      code: "8.4",
      title: "Dokumentasi Kegiatan Sosial, Pawai Ta'aruf & Safari Ramadhan",
      importance: "Penting",
      physicalFormat: "Album Foto Portofolio Berwarna",
      description: "Dokumentasi keterlibatan TPQ dalam kemasyarakatan: Pawai ta'aruf menyambut Ramadhan/Muharram, santunan anak yatim, bagi-bagi takjil, dan tadarus keliling.",
      assessorNotes: "Menunjukkan eksistensi dan kontribusi nyata lembaga bagi syiar Islam di lingkungan sekitar.",
      checkpoints: [
        "Foto pawai santri dan spanduk semarak hari besar",
        "Kegiatan bakti sosial santri & Muslimat NU",
        "Dokumentasi publikasi / media sosial resmi lembaga"
      ],
      defaultStatus: "ready",
      scoreWeight: 2
    }
  ],

  // 8 Standar Nasional Pendidikan Pemetaan
  standards8SNP: [
    { id: "snp-1", code: "Standar 1", name: "Standar Kompetensi Lulusan (SKL)", count: 4, docs: ["DOC-201", "DOC-304", "DOC-305", "DOC-306"] },
    { id: "snp-2", code: "Standar 2", name: "Standar Isi (Kurikulum & Silabus)", count: 5, docs: ["DOC-201", "DOC-202", "DOC-206", "DOC-601", "DOC-603"] },
    { id: "snp-3", code: "Standar 3", name: "Standar Proses (KBM & Rencana Ajar)", count: 5, docs: ["DOC-203", "DOC-204", "DOC-205", "DOC-207", "DOC-702"] },
    { id: "snp-4", code: "Standar 4", name: "Standar Pendidik & Tenaga Kependidikan", count: 6, docs: ["DOC-401", "DOC-402", "DOC-403", "DOC-404", "DOC-405", "DOC-406"] },
    { id: "snp-5", code: "Standar 5", name: "Standar Sarana & Prasarana", count: 6, docs: ["DOC-501", "DOC-504", "DOC-505", "DOC-506", "DOC-507", "DOC-508"] },
    { id: "snp-6", code: "Standar 6", name: "Standar Pengelolaan & Kelembagaan", count: 8, docs: ["DOC-101", "DOC-102", "DOC-103", "DOC-104", "DOC-105", "DOC-106", "DOC-107", "DOC-701"] },
    { id: "snp-7", code: "Standar 7", name: "Standar Pembiayaan (Keuangan)", count: 3, docs: ["DOC-502", "DOC-503", "DOC-307"] },
    { id: "snp-8", code: "Standar 8", name: "Standar Penilaian Pendidikan Al-Qur'an", count: 5, docs: ["DOC-302", "DOC-303", "DOC-304", "DOC-305", "DOC-602"] }
  ],

  // Rekomendasi Odner Box File untuk Visitasi Asesor
  odnerBoxes: [
    {
      boxNumber: "BOX-01",
      title: "ODNER 1 : LEGALITAS & KELEMBAGAAN",
      colorTag: "bg-emerald-600",
      colorBorder: "border-emerald-600",
      badgeText: "Warna Map Hijau Tua",
      contents: [
        "Salinan IJOP & Piagam Nomor Statistik TPQ (NSQ)",
        "Akta Notaris & SK Kemenkumham Yayasan AL FATAH",
        "SK Rekomendasi Pimpinan Muslimat NU",
        "SK Susunan Pengurus TPQ Muslimat NU AL-IKHLAS",
        "Bagan Struktur Organisasi & Monografi Lembaga",
        "Notulensi Rapat & Buku Ekspedisi Persuratan"
      ]
    },
    {
      boxNumber: "BOX-02",
      title: "ODNER 2 : KURIKULUM & PROSES PEMBELAJARAN",
      colorTag: "bg-blue-600",
      colorBorder: "border-blue-600",
      badgeText: "Warna Map Biru",
      contents: [
        "Buku Kurikulum Operasional TPQ (KTSP)",
        "Silabus Pembelajaran per Jilid & Target Hafalan",
        "Kalender Pendidikan TPQ & Jadwal Waktu Belajar",
        "Rencana Pelaksanaan Pembelajaran Harian (RPPH)",
        "Contoh Buku Paket Metode Al-Qur'an & Media Peraga",
        "Jurnal Agenda Harian Mengajar Ustadzah"
      ]
    },
    {
      boxNumber: "BOX-03",
      title: "ODNER 3 : ADMINISTRASI KESISWAAN (SANTRI)",
      colorTag: "bg-amber-600",
      colorBorder: "border-amber-600",
      badgeText: "Warna Map Kuning/Kuning Emas",
      contents: [
        "Buku Induk Santri (Format EMIS Kemenag lengkap)",
        "Buku Presensi Harian & Rekapitulasi Bulanan",
        "Sampel Buku Prestasi / Kartu Mutaba'ah Setoran",
        "Arsip Leger Nilai & Buku Rapor Santri",
        "Dokumen EBTA / Munaqosyah Kelulusan",
        "Buku Registrasi Tanda Terima Ijazah & Tracer Alumni"
      ]
    },
    {
      boxNumber: "BOX-04",
      title: "ODNER 4 : PENDIDIK & TENAGA KEPENDIDIKAN",
      colorTag: "bg-purple-600",
      colorBorder: "border-purple-600",
      badgeText: "Warna Map Ungu",
      contents: [
        "Buku Induk Ustadz/Ustadzah & Salinan Ijazah Terakhir",
        "Sertifikat Syahadah Pengajar Metode Al-Qur'an yang Sah",
        "SK Pengangkatan Ustadzah dari Yayasan AL FATAH",
        "Presensi Kehadiran & Rekap Keaktifan Ustadzah",
        "Sertifikat Diklat/Workshop Metodologi Pengajaran",
        "Lembar Supervisi Kelas & Evaluasi Kinerja Guru"
      ]
    },
    {
      boxNumber: "BOX-05",
      title: "ODNER 5 : SARPRAS, KEUANGAN & ASWAJA NU",
      colorTag: "bg-rose-600",
      colorBorder: "border-rose-600",
      badgeText: "Warna Map Merah / Hijau Muda",
      contents: [
        "Buku Inventaris Barang & Bukti Hak Guna Lahan/Wakaf",
        "Buku Kas Umum (BKU), Nota Kuitansi & RAPB-TPQ",
        "Foto Dokumentasi Fasilitas Fisik, Wudhu, Toilet, Plang",
        "Dokumen Kekhasan Ke-NU-an, Sholawat & Doa Qunut",
        "SOP Pembelajaran, Tata Tertib & Buku Pengaduan",
        "SK Komite Wali Santri & Album Prestasi Lomba/PHBI"
      ]
    },
    {
      boxNumber: "BOX-06",
      title: "ODNER 6 : TATA TERTIB, SOP & PROKER TAHUNAN",
      colorTag: "bg-teal-700",
      colorBorder: "border-teal-700",
      badgeText: "Warna Map Hijau Toska / Emerald",
      contents: [
        "Tata Tertib Pendidik & Tenaga Kependidikan (Ustadz/ah)",
        "Tata Tertib Peserta Didik (Santri) TPQ Muslimat NU",
        "Tata Tertib & Hak-Kewajiban Orang Tua / Wali Santri",
        "Surat Pernyataan / Pakta Integritas Wali Santri",
        "Matriks Program Kerja Tahunan TPQ (12 Bulan Lengkap)",
        "Buku Register Surat Masuk & Keluar serta Buku Tamu Supervisi"
      ]
    }
  ]
};
