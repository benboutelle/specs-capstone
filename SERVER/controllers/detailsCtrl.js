const { User } = require("../models/user");
const { Details } = require("../models/details");
const { Bird } = require("../models/bird");

module.exports = {
  //get
  getDetails: async (req, res) => {
    console.log("getDetails");
    try {
      const { birdId } = req.params;
      const details = await Details.findAll({
        // where: { birdId: birdId },
        include: [
          {
            model: Bird,
            require: true,
            where: {id: birdId},
            
          },
        ],
      });
      res.status(200).send(details);
    } catch (err) {
      console.log(err)
      console.log('error in getDetails')
      res.sendStatus(400)
    }
  },
//post
  addDetails: async (req, res) => {
    console.log("addDetails");
    try {
      const { date, time, location, notes, birdId } = req.body;
      await Details.create({ date, time, location, notes, birdId });
      res.sendStatus(200);
    } catch (err) {
      console.log(err)
      console.log("error in addDetails");
      res.sendStatus(400);
    }
  },
};
