import styled from "styled-components";
import { useFormikContext } from "formik";
import colors from "../../constants/colors";

const Input = styled.input`
  width: 60%;
  text-align: center;
  padding: 1rem 0;
  border: 0;
  border-bottom: solid 0.1rem ${colors.black};
  margin-bottom: 5rem;
`;
const Mi = styled.div`
  color: red;
  text-transform: capitalize;
  margin-top: 0.4rem;
`;

export default function CategoryField({ name, placeholder }) {
  const {
    values,
    setFieldTouched,
    touched,
    errors,
    handleChange,
  } = useFormikContext();

  //   console.log(values);

  return (
    <>
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
    </>
  );
}
