import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import BouquetDisplay from "./BouquetDisplay";
import { FLOWER_SVGS } from "./Flower";
import { flowerCatalog, generateBouquetMessage } from "../data/bouquet";
import { Sparkles, ArrowRight } from "lucide-react";

// ── Minimal flower card — illustration + name + color dots ──────────────────
function FlowerCard({ flower, isSelected, sel, onToggle, onColorChange }) {
  const Shape = FLOWER_SVGS[flower.svgType];
  const colorHex = sel?.colorHex || flower.defaultColor;

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.07, y: -4 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border transition-all text-center overflow-hidden select-none"
      style={{
        minHeight: 165,
        ...(isSelected
          ? {
              borderColor: colorHex,
              background: `#ffffff`,
              boxShadow: `0 0 0 2px ${colorHex}60, 0 8px 28px ${colorHex}30`,
            }
          : {
              borderColor: "transparent",
              background: "#fafafa",
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
            }),
      }}
    >
      {/* Soft radial glow behind flower when selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 48%, ${colorHex}28 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Selected check badge */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
            style={{
              background: colorHex,
              boxShadow: `0 2px 8px ${colorHex}70`,
            }}
          >
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path
                d="M1 3.5L3 5.5L8 1"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower illustration */}
      <motion.div
        className="relative z-10"
        style={{ width: 60, height: 60, flexShrink: 0 }}
        animate={isSelected ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{
          duration: 2.2,
          repeat: isSelected ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {Shape ? (
          <Shape
            color={colorHex}
            secondary={flower.secondary}
            isHovered={false}
            isBlooomed={isSelected}
          />
        ) : (
          <span className="text-4xl leading-none">{flower.emoji}</span>
        )}
      </motion.div>

      {/* Flower name */}
      <motion.span
        className="relative z-10 text-xs font-semibold leading-tight max-w-full px-1 truncate"
        animate={{ color: isSelected ? colorHex : "#9ca3af" }}
        transition={{ duration: 0.3 }}
        title={flower.name}
      >
        {flower.name}
      </motion.span>

      {/* Color dots */}
      <div
        className="flex gap-2 relative z-10 flex-wrap justify-center"
        style={{ minHeight: 20 }}
      >
        {flower.colors.map((c) => (
          <motion.button
            key={c.id}
            onClick={(e) => {
              e.stopPropagation();
              onColorChange(e, c.hex);
            }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            title={c.label}
            className="rounded-full flex-shrink-0 cursor-pointer"
            style={{
              width: 16,
              height: 16,
              background: c.hex,
              border:
                sel?.colorHex === c.hex
                  ? `3px solid ${c.hex}`
                  : "2px solid white",
              boxShadow:
                sel?.colorHex === c.hex
                  ? `0 0 0 2px white, 0 0 0 4px ${c.hex}, 0 2px 8px ${c.hex}80`
                  : "0 1px 4px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}

// ── Main scene ─────────────────────────────────────────────────────────────
export default function GardenScene({ onFinale }) {
  const containerRef = useRef(null);
  const [step, setStep] = useState("form"); // 'form' | 'bouquet'
  const [name, setName] = useState("");
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [petals, setPetals] = useState([]);
  const petalId = { current: 0 };

  const clearAllFlowers = () => {
    setSelectedFlowers([]);
  };

  const spawnPetal = (flower) => {
    const id = petalId.current++;
    const x = 30 + Math.random() * 40;
    const dx = (Math.random() - 0.5) * 130;
    setPetals((p) => [...p, { id, emoji: flower.emoji, x, dx }]);
    setTimeout(() => setPetals((p) => p.filter((e) => e.id !== id)), 2000);
  };

  const toggleFlower = (flower) => {
    const isSelected = selectedFlowers.some((sf) => sf.flowerId === flower.id);
    if (isSelected) {
      setSelectedFlowers((p) => p.filter((sf) => sf.flowerId !== flower.id));
    } else {
      setSelectedFlowers((p) => [
        ...p,
        { flowerId: flower.id, colorHex: flower.defaultColor },
      ]);
      spawnPetal(flower);
    }
  };

  const changeFlowerColor = (e, flower, colorHex) => {
    e.stopPropagation();
    const isSelected = selectedFlowers.some((sf) => sf.flowerId === flower.id);
    if (isSelected) {
      setSelectedFlowers((p) =>
        p.map((sf) => (sf.flowerId === flower.id ? { ...sf, colorHex } : sf)),
      );
    } else {
      setSelectedFlowers((p) => [...p, { flowerId: flower.id, colorHex }]);
      spawnPetal(flower);
    }
  };

  const canCreate = name.trim().length > 0 && selectedFlowers.length > 0;

  const accentColor = useMemo(() => {
    if (!selectedFlowers.length) return "#EC4899";
    return (
      flowerCatalog.find((f) => f.id === selectedFlowers[0].flowerId)
        ?.defaultColor || "#EC4899"
    );
  }, [selectedFlowers]);

  const msg = useMemo(
    () => generateBouquetMessage(name, selectedFlowers),
    [name, selectedFlowers],
  );

  useEffect(() => {
    if (step === "bouquet" && containerRef.current) {
      // Small timeout to allow the layout to render before scrolling
      setTimeout(() => {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  }, [step]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFAF5 0%, #FFF0F7 55%, #FFE8F2 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <ParticleBackground phase={step === "form" ? "intro-bamboo" : "garden"} />

      {/* Ambient sparkles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {Array.from({ length: 16 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) + 1.5,
              height: (i % 3) + 1.5,
              background: ["#FF7EB6", "#A78BFA", "#6EE7B7", "#FDE68A"][i % 4],
              left: `${(i * 23 + 7) % 97}%`,
              top: `${(i * 17 + 11) % 91}%`,
            }}
            animate={{ opacity: [0.04, 0.38, 0.04], scale: [1, 1.6, 1] }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.55,
            }}
          />
        ))}
      </div>

      {/* Floating petals on selection */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {petals.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-3xl select-none"
              style={{ left: `${p.x}%`, top: "44%" }}
              initial={{ opacity: 1, y: 0, scale: 0.7, x: 0 }}
              animate={{ opacity: 0, y: -150, scale: 1.5, x: p.dx }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.7, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-12 px-4 md:px-6">
        <AnimatePresence mode="wait">
          {/* ─── FORM STEP ─── */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-3xl"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.h2
                  className="text-4xl md:text-5xl mb-3 leading-tight"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "#831843",
                  }}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  Tạo Thông Điệp Dành Riêng Cho Bạn
                </motion.h2>
                <motion.p
                  className="text-gray-400 font-light tracking-wide text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Chọn những bông hoa bạn yêu thích — chúng tôi sẽ tạo nên điều
                  gì đó thật đẹp chỉ dành riêng cho bạn.
                </motion.p>
              </div>

              {/* Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-pink-100/80 shadow-2xl space-y-8">
                {/* 1. Name input */}
                <div>
                  <label className="block text-gray-400 text-xs mb-3 uppercase tracking-widest font-semibold">
                    Tên Của Bạn
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên thương thương của bạn…"
                    className="w-full bg-white border border-pink-200 rounded-2xl px-6 py-4 text-gray-800 text-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all placeholder-gray-300"
                  />
                </div>

                {/* 2. Flower selection */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-gray-400 text-xs uppercase tracking-widest font-semibold">
                      Chọn Hoa Của Bạn
                    </label>
                    {selectedFlowers.length > 0 && (
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: accentColor }}
                        >
                          Đã chọn {selectedFlowers.length} hoa
                        </span>
                        <button
                          onClick={clearAllFlowers}
                          className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                        >
                          Xóa tất cả
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-5">
                    Có thể chọn nhiều loại hạt nhé
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {flowerCatalog.map((flower) => {
                      const sel = selectedFlowers.find(
                        (sf) => sf.flowerId === flower.id,
                      );
                      return (
                        <FlowerCard
                          key={flower.id}
                          flower={flower}
                          isSelected={!!sel}
                          sel={sel}
                          onToggle={() => toggleFlower(flower)}
                          onColorChange={(e, hex) =>
                            changeFlowerColor(e, flower, hex)
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 3. CTA */}
                <div className="flex justify-center pt-2">
                  <motion.button
                    whileHover={canCreate ? { scale: 1.06, y: -2 } : {}}
                    whileTap={canCreate ? { scale: 0.96 } : {}}
                    onClick={() => canCreate && setStep("bouquet")}
                    disabled={!canCreate}
                    className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-3 transition-all"
                    style={
                      canCreate
                        ? {
                            background:
                              "linear-gradient(135deg, #F9A8D4 0%, #EC4899 50%, #BE185D 100%)",
                            color: "white",
                            boxShadow: "0 6px 24px rgba(236,72,153,0.38)",
                          }
                        : {
                            background: "#f3f4f6",
                            color: "#9ca3af",
                            cursor: "not-allowed",
                          }
                    }
                  >
                    <Sparkles size={18} />
                    Nhận thông điệp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── BOUQUET STEP ─── */}
          {step === "bouquet" && (
            <motion.div
              key="bouquet"
              className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Bouquet display */}
              <BouquetDisplay selectedFlowers={selectedFlowers} />

              {/* Message card */}
              <motion.div
                className="flex-1 bg-white/88 backdrop-blur-xl border border-pink-100 p-8 md:p-12 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 1 }}
              >
                <h3
                  className="text-4xl md:text-5xl mb-6"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    color: "#BE185D",
                    letterSpacing: '0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {msg.greeting}
                </h3>

                <div className="space-y-4 mb-8">
                  {msg.paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      className={`leading-relaxed text-base md:text-lg ${
                        i === msg.paragraphs.length - 1
                          ? "italic"
                          : ""
                      }`}
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontWeight: i === msg.paragraphs.length - 1 ? 300 : 400,
                        color: i === msg.paragraphs.length - 1 ? '#9ca3af' : '#374151',
                        lineHeight: 1.75,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + i * 0.28, duration: 0.7 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.p
                  className="text-2xl md:text-3xl font-semibold tracking-wide"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: '0.02em',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.8, duration: 0.8 }}
                >
                  {msg.wish}
                </motion.p>

                <motion.button
                  className="mt-10 flex items-center gap-3 text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest text-xs font-bold"
                  onClick={onFinale}
                  whileHover={{ x: 6 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, duration: 0.6 }}
                >
                  Tiếp tục vào Khu Vườn <ArrowRight size={15} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
