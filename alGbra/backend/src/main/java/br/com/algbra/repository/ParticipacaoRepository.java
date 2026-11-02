package br.com.algbra.repository;

import br.com.algbra.entity.ParticipacaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipacaoRepository extends JpaRepository<ParticipacaoEntity, Integer> {

    @Query("SELECT p FROM ParticipacaoEntity p WHERE p.usuario.id = :usuarioId")
    List<ParticipacaoEntity> findByUsuarioId(@Param("usuarioId") Integer usuarioId);

    Optional<ParticipacaoEntity> findByUsuarioIdAndDesafioDiarioId(Integer usuarioId, Integer desafioDiarioId);
}