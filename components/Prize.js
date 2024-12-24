import React from 'react';
import { Box } from '@mui/material';

export function Prize({ x, y }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      🧸
    </Box>
  );
}

