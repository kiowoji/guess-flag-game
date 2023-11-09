import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Greeting({ setPlayerName, setGameMode }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/new-game");
  };

  const handleStartTimerGame = () => {
    const name = prompt("Please enter your name:");
    console.log("Name entered:", name); 
    if (name) {
      setPlayerName(name);
      setGameMode("timer-game");
      navigate("/timer-game");
    }
  };

  return (
    <div className="container greeting">
      <h1 className="main-text">Ласкаво просимо до гри Вгадай прапор!</h1>
      <p className="main-text">Вгадайте прапори 197 країн світу:</p>
      <p className="main-text">Від Андорри 🇦🇩 до Зімбабве 🇿🇼</p>
      <Link to="/new-game" className="link" onClick={handleStartGame}>
        <button className="new-game">Звичайна гра</button>
      </Link>
      <Link to="/timer-game" className="link" onClick={handleStartTimerGame}>
        <button className="timer-game">Гра з таймером</button>
      </Link>
      <Link to="/board" className="link">
        <button className="records">Дошка рекордів</button>
      </Link>
    </div>
  );
}

export default Greeting;
