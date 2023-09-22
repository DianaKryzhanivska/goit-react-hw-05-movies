import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieBySearch } from 'services/api';

const Movies = () => {
  const { register, handleSubmit } = useForm();

  // 1. Використовуємо хук для зміни URL, отримуємо параметри, та функцію, котра ставить ці параметри
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. При використанні сабміта, встановлюємо параметр query в наш url
  const submit = data => {
    console.log(data);
    setSearchParams(data.queryStr && { query: data.queryStr });
  };

  // 3. Витягуємо query з нашого url через першу сутність хука useSearchParams
  const query = searchParams.get('query') || '';

  // 4. Робимо запит через власний хук useHttp, передаючи туди query в якості параметра пошуку
  const { data } = useHttp(fetchMovieBySearch, query);

  // 5. Створюємо об'єкт location, для того, щоб отримати поточний стан нашого url
  // Це необхідно для передачі location в компонент 'MovieDetails'
  const location = useLocation();

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register('queryStr')} type="text" />
        <button>Search</button>
      </form>
      <ol>
        {data?.map(movie => (
          <li key={movie.id}>
            <Link state={{ from: location }} to={movie.id.toString()}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Movies;
