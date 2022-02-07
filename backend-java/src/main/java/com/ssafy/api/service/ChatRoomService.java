package com.ssafy.api.service;

import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.db.entity.ChatRoom;

public interface ChatRoomService {
    ChatRoom saveChatRoom(UserChatSavePostReq userChatSavePostReq, Long userId);

    ChatRoom updateChatRoom(UserChatSavePostReq userChatSavePostReq, Long chatRoomId, Long userId);

    void deleteChatRoom(Long chatRoomId, Long userId);

}
