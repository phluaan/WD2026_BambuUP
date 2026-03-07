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

// ─── Expanded message system — 100+ unique combinations ─────────────────────
// Per-flower: 6 personality reads + 6 wishes = 120 data items
// Combos: 10 intros × 6 reads × 6 wishes = 360 single; pairs/multi add thousands more.

const FLOWER_PROFILES = {
  rose: {
    reads: [
      'Bạn làm việc gì cũng bằng cả con người. Không nửa vời, không bỏ giữa chừng.',
      'Bạn biết mình muốn gì — và có đủ can đảm để đi đến cùng với điều đó.',
      'Người ta thấy sự rõ ràng trong bạn. Bạn không ngại nói thật, không ngại đứng vững.',
      'Bạn có một thứ nhiều người thiếu: ngọn lửa bên trong không tắt dù hoàn cảnh thay đổi.',
      'Đam mê của bạn không phải kiểu thời thượng. Nó thực — và người xung quanh cảm nhận được.',
      'Bạn không sợ khó — bạn sợ không làm hết sức. Đó là thứ làm bạn khác biệt.',
    ],
    wishes: [
      'Chúc bạn tiếp tục cháy — đúng mức, đúng hướng.',
      'Chúc những gì bạn đặt cược bằng trái tim sẽ đền đáp xứng đáng.',
      'Chúc bạn không bao giờ phải nhỏ lại để vừa với ai đó.',
      'Chúc năm nay bạn gặt những gì bạn đã gieo bằng sự quyết tâm.',
      'Chúc ngọn lửa đó không bao giờ hết — và bạn tìm được người cùng giữ lửa.',
      'Chúc mỗi quyết định dũng cảm của bạn dẫn đến đúng nơi cần đến.',
    ],
  },
  tulip: {
    reads: [
      'Bạn luôn hỏi "tại sao". Không phải vì không biết, mà vì bạn muốn hiểu sâu hơn.',
      'Bạn thích bắt đầu điều mới — không phải vì bồn chồn, mà vì tâm trí bạn luôn đang lớn.',
      'Có cái gì đó tươi trong cách bạn nhìn mọi thứ. Bạn không để quen thuộc biến thành nhàm chán.',
      'Bạn học không phải để chứng tỏ. Bạn học vì thật sự thích — đó là sự khác biệt.',
      'Bạn thường là người đầu tiên trong nhóm thử cái mới và người cuối cùng ngừng thắc mắc.',
      'Bạn kéo người xung quanh vào những cuộc trò chuyện đáng nghĩ hơn. Đó là một món quà.',
    ],
    wishes: [
      'Chúc bạn luôn tìm thấy điều gì đó mới để tò mò.',
      'Chúc hành trình học của bạn không bao giờ chán.',
      'Chúc mỗi câu hỏi dẫn bạn đến đúng nơi cần đến.',
      'Chúc bạn luôn có không gian để thử — và dũng cảm để thất bại rồi thử lại.',
      'Chúc tâm trí bạn tiếp tục lớn, không ngừng, không giới hạn.',
      'Chúc sự tò mò của bạn mở ra những cánh cửa bạn chưa tưởng tượng tới.',
    ],
  },
  sunflower: {
    reads: [
      'Người ta tìm đến bạn không phải vì bạn có câu trả lời, mà vì bên bạn họ thấy nhẹ hơn.',
      'Bạn lan tỏa năng lượng mà không cần cố. Sự hiện diện của bạn đã là một sự an ủi.',
      'Bạn là kiểu người nhớ những thứ nhỏ — sinh nhật, câu chuyện dang dở, người đang khó.',
      'Lạc quan của bạn không phải kiểu tô hồng — bạn chọn đứng phía ánh sáng dù biết có bóng tối.',
      'Bạn giữ nhiều người lại với nhau mà có thể chính bạn không hay biết.',
      'Năng lượng của bạn là thứ mà một tổ chức, một nhóm, một gia đình cần để không rã ra.',
    ],
    wishes: [
      'Chúc bạn nhận lại bao nhiêu ấm áp bạn đã cho đi.',
      'Chúc sự hiện diện của bạn tiếp tục là điều người ta trân trọng nhất trong ngày.',
      'Chúc bạn không bao giờ cạn — và tìm được người tiếp thêm cho bạn khi cần.',
      'Chúc mọi người xung quanh bạn biết họ may mắn ra sao.',
      'Chúc năng lượng bạn lan tỏa quay trở lại với bạn gấp đôi.',
      'Chúc bạn cũng được ai đó nhớ những thứ nhỏ về bạn, giống như bạn nhớ về họ.',
    ],
  },
  orchid: {
    reads: [
      'Bạn chú ý đến chi tiết mà người khác bỏ qua. Đó không phải cầu toàn — đó là tiêu chuẩn.',
      'Bạn ít nói nhưng khi nói thì đáng nghe. Và người ta biết điều đó.',
      'Có sự tinh tế trong cách bạn làm mọi thứ — từ cách bạn chọn từ đến cách bạn xử lý vấn đề.',
      'Bạn không cần phải nổi. Bạn để chất lượng nói thay — và nó nói rất rõ.',
      'Người ta thường nhận ra giá trị của bạn muộn hơn một chút, nhưng khi nhận ra, họ rất trân trọng.',
      'Bạn không thỏa hiệp với những thứ dưới mức bạn biết mình xứng đáng — đó là sự tự trọng.',
    ],
    wishes: [
      'Chúc sự tinh tế của bạn được nhận ra — không muộn hơn bây giờ.',
      'Chúc bạn tiếp tục làm mọi thứ đúng cách, dù không ai nhìn.',
      'Chúc những người thật sự xứng đáng tìm thấy bạn.',
      'Chúc chất lượng trong mọi thứ bạn làm tiếp tục nói lên thay bạn.',
      'Chúc bạn không phải hạ tiêu chuẩn — môi trường xứng đáng với bạn sẽ đến.',
      'Chúc sự chính xác và tinh tế của bạn được đặt vào đúng nơi, đúng người.',
    ],
  },
  cherry: {
    reads: [
      'Bạn thấy đẹp ở những chỗ người khác đi qua mà không nhìn.',
      'Bạn không cần nhiều — một ý tưởng hay, một góc nhìn mới là đủ để bạn hào hứng cả ngày.',
      'Có chất nghệ sĩ trong bạn, dù bạn có gọi nó là vậy hay không.',
      'Bạn làm việc tốt nhất khi có không gian để tư duy — không phải thả nổi, mà là tự do thực sự.',
      'Bạn sống nhiều bằng cảm nhận hơn là lý tính. Và thường đó là lúc bạn quyết định đúng nhất.',
      'Bạn tạo ra những khoảnh khắc đáng nhớ mà người ta mang theo lâu hơn họ nghĩ.',
    ],
    wishes: [
      'Chúc bạn tiếp tục thấy đẹp ở những nơi bình thường nhất.',
      'Chúc ý tưởng của bạn tìm được đường ra thế giới.',
      'Chúc không gian sáng tạo của bạn không bao giờ bị thu hẹp.',
      'Chúc những khoảnh khắc bạn tạo ra cho người khác được nhớ mãi.',
      'Chúc bạn tìm được những người trân trọng cách bạn nhìn thế giới.',
      'Chúc mỗi cảm hứng của bạn trở thành điều gì đó thực — và đáng tự hào.',
    ],
  },
  peony: {
    reads: [
      'Bạn bước vào phòng và người ta chú ý. Không phải vì bạn cố — vì bạn đủ.',
      'Bạn tự tin không phải vì không có nghi ngờ, mà vì bạn đã quyết định không để nghi ngờ lái.',
      'Bạn có năng lực lãnh đạo tự nhiên — không phải kiểu ồn ào, mà kiểu người ta tự nhiên nhìn về phía bạn.',
      'Bạn không xin phép để chiếm không gian. Bạn biết mình có quyền ở đó.',
      'Người ta hay hỏi ý kiến bạn không phải vì bạn biết tất cả — vì bạn nói thẳng và đáng tin.',
      'Bạn biết giá trị của mình và không để ai định giá thấp hơn thực tế.',
    ],
    wishes: [
      'Chúc năm nay bạn tiếp tục chiếm những không gian bạn xứng đáng.',
      'Chúc sự tự tin của bạn lan sang những người cần nó nhất.',
      'Chúc mọi cái gật đầu của bạn dẫn đến đúng cơ hội.',
      'Chúc bạn không bao giờ phải chứng minh gì thêm nữa — với ai cả.',
      'Chúc con đường bạn chọn luôn đủ rộng cho bạn bước.',
      'Chúc sức hút của bạn tiếp tục mở ra những cánh cửa xứng đáng.',
    ],
  },
  lotus: {
    reads: [
      'Bạn đã trải qua những thứ không dễ. Và bạn vẫn đứng đây — đó không phải may mắn.',
      'Bạn không than. Bạn xử lý, học, và tiếp tục. Đó là sức mạnh thật sự.',
      'Người ta thấy bạn bình thản — ít ai biết bình thản đó được xây từ bao nhiêu thứ bạn đã vượt qua.',
      'Bạn có khả năng tìm lại trọng tâm trong lúc hỗn độn. Đó là kỹ năng hiếm và quý.',
      'Bạn không cứng — bạn dẻo. Và đó là lý do bạn không gãy khi bị uốn cong.',
      'Sự chuyển hóa của bạn không phải tự nhiên mà có — nó được mua bằng những ngày bạn chọn tiếp tục.',
    ],
    wishes: [
      'Chúc sau mỗi thử thách bạn tiếp tục lớn hơn một chút.',
      'Chúc sự bình thản của bạn là bến đỗ cho cả bạn lẫn người xung quanh.',
      'Chúc bạn không bao giờ phải gánh một mình những gì đáng được chia sẻ.',
      'Chúc sức mạnh bạn có được nhận ra — bởi người khác và bởi chính bạn.',
      'Chúc mọi thứ bạn đã vượt qua trở thành nền tảng cho điều gì đó đẹp hơn.',
      'Chúc bạn không bao giờ quên mình đã mạnh đến mức nào.',
    ],
  },
  lily: {
    reads: [
      'Bạn là người giữ lời. Trong một thế giới nhiều lời hứa, đó là thứ rất đáng quý.',
      'Bạn làm việc không cần công nhận. Bạn làm vì đó là việc đúng cần làm.',
      'Người ta dựa vào bạn — và bạn thường không thấy nặng, vì đó là cách bạn thể hiện tình cảm.',
      'Bạn là nền tảng trong nhiều mối quan hệ mà bạn không tự biết. Thiếu bạn, nhiều thứ sẽ lung lay.',
      'Sự tận tâm của bạn không ồn ào — nhưng người nào nhận được sẽ nhớ mãi.',
      'Bạn không hứa nhiều — bạn làm nhiều. Và đó là thứ tạo ra sự tin tưởng thật sự.',
    ],
    wishes: [
      'Chúc lòng tận tụy của bạn được trân trọng xứng đáng.',
      'Chúc bạn tìm được những người giữ lời như bạn giữ lời.',
      'Chúc những gì bạn âm thầm đóng góp được nhìn thấy và ghi nhận.',
      'Chúc bạn cũng biết nhận — không chỉ cho đi.',
      'Chúc sự tin cậy bạn xây dựng mang lại cho bạn những điều thật sự xứng đáng.',
      'Chúc bạn không bao giờ phải chứng minh lòng tốt của mình với người không xứng.',
    ],
  },
  lavender: {
    reads: [
      'Bạn không phản ứng ngay. Bạn quan sát, suy nghĩ, rồi mới nói — và thường nói đúng.',
      'Có sự cân bằng trong bạn mà người ta tìm kiếm khi mọi thứ xung quanh hỗn loạn.',
      'Bạn không cần đúng. Bạn cần hiểu. Đó là sự khác biệt của người thật sự khôn ngoan.',
      'Bạn có góc nhìn xa hơn nhiều người — không phải vì thông minh hơn, vì kiên nhẫn hơn.',
      'Người ta hay cảm thấy yên khi ở cạnh bạn. Đó là năng lực đặc biệt mà không phải ai cũng có.',
      'Bạn là người mà người ta gọi khi cần một đầu óc tỉnh táo trong lúc hỗn độn.',
    ],
    wishes: [
      'Chúc sự bình thản của bạn tiếp tục là thứ người ta cần trong những lúc khó.',
      'Chúc bạn tìm được người lắng nghe bạn như bạn lắng nghe người khác.',
      'Chúc trí tuệ của bạn được dùng đúng chỗ và được ghi nhận.',
      'Chúc bạn tiếp tục là người đứng vững khi mọi thứ lung lay.',
      'Chúc mỗi quyết định bình thản của bạn dẫn đến đúng nơi.',
      'Chúc sự khôn ngoan của bạn lan tới những người thật sự cần nó.',
    ],
  },
  daisy: {
    reads: [
      'Bạn không cần màu sắc để nổi bật. Sự chân thành của bạn đã đủ thu hút.',
      'Bạn vui thật — không phải vui để làm hài lòng ai. Và người ta thấy sự khác biệt đó.',
      'Bạn dễ gần không phải vì thiếu chiều sâu, mà vì bạn không cần giả vờ.',
      'Bạn nhắc người ta rằng không phải lúc nào cũng cần phức tạp — đó là giá trị thật.',
      'Bạn có năng lực làm nhẹ không khí trong phòng mà không cần cố gắng.',
      'Niềm vui của bạn không phụ thuộc vào điều kiện — và đó là điều hiếm nhất.',
    ],
    wishes: [
      'Chúc niềm vui của bạn là thứ bạn không bao giờ phải giả vờ.',
      'Chúc sự chân thành của bạn tìm đến những người xứng đáng với nó.',
      'Chúc bạn tiếp tục là điểm sáng trong những ngày bình thường của người khác.',
      'Chúc bạn không bao giờ mất đi sự nhẹ nhàng đó — dù cuộc sống có nặng đến đâu.',
      'Chúc niềm vui bạn mang đến quay trở lại với bạn theo những cách bất ngờ nhất.',
      'Chúc bạn luôn tìm thấy lý do để cười — và lý do đó không bao giờ thiếu.',
    ],
  },
}

