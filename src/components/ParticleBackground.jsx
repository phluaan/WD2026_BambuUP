import { useEffect, useRef } from 'react'

export default function ParticleBackground({ phase }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = phase.startsWith('intro') ? (phase === 'intro-seed' ? 40 : phase === 'intro-bloom' ? 100 : 80) : 150
    particlesRef.current = Array.from({ length: count }, () => createParticle(canvas, phase))

    let lastTime = 0
    const animate = (time) => {
      const delta = time - lastTime
      lastTime = time
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p) => {
        updateParticle(p, canvas, delta)
        drawParticle(ctx, p)
      })
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [phase])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

function createParticle(canvas, phase) {
  let colors = ['#FDE68A', '#34D399', '#6EE7B7'] // Defaults: Gold, Green
  let isLeaf = false
  let isPetal = false
  let speedMultiplier = 1

  if (phase === 'intro-seed') {
    colors = ['#FDE68A', '#FFB347', '#059669']
    speedMultiplier = 0.5
  } else if (phase === 'intro-sprout') {
    colors = ['#059669', '#34D399', '#FDE68A']
  } else if (phase === 'intro-bamboo') {
    colors = ['#059669', '#10B981', '#6EE7B7']
    // Some are bamboo leaves falling/swaying
    isLeaf = Math.random() < 0.3
  } else if (phase === 'intro-bloom') {
    colors = ['#FF7EB6', '#FDE68A', '#6EE7B7', '#FFB3D1']
    isPetal = Math.random() < 0.2
  } else if (phase === 'garden') {
    colors = ['#FF7EB6', '#FFB347', '#A78BFA', '#6EE7B7', '#FDE68A']
    isPetal = Math.random() < 0.1
    isLeaf = Math.random() < 0.1
  }

  const color = colors[Math.floor(Math.random() * colors.length)]

  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (isLeaf ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 0.5) * speedMultiplier,
    vy: (isLeaf ? Math.random() * 0.8 + 0.2 : -Math.random() * 0.4 - 0.1) * speedMultiplier,
    radius: isPetal ? Math.random() * 3 + 2 : isLeaf ? Math.random() * 4 + 1 : Math.random() * 2 + 0.5,
    color,
    alpha: Math.random() * 0.6 + 0.2,
    alphaDir: Math.random() > 0.5 ? 0.003 : -0.003,
    type: isLeaf ? 'leaf' : isPetal ? 'petal' : 'dot',
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05
  }
}

function updateParticle(p, canvas, delta) {
  p.x += p.vx
  p.y += p.vy
  p.alpha += p.alphaDir
  p.rotation += p.rotationSpeed

  if (p.alpha > 0.8 || p.alpha < 0.1) p.alphaDir *= -1
  
  if (p.type === 'leaf' && p.y > canvas.height + 10) {
    p.y = -10
    p.x = Math.random() * canvas.width
  } else if (p.type !== 'leaf' && (p.y < -10 || p.x < -10 || p.x > canvas.width + 10)) {
    p.x = Math.random() * canvas.width
    p.y = canvas.height + 10
    p.vx = (Math.random() - 0.5) * 0.5
    p.vy = -Math.random() * 0.4 - 0.1
  }
}

function drawParticle(ctx, p) {
  ctx.save()
  
  // Adjusted for light background
  ctx.globalAlpha = p.alpha * 0.7 // slightly lower alpha
  
  // Remove shadow blur as it looks muddy on white background, 
  // or use a very soft shadow
  ctx.shadowBlur = p.type === 'dot' ? 2 : 0
  ctx.shadowColor = p.color
  ctx.fillStyle = p.color

  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)

  if (p.type === 'leaf') {
    ctx.beginPath()
    ctx.ellipse(0, 0, p.radius * 2, p.radius / 2, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.type === 'petal') {
    ctx.beginPath()
    ctx.ellipse(0, 0, p.radius, p.radius * 0.7, 0, 0, Math.PI * 2)
    ctx.fill()
  } else {
    ctx.beginPath()
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2)
    ctx.fill()
  }
  
  ctx.restore()
}
