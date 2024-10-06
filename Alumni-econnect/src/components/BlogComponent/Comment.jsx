import React from 'react'
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';


const Comment = ({ comment }) => {


    return (
      <article className=" mb-3 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={comment.user.imageUrl}
              alt={comment.user.name}
            />
            <div>
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                {comment.user.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={comment.date} title={comment.date}>
                  {comment.date}
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
                
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onRemove(comment.id)}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-600' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Remove
                    </button>
                  )}
                </Menu.Item>
                
              </div>
            </Menu.Items>
          </Menu>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
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
      </article>
    );
  };

export default Comment
