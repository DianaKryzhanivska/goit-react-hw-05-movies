import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
// import { OutletWrapper } from './Layout.styled';

const Layout = () => {
  return (
    <>
      <nav>
        <MainNavBtns>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </MainNavBtns>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

export const MainNavBtns = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
`;
