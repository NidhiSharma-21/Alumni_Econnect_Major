import React, { useState } from 'react';

const TagInput = ({ predefinedTags, customTags, addCustomTag, removeCustomTag }) => {
    const [newTag, setNewTag] = useState('');

    const handleAddCustomTag = () => {
        // Check if the new tag doesn't start with '#', then add it
        const formattedTag = newTag.startsWith('#') ? newTag : `#${newTag}`;
        addCustomTag(formattedTag);
        setNewTag(''); // Reset input
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#D27511]">Tags</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a custom tag"
                    className="border border-gray-300 p-2 rounded mr-2 flex-1"
                />
                <button
                    onClick={handleAddCustomTag}
                    className="bg-[#D27511] text-white p-2 rounded hover:bg-[#cc8233] transition"
                >
                    Add Tag
                </button>
            </div>
            <div className="flex flex-wrap mb-4">
                {predefinedTags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 p-1 rounded mr-2 mb-2 cursor-pointer hover:bg-gray-300"
                        onClick={() => addCustomTag(tag)}>
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap">
                {customTags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 p-1 rounded mr-2 mb-2 flex items-center">
                        {tag}
                        <button
                            onClick={() => removeCustomTag(tag)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagInput;
