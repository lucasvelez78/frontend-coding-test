import ProfileForm from "../../../components/ProfileForm";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3001/people");
  const data = await response.json();

  const paths = data.map((crewMember) => ({
    params: {
      id: crewMember.id.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`http://localhost:3001/people/${params.id}`);
  const userData = await response.json();

  const resp = await fetch(`http://localhost:3001/people`);
  const members = await resp.json();

  return {
    props: { user: userData, users: members },
  };
};

function EditProfile({ user, users }) {
  return <ProfileForm user={user} users={users} />;
}

export default EditProfile;
