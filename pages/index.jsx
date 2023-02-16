import { useState } from "react";
import Link from "next/link";
import ItemList from "../components/ItemList";
import styles from "../styles/index.module.css";
import connectDB from "../utils/connectDB";
import Member from "../models/crewModel";

export const getServerSideProps = async () => {
  await connectDB();
  const response = await Member.find();
  const crew = JSON.parse(JSON.stringify(response));
  crew.sort((a, b) => a.age - b.age);

  return {
    props: { users: crew },
  };
};

function HomePage({ users }) {
  const [sorted, setSorted] = useState("ascending");

  const sortList = () => {
    if (sorted === "ascending") {
      users.sort((a, b) => b.age - a.age);
      setSorted("descending");
    } else {
      users.sort((a, b) => a.age - b.age);
      setSorted("ascending");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        <h1>THE LEGO CREW</h1>
      </div>
      <div className={styles.buttons}>
        <li className={styles.addBtn}>
          <Link href="/profile/new">Add Member</Link>
        </li>
        <li className={styles.sortBtn}>
          <button onClick={() => sortList()}>Sort By Age</button>
        </li>
        <li className={styles.addTaskBtn}>
          <Link href="/tasks/new">Add Task</Link>
        </li>
      </div>
      <div className={styles.list}>
        {users.map((user) => (
          <ItemList
            key={user.id}
            id={user.id}
            picture={user.picture}
            fullName={user.fullName}
            age={user.age}
            occupation={user.occupation}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
