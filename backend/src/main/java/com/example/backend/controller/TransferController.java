package com.example.backend.controller;

import com.example.backend.dto.TransferRequest;
import com.example.backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
    private static final Logger logger = LoggerFactory.getLogger(TransferController.class);
    private final TransferService transferService;

    @Autowired
    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> transfer(@RequestBody TransferRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            transferService.transfer(request.getFromAccountId(), request.getToAccountId(), request.getAmount());
            response.put("success", "true");
            response.put("message", "Transfer successful");
            return ResponseEntity.ok(response);
        } catch (ObjectOptimisticLockingFailureException e) {
            response.put("success", "false");
            response.put("message", "Transfer failed due to concurrent update. Please try again.");
            return ResponseEntity.badRequest().body(response);
        } catch (IllegalArgumentException e) {
            response.put("success", "false");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            logger.info("Transfer failed", e);
            response.put("success", "false");
            response.put("message", "Transfer failed. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
