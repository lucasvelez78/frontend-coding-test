import connectDB from "../../../utils/connectDB";
import Member from "../../../models/crewModel";

export default async function editMember(req, res) {
  await connectDB();
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "DELETE":
      try {
        const member = await Member.findOneAndDelete({ id: id });
        return res.json({ member });
      } catch (error) {
        console.log(error);
      }
    case "PUT":
      try {
        const member = await Member.findOneAndUpdate({ id: id }, req.body);
        return res.json({ member });
      } catch (error) {
        console.log(error);
      }
    default:
      return res.status(500).json({ error: "Server failed" });
  }
}
