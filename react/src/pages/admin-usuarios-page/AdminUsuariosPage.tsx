import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link } from "react-router-dom";

const AdminUsuariosPage: React.FC = () => {
  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Panel de Administrador | Usuarios" />
      <Link className={`nav-link active`} to="/admin">
        Volver
      </Link>
    </CustomContainer>
  );
};

export default AdminUsuariosPage;
