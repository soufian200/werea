import styled from "styled-components";
import hero from "../assets/hero.jpg";

// ------------------- styles -------------------------
const HeroContainer = styled.div`
  width: 100%;
  height: 40rem;
  background-image: url(${hero});
  background-size: cover;
  position: relative;

  :before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default function Hero() {
  return <HeroContainer></HeroContainer>;
}
