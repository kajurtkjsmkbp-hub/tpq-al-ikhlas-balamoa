import re
import os

files = [
    ("dokumen_cetak_fisik/00_COVER_DAN_LABEL_PUNGGUNG_ODNER_1_SD_6.html", "COVER & LABEL PUNGGUNG (BOX 1 - 6)"),
    ("dokumen_cetak_fisik/01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html", "ODNER 1: LEGALITAS & KELEMBAGAAN"),
    ("dokumen_cetak_fisik/02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html", "ODNER 2: KURIKULUM & PEMBELAJARAN"),
    ("dokumen_cetak_fisik/03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html", "ODNER 3: KESISWAAN & BUKU INDUK SANTRI"),
    ("dokumen_cetak_fisik/04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html", "ODNER 4: GURU USTADZAH & SYAHADAH"),
    ("dokumen_cetak_fisik/05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html", "ODNER 5: SARPRAS, KAS, ASWAJA & KOMITE"),
    ("dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html", "ODNER 6: TATA TERTIB, SOP & PROGRAM KERJA TAHUNAN")
]

sections_html = []

for filepath, title in files:
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Extract everything inside <body> except the floating print button
    body_match = re.search(r"<body[^>]*>(.*?)</body>", html, re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1)
        # Remove the floating print button
        body_content = re.sub(r'<!-- Floating Print Button -->.*?</div>\s*</div>', '', body_content, flags=re.DOTALL)
        body_content = re.sub(r'<div class="no-print".*?</div>\s*</div>', '', body_content, flags=re.DOTALL)
        
        section_wrapped = f"""
<!-- ============================================================== -->
<!-- SECTION: {title} -->
<!-- ============================================================== -->
<div id="{filepath.split('/')[-1].replace('.html', '')}" class="odner-section-wrapper">
  {body_content}
</div>
"""
        sections_html.append(section_wrapped)
    else:
        print(f"Failed to find body in {filepath}")

