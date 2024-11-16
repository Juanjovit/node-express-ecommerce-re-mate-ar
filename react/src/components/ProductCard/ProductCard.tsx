import styles from "./index.module.scss";
import { CustomImage } from "../CustomImage/CustomImage";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  alt: string;
  title: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  alt,
  title,
}) => {
  return (
    <Link to={`/producto/${id}`} className={styles.link}>
      <div className={styles.card}>
        <CustomImage image={image} alt={alt} className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
      </div>
    </Link>
  );
};
