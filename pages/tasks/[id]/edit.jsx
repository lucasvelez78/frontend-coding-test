import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/editProfile.module.css";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
      { params: { id: "10" } },
      { params: { id: "11" } },
      { params: { id: "12" } },
      { params: { id: "13" } },
      { params: { id: "14" } },
      { params: { id: "15" } },
      { params: { id: "16" } },
      { params: { id: "17" } },
      { params: { id: "18" } },
      { params: { id: "19" } },
      { params: { id: "20" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3001/tasks");
  const tasksData = await response.json();

  return {
    props: { tasks: tasksData },
  };
};

function EditTask({ tasks }) {
  const router = useRouter();
  const currentTask = tasks.filter((task) => task.id == router.query.id);
  const [activeTask, setActiveTask] = useState({
    id: currentTask[0].id,
    title: currentTask[0].title,
    description: currentTask[0].description,
    completed: currentTask[0].completed,
    startDate: currentTask[0].startDate,
    endDate: currentTask[0].endDate,
    personId: currentTask[0].personId,
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
    <div className={styles.profileFormContainer}>
      <h1>Edit Task</h1>
      <form className={styles.profileForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">
            Title
            <input
              required
              defaultValue={currentTask[0].title}
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
              defaultValue={currentTask[0].description}
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
              defaultChecked={currentTask[0].completed}
              className={styles.formInput}
              type="checkbox"
              name="completed"
              onChange={handleCheckBox}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">
            Start Date
            <input
              required
              defaultValue={currentTask[0].startDate}
              className={styles.formInput}
              type="text"
              name="startDate"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">
            End Date - optional -
            <input
              defaultValue={currentTask[0].endDate}
              className={styles.formInput}
              type="text"
              name="endDate"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="personId">
            personId
            <input
              required
              defaultValue={currentTask[0].personId}
              className={styles.formInput}
              type="number"
              name="personId"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button className={styles.btnForm} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditTask;
