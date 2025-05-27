package com.vishwa.Customer.JSON_Requests;

public record CustomerUpdateRequest(
        String name,
        String email,
        Integer age
) { }
