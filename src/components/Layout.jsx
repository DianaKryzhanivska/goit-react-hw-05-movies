import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Layout = () => {
  return (
    <>
      <nav>
        <MainNavBtns>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/movies">Movies</StyledNavLink>
          </li>
        </MainNavBtns>
      </nav>
      <hr />
      <main>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;

export const StyledNav = styled.nav`
  background-color: #d5edfd;
  min-height: 100vh;
  border-right: 2px solid black;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  width: 200px;
  padding: 40px 20px;
`;

export const MainNavBtns = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border-radius: 4px;
  text-decoration: none;
  color: black;

  &.active {
    background-color: blue;
    color: white;
  }
  &:hover:not(.active) {
    background-color: lightblue;
  }
`;
