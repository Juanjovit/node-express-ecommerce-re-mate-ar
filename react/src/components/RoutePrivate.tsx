import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RoutePrivateProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const RoutePrivate: React.FC<RoutePrivateProps> = ({
  isAuthenticated,
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};

export default RoutePrivate;
