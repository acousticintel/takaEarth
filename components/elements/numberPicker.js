import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function NumberPicker({ setFunc}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setFunc(count);
    //console.log(count)
  }, [count]);

  const handleInc = async () => {
    let temp = count + 1;
    setCount(temp);
  };

  const handleDesc = async () => {
    let temp = count - 1;
    if (count >= 0) setCount(temp);
  };

  return (
    <div
      className="bg-white w-full px-4 flex overflow-hidden
    items-center justify-between select-none"
    >
      <span className="p-4" onMouseDown={handleDesc}>
        <FaMinus />
      </span>
      <h2 className="font-bold text-3xl">{count}</h2>
      <span className="p-4" onMouseDown={handleInc}>
        <FaPlus />
      </span>
    </div>
  );
}
