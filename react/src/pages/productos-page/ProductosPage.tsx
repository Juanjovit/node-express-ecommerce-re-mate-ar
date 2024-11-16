import * as ProductosService from "../../services/productos.services";

import styles from "./index.module.scss";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";

const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    ProductosService.getAllPublicProductos().then((data) => {
      setProductos(data);
    });
  }, []);

  return (
    <>
      <CustomContainer className={styles.productsDisplay}>
        <H2Custom alignCenter text="Productos" />
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

export default ProductosPage;
