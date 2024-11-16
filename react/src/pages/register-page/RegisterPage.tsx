import * as UsuarioServices from "../../services/usuario.services";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { CustomButton } from "../../components/CustomButton/CustomButton";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [generalError, setGeneralError] = useState("");

  const [isFormComplete, setIsFormComplete] = useState(false);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 3) {
      setNameError("El nombre debe tener al menos 3 caracteres.");
    }

    if (!email.trim()) {
      setEmailError("Por favor, ingresa un email.");
    }

    if (password.length < 3) {
      setPasswordError("El password debe tener al menos 3 caracteres.");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Los passwords no coinciden.");
    }

    if (isFormComplete) {
      UsuarioServices.register({ name, email, password })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setGeneralError(error.message);
        });
    }
  };

  useEffect(() => {
    setIsFormComplete(
      name.length >= 3 &&
        email !== "" &&
        password.length >= 3 &&
        confirmPassword == password
    );
  }, [name, email, password, confirmPassword]);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Registrarse" />
      <form onSubmit={register}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <input
            className="form-control"
            type="text"
            onChange={nameChange}
            value={name}
            name="name"
            placeholder="Ingresa tu nombre aca"
          />
          <ErrorMessage error={nameError} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={emailChange}
            value={email}
            placeholder="Ingresa tu email aca"
          />
          <ErrorMessage error={emailError} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={passwordChange}
            value={password}
            placeholder="Ingresa tu password aca"
          />
          <ErrorMessage error={passwordError} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Confirmar password
          </label>
          <input
            className="form-control"
            type="password"
            name="confirm password"
            onChange={confirmPasswordChange}
            value={confirmPassword}
            placeholder="Volve a ingresa tu password aca"
          />
          <ErrorMessage error={confirmPasswordError} />
        </div>
        <ErrorMessage error={generalError} />
        <CustomButton className="btn boton mt-5" text="Registrarse" />
      </form>
    </CustomContainer>
  );
};

export default RegisterPage;
