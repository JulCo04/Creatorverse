import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
    const navigate = useNavigate();

    const handleCreatorClick = () => {
        navigate(`ViewCreator/${creator.id}`);
    };
    
    const handleUrlClick = (url, e) => {
        e.stopPropagation(); 
        console.log(url)
        const formattedUrl = url.startsWith('http://') || url.startsWith('https://') 
        ? url 
        : `https://${url}`;
        console.log(formattedUrl)
        window.open(formattedUrl, '_blank');
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); 
        navigate(`EditCreator/${creator.id}`);
    };

    return (
        <div onClick={handleCreatorClick} className='relative rounded-lg w-full h-72 hover:border-b-4 border-2 border-slate-700 hover:border-slate-400 hover:cursor-pointer'>
            <img 
                className='hover:cursor-pointer h-full w-full rounded-lg' 
                src={creator.imageURL} 
                alt="Creator" 
                style={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.5)', // This simulates the hover background color
                    objectFit: 'cover', // This ensures the image covers the container
                    objectPosition: 'center', // This centers the image
                    zIndex: 1
                }} 
            />

            <div 
                className='absolute inset-0 bg-slate-950 opacity-50 rounded-lg'
                style={{ zIndex: 2 }}
            ></div>

            <div className='absolute inset-0 p-5 text-white flex flex-col justify-end h-full' style={{ zIndex: 3 }}>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-sky-300 text-2xl'>{creator.name}</h1>
                    <div className='hover:bg-blue-800 rounded-full' onClick={(e) => handleEditClick(e)}>
                        <img className="h-10" src="edit_icon.png" alt="Edit" />
                    </div>
                </div>
                <div className='flex'>
                    {creator.youtubeUrl && (
                        <div 
                            className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' 
                            onClick={(e) => handleUrlClick(creator.youtubeUrl, e)}
                        >
                        <img className='h-8 w-8' src='../youtube_icon.png' alt='YouTube Icon' />
                        </div>
                    )}
                    {creator.twitchUrl && (
                        <div 
                            className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' 
                            onClick={(e) => handleUrlClick(creator.twitchUrl, e)}
                        >
                            <img className='hover:cursor-pointer h-8 w-8' src='../twitch_icon.png' alt='Twitch Icon' />
                        </div>
                    )}
                    {creator.twitterUrl && (
                        <div 
                            className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' 
                            onClick={(e) => handleUrlClick(creator.twitterUrl, e)}
                        >
                            <img className='hover:cursor-pointer h-8 w-8' src='../twitter_icon.png' alt='Twitter Icon' />
                        </div>
                    )}
                    {creator.instagramUrl && (
                        <div 
                            className='flex mb-4 w-fit p-2 rounded-md duration-700 items-center gap-4 hover:bg-slate-500' 
                            onClick={(e) => handleUrlClick(creator.instagramUrl, e)}
                        > 
                            <img className='hover:cursor-pointer h-8 w-8' src='../instagram_icon.png' alt='Instagram Icon' />
                        </div>
                    )}
                </div>
                <div className='relative overflow-hidden'>
                    <p className='line-clamp-3'>{creator.description}</p>
                </div>
            </div>
        </div>

    );
}

export default CreatorCard;

