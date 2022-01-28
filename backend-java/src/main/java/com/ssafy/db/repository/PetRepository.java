//package com.ssafy.db.repository;
//
//import com.ssafy.db.entity.Pet;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//// JPA 인터페이스 정의
//@Repository
//public interface PetRepository extends JpaRepository<Pet, Long> {
//    @Query("SELECT *from pet WHERE userId==user_id")
//    List<Pet> findByUserId(@Param("userId") int userId);
//}
