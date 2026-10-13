# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 1 : LEGALITAS & KELEMBAGAAN - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#0e6938", "ODNER 1")}

  <!-- DOKUMEN 1.1: LEMBAR VERIFIKASI ASESOR & DAFTAR ISI ODNER 1 -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>LEMBAR VERIFIKASI ASESOR & DAFTAR BUKTI FISIK</h3>
      <p>ODNER 1 : STANDAR LEGALITAS & PENGELOLAAN KELEMBAGAAN</p>
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; font-size: 8.5pt;">
      <table style="width: 100%; border: none;">
        <tr><td style="width: 130px; font-weight: bold;">Satuan Pendidikan</td><td style="width: 10px;">:</td><td style="font-weight: bold; color: #064e3b;">TPQ MUSLIMAT NU AL-IKHLAS</td><td style="width: 110px; font-weight: bold;">Nomor Statistik (NSQ)</td><td style="width: 10px;">:</td><td style="font-family: monospace;">411235150089</td></tr>
        <tr><td style="font-weight: bold;">Yayasan Pengampu</td><td>:</td><td>YAYASAN AL FATAH</td><td style="font-weight: bold;">Izin Operasional</td><td>:</td><td style="font-family: monospace;">Kd.13.15/4/PP.00.7/1420/2024</td></tr>
        <tr><td style="font-weight: bold;">Afiliasi Organisasi</td><td>:</td><td>PC Muslimat Nahdlatul Ulama Sidoarjo</td><td style="font-weight: bold;">Tahun Ajaran</td><td>:</td><td>2026 / 2027</td></tr>
      </table>
    </div>

    <p style="text-align: justify; font-size: 9pt; margin-bottom: 8px;">
      Berikut adalah daftar bukti fisik dokumen kelembagaan dan legalitas hukum penyelenggaraan <strong>TPQ Muslimat NU AL-IKHLAS</strong> yang telah disusun sistematis dalam Map Odner 1 sesuai instrumen akreditasi Kementerian Agama RI:
    </p>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30px;">No</th>
          <th style="width: 75px;">Kode Bukti</th>
          <th>Nama Dokumen Bukti Fisik Kelembagaan</th>
          <th style="width: 110px;">Status Berkas</th>
          <th style="width: 75px;">Verifikasi Asesor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.01</td>
          <td><strong>Profil Lengkap Satuan Pendidikan & Bagan Struktur Organisasi TPQ</strong></td>
          <td>Dokumen Asli Lembaga</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.02</td>
          <td><strong>Salinan Piagam Tanda Daftar & SK Izin Operasional (IJOP) Kemenag</strong></td>
          <td>SK Kemenag Legalisir</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.03</td>
          <td><strong>Akta Notaris & SK Pengesahan Kemenkumham RI Yayasan AL FATAH</strong></td>
          <td>Salinan Notaris Sah</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.04</td>
          <td><strong>Surat Keputusan (SK) Susunan Pengurus TPQ Muslimat NU AL-IKHLAS</strong></td>
          <td>SK Asli Bermaterai</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.05</td>
          <td><strong>Surat Rekomendasi Pimpinan Cabang & PAC Muslimat NU Sidoarjo</strong></td>
          <td>Surat Resmi Muslimat</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td style="font-family: monospace; text-align: center;">DOC.1.06</td>
          <td><strong>Surat Pernyataan / Pakta Integritas Kesiapan Akreditasi Bermaterai</strong></td>
          <td>Asli Materai Rp10.000</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Valid ]</td>
        </tr>
      </tbody>
    </table>

    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px; margin-top: 10px; font-size: 8.5pt;">
      <strong>Catatan Rekomendasi Tim Asesor Akreditasi:</strong><br>
      <em>"Seluruh bukti fisik legalitas kelembagaan TPQ Muslimat NU AL-IKHLAS lengkap, sah secara hukum negara dan ormas, serta terdaftar aktif di database EMIS 4.0 Kementerian Agama RI."</em>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 1.2: PROFIL LEMBAGA, VISI MISI & STRUKTUR ORGANISASI -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>PROFIL SATUAN PENDIDIKAN & STRUKTUR ORGANISASI</h3>
      <p>TAHUN AJARAN 2026 / 2027</p>
    </div>

    <div style="font-size: 9pt; line-height: 1.5; text-align: justify; margin-bottom: 12px;">
      <p style="margin: 0 0 6px 0;"><strong>A. SEJARAH SINGKAT BERDIRI:</strong><br>
      TPQ Muslimat NU AL-IKHLAS didirikan pada tanggal 14 Juli 2012 atas inisiasi para tokoh Muslimat Nahdlatul Ulama bersama Pengurus Yayasan AL FATAH Kelurahan Sidokare, Kecamatan Sidoarjo. Lembaga ini didirikan untuk menjawab kebutuhan masyarakat akan pendidikan Al-Qur'an sejak usia dini yang berfokus pada ketepatan makhraj, tartil bertajwid, dan penanaman akidah Ahlussunnah wal Jama'ah An-Nahdliyah.</p>

      <p style="margin: 0 0 6px 0;"><strong>B. VISI LEMBAGA:</strong><br>
      <em>"Terwujudnya Generasi Qur'ani yang Fasih Membaca, Berakhlakul Karimah, Unggul dalam Prestasi, dan Berpegang Teguh pada Nilai-Nilai Islam Ahlussunnah Wal Jama'ah An-Nahdliyah."</em></p>

      <p style="margin: 0 0 8px 0;"><strong>C. MISI LEMBAGA:</strong></p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li>Menyelenggarakan pembelajaran baca tulis Al-Qur'an yang fashih dan tartil dengan metode berstandar syahadah.</li>
        <li>Membimbing hafalan surat-surat pendek (Juz 'Amma), ayat pilihan, doa keseharian, dan bacaan sholat fardhu.</li>
        <li>Menanamkan karakter adab santri terhadap Al-Qur'an, orang tua, guru, dan sesama umat.</li>
        <li>Membiasakan amaliyah tradisi Nahdlatul Ulama: tahlil, sholawat nahdliyyah, doa qunut shubuh, dan ziarah kubur.</li>
      </ol>
    </div>

    <div style="border: 1.5px solid #0f172a; border-radius: 8px; padding: 10px; margin-top: 8px;">
      <div style="text-align: center; font-weight: bold; font-size: 9.5pt; margin-bottom: 8px; color: #064e3b; text-transform: uppercase;">
        BAGAN STRUKTUR ORGANISASI TPQ MUSLIMAT NU AL-IKHLAS
      </div>
      
      <div style="text-align: center; margin-bottom: 6px;">
        <span style="border: 1px solid #1e293b; padding: 4px 10px; background: #f8fafc; font-weight: bold; font-size: 8.5pt;">
          Dewan Pembina: Drs. H. Ahmad Fathoni, M.Pd.I (Ketua Yayasan AL FATAH)
        </span>
      </div>
      <div style="text-align: center; margin-bottom: 6px;">&darr;</div>
      <div style="text-align: center; margin-bottom: 6px;">
        <span style="border: 1.5px solid #064e3b; padding: 5px 12px; background: #ecfdf5; font-weight: bold; font-size: 9pt; color: #064e3b;">
          Kepala TPQ: Ustadzah Hj. Siti Aminah, S.Pd.I
        </span>
      </div>
      <div style="text-align: center; margin-bottom: 6px;">&darr;</div>

      <div style="display: flex; justify-content: space-around; font-size: 8pt; margin-bottom: 8px;">
        <div style="border: 1px solid #cbd5e1; padding: 4px 8px; background: #fff; text-align: center; width: 45%;">
          <strong>Sekretaris:</strong><br>Ustadzah Nurul Hidayati, S.Pd
        </div>
        <div style="border: 1px solid #cbd5e1; padding: 4px 8px; background: #fff; text-align: center; width: 45%;">
          <strong>Bendahara:</strong><br>Ustadzah Fatimatuz Zahro, S.Pd
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 8pt;">
        <div style="border: 1px solid #cbd5e1; padding: 4px 6px; background: #fff; text-align: center; width: 31%;">
          <strong>Koord. Kurikulum:</strong><br>Ustadzah Maimunah, S.Ag
        </div>
        <div style="border: 1px solid #cbd5e1; padding: 4px 6px; background: #fff; text-align: center; width: 31%;">
          <strong>Koord. Kesiswaan:</strong><br>Ustadz Ahmad Fauzi, S.Pd
        </div>
        <div style="border: 1px solid #cbd5e1; padding: 4px 6px; background: #fff; text-align: center; width: 31%;">
          <strong>Koord. Sarpras:</strong><br>Ustadzah Siti Rokhmah, A.Ma
        </div>
      </div>
    </div>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 1.3: SURAT KEPUTUSAN (SK) PENGURUS DARI YAYASAN -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SURAT KEPUTUSAN KETUA YAYASAN AL FATAH</h3>
      <p>NOMOR: 014/SK/YAF-TPQ/VII/2026</p>
    </div>

    <div style="text-align: center; font-weight: bold; font-size: 9.5pt; margin-bottom: 10px;">
      TENTANG:<br>PENGANGKATAN PENGURUS TAMAN PENDIDIKAN AL-QUR'AN (TPQ)<br>MUSLIMAT NU AL-IKHLAS MASA KHIDMAH 2024 - 2029
    </div>

    <div style="font-size: 8.5pt; line-height: 1.45; text-align: justify; margin-bottom: 10px;">
      <p style="margin: 0 0 4px 0;"><strong>MENIMBANG:</strong></p>
      <ol style="margin: 0 0 6px 0; padding-left: 20px;">
        <li>Bahwa untuk menjamin kelancaran, ketertiban, dan mutu pendidikan Al-Qur'an pada TPQ Muslimat NU AL-IKHLAS, dipandang perlu menetapkan susunan pengurus definitif;</li>
        <li>Bahwa nama-nama yang tercantum dalam surat keputusan ini dipandang cakap, amanah, dan memenuhi kualifikasi mengajar Al-Qur'an;</li>
        <li>Bahwa berdasarkan pertimbangan huruf a dan b, perlu ditetapkan dengan Surat Keputusan Ketua Yayasan AL FATAH.</li>
      </ol>

      <p style="margin: 0 0 4px 0;"><strong>MENGINGAT:</strong></p>
      <ol style="margin: 0 0 6px 0; padding-left: 20px;">
        <li>Akta Notaris Pendirian Yayasan AL FATAH No. 12 Tahun 2018 dan Keputusan Kemenkumham RI No. AHU-0014285.AH.01.04.Tahun 2018;</li>
        <li>Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI No. 91 Tahun 2020 tentang Petunjuk Teknis Penyelenggaraan Pendidikan Al-Qur'an;</li>
        <li>Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Muslimat Nahdlatul Ulama;</li>
        <li>Hasil Rapat Pleno Yayasan AL FATAH dan PAC Muslimat NU Sidoarjo tanggal 10 Juli 2024.</li>
      </ol>

      <p style="margin: 0 0 4px 0;"><strong>MEMUTUSKAN:</strong></p>
      <p style="margin: 0 0 2px 0;"><strong>MENETAPKAN:</strong></p>
      <p style="margin: 0 0 3px 0;"><strong>PERTAMA:</strong> Mengangkat Susunan Pengurus TPQ Muslimat NU AL-IKHLAS Masa Khidmah 2024 - 2029 dengan susunan sebagaimana tercantum: Kepala TPQ: Ustadzah Hj. Siti Aminah, S.Pd.I; Sekretaris: Ustadzah Nurul Hidayati, S.Pd; Bendahara: Ustadzah Fatimatuz Zahro, S.Pd; Koord. Kurikulum: Ustadzah Maimunah, S.Ag; Koord. Kesiswaan: Ustadz Ahmad Fauzi, S.Pd; Koord. Sarpras: Ustadzah Siti Rokhmah, A.Ma.</p>
      <p style="margin: 0 0 3px 0;"><strong>KEDUA:</strong> Menugaskan pengurus terlantik untuk mengelola administrasi, kurikulum, dan pembelajaran santri secara istiqomah berhaluan Islam Ahlussunnah wal Jama'ah An-Nahdliyah.</p>
      <p style="margin: 0 0 3px 0;"><strong>KETIGA:</strong> Keputusan ini berlaku sejak tanggal ditetapkan hingga 14 Juli 2029.</p>
    </div>

{ttd("Ketua PAC Muslimat NU Sidoarjo", "Hj. Mu'allimah", "Ketua Yayasan AL FATAH", INST["headFoundation"])}
  </div>

  <!-- DOKUMEN 1.4: SURAT PERNYATAAN / PAKTA INTEGRITAS BERMATERAI -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SURAT PERNYATAAN / PAKTA INTEGRITAS</h3>
      <p>KESIAPAN PENILAIAN & VISITASI AKREDITASI LEMBAGA</p>
    </div>

    <p style="font-size: 9pt; margin-bottom: 8px;">Yang bertanda tangan di bawah ini:</p>
    <table style="width: 100%; font-size: 9pt; line-height: 1.6; margin-bottom: 12px;">
      <tr><td style="width: 160px; font-weight: bold;">Nama Lengkap</td><td style="width: 15px;">:</td><td><strong>Ustadzah Hj. Siti Aminah, S.Pd.I</strong></td></tr>
      <tr><td style="font-weight: bold;">Nomor Induk Yayasan (NIY)</td><td>:</td><td style="font-family: monospace;">19820514 201201 2 001</td></tr>
      <tr><td style="font-weight: bold;">Jabatan</td><td>:</td><td>Kepala TPQ Muslimat NU AL-IKHLAS</td></tr>
      <tr><td style="font-weight: bold;">Nama Satuan Pendidikan</td><td>:</td><td style="font-weight: bold; color: #064e3b;">TPQ MUSLIMAT NU AL-IKHLAS</td></tr>
      <tr><td style="font-weight: bold;">Lembaga Penyelenggara</td><td>:</td><td>YAYASAN AL FATAH</td></tr>
      <tr><td style="font-weight: bold;">Nomor Statistik (NSQ)</td><td>:</td><td style="font-family: monospace;">411235150089</td></tr>
      <tr><td style="font-weight: bold;">Nomor SK IJOP Kemenag</td><td>:</td><td style="font-family: monospace;">Kd.13.15/4/PP.00.7/1420/2024</td></tr>
      <tr><td style="font-weight: bold;">Alamat Lembaga</td><td>:</td><td>Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Sidoarjo</td></tr>
    </table>

    <p style="font-size: 9pt; text-align: justify; margin-bottom: 10px;">
      Dengan ini menyatakan dengan penuh kesadaran dan rasa tanggung jawab dalam rangka akreditasi lembaga:
    </p>

    <ol style="font-size: 8.5pt; line-height: 1.5; padding-left: 20px; margin-bottom: 12px; text-align: justify;">
      <li>Seluruh data profil lembaga, rekapitulasi santri, data dewan asatidz, kurikulum, dan laporan keuangan yang tercantum dalam 6 Odner Portofolio Akreditasi adalah <strong>benar, sah, dan sesuai dengan fakta fisik di lapangan</strong>.</li>
      <li>Tidak melakukan rekayasa, pemalsuan dokumen, maupun manipulasi data kualifikasi syahadah pengajar demi kepentingan perolehan nilai akreditasi semata.</li>
      <li>Lembaga siap menerima Tim Asesor Akreditasi untuk melaksanakan visitasi fisik, observasi KBM kelas, serta wawancara komite dan santri.</li>
      <li>Berkomitmen teguh untuk terus mengamalkan dan mengajarkan Al-Qur'an dengan manhaj Islam Ahlussunnah wal Jama'ah An-Nahdliyah demi melahirkan generasi sholeh-sholehah dan cinta NKRI.</li>
    </ol>

    <p style="font-size: 9pt; text-align: justify;">
      Demikian Pakta Integritas ini dibuat dengan sebenarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.
    </p>

    <div class="ttd-box" style="margin-top: 25px;">
      <div class="ttd-col">
        <p>Mengetahui dan Menyetujui,<br><strong>Ketua Yayasan AL FATAH</strong></p>
        <div class="ttd-space" style="display: flex; align-items: center; justify-content: center;">
          <div style="border: 1px solid #059669; color: #065f46; font-size: 7.5pt; padding: 2px 6px; border-radius: 3px; font-weight: bold;">Cap Stempel Yayasan</div>
        </div>
        <p><strong><u>Drs. H. Ahmad Fathoni, M.Pd.I</u></strong></p>
      </div>
      <div class="ttd-col">
        <p>Sidoarjo, 15 Juli 2026<br><strong>Kepala TPQ Muslimat NU AL-IKHLAS</strong></p>
        <div class="ttd-space" style="display: flex; align-items: center; justify-content: center;">
          <div style="border: 1px solid #059669; background: #ecfdf5; color: #065f46; font-size: 7.5pt; padding: 4px 8px; border-radius: 3px; font-family: monospace; font-weight: bold;">LUNAS MATERAI<br>Rp10.000</div>
        </div>
        <p><strong><u>Ustadzah Hj. Siti Aminah, S.Pd.I</u></strong><br><span style="font-size: 8pt; font-family: monospace;">NIY. 19820514 201201 2 001</span></p>
      </div>
    </div>
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 1 generated successfully.")
