package com.vishwa.Customer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("jdbc")
public class CustomerJDBCDataAccessService implements CustomerDAO{
    private final JdbcTemplate jdbcTemplate;
    private final CustomerRowMapper customerRowMapper;

    public CustomerJDBCDataAccessService(JdbcTemplate jdbcTemplate, CustomerRowMapper customerRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.customerRowMapper = customerRowMapper;
    }

    @Override
    public List<Customer> selectAllCustomers() {
        var sql = """
                SELECT id, name, email, password, age, gender
                FROM customer
                """;
        return jdbcTemplate.query(sql , customerRowMapper);

    }

//    @Override
//    public List<Customer> selectAllCustomers() {
//        var sql = """
//                SELECT (id, name, email,age) FROM customer
//                """;
//
//        return jdbcTemplate.query(sql,((rs, rowNum) ->
//                new Customer(
//                        rs.getInt("id"),
//                        rs.getString("name"),
//                        rs.getString("email"),
//                        rs.getInt("age")
//                )));
//    }

    @Override
    public Optional<Customer> selectCustomerByID(Integer customerID) {
        var sql  = """
                    SELECT id, name, email, password, age, gender
                    FROM customer
                    where id = ?;
                """;

        return jdbcTemplate.query(sql,customerRowMapper,customerID)
                .stream()
                .findFirst();

    }

    @Override
    public void insertCustomer(Customer customer) {
        var sql = """
                INSERT INTO customer (name, email, password, age, gender)
                VALUES(?,?,?,?,?)
                """;
        int result = jdbcTemplate.update(sql,
                customer.getName(),
                customer.getEmail(),
                customer.getPassword(),
                customer.getAge(),
                customer.getGender().name());
        System.out.println("jdbcTemplate.update = " + result);
    }

    @Override
    public boolean existPersonWithEmail(String email) {
        var sql = """
                    SELECT COUNT(id)
                    FROM customer
                    WHERE email = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,email);
        return count != null && count>0;

    }

    @Override
    public void deleteCustomerByID(Integer customerID) {
        var sql = """
                DELETE
                FROM customer
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.update(sql, customerID);



    }

    @Override
    public boolean existsCustomerWithID(Integer customerID) {
        var sql = """
                SELECT COUNT(id)
                FROM customer
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, customerID);
        return count !=null && count>0;
    }

    @Override
    public void updateCustomer(Customer customer) {
        if(customer.getName() != null){
            String sql = "UPDATE customer SET name = ? WHERE id = ?";
            int result = jdbcTemplate.update(sql, customer.getName(), customer.getId());
        }
        if(customer.getEmail() != null){
            String sql = "UPDATE customer SET email = ? WHERE id = ?";
            int result = jdbcTemplate.update(sql, customer.getEmail(), customer.getId());
        }
        if(customer.getAge() != null){
            String sql = "UPDATE customer SET age = ? WHERE id = ?";
            int result = jdbcTemplate.update(sql, customer.getAge(), customer.getId());
        }
    }

    @Override
    public Optional<Customer> selectUserByEmail(String email) {
        var sql = """
                SELECT id, name, email, password, age, gender
                from customer
                WHERE email = ?
                """;
        return jdbcTemplate.query(sql, customerRowMapper, email)
                .stream()
                .findFirst();
    }
}
