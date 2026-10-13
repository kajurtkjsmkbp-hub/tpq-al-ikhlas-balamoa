# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn
from build_odners_complete import INVENTARIS_LIST

def render_inv_rows():
    rows = ""
    for item in INVENTARIS_LIST:
        rows += f"""        <tr>
          <td style="text-align: center;">{item['no']}</td>
          <td style="font-family: monospace; font-size: 7.5pt; text-align: center;">{item['code']}</td>
          <td><strong>{item['name']}</strong></td>
          <td>{item['cat']}</td>
          <td style="text-align: center; font-weight: bold;">{item['qty']}</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">{item['cond']}</td>
          <td>{item['src']}</td>
          <td>{item['loc']}</td>
          <td style="text-align: center;">{item['year']}</td>
        </tr>"""
    return rows

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 5 : SARPRAS, KAS, ASWAJA & KOMITE - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#e11d48", "ODNER 5")}

  <!-- DOKUMEN 5.1: LEMBAR VERIFIKASI ASESOR & BUKU INVENTARIS SARPRAS - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>BUKU BESAR INVENTARIS BARANG & SARANA PRASARANA</h3>
      <p>ODNER 5 : STANDAR SARANA, PRASARANA, PEMBIAYAAN & KEKHASAN ASWAJA NU</p>
    </div>

    <table class="data-table" style="font-size: 8pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 110px;">Kode Inventaris</th>
          <th>Nama Barang / Aset Fisik Lembaga</th>
          <th style="width: 110px;">Kategori Aset</th>
          <th style="width: 60px;">Jumlah</th>
          <th style="width: 55px;">Kondisi</th>
          <th style="width: 125px;">Sumber Perolehan</th>
          <th style="width: 115px;">Lokasi Barang</th>
          <th style="width: 50px;">Tahun</th>
        </tr>
      </thead>
      <tbody>
{render_inv_rows()}
      </tbody>
    </table>

    <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 6px 10px; border-radius: 4px; font-size: 8pt; margin-top: 6px; display: flex; justify-content: space-between;">
      <span><strong>Status Kepemilikan Lahan & Bangunan:</strong> Tanah Hak Milik Wakaf Yayasan AL FATAH (Nomor Ikrar Wakaf: W.2/014/KUA/2018)</span>
      <span><strong>Kondisi Fasilitas Fisik:</strong> 100% Layak, Bersih, dan Berfungsi Penuh</span>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Koord. Sarana & Prasarana", INST["sarprasHead"], right_nip="NIY. 19981229 202107 2 006")}
  </div>

  <!-- DOKUMEN 5.2: BUKU KAS UMUM (BKU) OPERASIONAL TPQ - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>BUKU KAS UMUM (BKU) OPERASIONAL LEMBAGA</h3>
      <p>PERIODE: AGUSTUS - SEPTEMBER 2026 • TAHUN AJARAN 2026/2027</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 70px;">Tanggal</th>
          <th style="width: 80px;">No. Bukti</th>
          <th>Uraian Transaksi Keuangan</th>
          <th style="width: 80px;">Pemasukan (Rp)</th>
          <th style="width: 80px;">Pengeluaran (Rp)</th>
          <th style="width: 85px;">Saldo Kas (Rp)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">01/08/2026</td>
          <td style="font-family: monospace; text-align: center;">KW-08/01</td>
          <td>Penerimaan Infaq Syahriyah Bulanan (SPP) Santri</td>
          <td style="text-align: right; font-weight: bold; color: #059669;">3.600.000</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; font-weight: bold;">3.600.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">03/08/2026</td>
          <td style="font-family: monospace; text-align: center;">KW-08/02</td>
          <td>Donasi Rutin Hamba Allah via Yayasan AL FATAH</td>
          <td style="text-align: right; font-weight: bold; color: #059669;">1.500.000</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; font-weight: bold;">5.100.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">05/08/2026</td>
          <td style="font-family: monospace; text-align: center;">NT-08/01</td>
          <td>Pengadaan ATK, Kertas HVS & Tinta Spidol Whiteboard</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; color: #dc2626;">450.000</td>
          <td style="text-align: right; font-weight: bold;">4.650.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">10/08/2026</td>
          <td style="font-family: monospace; text-align: center;">NT-08/02</td>
          <td>Pembayaran Listrik PLN & Alat Sanitasi Kebersihan</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; color: #dc2626;">250.000</td>
          <td style="text-align: right; font-weight: bold;">4.400.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">15/08/2026</td>
          <td style="font-family: monospace; text-align: center;">KW-08/03</td>
          <td>Infaq Pendaftaran PSB 5 Santri Baru Semester Ganjil</td>
          <td style="text-align: right; font-weight: bold; color: #059669;">750.000</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; font-weight: bold;">5.150.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">25/08/2026</td>
          <td style="font-family: monospace; text-align: center;">KW-08/04</td>
          <td>Penyaluran Bisaroh / Insentif Ustadzah (6 Pengajar)</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; color: #dc2626;">3.000.000</td>
          <td style="text-align: right; font-weight: bold;">2.150.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">01/09/2026</td>
          <td style="font-family: monospace; text-align: center;">KW-09/01</td>
          <td>Penerimaan Infaq Syahriyah Bulanan Santri September</td>
          <td style="text-align: right; font-weight: bold; color: #059669;">3.750.000</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; font-weight: bold;">5.900.000</td>
        </tr>
        <tr>
          <td style="text-align: center;">05/09/2026</td>
          <td style="font-family: monospace; text-align: center;">NT-09/01</td>
          <td>Pengadaan 6 Map Odner Bantex Tebal & Divider Akreditasi</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; color: #dc2626;">380.000</td>
          <td style="text-align: right; font-weight: bold;">5.520.000</td>
        </tr>
      </tbody>
      <tfoot>
        <tr style="background: #f1f5f9; font-weight: bold;">
          <td colspan="3" style="text-align: center;">TOTAL KAS KELUAR & SALDO AKHIR</td>
          <td style="text-align: right; color: #059669;">9.600.000</td>
          <td style="text-align: right; color: #dc2626;">4.080.000</td>
          <td style="text-align: right; color: #1e3a8a;">Rp 5.520.000</td>
        </tr>
      </tfoot>
    </table>

