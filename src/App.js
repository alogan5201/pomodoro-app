import { useEffect, useState } from "react";
import { useList, useLocalStorage } from "react-use";
import useSound from "use-sound";
import "./App.css";
import Button from "./components/Button/button";
import ClockTimer from "./components/ClockTimer/clockTimer";
import Navbar from "./components/Navbar/navbar";
import Settings from "./components/Settings/settings";
import Tomato from "./components/Tomato/tomato";
import timesUpSfx from "./sounds/notification.mp3";

function App() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [timerMode, setTimerMode] = useState("pomo");

  const [pomoLength, setPomoLength] = useState(0.1);
  const [shortLength, setShortLength] = useState(5);
  const [longLength, setLongLength] = useState(15);

  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("START");

  const [halfTomatoValue, setHalfTomatoValue] = useLocalStorage(
    "half-tomato",
    0
  );
  const [fullTomatoValue, setFullTomatoValue] = useLocalStorage(
    "full-tomato",
    0
  );

  const [list, { set, push, updateAt }] = useList([]);
  const [volume] = useState(1);
  const [timesUp] = useSound(timesUpSfx, {
    volume: volume
  });

  const [workSessions, setWorkSessions] = useState(0);

  const [breakSessions, setBreakSession] = useState(0);

  const lastIndex = (arr, predicate) =>
    arr.reduce((prev, curr, index) => (predicate(curr) ? index : prev), -1);
  const isOdd = (n) => n % 2 !== 0;
  const handleModeChange = (mode) => {
    setTimerMode(mode);
    setIsActive(false);
    setButtonText("Start Work Session");
    switch (mode) {
      case "short":
        setSecondsLeft(shortLength * 60);
        setButtonText("Start Short Break");
        break;
      case "long":
        setSecondsLeft(longLength * 60);
        setButtonText("Start Long Break");
        break;
      default:
        setSecondsLeft(pomoLength * 60);
    }
  };
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  function TomatosList() {
    const listItems = list.map((item) => (
      <div className="lg:w-1/6 md:w-1/6 p-0  ">
        <div className="mt-4">
          <Tomato type={item} />
        </div>
      </div>
    ));
    return listItems;
  }
  function addTomatos(name, length) {
    let newArr = [];

    for (let index = 0; index < length; index++) {
      newArr.push(name);
    }
    return newArr;
  }
  useEffect(() => {
    if ((list.length === 0 && halfTomatoValue > 0) || fullTomatoValue > 0) {
      let fullTomatos = range(1, fullTomatoValue);

      let list2 = addTomatos("full-tomato", fullTomatos.length);

      if (halfTomatoValue > 0) {
        list2.push("half-tomato");
      }

      let totalSessions = halfTomatoValue + fullTomatoValue;
      setWorkSessions(totalSessions);
      set(list2);
    }

    setTimeout(() => {
      console.log(list);
    }, 500);
    //   return () => {
    //   addTomatos()
    // };
  }, [halfTomatoValue, fullTomatoValue, list, set]);

  function updateTomatos(count) {
    let odd = isOdd(count);


    if (odd) {
      let newCount = halfTomatoValue + 1;

      setHalfTomatoValue(newCount);

      push("half-tomato");
      console.log(halfTomatoValue);
    } else if (!odd) {
      let newCount = fullTomatoValue + 1;
      setHalfTomatoValue(0);
      setFullTomatoValue(newCount);
      let index = lastIndex(list, (i) => i === "half-tomato");
      console.log(list);
      updateAt(index, "full-tomato");
    }
  }
  function updateSet() {
    const breaks = breakSessions < 3 ? "short" : "long";
    const switchMode = timerMode === "pomo" ? breaks : "pomo";
    if (timerMode === "pomo") {
      // setWorkSessions((workSessions) => workSessions + 1);
      let newCount = workSessions + 1;
      console.log(newCount);
      setWorkSessions(newCount);
      updateTomatos(newCount);
    } else if (timerMode === "short") {
      setBreakSession((breakSessions) => breakSessions + 1);
    } else if (timerMode === "long") {
      setBreakSession(0);
    }
    handleModeChange(switchMode);
  }

  useEffect(() => {
    // ! Functions will keep calling when clock is Active
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsActive(false);
        setButtonText("");
        updateSet();
        // handleModeChange(switchMode);

        timesUp();
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft, timesUp]);

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible);
  };

  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  const calcPercentage = () => {
    if (timerMode === "pomo") {
      return (secondsLeft / (pomoLength * 60)) * 100;
    }
    if (timerMode === "short") {
      return (secondsLeft / (shortLength * 60)) * 100;
    }
    if (timerMode === "long") {
      return (secondsLeft / (longLength * 60)) * 100;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        settingsBtn={
          <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
        }
        toggleVisibility={toggleSettingsVisibility}
      />
      <div className="pomodoro-app container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <ClockTimer
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          percentage={calcPercentage()}
          timeLeft={formatTimeLeft(secondsLeft)}
          isActive={isActive}
          setIsActive={setIsActive}
          buttonText={buttonText}
          setButtonText={setButtonText}
          volume={volume}
          pomoLength={pomoLength}
          setPomoLength={setPomoLength}
          shortLength={shortLength}
          setShortLength={setShortLength}
          longLength={longLength}
          setLongLength={setLongLength}
          setSecondsLeft={setSecondsLeft}
        />
        <Settings
          visible={settingsVisible}
          toggleSettingsVisibility={toggleSettingsVisibility}
          pomoLength={pomoLength}
          setPomoLength={setPomoLength}
          shortLength={shortLength}
          setShortLength={setShortLength}
          longLength={longLength}
          setLongLength={setLongLength}
          closeSettings={toggleSettingsVisibility}
          setSecondsLeft={setSecondsLeft}
          timerMode={timerMode}
        />
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto bg-white mt-5 w-96">
            <div className="flex flex-wrap -m-4 max-w-sm">
              {" "}
              <TomatosList />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
