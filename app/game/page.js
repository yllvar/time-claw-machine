'use client'

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';

const DynamicGame = dynamic(() => import('../components/Game'), {
  loading: () => <CircularProgress />,
  ssr: false
});

export default function GamePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Timed Challenges Claw Machine
        </Typography>
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <DynamicGame />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Container>
  );
}

