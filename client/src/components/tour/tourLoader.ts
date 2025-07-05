import type { LoaderFunction } from "react-router-dom";
import { apiTour } from "../../service/apiTours";

export const tourLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) throw new Response("Tour ID not found", { status: 400 });
  const data = await apiTour(id!);
  return data;
};
