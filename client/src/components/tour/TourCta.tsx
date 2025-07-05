import { useNavigate } from "react-router-dom";
import type { IToure } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { apiBookgin } from "../../service/apiTours";
import toast from "react-hot-toast";

type Props = {
  tour: IToure;
};

export default function TourCta({ tour }: Props) {
  const { auth, user } = useAuth()!;

  const isBooked = user.bookings?.map((el) => el.tour._id).includes(tour._id);

  const navigate = useNavigate();
  const onClick = async () => {
    if (!tour._id) return toast.error("Tour ID is missing!");

    try {
      const res = await apiBookgin(tour._id);
      if (res.status === 200) {
        toast.success(`Successfully booked: ${tour.name}`);
        navigate("/account/booking");
        window.location.reload();
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "Booking failed";
      toast.error(msg);
    }
  };

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>
        <img
          className="cta__img cta__img--1"
          src={`/img/tours/${tour.images.at(1)}`}
          alt={tour.name}
        />
        <img
          className="cta__img cta__img--2"
          src={`/img/tours/${tour.images.at(2)}`}
          alt={tour.name}
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>
          <button
            disabled={auth && isBooked}
            onClick={() => {
              if (!auth) return navigate("/login");
              if (!isBooked) onClick();
            }}
            className="btn btn--green span-all-row"
          >
            {isBooked
              ? "Already booked ✔"
              : auth
              ? "Book tour now!"
              : "Login to Book"}
          </button>
        </div>
      </div>
    </section>
  );
}
