import React, { useState, useEffect } from 'react'
import './app.css'
import { fetchTasks, createTask, updateTask , deleteTask, deleteAllTask } from './api/api_calls'

const App = () => {

    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState('');
    
    useEffect(() => {
        const fetchData = async() => {
            const data = await fetchTasks();
            setTasks(data)
        };
        fetchData()
    },[])

    // const addTask = ( task) => {
    //     const newTask = [...tasks , task];
    //     setTasks(newTask);
    // }

    const removeTask = async (id, index) => {
        try {
            await deleteTask(id);
            const newTask = tasks.filter((_, i) => i !== index);
            setTasks(newTask);
            
        } catch (error) {
            throw error;
        }
    }

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTask(tasks[index]?.title)
    }

    const saveEditedTask = async () => {
        if(editedTask.trim() === '') return;

        try {
            await updateTask(tasks[editingIndex]._id , {title: editedTask});
            const updatedTasks = await fetchTasks()
            setTasks(updatedTasks);
            setEditedTask('');
            editingIndex !== -1 && setEditingIndex(-1);
            
        } catch (error) {
            throw error;
        }

    }

    const deleteAllTasks = async () => {
        try {
            await deleteAllTask();
            setTasks([]);
            setEditingIndex(-1);
            setEditedTask(''); 
        } catch (error) {
            throw error;
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newTask.trim() === '') return;

        await createTask(newTask);
        const updatedTasks = await fetchTasks()
        setTasks(updatedTasks)
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
    <ul className='flex flex-col justify-center gap-6'>
    {tasks.map((task, index) => (
        <li key={task._id}>
        {task._id === tasks[editingIndex]?._id ? (
            <>
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className='text-black outline-none rounded-l-md p-2'/>
                <button type='button' onClick={() => saveEditedTask()} className='bg-teal-500 p-2 rounded-r-md'>Save</button>
            </>
        ) : (
            <div className='bg-slate-800 p-1 pl-3 pr-1 flex flex-row items-center justify-between rounded-sm w-full gap-8'>
            {task.title}
            <section>
            <button type='button' onClick={() => startEditing(index)} className = 'bg-teal-500 p-2 rounded-l-md' >Edit</button>  
            <button type='button' onClick={() => removeTask(task._id, index)} className= 'bg-red-500 p-2 rounded-r-md' >Remove</button>           
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