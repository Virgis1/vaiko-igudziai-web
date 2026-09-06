import api from "../api";

export const loginParent = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.access_token);

  return res.data;
};

export const registerParent = async (name, email, password) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
}

