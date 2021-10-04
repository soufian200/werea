import styled from "styled-components";
import colors from "../../constants/colors";
import { useFormikContext } from "formik";

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
const S = styled.div`
  width: 50rem;
  /* overflow: hidden; */
  position: relative;

  & > select {
    width: 100%;
    padding: 1.5rem;
    border: solid 0.1rem ${colors.gray1};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;

    /* & > option {
      width: 100%;
      background-color: white;
      border: solid 0.1rem ${colors.light};
      position: absolute;
      top: 5rem;
      z-index: 4;
      box-shadow: 0 0 0.4rem ${colors.light};
    } */
  }
`;

const Mi = styled.div`
  color: red;
  text-transform: capitalize;
  margin-top: 0.4rem;
`;

export default function SelectField({ label, name, labelHint, head, items }) {
  
  const {
    values,
    setFieldTouched,
    touched,
    errors,
    handleChange,
  } = useFormikContext();
  return (
    <C>
      <H>
        <Label>
          {label}
          <span>*</span>
        </Label>
        <Lm>{labelHint}</Lm>
      </H>
      <S>
        <select
          value={values[name]}
          onChange={handleChange}
          name={name}
          onBlur={() => setFieldTouched(name)}
        >
          {items.map((i, index) => (
            <option key={index} value={i.title}>
              {i.title}
            </option>
          ))}
        </select>
        {errors[name] && touched[name] && <Mi>{errors[name]}</Mi>}
      
      </S>
    </C>
  );
}
