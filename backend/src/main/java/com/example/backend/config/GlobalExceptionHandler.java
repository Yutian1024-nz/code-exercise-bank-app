package com.example.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // handle all runtime exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Internal Server Error");
        response.put("message", "Something went wrong. Please try again later.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // handle all database exceptions
    @ExceptionHandler(org.springframework.dao.DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDatabaseException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Database Error");
        response.put("message", "A database error occurred.");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // handle  not found exceptions
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleNotFoundException(ResponseStatusException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Not Found");
        response.put("message", ex.getReason());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
