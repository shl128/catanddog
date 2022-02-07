package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatRoomRes {
    Long chatRoomId;
    String chatRoomTitle;
    int userMaxCount;
    int userNowCount;
    List<String> tagName;
    Long totalPage;
}
