import React, { useEffect } from 'react';
import emoji from "../assets/images/emoji.png"
import url from '../utils/utils';

function Model({ prop }) {

    const { playerOneName, setPlayerOneName, playerTwoName, setPlayerTwoName, SetModel } = prop

    const createUser = async () => {
        SetModel(false)
        const bodyData = {
            playerOne: playerOneName,
            playerTwo: playerTwoName
        }

        console.log(url);

        let result = await fetch(`${url}/player`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        let data = await result.json()
    }


    return (
        <div className='w-lvw h-lvh z-10 fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div className='border-2 border-black rounded-xl bg-white p-8 flex flex-col gap-4 relative overflow-hidden font-poppins shadow-black shadow-xl'>
                <h1 className='text-center text-md uppercase font-semibold mt-[145px]'> Welcome ! </h1>
                <img src={emoji} className='w-28 absolute left-[35%] z-10 hover:drop-shadow-xl' />
                <section className='flex flex-col-reverse gap-2'>
                    <input type="text" value={playerOneName} onChange={(e) => setPlayerOneName(e.target.value)} className='border-2 border-black rounded-lg' />
                    <label htmlFor="name"> Enter Player1 Name </label>
                </section>
                <section className='flex flex-col-reverse gap-2'>
                    <input type="text" value={playerTwoName} onChange={(e) => setPlayerTwoName(e.target.value)} className='border-2 border-black rounded-lg' />
                    <label htmlFor="name"> Enter Player2 Name </label>
                </section>
                <div className='w-full h-[250px] rounded-[50%] bg-gray-300 absolute left-0 top-[-20%]'></div>
                <button disabled={playerOneName && playerTwoName ? false : true} className='cursor-pointer bg-[#1cf378] p-2 font-semibold border border-white transition-all duration-300 hover:border-green-500 hover:bg-transparent hover:rounded-lg' onClick={createUser}> Save </button>
            </div>
        </div>
    );
}

export default Model;