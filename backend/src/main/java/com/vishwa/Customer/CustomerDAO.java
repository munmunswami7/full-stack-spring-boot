package com.vishwa.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerDAO {
    List<Customer> selectAllCustomers();
    Optional<Customer> selectCustomerByID(Integer customerID);
    void insertCustomer(Customer customer);
    boolean existPersonWithEmail(String email);
    void deleteCustomerByID(Integer customerID);
    boolean existsCustomerWithID(Integer customerID);
    void updateCustomer(Customer customer);
    Optional<Customer> selectUserByEmail(String email);

}
