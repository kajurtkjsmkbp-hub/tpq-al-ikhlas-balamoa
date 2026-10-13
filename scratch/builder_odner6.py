# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 6 : TATA TERTIB & PROGRAM KERJA - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#0d9488", "ODNER 6")}

  <!-- DOKUMEN 6.1: LEMBAR VERIFIKASI ASESOR & DAFTAR ISI ODNER 6 -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>LEMBAR VERIFIKASI ASESOR & DAFTAR BUKTI FISIK</h3>
      <p>ODNER 6 : STANDAR TATA KELOLA, TATA TERTIB & PROGRAM KERJA TAHUNAN</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 130px; font-weight: bold;">Satuan Pendidikan</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #0f766e;">TPQ MUSLIMAT NU AL-IKHLAS</td><td style="width: 120px; font-weight: bold;">Penanggung Jawab</td><td style="width: 10px;">:</td><td>Kepala TPQ & Komite</td></tr>
        <tr><td style="font-weight: bold;">Fokus Dokumen</td><td>:</td><td>Disiplin, Kepastian KBM & Rencana Kerja 12 Bulan</td><td style="font-weight: bold;">Tahun Ajaran</td><td>:</td><td>2026 / 2027</td></tr>
      </table>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 75px;">Kode Bukti</th>
          <th>Nama Dokumen Bukti Fisik Tata Kelola & Proker</th>
          <th style="width: 110px;">Bentuk Fisik</th>
          <th style="width: 75px;">Verifikasi Asesor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.01</td>
          <td><strong>Tata Tertib & Kode Etik Pendidik / Asatidz TPQ Muslimat NU</strong></td>
          <td>Lembar SOP Resmi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.02</td>
          <td><strong>Tata Tertib Peserta Didik (Santri) TPQ Muslimat NU AL-IKHLAS</strong></td>
          <td>Lembar Tatib Santri</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.03</td>
          <td><strong>Tata Tertib, Hak & Kewajiban Orang Tua / Wali Santri</strong></td>
          <td>SOP Komite Wali</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.04</td>
          <td><strong>Surat Pernyataan Kesanggupan & Pakta Integritas Wali Santri Riil</strong></td>
          <td>Asli Materai Rp10.000</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.05</td>
          <td><strong>Matriks Program Kerja Tahunan TPQ 12 Bulan (Juli 2026 - Juni 2027)</strong></td>
          <td>Matriks Proker Resmi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.06</td>
          <td><strong>Buku Agenda Surat Masuk & Surat Keluar (Register Ekspedisi)</strong></td>
          <td>Buku Agenda Ekspedisi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">7</td>
          <td style="font-family: monospace; text-align: center;">DOC.6.07</td>
          <td><strong>Buku Tamu Khusus Kunjungan Asesor & Monitoring Kemenag RI</strong></td>
          <td>Buku Tamu Asesor</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
      </tbody>
    </table>

    <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 6px; padding: 10px; margin-top: 10px; font-size: 8.5pt;">
      <strong>Catatan Rekomendasi Tim Asesor Akreditasi:</strong><br>
      <em>"Tata tertib kelembagaan terdefinisi jelas, pembagian peran antara asatidz, santri, dan komite wali harmonis. Program kerja tahunan 12 bulan mencakup dimensi kurikuler, amaliyah Aswaja, dan peningkatan sarana secara seimbang."</em>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 6.2: TATA TERTIB PENDIDIK -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>TATA TERTIB & KODE ETIK PENDIDIK (USTADZ / USTADZAH)</h3>
      <p>PEDOMAN DISIPLIN DAN ETIKA MENGAJAR DI KELAS</p>
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify;">
      <p style="margin: 0 0 6px 0;"><strong>BAB I : KEWAJIBAN & KEDISIPLINAN ASATIDZ</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Hadir di lokasi TPQ selambat-lambatnya 15 menit sebelum KBM dimulai (Pukul 15.15 WIB) dan menandatangani daftar presensi harian.</li>
        <li>Menyiapkan media peraga, spidol, buku jilid pegangan guru, dan buku mutaba'ah sebelum santri memasuki kelas.</li>
        <li>Berbusana muslim/muslimah rapi, bersih, sopan, dan menutup aurat (Asatidz putri berbusana muslimah longgar dan jilbab syar'i).</li>
        <li>Memimpin dan mendampingi pembacaan doa pembuka, tawasul fatihah, serta sholawat tibbil qulub secara khusyuk.</li>
        <li>Menyimak bacaan santri dengan sabar, teliti makhorijul huruf dan panjang-pendek tajwid tanpa membentak atau menggunakan kekerasan fisik.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB II : LARANGAN BAGI ASATIDZ</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Dilarang meninggalkan ruang kelas saat KBM berlangsung tanpa izin Kepala TPQ atau tanpa guru pengganti (badal).</li>
        <li>Dilarang memainkan gawai/smartphone untuk keperluan pribadi saat proses sorogan privat santri sedang berlangsung.</li>
        <li>Dilarang memberikan hukuman fisik yang mencederai jasmani maupun merendahkan martabat santri.</li>
        <li>Dilarang merokok di seluruh lingkungan dan halaman TPQ Muslimat NU AL-IKHLAS.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB III : HAK ASATIDZ</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Memperoleh bisaroh / insentif bulanan yang disalurkan tertib setiap tanggal 25.</li>
        <li>Memperoleh kesempatan mengikuti pelatihan, penataran metode tartil, workshop munaqosyah, dan sertifikasi syahadah.</li>
        <li>Mendapatkan hak cuti melahirkan, sakit, atau izin hajat syar'i dengan mengajukan surat pemberitahuan.</li>
      </ol>
    </div>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 6.3: TATA TERTIB PESERTA DIDIK -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>TATA TERTIB PESERTA DIDIK (SANTRI)</h3>
      <p>PEDOMAN AKHLAK & KEDISIPLINAN BELAJAR AL-QUR'AN</p>
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify;">
      <p style="margin: 0 0 6px 0;"><strong>BAB I : WAKTU BELAJAR & KEHADIRAN</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Santri wajib hadir 10 menit sebelum jam 15.30 WIB di ruang kelas masing-masing dalam keadaan berwudhu.</li>
        <li>Menata sandal/sepatu dengan rapi di rak yang disediakan dan mengucapkan salam saat masuk ruang belajar.</li>
        <li>Santri yang tidak masuk wajib menyerahkan surat izin tertulis dari orang tua atau konfirmasi via WhatsApp grup kelas.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB II : SERAGAM & KERAPIAN</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li><strong>Santri Putra:</strong> Baju koko rapi, celana panjang/sarung, peci/songkok hitam/putih.</li>
        <li><strong>Santri Putri:</strong> Busana muslimah longgar, jilbab menutup rambut rapi (Hari Senin & Rabu seragam hijau Muslimat NU).</li>
        <li>Memotong kuku secara teratur dan dilarang membawa aksesoris berharga ke TPQ.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB III : ADAB TERHADAP AL-QUR'AN & USTADZAH</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Meletakkan buku jilid/mushaf di atas rekal/meja dengan kedua tangan, dilarang meletakkan kitab suci di atas lantai.</li>
        <li>Mencium tangan ustadz/ustadzah saat datang dan sebelum pulang (Mushafahah).</li>
        <li>Dilarang membuat gaduh, bertengkar, membuang sampah sembarangan, serta dilarang membawa mainan atau gawai/HP.</li>
      </ol>
    </div>

{ttd("Koordinator Kesiswaan", INST["studentsHead"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], left_nip="NIY. 19921012 201707 1 003", right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 6.4: TATA TERTIB ORANG TUA / WALI SANTRI -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>TATA TERTIB ORANG TUA / WALI SANTRI</h3>
      <p>SINERGI PENDIDIKAN RUMAH DAN TPQ MUSLIMAT NU</p>
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify;">
      <p style="margin: 0 0 6px 0;"><strong>BAB I : HAK WALI SANTRI</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Mendapatkan laporan perkembangan capaian membaca dan hafalan putra/putrinya secara berkala via Buku Mutaba'ah dan Rapor Semester.</li>
        <li>Memberikan saran, masukan, dan konsultasi kepada ustadzah di luar jam aktif KBM.</li>
        <li>Menghadiri rapat pleno komite wali santri dan kegiatan pengajian berkala yang diselenggarakan TPQ.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB II : KEWAJIBAN WALI SANTRI</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Membimbing dan menyimak tadarus putra/putrinya di rumah setiap hari minimal 15 menit ba'da Maghrib serta membubuhi paraf pada buku mutaba'ah.</li>
        <li>Mengantar dan menjemput santri tepat waktu (antar pkl 15.20 WIB, jemput pkl 17.00 WIB) demi keamanan bersama.</li>
        <li>Membayar infaq syahriyah bulanan secara tertib sebelum tanggal 10 setiap bulan.</li>
        <li><strong>Tidak diperkenankan menunggui santri di dalam ruang kelas</strong> saat KBM berlangsung agar santri mandiri dan fokus belajar.</li>
      </ol>

      <p style="margin: 0 0 6px 0;"><strong>BAB III : KETENTUAN SANKSI & KONSULTASI</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Santri yang tidak hadir 3 hari berturut-turut tanpa kabar akan dihubungi oleh wali kelas untuk konfirmasi silaturahim.</li>
        <li>Apabila terdapat kesulitan belajar atau kendala makhraj, wali santri diundang untuk berdiskusi bersama tim kurikulum TPQ.</li>
      </ol>
    </div>

{ttd("Ketua Komite Wali Santri", "H. Ridwan Santoso", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 6.5: PAKTA INTEGRITAS WALI SANTRI RIIL -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SURAT PERNYATAAN KESANGGUPAN & PAKTA INTEGRITAS WALI SANTRI</h3>
      <p>ARSIP KESISWAAN DAN PENERIMAAN SANTRI BARU (PSB)</p>
    </div>

    <p style="font-size: 9pt; margin-bottom: 8px;">Yang bertanda tangan di bawah ini:</p>
    <table style="width: 100%; font-size: 9pt; margin-bottom: 12px; line-height: 1.6;">
      <tr><td style="width: 170px; font-weight: bold;">Nama Lengkap Orang Tua/Wali</td><td style="width: 15px;">:</td><td style="border-bottom: 1px solid #cbd5e1; font-weight: bold; color: #0f172a;">H. Ridwan Santoso</td></tr>
      <tr><td style="font-weight: bold;">NIK KTP Orang Tua</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; font-family: monospace; color: #334155;">3515011406750001</td></tr>
      <tr><td style="font-weight: bold;">Pekerjaan</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Wiraswasta</td></tr>
      <tr><td style="font-weight: bold;">Alamat Rumah Lengkap</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Jl. Mawar No. 12, RT 01/RW 02, Kelurahan Sidokare, Sidoarjo</td></tr>
      <tr><td style="font-weight: bold;">Nomor Telepon / WhatsApp</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; font-family: monospace; color: #334155;">0813-8899-7711</td></tr>
      <tr><td style="font-weight: bold;">Orang Tua / Wali Dari Santri</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; font-weight: bold; color: #065f46;">Muhammad Bilal Al-Ghifari</td></tr>
      <tr><td style="font-weight: bold;">Tingkat Jilid / Kelas</td><td>:</td><td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Jilid 4 (Metode An-Nahdliyah) - No. Induk: 2026/001</td></tr>
    </table>

    <p style="font-size: 8.5pt; text-align: justify; margin-bottom: 10px;">
      Dengan ini menyatakan dengan sesungguhnya dan penuh kesadaran bahwa demi kelancaran pendidikan Al-Qur'an putra/putri kami di TPQ Muslimat NU AL-IKHLAS, kami berjanji dan sanggup:
    </p>

    <ol style="font-size: 8.5pt; line-height: 1.5; padding-left: 20px; text-align: justify; margin-bottom: 10px;">
      <li>Mendukung, menaati, dan mematuhi seluruh <strong>Tata Tertib Santri dan Tata Tertib Orang Tua/Wali</strong> yang telah ditetapkan oleh lembaga.</li>
      <li>Membimbing, mengulang bacaan, dan menyimak tadarus putra/putri kami di rumah setiap hari minimal 15 menit ba'da maghrib serta menandatangani kartu mutaba'ah.</li>
      <li>Membayar infaq syahriyah bulanan (SPP) secara tertib sebelum tanggal 10 setiap bulan.</li>
      <li>Mengantar dan menjemput putra/putri kami tepat pada waktu yang ditentukan demi keamanan dan ketertiban bersama.</li>
      <li>Tidak menunggui putra/putri kami di dalam ruang kelas saat kegiatan belajar mengajar berlangsung.</li>
      <li>Menghadiri setiap undangan rapat pleno, pengajian, dan pelaporan hasil belajar santri yang diselenggarakan TPQ.</li>
    </ol>

    <div class="ttd-box" style="margin-top: 25px;">
      <div class="ttd-col">
        <p>Mengetahui,<br><strong>Kepala TPQ Muslimat NU AL-IKHLAS</strong></p>
        <div class="ttd-space"></div>
        <p><strong><u>Ustadzah Hj. Siti Aminah, S.Pd.I</u></strong><br><span style="font-size: 8pt; font-family: monospace;">NIY. 19820514 201201 2 001</span></p>
      </div>
      <div class="ttd-col">
        <p>Sidoarjo, 15 Juli 2026<br>Yang Membuat Pernyataan,<br><strong>Orang Tua / Wali Santri</strong></p>
        <div class="ttd-space" style="display: flex; align-items: center; justify-content: center;">
          <div style="border: 1px solid #059669; background: #ecfdf5; color: #065f46; font-size: 7.5pt; padding: 4px 8px; border-radius: 3px; font-family: monospace; font-weight: bold;">LUNAS MATERAI<br>Rp10.000</div>
        </div>
        <p><strong><u>H. Ridwan Santoso</u></strong><br><span style="font-size: 8pt; color: #64748b;">Ketua Komite Wali Santri</span></p>
      </div>
    </div>
  </div>

  <!-- DOKUMEN 6.6: PROGRAM KERJA TAHUNAN TPQ 12 BULAN - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>MATRIKS PROGRAM KERJA TAHUNAN TPQ (12 BULAN)</h3>
      <p>TAHUN AJARAN 2026/2027 • LEMBAGA PENDIDIKAN AL-QUR'AN MUSLIMAT NU AL-IKHLAS</p>
    </div>

    <table class="data-table" style="font-size: 7.5pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 120px;">Bidang Program</th>
          <th>Rencana Kegiatan & Uraian Kerja</th>
          <th style="width: 100px;">Waktu Pelaksanaan</th>
          <th style="width: 140px;">Indikator Capaian / Target</th>
          <th style="width: 120px;">Penanggung Jawab</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-weight: bold;">Kurikulum & KBM</td>
          <td>Pelaksanaan KBM aktif CBSA & Sorogan Tartil Metode An-Nahdliyah</td>
          <td>Juli 2026 - Juni 2027</td>
          <td>95% Santri lancar membaca sesuai jilid target</td>
          <td>Koord. Kurikulum (Ustdz. Maimunah)</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-weight: bold;">Kesiswaan & PSB</td>
          <td>Penerimaan Santri Baru (PSB) & Penempatan Kelas Tingkat</td>
          <td>Juli 2026</td>
          <td>Menerima 10-15 santri baru usia dini</td>
          <td>Koord. Kesiswaan (Ustdz. Ahmad Fauzi)</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-weight: bold;">Kekhasan Aswaja</td>
          <td>Peringatan Hari Santri Nasional (HSN 22 Oktober) & Pawai Ta'aruf</td>
          <td>Oktober 2026</td>
          <td>100% Santri mengenal amaliyah & cinta ulama NU</td>
          <td>Koord. Amaliyah & Dewan Guru</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-weight: bold;">Evaluasi & Rapor</td>
          <td>Ujian Kenaikan Jilid Gelombang 1 & Pembagian Rapor Semester Ganjil</td>
          <td>Desember 2026</td>
          <td>Seluruh santri menerima laporan evaluasi tertulis</td>
          <td>Wali Kelas & Kepala TPQ</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-weight: bold;">Pembinaan Guru</td>
          <td>Pelatihan & Refreshing Metodologi Munaqisy Al-Qur'an Muslimat NU</td>
          <td>Januari 2027</td>
          <td>100% Asatidz terstandar syahadah resmi</td>
          <td>Kepala TPQ & PAC Muslimat</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td style="font-weight: bold;">Ramadhan Berkah</td>
          <td>Pondok Ramadhan, Khotmil Qur'an & Pembagian Zakat Fitrah Santri</td>
          <td>Maret 2027</td>
          <td>Penanaman kepedulian sosial & tadarus mutqin</td>
          <td>Komite Wali & Ustadzah</td>
        </tr>
        <tr>
          <td style="text-align: center;">7</td>
          <td style="font-weight: bold;">Munaqosyah Akhir</td>
          <td>Ujian Munaqosyah Terbuka Tartil, Tahfidz & Fiqih oleh Tim Cabang</td>
          <td>Mei 2027</td>
          <td>100% Santri calon wisudawan lulus standar A</td>
          <td>Tim Penguji Cabang NU</td>
        </tr>
        <tr>
          <td style="text-align: center;">8</td>
          <td style="font-weight: bold;">Haflah Wisuda</td>
          <td>Haflah Khotmil Qur'an & Wisuda Santri ke-XII serta Penyerahan Ijazah</td>
          <td>Juni 2027</td>
          <td>Santri diwisuda khidmat & siap melanjutkan ke Madin</td>
          <td>Ketua Yayasan & Komite</td>
        </tr>
      </tbody>
    </table>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 6.7: AGENDA PERSURATAN & BUKU TAMU ASESOR - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>BUKU REGISTER SURAT & BUKU TAMU VISITASI ASESOR</h3>
      <p>ADMINISTRASI KESEKRETARIATAN & SUPERVISI LEMBAGA</p>
    </div>

    <p style="font-weight: bold; font-size: 8.5pt; margin-bottom: 4px;">A. REGISTER SURAT RESMI (AGENDA MASUK & KELUAR):</p>
    <table class="data-table" style="font-size: 8pt; margin-bottom: 12px;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 70px;">Tanggal</th>
          <th style="width: 80px;">Nomor Surat</th>
          <th style="width: 130px;">Pengirim / Tujuan</th>
          <th>Perihal / Isi Ringkas Surat</th>
          <th style="width: 55px;">Disposisi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="text-align: center;">10/06/2026</td>
          <td style="font-family: monospace; font-size: 7.5pt;">012/PC-MNU/VI/26</td>
          <td>PC Muslimat NU Sidoarjo</td>
          <td>Surat Rekomendasi Akreditasi Lembaga TPQ</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Odner 1</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="text-align: center;">25/06/2026</td>
          <td style="font-family: monospace; font-size: 7.5pt;">Kd.13/PP/1420/26</td>
          <td>Kemenag Kab. Sidoarjo</td>
          <td>Pembaruan Tanda Daftar & Sinkronisasi EMIS 4.0</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Odner 1</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="text-align: center;">15/07/2026</td>
          <td style="font-family: monospace; font-size: 7.5pt;">045/TPQ-MNU/VII/26</td>
          <td>Tim Asesor BAP-TPQ</td>
          <td>Permohonan Asesmen & Visitasi Fisik Akreditasi</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">Terkirim</td>
        </tr>
      </tbody>
    </table>

    <p style="font-weight: bold; font-size: 8.5pt; margin-bottom: 4px;">B. BUKU TAMU KUNJUNGAN TIM ASESOR AKREDITASI & PEJABAT KEMENAG:</p>
    <table class="data-table" style="font-size: 8pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 80px;">Hari / Tanggal</th>
          <th style="width: 140px;">Nama Tamu & NIP</th>
          <th style="width: 130px;">Jabatan / Instansi</th>
          <th>Maksud Kunjungan & Kesan / Pesan</th>
          <th style="width: 60px;">Tanda Tangan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td>Senin, 04/08/2026</td>
          <td><strong>Drs. H. M. Sholikin, M.Pd.I</strong><br><span style="font-size: 7.5pt; font-family: monospace;">NIP. 197103121998031002</span></td>
          <td>Pengawas Pendidikan Al-Qur'an Kemenag Kab. Sidoarjo</td>
          <td>Monitoring KBM dan kelengkapan administrasi EMIS. TPQ sangat tertib, asatidz ramah, dan sarana memadai.</td>
          <td style="text-align: center; color: #059669; font-style: italic;">[Terparaf]</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td>Sabtu, 22/08/2026</td>
          <td><strong>Hj. Masruroh Wahid, S.Ag</strong></td>
          <td>Ketua PAC Muslimat NU Sidoarjo</td>
          <td>Silaturahim pembinaan amaliyah Ke-NU-an dan persiapan peringatan Hari Santri Nasional.</td>
          <td style="text-align: center; color: #059669; font-style: italic;">[Terparaf]</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td>Kamis, 15/10/2026</td>
          <td><strong>Dr. H. Sholehuddin, M.Pd.I</strong><br><span style="font-size: 7.5pt; font-family: monospace;">NIP. 196805101994031003</span></td>
          <td>Ketua Tim Asesor Akreditasi TPQ - BAP/Kemenag Prov. Jatim</td>
          <td>Visitasi lapangan, verifikasi 6 Odner fisik, observasi ruang KBM dan wawancara pengurus. Dokumen lengkap, standar terpenuhi A (Unggul).</td>
          <td style="text-align: center; color: #059669; font-style: italic;">[Terparaf]</td>
        </tr>
      </tbody>
    </table>

{ttd("Petugas Sekretariat TPQ", INST["secretary"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 6 generated successfully.")
