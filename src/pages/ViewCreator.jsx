import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import NavBar from '../components/NavBar';

function ViewCreator() {

  const { id } = useParams();
  const [creator, setCreator] = useState([]);
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
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }

      fetchCreator();
  }, [id]);

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

          console.log(error)

          if (error) {
              throw error;
          }

      } catch (error) {
          console.error('Error deleting creator:', error.message);
      }
  };

  const formatUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
  };

  return (
    <div className='bg-slate-800 h-screen'>
      <NavBar />
      <ConfirmationModal
        show={showModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
      <div className='flex justify-center gap-10 pt-10'>
        {creator.imageURL ? (
          <img 
            src={creator.imageURL} 
            alt="Creator Image" 
            className="w-[500px] h-[500px] object-cover rounded-md"
          />
        ) : null}
  
        <div className='flex flex-col gap-5 w-2/5'>
          <h1 className='text-6xl text-slate-400'>{creator.name}</h1>
          <p className='text-xl text-white'>{creator.description}</p>
          <div className='mt-auto'>
            {creator.youtubeUrl ? (
              <div className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' onClick={() => window.open(formatUrl(creator.youtubeUrl), '_blank')}>
                <img className='h-8 w-8' src='../youtube_icon.png' alt='YouTube Icon'></img>
                <p className='text-white cursor-pointer'>
                  {creator.youtubeUrl}
                </p>
              </div>
            ) : null}
  
            {creator.twitchUrl ? (
              <div className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' onClick={() => window.open(formatUrl(creator.twitchUrl), '_blank')}>
                <img className='h-8 w-8' src='../twitch_icon.png' alt='Twitch Icon'></img>
                <p className='text-white cursor-pointer'>
                  {creator.twitchUrl}
                </p>
              </div>
            ) : null}
  
            {creator.twitterUrl ? (
              <div className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' onClick={() => window.open(formatUrl(creator.twitterUrl), '_blank')}>
                <img className='h-8 w-8' src='../twitter_icon.png' alt='Twitter Icon'></img>
                <p className='text-white cursor-pointer'>
                  {creator.twitterUrl}
                </p>
              </div>
            ) : null}
  
            {creator.instagramUrl ? (
              <div className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' onClick={() => window.open(formatUrl(creator.instagramUrl), '_blank')}>
                <img className='h-8 w-8' src='../instagram_icon.png' alt='Instagram Icon'></img>
                <p className='text-white cursor-pointer'>
                  {creator.instagramUrl}
                </p>
              </div>
            ) : null}
          </div>
  
          <div className='flex gap-8 w-full mt-auto'>
            <Link 
              to={`/EditCreator/${creator.id}`} 
              className='bg-blue-500 text-white text-center py-2 px-4 w-40 rounded border border-transparent hover:bg-blue-600 hover:outline hover:outline-2 hover:outline-white'
            >
              Edit Creator
            </Link>
            <button 
              onClick={handleDeleteClick} 
              className='bg-red-500 text-white text-center py-2 px-4 w-40 rounded hover:bg-red-600 hover:outline hover:outline-2 hover:outline-white'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCreator;
