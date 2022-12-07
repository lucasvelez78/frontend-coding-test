import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/editProfile.module.css";

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
  const router = useRouter();
  const currentUser = user.filter((item) => item.id == router.query.id);
  const [activeUser, setActiveUser] = useState({
    fullName: currentUser[0].fullName,
    occupation: currentUser[0].occupation,
    age: currentUser[0].age,
    nickname: currentUser[0].nickname,
    gender: currentUser[0].gender,
    picture: currentUser[0].picture,
  });

  function handleChange(evt) {
    const input = evt.target;
    const copyActiveUser = { ...activeUser };
    copyActiveUser[input.name] = input.value;
    setActiveUser(copyActiveUser);
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/people/" + router.query.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(activeUser),
    })
      .then((res) => {
        alert("saved succesfully");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles.profileFormContainer}>
      <h1>Edit Profile</h1>
      <form className={styles.profileForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">
            Name
            <input
              required
              defaultValue={currentUser[0].fullName}
              className={styles.formInput}
              type="text"
              name="name"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="occupation">
            Occupation
            <input
              required
              defaultValue={currentUser[0].occupation}
              className={styles.formInput}
              type="text"
              name="occupation"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">
            Age
            <input
              required
              defaultValue={currentUser[0].age}
              className={styles.formInput}
              type="number"
              name="age"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Nickname">
            Nickname
            <input
              required
              defaultValue={currentUser[0].nickname}
              className={styles.formInput}
              type="text"
              name="Nickname"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">
            Gender
            <input
              required
              defaultValue={currentUser[0].gender}
              className={styles.formInput}
              type="text"
              name="gender"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="picture">
            Picture - write the URL -
            <input
              required
              defaultValue={currentUser[0].picture}
              className={styles.formInput}
              type="text"
              name="picture"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button className={styles.btnForm} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
