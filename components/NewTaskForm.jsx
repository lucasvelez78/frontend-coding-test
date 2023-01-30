import { useState } from "react";
import Link from "next/link";
import styles from "../styles/editTask.module.css";

function NewTaskForm({ tasks, users }) {
  const idNmuber = tasks.length + 1;

  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    description: "",
    completed: false,
    startDate: "",
    endDate: "",
    personId: null,
  });

  function handleChange(evt) {
    const input = evt.target;
    const copyNewTask = { ...newTask };
    copyNewTask[input.name] = input.value;
    setNewTask(copyNewTask);
  }

  function handleCheckBox(evt) {
    const input = evt.target;
    const copyNewTask = { ...newTask };
    copyNewTask[input.name] = input.checked;
    setNewTask(copyNewTask);
  }

  function passPersonId(evt) {
    const input = evt.target;
    const value = Number(input.value);
    const copyNewTask = { ...newTask };
    copyNewTask[input.name] = value;
    setNewTask(copyNewTask);
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/tasks/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        alert("Added succesfully");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div className={styles.taskFormContainer}>
      <h1>Add New Task</h1>
      <form className={styles.taskForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">
            id
            <input
              required
              defaultValue={idNmuber}
              className={styles.formInput}
              type="number"
              name="id"
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">
            Title
            <input
              required
              value={newTask.title}
              className={styles.formInput}
              type="text"
              name="title"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">
            Description
            <input
              required
              value={newTask.description}
              className={styles.formInput}
              type="text"
              name="description"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="completed">
            Completed
            <input
              defaultChecked={false}
              className={styles.formInputCheckBox}
              type="checkbox"
              name="completed"
              onChange={handleCheckBox}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">
            Start Date - YYYY-MM-DD
            <input
              required
              value={newTask.startDate}
              className={styles.formInput}
              type="text"
              name="startDate"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">
            End Date - YYYY-MM-DD - Optional
            <input
              value={newTask.gender}
              className={styles.formInput}
              type="text"
              name="endDate"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="personId">
            Person responsible for the task.
            <select
              className={styles.formInput}
              id={styles.taskResponsible}
              name="personId"
              onChange={passPersonId}
            >
              {users.map((user) => (
                <option value={user.id}>{user.fullName}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.btnsForm}>
          <button type="submit">Submit</button>
          <div className={styles.cancelBtnContainer}>
            <li className={styles.cancelBtn}>
              <Link href="/">Home</Link>
            </li>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTaskForm;
