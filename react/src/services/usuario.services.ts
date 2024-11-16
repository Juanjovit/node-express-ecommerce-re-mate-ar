async function login(email: string, password: string) {
  return fetch("http://localhost:2022/api/usuarios/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

async function logout() {
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  return fetch("http://localhost:2022/api/usuarios/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return fetch("http://localhost:2022/api/usuarios/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((response) =>
    response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    })
  );
}

export { login, register, logout };
