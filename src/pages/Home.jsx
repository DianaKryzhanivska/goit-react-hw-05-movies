import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { Link } from 'react-router-dom';
import { fetchAllMovies } from 'services/api';

const Home = () => {
  const { data: movies } = useHttp(fetchAllMovies);

  return (
    <div>
      <ol>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`}>{movie.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
