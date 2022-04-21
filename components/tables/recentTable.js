import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
//custom
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";
import Status from "../elements/status";

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

export default function RecentTable() {
  const { onSetRecModal, requests, onSetSelRequest } = useData();

  const handleClick = (r) => {
    //console.log(r)
    onSetSelRequest(r);
    onSetRecModal(true);
  };

  useEffect(() => {
    //console.log(requests)
  }, [requests]);

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
    <div className="recent__table">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests?.slice(0, 7)?.length > 0 &&
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
                      <td className="order__list">
                        {r?.orders &&
                          r.orders.map((o, i) => {
                            return (
                              <div
                                key={i}
                                className="flex items-center justify-between grow
                                text-gray-400 py-2"
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
                      <td>
                        <Status status={r.status} />
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
