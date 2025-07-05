import axios from "axios";
import type { IUser } from "../context/AuthContext";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1/auth",
  withCredentials: true,
});

export async function apiLogin(data: IUser) {
  const res = await api.post("/Login", data);
  return res;
}
export async function apiLogout() {
  const res = await api.get("/Logout");
  return res;
}
export async function apiMe(jwt: string) {
  const res = await api.get("/Me", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
export async function apiSignup(data: IUser) {
  const res = await api.post("/Signup", data);
  return res;
}
