import React from 'react';

const Posts = ({ posts }) => {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg mt-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2d545e]">Posts</h3>
            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <div key={index} className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
                            {post.mediaUrls && (
                                <img
                                    src={post.mediaUrls}
                                    alt="Post Media"
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <div
                                dangerouslySetInnerHTML={{ __html: post.description }}
                                className="text-gray-700 text-base leading-relaxed mb-2"
                            />
                            <span className="text-gray-500 text-sm mt-auto">
                                {new Date(post.createdOn).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No posts yet.</p>
            )}
        </div>
    );
};

export default Posts;
