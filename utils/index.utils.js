const db = require('../controllers/db.controllers');

const dueDateNotifier = async (io) => {
    db.collection("critical-tools").get().then(querySnapshot => {
        if (querySnapshot.empty) {
            console.log("Nothing found in critical tools");
        } else {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const { make, mcode, storeId } = data;
                const dueDate = new Date(data.dueDate);
                const today = new Date();

                if (dueDate.getFullYear() === today.getFullYear() &&
                    dueDate.getMonth() === today.getMonth()) {
                    const daysLeft = dueDate.getDate() - today.getDate();

                    if (daysLeft < 25) {
                        io.emit("centralOverdue", { make, mcode, storeId });
                    }
                }
            });
        }
    });
};

module.exports = { dueDateNotifier };