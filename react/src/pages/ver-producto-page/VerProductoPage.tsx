import * as ProductosService from "../../services/productos.services";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CustomImage } from "../../components/CustomImage/CustomImage";
import { CartItem } from "../carrito-page/CarritoPage";
import { CustomButton } from "../../components/CustomButton/CustomButton";

export interface Producto {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  type: "mate" | "termo";
}

const VerProductoPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>();

  const addToCart = (producto: Producto) => {
    const localStorageCart = localStorage.getItem("cart");

    if (localStorageCart) {
      const cart = JSON.parse(localStorageCart);

      let existingProduct = cart.find(
        (item: CartItem) => item._id === producto._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...producto, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/carrito");
    }
  };

  useEffect(() => {
    ProductosService.getProductoById({ id }).then((data) => {
      setProducto(data);
    });
  }, []);

  return (
    <>
      <CustomContainer className={styles.productsDisplay}>
        {producto ? (
          <Row>
            <Col>
              <CustomImage
                image={producto?.image}
                alt={producto?.imageAlt}
                className={styles.image}
              />
            </Col>
            <Col>
              <H2Custom text={producto?.title} className={styles.title} />
              <p className={styles.price}>${producto?.price}</p>
              <p className={styles.text}>{producto?.description}</p>
              <CustomButton
                className="btn boton mt-5"
                text="Agregar al carrito"
                onClick={() => addToCart(producto)}
              />
            </Col>
          </Row>
        ) : (
          <p>Cargando...</p>
        )}
      </CustomContainer>
    </>
  );
};

export default VerProductoPage;
