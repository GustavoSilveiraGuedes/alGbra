package br.com.algbra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "conteudo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ConteudoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "materia_id", nullable = false)
    @JsonIgnoreProperties({"conteudos", "hibernateLazyInitializer", "handler"})
    private MateriaEntity materia;

    @OneToMany(mappedBy = "conteudo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("conteudo")
    private List<FormulaEntity> formulas = new ArrayList<>();
}