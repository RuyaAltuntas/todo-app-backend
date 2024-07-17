import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = ({ taskId, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [todoItem, setTodoItem] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch the current task details when component mounts
    axios.get(`/api/userTask/${taskId}`)
      .then(response => {
        const task = response.data;
        setTaskTitle(task.taskTitle);
        setDescription(task.description);
        setUser(task.user);
        setTodoItem(task.todoItem);
        setTaskStatus(task.taskStatus);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the task data!", error);
        setIsLoading(false);
      });
  }, [taskId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the UserTask object
    const updatedTask = {
      user: user,
      todoItem: todoItem,
      taskStatus: taskStatus,
      taskTitle: taskTitle,
      description: description,
      isActive: true // Assuming it remains true for update
    };

    // Update the task
    axios.put(`/api/userTask/updateUserTask/${taskId}`, updatedTask)
      .then(response => {
        console.log("Task updated successfully!");
        onClose(); // Close the edit form
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Title:
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          readOnly={!isEditing}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={!isEditing}
        />
      </label>
      <div>
        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </form>
  );
};

export default EditTask;
