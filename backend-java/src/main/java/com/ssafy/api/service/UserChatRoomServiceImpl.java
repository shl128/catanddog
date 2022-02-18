package com.ssafy.api.service;

import com.ssafy.db.entity.UserChatRoom;
import com.ssafy.db.repository.UserChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserChatRoomServiceImpl implements UserChatRoomService{
    @Autowired
    UserChatRoomRepository userChatRoomRepository;

    @Override
    public UserChatRoom saveUserChatRoom(Long chatRoomId, Long userId) {
        if(userChatRoomRepository.checkUserChatRoom(chatRoomId, userId) == null){
            UserChatRoom userChatRoom = new UserChatRoom();
            userChatRoom.setUserId(userId);
            userChatRoom.setChatRoomId(chatRoomId);
            return userChatRoomRepository.save(userChatRoom);
        }
        return null;
    }

    @Override
    public void deleteUserChatRoom(Long chatRoomId, Long userId) {
        userChatRoomRepository.deleteId(chatRoomId, userId);
    }
}
