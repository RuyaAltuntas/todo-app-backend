// EditTaskModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const EditTaskModal = ({ visible, onCancel, onSave, task, users, statuses }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        taskTitle: task.taskTitle,
        userId: task.user.id,
        taskStatusId: task.taskStatus.id,
      });
    }
  }, [task, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:8080/api/userTask/updateUserTask/${task.key}`, {
        ...task,
        taskTitle: values.taskTitle,
        userId: values.userId,
        taskStatusId: values.taskStatusId,
      });
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
      <Form form={form} layout="vertical">
        <Form.Item
          name="taskTitle"
          label="Task Title"
          rules={[{ required: true, message: 'Please enter task title!' }]}
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
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="taskStatusId"
          label="Status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select>
            {statuses.map((status) => (
              <Select.Option key={status.id} value={status.id}>
                {status.status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
