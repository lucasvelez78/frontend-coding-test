import { useState } from "react";
import Link from "next/link";
import styles from "../styles/editTask.module.css";
import Swal from "sweetalert2";

function NewTaskForm({ tasks, users }) {
  let idNumber;

  if (tasks.length < 1) {
    idNumber = 1;
  } else {
    idNumber = tasks[tasks.length - 1].id + 1;
  }

  const [newTask, setNewTask] = useState({
    id: idNumber,
    title: "",
    description: "",
    completed: false,
    startDate: "",
    endDate: "",
    personId: "",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/task", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then(
        Swal.fire({
          text: "Saved succesfully",
          background: "black",
          color: "#ECECEC",
          confirmButtonColor: "#ffc300",
          icon: "success",
          iconColor: "#ffc300",
        }).then(function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        })
      )
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={styles.taskFormContainer}>
      <h1>ADD NEW TASK</h1>
      <form className={styles.taskForm} onSubmit={onSubmit}>
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
                <option value={user.id} key={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.btnsForm}>
          <button type="submit" id={styles.submitBtn}>
            Submit
          </button>
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
