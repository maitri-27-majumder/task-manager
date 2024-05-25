import { useState } from "react";
import "./App.scss";
import TaskManager from "./containers/TaskManager";
import "./stylesheets/styles.scss";

function App() {
  return (
    <div className="app__wrapper">
      <div className="app__overlay"></div>
      <TaskManager />
    </div>
  );
}

export default App;
