import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
const Tasklist = ({onCompleteAllTasks, onFailTasks}) => {
    const [tasks, setTask] = useState([
        { id: 1, name: 'Complete the website', completed: false },
    ]);

    const [name, setName] = useState();


    const  completeTask = (taskId) => {
        setTask(tasks.map((task) => 
        task.id === taskId ? { ...task, completed: !task.completed} : task
        ))
    }
    const checkAllCompleted = () => {
        if (tasks.every((task) => task.completed)) {
          onCompleteAllTasks();
        } else {
          onFailTasks();
        }
      };
      const handleTask = (e) => {
        e.preventDefault()
        if (name.trim() == '') return;
        const newTask = {id: tasks.length + 1, name: name, completed: false};
        setTask([...tasks, newTask])
        setName('');
      }

    return (
    <div className='absolute right-20'>
        <nav>
            <p className='text-4xl'>Today's Goals</p>
        </nav>
        <div>
        <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            {task.name}
          </li>
        ))}
        <Button variant="contained" onClick={checkAllCompleted}>Complete Today's Task</Button>
        </ul>
        </div>
        <div className='m-2 align-middle items-center text-xl flex justify-around gap-5'>
            <TextField type="text" name="name" onChange={(e) => setName(e.target.value)} id="name" variant='outlined' />
            <Button type="submit" onClick={handleTask} variant="contained" color="success">Submit</Button>

        </div>
    </div>
  )
}

export default Tasklist