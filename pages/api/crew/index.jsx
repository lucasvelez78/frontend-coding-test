import connectDB from "../../../utils/connectDB";
import Member from "../../../models/crewModel";

export default async function addMember(req, res) {
  await connectDB();
  try {
    const member = await Member.create(req.body);
    res.json({ member });
  } catch (error) {
    console.log(error);
  }
}
