package com.ssafy.db.repository;

import com.ssafy.db.entity.ConsultRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ConsultRoomRepository  extends JpaRepository<ConsultRoom, Long> {
    @Query(value = "SELECT * from video_chat_room where host_id = :userId",nativeQuery = true)
    ConsultRoom findByUserId(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value = "DELETE from video_chat_room where host_id = :userId",nativeQuery = true)
    void deleteByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * from video_chat_room where host_id = :userId",nativeQuery = true)
    ConsultRoom findConsultRoomByUserId(Long userId);
}
