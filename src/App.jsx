import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import GardenScene from './components/GardenScene'
import FinaleScreen from './components/FinaleScreen'

export default function App() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'garden' | 'finale'

  return (
    <div className="w-full h-full" style={{ background: '#0B0F1A' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <IntroScreen key="intro" onComplete={() => setPhase('garden')} />
        )}
        {phase === 'garden' && (
          <GardenScene key="garden" onFinale={() => setPhase('finale')} />
        )}
        {phase === 'finale' && (
          <FinaleScreen key="finale" onRestart={() => setPhase('garden')} />
        )}
      </AnimatePresence>
    </div>
  )
}
