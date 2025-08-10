package com.vishwa.auth;

import com.vishwa.Customer.CustomerDTO;

public record AuthenticationResponse(
        String token,
        CustomerDTO customerDTO
) {
}
