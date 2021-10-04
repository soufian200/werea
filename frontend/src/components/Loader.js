import styled, { keyframes } from "styled-components";
import colors from "../constants/colors";

const rotateAnim = keyframes`
 0% { transform:rotate(0deg) }
 100% { transform:rotate(360deg) }
`;
const C = styled.div`
  width: 5rem;
  height: 5rem;
  /* background-color: red; */
`;
const L = styled.div`
  position: relative;
  & > div {
    position: absolute;
    animation: ${rotateAnim} 1.1s infinite linear;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > svg {
    width: ${({ w }) => w + "rem"};
    height: ${({ w }) => w + "rem"};
  }
  & > div#d,
  div#u > svg > circle {
    stroke-width: 1.4;
    stroke: red;
    fill: none;
  }
  & > div#d > svg > circle {
    stroke: #d4d4d4;
  }

  & > div#u > svg > circle {
    stroke: ${colors.primary};
    stroke-dasharray: 65;
    /* stroke-dashoffset: 29; */
    stroke-linecap: round;
  }
`;

export default function Loader({ c = 24, r = 22 }) {
  return (
    <C>
      <L w={(c + r) / 10 + 0.2}>
        <div id='d'>
          <svg width='100%' height='100%'>
            <circle cx={c} cy={c} r={r} />
          </svg>
        </div>
        <div id='u'>
          <svg width='100%' height='100%'>
            <circle cx={c} cy={c} r={r} />
          </svg>
        </div>
      </L>
    </C>
  );
}
