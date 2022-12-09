import NewTaskForm from "../../components/NewTaskForm";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3001/tasks");
  const tasksData = await response.json();

  const res = await fetch("http://localhost:3001/people");
  const usersData = await res.json();

  return {
    props: { tasks: tasksData, users: usersData },
  };
};

function addNewTask({ tasks, users }) {
  return <NewTaskForm tasks={tasks} users={users} />;
}

export default addNewTask;
