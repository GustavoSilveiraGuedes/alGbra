package br.com.algbra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "desafio_diario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "participacoes"})
public class DesafioDiarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "data_desafio", nullable = false, unique = true)
    private LocalDate dataDesafio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "formula_id", nullable = false)
    private FormulaEntity formula;

    @OneToMany(mappedBy = "desafioDiario")
    @JsonIgnoreProperties("desafioDiario")
    private Set<ParticipacaoEntity> participacoes = new HashSet<>();
}