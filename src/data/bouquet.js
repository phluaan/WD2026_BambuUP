// Flower catalog: 10 flowers with color swatches, meanings, and svgType mapping
// svgType must match a key in Flower.jsx FLOWER_SVGS: tulip | sunflower | rose | orchid | cherry | peony | lotus
export const flowerCatalog = [
  {
    id: 'rose',
    svgType: 'rose',
    name: 'Rose',
    emoji: '\uD83C\uDF39',
    colors: [
      { id: 'red',    label: 'Red',    hex: '#FF4D6D' },
      { id: 'pink',   label: 'Pink',   hex: '#FF7EB6' },
      { id: 'white',  label: 'White',  hex: '#f0dde4' },
      { id: 'yellow', label: 'Yellow', hex: '#F59E0B' },
    ],
    defaultColor: '#FF4D6D',
    secondary: '#FF8FA3',
    glow: 'rgba(255, 77, 109, 0.45)',
  },
  {
    id: 'tulip',
    svgType: 'tulip',
    name: 'Tulip',
    emoji: '\uD83C\uDF37',
    colors: [
      { id: 'pink',   label: 'Pink',   hex: '#FF7EB6' },
      { id: 'purple', label: 'Purple', hex: '#A78BFA' },
      { id: 'orange', label: 'Orange', hex: '#FFB347' },
      { id: 'red',    label: 'Red',    hex: '#FF4D6D' },
    ],
    defaultColor: '#FF7EB6',
    secondary: '#FFB3D1',
    glow: 'rgba(255, 126, 182, 0.45)',
  },
  {
    id: 'sunflower',
    svgType: 'sunflower',
    name: 'Sunflower',
    emoji: '\uD83C\uDF3B',
    colors: [
      { id: 'yellow', label: 'Yellow', hex: '#FFB347' },
      { id: 'golden', label: 'Golden', hex: '#F59E0B' },
    ],
    defaultColor: '#FFB347',
    secondary: '#FFD080',
    glow: 'rgba(255, 179, 71, 0.45)',
  },
  {
    id: 'orchid',
    svgType: 'orchid',
    name: 'Orchid',
    emoji: '\uD83E\uDEB7',
    colors: [
      { id: 'purple', label: 'Purple', hex: '#A78BFA' },
      { id: 'pink',   label: 'Pink',   hex: '#FF7EB6' },
      { id: 'white',  label: 'White',  hex: '#e8e4f0' },
    ],
    defaultColor: '#A78BFA',
    secondary: '#C4B5FD',
    glow: 'rgba(167, 139, 250, 0.45)',
  },
  {
    id: 'cherry',
    svgType: 'cherry',
    name: 'Cherry Blossom',
    emoji: '\uD83C\uDF38',
    colors: [
      { id: 'light_pink', label: 'Light Pink', hex: '#FFB7C5' },
      { id: 'deep_pink',  label: 'Deep Pink',  hex: '#FF7EB6' },
    ],
    defaultColor: '#FFB7C5',
    secondary: '#FFD6E0',
    glow: 'rgba(255, 183, 197, 0.45)',
  },
  {
    id: 'peony',
    svgType: 'peony',
    name: 'Peony',
    emoji: '\uD83D\uDC90',
    colors: [
      { id: 'pink',  label: 'Pink',  hex: '#FF6B9D' },
      { id: 'red',   label: 'Red',   hex: '#FF4D6D' },
      { id: 'white', label: 'White', hex: '#f5e8ec' },
    ],
    defaultColor: '#FF6B9D',
    secondary: '#FFADC4',
    glow: 'rgba(255, 107, 157, 0.45)',
  },
  {
    id: 'lotus',
    svgType: 'lotus',
    name: 'Lotus',
    emoji: '\uD83E\uDEB7',
    colors: [
      { id: 'teal',  label: 'Teal',  hex: '#6EE7B7' },
      { id: 'pink',  label: 'Pink',  hex: '#FF7EB6' },
      { id: 'white', label: 'White', hex: '#e4f5ef' },
    ],
    defaultColor: '#6EE7B7',
    secondary: '#A7F3D0',
    glow: 'rgba(110, 231, 183, 0.45)',
  },
  {
    id: 'lily',
    svgType: 'cherry',
    name: 'Lily',
    emoji: '\uD83C\uDF3A',
    colors: [
      { id: 'white',  label: 'White',  hex: '#f0eeea' },
      { id: 'pink',   label: 'Pink',   hex: '#FF7EB6' },
      { id: 'orange', label: 'Orange', hex: '#FFB347' },
    ],
    defaultColor: '#FFB7C5',
    secondary: '#FFD6E0',
    glow: 'rgba(255, 183, 197, 0.45)',
  },
  {
    id: 'daisy',
    svgType: 'sunflower',
    name: 'Daisy',
    emoji: '\uD83C\uDF3C',
    colors: [
      { id: 'yellow', label: 'Yellow', hex: '#FDE68A' },
      { id: 'pink',   label: 'Pink',   hex: '#FFB7C5' },
    ],
    defaultColor: '#FDE68A',
    secondary: '#FEF3C7',
    glow: 'rgba(253, 230, 138, 0.45)',
  },
  {
    id: 'lavender',
    svgType: 'orchid',
    name: 'Lavender',
    emoji: '\uD83D\uDC9C',
    colors: [
      { id: 'purple', label: 'Purple', hex: '#A78BFA' },
      { id: 'light',  label: 'Light',  hex: '#C4B5FD' },
    ],
    defaultColor: '#A78BFA',
    secondary: '#C4B5FD',
    glow: 'rgba(167, 139, 250, 0.45)',
  },
]

