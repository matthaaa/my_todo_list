import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Colors } from '../colors.js';
import AddTaskForm from './add_task_form.jsx';
import EditTaskForm from './edit_task_form.jsx';

export const AddTaskModal = (props) => {
  const { show, onHide, onSave } = props;
  return (
    <>
      <Modal show={show} onHide={onHide} style={styles.modalContainer}>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <AddTaskForm onSubmit={onSave} />
        </Modal.Body>
      </Modal>
    </>
  );
}
  
export const EditTaskModal = (props) => {
  const { show, onHide, onSave, task } = props;
  return (
    <>
      <Modal show={show} onHide={onHide} style={styles.modalContainer}>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <EditTaskForm task={task} onHide={onHide} onSubmit={onSave} />
        </Modal.Body>
      </Modal>
    </>
  );
}
  
export const DeleteTaskModal = (props) => {
  const { show, onHide, onConfirm, task } = props;
  return (
    <>
      <Modal show={show} onHide={onHide} style={styles.modalContainer}>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          Are you sue you want to delete '{task.name}'?
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={() => onHide(true)}>
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={() => onConfirm(task.id)}
            style={styles.deleteButton}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const styles = {
  modalContainer: {
      borderRadius: '.25rem',
  },
  
  modalHeader: {
      color: 'white',
      fontFamily: 'Open Sans',
      backgroundColor: Colors.blueMunsell,
  },
  
  modalBody: {
      backgroundColor: Colors.mintCream,
      borderRadius: '0rem 0rem .25rem .25rem',
  },  
};