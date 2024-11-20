import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface IHeaderProps {
  title: string;
  size: HeaderSize;
}

export enum HeaderSize {
  medium = "medium",
  large = "large",
}

export default function Header({ title, size }: IHeaderProps) {
  const getClassNames = () => {
    return classNames(styles.header, {
      [styles.header__size__medium]: size === HeaderSize.medium,
      [styles.header__size__large]: size === HeaderSize.large,
    });
  };
  return <h3 className={getClassNames()}>{title}</h3>;
}
