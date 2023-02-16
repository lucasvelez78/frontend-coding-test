import ProfileForm from "../../../components/ProfileForm";
import connectDB from "../../../utils/connectDB";
import Member from "../../../models/crewModel";

export const getServerSideProps = async ({ params }) => {
  await connectDB();
  const membersResponse = await Member.find();
  const members = JSON.parse(JSON.stringify(membersResponse));

  const memberResponse = await Member.findOne({ id: params.id });
  const member = JSON.parse(JSON.stringify(memberResponse));

  return {
    props: { users: members, user: member },
  };
};

function EditProfile({ user, users }) {
  return <ProfileForm user={user} users={users} />;
}

export default EditProfile;
