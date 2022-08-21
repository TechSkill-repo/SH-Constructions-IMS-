import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMaterial } from "../../../../services/materialService";

function NonConsumable() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "non-consumable";

  useEffect(() => {
    getMaterial(storeId, category).then(data => {
      setItems(data.items);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <div>Non-Consumable Item {storeId}</div>
      {items.map((item, index) => <div key={index}>{item.mname}</div>)}
    </div>
  );
}

export default NonConsumable;
