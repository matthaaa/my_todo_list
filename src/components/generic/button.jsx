import React from "react";
import PropTypes from 'prop-types';

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

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

CustomButton.defaultProps = {
  style: null,
};

export default CustomButton;