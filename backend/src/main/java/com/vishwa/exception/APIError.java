package com.vishwa.exception;

import java.time.LocalDateTime;

public record APIError(
        String path,
        String message,
        int statusCode,
        LocalDateTime localDateTime
) {
}
