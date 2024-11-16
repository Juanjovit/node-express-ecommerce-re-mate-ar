import * as ProductoServices from "../../services/productos.services.js";

import styles from "./index.module.scss";
import { CustomContainer } from "../../components/CustomContainer/CustomContainer";
import { H2Custom } from "../../components/H2Custom/H2Custom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { CustomImage } from "../../components/CustomImage/CustomImage.js";
import { CustomButton } from "../../components/CustomButton/CustomButton.js";

const AdminProductosEditarPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [imageAlt, setImageAlt] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageAltError, setImageAltError] = useState("");

  const [generalError, setGeneralError] = useState("");

  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) setTitleError("");
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    if (descriptionError) setDescriptionError("");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
    if (priceError) setPriceError("");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    if (typeError) setTypeError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (imageError) setImageError("");
  };

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageAlt(e.target.value);
    if (imageAltError) setImageAltError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      setTitleError("El nombre debe tener al menos 3 caracteres.");
    }

    if (description == "") {
      setDescriptionError("Agrega una descripcion al producto");
    }

    if (price <= 0) {
      setPriceError("Agrega el precio del producto");
    }

    if (type == "") {
      setTypeError("Selecciona un tipo de producto por favor");
    }

    if (!image) {
      setImageError("Agrega una imagen por favor");
    }

    if (imageAlt.length < 3) {
      setImageAltError(
        "La descripcion de la imagen debe tener al menos 3 caracteres."
      );
    }

    const stringPrice = price.toString();

    const formData = new FormData();
    formData.append("id", id || "");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", stringPrice);
    formData.append("type", type);
    if (typeof image === "string") {
      formData.append("image", image);
    } else if (image instanceof File) {
      formData.append("image", image);
    }
    formData.append("imageAlt", imageAlt);

    if (isFormComplete) {
      ProductoServices.editarProducto(formData)
        .then(() => {
          navigate("/admin/productos");
        })
        .catch((error) => {
          setGeneralError(error.message);
        });
    }
  };
  useEffect(() => {
    ProductoServices.getProductoById({ id }).then((data) => {
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setType(data.type);
      setImage(data.image);
      setImageAlt(data.imageAlt);
    });
  }, [id]);

  useEffect(() => {
    setIsFormComplete(
      title.length > 3 &&
        description !== "" &&
        price >= 0 &&
        type !== "" &&
        !!image &&
        imageAlt.length >= 3
    );
  }, [title, description, price, type, image, imageAlt]);

  return (
    <CustomContainer className={styles.productsDisplay}>
      <H2Custom text="Panel de Administrador | Editar producto" />
      <div className={styles.buttonsContainer}>
        <Link className={`nav-link active`} to="/admin/productos">
          <CustomButton
            text="Volver"
            className={`${styles.customButton} ${styles.greenButton}  btn`}
          />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Nombre del producto
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleTitleChange}
            value={title}
            name="title"
            placeholder="Ingresa el nombre del producto aca"
          />
          <ErrorMessage error={titleError} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Descripcion del producto
          </label>
          <textarea
            className="form-control"
            onChange={handleDescriptionChange}
            value={description}
            name="description"
            placeholder="Ingresa la descripcion del producto aca"
          />
          <ErrorMessage error={descriptionError} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="price">
            Precio del producto
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handlePriceChange}
            value={price.toFixed(2)}
            name="price"
          />
          <ErrorMessage error={priceError} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de producto</label>
          <select
            className="form-control"
            name="type"
            value={type}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Selecciona un tipo de producto
            </option>
            <option value="mate">Mate</option>
            <option value="termo">Termo</option>
          </select>

          <ErrorMessage error={typeError} />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen del producto</label>
          {typeof image === "string" ? (
            <CustomImage
              image={image}
              alt={imageAlt}
              className={styles.image}
            />
          ) : (
            <p>Nueva imagen agregada</p>
          )}
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <ErrorMessage error={imageError} />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="imageAlt">
            Descripcion de la imagen
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleImageAltChange}
            value={imageAlt}
            name="imageAlt"
            placeholder="Ingresa la descripcion de la imagen aca"
          />
          <ErrorMessage error={imageAltError} />
        </div>

        <ErrorMessage error={generalError} />

        <div>
          <CustomButton
            text="Editar producto"
            className={`${styles.customButton} ${styles.blueButton} btn`}
          />
        </div>
      </form>
    </CustomContainer>
  );
};

export default AdminProductosEditarPage;
