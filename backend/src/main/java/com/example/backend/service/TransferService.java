package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.model.Transaction;
import com.example.backend.model.TransactionType;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransferService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransferService(AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void transfer(String fromAccountId, String toAccountId, BigDecimal amount) {
        // get accounts info
        Optional<Account> fromAccountOpt = accountRepository.findById(fromAccountId);
        Optional<Account> toAccountOpt = accountRepository.findById(toAccountId);

        // check if accounts exist
        if (fromAccountOpt.isEmpty() || toAccountOpt.isEmpty()) {
            throw new IllegalArgumentException("Account not found.");
        }

        Account fromAccount = fromAccountOpt.get();
        Account toAccount = toAccountOpt.get();

        // check if the accounts have amount
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance.");
        }

        // update account balance
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // record transaction
        Transaction withdrawTransaction = new Transaction();
        withdrawTransaction.setId(UUID.randomUUID().toString());
        withdrawTransaction.setAccountId(fromAccountId);
        withdrawTransaction.setAmount(amount.negate()); // negative amount displayed as withdraw
        withdrawTransaction.setType(TransactionType.TRANSFER);
        withdrawTransaction.setReferenceId(toAccountId);


        Transaction depositTransaction = new Transaction();
        depositTransaction.setId(UUID.randomUUID().toString());
        depositTransaction.setAccountId(toAccountId);
        depositTransaction.setAmount(amount);
        depositTransaction.setType(TransactionType.TRANSFER);
        depositTransaction.setReferenceId(fromAccountId);

        transactionRepository.save(withdrawTransaction);
        transactionRepository.save(depositTransaction);
    }
}
