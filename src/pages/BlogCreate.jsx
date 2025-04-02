import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from '../components/BlogsCreateComponent/ImageUploader';
import TagInput from '../components/BlogsCreateComponent/TagInput';
import { blogService } from '../services/blogService';
import { MdPersonSearch, MdGroupAdd, MdOutlineTrendingUp } from 'react-icons/md';
import blogImage from '../assets/blog.svg';

// Initialize editor with empty state
const createEmptyEditorState = () => {
  try {
    return EditorState.createEmpty();
  } catch (error) {
    console.error("Error creating editor state:", error);
    return EditorState.createEmpty();
  }
};

const BlogEditor = () => {
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(createEmptyEditorState());
    const [tags, setTags] = useState([]);
    const [customTags, setCustomTags] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editorError, setEditorError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const allTags = await blogService.getalltags();
                setTags(allTags || []);
            } catch (error) {
                console.error("Error fetching tags:", error);
                toast.error('Failed to load tags');
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

    const sanitizeContent = (html) => {
        try {
            const blocksFromHTML = convertFromHTML(html);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            return stateToHTML(state);
        } catch (error) {
            console.error("Error sanitizing content:", error);
            return html;
        }
    };

    const handleEditorChange = (newEditorState) => {
        try {
            setEditorState(newEditorState);
            setEditorError(null);
        } catch (error) {
            console.error("Editor error:", error);
            setEditorError("There was an error with the editor. Please try again.");
        }
    };

    const handleSubmit = async () => {
        try {
            const contentState = editorState.getCurrentContent();
            const htmlContent = stateToHTML(contentState);
            const trimmedContent = sanitizeContent(htmlContent);
            
            if (!trimmedContent) {
                toast.error('Blog content cannot be empty');
                return;
            }
            if (imageUrls.length === 0) {
                toast.error('Please add at least one image');
                return;
            }
            if (customTags.length === 0) {
                toast.error('Please add at least one tag');
                return;
            }

            const tagIds = getTagIds([...customTags]);
            const blogPost = {
                Description: trimmedContent,
                Tags: tagIds,
                MediaFiles: imageUrls,
            };

            setLoading(true);
            const response = await blogService.addblog(blogPost);
            
            toast.success('Blog created successfully!', {
                autoClose: 2000,
                onClose: () => navigate('/dashboard/blog')
            });
            
            // Reset state after successful submission
            setEditorState(createEmptyEditorState());
            setCustomTags([]);
            setImageUrls([]);
            
        } catch (err) {
            console.error("Error posting blog:", err);
            toast.error('Failed to create blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addCustomTag = useCallback((tag) => {
        if (tag && !customTags.some(t => t.id === tag.id)) {
            setCustomTags((prev) => [...prev, tag]);
            toast.success(`Tag "${tag.name}" added`, { autoClose: 1500 });
        }
    }, [customTags]);

    const removeCustomTag = (tagId) => {
        const tagToRemove = customTags.find(t => t.id === tagId);
        setCustomTags(customTags.filter((t) => t.id !== tagId));
        toast.info(`Tag "${tagToRemove?.name}" removed`, { autoClose: 1500 });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
                            
                            {/* React Draft Wysiwyg Editor with error handling */}
                            <div className="mt-4 border rounded-lg p-2 min-h-[300px]">
                                {editorError && (
                                    <div className="text-red-500 mb-2">{editorError}</div>
                                )}
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChange}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image', 'history'],
                                        inline: { 
                                            inDropdown: true,
                                            options: ['bold', 'italic', 'underline', 'strikethrough']
                                        },
                                        blockType: {
                                            inDropdown: true,
                                            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote']
                                        },
                                        list: { 
                                            inDropdown: true,
                                            options: ['unordered', 'ordered']
                                        },
                                        textAlign: { 
                                            inDropdown: true,
                                            options: ['left', 'center', 'right', 'justify']
                                        },
                                        link: { 
                                            inDropdown: true,
                                            showOpenOptionOnHover: true,
                                            defaultTargetOption: '_self'
                                        },
                                        history: { 
                                            inDropdown: true,
                                            options: ['undo', 'redo']
                                        },
                                    }}
                                />
                            </div>
                            
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