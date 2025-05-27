package com.vishwa.Customer;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("list")
public class CustomerListDataAccessService implements CustomerDAO{

    private static List<Customer> customers;

    static {
        customers = new ArrayList<>();
        customers.add(new Customer(1,"Alex", "alex@gmail.com", 34));
        customers.add(new Customer(2, "Alexa", "alexa@gmail.com", 30));
    }

    @Override
    public List<Customer> selectAllCustomers() {
        return customers;
    }

    @Override
    public Optional<Customer> selectCustomerByID(Integer customerID) {
        return customers.stream().filter(c -> c.getId().equals(customerID))
                .findFirst();
    }

    @Override
    public void insertCustomer(Customer customer) {
        customers.add(customer);
    }

    @Override
    public boolean existPersonWithEmail(String email) {
        return customers.stream()
                .anyMatch(customer -> customer.getEmail().equals(email));
    }

    @Override
    public void deleteCustomerByID(Integer customerID) {
        customers.stream().filter(customer -> customer.getId().equals(customerID))
                .findFirst()
                .ifPresent(customer->customers.remove(customer));
    }

    @Override
    public boolean existsCustomerWithID(Integer customerID) {
        return customers.stream().anyMatch(customer -> customer.getId().equals(customerID));
    }

    @Override
    public void updateCustomer(Customer customer) {

    }
}

