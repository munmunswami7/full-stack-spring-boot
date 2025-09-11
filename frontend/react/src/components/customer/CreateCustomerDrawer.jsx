import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
// import CreateCustomerForm from "./CreateCustomerForm"
import CreateCustomerForm from "../shared/CreateCustomerForm" 

const AddIcon = () => "+"
const CloseIcon = () => "X"

const CreateCustomerDrawer = ({fetchCustomers}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    // const[isOpen, setIsOpen]  = useState(false)
    // const onOpen = () => setIsOpen(true)
    // const onClose = () => setIsOpen(false)
    return (
        <>
            <Button 
                leftIcon = {<AddIcon/>}
                colorScheme= {"teal"}
                onClick= {onOpen}
            >
                Create Customer
            </Button>

            <Drawer isOpen={isOpen} onClose={onClose} size="xl">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create new Customer</DrawerHeader>
                    <DrawerBody>
                       <CreateCustomerForm  
                        onSuccess = {fetchCustomers}
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

export default CreateCustomerDrawer