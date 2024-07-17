import React from 'react';
import { Button } from 'antd';

const FilterButton = ({ onFilter }) => (
  <Button type="primary" onClick={onFilter}>
    Filter
  </Button>
);

export default FilterButton;
