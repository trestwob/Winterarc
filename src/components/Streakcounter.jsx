import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const StreakCounter = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const resetTimer = () => 
  {
    const confirmReset = window.confirm('Are you sure you want to reset the timer?');
    if (confirmReset) 
    {
      setTime(0);
      setIsActive(false);
      setIsClicked(false);
    }
  }
  const toggleTimer = () => {
    setIsActive(!isActive);
    setIsClicked(true);
  }
// fetch localstorage data and settime
  useEffect(() => {
    const savedTime = localStorage.getItem('time');
    const savedIsActive = localStorage.getItem('isActive') === 'false';
    if (savedTime)
    {
      setTime(parseInt(savedTime, 10));
    }
    setIsActive(savedIsActive);
  }, [])
// set localstorage time
  useEffect(() => {
    localStorage.setItem('time', time);
    localStorage.setItem('isActive', isActive);
  }, [time, isActive]);

  //display date time 
  useEffect(() => {
    if (isActive)
    {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive])

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600)); // Days
    const hours = Math.floor((seconds % (24 * 3600)) / 3600); // Hours
    const minutes = Math.floor((seconds % 3600) / 60); // Minutes
    const sec = seconds % 60; // Seconds

    return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`;
  };
  return (
    <div>
      <div className='text-center text-7xl'>
        {formatTime(time)}
      </div>
      <Stack spacing={2} direction="column" sx={{justifyContent: 'center', alignItems: 'center'}} className='m-5'>
        {!isClicked && (<Button variant="contained" disabled={isClicked} onClick={toggleTimer}>
          Start the challenge
        </Button>)}
        <Button variant="contained" onClick={resetTimer}>Relapse</Button>
      </Stack>
    </div>
  )
}

export default StreakCounter; 