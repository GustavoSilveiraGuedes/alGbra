package br.com.algbra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "participacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipacaoEntity {

    @EmbeddedId
    private ParticipacaoId id = new ParticipacaoId();

    @ManyToOne
    @MapsId("usuarioId") // Aponta para o atributo usuarioId da classe ParticipacaoId
    @JoinColumn(name = "usuario_id")
    private UsuarioEntity usuario;

    @ManyToOne
    @MapsId("desafioDiarioId") // Aponta para o atributo desafioDiarioId da classe ParticipacaoId
    @JoinColumn(name = "desafio_diario_id")
    private DesafioDiarioEntity desafioDiario;

    @Column(name = "acertou", nullable = false)
    private Byte acertou; // 1 para acertou, 0 para errou
}