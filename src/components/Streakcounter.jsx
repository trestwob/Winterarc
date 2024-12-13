import React from 'react'
import { useState, useEffect } from 'react'
import Tasklist from './Tasklist';

import Button from '@mui/material/Button';

const Streakcounter = () => {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const storedStreak = localStorage.getItem('streak')
        if (storedStreak) {
            setStreak(parseInt(storedStreak, 10));
        }
    }, []);

    const addStreak = () => {
        const newStreak = streak  + 1;
        setStreak(newStreak)
        localStorage.setItem('streak' , newStreak)
    };

    const resetStreak = () => {
        setStreak(0);
        localStorage.setItem('streak', 0);
    };
  return (
    <div className='container flex justify-center'>
        <h1 className='text-8xl items-center align-middle'>Day {streak}</h1>
        <Tasklist onCompleteAllTasks={addStreak} onFailTasks={resetStreak} />

    </div>
  )
}

export default Streakcounter