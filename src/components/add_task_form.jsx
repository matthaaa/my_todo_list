import React, { useState } from "react";
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Colors } from '../colors.js';
import TaskForm from './task_form.jsx';

import "react-datepicker/dist/react-datepicker.css";

const AddTaskForm = (props) => {
  const { onSubmit } = props;
  const blankTask = { name: '', description: '', dueDate: new Date().toDateString() };
  const [updatedTask, setUpdatedTask] = useState(blankTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedTask);
    setUpdatedTask(blankTask);
  };

  const handleUpdateTaskInput = (field, value) => {
    setUpdatedTask({
      ...updatedTask,
      [field]: field === 'dueDate' ? value.toDateString() : value,
    });
  }

  return (
    <Form style={styles.formContainer} onSubmit={handleSubmit}>
      <TaskForm formTask={updatedTask} onUpdateTask={handleUpdateTaskInput} />
      <Button variant="primary" type="submit" className="btn btn__primary btn__lg">
        {'Add task'}
      </Button>
    </Form>
  );
}

AddTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

const styles = {
  formContainer: {
    borderRadius: '.25rem',
  },
};

export default AddTaskForm;