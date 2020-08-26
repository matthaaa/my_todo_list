import React, { useState } from "react";
import './App.css';
import TodoList from './components/todo_list.jsx';
// import FilterButton from "./components/filter_button.jsx";
import AddTaskForm from "./components/add_task_form.jsx";
import { nanoid } from "nanoid";
import { Colors } from './colors.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  // const { taskData } = props;
  const storedTaskData = localStorage.getItem('tasks');
  const taskData = storedTaskData ? JSON.parse(storedTaskData) : props.taskData;
  // debugger;
  const [tasks, setTasks] = useState(taskData);
  const tasksFormattedNoun = tasks.length !== 1 ? 'tasks' : 'task';

  const updateTasks = tasks => {
    setTasks(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const toggleCompleted = id => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        // override data with switched completed attribute
        return {...task, isCompleted: !task.isCompleted}
      }
      return task;
    });
    updateTasks(updatedTasks);
  };
  
  const createTask = (inputTask) => {
    const newTask = { 
      ...inputTask,
      id: `task=${nanoid()}`, 
      isCompleted: false, 
    };
    updateTasks([...tasks, newTask]);
  };
  
  const deleteTask = id => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    updateTasks(remainingTasks);
  };

  const editTask = (id, newTask) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        // replace task with updated data
        return newTask;
      }
      return task;
    });
    updateTasks(editedTaskList);
  }

  const completedTasks = tasks.filter(task => task.isCompleted);
  console.log(tasks);
  return (
    <div className="todoapp stack-large" style={styles.appContainer}>
      <div style={styles.welcomeContent}>
        <h1>Welcome!</h1>
        <h4 id="list-heading">
          You have {completedTasks.length} / {tasks.length} {tasksFormattedNoun} completed.
        </h4>
      </div>
      <div style={styles.appContent}>
        <TodoList 
          taskData={tasks}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
          deleteTask={deleteTask}
        />
        <AddTaskForm onSubmit={createTask} />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    padding: '40px',
    height: '100vh',
    backgroundColor: Colors.powderBlue,
  },

  welcomeContent: {
    color: Colors.spaceCadet,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '40px',
    paddingBottom: '30px',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',

  },

  appContent: {
    flexDirection: 'row',
    display: 'flex',
  },
}

export default App;
