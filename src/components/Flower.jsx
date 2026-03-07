import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Organic stem + branch system ─────────────────────────────────────────────
// Designed for the shared 0 0 100 100 viewBox.
// Stem base y≈92, stem top y≈64; flower head sits above that.
const _LEAF_D = 'M0 0 C-4.5 -3 -4 -9 0 -12 C4 -9 4.5 -3 0 0'
const _VEIN_D = 'M0 -1 L0 -10'
const _SC     = '#2d6a4f'

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
          <linearGradient id={`ltG${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.88" />
            <stop offset="50%"  stopColor={s}      stopOpacity="0.88" />
            <stop offset="100%" stopColor={c}      stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`ltI${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#fff"  stopOpacity="0.92" />
            <stop offset="100%" stopColor={c}      stopOpacity="0.88" />
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
        {/* Pad vein */}
        <path d="M50 66 Q36 66 24 63" stroke="#fff" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M50 66 Q64 66 76 63" stroke="#fff" strokeWidth="0.7" fill="none" opacity="0.4"/>

        {/* Watercolor wash */}
        <ellipse cx="50" cy="46" rx="24" ry="28" fill={c} opacity="0.11" style={{ filter: 'blur(8px)' }} />

        {/* Outermost wide petals — 5, slightly open at base */}
        {[-40, -18, 0, 18, 40].map((deg, i) => (
          <motion.path key={`ltB${i}`}
            d="M50 66 Q36 48 50 20 Q64 48 50 66"
            fill={`url(#ltG${id})`} stroke={dark} strokeWidth="0.9" strokeOpacity="0.32"
            style={{ transformOrigin: '50px 66px', rotate: `${deg}deg` }}
            animate={{ scaleY: bloom ? 1.14 : 0.94, scaleX: bloom ? 1.06 : 1 }}
            transition={{ duration: 0.62, delay: i * 0.05 }}
          />
        ))}

        {/* Mid petals — taller, more upright */}
        {[-26, 0, 26].map((deg, i) => (
          <motion.path key={`ltM${i}`}
            d="M50 66 Q35 44 50 14 Q65 44 50 66"
            fill={s} stroke={dark} strokeWidth="0.9" strokeOpacity="0.38"
            style={{ transformOrigin: '50px 66px', rotate: `${deg}deg` }}
            animate={{ scaleY: bloom ? 1.20 : 1.02 }}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.06 }}
          />
        ))}

        {/* Inner petal — the frontal showpiece */}
        <motion.path
          d="M50 66 Q42 52 50 36 Q58 52 50 66"
          fill={`url(#ltI${id})`} stroke={dark} strokeWidth="0.9" strokeOpacity="0.42"
          animate={{ scaleY: bloom ? 1.12 : 0.96 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        />

        {/* Receptacle center */}
        <ellipse cx="50" cy="40" rx="8" ry="7" fill="#fde68a" stroke={dark} strokeWidth="1" />
        <ellipse cx="50" cy="40" rx="5" ry="4" fill="#f59e0b" opacity="0.7" />
        {/* Seed holes pattern */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = i * 40 * Math.PI / 180
          const rd = i < 5 ? 3.8 : 1.6
          return <circle key={`ltSd${i}`} cx={50+Math.cos(a)*rd} cy={40+Math.sin(a)*rd} r="1.1" fill={dark} opacity="0.55" />
        })}

        {/* Center highlight vein */}
        <path d="M50 66 Q49 52 50 38" stroke="#fff" strokeWidth="1.2" fill="none" strokeOpacity="0.52" strokeLinecap="round" />
        {/* Side petal veins */}
        <path d="M50 66 Q40 52 38 38" stroke="#fff" strokeWidth="0.8" fill="none" strokeOpacity="0.35" strokeLinecap="round"
          style={{ transformOrigin: '50px 66px' }} />
        <path d="M50 66 Q60 52 62 38" stroke="#fff" strokeWidth="0.8" fill="none" strokeOpacity="0.35" strokeLinecap="round"
          style={{ transformOrigin: '50px 66px', transform: 'scaleX(-1) translateX(-100px)' }} />
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
