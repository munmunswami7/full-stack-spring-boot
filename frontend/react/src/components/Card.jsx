'use client'
import { useRef } from 'react';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Tag,
  useColorModeValue,
  Button,
  Alert,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import notifications from '../services/notifications';
import { deleteCustomer } from '../services/client';
import UpdateCustomerDrawer from './UpdateCustomerDrawer';


export default function CardWithImage({id, name, age, email,gender,imageNumber, fetchCustomers}) {
  const randomUserGender = gender === "MALE" ? "men" : "women";
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const {successNotification, errorNotification } = notifications()
  return (
    <Center py={6}>
      <Box
        maxW={'400px'}
        minW={'300px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'lg'}  
        rounded={'md'}
        m={2}
        p={2}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              `https://randomuser.me/api/portraits/${randomUserGender}/${imageNumber}.jpg`
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={2} align={'center'} mb={5}>
            <Tag borderRadius={"full"}>{id}</Tag>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {name}
            </Heading>
            <Text color={'gray.500'}>{email}</Text>
            <Text color={'gray.500'}>Age: {age} | Gender: {gender}</Text>
          </Stack>
        </Box>
        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack>
            <UpdateCustomerDrawer 
              initialValues={{name, email, age}}
              customerId={id}
              fetchCustomers={fetchCustomers} 
            />
          </Stack>
          <Stack >
            <Button
              bg={"red.400"}
              color={"white"}
              rounded={"full"}
              _hover={{
                transform:'translateY(-2px)',
                boxShadow:'lg'
              }}
              _focus={{
                bg: 'green.500'
              }}  
              onClick={onOpen}
            >
              Delete
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete {name} ? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='red' ml={3}
                      onClick={() => 
                        deleteCustomer(id)
                          .then(res =>{
                            console.log(res);
                            successNotification(
                              'Customer deleted',
                              `${name} was successfully deleted` 
                          )
                            fetchCustomers()
                        }).catch(err => {
                          console.log(err);
                          errorNotification(
                            "cannot delete customer",
                            `error deleting ${name}`
                          )
                        }).finally(() => {
                          onClose()
                        })
                      }>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}