package br.com.algbra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "formula")
@Getter
@Setter
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

    @Column(name = "imagem_url", nullable = false, length = 255)
    private String imagemUrl;

    @Column(name = "numero_variaveis")
    private Integer numeroVariaveis;

    @Column(name = "periodo_ensinado", nullable = false, length = 3)
    private String periodoEnsinado;

    @Column(name = "seculo", nullable = false, length = 10)
    private String seculo;

    @Column(name = "autor", length = 100)
    private String autor;

    @Column(name = "descricao", nullable = false, length = 2000)
    private String descricao;

    @Column(name = "video_url", nullable = false, length = 255)
    private String videoUrl;

    // Relacionamento com Conteudo (que por sua vez já tem a Materia)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conteudo_id", nullable = false)
    private ConteudoEntity conteudo;

    @OneToMany(mappedBy = "formula")
    private Set<DesafioDiarioEntity> desafioDiarios = new HashSet<>();
}
