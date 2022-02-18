package com.ssafy.api.service;

import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.db.entity.UserChatRoom;

public interface UserChatRoomService {
    UserChatRoom saveUserChatRoom(Long chatRoomId, Long userId);
    void deleteUserChatRoom(Long chatRoomId, Long userId);
}
