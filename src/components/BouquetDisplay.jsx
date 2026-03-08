import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { flowerCatalog } from '../data/bouquet'

// ── Canvas ─────────────────────────────────────────────────────────────────────
const CW = 340, CH = 440

// ── Colour helpers ─────────────────────────────────────────────────────────────
function dk(hex, a = 0.18) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.round(((n >> 16) & 255) * (1 - a))
  const g = Math.round(((n >> 8)  & 255) * (1 - a))
  const b = Math.round(( n        & 255) * (1 - a))
  return `rgb(${r},${g},${b})`
}

// ── Motion wrapper ─────────────────────────────────────────────────────────────
const SVG_ANIM = { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 } }
const svgStyle  = { transformBox: 'fill-box', transformOrigin: 'center' }
function Mg({ delay, children }) {
  return (
    <motion.g {...SVG_ANIM}
      transition={{ delay, duration: 0.65, type: 'spring', stiffness: 100, damping: 13 }}
      style={svgStyle}>{children}</motion.g>
  )
}

// ── Shared utilities drawn inside each flower ──────────────────────────────────
function Shadow({ cx, cy, r }) {
  return <ellipse cx={cx + 3} cy={cy + 5} rx={r * 0.88} ry={r * 0.32} fill="rgba(0,0,0,0.10)" />
}
// Calyx: green sepal base anchoring flower to stem — removes "floating" effect
function Calyx({ cx, cy, r }) {
  const gy = cy + r * 0.72
  return (
    <g>
      {/* left sepal */}
      <ellipse cx={cx - r * 0.22} cy={gy - r * 0.08} rx={r * 0.18} ry={r * 0.30}
        fill="#5A9B5E" opacity={0.85} transform={`rotate(-28,${cx - r * 0.22},${gy - r * 0.08})`} />
      {/* right sepal */}
      <ellipse cx={cx + r * 0.22} cy={gy - r * 0.08} rx={r * 0.18} ry={r * 0.30}
        fill="#5A9B5E" opacity={0.85} transform={`rotate(28,${cx + r * 0.22},${gy - r * 0.08})`} />
      {/* base cup */}
      <path d={`M${cx - r * 0.26} ${gy} Q${cx} ${gy + r * 0.28} ${cx + r * 0.26} ${gy}`}
        stroke="#4A8054" strokeWidth={r * 0.28} strokeLinecap="round" fill="none" opacity={0.75} />
    </g>
  )
}
// Vein line on a petal (from base towards tip)
function Vein({ x1, y1, x2, y2, color, opacity = 0.28 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={color} strokeWidth={0.9} opacity={opacity} strokeLinecap="round" />
}

// ── 5-angle view system ───────────────────────────────────────────────────────
// Each flower position in the bouquet gets one of 5 viewing angles:
//  0 = full front   1 = lean-left     2 = foreshortened-top
//  3 = lean-right   4 = side/profile
const VIEW_PARAMS = [
  { sx: 1.00, sy: 1.00, rot:   0 },  // 0 full front
  { sx: 0.86, sy: 1.00, rot: -20 },  // 1 lean left   (was 0.80 → thicker)
  { sx: 1.00, sy: 0.68, rot:   5 },  // 2 top view
  { sx: 0.86, sy: 1.00, rot:  20 },  // 3 lean right  (was 0.80 → thicker)
  { sx: 0.52, sy: 1.00, rot:   3 },  // 4 side profile (was 0.28 → much thicker)
]
function vt(cx, cy, variant) {
  const { sx, sy, rot } = VIEW_PARAMS[variant ?? 0]
  if (sx === 1 && sy === 1 && rot === 0) return undefined
  return `translate(${cx} ${cy}) rotate(${rot}) scale(${sx} ${sy}) translate(${-cx} ${-cy})`
}

// ══════════════════════════════════════════════════════════════════════════════
// BOUQUET-EXCLUSIVE FLOWER RENDERERS
//══════════════════════════════════════════════════════════════════════════════

// ── Rose: 3-layer spiral with vein detail ─────────────────────────────────────
function BqRose({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d = dk(color, 0.20)
  const d2 = dk(color, 0.35)

  const outer = Array.from({ length: 5 }, (_, i) => {
    const a  = (i / 5) * 2 * Math.PI + 0.15
    const px = cx + Math.cos(a) * r * 0.44
    const py = cy + Math.sin(a) * r * 0.44
    const rot = a * 180 / Math.PI + (i % 2 ? -24 : 24)
    const vx2 = px + Math.cos(a) * r * 0.28
    const vy2 = py + Math.sin(a) * r * 0.28
    return (
      <g key={i}>
        <ellipse cx={px} cy={py} rx={r * 0.44} ry={r * 0.54} fill={color} opacity={0.86}
          transform={`rotate(${rot},${px},${py})`} />
        <Vein x1={px} y1={py} x2={vx2} y2={vy2} color={d2} />
      </g>
    )
  })

  const mid = Array.from({ length: 5 }, (_, i) => {
    const a  = ((i + 0.5) / 5) * 2 * Math.PI
    const px = cx + Math.cos(a) * r * 0.22
    const py = cy + Math.sin(a) * r * 0.22
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.30} ry={r * 0.38} fill={d} opacity={0.93}
      transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
  })

  const inner = Array.from({ length: 3 }, (_, i) => {
    const a  = ((i) / 3) * 2 * Math.PI + 0.8
    const px = cx + Math.cos(a) * r * 0.10
    const py = cy + Math.sin(a) * r * 0.10
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.16} ry={r * 0.22} fill={d2} opacity={0.92}
      transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
  })

  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
        <Calyx cx={cx} cy={cy} r={r} />
        {outer}{mid}{inner}
        <circle cx={cx} cy={cy - r * 0.06} r={r * 0.10} fill={d2} opacity={0.95} />
      </g>
    </Mg>
  )
}

