import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";

const AdminPage: React.FC = () => {
  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Panel de Administrador" />
      <ul className={styles.list}>
        <li className={`nav-item`}>
          <Link className={`nav-link active`} to="/admin/productos">
            <CustomButton
              text="Productos"
              className={`${styles.customButton} ${styles.greenButton}  btn`}
            />
          </Link>
        </li>
      </ul>
    </CustomContainer>
  );
};

export default AdminPage;
