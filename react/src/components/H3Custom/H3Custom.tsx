import styles from "./index.module.scss";

interface H3CustomProps {
  text?: string;
  alignCenter?: boolean;
  className?: string;
}

export const H3Custom: React.FC<H3CustomProps> = ({
  text,
  alignCenter,
  className,
}) => {
  return (
    <h3
      className={`${styles.title} ${
        alignCenter ? styles.alignCenter : null
      } ${className} `}
    >
      {text}
    </h3>
  );
};
