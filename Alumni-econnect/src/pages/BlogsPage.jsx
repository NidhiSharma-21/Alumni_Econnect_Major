// src/pages/BlogsPage.jsx

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogComponent/BlogCard';
import { blogService } from '../services/blogService';
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
        const response = await blogService.getBlog();
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

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogService.deleteBlog(blogId);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      setFilteredBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      alert('Blog deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  const isCreatePage = location.pathname === '/dashboard/blog/create';

  const tagsOptions = Array.from(new Set(blogs.flatMap((blog) => blog.tags.map((tag) => tag.name))))
    .map((tag) => ({ value: tag, label: tag }));

  const authorsOptions = Array.from(new Set(blogs.map((blog) => blog.user.name)))
    .map((author) => ({ value: author, label: author }));

  useEffect(() => {
    let tempBlogs = [...blogs];

    if (selectedTags.length > 0) {
      const selectedTagNames = selectedTags.map((tag) => tag.value);
      tempBlogs = tempBlogs.filter((blog) =>
        blog.tags.some((tag) => selectedTagNames.includes(tag.name))
      );
    }

    if (selectedAuthor) {
      tempBlogs = tempBlogs.filter((blog) => blog.user.name === selectedAuthor.value);
    }

    if (dateRange.start && dateRange.end) {
      tempBlogs = tempBlogs.filter((blog) => {
        const blogDate = new Date(blog.createdOn);
        return blogDate >= dateRange.start && blogDate <= dateRange.end;
      });
    }

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
    <section className="py-12 flex flex-col">
      {isCreatePage ? (
        <Outlet />
      ) : (
        <>
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
            <p className="mt-4 text-center text-gray-500 text-sm md:text-base">Loading...</p>
          ) : error ? (
            <p className="mt-4 text-center text-red-500 text-sm md:text-base">{error}</p>
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
              />
            ))
          ) : (
            <p className="mt-4 text-center text-gray-500 text-sm md:text-base">No blogs match the selected filters</p>
          )}
        </>
      )}
    </section>
  );
};

export default BlogsPage;
