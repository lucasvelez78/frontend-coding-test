import connectDB from "../../../utils/connectDB";
import Task from "../../../models/taskModel";

export default async function editTask(req, res) {
  await connectDB();
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "DELETE":
      try {
        const task = await Task.findOneAndDelete({ id: id });
        return res.json({ task });
      } catch (error) {
        console.log(error);
      }
    case "PUT":
      try {
        const task = await Task.findOneAndUpdate({ id: id }, req.body);
        return res.json({ task });
      } catch (error) {
        console.log(error);
      }
    default:
      return res.status(500).json({ error: "Server failed" });
  }
}
