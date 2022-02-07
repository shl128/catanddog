package com.ssafy.db.repository;

import com.ssafy.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository <ChatRoom, Long> {

    @Query(value = "select *from chat_room orders limit 6 offset :pageCnt",nativeQuery = true)
    List<ChatRoom> findByPage(@Param("pageCnt") int pageCnt);

    @Query(value = "select *from chat_room where chat_room_title = :chatRoomTitle limit 6 offset :pageCnt",nativeQuery = true)
    List<ChatRoom> findByTitlePage(String chatRoomTitle, int pageCnt);

    @Query(value = "select count(*) from chat_room where chat_room_title = :chatRoomTitle",nativeQuery = true)
    Long countTitle(String chatRoomTitle);

    @Query(value = "SELECT user_chat_room_id, user_chat_room.chat_room_id, host_id, start_time, chat_room_title, user_max_count, user_now_count FROM user_chat_room, chat_room where user_id = :userId and user_chat_room.chat_room_id = chat_room.chat_room_id",nativeQuery = true)
    List<ChatRoom> findByUserChatRoom(@Param("userId") Long userId);
}
