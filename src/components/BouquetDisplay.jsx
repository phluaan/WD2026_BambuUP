import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { flowerCatalog } from '../data/bouquet'

// ── Canvas ─────────────────────────────────────────────────────────────────────
const CW = 340, CH = 440

// ── Colour helper ─────────────────────────────────────────────────────────────
function dk(hex, a = 0.18) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.round(((n >> 16) & 255) * (1 - a))
  const g = Math.round(((n >> 8)  & 255) * (1 - a))
  const b = Math.round(( n        & 255) * (1 - a))
  return `rgb(${r},${g},${b})`
}

// ── Motion wrapper for SVG groups ─────────────────────────────────────────────
const SVG_ANIM = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
}
const svgStyle = { transformBox: 'fill-box', transformOrigin: 'center' }
function Mg({ delay, children }) {
  return (
    <motion.g
      {...SVG_ANIM}
      transition={{ delay, duration: 0.65, type: 'spring', stiffness: 100, damping: 13 }}
      style={svgStyle}
    >
      {children}
    </motion.g>
  )
}
function shadow(cx, cy, r) {
  return <ellipse cx={cx + 3} cy={cy + 5} rx={r * 0.9} ry={r * 0.35} fill="rgba(0,0,0,0.10)" />
}

// ══════════════════════════════════════════════════════════════════════════════
// BOUQUET-EXCLUSIVE FLOWER RENDERERS (new illustrations, NOT from Flower.jsx)
// ══════════════════════════════════════════════════════════════════════════════

// ── Rose: layered spiral petals ───────────────────────────────────────────────
function BqRose({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color)
  const outer = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * 2 * Math.PI + 0.15
    const px = cx + Math.cos(a) * r * 0.44
    const py = cy + Math.sin(a) * r * 0.44
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.44} ry={r * 0.54}
      fill={color} opacity={0.86}
      transform={`rotate(${a * 180 / Math.PI + (i % 2 ? -22 : 22)},${px},${py})`} />
  })
  const mid = Array.from({ length: 5 }, (_, i) => {
    const a = ((i + 0.5) / 5) * 2 * Math.PI
    const px = cx + Math.cos(a) * r * 0.22
    const py = cy + Math.sin(a) * r * 0.22
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.30} ry={r * 0.38}
      fill={d} opacity={0.92}
      transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
  })
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {outer}{mid}
      <ellipse cx={cx}           cy={cy - r * 0.06} rx={r * 0.18} ry={r * 0.24} fill={d} opacity={0.97} />
      <ellipse cx={cx + r * 0.09} cy={cy + r * 0.02} rx={r * 0.13} ry={r * 0.20} fill={d} opacity={0.90}
        transform={`rotate(25,${cx + r * 0.09},${cy + r * 0.02})`} />
      <ellipse cx={cx - r * 0.09} cy={cy + r * 0.02} rx={r * 0.13} ry={r * 0.20} fill={d} opacity={0.90}
        transform={`rotate(-25,${cx - r * 0.09},${cy + r * 0.02})`} />
    </Mg>
  )
}

// ── Tulip: 3-petal cup ────────────────────────────────────────────────────────
function BqTulip({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color)
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {/* left petal */}
      <ellipse cx={cx - r * 0.30} cy={cy} rx={r * 0.38} ry={r * 0.66}
        fill={color} opacity={0.88} transform={`rotate(-18,${cx - r * 0.30},${cy})`} />
      {/* right petal */}
      <ellipse cx={cx + r * 0.30} cy={cy} rx={r * 0.38} ry={r * 0.66}
        fill={color} opacity={0.88} transform={`rotate(18,${cx + r * 0.30},${cy})`} />
      {/* center petal (tallest, darker) */}
      <ellipse cx={cx} cy={cy - r * 0.06} rx={r * 0.36} ry={r * 0.72} fill={d} opacity={0.96} />
      {/* base */}
      <ellipse cx={cx} cy={cy + r * 0.52} rx={r * 0.24} ry={r * 0.16} fill={d} opacity={0.6} />
    </Mg>
  )
}

