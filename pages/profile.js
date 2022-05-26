import Image from "next/image";
import { useRouter } from "next/router";
//custom pack
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
//custom func
import { useData } from "../context/dataContext";
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Modal from "../components/modals/requestModal";
import PointsSection from "../components/points";
import RecentSection from "../components/recent";
import RecentModal from "../components/modals/recentModal";
import QrModal from "../components/modals/qrModal";
import ProdSelection from "../components/prodSelection";

const contVar = {
  hide: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { onSetQrModal, onSetReqModal } = useData();

  const handleHistoryClick = (e) => {
    e.preventDefault();
    router.push("/rates");
  };

  return (
    <AuthGuard>
      <motion.div
        className="profile-page"
        variants={contVar}
        initial="hide"
        animate="show"
      >
        <RecentModal />
        <QrModal />
        <Modal session={session} />
        <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
        <div className="flex gap-4 flex-col md:flex-row px-6">
          <div
            className="bg-teal-100 rounded-xl w-full md:w-2/3 p-4 
          overflow-hidden max-h-52 shadow-lg"
          >
            <h1 className="text-2xl text-gray-600 font-semibold">
              What would you like to recycle with us today?
            </h1>
            <div className="relative mt-4 max-w-fit float-right">
              <Image src="/assets/bin.png" width={130} height={160} alt="" />
            </div>
          </div>
          <div
            className="bg-amber-800 bg-opacity-30 rounded-xl w-full 
          md:w-1/3 p-4 overflow-hidden max-h-52 shadow-lg"
            onClick={() => onSetQrModal(true)}
          >
            <h1 className="text-md text-white font-semibold w-4/5">
              Drop Off at our nearest partner store
            </h1>
            <div className="relative mt-10 max-w-fit float-right">
              <Image src="/assets/drop.webp" width={130} height={150} alt="" />
            </div>
          </div>
        </div>
        <ProdSelection />
        <motion.div className="buttons-sec" variants={riseVar}></motion.div>
        <motion.section variants={riseVar}>
          <PointsSection />
        </motion.section>
        <motion.section variants={riseVar}>
          <RecentSection />
        </motion.section>
      </motion.div>
    </AuthGuard>
  );
}
