import styled from "styled-components";
import colors from "../constants/colors";
import size from "../constants/size";

const Container = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  width: 90%;
  @media (max-width: ${size.tablet}) {
    width: 100%;
  }
  @media (max-width: ${size.mobileL}) {
    width: 95%;
  }
`;

const Seperator = styled.div`
  height: 0.1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${colors.light};
  margin-top: ${({ mt }) => (mt ? mt + "rem" : "1rem")};
  margin-bottom: ${({ mb }) => (mb ? mb + "rem" : "1rem")};
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;
const Mi = styled.div`
  color: red;
  text-transform: capitalize;
  margin-top: 0.4rem;
`;

const Alert = styled.div`
  width: 100%;
  height: 5rem;
  background-color: ${({ bg }) => (bg ? bg : colors.greenlight)};
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border: solid 0.11rem ${({ color }) => (color ? color : colors.greendark)};
  border-radius: 0.6rem;
  color: ${({ color }) => (color ? color : colors.greendark)};
  margin: 1rem 0;
  & > svg {
    font-size: 2.8rem;
  }

  & > p {
    font-size: 1.3rem;
    text-transform: capitalize;
    margin-left: 0.5rem;
  }
`;

export { Container, Seperator, Center, Mi, Alert };
