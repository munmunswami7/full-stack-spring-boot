package com.vishwa.Customer;

import com.vishwa.Customer.JSON_Requests.CustomerRegistrationRequest;
import com.vishwa.Customer.JSON_Requests.CustomerUpdateRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping("/{customerID}")
    public Customer getCustomer(@PathVariable("customerID") Integer customerID){
        return customerService.getCustomerByID(customerID);
    }

    @GetMapping
    public List<Customer> getAllCustomers(){

        return customerService.getAllCustomers();
    }


    @PostMapping
    public void registerCustomer(
            @RequestBody
            CustomerRegistrationRequest request){
        customerService.addCustomer(request);
    }

    @DeleteMapping("/{customerID}")
    public void deleteCustomerByID(@PathVariable("customerID") Integer customerID){
        customerService.deleteCustomerByID(customerID);
    }

    @PutMapping("{customerID}")
    public void updateCustomer(
            @PathVariable("customerID") Integer customerID,
            @RequestBody CustomerUpdateRequest customerUpdateRequest
            ){
        customerService.updateCustomer(customerID, customerUpdateRequest);
    }
}
