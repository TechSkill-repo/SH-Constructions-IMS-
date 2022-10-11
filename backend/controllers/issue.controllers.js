const db = require('./db.controllers');

const checkIsAccepted = async (req, res) => {
  const { slip_no } = req.query;

  const query = db.collection("materials").doc("issue").collection("items").where("issue_slip_no", "==", slip_no);

  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(200).json({ "accepted": false });
    } else {
      res.status(200).json({ "accepted": true });
    }
  });
};

const acceptConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId, slip_no, quantity_req, quantity_aprv, quantity_acpt } = req.body;

  const query = db.collection("inventory").doc("consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)) > current_stock) {
          res.status(403).json({ message: "Quantity unavailable" });
        } else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)));
          await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).delete();
          await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).set(data);

          const docRef = db.collection("materials").doc("issue").collection("items").doc();
          await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv), category: "consumable", storeId, quantity_aprv });

          let query = db.collection("stores").doc(storeId).collection("items").where("mcode", "==", mcode);
          query.get().then(async querySnapshot => {
            if (querySnapshot.empty) {
              const docRef2 = db.collection("stores").doc(storeId).collection("items").doc();
              await docRef2.set({ storeId, mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv), category: "consumable", quantity_aprv });
            } else {
              querySnapshot.forEach(async doc => {
                const data = doc.data();
                data.mquantity = "" + (parseInt(data.mquantity) + parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)));
                await db.collection("stores").doc(storeId).collection("items").doc(doc.id).delete();
                await db.collection("stores").doc(storeId).collection("items").doc(doc.id).set(data);
              })
            }
          });

          query = db.collection("inventory").doc("issue").collection("items").where("issue_slip_no", "==", issue_slip_no);
          await query.get().then(querySnapshot => {
            querySnapshot.forEach(async doc => {
              await db.collection("inventory").doc("issue").collection("items").doc(doc.id).delete();
            });
          });

          query = db.collection("materials").doc("request").collection("items").where("issue_slip_no", "==", issue_slip_no);
          await query.get().then(querySnapshot => {
            querySnapshot.forEach(async doc => {
              await db.collection("materials").doc("request").collection("items").doc(doc.id).delete();
            });
          });

          res.status(201).json({ "message": "Accept successful" });
        }
      });
    }
  });
};

const acceptNonConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, mquantity, storeId, slip_no, quantity_req, quantity_aprv, quantity_acpt } = req.body;

  const query = db.collection("inventory").doc("non-consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        if (parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)) > current_stock) {
          res.status(403).json({ message: "Quantity unavailable" });
        } else {
          let data = doc.data();
          data.current_stock = "" + (current_stock - parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)));
          await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).delete();
          await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).set(data);

          const docRef = db.collection("materials").doc("issue").collection("items").doc();
          await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv), category: "non-consumable", storeId, quantity_aprv });

          let query = db.collection("stores").doc(storeId).collection("items").where("mcode", "==", mcode);
          query.get().then(async querySnapshot => {
            if (querySnapshot.empty) {
              const docRef2 = db.collection("stores").doc(storeId).collection("items").doc();
              await docRef2.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv), category: "non-consumable", storeId, quantity_aprv });
            } else {
              querySnapshot.forEach(async doc => {
                const data = doc.data();
                data.mquantity = "" + (parseInt(data.mquantity) + parseInt(mquantity ? mquantity : ((quantity_acpt.length) ? quantity_acpt : quantity_aprv)));
                await db.collection("stores").doc(storeId).collection("items").doc(doc.id).delete();
                await db.collection("stores").doc(storeId).collection("items").doc(doc.id).set(data);
              })
            }
          });

          query = db.collection("inventory").doc("issue").collection("items").where("issue_slip_no", "==", issue_slip_no);
          await query.get().then(querySnapshot => {
            querySnapshot.forEach(async doc => {
              await db.collection("inventory").doc("issue").collection("items").doc(doc.id).delete();
            });
          });

          query = db.collection("materials").doc("request").collection("items").where("issue_slip_no", "==", issue_slip_no);
          await query.get().then(querySnapshot => {
            querySnapshot.forEach(async doc => {
              await db.collection("materials").doc("request").collection("items").doc(doc.id).delete();
            });
          });

          res.status(201).json({ "message": "Accept successful" });
        }
      });
    }
  });
};

const issueConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, storeId, quantity_req, quantity_aprv } = req.body;

  const query = db.collection("materials").doc("request").collection("items").where("issue_slip_no", "==", issue_slip_no);
  await query.get().then(querySnapshot => {
    querySnapshot.forEach(async doc => {
      await db.collection("materials").doc("request").collection("items").doc(doc.id).delete();
      await db.collection("materials").doc("request").collection("items").doc(doc.id).set({ mcode, date, issue_slip_no, mname, category: "consumable", mdescription, uom, storeId, quantity_req, quantity_aprv, issued: true });
    });
  });

  const docRef = db.collection("inventory").doc("issue").collection("items").doc();
  docRef.set({ mcode, date, issue_slip_no, mname, mdescription, uom, storeId, quantity_req, quantity_aprv, category: "consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const issueNonConsumableMaterial = async (req, res) => {
  const { mcode, date, issue_slip_no, mname, mdescription, uom, storeId, quantity_req, quantity_aprv } = req.body;

  const query = db.collection("materials").doc("request").collection("items").where("issue_slip_no", "==", issue_slip_no);
  await query.get().then(querySnapshot => {
    querySnapshot.forEach(async doc => {
      await db.collection("materials").doc("request").collection("items").doc(doc.id).delete();
      await db.collection("materials").doc("request").collection("items").doc(doc.id).set({ mcode, date, issue_slip_no, mname, category: "non-consumable", mdescription, uom, storeId, quantity_req, quantity_aprv, issued: true });
    });
  });

  const docRef = db.collection("inventory").doc("issue").collection("items").doc();
  docRef.set({ mcode, date, issue_slip_no, mname, mdescription, uom, storeId, quantity_req, quantity_aprv, category: "non-consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const getConsumbaleIssue = async (req, res) => {
  const category = "consumable";
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("inventory").doc("issue").collection("items").where("category", "==", category);
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

  const query = db.collection("inventory").doc("issue").collection("items").where("category", "==", category);
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

const getConsumbaleAccept = async (req, res) => {
  const category = "consumable";
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("materials").doc("issue").collection("items").where("category", "==", category);
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

const getNonConsumbaleAccept = async (req, res) => {
  const category = "non-consumable";
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("materials").doc("issue").collection("items").where("category", "==", category);
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

const editIssuedMaterial = async (req, res) => {
  const { storeId, issue_slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, quantity_acpt } = req.body;

  const query = db.collection("inventory").doc("issue").collection("items").where("storeId", "==", storeId);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode && doc.data().issue_slip_no === issue_slip_no) {
          await db.collection("inventory").doc("issue").collection("items").doc(doc.id).delete();
          await db.collection("inventory").doc("issue").collection("items").doc(doc.id).set({ storeId, issue_slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, quantity_acpt });
        }
      });

      res.status(200).json({ message: "Material Issue Edited" });
    }
  });
}

module.exports = { issueConsumableMaterial, issueNonConsumableMaterial, acceptConsumableMaterial, acceptNonConsumableMaterial, getConsumbaleIssue, getNonConsumbaleIssue, getConsumbaleAccept, getNonConsumbaleAccept, checkIsAccepted, editIssuedMaterial };
