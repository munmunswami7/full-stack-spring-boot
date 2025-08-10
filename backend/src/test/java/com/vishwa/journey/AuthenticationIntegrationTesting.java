package com.vishwa.journey;


import com.github.dockerjava.zerodep.shaded.org.apache.hc.core5.http.HttpHeaders;
import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.vishwa.Customer.CustomerDTO;
import com.vishwa.Customer.Gender;
import com.vishwa.Customer.JSON_Requests.CustomerRegistrationRequest;
import com.vishwa.auth.AuthenticationRequest;
import com.vishwa.auth.AuthenticationResponse;
import com.vishwa.jwt.JWTUtils;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthenticationIntegrationTesting {

    @Autowired
    private WebTestClient webTestClient;
    @Autowired
    private JWTUtils jwtUtil;
    private static final Random RANDOM = new Random();
    private static final String AUTHENTICATION_PATH = "/api/v1/auth" ;
    private static final String CUSTOMER_PATH = "/api/v1/customers" ;

    @Test
    void canLogin() {

        // Create Registration Request
        Faker faker = new Faker();
        Name fakerName = faker.name();
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@vaibhavVishwa.com";
        int age = RANDOM.nextInt(1,100);
        Gender gender = age%2 == 0 ? Gender.MALE : Gender.FEMALE;
        CustomerRegistrationRequest customerRegistrationRequest = new CustomerRegistrationRequest(
                name,email,"password",age, gender);

        AuthenticationRequest authenticationRequest = new AuthenticationRequest(
                email, "password"
        );

        webTestClient.post()
                .uri(AUTHENTICATION_PATH+"/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest), AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isUnauthorized();

        //send a post registration request
        webTestClient.post()
                .uri(CUSTOMER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(
                        Mono.just(customerRegistrationRequest),
                        CustomerRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        EntityExchangeResult<AuthenticationResponse> response = webTestClient.post()
                .uri(AUTHENTICATION_PATH+"/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest), AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<AuthenticationResponse>(){
                })
                .returnResult();

//
//
//        String jwtToken = response.getResponseHeaders()
//                .get(HttpHeaders.AUTHORIZATION)
//                .get(0);

        AuthenticationResponse authResponse = response.getResponseBody();
        String jwtToken = authResponse.token();

        CustomerDTO customerDTO = authResponse.customerDTO();

        assertThat(jwtUtil.isTokenValid(jwtToken,customerDTO.username())).isTrue();

        assertThat(customerDTO.email()).isEqualTo(email);
        assertThat(customerDTO.age()).isEqualTo(age);
        assertThat(customerDTO.name()).isEqualTo(name);
        assertThat(customerDTO.username()).isEqualTo(email);
        assertThat(customerDTO.gender()).isEqualTo(gender);
        assertThat(customerDTO.roles()).isEqualTo(List.of("ROLE_USER"));

    }
}
