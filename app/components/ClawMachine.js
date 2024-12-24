'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Prize } from './Prize';
import { Box } from '@mui/material';

export function ClawMachine({ onGrab }) {
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [isDescending, setIsDescending] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const clawMachineRef = useRef(null);
  const animationRef = useRef(null);
  const onGrabRef = useRef(onGrab);
  const stuckTimerRef = useRef(null);

  useEffect(() => {
    onGrabRef.current = onGrab;
  }, [onGrab]);

  useEffect(() => {
    setPrizes(Array(5).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    })));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDescending && !isGrabbing && clawMachineRef.current) {
      const rect = clawMachineRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setPosition(prev => ({ ...prev, x: Math.min(Math.max(x, 0), 100) }));
    }
  }, [isDescending, isGrabbing]);

  useEffect(() => {
    const clawMachine = clawMachineRef.current;
    if (clawMachine) {
      clawMachine.addEventListener('mousemove', handleMouseMove);
      return () => clawMachine.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  const resetClaw = useCallback(() => {
    setIsDescending(false);
    setIsGrabbing(false);
    setPosition(prev => ({ ...prev, y: 0 }));
    if (stuckTimerRef.current) {
      clearTimeout(stuckTimerRef.current);
      stuckTimerRef.current = null;
    }
  }, []);

  const animateMovement = useCallback(() => {
    setPosition(prev => {
      if (isDescending && prev.y < 80) {
        return { ...prev, y: prev.y + 2 };
      } else if (isGrabbing && prev.y > 0) {
        return { ...prev, y: prev.y - 2 };
      }
      return prev;
    });

    if (isDescending && position.y >= 80) {
      setIsDescending(false);
      setIsGrabbing(true);
      // Start the stuck timer when the claw reaches the bottom
      stuckTimerRef.current = setTimeout(resetClaw, 5000); // 5 seconds timeout
    } else if (isGrabbing && position.y <= 0) {
      resetClaw();
      const grabbedPrize = prizes.find(prize => 
        Math.abs(prize.x - position.x) < 10 && Math.abs(prize.y - 80) < 10
      );
      if (grabbedPrize) {
        onGrabRef.current();
        setPrizes(currentPrizes => currentPrizes.filter(prize => prize.id !== grabbedPrize.id));
      }
    }
  }, [isDescending, isGrabbing, position.x, position.y, prizes, resetClaw]);

  useEffect(() => {
    if (isDescending || isGrabbing) {
      animationRef.current = requestAnimationFrame(function animate() {
        animateMovement();
        animationRef.current = requestAnimationFrame(animate);
      });
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (stuckTimerRef.current) {
        clearTimeout(stuckTimerRef.current);
      }
    };
  }, [isDescending, isGrabbing, animateMovement]);

  const handleClick = useCallback(() => {
    if (!isDescending && !isGrabbing) {
      setIsDescending(true);
    } else if (isDescending) {
      setIsDescending(false);
      setIsGrabbing(true);
      // Clear the stuck timer if the user manually initiates grabbing
      if (stuckTimerRef.current) {
        clearTimeout(stuckTimerRef.current);
        stuckTimerRef.current = null;
      }
    }
  }, [isDescending, isGrabbing]);

  return (
    <Box
      ref={clawMachineRef}
      sx={{
        width: '100%',
        height: 400,
        border: '2px solid #333',
        position: 'relative',
        backgroundColor: '#f8f8f8',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handleClick}
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

