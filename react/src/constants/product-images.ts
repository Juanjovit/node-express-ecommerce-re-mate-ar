import { API_BASE_URL } from "../services/api";

const PRODUCT_IMAGE_OPTIONS = [
  { fileName: "mate-clasico-madera.jpg", label: "Mate clasico de madera" },
  {
    fileName: "mate-madera-verde-claro.jpg",
    label: "Mate de madera verde claro",
  },
  {
    fileName: "mate-madera-verde-oscuro.jpg",
    label: "Mate de madera verde oscuro",
  },
  { fileName: "mate-pampa-blanco.jpg", label: "Mate Pampa blanco" },
  { fileName: "mate-pampa-negro.jpg", label: "Mate Pampa negro" },
  { fileName: "mate-pampa-rosa.jpg", label: "Mate Pampa rosa" },
  { fileName: "mate-pampa-verde.jpg", label: "Mate Pampa verde" },
  { fileName: "mate-stanley-rosa.jpg", label: "Mate Stanley rosa" },
  { fileName: "mate-stanley-verde.jpg", label: "Mate Stanley verde" },
  { fileName: "termo-discovery.jpg", label: "Termo Discovery" },
  { fileName: "termo-montagne.jpg", label: "Termo Montagne" },
  { fileName: "termo-stanley-rosa.jpg", label: "Termo Stanley rosa" },
  { fileName: "termo-stanley-verde.jpg", label: "Termo Stanley verde" },
];

function buildProductImageUrl(fileName: string) {
  return `${API_BASE_URL}/images/${fileName}`;
}

function extractImageFileName(imagePath: string) {
  const splitUrl = imagePath.split("/");
  return splitUrl[splitUrl.length - 1];
}

export { PRODUCT_IMAGE_OPTIONS, buildProductImageUrl, extractImageFileName };