// ── Sunflower: long petals + big dark center ──────────────────────────────────
function BqSunflower({ cx, cy, r, color, delay = 0 }) {
  const pc = 16
  const petals = Array.from({ length: pc }, (_, i) => {
    const a = (i / pc) * 2 * Math.PI
    const d = r * 0.65
    const px = cx + Math.cos(a) * d
    const py = cy + Math.sin(a) * d
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.15} ry={r * 0.40}
      fill={i % 2 === 0 ? color : dk(color, 0.14)} opacity={0.93}
      transform={`rotate(${a * 180 / Math.PI + 90},${px},${py})`} />
  })
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.36} fill="#2C1500" />
      <circle cx={cx} cy={cy} r={r * 0.26} fill="#1A0A00" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * 2 * Math.PI
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.18} cy={cy + Math.sin(a) * r * 0.18}
          r={r * 0.042} fill="rgba(255,200,60,0.40)" />
      })}
      <ellipse cx={cx - r * 0.07} cy={cy - r * 0.08} rx={r * 0.10} ry={r * 0.07}
        fill="rgba(255,200,80,0.25)" />
    </Mg>
  )
}

// ── Orchid: dorsal sepal + wing petals + labellum ─────────────────────────────
function BqOrchid({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color)
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {/* dorsal sepal (top) */}
      <ellipse cx={cx} cy={cy - r * 0.54} rx={r * 0.28} ry={r * 0.48} fill={color} opacity={0.88} />
      {/* wing petals */}
      <ellipse cx={cx - r * 0.52} cy={cy - r * 0.08} rx={r * 0.48} ry={r * 0.26}
        fill={color} opacity={0.84} transform={`rotate(-22,${cx - r * 0.52},${cy - r * 0.08})`} />
      <ellipse cx={cx + r * 0.52} cy={cy - r * 0.08} rx={r * 0.48} ry={r * 0.26}
        fill={color} opacity={0.84} transform={`rotate(22,${cx + r * 0.52},${cy - r * 0.08})`} />
      {/* lateral sepals */}
      <ellipse cx={cx - r * 0.40} cy={cy + r * 0.30} rx={r * 0.20} ry={r * 0.42}
        fill={d} opacity={0.72} transform={`rotate(18,${cx - r * 0.40},${cy + r * 0.30})`} />
      <ellipse cx={cx + r * 0.40} cy={cy + r * 0.30} rx={r * 0.20} ry={r * 0.42}
        fill={d} opacity={0.72} transform={`rotate(-18,${cx + r * 0.40},${cy + r * 0.30})`} />
      {/* labellum */}
      <ellipse cx={cx} cy={cy + r * 0.30} rx={r * 0.40} ry={r * 0.44} fill={d} opacity={0.93} />
      {/* column */}
      <ellipse cx={cx} cy={cy} rx={r * 0.11} ry={r * 0.18} fill="rgba(255,255,255,0.68)" />
    </Mg>
  )
}

// ── Cherry blossom / Lily: 5 round petals + stamens ──────────────────────────
function BqCherry({ cx, cy, r, color, delay = 0 }) {
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * 2 * Math.PI - Math.PI / 2
        const px = cx + Math.cos(a) * r * 0.44
        const py = cy + Math.sin(a) * r * 0.44
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.44} ry={r * 0.50}
          fill={color} opacity={0.88}
          transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#FFE566" />
      <circle cx={cx} cy={cy} r={r * 0.13} fill="#FFAA00" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * 2 * Math.PI
        return <line key={i} x1={cx} y1={cy}
          x2={cx + Math.cos(a) * r * 0.30} y2={cy + Math.sin(a) * r * 0.30}
          stroke="#FFB830" strokeWidth={1.2} />
      })}
    </Mg>
  )
}

