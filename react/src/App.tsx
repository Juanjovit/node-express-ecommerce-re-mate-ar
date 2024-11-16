import Navbar from "./components/Layout/Navbar/Navbar";

import { Routes, Route, useNavigate } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min";

import HomePage from "./pages/home-page/HomePage";

import RoutePrivate from "./components/RoutePrivate";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import { useState, useEffect } from "react";
import React from "react";
import MatesPage from "./pages/mates-page/MatesPage";
import TermosPage from "./pages/termos-page/TermosPage";
import ProductosPage from "./pages/productos-page/ProductosPage";
import VerProductoPage from "./pages/ver-producto-page/VerProductoPage";
import LoginPage from "./pages/login-page/LoginPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import LogoutPage from "./pages/logout-page/LogoutPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import CarritoPage from "./pages/carrito-page/CarritoPage";
import IsAdmin from "./components/IsAdmin";
import AdminPage from "./pages/admin-page/AdminPage";
import AdminProductosPage from "./pages/admin-productos-page/AdminProductosPage";
import AdminUsuariosPage from "./pages/admin-usuarios-page/AdminUsuariosPage";
import AdminProductosEditarPage from "./pages/admin-productos-editar-page/AdminProductosEditarPage";
import AdminProductosEliminarPage from "./pages/admin-productos-eliminar-page/AdminProductosEliminarPage";
import AdminProductosAgregarPage from "./pages/admin-productos-agregar-page/AdminProductosAgregarPage";
import QuienesSomosPage from "./pages/quienes-somos-page/QuienesSomosPage";
import SuccessPage from "./pages/success-page/SuccessPage";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState();

  const initializeCart = () => {
    const cart = localStorage.getItem("cart");

    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    initializeCart();

    if (token) {
      setIsAuthenticated(true);
      const parsedToken = JSON.parse(token);
      setUserId(parsedToken.user._id);
    }
  }, []);

  const onLogin = ({
    token,
    user,
  }: {
    token: string;
    user: { _id: string; name: string; email: string; isAdmin: boolean };
  }) => {
    if (token) {
      localStorage.setItem("token", JSON.stringify({ token, user }));

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin);
        setUserId(parsedToken.user._id);
      }

      navigate("/");
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/mates" element={<MatesPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/producto/:id" element={<VerProductoPage />} />

        <Route
          path="/perfil"
          element={
            <RoutePrivate isAuthenticated={isAuthenticated}>
              <ProfilePage userId={userId} />
            </RoutePrivate>
          }
        />

        <Route
          path="/carrito"
          element={
            <RoutePrivate isAuthenticated={isAuthenticated}>
              <CarritoPage />
            </RoutePrivate>
          }
        />

        <Route
          path="/success"
          element={
            <RoutePrivate isAuthenticated={isAuthenticated}>
              <SuccessPage />
            </RoutePrivate>
          }
        />

        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/logout" element={<LogoutPage />} />

        <Route
          path="/admin"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminPage />
            </IsAdmin>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminProductosPage />
            </IsAdmin>
          }
        />

        <Route
          path="/admin/producto/agregar"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminProductosAgregarPage />
            </IsAdmin>
          }
        />

        <Route
          path="/admin/producto/:id/editar"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminProductosEditarPage />
            </IsAdmin>
          }
        />

        <Route
          path="/admin/producto/:id/eliminar"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminProductosEliminarPage />
            </IsAdmin>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <IsAdmin isAdmin={isAdmin}>
              <AdminUsuariosPage />
            </IsAdmin>
          }
        />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
