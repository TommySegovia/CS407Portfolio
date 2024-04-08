// In App.tsx
import React, { useState } from "react";
import Animation from "./Animation";

function App() {
  var [wireFrameState, setWireFrameState] = useState(true);
  var [animationRunState, setAnimationRunState] = useState(true);

  function toggleState() {
    setAnimationRunState(!animationRunState);
    console.log("Toggle Animation");
  }

  function toggleWireFrame() {
    setWireFrameState(!wireFrameState);
    console.log("Toggle WireFrame");
  }

  return (
    <div id="mainPage">
      <h1>Assignment 2: HelloWorld with <i>three.js</i></h1>
      <div id="buttonDiv">
        <button onClick={toggleState}>Toggle Animation</button>
        <button onClick={toggleWireFrame}>Toggle WireFrame</button>
      </div>
      <div id="animationDiv">
        <Animation
          animationRunState={animationRunState}
          wireFrameState={wireFrameState}
        />
      </div>
      <div id="summaryDiv">
        <p>
          The goal of this assignment is to prove the architecture we'll be
          using to display WebGl 3D graphics in a web application. We want to
          show that we can successfully:
        </p>
      </div>
      <div id="listDiv">
        <ul>
          <li>Use the three.js library to create a 3D scene</li>
          <li>Render the scene to a canvas element</li>
          <li>Control the animation fo the scene</li>
          <li>All in a React app</li>
          <li>Deployed to the Web</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
