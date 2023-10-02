import React, { useState } from 'react'
import './app.css'

const App = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState('');


    const addTask = ( task) => {
        const newTask = [...tasks , task];
        setTasks(newTask); 
    }

    const removeTask = (index) => {
        const newTask = tasks.filter((_, i) => i !== index);
        setTasks(newTask);
    }

    const startEditing = (index) => {
        setEditingIndex(index)
        setEditedTask(tasks[index])
    }

    const saveEditedTask = () => {
        if(editedTask.trim() === '') return;

        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = editedTask;
        setTasks(updatedTasks);
        setEditedTask('');
        editingIndex !== -1 && setEditingIndex(-1);
    }

    const deleteAllTasks = () => {
        setTasks([]);
        setEditingIndex(-1);
        setEditedTask('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newTask.trim() === '') return;

        addTask(newTask);
        setNewTask('');
    }
  return (
    <div className='flex flex-col items-center justify-center bg-slate-950 w-full min-h-screen gap-10 text-white'>
    <h1 className='text-3xl font-bold underline text-teal-500'>My To Do List</h1>

    <form onSubmit={handleSubmit}>
    <div className='flex flex-row justify-center items-center gap-0.1'>
    <input type="text" placeholder='New Task'  value={newTask} onChange={(e) => setNewTask(e.target.value)} className='text-black outline-none rounded-l-md p-2'/>
    <button type="submit" className='bg-teal-500 p-2 rounded-r-md'>Add</button>
    </div>
    </form>
    <ul className=''>
    {tasks.map((task, index) => (
        <li key={index}>
        {index === editingIndex ? (
            <>
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className='text-black outline-none rounded-l-md p-2'/>
                <button type='button' onClick={() => saveEditedTask(index)} className='bg-teal-500 p-2 rounded-r-md'>Save</button>
            </>
        ) : (
            <div className='bg-slate-800 p-1 pl-3 pr-3 flex flex-row gap-20 items-center rounded-sm'>
            {task}
            <section className="flex flex-end">
            <button type='button' onClick={() => startEditing(index)} className = 'bg-teal-500 p-2 rounded-l-md' >Edit</button>  
            <button type='button' onClick={() => removeTask(index)} className= 'bg-red-500 p-2 rounded-r-md' >Remove</button>           
            </section>
            </div>
        )} 
        </li>
    ))}

    <button type="button" className='bg-red-600 p-1.5 rounded-md mt-4' onClick={() => deleteAllTasks()}>Delete All</button>
    </ul>

    </div>
  )
}

export default App