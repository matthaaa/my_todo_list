import React from "react";
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';

const TaskForm = (props) => {
  const { formTask, onUpdateTask } = props;
  
  return (
    <div>
      <Form.Group controlId="formTaskName" style={styles.formGroup}>
        <Form.Label>Task name</Form.Label>
        <Form.Control
          required
          type="text"
          value={formTask.name}
          onChange={e => onUpdateTask('name', e.target.value)}
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
          value={formTask.description}
          onChange={e => onUpdateTask('description', e.target.value)}
          name="description"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group controlId="formTaskDueDate" style={styles.formGroup}>
        <Form.Label>
          Due date
        </Form.Label>
        <DatePicker
          selected={Date.parse(formTask.dueDate)}
          onChange={date => onUpdateTask('dueDate', date)}
        />
      </Form.Group>
    </div>
  );
};

TaskForm.propTypes = {
  formTask: PropTypes.object.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },
};

export default TaskForm;