import Link from "next/link";
import styles from "../styles/ItemTasks.module.css";

function ItemTasks(props) {
  return (
    <div className={styles.taskBox}>
      <div>
        <div className={styles.titleBox}>
          <h3 className={styles.titleTask}>{props.title}</h3>
          <li className={styles.editTask}>
            <Link href={`/tasks/${props.id}/edit`}>Edit Task</Link>
          </li>
        </div>

        <p>{props.description}</p>
        <div className={styles.statusBox}>
          <p>Status: {props.status}</p>
          <button onClick={() => props.onChange(props.id)}>
            {props.btnState}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemTasks;
