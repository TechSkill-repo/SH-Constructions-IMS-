const db = require('./db.controllers');

const fetchDetails = async (req, res) => {
  const mcode = req.query.mcode;

  const query = db.collection("materials").doc("data").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      res.status(200).json({
        message: "Material fetched",
        item: data
      });
    });
  });
}

const getMcodes = async (req, res) => {
  const items = [];

  let query = db.collection("materials").doc("data").collection("items");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      items.push(doc.data().mcode);
    });
  });

  res.status(200).json({ "message": "codes fetched", codes: items });
}

module.exports = { fetchDetails, getMcodes };
