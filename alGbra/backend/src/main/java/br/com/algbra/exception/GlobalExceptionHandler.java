package br.com.algbra.exception;

import br.com.algbra.dto.ErroRespostaDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Captura TODAS as validações disparadas pelo Service
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErroRespostaDTO> tratarRegraDeNegocio(IllegalArgumentException ex) {
        ErroRespostaDTO erro = new ErroRespostaDTO(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // Captura JSON malformado (ex: sintaxe inválida no Postman)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroRespostaDTO> tratarJsonInvalido(HttpMessageNotReadableException ex) {
        ErroRespostaDTO erro = new ErroRespostaDTO(
                "O corpo da requisição (JSON) está inválido ou ausente.",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // Captura qualquer outro erro inesperado no servidor
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroRespostaDTO> tratarErroGenerico(Exception ex) {
        ErroRespostaDTO erro = new ErroRespostaDTO(
                "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }
}