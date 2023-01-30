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

  return {
    props: { user: userData },
  };
};

function EditProfile({ user }) {
  return <ProfileForm user={user} />;
}

export default EditProfile;
