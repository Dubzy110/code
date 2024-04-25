import { useEffect, useState } from "react";
import "./cell.css";

// if (e.shiftKey && !cell.revealed && bombCount > 0)

const Cell = (props) => {
  const [isFlagged, setIsFlagged] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [id, setid] = useState(props.id);
  useEffect(() => {
    if (props.isRevealed) {
      setIsRevealed(true);
    }
  }, [props.isRevealed, isRevealed, id]);

  useEffect(() => {
    if (props.isFlagged) {
      setIsFlagged(true);
    }
  }, [props.isFlagged, isFlagged, id]);

  const cellClick = (e) => {
    if (e.button === 0 && e.shiftKey && !isRevealed) {
      setIsFlagged(!isFlagged);
      return;
    } else if (e.button === 0 && !isFlagged) {
      setIsRevealed(true);
      console.log(props.cellIndex);
      // if its not a mine check squares
      // if (!props.isMine) {
      props.logic(props.cellIndex);
      // }
    }
    //if it is a mine. lose game
    if (
      (!isRevealed && props.isMine && !isFlagged) ||
      (isRevealed && props.isMine && !isFlagged)
    ) {
      setTimeout(props.loss, 100);
    }
  };
  // cell class thing
  return (
    <div
      className={`cell ${
        isFlagged
          ? "flagged-cell"
          : isRevealed
          ? "revealed-cell"
          : // : isNumbered
            // ? "isNumbered"
            ""
      }`}
      style={{ width: props.cellWidth, height: props.cellHeight }}
      onClick={cellClick}
    >
      {isFlagged ? "X" : ""}
      {isRevealed && props.isMine ? "!!!" : ""}
      {props.mineCount ? `${props.mineCount}` : ""}
    </div>
  );
};

export default Cell;