// ── Tulip: cup of 3 petals with vein lines ────────────────────────────────────
function BqTulip({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d = dk(color, 0.22)
  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
      <Calyx cx={cx} cy={cy} r={r} />

      {/* left petal */}
      <ellipse cx={cx - r * 0.30} cy={cy} rx={r * 0.38} ry={r * 0.66}
        fill={color} opacity={0.88} transform={`rotate(-18,${cx - r * 0.30},${cy})`} />
      <Vein x1={cx - r * 0.30} y1={cy + r * 0.30} x2={cx - r * 0.22} y2={cy - r * 0.40} color={d} opacity={0.30} />

      {/* right petal */}
      <ellipse cx={cx + r * 0.30} cy={cy} rx={r * 0.38} ry={r * 0.66}
        fill={color} opacity={0.88} transform={`rotate(18,${cx + r * 0.30},${cy})`} />
      <Vein x1={cx + r * 0.30} y1={cy + r * 0.30} x2={cx + r * 0.22} y2={cy - r * 0.40} color={d} opacity={0.30} />

      {/* center petal (tallest, darker) */}
      <ellipse cx={cx} cy={cy - r * 0.06} rx={r * 0.36} ry={r * 0.72} fill={d} opacity={0.96} />
      <Vein x1={cx} y1={cy + r * 0.40} x2={cx} y2={cy - r * 0.60} color={dk(color, 0.40)} opacity={0.25} />

      {/* highlight on center petal */}
      <ellipse cx={cx - r * 0.08} cy={cy - r * 0.20} rx={r * 0.10} ry={r * 0.28}
        fill="rgba(255,255,255,0.18)" />
      </g>
    </Mg>
  )
}

// ── Sunflower: many long petals + detailed seed disc ──────────────────────────
function BqSunflower({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d = dk(color, 0.16)
  const pc = 18

  const petals = Array.from({ length: pc }, (_, i) => {
    const a   = (i / pc) * 2 * Math.PI
    const dist = r * 0.66
    const px  = cx + Math.cos(a) * dist
    const py  = cy + Math.sin(a) * dist
    const rot = a * 180 / Math.PI + 90
    const vx2 = cx + Math.cos(a) * (dist - r * 0.20)
    const vy2 = cy + Math.sin(a) * (dist - r * 0.20)
    return (
      <g key={i}>
        <ellipse cx={px} cy={py} rx={r * 0.14} ry={r * 0.40}
          fill={i % 2 === 0 ? color : d} opacity={0.93}
          transform={`rotate(${rot},${px},${py})`} />
        <Vein x1={px} y1={py} x2={vx2} y2={vy2} color={dk(color, 0.40)} opacity={0.22} />
      </g>
    )
  })

  // Inner short petals (fill gaps between outer)
  const inner = Array.from({ length: pc }, (_, i) => {
    const a   = ((i + 0.5) / pc) * 2 * Math.PI
    const dist = r * 0.50
    const px  = cx + Math.cos(a) * dist
    const py  = cy + Math.sin(a) * dist
    const rot = a * 180 / Math.PI + 90
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.10} ry={r * 0.26}
      fill={d} opacity={0.65} transform={`rotate(${rot},${px},${py})`} />
  })

  // Seed disc spiral pattern
  const seeds = Array.from({ length: 24 }, (_, i) => {
    const a  = (i / 24) * 2 * Math.PI * 2.618  // golden angle spiral
    const rd = r * 0.10 + (i / 24) * r * 0.22
    return (
      <circle key={i}
        cx={cx + Math.cos(a) * rd} cy={cy + Math.sin(a) * rd}
        r={r * 0.038}
        fill={i % 3 === 0 ? 'rgba(255,200,60,0.45)' : 'rgba(30,10,0,0.50)'} />
    )
  })

  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
        <Calyx cx={cx} cy={cy} r={r} />
        {petals}
        {inner}
        {/* Disc */}
        <circle cx={cx} cy={cy} r={r * 0.36} fill="#2C1800" />
        <circle cx={cx} cy={cy} r={r * 0.34} fill="#221200" />
        {seeds}
        {/* Disc highlight */}
        <ellipse cx={cx - r * 0.09} cy={cy - r * 0.10} rx={r * 0.09} ry={r * 0.06}
          fill="rgba(255,200,80,0.22)" />
      </g>
    </Mg>
  )
}

// ── Orchid: 5 distinct petals + labellum + integrated column ─────────────────
function BqOrchid({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d  = dk(color, 0.20)
  const d2 = dk(color, 0.38)

  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
      <Calyx cx={cx} cy={cy} r={r} />
      <ellipse cx={cx} cy={cy - r * 0.52} rx={r * 0.28} ry={r * 0.48}
        fill={color} opacity={0.88} />
      <Vein x1={cx} y1={cy - r * 0.20} x2={cx} y2={cy - r * 0.88} color={d2} opacity={0.25} />

      {/* lateral petals (wide wings) */}
      <ellipse cx={cx - r * 0.52} cy={cy - r * 0.08} rx={r * 0.48} ry={r * 0.26}
        fill={color} opacity={0.84} transform={`rotate(-22,${cx - r * 0.52},${cy - r * 0.08})`} />
      <Vein x1={cx - r * 0.12} y1={cy - r * 0.08} x2={cx - r * 0.80} y2={cy - r * 0.18}
        color={d2} opacity={0.22} />
      <ellipse cx={cx + r * 0.52} cy={cy - r * 0.08} rx={r * 0.48} ry={r * 0.26}
        fill={color} opacity={0.84} transform={`rotate(22,${cx + r * 0.52},${cy - r * 0.08})`} />
      <Vein x1={cx + r * 0.12} y1={cy - r * 0.08} x2={cx + r * 0.80} y2={cy - r * 0.18}
        color={d2} opacity={0.22} />

      {/* lateral sepals (narrow, lower) */}
      <ellipse cx={cx - r * 0.40} cy={cy + r * 0.30} rx={r * 0.20} ry={r * 0.44}
        fill={d} opacity={0.74} transform={`rotate(18,${cx - r * 0.40},${cy + r * 0.30})`} />
      <ellipse cx={cx + r * 0.40} cy={cy + r * 0.30} rx={r * 0.20} ry={r * 0.44}
        fill={d} opacity={0.74} transform={`rotate(-18,${cx + r * 0.40},${cy + r * 0.30})`} />

      {/* labellum — large lip at bottom, connects naturally */}
      <ellipse cx={cx} cy={cy + r * 0.30} rx={r * 0.40} ry={r * 0.44} fill={d} opacity={0.94} />
      {/* labellum markings */}
      <ellipse cx={cx} cy={cy + r * 0.28} rx={r * 0.14} ry={r * 0.20}
        fill={d2} opacity={0.50} />

      {/* Column: sits inside labellum — fully connected, not floating */}
      <ellipse cx={cx} cy={cy - r * 0.04} rx={r * 0.12} ry={r * 0.22}
        fill="white" opacity={0.80} />
      <ellipse cx={cx} cy={cy - r * 0.10} rx={r * 0.07} ry={r * 0.10}
        fill={d2} opacity={0.60} />
      </g>
    </Mg>
  )
}

