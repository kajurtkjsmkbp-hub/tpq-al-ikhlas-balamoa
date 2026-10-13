# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn
from build_odners_complete import SANTRI_LIST

def render_santri_rows(santris):
    rows = ""
    for s in santris:
        rows += f"""        <tr>
          <td style="text-align: center;">{s['no']}</td>
          <td style="font-family: monospace; text-align: center;">{s['nis']}</td>
          <td style="font-family: monospace; text-align: center;">{s['nik']}</td>
          <td><strong>{s['name']}</strong></td>
          <td style="text-align: center; font-weight: bold;">{s['gender']}</td>
          <td>{s['ttl']}</td>
          <td style="font-weight: bold; text-align: center;">{s['level']}</td>
          <td>{s['parent']}</td>
          <td style="font-family: monospace;">{s['phone']}</td>
          <td>{s['address']}</td>
          <td style="text-align: center;">{s['join']}</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">{s['status']}</td>
        </tr>"""
    return rows

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 3 : KESISWAAN & BUKU INDUK SANTRI - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#d97706", "ODNER 3")}

  <!-- DOKUMEN 3.1: LEMBAR VERIFIKASI ASESOR & DAFTAR ISI ODNER 3 -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>LEMBAR VERIFIKASI ASESOR & DAFTAR BUKTI FISIK</h3>
      <p>ODNER 3 : STANDAR KESISWAAN, PESERTA DIDIK & EVALUASI BELAJAR</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 130px; font-weight: bold;">Satuan Pendidikan</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #b45309;">TPQ MUSLIMAT NU AL-IKHLAS</td><td style="width: 120px; font-weight: bold;">Sinkronisasi EMIS</td><td style="width: 10px;">:</td><td>100% Terverifikasi (Kemenag)</td></tr>
        <tr><td style="font-weight: bold;">Total Santri Terdaftar</td><td>:</td><td><strong>25 Santri</strong> (13 Putra / 12 Putri)</td><td style="font-weight: bold;">Rasio Kelas / Ustadzah</td><td>:</td><td>1 : 4.2 (Sangat Ideal)</td></tr>
      </table>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 75px;">Kode Bukti</th>
          <th>Nama Dokumen Bukti Fisik Kesiswaan</th>
          <th style="width: 110px;">Bentuk Fisik</th>
          <th style="width: 75px;">Verifikasi Asesor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-family: monospace; text-align: center;">DOC.3.01</td>
          <td><strong>Buku Besar Induk Peserta Didik (Santri) Sinkronisasi EMIS Kemenag</strong></td>
          <td>Buku Besar Landscape</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-family: monospace; text-align: center;">DOC.3.02</td>
          <td><strong>Buku Presensi / Absensi Kehadiran Santri Harian & Rekap Bulanan</strong></td>
          <td>Buku Presensi Harian</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-family: monospace; text-align: center;">DOC.3.03</td>
          <td><strong>Buku Prestasi / Kartu Mutaba'ah Catatan Setoran Tartil & Hafalan Santri</strong></td>
          <td>Kartu Prestasi Riil</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-family: monospace; text-align: center;">DOC.3.04</td>
          <td><strong>Laporan Hasil Belajar (Rapor) Santri Semester Ganjil & Genap</strong></td>
          <td>Contoh Rapor Terisi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-family: monospace; text-align: center;">DOC.3.05</td>
          <td><strong>Format Piagam & Syahadah Kelulusan Wisuda Khotmil Qur'an Santri</strong></td>
          <td>Draf Piagam Resmi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
      </tbody>
    </table>

    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; margin-top: 10px; font-size: 8.5pt;">
      <strong>Catatan Rekomendasi Tim Asesor Akreditasi:</strong><br>
      <em>"Buku Induk Santri sangat tertib, seluruh santri memiliki NIK resmi 16 digit yang sinkron dengan data Dukcapil dan EMIS Kemenag. Dokumen mutaba'ah dan portofolio rapor mencerminkan evaluasi belajar yang otentik dan berkelanjutan."</em>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Koord. Kesiswaan & EMIS", INST["studentsHead"], right_nip="NIY. 19921012 201707 1 003")}
  </div>

  <!-- DOKUMEN 3.2: BUKU INDUK SANTRI BAGIAN 1 (NO 1 - 13) - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>BUKU BESAR INDUK PESERTA DIDIK (SANTRI) - BAGIAN 1</h3>
      <p>SINKRONISASI DATABASE EMIS 4.0 KEMENTERIAN AGAMA RI • TAHUN AJARAN 2026/2027</p>
    </div>

    <table class="data-table" style="font-size: 7.5pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 55px;">NIS</th>
          <th style="width: 95px;">NIK Santri</th>
          <th>Nama Lengkap Santri</th>
          <th style="width: 25px;">L/P</th>
          <th style="width: 100px;">Tempat, Tgl Lahir</th>
          <th style="width: 80px;">Tingkat Jilid</th>
          <th style="width: 105px;">Nama Orang Tua</th>
          <th style="width: 85px;">No. WhatsApp</th>
          <th>Alamat Domisili</th>
          <th style="width: 60px;">Tgl Masuk</th>
          <th style="width: 45px;">Status</th>
        </tr>
      </thead>
      <tbody>
{render_santri_rows(SANTRI_LIST[:13])}
      </tbody>
    </table>

    <div style="font-size: 7.5pt; text-align: right; color: #64748b; margin-top: 4px;">
      Halaman 1 dari 2 • Buku Besar Induk TPQ Muslimat NU AL-IKHLAS
    </div>
  </div>

  <!-- DOKUMEN 3.3: BUKU INDUK SANTRI BAGIAN 2 (NO 14 - 25) - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>BUKU BESAR INDUK PESERTA DIDIK (SANTRI) - BAGIAN 2</h3>
      <p>SINKRONISASI DATABASE EMIS 4.0 KEMENTERIAN AGAMA RI • TAHUN AJARAN 2026/2027</p>
    </div>

    <table class="data-table" style="font-size: 7.5pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 55px;">NIS</th>
          <th style="width: 95px;">NIK Santri</th>
          <th>Nama Lengkap Santri</th>
          <th style="width: 25px;">L/P</th>
          <th style="width: 100px;">Tempat, Tgl Lahir</th>
          <th style="width: 80px;">Tingkat Jilid</th>
          <th style="width: 105px;">Nama Orang Tua</th>
          <th style="width: 85px;">No. WhatsApp</th>
          <th>Alamat Domisili</th>
          <th style="width: 60px;">Tgl Masuk</th>
          <th style="width: 45px;">Status</th>
        </tr>
      </thead>
      <tbody>
{render_santri_rows(SANTRI_LIST[13:])}
      </tbody>
    </table>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 10px; border-radius: 4px; font-size: 8pt; margin-top: 6px; display: flex; justify-content: space-between;">
      <span><strong>Rekapitulasi Santri:</strong> Jilid 1: 4 | Jilid 2: 3 | Jilid 3: 4 | Jilid 4: 4 | Jilid 5: 3 | Jilid 6: 3 | Al-Qur'an: 4</span>
      <span><strong>Total Santri:</strong> 25 Santri (L: 13, P: 12) • <strong>Keaktifan:</strong> 100% Aktif</span>
    </div>