// Solo intro lines (10 variants)
const SOLO_INTROS = [
  'Không phải ngẫu nhiên bạn chọn bông hoa này.',
  'Bông hoa bạn chọn nói lên nhiều hơn bạn nghĩ.',
  'Đôi khi cách chúng ta chọn hoa tiết lộ cách chúng ta sống.',
  'Người ta hay chọn thứ phản ánh chính họ mà không hay biết.',
  'Từ lựa chọn nhỏ này, có thể thấy được điều gì đó thật về bạn.',
  'Bông hoa bạn chọn hôm nay nói lên một điều —',
  'Mỗi bông hoa phản ánh một điều gì đó thật trong người chọn nó.',
  'Bông hoa này phù hợp với bạn. Và đây là lý do.',
  'Mỗi lựa chọn đều nói lên điều gì đó — đây là điều bông hoa này nói về bạn.',
  'Có điều gì đó trong bông hoa này mà bạn nhận ra ở chính mình.',
]

// Pair intro lines (6 variants)
const PAIR_INTROS = [
  'Hai bông hoa bạn chọn tạo nên một bức chân dung thú vị —',
  'Sự kết hợp này không thường gặp — và nó nói lên nhiều điều.',
  'Hai điều có vẻ khác nhau, nhưng trong bạn chúng hòa quyện tự nhiên.',
  'Bạn chọn hai thứ tưởng như đối lập — nhưng đó chính là sự phong phú của bạn.',
  'Trong bó hoa của bạn có hai tính cách song song —',
  'Hai bông hoa, hai phẩm chất — và cả hai đều là bạn.',
]