master_template = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>PAKET LENGKAP SEMUA BUKTI FISIK DOKUMEN AKREDITASI - TPQ MUSLIMAT NU AL-IKHLAS</title>
  <style>
    @page {{
      size: A4;
      margin: 12mm;
    }}
    @page landscape-section {{
      size: A4 landscape;
      margin: 10mm;
    }}
    body {{
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
      padding: 0;
      background: #0f172a;
      color: #000;
      font-size: 11pt;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    /* Screen Navigation Bar */
    .screen-header {{
      background: linear-gradient(135deg, #0e6938 0%, #064e3b 100%);
      color: white;
      padding: 16px 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 3px solid #fbbf24;
    }}

    .screen-header h1 {{
      font-size: 15pt;
      margin: 0;
      font-weight: 800;
      letter-spacing: -0.5px;
    }}

    .screen-header p {{
      margin: 3px 0 0 0;
      font-size: 9.5pt;
      color: #d1fae5;
    }}

    .header-actions {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }}

    .btn-print-master {{
      background: #fbbf24;
      color: #0f172a;
      font-weight: 800;
      font-size: 11pt;
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      transition: all 0.2s;
    }}
    .btn-print-master:hover {{
      background: #f59e0b;
      transform: translateY(-1px);
    }}

    .btn-back {{
      background: rgba(255,255,255,0.15);
      color: white;
      font-weight: 600;
      font-size: 9.5pt;
      padding: 10px 16px;
      border-radius: 8px;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.3);
      transition: all 0.2s;
    }}
    .btn-back:hover {{
      background: rgba(255,255,255,0.25);
    }}

    .quick-jump-bar {{
      background: #1e293b;
      padding: 10px 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      border-bottom: 1px solid #334155;
    }}
    .jump-link {{
      color: #94a3b8;
      font-size: 9pt;
      font-weight: 600;
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      background: #334155;
      transition: all 0.15s;
    }}
    .jump-link:hover {{
      color: white;
      background: #0e6938;
    }}

    /* Paper Sheets */
    .print-sheet {{
      background: white;
      width: 210mm;
      min-height: 297mm;
      margin: 20px auto;
      padding: 15mm;
      box-sizing: border-box;
      box-shadow: 0 8px 30px rgba(0,0,0,0.35);
      page-break-after: always;
      position: relative;
    }}

    /* Landscape sheets */
    .print-sheet-landscape,
    #03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI .print-sheet {{
      width: 297mm !important;
      min-height: 210mm !important;
      padding: 12mm !important;
      page: landscape-section;
    }}

    @media print {{
      body {{
        background: white !important;
        padding: 0 !important;
      }}
      .no-print, .screen-header, .quick-jump-bar {{
        display: none !important;
      }}
      .print-sheet {{
        margin: 0 !important;
        box-shadow: none !important;
        width: 100% !important;
        min-height: auto !important;
        padding: 12mm !important;
        page-break-after: always !important;
      }}
      #03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI .print-sheet {{
        width: 100% !important;
        page-break-after: always !important;
      }}
    }}

    /* Typography & Tables */
    .kop {{
      border-bottom: 3px double #000;
      padding-bottom: 8px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }}
    .kop-logo {{
      width: 52px;
      height: 52px;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13pt;
      border-radius: 8px;
    }}
    .kop-mid {{
      flex: 1;
      padding: 0 10px;
    }}
    .kop-mid h4 {{
      margin: 0;
      font-size: 11pt;
      text-transform: uppercase;
      font-weight: bold;
    }}
    .kop-mid h2 {{
      margin: 2px 0;
      font-size: 13.5pt;
      text-transform: uppercase;
      font-weight: bold;
    }}
    .kop-mid p {{
      margin: 1px 0;
      font-size: 8.5pt;
    }}

    table.data-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9.5pt;
    }}
    table.data-table th, table.data-table td {{
      border: 1px solid #000;
      padding: 4px 6px;
    }}
    table.data-table th {{
      background: #f1f5f9;
      font-weight: bold;
      text-align: center;
    }}

    .ttd-box {{
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 10pt;
    }}
    .ttd-col {{
      width: 45%;
    }}
    .ttd-space {{
      height: 52px;
    }}

    /* Cover styles */
    .border-double-thick {{
      border: 4px double #0e6938;
      padding: 12mm;
      height: 250mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }}
    .badge-box {{
      display: inline-block;
      padding: 6px 18px;
      font-size: 14pt;
      font-weight: bold;
      color: white;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}
    .spine-label {{
      border: 2px dashed #000;
      width: 75mm;
      height: 275mm;
      box-sizing: border-box;
      padding: 10mm 6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      float: left;
      margin-right: 15mm;
      background: white;
    }}
    .grid-labels {{
      display: flex;
      gap: 15mm;
      justify-content: center;
    }}
  </style>
</head>
<body>

  <!-- Screen Navigation Bar -->
  <div class="screen-header no-print">
    <div>
      <h1>DOKUMEN FISIK SIAP CETAK - AKREDITASI TPQ MUSLIMAT NU AL-IKHLAS</h1>
      <p>Yayasan AL FATAH • Bundel Master Seluruh Berkas & Bukti Fisik 6 Box Odner Bantex</p>
    </div>
    <div class="header-actions">
      <button onclick="window.print()" class="btn-print-master">
        🖨️ CETAK SEMUA DOKUMEN SEKARANG (Ctrl + P)
      </button>
      <a href="../index.html" class="btn-back">
        ← Kembali ke Portal Aplikasi TPQ
      </a>
    </div>
  </div>

  <!-- Quick Jump Bar -->
  <div class="quick-jump-bar no-print">
    <span style="color: #cbd5e1; font-size: 9pt; font-weight: bold; margin-right: 6px;">Lompat ke Berkas:</span>
    <a href="#00_COVER_DAN_LABEL_PUNGGUNG_ODNER_1_SD_6" class="jump-link">🏷️ Cover & Label Box 1-6</a>
    <a href="#01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN" class="jump-link" style="border-left: 3px solid #0e6938;">📁 Odner 1: Legalitas</a>
    <a href="#02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN" class="jump-link" style="border-left: 3px solid #1d4ed8;">📁 Odner 2: Kurikulum</a>
    <a href="#03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI" class="jump-link" style="border-left: 3px solid #d97706;">📁 Odner 3: Kesiswaan (EMIS)</a>
    <a href="#04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH" class="jump-link" style="border-left: 3px solid #7c3aed;">📁 Odner 4: Guru/Syahadah</a>
    <a href="#05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE" class="jump-link" style="border-left: 3px solid #e11d48;">📁 Odner 5: Sarpras, Kas & Aswaja</a>
    <a href="#06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN" class="jump-link" style="border-left: 3px solid #059669;">📜 Tatib & Program Kerja Tahunan</a>
  </div>

  <div style="background: #e0f2fe; border: 1px solid #7dd3fc; color: #0369a1; padding: 12px 24px; font-size: 9.5pt; line-height: 1.5;" class="no-print">
    <strong>💡 Petunjuk Pencetakan Dokumen Fisik:</strong><br>
    1. Anda dapat menekan tombol kuning <strong>"CETAK SEMUA DOKUMEN SEKARANG"</strong> di atas atau tekan <code>Ctrl + P</code> untuk mencetak seluruh bundle.<br>
    2. Pada opsi printer di Chrome/Edge: Pilih <strong>Paper Size: A4</strong>, <strong>Margins: Default / Minimum</strong>, dan centang <strong>"Background graphics"</strong> agar warna dan kop tercetak jelas.<br>
    3. Untuk <strong>Odner 3 (Buku Induk Santri 12 Kolom)</strong>, sangat disarankan dicetak tersendiri dalam orientasi <strong>Landscape</strong> melalui file <a href="03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html" target="_blank" style="font-weight: bold; text-decoration: underline; color: #0284c7;">03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html</a> agar tabel santri membentang sempurna tanpa terpotong.<br>
    4. Anda juga dapat mencetak per box secara mandiri melalui menu Panduan Box Odner di aplikasi web.
  </div>

  {''.join(sections_html)}

</body>
</html>
"""

output_path = "dokumen_cetak_fisik/PAKET_LENGKAP_SEMUA_DOKUMEN_AKREDITASI_SIAP_CETAK.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(master_template)

print("Master compilation generated successfully at:", output_path)
