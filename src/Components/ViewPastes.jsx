import { Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPastes = () => {
    const { id } = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter((p) => p._id === id)[0];

    return (
        <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
            <div className="flex flex-col gap-y-5 items-start">
                <input
                    className='w-full text-black border border-input rounded-md p-2'
                    type="text"
                    placeholder="Title"
                    value={paste.title}
                    disabled
                    onChange={(e) => setTitle(e.target.value)} />
                <div className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}>
                    <div className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)] `}>
                        <div className='w-full flex gap-x-[6px] items-center select-none group'>
                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]' />
                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]' />

                            <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]' />
                        </div>
                        <div className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}>

                            <button className={`flex justify-center items-center transition-all duration-300 ease-in-out group bg-white`} onClick={() => {
                                navigator.clipboard.writeText(paste.content);
                                toast.success("Copied to Clipboard");
                            }}>
                                <Copy className='group-hover:text-success-500' size={20} />
                            </button>
                        </div>
                    </div>
                    <textarea className="w-full p-3 focus-visible:ring-0"
                        value={paste.content}
                        placeholder='Write Your Content Here....'
                        disabled
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            caretColor: "#000",
                        }}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewPastes