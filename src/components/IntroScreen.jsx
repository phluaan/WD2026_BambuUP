import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

// 5 colour palettes inspired by the BambuUP logo gradient (yellow-green → emerald)
const BAMBOO_PALETTES = [
  // 0 – Golden yellow-green (leftmost logo hue)
  {
    young:
      "linear-gradient(90deg,#e8f5b0 0%,#ccea78 30%,#ddf590 50%,#ccea78 70%,#e8f5b0 100%)",
    mature:
      "linear-gradient(90deg,#6a8a18 0%,#9abf2e 30%,#bcd948 50%,#9abf2e 70%,#6a8a18 100%)",
    mid: "#9abf2e",
    leaf: ["#b8d840", "#9abf28", "#cce050"],
  },
  // 1 – Lime green
  {
    young:
      "linear-gradient(90deg,#d4f0a0 0%,#b0e060 30%,#c8ed80 50%,#b0e060 70%,#d4f0a0 100%)",
    mature:
      "linear-gradient(90deg,#4e7a18 0%,#78a830 30%,#98c844 50%,#78a830 70%,#4e7a18 100%)",
    mid: "#78a830",
    leaf: ["#94c03a", "#78a828", "#acd04a"],
  },
  // 2 – Fresh medium green (logo centre)
  {
    young:
      "linear-gradient(90deg,#bcedc0 0%,#88d898 30%,#a8e8b0 50%,#88d898 70%,#bcedc0 100%)",
    mature:
      "linear-gradient(90deg,#1e7038 0%,#38a054 30%,#52bc6a 50%,#38a054 70%,#1e7038 100%)",
    mid: "#38a054",
    leaf: ["#52bc6a", "#38a050", "#6acd7a"],
  },
  // 3 – Teal green
  {
    young:
      "linear-gradient(90deg,#b0e8d0 0%,#78d4aa 30%,#98e0be 50%,#78d4aa 70%,#b0e8d0 100%)",
    mature:
      "linear-gradient(90deg,#196050 0%,#2a9070 30%,#3cac88 50%,#2a9070 70%,#196050 100%)",
    mid: "#2a9070",
    leaf: ["#3cac88", "#2a9068", "#50c09a"],
  },
  // 4 – Emerald (rightmost logo hue)
  {
    young:
      "linear-gradient(90deg,#a8e4cc 0%,#70d0aa 30%,#90dec0 50%,#70d0aa 70%,#a8e4cc 100%)",
    mature:
      "linear-gradient(90deg,#0e5a40 0%,#1a8a60 30%,#2aad78 50%,#1a8a60 70%,#0e5a40 100%)",
    mid: "#1a8a60",
    leaf: ["#2aad78", "#1a8a5e", "#3cc488"],
  },
];

