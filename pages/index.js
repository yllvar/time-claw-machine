import React from 'react';
import { useRouter } from 'next/router';
import { 
  Container, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Timed Challenges Claw Machine
        </Typography>
        <Typography variant="body1" paragraph>
          Grab as many prizes as you can in 60 seconds!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => router.push('/game')}
        >
          Start Game
        </Button>
      </Box>
    </Container>
  );
}

