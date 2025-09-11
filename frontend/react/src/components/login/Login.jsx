'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Alert,
  AlertIcon,
  Select,
  Box,
  Link
} from '@chakra-ui/react'
import { Formik, Form, useField } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import notifications from '../../services/notifications';
import { useEffect } from 'react';


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

const LoginForm = () => {
  const {login} = useAuth()
  const {successNotification, errorNotification} = notifications()
  const navigate = useNavigate()
  return(
    <Formik
      validateOnMount={true}
      validationSchema={
        Yup.object({
          userName: Yup.string()
            .email("Must be a valid email")
            .required("Email is required"),
          password: Yup.string()
            .max(20,"Password cannot be more than 20 characters")
            .required("Password id required")
        })
      }
      initialValues={{userName: '', password: ''}}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true)
        login(values).then(res => {
          navigate("/dashboard")
          console.log("Successful login",res);
          // TODO: navigate to dashboard
        }).catch(err => {
          errorNotification(
            err.code,
            err.response.data.message
          )
        }).finally(() => {
          setSubmitting(false)
        })
      }}
    >

      {({isValid, isSubmitting}) => (
        <Form>
          <Stack spacing={30}>
            <MyTextInput
              label={"Email"}
              name={"userName"}
              type={"email"}
              placeholder={"some@vaib.site"}
            />
            <MyTextInput
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Type your password here"}
            />
            <Button 
              type={'submit'}
              disabled={!isValid || isSubmitting}>
              Login
            </Button>


          </Stack>
        </Form>

      )}

    </Formik>
  )
}


const Login = () => {

  const {customer} = useAuth()
  const  navigate  = useNavigate()

  useEffect(() => {
    if(customer) {navigate("/dashboard")}
  })

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justifyContent={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'} mb={15}>Sign in to your account</Heading>
          <LoginForm />
          <Link as={RouterLink} to="/signup" color={'blue.500'}>
            Don't have an account? SignUp.
          </Link>
        </Stack>
      </Flex>
      <Flex 
        flex={1}
        p={10}
        flexDirection={"column"}
        alignItems={"center"}
        justifyItems={"center"}
        bgGradient={{sm: 'linear(to-r, blue.600, purple.600)'}}
      >
        <Text
          fontSize={"6xl"}
          color={"white"}
          fontWeight={"bold"}
          mb={5}
        >
          <a href ="https://vaib.site">
            Enrol now
          </a>         
        </Text>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png'
          }
        />
      </Flex>
    </Stack>
  )
}

export default Login;