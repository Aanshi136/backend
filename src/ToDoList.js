import React, { useState, useEffect } from "react";
import api from "./api/todoList";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await api.get("/ToDoList");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now().toString(), tasks: task };

    try {
      const response = await api.post("/ToDoList", newTask);
      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = (index) => {
    setTask(tasks[index].tasks);
    setEditIndex(index);
  };

  const updateTask = async () => {
    if (task.trim() === "" || editIndex === null) return;
    const updatedTask = { ...tasks[editIndex], tasks: task };

    try {
      await api.put(`/ToDoList/${tasks[editIndex].id}`, updatedTask);
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? updatedTask : t
      );
      setTasks(updatedTasks);
      setTask("");
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (index) => {
    try {
      await api.delete(`/ToDoList/${tasks[index].id}`);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search task..."
          className="flex-1 p-2 border rounded-l"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
        {tasks.length > 0 ? (
          tasks.map((t, index) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-gray-100 p-2 mt-2 rounded"
            >
              <span>{t.tasks}</span>
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
          ))
        ) : (
          <p className="text-center text-red-800">No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
