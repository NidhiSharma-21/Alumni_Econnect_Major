import React, { useState, useEffect, useCallback } from 'react';
import BlogContent from '../components/BlogsCreateComponent/BlogContent';
import ImageUploader from '../components/BlogsCreateComponent/ImageUploader';
import TagInput from '../components/BlogsCreateComponent/TagInput';
import { blogService } from '../services/blogService';
import { MdPersonSearch, MdGroupAdd, MdOutlineTrendingUp } from 'react-icons/md';
import blogImage from '../assets/blog.svg';

const BlogEditor = () => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [customTags, setCustomTags] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const allTags = await blogService.getalltags();
                setTags(allTags || []);
            } catch (error) {
                console.error("Error fetching tags:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    const handleImageUrls = (urls) => {
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    };

    const getTagIds = (tagsList) => {
        return tagsList.map((tag) => tag.id).filter((id) => id !== null);
    };

    const sanitizeContent = (str) => {
        return str.replace(/^\s+|\s+$/g, '').replace(/\u200B/g, ''); // Trim and remove zero-width spaces
    };

    const handleSubmit = async () => {
        const trimmedContent = sanitizeContent(content); // Use the sanitize function
        console.log("Trimmed Content:", trimmedContent);

        if (!trimmedContent || imageUrls.length === 0 || customTags.length === 0) {
            alert("Please fill in all fields and add at least one tag and image.");
            return;
        }

        const tagIds = getTagIds([...customTags]);
        const blogPost = {
            Description: trimmedContent, // Use sanitized content
            Tags: tagIds,
            MediaFiles: imageUrls,
        };

        try {
            setLoading(true);
            const response = await blogService.addblog(blogPost);
            console.log("Blog Posted Successfully:", response);
            // Reset state after successful submission
            setContent('');
            setCustomTags([]);
            setImageUrls([]);
        } catch (err) {
            console.error("Error posting blog:", err);
            alert("An error occurred while posting the blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addCustomTag = useCallback((tag) => {
        if (tag && !customTags.some(t => t.id === tag.id)) {
            setCustomTags((prev) => [...prev, tag]);
        }
    }, [customTags]);

    const removeCustomTag = (tagId) => {
        setCustomTags(customTags.filter((t) => t.id !== tagId));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3 lg:pr-8">
                        <h2 className="text-4xl font-bold text-[#2D545E] mb-4 text-center lg:text-center">
                            Share Your Stories with Alumni Econnect
                        </h2>
                        <div className="flex-grow bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
                            <ImageUploader onImageUpload={handleImageUrls} />
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
                                    className={`bg-[#2D545E] text-white p-3 rounded-lg font-semibold hover:bg-[#1e3a4d] transition w-full max-w-xs mx-auto shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Publishing...' : 'Publish Your Blog'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right-Side Image and Content */}
                    <div className="hidden lg:flex lg:flex-col lg:w-1/3 lg:items-center lg:pl-8">
                        <img
                            src={blogImage}
                            alt="Blog Posting Visual"
                            className="rounded-lg mb-6 h-72 object-cover"
                        />
                        <h2 className="text-3xl font-semibold text-[#2D545E] mb-4 text-center">
                            Why Share on Alumni Econnect?
                        </h2>
                        <ul className="space-y-4">
                            {[{
                                icon: <MdPersonSearch className="text-[#d27511] text-3xl" />,
                                text: (
                                    <>
                                        <strong>Engage Your Alumni Community:</strong> Share insights and experiences to connect with fellow alumni.
                                    </>
                                ),
                            }, {
                                icon: <MdGroupAdd className="text-[#d27511] text-3xl" />,
                                text: (
                                    <>
                                        <strong>Build Your Alumni Network:</strong> Establish connections and make a lasting impact.
                                    </>
                                ),
                            }, {
                                icon: <MdOutlineTrendingUp className="text-[#d27511] text-3xl" />,
                                text: (
                                    <>
                                        <strong>Inspire Growth:</strong> Share success stories to motivate others.
                                    </>
                                ),
                            }].map((item, index) => (
                                <li key={index} className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm transition hover:shadow-md">
                                    {item.icon}
                                    <span className="ml-3 text-gray-700">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-center text-gray-600 mt-6">
                            Share your journey and inspire the alumni community today!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
