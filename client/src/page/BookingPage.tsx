import { Link } from "react-router-dom";
import TourCard from "../components/tours/TourCard";
import { useAuth } from "../hooks/useAuth";

export default function BookingPage() {
  const { user } = useAuth()!;
  console.log(user.bookings);
  if (!user.bookings?.length)
    return (
      <div className="explore">
        <h1>😝 There are no bookings,</h1>
        <Link to="/" className="explore-button">
          {" "}
          explore Tours!
        </Link>
      </div>
    );
  return (
    <div className="booking-container">
      {user.bookings?.map((book) => (
        <TourCard tour={book.tour} key={book._id} />
      ))}
    </div>
  );
}
