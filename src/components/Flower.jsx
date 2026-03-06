import { useState } from 'react'
import { motion } from 'framer-motion'

export const FLOWER_SVGS = {
  tulip: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="100" x2="40" y2="55" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 80 Q28 70 22 58" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
      <motion.ellipse
        cx="40" cy="40" rx={isBlooomed ? 18 : 14} ry={isBlooomed ? 26 : 22}
        fill={color} opacity="0.95"
        animate={{ rx: isBlooomed ? 18 : isHovered ? 15 : 14 }} transition={{ duration: 0.4 }}
      />
      <motion.ellipse
        cx="26" cy="48" rx={isBlooomed ? 16 : 12} ry={isBlooomed ? 22 : 18}
        fill={secondary || color} opacity="0.85"
        style={{ transformOrigin: '40px 60px' }}
        animate={{ rotate: isBlooomed ? -35 : isHovered ? -20 : -10 }} transition={{ duration: 0.4 }}
      />
      <motion.ellipse
        cx="54" cy="48" rx={isBlooomed ? 16 : 12} ry={isBlooomed ? 22 : 18}
        fill={secondary || color} opacity="0.85"
        style={{ transformOrigin: '40px 60px' }}
        animate={{ rotate: isBlooomed ? 35 : isHovered ? 20 : 10 }} transition={{ duration: 0.4 }}
      />
      {(isHovered || isBlooomed) && <ellipse cx="40" cy="42" rx="8" ry="10" fill="white" opacity={isBlooomed ? 0.5 : 0.3} />}
    </svg>
  ),

  sunflower: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="105" x2="40" y2="55" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 80 Q30 72 24 62" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i * (360/14) * Math.PI) / 180
        const spread = isBlooomed ? 25 : isHovered ? 20 : 16
        const cx = 40 + Math.cos(angle) * spread
        const cy = 38 + Math.sin(angle) * spread
        return (
          <motion.ellipse
            key={i} cx={cx} cy={cy}
            rx={isBlooomed ? 8 : 6} ry={isBlooomed ? 13 : 10}
            fill={i % 2 === 0 ? color : (secondary || color)} opacity="0.9"
            style={{ transformOrigin: `${cx}px ${cy}px`, rotate: `${i * (360/14)}deg` }}
            animate={{ rx: isBlooomed ? 8 : isHovered ? 7 : 6 }} transition={{ duration: 0.4 }}
          />
        )
      })}
      <circle cx="40" cy="38" r={isBlooomed ? 15 : 12} fill="#78350f" />
      <circle cx="40" cy="38" r={isBlooomed ? 10 : 8} fill="#92400e" />
      <circle cx="40" cy="38" r={isBlooomed ? 4 : 3} fill="#451a03" />
    </svg>
  ),

  rose: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="105" x2="40" y2="58" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 80 Q30 72 26 60" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const r = isBlooomed ? 22 : isHovered ? 18 : 15
        const rad = (deg * Math.PI) / 180
        return (
          <motion.ellipse
            key={i}
            cx={40 + Math.cos(rad) * r} cy={40 + Math.sin(rad) * r * 0.6}
            rx={isBlooomed ? 15 : 12} ry={isBlooomed ? 18 : 15}
            fill={i % 2 === 0 ? color : (secondary || color)} opacity="0.85"
            style={{ transformOrigin: '40px 40px', rotate: `${deg}deg` }}
            animate={{ rx: isBlooomed ? 15 : isHovered ? 13 : 12 }} transition={{ duration: 0.5, delay: i * 0.04 }}
          />
        )
      })}
      <circle cx="40" cy="40" r={isBlooomed ? 14 : 11} fill={color} opacity="0.95" />
      <circle cx="40" cy="40" r={isBlooomed ? 8 : 6} fill={secondary || 'white'} opacity="0.5" />
    </svg>
  ),

  orchid: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="105" x2="40" y2="55" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      <motion.ellipse cx="40" cy="24" rx={isBlooomed ? 14 : 10} ry={isBlooomed ? 18 : 14} fill={color} opacity="0.9"
        animate={{ ry: isBlooomed ? 18 : isHovered ? 15 : 14 }} transition={{ duration: 0.4 }} />
      <motion.ellipse cx="18" cy="40" rx={isBlooomed ? 16 : 12} ry={isBlooomed ? 10 : 8} fill={color} opacity="0.85"
        animate={{ rx: isBlooomed ? 16 : isHovered ? 14 : 12 }} transition={{ duration: 0.4 }} />
      <motion.ellipse cx="62" cy="40" rx={isBlooomed ? 16 : 12} ry={isBlooomed ? 10 : 8} fill={color} opacity="0.85"
        animate={{ rx: isBlooomed ? 16 : isHovered ? 14 : 12 }} transition={{ duration: 0.4 }} />
      <motion.ellipse cx="26" cy="58" rx={isBlooomed ? 14 : 10} ry={isBlooomed ? 9 : 7} fill={secondary || color} opacity="0.8"
        animate={{ rx: isBlooomed ? 14 : isHovered ? 12 : 10 }} transition={{ duration: 0.4 }} />
      <motion.ellipse cx="54" cy="58" rx={isBlooomed ? 14 : 10} ry={isBlooomed ? 9 : 7} fill={secondary || color} opacity="0.8"
        animate={{ rx: isBlooomed ? 14 : isHovered ? 12 : 10 }} transition={{ duration: 0.4 }} />
      <path d="M40 46 Q30 55 40 65 Q50 55 40 46" fill="white" opacity="0.9" />
      <circle cx="40" cy="50" r="4" fill={color} opacity="0.8" />
    </svg>
  ),

  cherry: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="105" x2="40" y2="55" stroke="#5c4033" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 75 Q25 70 20 60" stroke="#5c4033" strokeWidth="1.5" fill="none" />
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const spread = isBlooomed ? 16 : isHovered ? 13 : 11
        const cx = 40 + Math.cos(rad) * spread
        const cy = 40 + Math.sin(rad) * spread
        return (
          <motion.path
            key={i}
            d={`M${cx} ${cy} Q${cx-8} ${cy-15} ${cx} ${cy-22} Q${cx+8} ${cy-15} ${cx} ${cy}`}
            fill={color} opacity="0.9"
            style={{ transformOrigin: `${cx}px ${cy}px`, rotate: `${deg + 90}deg` }}
            animate={{ scale: isBlooomed ? 1.2 : isHovered ? 1.1 : 1 }} transition={{ duration: 0.4 }}
          />
        )
      })}
      <circle cx="40" cy="40" r="5" fill={secondary || '#ffb7c5'} />
      {Array.from({length:5}).map((_, i) => (
        <circle key={i} cx={40 + Math.cos(i*72*Math.PI/180)*7} cy={40 + Math.sin(i*72*Math.PI/180)*7} r="1.5" fill="white" />
      ))}
    </svg>
  ),

  peony: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="105" x2="40" y2="55" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 85 Q55 80 60 70" stroke="#4ade80" strokeWidth="2" fill="none" />
      {/* Many layered petals */}
      {[24, 18, 12, 6].map((layerRadius, layerIdx) => (
        <g key={layerIdx}>
          {Array.from({ length: 8 - layerIdx }).map((_, i) => {
            const angle = (i * (360/(8-layerIdx)) * Math.PI) / 180
            const spread = isBlooomed ? layerRadius * 1.2 : isHovered ? layerRadius * 1.1 : layerRadius
            const cx = 40 + Math.cos(angle) * (spread/2)
            const cy = 40 + Math.sin(angle) * (spread/2)
            return (
              <motion.ellipse
                key={i} cx={cx} cy={cy}
                rx={spread} ry={spread * 0.8}
                fill={layerIdx % 2 === 0 ? color : (secondary || color)} opacity="0.85"
                style={{ transformOrigin: `${cx}px ${cy}px`, rotate: `${i * (360/(8-layerIdx))}deg` }}
                animate={{ rx: spread * (isBlooomed ? 1.2 : 1) }} transition={{ duration: 0.5, delay: layerIdx * 0.1 }}
              />
            )
          })}
        </g>
      ))}
      <circle cx="40" cy="40" r="5" fill="#fde68a" />
    </svg>
  ),

  lotus: ({ color, secondary, isHovered, isBlooomed }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <line x1="40" y1="110" x2="40" y2="60" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lower petals */}
      {[180, 210, 330, 360].map((deg, i) => (
         <motion.ellipse key={`low-${i}`} cx={40} cy={60} rx="8" ry="20" fill={secondary || color} opacity="0.7"
           style={{ transformOrigin: '40px 60px', rotate: `${deg}deg` }}
           animate={{ rotate: `${deg + (isBlooomed ? (deg > 270 ? 20 : -20) : 0)}deg` }}
         />
      ))}
      {/* Upper petals */}
      {[240, 270, 300].map((deg, i) => (
         <motion.path key={`up-${i}`}
           d="M40 60 Q25 40 40 15 Q55 40 40 60"
           fill={color} opacity="0.9"
           style={{ transformOrigin: '40px 60px', rotate: `${deg - 270}deg` }}
           animate={{ scale: isBlooomed ? 1.2 : isHovered ? 1.1 : 1 }} transition={{ duration: 0.6 }}
         />
      ))}
      {/* Center glowing core */}
      <circle cx="40" cy="55" r="4" fill="#fef08a" opacity="0.9" />
    </svg>
  )
}

