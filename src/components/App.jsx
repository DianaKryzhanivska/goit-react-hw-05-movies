// import Movies from 'pages/Movies';
// import MovieDetails from 'pages/MovieDetails';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PageNotFound from 'pages/PageNotFound';
import { lazy } from 'react';

const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Movies = lazy(() => import('pages/Movies'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="movies" element={<Movies />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};
