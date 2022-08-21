import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterial } from "../../../../services/materialService";


function ConsumablesItems() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "consumable";

  useEffect(() => {
    getMaterial(storeId, category).then(data => {
      setItems(data.items);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <div>Consumable Item {storeId}</div>
      {items.map((item, index) => <div key={index}>{item.mname}</div>)}
    </div>
  );
}

export default ConsumablesItems;
