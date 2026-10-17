package br.com.algbra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipacaoId implements Serializable {

    @Column(name = "usuario_id")
    private Integer usuarioId;

    @Column(name = "desafio_diario_id")
    private Integer desafioDiarioId;
}