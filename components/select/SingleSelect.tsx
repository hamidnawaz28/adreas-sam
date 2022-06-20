import React from "react";
import commonStyles from "../../styles/common.module.scss";

interface SingleSelectInterface {
  name: string;
  onChange: (e: React.FormEvent<EventTarget>) => void;
  options: string[] | number[];
  label: string;
}

const SingleSelect = ({
  name,
  onChange,
  options,
  label,
}: SingleSelectInterface) => {
  return (
    <div className="select">
      <div className={commonStyles.input__label}>{label}</div>
      <select
        name={name}
        onChange={onChange}
        className={commonStyles.input__field}
      >
        <option value={""} className="select__field__option">
          {""}
        </option>
        {options.map((option, key: number) => (
          <option value={option} key={key} className="select__field__option">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleSelect;
