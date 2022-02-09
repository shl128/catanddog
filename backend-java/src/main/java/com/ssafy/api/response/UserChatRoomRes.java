package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserChatRoomRes {
    Long userChatRoomId;
    Long chatRoomId;
    String chatRoomTitle;
    Long hostId;
    Integer userMaxCount;
    Integer userNowCount;
    List<String> tagName;

}
