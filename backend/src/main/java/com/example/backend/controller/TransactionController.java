package com.example.backend.controller;

import com.example.backend.model.Transaction;
import com.example.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(@RequestParam String accountId) {
        List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
        if (transactions.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(transactions); // 200 OK
    }

}
