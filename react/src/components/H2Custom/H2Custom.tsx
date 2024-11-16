import styles from "./index.module.scss";

interface H2CustomProps {
  text?: string;
  alignCenter?: boolean;
  className?: string;
}

export const H2Custom: React.FC<H2CustomProps> = ({
  text,
  alignCenter,
  className,
}) => {
  return (
    <h2
      className={`${styles.title} ${
        alignCenter ? styles.alignCenter : null
      } ${className} `}
    >
      {text}
    </h2>
  );
};
