import Image from "next/image";
import { useEffect, useState } from "react";
import { recyclables } from "../../context/vars";
import Item from "./item";

export default function ProdSelection() {
  const [selected, setSelected] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    filteredRec();
  }, [selected]);

  function filteredRec() {
    if (selected === "all") {
      let temp = [];
      for (const rec of recyclables) {
        temp.push(...rec.types)
      }
      if (temp?.length > 0) {
        setProducts(temp);
      }
    } if (selected !== "all" && recyclables.length > 0) {
      var temp = recyclables.find(function (r) {
        return r.cat == selected; 
      });

      if (temp) {
        setProducts(temp.types);
      }
    }
  }

  return (
    <div className="product__selection">
      <ul>
        <li onClick={() => setSelected("all")}>
          <span href="#" className={selected == "all" ? "active" : ""}>
            all
          </span>
        </li>
        {recyclables?.length > 0 &&
          recyclables.map((r, i) => (
            <li key={i} onClick={() => setSelected(r.cat)}>
              <span className={selected == r.cat ? "active" : ""}>{r.cat}</span>
            </li>
          ))}
      </ul>
      <div className="list">
        {products?.length > 0 && 
        products.map((p, i) => <Item key={i} prod={p} />)}
      </div>
    </div>
  );
}
