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
import CreateCustomerForm from '../shared/CreateCustomerForm';

const SignUp = () => {
      const {customer, setCustomerFromToken} = useAuth()
      const  navigate  = useNavigate()
    
      useEffect(() => {
        if(customer) {navigate("/dashboard")}
      })
    
      return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justifyContent={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'} mb={15}>Register for an Account</Heading>
              <CreateCustomerForm onSuccess={(token) => {
                localStorage.setItem("access_token",token)
                setCustomerFromToken()
                navigate("/dashboard")
              }}/>
              <Link as={RouterLink} to="/" color={'blue.500'}>
                Have an account? Login.
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

export default SignUp