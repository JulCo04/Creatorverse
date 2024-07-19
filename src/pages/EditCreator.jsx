import React from 'react';
import NavBar from '../components/NavBar';
import CreatorForm from '../components/CreatorForm';

function EditCreator() {
    return(

        <div className='bg-slate-800 h-screen overflow-x-hidden'>
            <NavBar />
            <CreatorForm type='edit'/>
        </div>

    );
}

export default EditCreator;