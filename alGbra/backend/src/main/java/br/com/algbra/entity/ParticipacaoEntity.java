package br.com.algbra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "participacao",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "desafio_diario_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"senha", "participacoes"})
    private UsuarioEntity usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "desafio_diario_id", nullable = false)
    @JsonIgnoreProperties({"participacoes"})
    private DesafioDiarioEntity desafioDiario;

    @Column(name = "acertou", nullable = false)
    private Byte acertou; // 1 para acertou, 0 para errou
}