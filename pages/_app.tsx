import type { AppProps } from "next/app";
import "../styles/globals.scss";
import styles from "../styles/common.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
