import React, { useRef, useState } from 'react';
import Stone from "../assets/images/btnRock.png"
import Paper from "../assets/images/btnPaper.png"
import Scissor from '../assets/images/btnScissor.png'
import Model from '../components/Model';
import { NavLink, useNavigate } from 'react-router-dom';
import url from "../utils/utils"


function Home() {

    const [gameStart, setGameStart] = useState(false)

    const navigate = useNavigate()

    const gameStatus = () => {
        setGameStart(!gameStart)
    }

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    const [playerOneName, setPlayerOneName] = useState("")
    const [playerTwoName, setPlayerTwoName] = useState("")

    let playerOnePoint = useRef(0)
    let playerTwoPoint = useRef(0)

    let [winnerName, setWinner] = useState("")

    function startGame() {
        console.log("Game has been started");

        if ((player1 === "stone" && player2 === "scissor") || (player1 === "scissor" && player2 === "paper") || (player1 === "paper" && player2 === "stone")) {
            playerOnePoint.current++
            setWinner(`Player ${playerOneName} wins !`)

        } else if (player1 === player2) {
            setWinner("Round Draw !")
        }
        else {
            playerTwoPoint.current++
            setWinner(`Player ${playerTwoName} wins !`)
        }

        setPlayer1("")
        setPlayer2("")
    }

    async function editPlayerDetail() {

        let winner = playerOnePoint.current > playerTwoPoint.current ? playerOneName : playerTwoName

        let userDetails = {
            won: winner,
            lose: winner == playerOneName ? playerTwoName : playerOneName
        }

        const data = await fetch(`${url}/player`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userDetails)
        });

        let result = await data.json()
        navigate("/greet")
    }

    if (player1 && player2) {
        if (playerOnePoint.current < 1 && playerTwoPoint.current < 1) startGame();
        else {
            editPlayerDetail()
        }
    }

    const [model, SetModel] = useState(true)

    if (gameStart === false) {
        return (
            <div className="flex flex-col justify-center items-center h-lvh gap-8 font-poppins bg-gray-200">

                <h1 className="text-7xl font-extrabold"> Rock , Paper & Scissor </h1>
                <button className="text-lg font-semibold border border-black py-1 px-6 rounded-md hover:bg-black hover:text-white hover:border-white transition-all duration-300" onClick={gameStatus}> Start </button>
            </div>
        );
    }

    else {
        return (

            <div className='h-lvh flex justify-center items-center flex-col gap-4'>
                <NavLink to={"/results"} className="text-blue-800 font-poppins text-right"> Results Page </NavLink>
                {model ? <Model prop={{ playerOneName, setPlayerOneName, playerTwoName, setPlayerTwoName, SetModel }} /> : ""}
                <div className='w-2/4 h-3/4 shadow-2xl shadow-black grid grid-cols-2 bg-[url("./assets/images/bg.jpg")]  bg-cover bg-center relative bg-white rounded-lg gap-2'>
                    {winnerName ? <h1 className='text-red absolute bottom-12 left-[40%] uppercase text-red-700 font-extrabold text-xl '> {winnerName} </h1> : ""}
                    <div className='flex flex-col p-10 gap-4 items-center'>
                        <div className='flex justify-between items-center px-4'>
                            <h1 className='text-lg font-extrabold'> {playerOneName.toUpperCase()} </h1>
                        </div>

                        <div className='flex gap-2 '>
                            <button className='border border-black p-1 bg-zinc-200 rounded-full' onClick={() => setPlayer1("stone")}>  <img src={Stone} /> </button>
                            <button className='border border-black p-1  bg-zinc-200 rounded-full' onClick={() => setPlayer1("paper")}> <img src={Paper} /> </button>
                            <button className='border border-black p-1  bg-zinc-200 rounded-full' onClick={() => setPlayer1("scissor")}> <img src={Scissor} /> </button>
                        </div>
                        <p className='text-[120px] font-bold font-shadow uppercase'>{playerOnePoint.current}</p>
                    </div>
                    <div className='flex flex-col p-10 gap-4 items-center'>

                        <div className='flex justify-between items-center px-4'>
                            <h1 className='text-lg font-extrabold'> {playerTwoName.toUpperCase()} </h1>
                        </div>

                        <div className='flex gap-2'>
                            <button className='border border-black p-1  bg-zinc-200 rounded-full' onClick={() => setPlayer2("stone")}> <img src={Stone} /> </button>
                            <button className='border border-black p-1  bg-zinc-200 rounded-full' onClick={() => setPlayer2("paper")}> <img src={Paper} /> </button>
                            <button className='border border-black p-1  bg-zinc-200 rounded-full' onClick={() => setPlayer2("scissor")}> <img src={Scissor} /> </button>
                        </div>
                        <p className=' text-[120px] font-bold font-shadow uppercase'> {playerTwoPoint.current}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;