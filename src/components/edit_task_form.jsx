import React, { useState } from "react";
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      <Button variant="outline-primary" onClick={onHide} style={styles.closeButton}>
        Close
      </Button>
      <Button variant="primary" onClick={updatedTask => handleSubmit(updatedTask)}>
        Save
      </Button>
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

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },

  datePicker: {
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
  },
  
  closeButton: {
    marginRight: '.5rem',
  },
};

export default EditTaskForm;