{ttd("Bendahara TPQ Muslimat NU", INST["treasurer"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 5.3: ASWAJA NU & DOA QUNUT SHUBUH - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>PANDUAN KEKHASAN KE-NU-AN & AMALIYAH ASWAJA</h3>
      <p>CIRI KHAS LEMBAGA BINAAN PIMPINAN MUSLIMAT NAHDLATUL ULAMA</p>
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify; margin-bottom: 10px;">
      <p style="margin: 0 0 6px 0;"><strong>A. AMALIYAH RUTIN ASWAJA AN-NAHDLIYAH:</strong><br>
      Santri TPQ Muslimat NU AL-IKHLAS dibimbing mempraktikkan ajaran Islam moderat (Tawassuth, Tawazun, I'tidal, Tasamuh) dengan amaliyah harian:</p>
      <ol style="margin: 0 0 8px 0; padding-left: 20px;">
        <li><strong>Tawasul & Fatihah:</strong> Dihadiahkan kepada Rasulullah SAW, para sahabat, Masyayikh NU (Hadratussyaikh KH. Hasyim Asy'ari), dan muwakif.</li>
        <li><strong>Sholawat Nahdliyyah & Tibbil Qulub:</strong> Dilantunkan serentak sebelum KBM untuk memupuk mahabbah kepada Nabi Muhammad SAW.</li>
        <li><strong>Doa Qunut Shubuh:</strong> Wajib dihafal santri sebelum naik ke tingkat Al-Qur'an sesuai Fiqih Madzhab Syafi'i.</li>
        <li><strong>Peringatan Hari Santri Nasional (HSN):</strong> Pawai ta'aruf berbusana sarung dan peci hitam tradisi santri Nusantara.</li>
      </ol>

      <p style="margin: 0 0 4px 0;"><strong>B. TEKS DOA QUNUT SHUBUH (MADZHAB SYAFI'I):</strong></p>
      <div style="background: #f8fafc; border: 1.5px solid #064e3b; border-radius: 6px; padding: 10px; font-family: 'Amiri', 'Traditional Arabic', serif; font-size: 13pt; direction: rtl; text-align: right; line-height: 1.8; margin-bottom: 8px;">
        اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ، وَعَافِنِيْ فِيْمَنْ عَافَيْتَ، وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ، وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ، وَقِنِيْ شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِيْ وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ، وَصَلَّى اللهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ.
      </div>
    </div>

{ttd("Ketua PAC Muslimat NU Sidoarjo", "Hj. Mu'allimah", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 5.4: SK KOMITE WALI SANTRI & BERITA ACARA MUSYAWARAH -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SURAT KEPUTUSAN KEPALA TPQ MUSLIMAT NU AL-IKHLAS</h3>
      <p>NOMOR: 019/SK-KOM/TPQ-MNU/VII/2026</p>
    </div>

    <div style="text-align: center; font-weight: bold; font-size: 9.5pt; margin-bottom: 10px;">
      TENTANG:<br>SUSUNAN PENGURUS KOMITE WALI SANTRI TPQ MUSLIMAT NU AL-IKHLAS<br>PERIODE 2026 - 2028
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify; margin-bottom: 12px;">
      <p style="margin: 0 0 6px 0;"><strong>MENIMBANG:</strong> Bahwa untuk mempererat ukhuwah islamiyah dan keterlibatan aktif orang tua dalam peningkatan sarana, mutu, dan pengawasan KBM, dipandang perlu mengukuhkan Komite Wali Santri.</p>
      <p style="margin: 0 0 6px 0;"><strong>MEMUTUSKAN, MENETAPKAN:</strong></p>
      <p style="margin: 0 0 4px 0;"><strong>PERTAMA:</strong> Mengesahkan Susunan Pengurus Komite Wali Santri TPQ Muslimat NU AL-IKHLAS Periode 2026 - 2028 dengan susunan:</p>
      <ul style="margin: 0 0 8px 0; padding-left: 20px;">
        <li><strong>Ketua Komite:</strong> H. Ridwan Santoso (Wali dari Muhammad Bilal Al-Ghifari)</li>
        <li><strong>Sekretaris Komite:</strong> Dian Kusuma, S.Pd (Wali dari Fatimah Az-Zahra)</li>
        <li><strong>Bendahara Komite:</strong> Hj. Sholihatun Nisa (Wali dari Aisyah Nur Ramadhani)</li>
        <li><strong>Seksi Sarana & Sosial:</strong> Bambang Supriyadi (Wali dari Ibrahim Hanif)</li>
        <li><strong>Seksi Acara & PHBI:</strong> Sri Wahyuni, S.Pd (Wali dari Ahmad Zaki Mubarak)</li>
      </ul>
      <p style="margin: 0 0 4px 0;"><strong>KEDUA:</strong> Komite berfungsi sebagai mitra musyawarah, penyalur aspirasi wali santri, dan pendukung pengembangan sarana prasarana TPQ.</p>
    </div>

{ttd("Ketua Komite Wali Santri", "H. Ridwan Santoso", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 5.5: BERITA ACARA PEMERIKSAAN FISIK BANGUNAN & SANITASI -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>BERITA ACARA PEMERIKSAAN KELAYAKAN SARANA PRASARANA</h3>
      <p>NOMOR: 011/BA-SARPRAS/TPQ-MNU/VII/2026</p>
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify; margin-bottom: 12px;">
      <p style="margin: 0 0 6px 0;">Pada hari ini, Senin tanggal 15 Juli 2026, telah dilaksanakan pemeriksaan dan verifikasi fisik terhadap sarana, prasarana, gedung, sanitasi, dan lingkungan belajar TPQ Muslimat NU AL-IKHLAS dengan hasil sebagai berikut:</p>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 25px;">No</th>
            <th style="width: 140px;">Komponen Fasilitas Fisik</th>
            <th>Kondisi Nyata di Lapangan & Bukti Fisik</th>
            <th style="width: 80px;">Status Asesmen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;">1</td>
            <td><strong>Ruang Kelas & Belajar</strong></td>
            <td>3 Ruang Belajar rapi, bersih, berlantai keramik, berkarpet tebal sajadah, ventilasi udara cukup dan dilengkapi kipas angin tornado.</td>
            <td style="text-align: center; color: #059669; font-weight: bold;">Sangat Layak</td>
          </tr>
          <tr>
            <td style="text-align: center;">2</td>
            <td><strong>Tempat Wudhu & Sanitasi</strong></td>
            <td>10 titik kran wudhu stainless steel mengalir lancar, air sumur bersih dan suci mensucikan, area putra dan putri terpisah.</td>
            <td style="text-align: center; color: #059669; font-weight: bold;">Sangat Bersih</td>
          </tr>
          <tr>
            <td style="text-align: center;">3</td>
            <td><strong>Toilet & Kamar Mandi</strong></td>
            <td>2 unit toilet bersih, wangi, tertutup rapat, dilengkapi gayung, sabun cuci tangan, dan bak penampung air terkuras rutin.</td>
            <td style="text-align: center; color: #059669; font-weight: bold;">Memenuhi K3</td>
          </tr>
          <tr>
            <td style="text-align: center;">4</td>
            <td><strong>Plang Nama Lembaga</strong></td>
            <td>Plang nama permanen bahan plat seng/besi berlogo Muslimat NU dan Kemenag terpampang jelas di depan pagar gedung utama.</td>
            <td style="text-align: center; color: #059669; font-weight: bold;">Jelas & Sah</td>
          </tr>
          <tr>
            <td style="text-align: center;">5</td>
            <td><strong>Keamanan & P3K</strong></td>
            <td>Kotak P3K dinding lengkap obat luka, obat penurun demam anak, minyak kayu putih, perban steril, dan lingkungan bebas genangan.</td>
            <td style="text-align: center; color: #059669; font-weight: bold;">Standar Kemenag</td>
          </tr>
        </tbody>
      </table>
    </div>

{ttd("Petugas Pemeriksa Yayasan", "Drs. H. Ahmad Fathoni, M.Pd.I", "Koordinator Sarpras TPQ", INST["sarprasHead"], right_nip="NIY. 19981229 202107 2 006")}
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 5 generated successfully.")
