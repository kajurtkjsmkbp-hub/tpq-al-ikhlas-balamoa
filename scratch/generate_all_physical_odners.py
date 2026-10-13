# -*- coding: utf-8 -*-
"""
GENERATOR PORTOFOLIO DOKUMEN CETAK FISIK LENGKAP STANDAR AKREDITASI KEMENAG RI
TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH (SIDOARJO)
"""

import os

INSTITUTION = {
    "name": "TPQ MUSLIMAT NU AL-IKHLAS",
    "foundation": "YAYASAN AL FATAH",
    "headmaster": "Ustadzah Hj. Siti Aminah, S.Pd.I",
    "headmasterNiy": "NIY. 19820514 201201 2 001",
    "headFoundation": "Drs. H. Ahmad Fathoni, M.Pd.I",
    "committeeHead": "H. Ridwan Santoso",
    "secretary": "Ustadzah Nurul Hidayati, S.Pd",
    "treasurer": "Ustadzah Fatimatuz Zahro, S.Pd",
    "curriculumHead": "Ustadzah Maimunah, S.Ag",
    "studentsHead": "Ustadz Ahmad Fauzi, S.Pd",
    "sarprasHead": "Ustadzah Siti Rokhmah, A.Ma",
    "nsq": "411235150089",
    "ijop": "Kd.13.15/4/PP.00.7/1420/2024",
    "notary": "AHU-0014285.AH.01.04.Tahun 2018",
    "address": "Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Kec. Sidoarjo, Kab. Sidoarjo, Jawa Timur (Kode Pos 61214)",
    "phone": "(031) 8945672 / 0812-3245-8891",
    "legalCity": "Sidoarjo",
    "legalDate": "15 Juli 2026",
    "academicYear": "2026/2027"
}

def get_kop(logo_left="📖", logo_right="MUSLIMAT<br>NU"):
    return f"""    <div class="kop">
      <div class="kop-logo">{logo_left}</div>
      <div class="kop-mid">
        <h4>YAYASAN AL FATAH</h4>
        <h2>TPQ MUSLIMAT NU AL-IKHLAS</h2>
        <p>Badan Hukum: AHU-0014285.AH.01.04.Tahun 2018 • NSQ: 411235150089 • SK IJOP: Kd.13.15/4/PP.00.7/1420/2024</p>
        <p>Alamat: Jl. Masjid Al-Fatah No. 09, RT 03/RW 02, Sidokare, Kec. Sidoarjo, Kab. Sidoarjo, Jawa Timur (Kode Pos 61214) | Telp: (031) 8945672 / 0812-3245-8891</p>
      </div>
      <div class="kop-logo" style="font-size: 8.5pt; line-height: 1.1;">{logo_right}</div>
    </div>"""

def get_ttd(left_title, left_name, right_title, right_name, city=INSTITUTION["legalCity"], date=INSTITUTION["legalDate"], left_nip="", right_nip=""):
    left_nip_html = f"<br><span style='font-size: 8pt; font-family: monospace;'>{left_nip}</span>" if left_nip else ""
    right_nip_html = f"<br><span style='font-size: 8pt; font-family: monospace;'>{right_nip}</span>" if right_nip else ""
    
    return f"""    <div class="ttd-box">
      <div class="ttd-col">
        <p>Mengetahui,<br><strong>{left_title}</strong></p>
        <div class="ttd-space"></div>
        <p><strong><u>{left_name}</u></strong>{left_nip_html}</p>
      </div>
      <div class="ttd-col">
        <p>{city}, {date}<br><strong>{right_title}</strong></p>
        <div class="ttd-space"></div>
        <p><strong><u>{right_name}</u></strong>{right_nip_html}</p>
      </div>
    </div>"""

BASE_CSS = """
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    @page landscapeSection {
      size: A4 landscape;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      color: #0f172a;
      font-size: 10pt;
      line-height: 1.35;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-sheet {
      background: white;
      width: 210mm;
      min-height: 297mm;
      margin: 20px auto;
      padding: 13mm 15mm;
      box-sizing: border-box;
      box-shadow: 0 4px 15px rgba(0,0,0,0.12);
      border-radius: 4px;
      page-break-after: always;
      break-after: page;
      position: relative;
    }
    .print-sheet.landscape {
      page: landscapeSection;
      width: 297mm;
      min-height: 210mm;
      padding: 10mm 12mm;
    }
    @media print {
      body {
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .print-sheet {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      .print-sheet:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
      .no-print {
        display: none !important;
      }
    }
    .kop {
      border-bottom: 3px double #0f172a;
      padding-bottom: 6px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }
    .kop-logo {
      width: 50px;
      height: 50px;
      border: 1.5px solid #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13pt;
      border-radius: 8px;
    }
    .kop-mid {
      flex: 1;
      padding: 0 10px;
    }
    .kop-mid h4 {
      margin: 0;
      font-size: 10pt;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
    .kop-mid h2 {
      margin: 1px 0;
      font-size: 13.5pt;
      text-transform: uppercase;
      font-weight: bold;
      color: #064e3b;
    }
    .kop-mid p {
      margin: 1px 0;
      font-size: 8pt;
      color: #1e293b;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #1e293b;
      padding: 4px 6px;
    }
    table.data-table th {
      background: #f1f5f9;
      font-weight: bold;
      text-align: center;
    }
    .ttd-box {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    .ttd-col {
      width: 44%;
    }
    .ttd-space {
      height: 48px;
    }
    .doc-title {
      text-align: center;
      margin-bottom: 12px;
    }
    .doc-title h3 {
      margin: 0;
      text-decoration: underline;
      text-transform: uppercase;
      font-size: 11pt;
    }
    .doc-title p {
      margin: 2px 0 0;
      font-size: 8.5pt;
      font-weight: bold;
      color: #334155;
    }
    .badge-status {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 7.5pt;
      font-weight: bold;
    }
"""

def make_floating_button(title, color="#0e6938"):
    return f"""  <div class="no-print" style="position: fixed; top: 15px; right: 15px; z-index: 999; background: {color}; padding: 10px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.25);">
    <button onclick="window.print()" style="background: #fbbf24; color: #000; border: none; padding: 8px 18px; font-weight: bold; font-size: 12pt; border-radius: 6px; cursor: pointer;">
      🖨️ CETAK BERKAS INI (Ctrl + P)
    </button>
  </div>"""

print("Base setup complete.")
