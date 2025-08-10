import { useToast } from "@chakra-ui/react";

const notifications = (title, decription, status) => {
    const toast = useToast()
    
    const successNotification = (title, description)=> {
        toast({
            title,
            description,
            status: "success",
            isClosable: true,
            duration: 4000
        })
    }

    const errorNotification = (title, description)=> {
        toast({
            title,
            description,
            status: "error",
            isClosable: true,
            duration: 4000
        })
    }

    return {successNotification, errorNotification}
}
export default notifications

