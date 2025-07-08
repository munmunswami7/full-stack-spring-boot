package com.vishwa.Customer;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class CustomerJPADataAccessServiceTest {

    private CustomerJPADataAccessService underTest;
    private static AutoCloseable autoCloseable;

    @Mock
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {

        //@Mock is a Annotation so we need to initialise it using MockitoAnnotations
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new CustomerJPADataAccessService(customerRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void selectAllCustomers() {
        //WHEN
        underTest.selectAllCustomers();
        //THEN
        verify(customerRepository).findAll();
    }

    @Test
    void selectCustomerByID() {
        //GIVEN
        int id = 1;
        //WHEN
        underTest.selectCustomerByID(id);
        //THEN
        verify(customerRepository).findById(id);
    }

    @Test
    void insertCustomer() {
        //GIVEN
        Customer customer = new Customer(
                1, "Ali", "alilhan@gmail.com",45, Gender.MALE);
        //WHEN
        underTest.insertCustomer(customer);
        //THEN
        verify(customerRepository).save(customer);
    }

    @Test
    void existPersonWithEmail() {
        //GIVEN
        String email = "foo@gmail.com";
        //WHEN
        underTest.existPersonWithEmail(email);
        //THEN
        verify(customerRepository).existsCustomerByEmail(email);
    }

    @Test
    void deleteCustomerByID() {
        //GIVEN
        int id = 1;
        //WHEN
        underTest.deleteCustomerByID(id);
        //THEN
        verify(customerRepository).deleteById(id);
    }

    @Test
    void existsCustomerWithID() {
        //GIVEN
        int id = 1;
        //WHEN
        underTest.existsCustomerWithID(id);
        //THEN
        verify(customerRepository).existsById(id);
    }

    @Test
    void updateCustomer() {
        //GIVEN
        Customer customer = new Customer(
                1, "Casino", "casinoroyal@gmail.com",23, Gender.MALE);
        //WHEN
        underTest.updateCustomer(customer);
        //THEN
        verify(customerRepository).save(customer);
    }
}
