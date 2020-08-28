import React from "react";
import TodoListItem from './todo_list_item.jsx';
import ListGroup from 'react-bootstrap/ListGroup';
import { Colors } from '../colors.js';

const TodoList = (props) => {
  const {taskData, toggleCompleted, editTask, deleteTask} = props;

  const taskList = taskData.map(task => (
    <TodoListItem
      key={task.id} 
      task={task}
      toggleCompleted={toggleCompleted}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  const emptyState = () => (
    <div style={styles.emptyStateContainer}>
      <h4>
        Add a task to get started!
      </h4>
    </div>
  );

  return (
    <ListGroup
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
      style={styles.listContainer}
    >
      {Object.keys(taskData).length ? taskList : emptyState() }
    </ListGroup>
  );
}

const styles = {
  listContainer: {
    display: 'flex',
  },

  emptyStateContainer: {
    border: '1px solid',
    padding: '5rem 10rem',
    backgroundColor: Colors.mintCream,
    borderColor: Colors.blueMunsell,
    borderRadius: '.25rem',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
    marginBottom: '10px',
    minWidth: '500px',
  },
};

export default TodoList;