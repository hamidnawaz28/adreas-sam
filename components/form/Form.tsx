import React from "react";
import styles from "./form.module.scss";

interface FormInterface {
  children: JSX.Element | JSX.Element[];
  onSubmit: (e: React.ChangeEvent<EventTarget>) => void;
}

const Form = ({ children, onSubmit }: FormInterface) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

export default Form;
