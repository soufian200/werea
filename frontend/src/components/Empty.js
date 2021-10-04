import { Center } from "../utils/styles";
import styled from "styled-components";
import emptyimg from "../assets/empty.png";

const C = styled(Center)`
  /* margin: 5rem 0; */
  width: 40rem;
  display: flex;
  justify-content: center;

  & > svg {
    font-size: 10rem;
    color: #eee;
  }
  & > h1 {
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: capitalize;
    margin-left: 1rem;
  }
`;
export default function Empty() {
  return (
    <Center>
      <C>
        <img src={emptyimg} alt="empty" />
      </C>
    </Center>
  );
}
