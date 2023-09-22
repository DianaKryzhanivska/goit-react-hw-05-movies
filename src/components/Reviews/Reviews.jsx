import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';
import { styled } from 'styled-components';

const Reviews = () => {
  const { movieId } = useParams();
  const { data } = useHttp(fetchMovieReviews, movieId);

  return (
    <>
      <div>
        {data?.results?.length === 0 ? (
          <p>We don't have any reviews for this movie</p>
        ) : (
          <ul>
            {data.results?.map(review => (
              <li key={review.id}>
                <AuthorName>Author: {review.author}</AuthorName>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Reviews;

export const AuthorName = styled.p`
  font-weight: bold;
`;
