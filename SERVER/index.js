require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { User } = require("./models/user");
const { Bird } = require("./models/bird");
const { Details } = require("./models/details");
const { sequelize } = require("./util/database");

const {register, login} =require('./controllers/authCtrl')
const {getAllBirds, addBird} = require('./controllers/birdCtrl')
const {getDetails, addDetails}= require('./controllers/detailsCtrl')

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Bird)
Bird.belongsTo(User)

Bird.hasMany(Details)
Details.belongsTo(Bird)

app.post('/api/register', register)
app.post('/api/login', login)

app.get('/api/birds/:userId', getAllBirds)
app.post('/api/birds', addBird)

app.get('/api/details/:birdId', getDetails)
app.post('/api/details', addDetails)


sequelize.sync()
// sequelize.sync({force:true})
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`docked up at ${SERVER_PORT}!`));
  })
  .catch((err) => console.log(err));
