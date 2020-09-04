import React, { useState } from "react";
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import CustomButton from './generic/custom_button.jsx';
import { Colors } from '../colors.js';
import TaskForm from './task_form.jsx';

import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = (props) => {
  const { task, onHide, onSubmit } = props;
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdateTaskInput = (field, value) => 
    setUpdatedTask({
      ...updatedTask,
      [field]: field === 'dueDate' ? value.toDateString() : value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedTask);
  };

  return (
    <Form style={styles.formContainer}>
      <TaskForm formTask={updatedTask} onUpdateTask={handleUpdateTaskInput}/>
      <CustomButton 
        hasOutlineStyle
        label={'Close'}
        onClick={onHide} 
        style={styles.closeButton}
      />
      <CustomButton 
        label={'Save'}
        onClick={updatedTask => handleSubmit(updatedTask)}
      />
    </Form>
  );
}

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const styles = {
  formContainer: {
    borderRadius: '.25rem',
    backgroundColor: Colors.mintCream,
  },
  
  closeButton: {
    marginRight: '.5rem',
  },
};

export default EditTaskForm;