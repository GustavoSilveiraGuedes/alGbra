package br.com.algbra.controller;

import br.com.algbra.dto.FormulaDTO;
import br.com.algbra.dto.FormulaInputDTO;
import br.com.algbra.service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/formulas")
@CrossOrigin(origins = "*")
public class FormulaController {

    @Autowired
    private FormulaService formulaService;

    @GetMapping
    public ResponseEntity<List<FormulaDTO>> listarTodas() {
        return ResponseEntity.ok(formulaService.listarTodas());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FormulaDTO> cadastrarFormula(
            @ModelAttribute FormulaInputDTO input,
            @RequestParam("imagem") MultipartFile imagem) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(formulaService.cadastrarFormula(input, imagem));
    }
}