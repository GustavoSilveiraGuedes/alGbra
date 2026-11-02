package br.com.algbra.repository;

import br.com.algbra.entity.DesafioDiarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DesafioDiarioRepository extends JpaRepository<DesafioDiarioEntity, Integer> {
    Optional<DesafioDiarioEntity> findByDataDesafio(LocalDate dataDesafio);
}