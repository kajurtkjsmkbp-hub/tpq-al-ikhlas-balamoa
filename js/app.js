/**
 * APLIKASI UTAMA PORTAL AKREDITASI TPQ MUSLIMAT NU AL-IKHLAS
 * YAYASAN AL FATAH
 * Dilengkapi Sistem Checklist, Bank Dokumen + Full Preview, dan Manajemen Data Inputan (CRUD)
 */

// State Management
const STORAGE_KEY = "tpq_akreditasi_state_v1";

const state = {
  itemsStatus: {}, // { [docId]: 'ready' | 'process' | 'missing' | 'na' }
  itemsNotes: {},  // { [docId]: string }
  activeCategory: "all",
  activeStatusFilter: "all",
  searchQuery: "",
  currentTab: "checklist",
  selectedDocId: null,
  
  // Dokumen & Preview Tab State
  selectedFullDocId: "DOC-FULL-101",
  docCategoryFilter: "all",
  
  // Data Input Sub-tab State
  activeInputSubTab: "santri",
  santriSearch: "",
  editingSantriId: null,
  editingUstadzId: null,
  editingInvId: null,
  editingKasId: null,

  // Formulir Pendaftaran State
  formulirPrintMode: "blank", // "blank" | "filled"
  formulirSelectedSantriId: null
};

// Initialize State from Storage or Defaults
function initState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.itemsStatus = parsed.itemsStatus || {};
      state.itemsNotes = parsed.itemsNotes || {};
    } catch (e) {
      console.error("Gagal membaca storage, menggunakan default", e);
    }
  }

  // Isi default bila belum ada
  AKREDITASI_DATA.items.forEach(item => {
    if (!state.itemsStatus[item.id]) {
      state.itemsStatus[item.id] = item.defaultStatus || "process";
    }
    if (!state.itemsNotes[item.id]) {
      state.itemsNotes[item.id] = "";
    }
  });

  saveState();
}

function saveState(syncSql = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    itemsStatus: state.itemsStatus,
    itemsNotes: state.itemsNotes
  }));
  updateStats();
  if (syncSql && typeof syncFullStoreToSql === "function") {
    syncFullStoreToSql(false);
  }
}

// Perhitungan Statistik & Skor
function calculateStats() {
  const total = AKREDITASI_DATA.items.length;
  let ready = 0;
  let process = 0;
  let missing = 0;
  let na = 0;

  let totalWeight = 0;
  let earnedWeight = 0;

  AKREDITASI_DATA.items.forEach(item => {
    const status = state.itemsStatus[item.id] || "process";
    const weight = item.scoreWeight || 3;
    totalWeight += weight;

    if (status === "ready") {
      ready++;
      earnedWeight += weight;
    } else if (status === "process") {
      process++;
      earnedWeight += (weight * 0.5); // Nilai 50% untuk proses
    } else if (status === "missing") {
      missing++;
    } else if (status === "na") {
      na++;
    }
  });

  const percentage = Math.round((ready / (total - na)) * 100) || 0;
  const scoreScore = Math.round((earnedWeight / totalWeight) * 100) || 0;

  let grade = "C";
  let gradeText = "Cukup (Perlu Pembenahan)";
  let gradeBadge = "bg-amber-100 text-amber-800 border-amber-300";

  if (scoreScore >= 86) {
    grade = "A";
    gradeText = "A (Unggul / Sangat Baik)";
    gradeBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
  } else if (scoreScore >= 71) {
    grade = "B";
    gradeText = "B (Baik)";
    gradeBadge = "bg-blue-100 text-blue-800 border-blue-300";
  } else if (scoreScore >= 56) {
    grade = "C";
    gradeText = "C (Cukup)";
    gradeBadge = "bg-amber-100 text-amber-800 border-amber-300";
  } else {
    grade = "D";
    gradeText = "Perlu Pembinaan Khusus";
    gradeBadge = "bg-red-100 text-red-800 border-red-300";
  }

  return { total, ready, process, missing, na, percentage, scoreScore, grade, gradeText, gradeBadge };
}

// Update UI Statistik di Header & Dashboard
function updateStats() {
  const stats = calculateStats();

  const progressBar = document.getElementById("stat-progress-bar");
  if (progressBar) progressBar.style.width = `${stats.percentage}%`;

  const percentElem = document.getElementById("stat-percent");
  if (percentElem) percentElem.innerText = `${stats.percentage}%`;

  const readyElem = document.getElementById("stat-ready-count");
  if (readyElem) readyElem.innerText = stats.ready;

  const processElem = document.getElementById("stat-process-count");
  if (processElem) processElem.innerText = stats.process;

  const missingElem = document.getElementById("stat-missing-count");
  if (missingElem) missingElem.innerText = stats.missing;

  const totalElem = document.getElementById("stat-total-count");
  if (totalElem) totalElem.innerText = stats.total;

  const gradeElem = document.getElementById("stat-grade");
  if (gradeElem) {
    gradeElem.innerText = `Predikat: ${stats.gradeText} (${stats.scoreScore}/100)`;
    gradeElem.className = `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${stats.gradeBadge}`;
  }

  // Update Category Badge Counters
  AKREDITASI_DATA.categories.forEach(cat => {
    const catItems = AKREDITASI_DATA.items.filter(i => i.categoryId === cat.id);
    const catReady = catItems.filter(i => state.itemsStatus[i.id] === 'ready').length;
    const badge = document.getElementById(`cat-badge-${cat.id}`);
    if (badge) {
      badge.innerText = `${catReady}/${catItems.length}`;
      if (catReady === catItems.length) {
        badge.className = "text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800";
      } else {
        badge.className = "text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700";
      }
    }
  });

  if (state.currentTab === "assessment") {
    renderAssessmentView();
  }
}

