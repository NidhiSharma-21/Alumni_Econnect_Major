
import React, { useState } from 'react';
import {
  HandThumbUpIcon,   // Replaces ThumbUpIcon
  ChatBubbleLeftIcon, // Replaces ChatAltIcon
  TrashIcon,
} from '@heroicons/react/24/outline';
import './style.css'
import Comment from './Comment';

const BlogCard = ({id, img, description, tags,user,onDelete,commentsCount,comments,createdOn }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false); 
  const formatDateTime = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,  // Set to false if you want 24-hour format
    });
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-3xl mx-auto">
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <img
          src={user.imageUrl}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-lg text-[#2d545e]">{user.name}</h4>
          <p className="text-sm text-gray-600 w-[80%]">{user.headLine}</p>
          <p className="text-xs text-gray-400">{formatDateTime(createdOn)}</p>
        </div>
      </div>

      {/* Blog Title */}
      {/* <h3 className="text-2xl font-bold text-gray-900">Alumni Econnect</h3> */}

      {/* Blog Image */}
      {img && (
        <img
          src={img}
          alt=""
          className="w-full h-48 object-cover rounded-lg mt-4 mb-4"
        />
      )}

      {/* Blog Description */}

      <div className="text-gray-700 blog-item text-lg leading-relaxed ">
        {isExpanded ? (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ maxHeight: isExpanded ? '1000px' : '100px', whiteSpace: 'normal' }}
          />
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: `${description.substring(0, 100)}...` }}
              style={{ maxHeight: isExpanded ? '1000px' : '100px', whiteSpace: 'normal' }}
            />

          </>
        )}
      </div>
      {description.length > 100 && (
        <button
          onClick={toggleReadMore}
          className="mt-2 text-[#d27511] hover:underline focus:outline-none"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap">
          {tags.map((tag) => (
            <span key={tag.id} className="inline-block bg-gray-200 px-3 py-1 mr-2 mb-2 rounded-md">
              #{tag.name}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4  space-x-4 flex items-center">
        <button
          className=" text-black px-2 py-2 rounded-md hover:text-blue-500 flex items-center"
          // onClick={handleLike}
        >
          <HandThumbUpIcon className="w-5 h-5 mr-2" /> 
          <span className="text-gray-700">Likes</span>
        </button>
        

        <button  onClick={toggleComments} className=" text-black px-2 py-2 rounded-md hover: flex items-center">
        <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
        <span className="text-gray-700">{commentsCount} Comments</span>
        </button>

          {/* Delete Button */}
            <button
          onClick={handleDelete}
          className="text-red-500 px-2 py-2 rounded-md hover:text-red-700 flex items-center ml-auto"
        >
          <TrashIcon className="w-5 h-5 mr-2" />
          <span className="text-gray-700">Delete</span>
        </button>
        
      </div>
      <section className="bg-white dark:bg-gray-900 py-1 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-[#2d545e] dark:text-white">
            Comments ({comments.length})
          </h2>
        </div>
        <form  className="mb-4" >
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="1"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              // value={newComment}
              // onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-[#d27511] bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>

        {/* Comments List */}
        {showComments &&comments&&comments.length>0&&comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            // onRemove={handleRemove}
            
          />
        ))}

        {/* If no comments */}
        {comments.length === 0 && (
          <p className="mt-12 text-center text-gray-500 dark:text-gray-400">
            No comments available
          </p>
        )}
      </div>
    </section>
    </div>
  );
};

export default BlogCard;
