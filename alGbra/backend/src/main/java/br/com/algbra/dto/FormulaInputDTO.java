package br.com.algbra.dto;

import lombok.Data;

@Data
public class FormulaInputDTO {
    private String nomePT;
    private String aliasPT1;
    private String aliasPT2;
    private String nomeEN;
    private String aliasEN1;
    private String aliasEN2;
    private Integer conteudoId; // ID do Conteudo associado
    private Integer numeroVariaveis;
    private String periodoEnsinado;
    private String seculo;
    private String autor;
}