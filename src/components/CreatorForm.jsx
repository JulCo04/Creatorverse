import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const CreatorForm = ({ type }) => {
    
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [name, setName] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [description, setDescription] = useState('');
    const [twitchUrl, setTwitchUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchCreator();
    }, [id]);

    useEffect(() => {
        if (creator) {
            setName(creator.name || '');
            setYoutubeUrl(creator.youtubeUrl || '');
            setDescription(creator.description || '');
            setTwitchUrl(creator.twitchUrl || '');
            setInstagramUrl(creator.instagramUrl || '');
            setTwitterUrl(creator.twitterUrl || '');
            setImageURL(creator.imageURL || '');
        }
    }, [creator]);


    const addCreator = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('creators')
                .insert([{
                    name: name,
                    imageURL: imageURL,
                    description: description,
                    youtubeUrl: youtubeUrl,
                    twitchUrl: twitchUrl,
                    twitterUrl: twitterUrl,
                    instagramUrl: instagramUrl
                }]);

                navigate('/');
                window.location.reload();

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
                    imageURL: imageURL,
                    description: description,
                    youtubeUrl: youtubeUrl,
                    twitchUrl: twitchUrl,
                    twitterUrl: twitterUrl,
                    instagramUrl: instagramUrl
                })
                .eq('id', id)

                navigate('/');
                window.location.reload();

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error updating creator:', error.message);
        }
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);
        await deleteCreator();
        navigate('/');
        window.location.reload();
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const ConfirmationModal = ({ show, onClose, onConfirm }) => {
        if (!show) return null;

        return (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
              <p className="mb-4">Do you really want to delete this creator? This action cannot be undone.</p>
              <div className="flex justify-end">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={onConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
    };

    const deleteCreator = async () => {
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id)

            console.log(error);

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting creator:', error.message);
        }
    };

    return (
        <div>            
            <div className='flex flex-col bg-slate-900 border-2 border-slate-700 rounded-md justify-center items-center w-2/6 mx-auto p-4 my-8'>
                
                <h1 className='text-4xl text-white mb-4'>
                    {type === 'edit' ? 'Edit Creator' : 'Add Creator'}
                </h1>
                <hr className='w-full mb-4'></hr>
                
                <div className='mb-4 w-full'>
                    <label className='text-white text-2xl '>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='p-2 h-10 border rounded w-full'
                    />
                </div>

                <div className='mb-4 w-full'>
                    <label className='text-white text-2xl font-normal'>Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className='p-2 h-10 border rounded w-full'
                    />
                </div>

                <div className='mb-4 w-full'>
                    <label className=' text-white text-2xl '>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='p-2 h-24 border rounded w-full'
                    />
                </div>

                <label className='text-white text-2xl mb-4'>Social Media</label>

                <div className='mb-4 w-full'>
                    <div className='flex mb-4 w-full items-center gap-4'>
                        <img className='h-6' src="../youtube_icon.png" alt="YouTube"/>
                        <label className='text-white text-2xl'>YouTube</label>
                    </div>
                    <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className='p-2 text-black h-10 border rounded w-full'
                    />
                </div>

                <div className='mb-4 w-full'>
                    <div className='flex mb-4 w-full items-center gap-4'>
                        <img className='h-8' src="../twitch_icon.png" alt="Twitch"/>
                        <label className='text-white text-2xl'>Twitch</label>
                    </div>
                    <input
                        type="text"
                        value={twitchUrl}
                        onChange={(e) => setTwitchUrl(e.target.value)}
                        className='p-2 h-10 border rounded w-full'
                    />

                </div>

                <div className='mb-4 w-full'>
                    <div className='flex mb-4 w-full items-center gap-4'>
                        <img className='h-8' src="../twitter_icon.png" alt="Twitter"/>
                        <label className='text-white text-2xl'>X</label>
                    </div>
                    <input
                        type="text"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                        className='p-2 h-10 border rounded w-full'
                    />
                </div>

                <div className='mb-4 w-full'>
                    <div className='flex mb-4 w-full items-center gap-4'>
                        <img className='h-8 w-8' src="../instagram_icon.png" alt="Instagram"/>
                        <label className='text-white text-2xl'>Instagram</label>
                    </div>
                    <input
                        type="text"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        className='p-2 h-10 border rounded w-full'
                    />
                </div>

                
                <ConfirmationModal
                    show={showModal}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                />

                <div className='flex gap-8 w-full justify-center'>
                    {type === "create" ? (
                        <button onClick={addCreator} className='bg-blue-500 text-white text-center py-2 px-4 w-40 rounded border border-transparent hover:bg-blue-600 hover:outline hover:outline-2 hover:outline-white'>
                            Submit
                        </button>
                    ) : type === "edit" ? (
                        <>
                            <button onClick={updateCreator} className='bg-blue-500 text-white text-center py-2 px-4 w-40 rounded border border-transparent hover:bg-blue-600 hover:outline hover:outline-2 hover:outline-white'
                            >
                                Update
                            </button>
                            <button onClick={handleDeleteClick} className='bg-red-500 text-white text-center py-2 px-4 w-40 rounded border border-transparent hover:bg-blue-red hover:outline hover:outline-2 hover:outline-white'
                            >
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
