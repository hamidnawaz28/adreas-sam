import styles from "./breadcrumbs.module.scss";

interface BreadcrumbsInterface {
  data: string[];
}

const Breadcrumbs = ({ data }: BreadcrumbsInterface) => {
  return (
    <div className={styles.breadcrumbs}>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <div>{item}</div>
            <div>{data.length != index + 1 ? ">" : ""}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
