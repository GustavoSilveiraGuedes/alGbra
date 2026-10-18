package br.com.algbra.repository;

import br.com.algbra.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

    boolean existsByEmail(String email);

    Optional<UsuarioEntity> findByEmail(String email);
}