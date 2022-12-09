import TaskForm from "../../../components/TaskForm";

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
  return <TaskForm tasks={tasks} />;
}

export default EditTask;
