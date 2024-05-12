"use client";
import React from 'react';

const CommentsCard = ({ comment }: { comment: any }) => {
    

    return (
        <>
            <div className="bg-gray-100 p-3 rounded-lg shadow mb-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className='bg-primaryOrange w-6 h-6 rounded-full flex items-center justify-center text-white text-sm'>
                            {comment.User.username.charAt(0).toUpperCase()}
                        </div>
                        <h4 className="text-sm font-medium ml-2">{comment.User.username}</h4>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
            </div>
        </>
    );
};

export default CommentsCard