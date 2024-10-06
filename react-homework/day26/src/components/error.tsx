"use client";

import React from "react";

import styles from "./styles.module.css";
import { IErrorMessageProps } from "./types";

const ErrorMsg: React.FC<IErrorMessageProps> = ({ errorMessage }) => {
  return <span className={styles.error_msg}>{errorMessage}</span>;
};

export default ErrorMsg;
