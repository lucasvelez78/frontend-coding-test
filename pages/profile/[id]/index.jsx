import { useRouter } from "next/router";
import Link from "next/link";
import ItemDetail from "../../../components/ItemDetail";
import ItemTasks from "../../../components/ItemTasks";
import styles from "../../../styles/profileId.module.css";
import { markTaskStatusCompletedIfOverdue } from "../../../helpers/markTaskStatusCompletedIfOverdue";
import Member from "../../../models/crewModel";
import Task from "../../../models/taskModel";
import connectDB from "../../../utils/connectDB";
import Swal from "sweetalert2";

export const getServerSideProps = async ({ params }) => {
  await connectDB();
  const memberResponse = await Member.findOne({ id: params.id });
  const member = JSON.parse(JSON.stringify(memberResponse));
  const taskResponse = await Task.find();
  const tasks = JSON.parse(JSON.stringify(taskResponse));

  return {
    props: { user: member, tasks: tasks },
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

    fetch("/api/task/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (changedTask[0].completed) {
          Swal.fire({
            text: "If you are marking the status as NOT COMPLETED, but the endDate of this task is overdue, the status will be automatically mark as COMPLETED again.",
            background: "black",
            color: "#ECECEC",
            confirmButtonColor: "#ffc300",
            icon: "info",
            iconColor: "#ffc300",
          }).then(function (isConfirm) {
            if (isConfirm) {
              location.reload();
            }
          });
        } else {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles.container}>
      <div className={styles.goBackBtnContainer}>
        <Link href="/">Home</Link>
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
