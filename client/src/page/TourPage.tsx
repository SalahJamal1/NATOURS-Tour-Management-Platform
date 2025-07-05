// type Props = {};

import { useLoaderData } from "react-router-dom";
import TourCta from "../components/tour/TourCta";
import TourDetails from "../components/tour/TourDetails";
import TourHeader from "../components/tour/TourHeader";
import TourPictures from "../components/tour/TourPictures";
import TourReviews from "../components/tour/TourReviews";

export default function TourPage() {
  const tour = useLoaderData();
  return (
    <>
      <TourHeader tour={tour} />
      <TourDetails tour={tour} />
      <TourPictures tour={tour} />
      <TourReviews tour={tour} />
      <TourCta tour={tour} />
    </>
  );
}
