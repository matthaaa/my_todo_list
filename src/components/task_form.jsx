import React, { useState } from "react";

const TaskForm = (props) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createTask(name)
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        value={name}
        onChange={handleChange}
        name="text"
        autoComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add task
      </button>
    </form>
  );
}

export default TaskForm;