import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";
import colors from "../constants/colors";

const Headi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-size: 2.5rem;
`;
const More = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  font-size: 1.2rem;
  & > a {
    text-transform: capitalize;
    text-decoration: none;
    color: ${colors.primary};
  }
`;

export default function Head({ title, hidemore }) {
  return (
    <Headi>
      <Title>{title}</Title>
      {!hidemore && (
        <More>
          <a href='#more'>more</a>
          <FiChevronRight />
        </More>
      )}
    </Headi>
  );
}
