import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FaRegCommentDots } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';
import ChangeLikes from './ChangeLikes';
import CommentsCard from './CommentsCard';
import axios from 'axios';
import { commentAdded } from '@/lib/features/posts/postSlice';
import toast from 'react-hot-toast';
import BookmarkButton from '@/Hooks/AddBookmarks';

const PostsDisplay = ({ visiblePosts, activePostId, setActivePostId, showCommentInput, setShowCommentInput, newComment, setNewComment }: any) => {
  const dispatch = useAppDispatch();
  
  const toggleComments = (postId: any) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("Login to start commenting!")
      return;
    }
    setActivePostId(activePostId === postId ? null : postId);
    setShowCommentInput(false); 
  };

  const handleAddComment = async (postId: any) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('You must be logged in to add comments.');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('https://backend.anees-azc.workers.dev/api/v1/comments', {
        postId,
        userId,
        content: newComment,
      });
      if (response.status === 201) {
        dispatch(commentAdded({
          postId: postId, 
          comment: {
              commentId: response.data.commentId,
              content: response.data.content,
              fromUserId: response.data.fromUserId,
              createdAt: response.data.createdAt,
              User: {
                  username: response.data.User.username
              }
          }
        }));
        setNewComment('');
        setShowCommentInput(false);
        toast.success('Comment added successfully');
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment');
    }
  };

  return (
    <main className="flex-grow py-1 sm:py-2">
      {visiblePosts.map((post: any) => (
        <div key={`${post.userId}-${post.postId}`} className="p-3 sm:p-4 bg-white border shadow rounded-lg mb-3 sm:mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className='bg-primaryOrange w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm'>
                {post.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg sm:text-xl font-medium ml-2">{post.username}</h2>
            </div>
            <span className="text-xs sm:text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}</span>
          </div>
          <p className="text-base sm:text-lg">{post.content}</p>
          <div className="flex justify-between items-center mt-0 ml-1">
            <div className="flex items-center space-x-4">
              <ChangeLikes post={post} />
              <div className="flex items-center cursor-pointer" onClick={() => toggleComments(post.postId)}>
                <FaRegCommentDots className="mr-1 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="sm:text-lg text-gray-400">{post.Comments.length}</span>
              </div>
            </div>
            <BookmarkButton postId={post.postId} />
          </div>
          {/* Conditionally render the comments for the active post */}
          {activePostId === post.postId && (
            <>
              <div className="mt-2">
                {post.Comments.map((comment: any) => (
                  <CommentsCard key={comment.commentId} comment={comment} />
                ))}
                {showCommentInput && (
                  <div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2 border rounded"
                    />
                    <button onClick={() => handleAddComment(post.postId)} className="py-1 px-3 bg-primaryPink text-white rounded-lg mt-2">
                      Submit
                    </button>
                  </div>
                )}
                <CiCirclePlus className="w-6 h-6 cursor-pointer ml-1" onClick={() => setShowCommentInput(!showCommentInput)} />
              </div>
            </>
          )}
        </div>
      ))}
    </main>
  );
};

export default PostsDisplay;
