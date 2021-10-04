import { useFormikContext } from "formik";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Mi } from "../../utils/styles";

const F = styled.div`
  margin-top: 3rem;
`;
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
const Lm = styled.div`
  color: ${colors.gray1};
`;
const Input = styled.input`
  width: 50rem;
  padding: 1.3rem 0;
  padding-left: 1rem;
  font-size: 1.2rem;
  text-transform: capitalize;

  border: solid 0.1rem ${colors.gray1};
  border-radius: 0.5rem;
`;

export default function InputField({ label, name, placeholder, labelHint }) {
  const {
    values,
    setFieldTouched,
    touched,
    errors,
    handleChange,
  } = useFormikContext();
  return (
    <F>
      <H>
        <Label>
          {label}
          <span>*</span>
        </Label>
        <Lm>{labelHint}</Lm>
      </H>
      <Input
        autoComplete='off'
        value={values[name]}
        onChange={handleChange}
        name={name}
        onBlur={() => setFieldTouched(name)}
        type='text'
        placeholder={placeholder}
      />
      {errors[name] && touched[name] && <Mi>{errors[name]}</Mi>}
    </F>
  );
}