// ─── Message system ─────────────────────────────────────────────────────────

const FLOWER_META = {
  rose:      { trait: 'đam mê',         lead: 'đam mê và lòng dũng cảm',              verb: 'nói lên sự quyết tâm và lòng dũng cảm rực lửa thúc đẩy bạn tiến về phía trước' },
  sunflower: { trait: 'ấm áp',          lead: 'sự ấm áp và lạc quan',                 verb: 'phản ánh ánh sáng ổn định bạn mang đến trong mỗi căn phòng — một sự ấm áp nâng đỡ tất cả những người xung quanh' },
  tulip:     { trait: 'tò mò',          lead: 'sự tò mò và những ý tưởng mới',        verb: 'gợi lên một tình yêu học hỏi và một tâm trí luôn vươn tới điều gì đó mới mẻ' },
  orchid:    { trait: 'thanh lịch',     lead: 'sự thanh lịch và trí tuệ',             verb: 'bộc lộ một bản chất hiếm có và tinh tế — người mang lại sự duyên dáng và chính xác trong mọi điều mình chạm vào' },
  cherry:    { trait: 'sáng tạo',       lead: 'sự sáng tạo và nguồn cảm hứng',       verb: 'nắm bắt người nghệ sĩ trong bạn — người tìm thấy vẻ đẹp trong những khoảnh khắc nhỏ và biến cảm hứng thành điều gì đó thực sự' },
  peony:     { trait: 'tự tin',         lead: 'sự tự tin và thịnh vượng',             verb: 'nói lên cách bạn tiếp cận cuộc sống một cách táo bạo và chắc chắn — một năng lượng tự nhiên thu hút cơ hội và thành công' },
  lotus:     { trait: 'kiên cường',     lead: 'sự kiên cường và sự chuyển hóa',      verb: 'kể câu chuyện về người vươn lên sau mỗi thử thách mạnh mẽ và đẹp hơn trước' },
  lily:      { trait: 'tận tụy',        lead: 'sự tận tụy và sức mạnh thầm lặng',    verb: 'phản ánh lòng trung thành sâu sắc và tấm lòng trong sáng — sức mạnh thầm lặng, không lay chuyển, giữ vững mọi thứ' },
  lavender:  { trait: 'trí tuệ',        lead: 'sự khôn ngoan bình thản và cân bằng', verb: 'nói về một tâm hồn mang lại bình yên và sự sáng suốt đến bất cứ nơi nào — chu đáo, vững vàng và thật sự uyên thâm' },
  daisy:     { trait: 'niềm vui',       lead: 'niềm vui và sự cởi mở',               verb: 'phản ánh niềm vui chân thực, tự nhiên mà bạn gặp gỡ thế giới — cởi mở, tốt bụng và tràn ngập ánh sáng' },
}

