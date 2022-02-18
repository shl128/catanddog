package com.ssafy.db.repository;

import com.ssafy.db.entity.UserChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from user_chat_room where user_id = :userId and chat_room_id = :chatRoomId", nativeQuery = true)
    void deleteId(Long chatRoomId, Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_chat_room where chat_room_id = :chatRoomId", nativeQuery = true)
    void deleteChatRoomId(Long chatRoomId);

    @Query(value = "SELECT *from user_chat_room where chat_room_id = :chatRoomId and user_id = :userId",nativeQuery = true)
    UserChatRoom checkUserChatRoom(Long chatRoomId, Long userId);
}
