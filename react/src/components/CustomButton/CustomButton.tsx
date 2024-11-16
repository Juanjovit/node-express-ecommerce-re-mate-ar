import styles from "./index.module.scss";

interface CustomButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      className={`${styles.customButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
