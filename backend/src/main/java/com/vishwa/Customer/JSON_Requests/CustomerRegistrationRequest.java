package com.vishwa.Customer.JSON_Requests;

public record CustomerRegistrationRequest(
        String name,
        String email,
        Integer age
) {

}
