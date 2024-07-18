import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import CreatorForm from '../components/CreatorForm';

const AddCreator = () => {

    return (
        <div>
            <NavBar />
            <CreatorForm type={'create'}/>
            
        </div>
    );
}

export default AddCreator;
