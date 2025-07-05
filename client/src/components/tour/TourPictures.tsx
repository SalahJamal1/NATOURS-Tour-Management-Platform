import type { IToure } from "../../context/AuthContext";

type Props = {
  tour: IToure;
};
export default function TourPictures({ tour }: Props) {
  return (
    <section className="section-pictures">
      {tour.images.map((img, i) => (
        <div className="picture-box" key={i}>
          <img
            className="picture-box__img picture-box__img--1"
            src={`/img/tours/${img}`}
            alt={`${tour.name}-${i}`}
          />
        </div>
      ))}
    </section>
  );
}
