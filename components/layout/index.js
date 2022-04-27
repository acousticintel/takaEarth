import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
//custom
import Navbar from "./navbar";
import Footer from "./footer";
import Banner from "./banner";
import SideMenu from "../layout/sideMenu";

const variants = {
  hide: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};

export default function Layout({ children, path }) {
  //console.log(router.route)
  return (
    <>
      <Head>
        <title>Taka. Earn as you throw waste.</title>
      </Head>
      <SideMenu />
      <Navbar />
      <Banner />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        //onExitComplete={() => console.log("done")}
      >
        <motion.main
          key={path}
          initial="hide"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "easeIn", duration: 0.25 }}
          className="page-content"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
