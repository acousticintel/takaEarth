//custom packs
import { motion } from "framer-motion";
//context
import { useData } from "../context/dataContext";
//custom components
import Promo from "../components/elements/promo";
import Title from "../components/elements/title";
import { AuthGuard } from "../components/elements/authGuard";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    x: -50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.95,
      duration: 0.25,
    },
  },
};

export default function Offers() {
  const { redeemFilter, offers } = useData();

  return (
    <AuthGuard>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="offers-page"
      >
        <Title title="Cashback" />
        <motion.div variants={riseVar} className="buttons-sec">
          <button className="button">Send to my Mpesa</button>
        </motion.div>
        <Title title="Offers" />
        <section>
          <motion.div variants={contVar} className="promo-section">
            {offers?.length > 0 &&
              offers.map((v, i) => <Promo p={v} key={i} index={i} />)}
          </motion.div>
          {offers?.length < 1 && (
            <div className="text-gray-400 text-center w-full font-light text-lg">
              <p>No promotions currently under {redeemFilter} points.</p>
              <p>Please check at a later date.</p>
            </div>
          )}
        </section>
      </motion.div>
    </AuthGuard>
  );
}
