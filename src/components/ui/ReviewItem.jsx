import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "../../assets/css/index.css";

export default function ReviewItem({ id }) {
  const { getReviewDetails, detailsCache } = useContext(GlobalContext);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (detailsCache[id]) {
      setDetails(detailsCache[id]);
    } else {
      getReviewDetails(id)
        .then((data) => {
          if (isMounted) setDetails(data);
        })
        .catch(() => {
          if (isMounted) setDetails(null);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id, getReviewDetails, detailsCache]);

  if (!details) return <p>Caricamento recensione {id}...</p>;

  return (
    <div className="review-card">
      <h5 className="review-card-title">{details.title}</h5>
      <p>
        <strong>{details.user}</strong> - {details.date}
      </p>
      <p>⭐ {details.rating}</p>
      <p>{details.comment}</p>
    </div>
  );
}
