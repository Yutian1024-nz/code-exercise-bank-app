package com.example.backend.controller;

import com.example.backend.dto.TransferRequest;
import com.example.backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
    private final TransferService transferService;

    @Autowired
    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            transferService.transfer(request.getFromAccountId(), request.getToAccountId(), request.getAmount());
            return ResponseEntity.ok("Transfer successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
