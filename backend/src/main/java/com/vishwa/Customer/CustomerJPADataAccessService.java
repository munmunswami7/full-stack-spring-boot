package com.vishwa.Customer;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("jpa")
public class CustomerJPADataAccessService implements CustomerDAO{
    private final CustomerRepository customerRepository;

    public CustomerJPADataAccessService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> selectAllCustomers() {
       return
               customerRepository.findAll();
    }

    @Override
    public Optional<Customer> selectCustomerByID(Integer customerID) {

        return customerRepository.findById(customerID);
    }

    @Override
    public void insertCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public boolean existPersonWithEmail(String email) {
        return customerRepository.existsCustomerByEmail(email);
    }

    @Override
    public void deleteCustomerByID(Integer customerID) {

        customerRepository.deleteById(customerID);
    }

    @Override
    public boolean existsCustomerWithID(Integer customerID) {

        return customerRepository.existsById(customerID);
    }

    @Override
    public void updateCustomer(Customer update) {

        customerRepository.save(update);
    }
}
