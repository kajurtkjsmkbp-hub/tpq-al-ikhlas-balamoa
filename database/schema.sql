-- =========================================================================
-- SKEMA BASIS DATA SQL AKREDITASI TPQ MUSLIMAT NU AL-IKHLAS
-- YAYASAN AL FATAH - SIDOKARE, SIDOARJO, JAWA TIMUR
-- NSQ: 411235150089 | SK IJOP: Kd.13.15/4/PP.00.7/1420/2024
-- =========================================================================

-- 1. TABEL PROFIL LEMBAGA & PENGATURAN KOP SURAT
CREATE TABLE IF NOT EXISTS institution (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    name TEXT NOT NULL,
    foundation TEXT NOT NULL,
    headmaster TEXT NOT NULL,
    headmaster_nip TEXT,
    headmaster_title TEXT,
    headmaster_phone TEXT,
    headmaster_education TEXT,
    headmaster_syahadah TEXT,
    headmaster_period TEXT,
    head_foundation TEXT,
    committee_head TEXT,
    secretary TEXT,
    treasurer TEXT,
    nsq TEXT,
    ijop TEXT,
    notary TEXT,
    affiliation TEXT,
    method TEXT,
    address TEXT,
    village TEXT,
    subdistrict TEXT,
    city TEXT,
    province TEXT,
    post_code TEXT,
    phone TEXT,
    email TEXT,
    active_year TEXT,
    legal_city TEXT,
    target_accreditation TEXT,
    logo_left TEXT,
    logo_right TEXT,
    logo_left_type TEXT DEFAULT 'preset',
    logo_right_type TEXT DEFAULT 'preset',
    logo_left_preset TEXT DEFAULT 'book',
    logo_right_preset TEXT DEFAULT 'muslimat',
    kop_logo_layout TEXT DEFAULT 'both',
    kop_border_type TEXT DEFAULT 'double-emerald',
    signature_headmaster TEXT,
    stamp_image TEXT,
    formulir_config TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL BUKU INDUK PESERTA DIDIK (SANTRI)
CREATE TABLE IF NOT EXISTS santri (
    id TEXT PRIMARY KEY,
    nis TEXT NOT NULL,
    nik TEXT,
    name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('L', 'P')),
    birth_place TEXT,
    birth_date TEXT,
    class_level TEXT NOT NULL,
    parent_name TEXT,
    parent_phone TEXT,
    address TEXT,
    join_date TEXT,
    status TEXT DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL BUKU INDUK PENDIDIK (USTADZ / USTADZAH)
CREATE TABLE IF NOT EXISTS ustadz (
    id TEXT PRIMARY KEY,
    nip TEXT NOT NULL,
    nik TEXT,
    name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('L', 'P')),
    education TEXT,
    pesantren TEXT,
    syahadah_method TEXT,
    syahadah_number TEXT,
    syahadah_year TEXT,
    assigned_class TEXT,
    phone TEXT,
    status TEXT DEFAULT 'Guru Tetap',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABEL BUKU INVENTARIS SARANA & PRASARANA (SARPRAS)
CREATE TABLE IF NOT EXISTS inventaris (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    unit TEXT DEFAULT 'Unit',
    condition TEXT DEFAULT 'Baik',
    source TEXT,
    location TEXT,
    acq_year TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL BUKU KAS UMUM (BKU) KEUANGAN
CREATE TABLE IF NOT EXISTS kas (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    type TEXT CHECK (type IN ('in', 'out')),
    category TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    proof_number TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL STATUS CHECKLIST BERKAS AKREDITASI
CREATE TABLE IF NOT EXISTS checklist_status (
    item_id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'missing' CHECK (status IN ('ready', 'progress', 'missing')),
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
