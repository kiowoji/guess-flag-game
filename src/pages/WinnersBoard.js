import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { Link } from "react-router-dom";

const WinnersBoard = ({ playerName }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const leaderboardRef = database.ref("leaderboard");
    leaderboardRef.on("value", (snapshot) => {
      const leaderboardData = snapshot.val();
      if (leaderboardData) {
        const filteredLeaderboard = Object.values(leaderboardData).filter(
          (entry) => entry.mode === "timer-game"
        );
        const sortedLeaderboard = filteredLeaderboard
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setLeaderboard(sortedLeaderboard);
      }
    });
  }, []);

  return (
    <div className="container board">
      <h2>Топ-10 переможців:</h2>
      <ol className="board-list">
        {leaderboard.map((player, index) => (
          <li className="board-item" key={index}>{` ${player.name} - ${player.score}/30`}</li>
        ))}
      </ol>
      <Link className="link" to="/">
        <button className="btn">На головну</button>
      </Link>
    </div>
  );
};

export default WinnersBoard;
