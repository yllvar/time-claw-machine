'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ClawMachine } from './ClawMachine';
import { PowerUp } from './PowerUp';
import { useTimer } from '../utils/timer';
import { updateLeaderboard } from '../utils/leaderboardAPI';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Grid, 
  Paper 
} from '@mui/material';

export default function Game() {
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const { timeLeft, startTimer, isGameOver } = useTimer(60);
  const router = useRouter();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (isGameOver) {
      const submitScore = async () => {
        try {
          await updateLeaderboard(playerName || 'Anonymous', score);
        } catch (error) {
          console.error('Failed to update leaderboard:', error);
        }
      };
      submitScore();
    }
  }, [isGameOver, playerName, score]);

  const handleGrab = useCallback(() => {
    setScore(prevScore => prevScore + 1);
  }, []);

  const handlePowerUp = useCallback((type) => {
    console.log(`Used power-up: ${type}`);
    // Implement power-up logic here
  }, []);

  const handleNameChange = useCallback((e) => {
    setPlayerName(e.target.value);
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Time: {timeLeft}s | Score: {score}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ClawMachine onGrab={handleGrab} />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
            <PowerUp type="time" onUse={handlePowerUp} />
            <PowerUp type="strength" onUse={handlePowerUp} />
            <PowerUp type="slowMotion" onUse={handlePowerUp} />
          </Box>
        </Grid>
      </Grid>
      {isGameOver && (
        <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Game Over!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your score: {score}
          </Typography>
          <TextField
            label="Enter your name"
            variant="outlined"
            value={playerName}
            onChange={handleNameChange}
            sx={{ my: 2 }}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => router.push('/leaderboard')}
            sx={{ mt: 2 }}
          >
            View Leaderboard
          </Button>
        </Paper>
      )}
    </Box>
  );
}

