import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@fontsource/poppins';

const NavBar = () => {
    const location = useLocation();

    return (
        <div className='flex flex-col bg-slate-900 w-screen h-60 items-center justify-center border-b-2 border-b-slate-700 gap-5'>
            <Link to="/" className="text-8xl text-white font-bold font-poppins drop-shadow-lg tracking-wider">Creatorverse</Link>
            <div className='flex gap-5'>
                <Link 
                    to='/'
                    className={`hover:bg-slate-600  rounded-md px-2 text-white text-2xl ${location.pathname === '/' ? 'border-b-2 rounded-b-none border-slate-400' : ''}`}
                >
                    VIEW CREATORS
                </Link>
                <Link 
                    to='/AddCreator'
                    className={` hover:bg-slate-600 rounded-md px-2 text-white text-2xl ${location.pathname === '/AddCreator' ? 'border-b-2 rounded-b-none border-slate-400' : ''}`}
                >
                    ADD CREATOR
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
