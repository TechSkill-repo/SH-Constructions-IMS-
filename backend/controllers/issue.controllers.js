const db = require('./db.controllers');

const issueConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId, slip_no, quantity_req, quantity_aprv } = req.body;

  const query = db.collection("consumable-inv").where("mcode", "==", mcode);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req)) > current_stock) {
          res.status(403).json({ message: "Quantity unavailable" });
        } else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req)));
          db.collection("consumable-inv").doc(doc.id).delete();
          db.collection("consumable-inv").doc(doc.id).set(data);

          const docRef = db.collection("materials-issue").doc();
          await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req), category: "consumable", storeId });

          const docRef2 = db.collection(storeId).doc();
          await docRef2.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req), category: "consumable" });

          res.status(201).json({ "message": "Issue successful" });
        }
      });
    }
  });
};

const issueNonConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId, slip_no, quantity_req, quantity_aprv } = req.body;

  const query = db.collection("non-consumable-inv").where("mcode", "==", mcode);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req)) > current_stock) {
          res.status(403).json({ message: "Quantity unavailable" });
        } else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req)));
          db.collection("non-consumable-inv").doc(doc.id).delete();
          db.collection("non-consumable-inv").doc(doc.id).set(data);

          const docRef = db.collection("materials-issue").doc();
          await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req), category: "non-consumable", storeId });

          const docRef2 = db.collection(storeId).doc();
          await docRef2.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_aprv.length) ? quantity_aprv : quantity_req), category: "non-consumable" });

          res.status(201).json({ "message": "Issue successful" });
        }
      });
    }
  });
};

const getConsumbaleIssue = async (req, res) => {
  const category = "consumable";
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("materials-issue").where("category", "==", category);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Issue not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data().storeId === storeId)
          items.push(doc.data());
      });

      res.status(200).json({
        message: "Issues Fetched",
        items
      });
    }
  });
};

const getNonConsumbaleIssue = async (req, res) => {
  const category = "non-consumable";
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("materials-issue").where("category", "==", category);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Issue not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data().storeId === storeId)
          items.push(doc.data());
      });

      res.status(200).json({
        message: "Issues Fetched",
        items
      });
    }
  });
};

module.exports = { issueConsumableMaterial, issueNonConsumableMaterial, getConsumbaleIssue, getNonConsumbaleIssue };
