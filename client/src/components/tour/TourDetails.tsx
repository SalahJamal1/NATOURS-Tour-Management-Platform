import type { IToure } from "../../context/AuthContext";
import { months } from "../../utils/helper";

type Props = {
  tour: IToure;
};

export default function TourDetails({ tour }: Props) {
  const firstDateRaw = tour.startDates.at(0);

  const date: Date | undefined =
    firstDateRaw !== undefined ? new Date(firstDateRaw) : undefined;

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className="overview-box__detail">
              <span className="overview-box__label">Next date</span>
              <span className="overview-box__text">
                {months.at(date!.getUTCMonth())} {date?.getFullYear()}
              </span>
            </div>
            <div className="overview-box__detail">
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">{tour.difficulty}</span>
            </div>
            <div className="overview-box__detail">
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">
                {tour.maxGroupSize} people
              </span>
            </div>
            <div className="overview-box__detail">
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">
                {tour.ratingsAverage} / 5
              </span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {tour.reviews?.map((review) => (
              <div className="overview-box__detail" key={review._id}>
                <img
                  src={`/img/users/${review.user.photo}`}
                  className="overview-box__img"
                  alt={`${review.user.role}`}
                />
                <span className="overview-box__label">{review.user.role}</span>
                <span className="overview-box__text">Steven Miller</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {tour.name}</h2>
        <p className="description__text">{tour.description.split("\n")[0]}</p>
        <p className="description__text">{tour.description.split("\n")[1]}</p>
      </div>
    </section>
  );
}
