package br.com.algbra.dto;

import lombok.Data;

@Data
public class FormulaDTO {
    private Integer id;
    private String nomePT;
    private String aliasPT1;
    private String aliasPT2;
    private String nomeEN;
    private String aliasEN1;
    private String aliasEN2;
    private String materia;
    private String conteudo;
    private String imagemUrl;
    private Integer numeroVariaveis;
    private String periodoEnsinado;
    private String seculo;
    private String autor;
}