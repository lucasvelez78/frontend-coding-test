import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ItemList.module.css";

function ItemList(props) {
  return (
    <Link href={`/profile/${props.id}`}>
      <div className={styles.container}>
        <Image
          className={styles.photo}
          src={props.picture}
          alt="photo"
          width={140}
          height={140}
        />
        <div className={styles.content}>
          <h3>{props.fullName}</h3>
          <p>Age: {props.age}</p>
          <p>Occupation: {props.occupation}</p>
        </div>
      </div>
    </Link>
  );
}

export default ItemList;
