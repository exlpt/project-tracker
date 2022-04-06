import styles from "./LoginPage.module.css";

import blob from "../assets/images/loginPage/blob.png";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.loginText}>Login</h1>

      <form onSubmit={(event) => event.preventDefault()} className={styles.form}>
        <div className={styles.formFeild}>
          <label htmlFor="login--username" className={styles.formFeildLabel}>
            Username:
          </label>
          <input
            type="text"
            placeholder="john_doe"
            id="login--username"
            className={`${styles.formFeildValue} + ${styles.formFeildValue_username}`}
          />
        </div>

        <div className={styles.formFeild}>
          <label htmlFor="login--password" className={styles.formFeildLabel}>
            Password:
          </label>
          <input
            type="password"
            placeholder="••••••••••"
            id="login--password"
            className={`${styles.formFeildValue} ${styles.formFeildValue_password}`}
          />
        </div>

        <button className={styles.loginBtn}>Login</button>

				<img src={blob} className={styles.blob} />
      </form>
    </div>
  );
}
