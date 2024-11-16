// import fotoPerfil from "../imagenes/fotoPerfil.png";
import * as ProductosService from "../../services/productos.services";

import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { CallToAction } from "../../components/CallToAction/CallToAction";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    ProductosService.getPublicProductosMasVendidos().then((data) => {
      setProductos(data);
    });
  }, []);
  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.backgroundBlur}></div>
        <div className={styles.content}>
          <h1 className={styles.text}>
            Para un mate de calidad, pensá en Re-mate.ar
          </h1>
          <CallToAction />
        </div>
      </div>
      <CustomContainer className={styles.productsDisplay}>
        <H2Custom alignCenter text="Más Vendidos" />
        <Container>
          <Row>
            {productos.map(({ _id, title, image, alt }, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <ProductCard id={_id} title={title} image={image} alt={alt} />
              </Col>
            ))}
          </Row>
        </Container>
      </CustomContainer>
    </>
  );
};

export default HomePage;
