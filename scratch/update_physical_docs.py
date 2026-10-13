import os, re

files = [
    'dokumen_cetak_fisik/00_COVER_DAN_LABEL_PUNGGUNG_ODNER_1_SD_5.html',
    'dokumen_cetak_fisik/01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html',
    'dokumen_cetak_fisik/02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html',
    'dokumen_cetak_fisik/03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html',
    'dokumen_cetak_fisik/04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html',
    'dokumen_cetak_fisik/05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html',
    'dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html'
]

# Standard replacements across all files
common_replacements = [
    # Full addresses
    ('Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sukamaju, Kec. Harapan, Kab. Berkah, Jawa Timur',
     'Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Kec. Sidoarjo, Kab. Sidoarjo, Jawa Timur (Kode Pos 61214) | Telp: (031) 8945672 / 0812-3245-8891'),
    ('Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sukamaju, Harapan, Kab. Berkah, Jawa Timur',
     'Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Sidoarjo, Kab. Sidoarjo, Jawa Timur (Kode Pos 61214)'),
    ('Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sukamaju, Harapan, Kab. Berkah',
     'Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Sidoarjo, Kab. Sidoarjo'),
    ('Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sukamaju, Kec. Harapan, Kab. Berkah',
     'Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Kec. Sidoarjo, Kab. Sidoarjo'),
    
    # Specific street
    ('Dusun Sukamaju RT 02/RW 01', 'Jl. Mojopahit No. 88 RT 02/RW 01, Sidokare'),
    
    # Dates and Cities
    ('Kabupaten Berkah, 15 Juli 2026', 'Sidoarjo, 15 Juli 2026'),
    ('Berkah, 15 Juli 2026', 'Sidoarjo, 15 Juli 2026'),
    ('Ditetapkan di: Kabupaten Berkah', 'Ditetapkan di: Sidoarjo'),
    ('Ditetapkan di: Berkah, 15 Juli 2026', 'Ditetapkan di: Sidoarjo, 15 Juli 2026'),
    
    # Organizations
    ('Kemenag Kab. Berkah', 'Kemenag Kab. Sidoarjo'),
    ('PAC Muslimat NU Harapan', 'PAC Muslimat NU Sidoarjo'),
    ('PC Muslimat NU Berkah', 'PC Muslimat NU Sidoarjo'),
    ('Pengawas Pendidikan Al-Qur\'an Kemenag Kab. Berkah', 'Pengawas Pendidikan Al-Qur\'an Kemenag Kab. Sidoarjo'),
    ('Ketua PAC Muslimat NU Harapan', 'Ketua PAC Muslimat NU Sidoarjo'),
    ('Kecamatan Harapan', 'Kecamatan Sidoarjo'),
    ('Desa Sukamaju', 'Kelurahan Sidokare'),
    ('Kelurahan Sukamaju', 'Kelurahan Sidokare'),
    ('Kabupaten Berkah', 'Kabupaten Sidoarjo'),
    ('Kab. Berkah', 'Kab. Sidoarjo'),
    ('di Berkah', 'di Sidoarjo')
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f'File not found: {filepath}')
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for old, new in common_replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed common replacements for: {filepath}')

# Now handle 06_ODNER specific replacements
odner6 = 'dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html'
with open(odner6, 'r', encoding='utf-8') as f:
    text6 = f.read()

# Replace sheet 4 table dots
table_dots_old = '''    <table style="width: 100%; font-size: 9.5pt; margin-bottom: 12px; line-height: 1.6;">
      <tr>
        <td style="width: 170px; font-weight: bold;">Nama Lengkap Orang Tua/Wali</td>
        <td style="width: 15px;">:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">NIK KTP Orang Tua</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Pekerjaan</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Alamat Rumah Lengkap</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Nomor Telepon / WhatsApp</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Orang Tua / Wali Dari Santri</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000; font-weight: bold;">........................................................................................................................</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Tingkat Jilid / Kelas</td>
        <td>:</td>
        <td style="border-bottom: 1px dotted #000;">........................................................................................................................</td>
      </tr>
    </table>'''

