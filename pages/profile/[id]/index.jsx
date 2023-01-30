import { useRouter } from "next/router";
import Link from "next/link";
import ItemDetail from "../../../components/ItemDetail";
import ItemTasks from "../../../components/ItemTasks";
import styles from "../../../styles/profileId.module.css";

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

  // -----------------------        status handler due to endDate - START -----------------------

  const d = new Date();
  const currentDay = d.getDate();
  const currentMonth = d.getMonth() + 1;
  const currentYear = d.getFullYear();

  for (let i = 0; i < userTasks.length; i++) {
    if (
      userTasks[i].completed === false &&
      userTasks[i].endDate &&
      currentYear > Number(userTasks[i].endDate.slice(0, 4))
    ) {
      const body = {
        id: userTasks[i].id,
        title: userTasks[i].title,
        description: userTasks[i].description,
        completed: true,
        startDate: userTasks[i].startDate,
        endDate: userTasks[i].endDate,
        personId: userTasks[i].personId,
      };
      fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => {
          window.location.reload();
          console.log("Task Modified");
        })
        .catch((err) => console.log(err.message));
    } else {
      if (
        userTasks[i].completed === false &&
        userTasks[i].endDate &&
        currentYear === Number(userTasks[i].endDate.slice(0, 4)) &&
        currentMonth > Number(userTasks[i].endDate.slice(5, 7))
      ) {
        const body = {
          id: userTasks[i].id,
          title: userTasks[i].title,
          description: userTasks[i].description,
          completed: true,
          startDate: userTasks[i].startDate,
          endDate: userTasks[i].endDate,
          personId: userTasks[i].personId,
        };
        fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => {
            window.location.reload();
            console.log("Task Modified");
          })
          .catch((err) => console.log(err.message));
      } else {
        if (
          userTasks[i].completed === false &&
          userTasks[i].endDate &&
          currentYear === Number(userTasks[i].endDate.slice(0, 4)) &&
          currentMonth === Number(userTasks[i].endDate.slice(5, 7)) &&
          currentDay > Number(userTasks[i].endDate.slice(8, 10))
        ) {
          const body = {
            id: userTasks[i].id,
            title: userTasks[i].title,
            description: userTasks[i].description,
            completed: true,
            startDate: userTasks[i].startDate,
            endDate: userTasks[i].endDate,
            personId: userTasks[i].personId,
          };
          fetch("http://localhost:3001/tasks/" + userTasks[i].id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
          })
            .then((res) => {
              window.location.reload();
              console.log("Task Modified");
            })
            .catch((err) => console.log(err.message));
        }
      }
    }
  }

  // -----------------------        status handler due to endDate - END -----------------------

  function handleChange(id) {
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
        alert(
          "WARNING: If you are marking the status as not completed, but the endDate of this task is overdue, the status will be automatically mark as completed again."
        );
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
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
