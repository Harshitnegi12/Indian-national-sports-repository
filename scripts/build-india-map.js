// Builds lib/data/india-map-shapes.json from DataMeet's States/Admin2 shapefile (CC BY 4.0):
//   https://github.com/datameet/maps/tree/master/States
// Usage: node scripts/build-india-map.js <folder with Admin2.shp/.dbf> lib/data/india-map-shapes.json
const fs = require("fs")
const path = require("path")
const [, , srcDir, outFile] = process.argv

const NAME_TO_ID = {
  "Andaman & Nicobar": "andaman-nicobar", "Andhra Pradesh": "andhra-pradesh", "Arunachal Pradesh": "arunachal-pradesh",
  Assam: "assam", Bihar: "bihar", Chandigarh: "chandigarh", Chhattisgarh: "chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu": "dadra-nagar-haveli-daman-diu", Delhi: "delhi-nct", Goa: "goa",
  Gujarat: "gujarat", Haryana: "haryana", "Himachal Pradesh": "himachal-pradesh", "Jammu & Kashmir": "jammu-kashmir",
  Jharkhand: "jharkhand", Karnataka: "karnataka", Kerala: "kerala", Ladakh: "ladakh", Lakshadweep: "lakshadweep",
  "Madhya Pradesh": "madhya-pradesh", Maharashtra: "maharashtra", Manipur: "manipur", Meghalaya: "meghalaya",
  Mizoram: "mizoram", Nagaland: "nagaland", Odisha: "odisha", Puducherry: "puducherry", Punjab: "punjab",
  Rajasthan: "rajasthan", Sikkim: "sikkim", "Tamil Nadu": "tamil-nadu", Telangana: "telangana", Tripura: "tripura",
  "Uttar Pradesh": "uttar-pradesh", Uttarakhand: "uttarakhand", "West Bengal": "west-bengal",
}

// --- DBF: read ST_NM ---
const dbf = fs.readFileSync(path.join(srcDir, "Admin2.dbf"))
const nRec = dbf.readUInt32LE(4), hLen = dbf.readUInt16LE(8), rLen = dbf.readUInt16LE(10)
const fields = []
for (let o = 32; dbf[o] !== 0x0d; o += 32) fields.push({ name: dbf.toString("latin1", o, o + 11).replace(/\0.*$/, ""), len: dbf[o + 16] })
const names = []
for (let r = 0; r < nRec; r++) {
  let o = hLen + r * rLen + 1
  const rec = {}
  for (const f of fields) { rec[f.name] = dbf.toString("utf8", o, o + f.len).trim(); o += f.len }
  names.push(rec.ST_NM)
}

// --- SHP: polygons ---
const shp = fs.readFileSync(path.join(srcDir, "Admin2.shp"))
const records = []
let off = 100
while (off < shp.length) {
  const len = shp.readInt32BE(off + 4) * 2
  const c = off + 8
  const type = shp.readInt32LE(c)
  if (type === 5 || type === 15) {
    const numParts = shp.readInt32LE(c + 36), numPoints = shp.readInt32LE(c + 40)
    const parts = []
    for (let i = 0; i < numParts; i++) parts.push(shp.readInt32LE(c + 44 + i * 4))
    const p0 = c + 44 + numParts * 4
    const rings = []
    for (let i = 0; i < numParts; i++) {
      const s = parts[i], e = i + 1 < numParts ? parts[i + 1] : numPoints
      const ring = []
      for (let k = s; k < e; k++) ring.push([shp.readDoubleLE(p0 + k * 16), shp.readDoubleLE(p0 + k * 16 + 8)])
      rings.push(ring)
    }
    records.push(rings)
  } else records.push([])
  off = c + len
}

// --- projection ---
let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity
const bboxes = {}
records.forEach((rings, i) => {
  let a = [Infinity, Infinity, -Infinity, -Infinity]
  for (const ring of rings) for (const [x, y] of ring) {
    minLon = Math.min(minLon, x); maxLon = Math.max(maxLon, x); minLat = Math.min(minLat, y); maxLat = Math.max(maxLat, y)
    a = [Math.min(a[0], x), Math.min(a[1], y), Math.max(a[2], x), Math.max(a[3], y)]
  }
  bboxes[names[i]] = a.map((v) => +v.toFixed(2))
})
const k = Math.cos((23 * Math.PI) / 180)
const W = 600
const scale = W / ((maxLon - minLon) * k)
const H = Math.ceil((maxLat - minLat) * scale)
const proj = ([lon, lat]) => [(lon - minLon) * k * scale, (maxLat - lat) * scale]

function dp(pts, tol) {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1
  const stack = [[0, pts.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()
    let maxD = 0, idx = -1
    const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy)
    for (let i = a + 1; i < b; i++) {
      const d = L < 1e-6 ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay) : Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / L
      if (d > maxD) { maxD = d; idx = i }
    }
    if (maxD > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]) }
  }
  return pts.filter((_, i) => keep[i])
}

const shapes = records.map((rings, i) => {
  const name = names[i]
  const id = NAME_TO_ID[name]
  if (!id) throw new Error("Unknown state name: " + name)
  const tiny = ["chandigarh", "delhi-nct", "lakshadweep", "puducherry", "dadra-nagar-haveli-daman-diu", "goa"].includes(id)
  let d = ""
  for (const ring of rings) {
    const p = dp(ring.map(proj), tiny ? 0.08 : 0.35)
    const xs = p.map((q) => q[0]), ys = p.map((q) => q[1])
    const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))
    if (p.length < 3 || span < (tiny ? 0.15 : 0.8)) continue
    d += "M" + p.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join("L") + "Z"
  }
  const [x0, y0] = proj([bboxes[name][0], bboxes[name][3]]), [x1, y1] = proj([bboxes[name][2], bboxes[name][1]])
  return { regionId: id, path: d, center: [+((x0 + x1) / 2).toFixed(1), +((y0 + y1) / 2).toFixed(1)], size: +Math.max(x1 - x0, y1 - y0).toFixed(1) }
})

// Dot markers for regions too small to hover (lon, lat of the main town).
const MARKERS = { chandigarh: [76.78, 30.73], "delhi-nct": [77.1, 28.65], "dadra-nagar-haveli-daman-diu": [73.02, 20.27], puducherry: [79.83, 11.93], lakshadweep: [72.64, 10.57] }
const markers = Object.entries(MARKERS).map(([regionId, ll]) => { const [x, y] = proj(ll); return { regionId, x: +x.toFixed(1), y: +y.toFixed(1) } })
fs.writeFileSync(outFile, JSON.stringify({ viewBox: `0 0 ${W} ${H}`, shapes: shapes.map(({ regionId, path }) => ({ regionId, path })), markers }))
console.log("viewBox", W, H, "bytes", fs.statSync(outFile).size)
console.log("overall lon", minLon.toFixed(2), maxLon.toFixed(2), "lat", minLat.toFixed(2), maxLat.toFixed(2))
console.log("J&K bbox", bboxes["Jammu & Kashmir"], "Ladakh bbox", bboxes["Ladakh"])
console.log(shapes.map((s) => s.regionId + ":" + s.path.length + ":" + s.size).join("  "))




