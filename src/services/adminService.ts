import axios from "./axiosInstance";

export const registerAdmin = async (email: string, password: string) => {
  const res = await axios.post("/api/auth/register", { email, password });
  return res.data;
};

export const loginAdmin = async (email: string, password: string) => {
  const res = await axios.post("/api/auth/login", { email, password });
  return res.data;
};

// CRUD sản phẩm
export const getAllProducts = async () => {
  const res = await axios.get("/api/products");
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (
  data: Record<string, string | File | undefined>,
  token: string
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (
      typeof value === "string" ||
      (typeof File !== "undefined" && value instanceof File)
    ) {
      formData.append(key, value);
    }
  });
  const res = await axios.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: Record<string, string | File | undefined>,
  token: string
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (
      typeof value === "string" ||
      (typeof File !== "undefined" && value instanceof File)
    ) {
      formData.append(key, value);
    }
  });
  const res = await axios.put(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const res = await axios.delete(`/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
