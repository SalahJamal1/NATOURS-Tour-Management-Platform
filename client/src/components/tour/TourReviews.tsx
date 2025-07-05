import { IoMdStarOutline } from "react-icons/io";
import type { IToure } from "../../context/AuthContext";
type Props = {
  tour: IToure;
};
export default function TourReviews({ tour }: Props) {
  return (
    <section className="section-reviews">
      <div className="reviews">
        {tour.reviews?.map((rev) => (
          <div className="reviews__card" key={rev._id}>
            <div className="reviews__avatar">
              <img
                className="reviews__avatar-img"
                src={`/img/users/${rev.user.photo}`}
                alt={rev.user.name}
              />
              <h6 className="reviews__user">{rev.user.name}</h6>
            </div>
            <p className="reviews__text">{rev.review}</p>
            <div className="reviews__rating">
              {Array.from({ length: 5 }, (_, i) => (
                <IoMdStarOutline
                  className={`reviews__star ${
                    rev.rating > i && "reviews__star--active"
                  }`}
                  key={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
