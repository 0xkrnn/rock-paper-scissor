const playerModel = require("../model/userModel")


const getAllPlayers = async (req, res) => {
    let players = await playerModel.find()
    res.json(players);
}


const createPlayer = async (req, res) => {

    const { playerOne, playerTwo } = req.body

    const findUserOne = await playerModel.find({ playerName: playerOne })
    const findUserTwo = await playerModel.find({ playerName: playerTwo })

    try {
        if (findUserOne.length == 0) {
            const newUser = new playerModel({
                playerName: playerOne
            })
            await newUser.save()
            console.log("user1");
        }

        if (findUserTwo.length == 0) {

            const newUser = new playerModel({
                playerName: playerTwo
            })
            await newUser.save()
            console.log("user2");
        }

        res.status(201).json({ "message": "user created" })

    } catch (err) {
        console.log(err);
        res.status(400).json({ "error": "Error occured" })
    }
}

const updateUser = async (req, res) => {
    const { won, lose } = req.body

    const findWinner = await playerModel.find({ playerName: won })
    const findLoser = await playerModel.find({ playerName: lose })

    console.log(findWinner, findLoser);

    try {

        await playerModel.updateOne({ _id: findWinner[0]._id },
            {
                $set: {
                    won: findWinner[0].won + 1,
                    matchPlayed: findWinner[0].matchPlayed + 1,
                    winPercentage: Math.floor((findWinner[0].won / findWinner[0].matchPlayed) * 100)
                }
            }
        )


        await playerModel.updateOne({ _id: findLoser[0]._id },
            {
                $set: {
                    lose: findLoser[0].lose + 1,
                    matchPlayed: findLoser[0].matchPlayed + 1,
                    winPercentage: Math.floor((findLoser[0].won / findLoser[0].matchPlayed) * 100)
                }
            }
        )


        res.status(200).json({ "message": "Success" })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "error": "Error occured" })
    }
}


module.exports = {
    getAllPlayers,
    createPlayer,
    updateUser
}