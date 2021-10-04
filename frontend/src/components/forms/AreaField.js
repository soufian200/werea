import { useFormikContext } from "formik";
import styled from "styled-components";
import colors from "../../constants/colors";

const H = styled.div`
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-size: 1.7rem;
  text-transform: capitalize;
  & > span {
    color: red;
    margin-left: 1rem;
  }
`;
const C = styled.div`
  margin-top: 2rem;
`;
const Lm = styled.div`
  color: ${colors.gray1};
`;
// const A = styled.div``;
const A = styled.textarea`
  width: 50rem;
  height: 30rem;
  font-size: 1.4rem;
  padding: 0.4rem 0 0 0.8rem;
`;
const Mi = styled.div`
  color: red;
  text-transform: capitalize;
  margin-top: 0.4rem;
`;
export default function AreaField({ name }) {
  const { values, setFieldTouched, touched, errors, handleChange } =
    useFormikContext();
  return (
    <C>
      <H>
        <Label>
          Description
          <span>*</span>
        </Label>
        <Lm>write a good description for the book</Lm>
      </H>
      <A
        autoComplete='off'
        value={values[name]}
        onChange={handleChange}
        name={name}
        onBlur={() => setFieldTouched(name)}
        placeholder='Enter good description'
      ></A>
      {errors[name] && touched[name] && <Mi>{errors[name]}</Mi>}
    </C>
  );
}
