import React from 'react';
import styles from '../styles/Leaderboard.module.css';

const Leaderboard = ({ scores }) => {
  return (
    <div className={styles.leaderboard}>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.score} prizes
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Leaderboard };

