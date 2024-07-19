import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import CreatorForm from '../components/CreatorForm';

const AddCreator = () => {

    return (
        <div className='bg-slate-800 h-screen overflow-x-hidden'>
            <NavBar />
            <CreatorForm type={'create'}/>
            
        </div>
    );
}

export default AddCreator;
