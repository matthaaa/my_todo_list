import React, { useState } from "react";
import './App.css';
import TodoList from './components/todo_list.jsx';
// import FilterButton from "./components/filter_button.jsx";
import TaskForm from "./components/task_form.jsx";
import { nanoid } from "nanoid";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  const { taskData } = props;
  const [tasks, setTasks] = useState(taskData);
  const tasksFormattedNoun = tasks.length !== 1 ? 'tasks' : 'task';

  const toggleCompleted = id => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        // override data with switched completed attribute
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  const createTask = name => {
    const newTask = { 
      name, 
      id: `task=${nanoid()}`, 
      isCompleted: false, 
    };
    setTasks([...tasks, newTask]);
  };
  
  const deleteTask = id => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newTask) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        // replace task with updated data
        return newTask;
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <TaskForm createTask={createTask} />
      {/* <div className="filters btn-group stack-exception">
        <FilterButton />
      </div> */}
      <h2 id="list-heading">
        {tasks.length} {tasksFormattedNoun} remaining
      </h2>
      <TodoList 
        taskData={tasks}
        toggleCompleted={toggleCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