// Bridge phrases connecting two personality reads (6 variants)
const PAIR_BRIDGES = [
  'Cùng với đó,',
  'Và bên cạnh đó —',
  'Song song với điều đó,',
  'Nhưng không chỉ vậy —',
  'Đồng thời,',
  'Và còn thêm:',
]

// Multi-flower (3+) intro lines (5 variants)
const MULTI_INTROS = [
  'Bó hoa bạn tạo ra là một bức chân dung nhiều tầng —',
  'Bạn là người có nhiều lớp. Bó hoa này phản ánh điều đó.',
  'Không phải ai cũng có thể chứa nhiều điểm mạnh đến vậy trong một người.',
  'Bó hoa này nói rằng bạn không phải kiểu người một chiều.',
  'Từ những bông hoa bạn chọn, hiện ra một người phong phú và khó đoán —',
]

// Multi-flower closing lines (5 variants)
const MULTI_CLOSINGS = [
  'Sự đa dạng đó không phải điểm yếu — đó là điểm mạnh hiếm có.',
  'Người có nhiều tầng thường là người tạo ra nhiều giá trị nhất.',
  'Không phải ai cũng mang được nhiều thứ trong một con người — bạn thì có.',
  'Bó hoa của bạn phong phú — và bạn cũng vậy.',
  'Đây là thứ làm bạn thú vị và đáng để biết.',
]

