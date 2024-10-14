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
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-white shadow-lg rounded-xl space-y-4 md:space-y-0 md:space-x-6">
      {/* Search Bar */}
      <div className="flex-1 w-full md:w-1/4 mb-4 md:mb-0">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out shadow-sm"
        />
      </div>

      {/* Tag Filter */}
      <div className="flex-1 w-full md:w-1/4 mb-4 md:mb-0">
        <Select
          isMulti
          options={tagsOptions}
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Filter by tags"
          className="react-select-container shadow-sm"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              padding: '0.5rem',
              borderRadius: '0.5rem',
              borderColor: '#d1d5db',
              boxShadow: 'none',
              '&:hover': { borderColor: '#d27511' },
            }),
          }}
        />
      </div>

      {/* Author Filter */}
      <div className="flex-1 w-full md:w-1/4 mb-4 md:mb-0">
        <Select
          options={authorsOptions}
          value={selectedAuthor}
          onChange={handleAuthorChange}
          placeholder="Filter by author"
          isClearable
          className="react-select-container shadow-sm"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              padding: '0.5rem',
              borderRadius: '0.5rem',
              borderColor: '#d1d5db',
              boxShadow: 'none',
              '&:hover': { borderColor: '#d27511' },
            }),
          }}
        />
      </div>

      {/* Date Range Filter */}
      <div className="flex-1 w-full md:w-1/4 mb-4 md:mb-0">
        <DatePicker
          selectsRange
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={handleDateChange}
          isClearable={true}
          placeholderText="Select date range"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out shadow-sm"
        />
      </div>
    </div>
  );
};

export default BlogFilters;
