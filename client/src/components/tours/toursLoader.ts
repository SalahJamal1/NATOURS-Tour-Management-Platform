import type { LoaderFunction } from "react-router-dom";
import { apiTours } from "../../service/apiTours";

export const toursLoader: LoaderFunction = async () => {
  const data = await apiTours();
  return data;
};
