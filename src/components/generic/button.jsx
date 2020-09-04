import React from "react";
import Button from 'react-bootstrap/Button';

// TODO(WIP): Finish and add to all locations where buttons are.
const CustomButton = (props) => {
  const {
    label,
    onClick,
    style
  } = props;

  return (
    <Button 
      onClick={onClick}
      style={style}>
      {label}
    </Button>
  );   
};

export default CustomButton;