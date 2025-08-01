# 🕹️ BreakTheCode

A web-based puzzle game featuring a series of interactive challenges designed to progressively unlock a final reward. Solve riddles, navigate mazes, and crack codes in an immersive, high-tech environment.

## 🌐 Demo

Test the game live at: [https://marou-breakthecode.netlify.app/](https://marou-breakthecode.netlify.app/)

## 🎮 Key Features

- **Mini-Games**: Engaging challenges including a Sudoku, Cryptogram, Memory, Maze, and Bomb Defusal.
- **Progressive Unlock System**: Completing each game collects letters stored in `localStorage`, unlocking a final victory page with confetti animations.
- **Protected Routes**: Secured navigation using `react-router-dom` to control access to game stages and the victory page.
- **Code Obfuscation**: Production builds use `vite-plugin-javascript-obfuscator` to protect client-side logic.
- **Mobile Optimization**: Responsive design optimized for small screens with compact layouts.
- **Local Storage Management**: Persistent game state to maintain progress across sessions.
- **Styling Evolution**: Initially built with Styled-Components for modular CSS, later transitioned to TailwindCSS.
- **Immersive Design**: High-tech aesthetic with neon green accents, subtle animations (e.g., trophy bounce, confetti), and a dark background.

## 🛠️ Tech Stack

- **React** – Frontend framework for dynamic UI.
- **Styled-Components** – Initial component-based styling for modular CSS.
- **TailwindCSS** – Later adopted for utility-first styling and responsive design.
- **React Router** – Client-side routing for game navigation.
- **Vite** – Fast build tool with HMR and obfuscation.
- **react-confetti** – Victory page animations.
- **Netlify Deployment**
