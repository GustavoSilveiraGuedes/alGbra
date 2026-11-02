package br.com.algbra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "participacoes"})
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "senha", length = 255) // Pode ser nula (ex: login via Google)
    private String senha;

    @Column(name = "foto_url", length = 500)
    private String fotoUrl;

    @Column(name = "is_admin", nullable = false, columnDefinition = "boolean default false")
    private Boolean isAdmin = false;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnoreProperties("usuario")
    private Set<ParticipacaoEntity> participacoes = new HashSet<>();
}