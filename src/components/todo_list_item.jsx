import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TodoListItem = (props) => {
  const {
    task,
    toggleCompleted, 
    editTask, 
    deleteTask,
  } = props;
  const taskId = task.id;
  const taskName = task.name;

  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = updatedTask => {
    editTask(taskId, updatedTask);
    setShowEditModal(false);
  }

  console.log(task);

  return (
    <li
      className="todo stack-small">
      <EditModal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        onSave={task => handleSave(task)}
        task={task}
      />
      <div className="c-cb">
        <input 
          id={taskId} 
          type="checkbox" 
          defaultChecked={task.isCompleted} 
          onChange={() => toggleCompleted(taskId)}
        />
        <h4 className="todo-name">
          {taskName}
        </h4>
        <h4 className="todo-description">
          {task.description}
        </h4>
        <h4 className="todo-due-date">
          {task.dueDate.toString()}
        </h4>
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn"
          onClick={() => setShowEditModal(true)}>
          Edit <span className="visually-hidden">{taskName}</span>
        </button>
        <button 
          type="button" 
          className="btn btn__danger"
          onClick={() => deleteTask(taskId)}>
          Delete <span className="visually-hidden">{taskName}</span>
        </button>
      </div>
    </li>
  );
}

const EditModal = (props) => {
  const { show, onHide, onSave, task } = props;
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChangeName = (e) => {
    setUpdatedTask({
      ...task,
      name: e.target.value,
    });
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="new-todo-input" className="label__lg">
              Name
            </label>
            <input
              type="text"
              id="new-todo-input"
              className="input input__lg"
              value={updatedTask.name}
              onChange={handleChangeName}
              name="text"
              autoComplete="off"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSave(updatedTask)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoListItem;