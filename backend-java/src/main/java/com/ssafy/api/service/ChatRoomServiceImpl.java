package com.ssafy.api.service;

import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.ChatRoomTag;
import com.ssafy.db.repository.ChatRoomRepository;
import com.ssafy.db.repository.ChatRoomTagRepository;
import com.ssafy.db.repository.UserChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("chatRoomService")
public class ChatRoomServiceImpl implements ChatRoomService{
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserChatRoomRepository userChatRoomRepository;

    @Autowired
    ChatRoomTagRepository chatRoomTagRepository;

    @Override
    public ChatRoom saveChatRoom(UserChatSavePostReq userChatSavePostReq, Long userId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setHostId(userId);
        chatRoom.setChatRoomTitle(userChatSavePostReq.getChatRoomTitle());
        chatRoom.setUserMaxCount(userChatSavePostReq.getUserMaxCount());
        chatRoom.setUserNowCount(1);

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
            chatRoomTagRepository.deleteChatRoomId(chatRoomId);
            userChatRoomRepository.deleteChatRoomId(chatRoomId);
            chatRoomRepository.deleteById(chatRoomId);
        }
    }

    // 채팅방 정보 가져와서 해시태그 찾고 반환
    @Override
    public List<ChatRoomRes> findChatRoom(int page) {
        List<ChatRoomRes> chatRoomResList = new ArrayList<>();
        int pageCnt = (page-1) * 6;
        List<ChatRoom> chatRoomList = chatRoomRepository.findByPage(pageCnt);
        Long totalPage = (chatRoomRepository.count() / 6) + 1;
        for(int i=0; i<chatRoomList.size(); i++){
            ChatRoomRes chatRoomRes = new ChatRoomRes();
            ChatRoom chatRoom = chatRoomList.get(i);
            chatRoomRes.setChatRoomId(chatRoom.getChatRoomId());
            chatRoomRes.setChatRoomTitle(chatRoom.getChatRoomTitle());
            chatRoomRes.setUserMaxCount(chatRoom.getUserMaxCount());
            chatRoomRes.setUserNowCount(chatRoom.getUserNowCount());
            chatRoomRes.setTotalPage(totalPage);
            List<String> tagName = chatRoomTagRepository.findByTag(chatRoom.getChatRoomId());
            chatRoomRes.setTagName(tagName);
            chatRoomResList.add(chatRoomRes);
        }

        return chatRoomResList;
    }

    @Override
    public List<ChatRoomRes> findChatRoomTitle(String chatRoomTitle, int page) {
        List<ChatRoomRes> chatRoomResList = new ArrayList<>();
        int pageCnt = (page-1) * 6;
        List<ChatRoom> chatRoomList = chatRoomRepository.findByTitlePage(chatRoomTitle,pageCnt);
        Long totalPage = chatRoomRepository.countTitle(chatRoomTitle) / 6 + 1;
        for(int i=0; i<chatRoomList.size(); i++){
            ChatRoomRes chatRoomRes = new ChatRoomRes();
            ChatRoom chatRoom = chatRoomList.get(i);
            chatRoomRes.setChatRoomId(chatRoom.getChatRoomId());
            chatRoomRes.setChatRoomTitle(chatRoom.getChatRoomTitle());
            chatRoomRes.setUserMaxCount(chatRoom.getUserMaxCount());
            chatRoomRes.setUserNowCount(chatRoom.getUserNowCount());
            chatRoomRes.setTotalPage(totalPage);

            List<String> tagName = chatRoomTagRepository.findByTag(chatRoom.getChatRoomId());
            chatRoomRes.setTagName(tagName);
            chatRoomResList.add(chatRoomRes);
        }

        return chatRoomResList;
    }

    // 해당 해시태그가 들어간 글 찾고 정보 가져오기
    @Override
    public List<ChatRoomRes> findChatRoomTag(String chatRoomTagName, int page) {
        List<ChatRoomRes> chatRoomResList = new ArrayList<>();
        int pageCnt = (page-1) * 6;
        List<Long> chatRoomId = chatRoomTagRepository.findByTagName(chatRoomTagName, pageCnt);
        Long totalPage = (chatRoomTagRepository.countTag(chatRoomTagName) / 6) + 1;
        for(int i=0; i< chatRoomId.size(); i++){
            Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId.get(i));
            ChatRoomRes chatRoomRes = new ChatRoomRes();
            chatRoomRes.setChatRoomId(chatRoom.get().getChatRoomId());
            chatRoomRes.setChatRoomTitle(chatRoom.get().getChatRoomTitle());
            chatRoomRes.setUserMaxCount(chatRoom.get().getUserMaxCount());
            chatRoomRes.setUserNowCount(chatRoom.get().getUserNowCount());
            chatRoomRes.setTotalPage(totalPage);

            List<String> tagName = chatRoomTagRepository.findByTag(chatRoomId.get(i));
            chatRoomRes.setTagName(tagName);
            chatRoomResList.add(chatRoomRes);
        }

        return chatRoomResList;
    }

    @Override
    public List<String> findChatRoomSearchTitle(String chatRoomTitle) {
        return chatRoomTagRepository.findBySearchTitle(chatRoomTitle);
    }

    @Override
    public List<String> findChatRoomSearchHash(String chatRoomTagName) {
        return chatRoomTagRepository.findBySearchHash(chatRoomTagName);
    }

    @Override
    public void enterUserChatRoom(Long chatRoomId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
        chatRoom.get().setUserNowCount(chatRoom.get().getUserNowCount() + 1);
        ChatRoom chatRoomTmp = new ChatRoom();
        chatRoomTmp.setChatRoomId(chatRoom.get().getChatRoomId());
        chatRoomTmp.setHostId(chatRoom.get().getHostId());
        chatRoomTmp.setChatRoomTitle(chatRoom.get().getChatRoomTitle());
        chatRoomTmp.setStartTime(chatRoom.get().getStartTime());
        chatRoomTmp.setUserMaxCount(chatRoom.get().getUserMaxCount());
        chatRoomTmp.setUserNowCount(chatRoom.get().getUserNowCount());
        chatRoomRepository.save(chatRoomTmp);
    }

    @Override
    public void exitUserChatRoom(Long chatRoomId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(chatRoomId);
        chatRoom.get().setUserNowCount(chatRoom.get().getUserNowCount() - 1);
        ChatRoom chatRoomTmp = new ChatRoom();
        chatRoomTmp.setChatRoomId(chatRoom.get().getChatRoomId());
        chatRoomTmp.setHostId(chatRoom.get().getHostId());
        chatRoomTmp.setChatRoomTitle(chatRoom.get().getChatRoomTitle());
        chatRoomTmp.setStartTime(chatRoom.get().getStartTime());
        chatRoomTmp.setUserMaxCount(chatRoom.get().getUserMaxCount());
        chatRoomTmp.setUserNowCount(chatRoom.get().getUserNowCount());
        chatRoomRepository.save(chatRoomTmp);
    }

}
