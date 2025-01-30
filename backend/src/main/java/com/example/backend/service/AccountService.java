package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccountsByCustomerId(String customerId) {
        System.out.println("Get accounts by customer ID: " + customerId);
        List<Account> accounts = accountRepository.findByCustomerId(customerId);
        for (Account account : accounts) {
            System.out.println("Account: " + account.getId() + ", " + account.getAccountNumber() + ", " + account.getBalance());
        }
        return accounts;
    }
}
