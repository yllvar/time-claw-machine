import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ClawMachine } from '../components/ClawMachine';
import { PowerUp } from '../components/PowerUp';
import { useTimer } from '../utils/timer';
import { updateLeaderboard } from '../utils/leaderboardAPI';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Container, 
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
  }, []);

  useEffect(() => {
    if (isGameOver) {
      const submitScore = async () => {
        await updateLeaderboard(playerName || 'Anonymous', score);
      };
      submitScore();
    }
  }, [isGameOver, playerName, score]);

  const handleGrab = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handlePowerUp = (type) => {
    console.log(`Used power-up: ${type}`);
    // Implement power-up logic here
    switch (type) {
      case 'time':
        // Add more time
        break;
      case 'strength':
        // Increase grab strength
        break;
      case 'slowMotion':
        // Slow down claw machine speed
        break;
      default:
        break;
    }
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Timed Challenges Claw Machine
              </Typography>
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
    </Container>
  );
}

