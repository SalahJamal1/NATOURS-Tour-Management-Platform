import { Link } from "react-router-dom";
import type { IToure } from "../../context/AuthContext";
import { months } from "../../utils/helper";

type Props = {
  tour: IToure;
};
export default function TourCard({ tour }: Props) {
  const firstDateRaw = tour.startDates.at(0);

  const date: Date | undefined =
    firstDateRaw !== undefined ? new Date(firstDateRaw) : undefined;

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            className="card__picture-img"
            src={`/img/tours/${tour.imageCover}`}
            alt="Tour 1"
          />
        </div>
        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">
          {tour.difficulty} {tour.locations.at(1)?.day}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="card__data">
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
          <span>
            {months.at(date!.getUTCMonth())} {date!.getFullYear()}
          </span>
        </div>
        <div className="card__data">
          <span>{tour.locations.length} stops</span>
        </div>
        <div className="card__data">
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>
      <div className="card__footer">
        <p>
          <span className="card__footer-value">${tour.price}</span>{" "}
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{tour.ratingsAverage}</span>{" "}
          <span className="card__footer-text">
            rating ({tour.ratingsQuantity})
          </span>
        </p>
        <Link className="btn btn--green btn--small" to={`/tour/${tour._id}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
