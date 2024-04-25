import "./grid.css";
import Cell from "./Cell";
// import difficultyRows from "./Game";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { DifficultyContext } from "../DifficultyContext";
import RestartButton from "./RestartButton";

const cellWidth = 50;
const cellHeight = 50;
const cellRatio = 0.15;

const Grid = () => {
  const { difficulty } = useContext(DifficultyContext);
  const [cellsPerRow, setCellsPerRow] = useState(0);
  const [cellMap, setCellMap] = useState([]);
  const cellTotal = cellsPerRow * cellsPerRow;

  const reset = () => {
    const result = [...Array(cellTotal)].map((_, i) => ({
      isMine: false,
      isFlagged: false,
      isRevealed: false,
      cellIndex: i,
      id: (Math.random() * 1_000_000).toFixed(),
    }));
    if (!result.length) {
      setCellMap(result);
      return;
    }
    const mineTotal = Math.round(cellTotal * cellRatio);

    let loopCounter = 0;
    let counter = 0;

    while (counter < mineTotal && loopCounter < mineTotal * 10) {
      loopCounter++;
      const mineIndex = Math.floor(Math.random() * (cellTotal - 1));
      // console.log(mineIndex);
      // console.log(cellTotal);
      // console.log(result.length);
      if (result[mineIndex].isMine) {
        continue;
      }
      // console.log(mineIndex, "end of while loop", mineTotal); //console bits
      result[mineIndex].isMine = true;
      counter++;
    }

    setCellMap(result);
    console.log("reset cell map");
    console.log(difficulty);
  };
  useEffect(() => {
    reset();
  }, [cellsPerRow, difficulty]);

  useEffect(() => {
    const difficulties = () => {
      if (difficulty === "easy") {
        setCellsPerRow(9);
      } else if (difficulty === "medium") {
        setCellsPerRow(16);
      } else if (difficulty === "hard") {
        setCellsPerRow(30);
      }
    };
    difficulties();
  }, [difficulty]);

  //check ajacent cells
  //update cell map
  //place numbers

  let logicIsMine = "";
  const logicCheck = (cellIndex) => {
    let mineCounter = 0;
    const checkSquare = (cellIndex) => {
      const cell = cellMap[cellIndex];
      return cell.isMine ? 1 : 0;
    };


    const updateCellList = 4
    const directional = () => {
      const Cell = cellMap[cellIndex];
      //if this cell is not on the right wall, check the right side.
      const hasRight = cellIndex % cellsPerRow !== cellsPerRow - 1;
      if (hasRight) {
        const result = checkSquare(cellIndex + 1);
        mineCounter += result;
        console.log(result, "right mine");
      }

      //if this cell is not on the left wall, check the left side.
      const hasLeft = cellIndex % cellsPerRow !== 0;
      if (hasLeft) {
        const result = checkSquare(cellIndex - 1);
        mineCounter += result;
        console.log(result, "left mine");
      }

      //check the cell above
      const hasUp = cellIndex - cellsPerRow > -1;
      if (hasUp) {
        const result = checkSquare(cellIndex - cellsPerRow);
        mineCounter += result;
        console.log(result, "up mine");
      }

      //check the cell below
      const hasDown = cellIndex + cellsPerRow < cellTotal;
      if (hasDown) {
        const result = checkSquare(cellIndex + cellsPerRow);
        mineCounter += result;
        console.log(result, "down mine");
      }

      if (hasLeft && hasUp) {
        const result = checkSquare(cellIndex - cellsPerRow - 1);
        mineCounter += result;
        console.log(result, "up left mine");
      }

      if (hasRight && hasUp) {
        const result = checkSquare(cellIndex - cellsPerRow + 1);
        mineCounter += result;
        console.log(result, "up right mine");
      }

      if (hasLeft && hasDown) {
        const result = checkSquare(cellIndex + cellsPerRow - 1);
        mineCounter += result;
        console.log(result, "down left mine");
      }

      if (hasRight && hasDown) {
        const result = checkSquare(cellIndex + cellsPerRow + 1);
        mineCounter += result;
        console.log(result, "down right mine");
      }
    };

    console.log(mineCounter, "mines present");
    const updatedMap = cellMap.map((val) => ({
      ...val,
      // isRevealed: true,
      // isFlagged: false,
    }));
    updatedMap[cellIndex].mineCount = mineCounter;

    if (mineCounter === 0) {
      updatedMap[cellIndex].isRevealed = true;
    }
    //************* */
    setCellMap(updatedMap);
    return;
  };

  const loss = () => {
    const updatedMap = cellMap.map((val) => ({
      ...val,
      isRevealed: true,
      isFlagged: false,
    }));
    setCellMap(updatedMap);
    // alert("game over!");
    console.log("game over");
  };
  const styles = {
    width: cellsPerRow * cellWidth,
    height: cellsPerRow * cellHeight,
  };
  return (
    <div className="container" style={styles}>
      {cellMap.map((mined, i) => (
        <Cell
          logic={logicCheck}
          loss={loss}
          mineCount={mined.mineCount}
          isMine={mined.isMine}
          isFlagged={mined.isFlagged}
          isRevealed={mined.isRevealed}
          cellWidth={cellWidth - 2}
          cellHeight={cellHeight - 2}
          cellIndex={i}
          key={`${i}-${mined.id}`}
          id={mined.id}
        />
      ))}
      <RestartButton reset={reset} />
    </div>
  );
};

export default Grid;
