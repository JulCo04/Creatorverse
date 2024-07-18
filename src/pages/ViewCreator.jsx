import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import NavBar from '../components/NavBar';

function ViewCreator() {

    const { id } = useParams();
    const [creator, setCreator] = useState([]);

    useEffect(() => {
        async function fetchCreator() {
          try {
            const { data, error } = await supabase
              .from('creators')
              .select('*')
              .eq('id', id)
              .single();
            if (error) {
              throw error;
            }
    
            setCreator(data);
            console.log(data)
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        }
    
        fetchCreator();
    }, []);


    return(
        <div>
            <NavBar />
            <div className=''>
                <h1>{creator.name}</h1>
                <img 
                    src={creator.imageURL} 
                    alt="Creator Image" 
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
                <p>{creator.description}</p>
                <div className='mt-5'>
                   <Link to={`/EditCreator/${id}`} className='bg-slate-100 rounded-md p-2 text-2xl'>Edit Creator</Link>
                </div>

            </div>
        </div>
        

    );
}

export default ViewCreator;