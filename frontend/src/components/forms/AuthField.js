import { useFormikContext } from "formik";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Mi } from "../../utils/styles";

const Field = styled.div`
  /* background-color: red; */
  margin-bottom: 3rem;

  & > label {
    text-transform: capitalize;
    font-size: 2;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    display: block;
  }
`;
// const Input = styled.div``
const Input = styled.div`
  /* background-color: blue; */
  /* padding: 1rem 0; */
  padding-left: 1rem;
  display: flex;
  align-items: center;
  border: solid 0.1rem ${colors.black};
  border-radius: 0.3rem;

  & > svg {
    font-size: 2.3rem;
    margin-right: 1rem;
  }

  & > input {
    border: 0;
    outline: 0;
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    padding: 1rem 0;
    /* background: red; */
  }
`;
export default function AuthField({ name, label, placeholder, type, Icon }) {
  const {
    values,
    setFieldTouched,
    touched,
    errors,
    handleChange,
  } = useFormikContext();

  return (
    <Field>
      <label>{label} :</label>
      <Input id='#dd'>
        <Icon />
        <input
          autoComplete='off'
          type={type}
          placeholder={placeholder}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={() => setFieldTouched(name)}
        />
      </Input>
      {errors[name] && touched[name] && <Mi>{errors[name]}</Mi>}
    </Field>
  );
}
