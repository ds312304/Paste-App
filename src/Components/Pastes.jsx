import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, Copy, Eye, PencilLine, Share, Trash2 } from 'lucide-react';

const Pastes = () => {
    const pastes = useSelector((state) => state.paste.pastes);

    const dispatch = useDispatch();

    const [searchTerm, setSerachTerm] = useState('');

    const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleShare(paste) {
        if (navigator.share) {
            navigator.share({
                title: paste.title,
                text: paste.content,
                url: window.location.href,
            })
                .catch((error) => toast.error('Sharing failed: ' + error.message));
        } else {
            toast.error('Share Api not supported on this device.');
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(date);
    }


    return (
        <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-5'>
            <div className='flex flex-col gap-y-3'>
                <div className='w-full flex gap-10 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6 relative'>
                    <input
                        className="w-full text-black bg-white border border-input focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-md p-2"
                        type="Search"
                        placeholder="Search Paste here..."
                        value={searchTerm}
                        onChange={(e) => setSerachTerm(e.target.value)}
                    />
                </div>
                <div className='flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]'>
                    <h2 className='px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4 flex'>All Pastes</h2>
                    <div className='w-full px-4 pt-4 flex flex-col gap-y-5'>
                        {
                            filterData.length > 0 ? (
                                filterData.map(
                                    (paste) => (
                                        <div className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]" key={paste?._id}>

                                            <div className='items-start flex flex-col gap-y-0'>
                                                <p className='font-semibold text-3xl'>{paste.title}</p>
                                                <p className="text-left text-sm font-normal max-w-full leading-8 text-ellipsis text-gray-400 line-clamp-1 max-h-[3.5rem]" style={{
                                                    overflow: 'hidden',
                                                    display: "-webkit-box",
                                                    maxWidth: "100%",
                                                    wordBreak: "break-word",
                                                    whiteSpace: "normal",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                }}>{paste.content}</p>
                                            </div>

                                            <div className='flex flex-col gap-y-4 sm:items-end'>
                                                <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                                                    <a href={`/?pasteId=${paste?._id}`}>
                                                        <button className='bg-white border-black text-black p-2 border rounded-md hover:bg-gray-200'>
                                                            <PencilLine size={18} />
                                                        </button>
                                                    </a>

                                                    <a href={`/pastes/${paste?._id}`}>
                                                        <button className='bg-white border-black text-black p-2 border rounded-md hover:bg-gray-200'>
                                                            <Eye size={18} />
                                                        </button>
                                                    </a>

                                                    <button className='bg-white border-black text-black p-2 hover:bg-gray-200' onClick={() => handleDelete(paste?._id)}>
                                                        <Trash2 size={18} />
                                                    </button>

                                                    <button className='bg-white border-black text-black p-2 border rounded-md hover:bg-gray-200' onClick={() => {
                                                        navigator.clipboard.writeText(paste?.content)
                                                        toast.success("Copied to Clipboard")
                                                    }}>
                                                        <Copy size={18} />
                                                    </button>

                                                    <button className='bg-white border-black text-black p-2 border rounded-md hover:bg-gray-200' onClick={() => handleShare(paste)}>
                                                        <Share size={18} />
                                                    </button>
                                                </div>
                                                <div className='gap-x-2 flex'>
                                                    <Calendar size={18} />
                                                    <p className='text-sm font-semibold text-black f'>{formatDate(paste.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )
                                : (<p className='text-center text-gray-700 font-semibold text-4xl py-10'>No Data Found</p>
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pastes