import React, { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  inputType,
  editing,
  form,
  ...restProps
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const save = async () => {
    try {
      const values = await form.validateFields();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const childNode = editable ? (
    <Form.Item
      name={dataIndex}
      style={{ margin: 0 }}
      rules={[{ required: true, message: `${title} is required.` }]}
    >
      <Input ref={inputRef} onPressEnter={save} onBlur={save} />
    </Form.Item>
  ) : (
    children
  );

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
