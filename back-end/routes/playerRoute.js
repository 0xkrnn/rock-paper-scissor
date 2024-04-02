const router = require("express").Router();
const {createPlayer, getAllPlayers, updateUser} = require("../controllers/playerController");

router

    .get("/",getAllPlayers)

    .post("/",createPlayer)

    .patch("/",updateUser)



module.exports = router