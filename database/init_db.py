#!/usr/bin/env python3
"""
INITIALIZE & SEED SQL DATABASE
TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH
Membuat tabel dan mengisi data awal autentik ke dalam SQLite & mengekspor dump .sql
"""

import json
import os
import sqlite3
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, 'tpq_alikhlas.db')
SQL_SCHEMA_PATH = os.path.join(BASE_DIR, 'schema.sql')
DATA_JSON_PATH = os.path.join(BASE_DIR, 'default_data.json')
SQL_EXPORT_PATH = os.path.join(BASE_DIR, 'tpq_alikhlas.sql')


def init_database():
    print(f"[*] Inisialisasi basis data SQLite: {DB_PATH}")

    # Baca skema
    with open(SQL_SCHEMA_PATH, 'r', encoding='utf-8') as f:
        schema_sql = f.read()

    # Baca data default
    with open(DATA_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Koneksi SQLite
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Jalankan DDL
    cursor.executescript(schema_sql)

    # 1. Seed Institution
    inst = data.get('institution', {})
    cols = [col[1] for col in cursor.execute("PRAGMA table_info(institution)").fetchall()]
    if "formulir_config" not in cols:
        cursor.execute("ALTER TABLE institution ADD COLUMN formulir_config TEXT")
    if data.get('formulirConfig'):
        cursor.execute("UPDATE institution SET formulir_config = ? WHERE id = 1", (json.dumps(data.get('formulirConfig'), ensure_ascii=False),))

    cursor.execute("SELECT COUNT(*) FROM institution WHERE id = 1")
    if cursor.fetchone()[0] == 0:
        cursor.execute(
            """
            INSERT INTO institution (
                id, name, foundation, headmaster, headmaster_nip, headmaster_title,
                headmaster_phone, headmaster_education, headmaster_syahadah, headmaster_period,
                head_foundation, committee_head, secretary, treasurer, nsq, ijop, notary,
                affiliation, method, address, village, subdistrict, city, province,
                post_code, phone, email, active_year, legal_city, target_accreditation,
                logo_left, logo_right, logo_left_type, logo_right_type,
                logo_left_preset, logo_right_preset, kop_logo_layout, kop_border_type,
                signature_headmaster, stamp_image, formulir_config
            ) VALUES (
                1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        """,
            (
                inst.get('name', 'TPQ MUSLIMAT NU AL-IKHLAS'),
                inst.get('foundation', 'YAYASAN AL FATAH'),
                inst.get('headmaster', 'Ustadzah Hj. Siti Aminah, S.Pd.I'),
                inst.get('headmasterNip', 'NIY. 19820514 201201 2 001'),
                inst.get('headmasterTitle', 'Kepala TPQ Muslimat NU AL-IKHLAS'),
                inst.get('headmasterPhone', '0812-3245-8891'),
                inst.get(
                    'headmasterEducation',
                    'S1 Pendidikan Agama Islam (PAI) UIN Sunan Ampel',
                ),
                inst.get(
                    'headmasterSyahadah',
                    'Metode An-Nahdliyah Tingkat Munaqisy (No. SYH-AN/JTM/2018/0092)',
                ),
                inst.get('headmasterPeriod', '2024 - 2029'),
                inst.get('headFoundation', 'Drs. H. Ahmad Fathoni, M.Pd.I'),
                inst.get('committeeHead', 'H. Ridwan Santoso'),
                inst.get('secretary', 'Ustadzah Nurul Hidayati, S.Pd'),
                inst.get('treasurer', 'Ustadzah Fatimatuz Zahro, S.Pd'),
                inst.get('nsq', '411235150089'),
                inst.get('ijop', 'Kd.13.15/4/PP.00.7/1420/2024'),
                inst.get('notary', 'AHU-0014285.AH.01.04.Tahun 2018'),
                inst.get(
                    'affiliation',
                    'Pimpinan Cabang Muslimat Nahdlatul Ulama Sidoarjo',
                ),
                inst.get('method', 'Metode An-Nahdliyah / Qiraati'),
                inst.get(
                    'address', 'Jl. Masjid Al-Fatah No. 09, RT 03 / RW 02'
                ),
                inst.get('village', 'Sidokare'),
                inst.get('subdistrict', 'Sidoarjo'),
                inst.get('city', 'Kabupaten Sidoarjo'),
                inst.get('province', 'Jawa Timur'),
                inst.get('postCode', '61214'),
                inst.get('phone', '(031) 8945672 / 0812-3245-8891'),
                inst.get('email', 'tpq.muslimatnu.alikhlas@gmail.com'),
                inst.get('activeYear', '2026/2027'),
                inst.get('legalCity', 'Sidoarjo'),
                inst.get('targetAccreditation', 'A (Unggul / Sangat Baik)'),
                inst.get('logoLeft', ''),
                inst.get('logoRight', ''),
                inst.get('logoLeftType', 'preset'),
                inst.get('logoRightType', 'preset'),
                inst.get('logoLeftPreset', 'book'),
                inst.get('logoRightPreset', 'muslimat'),
                inst.get('kopLogoLayout', 'both'),
                inst.get('kopBorderType', 'double-emerald'),
                inst.get('signatureHeadmaster', ''),
                inst.get('stampImage', ''),
                json.dumps(data.get('formulirConfig', {}), ensure_ascii=False),
            ),
        )
        print("  [+] Profil Lembaga berhasil disimpan ke tabel `institution`")

    # 2. Seed Santri
    cursor.execute("SELECT COUNT(*) FROM santri")
    if cursor.fetchone()[0] == 0:
        for s in data.get('santri', []):
            cursor.execute(
                """
                INSERT INTO santri (
                    id, nis, nik, name, gender, birth_place, birth_date,
                    class_level, parent_name, parent_phone, address, join_date, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    s.get('id'),
                    s.get('nis'),
                    s.get('nik'),
                    s.get('name'),
                    s.get('gender'),
                    s.get('birthPlace'),
                    s.get('birthDate'),
                    s.get('classLevel'),
                    s.get('parentName'),
                    s.get('parentPhone'),
                    s.get('address'),
                    s.get('joinDate'),
                    s.get('status', 'Aktif'),
                ),
            )
        print(
            f"  [+] {len(data.get('santri', []))} data Santri berhasil disimpan ke tabel `santri`"
        )

    # 3. Seed Ustadz
    cursor.execute("SELECT COUNT(*) FROM ustadz")
    if cursor.fetchone()[0] == 0:
        for u in data.get('ustadz', []):
            cursor.execute(
                """
                INSERT INTO ustadz (
                    id, nip, nik, name, gender, education, pesantren,
                    syahadah_method, syahadah_number, syahadah_year, assigned_class,
                    phone, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    u.get('id'),
                    u.get('nip'),
                    u.get('nik'),
                    u.get('name'),
                    u.get('gender'),
                    u.get('education'),
                    u.get('pesantren'),
                    u.get('syahadahMethod'),
                    u.get('syahadahNumber'),
                    u.get('syahadahYear'),
                    u.get('assignedClass'),
                    u.get('phone'),
                    u.get('status', 'Guru Tetap'),
                ),
            )
        print(
            f"  [+] {len(data.get('ustadz', []))} data Ustadz/Ustadzah berhasil disimpan ke tabel `ustadz`"
        )

    # 4. Seed Inventaris
    cursor.execute("SELECT COUNT(*) FROM inventaris")
    if cursor.fetchone()[0] == 0:
        for i in data.get('inventaris', []):
            cursor.execute(
                """
                INSERT INTO inventaris (
                    id, code, name, category, qty, unit, condition,
                    source, location, acq_year
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    i.get('id'),
                    i.get('code'),
                    i.get('name'),
                    i.get('category'),
                    int(i.get('qty', 1)),
                    i.get('unit', 'Unit'),
                    i.get('condition', 'Baik'),
                    i.get('source'),
                    i.get('location'),
                    str(i.get('acqYear', '2024')),
                ),
            )
        print(
            f"  [+] {len(data.get('inventaris', []))} data Inventaris Sarpras berhasil disimpan ke tabel `inventaris`"
        )

    # 5. Seed Kas
    cursor.execute("SELECT COUNT(*) FROM kas")
    if cursor.fetchone()[0] == 0:
        for k in data.get('kas', []):
            cursor.execute(
                """
                INSERT INTO kas (
                    id, date, type, category, amount, proof_number, description
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    k.get('id'),
                    k.get('date'),
                    k.get('type'),
                    k.get('category'),
                    int(k.get('amount', 0)),
                    k.get('proofNumber'),
                    k.get('description'),
                ),
            )
        print(
            f"  [+] {len(data.get('kas', []))} transaksi Kas berhasil disimpan ke tabel `kas`"
        )

    conn.commit()

    # Ekspor full SQL Dump
    export_sql_dump(conn, SQL_EXPORT_PATH)
    conn.close()
    print("[OK] Inisialisasi basis data selesai sempurna.")


def export_sql_dump(conn, output_path):
    """Menghasilkan file .sql universal yang dapat diimpor langsung ke SQLite / MySQL / MariaDB."""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(
            "-- =========================================================================\n"
        )
        f.write(
            "-- DATABASE DUMP SQL - TPQ MUSLIMAT NU AL-IKHLAS (YAYASAN AL"
            " FATAH)\n"
        )
        f.write(
            "-- NSQ: 411235150089 | SK IJOP: Kd.13.15/4/PP.00.7/1420/2024\n"
        )
        f.write("-- Lokasi: Sidokare, Sidoarjo, Jawa Timur\n")
        f.write(
            "-- Universal SQL Export (Compatible with SQLite, MySQL, MariaDB,"
            " PostgreSQL)\n"
        )
        f.write(
            "-- =========================================================================\n\n"
        )

        for line in conn.iterdump():
            f.write(f'{line}\n')

    print(f"  [+] Ekspor file SQL dump berhasil: {output_path}")


if __name__ == '__main__':
    init_database()
