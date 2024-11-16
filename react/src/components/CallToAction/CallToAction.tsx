import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export const CallToAction: React.FC = () => {
  return (
    <Link className={styles.callToAction} to="/productos">
      Ver productos
    </Link>
  );
};
