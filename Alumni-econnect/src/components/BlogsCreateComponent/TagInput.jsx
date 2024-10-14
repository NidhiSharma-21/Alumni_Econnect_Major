// src/components/BlogsCreateComponent/TagInput.jsx

import React, { useState } from 'react';
import { blogService } from '../../services/blogService';

const TagInput = ({ predefinedTags, customTags, addCustomTag, removeCustomTag }) => {
    const [newTag, setNewTag] = useState('');
    const [filterTag, setFilterTag] = useState([]);

    const handleAddCustomTag = async () => {
        const formattedTagName = newTag.startsWith('#') ? newTag.substring(1) : newTag;

        if (!formattedTagName) {
            alert("Tag name cannot be empty.");
            return;
        }

        try {
            const response = await blogService.addtag(formattedTagName);
            console.log("Added Tag Response:", response);

            if (response && response.id && response.name) {
                // Prevent adding duplicate tags by checking ID
                if (!customTags.some(tag => tag.id === response.id)) {
                    addCustomTag(response); // Add the entire tag object
                } else {
                    console.error('Error: Tag already exists.');
                    alert('Tag already exists.');
                }
            } else {
                console.error('Error: Invalid tag response from server.');
                alert('Failed to add tag. Please try again.');
            }
            setNewTag('');
        } catch (error) {
            console.error('Error adding tag:', error);
            alert('Failed to add tag. Please try again.');
        }
    };

    const startWithTag = async (term) => {
        if (term.length < 1) {
            setFilterTag([]);
            return;
        }
        try {
            const response = await blogService.getalltagsStartsWith(term);
            setFilterTag(response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setNewTag(e.target.value);
        startWithTag(e.target.value);
    };

    const handleSelectFilteredTag = (tag) => {
        addCustomTag(tag); // Add the entire tag object
        setFilterTag([]);
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#D27511]">Tags</h2>

            {/* Input to add custom tag */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTag}
                    onChange={handleChange}
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

            {/* Display filtered tags based on search */}
            <div className="flex flex-wrap mb-4">
                {filterTag.map((tag) => (
                    <span
                        key={tag.id}
                        className="inline-block bg-gray-200 px-3 py-1 mr-2 mb-2 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
                        onClick={() => handleSelectFilteredTag(tag)}
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>

            {/* Display selected custom tags */}
            <div className="flex flex-wrap">
                {customTags.map((tag) => (
                    <span key={tag.id} className="bg-gray-200 px-3 py-1 mr-2 mb-2 rounded-md flex items-center">
                        #{tag.name}
                        <button
                            onClick={() => removeCustomTag(tag.id)}
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
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
