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
              <StyledReviewItem key={review.id}>
                <AuthorName>Author: {review.author}</AuthorName>
                <p>{review.content}</p>
              </StyledReviewItem>
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

export const StyledReviewItem = styled.li`
  background-color: rgb(240, 240, 240, 0.5);
  padding: 10px 20px;
  list-style: none;
  border-radius: 10px;
  margin-bottom: 15px;
`;
