import { useEffect, useState } from "react";
import "../App.css";

interface MyProps {
  typing: boolean;
}

const Blinker: React.FC<MyProps> = ({ typing }) => {
  const [ticker, setTicker] = useState(0);
  const [init, setInit] = useState(false);

  if (init == false) {
    tick();
    setInit(true);
  }
  function tick() {
    setInterval(() => {
      setTicker(ticker + 1);
    }, 750);
    tick();
  }
  if (typing == true) {
    if (ticker % 3 == 0) {
      return (
        <div className="App">
          <ul style={{ display: "inline", listStyleType: "none" }}>
            <li className="bigdot" />
            <li className="dot" />
            <li className="dot" />
          </ul>
        </div>
      );
    }
    if (ticker % 3 == 1) {
      return (
        <div className="App">
          <ul style={{ display: "inline", listStyleType: "none" }}>
            <li className="dot" />
            <li className="bigdot" />
            <li className="dot" />
          </ul>
        </div>
      );
    }
    if (ticker % 3 == 2) {
      return (
        <div className="App">
          <ul style={{ display: "inline", listStyleType: "none" }}>
            <li className="dot" />
            <li className="dot" />
            <li className="bigdot" />
          </ul>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
  return null;
};

export default Blinker;
