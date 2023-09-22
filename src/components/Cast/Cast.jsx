import { useHttp } from 'hooks/useHttp';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'services/api';
import { styled } from 'styled-components';

const Cast = () => {
  const { movieId } = useParams();
  const { data: castArr } = useHttp(fetchMovieCast, movieId);
  const imgNotFound = 'https://placekitten.com/g/200/280';

  return (
    <>
      <div>
        <CastList>
          {castArr.cast?.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                onError={e => {
                  e.currentTarget.src = imgNotFound;
                }}
              ></img>
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </CastList>
      </div>
    </>
  );
};

export default Cast;

export const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
`;
