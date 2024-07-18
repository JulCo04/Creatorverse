import React from 'react';
import NavBar from '../components/NavBar';
import CreatorForm from '../components/CreatorForm';

function EditCreator() {
    return(

        <div>
            <NavBar />
            <CreatorForm type='edit'/>
        </div>

    );
}

export default EditCreator;