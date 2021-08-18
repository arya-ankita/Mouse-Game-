import React, { useState, useRef, useEffect } from "react";
import Moles from "../pages/Moles";
import Mole from "../pages/Mole";
import Timer from "../pages/Timer";
import Score from "../pages/Score";
import gsap from "gsap";

const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;
const NUMBER_OF_MOLES = 5;

export default function Game() {
  const [state, setState] = useState("");
  const usePersistentState = (key, initialValue) => {
    useEffect(() => {
      setState(
        window.localStorage.getItem(key)
          ? JSON.parse(window.localStorage.getItem(key))
          : initialValue
      );
      window.localStorage.setItem(key, state);
    }, [key, state]);
    return [state, setState];
  };

  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const onWhack = (points) => setScore(score + points);
  const [highScore, setHighScore] = usePersistentState("whac-a-mole-hi", 0);
  const [newHighScore, setNewHighScore] = useState(false);

  //  To set highest value in local storage and get value each time

  const generateMoles = (amount) =>
    new Array(amount).fill().map(() => ({
      speed: gsap.utils.random(0.5, 1),
      delay: gsap.utils.random(0.5, 4),
      points: MOLE_SCORE,
    }));

  // Create state for moles
  const [moles, setMoles] = useState(generateMoles(NUMBER_OF_MOLES));


  const endGame = () => {
    setPlaying(false);
    setFinished(true);
    if (score > highScore) {
      setHighScore(score);
      setNewHighScore(true);
    }
  };

  // Update moles on game start
  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
    setNewHighScore(false);
  };

  return (
    <>
      {!playing && !finished && (
        <>
          <h1>Whac-A-Mole</h1>
          <button onClick={startGame}>Start Game</button>
        </>
      )}
      {playing && (
        <>
          <button className="end-game" onClick={endGame}>
            End Game
          </button>
          <div className="info">
            <Score value={score} />
            <Timer time={TIME_LIMIT} onEnd={endGame} />
          </div>
          <Moles>
            {moles.map(({ delay, speed, points }, index) => (
              <Mole
                key={index}
                onWhack={onWhack}
                points={points}
                delay={delay}
                speed={speed}
              />
            ))}
          </Moles>
        </>
      )}
      {finished && (
        <>
          {newHighScore && <div className="info-text">NEW High Score!</div>}
          <Score value={score} />
          <button onClick={startGame}>Play Again</button>
        </>
      )}
    </>
  );
}
