import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  completed: Boolean,
  startDate: String,
  endDate: String,
  personId: Number,
});

const Task = models.Task || model("Task", taskSchema);

export default Task;
