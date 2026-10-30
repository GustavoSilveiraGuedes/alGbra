package br.com.algbra.service;

import br.com.algbra.dto.CadastroDTO;
import br.com.algbra.dto.GoogleLoginDTO;
import br.com.algbra.dto.LoginDTO;
import br.com.algbra.dto.UsuarioRespostaDTO;
import br.com.algbra.entity.UsuarioEntity;
import br.com.algbra.repository.UsuarioRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${google.client-id}")
    private String CLIENT_ID;

    public UsuarioRespostaDTO cadastrar(CadastroDTO dto) {
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

        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado no sistema.");
        }

        UsuarioEntity novoUsuario = new UsuarioEntity();
        novoUsuario.setNome(dto.getNome().trim());
        novoUsuario.setEmail(dto.getEmail().trim());
        novoUsuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        UsuarioEntity usuarioSalvo = usuarioRepository.save(novoUsuario);

        return new UsuarioRespostaDTO(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getFotoUrl()
        );
    }

    public UsuarioRespostaDTO login(LoginDTO dto) {
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

        return new UsuarioRespostaDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getFotoUrl()
        );
    }

    public UsuarioRespostaDTO autenticarGoogle(GoogleLoginDTO dto) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(dto.getToken());

            if (idToken == null) {
                throw new IllegalArgumentException("Token do Google inválido.");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String nome = (String) payload.get("name");
            String picture = (String) payload.get("picture"); // URL enviada pelo token do Google

            Optional<UsuarioEntity> usuarioOpt = usuarioRepository.findByEmail(email);

            UsuarioEntity usuario;
            if (usuarioOpt.isPresent()) {
                usuario = usuarioOpt.get();
                // Atualiza a foto no banco caso tenha mudado no perfil do Google
                if (picture != null && !picture.equals(usuario.getFotoUrl())) {
                    usuario.setFotoUrl(picture);
                    usuario = usuarioRepository.save(usuario);
                }
            } else {
                usuario = new UsuarioEntity();
                usuario.setNome(nome);
                usuario.setEmail(email);
                usuario.setSenha(null);
                usuario.setFotoUrl(picture);
                usuario = usuarioRepository.save(usuario);
            }

            return new UsuarioRespostaDTO(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getFotoUrl()
            );

        } catch (Exception e) {
            throw new IllegalArgumentException("Falha ao autenticar com o Google: " + e.getMessage());
        }
    }
}