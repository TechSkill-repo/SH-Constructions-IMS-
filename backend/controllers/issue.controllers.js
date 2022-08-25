const db = require('./db.controllers');

const issueConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId } = req.body;

  const query = db.collection("consumable-inv").where("mcode", "==", mcode);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity) > current_stock)
          res.status(403).json({ message: "Quantity unavailable" });
        else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity));
          db.collection("non-consumable-inv").doc(doc.id).delete();
          db.collection("non-consumable-inv").doc(doc.id).set(data);
        }
      });
    }
  });

  const docRef = db.collection("materials-issue").doc();
  await docRef.set({ mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, category: "consumable" });

  const docRef2 = db.collection(storeId).doc();
  await docRef2.set({ mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, category: "consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const issueNonConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId } = req.body;

  const query = db.collection("non-consumable-inv").where("mcode", "==", mcode);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity) > current_stock)
          res.status(403).json({ message: "Not sufficient quantity" });
        else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity));
          db.collection("non-consumable-inv").doc(doc.id).delete();
          db.collection("non-consumable-inv").doc(doc.id).set(data);
        }
      });
    }
  });

  const docRef = db.collection("materials-issue").doc();
  await docRef.set({ mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, category: "non-consumable" });

  const docRef2 = db.collection(storeId).doc();
  await docRef2.set({ mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, category: "consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const getConsumbaleIssue = (req, res) => {
  const category = "consumable";
  let items = [];

  const query = db.collection("materials-issue").where("category", "==", category);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Issue not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Issues Fetched",
        items
      });
    }
  });
};

const getNonConsumbaleIssue = (req, res) => {
  const category = "non-consumable";
  let items = [];

  const query = db.collection("materials-issue").where("category", "==", category);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Issue not found" });
    } else {
      querySnapshot.forEach((doc) => {
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
