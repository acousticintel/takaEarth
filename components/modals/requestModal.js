import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//custom pack
import swal from "sweetalert";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";
//components
import SelectDropdown from "../elements/selectdropdown";
import NumberPicker from "../elements/numberPicker";
import { prodPhotos, prodSizes } from "../../context/vars";

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

const slideVar = {
  hide: {
    x: "200%",
    opacity: 1,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
      type: "spring",
      mass: 0.8,
      damping: 10,
      staggerChildren: 0.25,
    },
  },
};

const detContVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  },
};

const detailsVar = {
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
  //used for off clck detection
  const box = useRef(null);
  const [closeProtect, setCloseProtect] = useState(true);
  useOutsideAlerter(box, closeProtect);
  const { reqModal, prod, onSetReqModal, uploadRequest } = useData();

  const [panel, setPanel] = useState("size");
  const [type, setType] = useState(null);
  const [size, setSize] = useState(null);
  const [qntt, setQntt] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log(prod);
  }, [prod]);

  const onSetSize = (s) => {
    setSize(s);
    setPanel("qntt");
  };

  const getSizes = () => {
    var temp = prodSizes.find(function (r) {
      return r.name == prod.name;
    });

    if (temp) {
      return temp.sizes;
    } else {
      return [];
    }
  };

  const getSizeQ = () => {
    let s;
    switch (prod.name) {
      case "phone":
        s = "What type of phone?";
        return s;
      //break;
      case "computer":
        s = "What type of computer?";
        return s;
      //break;
      case "screens":
        s = "What type of screen?";
        return s;
      //break;
      default:
        s = "Whats the size of the containers?";
        return s;
      //break;
    }
  };

  const onSetQntt = (q) => {
    if (q >= 0) {
      setQntt(q);
    }
  };

  const doneQntt = () => {
    if (qntt > 0) {
      setPanel("type");
    }
  };

  const onSetType = (t) => {
    setType(t);
    setPanel("complete");
  }

  const uploadRequestCall = () => {
    if (loading) return;

    if (validate()) {
      setLoading(true);
      uploadRequest(size, qntt, type).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setPanel("success");
        } else if (res.status === 500) {
          setPanel("error");
        }
      });
    }
  };

  const getImageAdd = () => {
    var temp = prodPhotos.find(function (p) {
      return p.name == prod.name;
    });

    if (temp) {
      return `${temp.image}`;
    } else {
      return "";
    }
  };

  const validate = () => {
    if (qntt > 0 && size !== null && type !== null) {
      return true;
    }
    return false;
  };

  const closeModal = () => {
    setPanel("size");
    setSize(null);
    setQntt(null);
    setType(null);
    onSetReqModal(false);
  };

  return (
    <AnimatePresence className="overflow-auto">
      {reqModal && (
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
          <div className="modal__blind__cont">
            <motion.div variants={modalVar} className="modal__blind" />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div ref={box} variants={contentVar} className="modal__cont">
              <div className="request__modal">
                <div className="p-4 -ml-10" onClick={closeModal}>
                  <IoCloseCircleOutline size="1.5em" />
                </div>
                <div className="text-center my-5">
                  <div className="relative h-20">
                    <Image
                      src={`/assets/${getImageAdd()}`}
                      className="object-contain"
                      layout="fill"
                    />
                  </div>
                  <h1>Recycle Request Details</h1>
                  <AnimatePresence exitBeforeEnter>
                    {panel === "size" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        <p>{prod?.name && getSizeQ()}</p>
                        <motion.div
                          variants={detContVar}
                          className="flex flex-col"
                        >
                          {prod !== null &&
                            getSizes().map((s, i) => (
                              <motion.div
                                key={i}
                                variants={detailsVar}
                                className="option"
                                onClick={() => onSetSize(s)}
                              >
                                {s}
                              </motion.div>
                            ))}
                        </motion.div>
                      </motion.div>
                    )}
                    {panel === "qntt" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        <p>How many containers would you like to recycle?</p>
                        <motion.div
                          variants={detContVar}
                          initial="hide"
                          animate="show"
                          exit="hide"
                          className="flex flex-col"
                        >
                          <motion.div variants={detailsVar} className="option">
                            <NumberPicker setFunc={onSetQntt} />
                          </motion.div>
                          <motion.div
                            variants={detailsVar}
                            className="bg-teal-700 text-white p-4 
                            rounded-full max-w-fit mx-auto"
                            onClick={doneQntt}
                          >
                            <FaCheck size="1.5em" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                    {panel === "type" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        <p>
                          How would you like to handle pickup
                          <br />
                          (Pick requires more than 5 items for pick up)
                        </p>
                        <motion.div
                          variants={detContVar}
                          initial="hide"
                          animate="show"
                          exit="hide"
                          className="flex flex-col"
                        >
                          <motion.div
                            variants={detailsVar}
                            className="option"
                            onClick={() => onSetType("drop")}
                          >
                            Drop Off
                          </motion.div>
                          <motion.div
                            variants={detailsVar}
                            className="option"
                            onClick={() => onSetType("pick")}
                          >
                            Pick Up
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                    {panel === "complete" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        {loading ? (
                          <p className="my-20">Processing your request</p>
                        ) : (
                          <p className="my-16">
                            Check Recent History to retrieve <br />
                            QR Code required for Drop Offs <br /> or check
                            scheduled for Pick Up date
                          </p>
                        )}
                      </motion.div>
                    )}
                    {panel === "success" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        <p className="my-16">Request Submitted Successfully</p>
                      </motion.div>
                    )}
                    {panel === "error" && (
                      <motion.div
                        variants={slideVar}
                        initial="hide"
                        animate="show"
                        exit="hide"
                      >
                        <p className="my-16">Request processing Failed</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="error"></div>
                <div className="request__btn">
                  {panel && panel !== "success" && panel !== "error" && (
                    <button
                      type="button"
                      className={validate() ? "valid" : "invalid"}
                      onClick={uploadRequestCall}
                    >
                      {loading ? "Processing.." : "Complete"}
                    </button>
                  )}
                  {panel === "success" || panel === "error" ? (
                    <button
                      type="button"
                      className="valid"
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref, closeProtect) {
  const { reqModal, onSetReqModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (reqModal && closeProtect === false) onSetReqModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, reqModal, onSetReqModal, closeProtect]);
}
