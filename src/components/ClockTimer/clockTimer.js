import React from "react";
import {
  buildStyles, CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const ClockTimer = ({

  timerMode,
  percentage,
  timeLeft,
  isActive,
  setIsActive,
  buttonText,
  setButtonText,


}) => {

  



  let hideWater = percentage === 100 ? 0 : percentage === 0 ? 0 : 1;
  const waterStyle = {
    top: `${percentage}%`,
    opacity: hideWater
  };


  const handleClick = (event) => {
  


    if (timeLeft === "0:00") {
      console.log("🚀 ~ timeLeft", timeLeft)

      return null;
    }

    setIsActive(!isActive);
    console.log(buttonText)
    setButtonText(
      buttonText === "START" || buttonText === "RESUME" || buttonText.length >  8 ? "PAUSE" : "RESUME"
    );
  };

  let timesUpMsg = timerMode === "pomo" ? "break time" : "back to work!";

  let timeText =
    timeLeft === "0:00" ? `${timesUpMsg}` : timeLeft;

  let textSize = timeLeft === "0:00" ? "12px" : "28px";

  return (
    <div>
      <div className="timer myTimer mb-7" onClick={handleClick}>
        <div className="timer__display">
          <div className="fu-progress">
            <div className="fu-inner">
              <CircularProgressbarWithChildren
                value={percentage}
                text={timeText}
                strokeWidth={4}
                styles={buildStyles({
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
                  // Colors & Fonts
                  pathColor: "white",
                  textColor: "var(--text)",
                  textSize: textSize,
                  fontFamily: "var(--font-current)",
                  trailColor: "none"
                })}
              >
                <button className="display__start-pause" onClick={handleClick}>
                  {buttonText}
                </button>
              </CircularProgressbarWithChildren>
              <div className="water" style={waterStyle}></div>
              <div className="glare"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockTimer;
