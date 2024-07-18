import React from 'react';
import CreatorCard from '../components/CreatorCard';
import NavBar from '../components/NavBar';

const ShowCreators = ({ creators }) => {
    
    
    return(

        <div>
            <NavBar />
            { creators.map(creator => (
                <CreatorCard creator={creator}/>
            ))}
        </div>

    );
}

export default ShowCreators;