const ENCOURAGEMENTS = [
  'Chúc hành trình của bạn tiếp tục nở rộ với những ý tưởng mới, thành tựu mới và những khoảnh khắc hạnh phúc mới.',
  'Như một khu vườn xanh tươi, chúc sự hiện diện của bạn tiếp tục mang lại màu sắc, sức sống và những điều kỳ diệu đến bất cứ nơi nào bạn đặt chân.',
  'Chúc mỗi mùa mang đến cho bạn sự phát triển mới, vẻ đẹp mới và những lý do mới để tôn vinh tất cả những gì bạn đang có.',
  'Chúc tài năng của bạn tiếp tục nở rộ và truyền cảm hứng cho những người may mắn được ở bên bạn.',
]

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function joinList(arr) {
  if (arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  return arr.slice(0, -1).join(', ') + ' và ' + arr.at(-1)
}

export function generateBouquetMessage(name, selectedFlowers) {
  const flowers = (selectedFlowers || [])
    .map((sf) => FLOWER_META[sf.flowerId])
    .filter(Boolean)

  if (flowers.length === 0) {
    return {
      greeting: `${name},`,
      paragraphs: ['Khu vườn của bạn đang sẵn sàng nở rộ.'],
      wish: "Chúc mừng Ngày Phụ nữ.",
    }
  }

  const count = flowers.length
  const traits = flowers.map((f) => f.trait)
  const traitList = joinList(traits)
  const encouragement = ENCOURAGEMENTS[count % ENCOURAGEMENTS.length]

  let paragraphs

  if (count === 1) {
    const f = flowers[0]
    paragraphs = [
      `Có điều gì đó thật đẹp và lặng lẽ trong bông hoa bạn chọn — và nó nói lên rất nhiều về con người bạn.`,
      `${cap(f.verb)}.`,
      `Trong một thế giới đang chuyển động nhanh, ${f.trait} của bạn là món quà hiếm quý và trân trọng dành cho những ai may mắn được biết bạn.`,
      encouragement,
    ]
  } else if (count === 2) {
    const [f1, f2] = flowers
    paragraphs = [
      `Bó hoa bạn tạo ra phản ánh sự hòa quyện đẹp đẽ giữa ${f1.lead} và ${f2.lead}.`,
      `${cap(f1.verb)}, trong khi ${f2.verb} — cùng nhau, những phẩm chất này vẽ nên chân dung của người dẫn dắt bằng cả trái tim lẫn mục đích, và sự hiện diện của họ khiến những người xung quanh cảm thấy được truyền cảm hứng và an yên.`,
      encouragement,
    ]
  } else if (count <= 4) {
    const [f1, f2, ...rest] = flowers
    const restTraits = rest.map((f) => f.trait)
    paragraphs = [
      `Những bông hoa trong bó của bạn vẽ nên chân dung sống động về ${traitList}.`,
      `${cap(f1.verb)}. ${cap(f2.verb)}.`,
      `Dệt qua tất cả — một sợi chỉ của ${joinList(restTraits)} hoàn thiện bức tranh và làm cho tổng thể lớn hơn bất kỳ bông hoa đơn lẻ nào.`,
      `Như một khu vườn được chăm sóc kỹ lưỡng, bạn hội tụ nhiều phẩm chất đẹp đẽ. Những người xung quanh bạn trở nên phong phú hơn vì điều đó.`,
      encouragement,
    ]
  } else {
    const [f1, f2, f3] = flowers
    paragraphs = [
      `Bó hoa của bạn là một khu vườn của nhiều điểm mạnh — ${traitList}, và còn nhiều hơn thế nữa.`,
      `${cap(f1.verb)}. ${cap(f2.verb)}. ${cap(f3.verb)}.`,
      `Một người có nhiều phẩm chất là món quà cho thế giới. Sự phong phú bạn mang trong mình — sự sáng tạo, sự ấm áp, sự kiên cường — làm cho mọi không gian bạn bước vào trở nên sinh động và trọn vẹn hơn.`,
      encouragement,
    ]
  }

  return {
    greeting: `${name},`,
    paragraphs,
    wish: "Chúc mừng Ngày Phụ nữ.",
  }
}
