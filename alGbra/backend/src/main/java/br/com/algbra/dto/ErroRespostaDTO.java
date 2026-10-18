package br.com.algbra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErroRespostaDTO {
    private String mensagem;
    private int status;
    private LocalDateTime timestamp;
}