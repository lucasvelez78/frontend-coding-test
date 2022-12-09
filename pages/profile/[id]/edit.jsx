import ProfileForm from "../../../components/ProfileForm";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
      { params: { id: "10" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3001/people");
  const userData = await response.json();

  return {
    props: { user: userData },
  };
};

function EditProfile({ user }) {
  return <ProfileForm user={user} />;
}

export default EditProfile;
