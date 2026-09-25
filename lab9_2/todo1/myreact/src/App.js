import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {


  const [isblue, setIsblue] = useState(false);

  const [text_Output, setText] = useState("hello bro");
  const [color, setcolor] = useState("pink");

  const [number, setNumber] = useState(1);

  return (
    //1
    <div class="parent">

      {/* 1 */}
      <h1>1. change button color</h1>
      <button className={isblue ? "blueButton" : "RedButton"}
        onClick={() => setIsblue(!isblue)} >
        {isblue ? "go red" : "go blue"}</button>

      <hr style={{ margin: "40px" }} />
      {/* 2 */}
      <h1>2.set color and text from input</h1>
      <h2 style={{ color: color }}> {text_Output} </h2>
      <input type='text' value={text_Output} onChange={(e) => setText(e.target.value)} />
      <input type='color' value={color} onChange={(e) => setcolor(e.target.value)} />

      <hr style={{ margin: "40px" }} />
      {/* 3 */}
      <h1>3.count number</h1>
      <h2>{number}</h2>
      <button className='RedButton' onClick={() => setNumber(number + 1)}>count up</button>
      <button className="blueButton" onClick={() => setNumber(number - 1)}>count down</button>
    </div>

  );
}

export default App;
