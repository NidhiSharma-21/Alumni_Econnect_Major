// src/pages/BlogsPage.js

import React, { useEffect, useState } from 'react';
import { userService } from '../services/userServices';
import BlogCard from '../components/BlogComponent/BlogCard';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // Optional: For loading state
  const [error, setError] = useState(null); // Optional: For error handling

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await userService.getBlog();
        console.log('Fetched blogs:', response);

        // For each blog, fetch comments count
        const blogsWithComments = await Promise.all(
          response.map(async (blog) => {
            try {
              const comments = await userService.getComments(blog.id);
              return { ...blog,comment:comments, commentsCount: comments.length };
            } catch (error) {
              console.error(`Error fetching comments for blog ID ${blog.id}:`, error);
              return { ...blog, commentsCount: 0 }; // Default to 0 if error occurs
            }
          })
        );

        setBlogs(blogsWithComments);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // Handler to delete a blog
  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await userService.deleteBlog(blogId);
      // Remove the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      alert('Blog deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  return (
    <section className="py-12 mt-6 flex flex-col">
      {loading ? (
        <p className="mt-12 text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-12 text-center text-red-500">{error}</p>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            img={blog.imageUrls}
            description={blog.description}
            tags={blog.tags}
            user={blog.user}
            onDelete={handleDelete}
            commentsCount={blog.commentsCount} // Pass comments count as a prop
            comments={blog.comment}
            createdOn={blog.createdOn}
          />
        ))
      ) : (
        <p className="mt-12 text-center text-gray-500">No blogs available</p> // Show this if there are no blogs
      )}
    </section>
  );
};

export default BlogsPage;
