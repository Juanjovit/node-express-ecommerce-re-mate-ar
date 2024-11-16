import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { path: "/", label: "Inicio" },
  { path: "/productos", label: "Productos" },
  { path: "/mates", label: "Mates" },
  { path: "/termos", label: "Termos" },
  { path: "/quienes-somos", label: "Quienes somos" },
];

const Navbar: React.FC = () => {
  let token = localStorage.getItem("token");
  const userData = token ? JSON.parse(token) : null;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`${styles.customNavbar} ${
        isOpen ? styles.backgroundGreen : null
      }`}
    >
      <div>
        <Link className={`${styles.logo} navbar-brand`} to="/">
          Re-mate.ar
        </Link>
      </div>
      <div
        className={`${styles.nav} ${
          isOpen
            ? `${styles.navActive} ${styles.backgroundGreen}`
            : styles.navHidden
        }`}
      >
        <ul className={styles.list}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                className={`${styles.navButton} nav-link active`}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={`${styles.list} ms-lg-auto`}>
          {userData ? (
            <>
              {userData.user.isAdmin ? (
                <li className="nav-item">
                  <Link
                    className={`${styles.navLoginRegisterButton} nav-link active`}
                    to="/admin"
                  >
                    Panel de Administrador
                  </Link>
                </li>
              ) : null}

              <li className="nav-item">
                <Link
                  className={`${styles.navLoginRegisterButton} nav-link active`}
                  to="/carrito"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className={styles.icon}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.navLoginRegisterButton} nav-link active`}
                  to="/perfil"
                >
                  Perfil ({userData.user.name}){" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.navLoginRegisterButton} nav-link active`}
                  to="/logout"
                >
                  Cerrar Sesion
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={`${styles.navLoginRegisterButton} nav-link active`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`${styles.navLoginRegisterButton} nav-link active`}
                  to="/register"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <button onClick={toggleMenu} className={styles.menuIcon}>
        <FontAwesomeIcon icon={faBars} className={styles.icon} />
      </button>
    </nav>
  );
};

// <nav className="navbar navbar-expand-lg">
//   <div className="container-fluid">
//     <span className="navbar-brand mb-0 h1">JJV-DW</span>
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarSupportedContent"
//       aria-controls="navbarSupportedContent"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link text-light" to="/">
//             Inicio
//           </Link>
//         </li>
//
//

//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/acercaDeMi">
//                 Acerca de mi
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/misEstudios">
//                 Mis Estudios
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/tecnologias">
//                 Tecnologias
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/proyectos">
//                 Proyectos
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/contacto">
//                 Contacto
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-light" to="/admin">
//                 Admin
//               </Link>
//             </li>
//             {!token && (
//               <li className="nav-item">
//                 <Link className="nav-link text-light" to="/login">
//                   Iniciar Sesion
//                 </Link>
//               </li>
//             )}
//             {!token && (
//               <li className="nav-item">
//                 <Link className="nav-link text-light" to="/register">
//                   Registrarse
//                 </Link>
//               </li>
//             )}
//             {token && (
//               <li className="nav-item">
//                 <Link className="nav-link text-light" to="/logout">
//                   Cerrar Sesion
//                 </Link>
//               </li>
//             )}

//
//
//         </ul>
//       </div>
//     </div>
//   </nav>

export default Navbar;