{ttd("Koordinator Kesiswaan & EMIS", INST["studentsHead"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], left_nip="NIY. 19921012 201707 1 003", right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 3.4: REKAPITULASI PRESENSI SANTRI BULANAN - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>REKAPITULASI PRESENSI & KEHADIRAN SANTRI BULANAN</h3>
      <p>BULAN: AGUSTUS 2026 • TOTAL HARI EFEKTIF: 24 HARI PERTEMUAN</p>
    </div>

    <table class="data-table" style="font-size: 7.5pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 55px;">NIS</th>
          <th>Nama Lengkap Santri</th>
          <th style="width: 75px;">Tingkat Jilid</th>
          <th style="width: 45px;">Hadir (H)</th>
          <th style="width: 40px;">Sakit (S)</th>
          <th style="width: 40px;">Izin (I)</th>
          <th style="width: 40px;">Alpa (A)</th>
          <th style="width: 65px;">% Kehadiran</th>
          <th>Catatan Kedisiplinan & Sikap Belajar</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="text-align: center;">1</td><td style="text-align: center; font-family: monospace;">2026/001</td><td>Muhammad Bilal Al-Ghifari</td><td style="text-align: center;">Jilid 4</td><td style="text-align: center; font-weight: bold;">24</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">100%</td><td>Sangat rajin, selalu datang tepat waktu</td></tr>
        <tr><td style="text-align: center;">2</td><td style="text-align: center; font-family: monospace;">2026/002</td><td>Aisyah Nur Ramadhani</td><td style="text-align: center;">Al-Qur'an</td><td style="text-align: center; font-weight: bold;">24</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">100%</td><td>Fokus dalam tadarus tartil dan tajwid</td></tr>
        <tr><td style="text-align: center;">3</td><td style="text-align: center; font-family: monospace;">2026/003</td><td>Fatimah Az-Zahra</td><td style="text-align: center;">Jilid 3</td><td style="text-align: center; font-weight: bold;">23</td><td style="text-align: center;">1</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">95.8%</td><td>Sakit flu 1 hari disertai surat wali</td></tr>
        <tr><td style="text-align: center;">4</td><td style="text-align: center; font-family: monospace;">2026/004</td><td>Ahmad Zaki Mubarak</td><td style="text-align: center;">Jilid 5</td><td style="text-align: center; font-weight: bold;">24</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">100%</td><td>Santun dan disiplin berbusana muslim</td></tr>
        <tr><td style="text-align: center;">5</td><td style="text-align: center; font-family: monospace;">2026/005</td><td>Ibrahim Hanif</td><td style="text-align: center;">Jilid 2</td><td style="text-align: center; font-weight: bold;">23</td><td style="text-align: center;">0</td><td style="text-align: center;">1</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">95.8%</td><td>Izin keluarga 1 hari dengan pemberitahuan</td></tr>
        <tr><td style="text-align: center;">...</td><td style="text-align: center;">...</td><td><em>(Seluruh 25 santri tercatat dalam Buku Presensi Harian Rombel)</em></td><td style="text-align: center;">Jilid 1-6</td><td style="text-align: center; font-weight: bold;">Rata: 23.6</td><td style="text-align: center;">0.2</td><td style="text-align: center;">0.2</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #059669;">98.3%</td><td>Rata-rata kehadiran santri sangat tinggi</td></tr>
      </tbody>
    </table>

{ttd("Koordinator Kesiswaan", INST["studentsHead"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], left_nip="NIY. 19921012 201707 1 003", right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 3.5: SAMPEL KARTU MUTABA'AH SETORAN SANTRI - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>KARTU PRESTASI & MUTABA'AH SETORAN TARTIL SANTRI</h3>
      <p>BUKTI MUTABA'AH HARIAN • BULAN: AGUSTUS 2026</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 10px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 100px; font-weight: bold;">Nama Santri</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #064e3b;">Muhammad Bilal Al-Ghifari</td><td style="width: 90px; font-weight: bold;">Jilid / Kelas</td><td style="width: 10px;">:</td><td>Jilid 4</td></tr>
        <tr><td style="font-weight: bold;">Nomor Induk (NIS)</td><td>:</td><td style="font-family: monospace;">2026/001</td><td style="font-weight: bold;">Nama Wali</td><td>:</td><td>H. Ridwan Santoso</td></tr>
        <tr><td style="font-weight: bold;">Ustadzah Pengampu</td><td>:</td><td>Ustadzah Fatimatuz Zahro, S.Pd</td><td style="font-weight: bold;">Tahun Ajaran</td><td>:</td><td>2026 / 2027</td></tr>
      </table>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 75px;">Hari / Tgl</th>
          <th style="width: 90px;">Materi Jilid</th>
          <th>Ayat / Materi Setoran</th>
          <th style="width: 65px;">Kualitas</th>
          <th style="width: 110px;">Status Kenaikan</th>
          <th style="width: 70px;">Paraf Guru</th>
          <th style="width: 70px;">Paraf Wali</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">Senin, 03/08</td>
          <td style="text-align: center; font-weight: bold;">Jilid 4 Hal 10</td>
          <td>Ghunnah Nun Bertasydid & Surat Al-Humazah</td>
          <td style="text-align: center; font-weight: bold;">A (Tartil)</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Lancar Sempurna</td>
          <td style="text-align: center; font-style: italic;">[Zahro]</td>
          <td style="text-align: center; font-style: italic;">[Ridwan]</td>
        </tr>
        <tr>
          <td style="text-align: center;">Selasa, 04/08</td>
          <td style="text-align: center; font-weight: bold;">Jilid 4 Hal 11</td>
          <td>Ghunnah Mim Bertasydid & Surat Al-Humazah</td>
          <td style="text-align: center; font-weight: bold;">A (Tartil)</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Naik Halaman</td>
          <td style="text-align: center; font-style: italic;">[Zahro]</td>
          <td style="text-align: center; font-style: italic;">[Ridwan]</td>
        </tr>
        <tr>
          <td style="text-align: center;">Rabu, 05/08</td>
          <td style="text-align: center; font-weight: bold;">Jilid 4 Hal 12</td>
          <td>Idghom Bighunnah (Nun mati bertemu Ya/Wawu)</td>
          <td style="text-align: center; font-weight: bold;">B+ (Baik)</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Perhatikan Dengung</td>
          <td style="text-align: center; font-style: italic;">[Zahro]</td>
          <td style="text-align: center; font-style: italic;">[Ridwan]</td>
        </tr>
        <tr>
          <td style="text-align: center;">Kamis, 06/08</td>
          <td style="text-align: center; font-weight: bold;">Jilid 4 Hal 13</td>
          <td>Idghom Bighunnah & Surat Al-Fiil ayat 1-5</td>
          <td style="text-align: center; font-weight: bold;">A (Tartil)</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Naik Halaman</td>
          <td style="text-align: center; font-style: italic;">[Zahro]</td>
          <td style="text-align: center; font-style: italic;">[Ridwan]</td>
        </tr>
        <tr>
          <td style="text-align: center;">Jum'at, 07/08</td>
          <td style="text-align: center; font-weight: bold;">Jilid 4 Hal 14</td>
          <td>Idghom Bilaghunnah (Nun mati bertemu Lam/Ra')</td>
          <td style="text-align: center; font-weight: bold;">A (Tartil)</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Makhraj Mantap</td>
          <td style="text-align: center; font-style: italic;">[Zahro]</td>
          <td style="text-align: center; font-style: italic;">[Ridwan]</td>
        </tr>
      </tbody>
    </table>

{ttd("Orang Tua / Wali Santri", "H. Ridwan Santoso", "Ustadzah Pengampu Kelas", "Ustadzah Fatimatuz Zahro, S.Pd")}
  </div>

  <!-- DOKUMEN 3.6: LAPORAN HASIL BELAJAR (RAPOR) SANTRI - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>LAPORAN HASIL EVALUASI BELAJAR SANTRI (RAPOR)</h3>
      <p>SEMESTER GANJIL • TAHUN AJARAN 2026/2027</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 100px; font-weight: bold;">Nama Santri</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #064e3b;">Muhammad Bilal Al-Ghifari</td><td style="width: 90px; font-weight: bold;">Tingkat Jilid</td><td style="width: 10px;">:</td><td>Jilid 4</td></tr>
        <tr><td style="font-weight: bold;">Nomor Induk (NIS)</td><td>:</td><td style="font-family: monospace;">2026/001</td><td style="font-weight: bold;">Nama Wali</td><td>:</td><td>H. Ridwan Santoso</td></tr>
      </table>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th>Mata Pelajaran & Aspek Penilaian</th>
          <th style="width: 65px;">Nilai Angka</th>
          <th style="width: 75px;">Predikat</th>
          <th style="width: 150px;">Keterangan Capaian Kompetensi</th>
        </tr>
      </thead>
      <tbody>
        <tr><td colspan="5" style="background: #f1f5f9; font-weight: bold;">I. KEMAMPUAN BACA AL-QUR'AN (TARTIL)</td></tr>
        <tr><td style="text-align: center;">1</td><td>Makhorijul Huruf (Fashohah)</td><td style="text-align: center;">92</td><td style="text-align: center; font-weight: bold;">A</td><td>Pengucapan huruf hijaiyah fasih dan tepat</td></tr>
        <tr><td style="text-align: center;">2</td><td>Shifatul Huruf & Ghunnah (Dengung)</td><td style="text-align: center;">90</td><td style="text-align: center; font-weight: bold;">A</td><td>Dengung stabil dan tertahan 2 harakat</td></tr>
        <tr><td style="text-align: center;">3</td><td>Hukum Mad (Panjang Pendek)</td><td style="text-align: center;">88</td><td style="text-align: center; font-weight: bold;">B+</td><td>Ketukan stabil, tidak terburu-buru</td></tr>
        <tr><td style="text-align: center;">4</td><td>Waqaf dan Ibtida' (Tanda Berhenti)</td><td style="text-align: center;">89</td><td style="text-align: center; font-weight: bold;">B+</td><td>Memahami tanda waqaf lazim dan jaiz</td></tr>

        <tr><td colspan="5" style="background: #f1f5f9; font-weight: bold;">II. TAHFIDZ & HAFALAN SURAT</td></tr>
        <tr><td style="text-align: center;">1</td><td>Hafalan Surat Pendek (Juz 'Amma)</td><td style="text-align: center;">95</td><td style="text-align: center; font-weight: bold;">A</td><td>Mutqin hafalan surat An-Naas s.d Al-Humazah</td></tr>
        <tr><td style="text-align: center;">2</td><td>Hafalan Doa Keseharian & Hadits Adab</td><td style="text-align: center;">92</td><td style="text-align: center; font-weight: bold;">A</td><td>Hafal 12 doa harian beserta artinya</td></tr>

        <tr><td colspan="5" style="background: #f1f5f9; font-weight: bold;">III. PRAKTIK IBADAH & AMALIYAH ASWAJA</td></tr>
        <tr><td style="text-align: center;">1</td><td>Praktik Berwudhu & Thaharah</td><td style="text-align: center;">96</td><td style="text-align: center; font-weight: bold;">A</td><td>Tertib rukun dan sunnah wudhu</td></tr>
        <tr><td style="text-align: center;">2</td><td>Praktik Gerakan & Bacaan Sholat Fardhu</td><td style="text-align: center;">92</td><td style="text-align: center; font-weight: bold;">A</td><td>Tuma'ninah dan gerakan sholat tegak</td></tr>
        <tr><td style="text-align: center;">3</td><td>Hafalan Doa Qunut Shubuh Tradisi NU</td><td style="text-align: center;">95</td><td style="text-align: center; font-weight: bold;">A</td><td>Lancar doa qunut shubuh tanpa ragu</td></tr>
        <tr><td style="text-align: center;">4</td><td>Sholawat Nabi (Tibbil Qulub & Nahdliyyah)</td><td style="text-align: center;">94</td><td style="text-align: center; font-weight: bold;">A</td><td>Bersemangat dan cinta sholawat</td></tr>
      </tbody>
    </table>

    <div style="border: 1px solid #000; padding: 6px; font-size: 8pt; margin-top: 6px;">
      <strong>Catatan Ustadzah Pengampu:</strong><br>
      <em>"Alhamdulillah Ananda Bilal menunjukkan akhlak mulia dan capaian membaca yang sangat pesat. Terus pertahankan istiqomah tadarus di rumah bersama orang tua."</em>
    </div>

{ttd("Orang Tua / Wali Santri", "H. Ridwan Santoso", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 3 generated successfully with all 25 santri.")
