import styled from "styled-components";
import colors from "../constants/colors";

const F = styled.div`
  width: 100%;
  padding: 5rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
    color: ${colors.black};
  }
`;
export default function Footer() {
  return (
    <F>
      <p>copyright &copy; 2021</p>
    </F>
  );
}
