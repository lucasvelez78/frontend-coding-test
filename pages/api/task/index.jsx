import connectDB from "../../../utils/connectDB";
import Task from "../../../models/taskModel";

export default async function addTask(req, res) {
  await connectDB();
  try {
    const task = await Task.create(req.body);
    res.json({ task });
  } catch (error) {
    console.log(error);
  }
}
