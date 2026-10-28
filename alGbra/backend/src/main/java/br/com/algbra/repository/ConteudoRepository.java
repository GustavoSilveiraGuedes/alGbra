package br.com.algbra.repository;

import br.com.algbra.entity.ConteudoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConteudoRepository extends JpaRepository<ConteudoEntity, Integer> {
}