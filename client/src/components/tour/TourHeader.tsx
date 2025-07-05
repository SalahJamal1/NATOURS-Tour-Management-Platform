import type { IToure } from "../../context/AuthContext";

type Props = {
  tour: IToure;
};

export default function TourHeader({ tour }: Props) {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img
          className="header__hero-img"
          src={`/img/tours/${tour.imageCover}`}
          alt={`Tour ${tour.name}`}
        />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tour.name}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <span className="heading-box__text">{tour.duration} days</span>
          </div>
          <div className="heading-box__detail">
            <span className="heading-box__text">
              {tour.startLocation.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
