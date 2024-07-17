/*
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function AddTaskForm({ users, taskStatuses, isVisible, onClose, onAddTask }) {
  const [form] = Form.useForm();

  //'Add Task' Butonu çalışma -> 'ok' tuşuna basıldığında
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post('http://localhost:8080/api/userTask/addTask', {
        userId: values.userId,
        taskStatusId: values.statusId,
        taskTitle: values.taskTitle,
      });

      const createdTask = response.data;

      // Format the new task data
      const newTaskData = {
        key: createdTask.id, 
        user: users.find(user => user.id === values.userId)?.name || 'Unknown User',  // Map user ID to name
        task: createdTask.title,  // user response -> title
        status: createdTask.status.status,  
      };

      //yeni datayı ekle
      onAddTask(newTaskData);
      
      form.resetFields();
      onClose();
    } catch (error) { 
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  //'cancel' tuşuna basıldığında
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="userId"
          label="User"
          rules={[{ required: true, message: 'Please select a user!' }]}
        >
          <Select placeholder="Select a user">
            {users.map(user => (
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
          <Select placeholder="Select a status">
            {taskStatuses.map(status => (
              <Option key={status.id} value={status.id}>
                {status.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="taskTitle"
          label="Task Title"
          rules={[{ required: true, message: 'Please input the task title!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTaskForm;
*/

import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function AddTaskForm({ users, taskStatuses, isVisible, onClose, onAddTask }) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post('http://localhost:8080/api/userTask/addTask', {
        userId: values.userId,
        taskStatusId: values.statusId,
        taskTitle: values.taskTitle,
      });

      const createdTask = response.data;

      // Format the new task data
      const newTaskData = {
        key: createdTask.id,
        user: users.find(user => user.id === values.userId)?.name || 'Unknown User',
        task: createdTask.title,
        status: taskStatuses.find(status => status.id === values.statusId)?.name || 'Unknown Status',
      };

      // Add the new task to the list
      onAddTask(newTaskData);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Task"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="userId"
          label="User"
          rules={[{ required: true, message: 'Please select a user!' }]}
        >
          <Select placeholder="Select a user">
            {users.map(user => (
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
          <Select placeholder="Select a status">
            {taskStatuses.map(status => (
              <Option key={status.id} value={status.id}>
                {status.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="taskTitle"
          label="Task Title"
          rules={[{ required: true, message: 'Please input the task title!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTaskForm;

