import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../utils/styles";
import colors from "../constants/colors";
import { Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import routes from "../constants/routes";
import size from "../constants/size";
import Search from "./Search";
import applogo from '../assets/weread.png'

const Nav = styled.div`
  /* background: red; */
  box-shadow: 0 0.1rem 0.1rem ${colors.light};
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: relative; */
  width: 100%;
  @media (max-width: ${size.tablet}) {
    /* position: relative; */
  }
`;

const NavContainer = styled.div`
  /* background: blue; */
  /* overflow: auto;*/
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo =  styled(Link)`
  color: black;
  font-size: 2.3rem;
  text-transform: capitalize;
  flex: 1;
  text-decoration: none;
  // max-width: 10rem;
  & > span{
    color:${colors.primary}
  }
  @media (max-width: ${size.tablet}) {
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: ${size.tablet}) {
    display: block;
    z-index: 111;
    & > svg {
      font-size: 3.6rem;
    }
  }
  @media (max-width: ${size.tablet}) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;

const List = styled.ul`
  display: flex;
  /* background-color: red; */
  /* width: 40rem; */
  height: 100%;
  list-style: none;
  /* overflow: auto; */

  & > li {
    /* color: red; */
  }
  & > li > a {
    color: black;
    font-size: 1.8rem;
    padding: 0 2rem;
    /* background-color: blue;*/
    text-transform: capitalize;
    text-decoration: none;
    transition: 0.2s;
    :hover {
      color: ${colors.primary};
    }
    :focus {
      color: ${colors.primary};
    }
  }
  @media (max-width: 70rem) {
    & > li > a {
      padding: 0.9rem;
      font-size: 1.8rem;
    }
  }
  @media (max-width: ${size.tablet}) {
    background-color: white;
    position: fixed;
    z-index: 5;
    top: 0rem;
    left: 0;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;

    transform: ${({ opend }) =>
      opend ? `translateX(0%)` : `translate(-100%)`};
    /* opacity: ${({ opend }) => (opend ? 1 : 0)}; */
    transition: 0.4s ease-in-out;
    & > li {
      margin-bottom: 10rem;
    }
    & > li > a {
      font-size: 3.5rem;
      padding: 0;
    }
    :hover {
      color: ${colors.primary};
    }
    :focus {
      color: ${colors.primary};
    }
  }
`;

export default function Navbar() {
  const [opend, setOpend] = useState(false);

  useEffect(() => {}, []);
  return (
    <Nav>
      <Container>
        <NavContainer>
          <Logo to={routes.HOME}>
            <span>
              we
              </span>
               Read
            {/* <img src={applogo} /> */}
          </Logo>
          <Search />
          <MenuIcon onClick={() => setOpend(!opend)}>
            {opend ? <AiOutlineClose /> : <AiOutlineMenu />}
          </MenuIcon>
          <List opend={opend}>
            <li onClick={() => setOpend(false)}>
              <Link to={`${routes.HOME}`}>home</Link>
            </li>
            <li onClick={() => setOpend(false)}>
              <Link to={routes.CATEGORIES}>categories</Link>
            </li>
            <li onClick={() => setOpend(false)}>
              <Link to='/home'>books</Link>
            </li>
            <li onClick={() => setOpend(false)}>
              <Link to='/home'>novels</Link>
            </li>
            <li onClick={() => setOpend(false)}>
              <Link to='/home'>audio</Link>
            </li>
          </List>
        </NavContainer>
      </Container>
    </Nav>
  );
}
