"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchBookmarksFailure, fetchBookmarksStart, fetchBookmarksSuccess } from '@/lib/features/bookmarks/bookmarksSlice';
import Link from 'next/link';



const BookmarksComponent = () => {
    const dispatch = useAppDispatch();
    const { bookmarks, loading, error } = useAppSelector(state => state.bookmarks);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            dispatch(fetchBookmarksFailure('User not logged in'));
            return;
        }

        dispatch(fetchBookmarksStart());

        axios.get(`https://backend.anees-azc.workers.dev/api/v1/users/${userId}/bookmarks`)
            .then(response => {
                dispatch(fetchBookmarksSuccess(response.data.bookmarks));
            })
            .catch(error => {
                dispatch(fetchBookmarksFailure(error.message));
            });
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='max-w-5xl mx-auto flex flex-col items-center w-full'>
            <div className="self-start mb-4 w-full">
                <Link href="/">
                    <span className="inline-block text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer">
                        ← Back
                    </span>
                </Link>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Your Bookmarks</h2>
            {bookmarks.map((bookmark: any) => (
                <div key={bookmark?.postId} className="p-3 sm:p-4 bg-white border shadow rounded-lg mb-3 sm:mb-5 w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className='bg-primaryOrange w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm'>
                                {bookmark.User.username.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="text-lg sm:text-xl font-medium ml-2">{bookmark?.User?.username}</h3>
                        </div>
                        <h4 className="text-xs sm:text-sm text-gray-500">{bookmark?.channelId}</h4>
                    </div>
                    <h2 className="text-base sm:text-lg">{bookmark?.content}</h2>
                </div>
            ))}
        </div>


    );
};


export default BookmarksComponent;

// const Bookmarks = () => {
//     const [bookmarks, setBookmarks] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       setError('User is not logged in');
//       setLoading(false);
//       return;
//     }

//     const fetchBookmarks = async () => {
//       try {
//         const response = await axios.get(`https://backend.anees-azc.workers.dev/api/v1/users/${userId}/bookmarks`);
//         setBookmarks(response.data.bookmarks);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch bookmarks');
//         setLoading(false);
//       }
//     };

//     fetchBookmarks();
//   }, []);

//   if (loading) {
//     return <div>Loading bookmarks...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>My Bookmarks</h2>
//       {bookmarks.length > 0 ? (
//         <ul>
//           {bookmarks.map(bookmark => (
//             <li key={bookmark.postId}>
//               <div>
//                 <h3>{bookmark.content}</h3>
//                 <p>Posted by: {bookmark.User.username}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No bookmarks found.</p>
//       )}
//     </div>
//   );
// };