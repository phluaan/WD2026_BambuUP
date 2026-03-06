import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import Flower from './Flower'
import { flowerTypes, moodPalettes, energyTraits, generateMessage } from '../data/bouquet'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function GardenScene({ onFinale }) {
  const [step, setStep] = useState('form') // 'form' | 'bouquet'
  const [name, setName] = useState('')
  const [flowerId, setFlowerId] = useState('rose')
  const [moodId, setMoodId] = useState('bloom')
  const [energyId, setEnergyId] = useState('creative')

  const currentFlower = flowerTypes.find(f => f.id === flowerId)
  const currentMood = moodPalettes.find(m => m.id === moodId)
  
  const handleGrow = () => {
    if (name.trim()) setStep('bouquet')
  }

  // Bouquet structural arrangement
  const bouquetPositions = [
    { x: 50, y: 35, size: 'large', delay: 0, rotate: 0 },
    { x: 40, y: 45, size: 'normal', delay: 0.2, rotate: -15 },
    { x: 60, y: 45, size: 'normal', delay: 0.4, rotate: 15 },
    { x: 32, y: 55, size: 'small', delay: 0.6, rotate: -25 },
    { x: 68, y: 55, size: 'small', delay: 0.8, rotate: 25 },
    { x: 50, y: 60, size: 'normal', delay: 1.0, rotate: 0 },
  ]

  return (
    <motion.div
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{
        background: `linear-gradient(180deg, ${currentMood?.bg[0] || '#0B0F1A'} 0%, ${currentMood?.bg[1] || '#0f1724'} 60%, ${currentMood?.bg[2] || '#111a10'} 100%)`,
        transition: 'background 1s ease-in-out'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <ParticleBackground phase={step === 'form' ? 'intro-bamboo' : 'garden'} />

      {/* Decorative stars/fireflies for background depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              background: currentMood?.colors[i % 3] || 'white',
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              boxShadow: `0 0 10px ${currentMood?.colors[i % 3]}`
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-12 px-6">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-2xl bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl text-center mb-2" style={{ fontFamily: '"Playfair Display", serif', color: '#064E3B' }}>
                Plant Your Seed
              </h2>
              <p className="text-center text-gray-600 mb-10 font-light tracking-wide text-sm">
                Every garden is unique. Tell us about yourself.
              </p>

              <div className="space-y-8">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 text-sm mb-3 uppercase tracking-widest font-medium">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your beautiful name..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:border-[#059669] transition-colors"
                  />
                </div>

                {/* Flower Selection */}
                <div>
                  <label className="block text-gray-700 text-sm mb-3 uppercase tracking-widest font-medium">Your Flower ({currentFlower?.name})</label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {flowerTypes.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFlowerId(f.id)}
                        className={`flex flex-col items-center p-3 rounded-xl border transition-all ${flowerId === f.id ? 'bg-green-50 border-green-300 scale-105 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                      >
                        <span className="text-2xl mb-1">{f.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="block text-gray-700 text-sm mb-3 uppercase tracking-widest font-medium">Your Mood</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {moodPalettes.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setMoodId(m.id)}
                        className={`p-3 rounded-xl border text-xs text-center transition-all ${moodId === m.id ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                      >
                        <div className="flex justify-center gap-1 mb-2">
                          {m.colors.map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                        </div>
                        <span className="text-gray-700 font-medium truncate block">{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Energy Selection */}
                <div>
                  <label className="block text-gray-700 text-sm mb-3 uppercase tracking-widest font-medium">Your Energy</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {energyTraits.map(e => (
                      <button
                        key={e.id}
                        onClick={() => setEnergyId(e.id)}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${energyId === e.id ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                      >
                        <span className="text-xl">{e.icon}</span>
                        <div>
                          <p className="text-gray-900 text-sm font-semibold">{e.name}</p>
                          <p className="text-gray-500 text-xs">{e.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGrow}
                  disabled={!name.trim()}
                  className={`px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2 ${!name.trim() ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-[#10B981] text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:bg-[#059669]'}`}
                >
                  <Sparkles size={18} />
                  Grow Bouquet
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'bouquet' && (
            <motion.div
              key="bouquet"
              className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Left: Bouquet Presentation */}
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] shrink-0">
                {/* Background aura */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${currentFlower?.color}, transparent)`, transform: 'scale(0.8)' }}
                  animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {bouquetPositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)` }}
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: pos.delay, duration: 1.5, type: 'spring' }}
                  >
                    <Flower 
                      data={{ 
                        id: i, 
                        flower: currentFlower.id, 
                        color: currentMood.colors[i % currentMood.colors.length], 
                        secondary: currentMood.colors[(i + 1) % currentMood.colors.length] 
                      }} 
                      size={pos.size}
                      discovered={true}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Right: Message Presentation */}
              <motion.div 
                className="flex-1 bg-white/80 backdrop-blur-xl border border-gray-200 p-8 md:p-12 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {(() => {
                  const msg = generateMessage(name, flowerId, moodId, energyId);
                  return (
                    <>
                      <h3 className="text-3xl mb-6" style={{ fontFamily: '"Playfair Display", serif', color: currentMood.colors[0] }}>
                        {msg.greeting}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                        {msg.body}
                      </p>
                      <p className="text-base text-gray-500 italic mb-10">
                        {msg.closing}
                      </p>
                      <p className="text-xl font-medium tracking-wide" style={{ color: currentMood.colors[1] }}>
                        {msg.wish}
                      </p>
                    </>
                  )
                })()}

                <motion.button
                  className="mt-12 flex items-center gap-3 text-gray-400 hover:text-gray-800 transition-colors uppercase tracking-widest text-xs font-bold"
                  onClick={onFinale}
                  whileHover={{ x: 5 }}
                >
                  Continue to Garden <ArrowRight size={16} />
                </motion.button>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
