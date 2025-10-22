import { useRef, useEffect } from "react";
import ReviewItem from "./ReviewItem";

export default function ReviewsList({ reviews }) {
  const containerRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 20;
    const maxScroll = container.scrollWidth - container.clientWidth;
    let isMounted = true;

    function scroll() {
      if (!isMounted || !container) return;

      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        container.scrollLeft = scrollAmount;
      }
    }

    intervalIdRef.current = setInterval(scroll, scrollInterval);

    return () => {
      isMounted = false;
      clearInterval(intervalIdRef.current);
    };
  }, [reviews]);

  function handleMouseEnter() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  function handleMouseLeave() {
    const container = containerRef.current;
    if (!intervalIdRef.current && container) {
      let scrollAmount = container.scrollLeft;
      const scrollStep = 1;
      const scrollInterval = 20;
      const maxScroll = container.scrollWidth - container.clientWidth;

      function scroll() {
        if (!container) return;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        } else {
          scrollAmount += scrollStep;
          container.scrollLeft = scrollAmount;
        }
      }

      intervalIdRef.current = setInterval(scroll, scrollInterval);
    }
  }

  return (
    <div
      ref={containerRef}
      className="reviews-list-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflowX: "hidden",
        whiteSpace: "nowrap",
        padding: "1rem 0",
        cursor: "pointer",
      }}
    >
      {reviews.map((rev) => (
        <ReviewItem key={rev.id} id={rev.id} />
      ))}
    </div>
  );
}
