import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';
import { styled } from 'styled-components';

const Reviews = () => {
  const { movieId } = useParams();
  const { data: reviewsObj } = useHttp(fetchMovieReviews, movieId);

  return (
    <>
      <div>
        <h2>Reviews</h2>
        <ul>
          {reviewsObj.results?.map(review => (
            <li key={review.id}>
              <AuthorName>Author: {review.author}</AuthorName>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// reviewsObj.results = [] ? (
//   <p>We don't have any reviews for this movie</p>
// ) : (
//   <ul>
//     {reviewsObj.results.map(review => (
//       <li key={review.id}>
//         <AuthorName>Author: {review.author}</AuthorName>
//         <p>{review.content}</p>
//       </li>
//     ))}
//   </ul>
// );

export default Reviews;

export const AuthorName = styled.p`
  font-weight: bold;
`;
