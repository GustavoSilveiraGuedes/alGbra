package br.com.algbra.controller;

import br.com.algbra.dto.CadastroDTO;
import br.com.algbra.dto.GoogleLoginDTO;
import br.com.algbra.dto.LoginDTO;
import br.com.algbra.dto.UsuarioRespostaDTO;
import br.com.algbra.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioRespostaDTO> cadastrar(@RequestBody CadastroDTO dto) {
        UsuarioRespostaDTO usuarioSalvo = usuarioService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioRespostaDTO> login(@RequestBody LoginDTO dto) {
        UsuarioRespostaDTO usuarioLogado = usuarioService.login(dto);
        return ResponseEntity.ok(usuarioLogado);
    }

    @PostMapping("/google")
    public ResponseEntity<UsuarioRespostaDTO> loginGoogle(@RequestBody GoogleLoginDTO dto) {
        UsuarioRespostaDTO usuarioLogado = usuarioService.autenticarGoogle(dto);
        return ResponseEntity.ok(usuarioLogado);
    }
}