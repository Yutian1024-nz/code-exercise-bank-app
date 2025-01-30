package com.example.backend.service;

import com.example.backend.model.Transaction;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public List<Transaction> getTransactionsByAccountId(String accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

}
