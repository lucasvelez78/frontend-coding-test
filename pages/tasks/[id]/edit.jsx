import TaskForm from "../../../components/TaskForm";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3001/tasks");
  const data = await response.json();

  const paths = data.map((task) => ({
    params: {
      id: task.id.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`http://localhost:3001/tasks/${params.id}`);
  const tasksData = await response.json();

  const members = await fetch("http://localhost:3001/people");
  const usersData = await members.json();

  return {
    props: { task: tasksData, users: usersData },
  };
};

function EditTask({ task, users }) {
  return <TaskForm task={task} users={users} />;
}

export default EditTask;
