// type Props = {};

import { useLoaderData } from "react-router-dom";
import TourCard from "../components/tours/TourCard";
import type { IToure } from "../context/AuthContext";

export default function ToursPage() {
  const tours: IToure[] = useLoaderData();
  return (
    <>
      <main className="main">
        <div className="card-container">
          {tours?.map((tour) => (
            <TourCard tour={tour} key={tour._id} />
          ))}
        </div>
      </main>
    </>
  );
}
