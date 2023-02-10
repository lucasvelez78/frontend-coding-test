import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/editProfile.module.css";

function ProfileForm({ user, users }) {
  const router = useRouter();
  const [activeUser, setActiveUser] = useState({
    fullName: user.fullName,
    occupation: user.occupation,
    age: user.age,
    nickname: user.nickname,
    gender: user.gender,
    picture: user.picture,
  });

  function handleChange(evt) {
    const input = evt.target;
    const copyActiveUser = { ...activeUser };
    copyActiveUser[input.name] = input.value;
    setActiveUser(copyActiveUser);
  }

  function passMemberPic(evt) {
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
      <h1>EDIT PROFILE</h1>
      <form className={styles.profileForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">
            Name
            <input
              required
              defaultValue={user.fullName}
              className={styles.formInput}
              type="text"
              name="fullName"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="occupation">
            Occupation
            <input
              required
              defaultValue={user.occupation}
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
              defaultValue={user.age}
              className={styles.formInput}
              type="number"
              name="age"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nickname">
            Nickname
            <input
              required
              defaultValue={user.nickname}
              className={styles.formInput}
              type="text"
              name="nickname"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">
            Gender
            <input
              required
              defaultValue={user.gender}
              className={styles.formInput}
              type="text"
              name="gender"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="picture">
            Picture
            <select
              className={styles.formInput}
              id={styles.memberPic}
              name="picture"
              onChange={passMemberPic}
            >
              {users.map((user) => (
                <option value={user.picture} key={user.id}>
                  {user.picture}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.btnsForm}>
          <button type="submit">Submit</button>
          <div className={styles.cancelBtnContainer}>
            <li className={styles.cancelBtn}>
              <Link href={`/profile/${user.id}`}>Go Back</Link>
            </li>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
