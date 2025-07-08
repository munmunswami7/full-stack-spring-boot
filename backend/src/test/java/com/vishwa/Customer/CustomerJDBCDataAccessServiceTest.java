package com.vishwa.Customer;

import com.vishwa.AbstractTestContainersUnitTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

class CustomerJDBCDataAccessServiceTest extends AbstractTestContainersUnitTest {

    private CustomerJDBCDataAccessService underTest;
    private final CustomerRowMapper customerRowMapper = new CustomerRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new CustomerJDBCDataAccessService(
                getJdbcTemplate(),
                customerRowMapper
        );
    }

    @Test
    void selectAllCustomers() {
        //GIVEN
        Customer customer = new Customer(
                faker.name().fullName(),
                faker.internet().emailAddress()+"_"+ UUID.randomUUID()  ,
                20,
                Gender.MALE);
        underTest.insertCustomer(customer);
        //WHEN
        List<Customer> actualCustomers = underTest.selectAllCustomers();
        //THEN
        assertThat(actualCustomers).isNotEmpty();
    }

    @Test
    void selectCustomerByID() {
        String email = faker.internet().emailAddress()+"_"+ UUID.randomUUID();
        //GIVEN
        Customer customer = new Customer(
                faker.name().fullName(),
                email,
                20,
                Gender.MALE);
        underTest.insertCustomer(customer);

        Integer id = underTest.selectAllCustomers()
                .stream()
                .filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();
        //WHEN
        Optional<Customer> actualCustomer = underTest.selectCustomerByID(id);

        //THEN
        assertThat(actualCustomer).isPresent().hasValueSatisfying(c->{
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }

    @Test
    void willReturnEmptyWhenSelectCustomerById(){
        int id = -1;
        Optional<Customer> actual = underTest.selectCustomerByID(id);
        assertThat(actual).isEmpty();
    }

    @Test
    void insertCustomer() {

        //GIVEN

        //WHEN

        //THEN
    }

    @Test
    void existPersonWithEmail() {
        //GIVEN
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        String name = faker.name().firstName();
        Customer customer = new Customer(
                name,
                email,
                20,
                Gender.MALE);
        underTest.insertCustomer(customer);

        //WHEN
        boolean actual = underTest.existPersonWithEmail(email);

        //THEN
        assertThat(actual).isTrue();
    }

    @Test
    void existPersonWithEmailReturnFalseWhenDoesNotExists(){
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        boolean actual = underTest.existPersonWithEmail(email);
        assertThat(actual).isFalse();
    }

    @Test
    void deleteCustomerByID() {

        //GIVEN
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                27,
                Gender.MALE);
        underTest.insertCustomer(customer);
        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();
        //WHEN
        underTest.deleteCustomerByID(id);
        //THEN
        Optional<Customer> actual = underTest.selectCustomerByID(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void existsCustomerWithID() {
        //GIVEN
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                39,
                Gender.MALE);
        underTest.insertCustomer(customer);


        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();
        //WHEN
        boolean actual = underTest.existsCustomerWithID(id);
        //THEN
        assertThat(actual).isTrue();
    }

    @Test
    void existsCustomerWithIDWillReturnFalseWhenIdDoesNotExists(){
        int id = -1;
        boolean actual = underTest.existsCustomerWithID(id);
        assertThat(actual).isFalse();
    }

    @Test
    void updateCustomerName() {
        //GIVEN
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                27,
                Gender.MALE);
        underTest.insertCustomer(customer);
        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();
        //WHEN name is updated
        String newName = "foo";
        Customer update = new Customer();
        update.setId(id);
        update.setName(newName);
        underTest.updateCustomer(update);
        Optional<Customer> actual = underTest.selectCustomerByID(id);
        assertThat(actual).isPresent().hasValueSatisfying(c-> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(newName);
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());
        });
    }


    @Test
    void updateCustomerAge(){
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                56,
                Gender.MALE);
        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        int newAge = 78;
        Customer update = new Customer();
        update.setId(id);
        update.setAge(newAge);
        underTest.updateCustomer(update);

        Optional<Customer> actualFromDatabase = underTest.selectCustomerByID(id);
        assertThat(actualFromDatabase).isPresent().hasValueSatisfying(c -> {
                    assertThat(c.getId()).isEqualTo(id);
                    assertThat(c.getName()).isEqualTo(customer.getName());
                    assertThat(c.getAge()).isEqualTo(newAge);
                    assertThat(c.getEmail()).isEqualTo(customer.getEmail());
                }
        );
    }

    @Test
    void willUpdateAllPropertiesOfCustomer(){
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                56,
                Gender.MALE);
        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        Customer update = new Customer();
        update.setId(id);
        update.setName("foo");
        String newEmail = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        update.setEmail(newEmail);
        update.setAge(22);

        underTest.updateCustomer(update);

        Optional<Customer> actualFromDB = underTest.selectCustomerByID(id);

        assertThat(actualFromDB).isPresent().hasValueSatisfying(updated -> {
            assertThat(updated.getId()).isEqualTo(id);
            assertThat(updated.getGender()).isEqualTo(Gender.MALE);
            assertThat(updated.getName()).isEqualTo("foo");
            assertThat(updated.getEmail()).isEqualTo(newEmail);
            assertThat(updated.getName()).isEqualTo("foo");
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate(){
        String email = faker.internet().emailAddress()+"_"+UUID.randomUUID();
        Customer customer = new Customer(
                faker.name().firstName(),
                email,
                56,
                Gender.MALE);
        underTest.insertCustomer(customer);

        int id = underTest.selectAllCustomers()
                .stream()
                .filter(c->c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();

        Customer update = new Customer();
        update.setId(id);
        Optional<Customer> actualFromDB = underTest.selectCustomerByID(id);
        assertThat(actualFromDB).isPresent().hasValueSatisfying(c ->{
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(customer.getName());
            assertThat(c.getEmail()).isEqualTo(customer.getEmail());
            assertThat(c.getAge()).isEqualTo(customer.getAge());

        });

    }
}
