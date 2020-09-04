import React, { useState } from "react";
import './App.css';
import TodoList from './components/todo_list.jsx';
import { AddTaskModal } from './components/task_action_modals.jsx';
import { nanoid } from "nanoid";
import { Colors } from './colors.js';
import { dueToday, pastDue } from './task_helpers.js';
import CustomButton from './components/generic/custom_button.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  const storedTaskData = localStorage.getItem('tasks');
  const taskData = storedTaskData ? JSON.parse(storedTaskData) : props.taskData;
  
  const [tasks, setTasks] = useState(taskData);
  const [showAddModal, setShowAddModal] = useState(false);

  const tasksFormattedNoun = numberOfTasks => numberOfTasks !== 1 ? 'Tasks' : 'Task';

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
    setShowAddModal(false);
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

  const pastDueCount = overdueTasks.length - dueTodayTasks.length;

  return (
    <div className="todoapp stack-large" style={styles.appContainer}>
      <AddTaskModal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        onSave={createTask}
      />
      <div style={styles.welcomeContainer}>
        <div style={styles.welcomeContent}>
          <h1>Welcome!</h1>
          <div style={styles.taskStats}>
            <div style={styles.taskStat}>
              <h5 style={styles.taskStatNumber}>
                {completedTasks.length}/{tasks.length} 
              </h5>
              <p>
                {tasksFormattedNoun(tasks.length)} completed
              </p>
            </div>
            <div style={styles.taskStat}>
              <h5 style={styles.taskStatNumber}>
                {dueTodayTasks.length} 
              </h5>
              <p>
                {tasksFormattedNoun(dueTodayTasks.length)} due today
              </p>
            </div>
            <div style={styles.lastTaskStat}>
              {
                /* 
                * TODO: Currently overdue tasks also includes tasks due today;
                * once this is fixed, revert this to just use overdueTasks
                */
              }
              <h5 style={{...styles.taskStatNumber, ...{color: pastDueCount > 0 ? Colors.middleRed : Colors.blueMunsell}}}>
                {pastDueCount} 
              </h5>
              <p>
                {tasksFormattedNoun(pastDueCount)} past due
              </p>
            </div>
          </div>
          <CustomButton 
            onClick={() => setShowAddModal(true)}
            label={'Add task'}
          />
        </div>
      </div>
      <div style={styles.appContent}>
        <TodoList 
          taskData={sortedTasks('dueDate')}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    padding: '3rem',
    height: '100vh',
    backgroundColor: Colors.powderBlue,
  },

  welcomeContainer: {
    color: Colors.spaceCadet,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '3rem',
    paddingBottom: '3rem',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },
  
  welcomeContent: {
    padding: '4rem',
    border: '1px solid',
    borderColor: Colors.blueMunsell,
    backgroundColor: Colors.mintCream,
    borderRadius: '.25rem',
  },

  taskStats: {
    display: 'flex',
    margin: '2rem 0rem',
    borderColor: Colors.blueMunsell,
  },

  taskStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '1.5rem',
    paddingRight: '1.5rem',
    borderRight: '1px solid',
  },
  
  lastTaskStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  taskStatNumber: {
    color: Colors.blueMunsell,
    fontSize: '4rem',
  },

  taskTrackerHeader: {
    color: Colors.blueMunsell,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '2px',
  },

  appContent: {
    flexDirection: 'row',
    display: 'flex',
  },
}

export default App;
