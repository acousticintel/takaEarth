import Image from "next/image";
import { useEffect, useState } from "react";
import { recyclables } from "../../context/vars";
import Item from "./item";

export default function ProdSelection() {
  const [selected, setSelected] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories();
    filteredRec();
  }, [selected]);

  async function getCategories() {
    if (recyclables?.length > 0) {
      let temp = [];
      recyclables.map((r)=>temp.push(r.recycleCat));

      temp = [...new Set(temp)];
      setCategories(temp);
    }
  }
  
  async function filteredRec() {
    if (selected === "all") {
      if (recyclables?.length > 0) {
        setProducts(recyclables);
      }
    } else if (selected !== "all" && recyclables.length > 0) {
      var temp = recyclables.filter(function (r) {
        return r.recycleCat == selected;
      });

      if (temp) {
        setProducts(temp);
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
        {categories?.length > 0 &&
          categories.map((c, i) => (
            <li key={i} onClick={() => setSelected(c)}>
              <span className={selected == c ? "active" : ""}>
                {c}
              </span>
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
