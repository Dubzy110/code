import { useEffect } from "react";
import "./cell.css";

// if (e.shiftKey && !cell.revealed && bombCount > 0)

const Cell = (props) => {
  useEffect(() => {
    if (props.isRevealed) {
      props.markRevealed(props.cellIndex, true);
    }
  }, [props.isRevealed, props.id]);

  const cellClick = (e) => {
    if (e.button === 0 && e.shiftKey && !props.isRevealed) {
      props.markFlag(props.cellIndex, !props.isFlagged);
      return;
    } else if (e.button === 0 && !props.isFlagged) {
      props.markRevealed(props.cellIndex, true);
      console.log(props.cellIndex);
      // if its not a mine check squares
      if (!props.isMine) {
        props.logic(props.cellIndex);
      }
    }
    //if it is a mine. lose game
    if (
      (!props.isRevealed && props.isMine && !props.isFlagged) ||
      (props.isRevealed && props.isMine && !props.isFlagged)
    ) {
      setTimeout(props.loss, 100);
    }
  };
  // cell class thing
  return (
    <div
      className={`cell ${
        props.isFlagged
          ? "flagged-cell"
          : props.isMine
          ? // && isRevealed
            "mined-cell"
          : props.isRevealed
          ? "revealed-cell"
          : ""
      }`}
      style={{ width: props.cellWidth, height: props.cellHeight }}
      onClick={cellClick}
    >
      {props.isFlagged ? "X" : ""}
      {props.isRevealed && props.isMine ? "!!!" : ""}
      {props.mineCount ? `${props.mineCount}` : ""}
    </div>
  );
};

export default Cell;
