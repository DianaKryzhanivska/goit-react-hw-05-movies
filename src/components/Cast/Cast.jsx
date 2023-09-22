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
            <StyledCastItem key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                onError={e => {
                  e.currentTarget.src = imgNotFound;
                }}
              ></img>
              <StyledCastName>{actor.name}</StyledCastName>
              <StyledCharacter>{actor.character}</StyledCharacter>
            </StyledCastItem>
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
  gap: 20px 50px;
  /* justify-content: space-between; */
  list-style: none;
`;

export const StyledCastItem = styled.li`
  background-color: rgb(240, 240, 240, 0.2);
  border-radius: 5px;
  padding: 10px;
`;

export const StyledCastName = styled.p`
  font-weight: bold;
`;

export const StyledCharacter = styled.p`
  max-width: 200px;
`;
