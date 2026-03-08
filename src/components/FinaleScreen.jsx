import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const PETAL_COLORS = ['#FF7EB6', '#FFB347', '#A78BFA', '#6EE7B7', '#FDE68A']

export default function FinaleScreen({ onRestart }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(180deg, #F5F5FA 0%, #EFEFF5 100%)', zIndex: 30 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <ParticleBackground phase="finale" />

      {/* Falling petals */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 8 + Math.random() * 12,
            height: 8 + Math.random() * 12,
            background: PETAL_COLORS[i % PETAL_COLORS.length],
            left: `${Math.random() * 100}%`,
            top: -20,
            opacity: 0.7,
            filter: `blur(0.5px) drop-shadow(0 0 6px ${PETAL_COLORS[i % PETAL_COLORS.length]})`,
          }}
          animate={{
            y: window.innerHeight + 40,
            x: (Math.random() - 0.5) * 250,
            rotate: Math.random() * 900,
            opacity: [0.7, 0.4, 0],
          }}
          transition={{
            delay: i * 0.18,
            duration: 5 + Math.random() * 4,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}

      {/* Glow orbs */}
      {PETAL_COLORS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200 + i * 30,
            height: 200 + i * 30,
            background: `radial-gradient(circle, ${c}18, transparent)`,
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 max-w-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 150 }}
          className="text-6xl mb-8"
        >
          🌸
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm tracking-[0.3em] uppercase mb-6 font-semibold"
          style={{ color: '#064E3B', fontFamily: 'Inter' }}
        >
          Chào mừng Ngày Quốc tế Phụ nữ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="text-3xl md:text-5xl leading-relaxed mb-6 font-medium"
          style={{
            fontFamily: '"Playfair Display", serif',
            color: '#111827',
          }}
        >
          Gửi đến những người phụ nữ phi thường
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-2xl md:text-4xl mb-10 font-bold"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            color: '#059669',
          }}
        >
          cảm ơn đã giúp khu vườn đổi mới sáng tạo luôn nở rộ.
        </motion.h2>

        <motion.div
          className="w-32 mx-auto mb-10"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, #FF7EB6, #A78BFA, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          className="text-sm mb-8 font-medium"
          style={{ color: '#4B5563', fontFamily: 'Inter', letterSpacing: '0.05em' }}
        >
          Sự tài giỏi, lòng tốt và sức mạnh của các bạn truyền cảm hứng cho chúng tôi mỗi ngày.<br />
          Khu vườn này tồn tại là nhờ có các bạn. 💫
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="flex flex-col items-center justify-center mb-10 gap-2"
        >
          <span className="text-xs italic text-gray-400 font-medium font-serif">— Từ —</span>
          <img 
            src="/favicon.png" 
            alt="BambuUP" 
            className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-500"
          />
        </motion.div>

        <motion.button
          
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(5, 150, 105, 0.2)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase cursor-pointer border"
          style={{
            fontFamily: 'Inter',
            background: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(5, 150, 105, 0.4)',
            color: '#047857',
          }}
        >
          Quay lại Khu Vườn
        </motion.button>
      </div>
    </motion.div>
  )
}