// ── Peony: dense ball of overlapping petals ───────────────────────────────────
function BqPeony({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color)
  const petals = [
    { dx:  0,        dy: -r * 0.28, rx: r * 0.40, ry: r * 0.55, rot:    0 },
    { dx:  r * 0.30, dy: -r * 0.14, rx: r * 0.38, ry: r * 0.52, rot:   35 },
    { dx:  r * 0.32, dy:  r * 0.20, rx: r * 0.38, ry: r * 0.50, rot:   70 },
    { dx:  r * 0.10, dy:  r * 0.36, rx: r * 0.40, ry: r * 0.52, rot:   15 },
    { dx: -r * 0.20, dy:  r * 0.32, rx: r * 0.38, ry: r * 0.50, rot:  -20 },
    { dx: -r * 0.34, dy:  r * 0.12, rx: r * 0.38, ry: r * 0.50, rot:  -55 },
    { dx: -r * 0.30, dy: -r * 0.20, rx: r * 0.38, ry: r * 0.52, rot:  -35 },
    { dx:  0,        dy: -r * 0.14, rx: r * 0.28, ry: r * 0.40, rot:   10 },
    { dx:  r * 0.18, dy:  r * 0.06, rx: r * 0.28, ry: r * 0.38, rot:   50 },
    { dx: -r * 0.18, dy:  r * 0.10, rx: r * 0.28, ry: r * 0.38, rot:  -50 },
    { dx:  0,        dy:  0,        rx: r * 0.20, ry: r * 0.26, rot:    0 },
  ]
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {petals.map((p, i) => (
        <ellipse key={i} cx={cx + p.dx} cy={cy + p.dy} rx={p.rx} ry={p.ry}
          fill={i < 7 ? color : d} opacity={0.86 + i * 0.01}
          transform={`rotate(${p.rot},${cx + p.dx},${cy + p.dy})`} />
      ))}
    </Mg>
  )
}

// ── Lotus: pointed petals in 2 rings + golden center ─────────────────────────
function BqLotus({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color)
  const outer = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * 2 * Math.PI
    const px = cx + Math.cos(a) * r * 0.60
    const py = cy + Math.sin(a) * r * 0.60
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.20} ry={r * 0.46}
      fill={color} opacity={0.84}
      transform={`rotate(${a * 180 / Math.PI + 90},${px},${py})`} />
  })
  const mid = Array.from({ length: 6 }, (_, i) => {
    const a = ((i + 0.5) / 6) * 2 * Math.PI - Math.PI / 6
    const px = cx + Math.cos(a) * r * 0.34
    const py = cy + Math.sin(a) * r * 0.34
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.17} ry={r * 0.36}
      fill={d} opacity={0.90}
      transform={`rotate(${a * 180 / Math.PI + 90},${px},${py})`} />
  })
  return (
    <Mg delay={delay}>
      {shadow(cx, cy, r)}
      {outer}{mid}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#FFE566" opacity={0.96} />
      <circle cx={cx} cy={cy} r={r * 0.13} fill="#FFAA00" />
    </Mg>
  )
}

// ── Small 5-petal (used for accent positions) ─────────────────────────────────
function BqSmall({ cx, cy, r, color, delay = 0 }) {
  return (
    <Mg delay={delay}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * 2 * Math.PI - Math.PI / 2
        const px = cx + Math.cos(a) * r * 0.44
        const py = cy + Math.sin(a) * r * 0.44
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.44} ry={r * 0.36}
          fill={color} transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.32} fill="#FFE566" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="#FFCC00" />
    </Mg>
  )
}

// ── Dispatcher ────────────────────────────────────────────────────────────────
const RENDERERS = {
  rose:      BqRose,
  tulip:     BqTulip,
  sunflower: BqSunflower,
  orchid:    BqOrchid,
  cherry:    BqCherry,
  peony:     BqPeony,
  lotus:     BqLotus,
}

// ══════════════════════════════════════════════════════════════════════════════
// SUPPORTING ELEMENTS
// ══════════════════════════════════════════════════════════════════════════════

