import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//custom
import QRCode from "qrcode";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

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
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function EventModal() {
  const [panel, setPanel] = useState("prod");
  const [prod, setProd] = useState(null);
  const [qr, setQr] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      QRCode.toDataURL(
        JSON.stringify({ user: session.user, prod }),
        { errorCorrectionLevel: "H" },
        function (err, url) {
          if (url) {
            setQr(url);
          }
        }
      );
    }
  }, [prod, session]);

  const setProduct = (p) => {
    setProd("p");
    setPanel("qr");
  };

  const closeModal = (e) => {
    if(e.target.checked === false){
      setPanel('prod');
      setProd(null);
      setQr(null);
    }
  };

  return (
    <div>
      <input type="checkbox" onChange={closeModal} id="event_modal" className="modal-toggle" />
      <label htmlFor="event_modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="event_modal"
            className="btn btn-outline btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="event__modal">
            <h1>Event Recycle Request Details</h1>
            <AnimatePresence exitBeforeEnter>
              {panel === "prod" && (
                <div key="prod" initial="hide" animate="show" exit="exit">
                  <p>What item do you wish to recycle?</p>
                  <div className="grid grid-col-1 gap-6">
                    <div
                      onClick={setProduct}
                      className="bg-gray-100 shadow-md p-8 mx-auto rounded-2xl"
                    >
                      <div className="relative h-32 w-32">
                        <Image
                          src={`/assets/partycup.webp`}
                          className="object-cover"
                          layout="fill"
                        />
                      </div>
                      <h2>Party Cup</h2>
                    </div>
                    <div className="bg-gray-100 shadow-md p-8 mx-auto rounded-2xl">
                      <div className="relative h-32 w-32">
                        <Image
                          src={`/assets/can.webp`}
                          className="object-cover"
                          layout="fill"
                        />
                      </div>
                      <h2>Aluminium Cans</h2>
                    </div>
                  </div>
                </div>
              )}
              {panel === "qr" && (
                <div key="qr" initial="hide" animate="show" exit="exit">
                  <p>Please show this code to the attendant</p>
                  {qr && (
                    <div className="relative h-96 w-full">
                      <Image
                        src={qr}
                        layout="fill"
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </label>
      </label>
    </div>
  );
}
