import Image from "next/image";
import { motion } from "framer-motion";
//custom
import { useData } from "../context/dataContext";
import { AuthGuard } from "../components/elements/authGuard";
import Title from "../components/elements/title";
import { prodPhotos } from "../context/vars";
import RecentModal from "../components/modals/recentModal";

const childVar = {
  hide: {
    y: 5,
    scale: 0.95,
    opacity: 0,
  },
  show: (i) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function History() {
  const { requests, onSetSelRequest, onSetRecModal } = useData();

  const handleClick = (r) => {
    //console.log(r)
    onSetSelRequest(r);
    onSetRecModal(true);
  };

  const getImageAdd = (name) => {
    var temp = prodPhotos.find(function (p) {
      return p.name == name;
    });

    if (temp) {
      return `${temp.image}`;
    } else {
      return "";
    }
  };

  return (
    <AuthGuard>
      <RecentModal />
      <div className="history-page">
        <Title title="History" />
        <section className="hist__table">
          <table>
            <thead>
              <tr>
                <th scope="col">Items</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests?.length > 0 &&
                requests.map((r, i) => (
                  <motion.tr
                    variants={childVar}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={i}
                    key={i}
                    onClick={() => handleClick(r)}
                  >
                    <td>
                      {r?.orders &&
                        r.orders.map((o, i) => {
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between grow text-gray-400"
                            >
                              <div className="flex items-center">
                                <div className="relative h-8 w-8">
                                  <Image
                                    src={`/assets/${getImageAdd(o.name)}`}
                                    className="object-contain"
                                    layout="fill"
                                  />
                                </div>
                                <h5 className="md:ml-10 capitalize">
                                  {o.name}
                                </h5>
                              </div>
                              <h5 className="ml-8 mr-5">{o.qntt}</h5>
                            </div>
                          );
                        })}
                    </td>
                    <td className="pending">{r.status}</td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </AuthGuard>
  );
}
