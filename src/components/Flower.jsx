import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Organic stem + branch system ─────────────────────────────────────────────
// Designed for the shared 0 0 100 100 viewBox.
// Stem base y≈92, stem top y≈64; flower head sits above that.
const _LEAF_D = 'M0 0 C-4.5 -3 -4 -9 0 -12 C4 -9 4.5 -3 0 0'
const _VEIN_D = 'M0 -1 L0 -10'
const _SC     = '#2d6a4f'

// Helper: darken a hex color roughly
const dk = (hex, amt = 0.2) => {
  if (!hex || hex[0] !== '#') return hex
  let r = parseInt(hex.slice(1,3), 16)
  let g = parseInt(hex.slice(3,5), 16)
  let b = parseInt(hex.slice(5,7), 16)
  r = Math.max(0, Math.floor(r * (1 - amt)))
  g = Math.max(0, Math.floor(g * (1 - amt)))
  b = Math.max(0, Math.floor(b * (1 - amt)))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

function LeafNode({ x, y, rot, sz, fill, delay }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <motion.g
        style={{ transformOrigin: '0px 0px' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: sz, opacity: 1 }}
        transition={{ duration: 0.46, ease: [0.34, 1.56, 0.64, 1], delay }}
      >
        <path d={_LEAF_D} fill={fill} stroke={_SC} strokeWidth="0.65" />
        <path d={_VEIN_D} stroke={_SC} strokeWidth="0.5" fill="none" opacity="0.5" />
      </motion.g>
    </g>
  )
}

function OrganicStem() {
  return (
    <g>
      {/* Main stem — gentle S-curve, slightly thicker at base */}
      <motion.path
        d="M50 92 C48.5 83 51.5 76 49.5 64"
        stroke={_SC} strokeWidth="2.8" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      />

      {/* Branch 1 — lower-left, longest */}
      <motion.path
        d="M49 81 C42 77 34 74 28 67"
        stroke={_SC} strokeWidth="1.85" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.52, ease: 'easeOut', delay: 0.20 }}
      />
      <motion.circle cx="49" cy="81" r="1.4" fill={_SC}
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
        transition={{ delay: 0.20, duration: 0.22 }} />
      <LeafNode x={40} y={77} rot={-50}  sz={1.00} fill="#52b788" delay={0.42} />
      <LeafNode x={34} y={73} rot={130}  sz={0.88} fill="#40916c" delay={0.60} />
      <LeafNode x={28} y={67} rot={-55}  sz={0.72} fill="#52b788" delay={0.74} />

      {/* Branch 2 — mid-right */}
      <motion.path
        d="M50 72 C57 68 63 65 70 58"
        stroke={_SC} strokeWidth="1.60" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.48, ease: 'easeOut', delay: 0.36 }}
      />
      <motion.circle cx="50" cy="72" r="1.3" fill={_SC}
        initial={{ opacity: 0 }} animate={{ opacity: 0.52 }}
        transition={{ delay: 0.36, duration: 0.22 }} />
      <LeafNode x={58} y={68} rot={50}   sz={0.92} fill="#40916c" delay={0.58} />
      <LeafNode x={63} y={63} rot={-130} sz={0.78} fill="#52b788" delay={0.76} />

      {/* Branch 3 — small upper-left */}
      <motion.path
        d="M49 67 C44 64 40 61 36 56"
        stroke={_SC} strokeWidth="1.30" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.40, ease: 'easeOut', delay: 0.52 }}
      />
      <motion.circle cx="49" cy="67" r="1.1" fill={_SC}
        initial={{ opacity: 0 }} animate={{ opacity: 0.48 }}
        transition={{ delay: 0.52, duration: 0.20 }} />
      <LeafNode x={43} y={63} rot={130}  sz={0.70} fill="#52b788" delay={0.73} />
      <LeafNode x={36} y={57} rot={-50}  sz={0.60} fill="#40916c" delay={0.88} />
    </g>
  )
}

// ─── Botanical SVG library ─────────────────────────────────────────────────────
// All viewBox "0 0 100 100".
// Watercolor-botanical style: layered petals, soft gradients, organic irregular shapes,
// inner shading, subtle highlight veins, darker center.

