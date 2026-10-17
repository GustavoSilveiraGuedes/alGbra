package br.com.algbra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "formula")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormulaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome_pt", nullable = false, unique = true, length = 100)
    private String nomePT;

    @Column(name = "alias_pt1", length = 100)
    private String aliasPT1;

    @Column(name = "alias_pt2", length = 100)
    private String aliasPT2;

    @Column(name = "nome_en", nullable = false, unique = true, length = 100)
    private String nomeEN;

    @Column(name = "alias_en1", length = 100)
    private String aliasEN1;

    @Column(name = "alias_en2", length = 100)
    private String aliasEN2;

    @Column(name = "materia", nullable = false, length = 100)
    private String materia;

    @Column(name = "conteudo", nullable = false, length = 100)
    private String conteudo;

    @Column(name = "numero_variaveis")
    private Integer numeroVariaveis; // Pode ser nulo (ex: Permutação com Repetição)

    @Column(name = "periodo_ensinado", nullable = false, length = 3)
    private String periodoEnsinado;

    @Column(name = "seculo", nullable = false, length = 10)
    private String seculo;

    @Column(name = "autor", length = 100)
    private String autor;

    @OneToMany(mappedBy = "formula")
    private Set<DesafioDiarioEntity> desafioDiarios = new HashSet<>();
}