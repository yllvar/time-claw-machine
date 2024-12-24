import React from 'react';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Timed Challenges Claw Machine
        </Typography>
        <Typography variant="body1" paragraph>
          Grab as many prizes as you can in 60 seconds!
        </Typography>
        <Link href="/game" passHref>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
          >
            Start Game
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

