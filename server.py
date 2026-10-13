#!/usr/bin/env python3
"""
HTTP & REST API SERVER DENGAN BASIS DATA SQLITE (SQL PERMANENT PERSISTENCE)
TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH
Menyajikan file statis dan menyediakan REST API terhubung ke basis data SQLite / SQL.
"""

import http.server
import json
import os
import sqlite3
import sys
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "tpq_alikhlas.db")
SQL_DUMP_PATH = os.path.join(BASE_DIR, "database", "tpq_alikhlas.sql")
SCHEMA_PATH = os.path.join(BASE_DIR, "database", "schema.sql")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def export_sql():
    try:
        conn = get_db()
        with open(SQL_DUMP_PATH, "w", encoding="utf-8") as f:
            f.write("-- =========================================================================\n")
            f.write("-- DATABASE DUMP SQL - TPQ MUSLIMAT NU AL-IKHLAS (YAYASAN AL FATAH)\n")
            f.write("-- NSQ: 411235150089 | SK IJOP: Kd.13.15/4/PP.00.7/1420/2024\n")
            f.write("-- Lokasi: Sidokare, Sidoarjo, Jawa Timur\n")
            f.write("-- Universal SQL Export (SQLite / MariaDB / MySQL / PostgreSQL)\n")
            f.write("-- =========================================================================\n\n")
            for line in conn.iterdump():
                f.write(f"{line}\n")
        conn.close()
    except Exception as e:
        print(f"[!] Gagal mengekspor SQL dump: {e}")


def get_all_data():
    conn = get_db()
    c = conn.cursor()

    # Institution
    c.execute("SELECT * FROM institution WHERE id = 1")
    row = c.fetchone()
    inst = {}
    if row:
        inst = {
            "name": row["name"],
            "foundation": row["foundation"],
            "headmaster": row["headmaster"],
            "headmasterNip": row["headmaster_nip"] or "",
            "headmasterTitle": row["headmaster_title"] or "",
            "headmasterPhone": row["headmaster_phone"] or "",
            "headmasterEducation": row["headmaster_education"] or "",
            "headmasterSyahadah": row["headmaster_syahadah"] or "",
            "headmasterPeriod": row["headmaster_period"] or "",
            "headFoundation": row["head_foundation"] or "",
            "committeeHead": row["committee_head"] or "",
            "secretary": row["secretary"] or "",
            "treasurer": row["treasurer"] or "",
            "nsq": row["nsq"] or "",
            "ijop": row["ijop"] or "",
            "notary": row["notary"] or "",
            "affiliation": row["affiliation"] or "",
            "method": row["method"] or "",
            "address": row["address"] or "",
            "village": row["village"] or "",
            "subdistrict": row["subdistrict"] or "",
            "city": row["city"] or "",
            "province": row["province"] or "",
            "postCode": row["post_code"] or "",
            "phone": row["phone"] or "",
            "email": row["email"] or "",
            "activeYear": row["active_year"] or "",
            "legalCity": row["legal_city"] or "",
            "targetAccreditation": row["target_accreditation"] or "",
            "logoLeft": row["logo_left"] or "",
            "logoRight": row["logo_right"] or "",
            "logoLeftType": row["logo_left_type"] or "preset",
            "logoRightType": row["logo_right_type"] or "preset",
            "logoLeftPreset": row["logo_left_preset"] or "book",
            "logoRightPreset": row["logo_right_preset"] or "muslimat",
            "kopLogoLayout": row["kop_logo_layout"] or "both",
            "kopBorderType": row["kop_border_type"] or "double-emerald",
            "signatureHeadmaster": row["signature_headmaster"] or "",
            "stampImage": row["stamp_image"] or "",
        }

    # Santri
    c.execute("SELECT * FROM santri ORDER BY nis ASC")
    santri_list = []
    for r in c.fetchall():
        santri_list.append({
            "id": r["id"],
            "nis": r["nis"],
            "nik": r["nik"] or "",
            "name": r["name"],
            "gender": r["gender"],
            "birthPlace": r["birth_place"] or "",
            "birthDate": r["birth_date"] or "",
            "classLevel": r["class_level"],
            "parentName": r["parent_name"] or "",
            "parentPhone": r["parent_phone"] or "",
            "address": r["address"] or "",
            "joinDate": r["join_date"] or "",
            "status": r["status"] or "Aktif"
        })

    # Ustadz
    c.execute("SELECT * FROM ustadz ORDER BY nip ASC")
    ustadz_list = []
    for r in c.fetchall():
        ustadz_list.append({
            "id": r["id"],
            "nip": r["nip"],
            "nik": r["nik"] or "",
            "name": r["name"],
            "gender": r["gender"],
            "education": r["education"] or "",
            "pesantren": r["pesantren"] or "",
            "syahadahMethod": r["syahadah_method"] or "",
            "syahadahNumber": r["syahadah_number"] or "",
            "syahadahYear": r["syahadah_year"] or "",
            "assignedClass": r["assigned_class"] or "",
            "phone": r["phone"] or "",
            "status": r["status"] or "Guru Tetap"
        })

    # Inventaris
    c.execute("SELECT * FROM inventaris ORDER BY code ASC")
    inventaris_list = []
    for r in c.fetchall():
        inventaris_list.append({
            "id": r["id"],
            "code": r["code"],
            "name": r["name"],
            "category": r["category"],
            "qty": r["qty"],
            "unit": r["unit"] or "Unit",
            "condition": r["condition"] or "Baik",
            "source": r["source"] or "",
            "location": r["location"] or "",
            "acqYear": r["acq_year"] or ""
        })

    # Kas
    c.execute("SELECT * FROM kas ORDER BY date ASC, id ASC")
    kas_list = []
    for r in c.fetchall():
        kas_list.append({
            "id": r["id"],
            "date": r["date"],
            "type": r["type"],
            "category": r["category"],
            "amount": r["amount"],
            "proofNumber": r["proof_number"] or "",
            "description": r["description"] or ""
        })

    # Checklist
    c.execute("SELECT * FROM checklist_status")
    checklist_map = {}
    for r in c.fetchall():
        checklist_map[r["item_id"]] = {
            "status": r["status"],
            "notes": r["notes"] or ""
        }

    # Formulir Config
    formulir_cfg = {}
    try:
        if row and "formulir_config" in row.keys() and row["formulir_config"]:
            formulir_cfg = json.loads(row["formulir_config"])
    except Exception:
        pass

    conn.close()

    return {
        "institution": inst,
        "formulirConfig": formulir_cfg,
        "santri": santri_list,
        "ustadz": ustadz_list,
        "inventaris": inventaris_list,
        "kas": kas_list,
        "checklist": checklist_map
    }


class TPQRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Tambahkan header CORS dan No-Cache untuk API
        if self.path.startswith("/api/"):
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            try:
                conn = get_db()
                c = conn.cursor()
                counts = {}
                for t in ["institution", "santri", "ustadz", "inventaris", "kas", "checklist_status"]:
                    c.execute(f"SELECT COUNT(*) FROM {t}")
                    counts[t] = c.fetchone()[0]
                conn.close()

                response = {
                    "ok": True,
                    "engine": "SQLite Relational Database",
                    "file": "database/tpq_alikhlas.db",
                    "sql_export": "database/tpq_alikhlas.sql",
                    "counts": counts
                }
                self.send_json(200, response)
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/data":
            try:
                data = get_all_data()
                self.send_json(200, {"ok": True, "data": data})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/export-sql":
            try:
                export_sql()
                self.send_json(200, {"ok": True, "message": "SQL database dump berhasil diperbarui", "file": "database/tpq_alikhlas.sql"})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        # Default static file handling
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.read_json_body()

        if path == "/api/sync":
            # Sync full dataset from client to SQLite database
            try:
                conn = get_db()
                c = conn.cursor()

                # Sync Institution
                inst = body.get("institution")
                if inst:
                    c.execute("""
                        INSERT INTO institution (
                            id, name, foundation, headmaster, headmaster_nip, headmaster_title,
                            headmaster_phone, headmaster_education, headmaster_syahadah, headmaster_period,
                            head_foundation, committee_head, secretary, treasurer, nsq, ijop, notary,
                            affiliation, method, address, village, subdistrict, city, province,
                            post_code, phone, email, active_year, legal_city, target_accreditation,
                            logo_left, logo_right, logo_left_type, logo_right_type,
                            logo_left_preset, logo_right_preset, kop_logo_layout, kop_border_type,
                            signature_headmaster, stamp_image
                        ) VALUES (
                            1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                        ) ON CONFLICT(id) DO UPDATE SET
                            name=excluded.name, foundation=excluded.foundation, headmaster=excluded.headmaster,
                            headmaster_nip=excluded.headmaster_nip, headmaster_title=excluded.headmaster_title,
                            headmaster_phone=excluded.headmaster_phone, headmaster_education=excluded.headmaster_education,
                            headmaster_syahadah=excluded.headmaster_syahadah, headmaster_period=excluded.headmaster_period,
                            head_foundation=excluded.head_foundation, committee_head=excluded.committee_head,
                            secretary=excluded.secretary, treasurer=excluded.treasurer, nsq=excluded.nsq,
                            ijop=excluded.ijop, notary=excluded.notary, affiliation=excluded.affiliation,
                            method=excluded.method, address=excluded.address, village=excluded.village,
                            subdistrict=excluded.subdistrict, city=excluded.city, province=excluded.province,
                            post_code=excluded.post_code, phone=excluded.phone, email=excluded.email,
                            active_year=excluded.active_year, legal_city=excluded.legal_city,
                            target_accreditation=excluded.target_accreditation,
                            logo_left=excluded.logo_left, logo_right=excluded.logo_right,
                            logo_left_type=excluded.logo_left_type, logo_right_type=excluded.logo_right_type,
                            logo_left_preset=excluded.logo_left_preset, logo_right_preset=excluded.logo_right_preset,
                            kop_logo_layout=excluded.kop_logo_layout, kop_border_type=excluded.kop_border_type,
                            signature_headmaster=excluded.signature_headmaster, stamp_image=excluded.stamp_image,
                            updated_at=CURRENT_TIMESTAMP
                    """, (
                        inst.get('name'), inst.get('foundation'), inst.get('headmaster'),
                        inst.get('headmasterNip'), inst.get('headmasterTitle'), inst.get('headmasterPhone'),
                        inst.get('headmasterEducation'), inst.get('headmasterSyahadah'), inst.get('headmasterPeriod'),
                        inst.get('headFoundation'), inst.get('committeeHead'), inst.get('secretary'),
                        inst.get('treasurer'), inst.get('nsq'), inst.get('ijop'), inst.get('notary'),
                        inst.get('affiliation'), inst.get('method'), inst.get('address'), inst.get('village'),
                        inst.get('subdistrict'), inst.get('city'), inst.get('province'), inst.get('postCode'),
                        inst.get('phone'), inst.get('email'), inst.get('activeYear'), inst.get('legalCity'),
                        inst.get('targetAccreditation'), inst.get('logoLeft'), inst.get('logoRight'),
                        inst.get('logoLeftType', 'preset'), inst.get('logoRightType', 'preset'),
                        inst.get('logoLeftPreset', 'book'), inst.get('logoRightPreset', 'muslimat'),
                        inst.get('kopLogoLayout', 'both'), inst.get('kopBorderType', 'double-emerald'),
                        inst.get('signatureHeadmaster', ''), inst.get('stampImage', '')
                    ))

                # Sync Santri (replace all if provided array)
                santri_list = body.get("santri")
                if santri_list is not None:
                    c.execute("DELETE FROM santri")
                    for s in santri_list:
                        c.execute("""
                            INSERT INTO santri (
                                id, nis, nik, name, gender, birth_place, birth_date,
                                class_level, parent_name, parent_phone, address, join_date, status
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            s.get('id'), s.get('nis'), s.get('nik'), s.get('name'),
                            s.get('gender'), s.get('birthPlace'), s.get('birthDate'),
                            s.get('classLevel'), s.get('parentName'), s.get('parentPhone'),
                            s.get('address'), s.get('joinDate'), s.get('status', 'Aktif')
                        ))

                # Sync Ustadz
                ustadz_list = body.get("ustadz")
                if ustadz_list is not None:
                    c.execute("DELETE FROM ustadz")
                    for u in ustadz_list:
                        c.execute("""
                            INSERT INTO ustadz (
                                id, nip, nik, name, gender, education, pesantren,
                                syahadah_method, syahadah_number, syahadah_year, assigned_class,
                                phone, status
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            u.get('id'), u.get('nip'), u.get('nik'), u.get('name'),
                            u.get('gender'), u.get('education'), u.get('pesantren'),
                            u.get('syahadahMethod'), u.get('syahadahNumber'), u.get('syahadahYear'),
                            u.get('assignedClass'), u.get('phone'), u.get('status', 'Guru Tetap')
                        ))

                # Sync Inventaris
                inv_list = body.get("inventaris")
                if inv_list is not None:
                    c.execute("DELETE FROM inventaris")
                    for i in inv_list:
                        c.execute("""
                            INSERT INTO inventaris (
                                id, code, name, category, qty, unit, condition,
                                source, location, acq_year
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            i.get('id'), i.get('code'), i.get('name'), i.get('category'),
                            int(i.get('qty', 1)), i.get('unit', 'Unit'), i.get('condition', 'Baik'),
                            i.get('source'), i.get('location'), str(i.get('acqYear', '2024'))
                        ))

                # Sync Kas
                kas_list = body.get("kas")
                if kas_list is not None:
                    c.execute("DELETE FROM kas")
                    for k in kas_list:
                        c.execute("""
                            INSERT INTO kas (
                                id, date, type, category, amount, proof_number, description
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        """, (
                            k.get('id'), k.get('date'), k.get('type'), k.get('category'),
                            int(k.get('amount', 0)), k.get('proofNumber'), k.get('description')
                        ))

                # Sync Checklist
                checklist_map = body.get("checklist")
                if checklist_map is not None:
                    for item_id, item_val in checklist_map.items():
                        c.execute("""
                            INSERT INTO checklist_status (item_id, status, notes, updated_at)
                            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                            ON CONFLICT(item_id) DO UPDATE SET
                                status=excluded.status, notes=excluded.notes, updated_at=CURRENT_TIMESTAMP
                        """, (item_id, item_val.get('status', 'missing'), item_val.get('notes', '')))

                # Sync Formulir Config
                f_cfg = body.get("formulirConfig")
                if f_cfg is not None:
                    cols = [col[1] for col in c.execute("PRAGMA table_info(institution)").fetchall()]
                    if "formulir_config" not in cols:
                        c.execute("ALTER TABLE institution ADD COLUMN formulir_config TEXT")
                    c.execute("UPDATE institution SET formulir_config = ? WHERE id = 1", (json.dumps(f_cfg, ensure_ascii=False),))

                conn.commit()
                conn.close()

                # Refresh SQL dump
                export_sql()

                self.send_json(200, {"ok": True, "message": "Semua data berhasil disimpan ke SQLite dan diekspor ke SQL dump"})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/santri":
            try:
                conn = get_db()
                c = conn.cursor()
                s = body
                c.execute("""
                    INSERT INTO santri (
                        id, nis, nik, name, gender, birth_place, birth_date,
                        class_level, parent_name, parent_phone, address, join_date, status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET
                        nis=excluded.nis, nik=excluded.nik, name=excluded.name, gender=excluded.gender,
                        birth_place=excluded.birth_place, birth_date=excluded.birth_date,
                        class_level=excluded.class_level, parent_name=excluded.parent_name,
                        parent_phone=excluded.parent_phone, address=excluded.address,
                        join_date=excluded.join_date, status=excluded.status
                """, (
                    s.get('id'), s.get('nis'), s.get('nik'), s.get('name'),
                    s.get('gender'), s.get('birthPlace'), s.get('birthDate'),
                    s.get('classLevel'), s.get('parentName'), s.get('parentPhone'),
                    s.get('address'), s.get('joinDate'), s.get('status', 'Aktif')
                ))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "santri": s})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/ustadz":
            try:
                conn = get_db()
                c = conn.cursor()
                u = body
                c.execute("""
                    INSERT INTO ustadz (
                        id, nip, nik, name, gender, education, pesantren,
                        syahadah_method, syahadah_number, syahadah_year, assigned_class,
                        phone, status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET
                        nip=excluded.nip, nik=excluded.nik, name=excluded.name, gender=excluded.gender,
                        education=excluded.education, pesantren=excluded.pesantren,
                        syahadah_method=excluded.syahadah_method, syahadah_number=excluded.syahadah_number,
                        syahadah_year=excluded.syahadah_year, assigned_class=excluded.assigned_class,
                        phone=excluded.phone, status=excluded.status
                """, (
                    u.get('id'), u.get('nip'), u.get('nik'), u.get('name'),
                    u.get('gender'), u.get('education'), u.get('pesantren'),
                    u.get('syahadahMethod'), u.get('syahadahNumber'), u.get('syahadahYear'),
                    u.get('assignedClass'), u.get('phone'), u.get('status', 'Guru Tetap')
                ))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "ustadz": u})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/inventaris":
            try:
                conn = get_db()
                c = conn.cursor()
                i = body
                c.execute("""
                    INSERT INTO inventaris (
                        id, code, name, category, qty, unit, condition,
                        source, location, acq_year
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET
                        code=excluded.code, name=excluded.name, category=excluded.category,
                        qty=excluded.qty, unit=excluded.unit, condition=excluded.condition,
                        source=excluded.source, location=excluded.location, acq_year=excluded.acq_year
                """, (
                    i.get('id'), i.get('code'), i.get('name'), i.get('category'),
                    int(i.get('qty', 1)), i.get('unit', 'Unit'), i.get('condition', 'Baik'),
                    i.get('source'), i.get('location'), str(i.get('acqYear', '2024'))
                ))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "inventaris": i})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/kas":
            try:
                conn = get_db()
                c = conn.cursor()
                k = body
                c.execute("""
                    INSERT INTO kas (
                        id, date, type, category, amount, proof_number, description
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET
                        date=excluded.date, type=excluded.type, category=excluded.category,
                        amount=excluded.amount, proof_number=excluded.proof_number, description=excluded.description
                """, (
                    k.get('id'), k.get('date'), k.get('type'), k.get('category'),
                    int(k.get('amount', 0)), k.get('proofNumber'), k.get('description')
                ))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "kas": k})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/institution":
            try:
                conn = get_db()
                c = conn.cursor()
                inst = body
                c.execute("""
                    INSERT INTO institution (
                        id, name, foundation, headmaster, headmaster_nip, headmaster_title,
                        headmaster_phone, headmaster_education, headmaster_syahadah, headmaster_period,
                        head_foundation, committee_head, secretary, treasurer, nsq, ijop, notary,
                        affiliation, method, address, village, subdistrict, city, province,
                        post_code, phone, email, active_year, legal_city, target_accreditation,
                        logo_left, logo_right, logo_left_type, logo_right_type,
                        logo_left_preset, logo_right_preset, kop_logo_layout, kop_border_type,
                        signature_headmaster, stamp_image
                    ) VALUES (
                        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                    ) ON CONFLICT(id) DO UPDATE SET
                        name=excluded.name, foundation=excluded.foundation, headmaster=excluded.headmaster,
                        headmaster_nip=excluded.headmaster_nip, headmaster_title=excluded.headmaster_title,
                        headmaster_phone=excluded.headmaster_phone, headmaster_education=excluded.headmaster_education,
                        headmaster_syahadah=excluded.headmaster_syahadah, headmaster_period=excluded.headmaster_period,
                        head_foundation=excluded.head_foundation, committee_head=excluded.committee_head,
                        secretary=excluded.secretary, treasurer=excluded.treasurer, nsq=excluded.nsq,
                        ijop=excluded.ijop, notary=excluded.notary, affiliation=excluded.affiliation,
                        method=excluded.method, address=excluded.address, village=excluded.village,
                        subdistrict=excluded.subdistrict, city=excluded.city, province=excluded.province,
                        post_code=excluded.post_code, phone=excluded.phone, email=excluded.email,
                        active_year=excluded.active_year, legal_city=excluded.legal_city,
                        target_accreditation=excluded.target_accreditation,
                        logo_left=excluded.logo_left, logo_right=excluded.logo_right,
                        logo_left_type=excluded.logo_left_type, logo_right_type=excluded.logo_right_type,
                        logo_left_preset=excluded.logo_left_preset, logo_right_preset=excluded.logo_right_preset,
                        kop_logo_layout=excluded.kop_logo_layout, kop_border_type=excluded.kop_border_type,
                        signature_headmaster=excluded.signature_headmaster, stamp_image=excluded.stamp_image,
                        updated_at=CURRENT_TIMESTAMP
                """, (
                    inst.get('name'), inst.get('foundation'), inst.get('headmaster'),
                    inst.get('headmasterNip'), inst.get('headmasterTitle'), inst.get('headmasterPhone'),
                    inst.get('headmasterEducation'), inst.get('headmasterSyahadah'), inst.get('headmasterPeriod'),
                    inst.get('headFoundation'), inst.get('committeeHead'), inst.get('secretary'),
                    inst.get('treasurer'), inst.get('nsq'), inst.get('ijop'), inst.get('notary'),
                    inst.get('affiliation'), inst.get('method'), inst.get('address'), inst.get('village'),
                    inst.get('subdistrict'), inst.get('city'), inst.get('province'), inst.get('postCode'),
                    inst.get('phone'), inst.get('email'), inst.get('activeYear'), inst.get('legalCity'),
                    inst.get('targetAccreditation'), inst.get('logoLeft'), inst.get('logoRight'),
                    inst.get('logoLeftType', 'preset'), inst.get('logoRightType', 'preset'),
                    inst.get('logoLeftPreset', 'book'), inst.get('logoRightPreset', 'muslimat'),
                    inst.get('kopLogoLayout', 'both'), inst.get('kopBorderType', 'double-emerald'),
                    inst.get('signatureHeadmaster', ''), inst.get('stampImage', '')
                ))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "institution": inst})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/checklist":
            try:
                conn = get_db()
                c = conn.cursor()
                item_id = body.get("itemId")
                status = body.get("status", "missing")
                notes = body.get("notes", "")
                c.execute("""
                    INSERT INTO checklist_status (item_id, status, notes, updated_at)
                    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(item_id) DO UPDATE SET
                        status=excluded.status, notes=excluded.notes, updated_at=CURRENT_TIMESTAMP
                """, (item_id, status, notes))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "itemId": item_id, "status": status})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        elif path == "/api/formulir-config":
            try:
                conn = get_db()
                c = conn.cursor()
                cfg_json = json.dumps(body, ensure_ascii=False)
                cols = [col[1] for col in c.execute("PRAGMA table_info(institution)").fetchall()]
                if "formulir_config" not in cols:
                    c.execute("ALTER TABLE institution ADD COLUMN formulir_config TEXT")
                c.execute("UPDATE institution SET formulir_config = ? WHERE id = 1", (cfg_json,))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "formulirConfig": body})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        self.send_json(404, {"ok": False, "error": "Endpoint not found"})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)
        record_id = query.get("id", [None])[0]

        if not record_id:
            self.send_json(400, {"ok": False, "error": "Parameter id required"})
            return

        table_map = {
            "/api/santri": "santri",
            "/api/ustadz": "ustadz",
            "/api/inventaris": "inventaris",
            "/api/kas": "kas"
        }

        if path in table_map:
            table = table_map[path]
            try:
                conn = get_db()
                c = conn.cursor()
                c.execute(f"DELETE FROM {table} WHERE id = ?", (record_id,))
                conn.commit()
                conn.close()
                export_sql()
                self.send_json(200, {"ok": True, "deleted": record_id, "table": table})
            except Exception as e:
                self.send_json(500, {"ok": False, "error": str(e)})
            return

        self.send_json(404, {"ok": False, "error": "Endpoint not found"})

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw = self.rfile.read(content_length).decode("utf-8")
            try:
                return json.loads(raw)
            except Exception:
                return {}
        return {}

    def send_json(self, status_code, data):
        payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)


if __name__ == "__main__":
    print(f"[*] Menjalankan Server Web & SQL API TPQ Muslimat NU Al-Ikhlas pada port {PORT}...")
    server = http.server.HTTPServer(("", PORT), TPQRequestHandler)
    print(f"[OK] Server aktif di: http://localhost:{PORT}/")
    print(f"  -> SQLite Database: {DB_PATH}")
    print(f"  -> SQL Dump Export: {SQL_DUMP_PATH}")
    server.serve_forever()