// ── Cherry / Lily: 5 petals with notch, proper stamens ───────────────────────
function BqCherry({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d = dk(color, 0.22)
  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
      <Calyx cx={cx} cy={cy} r={r} />

      {Array.from({ length: 5 }, (_, i) => {
        const a  = (i / 5) * 2 * Math.PI - Math.PI / 2
        const px = cx + Math.cos(a) * r * 0.44
        const py = cy + Math.sin(a) * r * 0.44
        const vx2 = cx + Math.cos(a) * r * 0.80
        const vy2 = cy + Math.sin(a) * r * 0.80
        return (
          <g key={i}>
            <ellipse cx={px} cy={py} rx={r * 0.44} ry={r * 0.50}
              fill={color} opacity={0.88}
              transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
            <Vein x1={px} y1={py} x2={vx2} y2={vy2} color={d} opacity={0.26} />
          </g>
        )
      })}

      {/* Main disc */}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#FFF0A0" />
      <circle cx={cx} cy={cy} r={r * 0.14} fill="#FFD700" />

      {/* Stamens: short lines ending with a dot — fully connected to disc */}
      {Array.from({ length: 8 }, (_, i) => {
        const a  = (i / 8) * 2 * Math.PI
        const sx = cx + Math.cos(a) * r * 0.14
        const sy = cy + Math.sin(a) * r * 0.14
        const ex = cx + Math.cos(a) * r * 0.28
        const ey = cy + Math.sin(a) * r * 0.28
        return (
          <g key={i}>
            <line x1={sx} y1={sy} x2={ex} y2={ey}
              stroke="#C8860A" strokeWidth={0.9} opacity={0.80} />
            <circle cx={ex} cy={ey} r={r * 0.028} fill="#E09010" />
          </g>
        )
      })}
      </g>
    </Mg>
  )
}

// ── Peony: dense rounded ball of layered petals ───────────────────────────────
function BqPeony({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d  = dk(color, 0.18)
  const d2 = dk(color, 0.35)

  const outerPetals = [
    { dx:  0,        dy: -r * 0.30, rx: r * 0.40, ry: r * 0.52, rot:   0 },
    { dx:  r * 0.32, dy: -r * 0.14, rx: r * 0.38, ry: r * 0.50, rot:  36 },
    { dx:  r * 0.34, dy:  r * 0.20, rx: r * 0.38, ry: r * 0.48, rot:  72 },
    { dx:  r * 0.12, dy:  r * 0.38, rx: r * 0.38, ry: r * 0.50, rot:  18 },
    { dx: -r * 0.22, dy:  r * 0.34, rx: r * 0.38, ry: r * 0.48, rot: -22 },
    { dx: -r * 0.36, dy:  r * 0.14, rx: r * 0.36, ry: r * 0.50, rot: -54 },
    { dx: -r * 0.30, dy: -r * 0.22, rx: r * 0.38, ry: r * 0.50, rot: -36 },
  ]
  const midPetals = [
    { dx:  0,        dy: -r * 0.14, rx: r * 0.28, ry: r * 0.38, rot:  12 },
    { dx:  r * 0.20, dy:  r * 0.08, rx: r * 0.26, ry: r * 0.36, rot:  52 },
    { dx: -r * 0.18, dy:  r * 0.10, rx: r * 0.26, ry: r * 0.36, rot: -48 },
    { dx:  r * 0.02, dy:  r * 0.20, rx: r * 0.24, ry: r * 0.32, rot:   8 },
  ]

  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
      <Calyx cx={cx} cy={cy} r={r} />
      {outerPetals.map((p, i) => (
        <g key={i}>
          <ellipse cx={cx + p.dx} cy={cy + p.dy} rx={p.rx} ry={p.ry}
            fill={color} opacity={0.84}
            transform={`rotate(${p.rot},${cx + p.dx},${cy + p.dy})`} />
          {/* subtle vein on each outer petal */}
          <Vein
            x1={cx + p.dx * 0.3} y1={cy + p.dy * 0.3}
            x2={cx + p.dx * 0.95} y2={cy + p.dy * 0.95}
            color={d2} opacity={0.22} />
        </g>
      ))}
      {midPetals.map((p, i) => (
        <ellipse key={i} cx={cx + p.dx} cy={cy + p.dy} rx={p.rx} ry={p.ry}
          fill={d} opacity={0.90}
          transform={`rotate(${p.rot},${cx + p.dx},${cy + p.dy})`} />
      ))}
      {/* Center bud */}
      <ellipse cx={cx} cy={cy} rx={r * 0.16} ry={r * 0.22} fill={d2} opacity={0.96} />
      {/* Small stamens visible in center */}
      {Array.from({ length: 5 }, (_, i) => {
        const a  = (i / 5) * 2 * Math.PI
        const ex = cx + Math.cos(a) * r * 0.10
        const ey = cy + Math.sin(a) * r * 0.10
        return <circle key={i} cx={ex} cy={ey} r={r * 0.025} fill="#FFE066" opacity={0.80} />
      })}
      </g>
    </Mg>
  )
}

