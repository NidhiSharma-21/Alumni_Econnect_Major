// src/components/BlogComponent/BlogFilters.jsx

import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BlogFilters = ({
  tagsOptions,
  authorsOptions,
  selectedTags,
  setSelectedTags,
  selectedAuthor,
  setSelectedAuthor,
  dateRange,
  setDateRange,
  searchTerm,
  setSearchTerm,
}) => {
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
  };

  const handleAuthorChange = (selectedOption) => {
    setSelectedAuthor(selectedOption);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ start, end });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
      {/* Search Bar */}
      <div className="flex-1 mb-4 md:mb-0 md:mr-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d27511]"
        />
      </div>

      {/* Tag Filter */}
      <div className="flex-1 mb-4 md:mb-0 md:mr-4">
        <Select
          isMulti
          options={tagsOptions}
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Filter by tags"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Author Filter */}
      <div className="flex-1 mb-4 md:mb-0 md:mr-4">
        <Select
          options={authorsOptions}
          value={selectedAuthor}
          onChange={handleAuthorChange}
          placeholder="Filter by author"
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Date Range Filter */}
      <div className="flex-1">
        <DatePicker
          selectsRange
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={handleDateChange}
          isClearable={true}
          placeholderText="Select date range"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d27511]"
        />
      </div>
    </div>
  );
};

export default BlogFilters;
