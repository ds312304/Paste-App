import { Copy, PlusCircle, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    const createPaste = () => {
        if (!title.trim() || !value.trim()) {
            toast.error("Provide all the field", {
                style: {
                    background: "#FFEAEB",  
                    color: "#ff0000",
                    border: "1px solid #b91c1c",
                },
                duration: 3000,  
            });
            return;
        }
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));// Update existing paste
        } else {
            dispatch(addToPastes(paste)); // Create new paste
        }

        resetPaste();
    };

    const resetPaste = () => {
        // Remove pasteId from URL
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("pasteId");
        setSearchParams(newParams);
    
        // Ensure state updates AFTER searchParams change
        setTimeout(() => {
            setTitle("");
            setValue("");
        }, 0); // Small delay allows React to update correctly
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast.success("Copied to clipboard!");
    };

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    return (
        <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-5">
            <div className="flex flex-col gap-y-5 items-start">
                <div className="w-full flex flex-row gap-x-4 justify-between items-center">
                    <input
                        className={`${pasteId ? "w-[80%]" : "w-[85%]"} text-black bg-white border border-input focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-md p-2 `}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="flex items-center gap-3 ">
                    <button
                        onClick={createPaste}
                        onMouseLeave={(e) => e.currentTarget.blur()} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 font-medium rounded-md text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 ease-in-out"
                    >
                        {pasteId ? "Update Paste" : "Create My Paste"}
                    </button>


                    {pasteId && (
                        <button
                            className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-2"
                            onClick={resetPaste}
                        >
                            <PlusCircle size={20}/>New Paste
                            
                        </button>
                    )}
                    </div>
                </div>

                <div className="w-full flex flex-col items-start relative bg-opacity-10 border rounded-md border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
                    <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
                        <div className="w-full flex gap-x-[6px] items-center select-none">
                            <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
                            <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
                            <div className="w-[13px] h-[13px] rounded-full bg-[rgba(45,200,66)]" />
                        </div>

                        <button
                            className=" flex bg-white  text-black"
                            onClick={handleCopy}
                        >
                            <Copy size={18} />
                        </button>
                    </div>
                    <textarea
                        className="w-full max-w-[100vw] p-4 bg-white resize-none rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700 overflow-hidden"
                        value={value}
                        placeholder="Write Your Content Here...."
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
