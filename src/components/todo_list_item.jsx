import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditTaskForm from './edit_task_form.jsx';
import { Colors } from '../colors.js';

const TodoListItem = (props) => {
  const {
    task,
    toggleCompleted, 
    editTask, 
    deleteTask,
  } = props;
  const taskId = task.id;
  const taskName = task.name;
  const dueToday = task.dueDate === new Date().toDateString();

  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = updatedTask => {
    editTask(taskId, updatedTask);
    setShowEditModal(false);
  }

  return (
    <div style={styles.listItemContainer}>
      <EditModal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        onSave={task => handleSave(task)}
        task={task}
      />
      <div style={styles.listItemContent}>
        <div style={dueToday ? styles.listItemHeaderDueToday : styles.listItemHeader}>
          <input 
            id={taskId} 
            type="checkbox" 
            defaultChecked={task.isCompleted} 
            onChange={() => toggleCompleted(taskId)}
            style={styles.checkbox}
          />
          <div style={styles.listItemHeaderContent}>
            <h5 className="todo-name" style={styles.headerText}>
              {taskName} {dueToday ? '(Due today)' : ''}
            </h5>
            <div style={styles.actionButtons}>
              <Button 
                onClick={() => setShowEditModal(true)}>
                Edit
              </Button>
              <Button 
                variant="danger"
                onClick={() => deleteTask(taskId)}
                style={styles.deleteButton}>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div style={styles.listItemBody}>
          <div>
            <p style={styles.taskBodyLabel}>Description</p>
            <p className="todo-description">
              {task.description}
            </p>
          </div>
          <div style={dueToday ? styles.dueTodayLabel : null}>
            <span>Due: </span>
            <span className="todo-due-date">
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const EditModal = (props) => {
  const { show, onHide, onSave, task } = props;
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTaskForm task={task} onHide={onHide} onSubmit={onSave} />
        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  listItemContainer: {
    border: '1px solid',
    borderColor: Colors.blueMunsell,
    borderRadius: '5px',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
    marginBottom: '10px',
  },

  listItemContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  listItemHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    borderRadius: '5px 5px 0px 0px',
    backgroundColor: Colors.blueMunsell,
    color: 'white',
  },

  listItemHeaderDueToday: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid',
    borderColor: Colors.maizeCrayola,
    borderRadius: '5px 5px 0px 0px',
    color: Colors.spaceCadet,
    backgroundColor: Colors.maizeCrayola,
  },

  headerText: {
    margin: 0,
  },
  
  checkbox: {
    display: 'block',
    position: 'relative',
    cursor: 'pointer',
    fontSize: '22px',
    lineHeight: '24px',
    height: '24px',
    width: '24px',
    clear: 'both',
    marginLeft: '5px',
    marginRight: '15px',
    border: '1px solid',
    borderColor: Colors.powderBlue,
  },

  listItemHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '500px',
  },

  listItemBody: {
    backgroundColor: Colors.mintCream,
    padding: '10px',
    borderRadius: '0px 0px 5px 5px',
  },

  taskBodyLabel: {
    color: Colors.blueMunsell,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '2px',
  },

  dueTodayLabel: {
    backgroundColor: Colors.middleRed,
  },

  actionButtons: {
    display: 'flex',
  },

  deleteButton: {
    marginLeft: '5px',
  },
}

export default TodoListItem;