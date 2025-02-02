package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.model.Customer;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class TransferServiceTest {

    @Autowired
    private TransferService transferService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private final String customerId = "C1";
    private final String fromAccountId = "A";
    private final String toAccountId = "B";

    @BeforeEach
    void setup() {

        transactionRepository.deleteAll();
        accountRepository.deleteAll();
        customerRepository.deleteAll();


        Customer customer = new Customer();
        customer.setId(customerId);
        customer.setName("Test User");
        customer.setEmail("test@example.com");
        customer.setPassword("password123");
        customerRepository.save(customer);

        Account fromAccount = new Account();
        fromAccount.setId(fromAccountId);
        fromAccount.setAccountNumber("123456");
        fromAccount.setBalance(new BigDecimal("1000"));
        fromAccount.setCustomerId(customerId);
        accountRepository.save(fromAccount);


        Account toAccount = new Account();
        toAccount.setId(toAccountId);
        toAccount.setAccountNumber("654321");
        toAccount.setBalance(new BigDecimal("500"));
        toAccount.setCustomerId(customerId);
        accountRepository.save(toAccount);


        accountRepository.flush();
        customerRepository.flush();
    }

    @Test
    public void testConcurrentTransfers() throws InterruptedException {
        int threadCount = 2;
        BigDecimal transferAmount = new BigDecimal("600");

        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            executor.execute(() -> {
                try {
                    transferService.transfer(fromAccountId, toAccountId, transferAmount);
                } catch (Exception e) {
                    System.out.println("Transfer failed: " + e.getMessage());
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executor.shutdown();

        Account fromAccount = accountRepository.findById(fromAccountId).orElseThrow();
        Account toAccount = accountRepository.findById(toAccountId).orElseThrow();

        System.out.println("Final Balance of A: " + fromAccount.getBalance());
        System.out.println("Final Balance of B: " + toAccount.getBalance());

        assertEquals(0, fromAccount.getBalance().compareTo(new BigDecimal("400")));
        assertEquals(0, toAccount.getBalance().compareTo(new BigDecimal("1100")));

    }
}
