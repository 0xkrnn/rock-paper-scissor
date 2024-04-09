import React, { useEffect, useState } from 'react';
import url from '../utils/utils';
import { NavLink } from 'react-router-dom';

function Results() {

    let [users, setUsers] = useState([])

    let fetchUsers = async () => {
        let result = await fetch(`${url}/player`, {
            method: "GET"
        })
        let data = await result.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='bg-gray-300 h-lvh flex justify-center items-center flex-col gap-2'>
          
                <NavLink to={"/"} className="text-blue-800"> Home </NavLink>
            
            {users.length == 0
                ? <h1 className='font-poppins text-xl'> No data to show :( </h1>
                : <div className='h-4/5 w-4/5 bg-white rounded-md'>
                    <table className='w-full'>
                        <thead className='font-poppins'>
                            <tr className='uppercase border-b'>
                                <th className='p-4'> Player Name </th>
                                <th className='p-4'> Games Played</th>
                                <th className='p-4'> Win</th>
                                <th className='p-4'> Lost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(item => {
                                    return <tr key={item._id} className='uppercase border-b-2 text-center '>
                                        <td className='p-2 '> {item.player_name} </td>
                                        <td className='p-2 '>{item.match_played}</td>
                                        <td className='p-2 '> {item.won} </td>
                                        <td className='p-2 '> {item.lose}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>}
        </div>
    );
}

export default Results;