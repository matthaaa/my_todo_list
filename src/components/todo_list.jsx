import React from "react";
import TodoListItem from './todo_list_item.jsx';
import ListGroup from 'react-bootstrap/ListGroup';

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

  return (
    <ListGroup
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {taskList}
    </ListGroup>
  );
}

export default TodoList;