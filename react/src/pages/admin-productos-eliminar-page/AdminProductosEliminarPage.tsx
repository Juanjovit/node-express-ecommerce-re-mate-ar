import * as ProductoServices from "../../services/productos.services.js";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Producto } from "../ver-producto-page/VerProductoPage.js";
import { CustomImage } from "../../components/CustomImage/CustomImage.js";
import { CustomButton } from "../../components/CustomButton/CustomButton.js";

const AdminProductosEliminarPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (producto) {
      ProductoServices.eliminarProducto(producto._id).then(() => {
        navigate("/admin/productos");
      });
    }
  };

  useEffect(() => {
    ProductoServices.getProductoById({ id }).then((data) => {
      setProducto(data);
    });
  }, []);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Panel de Administrador | Eliminar producto" />
      <div className={styles.buttonsContainer}>
        <Link className={`nav-link active`} to="/admin/productos">
          <CustomButton
            text="Volver"
            className={`${styles.customButton} ${styles.greenButton}  btn`}
          />
        </Link>
      </div>
      <CustomImage
        image={producto?.image}
        alt={producto?.imageAlt}
        className={styles.image}
      />
      <ul className="p-0">
        <li className={styles.listItem}>{producto?.title}</li>
        <li className={styles.listItem}>${producto?.price}</li>
        <li className={styles.listItem}>{producto?.description}</li>
      </ul>

      <p>Estas seguro de que queres eliminar este producto?</p>
      <form onSubmit={handleSubmit}>
        <div>
          <CustomButton
            text="Eliminar producto"
            className={`${styles.customButton} ${styles.redButton} btn`}
          />
        </div>
      </form>
    </CustomContainer>
  );
};

export default AdminProductosEliminarPage;
