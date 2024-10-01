"use client";

import React from "react";
import { IErrorMessage } from "../../types/components";
import styles from "../styles.module.css";

const ErrorMsg: React.FC<IErrorMessage> = ({ errorMessage }) => {
  return <span className={styles.error_msg}>{errorMessage}</span>;
};

export default ErrorMsg;
