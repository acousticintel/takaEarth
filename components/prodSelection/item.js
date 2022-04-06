import Image from "next/image";
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";

export default function Item({prod}) {
  const { onSetProd, onSetReqModal } = useData();

  const handleClick = () => {
    onSetProd(prod);
    onSetReqModal(true);
  };

  const getImageAdd = () => {
    var temp = prodPhotos.find(function (p) {
      return p.name == prod.name;
    });
    
    if (temp) {
      return `${temp.image}`;
    }else{
      return ''
    }
  };

  return (
    <div className="item" onClick={handleClick}>
      <div className={`image__cont ${prod.back}`}>
        <Image
          src={`/assets/${getImageAdd()}`}
          className="object-contain"
          layout="fill"
          alt=""
        />
      </div>
      <div className="p-4">
        <h5>{prod.name}</h5>
        <h6>{prod.value}</h6>
      </div>
    </div>
  );
}
