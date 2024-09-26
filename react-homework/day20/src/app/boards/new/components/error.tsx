"use client";

import React from "react";
import styles from "../styles.module.css";

interface IErrorMessage {
  errorMessage?: string;
}

const ErrorMsg: React.FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    errorMessage && <span className={styles.error_msg}>{errorMessage}</span>
  );
};

export default ErrorMsg;
