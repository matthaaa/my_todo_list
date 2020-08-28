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
      <div style={styles.formHeader}>
        <h4>New task</h4>
      </div>
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
    marginLeft: `20px`,
    padding: '20px',
    border: '1px solid',
    borderRadius: '.25rem',
    height: '25rem',
    borderColor: Colors.blueMunsell,
    backgroundColor: Colors.mintCream,
  },

  formHeader: {
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '1rem',
  },
};

export default AddTaskForm;