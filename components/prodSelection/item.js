import Image from "next/image";
import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import { prodPhotos } from "../../context/vars";

export default function Item({prod}) {
  const router = useRouter();
  const { onSetProd } = useData();

  const handleClick = () => {
    onSetProd(prod);
    //onSetReqModal(true);
    router.push("/addItem");
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
