import Image from "next/image";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";

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

export default function RecentModal() {
  const box = useRef(null);
  useOutsideAlerter(box);
  const { recModal, selRequest } = useData();
  console.log(selRequest);

  const getImageAdd = () => {
    var temp = prodPhotos.find(function (p) {
      return p.name == selRequest.prod;
    });

    if (temp) {
      return `${temp.image}`;
    } else {
      return "";
    }
  };

  return (
    <AnimatePresence className="overflow-auto">
      {recModal && (
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
                <div className="relative h-20">
                  <Image
                    src={`/assets/${getImageAdd()}`}
                    className="object-contain"
                    layout="fill"
                  />
                </div>
                <h1 className="text-xl text-center capitalize">
                  {selRequest.prod}
                </h1>
                <h1 className="text-center font-semibold">
                  Recycle Request Details
                </h1>
                <div className="bg-white px-14 py-4 my-10 rounded-md">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-normal">Size:</span>
                    <span className="text-xl font-semibold">
                      {selRequest.size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Quantity:</span>
                    <span className="font-semibold text-xl">
                      {selRequest.qntt}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref) {
  const { recModal, onSetRecModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (recModal) onSetRecModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, recModal, onSetRecModal]);
}
