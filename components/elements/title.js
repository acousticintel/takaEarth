import Image from "next/image";
import { motion } from "framer-motion";

const contVar = {
  hide: {},
  show: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.5,
      staggerChildren: 0.15,
    },
  },
};

const scaleVar = {
  hide: {
    y:-5,
    opacity: 0,
    scale: 0.95,
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const slideVar = {
  hide: {
    opacity: 0,
    x: -5,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Title({ title }) {
  return (
    <motion.div 
    variants={contVar} 
    initial="hide" 
    animate="show"
    className="flex relative">
      <motion.div variants={scaleVar} className="absolute -bottom-2 -left-3">
        <Image src="/assets/leaf.webp" height={20} width={35} />
      </motion.div>
      <motion.span variants={slideVar} className="text-2xl text-green-600 ml-5">{title}</motion.span>
    </motion.div>
  )
}
