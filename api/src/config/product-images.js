const PRODUCT_IMAGE_FILE_NAMES = [
  "mate-clasico-madera.jpg",
  "mate-madera-verde-claro.jpg",
  "mate-madera-verde-oscuro.jpg",
  "mate-pampa-blanco.jpg",
  "mate-pampa-negro.jpg",
  "mate-pampa-rosa.jpg",
  "mate-pampa-verde.jpg",
  "mate-stanley-rosa.jpg",
  "mate-stanley-verde.jpg",
  "termo-discovery.jpg",
  "termo-montagne.jpg",
  "termo-stanley-rosa.jpg",
  "termo-stanley-verde.jpg",
];

function isValidProductImageFileName(fileName) {
  return PRODUCT_IMAGE_FILE_NAMES.includes(fileName);
}

export { PRODUCT_IMAGE_FILE_NAMES, isValidProductImageFileName };
