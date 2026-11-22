// Builds lib/data/district-maps.json (one simplified SVG map per state/UT, with its districts)
// from DataMeet's Census 2011 district boundaries (CC BY 4.0):
//   https://github.com/datameet/maps/tree/master/Districts/Census_2011
// Districts carved out after 2011 are shown within their 2011 parent district.
// Usage: node scripts/build-district-maps.js <folder with 2011_Dist.shp/.dbf> lib/data/district-maps.json
const fs = require("fs")
const path = require("path")
const [, , srcDir, outFile] = process.argv

const TELANGANA = new Set(["Adilabad", "Nizamabad", "Karimnagar", "Medak", "Hyderabad", "Rangareddy", "Ranga Reddy", "Mahbubnagar", "Mahabubnagar", "Nalgonda", "Warangal", "Khammam"])
const STATE_TO_ID = (st, district) => {
  const s = st.toLowerCase().replace(/&/g, "and").replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim()
  if (s.startsWith("andhra") && TELANGANA.has(district)) return "telangana"
  if (s.startsWith("jammu") && /^(leh|kargil)/i.test(district)) return "ladakh"
  const map = {
    "andhra pradesh": "andhra-pradesh", "arunachal pradesh": "arunachal-pradesh", assam: "assam", bihar: "bihar", chhattisgarh: "chhattisgarh",
    goa: "goa", gujarat: "gujarat", haryana: "haryana", "himachal pradesh": "himachal-pradesh", jharkhand: "jharkhand", karnataka: "karnataka",
    kerala: "kerala", "madhya pradesh": "madhya-pradesh", maharashtra: "maharashtra", manipur: "manipur", meghalaya: "meghalaya", mizoram: "mizoram",
    nagaland: "nagaland", odisha: "odisha", orissa: "odisha", punjab: "punjab", rajasthan: "rajasthan", sikkim: "sikkim", "tamil nadu": "tamil-nadu",
    telangana: "telangana", tripura: "tripura", "uttar pradesh": "uttar-pradesh", uttarakhand: "uttarakhand", uttaranchal: "uttarakhand",
    "west bengal": "west-bengal", "andaman and nicobar island": "andaman-nicobar", "andaman and nicobar islands": "andaman-nicobar", chandigarh: "chandigarh",
    "dadara and nagar havelli": "dadra-nagar-haveli-daman-diu", "dadra and nagar haveli": "dadra-nagar-haveli-daman-diu", "daman and diu": "dadra-nagar-haveli-daman-diu",
    "nct of delhi": "delhi-nct", delhi: "delhi-nct", "jammu and kashmir": "jammu-kashmir", lakshadweep: "lakshadweep", puducherry: "puducherry", pondicherry: "puducherry",
  }
  return map[s]
}

// --- DBF ---
const dbf = fs.readFileSync(path.join(srcDir, "2011_Dist.dbf"))
const nRec = dbf.readUInt32LE(4), hLen = dbf.readUInt16LE(8), rLen = dbf.readUInt16LE(10)
const fields = []
for (let o = 32; dbf[o] !== 0x0d; o += 32) fields.push({ name: dbf.toString("latin1", o, o + 11).replace(/\0.*$/, ""), len: dbf[o + 16] })
const recs = []
for (let r = 0; r < nRec; r++) {
  let o = hLen + r * rLen + 1
  const rec = {}
  for (const f of fields) { rec[f.name] = dbf.toString("utf8", o, o + f.len).trim(); o += f.len }
  recs.push(rec)
}

// --- SHP ---
const shp = fs.readFileSync(path.join(srcDir, "2011_Dist.shp"))
const shapes = []
let off = 100
while (off < shp.length) {
  const len = shp.readInt32BE(off + 4) * 2, c = off + 8, type = shp.readInt32LE(c)
  const rings = []
  if (type === 5) {
    const np = shp.readInt32LE(c + 36), nPts = shp.readInt32LE(c + 40), parts = []
    for (let i = 0; i < np; i++) parts.push(shp.readInt32LE(c + 44 + i * 4))
    const p0 = c + 44 + np * 4
    for (let i = 0; i < np; i++) {
      const s = parts[i], e = i + 1 < np ? parts[i + 1] : nPts, ring = []
      for (let k = s; k < e; k++) ring.push([shp.readDoubleLE(p0 + k * 16), shp.readDoubleLE(p0 + k * 16 + 8)])
      rings.push(ring)
    }
  }
  shapes.push(rings)
  off = c + len
}

function dp(pts, tol) {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1
  const stack = [[0, pts.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()
    let maxD = 0, idx = -1
    const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy)
    for (let i = a + 1; i < b; i++) {
      const d = L < 1e-9 ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay) : Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / L
      if (d > maxD) { maxD = d; idx = i }
    }
    if (maxD > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]) }
  }
  return pts.filter((_, i) => keep[i])
}

const byRegion = {}
const unmatched = new Set()
recs.forEach((rec, i) => {
  const id = STATE_TO_ID(rec.ST_NM, rec.DISTRICT)
  if (!id) { unmatched.add(rec.ST_NM); return }
  ;(byRegion[id] ||= []).push({ name: rec.DISTRICT, rings: shapes[i] })
})

const result = {}
for (const [id, districts] of Object.entries(byRegion)) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const d of districts) for (const r of d.rings) for (const [x, y] of r) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y) }
  const k = Math.cos(((minY + maxY) / 2) * Math.PI / 180)
  const W = 600, H = 600
  const scale = Math.min(W / ((maxX - minX) * k), H / (maxY - minY))
  const w = (maxX - minX) * k * scale, h = (maxY - minY) * scale
  const proj = ([x, y]) => [(x - minX) * k * scale, (maxY - y) * scale]
  result[id] = {
    viewBox: `0 0 ${Math.ceil(w)} ${Math.ceil(h)}`,
    districts: districts.map((d) => {
      let path = "", sx = 0, sy = 0, n = 0, best = 0
      for (const ring of d.rings) {
        const p = dp(ring.map(proj), 0.6)
        const xs = p.map((q) => q[0]), ys = p.map((q) => q[1])
        const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))
        if (p.length < 3 || span < 1.2) continue
        path += "M" + p.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join("L") + "Z"
        if (span > best) { best = span; sx = xs.reduce((a, b) => a + b, 0) / xs.length; sy = ys.reduce((a, b) => a + b, 0) / ys.length; n = 1 }
      }
      return { name: d.name, path, cx: +sx.toFixed(1), cy: +sy.toFixed(1) }
    }).filter((d) => d.path),
  }
}
fs.writeFileSync(outFile, JSON.stringify(result))
console.log("regions:", Object.keys(result).length, "bytes:", fs.statSync(outFile).size)
console.log("unmatched states:", [...unmatched])
console.log(Object.entries(result).map(([id, r]) => id + ":" + r.districts.length).join(" "))
