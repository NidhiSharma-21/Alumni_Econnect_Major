import React, { useEffect, useState } from 'react';
import { HandThumbUpIcon, ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import './style.css';
import Comment from './Comment';
import { blogService } from '../../services/blogService';
import { NavLink } from 'react-router-dom';

const BlogCard = ({
  id,
  img,
  description,
  tags,
  user,
  onDelete,
  commentsCount,
  comments,
  createdOn,
  refreshComments,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const [blogComments, setBlogComments] = useState(comments);
  useEffect(() => {
    // This assumes 'comments' is passed as props
    const initializedComments = comments.map((c) => ({
      ...c,
      date: c.date || new Date().toISOString(), // freeze fallback once
    }));
    setBlogComments(initializedComments);
  }, [comments]);

  // ✅ Safe and locale-friendly date formatter
  const formatDateTime = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) throw new Error("Invalid Date");

      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      console.error("❌ Error formatting date:", error.message, "➡️ Value:", dateInput);
      return "Just now";
    }
  };

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const toggleComments = () => setShowComments(!showComments);
  const handleDelete = () => onDelete(id);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setPosting(true);
    try {
      await blogService.addComment(id, commentText); // just post the comment
      setCommentText('');
      const updatedComments = await refreshComments(id); // get all comments again
      setBlogComments(updatedComments); // ✅ update local state with new list
    } catch (error) {
      console.error(error);
      alert(error.message || 'Error posting comment');
    } finally {
      setPosting(false);
    }
  };


  const handleCommentUpdated = (updatedComment) => {
    setBlogComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleCommentRemoved = (removedCommentId) => {
    setBlogComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== removedCommentId)
    );
  };

  const formattedCreatedOn = formatDateTime(createdOn);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-6 w-full sm:w-4/5 md:w-3/5 mx-auto">
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <img src={user.imageUrl} alt={user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#d27511]" />
        <div className="ml-4">
          <NavLink to='/dashboard/profile' state={{ user }}>
            <h4 className="font-semibold text-md sm:text-lg text-[#2d545e]">{user.name}</h4>
          </NavLink>
          <p className="text-xs sm:text-sm text-gray-600">{user.headLine}</p>
          <p className="text-xs text-gray-400">{formattedCreatedOn}</p>
        </div>
      </div>

      {/* Blog Image */}
      {img && <img src={img} alt="Blog" className="w-full h-96 object-cover rounded-lg mt-4 mb-4 shadow-md" />}

      {/* Blog Description */}
      <div className="text-gray-700 blog-item text-base sm:text-lg leading-relaxed">
        {isExpanded ? (
          <div dangerouslySetInnerHTML={{ __html: description }} className="whitespace-normal" />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: `${description.substring(0, 100)}... ` }} className="whitespace-normal" />
        )}
      </div>
      {description.length > 100 && (
        <button onClick={toggleReadMore} className="mt-2 text-[#d27511] hover:underline focus:outline-none">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      {/* Buttons Section */}
      <div className="mt-4 space-x-2 sm:space-x-4 flex items-center">
        <button className="text-black px-2 py-2 rounded-md hover:bg-gray-100 flex items-center">
          <HandThumbUpIcon className="w-5 h-5 mr-1 sm:mr-2" />
          <span className="text-gray-700">Likes</span>
        </button>
        <button onClick={toggleComments} className="text-black px-2 py-2 rounded-md hover:bg-gray-100 flex items-center">
          <ChatBubbleLeftIcon className="w-5 h-5 mr-1 sm:mr-2" />
          <span className="text-gray-700">{blogComments.length} Comments</span>
        </button>
        <button onClick={handleDelete} className="text-red-500 px-2 py-2 rounded-md hover:text-red-700 flex items-center ml-auto">
          <TrashIcon className="w-5 h-5 mr-1 sm:mr-2" />
          <span className="text-gray-700">Delete</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <section className="bg-white py-2 sm:py-6 mt-4">
          <div className="max-w-2xl mx-auto px-2 sm:px-4">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-md sm:text-lg font-bold text-[#2d545e]">
                Comments ({blogComments.length})
              </h2>
            </div>
            <form className="mb-4" onSubmit={handlePostComment}>
              <div className="py-2 px-3 bg-gray-100 rounded-lg border border-gray-200">
                <textarea id="comment" rows="3" className="w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none resize-none"
                  placeholder="Write a comment..." required value={commentText} onChange={(e) => setCommentText(e.target.value)}>
                </textarea>
              </div>
              <button type="submit" className={`inline-flex items-center py-2 px-4 text-xs font-medium text-white bg-[#d27511] rounded-lg hover:bg-[#d27511]/80 focus:ring-4 focus:ring-[#d27511]/50 ${posting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={posting}>
                {posting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            {/* ✅ Render Comments */}
            {blogComments.length > 0 ? (
              blogComments.map((comment,i) => (
                <Comment key={i} comment={comment} onCommentUpdated={handleCommentUpdated} onCommentRemoved={handleCommentRemoved} />
              ))
            ) : (
              <p className="mt-4 sm:mt-6 text-center text-gray-500">No comments available</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogCard;