export default function Flower({ data, onSelect, discovered, size = "normal" }) {
  const [isHovered, setIsHovered] = useState(false)
  const isBlooomed = discovered !== false // Support true by default when rendering bouquets

  const flowerType = data.flower || 'rose'
  const FlowerShape = FLOWER_SVGS[flowerType] || FLOWER_SVGS.rose
  
  const scaleMultiplier = size === 'large' ? 1.5 : size === 'small' ? 0.7 : 1

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: data.position ? `${data.position.x}%` : '50%',
        top: data.position ? `${data.position.y}%` : '50%',
        width: 70 * scaleMultiplier,
        height: 100 * scaleMultiplier,
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
      {/* Glow underneath */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 80 * scaleMultiplier,
          height: 80 * scaleMultiplier,
          background: `radial-gradient(circle, ${data.glowColor || data.color}, transparent)`,
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(10px)',
        }}
        animate={{ opacity: isBlooomed ? 1 : isHovered ? 0.9 : 0.4, scale: isBlooomed ? 1.4 : isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Sway wrapper */}
      <motion.div
        style={{ width: '100%', height: '100%' }}
        animate={{ rotate: isBlooomed ? 0 : ['-3deg', '3deg', '-3deg'] }}
        transition={isBlooomed ? {} : { duration: 3 + (data.id||0) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerShape color={data.color} secondary={data.secondary} isHovered={isHovered} isBlooomed={isBlooomed} />
      </motion.div>

      {/* Name label - only show if name exists and not in bouquet view */}
      {data.name && onSelect && (
        <motion.div
          className="absolute text-center w-24 pointer-events-none"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: -22,
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            letterSpacing: '0.1em',
            color: data.color,
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
