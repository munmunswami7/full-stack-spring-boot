package com.vishwa.Customer;

import com.vishwa.AbstractTestContainersUnitTest;
import com.vishwa.TestConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) //this stops its embedded database and class connect to database in application.properties file
@Import({TestConfig.class})
class CustomerRepositoryTest extends AbstractTestContainersUnitTest {       // but we don't wnt to connect to our production database, we need to connect to Test container
    // so we use extent AbstractTestContainersUnitTest
    @Autowired
    private CustomerRepository underTest;

    @Autowired
    private ApplicationContext applicationContext;

    @BeforeEach
    void setup(){
        System.out.println(applicationContext.getBeanDefinitionCount());
    }

    @Test
    void existsById() {
        String email = faker.internet().emailAddress()+"_"+ UUID.randomUUID();
        //GIVEN
        Customer customer = new Customer(
                faker.name().fullName(),
                email,
                "password", 20,
                Gender.MALE);
        underTest.save(customer);

        Integer id = underTest.findAll()
                .stream()
                .filter(c -> c.getEmail().equals(email))
                .map(Customer::getId)
                .findFirst()
                .orElseThrow();
        //WHEN
        boolean actualCustomer = underTest.existsById(id);

        //THEN
        assertThat(actualCustomer).isTrue();
    };

    @Test
    void existsByIdWhenIdDoesNotExists() {

        Integer id = -1;
        //WHEN
        boolean actualCustomer = underTest.existsById(id);
        //THEN
        assertThat(actualCustomer).isFalse();
    };

    @Test
    void existsCustomerByEmail() {
        String email = faker.internet().emailAddress()+"_"+ UUID.randomUUID();
        //GIVEN
        Customer customer = new Customer(
                faker.name().fullName(),
                email,
                "password", 20,
                Gender.MALE);
        underTest.save(customer);

        boolean actualCustomer = underTest.existsCustomerByEmail(email);

        //THEN
        assertThat(actualCustomer).isTrue();

    }

    @Test
    void existsCustomerByEmailWhenEmailDoesNotExists() {
        String email = faker.internet().emailAddress()+"_"+ UUID.randomUUID();
        boolean actualCustomer = underTest.existsCustomerByEmail(email);
        assertThat(actualCustomer).isFalse();

    }
}
