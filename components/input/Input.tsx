import React from "react";
import styles from "./input.module.scss";
import commonStyles from "../../styles/common.module.scss";

interface InputInterface {
  onChange: (e: React.FormEvent<EventTarget>) => void;
  type: string;
  name: string;
  label: string;
  placeholder: string;
}
const Input = ({
  type = "text",
  name,
  onChange,
  label,
  placeholder,
}: InputInterface) => {
  return (
    <div className={styles.input}>
      <div className={commonStyles.input__label}>{label}</div>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={commonStyles.input__field}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
