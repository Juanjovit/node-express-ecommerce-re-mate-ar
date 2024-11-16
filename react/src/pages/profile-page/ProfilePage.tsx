import * as ComprasService from "../../services/compras.services";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";
import { CartItem } from "../carrito-page/CarritoPage";
import { CompraCard } from "../../components/CompraCard/CompraCard";
import { H3Custom } from "../../components/H3Custom/H3Custom";

interface ProfilePageProps {
  userId: string | undefined;
}

interface Compra {
  compra: CartItem[];
  _id: string;
}

type Compras = Compra[];

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const [compras, setCompras] = useState<Compras>([]);

  useEffect(() => {
    if (userId) {
      ComprasService.getAllByUser(userId).then((data) => {
        setCompras(data);
      });
    }
  }, [userId]);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Mi Perfil" />
      <H3Custom text="Mis Compras" />
      {compras.map(({ compra, _id }) => {
        const precioFinal = compra.reduce(
          (total, { price, quantity }) => total + price * quantity,
          0
        );
        return (
          <div className={`${styles.compraDiv} border-top py-3 mb-5`} key={_id}>
            <p>Id de compra: {_id}</p>
            {compra.map(
              ({ title, image, imageAlt, price, quantity }, index) => (
                <CompraCard
                  key={index}
                  title={title}
                  image={image}
                  alt={imageAlt}
                  price={price}
                  quantity={quantity}
                />
              )
            )}
            <p className={styles.precioFinal}>
              Total de la compra: ${precioFinal.toFixed(2)}
            </p>
          </div>
        );
      })}
    </CustomContainer>
  );
};

export default ProfilePage;
