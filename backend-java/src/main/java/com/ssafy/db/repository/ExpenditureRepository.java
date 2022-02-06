package com.ssafy.db.repository;

import com.ssafy.db.entity.Expenditure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ExpenditureRepository extends JpaRepository <Expenditure, Integer> {
    @Query(value = "SELECT * from expenditure where user_id = :userId order by expenditure_id desc",nativeQuery = true)
    List<Expenditure> findByExpenditure(@Param("userId") Long userId);

    @Query(value = "SELECT * from expenditure where user_id = :userId and expenditure_category = :expenditureCategory order by expenditure_id desc",nativeQuery = true)
    List<Expenditure> findByExpenditureCategory(@Param("userId") Long userId, @Param("expenditureCategory") String expenditureCategory);

    @Query(value = "SELECT SUM(expenditure_price) from expenditure where user_id = :userId",nativeQuery = true)
    Integer findByExpenditureCount(@Param("userId") Long userId);

    @Query(value = "SELECT SUM(expenditure_price) from expenditure where user_id = :userId and expenditure_category = :expenditureCategory order by expenditure_id desc",nativeQuery = true)
    Integer findByExpenditureCategoryCount(@Param("userId") Long userId, @Param("expenditureCategory") String expenditureCategory);

    @Query(value = "SELECT * from expenditure where user_id = :userId and expenditure_id = :expenditureId",nativeQuery = true)
    List<Expenditure> findByExpenditureOne(@Param("userId") Long userId, @Param("expenditureId")  Integer expenditureId);

    @Transactional
    @Modifying
    @Query(value = "delete from expenditure where user_id = :userId and expenditure_id = :expenditureId", nativeQuery = true)
    void delete(Long userId, Integer expenditureId);
}
