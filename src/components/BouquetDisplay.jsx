import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FLOWER_SVGS } from './Flower'
import { flowerCatalog } from '../data/bouquet'

// ─── Circular cluster layout ───────────────────────────────────────────────
// cx, cy = flower-HEAD center as % of container (320×320 CSS px).
// sq      = flower element side in px (square, viewBox 100×100).
// The SVG flower head lies at ~(50%, 44%) of the square element.
// We anchor on the head: transform `translate(-50%, -44%)` maps cx/cy → head.
//
// Rings centred at (50%, 48%):
//   centre   r = 0
//   inner    r ≈ 40% (128px)   → tight overlap with centre
//   outer    r ≈ 72% (230px)   → fills the 320px circle
const DEG = Math.PI / 180

function ring(n, rPct, sqPx, zBase, delayBase) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i * 360 / n - 90) * DEG   // start at top
    return {
      cx: 50 + rPct * Math.cos(angle),
      cy: 48 + rPct * Math.sin(angle),
      sq: sqPx,
      z:  zBase + (i % 2),
      rot: (Math.random() - 0.5) * 30 | 0,   // gentle random tilt ‑15..+15
      delay: delayBase + i * 0.06,
    }
  })
}

// Three rings — deliberately seeded so rotations are deterministic
const RING_0 = [{ cx: 50, cy: 48, sq: 118, z: 30, rot:  0, delay: 0.00 }]
const RING_1 = [
  { cx: 50,  cy: 21, sq: 98, z: 25, rot: -8,  delay: 0.08 },   // top
  { cx: 73,  cy: 30, sq: 96, z: 24, rot: 18,  delay: 0.14 },   // top-right
  { cx: 79,  cy: 58, sq: 94, z: 23, rot: 26,  delay: 0.20 },   // right
  { cx: 62,  cy: 76, sq: 94, z: 24, rot: 14,  delay: 0.18 },   // bottom-right
  { cx: 38,  cy: 76, sq: 94, z: 23, rot: -14, delay: 0.16 },   // bottom-left
  { cx: 21,  cy: 58, sq: 96, z: 24, rot: -26, delay: 0.12 },   // left
  { cx: 27,  cy: 30, sq: 96, z: 25, rot: -20, delay: 0.10 },   // top-left
]
const RING_2 = [
  { cx: 50,  cy:  3, sq: 76, z: 14, rot:  6,  delay: 0.30 },
  { cx: 72,  cy:  9, sq: 74, z: 13, rot: 22,  delay: 0.36 },
  { cx: 89,  cy: 27, sq: 74, z: 13, rot: 34,  delay: 0.40 },
  { cx: 94,  cy: 51, sq: 74, z: 12, rot: 40,  delay: 0.45 },
  { cx: 84,  cy: 74, sq: 76, z: 13, rot: 30,  delay: 0.42 },
  { cx: 64,  cy: 89, sq: 76, z: 13, rot: 16,  delay: 0.38 },
  { cx: 50,  cy: 94, sq: 76, z: 14, rot:  4,  delay: 0.34 },
  { cx: 36,  cy: 89, sq: 76, z: 13, rot: -16, delay: 0.37 },
  { cx: 16,  cy: 74, sq: 76, z: 13, rot: -30, delay: 0.43 },
  { cx:  6,  cy: 51, sq: 74, z: 12, rot: -40, delay: 0.47 },
  { cx: 11,  cy: 27, sq: 74, z: 13, rot: -34, delay: 0.44 },
  { cx: 28,  cy:  9, sq: 74, z: 13, rot: -24, delay: 0.33 },
]

const ALL_POSITIONS = [...RING_2, ...RING_1, ...RING_0]   // back → front in z
const SORTED = [...ALL_POSITIONS].sort((a, b) => a.z - b.z)

