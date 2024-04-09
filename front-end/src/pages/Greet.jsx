import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import celeb from "../assets/images/celeb1.png"


function Greet({winner}) {

    const {name} = winner

    return (
        <div className='flex h-lvh bg-gray-300 items-center justify-center flex-col gap-4'>
            <div className='w-1/4 bg-white h-max p-8 flex justify-center items-center flex-col rounded-2xl shadow-lg'>
                <h1 className='font-semibold uppercase font-poppins'> Congratulations ! </h1>
                <h1 className='font-semibold uppercase font-poppins text-green-700'>  {name} </h1>
                <img src={celeb} />
            </div>

            <NavLink to={"/results"} className= "text-blue-800 font-poppins underline"> Results Page </NavLink>

        </div>
    );
}

export default Greet;