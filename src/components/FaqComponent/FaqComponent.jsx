import React, { useState } from 'react';

const FaqDetail = ({ id, title, content, isOpen, onToggle }) => (
  <div className="group rounded-lg bg-white p-4 border border-gray-400">
    <div
      className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      onClick={() => onToggle(id)}
    >
      <h2 className="font-medium">{title}</h2>
      <span className="relative size-5 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute inset-0 size-5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#2d545e"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute inset-0 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#2d545e"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </div>
    {isOpen && <p className="mt-4 leading-relaxed text-gray-700">{content}</p>}
  </div>
);

const FaqComponent = () => {
  const [openDetail, setOpenDetail] = useState(null);

  const handleToggle = (id) => {
    setOpenDetail(openDetail === id ? null : id);
  };

  return (
    <div className="space-y-2">
      <FaqDetail
        id="alumniPurpose"
        title="What is Alumni Econnect?"
        content="Alumni Econnect is a platform designed to connect graduates from various institutions. It facilitates networking, career advancement, and personal growth by allowing alumni to interact, share resources, and collaborate."
        isOpen={openDetail === 'alumniPurpose'}
        onToggle={handleToggle}
      />
      <FaqDetail
        id="benefits"
        title="How does Alumni Econnect benefit me?"
        content="Alumni Econnect provides you with access to a wide network of professionals. You can seek career advice, share job opportunities, and collaborate on projects. The platform offers valuable resources for continuing education and professional development."
        isOpen={openDetail === 'benefits'}
        onToggle={handleToggle}
      />
      <FaqDetail
        id="accessibility"
        title="Is Alumni Econnect accessible to all graduates?"
        content="Yes, Alumni Econnect is open to all graduates from participating institutions. Whether you are a recent graduate or an experienced professional, the platform provides tools and features that cater to various stages of your career."
        isOpen={openDetail === 'accessibility'}
        onToggle={handleToggle}
      />
      <FaqDetail
        id="cost"
        title="Is there a cost to use Alumni Econnect?"
        content="Alumni Econnect is free to use for basic features. However, there are premium options that offer enhanced functionalities, such as advanced networking tools, exclusive job postings, and personalized career counseling."
        isOpen={openDetail === 'cost'}
        onToggle={handleToggle}
      />
      <FaqDetail
        id="futurePlans"
        title="What are the future plans for Alumni Econnect?"
        content="We are continually working to expand Alumni Econnect’s offerings. Our goal is to introduce more interactive features, mentorship programs, and global networking opportunities in the future."
        isOpen={openDetail === 'futurePlans'}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default FaqComponent;
