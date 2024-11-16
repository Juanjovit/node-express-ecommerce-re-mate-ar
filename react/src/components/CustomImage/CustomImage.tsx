import styles from "./index.module.scss";

import defaultImage from "../../images/image-not-found.jpg";

interface CustomImageProps {
  image?: string;
  alt?: string;
  className?: string;
}

export const CustomImage: React.FC<CustomImageProps> = ({
  image,
  alt,
  className,
}) => {
  const defaultAlt = "iamge-not-found";

  return (
    <img
      src={image || defaultImage}
      alt={alt || defaultAlt}
      className={`${className} ${styles.image}`}
    />
  );
};
