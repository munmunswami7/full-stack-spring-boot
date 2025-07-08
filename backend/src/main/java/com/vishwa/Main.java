package com.vishwa;
import com.github.javafaker.Faker;
import com.vishwa.Customer.Customer;
import com.vishwa.Customer.CustomerRepository;
import com.vishwa.Customer.Gender;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import java.util.Random;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        ConfigurableApplicationContext context =  SpringApplication.run(Main.class, args);
        String[] beanDefinitionNames = context.getBeanDefinitionNames();
//        for(String bean: beanDefinitionNames){
//            System.out.println(bean);
//        }

    }

    @Bean
    CommandLineRunner commandLineRunner (CustomerRepository customerRepository){
        return args -> {
        var faker = new Faker();
        Random random = new Random();
            Customer customer = new Customer(faker.name().fullName(),
                    faker.name().firstName().toLowerCase()+ "."+ faker.name().lastName().toLowerCase()+"@example.com",

                    random.nextInt(16,99), Gender.MALE);
//            customerRepository.save(customer);
        };
    }
}
