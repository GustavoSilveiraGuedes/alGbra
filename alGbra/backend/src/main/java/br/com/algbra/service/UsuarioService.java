package br.com.algbra.service;

import br.com.algbra.dto.CadastroDTO;
import br.com.algbra.dto.LoginDTO;
import br.com.algbra.dto.UsuarioRespostaDTO;
import br.com.algbra.entity.UsuarioEntity;
import br.com.algbra.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioRespostaDTO cadastrar(CadastroDTO dto) {
        // 1. Validações dos campos obrigatórios e formatos
        if (dto.getNome() == null || dto.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O campo nome é obrigatório.");
        }
        if (dto.getNome().trim().length() < 2 || dto.getNome().trim().length() > 100) {
            throw new IllegalArgumentException("O nome deve ter entre 2 e 100 caracteres.");
        }
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty() || !dto.getEmail().contains("@")) {
            throw new IllegalArgumentException("Por favor, informe um e-mail válido.");
        }
        if (dto.getSenha() == null || dto.getSenha().trim().length() < 6) {
            throw new IllegalArgumentException("A senha deve ter no mínimo 6 caracteres.");
        }

        // 2. Validação de regra de negócio no banco
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado no sistema.");
        }

        UsuarioEntity novoUsuario = new UsuarioEntity();
        novoUsuario.setNome(dto.getNome().trim());
        novoUsuario.setEmail(dto.getEmail().trim());
        novoUsuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        UsuarioEntity usuarioSalvo = usuarioRepository.save(novoUsuario);

        return new UsuarioRespostaDTO(usuarioSalvo.getId(), usuarioSalvo.getNome(), usuarioSalvo.getEmail());
    }

    public UsuarioRespostaDTO autenticar(LoginDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("O campo e-mail é obrigatório.");
        }
        if (dto.getSenha() == null || dto.getSenha().trim().isEmpty()) {
            throw new IllegalArgumentException("O campo senha é obrigatório.");
        }

        Optional<UsuarioEntity> usuarioOpt = usuarioRepository.findByEmail(dto.getEmail());

        if (usuarioOpt.isEmpty()) {
            throw new IllegalArgumentException("Email ou senha incorretos.");
        }

        UsuarioEntity usuario = usuarioOpt.get();

        if (usuario.getSenha() == null || !passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            throw new IllegalArgumentException("Email ou senha incorretos.");
        }

        return new UsuarioRespostaDTO(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}