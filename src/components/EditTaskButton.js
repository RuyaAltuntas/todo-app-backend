// EditTaskButton.js

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TaskEditForm from './TaskEditForm'; // Import the TaskEditForm component

const EditTaskButton = ({ task, users, statuses, onSave }) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={handleOpen}>
        Edit Task
      </Button>
      <Modal
        visible={visible}
        title="Edit Task"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleClose}
        onOk={handleClose} // Ensure you handle the save logic in TaskEditForm
      >
        <TaskEditForm
          visible={visible}
          onCancel={handleClose}
          onSave={onSave}
          task={task}
          users={users}
          statuses={statuses}
        />
      </Modal>
    </>
  );
};

export default EditTaskButton;