function BerrySpray({ cx, cy, r, color, delay = 0 }) {
  const beads = [
    { dx: 0,       dy: 0 },
    { dx: -r*1.1,  dy: -r*2.2 },
    { dx:  r*1.2,  dy: -r*2.0 },
    { dx:  r*0.2,  dy: -r*4.0 },
    { dx:  r*1.4,  dy: -r*3.6 },
    { dx: -r*0.8,  dy: -r*3.8 },
  ]
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}>
      <line x1={cx} y1={cy} x2={cx+beads[1].dx} y2={cy+beads[1].dy} stroke="#7CAE78" strokeWidth={1.4} />
      <line x1={cx} y1={cy} x2={cx+beads[2].dx} y2={cy+beads[2].dy} stroke="#7CAE78" strokeWidth={1.4} />
      <line x1={cx+beads[1].dx} y1={cy+beads[1].dy} x2={cx+beads[3].dx} y2={cy+beads[3].dy} stroke="#7CAE78" strokeWidth={1.1} />
      <line x1={cx+beads[2].dx} y1={cy+beads[2].dy} x2={cx+beads[4].dx} y2={cy+beads[4].dy} stroke="#7CAE78" strokeWidth={1.1} />
      <line x1={cx+beads[1].dx} y1={cy+beads[1].dy} x2={cx+beads[5].dx} y2={cy+beads[5].dy} stroke="#7CAE78" strokeWidth={1.1} />
      {beads.map((b, i) => (
        <g key={i}>
          <circle cx={cx+b.dx} cy={cy+b.dy} r={r*(i===0?1.15:0.95)} fill="rgba(0,0,0,0.10)" />
          <circle cx={cx+b.dx} cy={cy+b.dy} r={r*(i===0?1.0:0.82)} fill={color} />
          <circle cx={cx+b.dx-r*0.28} cy={cy+b.dy-r*0.28} r={r*0.24} fill="rgba(255,255,255,0.42)" />
        </g>
      ))}
    </motion.g>
  )
}

function Leaf({ x1, y1, length, angle, color = '#5E9B62', delay = 0 }) {
  const rad = angle * Math.PI / 180
  const x2 = x1 + Math.cos(rad) * length
  const y2 = y1 + Math.sin(rad) * length
  const mx = (x1+x2)/2, my = (y1+y2)/2
  const pr = rad + Math.PI/2
  const w = length * 0.28
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.6 }}>
      <path d={`M${x1} ${y1} Q${mx+Math.cos(pr)*w} ${my+Math.sin(pr)*w} ${x2} ${y2} Q${mx-Math.cos(pr)*w} ${my-Math.sin(pr)*w} ${x1} ${y1}Z`}
        fill={color} />
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={dk(color, 0.25)} strokeWidth={1} opacity={0.55} />
    </motion.g>
  )
}

function Stems({ flowers, gatherX, gatherY }) {
  return (
    <g>
      {flowers.map((f, i) => (
        <line key={i} x1={f.cx} y1={f.cy + (f.r || 12) * 0.8}
          x2={gatherX} y2={gatherY}
          stroke="#4A8C58" strokeWidth={2.2} strokeLinecap="round" opacity={0.65} />
      ))}
      {[0.18, 0.34, 0.50, 0.66, 0.80].map((t, i) => {
        const y = gatherY + t * (CH - gatherY - 65) * 0.95
        const spread = 13 - t * 7
        return (
          <line key={i}
            x1={gatherX - spread} y1={y - 3 + i * 2}
            x2={gatherX + spread} y2={y + 3 - i * 2}
            stroke={i % 2 === 0 ? '#6BAA74' : '#4A8C58'}
            strokeWidth={4} strokeLinecap="round" opacity={0.52} />
        )
      })}
    </g>
  )
}

