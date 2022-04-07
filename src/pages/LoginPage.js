import styles from "./LoginPage.module.css";

import blob from "../assets/images/loginPage/blob.png";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.loginText}>Login</h1>

      <form onSubmit={(event) => event.preventDefault()} className={styles.form}>
        <div className={styles.form__feild}>
          <label htmlFor="login--username" className={styles.form__feildLabel}>
            Username:
          </label>
          <input
            type="text"
            placeholder="john_doe"
            id="login--username"
						spellcheck="false"
            className={`${styles.formFeildValue} + ${styles.formFeildValue_username}`}
          />
        </div>

        <div className={styles.form__feild}>
          <label htmlFor="login--password" className={styles.form__feildLabel}>
            Password:
          </label>
          <input
            type="password"
            placeholder="••••••••••"
            id="login--password"
            className={`${styles.form__feildValue} ${styles.form__feildValuePassword}`}
          />
        </div>

        <button className={styles.loginBtn}>Login</button>

				<img src={blob} className={styles.blob} alt="" />
      </form>
    </div>
  );
}
