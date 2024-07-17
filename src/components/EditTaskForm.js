// components/EditTaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskForm = ({ task, users, taskStatuses, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [taskStatusId, setTaskStatusId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (task) {
      setTaskTitle(task.taskTitle);
      setUserId(task.user.id);
      setTaskStatusId(task.taskStatus.id);
      setIsLoading(false);
    }
  }, [task]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTask = {
      userId,
      todoItemId: task.todoItem.id,
      taskStatusId,
      taskTitle,
      isActive: task.isActive
    };

    try {
      await axios.put(`http://localhost:8080/api/userTask/updateUserTask/${task.id}`, updatedTask);
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Task Title:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          User:
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Status:
          <select value={taskStatusId} onChange={(e) => setTaskStatusId(e.target.value)} required>
            <option value="">Select Status</option>
            {taskStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.status}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTaskForm;
