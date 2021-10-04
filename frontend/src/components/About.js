import colors from "../constants/colors";
import { Container } from "../utils/styles";
import styled from "styled-components";

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.black};
`;
const P = styled.p`
  font-size: 2rem;
  color: #606060;
  margin: 2rem 0;
  margin-bottom: 4rem;
`;
export default function About({ description }) {
  return (
    <>
      <Container>
        <Title>About</Title>
        <P>{description}</P>
      </Container>
    </>
  );
}
