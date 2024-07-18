import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
    
    return(
        <div className='border-2'>
            <Link to={`/ViewCreator/${creator.id}`}>
                <div>
                    <h1>{creator.name}</h1>
                    <img 
                        src={creator.imageURL} 
                        alt="Creator Image" 
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <p>{creator.description}</p>
                    <div className=' border-2 border-black px-2 w-fit'>
                        <Link  to={`/EditCreator/${creator.id}`}>Edit</Link>
                    </div>
                    
                </div>
                
            </Link> 
        </div>
        

    );
}

export default CreatorCard;