import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//custom pack
import swal from "sweetalert";
import { motion, AnimatePresence } from "framer-motion";
//custom
//import { useData } from '../../context/dataContext';

const contVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const revealVar = {
  hide: {
    scale: 0.5,
    opacity: 0,
    rotate: 45,
  },
  show: {
    scale: 1,
    opacity: 1,
    rotate: -45,
    transition: {
      delay: 1.25,
      duration: 0.25,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 50,
    scale: 0.75,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.15 * i,
      duration: 0.25,
    },
  }),
};

export default function Promo({ p, index }) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const handleRedeemClick = (e) => {
    e.preventDefault();
    //router.push('/redeem')
    swal(
      "Sold Out",
      "The offer on the selected item is currrently unavailable",
      "error"
    );
  };

  return (
    <motion.div
      variants={riseVar}
      custom={index}
      initial="hide"
      animate="show"
      className={`promo-card ${hover && "selected"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleRedeemClick}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            variants={contVar}
            exit="hide"
            initial="hide"
            animate="show"
            className="grad"
          />
        )}
      </AnimatePresence>
      <div className="content">
        <h1>{p.supplier}</h1>
        <h2>{p.name}</h2>
        <p>{p.desc}</p>
        <h3>{p.points} points</h3>
      </div>
      <div className="image">
        <Image src="/assets/samsung_promo.jpg" layout="fill" />
      </div>
      <motion.div
        variants={revealVar}
        className="tag"
      >
        <span>Sold Out</span>
      </motion.div>
    </motion.div>
  );
}