// ── Lotus: two rings of pointed petals + golden center ───────────────────────
function BqLotus({ cx, cy, r, color, delay = 0, variant = 0 }) {
  const d  = dk(color, 0.20)
  const d2 = dk(color, 0.38)

  const outer = Array.from({ length: 9 }, (_, i) => {
    const a  = (i / 9) * 2 * Math.PI
    const px = cx + Math.cos(a) * r * 0.60
    const py = cy + Math.sin(a) * r * 0.60
    const rot = a * 180 / Math.PI + 90
    return (
      <g key={i}>
        <ellipse cx={px} cy={py} rx={r * 0.19} ry={r * 0.46}
          fill={color} opacity={0.84} transform={`rotate(${rot},${px},${py})`} />
        <Vein x1={px} y1={py} x2={cx + Math.cos(a) * r * 0.30} y2={cy + Math.sin(a) * r * 0.30}
          color={d2} opacity={0.22} />
      </g>
    )
  })

  const mid = Array.from({ length: 6 }, (_, i) => {
    const a  = ((i + 0.5) / 6) * 2 * Math.PI - Math.PI / 6
    const px = cx + Math.cos(a) * r * 0.34
    const py = cy + Math.sin(a) * r * 0.34
    const rot = a * 180 / Math.PI + 90
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.16} ry={r * 0.36}
      fill={d} opacity={0.90} transform={`rotate(${rot},${px},${py})`} />
  })

  return (
    <Mg delay={delay}>
      <Shadow cx={cx} cy={cy} r={r} />
      <g transform={vt(cx, cy, variant)}>
      <Calyx cx={cx} cy={cy} r={r} />
      {outer}{mid}
      {/* Stigma receptacle */}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#FFE566" />
      <circle cx={cx} cy={cy} r={r * 0.14} fill="#FFBB00" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 2 * Math.PI
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.09} cy={cy + Math.sin(a) * r * 0.09}
          r={r * 0.028} fill="#CC8800" opacity={0.70} />
      })}
      </g>
    </Mg>
  )
}

// ── Small 5-petal accent ──────────────────────────────────────────────────────
function BqSmall({ cx, cy, r, color, delay = 0 }) {
  const d = dk(color, 0.20)
  return (
    <Mg delay={delay}>
      <Calyx cx={cx} cy={cy} r={r} />
      {Array.from({ length: 5 }, (_, i) => {
        const a  = (i / 5) * 2 * Math.PI - Math.PI / 2
        const px = cx + Math.cos(a) * r * 0.44
        const py = cy + Math.sin(a) * r * 0.44
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.44} ry={r * 0.36}
          fill={color} transform={`rotate(${a * 180 / Math.PI},${px},${py})`} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.30} fill="#FFE566" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#FFCC00" />
      {/* Small stamen dots */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * 2 * Math.PI
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.20} cy={cy + Math.sin(a) * r * 0.20}
          r={r * 0.04} fill="#E09010" opacity={0.75} />
      })}
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
  const x2  = x1 + Math.cos(rad) * length
  const y2  = y1 + Math.sin(rad) * length
  const mx  = (x1+x2)/2, my = (y1+y2)/2
  const pr  = rad + Math.PI/2
  const w   = length * 0.28
  const vc  = dk(color, 0.28)
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.6 }}>
      <path d={`M${x1} ${y1} Q${mx+Math.cos(pr)*w} ${my+Math.sin(pr)*w} ${x2} ${y2} Q${mx-Math.cos(pr)*w} ${my-Math.sin(pr)*w} ${x1} ${y1}Z`}
        fill={color} />
      {/* midrib vein */}
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={vc} strokeWidth={0.9} opacity={0.55} />
      {/* lateral veins */}
      {[0.35, 0.55, 0.72].map((t, i) => {
        const bx = x1 + (x2-x1)*t, by = y1 + (y2-y1)*t
        const lx = bx + Math.cos(pr)*w*0.55, ly = by + Math.sin(pr)*w*0.55
        const rx2 = bx - Math.cos(pr)*w*0.55, ry2 = by - Math.sin(pr)*w*0.55
        return (
          <g key={i}>
            <line x1={bx} y1={by} x2={lx} y2={ly} stroke={vc} strokeWidth={0.7} opacity={0.40} />
            <line x1={bx} y1={by} x2={rx2} y2={ry2} stroke={vc} strokeWidth={0.7} opacity={0.40} />
          </g>
        )
      })}
    </motion.g>
  )
}

function Fern({ x, y, angle, scale = 1, delay = 0 }) {
  const leaves = 12
  const length = 55 * scale
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.6 }}
      transform={`translate(${x},${y}) rotate(${angle})`}
      transformOrigin="0 0">
      {/* Central stem */}
      <line x1={0} y1={0} x2={length} y2={0} stroke="#658D5A" strokeWidth={1.5} opacity={0.8} />
      {/* Fern fronds */}
      {Array.from({ length: leaves }).map((_, i) => {
        const t = (i + 1) / (leaves + 1)
        const px = length * t
        const frondL = (1 - t) * 16 * scale + 4
        return (
          <g key={i}>
            <path d={`M${px} 0 Q${px + frondL*0.5} ${-frondL*0.5} ${px + frondL} ${-frondL} Q${px + frondL*0.2} ${-frondL*0.1} ${px} 0`} fill="#7CBF80" opacity={0.8} />
            <path d={`M${px} 0 Q${px + frondL*0.5} ${frondL*0.5} ${px + frondL} ${frondL} Q${px + frondL*0.2} ${frondL*0.1} ${px} 0`} fill="#6BAA74" opacity={0.8} />
          </g>
        )
      })}
    </motion.g>
  )
}

function Eucalyptus({ x, y, angle, scale = 1, delay = 0 }) {
  const pairs = 5
  const length = 50 * scale
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.6 }}
      transform={`translate(${x},${y}) rotate(${angle})`}
      transformOrigin="0 0">
      <line x1={0} y1={0} x2={length} y2={0} stroke="#7D988F" strokeWidth={1.8} />
      {Array.from({ length: pairs }).map((_, i) => {
        const t = (i + 0.5) / pairs
        const px = length * t
        const r = (1 - t * 0.4) * 6 * scale
        return (
          <g key={i}>
            <circle cx={px} cy={-r*0.8} r={r} fill="#88B8A6" opacity={0.9} />
            <circle cx={px} cy={r*0.8} r={r} fill="#70A090" opacity={0.9} />
            <circle cx={px + r*0.4} cy={0} r={r*0.6} fill="#A0D0BE" opacity={0.8} />
          </g>
        )
      })}
    </motion.g>
  )
}