export default function IntroScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  const bambooStalks = useMemo(() => {
    const occupiedLeafZones = []; // 2D Spatial Registry to prevent leaf overlaps

    return [...Array(15)].map((_, i) => {
      const isCenter = i === 7;
      const isShoot = isCenter ? false : Math.random() > 0.6;
      const delay = isShoot
        ? 1.5 + Math.random() * 2
        : isCenter
          ? 0
          : Math.random() * 1.2;
      const height = isCenter
        ? 75
        : isShoot
          ? 35 + Math.random() * 15
          : 60 + Math.random() * 30;
      const width = isCenter
        ? 14
        : isShoot
          ? 8 + Math.random() * 4
          : 12 + Math.random() * 8;
      // heightFactor: 0 = shortest possible stalk (35vh), 1 = tallest (90vh)
      // Used to scale foliage density proportionally with height
      const heightFactor = Math.max(0, Math.min(1, (height - 35) / 55));

      const baseAngle = (i - 7) * 2;
      const rotation = isCenter
        ? Math.random() * 2 - 1
        : baseAngle + (Math.random() * 6 - 3);

      const xSpread = (i - 7) * (18 + Math.random() * 4);
      const xOffset = isCenter ? 0 : xSpread;

      // Random curvature: positive = bends right, negative = bends left, near 0 = almost straight
      // Shoots are more uniformly upright; main stalks curve more
      const curvature = isShoot
        ? Math.random() * 30 - 15 // ±15px subtle curve
        : Math.random() * 80 - 40; // ±40px strong random curve

      const numJoints = isShoot
        ? Math.floor(3 + Math.random() * 3)
        : Math.floor(7 + Math.random() * 4);

      const joints = [...Array(numJoints)].map((_, j) => {
        const top =
          90 - j * (85 / Math.max(1, numJoints - 1)) + (Math.random() * 4 - 2);
        const isTop = j === numJoints - 1;

        const isTopNode = j >= numJoints - 4;
        let numBranches = 0;

        if (isTopNode) {
          // Taller stalks get a fuller canopy; shorter ones get sparser branches
          const maxTopBranches = Math.round(2 + heightFactor * 2); // 2..4
          numBranches = isTop
            ? Math.max(1, maxTopBranches - 1 + Math.floor(Math.random() * 2))
            : Math.random() > 0.3 + (1 - heightFactor) * 0.4
              ? 1
              : 0;
        }

        let jointSideIsRight = (i + j) % 2 === 0;

        if (numBranches > 0) {
          let xApprox = xOffset + (jointSideIsRight ? 25 : -25);
          let yApprox = top;

          let collision = occupiedLeafZones.some(
            (z) => Math.abs(z.x - xApprox) < 35 && Math.abs(z.y - yApprox) < 8,
          );
          if (collision) {
            jointSideIsRight = !jointSideIsRight;
            xApprox = xOffset + (jointSideIsRight ? 25 : -25);
            collision = occupiedLeafZones.some(
              (z) =>
                Math.abs(z.x - xApprox) < 35 && Math.abs(z.y - yApprox) < 8,
            );
          }

          if (collision && !isTop) {
            numBranches = 0;
          } else {
            occupiedLeafZones.push({ x: xApprox, y: yApprox });
          }
        }

        const branches = [...Array(numBranches)].map((_, b) => {
          const isRight = jointSideIsRight;

          // Top canopy branches fan out wide and droop downward (like real bamboo)
          // Non-top branches go outward at ~45°
          let branchAngle;
          if (isTop) {
            // Fan the top branches: spread from ~20° to ~80° on each side, with slight downward droop
            const fanSpread = numBranches > 1 ? b / (numBranches - 1) : 0.5;
            const baseAngle = isRight
              ? 25 + fanSpread * 65
              : -(25 + fanSpread * 65);
            branchAngle = baseAngle + (Math.random() * 20 - 10);
          } else {
            const baseBranchAngle = isRight ? 45 : -45;
            branchAngle =
              baseBranchAngle +
              (Math.random() * 30 - 15) +
              b * (isRight ? 15 : -15);
          }

          // Top canopy branches are much longer to match the drooping canopy in the reference image
          const branchLength = isTop
            ? 70 + Math.random() * 50
            : 20 + Math.random() * 25;

          // More leaves on top branches for dense canopy; scale with height
          const numLeaves = isTop
            ? Math.round(5 + heightFactor * 6) + Math.floor(Math.random() * 3) // 5..14 leaves
            : Math.round(2 + heightFactor * 3) + Math.floor(Math.random() * 2); // 2..7 leaves
          const leaves = [...Array(numLeaves)].map((_, l) => {
            const posPct = (l + 1) / numLeaves;

            // Top canopy leaves droop downward (negative angle = tip points down)
            // Non-top leaves fan normally
            const leafAngle = isTop
              ? Math.random() * 50 - 60 // -60° to -10°: mostly drooping down
              : (Math.random() - 0.5) * 70; // ±35°: normal fan

            return {
              id: l,
              posPct: posPct * 0.85 + 0.15,
              leafAngle,
              length: isTop ? 30 + Math.random() * 20 : 25 + Math.random() * 15,
              width: isTop ? 6 + Math.random() * 3 : 5 + Math.random() * 3,
              color: "",
            };
          });

          return { id: b, isRight, branchAngle, branchLength, leaves, isTop };
        });

        return { top, isTop, branches, id: j };
      });

      const paletteIndex = Math.floor(Math.random() * 5);
      const palette = BAMBOO_PALETTES[paletteIndex];
      joints.forEach((joint) =>
        joint.branches.forEach((branch) =>
          branch.leaves.forEach((leaf) => {
            const leafColors = palette.leaf;
            leaf.color =
              leafColors[Math.floor(Math.random() * leafColors.length)];
          }),
        ),
      );

      return {
        id: i,
        isShoot,
        delay,
        height,
        width,
        rotation,
        xOffset,
        curvature,
        joints,
        buds: [],
        paletteIndex,
      };
    });
  }, []);

  const stages = [
    {
      id: "seed",
      texts: [
        "“Chị em tôi toả nắng vàng lịch sử",
        "Nắng cho đời, nắng cũng cho thơ.”",
        "- Huy Cận",
      ],
      action: "Tiếp tục",
    },
    {
      id: "bloom",
      texts: [
        "Chúc mừng ngày 8/3 —",
        "Cảm ơn vì những đóng góp của bạn với BambuUP! 🌸",
      ],
      action: "Bắt đầu",
    },
  ];

  const currentStage = stages[stage];

  const handleNext = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F9FFFc 0%, #E6FFF1 100%)",
        zIndex: 10,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <ParticleBackground phase={`intro-${currentStage.id}`} />

      {/* Ground platform */}
      <div
        className="absolute bottom-[4vh] w-full h-[3px] opacity-50 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #6EE7B7 0%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 w-full h-[4vh] z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(249,255,252,0), rgba(16,185,129,0.15))",
        }}
      />

      {/* Visual Representation Area (Bamboo & Seed - strictly tied to bottom) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex justify-center md:justify-start max-w-7xl mx-auto px-6 md:px-12"
        style={{ left: 0, right: 0 }}
      >
        <div className="relative w-full md:w-1/2 h-full">
          <div
            className="absolute bottom-[4vh] left-0 right-0 flex justify-center items-end"
            style={{ height: "0px" }}
          >
            <AnimatePresence>
              {stage === 0 && (
                <motion.div
                  key="seed"
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 1 } }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 w-5 h-5 rounded-full"
                  style={{
                    background: "#FDE68A",
                    boxShadow: "0 0 20px #FDE68A, 0 0 40px #FFB347",
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
                    const isVisible = stage >= 1;

                    const heightMultiplier = stage >= 1 ? 1 : 0;
                    const prevMultiplier = 0;

                    // Glow appears on the seed stage for each stalk
                    const isGlowVisible = stage >= 0;

                    // Stalks closer to center render in front (higher z-index)
                    const distFromCenter = Math.abs(stalk.id - 7);
                    const stalkZIndex = 20 - distFromCenter; // center=20, edges=13

                    return (
                      (isVisible || isGlowVisible) && (
                        <div
                          key={stalk.id}
                          className="absolute bottom-0 pointer-events-none"
                          style={{
                            height: `${stalk.height}vh`,
                            width: `${stalk.width}px`,
                            left: "50%",
                            marginLeft: `-${stalk.width / 2}px`,
                            transform: `translateX(${stalk.xOffset}px)`,
                            zIndex: stalkZIndex,
                          }}
                        >
                          {/* Glowing effect right before appearance */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: isGlowVisible
                                ? isVisible
                                  ? [0, 1.5, 0]
                                  : [0.5, 1, 0.5]
                                : 0,
                              opacity: isGlowVisible
                                ? isVisible
                                  ? [0, 1, 0]
                                  : [0.4, 0.8, 0.4]
                                : 0,
                            }}
                            transition={{
                              duration: isVisible ? 1.5 : 2,
                              delay: isVisible
                                ? stalk.delay * 0.5 - 0.2
                                : Math.random(),
                              repeat: isVisible ? 0 : Infinity,
                              ease: "easeOut",
                            }}
                            className="absolute bottom-[-5px] rounded-full z-0"
                            style={{
                              width: isVisible ? 30 : 20,
                              height: isVisible ? 10 : 6,
                              background: isVisible ? "#6EE7B7" : "#FDE68A",
                              boxShadow: isVisible
                                ? "0 0 20px #10B981, 0 0 40px #34D399"
                                : "0 0 15px #FDE68A, 0 0 30px #FFB347",
                              left: "50%",
                              marginLeft: isVisible ? "-15px" : "-10px",
                            }}
                          />

                          {/* SVG curved stalk */}
                          {(() => {
                            const sw = stalk.width;
                            // Fixed coordinate system: 200 units wide, 1000 tall
                            // Center at x=100, curvature shifts control/end point
                            const startX = 100;
                            const endX = 100 + stalk.curvature * 0.4;
                            const ctrlX = 100 + stalk.curvature * 1.2; // peak of curve
                            // SVG is 200 units wide, but rendered at sw px wide and shifted left by (100-sw/2)px
                            // so center of SVG aligns with center of stalk container
                            return (
                              <motion.svg
                                viewBox="0 0 200 1000"
                                className="absolute bottom-0 overflow-visible"
                                style={{
                                  width: "200px",
                                  height: "100%",
                                  left: `${sw / 2 - 100}px`, // center SVG on stalk
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: stalk.delay * 0.4,
                                }}
                              >
                                <motion.path
                                  d={`M ${startX} 1000 Q ${ctrlX} 500 ${endX} 0`}
                                  fill="none"
                                  stroke="#38a054"
                                  strokeWidth={sw}
                                  strokeLinecap="round"
                                  vectorEffect="non-scaling-stroke"
                                  style={{
                                    filter:
                                      "drop-shadow(1px 0 2px rgba(0,0,0,0.15))",
                                  }}
                                  initial={{ pathLength: 0, stroke: "#ccea78" }}
                                  animate={{
                                    pathLength: heightMultiplier,
                                    stroke: "#4a9a2e",
                                  }}
                                  transition={{
                                    duration: 3.2,
                                    delay: stalk.delay * 0.4,
                                    ease: [0.4, 0, 0.9, 1],
                                  }}
                                />
                              </motion.svg>
                            );
                          })()}

                          {/* Joints & Branches overlay */}
                          <div
                            className="absolute bottom-0"
                            style={{ width: "100%", height: "100%" }}
                          >
                            {stalk.joints.map((joint) => {
                              const bottomPercent = 100 - joint.top;
                              const isReached =
                                bottomPercent <= heightMultiplier * 100 - 1;

                              let relativePos =
                                (bottomPercent / 100 - prevMultiplier) /
                                (heightMultiplier - prevMultiplier || 1);
                              relativePos = Math.max(
                                0,
                                Math.min(1, relativePos),
                              );
                              // Extra 0.5s buffer ensures stem is visually past this joint before it appears
                              const jointDelay =
                                stalk.delay * 0.4 +
                                (relativePos > 0
                                  ? Math.pow(relativePos, 0.5) * 3.6 + 0.5
                                  : 0);

                              // Offset the joint/branch horizontally to follow the curve
                              // At t = joint.top/100 along the path, x offset = curvature * parabola
                              const t = 1 - joint.top / 100; // 0=bottom, 1=top
                              const curveOffsetX =
                                stalk.curvature * 2 * t * (1 - t); // quadratic peak at t=0.5

                              return (
                                isReached && (
                                  <motion.div
                                    key={`joint-${stalk.id}-${joint.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: jointDelay }}
                                    className="absolute w-full"
                                    style={{
                                      top: `${joint.top}%`,
                                      transform: `translateX(${curveOffsetX}px)`,
                                    }}
                                  >
                                    {/* Bulging Joint Marker */}
                                    <div
                                      className="absolute w-[120%] h-[3px] left-[-10%] rounded-full opacity-70 shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                                      style={{
                                        background:
                                          BAMBOO_PALETTES[stalk.paletteIndex]
                                            .mid,
                                      }}
                                    />
                                    <div
                                      className="absolute w-[110%] h-[1px] left-[-5%] mt-[2px] rounded-full opacity-50"
                                      style={{
                                        background:
                                          BAMBOO_PALETTES[stalk.paletteIndex]
                                            .mid,
                                      }}
                                    />

                                    {/* Branches */}
                                    {joint.branches.map((branch) => (
                                      <motion.div
                                        key={`branch-${branch.id}`}
                                        initial={{
                                          scaleY: 0,
                                          opacity: 0,
                                          rotate: branch.branchAngle,
                                        }}
                                        animate={{
                                          scaleY: 1,
                                          opacity: 1,
                                          rotate: branch.branchAngle,
                                        }}
                                        transition={{
                                          delay: jointDelay + 0.15,
                                          duration: 0.5,
                                          ease: "easeOut",
                                        }}
                                        className="absolute"
                                        style={{
                                          width: "2px",
                                          height: `${branch.branchLength}px`,
                                          background:
                                            BAMBOO_PALETTES[stalk.paletteIndex]
                                              .mid,
                                          left: branch.isRight ? "100%" : "0%",
                                          bottom: "100%",
                                          transformOrigin: "bottom center",
                                          zIndex: 0,
                                        }}
                                      >
                                        {/* Leaves on Branch */}
                                        {branch.leaves.map((leaf) => (
                                          <motion.div
                                            key={`leaf-${leaf.id}`}
                                            initial={{
                                              scale: 0,
                                              opacity: 0,
                                              rotate: leaf.leafAngle,
                                            }}
                                            animate={{
                                              scale: 1,
                                              opacity: 1,
                                              rotate: leaf.leafAngle,
                                            }}
                                            transition={{
                                              delay:
                                                jointDelay +
                                                0.4 +
                                                leaf.id * 0.07,
                                              duration: 0.4,
                                              ease: "easeOut",
                                            }}
                                            className="absolute"
                                            style={{
                                              width: `${leaf.width}px`,
                                              height: `${leaf.length}px`,
                                              background: leaf.color,
                                              borderRadius: "50%",
                                              left: "50%",
                                              marginLeft: `-${leaf.width / 2}px`,
                                              bottom: `${leaf.posPct * 100}%`,
                                              transformOrigin: "bottom center",
                                              boxShadow:
                                                "0 2px 5px rgba(0,0,0,0.2)",
                                              zIndex: 1,
                                            }}
                                          />
                                        ))}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )
                              );
                            })}
                          </div>
                        </div>
                      )
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content Container (Text and Actions) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-full px-4 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between pb-[10vh] pt-[10vh] md:pt-[15vh] pointer-events-none">
        {/* Left spacing for layout balance on desktop */}
        <div className="hidden md:block w-1/2 h-full"></div>

        {/* Right Column: Text and Actions */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center pointer-events-auto h-full">
          {/* Glass background for mobile only */}
          <div className="bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none shadow-[0_4px_30px_rgba(0,0,0,0.1)] md:shadow-none border border-white/50 md:border-none w-full max-w-sm md:max-w-none flex flex-col items-center justify-center mt-auto mb-[5vh] md:m-0 transition-all duration-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="h-[120px] md:h-[200px] flex flex-col justify-center items-center gap-3 md:gap-4 mb-4 md:mb-0"
              >
                {currentStage.texts.map((text, i) => (
                  <motion.h2
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 1.5 + 0.5, duration: 1.5 }}
                    className="text-xl md:text-5xl leading-relaxed md:leading-tight px-2 md:px-0 font-medium"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: "#064E3B",
                      textShadow: "0 2px 10px rgba(255, 255, 255, 0.9)",
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
              transition={{
                delay: currentStage.texts.length * 1.5 + 0.5,
                duration: 1,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-6 md:mt-[10vh] px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer border"
              style={{
                fontFamily: "Inter, sans-serif",
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(4, 120, 87, 0.9))",
                borderColor: "rgba(5, 150, 105, 0.8)",
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(5, 150, 105, 0.3)",
              }}
            >
              {currentStage.action}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
