const db = require('./db.controllers');

const requestLoan = async (req, res) => {
  const { slip_no, rqDate, mquantity, storeId, mdescription, mcode, mname, uom, requestedStoreId, category } = req.body;

  const docRef = db.collection("loans").doc("request").collection("items").doc();
  await docRef.set({ slip_no, rqDate, mquantity, storeId, mdescription, mcode, mname, uom, requestedStoreId, category });

  res.status(201).json({ message: "Loan requested successfully" });
};

const lendMaterial = async (req, res) => {
  const { mcode, mname, uom, lendDate, lendQuantity, returnDate, requestedStoreId, receiverStoreId, condition, returnCondition, category } = req.body;

  // remove the material quantity from the sender store
  const query = db.collection("stores").doc(requestedStoreId).collection("items").where("mcode", "==", mcode);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found in the lender store" });
    } else {
      querySnapshot.forEach(async (doc) => {
        const mquantity = parseInt(doc.data().mquantity);

        if (mquantity < parseInt(lendQuantity)) {
          res.status(403).json({ message: "Not enough material to lend" });
        } else {
          let data = doc.data();
          data.mquantity = "" + (mquantity - parseInt(lendQuantity));
          await db.collection("stores").doc(requestedStoreId).doc(doc.id).delete();
          await db.collection("stores").doc(requestedStoreId).doc(doc.id).set(data);

          // add the material quantity to receiver store
          const query = db.collection(receiverStoreId).where("mcode", "==", mcode);
          await query.get().then(async (querySnapshot) => {
            if (querySnapshot.empty) {
              const docRef = db.collection(receiverStoreId).doc();
              await docRef.set({ mcode, date: lendDate, issue_slip_no: "", mname, mdescription: "", uom, mquantity: lendQuantity, category });
            } else {
              querySnapshot.forEach(async (doc) => {
                const mquantity = parseInt(doc.data().mquantity);

                let data = doc.data();
                data.mquantity = "" + (mquantity + parseInt(lendQuantity));
                await db.collection(receiverStoreId).doc(doc.id).delete();
                await db.collection(receiverStoreId).doc(doc.id).set(data);
              });
            }

            const docRef = db.collection("loans").doc("approved").collection("items").doc();
            await docRef.set({ mcode, mname, uom, lendDate, lendQuantity, returnDate, requestedStoreId, receiverStoreId, condition, returnCondition, category });

            res.status(200).json({ message: "Loan Approved successfully" });
          });
        }
      });
    }
  });
};

const editMaterial = async (req, res) => {
  const { slip_no, mcode, mname, uom, lendDate, lendQuantity, returnDate, receiverStoreId, requestedStoreId, condition, returnCondition, category } = req.body;

  const query = db.collection("loans").doc("request").collection("items").where("slip_no", "==", slip_no);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Loan not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          await db.collection("loans").doc("request").collection("items").doc(doc.id).delete();
          await db.collection("loans").doc("request").collection("items").doc(doc.id).set({ slip_no, mcode, mname, uom, lendDate, lendQuantity, returnDate, receiverStoreId, requestedStoreId, condition, returnCondition, category })
        }
      });

      res.status(200).json({ message: "Loan Request Edited" });
    }
  });
}

const getLoans = async (req, res) => {
  const storeId = req.query.storeId;
  let items = [];

  let query;

  if (storeId)
    query = db.collection("loans").doc("request").collection("items").where("requestedStoreId", "==", storeId);
  else
    query = db.collection("loans").doc("request").collection("items");

  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Loan Requests not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Loan Requests Fetched",
        items
      });
    }
  });
};

const getApprovedLoans = async (req, res) => {
  const storeId = req.query.storeId;
  const reverse = req.query.reverse;
  let items = [];

  let query;

  if (storeId) {
    if (reverse)
      query = db.collection("loans").doc("approved").collection("items").where("receiverStoreId", "==", storeId);
    else
      query = db.collection("loans").doc("approved").collection("items").where("requestedStoreId", "==", storeId);
  }
  else
    query = db.collection("loans").doc("approved").collection("items");

  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Loan Approvals not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Loan Approvals Fetched",
        items
      });
    }
  });
};

module.exports = { requestLoan, lendMaterial, getLoans, getApprovedLoans, editMaterial };
