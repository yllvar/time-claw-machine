'use client'

import React from 'react';
import { Button } from '@mui/material';

export function PowerUp({ type, onUse }) {
  const powerUpIcons = {
    time: '⏱️',
    strength: '💪',
    slowMotion: '🐢',
  };

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={() => onUse(type)}
      sx={{ minWidth: 0, width: 56, height: 56, borderRadius: '50%' }}
    >
      {powerUpIcons[type]}
    </Button>
  );
}

