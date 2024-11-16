import * as UsuarioServices from "../../services/usuario.services";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { CustomButton } from "../../components/CustomButton/CustomButton";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    UsuarioServices.logout().then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Cerrar Sesion" />
      <p>¿Queres cerrar la sesion?</p>
      <form onSubmit={onSubmit}>
        <CustomButton className="btn boton mt-5" text="Cerrar Sesion" />
      </form>
    </CustomContainer>
  );
};

export default LogoutPage;
