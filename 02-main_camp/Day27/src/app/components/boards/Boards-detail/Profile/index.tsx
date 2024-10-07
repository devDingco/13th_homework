import styles from "./styles.module.css";

const BoardDetailProfile = (props) => {
  const profileImg = "/assets/profile.png";

  return (
    <div className={styles.profileName}>
      <img className={styles.profileImg} src={profileImg} />
      {props.writer}
    </div>
  );
};

export default BoardDetailProfile;