function Bow({ cx, cy, delay = 1.8 }) {
  const c = '#F4A261', dk2 = '#C77B35', lt = '#FFD49A'
  const tail1 = `M${cx} ${cy} C${cx-18} ${cy+26} ${cx-28} ${cy+54} ${cx-22} ${cy+80}`
  const tail2 = `M${cx} ${cy} C${cx+18} ${cy+26} ${cx+28} ${cy+54} ${cx+22} ${cy+80}`
  const left  = `M${cx} ${cy} C${cx-48} ${cy-38} ${cx-78} ${cy-8} ${cx-52} ${cy+26} C${cx-28} ${cy+54} ${cx-8} ${cy+18} ${cx} ${cy}Z`
  const right = `M${cx} ${cy} C${cx+48} ${cy-38} ${cx+78} ${cy-8} ${cx+52} ${cy+26} C${cx+28} ${cy+54} ${cx+8} ${cy+18} ${cx} ${cy}Z`
  return (
    <motion.g {...SVG_ANIM}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 120, damping: 14 }}
      style={svgStyle}>
      <path d={tail1} stroke="#CC4444" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d={tail2} stroke="#44AA44" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d={tail1} stroke="#FF7777" strokeWidth={3.5} strokeLinecap="round" fill="none" opacity={0.6} />
      <path d={tail2} stroke="#66CC66" strokeWidth={3.5} strokeLinecap="round" fill="none" opacity={0.6} />
      <path d={left}  fill={c} />
      <path d={right} fill={c} />
      <path d={`M${cx} ${cy} C${cx-30} ${cy-10} ${cx-52} ${cy+12} ${cx-38} ${cy+30} C${cx-22} ${cy+44} ${cx-6} ${cy+24} ${cx} ${cy}Z`}
        fill={dk2} opacity={0.32} />
      <path d={`M${cx} ${cy} C${cx+30} ${cy-10} ${cx+52} ${cy+12} ${cx+38} ${cy+30} C${cx+22} ${cy+44} ${cx+6} ${cy+24} ${cx} ${cy}Z`}
        fill={dk2} opacity={0.32} />
      <path d={`M${cx-44} ${cy-8} C${cx-38} ${cy-22} ${cx-20} ${cy-24} ${cx-8} ${cy-16}`}
        stroke={lt} strokeWidth={3} fill="none" opacity={0.52} strokeLinecap="round" />
      <path d={`M${cx+44} ${cy-8} C${cx+38} ${cy-22} ${cx+20} ${cy-24} ${cx+8} ${cy-16}`}
        stroke={lt} strokeWidth={3} fill="none" opacity={0.52} strokeLinecap="round" />
      <ellipse cx={cx} cy={cy} rx={10} ry={8} fill={c} />
      <ellipse cx={cx} cy={cy} rx={10} ry={8} fill={dk2} opacity={0.28} />
    </motion.g>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT — bouquet dome positions (SVG coords on 340×440 canvas)
// ══════════════════════════════════════════════════════════════════════════════
// Main flower positions (back → front via order)
const FLOWER_POSITIONS = [
  { cx: 170, cy:  68, r: 33, delay: 0.10 },
  { cx:  98, cy:  92, r: 29, delay: 0.15 },
  { cx: 242, cy:  86, r: 29, delay: 0.18 },
  { cx:  50, cy: 112, r: 26, delay: 0.08 },
  { cx: 280, cy: 106, r: 24, delay: 0.12 },
  { cx:  72, cy: 158, r: 32, delay: 0.25 },
  { cx: 252, cy: 150, r: 31, delay: 0.28 },
  { cx: 162, cy: 140, r: 36, delay: 0.22 },
  { cx: 122, cy: 190, r: 27, delay: 0.30 },
  { cx: 214, cy: 182, r: 25, delay: 0.33 },
  { cx: 102, cy: 224, r: 36, delay: 0.42 },
  { cx: 238, cy: 216, r: 34, delay: 0.45 },
  { cx: 168, cy: 242, r: 40, delay: 0.38 },
]
const SMALL_POSITIONS = [
  { cx:  32, cy: 158, r: 14, delay: 0.20 },
  { cx: 302, cy: 164, r: 13, delay: 0.22 },
  { cx: 148, cy:  30, r: 13, delay: 0.06 },
  { cx:  60, cy:  52, r: 11, delay: 0.04 },
  { cx: 268, cy:  56, r: 11, delay: 0.05 },
]
const BERRY_POSITIONS = [
  { cx:  34, cy: 106, r: 7.5, colorIdx: 0, delay: 0.07 },
  { cx: 297, cy: 115, r: 7,   colorIdx: 1, delay: 0.09 },
  { cx: 166, cy:  18, r: 6.5, colorIdx: 0, delay: 0.03 },
]
const LEAF_DEFS = [
  { x1:  54, y1: 126, length: 52, angle: -148, delay: 0.05 },
  { x1: 284, y1: 118, length: 48, angle:  -30, delay: 0.06 },
  { x1:  40, y1: 200, length: 56, angle: -160, delay: 0.12 },
  { x1: 300, y1: 195, length: 53, angle:  -18, delay: 0.14 },
  { x1:  80, y1: 268, length: 58, angle: -148, delay: 0.35 },
  { x1: 258, y1: 263, length: 55, angle:  -32, delay: 0.37 },
  { x1: 132, y1: 278, length: 50, angle: -120, delay: 0.40 },
  { x1: 200, y1: 276, length: 48, angle:  -58, delay: 0.42 },
  { x1: 170, y1: 282, length: 44, angle:  -88, delay: 0.44 },
]

