import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import GreetingPage from "./pages/GreetingPage";
import WinnersBoard from "./pages/WinnersBoard";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameMode, setGameMode] = useState("");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <GreetingPage
                setPlayerName={setPlayerName}
                setGameMode={setGameMode}
              />
            }
          />
          <Route
            path="/new-game"
            element={
              <GamePage timerMode={false} playerName={playerName} />
            }
          />
          <Route
            path="/timer-game"
            element={
              <GamePage
                timerMode={gameMode === "timer-game"}
                playerName={playerName}
                gameMode={gameMode}
                setGameMode={setGameMode}
                setPlayerName={setPlayerName}
              />
            }
          />
          <Route
            path="/board"
            element={<WinnersBoard playerName={playerName} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
