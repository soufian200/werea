import notfoundimg from "../assets/notfound.png";
import styled from "styled-components";
import { Center } from "../utils/styles";
const Nf = styled.div`
  display: flex;

  & > div {
    flex-direction: column;
  }
`;
const C = styled.div`
  width: 47rem;
  height: 41rem;
  & + p {
    color: #111;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    text-transform: capitalize;
  }
`;
const GoBack = styled.button`
  color: white;
  margin-top: 2.4rem;
  background: #f44336;
  text-transform: capitalize;
  text-decoration: none;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  padding: 1.4rem 5rem;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
export default function NotFound() {
  return (
    <Nf>
      <Center>
        <C>
          <img src={notfoundimg} />
        </C>
        <p>this page is not found please go back to home</p>
        <GoBack onClick={() => window.history.back()}>Go Back</GoBack>
      </Center>
    </Nf>
  );
}
