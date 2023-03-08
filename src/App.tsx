import React from "react";
import "./App.css";
import { Elements } from "./components/Elements/Elements";
import { Canvas } from "./components/Canvas/Canvas";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="mx-56 my-20 px-15 py-10 flex">
        <Elements></Elements>
        <Canvas></Canvas>
      </div>
    </Provider>
  );
}

export default App;
