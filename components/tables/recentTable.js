import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
//custom
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";

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
                  <th scope="col">Quantity</th>
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
                      <td className="flex justify-center items-center">
                        <div className="relative h-8 w-8">
                          <Image
                            src={`/assets/${getImageAdd(r.prod)}`}
                            className="object-contain"
                            layout="fill"
                          />
                        </div>
                        {`${r.prod} ${r.size}`}
                      </td>
                      <td>{r.qntt}</td>
                      <td className="pending">Pending</td>
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