export const FLOWER_SVGS = {

  // ── ROSE ──────────────────────────────────────────────────────────────────
  rose: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FF4D6D'
    const s = secondary || '#FF8FA3'
    const dark = `${c}cc`
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 4px 8px rgba(0,0,0,0.28))' }}>
        <defs>
          <radialGradient id={`rGO${id}`} cx="36%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.65" />
            <stop offset="38%"  stopColor={s}    stopOpacity="0.85" />
            <stop offset="72%"  stopColor={c}    stopOpacity="1" />
            <stop offset="100%" stopColor={dark}  stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`rGI${id}`} cx="42%" cy="38%" r="62%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.5" />
            <stop offset="55%"  stopColor={c}    stopOpacity="1" />
            <stop offset="100%" stopColor={dark}  stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`rGC${id}`} cx="38%" cy="36%" r="66%">
            <stop offset="0%"   stopColor={s}   stopOpacity="0.9" />
            <stop offset="100%" stopColor={dark} stopOpacity="1" />
          </radialGradient>
        </defs>

        <OrganicStem />

        {/* Watercolor wash bg */}
        <ellipse cx="50" cy="42" rx="28" ry="26" fill={c} opacity="0.10" style={{ filter: 'blur(9px)' }} />

        {/* Outermost guard petals (5 petals, organic spacing with slight irregularity) */}
        {[0, 70, 142, 215, 288].map((deg, i) => {
          const rr = bloom ? 25 + (i % 2) * 2 : 20 + (i % 2)
          return (
            <motion.path key={`rO${i}`}
              d={`M50 46 C${50-rr*0.85} ${46-rr*0.8} ${50+rr*0.7+2} ${46-rr*1.45} ${50+rr} ${46-rr*0.28} C${50+rr*0.65} ${46+rr*0.75} ${50} ${46+rr*0.45} 50 46 Z`}
              fill={`url(#rGO${id})`} stroke={dark} strokeWidth="0.9" strokeOpacity="0.30"
              style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.14 : 0.94, opacity: bloom ? 1 : 0.9 }}
              transition={{ duration: 0.75, delay: i * 0.04 }}
            />
          )
        })}

        {/* Mid petals (5, offset from outer) */}
        {[34, 106, 178, 252, 326].map((deg, i) => {
          const rr = bloom ? 18 : 14
          return (
            <motion.path key={`rM${i}`}
              d={`M50 46 C${50-rr*0.72} ${46-rr*1.35} ${50+rr*1.12} ${46-rr*0.88} ${50+rr*0.78} ${46+rr*0.18} C${50+rr*0.18} ${46+rr*0.95} 50 46 50 46 Z`}
              fill={`url(#rGI${id})`} stroke={dark} strokeWidth="0.75" strokeOpacity="0.28"
              style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.1 : 0.90 }}
              transition={{ duration: 0.72, delay: 0.14 + i * 0.04 }}
            />
          )
        })}

        {/* Inner furled petals — tightly wound */}
        {[0, 58, 116, 174, 232, 290].map((deg, i) => (
          <motion.path key={`rIn${i}`}
            d={`M50 46 C${46} ${38} ${57} ${35} ${50+8} ${42} C${50+4} ${49} 50 46 50 46 Z`}
            fill={`url(#rGC${id})`} stroke={dark} strokeWidth="0.65" strokeOpacity="0.45"
            style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
            animate={{ scale: bloom ? 1.0 : 0.78, opacity: bloom ? 1 : 0.72 }}
            transition={{ duration: 0.65, delay: 0.22 + i * 0.03 }}
          />
        ))}

        {/* Center dark focal point */}
        <motion.circle cx="50" cy="46" r={bloom ? 3.2 : 2.5} fill={dark} opacity="0.75"
          animate={{ r: bloom ? 3.2 : 2.5 }} transition={{ duration: 0.6 }} />

        {/* Petal edge highlight veins */}
        {[0, 144, 286].map((deg, i) => {
          const rr = bloom ? 25 : 20
          return (
            <motion.path key={`rH${i}`}
              d={`M50 46 C${50-rr*0.28} ${46-rr*1.05} ${50+rr*0.24} ${46-rr*1.38} ${50+rr*0.52} ${46-rr*0.72}`}
              stroke="#fff" strokeWidth="1.2" fill="none" strokeOpacity="0.4"
              style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
            />
          )
        })}
      </svg>
    )
  },

  // ── TULIP ─────────────────────────────────────────────────────────────────
  tulip: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FF7EB6'
    const s = secondary || '#FFB3D1'
    const dark = `${c}bb`
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 4px 7px rgba(0,0,0,0.22))' }}>
        <defs>
          <linearGradient id={`tV${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor={dark} />
            <stop offset="45%"  stopColor={c} />
            <stop offset="100%" stopColor={s} />
          </linearGradient>
          <linearGradient id={`tVi${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor={c} />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`tH${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.42" />
            <stop offset="50%"  stopColor={c}    stopOpacity="0" />
            <stop offset="100%" stopColor={dark}  stopOpacity="0.38" />
          </linearGradient>
        </defs>
        <OrganicStem />

        {/* Watercolor wash */}
        <ellipse cx="50" cy="38" rx="22" ry="26" fill={c} opacity="0.09" style={{ filter: 'blur(8px)' }} />

        {/* Back center petal — widest */}
        <motion.path
          d={`M50 60 C${bloom?33:36} ${bloom?29:32} ${bloom?35:37} ${bloom?14:17} 50 ${bloom?18:21} C${bloom?65:63} ${bloom?14:17} ${bloom?67:63} ${bloom?29:32} ${bloom?50:50} 60 Z`}
          fill={`url(#tV${id})`} stroke={dark} strokeWidth="1.1" strokeOpacity="0.35"
          animate={{ d: bloom
            ? 'M50 60 C33 29 35 14 50 18 C65 14 67 29 50 60 Z'
            : 'M50 60 C36 32 37 17 50 21 C63 17 63 32 50 60 Z' }}
          transition={{ duration: 0.65 }}
        />
        {/* Left petal */}
        <motion.path
          d="M50 60 C42 56 30 46 34 30 C38 18 47 24 50 28 C50 40 50 50 50 60 Z"
          fill={`url(#tV${id})`} stroke={dark} strokeWidth="1.1" strokeOpacity="0.35"
          animate={{ d: bloom
            ? 'M50 60 C35 56 21 43 27 26 C33 13 45 21 50 28 C50 40 50 52 50 60 Z'
            : 'M50 60 C42 56 30 46 34 30 C38 18 47 24 50 28 C50 40 50 50 50 60 Z' }}
          transition={{ duration: 0.65 }}
        />
        {/* Right petal */}
        <motion.path
          d="M50 60 C58 56 70 46 66 30 C62 18 53 24 50 28 C50 40 50 50 50 60 Z"
          fill={`url(#tV${id})`} stroke={dark} strokeWidth="1.1" strokeOpacity="0.35"
          animate={{ d: bloom
            ? 'M50 60 C65 56 79 43 73 26 C67 13 55 21 50 28 C50 40 50 52 50 60 Z'
            : 'M50 60 C58 56 70 46 66 30 C62 18 53 24 50 28 C50 40 50 50 50 60 Z' }}
          transition={{ duration: 0.65 }}
        />
        {/* Front center petal — lighter, inner face */}
        <motion.path
          d="M43 58 C43 43 47 32 50 25 C53 32 57 43 57 58 C53 62 47 62 43 58 Z"
          fill={s} stroke={dark} strokeWidth="1.0" strokeOpacity="0.30"
          animate={{ d: bloom
            ? 'M40 58 C41 37 46 27 50 19 C54 27 59 37 60 58 C53 63 47 63 40 58 Z'
            : 'M43 58 C43 43 47 32 50 25 C53 32 57 43 57 58 C53 62 47 62 43 58 Z' }}
          transition={{ duration: 0.65 }}
        />
        {/* Highlight stripe on left petal */}
        <path d="M39 53 C38 44 40 33 43 27" stroke="#fff" strokeWidth="1.5" fill="none" strokeOpacity="0.42" strokeLinecap="round" />
        {/* Highlight on front petal */}
        <path d="M48 55 C48 45 49 34 50 26" stroke="#fff" strokeWidth="1.1" fill="none" strokeOpacity="0.38" strokeLinecap="round" />
        {/* Side shading overlay */}
        <motion.path
          d="M50 60 C36 32 37 17 50 21 C63 17 63 32 50 60 Z"
          fill={`url(#tH${id})`} stroke="none"
          animate={{ opacity: bloom ? 0.88 : 0.72 }}
        />
      </svg>
    )
  },

  // ── SUNFLOWER ─────────────────────────────────────────────────────────────
  sunflower: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FFB347'
    const s = secondary || '#FFD080'
    const bloom = isBlooomed
    const stretch = bloom ? 27 : 21
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 4px 7px rgba(0,0,0,0.24))' }}>
        <defs>
          <radialGradient id={`sfP${id}`} cx="30%" cy="25%" r="75%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.55" />
            <stop offset="30%"  stopColor={s}      stopOpacity="1" />
            <stop offset="75%"  stopColor={c}      stopOpacity="1" />
            <stop offset="100%" stopColor={`${c}aa`} stopOpacity="1" />
          </radialGradient>
          <radialGradient id="sfCore" cx="36%" cy="32%" r="65%">
            <stop offset="0%"   stopColor="#92400e" />
            <stop offset="50%"  stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0a00" />
          </radialGradient>
        </defs>
        <OrganicStem />

        {/* Watercolor glow */}
        <circle cx="50" cy="43" r="28" fill={c} opacity="0.12" style={{ filter: 'blur(10px)' }} />

        {/* Outer petals — 16 with organic wobble */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = i * (360 / 16)
          const wobble = Math.sin(i * 2.4) * 2.8
          const len = stretch + Math.sin(i * 1.6) * 2
          return (
            <motion.path key={`sfO${i}`}
              d={`M50 43 Q${50-9+wobble} ${43-len*0.52} 50 ${43-len} Q${50+9-wobble} ${43-len*0.52} 50 43 Z`}
              fill={`url(#sfP${id})`} stroke={`${c}88`} strokeWidth="0.7"
              style={{ transformOrigin: '50px 43px', rotate: `${angle}deg` }}
              animate={{ scaleY: bloom ? 1.12 : 1.0, scaleX: bloom ? 1.06 : 1 }}
              transition={{ duration: 0.55, delay: i * 0.02 }}
            />
          )
        })}
        {/* Inner petals — offset, shorter, more warm-toned */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = i * (360 / 16) + 11.25
          const innerLen = stretch - 7 + Math.cos(i * 1.3)
          return (
            <motion.path key={`sfI${i}`}
              d={`M50 43 Q${44} ${43-innerLen*0.5} 50 ${43-innerLen} Q${56} ${43-innerLen*0.5} 50 43 Z`}
              fill={s} stroke={`${c}66`} strokeWidth="0.5"
              style={{ transformOrigin: '50px 43px', rotate: `${angle}deg` }}
              animate={{ scaleY: bloom ? 1.09 : 0.97 }}
              transition={{ duration: 0.5 }}
            />
          )
        })}

        {/* Disc center */}
        <circle cx="50" cy="43" r={bloom ? 14.5 : 12} fill="url(#sfCore)" stroke="#1c0a00" strokeWidth="1.2" />
        <circle cx="50" cy="43" r={bloom ? 11.5 : 9.5} fill="#78350f" />
        {/* Phyllotaxis seed dots */}
        {Array.from({ length: 32 }).map((_, i) => {
          const a = i * 137.508 * Math.PI / 180
          const rd = Math.sqrt(i) * 1.75
          return (
            <circle key={`sfD${i}`}
              cx={50 + Math.cos(a) * rd} cy={43 + Math.sin(a) * rd}
              r="0.85" fill="#fef3c7" opacity="0.62" />
          )
        })}
        {/* Disc highlight arc */}
        <path d="M43 37 Q50 34 57 37" stroke="#92400e" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Petal tip highlights */}
        {[0, 90, 180, 270].map((deg, i) => (
          <path key={`sfH${i}`}
            d={`M50 43 Q${50-3} ${43-stretch+4} 50 ${43-stretch}`}
            stroke="#fff" strokeWidth="1.4" fill="none" strokeOpacity="0.48" strokeLinecap="round"
            style={{ transformOrigin: '50px 43px', transform: `rotate(${deg}deg)` }}
          />
        ))}
      </svg>
    )
  },

  // ── ORCHID ────────────────────────────────────────────────────────────────
  orchid: ({ color, secondary, isBlooomed }) => {
    const c = color || '#A78BFA'
    const s = secondary || '#C4B5FD'
    const dark = `${c}bb`
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 3px 7px rgba(0,0,0,0.22))' }}>
        <defs>
          <radialGradient id={`oG${id}`} cx="48%" cy="45%" r="56%">
            <stop offset="0%"   stopColor="#fff"   stopOpacity="0.72" />
            <stop offset="52%"  stopColor={s}       stopOpacity="0.88" />
            <stop offset="100%" stopColor={c}       stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`oL${id}`} cx="30%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#fff"   stopOpacity="0.55" />
            <stop offset="100%" stopColor={c}       stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <OrganicStem />

        {/* Watercolor wash */}
        <ellipse cx="50" cy="45" rx="30" ry="24" fill={c} opacity="0.10" style={{ filter: 'blur(9px)' }} />

        {/* Dorsal (top) petal — pointed */}
        <motion.path
          d="M50 47 C43 30 57 30 50 47"
          fill={`url(#oL${id})`} stroke={dark} strokeWidth="1.1" strokeOpacity="0.38"
          animate={{ d: bloom ? 'M50 47 C37 17 63 17 50 47' : 'M50 47 C43 30 57 30 50 47' }}
          transition={{ duration: 0.65 }}
        />
        {/* Upper lateral petals */}
        <motion.path
          d="M50 47 C27 35 20 50 50 47"
          fill={`url(#oG${id})`} stroke={dark} strokeWidth="1.0" strokeOpacity="0.32"
          animate={{ d: bloom ? 'M50 47 C14 24 10 52 50 47' : 'M50 47 C27 35 20 50 50 47' }}
          transition={{ duration: 0.65 }}
        />
        <motion.path
          d="M50 47 C73 35 80 50 50 47"
          fill={`url(#oG${id})`} stroke={dark} strokeWidth="1.0" strokeOpacity="0.32"
          animate={{ d: bloom ? 'M50 47 C86 24 90 52 50 47' : 'M50 47 C73 35 80 50 50 47' }}
          transition={{ duration: 0.65 }}
        />
        {/* Lower lateral petals — broader, drooping */}
        <motion.path
          d="M50 47 C29 42 22 60 50 57"
          fill={`url(#oL${id})`} stroke={dark} strokeWidth="1.0" strokeOpacity="0.38"
          animate={{ d: bloom ? 'M50 47 C18 42 12 67 50 62' : 'M50 47 C29 42 22 60 50 57' }}
          transition={{ duration: 0.65 }}
        />
        <motion.path
          d="M50 47 C71 42 78 60 50 57"
          fill={`url(#oL${id})`} stroke={dark} strokeWidth="1.0" strokeOpacity="0.38"
          animate={{ d: bloom ? 'M50 47 C82 42 88 67 50 62' : 'M50 47 C71 42 78 60 50 57' }}
          transition={{ duration: 0.65 }}
        />
        {/* Labellum (lip) — distinctive orchid feature */}
        <motion.path
          d="M50 47 C37 57 63 57 50 47"
          fill="#db2777" stroke="#9d174d" strokeWidth="1.0"
          animate={{ d: bloom ? 'M50 47 C32 64 68 64 50 47' : 'M50 47 C37 57 63 57 50 47' }}
          transition={{ duration: 0.55 }}
        />
        {/* Labellum inner markings */}
        {bloom && (
          <>
            <path d="M46 58 Q50 62 54 58" stroke="#9d174d" strokeWidth="0.9" fill="none" opacity="0.7"/>
            <path d="M48 55 Q50 57 52 55" stroke="#9d174d" strokeWidth="0.7" fill="none" opacity="0.55"/>
          </>
        )}
        {/* Column center */}
        <circle cx="50" cy="47" r="3.8" fill="#fef08a" stroke="#9d174d" strokeWidth="1" />
        <circle cx="50" cy="47" r="1.8" fill="white" opacity="0.6" />

        {/* Vein highlights on petals */}
        <path d="M50 47 Q44 34 46 22" stroke="#fff" strokeWidth="1.0" fill="none" strokeOpacity="0.45" strokeLinecap="round" />
        <path d="M50 47 Q37 38 28 38" stroke="#fff" strokeWidth="0.9" fill="none" strokeOpacity="0.38" strokeLinecap="round" />
        <path d="M50 47 Q63 38 72 38" stroke="#fff" strokeWidth="0.9" fill="none" strokeOpacity="0.38" strokeLinecap="round" />
      </svg>
    )
  },

  // ── CHERRY BLOSSOM ────────────────────────────────────────────────────────
  cherry: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FFB7C5'
    const s = secondary || '#FFD6E0'
    const dark = '#c07080'
    const bloom = isBlooomed
    const spread = bloom ? 22 : 17
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 3px 6px rgba(0,0,0,0.20))' }}>
        <defs>
          <radialGradient id={`chG${id}`} cx="32%" cy="26%" r="72%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.82" />
            <stop offset="45%"  stopColor={s}      stopOpacity="0.90" />
            <stop offset="100%" stopColor={c}      stopOpacity="1" />
          </radialGradient>
        </defs>
        {/* Branch with twig */}
        <path d="M50 92 Q49 77 48 64 Q46 56 50 49" stroke="#6b4c3b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M48 64 Q37 57 35 49" stroke="#6b4c3b" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M50 72 Q59 65 60 56" stroke="#6b4c3b" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Small buds */}
        <circle cx="36" cy="49" r="3.5" fill={s} stroke={dark} strokeWidth="0.8" />
        <circle cx="60" cy="56" r="2.5" fill={c} stroke={dark} strokeWidth="0.7" />

        {/* Watercolor wash */}
        <circle cx="50" cy="46" r="22" fill={c} opacity="0.13" style={{ filter: 'blur(7px)' }} />

        {/* Five petals — slightly different sizes for organic look */}
        {[0, 71, 143, 215, 288].map((deg, i) => {
          const ps = spread + (i % 2 === 0 ? 1 : -1)
          return (
            <motion.path key={`chP${i}`}
              d={`M50 46 C${50-ps*0.72} ${46-ps*0.18} ${50-ps*0.26} ${46-ps*1.18} 50 ${46-ps} C${50+ps*0.26} ${46-ps*1.18} ${50+ps*0.72} ${46-ps*0.18} 50 46 Z`}
              fill={`url(#chG${id})`} stroke={dark} strokeWidth="0.8" strokeOpacity="0.28"
              style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.16 : 1.0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            />
          )
        })}

        {/* Petal notch (cherry blossom signature bilobate tip) */}
        {[0, 71, 143, 215, 288].map((deg, i) => (
          <motion.path key={`chN${i}`}
            d={`M${50-2} ${46-spread+1} Q50 ${46-spread+5} ${50+2} ${46-spread+1}`}
            stroke={dark} strokeWidth="1.3" fill="none" strokeOpacity="0.38" strokeLinecap="round"
            style={{ transformOrigin: '50px 46px', rotate: `${deg}deg` }}
            animate={{ opacity: bloom ? 1 : 0.6 }}
          />
        ))}

        {/* Stamens — long, delicate */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = i * (360 / 14) * Math.PI / 180
          const len = 7 + (i % 3) * 1.2
          return (
            <g key={`chSt${i}`}>
              <line x1="50" y1="46" x2={50 + Math.cos(a)*len} y2={46 + Math.sin(a)*len}
                stroke="#db2777" strokeWidth="0.65" opacity="0.82" />
              <circle cx={50 + Math.cos(a)*len} cy={46 + Math.sin(a)*len} r="1.1"
                fill="#fecdd3" stroke="#db2777" strokeWidth="0.5" />
            </g>
          )
        })}

        {/* Calyx (green center cup) */}
        <circle cx="50" cy="46" r="4.5" fill="#fff9fb" stroke={dark} strokeWidth="0.9" />
        <circle cx="50" cy="46" r="2" fill="#fce7f3" />

        {/* Vein highlights */}
        {[0, 143, 286].map((deg, i) => (
          <path key={`chV${i}`}
            d={`M50 46 Q${50-2} ${46-spread*0.58} 50 ${46-spread+3}`}
            stroke="#fff" strokeWidth="1.2" fill="none" strokeOpacity="0.52" strokeLinecap="round"
            style={{ transformOrigin: '50px 46px', transform: `rotate(${deg}deg)` }}
          />
        ))}
      </svg>
    )
  },

  // ── PEONY ─────────────────────────────────────────────────────────────────
  peony: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FF6B9D'
    const s = secondary || '#FFADC4'
    const dark = `${c}99`
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(2px 5px 9px rgba(0,0,0,0.30))' }}>
        <defs>
          <radialGradient id={`pyO${id}`} cx="40%" cy="34%" r="68%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.55" />
            <stop offset="42%"  stopColor={s}      stopOpacity="0.88" />
            <stop offset="100%" stopColor={c}      stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`pyM${id}`} cx="36%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.45" />
            <stop offset="58%"  stopColor={c}      stopOpacity="1" />
            <stop offset="100%" stopColor={dark}   stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`pyI${id}`} cx="40%" cy="36%" r="65%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.6" />
            <stop offset="100%" stopColor={s}      stopOpacity="1" />
          </radialGradient>
        </defs>
        <OrganicStem />

        {/* Watercolor wash */}
        <circle cx="50" cy="43" r="32" fill={c} opacity="0.10" style={{ filter: 'blur(11px)' }} />

        {/* Outer guard petals — 8, large and ruffled */}
        {[0, 44, 90, 134, 178, 222, 268, 312].map((deg, i) => {
          const rr = bloom ? 31 + (i%3) : 24
          const wob = Math.sin(i * 1.9) * 5
          return (
            <motion.path key={`pyO${i}`}
              d={`M50 43 C${50-rr+wob} ${43-rr*0.88} ${50+rr*0.72+wob} ${43-rr*1.12} ${50+rr} ${43-rr*0.2} C${50+rr*0.6} ${43+rr*0.8} ${50} ${43+rr*0.48} 50 43 Z`}
              fill={`url(#pyO${id})`} stroke={dark} strokeWidth="0.8" strokeOpacity="0.30"
              style={{ transformOrigin: '50px 43px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.10 : 0.88 }}
              transition={{ duration: 0.72, delay: i * 0.03 }}
            />
          )
        })}

        {/* Mid petals — 8, tighter */}
        {[22, 66, 110, 154, 200, 244, 290, 334].map((deg, i) => {
          const rr = bloom ? 22 : 16
          return (
            <motion.path key={`pyM${i}`}
              d={`M50 43 C${50-rr*1.12} ${43-rr*0.92} ${50+rr*0.92} ${43-rr*1.02} ${50+rr*0.72} ${43+rr*0.28} C${50+rr*0.12} ${43+rr*0.92} 50 43 50 43 Z`}
              fill={`url(#pyM${id})`} stroke={dark} strokeWidth="0.65" strokeOpacity="0.28"
              style={{ transformOrigin: '50px 43px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.12 : 0.90 }}
              transition={{ duration: 0.68, delay: 0.1 + i * 0.03 }}
            />
          )
        })}

        {/* Inner cupped petals — the signature peony density */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rr = bloom ? 14 : 10
          return (
            <motion.path key={`pyI${i}`}
              d={`M50 43 C${50-rr*0.8} ${43-rr*1.6} ${50+rr*0.8} ${43-rr*1.6} 50 43 Z`}
              fill={`url(#pyI${id})`} stroke={dark} strokeWidth="0.55" strokeOpacity="0.38"
              style={{ transformOrigin: '50px 43px', rotate: `${deg}deg` }}
              animate={{ scale: bloom ? 1.14 : 0.86 }}
              transition={{ duration: 0.62, delay: 0.2 + i * 0.02 }}
            />
          )
        })}

        {/* Stamens cluster center */}
        <circle cx="50" cy="43" r={bloom ? 6 : 4.5} fill="#fde68a" stroke={dark} strokeWidth="0.9" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = i * 45 * Math.PI / 180
          return <circle key={`pySt${i}`} cx={50+Math.cos(a)*3.5} cy={43+Math.sin(a)*3.5} r="0.9" fill="#f59e0b" opacity="0.9" />
        })}

        {/* Petal highlights */}
        {[0, 120, 240].map((deg, i) => {
          const rr = bloom ? 31 : 24
          return (
            <path key={`pyH${i}`}
              d={`M50 43 C${50-7} ${43-rr*0.72} ${50-2} ${43-rr*1.12} 50 ${43-rr+4}`}
              stroke="#fff" strokeWidth="1.3" fill="none" strokeOpacity="0.40" strokeLinecap="round"
              style={{ transformOrigin: '50px 43px', transform: `rotate(${deg}deg)` }}
            />
          )
        })}
      </svg>
    )
  },

  // ── LOTUS ─────────────────────────────────────────────────────────────────
  lotus: ({ color, secondary, isBlooomed }) => {
    const c = color || '#6EE7B7'
    const s = secondary || '#A7F3D0'
    const dark = '#0f766e'
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 3px 6px rgba(0,0,0,0.22))' }}>
        <defs>
          <linearGradient id={`ltP${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={c === '#e4f5ef' ? "0.9" : "0.5"} />
            <stop offset="60%"  stopColor={s} />
            <stop offset="100%" stopColor={c} />
          </linearGradient>
          <radialGradient id={`ltPad${id}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#4ade80" />
            <stop offset="100%" stopColor="#065f46" />
          </radialGradient>
        </defs>
        {/* Stem */}
        <path d="M50 92 Q49 78 50 66" stroke="#0f766e" strokeWidth="2.8" strokeLinecap="round" />
        {/* Lily pad */}
        <path d="M50 66 Q30 70 22 63 Q38 66 50 66" fill={`url(#ltPad${id})`} stroke={dark} strokeWidth="0.8" opacity="0.88"/>
        <path d="M50 66 Q70 70 78 63 Q62 66 50 66" fill={`url(#ltPad${id})`} stroke={dark} strokeWidth="0.8" opacity="0.82"/>

        {/* Watercolor wash */}
        <circle cx="50" cy="46" r="28" fill={c} opacity="0.12" style={{ filter: 'blur(9px)' }} />

        {/* Background/Outer wide petals (spread out) */}
        {[-65, -35, 35, 65].map((deg, i) => (
          <motion.path key={`ltB${i}`}
            d={`M50 66 C${38} ${55} ${32} ${30} 50 ${12} C${68} ${30} ${62} ${55} 50 66 Z`}
            fill={`url(#ltP${id})`} stroke={dark} strokeWidth="0.6" strokeOpacity="0.25"
            style={{ transformOrigin: '50px 66px', rotate: `${deg}deg` }}
            animate={{ scaleY: bloom ? 1.05 : 0.85, scaleX: bloom ? 1.1 : 0.9 }}
            transition={{ duration: 0.65, delay: i * 0.05 }}
          />
        ))}

        {/* Mid-layer petals (overlap) */}
        {[-45, -20, 20, 45].map((deg, i) => (
          <motion.path key={`ltM${i}`}
            d={`M50 66 C${40} ${55} ${35} ${25} 50 ${8} C${65} ${25} ${60} ${55} 50 66 Z`}
            fill={`url(#ltP${id})`} stroke={dark} strokeWidth="0.7" strokeOpacity="0.3"
            style={{ transformOrigin: '50px 66px', rotate: `${deg}deg` }}
            animate={{ scaleY: bloom ? 1.02 : 0.88, scaleX: bloom ? 1.0 : 0.85 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
          />
        ))}

        {/* Inner frontal petals (stand tall) */}
        {[-12, 0, 12].map((deg, i) => (
          <motion.path key={`ltI${i}`}
            d={`M50 66 C${42} ${48} ${38} ${22} 50 ${6} C${62} ${22} ${58} ${48} 50 66 Z`}
            fill={`url(#ltP${id})`} stroke={dark} strokeWidth="0.8" strokeOpacity="0.4"
            style={{ transformOrigin: '50px 66px', rotate: `${deg}deg` }}
            animate={{ scaleY: bloom ? 1.0 : 0.9 }}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.05 }}
          />
        ))}

        {/* Receptacle center (Yellow pod) */}
        <motion.ellipse cx="50" cy="48" rx={bloom ? 10 : 7} ry={bloom ? 6 : 4} fill="#fde047" stroke="#ca8a04" strokeWidth="0.8"
          animate={{ ry: bloom ? 6 : 4, rx: bloom ? 10 : 7 }} transition={{ duration: 0.5 }} />
        <motion.ellipse cx="50" cy="47" rx={bloom ? 8 : 5} ry={bloom ? 4 : 2} fill="#eab308"
          animate={{ ry: bloom ? 4 : 2, rx: bloom ? 8 : 5 }} transition={{ duration: 0.5 }} />
          
        {/* Seed holes in receptacle */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = i * 40 * Math.PI / 180
          const rd = i < 5 ? 4.5 : 2
          return <circle key={`ltSd${i}`} cx={50+Math.cos(a)*rd} cy={47+Math.sin(a)*rd*0.6} r="1.3" fill="#854d0e" opacity="0.65" />
        })}

        {/* Delicate Stamens around the pod */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 360 / 16) * Math.PI / 180
          const rx = 12, ry = 7
          const sx = 50 + Math.cos(a) * rx, sy = 48 + Math.sin(a) * ry
          const ex = 50 + Math.cos(a) * (rx + 4), ey = 48 + Math.sin(a) * (ry + 3)
          if (sy < 48) return null; // Only draw front stamens over petals
          return (
             <g key={`ltSt${i}`}>
               <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#fef08a" strokeWidth="0.6" />
               <circle cx={ex} cy={ey} r="1" fill="#eab308" />
             </g>
          )
        })}

        {/* Center highlight vein for front petal */}
        <path d="M50 66 Q49 50 50 30" stroke="#fff" strokeWidth="1" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
      </svg>
    )
  },

  // ── DAISY ─────────────────────────────────────────────────────────────────
  daisy: ({ color, secondary, isBlooomed }) => {
    // Daisy often has white petals, but will adapt to the passed colors.
    // It features a prominent yellow/gold center disc and many slender petals.
    const c = color || '#f8f9fa'
    const s = secondary || '#e5e7eb'
    const bloom = isBlooomed
    const stretch = bloom ? 26 : 20
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 3px 5px rgba(0,0,0,0.18))' }}>
        <defs>
          <linearGradient id={`dsP${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor={s} />
            <stop offset="60%"  stopColor={c} />
            <stop offset="100%" stopColor={c === '#f8f9fa' ? '#ffffff' : c} stopOpacity={c === '#f8f9fa' ? "0.95" : "0.7"} />
          </linearGradient>
          <linearGradient id={`dsI${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor={c} />
            <stop offset="100%" stopColor={c === '#f8f9fa' ? '#ffffff' : c} stopOpacity={c === '#f8f9fa' ? "0.98" : "0.85"} />
          </linearGradient>
        </defs>
        <OrganicStem />

        {/* Watercolor wash */}
        <circle cx="50" cy="43" r="23" fill={c} opacity="0.15" style={{ filter: 'blur(8px)' }} />

        {/* Outer slender petals — 24 */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = i * (360 / 24)
          const len = stretch + Math.sin(i * 2.3) * 2.5
          const curve = Math.cos(i * 1.7) * 1.5
          return (
            <motion.path key={`dsO${i}`}
              d={`M50 43 Q${50-3.5+curve} ${43-len*0.45} 50 ${43-len} Q${50+3.5+curve} ${43-len*0.45} 50 43 Z`}
              fill={`url(#dsP${id})`} stroke={`${c}66`} strokeWidth="0.5"
              style={{ transformOrigin: '50px 43px', rotate: `${angle}deg` }}
              animate={{ scaleY: bloom ? 1.05 : 0.9, scaleX: bloom ? 1.0 : 0.85 }}
              transition={{ duration: 0.6, delay: i * 0.015 }}
            />
          )
        })}

        {/* Inner petals — 24, slightly shorter and offset */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = i * (360 / 24) + 7.5
          const len = stretch - 3.5 + Math.cos(i * 3) * 2
          const curve = Math.sin(i * 2.1) * 1.5
          return (
            <motion.path key={`dsI${i}`}
              d={`M50 43 Q${50-3+curve} ${43-len*0.45} 50 ${43-len} Q${50+3+curve} ${43-len*0.45} 50 43 Z`}
              fill={`url(#dsI${id})`} stroke={`${c}88`} strokeWidth="0.5"
              style={{ transformOrigin: '50px 43px', rotate: `${angle}deg` }}
              animate={{ scaleY: bloom ? 1.0 : 0.85, scaleX: bloom ? 0.95 : 0.8 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.01 }}
            />
          )
        })}

        {/* Center Disc — Bright Yellow/Gold */}
        <motion.circle cx="50" cy="43" r={bloom ? 7.5 : 6} fill="#f59e0b" stroke="#d97706" strokeWidth="0.8"
          animate={{ r: bloom ? 7.5 : 6 }} transition={{ duration: 0.5 }} />
        <motion.circle cx="50" cy="43" r={bloom ? 5.5 : 4} fill="#fbbf24"
          animate={{ r: bloom ? 5.5 : 4 }} transition={{ duration: 0.5 }} />
        
        {/* Disc texture dots */}
        {Array.from({ length: 26 }).map((_, i) => {
          const a = i * 137.5 * Math.PI / 180
          const rd = Math.sqrt(i) * 1.2
          return (
            <circle key={`dsD${i}`}
              cx={50 + Math.cos(a) * rd} cy={43 + Math.sin(a) * rd}
              r="0.65" fill="#fef3c7" opacity="0.85" />
          )
        })}

        {/* Few highlights on disc */}
        <path d="M46 41 Q50 38 54 41" stroke="#fcd34d" strokeWidth="1" fill="none" opacity="0.7" />
      </svg>
    )
  },

  // ── LILY ──────────────────────────────────────────────────────────────────
  lily: ({ color, secondary, isBlooomed }) => {
    const c = color || '#FF7EB6'
    const s = secondary || '#FFD6E0'
    const dark = dk(c, 0.30)
    const bloom = isBlooomed
    const id = c.replace('#','')
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 4px 8px rgba(0,0,0,0.26))' }}>
        <defs>
          <linearGradient id={`lyP${id}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%"   stopColor={s}    stopOpacity="0.85" />
            <stop offset="45%"  stopColor={c} />
            <stop offset="100%" stopColor={dark}  stopOpacity="0.80" />
          </linearGradient>
        </defs>

        <OrganicStem />

        {/* Watercolor wash */}
        <circle cx="50" cy="44" r="25" fill={c} opacity="0.13" style={{ filter: 'blur(9px)' }} />

        {/* 6 elongated petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = i * 60
          const len = bloom ? 30 : 22
          const w   = bloom ? 9  : 6.5
          return (
            <motion.path key={`lyP${i}`}
              d={`M50 44 C${50-w} ${44-len*0.38} ${50-w*0.45} ${44-len*0.88} 50 ${44-len} C${50+w*0.45} ${44-len*0.88} ${50+w} ${44-len*0.38} 50 44 Z`}
              fill={`url(#lyP${id})`} stroke={dark} strokeWidth="0.55" strokeOpacity="0.32"
              style={{ transformOrigin: '50px 44px', rotate: `${angle}deg` }}
              animate={{ scale: bloom ? 1.10 : 0.80, opacity: bloom ? 1 : 0.88 }}
              transition={{ duration: 0.72, delay: i * 0.05 }}
            />
          )
        })}

        {/* Center stripe highlight on alternating petals */}
        {[0, 120, 240].map((angle, i) => {
          const len = bloom ? 26 : 19
          return (
            <motion.line key={`lySt${i}`}
              x1="50" y1="44" x2="50" y2={44 - len}
              stroke="#fff" strokeWidth="0.85" strokeOpacity="0.38" strokeLinecap="round"
              style={{ transformOrigin: '50px 44px', rotate: `${angle}deg` }}
              animate={{ opacity: bloom ? 0.38 : 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
            />
          )
        })}

        {/* Spots on petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60) * Math.PI / 180
          const t = bloom ? 0.55 : 0.45
          const px = 50 + Math.sin(angle) * 30 * t * 0.55
          const py = 44 - Math.cos(angle) * 30 * t
          return (
            <motion.circle key={`lyDot${i}`}
              cx={px} cy={py} r={bloom ? 1.4 : 0.9}
              fill={dark} opacity={0.28}
              animate={{ opacity: bloom ? 0.28 : 0.14, r: bloom ? 1.4 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.04 }}
            />
          )
        })}

        {/* 6 long stamens between petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 + 30) * Math.PI / 180
          const stLen = bloom ? 27 : 17
          const ex = 50 + Math.sin(angle) * stLen
          const ey = 44 - Math.cos(angle) * stLen
          return (
            <motion.g key={`lyStm${i}`}
              animate={{ opacity: bloom ? 0.85 : 0.35, scale: bloom ? 1 : 0.65 }}
              style={{ transformOrigin: '50px 44px' }}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.04 }}>
              <line x1="50" y1="44" x2={ex} y2={ey}
                stroke="#8B4513" strokeWidth="0.75" strokeLinecap="round" />
              {/* T-shaped anther */}
              <ellipse cx={ex} cy={ey} rx="2.0" ry="0.85"
                fill="#B5451B" opacity="0.88"
                transform={`rotate(${i * 60 + 30},${ex},${ey})`} />
            </motion.g>
          )
        })}

        {/* Center pistil */}
        <motion.circle cx="50" cy="44" r={bloom ? 4.5 : 3}
          fill="#FFF5E0" stroke={dark} strokeWidth="0.5"
          animate={{ r: bloom ? 4.5 : 3 }} transition={{ duration: 0.5 }} />
        <motion.circle cx="50" cy="44" r={bloom ? 2.8 : 1.8}
          fill="#FFEC8B"
          animate={{ r: bloom ? 2.8 : 1.8 }} transition={{ duration: 0.5 }} />
      </svg>
    )
  },

  // ── LAVENDER ──────────────────────────────────────────────────────────────
  lavender: ({ color, secondary, isBlooomed }) => {
    const c = color || '#a855f7'
    const s = secondary || '#d8b4fe'
    const dark = dk(c, 0.4)
    const bloom = isBlooomed

    // Generate random clustered florets
    const florets = []
    // Seeded random for consistent layout
    let seed = 42
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    
    // Distribute florets along the top half of the stem
    const numLayers = 14
    for (let layer = 0; layer < numLayers; layer++) {
      const cyBase = 15 + layer * 3.5 // from top down
      const maxDist = 6 - (layer / numLayers) * 1.5 // narrower near top
      
      const numFlorets = 3 + Math.floor(rand() * 3)
      for (let f = 0; f < numFlorets; f++) {
        const angle = rand() * Math.PI * 2
        const dist = 1.5 + rand() * maxDist
        const cx = 50 + Math.cos(angle) * dist
        const cy = cyBase + Math.sin(angle) * dist*0.5
        const rot = rand() * 360
        const scale = 0.5 + rand() * 0.5 + (1 - layer/numLayers)*0.3 // slightly larger near top
        
        florets.push({
          key: `lvF${layer}-${f}`,
          cx, cy, rot, scale,
          delay: (numLayers - layer) * 0.03 + rand() * 0.05
        })
      }
    }

    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.15))' }}>
        
        {/* Long thin stems */}
        <path d="M50 92 Q49 70 50 48" stroke="#10b981" strokeWidth="1.5" />
        <path d="M50 48 Q50 30 50 12" stroke="#4ade80" strokeWidth="1.2" />
        
        {/* Soft aura */}
        <ellipse cx="50" cy="35" rx="14" ry="28" fill={c} opacity="0.12" style={{ filter: 'blur(6px)' }} />

        {/* Leaves at base */}
        <motion.path d="M50 75 Q42 65 38 52 Q42 62 50 70" fill="#34d399" opacity="0.8"
          style={{ transformOrigin: '50px 75px' }} animate={{ rotate: bloom ? 0 : 15 }} transition={{ duration: 0.8 }} />
        <motion.path d="M50 82 Q56 70 62 58 Q56 68 50 75" fill="#10b981" opacity="0.8"
          style={{ transformOrigin: '50px 82px' }} animate={{ rotate: bloom ? 0 : -15 }} transition={{ duration: 0.8 }} />
        <motion.path d="M50 65 Q45 55 42 45 Q46 52 50 62" fill="#059669" opacity="0.7"
          style={{ transformOrigin: '50px 65px' }} animate={{ rotate: bloom ? 0 : 10 }} transition={{ duration: 0.8 }} />

        {/* Florets */}
        {florets.map(fl => (
          <motion.g key={fl.key} 
            style={{ transformOrigin: `${fl.cx}px ${fl.cy}px`, rotate: `${fl.rot}deg` }}
            animate={{ scale: bloom ? fl.scale : 0.2, opacity: bloom ? 1 : 0 }}
            transition={{ duration: 0.5, delay: fl.delay }}>
            <ellipse cx={fl.cx} cy={fl.cy} rx="2" ry="3.5" fill={s} opacity="0.9" />
            <ellipse cx={fl.cx} cy={fl.cy + 1} rx="2.5" ry="2" fill={c} opacity="0.95" />
            <circle cx={fl.cx} cy={fl.cy + 2} r="1.5" fill={dark} opacity="0.6" />
            
            {/* tiny stamen highlight */}
            <circle cx={fl.cx} cy={fl.cy} r="0.6" fill="#ffffff" opacity="0.8" />
          </motion.g>
        ))}
      </svg>
    )
  },
}

