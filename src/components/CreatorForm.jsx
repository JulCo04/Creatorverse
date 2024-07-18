import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const CreatorForm = ({ type }) => {
    
    const { id } = useParams();

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const addCreator = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .insert([{
                    name: name,
                    url: url,
                    description: description,
                    imageURL: imageURL
                }]);

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error adding creator:', error.message);
        }
    };

    const updateCreator = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .update({
                    
                    name: name,
                    url: url,
                    description: description,
                    imageURL: imageURL
                }

                )
                .eq('id', id)

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error updating creator:', error.message);
        }
    };

    const deleteCreator = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id)

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting creator:', error.message);
        }
    };

    return(
        <div>            
            <div className='flex flex-col border-2 border-black rounded-md justify-center items-center max-w-lg mx-auto p-4 mt-8'>
                <h1 className='text-4xl mb-4'>Add Creator</h1>
                <div className='mb-4 w-full'>
                    <label className='text-2xl text-gray-700'>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='h-10 border rounded w-full'
                    />
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-2xl text-gray-700'>URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className='h-10 border rounded w-full'
                    />
                </div>
                <div className='mb-4 w-full'>
                    <label className=' text-2xl text-gray-700'>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='h-24 border rounded w-full'
                    />
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-2xl text-gray-700'>Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className='h-10 border rounded w-full'
                    />
                </div>

                <div className='flex gap-8 w-full justify-center'>
                    {type === "create" ? (
                            <button onClick={addCreator} className='bg-blue-500 text-white py-2 px-4 w-full rounded'>
                                Submit
                            </button>
                    ) : type === "edit" ? (
                        <>
                            <button onClick={updateCreator} className='bg-blue-500 text-white py-2 px-4 w-full rounded'>
                                Update
                            </button>
                            <button onClick={deleteCreator} className='bg-blue-500 text-white py-2 w-full px-4 rounded'>
                                Delete
                            </button>
                        </>
                    ) : null }
                </div>
                
            </div>
        </div>
    );
}

export default CreatorForm;