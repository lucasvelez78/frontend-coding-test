import { useRouter } from "next/router";
import ItemDetail from "../../components/ItemDetail";
import ItemTasks from "../../components/ItemTasks";
import styles from "../../styles/profileId.module.css";

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
    ],
    fallback: false,
  };
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3001/people");
  const userData = await response.json();

  const res = await fetch("http://localhost:3001/tasks");
  const userDataTasks = await res.json();

  return {
    props: { users: userData, tasks: userDataTasks },
  };
};

function ProfileUser({ users, tasks }) {
  const router = useRouter();

  const userInfo = users.filter((user) => user.id === Number(router.query.id));
  const userTasks = tasks.filter(
    (task) => task.personId === Number(router.query.id)
  );

  return (
    <div>
      <div>
        <ItemDetail
          image={userInfo[0].picture}
          fullName={userInfo[0].fullName}
          age={userInfo[0].age}
          occupation={userInfo[0].occupation}
          nickname={userInfo[0].nickname}
          gender={userInfo[0].gender}
        />
      </div>
      <h3 className={styles.taskTitle}>Tasks</h3>
      <div className={styles.taskContainer}>
        {userTasks.map((task) => (
          <ItemTasks
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.completed ? "Task Completed" : "Pending Task"}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileUser;
