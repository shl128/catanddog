package com.ssafy.db.repository;


import com.ssafy.db.entity.ChatRoomTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ChatRoomTagRepository extends JpaRepository <ChatRoomTag, Long> {
    @Query(value = "SELECT chat_room_tag_name from chat_room_tag where chat_room_id = :chatRoomId",nativeQuery = true)
    List<String> findByTag(@Param("chatRoomId") Long chatRoomId);

    @Query(value = "SELECT chat_room_id from chat_room_tag where chat_room_tag_name = :chatRoomTagName limit 6 offset :pageCnt",nativeQuery = true)
    List<Long> findByTagName(String chatRoomTagName, int pageCnt);

    @Query(value = "select distinct chat_room_title from chat_room where chat_room_title Like :chatRoomTitle%",nativeQuery = true)
    List<String> findBySearchTitle(String chatRoomTitle);

    @Query(value = "select distinct chat_room_tag_name from chat_room_tag where chat_room_tag_name Like :chatRoomTagName%",nativeQuery = true)
    List<String> findBySearchHash(String chatRoomTagName);

    @Query(value = "select count(*) from chat_room_tag where chat_room_tag_name = :chatRoomTagName",nativeQuery = true)
    Long countTag(String chatRoomTagName);

    @Transactional
    @Modifying
    @Query(value = "DELETE from chat_room_tag where chat_room_id = :chatRoomId",nativeQuery = true)
    void deleteChatRoomId(Long chatRoomId);
}
