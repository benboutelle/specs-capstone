const { Bird } = require("../models/bird");
const { User } = require("../models/user");

module.exports = {
  //get
  getAllBirds: async (req, res) => {
      console.log("getAllBirds");
    try {
        const {userId}= req.params
      const bird = await Bird.findAll({
        where: {userId: userId},
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(bird);
    } catch (err) {
      console.log("error in getAllBirds");
      console.log(err);
      res.sendStatus(400);
    }
  },
//post
  addBird: async (req, res) => {
    console.log("addBird");
    try{
        const { birdName, userId}= req.body
        console.log(userId)
        const newBird = await Bird.create({birdName, userId})
        res.status(200).send(newBird)
    } catch (err) {
        console.log('error in addBird')
        res.sendStatus(400)
    }
  },
};
