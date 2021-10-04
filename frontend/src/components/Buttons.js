import colors from "../constants/colors";
import styled from "styled-components";
import routes from "../constants/routes";
const Btns = styled.div`
  /* background-color: green; */
  max-width: 50rem;
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
`;
const Btn = styled.button`
  background-color: red;
  padding: 1.4rem 6rem;
  text-decoration: none;
  color: white;
  text-transform: capitalize;
  font-size: 1.4rem;
  border-radius: 2.6rem;
  margin-left: 1rem;
  outline: 0;
  border: 0;
  transition: 0.1s;
  cursor: pointer;
`;

const Cancel = styled(Btn)`
  background-color: ${colors.light};
  color: black;
  &:hover {
    box-shadow: 0 0 0.3rem ${colors.light};
  }
  /* &:focus {
    color: #e1e1e1;
  } */
`;
const Save = styled(Btn)`
  background-color: ${colors.primary};
  &:hover {
    box-shadow: 0 0 0.5rem ${colors.primary};
  }
  /* &:focus {
    color: #4397eb;
  } */
`;
export default function Buttons({
  to = routes.SUP + routes.DASHBOARD + routes.H,
}) {
  function cancelBtn(to) {
    window.location.pathname = to;
  }
  return (
    <Btns>
      <Cancel onClick={() => cancelBtn(to)}>cancel</Cancel>
      <Save type='submit'>save</Save>
    </Btns>
  );
}
