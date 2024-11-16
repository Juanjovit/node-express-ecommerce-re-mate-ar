interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return <>{error && <div className="text-danger">{error}</div>}</>;
};
