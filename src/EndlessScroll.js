import React, { useEffect, useRef } from "react";
import "./EndlessScroll.css";

export function EndlessScroll({
  onReachBottom = () => {},
  isLoading = false,
  hasMore = false,
  children = null,
  threshold = 0.0,
  className = "",
}) {
  const loader = useRef(null);

  useEffect(() => {
    const loadMore = (entries) => {
      const [first] = entries;

      if (!isLoading && hasMore && first.isIntersecting) {
        onReachBottom();
      }
    };

    const options = { threshold: [threshold] };
    const observer = new IntersectionObserver(loadMore, options);

    const loaderCurrent = loader.current;
    if (loaderCurrent) {
      observer.observe(loaderCurrent);
    }

    return () => observer.unobserve(loaderCurrent);
  }, [hasMore, isLoading, onReachBottom, threshold]);

  return (
    <div className={`endless-scroll-wrapper ${className}`}>
      {children}
      <div className="endless-scroll-loader-wrapper">
        <div ref={loader} className="endless-scroll-loader" />
      </div>
    </div>
  );
}

export default EndlessScroll;

