import styles from "./index.module.scss";
import { CustomImage } from "../CustomImage/CustomImage";

interface CustomContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const CustomContainer: React.FC<CustomContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles.customContainer} ${className}`}>{children}</div>
  );
};
