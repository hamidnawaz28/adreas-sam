import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type ButtonTypes = "submit" | "submit" | "reset";

interface ButtonInterface {
  label: string;
  type: ButtonTypes;
}

const Button = ({ type, label }: ButtonInterface) => {
  return (
    <button type={type} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
