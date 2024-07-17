// TaskEditForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TaskEditForm = ({ visible, onCancel, onSave, task, users, statuses }) => {
  const [form] = Form.useForm();
  
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = {
        userId: values.userId,
        todoItemId: values.todoItemId,
        taskStatusId: values.taskStatusId,
        taskTitle: values.taskTitle,
        isActive: true, // or any other logic for isActive
      };
      await axios.put(`http://localhost:8080/api/userTask/updateUserTask/${task.key}`, updatedTask);
      onSave();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Task"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          userId: task.userId,
          todoItemId: task.todoItemId,
          taskStatusId: task.taskStatusId,
          taskTitle: task.taskTitle,
        }}
      >
        <Form.Item name="userId" label="User" rules={[{ required: true, message: 'Please select a user' }]}>
          <Select>
            {users.map(user => (
              <Option key={user.id} value={user.id}>{user.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="todoItemId" label="Task" rules={[{ required: true, message: 'Please select a task' }]}>
          <Select>
            {/* Replace with your tasks */}
            {statuses.map(status => (
              <Option key={status.id} value={status.id}>{status.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="taskTitle" label="Task Title" rules={[{ required: true, message: 'Please enter the task title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="taskStatusId" label="Status" rules={[{ required: true, message: 'Please select a status' }]}>
          <Select>
            {statuses.map(status => (
              <Option key={status.id} value={status.id}>{status.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskEditForm;
