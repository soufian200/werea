import { Formik, Form } from "formik";

export default function AppForm({
  initialValues,
  handleSubmit,
  schema,

  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
}
