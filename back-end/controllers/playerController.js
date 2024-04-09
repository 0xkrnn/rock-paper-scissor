const pool = require("../model/db")

const getAllPlayers = async (req, res) => {
    try {
        let players = await pool.query("SELECT * FROM players");
        console.log("roite")
        res.json(players.rows);
    } catch (err) {
        console.log(err)
        res.json({ "error": err })
    }
}




const createPlayer = async (req, res) => {

    const { playerOne, playerTwo } = req.body

    const findUserOne = await pool.query(
        "SELECT player_name from players where player_name=$1",
        [playerOne]
    );
    const findUserTwo = await pool.query(
        "SELECT player_name from players where player_name=$1",
        [playerTwo]
    );


    try {
        if (findUserOne.rowCount == 0) {
            let newUser = await pool.query(
                "INSERT INTO players(player_name) VALUES($1)",
                [playerOne]
            )
        }

        if (findUserTwo.rowCount == 0) {

            let newUser = await pool.query(
                "INSERT INTO players(player_name) VALUES($1)",
                [playerTwo]
            )
        }

        res.status(201).json({ "message": "user created" })

    } catch (err) {
        console.log(err);
        res.status(400).json({ "error": "Error occured" })
    }
}


const updateUser = async (req, res) => {
    const { won, lose } = req.body

    const findWinner = await pool.query(
        "SELECT * FROM players where player_name=$1",
        [won]
    );
    const findLoser = await pool.query(
        "SELECT * FROM players where player_name=$1",
        [lose]
    );

    res.winner = findWinner.rows[0];
    res.loser = findLoser.rows[0];

    

    try {

        //winner Update

        await pool.query(
            "UPDATE players SET match_played=$1, won=$2 WHERE pid=$3",
            [res.winner.match_played + 1, res.winner.won + 1, res.winner.pid]
        );

        // updation of loser's data

        await pool.query(
            "UPDATE players SET match_played=$1, lose=$2 WHERE pid=$3",
            [res.loser.match_played + 1, res.loser.lose + 1, res.loser.pid]
        );


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