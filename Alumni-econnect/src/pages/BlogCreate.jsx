import React, { useState, useEffect } from 'react';
import BlogContent from '../components/BlogsCreateComponent/BlogContent'; // Ensure this component uses TinyMCE correctly
import ImageUploader from '../components/BlogsCreateComponent/ImageUploader';
import TagInput from '../components/BlogsCreateComponent/TagInput';
import { blogService } from '../services/blogService';

const BlogEditor = () => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [customTags, setCustomTags] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    

    const handleImageUrls = (urls) => {
        setImageUrls(urls);
    };

    const getTagIds = (tags) => {
        return tags.map((tag) => tag.id).filter((id) => id !== null);
    };

    const handleSubmit = async () => {
        const tagIds = getTagIds(customTags);
        const blogPost = {
            description: content,
            tags: tagIds,
            imageUrls: imageUrls,
        };

        console.log("Blog Post Data:", blogPost);
        try {
            const response = await blogService.addblog(blogPost);
            console.log("Blog Posted Successfully:", response);
        } catch (err) {
            console.error("Error posting blog:", err);
        }
        const fetchTags = async () => {
            try {
                const allTags = await blogService.getalltags();
                setTags(allTags || []);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
    };

    const addCustomTag = (tag) => {
        if (tag && !customTags.includes(tag)) {
            setCustomTags([...customTags, tag]);
        }
    };

    const removeCustomTag = (tag) => {
        setCustomTags(customTags.filter((t) => t !== tag));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 p-5">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 text-center text-[#2D545E] mt-20">
                Share Your Experiences and Updates
            </h2>
            <div className="flex-grow bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                <ImageUploader setContent={setContent} setImageUrls={handleImageUrls} />
                <TagInput
                    predefinedTags={tags}
                    customTags={customTags}
                    addCustomTag={addCustomTag}
                    removeCustomTag={removeCustomTag}
                />
                <BlogContent content={content} setContent={setContent} />
                <div className="mt-8 text-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#2D545E] text-white p-3 rounded-lg font-semibold hover:bg-[#1e3a4d] transition w-full max-w-xs mx-auto shadow-lg"
                    >
                        Publish Your Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
