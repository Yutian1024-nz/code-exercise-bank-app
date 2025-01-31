SET time_zone = '+00:00';

CREATE
DATABASE IF NOT EXISTS bank_app;
USE
bank_app;


DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS customers;


CREATE TABLE customers
(
    id    CHAR(36) PRIMARY KEY,
    name  VARCHAR(50)  NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE accounts
(
    id             CHAR(36) PRIMARY KEY,
    customer_id    CHAR(36)       NOT NULL,
    account_number VARCHAR(20)    NOT NULL UNIQUE,
    balance        DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);


CREATE TABLE transactions
(
    id           CHAR(36) PRIMARY KEY,
    account_id   CHAR(36)       NOT NULL,
    amount       DECIMAL(10, 2) NOT NULL,
    type         ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER') NOT NULL,
    reference_id CHAR(36)  DEFAULT NULL,
    created_at   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
);



INSERT INTO customers (id, name, email, password)
VALUES ('112233', 'Alice', 'alice@example.com', '$2a$10$8XS4uoQQ510YdxAcUAXvcO4ZpZviJTIAlDMWGmnNXC/6E6qEZBYHW'),
       ('444555', 'Bob', 'bob@example.com', '$2a$10$8XS4uoQQ510YdxAcUAXvcO4ZpZviJTIAlDMWGmnNXC/6E6qEZBYHW');


INSERT INTO accounts (id, customer_id, account_number, balance)
VALUES (REPLACE(UUID(), '-', ''), (SELECT id FROM customers WHERE name = 'Alice'), '99887766', 5000.00),
       (REPLACE(UUID(), '-', ''), (SELECT id FROM customers WHERE name = 'Alice'), '00998877', 3000.00),
       (REPLACE(UUID(), '-', ''), (SELECT id FROM customers WHERE name = 'Bob'), '555666777', 7000.00);


INSERT INTO transactions (id, account_id, amount, type)
VALUES (REPLACE(UUID(), '-', ''), (SELECT id FROM accounts WHERE account_number = '99887766'), 500.00, 'deposit'),
       (REPLACE(UUID(), '-', ''), (SELECT id FROM accounts WHERE account_number = '99887766'), 200.00, 'withdraw'),
       (REPLACE(UUID(), '-', ''), (SELECT id FROM accounts WHERE account_number = '555666777'), 1000.00, 'deposit');
