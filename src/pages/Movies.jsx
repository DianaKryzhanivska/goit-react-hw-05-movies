import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieBySearch } from 'services/api';
import { styled } from 'styled-components';

const Movies = () => {
  const { register, handleSubmit } = useForm();

  // 1. Використовуємо хук для зміни URL, отримуємо параметри, та функцію, котра ставить ці параметри
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. При використанні сабміта, встановлюємо параметр query в наш url
  const submit = data => {
    // console.log(data);
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
    <StyledHomeWrapper>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledInput {...register('queryStr')} type="text" />
        <StyledFormButton>Search</StyledFormButton>
      </StyledForm>
      <StyledMovieList>
        {data?.map(movie => (
          <StyledMovieItem key={movie.id}>
            <Link state={{ from: location }} to={movie.id.toString()}>
              {movie.title}
            </Link>
          </StyledMovieItem>
        ))}
      </StyledMovieList>
    </StyledHomeWrapper>
  );
};

export default Movies;

export const StyledHomeWrapper = styled.div`
  padding: 0 40px;
`;

export const StyledForm = styled.form`
  margin-top: 30px;
  margin-left: 40px;
`;

export const StyledInput = styled.input`
  width: 200px;
  height: 24px;
  margin-right: 15px;
`;

export const StyledFormButton = styled.button`
  width: 80px;
  height: 28px;
  font-size: 16px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
`;

export const StyledMovieList = styled.ol`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const StyledMovieItem = styled.li`
  font-size: 18px;
`;
