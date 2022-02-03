package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_chat_room")
@Getter
@Setter
public class UserChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userChatRoomId = null;

    Long userId;
    Long chatRoomId;
}
