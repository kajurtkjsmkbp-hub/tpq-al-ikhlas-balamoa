# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 2 : KURIKULUM & PEMBELAJARAN - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#1d4ed8", "ODNER 2")}

  <!-- DOKUMEN 2.1: LEMBAR VERIFIKASI ASESOR & DAFTAR ISI ODNER 2 -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>LEMBAR VERIFIKASI ASESOR & DAFTAR BUKTI FISIK</h3>
      <p>ODNER 2 : STANDAR ISI, PROSES & KURIKULUM PEMBELAJARAN</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 130px; font-weight: bold;">Satuan Pendidikan</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #1e3a8a;">TPQ MUSLIMAT NU AL-IKHLAS</td><td style="width: 110px; font-weight: bold;">Metode Pengajaran</td><td style="width: 10px;">:</td><td>An-Nahdliyah / Yanbu'a</td></tr>
        <tr><td style="font-weight: bold;">Sistem Belajar</td><td>:</td><td>CBSA & Sorogan Tartil Berjenjang</td><td style="font-weight: bold;">Alokasi Pertemuan</td><td>:</td><td>90 Menit / Hari (Senin - Jum'at)</td></tr>
      </table>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 75px;">Kode Bukti</th>
          <th>Nama Dokumen Bukti Fisik Kurikulum</th>
          <th style="width: 110px;">Bentuk Fisik</th>
          <th style="width: 75px;">Verifikasi Asesor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.01</td>
          <td><strong>Buku Kurikulum Tingkat Satuan Pendidikan (KTSP) TPQ</strong></td>
          <td>Buku Jilid Dokumen</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.02</td>
          <td><strong>Silabus Pembelajaran Tartil Jilid 1 s.d 6 & Al-Qur'an Tajwid</strong></td>
          <td>Matriks Capaian Belajar</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.03</td>
          <td><strong>Kalender Pendidikan TPQ Tahun Ajaran 2026/2027 (12 Bulan)</strong></td>
          <td>Lembar Kalender Resmi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.04</td>
          <td><strong>Jadwal KBM Harian, Waktu Efektif & Pembagian Rombel Kelas</strong></td>
          <td>Tabel Jadwal Mengajar</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.05</td>
          <td><strong>SOP KBM 90 Menit & Rencana Pelaksanaan Pembelajaran Harian (RPPH)</strong></td>
          <td>SOP & Pemetaan RPP</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td style="font-family: monospace; text-align: center;">DOC.2.06</td>
          <td><strong>Daftar Inventaris Buku Pegangan, Media Peraga & Al-Qur'an Standar</strong></td>
          <td>Sampel Fisik Kitab</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
      </tbody>
    </table>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px; margin-top: 10px; font-size: 8.5pt;">
      <strong>Catatan Rekomendasi Tim Asesor Akreditasi:</strong><br>
      <em>"Kurikulum pembelajaran terstruktur rapi dengan target hafalan realistis, perpaduan metode cepat tanggap An-Nahdliyah dan penguatan tajwid Jazariyyah telah memenuhi standar mutu LPTQ/Kemenag."</em>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Koord. Kurikulum & Pengajaran", INST["curriculumHead"])}
  </div>

  <!-- DOKUMEN 2.2: SILABUS PEMBELAJARAN JILID 1-6 & AL-QUR'AN -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SILABUS PEMBELAJARAN TARTIL AL-QUR'AN BERJENJANG</h3>
      <p>METODE AN-NAHDLIYAH / YANBU'A • TAHUN AJARAN 2026/2027</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 60px;">Tingkat</th>
          <th style="width: 140px;">Pokok Bahasan / Materi Utama</th>
          <th>Standar Kompetensi & Target Capaian Santri</th>
          <th style="width: 110px;">Target Hafalan</th>
          <th style="width: 65px;">Alokasi Waktu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 1</td>
          <td>Pengenalan Huruf Hijaiyah Tunggal berharakat Fathah (A - Ya)</td>
          <td>Mampu melafalkan makhorijul huruf secara terputus-putus dengan tepat makhraj tanpa mengeja.</td>
          <td>Surat An-Naas & Al-Falaq, Doa Masuk Kamar Mandi</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 2</td>
          <td>Huruf Sambung Awal-Tengah-Akhir, Mad Thabi'i (Alif, Wawu, Ya')</td>
          <td>Mampu membedakan panjang 1 alif (2 harakat) dan pendek (1 harakat) secara stabil dan konsisten.</td>
          <td>Surat Al-Ikhlas & Al-Lahab, Doa Sebelum Makan</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 3</td>
          <td>Kasrah, Dhammah, Fathatain, Kasratain, Dhammatain, Harakat Sukun</td>
          <td>Mampu membaca huruf mati dengan tidak memantul kecuali huruf Qolqolah (Baju Di Thoko).</td>
          <td>Surat An-Nashr & Al-Kafirun, Doa Bangun Tidur</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 4</td>
          <td>Tasydid, Idghom Bighunnah, Idghom Bilaghunnah, Ghunnah Nun/Mim</td>
          <td>Mampu menahan dengung 2 ketukan harakat pada bacaan Ghunnah, Ikhfa, dan Idghom.</td>
          <td>Surat Al-Kautsar & Al-Ma'un, Doa Keluar Rumah</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 5</td>
          <td>Waqaf, Ibtida', Alif Lam Qomariyah, Alif Lam Syamsiyah, Iqlab</td>
          <td>Mampu membedakan lam jalalah tafkhim/tarqiq dan merubah nun sukun menjadi mim pada hukum iqlab.</td>
          <td>Surat Quraisy & Al-Fiil, Doa Masuk Masjid</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr>
          <td style="font-weight: bold; text-align: center;">Jilid 6</td>
          <td>Tanda Waqaf, Ayat-Ayat Gharibah (Saktah, Imalah, Isymam, Tashil)</td>
          <td>Mampu menguasai kaidah ayat khusus dalam mushaf rasm Usmani serta fashih membaca juz 1 s.d 3.</td>
          <td>Surat Al-Humazah & Al-'Ashr, Doa Kedua Orang Tua</td>
          <td style="text-align: center;">3 - 4 Bulan</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold; text-align: center; color: #064e3b;">Al-Qur'an & Tajwid</td>
          <td>Tadarus Juz 1 s.d 30, Matan Jazariyyah / Tuhfatul Athfal, Ghorib</td>
          <td>Khatam membaca 30 Juz Al-Qur'an secara tartil, menguasai teori hukum tajwid, siap uji Munaqosyah.</td>
          <td>Juz 'Amma Lengkap (37 Surat) + Ayat Kursi</td>
          <td style="text-align: center;">6 - 12 Bulan</td>
        </tr>
      </tbody>
    </table>

