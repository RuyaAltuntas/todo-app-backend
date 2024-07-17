
import React, { useState } from 'react';
import { Select, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const { Option } = Select;

function UserDropdown({ users, selectedUser, onUserChange, setUsers }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.isActive = true;
      const response = await axios.post('http://localhost:8080/api/user', values);
      const newUser = response.data;
      setUsers(prevUsers => [...prevUsers, newUser]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding user:', error.response.data);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Select value={selectedUser} onChange={onUserChange} style={{ width: 200, marginRight: 16 }}>
    <Option value="All">All</Option> {/* Use "All" as string */}
    {users.map(user => (
        <Option key={user.id} value={user.id}>
            {user.name}
        </Option>
    ))}
</Select>

      <Button type="primary" onClick={showModal}>Add User</Button>
      <Modal title="Add New User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Surname" rules={[{ required: true, message: 'Please input the surname!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserDropdown;
