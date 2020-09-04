import React from "react";
import Button from 'react-bootstrap/Button';

// TODO(WIP): Finish and add to all locations where buttons are.
const Button = (props) => {
  const {
    label,
    onClick,
    style
  } = this.props;

  return (
    <Button 
      onClick={onClick}
      style={style}>
      {label}
    </Button>
  );   
};

export default Button;