import React, { useEffect, useState } from "react";
import { getLoans } from "../../../../service/loanService";

function LoanReqTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getLoans(storeId)
      .then((resp) => {
        setItems(resp.items);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>LoanReqTable</div>;
}

export default LoanReqTable;
