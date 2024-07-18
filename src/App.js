/*
import React, { useState, useEffect } from 'react';
import UserDropdown from './components/UserDropdown';
import TaskStatusDropDown from './components/TaskStatusDropdown';
import FilterButton from './components/FilterButton';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import { Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

import './App.css';

const { Option } = Select;

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
    fetchTaskStatuses();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userTask/allTasks');
      const tasksWithKey = response.data.map((task) => ({
        ...task,
        key: task.id,
        user: task.user,
        taskStatus: task.taskStatus,
        todoItem: task.todoItem
      }));
      setTasks(tasksWithKey);
      setFilteredTasks(tasksWithKey);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/status/allStatus');
      setTaskStatuses(response.data);
    } catch (error) {
      console.error('Error fetching task statuses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/allUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const applyFilter = async () => {
    const filters = {
      userId: selectedUser !== 'All' ? Number(selectedUser) : undefined,
      statusId: selectedStatus !== 'All' ? Number(selectedStatus) : 0
    };

    console.log('Filters applied:', filters);

    try {
      const response = await axios.get('http://localhost:8080/api/userTask/filter', { params: filters });
      console.log('Filtered response:', response.data);

      const tasksWithKey = response.data.map((task) => ({
        ...task,
        key: task.id,
        user: task.user,
        taskStatus: task.taskStatus,
        todoItem: task.todoItem
      }));
      setFilteredTasks(tasksWithKey);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const handleUserChange = (userId) => {
    console.log('User changed to:', userId);
    setSelectedUser(userId);
  };

  const handleStatusChange = (statusId) => {
    console.log('Status changed to:', statusId);
    setSelectedStatus(statusId);
  };

  const handleFilter = () => {
    console.log('Filter button clicked');
    applyFilter();
  };

  const handleAddTask = () => {
    setIsAddTaskVisible(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskVisible(false);
  };

  const handleAddTaskSubmit = () => {
    fetchTasks(); // Refresh tasks after adding
    handleCloseAddTask();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      taskTitle: task.taskTitle,
      userId: task.userId,
      statusId: task.taskStatusId
    });
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:8080/api/userTask/updateUserTask/${editingTask.key}`, {
        userId: values.userId,
        todoItemId: editingTask.todoItemId,
        taskStatusId: values.statusId,
        taskTitle: values.taskTitle,
        isActive: editingTask.isActive,
      });
      fetchTasks();
      setIsEditModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingTask(null);
  };

  const deleteTask = async (key) => {
    try {
      await axios.delete(`http://localhost:8080/api/userTask/deleteUserTask/${key}`);
      const newTasks = tasks.filter((item) => item.key !== key);
      setTasks(newTasks);
      setFilteredTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Onbiron Task Manager</h1>
      <div className="header">
        <div className="left-section">
          <UserDropdown users={users} selectedUser={selectedUser} onUserChange={handleUserChange} setUsers={setUsers} />
          <TaskStatusDropDown
            statuses={taskStatuses}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
          <FilterButton onFilter={handleFilter} />
        </div>
        <div className="right-section">
          <Button type="primary" onClick={handleAddTask}>
            Add Task
          </Button>
          <Button type="default" onClick={() => handleEditTask(filteredTasks[0])}>
            Edit Task
          </Button>
        </div>
      </div>
      <TaskTable tasks={filteredTasks} onDelete={deleteTask} />
      <AddTaskForm
        users={users}
        taskStatuses={taskStatuses}
        isVisible={isAddTaskVisible}
        onClose={handleCloseAddTask}
        onAddTask={handleAddTaskSubmit}
      />
      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="taskTitle"
            label="Task Title"
            rules={[{ required: true, message: 'Please input the task title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userId"
            label="User"
            rules={[{ required: true, message: 'Please select a user!' }]}
          >
            <Select>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="statusId"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select>
              {taskStatuses.map((status) => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
*/
import React, { useState, useEffect } from 'react';
import UserDropdown from './components/UserDropdown';
import TaskStatusDropDown from './components/TaskStatusDropdown';
import FilterButton from './components/FilterButton';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import { Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

import './App.css';

const { Option } = Select;

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
    fetchTaskStatuses();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/userTask/allTasks');
      const tasksWithKey = response.data.map((task) => ({
        ...task,
        key: task.id,
        user: task.user,
        taskStatus: task.taskStatus,
        todoItem: task.todoItem,
      }));
      setTasks(tasksWithKey);
      setFilteredTasks(tasksWithKey);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/status/allStatus');
      setTaskStatuses(response.data);
    } catch (error) {
      console.error('Error fetching task statuses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/allUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const applyFilter = async () => {
    const filters = {
      userId: selectedUser !== 'All' ? Number(selectedUser) : undefined,
      statusId: selectedStatus !== 'All' ? Number(selectedStatus) : 0,
    };

    console.log('Filters applied:', filters);

    try {
      const response = await axios.get('http://localhost:8080/api/userTask/filter', { params: filters });
      console.log('Filtered response:', response.data);

      const tasksWithKey = response.data.map((task) => ({
        ...task,
        key: task.id,
        user: task.user,
        taskStatus: task.taskStatus,
        todoItem: task.todoItem,
      }));
      setFilteredTasks(tasksWithKey);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const handleUserChange = (userId) => {
    console.log('User changed to:', userId);
    setSelectedUser(userId);
  };

  const handleStatusChange = (statusId) => {
    console.log('Status changed to:', statusId);
    setSelectedStatus(statusId);
  };

  const handleFilter = () => {
    console.log('Filter button clicked');
    applyFilter();
  };

  const handleAddTask = () => {
    setIsAddTaskVisible(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskVisible(false);
  };

  const handleAddTaskSubmit = () => {
    fetchTasks(); // Refresh tasks after adding
    handleCloseAddTask();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      taskTitle: task.taskTitle,
      userId: task.userId,
      statusId: task.taskStatusId,
    });
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:8080/api/userTask/updateUserTask/${editingTask.key}`, {
        userId: values.userId,
        todoItemId: editingTask.todoItemId,
        taskStatusId: values.statusId,
        taskTitle: values.taskTitle,
        isActive: editingTask.isActive,
      });
      fetchTasks();
      setIsEditModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingTask(null);
  };

  const deleteTask = async (key) => {
    try {
      await axios.delete(`http://localhost:8080/api/userTask/deleteUserTask/${key}`);
      const newTasks = tasks.filter((item) => item.key !== key);
      setTasks(newTasks);
      setFilteredTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Onbiron Task Manager</h1>
      <div className="header">
        <div className="left-section">
          <UserDropdown users={users} selectedUser={selectedUser} onUserChange={handleUserChange} setUsers={setUsers} />
          <TaskStatusDropDown
            statuses={taskStatuses}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
          <FilterButton onFilter={handleFilter} />
        </div>
        <div className="right-section">
          <Button type="primary" onClick={handleAddTask}>
            Add Task
          </Button>
       
        </div>
      </div>
      <TaskTable tasks={filteredTasks} onDelete={deleteTask} onSelectTask={handleEditTask} />
      <AddTaskForm
        users={users}
        taskStatuses={taskStatuses}
        isVisible={isAddTaskVisible}
        onClose={handleCloseAddTask}
        onAddTask={handleAddTaskSubmit}
      />
      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="taskTitle"
            label="Task Title"
            rules={[{ required: true, message: 'Please input the task title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userId"
            label="User"
            rules={[{ required: true, message: 'Please select a user!' }]}
          >
            <Select>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="statusId"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select>
              {taskStatuses.map((status) => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;

