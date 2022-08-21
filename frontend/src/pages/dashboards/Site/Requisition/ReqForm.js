import React, { useState } from "react";
import { requisition } from "../../../../services/materialService";

function ReqForm() {

  const [storeId, setStoreId] = useState("125");
  const [slip_no, setSlipNo] = useState("2344434324");
  const [mcode, setMcode] = useState("JNF01");
  const [mname, setMname] = useState("Jai Namaz Fahadiyya");
  const [mdescription, setMdescription] = useState("Prayer Rug designed by Artist Fahad");
  const [date, setDate] = useState("23/11/2022");
  const [uom, setUom] = useState("piece");
  const [category, setCategory] = useState("Prayer rug");
  const [quantity_req, setQuantityReq] = useState("100000");
  const [incharge_name, setInchargeName] = useState("Muhammad Ibn Musa Fahad Mahmood Al-Khwarizmi");
  const [site_location, setSiteLocation] = useState("Topsia, Kolkata, West Bengal");

  const handleSubmit = (e) => {
    e.preventDefault();

    requisition({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location })
      .then(resp => {
        console.log(resp.data);
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>ReqForm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          storeId: <input value={storeId} disabled />
        </div>

        <div>
          slip_no: <input value={slip_no} disabled />
        </div>

        <div>
          mcode: <input value={mcode} />
        </div>

        <div>
          mname: <input value={mname} />
        </div>

        <div>
          mdescription: <input value={mdescription} />
        </div>

        <div>
          date: <input value={date} />
        </div>

        <div>
          uom: <input value={uom} />
        </div>

        <div>
          category: <input value={category} />
        </div>

        <div>
          quantity_req: <input value={quantity_req} />
        </div>

        <div>
          incharge_name: <input value={incharge_name} />
        </div>

        <div>
          site_location: <input value={site_location} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReqForm;
