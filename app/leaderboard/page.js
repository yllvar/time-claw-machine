'use client'

import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../utils/leaderboardAPI';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Button,
  Box
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorBoundary from '../components/ErrorBoundary';

export default function LeaderboardPage() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard();
        setScores(leaderboardData);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to load leaderboard. Please try again later.');
      }
    };
    fetchLeaderboard();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Leaderboard
          </Typography>
          <Paper elevation={3}>
            <List>
              {scores.map((score, index) => (
                <ListItem key={index} divider={index !== scores.length - 1}>
                  <ListItemText 
                    primary={`${index + 1}. ${score.name}`} 
                    secondary={`Score: ${score.score}`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => router.push('/')}
            >
              Play Again
            </Button>
          </Box>
        </Box>
      </Container>
    </ErrorBoundary>
  );
}

