package com.algbra.controller;

import com.algbra.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verify")
@CrossOrigin(origins = "*")
public class VerifyController {

    private final EmailService emailService;

    public VerifyController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/enviarCodigo")
    public ResponseEntity<?> enviarCodigo(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "E-mail é obrigatório."));
        }

        try {
            emailService.enviarCodigoVerificacao(email);
            return ResponseEntity.ok(Map.of("success", true, "message", "Código enviado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("success", false, "message", "Erro ao enviar e-mail."));
        }
    }

    @PostMapping("/verificarCodigo")
    public ResponseEntity<?> verificarCodigo(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String codigo = payload.get("codigo");

        if (email == null || codigo == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "E-mail e código são obrigatórios."));
        }

        boolean valido = emailService.verificarCodigo(email, codigo);

        if (valido) {
            return ResponseEntity.ok(Map.of("success", true, "message", "E-mail verificado com sucesso!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Código inválido ou expirado."));
        }
    }
}