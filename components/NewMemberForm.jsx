import { useState } from "react";
import Link from "next/link";
import styles from "../styles/editProfile.module.css";

function NewMemberForm({ users }) {
  const idNmuber = users.length + 1;
  console.log(users.length);
  const [newCrewMember, setNewCrewMember] = useState({});

  function handleChange(evt) {
    const input = evt.target;
    const copyNewCrewMember = { ...newCrewMember };
    copyNewCrewMember[input.name] = input.value;
    setNewCrewMember(copyNewCrewMember);
  }

  function passMemberPic(evt) {
    const input = evt.target;
    const copyNewCrewMember = { ...newCrewMember };
    copyNewCrewMember[input.name] = input.value;
    setNewCrewMember(copyNewCrewMember);
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/people/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCrewMember),
    })
      .then((res) => {
        alert("saved succesfully");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div className={styles.profileFormContainer}>
      <h1>ADD NEW MEMBER</h1>
      <form className={styles.profileForm} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">
            id
            <input
              required
              defaultValue={idNmuber}
              className={styles.formInput}
              type="number"
              name="id"
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">
            Name
            <input
              required
              value={newCrewMember.fullName}
              className={styles.formInput}
              type="text"
              name="fullName"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">
            Age
            <input
              required
              value={newCrewMember.age}
              className={styles.formInput}
              type="number"
              name="age"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="occupation">
            Occupation
            <input
              required
              value={newCrewMember.occupation}
              className={styles.formInput}
              type="text"
              name="occupation"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nickname">
            Nickname
            <input
              required
              value={newCrewMember.nickname}
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
              value={newCrewMember.gender}
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
                <option value={user.picture}>{user.picture}</option>
              ))}
            </select>
          </label>
        </div>
      </form>
      <div className={styles.btnsForm}>
        <button type="submit">Submit</button>
        <div className={styles.cancelBtnContainer}>
          <li className={styles.cancelBtn}>
            <Link href="/">Home</Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default NewMemberForm;
