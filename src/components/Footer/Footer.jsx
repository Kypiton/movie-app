import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Пишите мне в телеграмм: <a href='https://t.me/danglushchenko'>@danglushchenko</a>
      </p>
    </footer>
  );
}
