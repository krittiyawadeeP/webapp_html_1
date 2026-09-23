import { useState } from "react";
import "./App.css";

function App() {
  // ข้อ 1
  const [isBlue, setIsBlue] = useState(false);

  // ข้อ 2
  const [text, setText] = useState("Hello world");
  const [color, setColor] = useState("deeppink");

  // ข้อ 3
  const [count, setCount] = useState(1);

  return (
    <div className="container">
      <h1>todo 1</h1>

      {/* ข้อ 1 */}
      <section>
        <button
          className={isBlue ? "blue-btn" : "red-btn"}
          onClick={() => setIsBlue(!isBlue)}
        >
          {isBlue ? "Go Blue" : "Go Red"}
        </button>

        <span className="arrow">↔</span>

        <button
          className={isBlue ? "red-btn" : "blue-btn"}
          onClick={() => setIsBlue(!isBlue)}
        >
          {isBlue ? "Go Red" : "Go Blue"}
        </button>
      </section>

      <hr />

      {/* ข้อ 2 */}
      <section>
        <p style={{ color: color }}>{text}</p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </section>

      <hr />

      {/* ข้อ 3 */}
      <section>
        <h2>{count}</h2>

        <button onClick={() => setCount(count + 1)}>
          Count Up
        </button>

        <button onClick={() => setCount(count - 1)}>
          Count Down
        </button>
      </section>
    </div>
  );
}

export default App;
