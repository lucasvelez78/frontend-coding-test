import styles from "../styles/ItemTasks.module.css";

function ItemTasks(props) {
  return (
    <div className={styles.taskBox}>
      <div>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>Status: {props.status}</p>
      </div>
    </div>
  );
}

export default ItemTasks;
