import React, { useState } from 'react';
import { FaTrashAlt, FaUpload } from 'react-icons/fa'; // Import icons

const ImageUploader = ({ onImageUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]); // Append new files
        onImageUpload([...selectedFiles, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
        onImageUpload(updatedFiles);
    };

    return (
        <div className="mb-4 p-4 border rounded shadow-lg">
            <label className="cursor-pointer flex flex-col items-center space-y-2">
                <FaUpload className="text-gray-500 text-xl" />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <span className="text-sm text-gray-600">Upload Images</span>
            </label>

            <div className="flex space-x-4 mt-4 justify-center">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Selected"
                            className="w-28 h-28 object-cover rounded" // Increased size
                            onLoad={() => URL.revokeObjectURL(file)}
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-lg text-red-600"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
