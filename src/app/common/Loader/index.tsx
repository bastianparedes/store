import styles from './styles.module.scss';

const Page = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
        <div className={styles.three}></div>
      </div>
    </div>
  );
};

export default Page;
