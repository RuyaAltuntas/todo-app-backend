
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function TaskStatusDropdown({ statuses = [], selectedStatus, onStatusChange }) {
  return (
    <Select value={selectedStatus} onChange={onStatusChange} style={{ width: 200 }}>
      <Option value="All">All</Option>
      {statuses.map(status => (
        <Option key={status.id} value={status.id}>
          {status.status}
        </Option>
      ))}
    </Select>
  );
}

export default TaskStatusDropdown;






