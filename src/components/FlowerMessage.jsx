import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const FLOWER_EMOJI = {
  tulip: '🌷',
  sunflower: '🌻',
  lavender: '💜',
  rose: '🌹',
  lily: '🌺',
  jasmine: '🤍',
  orchid: '🪷',
  daisy: '🌼',
}

export default function FlowerMessage({ flower, onClose }) {
  const petalsRef = useRef([])

  useEffect(() => {
    if (!flower) return

    // Generate floating petals
    petalsRef.current = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 6 + Math.random() * 10,
      color: flower.color,
    }))
  }, [flower])

  return (
    <AnimatePresence>
      {flower && (
        <motion.div
          key="overlay"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 50, background: 'rgba(11,15,26,0.85)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          {/* Floating petals */}
          {Array.from({ length: 18 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 6 + Math.random() * 10,
                height: 6 + Math.random() * 10,
                background: flower.color,
                left: `${Math.random() * 100}%`,
                top: '-10px',
                opacity: 0.6,
                filter: `blur(1px) drop-shadow(0 0 4px ${flower.color})`,
              }}
              animate={{
                y: window.innerHeight + 50,
                x: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 720,
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                delay: i * 0.15,
                duration: 4 + Math.random() * 3,
                ease: 'easeIn',
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* Card */}
          <motion.div
            className="relative rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08))',
              border: `1px solid ${flower.color}44`,
              boxShadow: `0 0 60px ${flower.glowColor}, 0 20px 40px rgba(0,0,0,0.6)`,
            }}
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              <X size={16} />
            </button>

            {/* Bloom animation */}
            <motion.div
              className="text-6xl mb-4 inline-block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              {FLOWER_EMOJI[flower.flower] || '🌸'}
            </motion.div>

            {/* Glow ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 160,
                height: 160,
                background: `radial-gradient(circle, ${flower.glowColor}, transparent)`,
                top: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'blur(20px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.p
              className="text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: flower.color, fontFamily: 'Inter', fontWeight: 400 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {flower.flower}
            </motion.p>

            <motion.h2
              className="text-4xl mb-6"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: '#FDE68A',
                textShadow: `0 0 20px ${flower.color}66`,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {flower.name}
            </motion.h2>

            <motion.div
              className="w-16 mx-auto mb-6"
              style={{ height: 1, background: `linear-gradient(90deg, transparent, ${flower.color}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            <motion.p
              className="text-base leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              &ldquo;{flower.message}&rdquo;
            </motion.p>

            {/* Confetti dots */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 4,
                  height: 4,
                  background: flower.color,
                  left: `${10 + i * 11}%`,
                  bottom: '15%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  delay: 0.8 + i * 0.1,
                  duration: 1.2,
                  repeat: 3,
                  repeatDelay: 1.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
