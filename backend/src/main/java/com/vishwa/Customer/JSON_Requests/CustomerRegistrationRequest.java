package com.vishwa.Customer.JSON_Requests;

import com.vishwa.Customer.Gender;

public record CustomerRegistrationRequest(
        String name,
        String email,
        String password,
        Integer age,
        Gender gender
) {

}
