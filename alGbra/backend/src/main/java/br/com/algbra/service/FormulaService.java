package br.com.algbra.service;

import br.com.algbra.dto.FormulaDTO;
import br.com.algbra.dto.FormulaInputDTO;
import br.com.algbra.entity.ConteudoEntity;
import br.com.algbra.entity.FormulaEntity;
import br.com.algbra.repository.ConteudoRepository;
import br.com.algbra.repository.FormulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.Normalizer;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FormulaService {

    private final FormulaRepository formulaRepository;
    private final ConteudoRepository conteudoRepository;

    @Transactional(readOnly = true)
    public List<FormulaDTO> listarTodas() {
        return formulaRepository.findAll()
                .stream()
                .map(this::converterParaDto)
                .toList();
    }

    @Transactional
    public FormulaDTO cadastrarFormula(FormulaInputDTO input, MultipartFile imagem) throws IOException {
        if (imagem == null || imagem.isEmpty()) {
            throw new IllegalArgumentException("A imagem da fórmula é obrigatória.");
        }

        ConteudoEntity conteudo = conteudoRepository.findById(input.getConteudoId())
                .orElseThrow(() -> new RuntimeException("Conteúdo não encontrado com o ID: " + input.getConteudoId()));

        String nomePasta = normalizarTexto(conteudo.getNome());
        String nomeArquivo = normalizarTexto(input.getNomePT()) + ".jpg";

        File raizProjeto = new File(System.getProperty("user.dir"));
        File pastaDestino = new File(raizProjeto, "frontend/public/formulas/" + nomePasta);

        if (!pastaDestino.exists()) {
            pastaDestino.mkdirs();
        }

        File arquivoDestino = new File(pastaDestino, nomeArquivo);
        imagem.transferTo(arquivoDestino.getAbsoluteFile());

        String imagemUrl = "/formulas/" + nomePasta + "/" + nomeArquivo;

        FormulaEntity entity = new FormulaEntity();
        entity.setNomePT(input.getNomePT());
        entity.setAliasPT1(input.getAliasPT1());
        entity.setAliasPT2(input.getAliasPT2());
        entity.setNomeEN(input.getNomeEN());
        entity.setAliasEN1(input.getAliasEN1());
        entity.setAliasEN2(input.getAliasEN2());
        entity.setConteudo(conteudo);
        entity.setImagemUrl(imagemUrl);
        entity.setNumeroVariaveis(input.getNumeroVariaveis());
        entity.setPeriodoEnsinado(input.getPeriodoEnsinado());
        entity.setSeculo(input.getSeculo());
        entity.setAutor(input.getAutor());

        FormulaEntity salva = formulaRepository.save(entity);
        return converterParaDto(salva);
    }

    private FormulaDTO converterParaDto(FormulaEntity entity) {
        FormulaDTO dto = new FormulaDTO();
        dto.setId(entity.getId());
        dto.setNomePT(entity.getNomePT());
        dto.setAliasPT1(entity.getAliasPT1());
        dto.setAliasPT2(entity.getAliasPT2());
        dto.setNomeEN(entity.getNomeEN());
        dto.setAliasEN1(entity.getAliasEN1());
        dto.setAliasEN2(entity.getAliasEN2());
        dto.setImagemUrl(entity.getImagemUrl());
        dto.setNumeroVariaveis(entity.getNumeroVariaveis());
        dto.setPeriodoEnsinado(entity.getPeriodoEnsinado());
        dto.setSeculo(entity.getSeculo());
        dto.setAutor(entity.getAutor());

        if (entity.getConteudo() != null) {
            dto.setConteudo(entity.getConteudo().getNome());
            if (entity.getConteudo().getMateria() != null) {
                dto.setMateria(entity.getConteudo().getMateria().getNome());
            }
        }

        return dto;
    }

    private String normalizarTexto(String texto) {
        if (texto == null) return "";
        return Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]", "_")
                .replaceAll("_+", "_");
    }
}