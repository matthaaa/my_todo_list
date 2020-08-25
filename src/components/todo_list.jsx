import React from "react";
import TodoListItem from './todo_list_item.jsx';

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
    <ul
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {taskList}
    </ul>
  );
}

export default TodoList;