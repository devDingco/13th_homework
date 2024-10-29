// LoginPage.js
import React from "react";
import styles from "./style.module.css";

const LoginPage = () => {
  return (
    <div className={styles.wallpaper}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Login</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className={styles.input}
            />
            <a href="#" className={styles.forgotPassword}>
              회원가입
            </a>
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
