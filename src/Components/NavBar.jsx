import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='h-auto md:h-[45px] flex flex-col md:flex-row items-center gap-4 md:gap-10 bg-gray-800 justify-center p-4 md:p-8 w-full'>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 
                    "text-blue-500 font-semibold text-sm md:text-xl" : 
                    "text-white font-medium text-sm md:text-xl"
                }
            >
                Home
            </NavLink>

            <NavLink 
                to="/pastes"  
                className={({ isActive }) => isActive ? 
                    "text-blue-500 font-semibold text-sm md:text-xl" : 
                    "text-white font-medium text-sm md:text-xl"
                }
            >
                Pastes
            </NavLink>
        </div>
    )
}

export default NavBar
