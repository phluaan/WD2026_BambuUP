# Project: Garden of Impact

International Women's Day Interactive Experience

## Vision

This project is an interactive digital experience to celebrate the women in the company.

Instead of a traditional greeting card or bouquet, the website presents a magical interactive night garden where every flower represents a woman and her impact.

The experience should feel:

- emotional
- magical
- cinematic
- elegant
- modern

This should look like something a premium tech company would create.

## Experience Flow

### 1. Cinematic Intro

The site opens with a dark elegant screen.

Small glowing particles appear slowly.

Text fades in:

"Every great team grows because of incredible women."

Particles gather and transform into glowing flowers.

Transition into the garden scene.

---

### 2. Garden Reveal

A beautiful interactive garden appears.

Features:

- glowing flowers
- floating particles
- subtle background gradient
- firefly effects

Flowers gently sway.

Each flower represents a woman.

---

### 3. Flower Interaction

When hovering a flower:

- the flower glows
- light particles appear
- petals slightly open

When clicking a flower:

- flower blooms
- petals animate outward
- soft light expands

A message card appears.

---

### 4. Message Reveal

Example:

Name: Lan

Flower type: Tulip

Message:

"Like a tulip in spring,  
you bring energy, kindness, and positivity to the team."

Animation:

- petals floating
- subtle confetti
- glowing particles

---

### 5. Celebration Finale

After discovering several flowers:

A final message appears:

"To the amazing women of our team.
Thank you for making this garden bloom."

Flowers glow brighter.

Petals fall slowly across the screen.

---

## Visual Design

Color palette:

Deep night background:
#0B0F1A

Soft glow colors:
#FF7EB6
#FFB347
#A78BFA
#6EE7B7

Accent:
#FDE68A

Typography:

Headings:
Playfair Display

Body:
Inter

Mood:

- elegant
- soft lighting
- magical atmosphere

---

## Technology Stack

Framework:
React (Vite)

Styling:
TailwindCSS

Animation:
Framer Motion

Particles:
Three.js OR canvas-based particles

Icons:
Lucide

Deployment:
Vercel

---

## Component Structure

/components

GardenScene.jsx
Flower.jsx
FlowerMessage.jsx
ParticleBackground.jsx
IntroScreen.jsx
FinaleScreen.jsx

---

## Data Structure

Example data:

```js
export const flowers = [
  {
    name: "Lan",
    flower: "tulip",
    message:
      "Like a tulip in spring, you bring energy and positivity to the team.",
  },
  {
    name: "Trang",
    flower: "sunflower",
    message: "Your warmth and positivity brighten every room.",
  },
];
```
