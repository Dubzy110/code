import "./grid.css";
import Cell from "./Cell";
import { useEffect, useState, useContext, useCallback } from "react";
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
  const [isWon, setIsWon] = useState(false);

  const reset = useCallback(() => {
    setIsWon(false);
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
  }, [cellTotal]);

  useEffect(() => {
    reset();
  }, [cellsPerRow, difficulty, reset]);

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

  const surrounding = (cellIndex) => {
    const getSurroundingCellIndexes = [];

    const hasLeft = cellIndex % cellsPerRow !== 0;
    if (hasLeft) {
      getSurroundingCellIndexes.push(cellIndex - 1);
    }

    const hasUp = cellIndex - cellsPerRow > -1;
    if (hasUp) {
      getSurroundingCellIndexes.push(cellIndex - cellsPerRow);
    }

    const hasRight = cellIndex % cellsPerRow !== cellsPerRow - 1;
    if (hasRight) {
      getSurroundingCellIndexes.push(cellIndex + 1);
    }

    const hasDown = cellIndex + cellsPerRow < cellTotal;
    if (hasDown) {
      getSurroundingCellIndexes.push(cellIndex + cellsPerRow);
    }

    //split here!

    const hasUpLeft = hasUp && hasLeft;
    if (hasUpLeft) {
      getSurroundingCellIndexes.push(cellIndex - cellsPerRow - 1);
    }

    const hasUpRight = hasUp && hasRight;
    if (hasUpRight) {
      getSurroundingCellIndexes.push(cellIndex - cellsPerRow + 1);
    }

    const hasDownRight = hasDown && hasRight;
    if (hasDownRight) {
      getSurroundingCellIndexes.push(cellIndex + cellsPerRow + 1);
    }

    const hasDownLeft = hasDown && hasLeft;
    if (hasDownLeft) {
      getSurroundingCellIndexes.push(cellIndex + cellsPerRow - 1);
    }
    console.log(getSurroundingCellIndexes, "directional options");
    return getSurroundingCellIndexes;
  };

  const logicCheck = (cellIndex, alreadyCheckedCells = []) => {
    console.log(cellIndex, "onwards!!");
    if (alreadyCheckedCells.includes(cellIndex)) {
      return;
    }
    const surroundingIndexes = surrounding(cellIndex);
    alreadyCheckedCells.push(cellIndex);

    const mineCounter = surroundingIndexes.reduce(
      (accum, cellIndex) => accum + (cellMap[cellIndex].isMine ? 1 : 0),
      0
    );

    // console.log(mineCounter, "mine mine mine");

    if (mineCounter > 0) {
      setCellMap((current) => {
        const updatedMap = current.map((val, i) => ({
          ...val,
        }));
        updatedMap[cellIndex].mineCount = mineCounter;
        updatedMap[cellIndex].isRevealed = true;
        return updatedMap;
      });
      return;
    }

    surroundingIndexes.forEach((cellIndex) => {
      logicCheck(cellIndex, alreadyCheckedCells);
    });

    setCellMap((current) => {
      const updatedMap = current.map((val) => ({
        ...val,
      }));
      updatedMap[cellIndex].mineCount = mineCounter;

      if (mineCounter === 0) {
        updatedMap[cellIndex].isRevealed = true;
      }
      return updatedMap;
    });
    return;
  };

  const winCondition = () => {
    setCellMap((current) => {
      const updatedMap = current.map((val) => ({
        ...val,
        isRevealed: true,
      }));
      return updatedMap;
    });
    setIsWon(true);
    setTimeout(() => {
      alert("You Win!");
    }, 100);
  };

  useEffect(() => {
    if (!cellMap.length) {
      return;
    }
    if (isWon) {
      return;
    }
    for (let i = 0; i < cellMap.length; i++) {
      if (!cellMap[i].isMine && cellMap[i].isFlagged) {
        console.log(cellMap.length);
        return;
      }
      if (cellMap[i].isMine && !cellMap[i].isFlagged) {
        return;
      }
    }
    console.log("good");
    winCondition();
  }, [cellMap]);

  const loss = () => {
    setCellMap((current) => {
      const updatedMap = current.map((val) => ({
        ...val,
        isRevealed: true,
        isFlagged: false,
      }));
      return updatedMap;
    });
    alert("game over!");
    console.log("game over");
  };
  const styles = {
    width: cellsPerRow * cellWidth,
    height: cellsPerRow * cellHeight,
  };

  const markFlag = (i, isFlagged) => {
    setCellMap((current) => {
      const updatedMap = current.map((val) => ({
        ...val,
      }));
      updatedMap[i].isFlagged = isFlagged;
      return updatedMap;
    });
  };

  const markRevealed = (i, isRevealed) => {
    setCellMap((current) => {
      const updatedMap = current.map((val) => ({
        ...val,
      }));
      updatedMap[i].isRevealed = isRevealed;
      return updatedMap;
    });
  };

  return (
    <div className="container" style={styles}>
      {cellMap.map((mined, i) => (
        <Cell
          markRevealed={markRevealed}
          markFlag={markFlag}
          flagCount={mined.flagCount}
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
