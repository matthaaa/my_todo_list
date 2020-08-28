import React, { useState } from "react";
import './App.css';
import TodoList from './components/todo_list.jsx';
import AddTaskForm from './components/add_task_form.jsx';
import { nanoid } from "nanoid";
import { Colors } from './colors.js';
import { dueToday, pastDue } from './task_helpers.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  const storedTaskData = localStorage.getItem('tasks');
  const taskData = storedTaskData ? JSON.parse(storedTaskData) : props.taskData;
  const [tasks, setTasks] = useState(taskData);
  const tasksFormattedNoun = tasks => tasks.length !== 1 ? 'tasks' : 'task';

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

  const sortedTasks = (sortByAttribute) => {
    switch(sortByAttribute) {
      case 'dueDate':
        return tasks.sort((task1, task2) => Date.parse(task1[sortByAttribute]) - Date.parse(task2[sortByAttribute]));
      default:
        // TODO: Create cases for additional sorting options.
        return tasks;
    }
  };

  // TODO: Implement filters; this will be passed into Filter Button component.
  // const handleFilter = (filter) => {}

  const completedTasks = tasks.filter(task => task.isCompleted);
  const overdueTasks = tasks.filter(task => pastDue(task));
  const dueTodayTasks = tasks.filter(task => dueToday(task));

  return (
    <div className="todoapp stack-large" style={styles.appContainer}>
      <div style={styles.welcomeContent}>
        <h1>Welcome!</h1>
        <h4 id="list-heading">
          You have {completedTasks.length} / {tasks.length} {tasksFormattedNoun(tasks)} completed.
        </h4>
        <h4 id="list-heading">
          You have {dueTodayTasks.length} {tasksFormattedNoun(dueTodayTasks)} due today.
        </h4>
        <h4 id="list-heading">
          {
          /* 
           * TODO: Currently overdue tasks also includes tasks due today;
           * once this is fixed, revert this to just use overdueTasks
           */
          }
          You have {overdueTasks.length - dueTodayTasks.length} {tasksFormattedNoun(overdueTasks - dueTodayTasks)} past due.
        </h4>
      </div>
      <div style={styles.appContent}>
        <TodoList 
          taskData={sortedTasks('dueDate')}
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
