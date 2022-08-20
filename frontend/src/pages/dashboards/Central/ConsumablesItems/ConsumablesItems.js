import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterial } from "../../../../services/materialService";


function ConsumablesItems() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();

  useEffect(() => {
    getMaterial(storeId).then(data => {
      setItems(data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <div>Consumable Item {storeId}</div>
      {items.map((index, item) => <div key={index}>{item.mname}</div>)}
    </div>
  );
}

export default ConsumablesItems;
