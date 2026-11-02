package br.com.algbra.service;

import br.com.algbra.dto.FormulaDTO;
import br.com.algbra.entity.*;
import br.com.algbra.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ParticipacaoService {

    private final FormulaRepository formulaRepository;
    private final DesafioDiarioRepository desafioDiarioRepository;
    private final ParticipacaoRepository participacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final FormulaService formulaService;

    @Transactional
    public DesafioDiarioEntity obterOuCriarDesafioHoje() {
        LocalDate hoje = LocalDate.now();

        return desafioDiarioRepository.findByDataDesafio(hoje).orElseGet(() -> {
            List<FormulaEntity> todas = formulaRepository.findAll();
            if (todas.isEmpty()) {
                throw new IllegalStateException("Nenhuma fórmula disponível no banco.");
            }

            long seed = hoje.toString().hashCode();
            Random random = new Random(seed);
            int index = Math.abs(random.nextInt()) % todas.size();

            DesafioDiarioEntity novo = new DesafioDiarioEntity();
            novo.setDataDesafio(hoje);
            novo.setFormula(todas.get(index));
            return desafioDiarioRepository.save(novo);
        });
    }

    @Transactional
    public FormulaDTO obterFormulaDoDia() {
        DesafioDiarioEntity desafioHoje = obterOuCriarDesafioHoje();
        return formulaService.buscarPorId(desafioHoje.getFormula().getId());
    }

    @Transactional
    public ParticipacaoEntity registrarParticipacao(Integer usuarioId, Boolean acertou) {
        DesafioDiarioEntity desafioHoje = obterOuCriarDesafioHoje();

        return participacaoRepository.findByUsuarioIdAndDesafioDiarioId(usuarioId, desafioHoje.getId())
                .orElseGet(() -> {
                    UsuarioEntity usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + usuarioId));

                    ParticipacaoEntity participacao = new ParticipacaoEntity();
                    participacao.setUsuario(usuario);
                    participacao.setDesafioDiario(desafioHoje);
                    participacao.setAcertou((byte) (acertou ? 1 : 0));

                    return participacaoRepository.save(participacao);
                });
    }

    @Transactional(readOnly = true)
    public List<ParticipacaoEntity> obterHistoricoUsuario(Integer usuarioId) {
        if (usuarioId == null) {
            return List.of();
        }
        return participacaoRepository.findByUsuarioId(usuarioId);
    }
}