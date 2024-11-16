import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";

const SuccessPage: React.FC = () => {
  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="¡Compra realizada con exito!" />
      <Link to="/">
        <CustomButton text="Volver al inicio" />
      </Link>
    </CustomContainer>
  );
};

export default SuccessPage;
