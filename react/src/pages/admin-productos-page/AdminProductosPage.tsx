import * as ProductosService from "../../services/productos.services";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomImage } from "../../components/CustomImage/CustomImage";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { CustomButton } from "../../components/CustomButton/CustomButton";

interface Producto {
  _id: string;
  title: string;
  price: number;
  image: string;
  alt: string;
  type: "mate" | "termo";
  isPublic: boolean;
}

const AdminProductosPage: React.FC = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [generalError, setGeneralError] = useState("");

  const handlePublicarOcultar = (id: string, isPublic: boolean) => {
    ProductosService.publicarOcultarProducto(id, isPublic)
      .then(() => {
        setProductos((prevProductos) =>
          prevProductos.map((producto) =>
            producto._id === id
              ? { ...producto, isPublic: !producto.isPublic }
              : producto
          )
        );
      })
      .catch((error) => {
        setGeneralError(error.message);
      });
  };

  useEffect(() => {
    ProductosService.getAllProductos().then((data) => {
      setProductos(data);
    });
  }, []);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Panel de Administrador | Productos" />
      <div className={styles.buttonsContainer}>
        <Link className={`nav-link active`} to="/admin">
          <CustomButton
            text="Volver"
            className={`${styles.customButton} ${styles.greenButton}  btn`}
          />
        </Link>
        <Link className={`nav-link active`} to="/admin/producto/agregar">
          <CustomButton
            text="Agregar producto"
            className={`${styles.customButton} ${styles.blueButton} btn`}
          />
        </Link>
      </div>
      <table
        className={`table table-striped table-bordered ${styles.cartTable}`}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Producto</th>
            <th scope="col">Tipo</th>
            <th scope="col">Precio Unitario</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(
            ({ _id, title, image, alt, price, type, isPublic }) => (
              <tr key={_id}>
                <td>
                  <CustomImage
                    image={image}
                    alt={alt}
                    className={styles.image}
                  />
                </td>
                <td>{title}</td>
                <td>{type}</td>
                <td>${price.toFixed(2)}</td>
                <td>{isPublic ? "Publicado" : "Oculto"}</td>
                <td>
                  <Link to={`/admin/producto/${_id}/editar`}>
                    <CustomButton
                      text="Editar"
                      className={`${styles.customButton} ${styles.blueButton}  btn`}
                    />
                  </Link>
                  <Link to={`/admin/producto/${_id}/eliminar`}>
                    <CustomButton
                      text="Eliminar"
                      className={`${styles.customButton} ${styles.redButton}  btn`}
                    />
                  </Link>

                  <div className="d-flex">
                    <CustomButton
                      text="Publicar"
                      onClick={() => handlePublicarOcultar(_id, false)}
                      className={`${styles.customButton} ${styles.blueButton} btn`}
                      disabled={isPublic}
                    />
                    <CustomButton
                      text="Ocultar"
                      onClick={() => handlePublicarOcultar(_id, true)}
                      className={`${styles.customButton} ${styles.blueButton} btn`}
                      disabled={!isPublic}
                    />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <ErrorMessage error={generalError} />
    </CustomContainer>
  );
};

export default AdminProductosPage;
