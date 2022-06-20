import { AuditLog, Header, Tableinterface } from "../../ts/common";
import { SortIcon } from "../sort-icon";
import styles from "./table.module.scss";
const Table = ({
  heads,
  rows,
  total,
  currentPage,
  setCurrentPage,
  setTableHeaders,
}: Tableinterface) => {
  const totalPages = Math.ceil(total / 10);

  const setTableHeadersHandle = (el: Header, index: number) => {
    let head: Header = {
      ...el,
    };
    if (el.sort == null) {
      head = { ...el, sort: "ascending" };
    } else if (el.sort == "ascending") {
      head = { ...el, sort: "decending" };
    } else {
      head = { ...el, sort: "ascending" };
    }
    const newData = heads.map((header, id) => {
      if (index == id) return head;
      else return { ...header, sort: null };
    });
    setTableHeaders(newData);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tr className={styles.table__row}>
          {heads.map((el, id) => (
            <th
              key={id}
              className={styles.table__header__data}
              onClick={() => setTableHeadersHandle(el, id)}
            >
              <div>
                <div>{el.label}</div>
                <SortIcon value={el.sort} />
              </div>
            </th>
          ))}
        </tr>
        {rows?.map((row, id) => (
          <tr key={id} className={styles.table__row}>
            {heads.map((head, key) => {
              return (
                <td key={key} className={styles.table__body__data}>
                  {row[head.key as keyof AuditLog]}
                </td>
              );
            })}
          </tr>
        ))}
      </table>

      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <div
              onClick={() => setCurrentPage(index)}
              key={index}
              className={
                currentPage == index ? styles.pagination__selected : ""
              }
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
