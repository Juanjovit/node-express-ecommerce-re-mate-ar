import * as UsuarioServices from "../../services/usuario.services";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useState } from "react";
import { CustomButton } from "../../components/CustomButton/CustomButton";

interface LoginPageProps {
  onLogin: ({
    token,
    user,
  }: {
    token: string;
    user: { _id: string; name: string; email: string; isAdmin: boolean };
  }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [generalError, setGeneralError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    UsuarioServices.login(email, password)
      .then(
        ({
          token,
          usuario,
        }: {
          token: string;
          usuario: {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
          };
        }) => {
          onLogin({ token, user: usuario });
        }
      )
      .catch((error) => {
        setGeneralError(error.message);
      });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Login" />
      <form className="mt-5 w-75 mx-auto" onSubmit={onSubmit}>
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="text"
          onChange={onChangeEmail}
          value={email}
        />
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          onChange={onChangePassword}
          value={password}
        />
        {generalError && (
          <div className="alert alert-danger">{generalError}</div>
        )}
        <CustomButton className="btn boton mt-5" text="Login" />
      </form>
    </CustomContainer>
  );
};

export default LoginPage;
