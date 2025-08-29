import { Wrap,WrapItem, Spinner, Text, Center} from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/client";
import CardWithImage from "./components/customer/Card";
import CreateCustomerDrawer from "./components/customer/CreateCustomerDrawer";


const App = () => {

  const [customers, setCustomer] = useState([])
  const [loading, setLoading] = useState(false)

const fetchCustomers= () => {
      setLoading(true)
    getCustomers().then(res => {
      console.log("Fetched customers: ", res.data);
      setCustomer(res.data)
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
}

  useEffect(()=>{
    fetchCustomers()
  },[])


  if(loading){
    return(
      <SidebarWithHeader>
        <Spinner color="teal.500" size="lg" />
    </SidebarWithHeader>
    )
  }

  if(customers.length <= 0){
    return(
        <SidebarWithHeader>
          <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
          <Text mt={3}>No customers Available</Text>
        </SidebarWithHeader>
    )
  
  }


  return (
    <SidebarWithHeader>
      <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
      <Wrap spacing="100px" justify="space-evenly">
        {customers.map((customer,index) => (
          <WrapItem key={index}>
            <Center w="300px" h="450px" bg="red.muted">
              <CardWithImage
                {...customer}
                 imageNumber = {index}
                 fetchCustomers={fetchCustomers}
                 />
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>

  )
};

export default App;
