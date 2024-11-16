import styles from "./index.module.scss";
import { CustomImage } from "../CustomImage/CustomImage";

interface CompraCardProps {
  image: string;
  alt: string;
  title: string;
  price: number;
  quantity: number;
}

export const CompraCard: React.FC<CompraCardProps> = ({
  image,
  alt,
  title,
  price,
  quantity,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <CustomImage image={image} alt={alt} className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div>
        <p className="mx-3">${price}</p>
        <p>x{quantity}</p>
      </div>
      <div>
        <p className="me-4">Total del producto: ${quantity * price}</p>
      </div>
    </div>
  );
};
