import React from 'react';
import CreatorCard from '../components/CreatorCard';
import NavBar from '../components/NavBar';

const ShowCreators = ({ creators }) => {
    return (
        <div className='bg-slate-900 min-h-screen'>
            <NavBar />
            <div className="pt-8 px-4 flex justify-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl bg-slate-800 p-3 rounded-md w-full">
                    {creators.map((creator, index) => (
                        <CreatorCard key={index} creator={creator} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowCreators;
