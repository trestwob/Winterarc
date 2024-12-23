import React from 'react'
import { useState, useEffect } from 'react';

const Tasklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Workout', completed: false },
    { id: 2, name: 'Cold Shower', completed: false },
    { id: 3, name: 'Read', completed: false },
  ]);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  // Load streak and last completed date from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    const savedDate = localStorage.getItem('lastCompletedDate');
    const savedState = localStorage.getItem('checkboxState');
    const savedTimestamp = localStorage.getItem('checkboxTimestamp');
    if (savedStreak) setStreak(parseInt(savedStreak, 10));

    if (savedDate) setLastCompletedDate(savedDate);
  }, []);

  // Handle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle streak update
  const updateStreak = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (savedState && savedTimestamp === today) {
      setIsChecked(JSON.parse(savedState));
    } 
    // If user has completed all tasks and it's a new day
    if (tasks.every((task) => task.completed)) {
      if (lastCompletedDate !== currentDate) {
        setStreak((prevStreak) => prevStreak + 1);
        setLastCompletedDate(currentDate);
        localStorage.setItem('streak', streak + 1);
        localStorage.setItem('lastCompletedDate', currentDate);
      }
    } else {
      // If tasks are not completed, reset streak
      if (lastCompletedDate !== currentDate) {
        setStreak(0);
        setLastCompletedDate(currentDate);
        localStorage.setItem('streak', 0);
        localStorage.setItem('lastCompletedDate', currentDate);
      }
    }
  };


  // Button to trigger streak update
  const handleCompleteDay = () => {
    updateStreak();
  }
  return (
    <div>
    <h1>Daily Tasks</h1>
      <div>
        <p>Current Streak: {streak + 1} days</p>
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <label>{task.name}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleCompleteDay}>Complete Day</button>
    </div>
  )
}

export default Tasklist