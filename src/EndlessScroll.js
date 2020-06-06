import React, { useState, useRef, useEffect } from "react";

export function EndlessScroll({
  onReachBottom = () => {},
  isLoading = false,
  hasMore = false,
  children = null,
  threshold = 0.2,
  topWrapperClassName = "endless-scroll-top-wrapper",
  middleWrapperClassName = "endless-scroll-middle-wrapper",
  bottomWrapperClassName = "endless-scroll-bottom-wrapper",
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const container = useRef();

  useEffect(() => {
    const options = {
      threshold: [threshold],
    };

    const callback = (entries) => {
      console.log(entries[0]);
      const [first] = entries;

      setIsIntersecting(first.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, options);
    const containerCurrent = container.current;

    observer.observe(containerCurrent);

    return () => observer.unobserve(containerCurrent);
  }, [threshold]);

  useEffect(() => {
    console.log('isLoading', isLoading, 'hasMore', hasMore, 'isIntersecting', isIntersecting);
    if (!isLoading && hasMore && isIntersecting) {
       onReachBottom();
    }
    // eslint-disable-next-line
  }, [hasMore, isLoading, isIntersecting]);

  return (
    <div className={topWrapperClassName}>
      {children}
      <div
        className={middleWrapperClassName}
        style={{ position: "relative" }}
      >
        <div
          ref={container}
          className={bottomWrapperClassName}
          style={{
            background:'gray',
            bottom: "0px",
            height: "100px",
            left: 0,
            position: "absolute",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default EndlessScroll;