// Stable sparkles
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${12 + (i * 17) % 76}%`,
  top:  `${10 + (i * 11) % 72}%`,
  size: 3 + (i % 3) * 2,
  cIdx: i % 5,
  dur:  2.2 + i * 0.30,
  dly:  i * 0.40,
}))

// ─── Component ────────────────────────────────────────────────────────────
export default function BouquetDisplay({ selectedFlowers }) {
  const count = selectedFlowers?.length || 0

  const accentColor = useMemo(() => {
    if (!count) return '#FF7EB6'
    return flowerCatalog.find(f => f.id === selectedFlowers[0].flowerId)?.defaultColor || '#FF7EB6'
  }, [selectedFlowers, count])

  const mapped = useMemo(() => {
    if (!count) return []
    return SORTED.map((pos, i) => {
      const sf  = selectedFlowers[i % count]
      const cat = flowerCatalog.find(f => f.id === sf.flowerId) || flowerCatalog[0]
      return { ...pos, idx: i, Shape: FLOWER_SVGS[cat.svgType] || FLOWER_SVGS.rose, color: sf.colorHex, secondary: cat.secondary }
    })
  }, [selectedFlowers, count])

  const pColors = useMemo(() => [accentColor, '#FDE68A', '#A78BFA', '#6EE7B7', '#FFB7C5'], [accentColor])

  // Total 1 + 7 + 12 = 20 positions; container 320×320 px
  const CW = 320, CH = 320

  return (
    <motion.div
      className="relative shrink-0 select-none"
      style={{ width: CW, height: CH }}
      initial={{ opacity: 0, scale: 0.55, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.0, type: 'spring', stiffness: 70, damping: 14 }}
    >
      <motion.div
        style={{ width: CW, height: CH, position: 'relative' }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Scale-up on desktop */}
        <div className="md:scale-[1.18] md:origin-top-left" style={{ width: CW, height: CH, position: 'relative' }}>

          {/* Background radial glow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: CW + 60, height: CH + 60,
              left: -30, top: -30,
              background: `radial-gradient(circle at 50% 48%, ${accentColor}48 0%, transparent 62%)`,
              filter: 'blur(36px)',
            }}
            animate={{ scale: [0.86, 1.14, 0.86], opacity: [0.34, 0.66, 0.34] }}
            transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Soft white bloom in center */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 180, height: 160, left: 70, top: 60,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.52) 0%, transparent 70%)',
              filter: 'blur(18px)',
            }}
          />

          {/* ── Circular clipping wrapper ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              // Clean circle clip — all flowers contained within this circle
              clipPath: `ellipse(${CW * 0.50}px ${CH * 0.50}px at 50% 48%)`,
            }}
          >
            {/* ── Flowers: back-to-front ── */}
            <AnimatePresence>
              {mapped.map((fl) => {
                const { Shape, idx, cx, cy, sq, z, rot, delay, color, secondary } = fl
                const t = (z - 12) / 18           // 0 → back, 1 → front
                const brightness  = 0.76 + t * 0.24
                const saturation  = 0.70 + t * 0.30
                const opacity     = 0.60 + t * 0.40

                return (
                  <motion.div
                    key={idx}
                    style={{
                      position: 'absolute',
                      // Anchor transform on head center (50%, 44% of sq)
                      left: `${cx}%`,
                      top:  `${cy}%`,
                      width:  sq,
                      height: sq,
                      zIndex: z,
                      // translate(-50%, -44%) puts the head center at (cx%, cy%)
                      transform: `translate(-50%, -44%) rotate(${rot}deg)`,
                      transformOrigin: '50% 44%',
                      filter: `brightness(${brightness}) saturate(${saturation}) drop-shadow(0 3px 6px rgba(0,0,0,0.14))`,
                      opacity,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity }}
                    transition={{ delay, duration: 0.85, type: 'spring', stiffness: 95, damping: 13 }}
                  >
                    {/* per-flower gentle sway */}
                    <motion.div
                      style={{ width: '100%', height: '100%', transformOrigin: '50% 44%' }}
                      animate={{ rotate: [-1.2, 1.2, -1.2] }}
                      transition={{ duration: 3.8 + idx * 0.35, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.22 }}
                    >
                      <Shape color={color} secondary={secondary} isBlooomed={true} />
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Sparkles (outside clip so they float freely) */}
          {SPARKS.map(p => (
            <motion.div key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size, height: p.size,
                background: pColors[p.cIdx],
                left: p.left, top: p.top,
                filter: 'blur(1.5px)', zIndex: 50,
              }}
              animate={{ y: [0, -22, 0], opacity: [0, 0.80, 0], scale: [0.7, 1.4, 0.7] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.dly, ease: 'easeInOut' }}
            />
          ))}

          {/* Floating petals */}
          {(selectedFlowers || []).slice(0, 5).map((sf, i) => {
            const cat = flowerCatalog.find(f => f.id === sf.flowerId)
            if (!cat) return null
            return (
              <motion.span key={i}
                className="absolute pointer-events-none select-none text-lg"
                style={{ left: `${15 + i * 16}%`, top: '-10%', zIndex: 55 }}
                animate={{ y: ['0%', '130%'], opacity: [0, 0.60, 0], rotate: [0, 380] }}
                transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 1.0, ease: 'linear' }}
              >
                {cat.emoji}
              </motion.span>
            )
          })}

        </div>
      </motion.div>
    </motion.div>
  )
}
