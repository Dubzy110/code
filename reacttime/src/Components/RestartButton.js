import "./restartbutton.css";
const RestartButton = ({ reset }) => {
  return (
    <div className="tim">
      <button
        className="button"
        onClick={() => {
          console.log("reset");
          reset();
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default RestartButton;
