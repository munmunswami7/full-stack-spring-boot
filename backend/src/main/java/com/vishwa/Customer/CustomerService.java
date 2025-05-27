package com.vishwa.Customer;

import com.vishwa.Customer.JSON_Requests.CustomerRegistrationRequest;
import com.vishwa.Customer.JSON_Requests.CustomerUpdateRequest;
import com.vishwa.exception.DuplicateResourceException;
import com.vishwa.exception.RequestValidationException;
import com.vishwa.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerDAO customerDAO;

    public CustomerService(@Qualifier("jpa") CustomerDAO customerDAO) {

        this.customerDAO = customerDAO;
    }

    public List<Customer> getAllCustomers(){
        return customerDAO.selectAllCustomers();
    }

    public Customer getCustomerByID(Integer customerID){
        return customerDAO.selectCustomerByID(customerID)
                .orElseThrow(() -> new ResourceNotFoundException("customer with ID[%s] was not found".formatted(customerID)));
    }

        public void addCustomer(CustomerRegistrationRequest customerRegistrationRequest){
            if(customerDAO.existPersonWithEmail(customerRegistrationRequest.email())){
                throw new DuplicateResourceException("Email already exists");
            }
            customerDAO.insertCustomer(
                    new Customer(
                            customerRegistrationRequest.name(),
                            customerRegistrationRequest.email(),
                            customerRegistrationRequest.age()
                    )
            );
        }

    public void deleteCustomerByID(Integer customerID){
        if(!customerDAO.existsCustomerWithID(customerID)){
            throw new ResourceNotFoundException("customer with ID[%s] was not found".formatted(customerID));
        }else{
            customerDAO.deleteCustomerByID(customerID);
        }
    }

    public void updateCustomer(Integer customerID, CustomerUpdateRequest updateRequest){
        Customer customer = getCustomerByID(customerID);
        boolean changes = false;
        if(updateRequest.name() != null && !updateRequest.name().equals(customer.getName())){
            customer.setName(updateRequest.name());
            changes = true;
        }
        if(updateRequest.age() != null && !updateRequest.age().equals(customer.getAge())){
            customer.setAge(updateRequest.age());
            changes = true;
        }
        if(updateRequest.email() != null && !updateRequest.email().equals(customer.getEmail())){
            if(customerDAO.existPersonWithEmail(updateRequest.email())){
                throw new DuplicateResourceException("email already taken");
            }
            customer.setEmail(updateRequest.email());
            changes = true;
        }
        if(!changes){
            throw new RequestValidationException("no data change found");
        }
        customerDAO.updateCustomer(customer);
    }
}
