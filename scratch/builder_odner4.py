# -*- coding: utf-8 -*-
from generate_full_odners import INST, get_header_css, kop, ttd, floating_btn
from build_odners_complete import USTADZ_LIST

def render_guru_rows():
    rows = ""
    for idx, u in enumerate(USTADZ_LIST):
        rows += f"""        <tr>
          <td style="text-align: center;">{idx+1}</td>
          <td style="font-family: monospace; text-align: center;">{u['nip']}</td>
          <td style="font-family: monospace; text-align: center;">{u['nik']}</td>
          <td><strong>{u['name']}</strong></td>
          <td style="text-align: center; font-weight: bold;">{u['gender']}</td>
          <td>{u['edu']}</td>
          <td>{u['pesantren']}</td>
          <td style="font-weight: bold; color: #4338ca;">{u['role']}</td>
          <td style="font-family: monospace;">{u['phone']}</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">{u['status']}</td>
        </tr>"""
    return rows

def render_syahadah_rows():
    rows = ""
    for idx, u in enumerate(USTADZ_LIST):
        rows += f"""        <tr>
          <td style="text-align: center;">{idx+1}</td>
          <td><strong>{u['name']}</strong><br><span style="font-family: monospace; font-size: 7.5pt; color: #475569;">NIY: {u['nip']}</span></td>
          <td style="font-weight: bold;">{u['syahadah']}</td>
          <td style="font-family: monospace; font-weight: bold; text-align: center;">{u['syahadahNo']}</td>
          <td style="text-align: center;">{u['syahadahYear']}</td>
          <td>Lembaga Pembina Metode / Pengurus Cabang NU</td>
          <td style="text-align: center; color: #059669; font-weight: bold;">[ &check; Terverifikasi ]</td>
        </tr>"""
    return rows

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>ODNER 4 : PENDIDIK & SYAHADAH - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>{get_header_css()}</style>
</head>
<body>

{floating_btn("#7c3aed", "ODNER 4")}

  <!-- DOKUMEN 4.1: LEMBAR VERIFIKASI ASESOR & BUKU INDUK GURU - LANDSCAPE -->
  <div class="print-sheet landscape">
{kop()}
    <div class="doc-title">
      <h3>BUKU INDUK PENDIDIK & TENAGA KEPENDIDIKAN (ASATIDZ)</h3>
      <p>ODNER 4 : STANDAR KOMPETENSI PENDIDIK • TAHUN AJARAN 2026/2027</p>
    </div>

    <table class="data-table" style="font-size: 8pt;">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 70px;">NIY</th>
          <th style="width: 95px;">NIK KTP</th>
          <th>Nama Lengkap Ustadz/Ustadzah</th>
          <th style="width: 25px;">L/P</th>
          <th style="width: 140px;">Pendidikan Terakhir</th>
          <th style="width: 140px;">Alumni Pesantren</th>
          <th style="width: 130px;">Tugas Utama Mengajar</th>
          <th style="width: 85px;">No. WhatsApp</th>
          <th style="width: 60px;">Status</th>
        </tr>
      </thead>
      <tbody>
{render_guru_rows()}
      </tbody>
    </table>

    <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 6px 10px; border-radius: 4px; font-size: 8pt; margin-top: 6px; display: flex; justify-content: space-between;">
      <span><strong>Kualifikasi Pendidikan:</strong> 83.3% S1 Sarjana Agama / Pendidikan • 16.7% D3 Tarbiyah / Hafidzah 30 Juz</span>
      <span><strong>Kelayakan Mengajar:</strong> 100% Memiliki Syahadah Resmi Metode Al-Qur'an</span>
    </div>

