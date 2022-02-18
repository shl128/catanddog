package com.ssafy.db.repository;

import com.ssafy.db.entity.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserTagRepository extends JpaRepository <UserTag, Integer> {
    @Query(value = "SELECT * from user_tag where user_id = :userId order by user_tag_id desc",nativeQuery = true)
    List<UserTag> findByUserTag(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_tag where user_id = :userId and user_tag_id = :userTagId", nativeQuery = true)
    void deleteUserTag(Integer userTagId, Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_tag where user_id = :userId", nativeQuery = true)
    void deleteUserId(Long userId);
}