// ── Pattern Generator (10 styles) ─────────────────────────────────────────────
// The patterns are defined as SVG <defs> and return a url(#pattern-id)
function getPatternDef(id, styleIdx, color, bg) {
  const pId = `wrap-pattern-${id}`
  const d   = dk(color, 0.4) // drawn element color
  const d2  = dk(color, 0.6)
  
  let content = null
  let w = 20, h = 20
  
  switch(styleIdx) {
    case 0: // Small dots
      w = 32; h = 32
      content = <circle cx={16} cy={16} r={2.5} fill={d} opacity={0.25} />
      break
    case 1: // Diagonal stripes
      w = 40; h = 40
      content = <path d="M-10,50 L50,-10 M30,70 L70,30 M-30,10 L10,-30" stroke={d} strokeWidth={3} opacity={0.15} />
      break
    case 2: // Gingham / Plaid
      w = 50; h = 50
      content = (
        <g opacity={0.15}>
          <rect width={30} height={10} fill={d} />
          <rect width={10} height={30} fill={d} />
        </g>
      )
      break
    case 3: // Hearts
      w = 46; h = 46
      content = (
        <path d="M23 18 A6 6 0 0 0 11 20 A6 6 0 0 0 23 32 A6 6 0 0 0 35 20 A6 6 0 0 0 23 18 Z" fill={d} opacity={0.2} />
      )
      break
    case 4: // Chevron
      w = 60; h = 30
      content = (
        <path d="M0,15 L15,30 L45,0 L60,15" stroke={d} strokeWidth={3} fill="none" opacity={0.2} strokeLinecap="round" strokeLinejoin="round" />
      )
      break
    case 5: // Diamonds (Harlequin)
      w = 24; h = 36
      content = (
        <g opacity={0.18}>
          <path d="M12,0 L24,18 L12,36 L0,18 Z" fill={d} />
          <path d="M12,0 L24,18 L12,36 L0,18 Z" stroke={bg} strokeWidth={2} fill="none" />
        </g>
      )
      break
    case 6: // Floral / Starburst
      w = 32; h = 32
      content = (
        <g stroke={d} strokeWidth={2} strokeLinecap="round" opacity={0.25}>
          <line x1={8} y1={16} x2={24} y2={16} />
          <line x1={16} y1={8} x2={16} y2={24} />
          <line x1={10.5} y1={10.5} x2={21.5} y2={21.5} />
          <line x1={10.5} y1={21.5} x2={21.5} y2={10.5} />
          <circle cx={16} cy={16} r={3} fill={bg} />
        </g>
      )
      break
    case 7: // Waves
      w = 30; h = 15
      content = (
        <path d="M0,7.5 Q7.5,15 15,7.5 T30,7.5" stroke={d} strokeWidth={2} fill="none" opacity={0.3} strokeLinecap="round" />
      )
      break
    case 8: // Honeycomb / Hexagon
      w = 51.96; h = 90
      content = (
        <g stroke={d} strokeWidth={2} fill="none" opacity={0.2}>
          <path d="M25.98,15 L51.96,30 L51.96,60 L25.98,75 L0,60 L0,30 Z" />
          <path d="M25.98,-30 L51.96,-15 L51.96,15 L25.98,30 L0,15 L0,-15 Z" />
          <path d="M25.98,60 L51.96,75 L51.96,105 L25.98,120 L0,105 L0,75 Z" />
        </g>
      )
      break
    case 9: // Soft Curved Lines (Horizontal Swirls)
      w = 60; h = 30
      content = (
        <path d="M0,15 C20,0 40,30 60,15" stroke={d} strokeWidth={2} fill="none" opacity={0.3} strokeLinecap="round" />
      )
      break
  }
  
  return {
    id: pId,
    def: (
      <pattern id={pId} width={w} height={h} patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
        <rect width={w} height={h} fill={bg} />
        {content}
      </pattern>
    )
  }
}

// ── Stems (thin lines above wrap zone) ───────────────────────────────────────
function Stems({ flowers, gatherX, gatherY }) {
  return (
    <g>
      {flowers.map((f, i) => (
        <line key={i}
          x1={f.cx} y1={f.cy + (f.r || 12) * 0.85}
          x2={gatherX} y2={gatherY}
          stroke="#4A8C58" strokeWidth={2.0} strokeLinecap="round" opacity={0.58} />
      ))}
    </g>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// BOUQUET WRAP SYSTEM
// part='back'  → renders BEFORE flowers (large cone sits behind them)
// part='front' → renders AFTER flowers  (fold edge + bow, in front of lower flowers)
// This creates the illusion the paper wraps around the whole bouquet (see ref img 2)
// ═══════════════════════════════════════════════════════════════════════════

function Bow({ cx, cy, bowColor, bowDark, bowLight, delay = 1.8 }) {
  const t1 = `M${cx} ${cy} C${cx-16} ${cy+24} ${cx-24} ${cy+50} ${cx-18} ${cy+72}`
  const t2 = `M${cx} ${cy} C${cx+16} ${cy+24} ${cx+24} ${cy+50} ${cx+18} ${cy+72}`
  const lp = `M${cx} ${cy} C${cx-44} ${cy-34} ${cx-72} ${cy-6} ${cx-48} ${cy+24} C${cx-26} ${cy+48} ${cx-8} ${cy+16} ${cx} ${cy}Z`
  const rp = `M${cx} ${cy} C${cx+44} ${cy-34} ${cx+72} ${cy-6} ${cx+48} ${cy+24} C${cx+26} ${cy+48} ${cx+8} ${cy+16} ${cx} ${cy}Z`
  return (
    <motion.g {...SVG_ANIM}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 130, damping: 14 }}
      style={svgStyle}>
      <path d={t1} stroke={bowColor} strokeWidth={6.5} strokeLinecap="round" fill="none" />
      <path d={t2} stroke={bowColor} strokeWidth={6.5} strokeLinecap="round" fill="none" />
      <path d={t1} stroke={bowLight} strokeWidth={3}   strokeLinecap="round" fill="none" opacity={0.55} />
      <path d={t2} stroke={bowLight} strokeWidth={3}   strokeLinecap="round" fill="none" opacity={0.55} />
      <path d={lp} fill={bowColor} />
      <path d={rp} fill={bowColor} />
      <path d={`M${cx} ${cy} C${cx-26} ${cy-8} ${cx-46} ${cy+10} ${cx-34} ${cy+26} C${cx-20} ${cy+40} ${cx-6} ${cy+22} ${cx} ${cy}Z`}
        fill={bowDark} opacity={0.30} />
      <path d={`M${cx} ${cy} C${cx+26} ${cy-8} ${cx+46} ${cy+10} ${cx+34} ${cy+26} C${cx+20} ${cy+40} ${cx+6} ${cy+22} ${cx} ${cy}Z`}
        fill={bowDark} opacity={0.30} />
      <path d={`M${cx-38} ${cy-6} C${cx-32} ${cy-18} ${cx-16} ${cy-20} ${cx-6} ${cy-13}`}
        stroke={bowLight} strokeWidth={2.5} fill="none" opacity={0.48} strokeLinecap="round" />
      <path d={`M${cx+38} ${cy-6} C${cx+32} ${cy-18} ${cx+16} ${cy-20} ${cx+6} ${cy-13}`}
        stroke={bowLight} strokeWidth={2.5} fill="none" opacity={0.48} strokeLinecap="round" />
      <ellipse cx={cx} cy={cy} rx={9} ry={7} fill={bowColor} />
    </motion.g>
  )
}

