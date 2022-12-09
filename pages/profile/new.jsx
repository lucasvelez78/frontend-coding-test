import NewMemberForm from "../../components/NewMemberForm";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3001/people");
  const userData = await response.json();

  return {
    props: { users: userData },
  };
};

function addCrewMember({ users }) {
  return <NewMemberForm users={users} />;
}

export default addCrewMember;
