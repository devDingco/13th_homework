"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Login from "@/commons/ui/login";
import { LoginMainImage } from "@/commons/ui/icon";
import SignUp from "@/commons/ui/signUp";

export default function LoginPage() {
  const [signUp, setSignUp] = useState(false);

  const presentSignUpPage = () => {
    setSignUp(true);
  };

  const dismissSignUp = () => {
    setSignUp(false);
  };

  const signUpCompletionHandler = () => {
    dismissSignUp();
  };

  return (
    <div className={styles.loginPage__container}>
      <div className={styles.form__container}>
        {!signUp && <Login handleSignUp={presentSignUpPage} />}
        {signUp && (
          <SignUp
            handleCancel={dismissSignUp}
            completionHandler={signUpCompletionHandler}
          />
        )}
      </div>
      <div className={styles.image__wrap}>
        <LoginMainImage />
      </div>
    </div>
  );
}
