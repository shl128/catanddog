package com.ssafy.api.service;

import com.ssafy.db.entity.ChatRoomTag;
import com.ssafy.db.repository.ChatRoomRepository;
import com.ssafy.db.repository.ChatRoomTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomTagServiceImpl implements ChatRoomTagService{
    @Autowired
    ChatRoomTagRepository chatRoomTagRepository;

    @Override
    public void saveChatRoomTag(Long chatRoomId, List<String> chatRoomTagName) {

        for(int i=0; i<chatRoomTagName.size(); i++){
            ChatRoomTag chatRoomTag = new ChatRoomTag();
            chatRoomTag.setChatRoomId(chatRoomId);
            chatRoomTag.setChatRoomTagName(chatRoomTagName.get(i));
            chatRoomTagRepository.save(chatRoomTag);
        }
    }
}
