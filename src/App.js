import React, { useState } from "react";
import EndlessScroll from "react-endless-scroll";
import "./App.css";

function fetchData(seed) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(Array(10).keys()).map((_, idx) => idx + seed));
    }, 1000);
  });
}

function Element({ children }) {
  return (
    <div
      style={{
        padding: "40px",
        marginBottom: "10px",
        marginTop: "10px",
        backgroundColor: "cornflowerblue",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [seed, setSeed] = useState(0);

  async function fetch() {
    setIsLoading(true);
    const data = await fetchData(seed);

    setElements((curr) => [...curr, ...data]);
    setSeed(seed + 10);
    setHasMore(Math.random() > 0.05);
    setIsLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "align-items": "center",
      }}
    >
      <EndlessScroll
        onReachBottom={fetch}
        isLoading={isLoading}
        hasMore={hasMore}
      >
        {elements.map((element) => (
          <Element>{element}</Element>
        ))}
      </EndlessScroll>
      {!hasMore && <p>You've reached the bottom!</p>}
    </div>
  );
}

export default App;
