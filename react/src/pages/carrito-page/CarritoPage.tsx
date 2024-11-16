import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { useEffect, useState } from "react";
import { CustomImage } from "../../components/CustomImage/CustomImage";
import Button from "react-bootstrap/Button";
import * as ComprasServices from "../../services/compras.services";
import { useNavigate } from "react-router-dom";

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
}

export type Cart = CartItem[];

const CarritoPage: React.FC = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<Cart>([]);
  const [userId, setUserId] = useState();
  const [generalError, setGeneralError] = useState("");

  const getCart = () => {
    const localStorageCart = localStorage.getItem("cart");

    if (localStorageCart) {
      const cartData = JSON.parse(localStorageCart) || [];
      setCart(cartData);
    }
  };

  const getUserId = () => {
    const localStorageUserId = localStorage.getItem("token");

    if (localStorageUserId) {
      const userData = JSON.parse(localStorageUserId);
      setUserId(userData.user._id);
    } else {
      navigate("/login");
    }
  };

  const updateCartInLocalStorage = (updatedCart: Cart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCartInLocalStorage(updatedCart);
  };

  const handleIncreaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  const handleCheckout = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    ComprasServices.confirmar(cart, userId)
      .then(() => {
        navigate("/success");
        const emptyCart: Cart = [];
        setCart(emptyCart);
        localStorage.setItem("cart", JSON.stringify(emptyCart));
      })
      .catch((error) => {
        setGeneralError(error.message);
      });
  };

  const calcularTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    getCart();
    getUserId();
  }, []);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Carrito" />
      {cart && cart.length > 0 ? (
        <>
          <table
            className={`table table-striped table-bordered ${styles.cartTable}`}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Precio Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <CustomImage
                      image={item.image}
                      alt={item.imageAlt}
                      className={styles.cartImage}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className={styles.quantityControls}>
                      <button
                        className={`${styles.circularButton} btn`}
                        onClick={() => handleDecreaseQuantity(item._id)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={`${styles.circularButton} btn`}
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className={`${styles.button} btn`}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {generalError && (
            <div className="alert alert-danger">{generalError}</div>
          )}
          <p className={styles.total}>
            <strong>Total: </strong>${calcularTotal()}
          </p>
          <div className={styles.checkoutContainer}>
            <Button variant="success" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </CustomContainer>
  );
};

export default CarritoPage;
