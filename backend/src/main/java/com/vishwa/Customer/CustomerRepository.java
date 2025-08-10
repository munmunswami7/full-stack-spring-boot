package com.vishwa.Customer;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    boolean existsCustomerByEmail(String email);
    boolean existsById(Integer integer);
    Optional<Customer> findCustomerByEmail(String email);
}
