// src/pages/BlogsPage.jsx

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogComponent/BlogCard';
import { blogService } from '../services/blogService';
import { NavLink } from 'react-router-dom'; // For sub-navigation links

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation(); // Get current location

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await blogService.getBlog();
        console.log('Fetched blogs:', response);

        // Fetch comments count for each blog
        const blogsWithComments = await Promise.all(
          response.map(async (blog) => {
            try {
              const comments = await blogService.getComments(blog.id);
              return { ...blog, comments, commentsCount: comments.length };
            } catch (error) {
              console.error(`Error fetching comments for blog ID ${blog.id}:`, error);
              return { ...blog, commentsCount: 0, comments: [] }; // Default to 0 and empty comments if error occurs
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

  // Function to refresh comments for a specific blog
  const refreshComments = async (blogId) => {
    try {
      const comments = await blogService.getComments(blogId);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments, commentsCount: comments.length }
            : blog
        )
      );
    } catch (error) {
      console.error(`Error refreshing comments for blog ID ${blogId}:`, error);
      // Optionally, set an error state or notify the user
    }
  };

  // Handler to delete a blog
  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogService.deleteBlog(blogId);
      // Remove the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      alert('Blog deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  // Determine if the current route is '/dashboard/blog/create'
  const isCreatePage = location.pathname === '/dashboard/blog/create';

  return (
    <section className="py-12 mt-6 flex flex-col">
      {/* Render either the CreateBlog component or the Blogs list */}
      {isCreatePage ? (
        <Outlet />
      ) : (
        <>
          {loading ? (
            <p className="mt-12 text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="mt-12 text-center text-red-500">{error}</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                img={blog.mediaUrls}
                description={blog.description}
                tags={blog.tags}
                user={blog.user}
                onDelete={handleDelete}
                commentsCount={blog.commentsCount} // Pass comments count as a prop
                comments={blog.comments}
                createdOn={blog.createdOn}
                refreshComments={refreshComments} // Pass the refresh function
              />
            ))
          ) : (
            <p className="mt-12 text-center text-gray-500">No blogs available</p>
          )}
        </>
      )}
    </section>
  );
};

export default BlogsPage;
