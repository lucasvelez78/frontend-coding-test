import NewMemberForm from "../../components/NewMemberForm";
import connectDB from "../../utils/connectDB";
import Member from "../../models/crewModel";

export const getServerSideProps = async () => {
  await connectDB();
  const response = await Member.find();
  const crew = JSON.parse(JSON.stringify(response));

  return {
    props: { users: crew },
  };
};

function addCrewMember({ users }) {
  return <NewMemberForm users={users} />;
}

export default addCrewMember;
