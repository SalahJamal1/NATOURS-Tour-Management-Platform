import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  withCredentials: true,
});

export async function apiTours() {
  try {
    const res = await api.get("/tours");

    return res.data.docs;
  } catch {
    throw Error("Failed to fetch data 💥");
  }
}
export async function apiTour(id: string | number) {
  try {
    const res = await api.get(`/tours/${id}`);

    return res.data.doc;
  } catch {
    throw Error("Failed to fetch Tour 💥");
  }
}
export async function apiBookgin(id: string | number) {
  const res = await api.post(`/bookings/${id}`);

  return res;
}
