import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import UpdateCustomerForm from "./UpdateCustomerForm"

const AddIcon = () => "+"
const CloseIcon = () => "X"

const UpdateCustomerDrawer = ({fetchCustomers, initialValues, customerId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    // const[isOpen, setIsOpen]  = useState(false)
    // const onOpen = () => setIsOpen(true)
    // const onClose = () => setIsOpen(false)
    return (
        <>

            <Button
                bg={"gray.200"}
                color={"Black"}
                rounded={"full"}
                _hover={{
                transform:'translateY(-2px)',
                boxShadow:'lg'
                }}
                onClick={onOpen}
            >
                Update Customer
            </Button>

            <Drawer isOpen={isOpen} onClose={onClose} size="xl">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Update Customer</DrawerHeader>
                    <DrawerBody>
                       <UpdateCustomerForm
                        fetchCustomers = {fetchCustomers}
                        initialValues = {initialValues}
                        customerId = {customerId}
                        />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button 
                            leftIcon = {<CloseIcon/>}
                            colorScheme= {"teal"}
                            onClick= {onClose}
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
    
}

export default UpdateCustomerDrawer;