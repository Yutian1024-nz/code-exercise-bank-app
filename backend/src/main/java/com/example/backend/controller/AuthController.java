package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.util.JWTUtil;
import com.example.backend.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JWTUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        Optional<Customer> dbCustomer = customerRepository.findByEmail(customer.getEmail());

        if (dbCustomer.isPresent() && PasswordUtil.matches(customer.getPassword(), dbCustomer.get().getPassword())) {
            String token = jwtUtil.generateToken(customer.getEmail());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", dbCustomer.get().getId());
            response.put("email", dbCustomer.get().getEmail());
            response.put("name", dbCustomer.get().getName());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
