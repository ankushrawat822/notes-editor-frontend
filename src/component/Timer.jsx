import React , {useState , useEffect} from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { BiSolidHide } from "react-icons/bi";
import { IoMdTimer } from "react-icons/io";


function Timer() {
  const [timeLeft, setTimeLeft] = useState( 45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            alert("Time to take a break!");
            setIsRunning(false);
            return 45 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const resetTimer = () => {
    setTimeLeft(45 * 60);
    setIsRunning(false);
  };

  return (
    <div className=" font-roboto">
      {isVisible ? (
        <div className="bg-[#222F3E] p-6 rounded-2xl shadow-lg border border-[#333] w-[200px]">
          <div className="text-4xl font-bold text-white mb-4 text-center">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTimer}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isRunning ? (
                <FaPause/>
              ) : (
                <FaPlay />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 bg-[#4b5563] hover:bg-[#374151] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <GrPowerReset/>
            </button>
            <button
              onClick={toggleVisibility}
              className="flex-1 bg-[#4b5563] hover:bg-[#374151] text-white px-4 py-2 rounded-lg transition-colors"
            >
               <BiSolidHide></BiSolidHide>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleVisibility}
          className="bg-[#222F3E] p-1 rounded-full shadow-lg border border-[#333] hover:bg-[#2c2c2c] transition-colors"
        >
           <IoMdTimer className="text-white text-2xl" />
        </button>
      )}
    </div>
  );
}

export default Timer;