import { Schema, model, models } from "mongoose";

const crewSchema = new Schema({
  id: Number,
  fullName: String,
  age: Number,
  occupation: String,
  nickname: String,
  gender: String,
  picture: String,
});

const Member = models.Member || model("Member", crewSchema);

export default Member;
