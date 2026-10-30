package br.com.algbra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRespostaDTO {

    private Integer id;
    private String nome;
    private String email;
    private String fotoUrl;
}