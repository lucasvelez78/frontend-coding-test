import NewTaskForm from "../../components/NewTaskForm";
import connectDB from "../../utils/connectDB";
import Member from "../../models/crewModel";
import Task from "../../models/taskModel";

export const getServerSideProps = async () => {
  await connectDB();
  const membersResponse = await Member.find();
  const members = JSON.parse(JSON.stringify(membersResponse));

  const taskResponse = await Task.find();
  const tasks = JSON.parse(JSON.stringify(taskResponse));

  return {
    props: { users: members, tasks: tasks },
  };
};

function addNewTask({ tasks, users }) {
  return <NewTaskForm tasks={tasks} users={users} />;
}

export default addNewTask;
