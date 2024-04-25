import "./App.css";
import { useState } from "react";
import Grid from "./Components/Grid";
import SideBar from "./Components/SideBar";
import { DifficultyContext } from "./DifficultyContext";
import RestartButton from "./Components/RestartButton";

// import Cell from "./Components/Cell";
const App = () => {
  const [difficultyChoice, setDifficultyChoice] = useState("easy");
  const value = { difficulty: difficultyChoice };
  return (
    <DifficultyContext.Provider value={value}>
      <SideBar setDifficultyChoice={setDifficultyChoice}></SideBar>
      <h1>hellloooooo</h1>
      <Grid />

    </DifficultyContext.Provider>
  );
};

export default App;
