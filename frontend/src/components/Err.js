import { Center } from "../utils/styles";
import styled from "styled-components";
import {  AiOutlineReload } from "react-icons/ai";
import colors from "../constants/colors";

const C = styled(Center)`
  margin: 5rem 0;
  flex-direction: column;

  & > svg {
    font-size: 2.7rem;
  }
  & > h1 {
    text-transform: capitalize;
    margin-left: 1rem;
  }
`;
const Reload = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background-color: ${colors.primary};
  padding: 2rem 6rem;
  border-radius: 0.6rem;
  font-size: 1.8rem;
  text-transform: capitalize;
  margin-top: 3rem;
  cursor: pointer;
  color: #fff;
  transition: 0.1s;
  :hover {
    opacity: 0.9;
  }
  :active {
    transform: scale(0.94);
  }
  & > svg {
    font-size: 2.2rem;
    margin-right: 1rem;
  }
`;
export default function Err({ err = "error", status = 400 }) {
  return (
    // <Center>
    <C>
      <h1>
        {status} {err}
      </h1>
      <Reload onClick={() => window.location.reload()}>
        <AiOutlineReload />
        try again
      </Reload>
    </C>
    // </Center>
  );
}
