import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

export default function IntroScreen({ onComplete }) {
  const [stage, setStage] = useState(0)

  const bambooStalks = useMemo(() => {
    return [...Array(15)].map((_, i) => {
      const isCenter = i === 7;
      const isShoot = isCenter ? false : Math.random() > 0.6; // center is never a shoot, 40% of others are shoots
      const delay = isShoot ? 1.5 + Math.random() * 2 : (isCenter ? 0 : Math.random() * 1.2);
      const height = isCenter ? 75 : (isShoot ? 35 + Math.random() * 15 : 60 + Math.random() * 30);
      const width = isCenter ? 14 : (isShoot ? 8 + Math.random() * 4 : 12 + Math.random() * 8);
      
      const baseAngle = (i - 7) * 2; 
      const rotation = isCenter ? (Math.random() * 2 - 1) : baseAngle + (Math.random() * 6 - 3); 
      
      // Calculate spread manually since we won't use flexbox margins
      const xSpread = (i - 7) * (18 + Math.random() * 4); 
      const xOffset = isCenter ? 0 : xSpread; 
      
      const numJoints = isShoot ? Math.floor(3 + Math.random() * 3) : Math.floor(7 + Math.random() * 4);
      
      const joints = [...Array(numJoints)].map((_, j) => {
        // top percentage (0 is top of stalk, 100 is bottom)
        const top = 90 - (j * (85 / Math.max(1, numJoints - 1))) + (Math.random() * 4 - 2);
        const isTop = j === numJoints - 1;
        
        // Decide branches
        const numBranches = isTop ? 2 : (Math.random() > 0.4 ? 1 : 0);
        
        const branches = [...Array(numBranches)].map((_, b) => {
          // ensure if 2 branches, one goes left, one goes right
          const isRight = numBranches === 2 ? (b === 0) : Math.random() > 0.5;
          const branchAngle = isRight ? 30 + Math.random() * 40 : -30 - Math.random() * 40;
          const branchLength = 20 + Math.random() * 30;
          
          const numLeaves = 3 + Math.floor(Math.random() * 4);
          const leaves = [...Array(numLeaves)].map((_, l) => {
            const posPct = (l + 1) / numLeaves; // 0.3 to 1.0 along the branch
            const leafAngle = isRight ? 20 + Math.random() * 50 : -20 - Math.random() * 50;
            
            return {
               id: l,
               posPct,
               leafAngle,
               length: 25 + Math.random() * 25, 
               width: 3 + Math.random() * 4,
               color: Math.random() > 0.6 ? '#047857' : (Math.random() > 0.3 ? '#059669' : '#10B981')
            }
          });
          
          return { id: b, isRight, branchAngle, branchLength, leaves };
        });
        
        return { top, isTop, branches, id: j };
      });

      return { id: i, isShoot, delay, height, width, rotation, xOffset, joints, buds: [] };
    });
  }, []);

  const stages = [
    {
      id: 'seed',
      texts: [
        "Every great idea begins as a small seed.",
        "With care, patience, and dedication, it begins to grow."
      ],
      action: "Nurture the seed"
    },
    {
      id: 'sprout',
      texts: [
        "Growth happens when talent is nurtured."
      ],
      action: "Water the sprout"
    },
    {
      id: 'bamboo-1',
      texts: [
        "A great team grows like a bamboo forest —",
        "strong, flexible, and always reaching higher."
      ],
      action: "Water the roots"
    },
    {
      id: 'bamboo-2',
      texts: [
        "It takes time to build a strong foundation."
      ],
      action: "Provide nutrients"
    },
    {
      id: 'bamboo-3',
      texts: [
        "Together, we grow into something magnificent."
      ],
      action: "Let it flourish"
    },
    {
      id: 'bloom',
      texts: [
        "Small buds begin appearing...",
        "Each represents potential and creativity."
      ],
      action: "Watch them bloom"
    }
  ]

  const currentStage = stages[stage]

  const handleNext = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1)
    } else {
      onComplete()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F9FFFc 0%, #E6FFF1 100%)', zIndex: 10 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <ParticleBackground phase={`intro-${currentStage.id}`} />

      {/* Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between pb-[10vh] pt-[15vh]">
        
        {/* Left Column: Visual Representation Area */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative text-center">
          <div className="absolute bottom-[0vh] md:bottom-[5vh] left-0 right-0 flex justify-center items-end" style={{ height: '0px' }}>
            <AnimatePresence>
              {stage === 0 && (
                <motion.div
                  key="seed"
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 1 } }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 w-5 h-5 rounded-full"
                  style={{
                    background: '#FDE68A',
                    boxShadow: '0 0 20px #FDE68A, 0 0 40px #FFB347'
                  }}
                />
              )}

            {stage >= 1 && (
            <motion.div
              key="bamboo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute bottom-0 w-full flex justify-center items-end"
            >
              {/* Bamboo stalks */}
              {bambooStalks.map((stalk) => {
                let heightMultiplier = 0;
                if (stage === 1) heightMultiplier = 0.15; // sprout size
                else if (stage === 2) heightMultiplier = 0.3;
                else if (stage === 3) heightMultiplier = 0.65;
                else if (stage >= 4) heightMultiplier = 1;

                const isVisible = (stage === 1 && stalk.id === 7) || 
                                  (stage === 2 && !stalk.isShoot) || 
                                  (stage >= 3);
                
                // Glow appears one stage before the stalk itself grows
                const isGlowVisible = (stage >= 0 && stalk.id === 7) || 
                                      (stage >= 1 && !stalk.isShoot) || 
                                      (stage >= 2 && stalk.isShoot);
                
                return (isVisible || isGlowVisible) && (
                  <div
                    key={stalk.id}
                    className="absolute bottom-0 pointer-events-none z-10 origin-bottom"
                    style={{
                      height: `${stalk.height}vh`,
                      width: `${stalk.width}px`,
                      left: '50%',
                      marginLeft: `-${stalk.width / 2}px`,
                      transform: `translateX(${stalk.xOffset}px)`
                    }}
                  >
                    {/* Glowing effect right before appearance */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isGlowVisible ? (isVisible ? [0, 1.5, 0] : [0.5, 1, 0.5]) : 0, 
                        opacity: isGlowVisible ? (isVisible ? [0, 1, 0] : [0.4, 0.8, 0.4]) : 0 
                      }}
                      transition={{ 
                        duration: isVisible ? 1.5 : 2, 
                        delay: isVisible ? (stalk.delay * 0.5 - 0.2) : Math.random(), 
                        repeat: isVisible ? 0 : Infinity,
                        ease: "easeOut" 
                      }}
                      className="absolute bottom-[-5px] rounded-full z-0"
                      style={{
                        width: isVisible ? 30 : 20, 
                        height: isVisible ? 10 : 6,
                        background: isVisible ? '#6EE7B7' : '#FDE68A', // Yellowish before sprouting, green when sprouting
                        boxShadow: isVisible ? '0 0 20px #10B981, 0 0 40px #34D399' : '0 0 15px #FDE68A, 0 0 30px #FFB347',
                        left: '50%',
                        marginLeft: isVisible ? '-15px' : '-10px',
                      }}
                    />

                    <div
                      className="absolute bottom-0 origin-bottom"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${stalk.rotation}deg)` 
                      }}
                    >
                      {/* STEM */}
                      <motion.div
                        className="absolute bottom-0 w-full origin-bottom"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightMultiplier * 100}%` }}
                        transition={{ duration: 2, delay: stalk.delay * 0.5, ease: "easeOut" }}
                        style={{
                          background: 'linear-gradient(90deg, #022c22 0%, #059669 30%, #34d399 50%, #059669 70%, #022c22 100%)',
                          boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.2), inset -2px 0 4px rgba(255,255,255,0.2), 0 0 10px rgba(16, 185, 129, 0.15)',
                          borderTopLeftRadius: '100%',  
                          borderTopRightRadius: '20%',
                        }}
                      />

                      {/* JOINTS & BRANCHES */}
                      {stalk.joints.map((joint) => {
                        const bottomPercent = 100 - joint.top;
                        const isReached = bottomPercent <= (heightMultiplier * 100 + 5); 
                        
                        return isReached && (
                          <motion.div 
                            key={`joint-${stalk.id}-${joint.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: stalk.delay * 0.5 + 0.5 }}
                            className="absolute w-full"
                            style={{ 
                              top: `${joint.top}%`,
                            }}
                          >
                            {/* "Gồ ghề" Bulging Joint Marker */}
                            <div className="absolute w-[120%] h-[3px] left-[-10%] rounded-full bg-[#34d399] opacity-80 shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                            <div className="absolute w-[110%] h-[2px] left-[-5%] mt-[2px] rounded-full bg-[#022c22] opacity-90" />
                            
                            {/* Branches */}
                            {joint.branches.map(branch => (
                              <motion.div
                                key={`branch-${branch.id}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: stalk.delay * 0.5 + 0.6, duration: 0.6, type: 'spring' }}
                                className="absolute origin-bottom"
                                style={{
                                  width: '2px',
                                  height: `${branch.branchLength}px`,
                                  background: '#047857',
                                  left: '50%',
                                  bottom: '100%',
                                  transform: `rotate(${branch.branchAngle}deg)`,
                                  zIndex: 0
                                }}
                              >
                                {/* Leaves on Branch */}
                                {branch.leaves.map(leaf => (
                                  <motion.div
                                    key={`leaf-${leaf.id}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: stalk.delay * 0.5 + 0.8 + leaf.id * 0.1, duration: 0.5, type: 'spring' }}
                                    className="absolute origin-bottom"
                                    style={{
                                      width: `${leaf.width}px`,
                                      height: `${leaf.length}px`,
                                      background: leaf.color,
                                      borderRadius: '0 50% 0 50%',
                                      left: '50%',
                                      marginLeft: `-${leaf.width / 2}px`,
                                      bottom: `${leaf.posPct * 100}%`,
                                      transform: `rotate(${leaf.leafAngle}deg)`,
                                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                      zIndex: 1
                                    }}
                                  />
                                ))}
                              </motion.div>
                            ))}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div> {/* Close Left Column */}

      {/* Right Column: Text and Actions */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center z-10 pointer-events-auto h-[50vh] md:h-full pb-[10vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="h-[150px] md:h-[200px] flex flex-col justify-center items-center gap-4 mb-[-2vh] md:mb-0 mt-[-5vh] md:mt-[-10vh]"
          >
            {currentStage.texts.map((text, i) => (
              <motion.h2
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 1.5 + 0.5, duration: 1.5 }}
                className="text-2xl md:text-5xl leading-tight"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#064E3B',
                  textShadow: '0 2px 10px rgba(6, 78, 59, 0.05)'
                }}
              >
                {text}
              </motion.h2>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: currentStage.texts.length * 1.5 + 0.5, duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(110, 231, 183, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="mt-[10vh] md:mt-[15vh] px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase cursor-pointer border"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.2))',
            borderColor: 'rgba(5, 150, 105, 0.6)',
            color: '#047857',
            boxShadow: '0 4px 15px rgba(5, 150, 105, 0.15)'
          }}
        >
          {currentStage.action}
        </motion.button>
      </div>
    </div>
      
      {/* Ground platform */}
      <div className="absolute bottom-[20vh] w-[80vw] h-[2px] opacity-30" style={{ background: 'radial-gradient(ellipse at center, #6EE7B7 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10vh] w-[100vw] h-[10vh]" style={{ background: 'linear-gradient(to bottom, rgba(249,255,252,0), rgba(16,185,129,0.1))' }} />
    </motion.div>
  )
}
