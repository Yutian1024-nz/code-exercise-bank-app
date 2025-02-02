package com.example.backend.repository;

import com.example.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, String> {
    List<Account> findByCustomerId(String customerId);

}
