package br.com.algbra.controller;

import br.com.algbra.dto.FormulaDTO;
import br.com.algbra.entity.ParticipacaoEntity;
import br.com.algbra.service.ParticipacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daily")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DesafioDiarioController {

    private final ParticipacaoService participacaoService;

    // GET /api/daily/formula-hoje
    @GetMapping("/dayliChallenge")
    public ResponseEntity<FormulaDTO> obterFormulaDoDia() {
        return ResponseEntity.ok(participacaoService.obterFormulaDoDia());
    }

    // POST /api/daily/registrar?usuarioId=1&acertou=true
    @PostMapping("/registrar")
    public ResponseEntity<ParticipacaoEntity> registrarParticipacao(
            @RequestParam Integer usuarioId,
            @RequestParam Boolean acertou) {

        return ResponseEntity.ok(participacaoService.registrarParticipacao(usuarioId, acertou));
    }

    // GET /api/daily/historico/1
    @GetMapping("/historico/{usuarioId}")
    public ResponseEntity<List<ParticipacaoEntity>> obterHistorico(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(participacaoService.obterHistoricoUsuario(usuarioId));
    }
}