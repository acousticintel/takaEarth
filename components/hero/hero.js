import Link from "next/link";
import Back from "./back";

export default function HeroFull() {
  return (
    <div className="hero">
      <div className="right">
        <div className="flex flex-col w-full justify-center items-start text-center md:text-left mt-10">
          <p className="uppercase tracking-loose w-full">Earn as you throw</p>
          <h1 className="my-4 text-4xl font-bold leading-tight">
            Recycle for Rewards
          </h1>
          <p className="leading-normal text-lg font-light mb-8">
            Connecting you to waste management partners. Login. Select Waste Type. Drop Off or Request Pick Up
          </p>
          <Link href="/profile">
            <button className="mx-auto lg:mx-0 bg-emerald-700 opacity-80 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Earn Rewards
            </button>
          </Link>
        </div>
      </div>
      <div className="left">
        <Back />
      </div>
    </div>
  );
}
