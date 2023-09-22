import { BackLink } from 'components/BackLink';
import { useHttp } from 'hooks/useHttp';
import React, { Suspense, useRef } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieById } from 'services/api';
import { styled } from 'styled-components';

const MovieDetails = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const { data: movie } = useHttp(fetchMovieById, movieId);
  const { title, poster_path, vote_average, overview, genres } = movie;

  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  const genresList = genres?.map(genre => genre.name).join(' ');

  return (
    <MovieDetailsWrapper>
      <BackLink to={backLinkHref.current}>Go back</BackLink>
      <MovieCard>
        <img
          src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={title}
        ></img>
        <MovieInfo>
          <h2>{title}</h2>
          <p>User score: {(vote_average * 10).toFixed(2)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genresList}</p>
        </MovieInfo>
      </MovieCard>
      <hr />
      <NavWrapper>
        <SubTitle>Additional information</SubTitle>
        <NavBox>
          <StyledNavLink to="cast">Cast</StyledNavLink>
          <StyledNavLink to="reviews">Reviews</StyledNavLink>
        </NavBox>
      </NavWrapper>
      <hr />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MovieDetailsWrapper>
  );
};

export default MovieDetails;

export const MovieDetailsWrapper = styled.div`
  padding: 20px 40px;
`;

export const MovieCard = styled.div`
  padding: 10px;
  display: flex;
  gap: 30px;
`;

export const MovieInfo = styled.div`
  max-width: 600px;
`;

export const SubTitle = styled.h3`
  text-align: justify;
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: black;

  &.active {
    background-color: #2a2a2a;
    color: white;
  }
  &:hover:not(.active) {
    background-color: lightblue;
  }
`;
