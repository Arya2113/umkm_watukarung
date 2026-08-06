import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CSV yang mungkin punya multi-line fields (dalam quotes)
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        if (char === '\r') i++; // skip \n after \r
        currentRow.push(currentField.trim());
        currentField = '';
        rows.push(currentRow);
        currentRow = [];
      } else {
        currentField += char;
      }
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }
  return rows;
}

// Bersihkan string
function clean(val) {
  if (!val || val === '-' || val === 'Belum Dicek' || val === 'Tidak' || val === 'FALSE') return '';
  return val.replace(/\r/g, '').trim();
}

// Normalisasi nomor WA
function normalizePhone(val) {
  if (!val) return '';
  val = val.trim();
  const firstNum = val.split(/\s+/)[0];
  let num = firstNum.replace(/wa\.me\//gi, '').replace(/[^0-9+]/g, '');
  if (num.startsWith('+62')) num = num.substring(1);
  if (num.startsWith('08')) num = '62' + num.substring(1);
  if (num.startsWith('0')) num = '62' + num.substring(1);
  return num;
}

// Parse fasilitas dari string multi-line atau comma-separated
function parseFasilitas(val) {
  if (!val) return [];
  return val.split(/[\n,]+/)
    .map(f => f.trim())
    .filter(f => f && f.length > 1 && f !== '-');
}

// ===== PARSE AKOMODASI =====
function parseAkomodasi() {
  const raw = fs.readFileSync(path.join(__dirname, 'JELAJAH Watukarung.xlsx - Akomodasi.csv'), 'utf-8');
  const rows = parseCSV(raw);
  const results = [];

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 3) continue;
    const nama = clean(r[1]);
    if (!nama) continue;

    const item = {
      nama: nama,
      kategori: clean(r[2]) || '',
      pengelola: clean(r[3]) || '',
      alamat: clean(r[5]) || '',
      pantaiTerdekat: clean(r[6]) || '',
      kontak: normalizePhone(r[7]),
      hargaWeekday: clean(r[8]) || '',
      hargaWeekend: clean(r[9]) || '',
      hargaHighSeason: clean(r[10]) || '',
      kapasitasTamu: clean(r[12]) || '',
      fasilitas: parseFasilitas(r[13]),
      jamCheckin: clean(r[14]) || '',
      jamCheckout: clean(r[15]) || '',
      mediaSosial: clean(r[16]) || '',
      linkGmaps: clean(r[18]) || '',
      website: clean(r[19]) || '',
      linkFoto: clean(r[20]) || '',
    };

    results.push(item);
  }
  return results;
}

// ===== PARSE DESTINASI =====
function parseDestinasi() {
  const raw = fs.readFileSync(path.join(__dirname, 'JELAJAH Watukarung.xlsx - Destinasi Wisata.csv'), 'utf-8');
  const rows = parseCSV(raw);
  const results = [];

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 3) continue;
    const nama = clean(r[1]);
    if (!nama) continue;

    const item = {
      nama: nama,
      kategori: clean(r[2]) || '',
      pengelola: clean(r[3]) || '',
      alamat: clean(r[4]) || '',
      dusun: clean(r[5]) || '',
      kontak: normalizePhone(r[6]),
      htm: clean(r[7]) || '',
      dayaTarik: clean(r[8]) || '',
      jamOperasional: clean(r[9]) || '',
      mediaSosial: clean(r[10]) || '',
      qris: clean(r[11]) || '',
      linkGmaps: clean(r[12]) || '',
      instagram: clean(r[13]) || '',
      linkFoto: clean(r[14]) || '',
    };

    results.push(item);
  }
  return results;
}

// ===== PARSE JASA =====
function parseJasa() {
  const raw = fs.readFileSync(path.join(__dirname, 'JELAJAH Watukarung.xlsx - Jasa Wisata & Aktivitas.csv'), 'utf-8');
  const rows = parseCSV(raw);
  const results = [];

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 3) continue;
    const nama = clean(r[1]);
    if (!nama) continue;

    const item = {
      nama: nama,
      jenisLayanan: clean(r[2]) || '',
      tarif: clean(r[3]) || '',
      bahasaGuide: clean(r[4]) || '',
      sertifikasi: clean(r[5]) || '',
      kontak: normalizePhone(r[6]),
      alamat: clean(r[7]) || '',
      pantaiTerdekat: clean(r[8]) || '',
      instagram: clean(r[9]) || '',
      linkGmaps: clean(r[10]) || '',
    };

    results.push(item);
  }
  return results;
}

// ===== PARSE KULINER =====
function parseKuliner() {
  const raw = fs.readFileSync(path.join(__dirname, 'JELAJAH Watukarung.xlsx - Kuliner & UMKM.csv'), 'utf-8');
  const rows = parseCSV(raw);
  const results = [];

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 3) continue;
    const nama = clean(r[1]);
    if (!nama) continue;

    const item = {
      nama: nama,
      kategori: clean(r[2]) || '',
      menuAndalan: clean(r[3]) || '',
      kisaranHarga: clean(r[4]) || '',
      jamOperasional: clean(r[5]) || '',
      kontak: normalizePhone(r[7]),
      pantaiTerdekat: clean(r[8]) || '',
      alamat: clean(r[9]) || '',
      linkGmaps: clean(r[11]) || '',
      mediaSosial: clean(r[12]) || '',
      linkFoto: clean(r[13]) || '',
    };

    results.push(item);
  }
  return results;
}

// ===== PARSE PENUNJANG =====
function parsePenunjang() {
  const raw = fs.readFileSync(path.join(__dirname, 'JELAJAH Watukarung.xlsx - Penunjang.csv'), 'utf-8');
  const rows = parseCSV(raw);
  const results = [];

  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 3) continue;
    const nama = clean(r[1]);
    if (!nama) continue;

    const item = {
      nama: nama,
      jenis: clean(r[2]) || '',
      alamat: clean(r[3]) || '',
      jamOperasional: clean(r[4]) || '',
      kontak: normalizePhone(r[5]),
      pantaiTerdekat: clean(r[6]) || '',
      linkGmaps: clean(r[7]) || '',
      mediaSosial: '',
    };

    results.push(item);
  }
  return results;
}

// ===== MAIN =====
try {
  const dataDir = path.join(__dirname, 'src', 'data');

  const akomodasi = parseAkomodasi();
  fs.writeFileSync(path.join(dataDir, 'akomodasi.json'), JSON.stringify(akomodasi, null, 2), 'utf-8');
  console.log(`✅ akomodasi.json: ${akomodasi.length} entri`);

  const destinasi = parseDestinasi();
  fs.writeFileSync(path.join(dataDir, 'destinasi.json'), JSON.stringify(destinasi, null, 2), 'utf-8');
  console.log(`✅ destinasi.json: ${destinasi.length} entri`);

  const jasa = parseJasa();
  fs.writeFileSync(path.join(dataDir, 'jasa.json'), JSON.stringify(jasa, null, 2), 'utf-8');
  console.log(`✅ jasa.json: ${jasa.length} entri`);

  const kuliner = parseKuliner();
  fs.writeFileSync(path.join(dataDir, 'kuliner.json'), JSON.stringify(kuliner, null, 2), 'utf-8');
  console.log(`✅ kuliner.json: ${kuliner.length} entri`);

  const penunjang = parsePenunjang();
  fs.writeFileSync(path.join(dataDir, 'penunjang.json'), JSON.stringify(penunjang, null, 2), 'utf-8');
  console.log(`✅ penunjang.json: ${penunjang.length} entri`);

  console.log('\n🎉 Semua data berhasil dikonversi!');
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
}
