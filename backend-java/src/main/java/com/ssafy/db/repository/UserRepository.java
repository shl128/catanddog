package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<User> findByUserId(String user_email);

    @Query(value = "SELECT * from user where user_kind = 2 and user_active = 1",nativeQuery = true)
    List<User> findActiveUser();

    @Transactional
    @Modifying
    @Query(value = "update user set user_active = if(user_active = 1,0,1) where user_id = :userId",nativeQuery = true)
    void updateUserActive(@Param("userId") Long userId);

    @Query(value = "SELECT user_email from user where user_email = :userEmail", nativeQuery = true)
    String findEmailByEmail(String userEmail);

    @Transactional
    @Modifying
    @Query(value = "update user set user_password = :userPassword where user_email = :userEmail", nativeQuery = true)
    void updateUserPassword(String userEmail, String userPassword);
}