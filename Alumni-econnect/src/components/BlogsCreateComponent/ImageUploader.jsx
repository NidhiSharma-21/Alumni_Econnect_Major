import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const ImageUploader = ({ setContent, setImageUrls }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrlsState] = useState([]);
    const [dragActive, setDragActive] = useState(false);

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (files) => {
        const newImageFiles = [...imageFiles, ...files];
        const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file));
        setImageFiles(newImageFiles);
        setImageUrlsState(newImageUrls);
        setImageUrls(newImageUrls); // Pass image URLs to the parent
        newImageFiles.forEach((file) => {
            setContent((prevContent) => prevContent + `<img src="${URL.createObjectURL(file)}" alt="Uploaded Image" />`);
        });
    };

    const removeImage = (index) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        const updatedUrls = imageUrls.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        setImageUrlsState(updatedUrls);
        setImageUrls(updatedUrls); // Update parent state with new image URLs
        setContent((prevContent) => {
            const newContent = prevContent.split('<img src="').filter((_, i) => i < updatedUrls.length).join('<img src="');
            return newContent + (newContent ? '' : `<img src="${updatedUrls[0]}" alt="Uploaded Image" />`);
        });
    };

    return (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-[#D27511] flex items-center">
                Insert Images
            </h2>
            <div
                className={`border-2 border-dashed p-6 rounded-lg text-center transition-all duration-300 ${
                    dragActive ? 'border-blue-500' : 'border-gray-300'
                }`}
                onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                onDrop={handleFileDrop}
            >
                <p className="text-gray-600">Drag and drop images here or</p>
                <label className="inline-block mt-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                    />
                    <span className="cursor-pointer bg-[#D27511] text-white px-4 py-2 rounded hover:bg-[#cc8233] transition flex items-center justify-center">
                        <AiOutlineUpload className="mr-1" /> Upload Images
                    </span>
                </label>
            </div>
            {/* Image preview section */}
            {imageUrls.length > 0 && (
                <div className="mt-4 flex justify-center flex-wrap">
                    {imageUrls.map((url, index) => (
                        <div
                            key={index}
                            className="m-2 text-center bg-gray-100 p-2 rounded-lg shadow-md w-40 h-56 flex flex-col justify-between"
                        >
                            <img
                                src={url}
                                alt={`Uploaded Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                            />
                            <p className="mt-2 text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">
                                {imageFiles[index].name}
                            </p>
                            <button
                                onClick={() => removeImage(index)}
                                className="mt-1 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition flex items-center justify-center"
                            >
                                <MdDelete className="mr-1" /> Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
