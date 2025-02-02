package com.example.backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;


@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @Column
    private String id;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal balance;

    @Version
    private Integer version;

    public String getCustomerId() {
        return customerId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
