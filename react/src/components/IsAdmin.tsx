import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IsAdminProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

const IsAdmin: React.FC<IsAdminProps> = ({ isAdmin, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  return isAdmin ? <>{children}</> : null;
};

export default IsAdmin;
