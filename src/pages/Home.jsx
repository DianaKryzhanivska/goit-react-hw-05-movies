import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { Link } from 'react-router-dom';
import { fetchAllMovies } from 'services/api';
import { styled } from 'styled-components';

const Home = () => {
  const { data: movies } = useHttp(fetchAllMovies);

  return (
    <StyledHomeWrapper>
      <StyledMovieList>
        {movies.map(movie => (
          <StyledMovieItem key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`}>{movie.title}</Link>
          </StyledMovieItem>
        ))}
      </StyledMovieList>
    </StyledHomeWrapper>
  );
};

export default Home;

export const StyledHomeWrapper = styled.div`
  padding: 20px 40px;
`;

export const StyledMovieList = styled.ol`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const StyledMovieItem = styled.li`
  font-size: 18px;
`;
