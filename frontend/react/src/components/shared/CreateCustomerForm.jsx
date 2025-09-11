import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Button, FormLabel, Input, Select, Stack, Box } from '@chakra-ui/react';
import { saveCustomer } from '../../services/client';
import notifications from '../../services/notifications';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
            <AlertIcon />
            {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
            <AlertIcon />
            {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
const CreateCustomerForm = ({onSuccess}) => {
  const {successNotification, errorNotification} = notifications()
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          age: 0,
          gender: '', // added for our select
          password: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          age: Yup.number()
            .max(200, 'Must be less tahn 200 years of age')
            .min(16, "Must be minimum 16 years of age")
            .required('Required'),
          password: Yup.string()
            .min(4, 'Must be 4 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          gender: Yup.string()
            .oneOf(
              ['MALE', 'FEMALE'],
              'Invalid gender'
            )
            .required('Required'),
        })}
        onSubmit={(customer, { setSubmitting }) => {
          setSubmitting(true)
          saveCustomer(customer)
            .then((res) => {
              console.log(res);
              successNotification(
                "Customer Saved",
                `${customer.name} was successfully saved`
              )
              onSuccess(res.headers["authorization"])
              }).catch(err => {
                console.log(err)
                errorNotification(
                  "error",
                  "cannot create customer"
                )
              }).finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({isValid, isSubmitting})=> (
          <Form>
            <Stack spacing={"15"}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane"
              />

              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="jane@gmail.com"
              />

              <MyTextInput
                label="Age"
                name="age"
                type="number"
                placeholder="45"
              />

              <MyTextInput
                label="Password"
                name="password"
                type="password"
              />

              <MySelect label="Gender" name="gender">
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </MySelect>

              <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCustomerForm