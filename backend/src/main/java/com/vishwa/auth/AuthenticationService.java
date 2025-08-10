package com.vishwa.auth;

import com.vishwa.Customer.Customer;
import com.vishwa.Customer.CustomerDTO;
import com.vishwa.Customer.CustomerDTOMapper;
import com.vishwa.jwt.JWTUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final CustomerDTOMapper customerDTOMapper;
    private final JWTUtils jwtUtils;

    public AuthenticationService(AuthenticationManager authenticationManager,
                                 CustomerDTOMapper customerDTOMapper,
                                 JWTUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.customerDTOMapper = customerDTOMapper;
        this.jwtUtils = jwtUtils;
    }

    public AuthenticationResponse login(AuthenticationRequest authRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.userName(),
                        authRequest.password()
                )
        );

        Customer principal = (Customer) authentication.getPrincipal();
        CustomerDTO customerDTO = customerDTOMapper.apply(principal);
        String jwtToken = jwtUtils.issueToken(customerDTO.username(), customerDTO.roles());

        return new AuthenticationResponse(jwtToken,customerDTO);
    }
}