table_dots_new = '''    <table style="width: 100%; font-size: 9.5pt; margin-bottom: 12px; line-height: 1.6;">
      <tr>
        <td style="width: 170px; font-weight: bold;">Nama Lengkap Orang Tua/Wali</td>
        <td style="width: 15px;">:</td>
        <td style="border-bottom: 1px solid #cbd5e1; font-weight: bold; color: #0f172a;">H. Ridwan Santoso</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">NIK KTP Orang Tua</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; font-family: monospace; color: #334155;">3515011406750001</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Pekerjaan</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Wiraswasta</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Alamat Rumah Lengkap</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Jl. Mawar No. 12, RT 01/RW 02, Kelurahan Sidokare, Sidoarjo</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Nomor Telepon / WhatsApp</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; font-family: monospace; color: #334155;">0813-8899-7711</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Orang Tua / Wali Dari Santri</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; font-weight: bold; color: #065f46;">Muhammad Bilal Al-Ghifari</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Tingkat Jilid / Kelas</td>
        <td>:</td>
        <td style="border-bottom: 1px solid #cbd5e1; color: #334155;">Jilid 4 (Metode An-Nahdliyah) - No. Induk: 2026/001</td>
      </tr>
    </table>'''

text6 = text6.replace(table_dots_old, table_dots_new)

# Replace sheet 4 signature dots
ttd_wali_old = '''      <div class="ttd-col">
        <p>Berkah, ............................................ 2026<br>Yang Membuat Pernyataan,<br>Orang Tua / Wali Santri</p>
        <div class="ttd-space" style="display: flex; align-items: center; justify-content: center; font-size: 8pt; color: #64748b; border: 1px dashed #cbd5e1; width: 80px; margin: 4px auto 0 auto; height: 42px;">Materai 10.000</div>
        <p><strong>( <u>............................................................</u> )</strong></p>
      </div>'''

ttd_wali_new = '''      <div class="ttd-col">
        <p>Sidoarjo, 15 Juli 2026<br>Yang Membuat Pernyataan,<br>Orang Tua / Wali Santri</p>
        <div class="ttd-space" style="display: flex; align-items: center; justify-content: center; font-size: 7.5pt; font-family: monospace; color: #065f46; border: 1px solid #059669; background: #ecfdf5; width: 95px; margin: 4px auto 0 auto; height: 38px; border-radius: 3px;">LUNAS MATERAI<br>Rp10.000</div>
        <p><strong><u>H. Ridwan Santoso</u></strong><br><span style="font-size: 8pt; color: #64748b;">Ketua Komite Wali Santri</span></p>
      </div>'''

text6 = text6.replace(ttd_wali_old, ttd_wali_new)

# Replace row 3 in guest book
row3_guest_old = '''        <tr>
          <td style="text-align: center;">3</td>
          <td>..........................</td>
          <td>.......................................................</td>
          <td>Tim Asesor Akreditasi TPQ</td>
          <td>Visitasi lapangan asesmen kelayakan akreditasi TPQ Muslimat NU AL-IKHLAS tahun 2026.</td>
          <td style="text-align: center;">..............</td>
        </tr>'''

row3_guest_new = '''        <tr>
          <td style="text-align: center;">3</td>
          <td>Kamis, 15/10/2026</td>
          <td><strong>Dr. H. Sholehuddin, M.Pd.I</strong><br><span style="font-size: 7.5pt; font-family: monospace;">NIP. 196805101994031003</span></td>
          <td>Ketua Tim Asesor Akreditasi TPQ - BAP/Kemenag Prov. Jatim</td>
          <td>Visitasi lapangan, verifikasi 6 Odner fisik, observasi ruang KBM dan wawancara pengurus. Dokumen lengkap, standar terpenuhi A (Unggul).</td>
          <td style="text-align: center; font-style: italic; color: #059669;">[Terparaf]</td>
        </tr>'''

text6 = text6.replace(row3_guest_old, row3_guest_new)

with open(odner6, 'w', encoding='utf-8') as f:
    f.write(text6)
print(f'Finished specific replacements for {odner6}')
