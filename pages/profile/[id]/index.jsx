import { useRouter } from "next/router";
import Link from "next/link";
import ItemDetail from "../../../components/ItemDetail";
import ItemTasks from "../../../components/ItemTasks";
import styles from "../../../styles/profileId.module.css";
import { markTaskStatusCompletedIfOverdue } from "../../../helpers/markTaskStatusCompletedIfOverdue";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3001/people");
  const data = await response.json();

  const paths = data.map((crewMember) => ({
    params: {
      id: crewMember.id.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`http://localhost:3001/people/${params.id}`);
  const userData = await response.json();

  const res = await fetch("http://localhost:3001/tasks");
  const userDataTasks = await res.json();

  return {
    props: { user: userData, tasks: userDataTasks },
  };
};

function ProfileUser({ user, tasks }) {
  const router = useRouter();

  const userTasks = tasks.filter(
    (task) => task.personId === Number(router.query.id)
  );

  markTaskStatusCompletedIfOverdue(userTasks);

  function handleTaskChange(id) {
    const changedTask = userTasks.filter((task) => task.id === id);
    const body = {
      id: changedTask[0].id,
      title: changedTask[0].title,
      description: changedTask[0].description,
      completed: !changedTask[0].completed,
      startDate: changedTask[0].startDate,
      endDate: changedTask[0].endDate,
      personId: changedTask[0].personId,
    };

    fetch("http://localhost:3001/tasks/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (changedTask[0].completed) {
          alert(
            "WARNING: If you are marking the status as not completed, but the endDate of this task is overdue, the status will be automatically mark as completed again."
          );
        }
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles.container}>
      <div className={styles.goBackBtnContainer}>
        <li className={styles.goBackBtn}>
          <Link href="/">Home</Link>
        </li>
      </div>
      <div className={styles.upperContainer}>
        <ItemDetail
          id={user.id}
          image={user.picture}
          fullName={user.fullName}
          age={user.age}
          occupation={user.occupation}
          nickname={user.nickname}
          gender={user.gender}
        />
      </div>
      <div className={styles.lowerContainer}>
        <h3 className={styles.taskTitle}>Tasks</h3>
        <div className={styles.taskContainer}>
          {userTasks.map((task) => (
            <ItemTasks
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.completed ? "Task Completed" : "Pending Task"}
              btnState={
                task.completed ? "Mark as not Completed" : "Mark as completed"
              }
              onChange={handleTaskChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
