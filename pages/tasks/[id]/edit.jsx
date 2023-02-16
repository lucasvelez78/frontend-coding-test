import TaskForm from "../../../components/TaskForm";
import connectDB from "../../../utils/connectDB";
import Member from "../../../models/crewModel";
import Task from "../../../models/taskModel";

export const getServerSideProps = async ({ params }) => {
  await connectDB();
  const membersResponse = await Member.find();
  const members = JSON.parse(JSON.stringify(membersResponse));

  const taskResponse = await Task.findOne({ id: params.id });
  const task = JSON.parse(JSON.stringify(taskResponse));

  return {
    props: { users: members, task: task },
  };
};

function EditTask({ task, users }) {
  return <TaskForm task={task} users={users} />;
}

export default EditTask;
