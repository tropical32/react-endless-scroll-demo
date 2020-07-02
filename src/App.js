import React, { useState } from "react";
import EndlessScroll from "./EndlessScroll";
//import EndlessScroll from "react-endless-scroll";
import "./App.css";
import styled from 'styled-components'

const StyledEndlessScroll = styled(EndlessScroll)`
`;

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
        backgroundColor: "pink",
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
    console.log('fetching');
    setIsLoading(true);
    const data = await fetchData(seed);

    setElements((curr) => [...curr, ...data]);
    setSeed(seed + 10);
    setHasMore(Math.random() > 0.05);
    setIsLoading(false);
    console.log('done fetching');
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "alignItems": "center",
      }}
    >
      <StyledEndlessScroll
        onReachBottom={fetch}
        isLoading={isLoading}
        hasMore={hasMore}
      >
        {elements.map((element) => (
          <Element key={element}>{element}</Element>
        ))}
      </StyledEndlessScroll>
      {!hasMore && <p>You've reached the bottom!</p>}
    </div>
  );
}

export default App;
