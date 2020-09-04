import React from "react";
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

// TODO(WIP): Finish and add to all locations where buttons are.
const CustomButton = (props) => {
  const {
    label,
    onClick,
    hasOutlineStyle,
    buttonType,
    style
  } = props;
  const variant = hasOutlineStyle ? `outline-${buttonType}` : buttonType;

  return (
    <Button
      variant={variant}
      onClick={onClick}
      style={style}>
      {label}
    </Button>
  );   
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonType: PropTypes.oneOf('primary', 'danger'),
  hasOutlineStyle: PropTypes.bool,
  style: PropTypes.object,
};

CustomButton.defaultProps = {
  buttonType: 'primary',
  hasOutlineStyle: false,
  style: null,
};

export default CustomButton;