// Navigation Tabs
function switchTab(tabId) {
  state.currentTab = tabId;

  const tabs = ["checklist", "documents", "data-input", "standards", "assessment", "odner", "profil"];
  tabs.forEach(t => {
    const el = document.getElementById(`view-${t}`);
    const navBtn = document.getElementById(`nav-btn-${t}`);
    if (el) {
      if (t === tabId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
    if (navBtn) {
      if (t === tabId) {
        navBtn.className = "px-3.5 py-2 rounded-xl transition whitespace-nowrap text-nu-950 bg-gold-400 font-bold flex items-center gap-1.5 shadow-sm";
      } else {
        navBtn.className = "px-3.5 py-2 rounded-xl transition whitespace-nowrap text-nu-100 hover:text-white hover:bg-white/10 flex items-center gap-1.5";
      }
    }
  });

  if (tabId === "checklist") {
    renderChecklist();
  } else if (tabId === "documents") {
    renderDocumentsView();
  } else if (tabId === "data-input") {
    renderDataInputView();
  } else if (tabId === "standards") {
    renderStandards();
  } else if (tabId === "assessment") {
    renderAssessmentView();
  } else if (tabId === "odner") {
    renderOdnerBoxes();
  }
}

// ==========================================
// 1. CHECKLIST BERKAS AKREDITASI
// ==========================================

function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  let html = `
    <button onclick="setCategoryFilter('all')" class="category-pill flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${state.activeCategory === 'all' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
      <span>Semua Kategori</span>
      <span class="px-1.5 py-0.5 rounded-full text-[10px] ${state.activeCategory === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'}">${AKREDITASI_DATA.items.length}</span>
    </button>
  `;

  AKREDITASI_DATA.categories.forEach(cat => {
    const isSelected = state.activeCategory === cat.id;
    const catItems = AKREDITASI_DATA.items.filter(i => i.categoryId === cat.id);
    const catReady = catItems.filter(i => state.itemsStatus[i.id] === 'ready').length;

    html += `
      <button onclick="setCategoryFilter('${cat.id}')" class="category-pill flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${isSelected ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>${cat.number}. ${cat.shortName}</span>
        <span id="cat-badge-${cat.id}" class="px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'}">${catReady}/${catItems.length}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function setCategoryFilter(catId) {
  state.activeCategory = catId;
  renderCategoryPills();
  renderChecklist();
}

function setStatusFilter(status) {
  state.activeStatusFilter = status;

  const buttons = document.querySelectorAll(".status-filter-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-status") === status) {
      btn.classList.add("ring-2", "ring-emerald-600", "font-bold");
    } else {
      btn.classList.remove("ring-2", "ring-emerald-600", "font-bold");
    }
  });

  renderChecklist();
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  if (!container) return;

  const query = state.searchQuery.toLowerCase().trim();
  const filtered = AKREDITASI_DATA.items.filter(item => {
    if (state.activeCategory !== "all" && item.categoryId !== state.activeCategory) return false;
    const itemStatus = state.itemsStatus[item.id] || "process";
    if (state.activeStatusFilter !== "all" && itemStatus !== state.activeStatusFilter) return false;
    if (query) {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchCode = item.code.toLowerCase().includes(query);
      const matchAssessor = item.assessorNotes.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchCode && !matchAssessor) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <h3 class="text-base font-bold text-slate-800 mb-1">Tidak Ada Dokumen yang Cocok</h3>
        <p class="text-sm text-slate-500 max-w-md mx-auto mb-4">Coba sesuaikan kata kunci pencarian atau ubah filter status/kategori di atas.</p>
        <button onclick="resetFilters()" class="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition">Reset Filter</button>
      </div>
    `;
    return;
  }

  const categoriesPresent = {};
  filtered.forEach(item => {
    if (!categoriesPresent[item.categoryId]) categoriesPresent[item.categoryId] = [];
    categoriesPresent[item.categoryId].push(item);
  });

  let html = "";

  AKREDITASI_DATA.categories.forEach(cat => {
    const catItems = categoriesPresent[cat.id];
    if (!catItems || catItems.length === 0) return;

    html += `
      <div class="mb-8">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center border border-emerald-200">${cat.number}</span>
            <div>
              <h2 class="text-base font-bold text-slate-800">${cat.name}</h2>
              <p class="text-xs text-slate-500">${cat.description}</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">${catItems.length} Berkas</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    catItems.forEach(item => {
      const currentStatus = state.itemsStatus[item.id] || "process";
      const userNote = state.itemsNotes[item.id] || "";

      let statusBadge = "";
      if (currentStatus === "ready") {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-ready">Siap & Lengkap</span>`;
      } else if (currentStatus === "process") {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-process">Proses / Draf</span>`;
      } else if (currentStatus === "missing") {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold badge-missing">Belum Ada</span>`;
      } else {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">N/A</span>`;
      }

      const importanceBadge = item.importance === "Wajib Mutlak" 
        ? `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Wajib Mutlak</span>`
        : `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">${item.importance}</span>`;

      html += `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm card-hover flex flex-col justify-between" id="card-${item.id}">
          <div>
            <div class="flex items-start justify-between gap-3 mb-2">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-xs font-mono font-bold border border-emerald-200">${item.code}</span>
                ${importanceBadge}
              </div>
              <div>${statusBadge}</div>
            </div>

            <h3 class="text-sm font-bold text-slate-900 mb-2 leading-snug hover:text-emerald-800 transition cursor-pointer" onclick="openDocModal('${item.id}')">${item.title}</h3>
            <p class="text-xs text-slate-600 mb-3 line-clamp-2">${item.description}</p>

            <div class="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
              <span class="truncate font-medium">Bentuk: <span class="text-slate-800">${item.physicalFormat}</span></span>
            </div>

            ${userNote ? `
              <div class="text-[11px] text-emerald-800 bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 mb-3">
                <strong>Catatan:</strong> ${userNote}
              </div>
            ` : ''}
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
            <div class="flex items-center gap-1">
              <button title="Tandai Siap" onclick="setItemStatus('${item.id}', 'ready')" class="p-1.5 rounded-lg text-xs font-semibold ${currentStatus === 'ready' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'} transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
              <button title="Tandai Proses" onclick="setItemStatus('${item.id}', 'process')" class="p-1.5 rounded-lg text-xs font-semibold ${currentStatus === 'process' ? 'bg-amber-500 text-white' : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800'} transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </button>
              <button title="Tandai Belum Ada" onclick="setItemStatus('${item.id}', 'missing')" class="p-1.5 rounded-lg text-xs font-semibold ${currentStatus === 'missing' ? 'bg-red-600 text-white' : 'bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-800'} transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <button onclick="openDocModal('${item.id}')" class="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 hover:underline">
              <span>Detail & Catatan</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setItemStatus(itemId, newStatus) {
  state.itemsStatus[itemId] = newStatus;
  saveState();
  renderChecklist();
  showToast("Status dokumen berhasil diperbarui!");
}

function resetFilters() {
  state.activeCategory = "all";
  state.activeStatusFilter = "all";
  state.searchQuery = "";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  renderCategoryPills();
  renderChecklist();
}

function openDocModal(docId) {
  const item = AKREDITASI_DATA.items.find(i => i.id === docId);
  if (!item) return;

  state.selectedDocId = docId;
  const modal = document.getElementById("doc-modal");
  if (!modal) return;

  const currentStatus = state.itemsStatus[docId] || "process";
  const userNote = state.itemsNotes[docId] || "";

  document.getElementById("modal-code").innerText = `${item.code} • ${item.importance}`;
  document.getElementById("modal-title").innerText = item.title;
  document.getElementById("modal-desc").innerText = item.description;
  document.getElementById("modal-physical").innerText = item.physicalFormat;
  document.getElementById("modal-assessor").innerText = item.assessorNotes;
  document.getElementById("modal-weight").innerText = `Bobot Skor: ${item.scoreWeight} Poin`;

  const checkpointsList = document.getElementById("modal-checkpoints");
  checkpointsList.innerHTML = item.checkpoints.map(cp => `
    <li class="flex items-start gap-2 text-xs text-slate-700">
      <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      <span>${cp}</span>
    </li>
  `).join("");

  const statusSelect = document.getElementById("modal-status-select");
  if (statusSelect) statusSelect.value = currentStatus;

  const noteInput = document.getElementById("modal-notes-input");
  if (noteInput) noteInput.value = userNote;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeDocModal() {
  const modal = document.getElementById("doc-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function saveDocModal() {
  if (!state.selectedDocId) return;

  const statusSelect = document.getElementById("modal-status-select");
  const noteInput = document.getElementById("modal-notes-input");

  if (statusSelect) state.itemsStatus[state.selectedDocId] = statusSelect.value;
  if (noteInput) state.itemsNotes[state.selectedDocId] = noteInput.value.trim();

  saveState();
  closeDocModal();
  renderChecklist();
  showToast("Perubahan data dokumen tersimpan!");
}

// ==========================================
// 2. BANK DOKUMEN & PREVIEW RESMI
// ==========================================

function renderDocumentsView() {
  const container = document.getElementById("documents-container");
  if (!container) return;

  const store = getAppStore();
  const currentDoc = FULL_DOCUMENTS.find(d => d.id === state.selectedFullDocId) || FULL_DOCUMENTS[0];

  let listHtml = "";
  FULL_DOCUMENTS.forEach(doc => {
    const isSelected = doc.id === currentDoc.id;
    listHtml += `
      <div id="full-doc-item-${doc.id}" onclick="selectFullDocument('${doc.id}')" class="doc-catalog-item p-3.5 rounded-2xl cursor-pointer transition border ${isSelected ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20' : 'bg-white border-slate-200 hover:bg-slate-50'}">
        <div class="doc-header-row flex items-center justify-between gap-1 mb-1">
          <span class="doc-code-badge text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}">${doc.code}</span>
          ${isSelected ? '<span class="active-doc-badge text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>Aktif</span>' : ''}
        </div>
        <h4 class="text-xs font-bold text-slate-900 leading-snug">${doc.title}</h4>
        <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">${doc.subtitle}</p>
      </div>
    `;
  });

  const previewContent = currentDoc.generateHtml(store);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Sidebar Daftar Dokumen (STICKY MENGIKUTI PREVIEW DOKUMEN) -->
      <div class="lg:col-span-4 no-print space-y-3 sticky top-4 self-start z-10">
        <div class="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col max-h-[calc(100vh-32px)]">
          <div class="flex items-center justify-between mb-2 pb-2.5 border-b border-slate-100 shrink-0">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/></svg>
              <span>Katalog Dokumen Resmi (${FULL_DOCUMENTS.length})</span>
            </h3>
            <span class="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Siap Cetak</span>
          </div>
          <p class="text-[11px] text-slate-500 mb-3 leading-relaxed shrink-0">
            Pilih dokumen di bawah untuk melihat preview format resmi dengan KOP Lembaga & data dinamis yang terhubung dengan menu inputan.
          </p>
          <div id="docs-catalog-list" class="space-y-2 overflow-y-auto pr-1.5 custom-scrollbar flex-1 min-h-0">
            ${listHtml}
          </div>
        </div>
      </div>

      <!-- Preview Sheet Area -->
      <div class="lg:col-span-8">
        <!-- Sticky Action Bar for Preview -->
        <div id="preview-header-area" class="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-4 z-20 no-print transition-all">
          <div id="preview-title-bar" class="flex items-center gap-2.5">
            <span id="preview-doc-code" class="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">${currentDoc.code}</span>
            <div>
              <h3 id="preview-doc-title" class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">${currentDoc.title}</h3>
              <span class="text-[10px] text-slate-500">Standar Format Kertas A4 • Berkop Resmi TPQ</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button onclick="printCurrentDocument()" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              <span>Cetak Dokumen Resmi</span>
            </button>
          </div>
        </div>

        <div id="document-preview-render" class="bg-slate-100 p-4 sm:p-8 rounded-3xl border border-slate-200 overflow-x-auto shadow-inner">
          ${previewContent}
        </div>
      </div>
    </div>
  `;

  // Auto-scroll item aktif di dalam sidebar agar selalu tampak
  setTimeout(() => {
    const activeItem = document.getElementById("full-doc-item-" + currentDoc.id);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, 60);
}

function selectFullDocument(docId) {
  state.selectedFullDocId = docId;

  const currentDoc = FULL_DOCUMENTS.find(d => d.id === docId) || FULL_DOCUMENTS[0];
  const previewContainer = document.getElementById("document-preview-render");
  const codeBadgeEl = document.getElementById("preview-doc-code");
  const titleEl = document.getElementById("preview-doc-title");

  if (previewContainer && codeBadgeEl && titleEl) {
    // 1. Perbarui status visual item aktif di katalog dokumen secara instan tanpa me-reset scroll sidebar
    document.querySelectorAll(".doc-catalog-item").forEach(el => {
      el.className = "doc-catalog-item p-3.5 rounded-2xl cursor-pointer transition border bg-white border-slate-200 hover:bg-slate-50";
      const badge = el.querySelector(".active-doc-badge");
      if (badge) badge.remove();
      const cBadge = el.querySelector(".doc-code-badge");
      if (cBadge) cBadge.className = "doc-code-badge text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700";
    });

    const activeEl = document.getElementById("full-doc-item-" + docId);
    if (activeEl) {
      activeEl.className = "doc-catalog-item p-3.5 rounded-2xl cursor-pointer transition border bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20";
      const cBadge = activeEl.querySelector(".doc-code-badge");
      if (cBadge) cBadge.className = "doc-code-badge text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-700 text-white";
      const headerRow = activeEl.querySelector(".doc-header-row");
      if (headerRow && !activeEl.querySelector(".active-doc-badge")) {
        headerRow.insertAdjacentHTML('beforeend', '<span class="active-doc-badge text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>Aktif</span>');
      }
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // 2. Perbarui bar judul preview & render HTML dokumen baru
    codeBadgeEl.textContent = currentDoc.code;
    titleEl.textContent = currentDoc.title;
    const store = getAppStore();
    previewContainer.innerHTML = currentDoc.generateHtml(store);

    // 3. Scroll layar jendela secara halus agar bagian atas dokumen pas di layar
    const previewHeader = document.getElementById("preview-header-area");
    if (previewHeader) {
      const yOffset = -15;
      const y = previewHeader.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  } else {
    renderDocumentsView();
  }
}

function printCurrentDocument() {
  const store = getAppStore();
  const currentDoc = FULL_DOCUMENTS.find(d => d.id === state.selectedFullDocId) || FULL_DOCUMENTS[0];
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${currentDoc.title} - TPQ Muslimat NU AL-IKHLAS</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="css/custom.css">
      <style>
        body { background: white !important; padding: 20px; font-family: 'Times New Roman', Times, serif; color: black; font-size: 11pt; }
        .doc-paper { box-shadow: none !important; border: none !important; padding: 0 !important; max-width: 100% !important; }
        @media print { body { padding: 0 !important; } }
      </style>
    </head>
    <body>
      ${currentDoc.generateHtml(store)}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
}

// ==========================================
// 3. MENU KELOLA DATA & INPUTAN (CRUD)
// ==========================================

function renderDataInputView() {
  const container = document.getElementById("data-input-container");
  if (!container) return;

  const store = getAppStore();

  let subNavHtml = `
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-slate-200 mb-6">
      <button onclick="switchInputSubTab('santri')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'santri' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>Peserta Didik (Santri)</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${state.activeInputSubTab === 'santri' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'}">${store.santri.length}</span>
      </button>

      <button onclick="switchInputSubTab('ustadz')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'ustadz' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>Pendidik (Ustadz/ah)</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${state.activeInputSubTab === 'ustadz' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'}">${store.ustadz.length}</span>
      </button>

      <button onclick="switchInputSubTab('kop')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'kop' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>📜 Kop Surat & Logo</span>
      </button>

      <button onclick="switchInputSubTab('kepala')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'kepala' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>🧕 Kepala TPQ & Pimpinan</span>
      </button>

      <button onclick="switchInputSubTab('inventaris')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'inventaris' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>Sarana & Prasarana</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${state.activeInputSubTab === 'inventaris' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'}">${store.inventaris.length}</span>
      </button>

      <button onclick="switchInputSubTab('kas')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'kas' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>Buku Kas Keuangan</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${state.activeInputSubTab === 'kas' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'}">${store.kas.length}</span>
      </button>

      <button onclick="switchInputSubTab('formulir')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'formulir' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>📝 Formulir Pendaftaran</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${state.activeInputSubTab === 'formulir' ? 'bg-emerald-900 text-white' : 'bg-amber-100 text-amber-800'}">Disesuaikan</span>
      </button>

      <button onclick="switchInputSubTab('profil')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${state.activeInputSubTab === 'profil' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">
        <span>Profil Lembaga & Izin</span>
      </button>
    </div>
  `;

  let subContentHtml = "";
  if (state.activeInputSubTab === "santri") {
    subContentHtml = renderSantriSubView(store);
  } else if (state.activeInputSubTab === "ustadz") {
    subContentHtml = renderUstadzSubView(store);
  } else if (state.activeInputSubTab === "kop") {
    subContentHtml = renderKopSubView(store);
  } else if (state.activeInputSubTab === "kepala") {
    subContentHtml = renderKepalaSubView(store);
  } else if (state.activeInputSubTab === "inventaris") {
    subContentHtml = renderInventarisSubView(store);
  } else if (state.activeInputSubTab === "kas") {
    subContentHtml = renderKasSubView(store);
  } else if (state.activeInputSubTab === "formulir") {
    subContentHtml = renderFormulirSubView(store);
  } else if (state.activeInputSubTab === "profil") {
    subContentHtml = renderProfilSubView(store);
  }

  container.innerHTML = `
    <div>
      ${subNavHtml}
      ${subContentHtml}
    </div>
  `;
}

function switchInputSubTab(subTab) {
  state.activeInputSubTab = subTab;
  renderDataInputView();
}

// 3.1 Sub-View Santri
function renderSantriSubView(store) {
  const santri = store.santri;

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-base font-bold text-slate-900">Database Peserta Didik (Buku Induk Santri)</h3>
          <p class="text-xs text-slate-500">Kelola master data santri aktif untuk sinkronisasi EMIS Kemenag RI dan Buku Induk.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openSantriModal(null)" class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Tambah Santri Baru</span>
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th class="p-3 w-10 text-center">No</th>
              <th class="p-3">NIS</th>
              <th class="p-3">NIK Santri</th>
              <th class="p-3">Nama Santri</th>
              <th class="p-3 text-center">L/P</th>
              <th class="p-3">Jilid / Kelas</th>
              <th class="p-3">Nama Orang Tua</th>
              <th class="p-3">WhatsApp Wali</th>
              <th class="p-3 text-center">Status</th>
              <th class="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${santri.map((s, idx) => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 text-center font-medium text-slate-500">${idx + 1}</td>
                <td class="p-3 font-mono font-bold text-slate-800">${s.nis}</td>
                <td class="p-3 font-mono text-slate-600">${s.nik}</td>
                <td class="p-3 font-bold text-slate-900">${s.name}</td>
                <td class="p-3 text-center font-bold ${s.gender === 'L' ? 'text-blue-700' : 'text-emerald-700'}">${s.gender}</td>
                <td class="p-3 font-semibold text-emerald-900">${s.classLevel}</td>
                <td class="p-3 text-slate-700">${s.parentName}</td>
                <td class="p-3 font-mono text-slate-600">${s.parentPhone}</td>
                <td class="p-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">${s.status}</span></td>
                <td class="p-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button onclick="openSantriModal('${s.id}')" title="Edit" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="deleteSantri('${s.id}')" title="Hapus" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openSantriModal(id) {
  state.editingSantriId = id;
  const store = getAppStore();
  let item = {
    nis: `2026/0${store.santri.length + 1}`,
    nik: "351501",
    name: "",
    gender: "L",
    birthPlace: "Surabaya",
    birthDate: "2018-01-01",
    classLevel: "Jilid 1",
    parentName: "",
    parentPhone: "08",
    address: "",
    joinDate: "2026-07-13",
    status: "Aktif"
  };

  if (id) {
    const existing = store.santri.find(s => s.id === id);
    if (existing) item = { ...existing };
  }

  const modal = document.getElementById("form-modal");
  const modalTitle = document.getElementById("form-modal-title");
  const modalBody = document.getElementById("form-modal-body");

  modalTitle.innerText = id ? "Edit Data Santri" : "Tambah Santri Baru";

  modalBody.innerHTML = `
    <div class="space-y-3 text-xs">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Nomor Induk Santri (NIS)</label>
          <input type="text" id="inp-santri-nis" value="${item.nis}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">NIK Santri (16 Digit)</label>
          <input type="text" id="inp-santri-nik" value="${item.nik}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Nama Lengkap Santri</label>
        <input type="text" id="inp-santri-name" value="${item.name}" placeholder="Contoh: Muhammad Bilal" class="w-full p-2 bg-slate-50 border rounded-xl">
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
          <select id="inp-santri-gender" class="w-full p-2 bg-slate-50 border rounded-xl">
            <option value="L" ${item.gender === 'L' ? 'selected' : ''}>Laki-laki (L)</option>
            <option value="P" ${item.gender === 'P' ? 'selected' : ''}>Perempuan (P)</option>
          </select>
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Tempat Lahir</label>
          <input type="text" id="inp-santri-bplace" value="${item.birthPlace}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Tanggal Lahir</label>
          <input type="date" id="inp-santri-bdate" value="${item.birthDate}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Jilid / Tingkatan Belajar</label>
          <select id="inp-santri-class" class="w-full p-2 bg-slate-50 border rounded-xl font-semibold text-emerald-900">
            <option value="Jilid 1" ${item.classLevel === 'Jilid 1' ? 'selected' : ''}>Jilid 1</option>
            <option value="Jilid 2" ${item.classLevel === 'Jilid 2' ? 'selected' : ''}>Jilid 2</option>
            <option value="Jilid 3" ${item.classLevel === 'Jilid 3' ? 'selected' : ''}>Jilid 3</option>
            <option value="Jilid 4" ${item.classLevel === 'Jilid 4' ? 'selected' : ''}>Jilid 4</option>
            <option value="Jilid 5" ${item.classLevel === 'Jilid 5' ? 'selected' : ''}>Jilid 5</option>
            <option value="Jilid 6" ${item.classLevel === 'Jilid 6' ? 'selected' : ''}>Jilid 6</option>
            <option value="Al-Qur'an & Tajwid" ${item.classLevel === "Al-Qur'an & Tajwid" ? 'selected' : ''}>Al-Qur'an & Tajwid</option>
            <option value="Pasca TPQ (Ghorib)" ${item.classLevel === 'Pasca TPQ (Ghorib)' ? 'selected' : ''}>Pasca TPQ (Ghorib)</option>
          </select>
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Status Keaktifan</label>
          <select id="inp-santri-status" class="w-full p-2 bg-slate-50 border rounded-xl">
            <option value="Aktif" ${item.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
            <option value="Lulus Wisuda" ${item.status === 'Lulus Wisuda' ? 'selected' : ''}>Lulus Wisuda</option>
            <option value="Mutasi" ${item.status === 'Mutasi' ? 'selected' : ''}>Mutasi</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Nama Orang Tua / Wali</label>
          <input type="text" id="inp-santri-pname" value="${item.parentName}" placeholder="Nama Ayah/Ibu" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">WhatsApp Orang Tua</label>
          <input type="text" id="inp-santri-pphone" value="${item.parentPhone}" placeholder="08..." class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Alamat Lengkap</label>
        <textarea id="inp-santri-address" rows="2" class="w-full p-2 bg-slate-50 border rounded-xl">${item.address || ''}</textarea>
      </div>
    </div>
  `;

  document.getElementById("form-modal-save").onclick = saveSantriModal;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function saveSantriModal() {
  const store = getAppStore();
  const nis = document.getElementById("inp-santri-nis").value.trim();
  const nik = document.getElementById("inp-santri-nik").value.trim();
  const name = document.getElementById("inp-santri-name").value.trim();

  if (!name) {
    alert("Nama santri wajib diisi.");
    return;
  }

  const payload = {
    id: state.editingSantriId || `STR-${Date.now().toString().slice(-4)}`,
    nis: nis,
    nik: nik,
    name: name,
    gender: document.getElementById("inp-santri-gender").value,
    birthPlace: document.getElementById("inp-santri-bplace").value.trim(),
    birthDate: document.getElementById("inp-santri-bdate").value,
    classLevel: document.getElementById("inp-santri-class").value,
    status: document.getElementById("inp-santri-status").value,
    parentName: document.getElementById("inp-santri-pname").value.trim(),
    parentPhone: document.getElementById("inp-santri-pphone").value.trim(),
    address: document.getElementById("inp-santri-address").value.trim(),
    joinDate: new Date().toISOString().slice(0, 10)
  };

  if (state.editingSantriId) {
    const idx = store.santri.findIndex(s => s.id === state.editingSantriId);
    if (idx !== -1) store.santri[idx] = payload;
  } else {
    store.santri.push(payload);
  }

  saveAppStore(store);
  closeFormModal();
  renderDataInputView();
  showToast("Data santri berhasil disimpan!");
}

function deleteSantri(id) {
  if (confirm("Hapus data santri ini?")) {
    const store = getAppStore();
    store.santri = store.santri.filter(s => s.id !== id);
    saveAppStore(store);
    renderDataInputView();
    showToast("Data santri telah dihapus.");
  }
}

// 3.2 Sub-View Ustadz/ah
function renderUstadzSubView(store) {
  const ustadz = store.ustadz;

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-base font-bold text-slate-900">Database Pendidik & Tenaga Kependidikan (Ustadz/ah)</h3>
          <p class="text-xs text-slate-500">Kualifikasi ijazah, kepemilikan syahadah metode Al-Qur'an, dan penugasan mengajar.</p>
        </div>
        <button onclick="openUstadzModal(null)" class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Tambah Ustadz/ah</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th class="p-3 w-10 text-center">No</th>
              <th class="p-3">NIP / NIK</th>
              <th class="p-3">Nama Lengkap & Gelar</th>
              <th class="p-3">Pendidikan</th>
              <th class="p-3">Syahadah Metode</th>
              <th class="p-3">Nomor Syahadah</th>
              <th class="p-3">Tugas Mengajar</th>
              <th class="p-3">Kontak</th>
              <th class="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${ustadz.map((u, idx) => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 text-center font-medium text-slate-500">${idx + 1}</td>
                <td class="p-3 font-mono text-slate-700">${u.nip}</td>
                <td class="p-3 font-bold text-slate-900">${u.name}</td>
                <td class="p-3 text-slate-600">${u.education}</td>
                <td class="p-3 font-semibold text-emerald-900">${u.syahadahMethod}</td>
                <td class="p-3 font-mono text-xs text-slate-600">${u.syahadahNumber}</td>
                <td class="p-3 font-medium text-slate-800">${u.assignedClass}</td>
                <td class="p-3 font-mono text-slate-600">${u.phone}</td>
                <td class="p-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button onclick="openUstadzModal('${u.id}')" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="deleteUstadz('${u.id}')" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openUstadzModal(id) {
  state.editingUstadzId = id;
  const store = getAppStore();
  let item = {
    nip: `TPQ-01.00${store.ustadz.length + 1}`,
    nik: "351501",
    name: "",
    gender: "P",
    education: "S1 Pendidikan Agama Islam",
    pesantren: "Pondok Pesantren",
    syahadahMethod: "Metode An-Nahdliyah",
    syahadahNumber: "SYH-AN/JTM/2024/",
    syahadahYear: "2024",
    assignedClass: "Pengampu Kelas Al-Qur'an",
    phone: "08",
    status: "Guru Tetap"
  };

  if (id) {
    const existing = store.ustadz.find(u => u.id === id);
    if (existing) item = { ...existing };
  }

  const modal = document.getElementById("form-modal");
  const modalTitle = document.getElementById("form-modal-title");
  const modalBody = document.getElementById("form-modal-body");

  modalTitle.innerText = id ? "Edit Data Ustadz/ah" : "Tambah Ustadz/ah Baru";

  modalBody.innerHTML = `
    <div class="space-y-3 text-xs">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">NIP Lembaga</label>
          <input type="text" id="inp-ust-nip" value="${item.nip}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">NIK (16 Digit)</label>
          <input type="text" id="inp-ust-nik" value="${item.nik}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
        <input type="text" id="inp-ust-name" value="${item.name}" placeholder="Contoh: Ustadzah Siti Aminah, S.Pd.I" class="w-full p-2 bg-slate-50 border rounded-xl font-semibold">
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Pendidikan Formal Terakhir</label>
          <input type="text" id="inp-ust-edu" value="${item.education}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Riwayat Pondok Pesantren</label>
          <input type="text" id="inp-ust-pes" value="${item.pesantren}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Metode Al-Qur'an</label>
          <input type="text" id="inp-ust-meth" value="${item.syahadahMethod}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Nomor Syahadah</label>
          <input type="text" id="inp-ust-syahnum" value="${item.syahadahNumber}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Tahun Lulus</label>
          <input type="text" id="inp-ust-syahyear" value="${item.syahadahYear}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Tugas / Rombel Mengajar</label>
          <input type="text" id="inp-ust-class" value="${item.assignedClass}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Nomor Kontak / WhatsApp</label>
          <input type="text" id="inp-ust-phone" value="${item.phone}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>
    </div>
  `;

  document.getElementById("form-modal-save").onclick = saveUstadzModal;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function saveUstadzModal() {
  const store = getAppStore();
  const name = document.getElementById("inp-ust-name").value.trim();
  if (!name) {
    alert("Nama Ustadz/ah wajib diisi.");
    return;
  }

  const payload = {
    id: state.editingUstadzId || `UST-${Date.now().toString().slice(-4)}`,
    nip: document.getElementById("inp-ust-nip").value.trim(),
    nik: document.getElementById("inp-ust-nik").value.trim(),
    name: name,
    gender: "P",
    education: document.getElementById("inp-ust-edu").value.trim(),
    pesantren: document.getElementById("inp-ust-pes").value.trim(),
    syahadahMethod: document.getElementById("inp-ust-meth").value.trim(),
    syahadahNumber: document.getElementById("inp-ust-syahnum").value.trim(),
    syahadahYear: document.getElementById("inp-ust-syahyear").value.trim(),
    assignedClass: document.getElementById("inp-ust-class").value.trim(),
    phone: document.getElementById("inp-ust-phone").value.trim(),
    status: "Guru Tetap"
  };

  if (state.editingUstadzId) {
    const idx = store.ustadz.findIndex(u => u.id === state.editingUstadzId);
    if (idx !== -1) store.ustadz[idx] = payload;
  } else {
    store.ustadz.push(payload);
  }

  saveAppStore(store);
  closeFormModal();
  renderDataInputView();
  showToast("Data Ustadz/ah berhasil disimpan!");
}

function deleteUstadz(id) {
  if (confirm("Hapus data ustadz/ah ini?")) {
    const store = getAppStore();
    store.ustadz = store.ustadz.filter(u => u.id !== id);
    saveAppStore(store);
    renderDataInputView();
    showToast("Data pendidik telah dihapus.");
  }
}

// 3.3 Sub-View Inventaris
function renderInventarisSubView(store) {
  const inv = store.inventaris;

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-base font-bold text-slate-900">Database Sarana & Prasarana (Buku Inventaris Barang)</h3>
          <p class="text-xs text-slate-500">Pencatatan kodefikasi aset, jumlah, kondisi fisik, dan lokasi penempatan fasilitas.</p>
        </div>
        <button onclick="openInventarisModal(null)" class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Tambah Aset Inventaris</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th class="p-3 w-10 text-center">No</th>
              <th class="p-3">Kode Barang</th>
              <th class="p-3">Nama Barang</th>
              <th class="p-3">Kategori</th>
              <th class="p-3 text-center">Volume</th>
              <th class="p-3 text-center">Kondisi</th>
              <th class="p-3">Sumber Perolehan</th>
              <th class="p-3">Lokasi</th>
              <th class="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${inv.map((item, idx) => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 text-center font-medium text-slate-500">${idx + 1}</td>
                <td class="p-3 font-mono text-[11px] text-slate-700">${item.code}</td>
                <td class="p-3 font-bold text-slate-900">${item.name}</td>
                <td class="p-3 text-slate-600">${item.category}</td>
                <td class="p-3 text-center font-bold">${item.qty} ${item.unit}</td>
                <td class="p-3 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.condition === 'Baik' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${item.condition}</span></td>
                <td class="p-3 text-slate-700">${item.source}</td>
                <td class="p-3 text-slate-600">${item.location}</td>
                <td class="p-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button onclick="openInventarisModal('${item.id}')" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="deleteInventaris('${item.id}')" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openInventarisModal(id) {
  state.editingInvId = id;
  const store = getAppStore();
  let item = {
    code: `INV/TPQ/BRG/00${store.inventaris.length + 1}`,
    name: "",
    category: "Perabot Belajar",
    qty: 1,
    unit: "Unit",
    condition: "Baik",
    source: "Yayasan AL FATAH",
    location: "Ruang Belajar Utama",
    acqYear: "2026"
  };

  if (id) {
    const existing = store.inventaris.find(i => i.id === id);
    if (existing) item = { ...existing };
  }

  const modal = document.getElementById("form-modal");
  const modalTitle = document.getElementById("form-modal-title");
  const modalBody = document.getElementById("form-modal-body");

  modalTitle.innerText = id ? "Edit Aset Inventaris" : "Tambah Aset Inventaris Baru";

  modalBody.innerHTML = `
    <div class="space-y-3 text-xs">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Kode Barang</label>
          <input type="text" id="inp-inv-code" value="${item.code}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Kategori Barang</label>
          <input type="text" id="inp-inv-cat" value="${item.category}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Nama Barang / Fasilitas</label>
        <input type="text" id="inp-inv-name" value="${item.name}" placeholder="Contoh: Meja Lipat / Rekal Kayu" class="w-full p-2 bg-slate-50 border rounded-xl font-semibold">
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Jumlah</label>
          <input type="number" id="inp-inv-qty" value="${item.qty}" class="w-full p-2 bg-slate-50 border rounded-xl font-bold">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Satuan</label>
          <input type="text" id="inp-inv-unit" value="${item.unit}" placeholder="Unit/Set/Roll" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Kondisi Fisik</label>
          <select id="inp-inv-cond" class="w-full p-2 bg-slate-50 border rounded-xl font-semibold">
            <option value="Baik" ${item.condition === 'Baik' ? 'selected' : ''}>Baik</option>
            <option value="Rusak Ringan" ${item.condition === 'Rusak Ringan' ? 'selected' : ''}>Rusak Ringan</option>
            <option value="Rusak Berat" ${item.condition === 'Rusak Berat' ? 'selected' : ''}>Rusak Berat</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Sumber Perolehan</label>
          <input type="text" id="inp-inv-source" value="${item.source}" placeholder="Wakaf/Yayasan/Kas" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Lokasi Ruang</label>
          <input type="text" id="inp-inv-loc" value="${item.location}" placeholder="Ruang Belajar/Kantor" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
      </div>
    </div>
  `;

  document.getElementById("form-modal-save").onclick = saveInventarisModal;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function saveInventarisModal() {
  const store = getAppStore();
  const name = document.getElementById("inp-inv-name").value.trim();
  if (!name) {
    alert("Nama barang wajib diisi.");
    return;
  }

  const payload = {
    id: state.editingInvId || `INV-${Date.now().toString().slice(-4)}`,
    code: document.getElementById("inp-inv-code").value.trim(),
    category: document.getElementById("inp-inv-cat").value.trim(),
    name: name,
    qty: Number(document.getElementById("inp-inv-qty").value) || 1,
    unit: document.getElementById("inp-inv-unit").value.trim() || 'Unit',
    condition: document.getElementById("inp-inv-cond").value,
    source: document.getElementById("inp-inv-source").value.trim(),
    location: document.getElementById("inp-inv-loc").value.trim(),
    acqYear: new Date().getFullYear().toString()
  };

  if (state.editingInvId) {
    const idx = store.inventaris.findIndex(i => i.id === state.editingInvId);
    if (idx !== -1) store.inventaris[idx] = payload;
  } else {
    store.inventaris.push(payload);
  }

  saveAppStore(store);
  closeFormModal();
  renderDataInputView();
  showToast("Data inventaris berhasil disimpan!");
}

function deleteInventaris(id) {
  if (confirm("Hapus data inventaris ini?")) {
    const store = getAppStore();
    store.inventaris = store.inventaris.filter(i => i.id !== id);
    saveAppStore(store);
    renderDataInputView();
    showToast("Aset inventaris telah dihapus.");
  }
}

// 3.4 Sub-View Keuangan & Kas
function renderKasSubView(store) {
  const kas = store.kas;

  let totalIn = 0;
  let totalOut = 0;
  kas.forEach(k => {
    const amt = Number(k.amount) || 0;
    if (k.type === 'in') totalIn += amt;
    else totalOut += amt;
  });
  const balance = totalIn - totalOut;

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
          <span class="text-xs font-semibold block text-emerald-800">Total Pemasukan Kas</span>
          <span class="text-xl font-extrabold font-mono mt-1 block">${formatRupiah(totalIn)}</span>
        </div>
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
          <span class="text-xs font-semibold block text-rose-800">Total Pengeluaran Kas</span>
          <span class="text-xl font-extrabold font-mono mt-1 block">${formatRupiah(totalOut)}</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-sm">
          <span class="text-xs font-semibold block text-slate-300">Saldo Akhir Kas Operasional</span>
          <span class="text-xl font-extrabold font-mono text-emerald-400 mt-1 block">${formatRupiah(balance)}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="text-base font-bold text-slate-900">Buku Kas Umum (BKU) Operasional TPQ</h3>
          <p class="text-xs text-slate-500">Pencatatan mutasi transaksi keuangan, SPP santri, bisaroh ustadzah, dan belanja ATK.</p>
        </div>
        <button onclick="openKasModal(null)" class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Tambah Transaksi Kas</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th class="p-3 w-10 text-center">No</th>
              <th class="p-3">Tanggal</th>
              <th class="p-3">No. Bukti</th>
              <th class="p-3">Uraian Transaksi</th>
              <th class="p-3">Kategori</th>
              <th class="p-3 text-right">Pemasukan</th>
              <th class="p-3 text-right">Pengeluaran</th>
              <th class="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${kas.map((k, idx) => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 text-center font-medium text-slate-500">${idx + 1}</td>
                <td class="p-3 font-mono text-slate-700">${k.date}</td>
                <td class="p-3 font-mono text-[11px] text-slate-500">${k.proofNumber}</td>
                <td class="p-3 font-bold text-slate-900">${k.description}</td>
                <td class="p-3 text-slate-600">${k.category}</td>
                <td class="p-3 text-right font-mono font-bold text-emerald-800">${k.type === 'in' ? formatRupiah(k.amount) : '-'}</td>
                <td class="p-3 text-right font-mono font-bold text-rose-800">${k.type === 'out' ? formatRupiah(k.amount) : '-'}</td>
                <td class="p-3 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button onclick="openKasModal('${k.id}')" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="deleteKas('${k.id}')" class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openKasModal(id) {
  state.editingKasId = id;
  const store = getAppStore();
  let item = {
    date: new Date().toISOString().slice(0, 10),
    type: "in",
    category: "Infaq/SPP Santri",
    amount: 100000,
    proofNumber: `KW-${new Date().getMonth() + 1}/2026/0${store.kas.length + 1}`,
    description: ""
  };

  if (id) {
    const existing = store.kas.find(k => k.id === id);
    if (existing) item = { ...existing };
  }

  const modal = document.getElementById("form-modal");
  const modalTitle = document.getElementById("form-modal-title");
  const modalBody = document.getElementById("form-modal-body");

  modalTitle.innerText = id ? "Edit Transaksi Kas" : "Tambah Transaksi Kas";

  modalBody.innerHTML = `
    <div class="space-y-3 text-xs">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Tanggal Transaksi</label>
          <input type="date" id="inp-kas-date" value="${item.date}" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Jenis Transaksi</label>
          <select id="inp-kas-type" class="w-full p-2 bg-slate-50 border rounded-xl font-bold">
            <option value="in" ${item.type === 'in' ? 'selected' : ''}>Pemasukan Kas (In)</option>
            <option value="out" ${item.type === 'out' ? 'selected' : ''}>Pengeluaran Kas (Out)</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="font-bold text-slate-700 block mb-1">Kategori Transaksi</label>
          <input type="text" id="inp-kas-cat" value="${item.category}" placeholder="Infaq SPP/Bisaroh Guru/ATK" class="w-full p-2 bg-slate-50 border rounded-xl">
        </div>
        <div>
          <label class="font-bold text-slate-700 block mb-1">Nomor Bukti / Kuitansi</label>
          <input type="text" id="inp-kas-proof" value="${item.proofNumber}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono">
        </div>
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Nominal Rupiah (Rp)</label>
        <input type="number" id="inp-kas-amount" value="${item.amount}" class="w-full p-2 bg-slate-50 border rounded-xl font-mono font-bold text-emerald-800 text-sm">
      </div>

      <div>
        <label class="font-bold text-slate-700 block mb-1">Uraian / Keterangan Transaksi</label>
        <textarea id="inp-kas-desc" rows="2" placeholder="Tuliskan keterangan lengkap transaksi..." class="w-full p-2 bg-slate-50 border rounded-xl">${item.description || ''}</textarea>
      </div>
    </div>
  `;

  document.getElementById("form-modal-save").onclick = saveKasModal;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function saveKasModal() {
  const store = getAppStore();
  const desc = document.getElementById("inp-kas-desc").value.trim();
  const amount = Number(document.getElementById("inp-kas-amount").value);

  if (!desc || isNaN(amount) || amount <= 0) {
    alert("Keterangan transaksi dan nominal valid wajib diisi.");
    return;
  }

  const payload = {
    id: state.editingKasId || `KAS-${Date.now().toString().slice(-4)}`,
    date: document.getElementById("inp-kas-date").value,
    type: document.getElementById("inp-kas-type").value,
    category: document.getElementById("inp-kas-cat").value.trim(),
    proofNumber: document.getElementById("inp-kas-proof").value.trim(),
    amount: amount,
    description: desc
  };

  if (state.editingKasId) {
    const idx = store.kas.findIndex(k => k.id === state.editingKasId);
    if (idx !== -1) store.kas[idx] = payload;
  } else {
    store.kas.push(payload);
  }

  saveAppStore(store);
  closeFormModal();
  renderDataInputView();
  showToast("Transaksi kas berhasil dicatat!");
}

function deleteKas(id) {
  if (confirm("Hapus catatan transaksi ini?")) {
    const store = getAppStore();
    store.kas = store.kas.filter(k => k.id !== id);
    saveAppStore(store);
    renderDataInputView();
    showToast("Transaksi telah dihapus.");
  }
}

// ==========================================
// 3.6 Sub-View Formulir Pendaftaran Dinamis
// ==========================================

function renderFormulirSubView(store) {
  const cfg = store.formulirConfig || DEFAULT_STORE.formulirConfig;
  const inst = store.institution || {};
  const santriList = store.santri || [];
  const currentMode = state.formulirPrintMode || 'blank';
  const selectedSantriId = state.formulirSelectedSantriId || (santriList[0] ? santriList[0].id : null);

  // Field checklists HTML: Santri
  const studentFieldsHtml = (cfg.studentFields || []).map((f, i) => `
    <div class="flex items-center justify-between gap-2 p-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition">
      <label class="flex items-center gap-2 cursor-pointer flex-1">
        <input type="checkbox" id="field-st-${f.id}-check" ${f.enabled !== false ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
        <span class="text-xs font-semibold text-slate-700">${i + 1}. ${f.label}</span>
      </label>
      <input type="text" id="field-st-${f.id}-label" value="${f.label}" oninput="updateFormulirLivePreview()" class="w-40 text-xs px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800" placeholder="Ubah teks label">
    </div>
  `).join('');

  // Field checklists HTML: Ayah
  const fatherFieldsHtml = (cfg.fatherFields || []).map((f, i) => `
    <div class="flex items-center justify-between gap-2 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition">
      <label class="flex items-center gap-2 cursor-pointer flex-1">
        <input type="checkbox" id="field-fa-${f.id}-check" ${f.enabled !== false ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-3.5 h-3.5 text-emerald-600 rounded focus:ring-emerald-500">
        <span class="text-[11px] font-semibold text-slate-700">${String.fromCharCode(97 + i)}. ${f.label}</span>
      </label>
      <input type="text" id="field-fa-${f.id}-label" value="${f.label}" oninput="updateFormulirLivePreview()" class="w-36 text-[11px] px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-800">
    </div>
  `).join('');

  // Field checklists HTML: Ibu
  const motherFieldsHtml = (cfg.motherFields || []).map((f, i) => `
    <div class="flex items-center justify-between gap-2 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition">
      <label class="flex items-center gap-2 cursor-pointer flex-1">
        <input type="checkbox" id="field-mo-${f.id}-check" ${f.enabled !== false ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-3.5 h-3.5 text-emerald-600 rounded focus:ring-emerald-500">
        <span class="text-[11px] font-semibold text-slate-700">${String.fromCharCode(97 + i)}. ${f.label}</span>
      </label>
      <input type="text" id="field-mo-${f.id}-label" value="${f.label}" oninput="updateFormulirLivePreview()" class="w-36 text-[11px] px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-800">
    </div>
  `).join('');

  // Initial preview render
  const previewHtml = typeof renderFormulirPendaftaran === 'function' ?
    renderFormulirPendaftaran(store, { mode: currentMode, santriId: selectedSantriId }) : '';

  return `
    <div class="space-y-6">
      <!-- HEADER BANNER -->
      <div class="bg-gradient-to-r from-emerald-900 via-nu-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400 text-slate-950 font-bold text-xs mb-2">
            <span>✨ Sistem Formulir Pendaftaran Dinamis</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black tracking-tight">Kustomisasi & Cetak Formulir Pendaftaran (PSB)</h2>
          <p class="text-xs text-nu-100 mt-1 max-w-2xl leading-relaxed">
            Formulir ini dapat disesuaikan sewaktu-waktu jika ada perubahan (judul lembaga, tahun ajaran, kolom identitas santri & orang tua, berkas syarat, atau pejabat penandatangan). Setiap perubahan tersimpan permanen dan langsung terlihat pada preview cetak A4.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 shrink-0">
          <button type="button" onclick="printFormulirDirect()" class="px-4 py-2.5 rounded-2xl bg-gold-400 hover:bg-gold-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition">
            <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            <span>🖨️ Cetak Formulir (A4)</span>
          </button>
        </div>
      </div>

      <!-- GRID LAYOUT: EDITOR FORMULIR (KIRI) vs LIVE PREVIEW (KANAN) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- KOLOM KIRI: EDITOR PENGATURAN (5 Kolom) -->
        <div class="lg:col-span-5 space-y-5">
          
          <!-- KARTU 1: JUDUL & KOP LEMBAGA -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
                <span>Judul & Format Kop Lembaga</span>
              </h3>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Judul Utama Formulir:</label>
                <input type="text" id="cfg-form-title" value="${cfg.title || 'FORMULIR PENDAFTARAN'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white font-bold text-slate-900">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Subjudul / Nama Lembaga:</label>
                <input type="text" id="cfg-form-subtitle" value="${cfg.subtitle || 'CALON PESERTA DIDIK TPQ MUSLIMAT NU AL-IKHLAS'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Tag Cabang / Unit (Opsional):</label>
                  <input type="text" id="cfg-form-branch" value="${cfg.branchTag || ''}" placeholder="Cth: BALAMOA / SIDOKARE" oninput="updateFormulirLivePreview()" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900">
                  <span class="text-[10px] text-slate-400">Dapat diisi bila ada nama ranting/wilayah</span>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Tahun Ajaran:</label>
                  <input type="text" id="cfg-form-year" value="${cfg.academicYear || '2026/2027'}" oninput="updateFormulirLivePreview()" placeholder="2026/2027 atau ..... / ....." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white font-bold text-slate-900">
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100 space-y-2">
                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <input type="checkbox" id="cfg-form-use-kop" ${cfg.useKop ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
                  <div>
                    <span class="font-bold text-slate-900 block">Tampilkan KOP Surat Resmi TPQ</span>
                    <span class="text-[10px] text-slate-500">Logo Yayasan, Muslimat NU, NSQ, IJOP & garis batas resmi</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <input type="checkbox" id="cfg-form-show-photo" ${cfg.showPhotoBox ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
                  <div>
                    <span class="font-bold text-slate-900 block">Tampilkan Kotak Pas Foto 3x4</span>
                    <span class="text-[10px] text-slate-500">Bingkai foto pada lembar pengesahan</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- KARTU 2: KOLOM IDENTITAS CALON SANTRI -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
                <span>Kolom Identitas Calon Santri</span>
              </h3>
              <span class="text-[10px] text-slate-400">Centang untuk mengaktifkan</span>
            </div>

            <div class="space-y-2 text-xs">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Judul Bagian Santri:</label>
                <input type="text" id="cfg-form-student-title" value="${cfg.studentSectionTitle || 'IDENTITAS CALON PESERTA DIDIK'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold">
              </div>

              <div class="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                ${studentFieldsHtml}
              </div>
            </div>
          </div>

          <!-- KARTU 3: KOLOM IDENTITAS ORANG TUA / WALI -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">3</span>
                <span>Identitas Orang Tua / Wali</span>
              </h3>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Judul Bagian Orang Tua:</label>
                <input type="text" id="cfg-form-parent-title" value="${cfg.parentSectionTitle || 'IDENTITAS ORANG TUA/WALI'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold">
              </div>

              <!-- AYAH -->
              <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2">
                <label class="block font-bold text-slate-800">1. Sub-Judul Ayah:</label>
                <input type="text" id="cfg-form-father-header" value="${cfg.fatherHeader || 'Ayah kandung/tiri/angkat/wali *)'}" oninput="updateFormulirLivePreview()" class="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800">
                <div class="space-y-1 mt-2">
                  ${fatherFieldsHtml}
                </div>
              </div>

              <!-- IBU -->
              <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-2">
                <label class="block font-bold text-slate-800">2. Sub-Judul Ibu:</label>
                <input type="text" id="cfg-form-mother-header" value="${cfg.motherHeader || 'Ibu kandung/tiri/angkat/wali *)'}" oninput="updateFormulirLivePreview()" class="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800">
                <div class="space-y-1 mt-2">
                  ${motherFieldsHtml}
                </div>
              </div>
            </div>
          </div>

          <!-- KARTU 4: SYARAT BERKAS & PENGESAHAN -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">4</span>
                <span>Syarat Berkas & Tanda Tangan</span>
              </h3>
            </div>

            <div class="space-y-3 text-xs">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="cfg-form-show-req" ${cfg.showRequirements ? 'checked' : ''} onchange="updateFormulirLivePreview()" class="w-4 h-4 text-emerald-600 rounded">
                <span class="font-bold text-slate-900">Tampilkan Catatan Syarat Berkas Pendaftaran</span>
              </label>

              <div id="cfg-req-box" style="${cfg.showRequirements ? '' : 'display:none;'}">
                <label class="block font-semibold text-slate-700 mb-1">Teks Syarat-Syarat (1 baris per poin):</label>
                <textarea id="cfg-form-req-text" rows="3" oninput="updateFormulirLivePreview()" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs">${cfg.requirementsText || ''}</textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Kota Pendaftaran:</label>
                  <input type="text" id="cfg-form-city" value="${cfg.signCity || inst.legalCity || 'Sidoarjo'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Format Tanggal:</label>
                  <select id="cfg-form-date-mode" onchange="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                    <option value="blank" ${cfg.signDateMode === 'blank' ? 'selected' : ''}>Titik-titik (................ 20...)</option>
                    <option value="today" ${cfg.signDateMode === 'today' ? 'selected' : ''}>Otomatis Tanggal Hari Ini</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Jabatan Panitia/Penerima:</label>
                  <input type="text" id="cfg-form-officer-sign" value="${cfg.officerSignTitle || 'Panitia Penerimaan Santri'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Nama Petugas/Kepala TPQ:</label>
                  <input type="text" id="cfg-form-officer-name" value="${cfg.officerName || inst.headmaster}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Label TTD Orang Tua:</label>
                  <input type="text" id="cfg-form-parent-sign" value="${cfg.parentSignTitle || 'Orang Tua / Wali Calon Santri'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Catatan Kaki:</label>
                  <input type="text" id="cfg-form-footer-note" value="${cfg.footerNote || '*) Coret yang tidak perlu'}" oninput="updateFormulirLivePreview()" class="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 italic">
                </div>
              </div>
            </div>
          </div>

          <!-- TOMBOL AKSI SIMPAN & RESET -->
          <div class="flex items-center gap-3">
            <button type="button" onclick="saveFormulirSettingsFromUI()" class="flex-1 py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Simpan Perubahan Formulir</span>
            </button>
            <button type="button" onclick="resetFormulirSettingsUI()" class="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition">
              <span>Kembalikan Default</span>
            </button>
          </div>
        </div>

        <!-- KOLOM KANAN: LIVE PREVIEW & AKSI CETAK (7 Kolom) -->
        <div class="lg:col-span-7 space-y-4 sticky top-4">
          <!-- ACTION BAR PREVIEW -->
          <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <span class="text-xs font-bold text-slate-600">Mode Cetak:</span>
              <div class="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button type="button" onclick="setFormulirPrintMode('blank')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentMode === 'blank' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                  📝 Blanko (Titik-Titik)
                </button>
                <button type="button" onclick="setFormulirPrintMode('filled')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentMode === 'filled' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                  👤 Terisi (Data Santri)
                </button>
              </div>
            </div>

            <!-- JIKA MODE TERISI: PILIH SANTRI -->
            <div id="formulir-santri-selector" class="${currentMode === 'filled' ? 'flex' : 'hidden'} items-center gap-2 w-full sm:w-auto">
              <span class="text-xs font-semibold text-slate-600">Santri:</span>
              <select onchange="selectFormulirSantri(this.value)" class="text-xs bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-800">
                ${santriList.map(s => `
                  <option value="${s.id}" ${s.id === selectedSantriId ? 'selected' : ''}>${s.nis} - ${s.name} (${s.classLevel})</option>
                `).join('')}
              </select>
            </div>

            <button type="button" onclick="printFormulirDirect()" class="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              <span>Cetak Sekarang (A4)</span>
            </button>
          </div>

          <!-- CONTAINER LIVE PREVIEW A4 -->
          <div id="formulir-live-preview-box" class="bg-slate-200/80 p-4 sm:p-6 rounded-3xl border border-slate-300 shadow-inner overflow-x-auto flex justify-center">
            ${previewHtml}
          </div>
        </div>

      </div>
    </div>
  `;
}

function setFormulirPrintMode(mode) {
  state.formulirPrintMode = mode;
  renderDataInputView();
}

function selectFormulirSantri(santriId) {
  state.formulirSelectedSantriId = santriId;
  updateFormulirLivePreview();
}

function updateFormulirLivePreview() {
  const store = getAppStore();
  const currentCfg = store.formulirConfig || DEFAULT_STORE.formulirConfig;

  // Baca input saat ini
  const titleEl = document.getElementById("cfg-form-title");
  const subtitleEl = document.getElementById("cfg-form-subtitle");
  const branchEl = document.getElementById("cfg-form-branch");
  const yearEl = document.getElementById("cfg-form-year");
  const useKopEl = document.getElementById("cfg-form-use-kop");
  const showPhotoEl = document.getElementById("cfg-form-show-photo");
  const studentTitleEl = document.getElementById("cfg-form-student-title");
  const parentTitleEl = document.getElementById("cfg-form-parent-title");
  const fatherHeaderEl = document.getElementById("cfg-form-father-header");
  const motherHeaderEl = document.getElementById("cfg-form-mother-header");
  const showReqEl = document.getElementById("cfg-form-show-req");
  const reqTextEl = document.getElementById("cfg-form-req-text");
  const cityEl = document.getElementById("cfg-form-city");
  const dateModeEl = document.getElementById("cfg-form-date-mode");
  const officerSignEl = document.getElementById("cfg-form-officer-sign");
  const officerNameEl = document.getElementById("cfg-form-officer-name");
  const parentSignEl = document.getElementById("cfg-form-parent-sign");
  const footerNoteEl = document.getElementById("cfg-form-footer-note");

  const tempCfg = JSON.parse(JSON.stringify(currentCfg));
  if (titleEl) tempCfg.title = titleEl.value;
  if (subtitleEl) tempCfg.subtitle = subtitleEl.value;
  if (branchEl) tempCfg.branchTag = branchEl.value;
  if (yearEl) tempCfg.academicYear = yearEl.value;
  if (useKopEl) tempCfg.useKop = useKopEl.checked;
  if (showPhotoEl) tempCfg.showPhotoBox = showPhotoEl.checked;
  if (studentTitleEl) tempCfg.studentSectionTitle = studentTitleEl.value;
  if (parentTitleEl) tempCfg.parentSectionTitle = parentTitleEl.value;
  if (fatherHeaderEl) tempCfg.fatherHeader = fatherHeaderEl.value;
  if (motherHeaderEl) tempCfg.motherHeader = motherHeaderEl.value;
  if (showReqEl) {
    tempCfg.showRequirements = showReqEl.checked;
    const reqBox = document.getElementById("cfg-req-box");
    if (reqBox) reqBox.style.display = showReqEl.checked ? "" : "none";
  }
  if (reqTextEl) tempCfg.requirementsText = reqTextEl.value;
  if (cityEl) tempCfg.signCity = cityEl.value;
  if (dateModeEl) tempCfg.signDateMode = dateModeEl.value;
  if (officerSignEl) tempCfg.officerSignTitle = officerSignEl.value;
  if (officerNameEl) tempCfg.officerName = officerNameEl.value;
  if (parentSignEl) tempCfg.parentSignTitle = parentSignEl.value;
  if (footerNoteEl) tempCfg.footerNote = footerNoteEl.value;

  // Baca fields santri
  if (tempCfg.studentFields) {
    tempCfg.studentFields.forEach(f => {
      const chk = document.getElementById(`field-st-${f.id}-check`);
      const lbl = document.getElementById(`field-st-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  // Baca fields ayah & ibu
  if (tempCfg.fatherFields) {
    tempCfg.fatherFields.forEach(f => {
      const chk = document.getElementById(`field-fa-${f.id}-check`);
      const lbl = document.getElementById(`field-fa-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  if (tempCfg.motherFields) {
    tempCfg.motherFields.forEach(f => {
      const chk = document.getElementById(`field-mo-${f.id}-check`);
      const lbl = document.getElementById(`field-mo-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  // Render preview
  const box = document.getElementById("formulir-live-preview-box");
  if (box && typeof renderFormulirPendaftaran === 'function') {
    const tempStore = Object.assign({}, store, { formulirConfig: tempCfg });
    box.innerHTML = renderFormulirPendaftaran(tempStore, {
      mode: state.formulirPrintMode || 'blank',
      santriId: state.formulirSelectedSantriId
    });
  }
}

function saveFormulirSettingsFromUI() {
  const store = getAppStore();
  const currentCfg = store.formulirConfig || DEFAULT_STORE.formulirConfig;
  const tempCfg = JSON.parse(JSON.stringify(currentCfg));

  const titleEl = document.getElementById("cfg-form-title");
  const subtitleEl = document.getElementById("cfg-form-subtitle");
  const branchEl = document.getElementById("cfg-form-branch");
  const yearEl = document.getElementById("cfg-form-year");
  const useKopEl = document.getElementById("cfg-form-use-kop");
  const showPhotoEl = document.getElementById("cfg-form-show-photo");
  const studentTitleEl = document.getElementById("cfg-form-student-title");
  const parentTitleEl = document.getElementById("cfg-form-parent-title");
  const fatherHeaderEl = document.getElementById("cfg-form-father-header");
  const motherHeaderEl = document.getElementById("cfg-form-mother-header");
  const showReqEl = document.getElementById("cfg-form-show-req");
  const reqTextEl = document.getElementById("cfg-form-req-text");
  const cityEl = document.getElementById("cfg-form-city");
  const dateModeEl = document.getElementById("cfg-form-date-mode");
  const officerSignEl = document.getElementById("cfg-form-officer-sign");
  const officerNameEl = document.getElementById("cfg-form-officer-name");
  const parentSignEl = document.getElementById("cfg-form-parent-sign");
  const footerNoteEl = document.getElementById("cfg-form-footer-note");

  if (titleEl) tempCfg.title = titleEl.value;
  if (subtitleEl) tempCfg.subtitle = subtitleEl.value;
  if (branchEl) tempCfg.branchTag = branchEl.value;
  if (yearEl) tempCfg.academicYear = yearEl.value;
  if (useKopEl) tempCfg.useKop = useKopEl.checked;
  if (showPhotoEl) tempCfg.showPhotoBox = showPhotoEl.checked;
  if (studentTitleEl) tempCfg.studentSectionTitle = studentTitleEl.value;
  if (parentTitleEl) tempCfg.parentSectionTitle = parentTitleEl.value;
  if (fatherHeaderEl) tempCfg.fatherHeader = fatherHeaderEl.value;
  if (motherHeaderEl) tempCfg.motherHeader = motherHeaderEl.value;
  if (showReqEl) tempCfg.showRequirements = showReqEl.checked;
  if (reqTextEl) tempCfg.requirementsText = reqTextEl.value;
  if (cityEl) tempCfg.signCity = cityEl.value;
  if (dateModeEl) tempCfg.signDateMode = dateModeEl.value;
  if (officerSignEl) tempCfg.officerSignTitle = officerSignEl.value;
  if (officerNameEl) tempCfg.officerName = officerNameEl.value;
  if (parentSignEl) tempCfg.parentSignTitle = parentSignEl.value;
  if (footerNoteEl) tempCfg.footerNote = footerNoteEl.value;

  if (tempCfg.studentFields) {
    tempCfg.studentFields.forEach(f => {
      const chk = document.getElementById(`field-st-${f.id}-check`);
      const lbl = document.getElementById(`field-st-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  if (tempCfg.fatherFields) {
    tempCfg.fatherFields.forEach(f => {
      const chk = document.getElementById(`field-fa-${f.id}-check`);
      const lbl = document.getElementById(`field-fa-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  if (tempCfg.motherFields) {
    tempCfg.motherFields.forEach(f => {
      const chk = document.getElementById(`field-mo-${f.id}-check`);
      const lbl = document.getElementById(`field-mo-${f.id}-label`);
      if (chk) f.enabled = chk.checked;
      if (lbl) f.label = lbl.value;
    });
  }

  updateFormulirConfig(tempCfg);
  showToast("Pengaturan formulir pendaftaran berhasil disimpan permanen!");
}

function resetFormulirSettingsUI() {
  if (confirm("Kembalikan format formulir pendaftaran ke format standar bawaan?")) {
    resetFormulirConfig();
    renderDataInputView();
    showToast("Formulir pendaftaran telah direset ke format standar.");
  }
}

function printFormulirDirect() {
  const store = getAppStore();
  const mode = state.formulirPrintMode || 'blank';
  const santriId = state.formulirSelectedSantriId;
  const printWindow = window.open('', '_blank');
  const content = typeof renderFormulirPendaftaran === 'function' ? 
    renderFormulirPendaftaran(store, { mode, santriId }) : '';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Formulir Pendaftaran Calon Santri - TPQ Muslimat NU AL-IKHLAS</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="css/custom.css">
      <style>
        @page { size: A4 portrait; margin: 10mm 15mm; }
        body { background: white !important; padding: 0; margin: 0; font-family: 'Times New Roman', Times, serif; color: black; font-size: 10pt; }
        .doc-paper, .print-sheet { box-shadow: none !important; border: none !important; padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
        @media print { body { padding: 0 !important; margin: 0 !important; } }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
}

// 3.5 Sub-View Profil Lembaga & Pengurus
function renderProfilSubView(store) {
  const inst = store.institution;

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-base font-bold text-slate-900">Pengaturan Profil & Legalitas Lembaga</h3>
          <p class="text-xs text-slate-500">Data ini secara otomatis menjadi acuan pada KOP Surat, Piagam, dan seluruh dokumen akreditasi resmi.</p>
        </div>
        <button onclick="resetDatabaseToDefault()" class="px-3 py-1.5 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-semibold transition">
          Pulihkan Data Default TPQ Muslimat NU
        </button>
      </div>

      <form onsubmit="saveProfilForm(event)" class="space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nama Satuan TPQ</label>
            <input type="text" id="prof-name" value="${inst.name}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-bold text-emerald-950">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Yayasan Penyelenggara</label>
            <input type="text" id="prof-found" value="${inst.foundation}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-bold">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nama Kepala TPQ & Gelar</label>
            <input type="text" id="prof-headmaster" value="${inst.headmaster}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nama Ketua Yayasan</label>
            <input type="text" id="prof-headfoundation" value="${inst.headFoundation}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nomor Statistik TPQ (NSQ)</label>
            <input type="text" id="prof-nsq" value="${inst.nsq}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-mono">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nomor SK Izin Operasional (IJOP)</label>
            <input type="text" id="prof-ijop" value="${inst.ijop}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-mono">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nomor SK Kemenkumham Yayasan</label>
            <input type="text" id="prof-notary" value="${inst.notary}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-mono">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Alamat Jalan / Gedung</label>
            <input type="text" id="prof-address" value="${inst.address}" class="w-full p-2.5 bg-slate-50 border rounded-xl">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Desa / Kelurahan</label>
            <input type="text" id="prof-village" value="${inst.village}" class="w-full p-2.5 bg-slate-50 border rounded-xl">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Kecamatan</label>
            <input type="text" id="prof-subdistrict" value="${inst.subdistrict}" class="w-full p-2.5 bg-slate-50 border rounded-xl">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Kabupaten / Kota</label>
            <input type="text" id="prof-city" value="${inst.city}" class="w-full p-2.5 bg-slate-50 border rounded-xl">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Nomor Telepon / WhatsApp</label>
            <input type="text" id="prof-phone" value="${inst.phone}" class="w-full p-2.5 bg-slate-50 border rounded-xl font-mono">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Metode Al-Qur'an Utama</label>
            <input type="text" id="prof-method" value="${inst.method}" class="w-full p-2.5 bg-slate-50 border rounded-xl">
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Simpan Perubahan Profil Lembaga</span>
          </button>
        </div>
      </form>
    </div>
  `;
}

function saveProfilForm(e) {
  e.preventDefault();
  const store = getAppStore();

  store.institution.name = document.getElementById("prof-name").value.trim();
  store.institution.foundation = document.getElementById("prof-found").value.trim();
  store.institution.headmaster = document.getElementById("prof-headmaster").value.trim();
  store.institution.headFoundation = document.getElementById("prof-headfoundation").value.trim();
  store.institution.nsq = document.getElementById("prof-nsq").value.trim();
  store.institution.ijop = document.getElementById("prof-ijop").value.trim();
  store.institution.notary = document.getElementById("prof-notary").value.trim();
  store.institution.address = document.getElementById("prof-address").value.trim();
  store.institution.village = document.getElementById("prof-village").value.trim();
  store.institution.subdistrict = document.getElementById("prof-subdistrict").value.trim();
  store.institution.city = document.getElementById("prof-city").value.trim();
  store.institution.phone = document.getElementById("prof-phone").value.trim();
  store.institution.method = document.getElementById("prof-method").value.trim();
  store.institution.updatedAt = new Date().toISOString();

  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Profil lembaga berhasil diperbarui! Seluruh kop surat tersinkronisasi.");
}

// ==========================================
// 3.6 SUB-VIEW KOP SURAT & LOGO EDITOR
// ==========================================

function renderKopSubView(store) {
  const inst = store.institution;
  const kopLayout = inst.kopLogoLayout || inst.logoPosition || 'both';

  let logoLeftPreview = "";
  if (inst.logoLeft) {
    logoLeftPreview = `<img src="${inst.logoLeft}" alt="Logo Kiri" class="w-full h-full object-contain">`;
  } else {
    const icon = inst.logoLeftPreset === 'mosque' ? '🕌' : inst.logoLeftPreset === 'building' ? '🏛️' : inst.logoLeftPreset === 'star' ? '🌟' : '📖';
    logoLeftPreview = `<span class="text-3xl">${icon}</span>`;
  }

  let logoRightPreview = "";
  if (inst.logoRight) {
    logoRightPreview = `<img src="${inst.logoRight}" alt="Logo Kanan" class="w-full h-full object-contain">`;
  } else {
    if (inst.logoRightPreset === 'nu') {
      logoRightPreview = `<div class="bg-emerald-900 text-amber-300 font-black text-[9px] text-center p-1 rounded-lg leading-tight">NAHDLATUL<br>ULAMA</div>`;
    } else if (inst.logoRightPreset === 'islamic') {
      logoRightPreview = `<span class="text-3xl">☪️</span>`;
    } else {
      logoRightPreview = `<div class="bg-emerald-900 text-amber-300 font-bold text-[9px] text-center p-1 rounded-lg leading-tight">MUSLIMAT<br>NU</div>`;
    }
  }

  return `
    <div class="space-y-6">
      <!-- HEADER BANNER -->
      <div class="bg-gradient-to-r from-emerald-900 via-nu-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400 text-slate-950 font-bold text-xs mb-2">
            <span>📜 PENGATURAN KOP & LOGO RESMI</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black tracking-tight text-white">
            Editor Kop Surat & Pengaturan Logo TPQ
          </h2>
          <p class="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl leading-relaxed">
            Sesuaikan posisi logo (kiri saja, kanan saja, atau kedua sisi), unggah logo yayasan & Muslimat NU, teks legalitas, dan gaya garis pembatas. Seluruh dokumen akreditasi dan preview resmi akan tersinkronisasi otomatis.
          </p>
        </div>
        <div class="flex flex-wrap gap-2 shrink-0">
          <button onclick="printBlankoKop()" class="px-4 py-2.5 bg-gold-400 hover:bg-gold-300 text-slate-950 font-black rounded-xl text-xs transition shadow-md flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            <span>Cetak Blanko Kop Kosong (A4)</span>
          </button>
        </div>
      </div>

      <!-- GRID: FORM (KIRI) & LIVE PREVIEW (KANAN) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- KOLOM KIRI: FORM PENGATURAN -->
        <div class="lg:col-span-7 space-y-6">

          <!-- 1. PILIHAN TAMPILAN / POSISI LOGO KOP SURAT -->
          <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Pilihan Tampilan Logo KOP Surat</span>
                </h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Pilih apakah ingin menggunakan kedua logo, logo sebelah kiri saja (kanan kosong), logo sebelah kanan saja, atau tanpa logo.</p>
              </div>
              <span id="badge-layout-summary" class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                ${kopLayout === 'both' ? '🟢 Dua Logo (Kiri & Kanan)' : kopLayout === 'left' ? '🏛️ Hanya Logo Kiri (Kanan Kosong)' : kopLayout === 'right' ? '🟢 Hanya Logo Kanan (Kiri Kosong)' : '📄 Tanpa Logo'}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <!-- OPSI 1: KEDUA SISI (KIRI & KANAN) -->
              <label id="layout-card-both" onclick="setKopLogoLayout('both')" class="relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition ${kopLayout === 'both' ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}">
                <div class="flex items-center justify-between mb-2">
                  <input type="radio" name="kop-logo-layout" value="both" ${kopLayout === 'both' ? 'checked' : ''} onchange="updateKopLivePreview()" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500">
                  <span class="text-sm font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">🏛️ &nbsp;🟢</span>
                </div>
                <strong class="text-xs font-bold text-slate-900 mb-1">Dua Logo (Kiri & Kanan)</strong>
                <p class="text-[10px] text-slate-600 leading-relaxed">Logo Yayasan di kiri & Logo Muslimat NU di kanan (Standar Lengkap).</p>
              </label>

              <!-- OPSI 2: HANYA SEBELAH KIRI (KANAN KOSONG) -->
              <label id="layout-card-left" onclick="setKopLogoLayout('left')" class="relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition ${kopLayout === 'left' ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}">
                <div class="flex items-center justify-between mb-2">
                  <input type="radio" name="kop-logo-layout" value="left" ${kopLayout === 'left' ? 'checked' : ''} onchange="updateKopLivePreview()" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500">
                  <span class="text-sm font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">🏛️ &nbsp;⬜</span>
                </div>
                <strong class="text-xs font-bold text-slate-900 mb-1">Hanya Logo Kiri</strong>
                <p class="text-[10px] text-slate-600 leading-relaxed">Sebelah kanan kosong / tanpa logo. Teks kop tetap seimbang di tengah.</p>
              </label>

              <!-- OPSI 3: HANYA SEBELAH KANAN (KIRI KOSONG) -->
              <label id="layout-card-right" onclick="setKopLogoLayout('right')" class="relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition ${kopLayout === 'right' ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}">
                <div class="flex items-center justify-between mb-2">
                  <input type="radio" name="kop-logo-layout" value="right" ${kopLayout === 'right' ? 'checked' : ''} onchange="updateKopLivePreview()" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500">
                  <span class="text-sm font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">⬜ &nbsp;🟢</span>
                </div>
                <strong class="text-xs font-bold text-slate-900 mb-1">Hanya Logo Kanan</strong>
                <p class="text-[10px] text-slate-600 leading-relaxed">Sebelah kiri kosong / tanpa logo. Teks kop tetap seimbang di tengah.</p>
              </label>

              <!-- OPSI 4: TANPA LOGO (HANYA TEKS) -->
              <label id="layout-card-none" onclick="setKopLogoLayout('none')" class="relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition ${kopLayout === 'none' ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'}">
                <div class="flex items-center justify-between mb-2">
                  <input type="radio" name="kop-logo-layout" value="none" ${kopLayout === 'none' ? 'checked' : ''} onchange="updateKopLivePreview()" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500">
                  <span class="text-sm font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">📄</span>
                </div>
                <strong class="text-xs font-bold text-slate-900 mb-1">Tanpa Logo (Teks Saja)</strong>
                <p class="text-[10px] text-slate-600 leading-relaxed">Hanya menampilkan teks KOP nama yayasan & TPQ tanpa logo.</p>
              </label>
            </div>
          </div>

          <!-- 2. PENGATURAN & UPLOAD GAMBAR / PRESET LOGO -->
          <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
              <span>Upload Gambar & Simbol Preset Logo</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- LOGO KIRI -->
              <div id="card-upload-logo-left" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between transition" style="opacity: ${kopLayout === 'right' || kopLayout === 'none' ? '0.65' : '1'};">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-slate-800">Logo Kiri (Yayasan / Qur'an)</span>
                    <span id="badge-status-logo-left">
                      ${kopLayout === 'right' || kopLayout === 'none' ? '<span class="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Kosong / Dinonaktifkan</span>' : '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>'}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 mb-3">
                    <div id="preview-logo-left-container" class="w-16 h-16 rounded-2xl border-2 border-emerald-300 bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-sm">
                      ${logoLeftPreview}
                    </div>
                    <div class="flex-1">
                      <label class="block text-[11px] font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-2 rounded-xl text-center shadow-sm transition">
                        <span>📁 Upload File Logo</span>
                        <input type="file" accept="image/*" onchange="handleLogoUpload(event, 'logoLeft')" class="hidden">
                      </label>
                      <p class="text-[9px] text-slate-500 mt-1">PNG, JPG, WebP, SVG (Maks. 2MB)</p>
                    </div>
                  </div>

                  <div>
                    <span class="text-[10px] font-semibold text-slate-600 block mb-1">Atau Gunakan Simbol Preset:</span>
                    <div class="grid grid-cols-4 gap-1.5 text-xs text-center">
                      <button type="button" onclick="setLogoPreset('logoLeft', 'book')" class="p-1.5 rounded-lg border ${inst.logoLeftPreset === 'book' && !inst.logoLeft ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">📖 Buku</button>
                      <button type="button" onclick="setLogoPreset('logoLeft', 'mosque')" class="p-1.5 rounded-lg border ${inst.logoLeftPreset === 'mosque' && !inst.logoLeft ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">🕌 Kubah</button>
                      <button type="button" onclick="setLogoPreset('logoLeft', 'building')" class="p-1.5 rounded-lg border ${inst.logoLeftPreset === 'building' && !inst.logoLeft ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">🏛️ Yayasan</button>
                      <button type="button" onclick="setLogoPreset('logoLeft', 'star')" class="p-1.5 rounded-lg border ${inst.logoLeftPreset === 'star' && !inst.logoLeft ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">🌟 Bintang</button>
                    </div>
                  </div>
                </div>

                ${inst.logoLeft ? `
                  <div class="mt-3 pt-2 border-t border-slate-200">
                    <button type="button" onclick="clearCustomLogo('logoLeft')" class="text-[10px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      <span>Hapus Gambar & Gunakan Preset</span>
                    </button>
                  </div>
                ` : ''}
              </div>

              <!-- LOGO KANAN -->
              <div id="card-upload-logo-right" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between transition" style="opacity: ${kopLayout === 'left' || kopLayout === 'none' ? '0.65' : '1'};">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-slate-800">Logo Kanan (Muslimat NU / Lembaga)</span>
                    <span id="badge-status-logo-right">
                      ${kopLayout === 'left' || kopLayout === 'none' ? '<span class="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Kosong / Dinonaktifkan</span>' : '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>'}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 mb-3">
                    <div id="preview-logo-right-container" class="w-16 h-16 rounded-2xl border-2 border-emerald-300 bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-sm">
                      ${logoRightPreview}
                    </div>
                    <div class="flex-1">
                      <label class="block text-[11px] font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-2 rounded-xl text-center shadow-sm transition">
                        <span>📁 Upload File Logo</span>
                        <input type="file" accept="image/*" onchange="handleLogoUpload(event, 'logoRight')" class="hidden">
                      </label>
                      <p class="text-[9px] text-slate-500 mt-1">PNG, JPG, WebP, SVG (Maks. 2MB)</p>
                    </div>
                  </div>

                  <div>
                    <span class="text-[10px] font-semibold text-slate-600 block mb-1">Atau Gunakan Lambang Preset:</span>
                    <div class="grid grid-cols-3 gap-1.5 text-xs text-center">
                      <button type="button" onclick="setLogoPreset('logoRight', 'muslimat')" class="p-1.5 rounded-lg border ${inst.logoRightPreset === 'muslimat' && !inst.logoRight ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">Muslimat NU</button>
                      <button type="button" onclick="setLogoPreset('logoRight', 'nu')" class="p-1.5 rounded-lg border ${inst.logoRightPreset === 'nu' && !inst.logoRight ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">NU Bintang 9</button>
                      <button type="button" onclick="setLogoPreset('logoRight', 'islamic')" class="p-1.5 rounded-lg border ${inst.logoRightPreset === 'islamic' && !inst.logoRight ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white hover:bg-slate-100 border-slate-200'}">Bulan Sabit ☪️</button>
                    </div>
                  </div>
                </div>

                ${inst.logoRight ? `
                  <div class="mt-3 pt-2 border-t border-slate-200">
                    <button type="button" onclick="clearCustomLogo('logoRight')" class="text-[10px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      <span>Hapus Gambar & Gunakan Preset</span>
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- 3. TEKS & INFORMASI KOP SURAT -->
          <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">3</span>
              <span>Data Identitas & Alamat KOP Surat</span>
            </h3>

            <form onsubmit="saveKopForm(event)" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nama Yayasan Penyelenggara (Baris 1)</label>
                  <input type="text" id="kop-foundation" value="${inst.foundation}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nama Satuan TPQ (Baris 2 Utama)</label>
                  <input type="text" id="kop-name" value="${inst.name}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-emerald-950 uppercase focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Afiliasi Ormas (Baris 3)</label>
                  <input type="text" id="kop-affiliation" value="${inst.affiliation}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Metode Pengajaran Al-Qur'an</label>
                  <input type="text" id="kop-method" value="${inst.method}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nomor Statistik (NSQ / NPSN)</label>
                  <input type="text" id="kop-nsq" value="${inst.nsq}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nomor SK IJOP Kemenag</label>
                  <input type="text" id="kop-ijop" value="${inst.ijop}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">SK Kemenkumham Yayasan</label>
                  <input type="text" id="kop-notary" value="${inst.notary}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                  <label class="font-bold text-slate-700 block mb-1">Alamat Jalan & Nomor Bangunan</label>
                  <input type="text" id="kop-address" value="${inst.address}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Kelurahan / Desa</label>
                  <input type="text" id="kop-village" value="${inst.village}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Kecamatan</label>
                  <input type="text" id="kop-subdistrict" value="${inst.subdistrict}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Kabupaten / Kota</label>
                  <input type="text" id="kop-city" value="${inst.city}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Kode Pos</label>
                  <input type="text" id="kop-postcode" value="${inst.postCode}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">No. Telepon / WhatsApp Lembaga</label>
                  <input type="text" id="kop-phone" value="${inst.phone}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Email Resmi TPQ</label>
                  <input type="email" id="kop-email" value="${inst.email}" oninput="updateKopLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <!-- 3. GAYA GARIS PEMBATAS KOP -->
              <div class="pt-2 border-t border-slate-100">
                <label class="font-bold text-slate-700 block mb-2">Gaya Garis Pembatas KOP Surat (Separator Border):</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${inst.kopBorderType === 'double-emerald' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900' : 'bg-white border-slate-200'}">
                    <input type="radio" name="kop-border" value="double-emerald" ${inst.kopBorderType === 'double-emerald' ? 'checked' : ''} onchange="updateKopLivePreview()">
                    <span>Dobel Hijau NU</span>
                  </label>
                  <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${inst.kopBorderType === 'double-black' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900' : 'bg-white border-slate-200'}">
                    <input type="radio" name="kop-border" value="double-black" ${inst.kopBorderType === 'double-black' ? 'checked' : ''} onchange="updateKopLivePreview()">
                    <span>Dobel Hitam Klasik</span>
                  </label>
                  <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${inst.kopBorderType === 'triple-gold' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900' : 'bg-white border-slate-200'}">
                    <input type="radio" name="kop-border" value="triple-gold" ${inst.kopBorderType === 'triple-gold' ? 'checked' : ''} onchange="updateKopLivePreview()">
                    <span>Hijau Emas Resmi</span>
                  </label>
                  <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${inst.kopBorderType === 'solid-green' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900' : 'bg-white border-slate-200'}">
                    <input type="radio" name="kop-border" value="solid-green" ${inst.kopBorderType === 'solid-green' ? 'checked' : ''} onchange="updateKopLivePreview()">
                    <span>Garis Tunggal Hijau</span>
                  </label>
                </div>
              </div>

              <div class="pt-4 flex items-center justify-end gap-3">
                <button type="submit" class="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>Simpan Perubahan KOP Surat</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        <!-- KOLOM KANAN: LIVE PREVIEW KOP SURAT REAL-TIME -->
        <div class="lg:col-span-5 sticky top-20">
          <div class="bg-white rounded-3xl border-2 border-emerald-600/30 p-5 shadow-lg">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-black tracking-wide text-emerald-900 uppercase">Live Preview KOP Surat</span>
              </div>
              <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Kertas A4</span>
            </div>

            <!-- PREVIEW KERTAS -->
            <div id="live-kop-container" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-inner text-[11px] leading-relaxed">
              ${renderKopSurat(inst)}

              <div class="mt-4 pt-3 space-y-2 text-slate-600 text-[10.5px]">
                <div class="flex justify-between font-mono text-[9.5px] text-slate-500">
                  <span>Nomor: 045/TPQ-MNU/X/2026</span>
                  <span>${inst.legalCity || inst.city || 'Sidoarjo'}, 15 Juli 2026</span>
                </div>
                <p><strong>Lamp :</strong> 1 (Satu) Berkas Lengkap Akreditasi</p>
                <p><strong>Hal  :</strong> Permohonan Asesmen & Visitasi TPQ</p>
                
                <div class="pt-2 text-slate-700 leading-snug">
                  <p class="font-semibold text-slate-900">Kepada Yth.<br>Tim Asesor Akreditasi TPQ Kemenag RI / LPPTQ<br>Di Tempat</p>
                  <p class="mt-2 text-justify">Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
                  <p class="text-justify mt-1">Dengan hormat, bersama ini kami sampaikan berkas kelengkapan administrasi dan bukti fisik akreditasi TPQ Muslimat NU AL-IKHLAS tahun ajaran 2026/2027.</p>
                </div>

                ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ", inst.headmaster)}
              </div>
            </div>

            <div class="mt-4 flex flex-col gap-2">
              <button onclick="printBlankoKop()" class="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm">
                <svg class="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Cetak Lembar KOP Kosong (Kertas A4)</span>
              </button>
              <p class="text-[10px] text-center text-slate-500">Live preview di atas ter-update secara instan saat Anda mengetik data pada form.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ==========================================
// 3.7 SUB-VIEW KEPALA TPQ & PIMPINAN
// ==========================================

function renderKepalaSubView(store) {
  const inst = store.institution;

  return `
    <div class="space-y-6">
      <!-- HEADER BANNER -->
      <div class="bg-gradient-to-r from-emerald-900 via-nu-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400 text-slate-950 font-bold text-xs mb-2">
            <span>🧕 IDENTITAS PIMPINAN & PEJABAT PENGESAH</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black tracking-tight text-white">
            Data Kepala TPQ & Tanda Tangan / Stempel
          </h2>
          <p class="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl leading-relaxed">
            Kelola profil Kepala TPQ, nomor induk (NIP/NIY/NPK), nomor kontak, serta tanda tangan digital dan stempel lembaga untuk pengesahan otomatis pada SK, Rapor, Piagam, dan dokumen akreditasi.
          </p>
        </div>
      </div>

      <!-- GRID FORM & PREVIEW TANDA TANGAN -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- FORM KIRI -->
        <div class="lg:col-span-7 space-y-6">

          <!-- CARD 1: DATA KEPALA TPQ -->
          <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
              <span>Biodata Kepala TPQ</span>
            </h3>

            <form onsubmit="saveKepalaForm(event)" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nama Lengkap Kepala TPQ & Gelar</label>
                  <input type="text" id="head-name" value="${inst.headmaster}" oninput="updateKepalaLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nomor Induk (NIY / NIP / NPK)</label>
                  <input type="text" id="head-nip" value="${inst.headmasterNip || ''}" oninput="updateKepalaLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Jabatan Resmi</label>
                  <input type="text" id="head-title" value="${inst.headmasterTitle || 'Kepala TPQ Muslimat NU AL-IKHLAS'}" oninput="updateKepalaLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Periode Masa Khidmah</label>
                  <input type="text" id="head-period" value="${inst.headmasterPeriod || '2024 - 2029'}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Pendidikan Terakhir</label>
                  <input type="text" id="head-education" value="${inst.headmasterEducation || 'S1 Pendidikan Agama Islam (PAI)'}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">No. WhatsApp / HP Kepala TPQ</label>
                  <input type="text" id="head-phone" value="${inst.headmasterPhone || inst.phone}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                </div>
              </div>

              <div>
                <label class="font-bold text-slate-700 block mb-1">Kepemilikan Syahadah Kelayakan Mengajar Al-Qur'an</label>
                <input type="text" id="head-syahadah" value="${inst.headmasterSyahadah || ''}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                <p class="text-[10px] text-slate-500 mt-1">Syahadah An-Nahdliyah / Yanbu'a / Qiraati membuktikan kompetensi pedagogik Al-Qur'an pada Asesor Akreditasi.</p>
              </div>

              <div>
                <label class="font-bold text-slate-700 block mb-1">Kota Tempat Pengesahan Dokumen (Kop & Tanda Tangan)</label>
                <input type="text" id="head-city" value="${inst.legalCity || inst.city}" oninput="updateKepalaLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                <p class="text-[10px] text-slate-500 mt-1">Contoh: "Sidoarjo" (akan muncul sebagai: "Sidoarjo, 15 Juli 2026").</p>
              </div>

              <!-- CARD 2: TANDA TANGAN & STEMPEL DIGITAL -->
              <div class="pt-4 border-t border-slate-100">
                <h4 class="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <span>✒️ Tanda Tangan Digital & Stempel Lembaga (Opsional)</span>
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- TANDA TANGAN -->
                  <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span class="text-xs font-bold text-slate-800 block mb-1">Tanda Tangan Digital Kepala TPQ</span>
                      <p class="text-[10px] text-slate-500 mb-2">Disarankan gambar PNG berlatar transparan.</p>
                      
                      <div class="h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 mb-2 overflow-hidden shadow-inner">
                        ${inst.signatureHeadmaster ? `<img src="${inst.signatureHeadmaster}" alt="Ttd" class="h-full object-contain">` : `<span class="italic text-slate-400 text-[10px]">[Belum Ada Tanda Tangan]</span>`}
                      </div>

                      <label class="block text-[11px] font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-2 rounded-xl text-center shadow-sm transition">
                        <span>📁 Upload Tanda Tangan</span>
                        <input type="file" accept="image/*" onchange="handleLogoUpload(event, 'signatureHeadmaster')" class="hidden">
                      </label>
                    </div>

                    ${inst.signatureHeadmaster ? `
                      <button type="button" onclick="clearSignature()" class="mt-2 text-[10px] text-red-600 hover:text-red-800 font-semibold text-center block w-full">Hapus Tanda Tangan</button>
                    ` : ''}
                  </div>

                  <!-- STEMPEL LEMBAGA -->
                  <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span class="text-xs font-bold text-slate-800 block mb-1">Cap / Stempel Resmi TPQ</span>
                      <p class="text-[10px] text-slate-500 mb-2">Disarankan gambar PNG stempel bulat/oval transparan.</p>
                      
                      <div class="h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 mb-2 overflow-hidden shadow-inner">
                        ${inst.stampImage ? `<img src="${inst.stampImage}" alt="Stempel" class="h-full object-contain">` : `<span class="italic text-slate-400 text-[10px]">[Belum Ada Stempel]</span>`}
                      </div>

                      <label class="block text-[11px] font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer bg-white border border-emerald-300 hover:border-emerald-500 px-3 py-2 rounded-xl text-center shadow-sm transition">
                        <span>📁 Upload Stempel</span>
                        <input type="file" accept="image/*" onchange="handleLogoUpload(event, 'stampImage')" class="hidden">
                      </label>
                    </div>

                    ${inst.stampImage ? `
                      <button type="button" onclick="clearStamp()" class="mt-2 text-[10px] text-red-600 hover:text-red-800 font-semibold text-center block w-full">Hapus Stempel</button>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- CARD 3: PEJABAT PENDAMPING -->
              <div class="pt-4 border-t border-slate-100">
                <h4 class="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <span>🏛️ Pejabat Pengesah Pendamping (Yayasan & Komite)</span>
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="font-bold text-slate-700 block mb-1">Nama Ketua Yayasan AL FATAH</label>
                    <input type="text" id="head-foundation" value="${inst.headFoundation}" oninput="updateKepalaLivePreview()" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                  </div>
                  <div>
                    <label class="font-bold text-slate-700 block mb-1">Nama Ketua Komite Wali Santri</label>
                    <input type="text" id="head-committee" value="${inst.committeeHead || 'H. Ridwan Santoso'}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label class="font-bold text-slate-700 block mb-1">Sekretaris TPQ</label>
                    <input type="text" id="head-secretary" value="${inst.secretary || 'Ustadzah Nurul Hidayati, S.Pd'}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                  </div>
                  <div>
                    <label class="font-bold text-slate-700 block mb-1">Bendahara TPQ</label>
                    <input type="text" id="head-treasurer" value="${inst.treasurer || 'Ustadzah Fatimatuz Zahro'}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                  </div>
                </div>
              </div>

              <div class="pt-4 flex items-center justify-end gap-3">
                <button type="submit" class="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>Simpan Data Kepala TPQ & Pimpinan</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        <!-- PREVIEW TANDA TANGAN (KANAN) -->
        <div class="lg:col-span-5 sticky top-20">
          <div class="bg-white rounded-3xl border-2 border-emerald-600/30 p-5 shadow-lg">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs font-black tracking-wide text-emerald-900 uppercase">Preview Kolom Pengesahan</span>
              </div>
              <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Resmi Akreditasi</span>
            </div>

            <!-- PREVIEW BLOK TANDA TANGAN -->
            <div id="live-kepala-preview-container" class="bg-white border border-slate-200 rounded-2xl p-6 shadow-inner text-[11px]">
              <div class="border-b pb-3 mb-4 text-center">
                <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Simulasi Lembar Pengesahan</span>
                <h4 class="font-bold text-xs text-slate-900 mt-1">Ditetapkan & Disahkan di ${inst.legalCity || inst.city || 'Sidoarjo'}</h4>
              </div>

              ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, inst.headmasterTitle || "Kepala TPQ", inst.headmaster)}

              <div class="mt-6 pt-4 border-t border-dashed border-slate-200 bg-slate-50 p-3 rounded-xl text-[10px] text-slate-600 space-y-1">
                <p><strong>Kepala TPQ Terdaftar:</strong> ${inst.headmaster}</p>
                <p><strong>Nomor Induk:</strong> ${inst.headmasterNip || '-'}</p>
                <p><strong>Syahadah Kelayakan:</strong> ${inst.headmasterSyahadah || '-'}</p>
                <p><strong>Status Pengesahan:</strong> <span class="text-emerald-700 font-bold">Valid & Terverifikasi Asesor</span></p>
              </div>
            </div>

            <p class="text-[10px] text-center text-slate-500 mt-4 leading-relaxed">
              Format di atas secara otomatis diterapkan pada seluruh Blangko SK, Notulensi, Kalender Pembelajaran, Buku Induk Santri, dan Lembar Rapor.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Helper Canvas Resizer untuk optimasi Base64 Gambar Logo
function optimizeImageToDataUrl(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg';
      const dataUrl = canvas.toDataURL(isJpeg ? 'image/jpeg' : 'image/png', 0.9);
      callback(dataUrl);
    };
    img.onerror = function() {
      callback(e.target.result);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Helper Upload & Preset Handler
function handleLogoUpload(event, targetProp) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file gambar terlalu besar! Maksimal 5MB.");
    return;
  }

  optimizeImageToDataUrl(file, 400, 400, function(dataUrl) {
    const store = getAppStore();
    store.institution[targetProp] = dataUrl;
    if (targetProp === 'logoLeft') store.institution.logoLeftType = 'custom';
    if (targetProp === 'logoRight') store.institution.logoRightType = 'custom';
    store.institution.updatedAt = new Date().toISOString();
    saveAppStore(store);
    syncToSqlBackend('/api/institution', 'POST', store.institution);
    showToast("Gambar berhasil diunggah & disimpan permanen ke database!");
    renderDataInputView();
  });
}

function clearCustomLogo(targetProp) {
  const store = getAppStore();
  store.institution[targetProp] = "";
  if (targetProp === 'logoLeft') store.institution.logoLeftType = 'preset';
  if (targetProp === 'logoRight') store.institution.logoRightType = 'preset';
  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Logo dikembalikan ke simbol preset default.");
  renderDataInputView();
}

function setLogoPreset(targetProp, preset) {
  const store = getAppStore();
  store.institution[targetProp] = "";
  store.institution[targetProp + "Preset"] = preset;
  if (targetProp === 'logoLeft') store.institution.logoLeftType = 'preset';
  if (targetProp === 'logoRight') store.institution.logoRightType = 'preset';
  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  renderDataInputView();
}

function clearSignature() {
  const store = getAppStore();
  store.institution.signatureHeadmaster = "";
  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Tanda tangan digital dihapus.");
  renderDataInputView();
}

function clearStamp() {
  const store = getAppStore();
  store.institution.stampImage = "";
  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Cap stempel dihapus.");
  renderDataInputView();
}

function setKopLogoLayout(layout) {
  const store = getAppStore();
  store.institution.kopLogoLayout = layout;
  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  renderDataInputView();
  showToast("Mode logo KOP diatur: " + (layout === 'both' ? 'Dua Logo (Kiri & Kanan)' : layout === 'left' ? 'Hanya Logo Kiri (Kanan Kosong)' : layout === 'right' ? 'Hanya Logo Kanan (Kiri Kosong)' : 'Tanpa Logo (Teks Saja)'));
}

function saveKopForm(e) {
  e.preventDefault();
  const store = getAppStore();

  const layoutRadios = document.getElementsByName("kop-logo-layout");
  for (let r of layoutRadios) {
    if (r.checked) {
      store.institution.kopLogoLayout = r.value;
      break;
    }
  }

  store.institution.foundation = document.getElementById("kop-foundation").value.trim();
  store.institution.name = document.getElementById("kop-name").value.trim();
  store.institution.affiliation = document.getElementById("kop-affiliation").value.trim();
  store.institution.method = document.getElementById("kop-method").value.trim();
  store.institution.nsq = document.getElementById("kop-nsq").value.trim();
  store.institution.ijop = document.getElementById("kop-ijop").value.trim();
  store.institution.notary = document.getElementById("kop-notary").value.trim();
  store.institution.address = document.getElementById("kop-address").value.trim();
  store.institution.village = document.getElementById("kop-village").value.trim();
  store.institution.subdistrict = document.getElementById("kop-subdistrict").value.trim();
  store.institution.city = document.getElementById("kop-city").value.trim();
  store.institution.postCode = document.getElementById("kop-postcode").value.trim();
  store.institution.phone = document.getElementById("kop-phone").value.trim();
  store.institution.email = document.getElementById("kop-email").value.trim();

  const borderRadios = document.getElementsByName("kop-border");
  for (let r of borderRadios) {
    if (r.checked) {
      store.institution.kopBorderType = r.value;
      break;
    }
  }

  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Pengaturan KOP Surat berhasil disimpan permanen ke database!");
  renderDataInputView();
}

function saveKepalaForm(e) {
  e.preventDefault();
  const store = getAppStore();

  store.institution.headmaster = document.getElementById("head-name").value.trim();
  store.institution.headmasterNip = document.getElementById("head-nip").value.trim();
  store.institution.headmasterTitle = document.getElementById("head-title").value.trim();
  store.institution.headmasterPeriod = document.getElementById("head-period").value.trim();
  store.institution.headmasterEducation = document.getElementById("head-education").value.trim();
  store.institution.headmasterPhone = document.getElementById("head-phone").value.trim();
  store.institution.headmasterSyahadah = document.getElementById("head-syahadah").value.trim();
  store.institution.legalCity = document.getElementById("head-city").value.trim();

  store.institution.headFoundation = document.getElementById("head-foundation").value.trim();
  store.institution.committeeHead = document.getElementById("head-committee").value.trim();
  store.institution.secretary = document.getElementById("head-secretary").value.trim();
  store.institution.treasurer = document.getElementById("head-treasurer").value.trim();

  store.institution.updatedAt = new Date().toISOString();
  saveAppStore(store);
  syncToSqlBackend('/api/institution', 'POST', store.institution);
  showToast("Data Kepala TPQ & Pimpinan berhasil diperbarui ke database!");
  renderDataInputView();
}

function updateKopLivePreview() {
  const store = getAppStore();
  const inst = Object.assign({}, store.institution);

  const layoutRadios = document.getElementsByName("kop-logo-layout");
  for (let r of layoutRadios) {
    if (r.checked) {
      inst.kopLogoLayout = r.value;
      break;
    }
  }

  // Update badge summary
  const summaryEl = document.getElementById("badge-layout-summary");
  if (summaryEl) {
    summaryEl.textContent = inst.kopLogoLayout === 'both' ? '🟢 Dua Logo (Kiri & Kanan)' : inst.kopLogoLayout === 'left' ? '🏛️ Hanya Logo Kiri (Kanan Kosong)' : inst.kopLogoLayout === 'right' ? '🟢 Hanya Logo Kanan (Kiri Kosong)' : '📄 Tanpa Logo';
  }

  // Update layout cards styling
  ["both", "left", "right", "none"].forEach(opt => {
    const cardEl = document.getElementById("layout-card-" + opt);
    if (cardEl) {
      if (inst.kopLogoLayout === opt) {
        cardEl.className = "relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20";
      } else {
        cardEl.className = "relative flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition border-slate-200 hover:border-slate-300 bg-slate-50/50";
      }
    }
  });

  // Update status badge on left & right cards
  const leftStatusEl = document.getElementById("badge-status-logo-left");
  const rightStatusEl = document.getElementById("badge-status-logo-right");
  const leftCardEl = document.getElementById("card-upload-logo-left");
  const rightCardEl = document.getElementById("card-upload-logo-right");

  if (leftStatusEl && rightStatusEl) {
    if (inst.kopLogoLayout === "left") {
      leftStatusEl.innerHTML = '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>';
      rightStatusEl.innerHTML = '<span class="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Kosong / Dinonaktifkan</span>';
      if (leftCardEl) leftCardEl.style.opacity = "1";
      if (rightCardEl) rightCardEl.style.opacity = "0.65";
    } else if (inst.kopLogoLayout === "right") {
      leftStatusEl.innerHTML = '<span class="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Kosong / Dinonaktifkan</span>';
      rightStatusEl.innerHTML = '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>';
      if (leftCardEl) leftCardEl.style.opacity = "0.65";
      if (rightCardEl) rightCardEl.style.opacity = "1";
    } else if (inst.kopLogoLayout === "none") {
      leftStatusEl.innerHTML = '<span class="text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">Tanpa Logo</span>';
      rightStatusEl.innerHTML = '<span class="text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">Tanpa Logo</span>';
      if (leftCardEl) leftCardEl.style.opacity = "0.5";
      if (rightCardEl) rightCardEl.style.opacity = "0.5";
    } else {
      leftStatusEl.innerHTML = '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>';
      rightStatusEl.innerHTML = '<span class="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Aktif Ditampilkan</span>';
      if (leftCardEl) leftCardEl.style.opacity = "1";
      if (rightCardEl) rightCardEl.style.opacity = "1";
    }
  }

  const fFound = document.getElementById("kop-foundation");
  if (fFound) inst.foundation = fFound.value;
  const fName = document.getElementById("kop-name");
  if (fName) inst.name = fName.value;
  const fAff = document.getElementById("kop-affiliation");
  if (fAff) inst.affiliation = fAff.value;
  const fMeth = document.getElementById("kop-method");
  if (fMeth) inst.method = fMeth.value;
  const fNsq = document.getElementById("kop-nsq");
  if (fNsq) inst.nsq = fNsq.value;
  const fIjop = document.getElementById("kop-ijop");
  if (fIjop) inst.ijop = fIjop.value;
  const fNotary = document.getElementById("kop-notary");
  if (fNotary) inst.notary = fNotary.value;
  const fAddr = document.getElementById("kop-address");
  if (fAddr) inst.address = fAddr.value;
  const fVill = document.getElementById("kop-village");
  if (fVill) inst.village = fVill.value;
  const fSub = document.getElementById("kop-subdistrict");
  if (fSub) inst.subdistrict = fSub.value;
  const fCity = document.getElementById("kop-city");
  if (fCity) inst.city = fCity.value;
  const fPost = document.getElementById("kop-postcode");
  if (fPost) inst.postCode = fPost.value;
  const fPhone = document.getElementById("kop-phone");
  if (fPhone) inst.phone = fPhone.value;
  const fEmail = document.getElementById("kop-email");
  if (fEmail) inst.email = fEmail.value;

  const borderRadios = document.getElementsByName("kop-border");
  for (let r of borderRadios) {
    if (r.checked) {
      inst.kopBorderType = r.value;
      break;
    }
  }

  const liveKopBox = document.getElementById("live-kop-container");
  if (liveKopBox) {
    liveKopBox.innerHTML = `
      ${renderKopSurat(inst)}

      <div class="mt-4 pt-3 space-y-2 text-slate-600 text-[10.5px]">
        <div class="flex justify-between font-mono text-[9.5px] text-slate-500">
          <span>Nomor: 045/TPQ-MNU/X/2026</span>
          <span>${inst.legalCity || inst.city || 'Sidoarjo'}, 15 Juli 2026</span>
        </div>
        <p><strong>Lamp :</strong> 1 (Satu) Berkas Lengkap Akreditasi</p>
        <p><strong>Hal  :</strong> Permohonan Asesmen & Visitasi TPQ</p>
        
        <div class="pt-2 text-slate-700 leading-snug">
          <p class="font-semibold text-slate-900">Kepada Yth.<br>Tim Asesor Akreditasi TPQ Kemenag RI / LPPTQ<br>Di Tempat</p>
          <p class="mt-2 text-justify">Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
          <p class="text-justify mt-1">Dengan hormat, bersama ini kami sampaikan berkas kelengkapan administrasi dan bukti fisik akreditasi TPQ Muslimat NU AL-IKHLAS tahun ajaran 2026/2027.</p>
        </div>

        ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, "Kepala TPQ", inst.headmaster)}
      </div>
    `;
  }
}

function updateKepalaLivePreview() {
  const store = getAppStore();
  const inst = Object.assign({}, store.institution);

  const fHead = document.getElementById("head-name");
  if (fHead) inst.headmaster = fHead.value;
  const fNip = document.getElementById("head-nip");
  if (fNip) inst.headmasterNip = fNip.value;
  const fTitle = document.getElementById("head-title");
  if (fTitle) inst.headmasterTitle = fTitle.value;
  const fCity = document.getElementById("head-city");
  if (fCity) inst.legalCity = fCity.value;
  const fFound = document.getElementById("head-foundation");
  if (fFound) inst.headFoundation = fFound.value;

  const container = document.getElementById("live-kepala-preview-container");
  if (container) {
    container.innerHTML = `
      <div class="border-b pb-3 mb-4 text-center">
        <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Simulasi Lembar Pengesahan</span>
        <h4 class="font-bold text-xs text-slate-900 mt-1">Ditetapkan & Disahkan di ${inst.legalCity || inst.city || 'Sidoarjo'}</h4>
      </div>

      ${renderTandaTangan(inst, "Ketua Yayasan AL FATAH", inst.headFoundation, inst.headmasterTitle || "Kepala TPQ", inst.headmaster)}

      <div class="mt-6 pt-4 border-t border-dashed border-slate-200 bg-slate-50 p-3 rounded-xl text-[10px] text-slate-600 space-y-1">
        <p><strong>Kepala TPQ Terdaftar:</strong> ${inst.headmaster}</p>
        <p><strong>Nomor Induk:</strong> ${inst.headmasterNip || '-'}</p>
        <p><strong>Syahadah Kelayakan:</strong> ${inst.headmasterSyahadah || '-'}</p>
        <p><strong>Status Pengesahan:</strong> <span class="text-emerald-700 font-bold">Valid & Terverifikasi Asesor</span></p>
      </div>
    `;
  }
}

function printBlankoKop() {
  const store = getAppStore();
  const inst = store.institution;
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Pop-up diblokir browser! Izinkan pop-up untuk mencetak lembar KOP.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>BLANKO KOP SURAT RESMI - ${inst.name}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Times New Roman', Times, serif; margin: 0; padding: 0; color: #000; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .kop-sheet { width: 210mm; min-height: 297mm; margin: 0 auto; box-sizing: border-box; }
        .kop-surat { padding-bottom: 12px; margin-bottom: 25px; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
        .border-double-emerald { border-bottom: 4px double #0e6938; }
        .border-double-black { border-bottom: 4px double #000; }
        .border-triple-gold { border-bottom: 4px solid #0e6938; box-shadow: 0 2px 0 0 #f59e0b; }
        .border-solid-green { border-bottom: 3px solid #0e6938; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; font-size: 60pt; font-weight: 900; pointer-events: none; text-align: center; color: #0e6938; text-transform: uppercase; z-index: -1; width: 100%; }
        @media print {
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #0e6938; color: white; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
        <span style="font-weight: bold; font-size: 11pt;">Blanko Lembar KOP Surat Resmi (A4) - ${inst.name}</span>
        <button onclick="window.print()" style="background: #fbbf24; color: black; font-weight: bold; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;">🖨️ CETAK BLANKO SEKARANG (Ctrl + P)</button>
      </div>

      <div class="kop-sheet" style="padding: 15mm;">
        ${renderKopSurat(inst)}
        
        <div class="watermark">
          ${inst.name}
        </div>

        <!-- Ruang Kosong Penulisan Surat Resmi -->
        <div style="min-height: 200mm;"></div>
      </div>

      <script>
        setTimeout(function() {
          window.print();
        }, 500);
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function resetDatabaseToDefault() {
  if (confirm("Reset seluruh data (Santri, Ustadzah, Inventaris, Kas, dan Profil) ke data contoh bawaan?")) {
    resetAppStoreToDefault();
    renderDataInputView();
    showToast("Database berhasil di-reset ke data bawaan.");
  }
}

function closeFormModal() {
  const modal = document.getElementById("form-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// ==========================================
// 4. STANDAR NASIONAL (SNP) VIEW
// ==========================================

function renderStandards() {
  const container = document.getElementById("standards-container");
  if (!container) return;

  let html = `
    <div class="mb-6 bg-emerald-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-sm">
      <div class="relative z-10 max-w-2xl">
        <span class="text-emerald-300 font-mono text-xs font-bold tracking-wider uppercase mb-1 block">Struktur Akreditasi Lembaga</span>
        <h2 class="text-xl font-bold mb-2">Pemetaan 8 Standar Nasional Pendidikan (SNP) Al-Qur'an</h2>
        <p class="text-xs text-emerald-100 leading-relaxed">
          Seluruh berkas persiapan TPQ Muslimat NU AL-IKHLAS diselaraskan secara akurat dengan 8 Standar Penyelenggaraan Pendidikan Al-Qur'an Kementerian Agama RI dan Badan Akreditasi Lembaga Pendidikan Al-Qur'an.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  `;

  AKREDITASI_DATA.standards8SNP.forEach(std => {
    const relatedDocs = AKREDITASI_DATA.items.filter(i => std.docs.includes(i.id));
    const readyCount = relatedDocs.filter(i => state.itemsStatus[i.id] === "ready").length;
    const progress = Math.round((readyCount / relatedDocs.length) * 100) || 0;

    html += `
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">${std.code}</span>
            <h3 class="text-sm font-bold text-slate-900 mt-1">${std.name}</h3>
          </div>
          <span class="text-xs font-bold ${progress === 100 ? 'text-emerald-600' : 'text-slate-600'}">${readyCount}/${relatedDocs.length} Siap (${progress}%)</span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
          <div class="bg-emerald-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
        </div>

        <div class="space-y-1.5">
          ${relatedDocs.map(d => {
            const st = state.itemsStatus[d.id] || "process";
            const dotColor = st === 'ready' ? 'bg-emerald-500' : (st === 'process' ? 'bg-amber-500' : 'bg-red-500');
            return `
              <div onclick="openDocModal('${d.id}')" class="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <div class="flex items-center gap-2 overflow-hidden">
                  <span class="w-2 h-2 rounded-full ${dotColor} shrink-0"></span>
                  <span class="font-mono text-[11px] text-slate-500 shrink-0">${d.code}</span>
                  <span class="text-slate-800 font-medium truncate">${d.title}</span>
                </div>
                <span class="text-[10px] uppercase font-bold text-slate-400 shrink-0 ml-2">${st}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// ==========================================
// 5. SIMULASI ASESMEN & EVALUASI DIRI (EDL)
// ==========================================

function renderAssessmentView() {
  const container = document.getElementById("assessment-container");
  if (!container) return;

  const stats = calculateStats();

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-600/40 inline-block mb-3">Simulasi Asesmen Mandiri</span>
          <h2 class="text-2xl font-bold leading-tight mb-1">Skor Akreditasi Prediksi</h2>
          <p class="text-xs text-emerald-200 mb-6">Kalkulasi pembobotan nilai berkas dan kelayakan visitasi TPQ Muslimat NU AL-IKHLAS.</p>
          
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-6xl font-black tracking-tight">${stats.scoreScore}</span>
            <span class="text-xl text-emerald-300 font-medium">/ 100</span>
          </div>
          <div class="inline-block px-3 py-1 rounded-xl text-sm font-bold bg-emerald-500/20 border border-emerald-400/30 text-white mb-4">
            Predikat: ${stats.gradeText}
          </div>
        </div>

        <div class="pt-4 border-t border-emerald-700/60 text-xs text-emerald-200">
          <p>Target Lembaga: <strong>A (Unggul / ≥ 86 Poin)</strong></p>
          <p class="mt-1">Status Target: <strong>${stats.scoreScore >= 86 ? 'Target Terpenuhi! 🎉' : `${86 - stats.scoreScore} Poin lagi menuju A`}</strong></p>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-slate-800 mb-2">Matriks Kriteria Predikat Akreditasi Kemenag / LPPTQ</h3>
          <p class="text-xs text-slate-500 mb-4">Standar rentang nilai resmi kelulusan akreditasi Taman Pendidikan Al-Qur'an (TPQ):</p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div class="p-3 rounded-2xl border ${stats.grade === 'A' ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500' : 'bg-slate-50 border-slate-200'} text-center">
              <span class="text-xs font-bold text-emerald-800 block">Peringkat A</span>
              <span class="text-lg font-black text-slate-900 block my-0.5">86 - 100</span>
              <span class="text-[10px] text-slate-500 font-medium">Unggul / Sangat Baik</span>
            </div>
            <div class="p-3 rounded-2xl border ${stats.grade === 'B' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'bg-slate-50 border-slate-200'} text-center">
              <span class="text-xs font-bold text-blue-800 block">Peringkat B</span>
              <span class="text-lg font-black text-slate-900 block my-0.5">71 - 85</span>
              <span class="text-[10px] text-slate-500 font-medium">Baik</span>
            </div>
            <div class="p-3 rounded-2xl border ${stats.grade === 'C' ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500' : 'bg-slate-50 border-slate-200'} text-center">
              <span class="text-xs font-bold text-amber-800 block">Peringkat C</span>
              <span class="text-lg font-black text-slate-900 block my-0.5">56 - 70</span>
              <span class="text-[10px] text-slate-500 font-medium">Cukup</span>
            </div>
            <div class="p-3 rounded-2xl border ${stats.grade === 'D' ? 'bg-red-50 border-red-500 ring-2 ring-red-500' : 'bg-slate-50 border-slate-200'} text-center">
              <span class="text-xs font-bold text-red-800 block">Tidak Terakreditasi</span>
              <span class="text-lg font-black text-slate-900 block my-0.5">&lt; 56</span>
              <span class="text-[10px] text-slate-500 font-medium">Perlu Pembinaan</span>
            </div>
          </div>

          <div class="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900">
            <h4 class="font-bold mb-1 flex items-center gap-1.5">Syarat Mutlak Penentu Akreditasi:</h4>
            <p class="leading-relaxed">
              Meskipun skor total tinggi, lembaga <strong>wajib</strong> memiliki: (1) SK Izin Operasional Kemenag aktif, (2) Syahadah kelayakan guru metode Al-Qur'an minimal 70%, (3) Buku Induk Santri berformat lengkap, dan (4) Bukti status hak guna bangunan/tanah wakaf yang sah.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 6. PANDUAN ODNER BOX FILE
// ==========================================

function renderOdnerBoxes() {
  const container = document.getElementById("odner-container");
  if (!container) return;

  const odnerFiles = {
    "BOX-01": { file: "dokumen_cetak_fisik/01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html", btnText: "🖨️ Cetak Berkas Box 1 (Legalitas)" },
    "BOX-02": { file: "dokumen_cetak_fisik/02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html", btnText: "🖨️ Cetak Berkas Box 2 (Kurikulum)" },
    "BOX-03": { file: "dokumen_cetak_fisik/03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html", btnText: "🖨️ Cetak Berkas Box 3 (Buku Induk EMIS)" },
    "BOX-04": { file: "dokumen_cetak_fisik/04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html", btnText: "🖨️ Cetak Berkas Box 4 (Guru & Syahadah)" },
    "BOX-05": { file: "dokumen_cetak_fisik/05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html", btnText: "🖨️ Cetak Berkas Box 5 (Sarpras & Kas)" },
    "BOX-06": { file: "dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html", btnText: "🖨️ Cetak Berkas Box 6 (Tatib & Proker)" },
    "BOX 1": { file: "dokumen_cetak_fisik/01_ODNER_1_LEGALITAS_DAN_KELEMBAGAAN.html", btnText: "🖨️ Cetak Berkas Box 1 (Legalitas)" },
    "BOX 2": { file: "dokumen_cetak_fisik/02_ODNER_2_KURIKULUM_DAN_PEMBELAJARAN.html", btnText: "🖨️ Cetak Berkas Box 2 (Kurikulum)" },
    "BOX 3": { file: "dokumen_cetak_fisik/03_ODNER_3_KESISWAAN_DAN_BUKU_INDUK_SANTRI.html", btnText: "🖨️ Cetak Berkas Box 3 (Buku Induk EMIS)" },
    "BOX 4": { file: "dokumen_cetak_fisik/04_ODNER_4_GURU_USTADZAH_DAN_SYAHADAH.html", btnText: "🖨️ Cetak Berkas Box 4 (Guru & Syahadah)" },
    "BOX 5": { file: "dokumen_cetak_fisik/05_ODNER_5_SARPRAS_KAS_ASWAJA_DAN_KOMITE.html", btnText: "🖨️ Cetak Berkas Box 5 (Sarpras & Kas)" },
    "BOX 6": { file: "dokumen_cetak_fisik/06_ODNER_TATA_TERTIB_DAN_PROGRAM_KERJA_TAHUNAN.html", btnText: "🖨️ Cetak Berkas Box 6 (Tatib & Proker)" }
  };

  let html = `
    <!-- BANNER PUSAT DOKUMEN CETAK FISIK -->
    <div class="mb-6 bg-gradient-to-r from-emerald-900 via-nu-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 relative overflow-hidden">
      <div class="relative z-10 max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400 text-slate-950 font-bold text-xs mb-3 shadow-sm">
          <span>🖨️ BUKTI FISIK VISITASI SIAP CETAK</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
          Pusat Berkas Fisik & Map Odner Bantex Akreditasi
        </h2>
        <p class="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
          Seluruh instrumen bukti fisik telah dikompilasi ke dalam format cetak standar kertas A4 lengkap dengan KOP resmi TPQ Muslimat NU AL-IKHLAS, nomor SK legalitas, tabel data induk riil, kolom tanda tangan pimpinan, dan stempel lembaga.
        </p>

        <div class="flex flex-wrap gap-3">
          <a href="dokumen_cetak_fisik/PAKET_LENGKAP_SEMUA_DOKUMEN_AKREDITASI_SIAP_CETAK.html" target="_blank" class="px-5 py-3 rounded-2xl bg-gold-400 text-slate-950 font-black text-xs hover:bg-gold-300 transition shadow-lg flex items-center gap-2 transform active:scale-95">
            <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            <span>CETAK SEMUA DOKUMEN (1 KLIK MASTER BUNDLE)</span>
          </a>

          <a href="dokumen_cetak_fisik/00_COVER_DAN_LABEL_PUNGGUNG_ODNER_1_SD_6.html" target="_blank" class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
            <span>Cover Depan & Label Punggung (7.5 cm) Box 1 - 6</span>
          </a>
        </div>
      </div>
      <div class="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-9xl font-black">
        🗂️
      </div>
    </div>

    <!-- PETUNJUK RINGKAS PENYUSUNAN VISITASI -->
    <div class="mb-6 bg-amber-50 rounded-2xl border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <div>
        <strong class="font-bold block mb-1">Panduan Asesor & Standar Box Odner Kemenag:</strong>
        <p class="leading-relaxed">
          Gunakan 6 buah Map Odner Bantex (tebal 7.5 cm) dengan warna pembatas sesuai standar. Cetak berkas di bawah ini menggunakan kertas A4 70/80 gsm. Masukkan lembar daftar isi di halaman pertama setiap box, diikuti oleh dokumen bukti fisik asli/legalisir. Khusus Box 3 (Buku Induk Santri), cetak dengan orientasi Landscape.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  `;

  AKREDITASI_DATA.odnerBoxes.forEach(box => {
    const fileInfo = odnerFiles[box.boxNumber] || { file: "#", btnText: "🖨️ Cetak Berkas Box Ini" };

    html += `
      <div class="bg-white rounded-3xl border-2 ${box.colorBorder} p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-white text-xs font-black px-3 py-1 rounded-xl ${box.colorTag} shadow-sm">${box.boxNumber}</span>
            <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">${box.badgeText}</span>
          </div>

          <h3 class="text-base font-black text-slate-900 mb-3">${box.title}</h3>

          <ul class="space-y-2 mb-5">
            ${box.contents.map(item => `
              <li class="flex items-start gap-2 text-xs text-slate-700">
                <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-col gap-2">
          <a href="${fileInfo.file}" target="_blank" class="w-full text-center py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm">
            <span>${fileInfo.btnText}</span>
            <svg class="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
          <span class="text-[10px] text-center text-slate-500">Kertas A4 • Berkop Resmi & Siap Print</span>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <!-- PROTOKOL PENATAAN MEJA ASESOR -->
    <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <h3 class="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-nu-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        Protokol Penataan Ruang Visitasi & Meja Tim Asesor
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <strong class="text-slate-900 block mb-1 font-bold">1. Urutan Box di Meja Asesor</strong>
          <p>Tata keenam Map Odner sejajar berurutan dari kiri ke kanan (Box 1 s/d Box 6). Pasang label punggung agar judul menghadap asesor.</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <strong class="text-slate-900 block mb-1 font-bold">2. Penyiapan Sampel Bukti Nyata</strong>
          <p>Letakkan sampel asli di samping map: Piagam IJOP Asli, Buku Jilid santri (An-Nahdliyah/Yanbu'a), Juz 'Amma, Al-Qur'an, dan contoh Rapor fisik.</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <strong class="text-slate-900 block mb-1 font-bold">3. Tim Pendamping Lembaga</strong>
          <p>Siapkan Kepala TPQ, Ustadzah perwakilan jilid, dan Bendahara di ruang visitasi untuk menjawab pertanyaan verifikasi asesor secara tanggap.</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================
// 7. BACKUP, IMPORT, EXPORT
// ==========================================

function exportDataJSON() {
  const exportPayload = {
    institution: getAppStore().institution,
    database: getAppStore(),
    state: {
      itemsStatus: state.itemsStatus,
      itemsNotes: state.itemsNotes
    },
    timestamp: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `Cadangan_Akreditasi_TPQ_Muslimat_NU_AL_IKHLAS_${new Date().toISOString().slice(0,10)}.json`);
  dlAnchorElem.click();
  showToast("File cadangan JSON berhasil diunduh!");
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.state && parsed.state.itemsStatus) {
        state.itemsStatus = parsed.state.itemsStatus;
        state.itemsNotes = parsed.state.itemsNotes || {};
        saveState();
      }
      if (parsed.database) {
        saveAppStore(parsed.database);
      }
      renderChecklist();
      showToast("Data akreditasi dan database berhasil dipulihkan!");
    } catch (err) {
      alert("Gagal membaca file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function exportDataCSV() {
  let csv = "No,Kode,Kategori,Judul Dokumen,Bentuk Fisik,Kepentingan,Status,Catatan\n";
  AKREDITASI_DATA.items.forEach((item, index) => {
    const cat = AKREDITASI_DATA.categories.find(c => c.id === item.categoryId);
    const st = state.itemsStatus[item.id] || "process";
    const note = (state.itemsNotes[item.id] || "").replace(/,/g, ";").replace(/\n/g, " ");
    csv += `"${index + 1}","${item.code}","${cat ? cat.name : ''}","${item.title.replace(/"/g, '""')}","${item.physicalFormat}","${item.importance}","${st}","${note}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rekap_Dokumen_Akreditasi_TPQ_AL_IKHLAS_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  showToast("File rekap CSV berhasil diunduh!");
}

function resetAllData() {
  if (confirm("Reset seluruh status dokumen ke setelan awal?")) {
    localStorage.removeItem(STORAGE_KEY);
    initState();
    renderChecklist();
    showToast("Status dokumen berhasil direset!");
  }
}

function showToast(message) {
  const toast = document.getElementById("notification-toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
  }, 3000);
}

// DOM Ready initialization
document.addEventListener("DOMContentLoaded", async () => {
  window.state = state;
  initState();
  renderCategoryPills();
  renderChecklist();

  // Muat dan sinkronkan data dari basis data SQL (SQLite)
  if (typeof loadStoreFromSqlBackend === "function") {
    await loadStoreFromSqlBackend();
    updateStats();
    renderChecklist();
  }
  if (typeof checkSqlDatabaseStatus === "function") {
    checkSqlDatabaseStatus();
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderChecklist();
    });
  }
});

