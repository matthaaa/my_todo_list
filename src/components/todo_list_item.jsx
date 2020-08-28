import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditTaskForm from './edit_task_form.jsx';
import { Colors } from '../colors.js';
import { dueToday, pastDue } from '../task_helpers.js';

const TodoListItem = (props) => {
  const {
    task,
    toggleCompleted, 
    editTask, 
    deleteTask,
  } = props;
  const taskId = task.id;
  const taskName = task.name;

  const isDueToday = dueToday(task);
  const isPastDue = pastDue(task);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = updatedTask => {
    editTask(taskId, updatedTask);
    setShowEditModal(false);
  }

  const styleByDueDate = (componentStyle) => {
    if (isDueToday) {
      return {...componentStyle, ...styles.dueToday};
    } else if (isPastDue) {
      return {...componentStyle, ...styles.pastDue};
    } else {
      return componentStyle;
    }
  }

  const styleByCompleted = (componentStyle) => (
    task.isCompleted ? {...componentStyle, ...styles.isCompleted} : componentStyle
  );

  const dueLabel = () => {
    if (isDueToday) {
      return '(Due today)';
    } else if (isPastDue) {
      return '(Past due)';
    } else {
      return '';
    }
  };

  return (
    <div style={styleByDueDate(styles.listItemContainer)}>
      <EditModal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        onSave={task => handleSave(task)}
        task={task}
      />
      <div style={styleByCompleted(styles.listItemContent)}>
        <div style={styleByDueDate(styles.listItemHeader)}>
          <input 
            id={taskId} 
            type="checkbox" 
            defaultChecked={task.isCompleted} 
            onChange={() => toggleCompleted(taskId)}
            style={styles.checkbox}
          />
          <div style={styles.listItemHeaderContent}>
            <h5 className="todo-name" style={styles.headerText}>
              {taskName} {dueLabel()}
            </h5>
            <div style={styles.actionButtons}>
              {!task.isCompleted && <Button 
                onClick={() => setShowEditModal(true)}>
                Edit
              </Button>}
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
          <div>
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

// TODO: Refactpr styles; add commonly used styles to generic Styles.js file.
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

  listItemContainer: {
    display: 'flex',
    border: '1px solid',
    borderColor: Colors.blueMunsell,
    borderRadius: '.25rem',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
    marginBottom: '10px',
  },

  pastDue: {
    borderColor: Colors.middleRed,
    backgroundColor: Colors.middleRed,
  },

  dueToday: {
    borderColor: Colors.middleRed,
  },

  isCompleted: {
    opacity: '0.6',
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
    backgroundColor: Colors.blueMunsell,
    color: 'white',
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
    borderRadius: '0rem 0rem .25rem .25rem',
  },

  taskBodyLabel: {
    color: Colors.blueMunsell,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '2px',
  },

  actionButtons: {
    display: 'flex',
  },

  deleteButton: {
    marginLeft: '5px',
  },
}

export default TodoListItem;