import { Wrap,WrapItem, Spinner, Text, Center} from "@chakra-ui/react";
import SidebarWithHeader from "./components/shared/SideBar";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/Client";
import CardWithImage from "./components/Card";


const App = () => {

  const [customers, setCustomer] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    getCustomers().then(res => {
      console.log("Fetched customers: ", res.data);
      setCustomer(res.data)
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
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
          <Text>No customers Available</Text>
        </SidebarWithHeader>
    )
  
  }


  return (
    <SidebarWithHeader>
      <Wrap spacing="30px" justify="space-evenly">
        {customers.map((customer,index) => (
          <WrapItem key={index}>
            <Center w="230px" h="450px" bg="red.muted">
              <CardWithImage {...customer} />
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>

  )
};

export default App;
