package com.vishwa.Customer;

import com.vishwa.Customer.JSON_Requests.CustomerRegistrationRequest;
import com.vishwa.Customer.JSON_Requests.CustomerUpdateRequest;
import com.vishwa.exception.DuplicateResourceException;
import com.vishwa.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    private CustomerService underTest;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private CustomerDAO customerDAO;
    private final CustomerDTOMapper customerDTOMapper = new CustomerDTOMapper();

    @BeforeEach
    void setUp() {
        underTest = new CustomerService(customerDAO, customerDTOMapper, passwordEncoder);
    }


    @Test
    void getAllCustomers() {
        //WHEN
        underTest.getAllCustomers();
        //THEN
        Mockito.verify(customerDAO).selectAllCustomers();
    }

    @Test
    void canGetCustomerByID() {
        //GIVEN
        int id =10;
        Customer customer = new Customer(id,"Alex","alex23@gmail.com", "password", 27, Gender.MALE);
        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));   // this we have mocked customerDao
        CustomerDTO expected = customerDTOMapper.apply(customer);
        //WHEN
        CustomerDTO actual = underTest.getCustomerByID(10);   // this will return mocked value
        //THEN
        assertThat(actual).isEqualTo(expected);    //asserting that mocked value is same as customer
    }
    @Test
    void willThrowWhenGetCustomerByIDReturnEmptyOptional() {
        //GIVEN
        int id =10;
        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.empty());
        //WHEN
        //THEN
        assertThatThrownBy(()->underTest.getCustomerByID(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with ID[%s] was not found".formatted(id));
    }

    @Test
    void addCustomer() {
        //GIVEN
        String email = "alex23@gmail.com";
        Mockito.when(customerDAO.existPersonWithEmail(email)).thenReturn(false);
        CustomerRegistrationRequest request = new CustomerRegistrationRequest("Alex", email, "password", 19, Gender.FEMALE);

        String passwordHash = "jl$^$%%765^&^%*5";
        Mockito.when(passwordEncoder.encode(request.password()))
                .thenReturn(passwordHash);
        //WHEN
        underTest.addCustomer(request);
        //THEN
        ArgumentCaptor<Customer> customerArgumentCaptor = ArgumentCaptor.forClass(Customer.class);
        Mockito.verify(customerDAO).insertCustomer(customerArgumentCaptor.capture());
        Customer capturedCustomer = customerArgumentCaptor.getValue();

        assertThat(capturedCustomer.getId()).isNull();
        assertThat(capturedCustomer.getName()).isEqualTo(request.name());
        assertThat(capturedCustomer.getEmail()).isEqualTo(request.email());
        assertThat(capturedCustomer.getAge()).isEqualTo(request.age());
        assertThat(capturedCustomer.getPassword()).isEqualTo(passwordHash);
    }

    @Test
    void willThrowExceptionWhileAddingCustomerIfDuplicateEmailExists() {
        //GIVEN
        String email = "alex24563@gmail.com";
        Mockito.when(customerDAO.existPersonWithEmail(email)).thenReturn(true);
        CustomerRegistrationRequest request = new CustomerRegistrationRequest("Alex", email, "password", 19, Gender.FEMALE);

        //WHEN
        assertThatThrownBy(() -> underTest.addCustomer(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Email already exists");
        //THEN
        Mockito.verify(customerDAO,Mockito.never()).insertCustomer(any());
    }

    @Test
    void deleteCustomerByID() {
        //GIVEN
        int id = 10;
        Mockito.when(customerDAO.existsCustomerWithID(id)).thenReturn(true);
        //WHEN
        underTest.deleteCustomerByID(id);
        //THEN
        Mockito.verify(customerDAO).deleteCustomerByID(id);
    }

    @Test
    void whenThrowDeleteCustomerByIdNotFound() {
        //GIVEN
        int id = 10;
        Mockito.when(customerDAO.existsCustomerWithID(id)).thenReturn(false);
        //WHEN
        assertThatThrownBy(() -> underTest.deleteCustomerByID(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("customer with ID[%s] was not found".formatted(id));
        //THEN
        Mockito.verify(customerDAO, Mockito.never()).deleteCustomerByID(id);
    }


    @Test
    void canUpdateAllCustomerProperties() {
        //GIVEN
        int id = 10;
        String newEmail = "alexandro@gmail.com";

        Customer customer = new Customer(id, "Alex","alex@gmail.com", "password", 19, Gender.MALE);

        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));
        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest("Alexandro", newEmail,23);

        Mockito.when(customerDAO.existPersonWithEmail(newEmail)).thenReturn(false);
        //WHEN
        underTest.updateCustomer(id,updateRequest);

        //THEN
        ArgumentCaptor<Customer> customerArgumentCaptor =
                ArgumentCaptor.forClass(Customer.class);

        Mockito.verify(customerDAO)
                .updateCustomer(customerArgumentCaptor.capture());

        Customer capturedCustomer = customerArgumentCaptor.getValue();

        assertThat(capturedCustomer.getName()).isEqualTo(updateRequest.name());
        assertThat(capturedCustomer.getEmail()).isEqualTo(updateRequest.email());
        assertThat(capturedCustomer.getAge()).isEqualTo(updateRequest.age());
    }

    @Test
    void canUpdateOnlyCustomerName() {
        //GIVEN
        int id = 10;
        Customer customer = new Customer(id, "Alex","alex@gmail.com", "password", 19, Gender.MALE);

        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest("Alexandro", null,null);

        //WHEN
        underTest.updateCustomer(id,updateRequest);
        //THEN
        ArgumentCaptor<Customer> customerArgumentCaptor = ArgumentCaptor.forClass(Customer.class);
        Mockito.verify(customerDAO).updateCustomer(customerArgumentCaptor.capture());
        Customer capturedCustomer = customerArgumentCaptor.getValue();

        assertThat(capturedCustomer.getName()).isEqualTo(updateRequest.name());
        assertThat(capturedCustomer.getEmail()).isEqualTo(customer.getEmail());
        assertThat(capturedCustomer.getAge()).isEqualTo(customer.getAge());
    }

    @Test
    void canUpdateOnlyCustomerEmail() {
        //GIVEN
        int id = 10;
        Customer customer = new Customer(id, "Alex","alex@gmail.com", "password", 19, Gender.MALE);

        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));

        String newEmail = "alexandro@gmail.com";

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(null, newEmail,null);

        Mockito.when(customerDAO.existPersonWithEmail(newEmail)).thenReturn(false);
        //WHEN
        underTest.updateCustomer(id,updateRequest);
        //THEN
        ArgumentCaptor<Customer> customerArgumentCaptor = ArgumentCaptor.forClass(Customer.class);
        Mockito.verify(customerDAO).updateCustomer(customerArgumentCaptor.capture());
        Customer capturedCustomer = customerArgumentCaptor.getValue();

        assertThat(capturedCustomer.getName()).isEqualTo(customer.getName());
        assertThat(capturedCustomer.getEmail()).isEqualTo(newEmail);
        assertThat(capturedCustomer.getAge()).isEqualTo(customer.getAge());
    }

//    @Test
//    void willThrowWhenTryingToUpdateCustomerEmailWhenAlreadyTaken() {
//        //GIVEN
//        int id = 10;
//        Customer customer = new Customer(id, "Alex","alex@gmail.com",19);
//
//        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));
//
//        String newEmail = "alexandro@gmail.com";
//
//        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(null, newEmail,null);
//
//        //WHEN
//        assertThatThrownBy(() -> underTest.updateCustomer(id, updateRequest))
//                .isInstanceOf(DuplicateResourceException.class)
//                .hasMessage("email already taken");
//        //THEN
//        Mockito.verify(customerDAO, Mockito.never()).updateCustomer(any());
//    }


    @Test
    void canUpdateOnlyCustomerAge() {
        //GIVEN
        int id = 10;
        Customer customer = new Customer(id, "Alex","alex@gmail.com", "password", 19, Gender.MALE);

        Mockito.when(customerDAO.selectCustomerByID(id)).thenReturn(Optional.of(customer));

        CustomerUpdateRequest updateRequest = new CustomerUpdateRequest(null, null,78);

        //WHEN
        underTest.updateCustomer(id,updateRequest);
        //THEN
        ArgumentCaptor<Customer> customerArgumentCaptor = ArgumentCaptor.forClass(Customer.class);
        Mockito.verify(customerDAO).updateCustomer(customerArgumentCaptor.capture());
        Customer capturedCustomer = customerArgumentCaptor.getValue();

        assertThat(capturedCustomer.getName()).isEqualTo(customer.getName());
        assertThat(capturedCustomer.getEmail()).isEqualTo(customer.getEmail());
        assertThat(capturedCustomer.getAge()).isEqualTo(updateRequest.age());
    }
}
