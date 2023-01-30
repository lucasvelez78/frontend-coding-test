import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/editTask.module.css";

function TaskForm({ task, users }) {
  const router = useRouter();
  const [activeTask, setActiveTask] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    startDate: task.startDate,
    endDate: task.endDate,
    personId: task.personId,
  });

  function handleChange(evt) {
    const input = evt.target;
    const copyActiveTask = { ...activeTask };
    copyActiveTask[input.name] = input.value;
    setActiveTask(copyActiveTask);
  }

  function handleCheckBox(evt) {
    const input = evt.target;
    const copyActiveTask = { ...activeTask };
    copyActiveTask[input.name] = input.checked;
    setActiveTask(copyActiveTask);
  }

  function passPersonId(evt) {
    const input = evt.target;
    const value = Number(input.value);
    const copyActiveTask = { ...activeTask };
    copyActiveTask[input.name] = value;
    setActiveTask(copyActiveTask);
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/tasks/" + router.query.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(activeTask),
    })
      .then((res) => {
        alert("saved succesfully");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles.taskFormContainer}>
      <h1>Edit Task</h1>
      <form className={styles.taskForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">
            Title
            <input
              required
              defaultValue={task.title}
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
              defaultValue={task.description}
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
              defaultChecked={task.completed}
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
              defaultValue={task.startDate}
              className={styles.formInput}
              type="text"
              name="startDate"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">
            End Date - optional - YYYY-MM-DD
            <input
              defaultValue={task.endDate}
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
              <Link href={`/profile/${task.personId}`}>Go Back</Link>
            </li>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