{ttd("Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], "Koordinator Kurikulum", INST["curriculumHead"], right_nip="NIY. 19890524 201507 2 002")}
  </div>

  <!-- DOKUMEN 2.3: KALENDER PENDIDIKAN TPQ 2026/2027 -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>KALENDER PENDIDIKAN TPQ TAHUN AJARAN 2026 / 2027</h3>
      <p>DISTRIBUSI WAKTU EFEKTIF BELAJAR & AGENDA AKADEMIK</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 105px;">Bulan / Tahun</th>
          <th style="width: 75px;">Hari Efektif</th>
          <th>Agenda Akademik, Evaluasi & Peringatan Hari Besar Islam (PHBI)</th>
          <th style="width: 130px;">Keterangan / Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="font-weight: bold;">Juli 2026</td>
          <td style="text-align: center;">16 Hari</td>
          <td>Penerimaan Santri Baru (PSB), Tes Penempatan Level & Masa Ta'aruf Santri Baru</td>
          <td>Rombel Terbentuk</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Agustus 2026</td>
          <td style="text-align: center;">24 Hari</td>
          <td>KBM Efektif, Peringatan HUT Kemerdekaan RI ke-81 (Pawai Santri & Lomba Islami)</td>
          <td>Karakter Kebangsaan</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">September 2026</td>
          <td style="text-align: center;">24 Hari</td>
          <td>Peringatan Maulid Nabi Muhammad SAW 1448 H & Pertemuan Parenting Wali Santri</td>
          <td>Sinergi Wali Santri</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Oktober 2026</td>
          <td style="text-align: center;">25 Hari</td>
          <td>Peringatan <strong>Hari Santri Nasional (22 Oktober)</strong> & Apel Bersarung Muslimat NU</td>
          <td>Kekhasan Amaliyah NU</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">November 2026</td>
          <td style="text-align: center;">24 Hari</td>
          <td>Evaluasi Kenaikan Jilid Gelombang I & Simulasi Tajwid Praktis</td>
          <td>Penilaian Formatif</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Desember 2026</td>
          <td style="text-align: center;">14 Hari</td>
          <td>Ujian Akhir Semester Ganjil, Pembagian Rapor Santri & Libur Semester Ganjil</td>
          <td>Laporan Hasil Belajar</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold;">Januari 2027</td>
          <td style="text-align: center;">23 Hari</td>
          <td>Awal Masuk Semester Genap & Peringatan Isra' Mi'raj Nabi Muhammad SAW 1448 H</td>
          <td>Awal Semester Genap</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold;">Februari - Maret 2027</td>
          <td style="text-align: center;">30 Hari</td>
          <td>Pondok Ramadhan, Pesantren Kilat Al-Qur'an, Pembagian Zakat Fitrah & Libur Idul Fitri</td>
          <td>Bulan Suci Ramadhan</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold;">April 2027</td>
          <td style="text-align: center;">18 Hari</td>
          <td>Halal bi Halal Santri & Ujian Pra-Munaqosyah Kelulusan Tingkat Satuan</td>
          <td>Ujian Pra-Munaqosyah</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold;">Mei 2027</td>
          <td style="text-align: center;">22 Hari</td>
          <td>Sidang Munaqosyah Terbuka Al-Qur'an bersama Tim Munaqisy Cabang Muslimat NU</td>
          <td>Kelulusan Santri</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="font-weight: bold;">Juni 2027</td>
          <td style="text-align: center;">14 Hari</td>
          <td><strong>Haflah Wisuda Khotmil Qur'an Santri ke-XII</strong> & Pembagian Ijazah Kelulusan</td>
          <td>Wisuda Akbar Santri</td>
        </tr>
      </tbody>
    </table>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 2.4: JADWAL KBM & PEMBAGIAN KELAS GURU -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>JADWAL KBM & PEMBAGIAN KELAS ASATIDZ PENGAMPU</h3>
      <p>TAHUN AJARAN 2026/2027 • WAKTU BELAJAR: 15.30 - 17.00 WIB</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 90px;">Rombel / Level</th>
          <th style="width: 65px;">Jumlah Santri</th>
          <th style="width: 140px;">Ustadzah Pengampu</th>
          <th style="width: 110px;">Ruang Belajar</th>
          <th>Materi Pembelajaran Harian</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-weight: bold;">Jilid 1 (Dasar)</td>
          <td style="text-align: center;">5 Santri</td>
          <td>Ustadzah Siti Rokhmah, A.Ma</td>
          <td>Ruang A (Karpet Hijau)</td>
          <td>Makhorijul huruf hijaiyah, peraga CBSA, doa pendek</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-weight: bold;">Jilid 2</td>
          <td style="text-align: center;">3 Santri</td>
          <td>Ustadzah Nurul Hidayati, S.Pd</td>
          <td>Ruang A (Karpet Hijau)</td>
          <td>Mad Thabi'i panjang 2 harakat, huruf sambung, doa makan</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-weight: bold;">Jilid 3</td>
          <td style="text-align: center;">4 Santri</td>
          <td>Ustadzah Fatimatuz Zahro, S.Pd</td>
          <td>Ruang B (Karpet Biru)</td>
          <td>Harakat tanwin, sukun, qolqolah, hafalan surat Al-Lahab</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-weight: bold;">Jilid 4</td>
          <td style="text-align: center;">4 Santri</td>
          <td>Ustadzah Fatimatuz Zahro, S.Pd</td>
          <td>Ruang B (Karpet Biru)</td>
          <td>Hukum tasydid, ghunnah 2 ketukan, surat Al-Kafirun</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-weight: bold;">Jilid 5</td>
          <td style="text-align: center;">3 Santri</td>
          <td>Ustadz Ahmad Fauzi, S.Pd</td>
          <td>Ruang C (Meja Rekal)</td>
          <td>Tanda waqaf lazim, idgham, alif lam syamsiyah/qomariyah</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td style="font-weight: bold;">Jilid 6</td>
          <td style="text-align: center;">3 Santri</td>
          <td>Ustadz Ahmad Fauzi, S.Pd</td>
          <td>Ruang C (Meja Rekal)</td>
          <td>Ghoribul Qur'an, fawatihussuwar, persiapan mushaf besar</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="text-align: center;">7</td>
          <td style="font-weight: bold; color: #064e3b;">Al-Qur'an & Tajwid</td>
          <td style="text-align: center;">3 Santri</td>
          <td>Ustadzah Maimunah, S.Ag / Hj. Siti Aminah</td>
          <td>Aula Utama (Tadarus)</td>
          <td>Tadarus Juz 1 s.d 30 bertajwid, fashohah, tahfidz Juz 30</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px; font-size: 8.5pt; line-height: 1.5; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px;">
      <strong>Struktur Pembagian Waktu KBM 90 Menit:</strong><br>
      • 15.30 - 15.45 (15 Menit) : Pembukaan Klasikal, Tawasul Fatihah, Sholawat Tibbil Qulub & Asmaul Husna.<br>
      • 15.45 - 16.00 (15 Menit) : Penanaman Konsep Peraga Klasikal CBSA di depan kelas.<br>
      • 16.00 - 16.40 (40 Menit) : Sorogan Privat Individual menghadap Ustadzah & Baca-Simak pasangan.<br>
      • 16.40 - 16.50 (10 Menit) : Amaliyah Aswaja, Hafalan Doa Qunut Shubuh & Praktik Wudhu/Sholat.<br>
      • 16.50 - 17.00 (10 Menit) : Nasihat Akhlak, Doa Khatmil Qur'an, Mushafahah (Salaman) Tertib.
    </div>

{ttd("Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], "Koordinator Kesiswaan", INST["studentsHead"], right_nip="NIY. 19921012 201707 1 003")}
  </div>

  <!-- DOKUMEN 2.5: DAFTAR BUKU AJAR & MEDIA PERAGA RESMI -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>DAFTAR INVENTARIS BUKU AJAR, SUMBER RUJUKAN & MEDIA PERAGA</h3>
      <p>STANDAR SARANA PENUNJANG PEMBELAJARAN AL-QUR'AN</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th>Nama Buku / Kitab / Media Ajar</th>
          <th style="width: 140px;">Penerbit / Sumber</th>
          <th style="width: 80px;">Jumlah</th>
          <th style="width: 110px;">Pengguna</th>
          <th style="width: 65px;">Kondisi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td><strong>Buku Paket Metode Cepat Tanggap Belajar Al-Qur'an An-Nahdliyah Jilid 1 - 6</strong></td>
          <td>Lembaga Pendidikan Ma'arif NU Jatim</td>
          <td style="text-align: center;">60 Set</td>
          <td>Santri Jilid 1 s.d 6</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td><strong>Mushaf Al-Qur'an Standar Kementerian Agama RI (Rasm Usmani)</strong></td>
          <td>Kemenag RI / Yayasan AL FATAH</td>
          <td style="text-align: center;">50 Eks</td>
          <td>Santri Al-Qur'an & Asatidz</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td><strong>Alat Peraga Dinding Klasikal Ukuran Besar (Jilid 1 s/d Jilid 6)</strong></td>
          <td>LP Ma'arif NU / Muslimat NU</td>
          <td style="text-align: center;">6 Set</td>
          <td>Ruang Kelas A, B, C</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td><strong>Buku Risalah Tuntunan Sholat Lengkap & Doa Qunut Madzhab Syafi'i</strong></td>
          <td>Pustaka Amani / LTN NU</td>
          <td style="text-align: center;">30 Eks</td>
          <td>Santri Praktik Ibadah</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td><strong>Buku Prestasi Santri & Kartu Mutaba'ah Setoran Tartil Harian</strong></td>
          <td>Percetakan TPQ Muslimat NU</td>
          <td style="text-align: center;">100 Eks</td>
          <td>Seluruh Santri Aktif</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td><strong>Rekal Kayu Lipat (Meja Belajar Duduk Santri) Kayu Jati Kokoh</strong></td>
          <td>Wakaf Wali Santri & Donatur</td>
          <td style="text-align: center;">30 Unit</td>
          <td>Santri Sorogan</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
        <tr>
          <td style="text-align: center;">7</td>
          <td><strong>Papan Tulis Whiteboard Magnetik 120 x 240 cm & Spidol Non-Toxic</strong></td>
          <td>Pengadaan Mandiri Yayasan</td>
          <td style="text-align: center;">3 Unit</td>
          <td>Ruang Belajar</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Baik</td>
        </tr>
      </tbody>
    </table>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 2 generated successfully.")
