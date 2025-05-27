package com.vishwa;

import com.github.javafaker.Faker;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import javax.sql.DataSource;

import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
public abstract class AbstractTestContainersUnitTest {

    @BeforeAll
    static void beforeAll() {
        Flyway flyway = Flyway.configure().dataSource(
                postgrSQLcontainer.getJdbcUrl(),
                postgrSQLcontainer.getUsername(),
                postgrSQLcontainer.getPassword()
        ).load();
        flyway.migrate();
        System.out.println();
    }
    @Container
    protected static final PostgreSQLContainer<?> postgrSQLcontainer =
            new PostgreSQLContainer<>("postgres:latest")
                    .withDatabaseName("customer-dao-unit-test")
                    .withUsername("vishwaswami")
                    .withPassword("12345");

    @DynamicPropertySource
    private static void registerDataSourceProperties(DynamicPropertyRegistry dynamicPropertyRegistry){
        dynamicPropertyRegistry.add(
                "spring.datasource.url",
                postgrSQLcontainer::getJdbcUrl
        );
        dynamicPropertyRegistry.add(
                "spring.datasource.username",
                postgrSQLcontainer::getUsername
        );
        dynamicPropertyRegistry.add(
                "spring.datasource.password",
                postgrSQLcontainer::getPassword
        );
    }

    private static DataSource getDataSource(){
        DataSourceBuilder builder = DataSourceBuilder.create()
                .driverClassName(postgrSQLcontainer.getDriverClassName())
                .url(postgrSQLcontainer.getJdbcUrl())
                .username(postgrSQLcontainer.getUsername())
                .password(postgrSQLcontainer.getPassword());
        return builder.build();
    }

    protected static JdbcTemplate getJdbcTemplate(){
        return new JdbcTemplate(getDataSource());
    }

    protected static final Faker faker = new Faker();
    protected static final Random random = new Random();


//    @Test
//    void canStartPostgresDB() {
//        assertThat(postgrSQLcontainer.isRunning()).isTrue();
//        assertThat(postgrSQLcontainer.isCreated()).isTrue();
//    }


}
