export const flowerTypes = [
  {
    id: 'rose',
    name: 'Rose',
    emoji: '🌹',
    description: 'Timeless & passionate',
    color: '#FF4D6D',
    secondary: '#FF8FA3',
    petals: 6,
  },
  {
    id: 'tulip',
    name: 'Tulip',
    emoji: '🌷',
    description: 'Fresh & elegant',
    color: '#FF7EB6',
    secondary: '#FFB3D1',
    petals: 5,
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    emoji: '🌻',
    description: 'Bright & joyful',
    color: '#FFB347',
    secondary: '#FFD080',
    petals: 14,
  },
  {
    id: 'orchid',
    name: 'Orchid',
    emoji: '🪷',
    description: 'Rare & refined',
    color: '#A78BFA',
    secondary: '#C4B5FD',
    petals: 5,
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    emoji: '🌸',
    description: 'Delicate & dreamy',
    color: '#FFB7C5',
    secondary: '#FFD6E0',
    petals: 5,
  },
  {
    id: 'peony',
    name: 'Peony',
    emoji: '💐',
    description: 'Abundant & graceful',
    color: '#FF6B9D',
    secondary: '#FFADC4',
    petals: 8,
  },
  {
    id: 'lotus',
    name: 'Lotus',
    emoji: '🪷',
    description: 'Pure & transcendent',
    color: '#6EE7B7',
    secondary: '#A7F3D0',
    petals: 6,
  },
]

export const moodPalettes = [
  {
    id: 'sunrise',
    name: 'Warm Sunrise',
    colors: ['#FFB347', '#FF7EB6', '#FDE68A'],
    bg: ['#FFFDF9', '#FFF8F0', '#FFF1E5'],
    lightColor: 'rgba(255,179,71,0.15)',
    description: 'Golden warmth',
  },
  {
    id: 'harmony',
    name: 'Elegant Harmony',
    colors: ['#A78BFA', '#6EE7B7', '#C4B5FD'],
    bg: ['#FCFCFF', '#F5F5FA', '#EFEFF5'],
    lightColor: 'rgba(167,139,250,0.12)',
    description: 'Serene balance',
  },
  {
    id: 'energy',
    name: 'Vibrant Energy',
    colors: ['#FF4D6D', '#FFB347', '#FDE68A'],
    bg: ['#FFF9F9', '#FFF3F3', '#FFEDED'],
    lightColor: 'rgba(255,77,109,0.15)',
    description: 'Bold vitality',
  },
  {
    id: 'spring',
    name: 'Soft Spring',
    colors: ['#6EE7B7', '#A7F3D0', '#FDE68A'],
    bg: ['#F9FFFc', '#F0FFF7', '#E6FFF1'],
    lightColor: 'rgba(110,231,183,0.12)',
    description: 'Fresh renewal',
  },
  {
    id: 'bloom',
    name: 'Creative Bloom',
    colors: ['#FF7EB6', '#A78BFA', '#6EE7B7'],
    bg: ['#FFFAFC', '#FFF3F8', '#FFECF4'],
    lightColor: 'rgba(255,126,182,0.12)',
    description: 'Inspired creation',
  },
]

export const energyTraits = [
  {
    id: 'creative',
    name: 'Creative',
    icon: '✨',
    description: 'Ideas flow like water',
  },
  {
    id: 'resilient',
    name: 'Resilient',
    icon: '🌿',
    description: 'Strength through challenge',
  },
  {
    id: 'graceful',
    name: 'Graceful',
    icon: '🕊️',
    description: 'Elegance in motion',
  },
  {
    id: 'innovative',
    name: 'Innovative',
    icon: '💡',
    description: 'Always finding new paths',
  },
  {
    id: 'energetic',
    name: 'Energetic',
    icon: '⚡',
    description: 'Unstoppable momentum',
  },
  {
    id: 'visionary',
    name: 'Visionary',
    icon: '🔭',
    description: 'Seeing beyond the horizon',
  },
]

const energyMessages = {
  creative:
    'Your creativity is like a garden in full bloom — always bringing something new and beautiful into the world. Every idea you plant grows into something extraordinary.',
  resilient:
    'Like bamboo, you bend but never break. Your resilience is a quiet strength that lifts everyone around you, even in the most difficult seasons.',
  graceful:
    'There is a quiet power in your grace. The way you move through challenges — with elegance and poise — inspires those around you to do the same.',
  innovative:
    'You see possibilities where others see walls. Your innovation lights new paths for the whole team, turning obstacles into beautiful new directions.',
  energetic:
    'Your energy is contagious. You lift the entire team and make even the most difficult days feel full of possibility and purpose.',
  visionary:
    'You see what others can\'t yet imagine. Your vision helps all of us grow toward something greater — and we are better because of it.',
}

export function generateMessage(name, flowerId, moodId, energyId) {
  const flower = flowerTypes.find((f) => f.id === flowerId)
  const energy = energyTraits.find((e) => e.id === energyId)
  const body = energyMessages[energyId] || energyMessages.creative

  return {
    greeting: `${name},`,
    body,
    closing: `Like a ${flower?.name.toLowerCase() || 'flower'} reaching for the light, may your ${energy?.name.toLowerCase() || 'unique'} spirit continue to bloom and inspire those around you.`,
    wish: 'Happy Women\'s Day. 🌸',
  }
}
