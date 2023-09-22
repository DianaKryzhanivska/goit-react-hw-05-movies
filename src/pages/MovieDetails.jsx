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
    <div>
      <BackLink to={backLinkHref.current}>Go back</BackLink>
      <MovieCard>
        <img
          src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={title}
        ></img>
        <div>
          <h2>{title}</h2>
          <p>User score: {(vote_average * 10).toFixed(2)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genresList}</p>
        </div>
      </MovieCard>
      <hr />
      <NavWrapper>
        <SubTitle>Additional information</SubTitle>
        <NavBox>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </NavBox>
      </NavWrapper>
      <hr />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;

export const MovieCard = styled.div`
  display: flex;
  gap: 30px;
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
