import axios from "axios";


export const fetchTasks = async () => {
   try {
    const response = await axios.get('http://localhost:4000/api/tasks');
    return response.data;
   } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
   }
}

export const createTask = async (newTask)=>{
   try {
      const response  = await axios.post('http://localhost:4000/api/tasks/', {
         title: newTask,
         completed: false,
      })
      return response.data
   } catch (error) {
      console.error("Error creating a task", error)
   }
}

export const updateTask = async (taskID, updatedTask) => {
   try {
      if(!taskID) return ;
      const response = await axios.patch(`http://localhost:4000/api/tasks/${taskID}`, updatedTask);
      return response.data;
   } catch (error) {
      throw error
   }
}


export const deleteTask = async(taskID) =>{
   try {
      if(!taskID) return ;
      await axios.delete(`http://localhost:4000/api/tasks/${taskID}`);

   } catch (error) {
      throw error;
   }
}

export const deleteAllTask = async() =>{
   try {
      await axios.delete(`http://localhost:4000/api/tasks/`);

   } catch (error) {
      throw error;
   }
}