const DEFAULT_TYPES  = ['rose', 'cherry', 'sunflower', 'tulip', 'peony']
const DEFAULT_COLORS = ['#FF4757', '#FF85A1', '#FFD166', '#FF7EB6', '#FF6B9D']
const GATHER_X = CW / 2, GATHER_Y = 308

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function BouquetDisplay({ selectedFlowers }) {
  const count = selectedFlowers?.length || 0

  // Build a stable list of { svgType, colorHex } from user's selection
  const flowerTypes = useMemo(() => {
    if (!count) return DEFAULT_TYPES.map((t, i) => ({ svgType: t, colorHex: DEFAULT_COLORS[i] }))
    return selectedFlowers.map(sf => {
      const cat = flowerCatalog.find(f => f.id === sf.flowerId) || flowerCatalog[0]
      return { svgType: cat.svgType, colorHex: sf.colorHex }
    })
  }, [selectedFlowers, count])

  // Assign types & colors to main positions by cycling through selected flowers
  const mainFlowers = useMemo(() =>
    FLOWER_POSITIONS.map((pos, i) => {
      const ft = flowerTypes[i % flowerTypes.length]
      return { ...pos, svgType: ft.svgType, colorHex: ft.colorHex }
    })
  , [flowerTypes])

  // Small accent positions use smallest/lightest flower from selection
  const smallFlowers = useMemo(() =>
    SMALL_POSITIONS.map((pos, i) => {
      const ft = flowerTypes[i % flowerTypes.length]
      return { ...pos, colorHex: ft.colorHex }
    })
  , [flowerTypes])

  // Berry colors follow selection
  const berryColors = useMemo(() =>
    BERRY_POSITIONS.map(b => ({ ...b, color: flowerTypes[b.colorIdx % flowerTypes.length].colorHex }))
  , [flowerTypes])

  // Sparkles
  const SPARKS = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${10 + (i * 19) % 78}%`,
    top:  `${8  + (i * 13) % 74}%`,
    size: 3 + i % 3,
    color: flowerTypes[i % flowerTypes.length].colorHex,
    dur: 2.5 + i * 0.3,
    dly: i * 0.45,
  })), [flowerTypes])

  return (
    <motion.div className="relative shrink-0 select-none"
      style={{ width: CW, height: CH }}
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.0, type: 'spring', stiffness: 70, damping: 14 }}>

      <motion.div style={{ width: CW, height: CH, position: 'relative' }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>

        {/* Glow */}
        <div className="absolute pointer-events-none" style={{
          width: CW + 80, height: CH + 80, left: -40, top: -40,
          background: `radial-gradient(ellipse at 50% 45%, ${flowerTypes[0].colorHex}38 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }} />

        <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`}
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>

          {/* Stems */}
          <Stems flowers={[...mainFlowers, ...smallFlowers]} gatherX={GATHER_X} gatherY={GATHER_Y} />

          {/* Leaves */}
          {LEAF_DEFS.map((l, i) => (
            <Leaf key={i} {...l}
              color={i % 3 === 0 ? '#5E9B62' : i % 3 === 1 ? '#7CBF80' : '#4A7D50'} />
          ))}

          {/* Berries */}
          {berryColors.map((b, i) => <BerrySpray key={i} {...b} />)}

          {/* Small accent flowers */}
          {smallFlowers.map((f, i) => (
            <BqSmall key={i} cx={f.cx} cy={f.cy} r={f.r} color={f.colorHex} delay={f.delay} />
          ))}

          {/* Main flowers — back to front */}
          {mainFlowers.map((f, i) => {
            const R = RENDERERS[f.svgType] || RENDERERS.rose
            return <R key={i} cx={f.cx} cy={f.cy} r={f.r} color={f.colorHex} delay={f.delay} />
          })}

          {/* Bow */}
          <Bow cx={GATHER_X} cy={GATHER_Y + 42} delay={1.8} />
        </svg>

        {/* Sparkles */}
        {SPARKS.map(s => (
          <motion.div key={s.id} className="absolute rounded-full pointer-events-none"
            style={{ width: s.size, height: s.size, background: s.color,
              left: s.left, top: s.top, filter: 'blur(1px)', zIndex: 50 }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.75, 0], scale: [0.7, 1.4, 0.7] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.dly, ease: 'easeInOut' }} />
        ))}
      </motion.div>
    </motion.div>
  )
}
