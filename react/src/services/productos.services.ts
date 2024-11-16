async function getAllPublicProductos() {
  return fetch(`http://localhost:2022/api/productos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function getPublicProductosMasVendidos() {
  return fetch(`http://localhost:2022/api/productos/masVendidos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function getAllProductos() {
  return fetch(`http://localhost:2022/api/productos/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function getAllProductosByType({ filter }: { filter: "mate" | "termo" }) {
  const filterParam = `?type=${filter}`;

  return fetch(`http://localhost:2022/api/productos${filterParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function getProductoById({ id }: { id: string | undefined }) {
  return fetch(`http://localhost:2022/api/productos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function agregarProducto(producto: FormData) {
  return fetch("http://localhost:2022/api/productos/agregar/", {
    method: "POST",
    body: producto,
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

async function eliminarProducto(id: string) {
  return fetch("http://localhost:2022/api/productos/eliminar/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

async function editarProducto(producto: FormData) {
  return fetch("http://localhost:2022/api/productos/editar/", {
    method: "PUT",
    body: producto,
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

async function publicarOcultarProducto(id: string, isPublic: boolean) {
  return fetch("http://localhost:2022/api/productos/publicarOcultar/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, isPublic }),
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

export {
  getAllPublicProductos,
  getPublicProductosMasVendidos,
  getAllProductos,
  getAllProductosByType,
  getProductoById,
  agregarProducto,
  eliminarProducto,
  editarProducto,
  publicarOcultarProducto,
};