// Multi-flower wishes (5 variants)
const MULTI_WISHES = [
  'Chúc mừng 8/3 — chúc bạn là phiên bản đẹp nhất của chính mình.',
  'Chúc mừng Ngày Phụ nữ — chúc mọi thứ bạn đang xây dựng tiếp tục lớn lên.',
  'Chúc bạn một năm xứng đáng với tất cả những gì bạn là.',
  'Chúc mừng ngày của bạn — và chúc bạn tiếp tục là chính mình.',
  'Chúc mừng Ngày Phụ nữ — bạn xứng đáng được chúc mừng hơn một ngày trong năm.',
]

// Deterministic hash: same name + same flowers = same message
function hashStr(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0
  return Math.abs(h)
}
function pick(arr, seed) { return arr[Math.abs(seed) % arr.length] }

export function generateBouquetMessage(name, selectedFlowers) {
  const ids      = (selectedFlowers || []).map(sf => sf.flowerId)
  const profiles = ids.map(id => FLOWER_PROFILES[id]).filter(Boolean)

  if (profiles.length === 0) {
    return {
      greeting:   `${name},`,
      paragraphs: ['Khu vườn của bạn đang sẵn sàng nở rộ.'],
      wish:       'Chúc mừng Ngày Phụ nữ.',
    }
  }

  const ns = hashStr(name)
  const is = hashStr(ids.join('|'))

  if (profiles.length === 1) {
    const p    = profiles[0]
    const intro = pick(SOLO_INTROS, ns)
    const read  = pick(p.reads,     is)
    const wish  = pick(p.wishes,    ns ^ is)
    return {
      greeting:   `${name},`,
      paragraphs: [intro, read],
      wish,
    }
  }

  if (profiles.length === 2) {
    const [p1, p2] = profiles
    const intro  = pick(PAIR_INTROS,   ns)
    const read1  = pick(p1.reads,      is)
    const bridge = pick(PAIR_BRIDGES,  ns + is)
    const read2  = pick(p2.reads,      is + 1)
    const allWishes = [...p1.wishes, ...p2.wishes]
    const wish   = pick(allWishes,     ns ^ is)
    const r2     = read2.charAt(0).toLowerCase() + read2.slice(1)
    return {
      greeting:   `${name},`,
      paragraphs: [intro, read1, `${bridge} ${r2}`],
      wish,
    }
  }

  // 3+ flowers
  const intro   = pick(MULTI_INTROS,   ns)
  const reads   = profiles.slice(0, 3).map((p, i) => pick(p.reads, is + i))
  const closing = pick(MULTI_CLOSINGS, ns + is)
  const wish    = pick(MULTI_WISHES,   is)
  return {
    greeting:   `${name},`,
    paragraphs: [intro, ...reads, closing],
    wish,
  }
}
