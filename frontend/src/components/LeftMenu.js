import colors from "../constants/colors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AiOutlineAudio,
  AiOutlineBook,
  AiOutlineDatabase,
  AiOutlineFieldTime,
  AiOutlineHome,
  AiOutlinePlus,
} from "react-icons/ai";
import { FiBook } from "react-icons/fi";
import {  useState } from "react";
import routes from "../constants/routes";

const Lm = styled.div`
  width: 22%;

  padding-right: 3rem;

  & > ul {
    /* background-color: ${colors.light}; */
    list-style: none;
    border-radius: 0.4rem;
    margin-top: 1rem;

    & > li {
      & > a {
        display: flex;

        align-items: center;
        text-decoration: none;
        text-transform: capitalize;
        /* color: ${colors.black}; */
        color: ${({ focused }) => (focused ? "red" : "blue")};
        font-size: 2rem;
        padding: 1.2rem 0;
        transition: 0.1s;
        padding: 1.4rem 4rem;
        border-radius: 6rem;
        & > svg {
          margin-right: 1rem;
        }
        &:hover {
          /* color: ${colors.primary}; */
          background-color: ${colors.light};
        }
      }
    }
  }
`;

const Button = styled.div`
  display: flex;
  /* justify-content: center; */
  align-content: center;
  & > a {
    background-color: ${colors.purple};
    text-decoration: none;
    padding: 1.6rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;
    color: white;
    cursor: pointer;
    width: 100%;
    border: 0;
    outline: 0;
    margin-top: 1rem;
    transition: 0.1s;
    &:hover {
      /* background-color: #5863ff; */
      opacity: 0.9;
    }

    & > svg {
      margin-right: 1rem;
      font-size: 2.4rem;
    }
    & > p {
      text-transform: capitalize;
      color: white;
      font-size: 1.7rem;
    }
  }
`;

export default function LeftMenu() {
  // let ro = window.location.pathname.split("/");
  // ro = ro[ro.length - 1];

  const [r, setR] = useState(window.location.pathname);

  const items = [
    {
      to: routes.SUP + routes.DASHBOARD + routes.H,
      label: "home",
      Icon: AiOutlineHome,
    },
    {
      to: routes.SUP + routes.DASHBOARD + routes.P,
      label: "pendings",
      Icon: AiOutlineFieldTime,
    },
    {
      to: routes.SUP + routes.DASHBOARD + routes.C,
      label: "categories",
      Icon: AiOutlineDatabase,
    },
    {
      to: routes.SUP + routes.DASHBOARD + routes.B,
      label: "books",
      Icon: FiBook,
    },
    {
      to: routes.SUP + routes.DASHBOARD + routes.N,
      label: "novels",
      Icon: AiOutlineBook,
    },
    {
      to: routes.SUP + routes.DASHBOARD + routes.A,
      label: "audio",
      Icon: AiOutlineAudio,
    },
  ];
  return (
    <Lm>
      <ul>
        {items.map(({ Icon, label, to }, index) => (
          <li key={index}>
            <Link
              onClick={() => {
                setR(to);
              }}
              to={to}
              style={{
                color: to === r ? colors.primary : colors.black,
              }}
            >
              <Icon /> {label}
            </Link>
          </li>
        ))}
      </ul>
      <Button>
        <Link
          onClick={() => setR(null)}
          to={routes.SUP + routes.DASHBOARD + routes.ADDNEW}
        >
          <AiOutlinePlus /> <p>new add</p>
        </Link>
      </Button>
    </Lm>
  );
}