// Paper cone geometry helper
// bTopY = back panel top (high, behind flowers)
// fTopY = front fold top (lower, only covers foreground)
// bottY = paper bottom neck
// bHW = back half-width, nHW = neck half-width
function coneGeom(bX, bTopY, fTopY, bottY, bHW, nHW) {
  // front half-width interpolated from back at fTopY level
  const t   = (fTopY - bTopY) / (bottY - bTopY)
  const fHW = bHW * (1 - t) + nHW * t
  // Back part is rounder and taller
  const bCurveY = bTopY - 75
  // Front part is cut down (dips deeper) to reveal flowers
  const fDipY = fTopY + 45
  
  return {
    back:  `M${bX-bHW} ${bTopY+10} C${bX-bHW} ${bCurveY} ${bX+bHW} ${bCurveY} ${bX+bHW} ${bTopY+10} L${bX+nHW+8} ${bottY} L${bX-nHW-8} ${bottY} Z`,
    front: `M${bX-fHW-8} ${fTopY} Q${bX} ${fDipY} ${bX+fHW+8} ${fTopY} L${bX+nHW+2} ${bottY} L${bX-nHW-2} ${bottY} Z`,
    fTopY, fHW, fDipY, nHW
  }
}

// ── Style 0: Classic — ribbon cross-bands, no paper (back=null)  ─────────────
function WrapClassic({ gatherX, gatherY, CH, delay, part }) {
  const bY = gatherY + (CH - gatherY) * 0.20
  if (part === 'back') return null
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}>
      {[0, 0.22, 0.44, 0.66, 0.86].map((t, i) => {
        const y  = gatherY + t * (bY - gatherY)
        const sp = 14 - t * 8
        return (
          <line key={i}
            x1={gatherX - sp} y1={y - 4 + i*2}
            x2={gatherX + sp} y2={y + 4 - i*2}
            stroke={i % 2 ? '#4A8C58' : '#6BAA74'}
            strokeWidth={5} strokeLinecap="round" opacity={0.55} />
        )
      })}
      <Bow cx={gatherX} cy={bY}
        bowColor="#F4A261" bowDark="#C77B35" bowLight="#FFD49A" delay={delay} />
    </motion.g>
  )
}

// ── Style 1: Kraft paper cone ─────────────────────────────────────────────────
function WrapKraft({ gatherX, gatherY, CH, delay, part, seed }) {
  const bX    = gatherX
  const bTopY = 130, fTopY = 238, bottY = 400, nHW = 22
  const geom  = coneGeom(bX, bTopY, fTopY, bottY, 145, nHW)
  const paper = '#C9965A', shade = '#A87840', hi = '#E8C07A'
  const bowY  = bottY - 18
  const fHW   = geom.fHW

  const pattern = getPatternDef('kraft', seed % 10, shade, paper)

  if (part === 'back') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.4, duration: 0.8 }}>
        <defs>{pattern.def}</defs>
        <path d={geom.back} fill="rgba(0,0,0,0.06)" transform="translate(4,6)" />
        <path d={geom.back} fill={shade} opacity={0.94} />
      </motion.g>
    )
  }
  
  if (part === 'middle') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.8, duration: 0.5 }}>
        {/* main front body using pattern */}
        <path d={geom.front} fill={`url(#${pattern.id})`} />

        {/* fold highlight arc */}
        <path d={`M${bX-fHW-8} ${fTopY} Q${bX} ${geom.fDipY} ${bX+fHW+8} ${fTopY}`}
          stroke={hi} strokeWidth={4} fill="none" opacity={0.65} strokeLinecap="round" />
      </motion.g>
    )
  }
  
  if (part === 'front') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}>
        <ellipse cx={bX} cy={bowY} rx={geom.nHW} ry={6} fill={shade} opacity={0.5} />
        <Bow cx={bX} cy={bowY}
          bowColor="#8B6914" bowDark="#5A4008" bowLight="#D4A830" delay={delay} />
      </motion.g>
    )
  }
  return null
}

