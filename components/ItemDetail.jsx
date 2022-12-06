import styles from "../styles/ItemDetail.module.css";

function ItemDetail(props) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={props.image} alt="photo" />
      </div>
      <div className={styles.profile}>
        <h3>{props.fullName}</h3>
        <p>Age: {props.age}</p>
        <p>Occupation: {props.occupation}</p>
        <p>Nickname: {props.nickname}</p>
        <p>Gender: {props.gender}</p>
      </div>
      <button className={styles.editBtn}>Edit Profile</button>
    </div>
  );
}

export default ItemDetail;
