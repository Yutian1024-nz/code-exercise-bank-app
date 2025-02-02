package com.example.backend.service;

import com.example.backend.model.Transaction;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;


    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactionsByAccountId(String accountId) {
        return transactionRepository.findByAccountIdOrderByCreatedAtDesc(accountId);

    }
}
