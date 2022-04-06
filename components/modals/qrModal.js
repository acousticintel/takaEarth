import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const modalVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.5,
    transition: {
      duration: 0.35,
    },
  },
};

const contentVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function QrModal() {
  const box = useRef(null);
  useOutsideAlerter(box);
  const { qrModal, selRequest } = useData();
  const [pic, setPic] = useState();

  useEffect(() => {
    var QRCode = require("qrcode");

    QRCode.toDataURL(
      "some text",
      { errorCorrectionLevel: "H" },
      function (err, url) {
        if (url) {
          setPic(url);
        }
      }
    );
  }, []);

  return (
    <AnimatePresence className="overflow-auto">
      {qrModal && (
        <motion.div
          variants={contVar}
          initial="hide"
          animate="show"
          exit="hide"
          className="modal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div variants={modalVar} className="modal__blind" />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div
              ref={box}
              variants={contentVar}
              className="relative inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="px-10 sm:px-20 py-10">
                <h1 className="text-xl font-extrabold uppercase text-center">
                  Please show this code to the attendant
                </h1>
                {pic && (
                  <div className="relative h-96 w-96 my-5 rounded-lg overflow-hidden">
                    <Image src={pic} layout="fill" />
                  </div>
                )}
                <p className="text-gray-400">
                  This allows us to verify and assign points to your account.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref) {
  const { qrModal, onSetQrModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (qrModal) onSetQrModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, qrModal, onSetQrModal]);
}
