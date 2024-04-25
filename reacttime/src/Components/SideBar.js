import "./side-bar.css";
import { useContext } from "react";
import { DifficultyContext } from "../DifficultyContext";

// const difficultyRows = difficulty;

const SideBar = ({ setDifficultyChoice }) => {
  const { difficulty } = useContext(DifficultyContext);
  // console.log(difficulty, "sidebar");

  return (
    <>
      <div id="mySidepanel" className="sidepanel">
        <span className="closebtn" onClick={closeNav}>
          close &times;
        </span>
        <span
          onClick={() => setDifficultyChoice("easy")}
          className={difficulty === "easy" ? "active" : ""}
        >
          {" "}
          easy
        </span>
        <span
          onClick={() => setDifficultyChoice("medium")}
          className={difficulty === "medium" ? "active" : ""}
        >
          {" "}
          medium
        </span>
        <span
          onClick={() => setDifficultyChoice("hard")}
          className={difficulty === "hard" ? "active" : ""}
        >
          {" "}
          hard
        </span>
      </div>
      <button className="openbtn" onClick={openNav}>
        &#9776; Game
      </button>
    </>
  );
};

function openNav() {
  console.log("click open");
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  console.log("click close");
  document.getElementById("mySidepanel").style.width = "0";
}

export default SideBar;
