import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='flex flex-col bg-violet-500 w-screen h-60 items-center justify-center gap-5'>
            <Link to='/' className='text-8xl text-white'>Creatorverse</Link>
            <div className='flex gap-5'>
                <Link to='/' className='bg-slate-100 rounded-md p-2 text-4xl'>View Creators</Link>
                <Link to='/AddCreator' className='bg-slate-100 rounded-md p-2 text-4xl'>Add Creator</Link>
            </div>
            
        </div>
    );
}

export default NavBar;
