import Link from "next/link";
import styles from "../styles/ItemTasks.module.css";

function ItemTasks(props) {
  return (
    <div className={styles.taskBox}>
      <div>
        <div className={styles.titleBox}>
          <p className={styles.titleTask}>{props.title}</p>
          <li className={styles.editTask}>
            <Link href={`/tasks/${props.id}/edit`}>Edit Task</Link>
          </li>
        </div>

        <p>{props.description}</p>
        <p>Status: {props.status}</p>
        <button onClick={() => props.onChange(props.id)}>
          {props.btnState}
        </button>
      </div>
    </div>
  );
}

export default ItemTasks;
