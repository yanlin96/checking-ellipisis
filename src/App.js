import "./App.css";
import { useEffect, useRef, useState } from "react";

function EllipsisText({ text }) {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const current = textRef.current;
      if (current) {
        setIsOverflowing(current.scrollWidth > current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow); // Recheck on window resize

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  return (
    <>
      <div className="ellipsis-container" ref={textRef}>
        {text}
      </div>
      <div className="status-text">{isOverflowing ? "Hello" : "No"}</div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <EllipsisText text="This is a really long text string that will overflow its container and show ellipsis at the end if it is too long to fit in the container provided." />
        <EllipsisText text="Short text" />
      </div>
    </div>
  );
}

export default App;
