import React, { useState } from "react";
import './App.css';
import TodoList from './components/todo_list.jsx';
import AddTaskForm from './components/add_task_form.jsx';
import { nanoid } from "nanoid";
import { Colors } from './colors.js';
import { dueToday, pastDue } from './task_helpers.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  const storedTaskData = localStorage.getItem('tasks');
  const taskData = storedTaskData ? JSON.parse(storedTaskData) : props.taskData;
  
  const [tasks, setTasks] = useState(taskData);
  const [showAddModal, setShowAddModal] = useState(false);

  const tasksFormattedNoun = numberOfTasks => numberOfTasks !== 1 ? 'tasks' : 'task';

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

  const taskStatus = (label, content) => {
    return (
      <div style={styles.taskTracker}>
        <div style={styles.taskTrackerHeader}>
          <h5>
            {label}
          </h5>
        </div>
        <div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="todoapp stack-large" style={styles.appContainer}>
      <AddModal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)}
        onSave={createTask}
      />
      <div style={styles.welcomeContainer}>
        <div style={styles.welcomeContent}>
          <h1>Welcome!</h1>
          <h4 id="list-heading">
            {completedTasks.length} / {tasks.length} {tasksFormattedNoun(tasks.length)} completed.
          </h4>
          <h4 id="list-heading">
            You have {dueTodayTasks.length} {tasksFormattedNoun(dueTodayTasks.length)} due today.
          </h4>
          <h4 id="list-heading">
            {
            /* 
            * TODO: Currently overdue tasks also includes tasks due today;
            * once this is fixed, revert this to just use overdueTasks
            */
            }
            You have {overdueTasks.length - dueTodayTasks.length} {tasksFormattedNoun(overdueTasks.length - dueTodayTasks.length)} past due.
          </h4>
          <Button 
            onClick={() => setShowAddModal(true)}>
            Add task
          </Button>
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

const AddModal = (props) => {
  const { show, onHide, onSave } = props;
  return (
    <>
      <Modal show={show} onHide={onHide} style={styles.modalContainer}>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <AddTaskForm onSubmit={onSave} />
        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  appContainer: {
    padding: '40px',
    height: '100vh',
    backgroundColor: Colors.powderBlue,
  },

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

  welcomeContainer: {
    color: Colors.spaceCadet,
    borderBottom: '1px solid',
    borderColor: Colors.blueMunsell,
    marginBottom: '40px',
    paddingBottom: '30px',
    fontFamily: 'Open Sans',
    fontStyle: 'bold',
  },
  
  welcomeContent: {
    padding: '5rem',
    border: '1px solid',
    borderColor: Colors.blueMunsell,
    backgroundColor: Colors.mintCream,
    borderRadius: '.25rem',
  },

  taskTracker: {

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
