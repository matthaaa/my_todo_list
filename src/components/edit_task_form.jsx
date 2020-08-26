import React, { useState } from "react";
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = (props) => {
  const { task, onHide, onSubmit } = props;
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdateTaskInput = (field, value) => {
    setUpdatedTask({
      ...updatedTask,
      [field]: field === 'dueDate' ? value.toDateString() : value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedTask);
  };

  return (
    <Form style={styles.formContainer}>
      <Form.Group controlId="formTaskName" style={styles.formGroup}>
        <Form.Label>Task name</Form.Label>
        <Form.Control
          type="text"
          value={updatedTask.name}
          onChange={e => handleUpdateTaskInput('name', e.target.value)}
          name="name"
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
          name="description"
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
      <Button variant="secondary" onClick={onHide}>
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
    borderRadius: '5px',
  },

  formGroup: {
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },
};

export default EditTaskForm;