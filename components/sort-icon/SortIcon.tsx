import React from "react";
import styles from "./sort-icon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
interface SortIconInterface {
  value: string | null;
}
const SortIcon = ({ value }: SortIconInterface) => {
  return (
    <div
      className={[
        styles.sort__icon,
        value != null ? styles.sort__icon_selected : "",
      ].join(" ")}
    >
      <FontAwesomeIcon
        icon={value == "decending" ? faArrowUp : faArrowDown}
        size="xs"
      />
    </div>
  );
};

export default SortIcon;
