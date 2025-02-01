package com.example.backend.controller;

import com.example.backend.dto.TransferRequest;
import com.example.backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
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
        } catch (IllegalArgumentException e) {
            response.put("success", "false");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
