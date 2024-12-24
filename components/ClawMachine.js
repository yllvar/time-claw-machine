import React, { useState, useEffect, useCallback } from 'react';
import { Prize } from './Prize';
import { Box } from '@mui/material';

export function ClawMachine({ onGrab }) {
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    setPrizes(Array(5).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    })));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isGrabbing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setPosition({ x: Math.min(Math.max(x, 0), 100), y: 0 });
    }
  }, [isGrabbing]);

  useEffect(() => {
    const clawMachine = document.querySelector('#claw-machine');
    if (clawMachine) {
      clawMachine.addEventListener('mousemove', handleMouseMove);
      return () => clawMachine.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  const handleGrab = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);
    
    // Animate the claw going down
    const animateGrab = () => {
      setPosition(prev => {
        if (prev.y < 80) {
          return { ...prev, y: prev.y + 5 };
        } else {
          // Check for collision when the claw is at the bottom
          const grabbedPrize = prizes.find(prize => 
            Math.abs(prize.x - position.x) < 10 && Math.abs(prize.y - position.y) < 10
          );
          
          if (grabbedPrize) {
            onGrab();
            setPrizes(prizes.filter(prize => prize.id !== grabbedPrize.id));
          }
          
          // Start retracting the claw
          setTimeout(() => {
            const retractInterval = setInterval(() => {
              setPosition(prev => {
                if (prev.y > 0) {
                  return { ...prev, y: prev.y - 5 };
                } else {
                  clearInterval(retractInterval);
                  setIsGrabbing(false);
                  return prev;
                }
              });
            }, 50);
          }, 500); // Wait for 500ms before retracting
          
          return prev;
        }
      });
      
      if (position.y < 80) {
        requestAnimationFrame(animateGrab);
      }
    };
    
    requestAnimationFrame(animateGrab);
  };

  return (
    <Box
      id="claw-machine"
      sx={{
        width: '100%',
        height: 400,
        border: '2px solid #333',
        position: 'relative',
        backgroundColor: '#f8f8f8',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handleGrab}
    >
      <Box
        sx={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transition: 'left 0.1s ease',
          fontSize: '24px',
        }}
      >
        🦀
      </Box>
      {prizes.map(prize => (
        <Prize key={prize.id} x={prize.x} y={prize.y} />
      ))}
    </Box>
  );
}

