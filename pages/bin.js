import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//custom pack
import swal from "sweetalert";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack, IoIosCloseCircleOutline } from "react-icons/io";
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

export default function Bin() {
  const router = useRouter();
  const { orders, removeFromBin, uploadRequest } = useData();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log(orders);
  }, [JSON.stringify(orders)]);

  const RequestCall = (type) => {
    if (loading) return;

    let mes;
    if (type === "pick") {
      mes = "Pick Up";
    } else if (type === "drop") {
      mes = "Drop Off";
    }

    if (validate()) {
      setLoading(true);
      uploadRequest(type)
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Request Success",
              text: `The ${mes} request was completed successfully`,
              icon: "success",
              button: "Done",
            }).then((value) => {
              router.push("/profile");
            });
          } else {
            swal({
              title: "Request Failed",
              text: `Making the request failed due to: ${res}`,
              icon: "error",
              button: "Ok",
            });
          }
        })
        .catch((e) => {
          swal({
            title: "Adding Uns",
            text: `Adding to Bin failed due to: ${e}`,
            icon: "error",
            button: "Ok",
          });
        });
    }
  };

  const removeItem = (index) => {
    if (index > -1) {
      removeFromBin(index);
    }
  };

  const getImageAdd = (name) => {
    if (name) {
      var temp = prodPhotos.find(function (p) {
        return p.name == name;
      });

      if (temp) {
        return `${temp.image}`;
      }
    }
    return "";
  };

  const validate = () => {
    let count = 0;
    orders.forEach(function (o) {
      count = count + o.qntt;
    });

    if (count >= 5) {
      return true;
    } else {
      return false;
    }
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <AuthGuard>
      <div className="bin__page">
        <div className="recycle__bin">
          <div className="close" onClick={handleCloseClick}>
            <IoMdArrowRoundBack size="2em" />
          </div>
          <div className="item__sec">
            <motion.h1 variants={txtVar} initial="hide" animate="show">
              Recycle Bin
            </motion.h1>
            <motion.div
              variants={contVar}
              className="mt-10 h-full"
              initial="hide"
              animate="show"
            >
              {orders?.length <= 0 && (
                <div className="empty">
                  <h3 className="text-3xl text-gray-400">
                    No items in your bin
                  </h3>
                </div>
              )}
              {orders?.length > 0 &&
                orders.map((o, i) => (
                  <div className="flex mb-5">
                    <div
                      className="flex items-center justify-between bg-white rounded-xl px-4 py-2 grow"
                      key={i}
                    >
                      <div className="flex items-center">
                        <div className="relative h-24 w-24">
                          <Image
                            src={`/assets/${getImageAdd(o.name)}`}
                            className="object-contain"
                            layout="fill"
                          />
                        </div>
                        <h5 className="md:ml-10 text-xl capitalize font-semibold">
                          {o.name}
                        </h5>
                      </div>
                      <h5 className="text-3xl font-semibold mr-10">{o.qntt}</h5>
                    </div>
                    <div
                      className="px-8 flex justify-center items-center"
                      onClick={() => removeItem(i)}
                    >
                      <IoIosCloseCircleOutline size="2.5em" />
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>
          <div className="error"></div>
          <div className="request__btn">
            <button
              type="button"
              className={"valid"}
              onClick={() => RequestCall("drop")}
            >
              {loading ? "Processing.." : "Drop Off"}
            </button>
            <button
              type="button"
              className={validate() ? "valid" : "invalid"}
              onClick={() => RequestCall("pick")}
            >
              {loading ? "Processing.." : "Pick Up"}
            </button>
            <span className="text-gray-400">
              You require more than 5 items to request a pick up
            </span>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
