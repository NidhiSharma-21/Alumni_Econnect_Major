import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        setSelectedFiles(files);
        onImageUpload(files); // Pass the File objects back to the parent component
    };

    return (
        <div className="mb-4">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />
            <div className="flex space-x-4">
                {selectedFiles.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Selected"
                        className="w-24 h-24 object-cover rounded"
                        onLoad={() => URL.revokeObjectURL(file)} // Clean up memory
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
