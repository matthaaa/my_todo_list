import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const TASK_DATA = [
  { id: "todo-0", name: "Eat", isCompleted: true, description: '', dueDate: new Date().toDateString()},
  { id: "todo-1", name: "Sleep", isCompleted: false, description: '', dueDate: new Date().toDateString()},
  { id: "todo-2", name: "Repeat", isCompleted: false, description: '', dueDate: new Date().toDateString()},
];

ReactDOM.render(
  <React.StrictMode>
    <App taskData={TASK_DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
