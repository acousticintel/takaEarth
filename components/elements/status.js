import { useEffect, useState } from "react";

export default function Status({ status }) {
  const [back, setBack] = useState("bg-amber-100");
  const [txt, setTxt] = useState("text-amber-600");

  const onSetColors = (c) => {
    let s = `bg-${c}-100`;
    let t = `text-${c}-600`;
    setBack(s);
    setTxt(t);
  };

  useEffect(() => {
    if (
      status === "pending" &&
      back !== "bg-amber-100" &&
      txt !== "text-amber-600"
    ) {
      onSetColors("amber");
    } else if (
      status === "confirmed" &&
      back !== "bg-green-100" &&
      txt !== "text-green-600"
    ) {
      onSetColors("green");
    } else if (
      status === "cancelled" &&
      back !== "bg-red-100" &&
      txt !== "text-red-600"
    ) {
      onSetColors("red");
    }
  }, [status]);
  return (
    <div className={`py-2 px-4 rounded-full max-w-fit mx-auto ${back}`}>
      <span className={`${txt}`}>{status}</span>
    </div>
  );
}
