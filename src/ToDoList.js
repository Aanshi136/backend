import React, { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]); 
    setTask(""); 
  };

  
  const editTask = (index) => {
    setTask(tasks[index]); 
    setEditIndex(index); 
  };

 
  const updateTask = () => {
    if (task.trim() === "") return;
    const updatedTasks = tasks.map((t, index) =>
      index === editIndex ? task : t
    );
    setTasks(updatedTasks);
    setTask(""); 
    setEditIndex(null); 
  };

 
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>

    
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter task..."
          className="flex-1 p-2 border rounded-l"
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button
          onClick={editIndex !== null ? updateTask : addTask} 
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

     
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 mt-2 rounded"
          >
            <span>{t}</span>
            <div className="space-x-2">
              <button
                onClick={() => editTask(index)} 
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)} 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
