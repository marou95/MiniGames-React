import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Labyrinthe = ({ onComplete }) => {
  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const handleKeyDown = (e) => {
    if (gameOver) return;

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (e.key) {
      case "ArrowUp":
        newY = Math.max(y - 1, 0);
        break;
      case "ArrowDown":
        newY = Math.min(y + 1, 14);
        break;
      case "ArrowLeft":
        newX = Math.max(x - 1, 0);
        break;
      case "ArrowRight":
        newX = Math.min(x + 1, 14);
        break;
      default:
        return;
    }

    if (grid[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoveCount(moveCount + 1);

      if (grid[newY][newX] === 3) {
        setGameOver(true);
        onComplete();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, gameOver]);

  const handleButtonClick = (direction) => {
    if (gameOver) return;

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (direction) {
      case "up":
        newY = Math.max(y - 1, 0);
        break;
      case "down":
        newY = Math.min(y + 1, 14);
        break;
      case "left":
        newX = Math.max(x - 1, 0);
        break;
      case "right":
        newX = Math.min(x + 1, 14);
        break;
      default:
        return;
    }

    if (grid[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoveCount(moveCount + 1);

      if (grid[newY][newX] === 3) {
        setGameOver(true);
        onComplete();
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Labyrinth of love</h2>
      <p>Use the arrows to navigate to the pink exit</p>
      <p>Movements: {moveCount}</p>

      <div
        style={{
          display: "inline-block",
          border: "4px solid #333",
          backgroundColor: "#222",
          borderRadius: "10px",
        }}
      >
        {grid.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor:
                    cell === 1 ? "#555" : cell === 3 ? "#ff69b4" : "#333",
                  border: "1px solid #444",
                  position: "relative",
                }}
              >
                {playerPosition.x === x && playerPosition.y === y && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#00f",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "4px",
                      left: "4px",
                      animation: "bounce 0.5s infinite alternate",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handleButtonClick("up")}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ↑
        </button>
        <div>
          <button
            onClick={() => handleButtonClick("left")}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <button
            onClick={() => handleButtonClick("right")}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
        <button
          onClick={() => handleButtonClick("down")}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ↓
        </button>
      </div>

      {gameOver && (
        <p style={{ color: "#ff69b4", marginTop: "20px" }}>
          Congratulations ! You found the exit in {moveCount} movements !
        </p>
      )}

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default Labyrinthe;
