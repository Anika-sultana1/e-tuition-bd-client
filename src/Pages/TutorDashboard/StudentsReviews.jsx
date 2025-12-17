import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const StudentsReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: reviews = [] } = useQuery({
    queryKey: ['students-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{review.subject}</h3>
                <span className="text-yellow-500 font-bold">{review.rating}★</span>
              </div>
              <p className="text-gray-700 mb-2">Review: {review.reviewText}</p>
              <p className="text-gray-500 text-sm">
                Student: {review.studentName} ({review.studentEmail})
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Posted on: {new Date(review.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Tuition Post ID: {review.tuitionPostId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsReviews;
