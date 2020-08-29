import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const TASK_DATA = [
  { 
    id: "todo-0", 
    name: "Do something!", 
    isCompleted: true, 
    description: 'Your first task is to do something fun!', 
    dueDate: new Date().toDateString(),
  },
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
