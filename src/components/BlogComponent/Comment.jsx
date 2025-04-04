import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { blogService } from '../../services/blogService';
import Modal from 'react-modal';



// Set the app element for accessibility
Modal.setAppElement('#root'); // Ensure this matches your app's root element

const Comment = ({ comment, onCommentUpdated, onCommentRemoved }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content || comment.comment); // Adjust based on your comment structure
    const [isRemoving, setIsRemoving] = useState(false);

    const handleEdit = async () => {
        if (!editedContent.trim()) {
            console.error("Comment cannot be empty.");
            return;
        }

        try {
            const response = await blogService.EditComments(comment.id, editedContent);
            toast.success("Comment updated successfully.");
            setIsEditModalOpen(false);
            if (onCommentUpdated) {
                onCommentUpdated(response); // Pass updated comment data
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update the comment. Please try again.");
        }
    };

    const handleRemove = async () => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        setIsRemoving(true);
        try {
            const response = await blogService.RemoveComments(comment.id);
            // toast.success("Comment removed successfully.");
            if (onCommentRemoved) {
                onCommentRemoved(comment.id); // Inform parent to remove comment from state
            }
        } catch (error) {
            console.error(error);
            alert("Failed to remove the comment. Please try again.");
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <article className="mb-3 text-base bg-white rounded-lg dark:bg-gray-900 p-4">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                <img
  src={comment?.user?.imageUrl || '/default-avatar.png'} // ✅ Uses default if undefined
  alt={comment?.user?.name || 'Unknown User'}
  className="w-10 h-10 rounded-full"
/>
                    <div>
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
  {comment?.user?.name || "Unknown User"}
</p>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime={comment.date} title={comment.date}>
                                {new Date(comment.date).toLocaleString()} {/* Format date */}
                            </time>
                        </p>
                    </div>
                </div>
                {/* Dropdown Menu */}
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <EllipsisVerticalIcon className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">Comment settings</span>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 w-36 mt-2 origin-top-right bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div className="py-1">
                            {/* Only show edit and remove options if the user is authorized */}
                            {/* You might need to add a condition here based on the current user */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className={`${
                                            active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                        } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                    >
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleRemove}
                                        disabled={isRemoving}
                                        className={`${
                                            active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                        } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                                            isRemoving ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isRemoving ? 'Removing...' : 'Remove'}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Menu>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.content || comment.comment}</p>
            <div className="flex items-center mt-4 space-x-4">
                <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                    <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                    </svg>
                    Reply
                </button>
            </div>

            {/* Edit Comment Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Comment"
                className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    rows="4"
                ></textarea>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </article>
    );

};

export default Comment;
