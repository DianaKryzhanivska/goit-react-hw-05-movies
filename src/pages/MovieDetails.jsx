import { BackLink } from 'components/BackLink';
import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieById } from 'services/api';
import { styled } from 'styled-components';

const MovieDetails = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const { data: movie } = useHttp(fetchMovieById, movieId);
  const { title, poster_path, vote_average, overview, genres } = movie;

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const genresList = genres?.map(genre => genre.name).join(' ');

  return (
    <div>
      <BackLink to={backLinkHref}>Go back</BackLink>
      <img
        src={`https://image.tmdb.org/t/p/w342${poster_path}`}
        alt={title}
      ></img>
      <h2>{title}</h2>
      <p>User score: {(vote_average * 10).toFixed(2)}%</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h4>Genres</h4>
      <p>{genresList}</p>
      <hr />
      <NavWrapper>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </NavWrapper>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetails;

export const NavWrapper = styled.div`
  display: flex;
  gap: 30px;
`;
