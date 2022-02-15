package com.ssafy.api.service;

import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatRoom;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ChatRoomService {
    ChatRoom saveChatRoom(UserChatSavePostReq userChatSavePostReq, Long userId);

    ChatRoom updateChatRoom(UserChatSavePostReq userChatSavePostReq, Long chatRoomId, Long userId);

    void deleteChatRoom(Long chatRoomId, Long userId);

    List<ChatRoomRes> findChatRoom(int page);

    List<ChatRoomRes> findChatRoomTitle(String chatRoomTitle, int page);

    List<ChatRoomRes> findChatRoomTag(String chatRoomTagName, int page);

    List<String> findChatRoomSearchTitle(String chatRoomTitle);

    List<String> findChatRoomSearchHash(String chatRoomTagName);

    void enterUserChatRoom(Long chatRoomId);

    void exitUserChatRoom(Long chatRoomId);
}
