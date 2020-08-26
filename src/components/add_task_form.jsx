import React, { useState } from "react";
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "react-datepicker/dist/react-datepicker.css";

// TODO: Use the imported `task` such that this form can be both edit and create form
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
      <Form.Group controlId="formTaskName" style={styles.formGroup}>
        <Form.Label>Task name</Form.Label>
        <Form.Control
          type="text"
          value={updatedTask.name}
          onChange={e => handleUpdateTaskInput('name', e.target.value)}
          name="text"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="formTaskDescription" style={styles.formGroup}>
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control
          type="text"
          value={updatedTask.description}
          onChange={e => handleUpdateTaskInput('description', e.target.value)}
          name="text"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="formTaskDueDate" style={styles.formGroup}>
        <Form.Label>
          Due date
        </Form.Label>
        <DatePicker
          selected={Date.parse(updatedTask.dueDate)}
          onChange={date => handleUpdateTaskInput('dueDate', date)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="btn btn__primary btn__lg">
        {'Add task'}
      </Button>
    </Form>
  );
}

AddTaskForm.propTypes = {
  // TODO: Add task as a prop to determined add or edit functionality
  // task: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const styles = {
  formContainer: {
    marginLeft: `20px`,
    padding: '20px',
    border: '1px solid blue',
    borderRadius: '5px',
  },

  formGroup: {
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },
};

export default AddTaskForm;