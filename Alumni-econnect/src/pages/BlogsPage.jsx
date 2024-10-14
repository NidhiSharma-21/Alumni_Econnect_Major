// src/pages/BlogsPage.jsx

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogComponent/BlogCard';

import { blogService } from '../services/blogService';
import { NavLink } from 'react-router-dom';
import BlogFilters from '../components/BlogComponent/BlogFilter';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await blogService.getBlog(); // Modify if using server-side filtering
        console.log('Fetched blogs:', response);

        // Fetch comments count for each blog
        const blogsWithComments = await Promise.all(
          response.map(async (blog) => {
            try {
              const comments = await blogService.getComments(blog.id);
              return { ...blog, comments, commentsCount: comments.length };
            } catch (error) {
              console.error(`Error fetching comments for blog ID ${blog.id}:`, error);
              return { ...blog, commentsCount: 0, comments: [] };
            }
          })
        );

        setBlogs(blogsWithComments);
        setFilteredBlogs(blogsWithComments);
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
      setFilteredBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments, commentsCount: comments.length }
            : blog
        )
      );
    } catch (error) {
      console.error(`Error refreshing comments for blog ID ${blogId}:`, error);
    }
  };

  // Handler to delete a blog
  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogService.deleteBlog(blogId);
      // Remove the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      setFilteredBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      alert('Blog deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  // Determine if the current route is '/dashboard/blog/create'
  const isCreatePage = location.pathname === '/dashboard/blog/create';

  // Fetch unique tags and authors for filter options
  const tagsOptions = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags.map((tag) => tag.name)))
  ).map((tag) => ({ value: tag, label: tag }));

  const authorsOptions = Array.from(new Set(blogs.map((blog) => blog.user.name)))
    .map((author) => ({ value: author, label: author }));

  // Apply filters
  useEffect(() => {
    let tempBlogs = [...blogs];

    // Filter by tags
    if (selectedTags.length > 0) {
      const selectedTagNames = selectedTags.map((tag) => tag.value);
      tempBlogs = tempBlogs.filter((blog) =>
        blog.tags.some((tag) => selectedTagNames.includes(tag.name))
      );
    }

    // Filter by author
    if (selectedAuthor) {
      tempBlogs = tempBlogs.filter((blog) => blog.user.name === selectedAuthor.value);
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      tempBlogs = tempBlogs.filter((blog) => {
        const blogDate = new Date(blog.createdOn);
        return blogDate >= dateRange.start && blogDate <= dateRange.end;
      });
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempBlogs = tempBlogs.filter(
        (blog) =>
          blog.name.toLowerCase().includes(lowerSearchTerm) ||
          blog.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredBlogs(tempBlogs);
  }, [blogs, selectedTags, selectedAuthor, dateRange, searchTerm]);

  return (
    <section className="py-12 mt-6 flex flex-col">
      {/* Render either the CreateBlog component or the Blogs list */}
      {isCreatePage ? (
        <Outlet />
      ) : (
        <>
          {/* Filter Section */}
          <BlogFilters
            tagsOptions={tagsOptions}
            authorsOptions={authorsOptions}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            dateRange={dateRange}
            setDateRange={setDateRange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {loading ? (
            <p className="mt-12 text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="mt-12 text-center text-red-500">{error}</p>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                img={blog.mediaUrls}
                description={blog.description}
                tags={blog.tags}
                user={blog.user}
                onDelete={handleDelete}
                commentsCount={blog.commentsCount}
                comments={blog.comments}
                createdOn={blog.createdOn}
                refreshComments={refreshComments}
              />
            ))
          ) : (
            <p className="mt-12 text-center text-gray-500">No blogs match the selected filters</p>
          )}
        </>
      )}
    </section>
  );
};

export default BlogsPage;
