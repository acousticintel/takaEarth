import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//custom pack
import swal from "sweetalert";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../context/dataContext";
//components
import SelectDropdown from "../components/elements/selectdropdown";
import NumberPicker from "../components/elements/numberPicker";
import { prodPhotos, prodCategories } from "../context/vars";
import { AuthGuard } from "../components/elements/authGuard";

const contVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      when: "beforeChildren",
    },
  },
};

const imageVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.35,
      duration: 0.5,
    },
  },
};

const txtVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.65,
      duration: 0.25,
    },
  },
};

const slideVar = {
  hide: {
    x: -50,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      mass: 0.8,
      damping: 10,
      staggerChildren: 0.25,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.25,
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
      delayChildren: 0.25,
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

export default function AddItem() {
  const router = useRouter();
  const { prod, onSetProd, addToBin, uploadRequest } = useData();

  const [panel, setPanel] = useState("size");
  const [cat, setCat] = useState(null);
  const [qntt, setQntt] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prod === undefined || prod === null) {
      router.back();
    }
  }, [prod]);

  const onSetCat = (s) => {
    setCat(s);
    setPanel("qntt");
  };

  const getCat = () => {
    var temp = prodCategories.find(function (r) {
      return r.name == prod.name;
    });

    if (temp) {
      return temp.sizes;
    } else {
      return [];
    }
  };

  const getCatQ = () => {
    let c;
    switch (prod.name) {
      case "phone":
        c = "What type of phone?";
        return c;
      //break;
      case "computer":
        c = "What type of computer?";
        return c;
      //break;
      case "screens":
        c = "What type of screen?";
        return c;
      //break;
      default:
        c = "Whats the size of the containers?";
        return c;
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

  const updateBin = () => {
    if (validate()) {
      let ord = {
        cat,
        qntt,
        name: prod.name,
        points: prod.points,
        recycleCat: prod.recycleCat,
      };

      addToBin(ord)
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Added to Bin",
              text: "Add more items then complete the request in your Bin",
              icon: "success",
              button: "Done",
            }).then((value) => {
              router.push("/profile");
            });
          } else {
            swal({
              title: "Adding Uns",
              text: `Adding to Bin failed due to: ${res}`,
              icon: "error",
              button: "Ok",
            });
          }
        })
        .catch((e) => {
          swal({
            title: "Adding Failed",
            text: `Adding to Bin failed due to: ${e}`,
            icon: "error",
            button: "Ok",
          });
        });
    }
  };

  const getImageAdd = () => {
    if (prod?.name) {
      var temp = prodPhotos.find(function (p) {
        return p.name == prod.name;
      });

      if (temp) {
        return `${temp.image}`;
      }
    }
    return "";
  };

  const validate = () => {
    if (cat !== null && qntt > 0) {
      return true;
    }
    return false;
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    setPanel("size");
    setCat(null);
    setQntt(null);
    onSetProd(null);
    router.back();
  };

  return (
    <AuthGuard>
      <div className="addItem__page">
        <div className="request__sec">
          <div className="close" onClick={handleCloseClick}>
            <IoMdArrowRoundBack size="2em" />
          </div>
          <div className="item__sec">
            <motion.div
              variants={imageVar}
              initial="hide"
              animate="show"
              className="image__cont"
            >
              <Image
                src={`/assets/${getImageAdd()}`}
                className="object-contain"
                layout="fill"
              />
            </motion.div>
            <motion.h1 variants={txtVar} initial="hide" animate="show">
              Recycle Request Details
            </motion.h1>
            <motion.div variants={contVar} initial="hide" animate="show">
              <AnimatePresence exitBeforeEnter>
                {panel === "size" && (
                  <motion.div
                    key="size"
                    variants={slideVar}
                    initial="hide"
                    animate="show"
                    exit="exit"
                  >
                    <p>{prod?.name && getCatQ()}</p>
                    <motion.div variants={detContVar} className="flex flex-col">
                      {prod !== null &&
                        getCat().map((s, i) => (
                          <motion.div
                            key={i}
                            variants={detailsVar}
                            className="option"
                            onClick={() => onSetCat(s)}
                          >
                            {s}
                          </motion.div>
                        ))}
                    </motion.div>
                  </motion.div>
                )}
                {panel === "qntt" && (
                  <motion.div
                    key="qntt"
                    variants={slideVar}
                    initial="hide"
                    animate="show"
                    exit="exit"
                  >
                    <p>How many containers would you like to recycle?</p>
                    <motion.div
                      variants={detContVar}
                      initial="hide"
                      animate="show"
                      exit="exit"
                    >
                      <motion.div variants={detailsVar} className="option">
                        <NumberPicker setFunc={onSetQntt} />
                      </motion.div>
                      <motion.div
                        variants={detailsVar}
                        className="done__btn"
                        onClick={doneQntt}
                      >
                        <FaCheck size="1.5em" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="request__btn">
            <button
              type="button"
              className={validate() ? "valid" : "invalid"}
              onClick={updateBin}
            >
              {loading ? "Processing.." : "Add of Bin"}
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
