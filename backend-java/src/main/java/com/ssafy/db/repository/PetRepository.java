package com.ssafy.db.repository;

import com.ssafy.db.entity.Pet;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// JPA 인터페이스 정의
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query(value = "SELECT *from pet where user_id = :userId",nativeQuery = true)
    List<Pet> findByPet(@Param("userId") Long userId);
}