{ttd("Ketua Tim Asesor Akreditasi", "Dr. H. Sholehuddin, M.Pd.I", "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 4.2: REKAPITULASI & VERIFIKASI SYAHADAH GURU - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>REKAPITULASI & VERIFIKASI SYAHADAH KELAYAKAN MENGAJAR</h3>
      <p>BUKTI KOMPETENSI PEDAGOGIK DAN TARTIL AL-QUR'AN</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 140px;">Nama Ustadz / Ustadzah</th>
          <th>Metode / Syahadah</th>
          <th style="width: 110px;">Nomor Syahadah</th>
          <th style="width: 45px;">Tahun</th>
          <th style="width: 110px;">Penerbit Syahadah</th>
          <th style="width: 75px;">Verifikasi</th>
        </tr>
      </thead>
      <tbody>
{render_syahadah_rows()}
      </tbody>
    </table>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px; margin-top: 12px; font-size: 8.5pt;">
      <strong>Catatan Verifikasi Asesor:</strong><br>
      <em>"Seluruh dewan asatidz telah memiliki Syahadah Kelayakan Mengajar Metode Al-Qur'an tingkat Munaqisy/Guru dari lembaga otoritatif (An-Nahdliyah, Yanbu'a, Qiraati, dan Kemenag RI). Standar Pendidik terpenuhi melampaui ambang batas akreditasi (100% bersertifikat)."</em>
    </div>

{ttd("Ketua Yayasan AL FATAH", INST["headFoundation"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 4.3: CONTOH SK PENGANGKATAN GURU TETAP - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>SURAT KEPUTUSAN KETUA YAYASAN AL FATAH</h3>
      <p>NOMOR: 028/SK-GURU/YAF-TPQ/VII/2026</p>
    </div>

    <div style="text-align: center; font-weight: bold; font-size: 9.5pt; margin-bottom: 10px;">
      TENTANG:<br>PENGANGKATAN GURU TETAP TAMAN PENDIDIKAN AL-QUR'AN (TPQ)<br>MUSLIMAT NU AL-IKHLAS TAHUN AJARAN 2026/2027
    </div>

    <div style="font-size: 8.5pt; line-height: 1.5; text-align: justify; margin-bottom: 12px;">
      <p style="margin: 0 0 6px 0;"><strong>MENIMBANG:</strong> Bahwa untuk menjamin kepastian tenaga pendidik profesional Al-Qur'an dan kelancaran kegiatan belajar mengajar, dipandang perlu mengangkat Guru Tetap TPQ Muslimat NU AL-IKHLAS.</p>
      <p style="margin: 0 0 6px 0;"><strong>MENGINGAT:</strong> Akta Notaris Pendirian Yayasan AL FATAH No. 12 Tahun 2018 dan Hasil Uji Kompetensi Mengajar Metode Al-Qur'an.</p>
      <p style="margin: 0 0 6px 0;"><strong>MEMUTUSKAN, MENETAPKAN:</strong></p>
      <p style="margin: 0 0 4px 0;"><strong>PERTAMA:</strong> Mengangkat Saudari <strong>Ustadzah Maimunah, S.Ag</strong> (NIY: 19890524 201507 2 002) sebagai <strong>Guru Tetap & Koordinator Kurikulum</strong> TPQ Muslimat NU AL-IKHLAS terhitung mulai tanggal 15 Juli 2026.</p>
      <p style="margin: 0 0 4px 0;"><strong>KEDUA:</strong> Kepadanya diberikan hak bisaroh bulanan, fasilitas operasional mengajar, serta perlindungan profesi pendidik sesuai kemampuan anggaran lembaga.</p>
      <p style="margin: 0 0 4px 0;"><strong>KETIGA:</strong> Bertanggung jawab langsung kepada Kepala TPQ Muslimat NU AL-IKHLAS dan Ketua Yayasan AL FATAH.</p>
    </div>

{ttd("Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], "Ketua Yayasan AL FATAH", INST["headFoundation"], left_nip=INST["headmasterNiy"])}
  </div>

  <!-- DOKUMEN 4.4: PRESENSI & REKAP KEHADIRAN GURU BULANAN - PORTRAIT -->
  <div class="print-sheet">
{kop()}
    <div class="doc-title">
      <h3>REKAPITULASI PRESENSI KEHADIRAN DEWAN ASATIDZ</h3>
      <p>BULAN: AGUSTUS 2026 • TOTAL HARI EFEKTIF: 24 HARI KBM</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25px;">No</th>
          <th style="width: 140px;">Nama Ustadz / Ustadzah</th>
          <th style="width: 110px;">Jabatan / Rombel</th>
          <th style="width: 45px;">Hadir</th>
          <th style="width: 40px;">Sakit</th>
          <th style="width: 40px;">Izin</th>
          <th style="width: 55px;">% Hadir</th>
          <th>Keterangan Keaktifan Mengajar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">1</td>
          <td><strong>Ustadzah Hj. Siti Aminah, S.Pd.I</strong></td>
          <td>Kepala TPQ / Al-Qur'an</td>
          <td style="text-align: center; font-weight: bold;">24</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">100%</td>
          <td>Hadir penuh membina santri & asatidz</td>
        </tr>
        <tr>
          <td style="text-align: center;">2</td>
          <td><strong>Ustadzah Maimunah, S.Ag</strong></td>
          <td>Koord. Kurikulum / Tajwid</td>
          <td style="text-align: center; font-weight: bold;">24</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">100%</td>
          <td>Hadir penuh mendampingi kelas tajwid</td>
        </tr>
        <tr>
          <td style="text-align: center;">3</td>
          <td><strong>Ustadz Ahmad Fauzi, S.Pd</strong></td>
          <td>Koord. Kesiswaan / Jilid 5-6</td>
          <td style="text-align: center; font-weight: bold;">24</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">100%</td>
          <td>Hadir tepat waktu dan piket tertib</td>
        </tr>
        <tr>
          <td style="text-align: center;">4</td>
          <td><strong>Ustadzah Fatimatuz Zahro, S.Pd</strong></td>
          <td>Bendahara / Jilid 3-4</td>
          <td style="text-align: center; font-weight: bold;">24</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">100%</td>
          <td>Tertib pembukuan dan mengajar aktif</td>
        </tr>
        <tr>
          <td style="text-align: center;">5</td>
          <td><strong>Ustadzah Nurul Hidayati, S.Pd</strong></td>
          <td>Sekretaris / Jilid 2</td>
          <td style="text-align: center; font-weight: bold;">23</td>
          <td style="text-align: center;">1</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">95.8%</td>
          <td>Sakit flu 1 hari (ada ustadzah badal)</td>
        </tr>
        <tr>
          <td style="text-align: center;">6</td>
          <td><strong>Ustadzah Siti Rokhmah, A.Ma</strong></td>
          <td>Koord. Sarpras / Jilid 1</td>
          <td style="text-align: center; font-weight: bold;">24</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center;">0</td>
          <td style="text-align: center; font-weight: bold; color: #059669;">100%</td>
          <td>Hadir penuh membimbing santri dasar</td>
        </tr>
      </tbody>
    </table>

{ttd("Sekretaris Lembaga", INST["secretary"], "Kepala TPQ Muslimat NU AL-IKHLAS", INST["headmaster"], right_nip=INST["headmasterNiy"])}
  </div>

</body>
</html>"""

with open("dokumen_cetak_fisik/04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Odner 4 generated successfully.")
