/**
 * BANK DOKUMEN RESMI AKREDITASI TPQ MUSLIMAT NU AL-IKHLAS
 * YAYASAN AL FATAH
 * Dilengkapi fungsi render HTML dengan Kop Surat Resmi & Data Dinamis
 */

const FULL_DOCUMENTS = [
  // 1. KELEMBAGAAN & LEGALITAS
  {
    id: "DOC-FULL-101",
    catId: "kelembagaan",
    code: "KELEMBAGAAN-01",
    title: "Surat Keputusan (SK) Susunan Pengurus TPQ Muslimat NU AL-IKHLAS",
    subtitle: "Masa Khidmah 2026 - 2029 • Yayasan AL FATAH",
    description: "SK penetapan struktur dewan pengurus, pembina, kepala TPQ, bendahara, sekretaris, dan seksi bidang.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">SURAT KEPUTUSAN KETUA YAYASAN AL FATAH</h3>
            <p class="text-xs font-mono font-medium mt-1">Nomor: 014/SK/YAF-TPQ/VII/2026</p>
            <p class="text-xs font-bold mt-2 uppercase">TENTANG:<br>PENETAPAN SUSUNAN PENGURUS TAMAN PENDIDIKAN AL-QUR'AN (TPQ)<br>MUSLIMAT NU AL-IKHLAS MASA KHIDMAH 2026 - 2029</p>
          </div>

          <div class="space-y-4 text-xs text-justify leading-relaxed">
            <p class="font-arabic text-center text-sm font-bold my-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <div>
              <strong>MENIMBANG:</strong>
              <ol class="list-[lower-alpha] pl-5 space-y-1 mt-1">
                <li>Bahwa untuk menjamin kesinambungan, ketertiban, dan mutu pendidikan Al-Qur'an pada TPQ Muslimat NU AL-IKHLAS, dipandang perlu menetapkan susunan pengurus yang definitif dan amanah;</li>
                <li>Bahwa nama-nama yang tercantum dalam lampiran keputusan ini dinilai memiliki integritas, loyalitas, dan kualifikasi memadai untuk mengemban tugas kepengurusan;</li>
                <li>Bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan b di atas, perlu ditetapkan dengan Surat Keputusan Ketua Yayasan AL FATAH.</li>
              </ol>
            </div>

            <div>
              <strong>MENGINGAT:</strong>
              <ol class="list-decimal pl-5 space-y-1 mt-1">
                <li>Akta Notaris Pendirian Yayasan AL FATAH Nomor ${inst.notary || 'AHU-0014285.AH.01.04.Tahun 2018'};</li>
                <li>Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI Nomor 91 Tahun 2020 tentang Petunjuk Teknis Penyelenggaraan Pendidikan Al-Qur'an;</li>
                <li>Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Muslimat Nahdlatul Ulama;</li>
                <li>Izin Operasional Kantor Kementerian Agama RI Nomor: ${inst.ijop || 'Kd.13.15/4/PP.00.7/1420/2024'} dengan NSQ: ${inst.nsq || '411235150089'}.</li>
              </ol>
            </div>

            <div>
              <strong>MEMUTUSKAN:</strong>
              <p class="mt-1"><strong>MENETAPKAN:</strong></p>
              <table class="w-full mt-2">
                <tr class="align-top">
                  <td class="w-24 font-bold">PERTAMA</td>
                  <td class="w-4">:</td>
                  <td>Mengangkat dan mengesahkan Susunan Pengurus TPQ Muslimat NU AL-IKHLAS Masa Khidmah 2026 - 2029 sebagaimana tercantum dalam lampiran surat keputusan ini.</td>
                </tr>
                <tr class="align-top">
                  <td class="font-bold">KEDUA</td>
                  <td>:</td>
                  <td>Menugaskan kepada para pengurus terlantik untuk melaksanakan tata kelola kelembagaan, proses belajar mengajar Al-Qur'an, dan pembinaan santri berlandaskan nilai-nilai Islam Ahlussunnah wal Jama'ah An-Nahdliyah.</td>
                </tr>
                <tr class="align-top">
                  <td class="font-bold">KETIGA</td>
                  <td>:</td>
                  <td>Keputusan ini berlaku sejak tanggal ditetapkan, dan apabila terdapat kekeliruan akan diadakan perbaikan sebagaimana mestinya.</td>
                </tr>
              </table>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-300">
              <h4 class="font-bold text-center underline uppercase mb-3">LAMPIRAN SUSUNAN PENGURUS TPQ MUSLIMAT NU AL-IKHLAS</h4>
              <table class="w-full border border-slate-400 text-xs text-left">
                <thead class="bg-slate-100 font-bold border-b border-slate-400">
                  <tr>
                    <th class="p-2 border-r border-slate-400 w-12 text-center">No</th>
                    <th class="p-2 border-r border-slate-400 w-44">Jabatan</th>
                    <th class="p-2 border-r border-slate-400">Nama Lengkap & Gelar</th>
                    <th class="p-2">Keterangan / Unsur</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-300">
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">1</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Penasehat / Pelindung</td>
                    <td class="p-2 border-r border-slate-300">${inst.headFoundation}</td>
                    <td class="p-2">Ketua Yayasan AL FATAH</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">2</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Pembina Kelembagaan</td>
                    <td class="p-2 border-r border-slate-300">Ibu Nyai Hj. Masruroh Wahid</td>
                    <td class="p-2">Pimpinan Anak Cabang Muslimat NU</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">3</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Kepala TPQ</td>
                    <td class="p-2 font-bold text-emerald-900 border-r border-slate-300">${inst.headmaster}</td>
                    <td class="p-2">Penanggung Jawab Operasional</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">4</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Sekretaris</td>
                    <td class="p-2 border-r border-slate-300">Ustadzah Fatimatuz Zahro, S.Pd</td>
                    <td class="p-2">Administrasi & EMIS</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">5</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Bendahara</td>
                    <td class="p-2 border-r border-slate-300">Ustadzah Nurul Hidayati, S.E</td>
                    <td class="p-2">Keuangan & Kas TPQ</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">6</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Koord. Kurikulum & Mutu</td>
                    <td class="p-2 border-r border-slate-300">Ustadzah Maimunah, S.Ag</td>
                    <td class="p-2">Pemegang Syahadah Metode</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">7</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Koord. Kesiswaan & Tahfidz</td>
                    <td class="p-2 border-r border-slate-300">Ustadz Ahmad Fauzi, S.Pd</td>
                    <td class="p-2">Mutaba'ah & Kesiswaan</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-center border-r border-slate-300">8</td>
                    <td class="p-2 font-semibold border-r border-slate-300">Koord. Sarpras & K3</td>
                    <td class="p-2 border-r border-slate-300">Ustadzah Siti Rokhmah</td>
                    <td class="p-2">Inventaris & Kebersihan</td>
                  </tr>
                </tbody>
              </table>
            </div>

            ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  {
    id: "DOC-FULL-102",
    catId: "kelembagaan",
    code: "KELEMBAGAAN-02",
    title: "Profil Lembaga & Dokumen Legalitas Hukum",
    subtitle: "Nomor Statistik TPQ (NSQ) & Bukti SK IJOP Kemenag",
    description: "Identitas lengkap satuan pendidikan Al-Qur'an, status badan hukum yayasan, susunan izin operasional Kemenag, dan data geospasial.",
    generateHtml: function(store) {
      const inst = store.institution;
      const santriCount = store.santri.length;
      const ustadzCount = store.ustadz.length;
      const invCount = store.inventaris.length;

      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">PROFIL SATUAN PENDIDIKAN AL-QUR'AN (TPQ)</h3>
            <p class="text-xs font-mono font-medium mt-1">DOKUMEN PORTOFOLIO AKREDITASI LEMBAGA</p>
          </div>

          <div class="text-xs space-y-4">
            <table class="w-full border border-slate-300">
              <tr class="bg-slate-100 font-bold">
                <td colspan="3" class="p-2.5 border-b border-slate-300 text-emerald-950">A. IDENTITAS UTAMA LEMBAGA</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 w-56 font-medium text-slate-600">1. Nama Lembaga</td>
                <td class="p-2 w-4">:</td>
                <td class="p-2 font-bold text-slate-900">${inst.name}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">2. Nomor Statistik TPQ (NSQ)</td>
                <td class="p-2">:</td>
                <td class="p-2 font-mono font-bold text-emerald-800">${inst.nsq}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">3. Nomor SK Izin Operasional (IJOP)</td>
                <td class="p-2">:</td>
                <td class="p-2 font-mono">${inst.ijop}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">4. Yayasan Penyelenggara</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold text-slate-900">${inst.foundation}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">5. Akta Notaris & SK Kemenkumham</td>
                <td class="p-2">:</td>
                <td class="p-2 font-mono">${inst.notary}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">6. Afiliasi Organisasi Induk</td>
                <td class="p-2">:</td>
                <td class="p-2">${inst.affiliation}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">7. Alamat Lengkap Lembaga</td>
                <td class="p-2">:</td>
                <td class="p-2">${inst.address}, Kel/Desa ${inst.village}, Kec. ${inst.subdistrict}, ${inst.city}, ${inst.province} (${inst.postCode})</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">8. Nomor Kontak / WhatsApp</td>
                <td class="p-2">:</td>
                <td class="p-2 font-mono">${inst.phone}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">9. Alamat Surel (Email Resmi)</td>
                <td class="p-2">:</td>
                <td class="p-2 font-mono">${inst.email}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">10. Metode Pengajaran Al-Qur'an</td>
                <td class="p-2">:</td>
                <td class="p-2 font-semibold text-emerald-900">${inst.method}</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">11. Target Peringkat Akreditasi</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold text-emerald-800">${inst.targetAccreditation}</td>
              </tr>

              <tr class="bg-slate-100 font-bold">
                <td colspan="3" class="p-2.5 border-b border-slate-300 text-emerald-950">B. REKAPITULASI DATA STATISTIK PENDIDIKAN</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">1. Total Santri Terdaftar (EMIS)</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold">${santriCount} Santri Aktif</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">2. Total Tenaga Pengajar (Ustadz/ah)</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold">${ustadzCount} Pendidik Berkualifikasi</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">3. Rasio Guru dan Santri</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold text-emerald-800">1 : ${Math.round(santriCount / (ustadzCount || 1))} (Sangat Ideal & Kondusif)</td>
              </tr>
              <tr class="border-b border-slate-200">
                <td class="p-2 font-medium text-slate-600">4. Total Item Inventaris Terdata</td>
                <td class="p-2">:</td>
                <td class="p-2 font-bold">${invCount} Kategori Aset Sarana</td>
              </tr>
              <tr>
                <td class="p-2 font-medium text-slate-600">5. Waktu Belajar Operasional</td>
                <td class="p-2">:</td>
                <td class="p-2">Senin s.d Sabtu (Pukul 15.30 - 17.00 WIB)</td>
              </tr>
            </table>

            ${renderTandaTangan(inst, "Mengetahui, Ketua Yayasan", inst.headFoundation, "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 2. DOKUMEN PESERTA DIDIK & PENDAFTARAN
  {
    id: "DOC-FULL-FORMULIR",
    catId: "kesiswaan",
    code: "KESISWAAN-00",
    title: "Formulir Pendaftaran Calon Santri Baru (Dapat Disesuaikan)",
    subtitle: "Biodata Calon Peserta Didik & Identitas Orang Tua / Wali • Blanko & Terisi",
    description: "Formulir pendaftaran resmi calon santri baru yang memuat rincian identitas santri, data orang tua/wali, serta lampiran berkas persyaratan. Seluruh teks dan kolom dapat disesuaikan sewaktu-waktu pada menu Kelola Data & Inputan.",
    generateHtml: function(store) {
      return renderFormulirPendaftaran(store, { mode: 'blank' });
    }
  },

  {
    id: "DOC-FULL-201",
    catId: "kesiswaan",
    code: "KESISWAAN-01",
    title: "Buku Induk Peserta Didik (Santri) Standar EMIS Kemenag",
    subtitle: "Daftar Rekapitulasi Induk Santri Aktif & Riwayat Tingkatan Jilid",
    description: "Format buku induk resmi yang mengintegrasikan data NIK, NIS, nama orang tua, alamat, dan tingkatan jilid belajar secara otomatis dari database santri.",
    generateHtml: function(store) {
      const inst = store.institution;
      const santri = store.santri;

      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">BUKU INDUK PESERTA DIDIK (SANTRI)</h3>
            <p class="text-xs font-mono font-medium mt-1">SINKRONISASI DATABASE PENDIDIKAN AL-QUR'AN (EMIS KEMENAG RI)</p>
            <p class="text-xs text-slate-600 mt-1">Tahun Ajaran: ${inst.activeYear}</p>
          </div>

          <div class="text-xs">
            <div class="overflow-x-auto">
              <table class="w-full border border-slate-400 text-[11px]">
                <thead class="bg-slate-100 font-bold border-b border-slate-400">
                  <tr>
                    <th class="p-1.5 border-r border-slate-400 text-center w-8">No</th>
                    <th class="p-1.5 border-r border-slate-400 w-20">NIS / NISN</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">NIK Santri</th>
                    <th class="p-1.5 border-r border-slate-400">Nama Lengkap Santri</th>
                    <th class="p-1.5 border-r border-slate-400 w-8 text-center">L/P</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">Tempat, Tgl Lahir</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">Jilid / Kelas</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Nama Orang Tua</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">No. HP Wali</th>
                    <th class="p-1.5 text-center w-16">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-300">
                  ${santri.map((s, idx) => `
                    <tr class="${idx % 2 === 1 ? 'bg-slate-50' : ''}">
                      <td class="p-1.5 text-center border-r border-slate-300">${idx + 1}</td>
                      <td class="p-1.5 font-mono border-r border-slate-300">${s.nis}</td>
                      <td class="p-1.5 font-mono border-r border-slate-300 text-slate-700">${s.nik}</td>
                      <td class="p-1.5 font-bold border-r border-slate-300 text-slate-900">${s.name}</td>
                      <td class="p-1.5 text-center font-bold border-r border-slate-300 text-emerald-800">${s.gender}</td>
                      <td class="p-1.5 border-r border-slate-300">${s.birthPlace}, ${s.birthDate}</td>
                      <td class="p-1.5 font-semibold text-emerald-900 border-r border-slate-300">${s.classLevel}</td>
                      <td class="p-1.5 border-r border-slate-300">${s.parentName}</td>
                      <td class="p-1.5 font-mono border-r border-slate-300">${s.parentPhone}</td>
                      <td class="p-1.5 text-center font-semibold text-[10px]"><span class="px-1.5 py-0.5 rounded ${s.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">${s.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="mt-4 flex justify-between text-xs text-slate-600">
              <p>Total Santri Terdaftar: <strong>${santri.length} Santri</strong> (Putra: ${santri.filter(s=>s.gender==='L').length}, Putri: ${santri.filter(s=>s.gender==='P').length})</p>
              <p>Data Terverifikasi Resmi oleh Bagian Kesiswaan & EMIS TPQ</p>
            </div>

            ${renderTandaTangan(inst, "Koordinator Kesiswaan", "Ustadz Ahmad Fauzi, S.Pd", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 3. DOKUMEN PENDIDIK (BUKU INDUK GURU & SYAHADAH)
  {
    id: "DOC-FULL-301",
    catId: "ketenagakerjaan",
    code: "GURU-01",
    title: "Buku Induk Ustadz/Ustadzah & Syahadah Kompetensi",
    subtitle: "Data Kualifikasi Pendidik Al-Qur'an & Pemegang Syahadah Resmi",
    description: "Format buku induk pendidik lengkap dengan catatan legalitas syahadah metode baca Al-Qur'an, latar belakang pesantren, pendidikan formal, dan rombel mengajar.",
    generateHtml: function(store) {
      const inst = store.institution;
      const ustadz = store.ustadz;

      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">BUKU INDUK PENDIDIK & TENAGA KEPENDIDIKAN (PTK)</h3>
            <p class="text-xs font-mono font-medium mt-1">STANDAR KOMPETENSI GURU AL-QUR'AN TPQ MUSLIMAT NU AL-IKHLAS</p>
          </div>

          <div class="text-xs">
            <div class="overflow-x-auto">
              <table class="w-full border border-slate-400 text-[11px]">
                <thead class="bg-slate-100 font-bold border-b border-slate-400">
                  <tr>
                    <th class="p-1.5 border-r border-slate-400 text-center w-8">No</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">NIP / NIK</th>
                    <th class="p-1.5 border-r border-slate-400">Nama Lengkap & Gelar</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Pendidikan Formal</th>
                    <th class="p-1.5 border-r border-slate-400 w-32">Riwayat Pesantren</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Syahadah Metode</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Nomor Syahadah</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">Tugas Mengajar</th>
                    <th class="p-1.5 text-center w-20">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-300">
                  ${ustadz.map((u, idx) => `
                    <tr class="${idx % 2 === 1 ? 'bg-slate-50' : ''}">
                      <td class="p-1.5 text-center border-r border-slate-300">${idx + 1}</td>
                      <td class="p-1.5 font-mono border-r border-slate-300 text-slate-700">${u.nip}<br><span class="text-[9px] text-slate-500">${u.nik}</span></td>
                      <td class="p-1.5 font-bold border-r border-slate-300 text-slate-900">${u.name}</td>
                      <td class="p-1.5 border-r border-slate-300">${u.education}</td>
                      <td class="p-1.5 border-r border-slate-300 text-slate-700">${u.pesantren}</td>
                      <td class="p-1.5 font-semibold text-emerald-900 border-r border-slate-300">${u.syahadahMethod} (${u.syahadahYear})</td>
                      <td class="p-1.5 font-mono text-[10px] border-r border-slate-300">${u.syahadahNumber}</td>
                      <td class="p-1.5 border-r border-slate-300 font-medium">${u.assignedClass}</td>
                      <td class="p-1.5 text-center font-semibold text-[10px]"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">${u.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs">
              <p><strong>Verifikasi Persentase Syahadah Asesor:</strong> Dari total ${ustadz.length} ustadz/ustadzah, sebanyak <strong>${ustadz.filter(u=>u.syahadahNumber && u.syahadahNumber !== '-').length} ustadzah (${Math.round((ustadz.filter(u=>u.syahadahNumber && u.syahadahNumber !== '-').length/ustadz.length)*100)}%)</strong> telah bersertifikat syahadah kelayakan mengajar Al-Qur'an resmi. Memenuhi kriteria standar mutu Kemenag (minimal 70%).</p>
            </div>

            ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 4. DOKUMEN SARANA & PRASARANA (BUKU INVENTARIS)
  {
    id: "DOC-FULL-401",
    catId: "sarpras_keuangan",
    code: "SARPRAS-01",
    title: "Buku Inventaris Barang & Aset Sarana Prasarana",
    subtitle: "Daftar Kode Aset, Volume, Kondisi Kelayakan & Lokasi Ruang",
    description: "Catatan inventarisasi aset sarana pembelajaran (meja rekal, karpet, papan tulis, mushaf, sound) dengan kodefikasi baku.",
    generateHtml: function(store) {
      const inst = store.institution;
      const inv = store.inventaris;

      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">BUKU INVENTARIS BARANG & ASET SARANA PRASARANA</h3>
            <p class="text-xs font-mono font-medium mt-1">TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH</p>
          </div>

          <div class="text-xs">
            <div class="overflow-x-auto">
              <table class="w-full border border-slate-400 text-[11px]">
                <thead class="bg-slate-100 font-bold border-b border-slate-400">
                  <tr>
                    <th class="p-1.5 border-r border-slate-400 text-center w-8">No</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Kode Barang</th>
                    <th class="p-1.5 border-r border-slate-400">Nama Barang / Fasilitas</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">Kategori</th>
                    <th class="p-1.5 border-r border-slate-400 w-16 text-center">Jumlah</th>
                    <th class="p-1.5 border-r border-slate-400 w-16 text-center">Kondisi</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Sumber Perolehan</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">Tahun</th>
                    <th class="p-1.5 w-28">Lokasi Ruang</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-300">
                  ${inv.map((item, idx) => `
                    <tr class="${idx % 2 === 1 ? 'bg-slate-50' : ''}">
                      <td class="p-1.5 text-center border-r border-slate-300">${idx + 1}</td>
                      <td class="p-1.5 font-mono text-[10px] border-r border-slate-300">${item.code}</td>
                      <td class="p-1.5 font-bold border-r border-slate-300 text-slate-900">${item.name}</td>
                      <td class="p-1.5 border-r border-slate-300">${item.category}</td>
                      <td class="p-1.5 text-center font-bold border-r border-slate-300">${item.qty} ${item.unit}</td>
                      <td class="p-1.5 text-center border-r border-slate-300 font-semibold text-[10px]"><span class="px-1.5 py-0.5 rounded ${item.condition === 'Baik' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${item.condition}</span></td>
                      <td class="p-1.5 border-r border-slate-300 text-slate-700">${item.source}</td>
                      <td class="p-1.5 text-center border-r border-slate-300">${item.acqYear}</td>
                      <td class="p-1.5">${item.location}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="mt-4 flex justify-between text-xs text-slate-600">
              <p>Total Jenis Aset Terdata: <strong>${inv.length} Aset</strong> | Kondisi Baik: <strong>${inv.filter(i=>i.condition==='Baik').length}</strong></p>
              <p>Perawatan Berkala dilakukan setiap akhir semester oleh Koordinator Sarpras</p>
            </div>

            ${renderTandaTangan(inst, "Koordinator Sarpras & K3", "Ustadzah Siti Rokhmah", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 5. DOKUMEN KEUANGAN (BUKU KAS UMUM)
  {
    id: "DOC-FULL-501",
    catId: "sarpras_keuangan",
    code: "KEUANGAN-01",
    title: "Buku Kas Umum (BKU) & Laporan Keuangan TPQ",
    subtitle: "Pencatatan Arus Kas Pemasukan Infaq, Donasi & Biaya Operasional",
    description: "Format pembukuan kas umum berstandar akuntansi nirlaba madrasah lengkap dengan saldo berjalan, bukti nota, dan rekonsiliasi kas.",
    generateHtml: function(store) {
      const inst = store.institution;
      const kas = store.kas;

      let runningBalance = 0;
      let totalIn = 0;
      let totalOut = 0;

      const rows = kas.map((k, idx) => {
        const amt = Number(k.amount) || 0;
        if (k.type === 'in') {
          runningBalance += amt;
          totalIn += amt;
        } else {
          runningBalance -= amt;
          totalOut += amt;
        }

        return `
          <tr class="${idx % 2 === 1 ? 'bg-slate-50' : ''}">
            <td class="p-1.5 text-center border-r border-slate-300">${idx + 1}</td>
            <td class="p-1.5 font-mono border-r border-slate-300">${k.date}</td>
            <td class="p-1.5 font-mono text-[10px] border-r border-slate-300">${k.proofNumber}</td>
            <td class="p-1.5 border-r border-slate-300 font-medium text-slate-900">${k.description}</td>
            <td class="p-1.5 border-r border-slate-300 text-[10px] text-slate-600">${k.category}</td>
            <td class="p-1.5 text-right font-mono border-r border-slate-300 text-emerald-800">${k.type === 'in' ? formatRupiah(amt) : '-'}</td>
            <td class="p-1.5 text-right font-mono border-r border-slate-300 text-rose-800">${k.type === 'out' ? formatRupiah(amt) : '-'}</td>
            <td class="p-1.5 text-right font-mono font-bold text-slate-900">${formatRupiah(runningBalance)}</td>
          </tr>
        `;
      }).join('');

      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">BUKU KAS UMUM (BKU) OPERASIONAL TPQ</h3>
            <p class="text-xs font-mono font-medium mt-1">LAPORAN PENERIMAAN & PENGELUARAN KEUANGAN LEMBAGA</p>
          </div>

          <div class="text-xs">
            <div class="overflow-x-auto">
              <table class="w-full border border-slate-400 text-[11px]">
                <thead class="bg-slate-100 font-bold border-b border-slate-400">
                  <tr>
                    <th class="p-1.5 border-r border-slate-400 text-center w-8">No</th>
                    <th class="p-1.5 border-r border-slate-400 w-20">Tanggal</th>
                    <th class="p-1.5 border-r border-slate-400 w-24">No. Bukti</th>
                    <th class="p-1.5 border-r border-slate-400">Uraian Transaksi</th>
                    <th class="p-1.5 border-r border-slate-400 w-28">Kategori</th>
                    <th class="p-1.5 border-r border-slate-400 text-right w-24 text-emerald-900">Pemasukan (Rp)</th>
                    <th class="p-1.5 border-r border-slate-400 text-right w-24 text-rose-900">Pengeluaran (Rp)</th>
                    <th class="p-1.5 text-right w-28 font-bold">Saldo Akhir (Rp)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-300">
                  ${rows}
                </tbody>
                <tfoot class="bg-slate-100 font-bold border-t-2 border-slate-400 text-[11px]">
                  <tr>
                    <td colspan="5" class="p-2 text-right border-r border-slate-400">TOTAL AKUMULASI :</td>
                    <td class="p-2 text-right border-r border-slate-400 text-emerald-800 font-mono">${formatRupiah(totalIn)}</td>
                    <td class="p-2 text-right border-r border-slate-400 text-rose-800 font-mono">${formatRupiah(totalOut)}</td>
                    <td class="p-2 text-right font-mono text-emerald-900">${formatRupiah(runningBalance)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span>Saldo Kas Tunai Saat Ini:</span>
                <span class="text-sm font-bold text-emerald-800 ml-1 font-mono">${formatRupiah(runningBalance)}</span>
              </div>
              <div class="text-slate-500 text-[11px]">
                Seluruh pengeluaran telah didukung nota fisik kuitansi bernomor seri.
              </div>
            </div>

            ${renderTandaTangan(inst, "Bendahara TPQ", "Ustadzah Nurul Hidayati, S.E", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 6. DOKUMEN KURIKULUM & SOP KBM (90 MENIT)
  {
    id: "DOC-FULL-601",
    catId: "kurikulum",
    code: "KURIKULUM-01",
    title: "SOP Standar Kegiatan Belajar Mengajar (KBM) 90 Menit",
    subtitle: "Metodologi Sorogan Al-Qur'an, Klasikal Peraga & Amaliyah Aswaja",
    description: "Pedoman baku alur pembelajaran harian dengan pembagian waktu apersepsi, peraga CBSA, sorogan privat, materi Aswaja, dan penutupan tertib.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">STANDAR OPERASIONAL PROSEDUR (SOP)</h3>
            <p class="text-xs font-mono font-medium mt-1">PROSES PEMBELAJARAN & KBM AL-QUR'AN HARIAN (90 MENIT)</p>
            <p class="text-xs text-slate-600 mt-1">Nomor SOP: SOP-02/KBM-TPQ/AL-IKHLAS/2026</p>
          </div>

          <div class="text-xs space-y-4 text-justify leading-relaxed">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <table class="w-full text-xs">
                <tr><td class="w-36 font-bold text-slate-600">Unit Pelaksana</td><td class="w-4">:</td><td>Ustadz / Ustadzah Pengampu Kelas TPQ</td></tr>
                <tr><td class="font-bold text-slate-600">Sasaran</td><td>:</td><td>Seluruh Santri TPQ Muslimat NU AL-IKHLAS (Jilid 1 s.d Pasca TPQ)</td></tr>
                <tr><td class="font-bold text-slate-600">Waktu Pelaksanaan</td><td>:</td><td>Senin - Sabtu (Pukul 15.30 - 17.00 WIB)</td></tr>
                <tr><td class="font-bold text-slate-600">Prinsip Belajar</td><td>:</td><td>CBSA (Cara Belajar Santri Aktif), Mahabbah (Kasih Sayang), & Tartil Tajwid</td></tr>
              </table>
            </div>

            <h4 class="font-bold text-emerald-950 uppercase border-b border-emerald-900 pb-1 mt-4">ALUR RINCIAN WAKTU PEMBELAJARAN:</h4>

            <div class="space-y-3">
              <div class="border-l-4 border-emerald-700 pl-3">
                <div class="flex items-center justify-between font-bold text-slate-900">
                  <span>TAHAP I : PEMBUKAAN & PEMBIASAAN ADAB (15 Menit | 15.30 - 15.45 WIB)</span>
                  <span class="text-emerald-800 text-[11px]">Klasikal Ruang Utama</span>
                </div>
                <p class="text-slate-700 mt-1">1. Santri melepas alas kaki dengan tertib, berwudhu di tempat wudhu khusus, dan duduk melingkar rapi di atas karpet.</p>
                <p class="text-slate-700">2. Ustadzah memimpin salam, tawasul Surat Al-Fatihah kepada Rasulullah SAW, Masyayikh NU, dan Pendiri Yayasan AL FATAH.</p>
                <p class="text-slate-700">3. Bersama-sama melantunkan Nadhom Asmaul Husna, Sholawat Tibbil Qulub, Sholawat Nahdliyyah, dan Doa Masuk Belajar Al-Qur'an.</p>
              </div>

              <div class="border-l-4 border-blue-700 pl-3">
                <div class="flex items-center justify-between font-bold text-slate-900">
                  <span>TAHAP II : PENANAMAN KONSEP / PERAGA KLASIKAL (15 Menit | 15.45 - 16.00 WIB)</span>
                  <span class="text-blue-800 text-[11px]">Alat Peraga Dinding</span>
                </div>
                <p class="text-slate-700 mt-1">1. Ustadzah membuka alat peraga jilid klasikal sesuai pokok bahasan harian.</p>
                <p class="text-slate-700">2. Guru memberi contoh bacaan tajwid secara tartil tanpa mengeja. Santri menirukan secara serentak (klasikal murni).</p>
                <p class="text-slate-700">3. Guru menunjuk santri acak membaca per baris guna menguji ketajaman makhraj dan panjang pendek (mad).</p>
              </div>

              <div class="border-l-4 border-amber-700 pl-3">
                <div class="flex items-center justify-between font-bold text-slate-900">
                  <span>TAHAP III : SOROGAN INDIVIDUAL & BACA-SIMAK (40 Menit | 16.00 - 16.40 WIB)</span>
                  <span class="text-amber-800 text-[11px]">Sorogan Meja Rekal</span>
                </div>
                <p class="text-slate-700 mt-1">1. Santri maju satu per satu menghadap guru dengan membawa buku jilid/Al-Qur'an yang diletakkan di atas rekal.</p>
                <p class="text-slate-700">2. Santri membaca mandiri; guru mendengarkan dan hanya memberi isyarat ketukan bila terjadi kekeliruan makhraj/tajwid.</p>
                <p class="text-slate-700">3. Guru langsung memberi nilai dan paraf pada Buku Prestasi / Kartu Mutaba'ah santri.</p>
                <p class="text-slate-700">4. Santri yang belum giliran melakukan baca-simak berpasangan atau menulis kaligrafi hijaiyah di meja masing-masing.</p>
              </div>

              <div class="border-l-4 border-teal-700 pl-3">
                <div class="flex items-center justify-between font-bold text-slate-900">
                  <span>TAHAP IV : MATERI KEKHASAN ASWAJA & PRAKTIK IBADAH (10 Menit | 16.40 - 16.50 WIB)</span>
                  <span class="text-teal-800 text-[11px]">Muatan Lokal NU</span>
                </div>
                <p class="text-slate-700 mt-1">1. Penguatan hafalan surat pendek Juz 'Amma dan Doa Harian.</p>
                <p class="text-slate-700">2. Bimbingan hafalan Doa Qunut Shubuh dan tata cara bersuci/sholat sesuai fiqih Madzhab Syafi'i.</p>
              </div>

              <div class="border-l-4 border-purple-700 pl-3">
                <div class="flex items-center justify-between font-bold text-slate-900">
                  <span>TAHAP V : PENUTUP & KELAS TERTIB (10 Menit | 16.50 - 17.00 WIB)</span>
                  <span class="text-purple-800 text-[11px]">Doa Khotmil Qur'an</span>
                </div>
                <p class="text-slate-700 mt-1">1. Nasehat penutup dan pesan akhlakul karimah kepada santri.</p>
                <p class="text-slate-700">2. Pembacaan Doa Khotmil Qur'an: <em>"Allahummarhamna bil Qur'an..."</em> dan Doa Kafaratul Majlis.</p>
                <p class="text-slate-700">3. Santri bersalaman mencium tangan ustadzah secara tertib dan pulang dijemput wali santri.</p>
              </div>
            </div>

            ${renderTandaTangan(inst, "Koordinator Kurikulum & Mutu", "Ustadzah Maimunah, S.Ag", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 7. DOKUMEN KEKHASAN KE-NU-AN & ASWAJA
  {
    id: "DOC-FULL-701",
    catId: "kekhasan_nu",
    code: "ASWAJA-01",
    title: "Silabus Muatan Lokal Ke-NU-an & Amaliyah Aswaja",
    subtitle: "Paham Ahlussunnah wal Jama'ah An-Nahdliyah untuk Santri TPQ",
    description: "Pedoman pembelajaran materi ciri khas Muslimat NU: Doa Qunut Shubuh, wirid sholat maktubah, Sholawat Nariyah & Tibbil Qulub, serta Hari Santri.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">SILABUS MUATAN LOKAL KE-NU-AN & AMALIYAH ASWAJA</h3>
            <p class="text-xs font-mono font-medium mt-1">CIRI KHAS PENDIDIKAN TPQ MUSLIMAT NU AL-IKHLAS</p>
          </div>

          <div class="text-xs space-y-4 leading-relaxed text-justify">
            <p>
              Sebagai lembaga pendidikan Al-Qur'an di bawah binaan Yayasan AL FATAH dan berafiliasi dengan Jam'iyyah Muslimat Nahdlatul Ulama, TPQ Muslimat NU AL-IKHLAS membekali santri sejak dini dengan akidah, syariah, dan akhlak berhaluan <strong>Ahlussunnah wal Jama'ah An-Nahdliyah</strong>.
            </p>

            <table class="w-full border border-slate-400 text-xs mt-3">
              <thead class="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th class="p-2 border-r border-slate-400 w-12 text-center">No</th>
                  <th class="p-2 border-r border-slate-400 w-44">Kompetensi Dasar</th>
                  <th class="p-2 border-r border-slate-400">Materi Pokok Pembiasaan</th>
                  <th class="p-2 w-36">Indikator Keberhasilan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-300">
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">1</td>
                  <td class="p-2 font-semibold border-r border-slate-300">Amaliyah Sholat Fardhu</td>
                  <td class="p-2 border-r border-slate-300">Praktik sholat berjamaah, hafalan <strong>Doa Qunut Shubuh</strong> lengkap, dan adab sujud sahwi.</td>
                  <td class="p-2 text-emerald-900 font-medium">Santri hafal qunut shubuh di luar kepala dengan makhraj fasih.</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">2</td>
                  <td class="p-2 font-semibold border-r border-slate-300">Wirid & Dzikir Ba'da Sholat</td>
                  <td class="p-2 border-r border-slate-300">Bacaan istighfar, Tasbih-Tahmid-Takbir 33x, Ayat Kursi, dan doa bersama ba'da sholat maktubah.</td>
                  <td class="p-2 text-emerald-900 font-medium">Santri terbiasa berdzikir tertib tidak langsung beranjak pergi.</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">3</td>
                  <td class="p-2 font-semibold border-r border-slate-300">Mahabbah Rasul & Sholawat</td>
                  <td class="p-2 border-r border-slate-300">Pelantunan Sholawat Tibbil Qulub, Sholawat Nariyah, Sholawat Nahdliyyah, dan Sholawat Asyghil.</td>
                  <td class="p-2 text-emerald-900 font-medium">Santri melantunkan sholawat bersama sebelum membuka kelas.</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">4</td>
                  <td class="p-2 font-semibold border-r border-slate-300">Ke-NU-an & Kebangsaan</td>
                  <td class="p-2 border-r border-slate-300">Pengenalan Lambang Bintang 9 & Tali Jagad NU, Tokoh Pendiri (Hadratussyaikh KH. Hasyim Asy'ari), cinta tanah air (Hubbul Wathan).</td>
                  <td class="p-2 text-emerald-900 font-medium">Santri mengenal identitas santri NU dan lambang kebangsaan RI.</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">5</td>
                  <td class="p-2 font-semibold border-r border-slate-300">Peringatan Hari Besar Islam (PHBI)</td>
                  <td class="p-2 border-r border-slate-300">Peringatan Hari Santri Nasional (22 Oktober), Pawai Ta'aruf Muharram, dan Maulid Nabi Muhammad SAW.</td>
                  <td class="p-2 text-emerald-900 font-medium">Santri aktif mengikuti karnaval dan apel hari santri bersarung/berjilbab.</td>
                </tr>
              </tbody>
            </table>

            <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
              <p><strong>Naskah Doa Qunut Shubuh yang Diwajibkan:</strong></p>
              <p class="font-arabic text-sm text-right my-2 font-bold leading-loose">
                اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ، وَعَافِنِيْ فِيْمَنْ عَافَيْتَ، وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ، وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ، وَقِنِيْ شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِيْ وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، وَأَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ، وَصَلَّى اللهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ
              </p>
            </div>

            ${renderTandaTangan(inst, "Koordinator Aswaja & Ke-NU-an", "Ibu Hj. Masruroh Wahid", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 8. DOKUMEN TATA TERTIB & KODE ETIK
  {
    id: "DOC-FULL-801",
    catId: "sop_tata_kelola",
    code: "TATIB-01",
    title: "Tata Tertib Santri & Kode Etik Ustadzah TPQ",
    subtitle: "Aturan Disiplin, Busana Muslim, Hak & Kewajiban Santri dan Wali",
    description: "Pedoman tata tertib resmi lembaga, sanksi pembinaan berbasis kasih sayang, dan kode etik tenaga pendidik Al-Qur'an.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">TATA TERTIB SANTRI, WALI SANTRI & KODE ETIK PENGAJAR</h3>
            <p class="text-xs font-mono font-medium mt-1">TPQ MUSLIMAT NU AL-IKHLAS - YAYASAN AL FATAH</p>
          </div>

          <div class="text-xs space-y-4 leading-relaxed text-justify">
            <div>
              <h4 class="font-bold text-emerald-950 uppercase border-b border-emerald-800 pb-1">BAB I : TATA TERTIB SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1 mt-2">
                <li>Santri wajib hadir di TPQ 10 menit sebelum jam pelajaran dimulai (Pukul 15.20 WIB).</li>
                <li>Santri berpakaian sopan, bersih, dan islami:
                  <ul class="list-disc pl-5 mt-0.5 text-slate-600">
                    <li>Santri Putra: Baju koko rapi, celana panjang/sarung, peci hitam/putih.</li>
                    <li>Santri Putri: Busana muslimah longgar dan jilbab rapi menutup aurat (seragam hijau Muslimat NU pada hari Rabu & Kamis).</li>
                  </ul>
                </li>
                <li>Santri wajib menjaga wudhu dan meletakkan buku jilid/Al-Qur'an di atas meja rekal, tidak boleh ditaruh di lantai.</li>
                <li>Santri yang berhalangan hadir wajib menyampaikan surat izin dari orang tua kepada ustadzah.</li>
                <li>Dilarang membawa mainan berbahaya, benda tajam, dan smartphone ke dalam ruang kelas.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-950 uppercase border-b border-emerald-800 pb-1">BAB II : TATA TERTIB WALI SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1 mt-2">
                <li>Mengantar dan menjemput santri tepat waktu di area gerbang luar TPQ demi ketertiban KBM.</li>
                <li>Memeriksa dan menandatangani Buku Prestasi / Kartu Mutaba'ah santri setiap hari di rumah.</li>
                <li>Mendampingi santri mengulang bacaan jilid minimal 10-15 menit setiap ba'da Maghrib.</li>
                <li>Menunaikan kewajiban infaq bulanan (SPP) secara tepat waktu selambatnya tanggal 10 setiap bulan.</li>
                <li>Menghadiri pertemuan paguyuban wali santri / parenting yang diselenggarakan pengurus TPQ.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-950 uppercase border-b border-emerald-800 pb-1">BAB III : KODE ETIK USTADZ / USTADZAH</h4>
              <ol class="list-decimal pl-5 space-y-1 mt-2">
                <li>Ikhlas lillahi ta'ala dalam mengajar Al-Qur'an dan menjadi uswah hasanah (teladan yang baik).</li>
                <li>Mendidik dengan penuh mahabbah (kasih sayang), kesabaran, dan dilarang keras menggunakan kekerasan fisik atau verbal.</li>
                <li>Menjaga kaidah tajwid dan fashohah murni sesuai standar metode bacaan Al-Qur'an yang disepakati lembaga.</li>
                <li>Hadir tepat waktu dan mengisi presensi harian serta jurnal mengajar.</li>
              </ol>
            </div>

            ${renderTandaTangan(inst, "Ketua Komite Wali Santri", "Bpk. H. Ridwan Santoso", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 9. DOKUMEN KOMITE WALI SANTRI
  {
    id: "DOC-FULL-901",
    catId: "humas_kemitraan",
    code: "KOMITE-01",
    title: "SK Pembentukan Komite / Paguyuban Wali Santri",
    subtitle: "Masa Bakti 2026 - 2028 • Sinergi Lembaga dan Keluarga Santri",
    description: "Surat keputusan pengangkatan perwakilan wali santri sebagai mitra strategis dalam pengembangan sarana, wisuda khotmil Qur'an, dan parenting.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">SURAT KEPUTUSAN KEPALA TPQ MUSLIMAT NU AL-IKHLAS</h3>
            <p class="text-xs font-mono font-medium mt-1">Nomor: 018/SK-KOM/TPQ-ALIKHLAS/VIII/2026</p>
            <p class="text-xs font-bold mt-2 uppercase">TENTANG:<br>PEMBENTUKAN DAN PENETAPAN SUSUNAN PENGURUS KOMITE / PAGUYUBAN WALI SANTRI<br>TPQ MUSLIMAT NU AL-IKHLAS MASA BAKTI 2026 - 2028</p>
          </div>

          <div class="text-xs space-y-4 leading-relaxed text-justify">
            <p>
              Menimbang perlunya kemitraan yang erat antara pihak pengurus TPQ Muslimat NU AL-IKHLAS, Yayasan AL FATAH, dan para orang tua/wali santri dalam rangka menyukseskan pendidikan Al-Qur'an serta persiapan akreditasi lembaga, maka ditetapkanlah Pengurus Komite Wali Santri.
            </p>

            <table class="w-full border border-slate-400 text-xs mt-3">
              <thead class="bg-slate-100 font-bold border-b border-slate-400">
                <tr>
                  <th class="p-2 border-r border-slate-400 w-12 text-center">No</th>
                  <th class="p-2 border-r border-slate-400 w-44">Jabatan Komite</th>
                  <th class="p-2 border-r border-slate-400">Nama Lengkap</th>
                  <th class="p-2">Wali Dari Santri</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-300">
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">1</td>
                  <td class="p-2 font-bold border-r border-slate-300">Ketua Komite</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Bpk. H. Ridwan Santoso, S.T</td>
                  <td class="p-2">Muhammad Bilal Al-Ghifari (Jilid 4)</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">2</td>
                  <td class="p-2 font-bold border-r border-slate-300">Wakil Ketua</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Ibu Hj. Sholihatun Nisa</td>
                  <td class="p-2">Aisyah Nur Ramadhani (Al-Qur'an)</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">3</td>
                  <td class="p-2 font-bold border-r border-slate-300">Sekretaris</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Ibu Dian Kusuma, S.Pd</td>
                  <td class="p-2">Fatimah Az-Zahra (Jilid 3)</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">4</td>
                  <td class="p-2 font-bold border-r border-slate-300">Bendahara</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Ibu Sri Wahyuni</td>
                  <td class="p-2">Ahmad Zaki Mubarak (Jilid 5)</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">5</td>
                  <td class="p-2 font-bold border-r border-slate-300">Seksi Sarana & Sosial</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Bpk. Bambang Supriyadi</td>
                  <td class="p-2">Ibrahim Hanif (Jilid 2)</td>
                </tr>
                <tr>
                  <td class="p-2 text-center border-r border-slate-300">6</td>
                  <td class="p-2 font-bold border-r border-slate-300">Seksi Acara & Wisuda</td>
                  <td class="p-2 font-semibold text-slate-900 border-r border-slate-300">Ibu Nur Lailatul Qodriyah</td>
                  <td class="p-2">Khadijah Maryam (Jilid 4)</td>
                </tr>
              </tbody>
            </table>

            ${renderTandaTangan(inst, "Ketua Komite Terpilih", "Bpk. H. Ridwan Santoso, S.T", "Kepala TPQ Muslimat NU AL-IKHLAS", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 10. DOKUMEN PAKTA INTEGRITAS AKREDITASI
  {
    id: "DOC-FULL-1001",
    catId: "kelembagaan",
    code: "INTEGRITAS-01",
    title: "Surat Pernyataan & Pakta Integritas Kesiapan Akreditasi",
    subtitle: "Komitmen Keabsahan Dokumen & Kesiapan Visitasi Tim Asesor",
    description: "Pernyataan tertulis resmi bermaterai yang menjamin validitas seluruh bukti fisik dan keterbukaan informasi saat visitasi lapangan.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">SURAT PERNYATAAN / PAKTA INTEGRITAS</h3>
            <p class="text-xs font-mono font-medium mt-1">KESIAPAN VISITASI AKREDITASI LEMBAGA PENDIDIKAN AL-QUR'AN</p>
          </div>

          <div class="text-xs space-y-4 leading-relaxed text-justify">
            <p>Yang bertanda tangan di bawah ini:</p>
            <table class="w-full text-xs">
              <tr><td class="w-44 font-semibold text-slate-600">Nama Lengkap</td><td class="w-4">:</td><td class="font-bold text-slate-900">${inst.headmaster}</td></tr>
              <tr><td class="font-semibold text-slate-600">Jabatan</td><td>:</td><td>Kepala TPQ Muslimat NU AL-IKHLAS</td></tr>
              <tr><td class="font-semibold text-slate-600">Nama Lembaga</td><td>:</td><td class="font-bold">${inst.name}</td></tr>
              <tr><td class="font-semibold text-slate-600">Yayasan Pengampu</td><td>:</td><td>${inst.foundation}</td></tr>
              <tr><td class="font-semibold text-slate-600">Nomor Statistik TPQ (NSQ)</td><td>:</td><td class="font-mono font-bold">${inst.nsq}</td></tr>
              <tr><td class="font-semibold text-slate-600">Alamat Lembaga</td><td>:</td><td>${inst.address}, ${inst.village}, ${inst.subdistrict}, ${inst.city}</td></tr>
            </table>

            <p class="mt-2">Dengan ini menyatakan dengan penuh kejujuran dan tanggung jawab di hadapan Allah SWT bahwa:</p>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Seluruh berkas administrasi, data santri, data pendidik, buku inventaris, dan bukti keuangan yang dilampirkan dalam portofolio akreditasi ini adalah <strong>benar, sah, dan sesuai dengan fakta riil</strong> operasional di lapangan.</li>
              <li>Kami tidak melakukan rekayasa, plagiasi kurikulum, atau manipulasi data kualifikasi pengajar Al-Qur'an demi mendapatkan predikat akreditasi.</li>
              <li>Lembaga siap menerima Tim Asesor Akreditasi untuk melaksanakan visitasi fisik, verifikasi odner dokumen, observasi KBM kelas, serta wawancara dengan pengurus, guru, santri, dan komite wali santri.</li>
              <li>Berkomitmen teguh untuk terus mengamalkan dan mengajarkan Al-Qur'an dengan manhaj Islam Ahlussunnah wal Jama'ah An-Nahdliyah demi melahirkan generasi sholeh-sholehah dan cinta tanah air.</li>
            </ol>

            <p class="mt-4">Demikian Pakta Integritas ini kami buat dalam keadaan sadar dan tanpa paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.</p>

            <div class="mt-6 pt-4 grid grid-cols-2 text-center text-xs">
              <div>
                <p>Menyetujui,</p>
                <p class="font-bold">Ketua Yayasan AL FATAH</p>
                <div class="h-20 flex items-center justify-center">
                  <div class="border border-emerald-700/40 text-emerald-800 text-[9px] px-2.5 py-1 rounded-md font-semibold tracking-wider bg-emerald-50/60 uppercase">Cap Stempel Yayasan</div>
                </div>
                <p class="font-bold underline text-slate-900">${inst.headFoundation}</p>
              </div>

              <div>
                <p>${inst.city}, ${new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p class="font-bold">Kepala TPQ Muslimat NU AL-IKHLAS</p>
                <div class="h-20 flex items-center justify-center">
                  <span class="border border-slate-400 px-3 py-1 text-[10px] text-slate-400 font-mono">Materai Rp10.000</span>
                </div>
                <p class="font-bold underline text-slate-900">${inst.headmaster}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // 12. TATA TERTIB PENDIDIK (USTADZ / USTADZAH)
  {
    id: "DOC-FULL-TATIB-GURU",
    catId: "ketenagakerjaan",
    code: "TATIB-GURU-01",
    title: "Tata Tertib & Kode Etik Pendidik (Ustadz / Ustadzah)",
    subtitle: "Standar Disiplin, Etika Busana, dan Metodologi Tartil • Masa Khidmah 2026 - 2029",
    description: "Pedoman tata tertib resmi untuk 6 ustadzah/ustadz: jam kehadiran, pakaian muslimah syar'i/peci NU, pencatatan mutaba'ah harian, hak bisaroh, serta sistem sanksi.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">TATA TERTIB PENDIDIK & TENAGA KEPENDIDIKAN (USTADZ / USTADZAH)</h3>
            <p class="text-xs font-mono font-medium mt-1">Nomor: 021/SK-TATIB-GR/TPQ-MNU/VII/2026</p>
            <p class="text-xs font-bold mt-1 uppercase text-emerald-900">TPQ MUSLIMAT NU AL-IKHLAS • YAYASAN AL FATAH</p>
          </div>

          <div class="space-y-4 text-xs text-justify leading-relaxed">
            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB I: WAKTU KEHADIRAN & DISIPLIN TUGAS</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Pendidik wajib hadir di TPQ selambat-lambatnya 15 menit sebelum bel masuk berbunyi (pukul 15.15 WIB) untuk menyambut kedatangan santri dengan senyum, salam, dan sapa.</li>
                <li>Pendidik wajib mengisi dan menandatangani Buku Presensi Kehadiran Harian sebelum dan sesudah KBM.</li>
                <li>Apabila berhalangan hadir karena uzur syar'i, wajib memberitahukan kepada Kepala TPQ minimal 3 jam sebelumnya dan menyiapkan materi untuk guru piket pengganti.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB II: ETIKA BUSANA & IDENTITAS NAHDLATUL ULAMA</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li><strong>Ustadzah:</strong> Wajib mengenakan busana muslimah syar'i (tidak ketat), jilbab menutup dada, dan berkaos kaki. Pada hari tertentu mengenakan seragam batik resmi Muslimat NU.</li>
                <li><strong>Ustadz:</strong> Mengenakan baju koko/khas santri yang rapi, sarung/celana panjang sopan, serta berkopyah/peci hitam nasional.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB III: PROSES PEMBELAJARAN & MUTABA'AH SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Memulai KBM dengan berwudhu, pembacaan surat Al-Fatihah, doa pembuka belajar, dan penanaman aqidah akhlakul karimah.</li>
                <li>Mengajar membaca Al-Qur'an secara tartil berkaidah ilmu tajwid menggunakan metode An-Nahdliyah / Yanbu'a dengan sabar dan telaten.</li>
                <li>Wajib mencatat capaian mengaji harian setiap santri pada Buku Prestasi / Kartu Mutaba'ah santri.</li>
                <li>Dilarang mengaktifkan smartphone untuk keperluan pribadi selama KBM berlangsung di dalam kelas.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB IV: HAK PENDIDIK & SANKSI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Pendidik berhak menerima bisaroh insentif bulanan secara layak dan tepat waktu serta pembinaan kompetensi berkala.</li>
                <li>Pelanggaran terhadap tata tertib ini akan dikenakan sanksi bertingkat: Teguran Lisan, Surat Peringatan Tertulis, hingga Peninjauan Penugasan.</li>
              </ol>
            </div>

            ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 13. TATA TERTIB PESERTA DIDIK (SANTRI)
  {
    id: "DOC-FULL-TATIB-SANTRI",
    catId: "kesiswaan",
    code: "TATIB-SANTRI-01",
    title: "Tata Tertib Peserta Didik (Santri) TPQ Muslimat NU",
    subtitle: "Jadwal Belajar, Seragam Harian, Adab Al-Qur'an, dan Tata Disiplin",
    description: "Ketentuan jam masuk KBM (15.30 WIB), seragam hijau Muslimat NU & putih bersih, adab menyentuh mushaf dalam keadaan suci/wudhu, serta larangan membawa gadget.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">TATA TERTIB PESERTA DIDIK (SANTRI)</h3>
            <p class="text-xs font-mono font-medium mt-1">Nomor: 022/SK-TATIB-STR/TPQ-MNU/VII/2026</p>
            <p class="text-xs font-bold mt-1 uppercase text-emerald-900">TPQ MUSLIMAT NU AL-IKHLAS • TAHUN AJARAN 2026/2027</p>
          </div>

          <div class="space-y-4 text-xs text-justify leading-relaxed">
            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB I: WAKTU BELAJAR & KETERTIBAN KEHADIRAN</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>KBM berlangsung setiap hari Senin s.d. Kamis dan Sabtu, pukul 15.30 s.d. 17.00 WIB.</li>
                <li>Santri wajib hadir di TPQ selambat-lambatnya 10 menit sebelum KBM dimulai (pukul 15.20 WIB).</li>
                <li>Santri yang tidak hadir wajib mengirimkan surat izin tertulis atau pesan resmi dari orang tua/wali santri.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB II: JADWAL PAKAIAN SERAGAM SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li><strong>Senin - Selasa:</strong> Seragam resmi Hijau Muslimat NU berlogo (putri berkerudung; putra berpeci hitam).</li>
                <li><strong>Rabu - Kamis:</strong> Baju muslim/koko putih bersih dan rapi.</li>
                <li><strong>Sabtu:</strong> Busana muslim/muslimah bebas yang sopan dan menutup aurat.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB III: ADAB KEPADA AL-QUR'AN & USTADZAH</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Santri wajib dalam keadaan berwudhu sebelum memegang dan membaca Al-Qur'an / Buku Jilid.</li>
                <li>Meletakkan Al-Qur'an dan buku jilid di atas meja rekal lipat, tidak boleh ditaruh di lantai.</li>
                <li>Mengucapkan salam dan mencium tangan ustadz/ustadzah saat datang dan pulang.</li>
                <li>Duduk tenang dan tertib mendengarkan penjelasan ustadzah serta tidak gaduh saat teman menyimak.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB IV: LARANGAN & SANKSI EDUKATIF</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Santri dilarang keras membawa Smartphone/HP, mainan, senjata tajam, dan uang jajan berlebihan.</li>
                <li>Dilarang mengotori dinding dan merusak inventaris TPQ.</li>
                <li>Pelanggaran akan diberikan teguran edukatif, pembinaan hafalan doa, dan pemanggilan orang tua.</li>
              </ol>
            </div>

            ${renderTandaTangan(inst, "Ketua Komite Wali Santri", inst.committeeHead || "H. Ridwan Santoso", "Kepala TPQ", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 14. TATA TERTIB ORANG TUA / WALI SANTRI
  {
    id: "DOC-FULL-TATIB-WALI",
    catId: "humas_kemitraan",
    code: "TATIB-WALI-01",
    title: "Tata Tertib & Hak-Kewajiban Orang Tua / Wali Santri",
    subtitle: "Panduan Kemitraan Keluarga & Lembaga untuk Kesuksesan Belajar Santri",
    description: "Aturan disiplin antar-jemput, komitmen pendampingan mengaji di rumah ba'da maghrib, tertib infaq syahriyah (SPP), dan larangan menunggui di dalam ruang kelas.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">TATA TERTIB & HAK-KEWAJIBAN ORANG TUA / WALI SANTRI</h3>
            <p class="text-xs font-mono font-medium mt-1">Nomor: 023/SK-TATIB-WL/TPQ-MNU/VII/2026</p>
            <p class="text-xs font-bold mt-1 uppercase text-emerald-900">TPQ MUSLIMAT NU AL-IKHLAS • YAYASAN AL FATAH</p>
          </div>

          <div class="space-y-4 text-xs text-justify leading-relaxed">
            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB I: KEWAJIBAN ORANG TUA / WALI SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Mengantar putra/putrinya tepat waktu sebelum pukul 15.20 WIB dan menjemput tepat waktu pukul 17.00 WIB demi keselamatan santri.</li>
                <li>Mendampingi santri mengaji ulang di rumah minimal 15-20 menit setiap hari setelah sholat Maghrib (program <em>Maghrib Mengaji</em>).</li>
                <li>Memeriksa catatan harian capaian jilid/hafalan dan membubuhkan paraf pada Buku Prestasi / Kartu Mutaba'ah santri.</li>
                <li>Melunasi infaq syahriyah bulanan (SPP) selambat-lambatnya tanggal 10 setiap bulan melalui Bendahara TPQ.</li>
                <li>Menghadiri Rapat Pleno Komite, Pengajian Selapanan Muslimat NU, dan pengambilan Laporan Hasil Belajar (Rapor).</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB II: HAK ORANG TUA / WALI SANTRI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Memperoleh informasi transparan mengenai perkembangan membaca Al-Qur'an, tajwid, dan akhlak putra/putrinya.</li>
                <li>Mendapatkan buku laporan hasil belajar (Rapor) semesteran dan piagam kelulusan wisuda bagi santri yang lulus munaqosyah.</li>
                <li>Menyampaikan masukan dan saran konstruktif demi kemajuan TPQ melalui pengurus Komite Wali Santri.</li>
              </ol>
            </div>

            <div>
              <h4 class="font-bold text-emerald-900 uppercase mb-1">BAB III: LARANGAN BAGI ORANG TUA / WALI</h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Dilarang menunggu santri di dalam ruang kelas atau di depan pintu kelas saat KBM berlangsung agar santri mandiri dan fokus.</li>
                <li>Dilarang melakukan intervensi langsung terhadap metode pengajaran ustadzah saat jam belajar berlangsung.</li>
                <li>Dilarang merokok dan membuang sampah sembarangan di lingkungan gedung TPQ.</li>
              </ol>
            </div>

            ${renderTandaTangan(inst, "Ketua Komite Wali Santri", inst.committeeHead || "H. Ridwan Santoso", "Kepala TPQ", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 15. PROGRAM KERJA TAHUNAN TPQ (MATRIKS 12 BULAN LENGKAP)
  {
    id: "DOC-FULL-PROKER-TAHUNAN",
    catId: "kelembagaan",
    code: "PROKER-THN-01",
    title: "Program Kerja Tahunan TPQ Lengkap (Matriks 12 Bulan)",
    subtitle: "Rencana Strategis Akademik, Kesiswaan, Amaliyah Aswaja, dan Sarpras 2026/2027",
    description: "Matriks program kerja 4 bidang utama: kurikulum & munaqosyah, PHBI/Hari Santri, daurah standardisasi ustadzah, audit kas, dan pengadaan sarpras.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">PROGRAM KERJA TAHUNAN TPQ MUSLIMAT NU AL-IKHLAS</h3>
            <p class="text-xs font-mono font-medium mt-1">TAHUN AJARAN 2026 / 2027 • YAYASAN AL FATAH</p>
          </div>

          <div class="space-y-4 text-xs leading-relaxed">
            <table class="w-full border-collapse border border-slate-300 text-[11px]">
              <thead class="bg-slate-100 font-bold text-center">
                <tr>
                  <th class="border border-slate-300 p-2 w-8">No</th>
                  <th class="border border-slate-300 p-2 w-36">Bidang</th>
                  <th class="border border-slate-300 p-2">Nama Program / Kegiatan</th>
                  <th class="border border-slate-300 p-2 w-28">Waktu</th>
                  <th class="border border-slate-300 p-2 w-28">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-300 p-2 text-center" rowspan="3">1</td>
                  <td class="border border-slate-300 p-2 font-bold bg-slate-50" rowspan="3">Kurikulum & Pembelajaran</td>
                  <td class="border border-slate-300 p-2">Penerimaan Santri Baru (PSB) & Placement Test Jilid</td>
                  <td class="border border-slate-300 p-2 text-center">Juli 2026</td>
                  <td class="border border-slate-300 p-2">Panitia PSB</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Evaluasi Tengah & Akhir Semester (Kenaikan Jilid)</td>
                  <td class="border border-slate-300 p-2 text-center">Okt 2026 & Mar 2027</td>
                  <td class="border border-slate-300 p-2">Koord. Kurikulum</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Munaqosyah Akbar & Wisuda Khataman Al-Qur'an Ke-XII</td>
                  <td class="border border-slate-300 p-2 text-center">Mei - Juni 2027</td>
                  <td class="border border-slate-300 p-2">Panitia Wisuda</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2 text-center" rowspan="3">2</td>
                  <td class="border border-slate-300 p-2 font-bold bg-slate-50" rowspan="3">Kesiswaan & Amaliyah NU</td>
                  <td class="border border-slate-300 p-2">Peringatan Maulid Nabi & Pawai Ta'aruf Santri</td>
                  <td class="border border-slate-300 p-2 text-center">September 2026</td>
                  <td class="border border-slate-300 p-2">Seksi Kesiswaan</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Apel Peringatan Hari Santri Nasional (HSN 22 Oktober)</td>
                  <td class="border border-slate-300 p-2 text-center">Oktober 2026</td>
                  <td class="border border-slate-300 p-2">Seksi PHBI & IPNU</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Pesantren Kilat Ramadhan & Penyaluran Zakat Fitrah</td>
                  <td class="border border-slate-300 p-2 text-center">Maret - April 2027</td>
                  <td class="border border-slate-300 p-2">Dewan Asatidz</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2 text-center" rowspan="2">3</td>
                  <td class="border border-slate-300 p-2 font-bold bg-slate-50" rowspan="2">Pengembangan Pendidik</td>
                  <td class="border border-slate-300 p-2">Daurah Standardisasi Guru Metode An-Nahdliyah/Yanbu'a</td>
                  <td class="border border-slate-300 p-2 text-center">Agustus 2026</td>
                  <td class="border border-slate-300 p-2">Kepala TPQ</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Halaqah Aswaja Guru & Supervisi Mutu Mengajar</td>
                  <td class="border border-slate-300 p-2 text-center">Rutin Tiap Bulan</td>
                  <td class="border border-slate-300 p-2">Pembina Muslimat NU</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2 text-center" rowspan="2">4</td>
                  <td class="border border-slate-300 p-2 font-bold bg-slate-50" rowspan="2">Sarpras & Keuangan</td>
                  <td class="border border-slate-300 p-2">Pengadaan Meja Rekal Lipat & Karpet Baru</td>
                  <td class="border border-slate-300 p-2 text-center">Juli 2026</td>
                  <td class="border border-slate-300 p-2">Seksi Sarpras</td>
                </tr>
                <tr>
                  <td class="border border-slate-300 p-2">Audit Pembukuan Buku Kas Umum (BKU) Semesteran</td>
                  <td class="border border-slate-300 p-2 text-center">Des 2026 & Jun 2027</td>
                  <td class="border border-slate-300 p-2">Bendahara & Yayasan</td>
                </tr>
              </tbody>
            </table>

            ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ", inst.headmaster)}
          </div>
        </div>
      `;
    }
  },

  // 16. SURAT PERNYATAAN / PAKTA INTEGRITAS WALI SANTRI
  {
    id: "DOC-FULL-SURAT-PERNYATAAN-WALI",
    catId: "humas_kemitraan",
    code: "INTEGRITAS-WALI-01",
    title: "Surat Pernyataan Kesanggupan & Pakta Integritas Wali Santri",
    subtitle: "Lembar Persetujuan Tata Tertib, Bimbingan Rumah, dan Infaq",
    description: "Format surat pernyataan resmi bermaterai yang ditandatangani orang tua/wali santri saat mendaftar di TPQ Muslimat NU AL-IKHLAS.",
    generateHtml: function(store) {
      const inst = store.institution;
      return `
        <div class="doc-paper">
          ${renderKopSurat(inst)}
          <div class="text-center my-6">
            <h3 class="font-bold text-sm tracking-wide uppercase underline">SURAT PERNYATAAN KESANGGUPAN WALI SANTRI</h3>
            <p class="text-xs font-mono font-medium mt-1">ARSIP RESMI KESISWAAN DAN PENERIMAAN SANTRI BARU</p>
          </div>

          <div class="space-y-4 text-xs text-justify leading-relaxed">
            <p>Yang bertanda tangan di bawah ini:</p>
            <table class="w-full text-xs space-y-1">
              <tr>
                <td class="w-48 font-bold">Nama Orang Tua / Wali</td>
                <td class="w-4">:</td>
                <td class="border-b border-slate-200 font-semibold text-slate-900">H. Ridwan Santoso</td>
              </tr>
              <tr>
                <td class="font-bold">NIK KTP</td>
                <td>:</td>
                <td class="border-b border-slate-200 font-mono text-slate-800">3515011406750001</td>
              </tr>
              <tr>
                <td class="font-bold">Alamat Rumah</td>
                <td>:</td>
                <td class="border-b border-slate-200 text-slate-800">Jl. Mawar No. 12 RT 01 / RW 02, Sidokare, Sidoarjo</td>
              </tr>
              <tr>
                <td class="font-bold">No. Telp / WhatsApp</td>
                <td>:</td>
                <td class="border-b border-slate-200 font-mono text-slate-800">0813-8899-7711</td>
              </tr>
              <tr>
                <td class="font-bold">Orang Tua / Wali Dari Santri</td>
                <td>:</td>
                <td class="border-b border-slate-200 font-bold text-emerald-900">Muhammad Bilal Al-Ghifari (Jilid 4 / NIS: 2026/001)</td>
              </tr>
            </table>

            <p class="mt-2">Menyatakan dengan sesungguhnya bahwa kami bersedia:</p>
            <ol class="list-decimal pl-5 space-y-1">
              <li>Menaati seluruh tata tertib yang berlaku di TPQ Muslimat NU AL-IKHLAS.</li>
              <li>Membimbing dan menyimak tadarus putra/putri kami di rumah setiap hari minimal 15 menit ba'da maghrib.</li>
              <li>Membayar infaq syahriyah bulanan sebelum tanggal 10 setiap bulan secara tertib.</li>
              <li>Mengantar dan menjemput putra/putri kami tepat pada waktu yang ditentukan.</li>
              <li>Tidak menunggui santri di dalam ruang kelas saat KBM berlangsung demi kemandirian santri.</li>
              <li>Menghadiri rapat pleno wali santri dan kegiatan pengajian berkala yang diselenggarakan TPQ.</li>
            </ol>

            <div class="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
              <div>
                <p class="text-slate-600">Mengetahui,</p>
                <p class="font-bold text-slate-800">Kepala TPQ Muslimat NU AL-IKHLAS</p>
                <div class="h-16 flex items-center justify-center">
                  <div class="border-b-2 border-slate-400 w-32 pb-1 text-[9px] text-slate-500 font-sans tracking-wide">( Ttd & Stempel Sah )</div>
                </div>
                <p class="font-bold underline text-slate-900">${inst.headmaster}</p>
                <p class="text-[10px] font-mono text-slate-600">${inst.headmasterNip || ''}</p>
              </div>
              <div>
                <p class="text-slate-600">${inst.legalCity || inst.city || 'Sidoarjo'}, 15 Juli 2026</p>
                <p class="font-bold text-slate-800">Orang Tua / Wali Santri</p>
                <div class="h-16 flex items-center justify-center">
                  <span class="border border-emerald-600/40 bg-emerald-50 text-emerald-800 px-3 py-1 text-[9px] font-mono rounded">Lunas Materai Rp10.000</span>
                </div>
                <p class="font-bold underline text-slate-900">H. Ridwan Santoso</p>
                <p class="text-[10px] text-slate-500">Ketua Komite Wali Santri</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
];

// Helper Functions for Document Generator
function renderKopSurat(inst) {
  const layout = inst.kopLogoLayout || inst.logoPosition || "both"; // "both" | "left" | "right" | "none"

  let leftLogoHtml = "";
  if (layout === "both" || layout === "left") {
    if (inst.logoLeft && (inst.logoLeft.startsWith("data:image") || inst.logoLeft.startsWith("http") || inst.logoLeft.includes("."))) {
      leftLogoHtml = `<img src="${inst.logoLeft}" alt="Logo Kiri" class="w-16 h-16 object-contain shrink-0">`;
    } else {
      const preset = inst.logoLeftPreset || "book";
      const icon = preset === "mosque" ? "🕌" : preset === "building" ? "🏛️" : preset === "star" ? "🌟" : "📖";
      leftLogoHtml = `
        <div class="w-16 h-16 rounded-2xl bg-emerald-800 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-2xl shrink-0 shadow-sm">
          ${icon}
        </div>
      `;
    }
  } else if (layout === "right") {
    // Spacer transparan penyeimbang agar judul tetap simetris di tengah
    leftLogoHtml = `<div class="w-16 h-16 shrink-0 invisible pointer-events-none" aria-hidden="true"></div>`;
  }

  let rightLogoHtml = "";
  if (layout === "both" || layout === "right") {
    if (inst.logoRight && (inst.logoRight.startsWith("data:image") || inst.logoRight.startsWith("http") || inst.logoRight.includes("."))) {
      rightLogoHtml = `<img src="${inst.logoRight}" alt="Logo Kanan" class="w-16 h-16 object-contain shrink-0">`;
    } else {
      const preset = inst.logoRightPreset || "muslimat";
      if (preset === "nu") {
        rightLogoHtml = `
          <div class="w-16 h-16 rounded-2xl bg-emerald-900 border-2 border-emerald-700 flex items-center justify-center text-amber-300 font-black text-[10px] shrink-0 text-center leading-tight p-1 shadow-sm">
            <span>NAHDLATUL<br>ULAMA</span>
          </div>
        `;
      } else if (preset === "islamic") {
        rightLogoHtml = `
          <div class="w-16 h-16 rounded-2xl bg-emerald-900 border-2 border-emerald-700 flex items-center justify-center text-amber-300 font-bold text-2xl shrink-0 text-center p-1 shadow-sm">
            ☪️
          </div>
        `;
      } else {
        rightLogoHtml = `
          <div class="w-16 h-16 rounded-2xl bg-emerald-900 border-2 border-emerald-700 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0 text-center leading-tight p-1 shadow-sm">
            <span>MUSLIMAT<br>NU</span>
          </div>
        `;
      }
    }
  } else if (layout === "left") {
    // Spacer transparan penyeimbang agar judul tetap simetris di tengah
    rightLogoHtml = `<div class="w-16 h-16 shrink-0 invisible pointer-events-none" aria-hidden="true"></div>`;
  }

  let borderStyle = "border-b-4 border-double border-emerald-900";
  if (inst.kopBorderType === "double-black") {
    borderStyle = "border-b-4 border-double border-black";
  } else if (inst.kopBorderType === "triple-gold") {
    borderStyle = "border-b-4 border-emerald-900 shadow-[0_2px_0_0_#f59e0b]";
  } else if (inst.kopBorderType === "solid-green") {
    borderStyle = "border-b-[3px] border-emerald-800";
  }

  const rawMethod = inst.method || 'An-Nahdliyah';
  const methodClean = rawMethod.replace(/^Metode\s+/i, '');

  return `
    <div class="kop-surat pb-4 ${borderStyle} flex items-center justify-between gap-4">
      ${leftLogoHtml}
      <div class="text-center flex-1">
        <h4 class="text-xs font-bold tracking-widest text-emerald-950 uppercase">${inst.foundation || 'YAYASAN AL FATAH'}</h4>
        <h2 class="text-lg font-black tracking-tight text-emerald-900 uppercase my-0.5">${inst.name || 'TPQ MUSLIMAT NU AL-IKHLAS'}</h2>
        <p class="text-[11px] font-semibold text-slate-700">${inst.affiliation || 'Pimpinan Muslimat Nahdlatul Ulama'} • Metode ${methodClean}</p>
        <p class="text-[10px] text-slate-600 mt-0.5">${inst.address || ''}, ${inst.village || ''}, Kec. ${inst.subdistrict || ''}, ${inst.city || ''}</p>
        <p class="text-[9px] font-mono text-slate-500">NSQ: ${inst.nsq || '-'} | SK IJOP: ${inst.ijop || '-'} | Telp: ${inst.phone || '-'}</p>
      </div>
      ${rightLogoHtml}
    </div>
  `;
}

function renderTandaTangan(inst, leftTitle, leftName, rightTitle, rightName) {
  const city = inst.legalCity || inst.city || "Sidoarjo";
  const today = new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});

  // Cek apakah ada tanda tangan / stempel digital untuk pihak kanan (biasanya Kepala TPQ)
  let signatureRightHtml = `
    <div class="h-16 flex items-center justify-center">
      <div class="border-b-2 border-slate-400 w-32 pb-1 text-[9px] text-slate-500 font-sans tracking-wide">( Ttd & Stempel Sah )</div>
    </div>
  `;
  if (inst.signatureHeadmaster || inst.stampImage) {
    signatureRightHtml = `
      <div class="h-16 relative flex items-center justify-center">
        ${inst.signatureHeadmaster ? `<img src="${inst.signatureHeadmaster}" alt="Ttd" class="h-14 max-w-[120px] object-contain relative z-10">` : `<div class="italic text-slate-400 text-[10px]">( Tanda Tangan Sah )</div>`}
        ${inst.stampImage ? `<img src="${inst.stampImage}" alt="Cap" class="h-16 max-w-[80px] object-contain absolute opacity-80 z-20 -left-2 top-0 pointer-events-none">` : ``}
      </div>
    `;
  }

  const isHeadmasterRight = rightName === inst.headmaster || rightTitle.toLowerCase().includes("kepala");
  const nipHtml = (isHeadmasterRight && inst.headmasterNip) ? `<p class="text-[10px] font-mono text-slate-600 mt-0.5">${inst.headmasterNip}</p>` : ``;

  return `
    <div class="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
      <div>
        <p class="text-slate-600">Mengetahui,</p>
        <p class="font-bold text-slate-800">${leftTitle}</p>
        <div class="h-16 flex items-center justify-center">
          <div class="border-b-2 border-slate-400 w-32 pb-1 text-[9px] text-slate-500 font-sans tracking-wide">( Ttd & Stempel Sah )</div>
        </div>
        <p class="font-bold underline text-slate-900">${leftName}</p>
      </div>
      <div>
        <p class="text-slate-600">${city}, ${today}</p>
        <p class="font-bold text-slate-800">${rightTitle}</p>
        ${signatureRightHtml}
        <p class="font-bold underline text-slate-900">${rightName}</p>
        ${nipHtml}
      </div>
    </div>
  `;
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function renderFormulirPendaftaran(store, options = {}) {
  const inst = store.institution || {};
  const cfg = store.formulirConfig || DEFAULT_STORE.formulirConfig;
  const isFilled = options.mode === 'filled';
  let s = null;
  if (isFilled) {
    if (options.santriId) {
      s = (store.santri || []).find(item => item.id === options.santriId);
    }
    if (!s && store.santri && store.santri.length > 0) {
      s = store.santri[0];
    }
  }

  // Header KOP atau Judul Biasa
  let headerHtml = "";
  if (cfg.useKop) {
    headerHtml = `
      ${renderKopSurat(inst)}
      <div class="text-center my-3 pb-1">
        <h3 class="font-bold text-sm tracking-wide uppercase underline">${cfg.title || 'FORMULIR PENDAFTARAN'}</h3>
        <h4 class="font-bold text-xs tracking-wide uppercase mt-1 text-slate-800">${cfg.subtitle || 'CALON PESERTA DIDIK TPQ MUSLIMAT NU AL-IKHLAS'}${cfg.branchTag ? ' ' + cfg.branchTag : ''}</h4>
        <p class="text-xs font-semibold mt-0.5 text-slate-700">TAHUN AJARAN ${cfg.academicYear || '2026/2027'}</p>
      </div>
    `;
  } else {
    headerHtml = `
      <div class="text-center my-3 pb-3 border-b-2 border-slate-900">
        <h3 class="font-bold text-base tracking-wide uppercase">${cfg.title || 'FORMULIR PENDAFTARAN'}</h3>
        <h4 class="font-bold text-xs sm:text-sm tracking-wide uppercase mt-1 text-slate-900">${cfg.subtitle || 'CALON PESERTA DIDIK TPQ MUSLIMAT NU AL-IKHLAS'}${cfg.branchTag ? ' ' + cfg.branchTag : ''}</h4>
        <p class="text-xs font-bold uppercase mt-1 text-slate-800">TAHUN AJARAN ${cfg.academicYear || '2026/2027'}</p>
      </div>
    `;
  }

  // Helper untuk value santri jika mode filled
  const getStudentValue = (id) => {
    if (!isFilled || !s) return "";
    switch (id) {
      case 'name': return s.name || '';
      case 'nickname': return s.nickname || (s.name ? s.name.split(' ')[0] : '');
      case 'birthPlaceDate': return (s.birthPlace ? s.birthPlace + ', ' : '') + (s.birthDate || '');
      case 'gender': return s.gender === 'L' ? 'Laki-laki (L)' : s.gender === 'P' ? 'Perempuan (P)' : '';
      case 'religion': return 'Islam';
      case 'childOrder': return s.childOrder || '1';
      case 'siblingCount': return s.siblingCount || '2';
      case 'familyStatus': return s.familyStatus || 'Anak Kandung';
      case 'citizenship': return s.citizenship || 'WNI (Indonesia)';
      case 'address': return s.address || '';
      case 'phone': return s.parentPhone || '';
      default: return '';
    }
  };

  const getFatherValue = (id) => {
    if (!isFilled || !s) return "";
    switch (id) {
      case 'name': return s.parentName || '';
      case 'religion': return 'Islam';
      case 'citizenship': return 'WNI';
      case 'phone': return s.parentPhone || '';
      default: return '';
    }
  };

  // Render Baris Titik-titik / Terisi
  const renderRow = (numText, label, valueText, isSub = false) => {
    const valDisplay = valueText ? `<span class="font-semibold text-slate-900 font-sans px-1">${valueText}</span>` : ``;
    return `
      <tr>
        <td class="w-6 align-top py-0.5 text-slate-800 ${isSub ? 'pl-4' : 'font-medium'}">${numText}</td>
        <td class="w-44 sm:w-52 align-top py-0.5 text-slate-800 ${isSub ? '' : 'font-medium'}">${label}</td>
        <td class="w-4 align-top py-0.5 text-center">:</td>
        <td class="align-bottom py-0.5 border-b border-dotted border-slate-600 text-xs text-slate-900 min-h-[20px]">
          ${valDisplay || '&nbsp;'}
        </td>
      </tr>
    `;
  };

  // Section 1: Santri
  const activeStudentFields = (cfg.studentFields || []).filter(f => f.enabled !== false);
  const studentRows = activeStudentFields.map((f, idx) => {
    const val = getStudentValue(f.id);
    return renderRow(`${idx + 1}.`, f.label, val, false);
  }).join('');

  // Section 2: Orang Tua
  const activeFatherFields = (cfg.fatherFields || []).filter(f => f.enabled !== false);
  const fatherRows = activeFatherFields.map((f, idx) => {
    const letter = String.fromCharCode(97 + idx); // a, b, c...
    const val = getFatherValue(f.id);
    return renderRow(`${letter}.`, f.label, val, true);
  }).join('');

  const activeMotherFields = (cfg.motherFields || []).filter(f => f.enabled !== false);
  const motherRows = activeMotherFields.map((f, idx) => {
    const letter = String.fromCharCode(97 + idx); // a, b, c...
    return renderRow(`${letter}.`, f.label, '', true);
  }).join('');

  // Persyaratan Berkas
  let reqHtml = "";
  if (cfg.showRequirements && cfg.requirementsText) {
    const lines = cfg.requirementsText.split('\n').filter(l => l.trim().length > 0);
    reqHtml = `
      <div class="mt-3 p-2.5 bg-slate-50 border border-slate-300 rounded text-[10px] text-slate-700 leading-tight">
        <strong class="block mb-1 text-slate-900 uppercase tracking-wide">${cfg.requirementsTitle || 'Syarat-Syarat Berkas Pendaftaran:'}</strong>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
          ${lines.map(line => `<div>${line}</div>`).join('')}
        </div>
      </div>
    `;
  }

  // Tanda Tangan & Pas Foto Box
  const signCity = cfg.signCity || inst.legalCity || 'Sidoarjo';
  let dateStr = "................................ 20...";
  if (cfg.signDateMode === 'today') {
    dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } else if (cfg.signDateMode === 'custom' && cfg.signCustomDate) {
    dateStr = cfg.signCustomDate;
  }

  let photoBoxHtml = "";
  if (cfg.showPhotoBox) {
    photoBoxHtml = `
      <div class="w-20 h-28 border border-dashed border-slate-600 bg-slate-50 rounded flex flex-col items-center justify-center text-center p-1 text-[9px] text-slate-500">
        <span>Pas Foto</span>
        <span class="font-bold text-slate-700 text-xs mt-0.5">3 x 4</span>
      </div>
    `;
  }

  return `
    <div class="doc-paper print-sheet" style="font-family: 'Times New Roman', Times, serif; font-size: 10pt; line-height: 1.35; padding: 12mm 15mm; background: white; color: #000;">
      ${headerHtml}

      <div class="space-y-2 mt-2">
        <!-- I. IDENTITAS CALON PESERTA DIDIK -->
        <div>
          <h4 class="font-bold text-xs uppercase text-slate-900 mb-1 border-b border-slate-300 pb-0.5">${cfg.studentSectionTitle || 'IDENTITAS CALON PESERTA DIDIK'}</h4>
          <table class="w-full text-xs">
            ${studentRows}
          </table>
        </div>

        <!-- II. IDENTITAS ORANG TUA/WALI -->
        <div class="pt-1">
          <h4 class="font-bold text-xs uppercase text-slate-900 mb-1 border-b border-slate-300 pb-0.5">${cfg.parentSectionTitle || 'IDENTITAS ORANG TUA/WALI'}</h4>
          <table class="w-full text-xs">
            <!-- 1. Ayah -->
            <tr>
              <td class="w-6 align-top font-bold text-slate-900 py-0.5">1.</td>
              <td colspan="3" class="align-top font-bold text-slate-900 py-0.5">${cfg.fatherHeader || 'Ayah kandung/tiri/angkat/wali *)'}</td>
            </tr>
            ${fatherRows}

            <!-- 2. Ibu -->
            <tr>
              <td class="w-6 align-top font-bold text-slate-900 py-0.5 pt-1.5">2.</td>
              <td colspan="3" class="align-top font-bold text-slate-900 py-0.5 pt-1.5">${cfg.motherHeader || 'Ibu kandung/tiri/angkat/wali *)'}</td>
            </tr>
            ${motherRows}
          </table>
        </div>

        ${reqHtml}

        <!-- PENGESAHAN & TANDA TANGAN -->
        <div class="mt-4 pt-2 border-t border-slate-200">
          <div class="flex items-center justify-between text-xs">
            <!-- Kolom Kiri: Panitia Pendaftaran -->
            <div class="w-48 text-center">
              <p class="text-slate-600 mb-0.5">Mengetahui / Menerima,</p>
              <p class="font-bold text-slate-900">${cfg.officerSignTitle || 'Panitia Penerimaan Santri'}</p>
              <div class="h-16 flex items-center justify-center">
                <span class="text-[9px] text-slate-400 italic">( Tanda Tangan & Stempel )</span>
              </div>
              <p class="font-bold underline text-slate-900">${cfg.officerName || inst.headmaster}</p>
            </div>

            <!-- Kolom Tengah: Pas Foto 3x4 (Jika ada) -->
            ${photoBoxHtml ? `
              <div class="flex items-center justify-center">
                ${photoBoxHtml}
              </div>
            ` : ''}

            <!-- Kolom Kanan: Orang Tua / Wali -->
            <div class="w-52 text-center">
              <p class="text-slate-700">${signCity}, ${dateStr}</p>
              <p class="font-bold text-slate-900">${cfg.parentSignTitle || 'Orang Tua / Wali Calon Santri'}</p>
              <div class="h-16 flex items-center justify-center">
                <span class="text-[9px] text-slate-400 italic">( Tanda Tangan Terang )</span>
              </div>
              <p class="font-bold text-slate-900">( .................................................... )</p>
            </div>
          </div>

          <div class="mt-2 text-[9px] text-slate-500 italic">
            ${cfg.footerNote || '*) Coret yang tidak perlu'}
          </div>
        </div>
      </div>
    </div>
  `;
}
