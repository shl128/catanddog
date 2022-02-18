package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserChatSavePostReq {
    String chatRoomTitle;
    int userMaxCount;
    List<String> chatRoomTagName;
}
