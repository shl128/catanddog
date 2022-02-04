package com.ssafy.db.repository;


import com.ssafy.db.entity.ChatRoomTag;
import com.ssafy.db.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomTagRepository extends JpaRepository <ChatRoomTag, Long> {
    @Query(value = "SELECT chat_room_tag_name from chat_room_tag where chat_room_id = :chatRoomId",nativeQuery = true)
    List<String> findByTag(@Param("chatRoomId") Long chatRoomId);

    @Query(value = "SELECT chat_room_id from chat_room_tag where chat_room_tag_name = :chatRoomTagName limit 6 offset :pageCnt",nativeQuery = true)
    List<Long> findByTagName(String chatRoomTagName, int pageCnt);
}
