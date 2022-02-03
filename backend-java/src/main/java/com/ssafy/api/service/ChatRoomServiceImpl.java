package com.ssafy.api.service;

import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.repository.ChatRoomRepository;
import com.ssafy.db.repository.UserChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("chatRoomService")
public class ChatRoomServiceImpl implements ChatRoomService{
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserChatRoomRepository userChatRoomRepository;

    @Override
    public ChatRoom saveChatRoom(UserChatSavePostReq userChatSavePostReq, Long userId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setHostId(userId);
        chatRoom.setChatRoomTitle(userChatSavePostReq.getChatRoomTitle());
        chatRoom.setUserMaxCount(userChatSavePostReq.getUserMaxCount());
        chatRoom.setUserNowCount(1);
        System.out.println(chatRoom);
        return chatRoomRepository.save(chatRoom);
    }

    @Override
    public ChatRoom updateChatRoom(UserChatSavePostReq userChatSavePostReq, Long chatRoomId, Long userId) {
        // chatRoomId에 있는 hostId와 userId 비교 후 같을 시 변경
        ChatRoom chatRoom = chatRoomRepository.getOne(chatRoomId);
        if(chatRoom.getHostId() == userId){
            chatRoom.setChatRoomTitle(userChatSavePostReq.getChatRoomTitle());
            chatRoom.setUserMaxCount(userChatSavePostReq.getUserMaxCount());
            return chatRoomRepository.save(chatRoom);
        }else{
            return null;
        }
    }

    @Override
    public void deleteChatRoom(Long chatRoomId, Long userId) {
        // hostId와 userId 비교 후 같을 시 삭제
        ChatRoom chatRoom = chatRoomRepository.getOne(chatRoomId);
        if(chatRoom.getHostId() == userId){
            userChatRoomRepository.deleteChatRoomId(chatRoomId);
            chatRoomRepository.deleteById(chatRoomId);
        }
    }

}
