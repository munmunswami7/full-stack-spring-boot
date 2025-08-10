package com.vishwa.Customer;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.assertj.core.api.Assertions.assertThat;
import java.sql.ResultSet;
import java.sql.SQLException;

class CustomerRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        //GIVEN
        CustomerRowMapper underTest = new CustomerRowMapper();
        ResultSet resultSet = Mockito.mock(ResultSet.class);
        Mockito.when(resultSet.getInt("id")).thenReturn(1);
        Mockito.when(resultSet.getInt("age")).thenReturn(19);
        Mockito.when(resultSet.getString("name")).thenReturn("Jamila");
        Mockito.when(resultSet.getString("email")).thenReturn("jamila@gmail.com");
        Mockito.when(resultSet.getString("gender")).thenReturn("FEMALE");

        //WHEN
        Customer actual = underTest.mapRow(resultSet,1);
        //THEN
        Customer expected = new Customer(1, "Jamila","jamila@gmail.com", "password", 19, Gender.FEMALE);
        assertThat(actual).isEqualTo(expected);
    }
}