// ── Style 2: Romantic pink ruffled paper ─────────────────────────────────────
function WrapRomantic({ gatherX, gatherY, CH, delay, part, seed }) {
  const bX    = gatherX
  const bTopY = 125, fTopY = 236, bottY = 402, nHW = 22
  const geom  = coneGeom(bX, bTopY, fTopY, bottY, 148, nHW)
  const pBack = '#F093AA', pFront = '#FFB7C5', pHi = '#FFD6E0'
  const bowY  = bottY - 18
  const fHW   = geom.fHW

  const pattern = getPatternDef('romantic', seed % 10, '#E885A1', pFront)

  if (part === 'back') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.4, duration: 0.8 }}>
        <defs>{pattern.def}</defs>
        <path d={geom.back} fill="rgba(0,0,0,0.05)" transform="translate(4,6)" />
        <path d={geom.back} fill={pBack} opacity={0.89} />
      </motion.g>
    )
  }
  
  if (part === 'middle') {
    const ruffles = Array.from({ length: 9 }, (_, i) => {
      const x = bX - fHW - 4 + i * ((fHW * 2 + 8) / 8);
      const t = i / 8;
      const y = fTopY * (1-t)*(1-t) + geom.fDipY * 2 * (1-t) * t + fTopY * t*t;
      return { x, y: y + (i % 2 === 0 ? 0 : -9) };
    })
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.8, duration: 0.5 }}>
        <path d={geom.front} fill={`url(#${pattern.id})`} />
  
        {ruffles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={7}
            fill={i % 2 ? pFront : pHi} opacity={0.72} />
        ))}
        <path d={`M${bX-fHW-8} ${fTopY} Q${bX} ${geom.fDipY} ${bX+fHW+8} ${fTopY}`}
          stroke={pHi} strokeWidth={4} fill="none" opacity={0.72} strokeLinecap="round" />
      </motion.g>
    )
  }

  if (part === 'front') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}>
        <ellipse cx={bX} cy={bowY} rx={geom.nHW} ry={6} fill={pBack} opacity={0.3} />
        <Bow cx={bX} cy={bowY}
          bowColor="#FF7EB6" bowDark="#CC4488" bowLight="#FFD0E8" delay={delay} />
      </motion.g>
    )
  }
  return null
}

// ── Style 3: Elegant dark paper + gold bow ───────────────────────────────────
function WrapElegant({ gatherX, gatherY, CH, delay, part, seed }) {
  const bX    = gatherX
  const bTopY = 125, fTopY = 236, bottY = 398, nHW = 22
  const geom  = coneGeom(bX, bTopY, fTopY, bottY, 142, nHW)
  const dark  = '#1C3D28', shade = '#142D1E', gold = '#D4A830'
  const bowY  = bottY - 18
  const fHW   = geom.fHW

  const pattern = getPatternDef('elegant', seed % 10, '#10241A', dark)

  if (part === 'back') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.4, duration: 0.8 }}>
        <defs>{pattern.def}</defs>
        <path d={geom.back} fill="rgba(0,0,0,0.09)" transform="translate(4,6)" />
        <path d={geom.back} fill={shade} />
      </motion.g>
    )
  }
  
  if (part === 'middle') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.8, duration: 0.5 }}>
        <path d={geom.front} fill={`url(#${pattern.id})`} />
  
        <path d={`M${bX-fHW-8} ${fTopY} Q${bX} ${geom.fDipY} ${bX+fHW+8} ${fTopY}`}
          stroke={gold} strokeWidth={2} fill="none" opacity={0.78} />
      </motion.g>
    )
  }
  if (part === 'front') {
    return (
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}>
        <ellipse cx={bX} cy={bowY} rx={geom.nHW} ry={6} fill={shade} opacity={0.3} />
        <ellipse cx={bX} cy={bowY} rx={geom.nHW} ry={6} stroke={gold} strokeWidth={1.5} fill="none" opacity={0.80} />
        <Bow cx={bX} cy={bowY}
          bowColor={gold} bowDark="#8B6914" bowLight="#F4D580" delay={delay} />
      </motion.g>
    )
  }
  return null
}
// Dispatcher
const WRAP_STYLES = [WrapKraft, WrapRomantic, WrapElegant]



// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT
// ══════════════════════════════════════════════════════════════════════════════
// variant: 0=front  1=lean-L  2=top  3=lean-R  4=side
// Ordered BACK→FRONT so SVG paint order creates natural occlusion.
const FLOWER_POSITIONS = [
  // ── layer 0: deepest back (smallest, top of dome) ──────────────────────────
  { cx: 170, cy:  55, r: 28, delay: 0.08, variant: 2 },  // apex top-center
  { cx: 110, cy:  72, r: 25, delay: 0.11, variant: 1 },  // apex left
  { cx: 228, cy:  66, r: 25, delay: 0.14, variant: 3 },  // apex right
  { cx:  58, cy:  90, r: 21, delay: 0.06, variant: 4 },  // far-left side
  { cx: 278, cy:  84, r: 20, delay: 0.09, variant: 4 },  // far-right side
  // ── layer 1: mid-back ──────────────────────────────────────────────────────
  { cx: 168, cy: 112, r: 32, delay: 0.18, variant: 2 },  // mid-back center
  { cx:  98, cy: 118, r: 29, delay: 0.22, variant: 1 },  // mid-back left
  { cx: 240, cy: 112, r: 29, delay: 0.25, variant: 3 },  // mid-back right
  // ── layer 2: mid ───────────────────────────────────────────────────────────
  { cx:  66, cy: 158, r: 32, delay: 0.30, variant: 1 },  // mid-left
  { cx: 258, cy: 151, r: 31, delay: 0.33, variant: 3 },  // mid-right
  { cx: 162, cy: 146, r: 36, delay: 0.28, variant: 2 },  // mid-center
  // ── layer 3: mid-front ─────────────────────────────────────────────────────
  { cx: 114, cy: 196, r: 34, delay: 0.38, variant: 1 },  // mid-front left
  { cx: 218, cy: 190, r: 33, delay: 0.40, variant: 3 },  // mid-front right
  { cx: 166, cy: 189, r: 37, delay: 0.36, variant: 0 },  // mid-front center
  // ── layer 4: foreground (largest, fully visible) ────────────────────────────
  { cx:  92, cy: 235, r: 38, delay: 0.50, variant: 0 },  // front left
  { cx: 244, cy: 228, r: 37, delay: 0.52, variant: 0 },  // front right
  { cx: 168, cy: 250, r: 43, delay: 0.46, variant: 0 },  // front center (hero)
]
const SMALL_POSITIONS = [
  { cx:  28, cy: 150, r: 13, delay: 0.20 },  // far-left accent
  { cx: 306, cy: 157, r: 12, delay: 0.22 },  // far-right accent
  { cx: 146, cy:  28, r: 12, delay: 0.05 },  // top-center accent
  { cx:  62, cy:  48, r: 10, delay: 0.04 },  // top-left accent
  { cx: 270, cy:  44, r: 10, delay: 0.05 },  // top-right accent
  { cx:  40, cy: 205, r: 11, delay: 0.35 },  // lower-left accent
  { cx: 295, cy: 198, r: 10, delay: 0.36 },  // lower-right accent
  { cx: 132, cy:  50, r: 9,  delay: 0.06 },  // inner-top-left
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

const FERN_POSITIONS = [
  { x: 74, y: 154, angle: -125, scale: 1.1, delay: 0.1 },
  { x: 265, y: 148, angle: -55, scale: 1.2, delay: 0.15 },
  { x: 125, y: 65, angle: -105, scale: 0.9, delay: 0.08 },
  { x: 200, y: 60, angle: -70, scale: 0.85, delay: 0.12 },
]

const EUCALYPTUS_POSITIONS = [
  { x: 60, y: 110, angle: -140, scale: 1.2, delay: 0.1 },
  { x: 280, y: 105, angle: -35, scale: 1.1, delay: 0.12 },
  { x: 165, y: 40, angle: -85, scale: 0.9, delay: 0.05 },
]

const DEFAULT_TYPES  = ['rose', 'cherry', 'sunflower', 'tulip', 'peony']
const DEFAULT_COLORS = ['#FF4757', '#FF85A1', '#FFD166', '#FF7EB6', '#FF6B9D']
const GATHER_X = CW / 2, GATHER_Y = 308

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function BouquetDisplay({ selectedFlowers }) {
  const count = selectedFlowers?.length || 0

  const flowerTypes = useMemo(() => {
    if (!count) return DEFAULT_TYPES.map((t, i) => ({ svgType: t, colorHex: DEFAULT_COLORS[i] }))
    return selectedFlowers.map(sf => {
      const cat = flowerCatalog.find(f => f.id === sf.flowerId) || flowerCatalog[0]
      return { svgType: cat.svgType, colorHex: sf.colorHex }
    })
  }, [selectedFlowers, count])

  const mainFlowers = useMemo(() =>
    FLOWER_POSITIONS.map((pos, i) => {
      const ft = flowerTypes[i % flowerTypes.length]
      return { ...pos, svgType: ft.svgType, colorHex: ft.colorHex }
    })
  , [flowerTypes])

  const smallFlowers = useMemo(() =>
    SMALL_POSITIONS.map((pos, i) => {
      const ft = flowerTypes[i % flowerTypes.length]
      return { ...pos, colorHex: ft.colorHex }
    })
  , [flowerTypes])

  const berryColors = useMemo(() =>
    BERRY_POSITIONS.map(b => ({ ...b, color: flowerTypes[b.colorIdx % flowerTypes.length].colorHex }))
  , [flowerTypes])

  // Pick wrap style from selection hash or random on first render
  const wrapStyle = useMemo(() => {
    const seed = (selectedFlowers?.length || 0) + (selectedFlowers?.[0]?.flowerId?.charCodeAt(0) || 0)
    return seed % WRAP_STYLES.length
  }, [selectedFlowers])

  const WrapComponent = WRAP_STYLES[wrapStyle]
  const WRAP_TOP_Y = 282   // where paper wrap top edge sits (just below flowers)

  const SPARKS = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left:  `${10 + (i * 19) % 78}%`,
    top:   `${8  + (i * 13) % 74}%`,
    size:  3 + i % 3,
    color: flowerTypes[i % flowerTypes.length].colorHex,
    dur:   2.5 + i * 0.3,
    dly:   i * 0.45,
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

          {/* ── WRAP BACK (paper behind flowers) ── */}
          <WrapComponent part="back"
            gatherX={GATHER_X} gatherY={GATHER_Y} CH={CH} delay={1.4} seed={count + (selectedFlowers?.[0]?.flowerId?.charCodeAt(0) || 0)} />

          <Stems flowers={[...mainFlowers, ...smallFlowers]} gatherX={GATHER_X} gatherY={GATHER_Y} />

          {/* Draw back greenery first */}
          {FERN_POSITIONS.map((f, i) => <Fern key={`fn-${i}`} {...f} />)}
          {EUCALYPTUS_POSITIONS.map((e, i) => <Eucalyptus key={`eu-${i}`} {...e} />)}

          {LEAF_DEFS.map((l, i) => (
            <Leaf key={i} {...l}
              color={i % 3 === 0 ? '#5E9B62' : i % 3 === 1 ? '#7CBF80' : '#4A7D50'} />
          ))}

          {berryColors.map((b, i) => <BerrySpray key={i} {...b} />)}

          {smallFlowers.map((f, i) => (
            <BqSmall key={i} cx={f.cx} cy={f.cy} r={f.r} color={f.colorHex} delay={f.delay} />
          ))}

          {/* Only draw back/mid flowers here. Foreground flowers > 210y go AFTER middle wrap */}
          {mainFlowers.filter(f => f.cy <= 210).map((f, i) => {
            const R = RENDERERS[f.svgType] || RENDERERS.rose
            return <R key={`bg-${i}`} cx={f.cx} cy={f.cy} r={f.r} color={f.colorHex} delay={f.delay} variant={f.variant} />
          })}

          {/* ── WRAP MIDDLE (large piece in front of back flowers, but behind bottom flowers) ── */}
          <WrapComponent part="middle"
            gatherX={GATHER_X} gatherY={GATHER_Y} CH={CH} delay={1.5} seed={count + (selectedFlowers?.[0]?.flowerId?.charCodeAt(0) || 0)} />

          {/* ── Foreground flowers rendering on top of the 'middle' wrap ── */}
          {mainFlowers.filter(f => f.cy > 210).map((f, i) => {
            const R = RENDERERS[f.svgType] || RENDERERS.rose
            return <R key={`fg-${i}`} cx={f.cx} cy={f.cy} r={f.r} color={f.colorHex} delay={f.delay + 0.1} variant={f.variant} />
          })}

          {/* ── WRAP FRONT (ribbon and bow, fully on top of everything) ── */}
          <WrapComponent part="front"
            gatherX={GATHER_X} gatherY={GATHER_Y} CH={CH} delay={1.6} seed={count + (selectedFlowers?.[0]?.flowerId?.charCodeAt(0) || 0)} />
        </svg>

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
