import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/editTask.module.css";
import Swal from "sweetalert2";

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

  const taskResponsibleObject = users.filter(
    (user) => user.id === task.personId
  );
  const taskResponsible = taskResponsibleObject[0].fullName;
  console.log(taskResponsibleObject);

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
    fetch("/api/task/" + router.query.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(activeTask),
    })
      .then((res) => {
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
        });
      })
      .catch((err) => console.log(err.message));
  }

  function deleteTask() {
    fetch("/api/task/" + router.query.id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        Swal.fire({
          text: "Deleted succesfully",
          background: "black",
          color: "#ECECEC",
          confirmButtonColor: "#ffc300",
          icon: "success",
          iconColor: "#ffc300",
        }).then(function (isConfirm) {
          if (isConfirm) {
            router.push("/profile/" + router.query.id);
          }
        });
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles.taskFormContainer}>
      <h1>EDIT TASK</h1>
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
            {`Responsible for this task: ${taskResponsible}`}
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
          <button type="submit">Submit</button>
          <div className={`${styles.goBackBtnContainer}`}>
            <li className={`${styles.goBackBtn}`}>
              <Link href={`/profile/${task.personId}`}>Go Back</Link>
            </li>
          </div>
          <button type="button" onClick={deleteTask} id={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
