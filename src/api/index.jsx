import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchDestinations = async () => {
  const { data } = await API.get("/destinations");
  return data;
};

export const fetchPackages = async () => {
  const { data } = await API.get("/packages");
  return data;
};

export const fetchGallery = async () => {
  const { data } = await API.get("/gallery");
  return data;
};

export const fetchBlogs = async () => {
  const { data } = await API.get("/blogs");
  return data;
};

export const submitApplication = async (formData) => {
  const { data } = await API.post("/applications", formData);
  return data;
};

export const submitContact = async (formData) => {
  const { data } = await API.post("/contact", formData);
  return data;
};

export default API;