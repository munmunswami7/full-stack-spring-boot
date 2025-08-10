package com.vishwa.auth;

public record AuthenticationRequest(
        String userName,
        String password
) {

}
