// Box.tsx
import React from "react";
import styles from './styles.module.css'

interface BoxProps {
  children: React.ReactNode; 
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return <div className={styles.boxContainer}>{children}</div>; 
};

export default Box;
