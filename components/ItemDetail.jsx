import Link from "next/link";
import styles from "../styles/ItemDetail.module.css";

function ItemDetail(props) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={props.image} alt="photo" />
      </div>
      <div className={styles.profile}>
        <h3>{props.fullName}</h3>
        <p>{props.occupation}</p>
        <p>Age: {props.age}</p>
        <p>Nickname: {props.nickname}</p>
        <p>{props.gender}</p>
      </div>
      <li className={styles.editBtn}>
        <Link href={`/profile/${props.id}/edit`}>Edit Profile</Link>
      </li>
    </div>
  );
}

export default ItemDetail;
