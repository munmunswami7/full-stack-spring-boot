package com.vishwa.Customer;

import com.vishwa.Customer.JSON_Requests.CustomerRegistrationRequest;
import com.vishwa.Customer.JSON_Requests.CustomerUpdateRequest;
import com.vishwa.jwt.JWTUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final JWTUtils jwtUtils;

    public CustomerController(CustomerService customerService, JWTUtils jwtUtils) {
        this.customerService = customerService;
        this.jwtUtils = jwtUtils;
    }


    @GetMapping("/{customerID}")
    public CustomerDTO getCustomer(@PathVariable("customerID") Integer customerID){
        return customerService.getCustomerByID(customerID);
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomers(){

        return customerService.getAllCustomers();
    }


    @PostMapping
    public ResponseEntity<?> registerCustomer(
            @RequestBody
            CustomerRegistrationRequest request){
        customerService.addCustomer(request);
        String jwtToken = jwtUtils.issueToken(request.email(),"ROLE_USER");
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
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
