import React, { useEffect, useState } from 'react';
import { blogService } from '../../services/blogService';

const TagInput = ({ predefinedTags, customTags, addCustomTag, removeCustomTag }) => {
    const [newTag, setNewTag] = useState('');
    const [filterTag, setFilterTag] = useState([]);
    // State for search input

    const handleAddCustomTag = async() => {
        const formattedTag = newTag.startsWith('#') ? newTag : `#${newTag}`;

        try {
            const response= await blogService.addtag({name:formattedTag});
            console.log(response)
            
                // Only add the tag to the local state if the API call is successful
                if (!customTags.includes(formattedTag)) {
                    addCustomTag(formattedTag);
                }
             else {
                console.error('Error: Failed to add tag.');
            }
            setNewTag('');
        } catch (error) {
            
        }
        
    };


    const startWithTag = async (term) => {
        if(term.length<1){

        }
        try {
            const responce = await blogService.getalltagsStartsWith(term);
            setFilterTag(responce||[]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setNewTag(e.target.value)
        startWithTag(e.target.value)
    }
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#D27511]">Tags</h2>

            {/* Search input to filter tags */}


            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => handleChange(e)
                    }
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
                {filterTag.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 p-1 rounded mr-2 mb-2 cursor-pointer hover:bg-gray-300"
                        onClick={() => addCustomTag(tag.name)} // Add the tag name directly
                    >
                        {tag.name}
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
