import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(name, description, dueDate);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          value={name}
          onChange={e => setName(e.target.value)}
          name="text"
          autoComplete="off"
          />
        <label htmlFor="new-todo-input" className="label__lg">
          Description
        </label>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          value={description}
          onChange={e => setDescription(e.target.value)}
          name="text"
          autoComplete="off"
          />
        <label htmlFor="new-todo-input" className="label__lg">
          Due date
        </label>
        <DatePicker
          selected={dueDate}
          onChange={date => setDueDate(date)}
        />
      </div>
      <button type="submit" className="btn btn__primary btn__lg">
        Add task
      </button>
    </form>
  );
}

export default TaskForm;