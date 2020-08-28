import React from "react";
import Button from 'react-bootstrap/Button';

const FilterButton = (props) => {
  return (
    <Button variant="primary" onClick={props.handleFilter}>
      <span className="visually-hidden">Show </span>
      <span>{props.label} </span>
      <span className="visually-hidden"> tasks</span>
    </Button>
  );
}

export default FilterButton;