// ─── Flower component (used in BouquetDisplay and elsewhere) ─────────────────
export default function Flower({ data, onSelect, discovered, size = 'normal' }) {
  const [isHovered, setIsHovered] = useState(false)
  const isBlooomed = discovered !== false

  const FlowerShape = FLOWER_SVGS[data.flower || 'rose'] || FLOWER_SVGS.rose

  // Size dimensions in px
  const dims = {
    large:  { w: 88,  h: 126 },
    normal: { w: 70,  h: 100 },
    small:  { w: 49,  h:  70 },
  }
  const { w, h } = dims[size] || dims.normal

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: data.position ? `${data.position.x}%` : '50%',
        top: data.position ? `${data.position.y}%` : '50%',
        width: w, height: h,
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 20 : 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (data.id || 0) * 0.1, duration: 0.8, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(data)}
    >
      {/* Glow halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: w * 1.15,
          height: w * 1.15,
          background: `radial-gradient(circle, ${data.glowColor || data.color}, transparent)`,
          top: '5%', left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(12px)',
        }}
        animate={{ opacity: isBlooomed ? 1 : isHovered ? 0.9 : 0.35, scale: isBlooomed ? 1.4 : isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Sway wrapper */}
      <motion.div
        style={{ width: '100%', height: '100%' }}
        animate={{ rotate: isBlooomed ? 0 : ['-3deg', '3deg', '-3deg'] }}
        transition={isBlooomed ? {} : { duration: 3 + (data.id || 0) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerShape color={data.color} secondary={data.secondary} isHovered={isHovered} isBlooomed={isBlooomed} />
      </motion.div>

      {/* Name label */}
      {data.name && onSelect && (
        <motion.div
          className="absolute text-center w-24 pointer-events-none"
          style={{
            left: '50%', transform: 'translateX(-50%)', bottom: -22,
            fontFamily: 'Inter, sans-serif', fontSize: 11,
            letterSpacing: '0.1em', color: data.color,
          }}
          animate={{ opacity: isHovered || isBlooomed ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {data.name}
        </motion.div>
      )}
    </motion.div>
  )
}
