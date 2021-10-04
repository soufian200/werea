import colors from "../constants/colors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import routes from "../constants/routes";
import ls from "../services/ls";

const Hd = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;

  & > h1 {
    font-size: 4rem;
    text-transform: capitalize;
    color: ${colors.black};
  }
`;

const Info = styled.div`
  /* background-color: green; */
  display: flex;
  align-items: center;

  & > p {
    margin: 0 0.4rem;
  }

  & button {
    text-transform: capitalize;
    color: ${colors.black};
    text-decoration: none;
    cursor: pointer;
    transition: 0.1s;
    background: rgb(23 94 255);
    padding: .7rem 2rem;
    border: 0;
    outline: 0;
    border-radius: .4rem;
    color: #fff;
    margin-left: 1rem;

    :hover {
      text-decoration: underline;
      color: ${colors.primary};
    }
  }
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 0.2rem;
  }
`;

const Admin = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;

  & > div {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${colors.light};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    font-size: 1.4rem;
  }

  & > h1 {
    text-transform: capitalize;
  }
`;

export default function HeadDash() {
  return (
    <Hd>
      <h1>dashboard</h1>
      <Info>
        <Link to={routes.HOME}>view site</Link>
        <p>/</p>
        <Logout>
          <AiOutlineLogout />
          <button
          
            onClick={() => {
              ls.removeUser();
              window.location.reload();
            }}
          >
            log out
          </button>
        </Logout>
        <Admin>
          <div>A</div>
          <h1>admin</h1>
        </Admin>
      </Info>
    </Hd>
  );
}
