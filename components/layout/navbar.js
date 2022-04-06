import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
//custom
import Menu from "../elements/menu";
import { useData } from "../../context/dataContext";

const contVar = {
  closed: {
    y: -10,
    scale: 0.95,
    opacity: 0,
  },
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childVar = {
  closed: {
    scale: 0.95,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};
function Navbar({ router }) {
  const { data: session, status } = useSession();
  const { side, onSetSide } = useData();

  const [dropOpen, setDropOpen] = useState(false);
  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] =
    useState("transparent");
  const [textColor, setTextColor] = useState("text-emerald-900");
  const [boxShadow, setBoxShadow] = useState("drop-shadow-none");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  useEffect(() => {
    if (side) {
      setTextColor("text-lime-50");
      setBoxShadow("drop-shadow-none");
      setBackgroundTransparacy("bg-transparent");
    } else {
      setTextColor("text-emerald-900");
      setBoxShadow("shadow-sm");
      setBackgroundTransparacy("bg-emerald-50");
    }
  }, [clientWindowHeight, router, side]);

  return (
    <nav
      className={`fixed w-full z-40 top-0 transition-all duration-200 ease-in-out
      ${textColor} ${backgroundTransparacy} ${boxShadow}`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {
            //change location of logo if links exist
            //justify-center sm:justify-start
          }
          <div className="flex-1 flex items-center justify-start sm:items-stretch">
            <Link href="/" passHref={true}>
              <div className="flex items-center">
                <div className="relative w-6 h-8 mr-2">
                  <Image src="/assets/logo.png" alt="logo" layout="fill" />
                </div>
                <span
                  className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
                >
                  TAKA
                </span>
              </div>
            </Link>
          </div>

          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 
            sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            {router.pathname.indexOf("/auth/") !== 0 &&
              status !== "loading" &&
              status === "unauthenticated" && (
                <Link href="/auth/signin" passHref={true}>
                  <button
                    className={`mx-auto lg:mx-0 bg-lime-50
                    text-gray-800 font-bold rounded-full my-6 
                    py-2 px-4 shadow-md focus:outline-none 
                    focus:shadow-outline transform transition 
                    hover:scale-105 duration-300 ease-in-out`}
                    onClick={() => onSetSide(false)}
                  >
                    Login / SignUp
                  </button>
                </Link>
              )}
            {status !== "loading" && status !== "unauthenticated" && (
              <>
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image src={session.user.image} layout="fill" alt="pp" />
                </div>
                <Menu />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
