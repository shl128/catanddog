package com.ssafy.api.service;

import java.util.List;

public interface ChatRoomTagService {
    void saveChatRoomTag(Long chatRoomId, List<String> chatRoomTagName);
}
