const db = require("./db.controllers");

const fetchDetails = async (req, res) => {
  const mcode = req.query.mcode;

  const query = db
    .collection("materials")
    .doc("data")
    .collection("items")
    .where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      res.status(200).json({
        message: "Material fetched",
        item: data,
      });
    });
  });
};

const getMaterials = async (req, res) => {
  const items = [];

  const query = db.collection("materials").doc("data").collection("items");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
  });

  res.status(200).json({ message: "materials fetched", items: items });
};

const getMcodes = async (req, res) => {
  const items = [];

  let query = db.collection("materials").doc("data").collection("items");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      items.push(doc.data().mcode);
    });
  });

  res.status(200).json({ message: "codes fetched", codes: items });
};

const getRequests = async (req, res) => {
  const query = db.collection("materials").doc("request").collection("items");
  const items = [];
  const temp = {};
  const data = [];

  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Requests not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      items.forEach((item) => {
        if (temp[item.mcode]) {
          temp["quantity_req"] += parseInt(item.quantity_req);
          temp["quantity_aprv"] += parseInt(item.quantity_aprv);
        } else {
          item.quantity_req = parseInt(item.quantity_req);
          item.quantity_aprv = parseInt(item.quantity_aprv);
          temp[item.mcode] = item;
        }
      });

      Object.entries(temp).forEach((item) => {
        data.push(item[1]);
      });

      res.status(200).json({ message: "Requests found", data: data });
    }
  });
};

module.exports = { fetchDetails, getMcodes, getRequests, getMaterials };
